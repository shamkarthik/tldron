import { GoogleGenAI } from "@google/genai";
import { useState } from "react";
import { useStorage } from "./useStorage";
import { useToast } from "../components/context/ToastContext";


const InjectButton = ({ container }: { container: HTMLElement }) => {
    const apiKey = useStorage<string | null>("apiKey");
    const { showToast } = useToast();
  
    const [loading, setLoading] = useState(false);
    const [summary, setSummary] = useState<string | null>(null);

    const handleClick = async () => {
      if (!apiKey) {
        console.warn('API key is not available.');
        showToast('❌ API Key not found!');
        return;
      }
      setLoading(true);

      // Get the post text from the container
      const postTextElement = container.querySelector(
        ".feed-shared-inline-show-more-text span.break-words"
      ) as HTMLElement;

      const postText = postTextElement
        ? postTextElement.innerText
        : "No content available";

      if (!postTextElement) {
        alert("Post content not found!");
        setLoading(false);
        return;
      }
      console.log("postText", postText);
      const prompt = `Summarize the following post in one sentence in 10 words with precise details:\n\n${postText}`;

      try {
        // Call GoogleGenAI
        const ai = new GoogleGenAI({
          apiKey: apiKey,
        });
        const response = await ai.models.generateContent({
          model: "gemini-2.0-flash",
          contents: prompt,
          config: {
            maxOutputTokens: 50, // Limit the response length
            temperature: 0.5, // Control the randomness
            topP: 0.8, // Nucleus sampling parameter
            topK: 50, // Top-K sampling parameter
          },
        });

        // Display the TL;DR
        if (response.text) {
          console.log("response", response.text);
          setSummary(response.text.trim());
        }
        
        // alert(`TL;DR: ${response.text}`);
      } catch (error) {
        // alert("Failed to generate TL;DR");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="tldr-container">
            <button
                onClick={handleClick}
                className={`tldr-button ${loading ? 'tldr-button-loading' : ''}`}
                disabled={loading}
            >
                {loading ? "TL;DR..." : "TL;DR"}
            </button>
            {summary && (
                <p className="tldr-summary">{summary}</p>
            )}
        </div>
    );
  };

  export default InjectButton;