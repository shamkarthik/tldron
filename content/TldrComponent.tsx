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
    <div className="button-wrapper">
      <button
        className="primary-button"
        onClick={() => setEnableExtension(!enableExtension)}
      >
        {enableExtension ? "Disable Button" : "Enable Button"}
      </button>

      <button className="primary-button" onClick={openSettings}>
        Open Settings
      </button>
    </div>
  );
};

export default LinkedInTLDR;
