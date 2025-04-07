# TLDRON: LinkedIn Content Summarizer

> Get quick summaries of LinkedIn posts and articles, and disable promoted content.

TLDRON is a browser extension designed to enhance your LinkedIn experience. It provides concise summaries of LinkedIn content, saving you time and helping you quickly grasp the main points of posts and articles. Additionally, it offers the ability to disable promoted content, allowing for a cleaner and more focused browsing experience.

## Preview

![tldron preview](https://github.com/user-attachments/assets/adb93133-03a6-41a3-877a-a81303bad5e5)

## Features

*   **AI-Powered Summarization:** TLDRON uses the Gemini API to generate intelligent and accurate summaries of LinkedIn posts and articles.
*   **Disable Promoted Content:**  Easily hide sponsored posts and ads, creating a less cluttered feed.
*   **Customizable Summary Length:** (Future Feature) Users will be able to adjust the length of the summary to suit their needs.
*   **Seamless Integration:** TLDRON integrates directly into your LinkedIn browsing experience.
*   **Easy to Use:** With a simple click, you can get a summary of any LinkedIn content or toggle the promoted content filter.

## How It Works

### Summarization with Gemini API

TLDRON leverages the power of the Gemini API to analyze the text content of LinkedIn posts and articles. It then distills the information into a concise summary, highlighting the key takeaways.

### Disabling Promoted Content

TLDRON identifies and hides sponsored posts and ads within your LinkedIn feed. This feature helps you focus on organic content and reduces distractions.

### API Key Storage

TLDRON requires a Gemini API key to function. This key is stored securely within your browser's local storage using the `chrome.storage.local` API.

**Important Security Notes:**

*   **Obfuscation, Not Encryption:** While `chrome.storage.local` provides a degree of protection, it's important to understand that the data is obfuscated, not truly encrypted. This means that while it's not easily human-readable, it's not protected by strong cryptographic methods.
*   **User Responsibility:** The security of your API key ultimately depends on the security of your machine. If your system is compromised, any data stored locally could be at risk.
*   **Never commit your API key to version control.** This is a critical security practice. Ensure your API key is not accidentally pushed to a public repository.

## Getting Started

### Installation

1.  **Development Mode:**
    *   Clone this repository to your local machine.
    *   Open your browser and navigate to the extensions page (e.g., `chrome://extensions` in Chrome).
    *   Enable "Developer mode."
    *   Click "Load unpacked" and select the directory where you cloned the repository.
2.  **Production Mode:**
    *   Once the extension is ready for production, it will be available in the browser's extension store.

### Available Scripts

In the project directory, you can run the following scripts:

#### `npm dev`

**Development Mode**: This command runs your extension in development mode. It launches a new browser instance with your extension loaded. The page will automatically reload whenever you make changes to your code, allowing for a smooth development experience.

```bash
npm dev
```

## Credits

This extension uses icons from Flaticon:

*   [Sport team icons created by Mehwish - Flaticon](https://www.flaticon.com/free-icons/sport-team)