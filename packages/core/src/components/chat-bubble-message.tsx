import { useState } from "react";
import { Message } from "./MessageUtils";
import { useChatBubbleI18n } from "../context/chat-bubble-i18n";

export const ChatBubbleMessage = ({ message }: { message: Message }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const { t } = useChatBubbleI18n();
  if (error) return <p>{t("error")}</p>;
  switch (message.type) {
    case "text":
      return <p>{message.content}</p>;
    case "image":
      return (
        <img
          src={message.content}
          alt={message.user.name}
          onLoad={() => setLoading(false)}
          onError={() => setError(true)}
          style={{ display: loading ? "none" : "block" }}
        />
      );
    case "audio":
      return (
        <audio controls>
          <source
            src={message.content}
            type="audio/mpeg"
            onLoad={() => setLoading(false)}
            onError={() => setError(true)}
            style={{ display: loading ? "none" : "block" }}
          />
        </audio>
      );
    case "video":
      return (
        <video controls>
          <source src={message.content} type="video/mp4" />
        </video>
      );
    default:
      return null;
  }
};
