import ChatBubble from "./chat-bubble";
import { ChatBubbleI18nProvider } from "../context";

export const ChatBubbleComponent = ({ bubbleKey }: { bubbleKey: string }) => {
  return (
    <ChatBubbleI18nProvider>
      <ChatBubble bubbleKey={bubbleKey} />
    </ChatBubbleI18nProvider>
  );
};
