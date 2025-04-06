# TLDRON: LinkedIn Content Summarizer

> Get quick summaries of LinkedIn posts and articles, and disable promoted content.

TLDRON is a browser extension designed to enhance your LinkedIn experience. It provides concise summaries of LinkedIn content, saving you time and helping you quickly grasp the main points of posts and articles. Additionally, it offers the ability to disable promoted content, allowing for a cleaner and more focused browsing experience.

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
