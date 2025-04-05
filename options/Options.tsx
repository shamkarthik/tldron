import React, { useEffect, useState } from "react";
import { useToast } from "../components/context/ToastContext";
import "./options.css";

const Options: React.FC = () => {
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    chrome.storage.local.get("apiKey", (result) => {
      if (result.apiKey) setApiKey(result.apiKey);
    });
  }, []);

  const handleSave = () => {
    if (!apiKey) {
      showToast("❌ API Key is empty!", "error");
      return;
    }
    chrome.storage.local.set({ apiKey }, () => {
      showToast("✅ API Key saved!", "success");
    });
  };

  const handleClear = () => {
    chrome.storage.local.remove("apiKey", () => {
      setApiKey("");
      showToast("🗑️ API Key cleared!", "warning");
    });
  };

  const openApiKeyPage = () => {
    window.open("https://aistudio.google.com/apikey", "_blank");
  };

  return (
    <div className="options-page">
      <div className="options-container">
        <h1 className="options-title">Extension Settings</h1>

        <div className="options-description">
          <p>
            This extension uses your own <strong>Gemini API key</strong> to generate AI summaries.
            Your key is stored securely in your browser’s local storage.
          </p>
          <p className="options-warning">
            ⚠️ Be cautious: Sharing your API key with third-party tools can be risky. Always review
            permissions and monitor usage.
          </p>
        </div>

        <button className="api-button" onClick={openApiKeyPage}>
          Get Gemini API Key
        </button>

        <label className="input-label" htmlFor="apiKey">
          Gemini API Key
        </label>

        <div className="input-wrapper">
          <input
            id="apiKey"
            type={showKey ? "text" : "password"}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="api-input"
          />
          <button type="button" className="toggle-button" onClick={() => setShowKey((prev) => !prev)}>
            {showKey ? "Hide" : "Show"}
          </button>
        </div>

        <button className="save-button" onClick={handleSave}>
          Save
        </button>
        <button className="clear-button" onClick={handleClear}>
          Clear Storage
        </button>
      </div>
    </div>
  );
};

export default Options;
