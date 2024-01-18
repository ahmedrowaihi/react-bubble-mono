# ChatBubble Monorepo

## Overview

Welcome to ChatBubble! This is our all-in-one repository for building a fantastic chat interface. It's perfect for adding a chat feature to your web apps. We've packed it with features to make chatting smooth and enjoyable.
## What Came to my mind quickly, I use [tldraw](https://www.tldraw.com/) to plan fast 
![image](https://github.com/ahmedrowaihi/react-bubble-mono/assets/67356781/0bd2dab0-e37f-4868-8ed7-53264da7607d)

## Features

- Switch languages on the fly – we've got multi-language support.
- Customize your chat how you like – lots of component options.
- Enjoy smooth scrolling – our debounced scroll makes sure of it.
- We save your chats – thanks to local storage integration.
- Everything's modular and managed – state management is a breeze with our context API.

## Project Structure

Our monorepo is split into several packages, each with its role:

- `packages/core`: Here's where the magic happens – all the core chat functionalities.
- `apps/react-bubble-chat-example`:
  this is an example playground vite app that uses the `core` package. It's a great place to start if you want to see how to use the `core` package.

## Getting Started

### Prerequisites

Before you start, make sure you have:

- Node.js (version 18 or later).
- `Yarn` or `npm` or `pnpm`.
- `bun`, not tested.

### Installation

First, clone the repo:

```bash
git clone https://github.com/ahmedrowaihi/chatbubble.git
cd chatbubble
```

Then, install the dependencies:

```bash
yarn
```

#### Running the Example App Locally
