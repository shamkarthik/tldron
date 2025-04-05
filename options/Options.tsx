import React, { useEffect, useState } from "react";
import { useToast } from "../components/context/ToastContext";

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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-xl p-8 rounded-2xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Extension Settings
        </h1>

        <label className="block text-gray-700 mb-2" htmlFor="apiKey">
          Gemini API Key
        </label>

        <div className="relative">
          <input
            id="apiKey"
            type={showKey ? "text" : "password"}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowKey((prev) => !prev)}
            className="absolute inset-y-0 right-0 px-3 text-sm text-blue-600 hover:underline"
          >
            {showKey ? "Hide" : "Show"}
          </button>
        </div>

        <button
          onClick={handleSave}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
        >
          Save
        </button>

        <button
          onClick={handleClear}
          className="mt-2 w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
        >
          Clear Storage
        </button>
      </div>
    </div>
  );
};

export default Options;
