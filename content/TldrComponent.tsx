import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "",
});
const LinkedInTLDR = () => {
  const InjectButton = ({ container }: { container: HTMLElement }) => {
    const [loading, setLoading] = useState(false);
    const [summary, setSummary] = useState<string | null>(null);

    const handleClick = async () => {
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
      const prompt = `Summarize the following post in one sentence in 10 words:\n\n${postText}`;

      try {
        // Call GoogleGenAI
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
        console.log("response", response.text);
        setSummary(response.text.trim());
        // alert(`TL;DR: ${response.text}`);
      } catch (error) {
        // alert("Failed to generate TL;DR");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    return (
      <div>
            <button
                onClick={handleClick}
                className="m-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                disabled={loading}
            >
                {loading ? "Generating TL;DR..." : "Generate TL;DR"}
            </button>
            {summary && (
                <p className="mt-2 p-2 border rounded">{summary}</p>
            )}
        </div>
    );
  };

  const injectButtons = () => {
    const containers = Array.from(
      document.getElementsByClassName(
        "feed-shared-update-v2__control-menu-container"
      ) as HTMLCollectionOf<HTMLElement>
    );

    containers.forEach((container) => {
      // Prevent duplicate injection
      if (container.querySelector(".injected-button")) return;

      // Create button container
      const buttonContainer = document.createElement("div");
      buttonContainer.className = "injected-button";

      // Attach React component
      const root = createRoot(buttonContainer);
      root.render(<InjectButton container={container} />);

      // Inject button on top
      container.prepend(buttonContainer);
    });
  };
  useEffect(() => {
    injectButtons(); // Initial injection

    // Inject on scroll
    document.addEventListener("scroll", injectButtons);
    return () => document.removeEventListener("scroll", injectButtons);
  }, []);

  return (
    <div>
      <button style={{ backgroundColor: "red" }} onClick={() => {}}>
        Hide Button
      </button>
    </div>
  );
};

export default LinkedInTLDR;
