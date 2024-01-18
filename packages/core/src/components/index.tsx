import React from "react";
import ChatBubble from "./chat-bubble";
import { ChatBubbleI18nProvider } from "../context/chat-bubble-i18n";

export const ChatBubbleComponent = ({ bubbleKey }: { bubbleKey: string }) => {
  return (
    <ChatBubbleI18nProvider>
      <ChatBubble bubbleKey={bubbleKey} />
    </ChatBubbleI18nProvider>
  );
};
