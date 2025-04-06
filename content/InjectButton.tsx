import { GoogleGenAI } from "@google/genai";
import { useState, useEffect } from "react";
import { useStorage } from "./useStorage";
import { useToast } from "../components/context/ToastContext";
import EstimatedReadTime from "./EstimatedReadTime";

const InjectButton = ({ container }: { container: HTMLElement }) => {
  const apiKey = useStorage<string | null>("apiKey");
  const { showToast } = useToast();

  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [postText, setPostText] = useState<string>("");

  // 📦 Get text from the post on mount
  useEffect(() => {
    const postTextElement = container.querySelector(
      ".feed-shared-inline-show-more-text span.break-words"
    ) as HTMLElement;

    if (postTextElement && postTextElement.innerText.trim().length > 0) {
      setPostText(postTextElement.innerText.trim());
    }
  }, [container]);

  const handleClick = async () => {
    if (!apiKey) {
      console.warn("API key is not available.");
      showToast("❌ API Key not found!");
      return;
    }

    setLoading(true);

    const prompt = `Summarize the following post in one sentence in 10 words with precise details:\n\n${postText}`;

    try {
      const ai = new GoogleGenAI({ apiKey });

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
        config: {
          maxOutputTokens: 50,
          temperature: 0.5,
          topP: 0.8,
          topK: 50,
        },
      });

      if (response.text) {
        setSummary(response.text.trim());
      }
    } catch (error) {
      console.error("Failed to generate TL;DR", error);
    } finally {
      setLoading(false);
    }
  };

  // 👇 Only show TL;DR if postText is not too short
  const showTldrButton = postText.length > 50;

  return (
    <div className="tldr-container">
      <div className="tldr-header">
        <EstimatedReadTime text={postText} />
        {showTldrButton && (
          <button
            onClick={handleClick}
            className={`tldr-button ${loading ? "tldr-button-loading" : ""}`}
            disabled={loading}
          >
            {loading ? "TL;DR..." : "TL;DR"}
          </button>
        )}
      </div>
      {summary && <p className="tldr-summary">{summary}</p>}
    </div>
  );
};

export default InjectButton;
