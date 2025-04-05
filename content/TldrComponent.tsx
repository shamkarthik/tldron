import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./TldrComponent.css";
import InjectButton from "./InjectButton";
import { ToastProvider } from "../components/context/ToastContext";

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
    root.render(
      <ToastProvider position="top-right">
        <InjectButton container={container} />
      </ToastProvider>
    );

    // Inject button on top
    container.prepend(buttonContainer);
  });
};

const ejectButtons = () => {
  const injectedButtons = Array.from(
    document.querySelectorAll(".injected-button")
  );

  injectedButtons.forEach((button) => {
    button.remove();
  });
};

const LinkedInTLDR = () => {
  const [enableExtension, setEnableExtension] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(null);

  useEffect(() => {
    const updateKey = (changes: any) => {
      if (changes.apiKey) {
        console.log("apiKey", changes.apiKey.newValue);
        setApiKey(changes.apiKey.newValue);
      }
    };
    chrome.storage.onChanged.addListener(updateKey);
    return () => chrome.storage.onChanged.removeListener(updateKey);
  }, []);

  useEffect(() => {
    if (!enableExtension) {
      ejectButtons();
      return;
    }
  }, [enableExtension]);
  useEffect(() => {
    if (!enableExtension) return;

    injectButtons(); // Initial injection

    // Inject on scroll
    document.addEventListener("scroll", injectButtons);
    return () => document.removeEventListener("scroll", injectButtons);
  }, [enableExtension]);
  const openSettings = () => {
    console.log("Sending message to open options page");
    chrome.runtime.sendMessage({ action: "openOptionsPage" });
  };

  return (
    <div>
      <button
        className="m-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => setEnableExtension(!enableExtension)}
      >
        {enableExtension ? "Disable Button" : "Enable Button"}
      </button>
      <button
        className="m-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={openSettings}
      >
        Open Settings
      </button>
    </div>
  );
};

export default LinkedInTLDR;
