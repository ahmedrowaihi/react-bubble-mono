import { useMemo, useState } from "react";
import { useChatBubbleI18n } from "../context";
import { Message } from "../utils";
type Status = "loading" | "ready" | "error" | "";

export const ChatBubbleMessage = ({
  message,
  children,
}: {
  message: Message;
  children?: (props: {
    isLoading: boolean;
    isError: boolean;
    isInitial: boolean;
    isReady: boolean;
    $style: React.CSSProperties;
    handleLoad: () => void;
    handleError: () => void;
  }) => React.ReactNode;
}) => {
  const [status, setStatus] = useState<Status>(
    message.type === "text" ? "ready" : ""
  );

  const { t } = useChatBubbleI18n();
  const [isLoading, isError, isInitial, isReady] = useMemo(
    () => [
      status === "loading",
      status === "error",
      status === "",
      status === "ready",
    ],
    [status]
  );

  const $style = useMemo(
    () => ({
      display: isLoading ? "none" : "block",
    }),
    [isLoading]
  );

  const handleLoad = () => setStatus("ready");
  const handleError = () => setStatus("error");

  if (typeof children === "function")
    // allow render custom component
    return children({
      isLoading,
      isError,
      isInitial,
      isReady,
      $style,
      handleLoad,
      handleError,
    });
  if (isError) return <p>{t("error")}</p>;
  return (
    <>
      {isLoading && <p>{t("loading")}</p>}
      {/* we could use ternary, but since we are dealing with verbose HTML element, it's better to keep it in a switch for readability */}
      {(() => {
        switch (message.type) {
          case "text":
            return <p>{message.content}</p>;
          case "image":
            return (
              <img
                src={message.content}
                alt={message.user.name}
                onLoad={handleLoad}
                onError={handleError}
                style={$style}
              />
            );
          case "audio":
            return (
              <audio controls>
                <source
                  src={message.content}
                  type="audio/mpeg"
                  onLoad={handleLoad}
                  onError={handleError}
                />
              </audio>
            );
          case "video":
            return (
              <video
                controls
                onLoad={handleLoad}
                onError={handleError}
                style={$style}
              >
                <source src={message.content} type="video/mp4" />
              </video>
            );
          default:
            return null;
        }
      })()}
    </>
  );
};
