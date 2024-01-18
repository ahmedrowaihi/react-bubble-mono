# ChatBubble Core

## Overview

ChatBubble - a simple chat library to copy paste and customize to your needs.

## Customizable Styles

You can customize the chat bubble styles by overriding the following CSS variables:

```css
:root {
  --bubble-font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  --bubble-border-radius: 0.5em;
  --bubble-bg-color: #f0f0f0;
  --bubble-primary-color: #646cff;
  --bubble-secondary-color: #454ab3;
  --bubble-text-color: #fff;
  --bubble-text-color-alt: #333;
}
```

## Project Structure

```
src
├── components  // UI components of the chat
├── context     // Contexts including LocalStorage service
│   └── localstorage-service.ts
└── services    // Services like i18n
    └── chat-bubble-i18n.tsx
```

## Usage

- props: `bubbleKey` - the key to store the chat bubble state in the local storage, in real scenarios, this should be unique per user profile, or better as `<user>-<topic>`.

```tsx
import React from "react";
import ReactDOM from "react-dom";
import { ChatBubbleComponent } from "@react-bubble-chat/component";

ReactDOM.render(
  <React.StrictMode>
    <ChatBubbleComponent bubbleKey="chat-bubble" />
  </React.StrictMode>,
  document.getElementById("root")
);
```

## Note

While this project provides a basic, yet robust, chat component, there are always ways to enhance and optimize. For a more advanced and well-maintained solution, consider using advanced patterns for better Developer Experience (DX). This includes integrating bundle optimization and Continuous Integration (CI) for npm releases.

## License

MIT

```md
This README provides a comprehensive guide to the core module of your project, highlighting its customizable nature and structure. You can add specific instructions on how to install, run, and contribute to the project as per your project's requirements. Don't forget to include actual paths and URLs where necessary.
```
