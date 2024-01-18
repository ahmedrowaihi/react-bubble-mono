import React from "react";
import { useCallback, useRef, useState, useTransition } from "react";
import {
  Message,
  generateMessage,
  generateRandomMessage,
} from "./MessageUtils";
import { ChatBubbleMessage } from "./chat-bubble-message";
import "./chat-bubble.css";
import DefferedTextarea, { DefferedTextareaRef } from "./deffered-textarea";
import Icons from "./icons";
import { useDebouncedScroll, useLocalStorageMessages } from "./useChatHooks";
import { useChatBubbleI18n } from "../context/chat-bubble-i18n";

// DEVELOPER NOTE: WE CAN MAKE IT MORE ADVANCE BY USING CONTEXT INSTEAD OF PROPS DRILLING
// I WILL JUST KEEP IT SIMPLE AS THE TASK IS NOT ABOUT STATE MANAGEMENT

function ChatBubble({ bubbleKey }: { bubbleKey: string }) {
  const [messages, setMessages] = useLocalStorageMessages(bubbleKey);
  const { locale, setLocale, direction, t } = useChatBubbleI18n();

  const { messagesRef, forceScroll } = useDebouncedScroll(200, messages.length);
  const [message, setMessage] = useState<Message>(generateMessage("", "text"));
  const [isPending, startTransition] = useTransition();

  const handleSubmission = useCallback(() => {
    if (!message.content) return;
    startTransition(() => {
      setMessages((messages) => [...messages, message]);
      setMessage(generateMessage("", "text"));
      // simulate a response
      setTimeout(() => {
        setMessages((messages) => [...messages, generateRandomMessage()]);
      }, 1000);
    });
  }, [message, setMessages, startTransition]);

  // could be abstracted to a custom hook
  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      const type = file.type.split("/")[0] as Message["type"];

      reader.onload = () => {
        if (!reader.result) return;
        const url = URL.createObjectURL(file);
        const message = generateMessage(url, type);
        setMessage(message);
        startTransition(handleSubmission);
      };
      reader.onerror = () => setMessage(generateMessage("", "text"));
      reader.onabort = () => setMessage(generateMessage("", "text"));
    },
    [handleSubmission, startTransition]
  );
  const [collapsed, setCollapsed] = useState(true);
  const textAreaRef = useRef<DefferedTextareaRef>(null);
  const toggleCollapse = useCallback(() => {
    setCollapsed((c) => !c);
    textAreaRef.current?.fixFlicker();
    setTimeout(forceScroll, 0);
  }, [forceScroll]);

  return (
    <div className="cb" data-collapsed={collapsed}>
      <div className="cb__toggle" onClick={toggleCollapse}>
        <Icons.chat />
      </div>
      <div className="cb__cont">
        <div className="cb__head" dir={direction} lang={locale}>
          <h3>{t("chat")}</h3>
          <div className="cb__head__actions">
            <div className="cb__head__locale">
              <span
                onClick={() =>
                  setLocale((locale) => (locale === "en" ? "ar" : "en"))
                }
              >
                <Icons.lang />
              </span>
            </div>
            <div className="cb__head__close">
              <span onClick={toggleCollapse}>
                <Icons.close />
              </span>
            </div>
          </div>
        </div>
        <div dir="ltr" className="cb__msgs" ref={messagesRef}>
          {messages.map((message) => (
            <div key={message.id} className="cb__msg" data-is-me={message.isMe}>
              <div className="cb__avatar">
                <img src={message.user.avatar} alt={message.user.name} />
              </div>
              <div className="cb__msg__content">
                <p className="cb__msg__content__name">{message.user.name}</p>
                <ChatBubbleMessage message={message} />
              </div>
            </div>
          ))}
        </div>
        <div key={collapsed ? "collapsed" : "expanded"} className="cb__foot">
          <DefferedTextarea
            ref={textAreaRef}
            direction={direction}
            isPending={isPending}
            message={message}
            setMessage={setMessage}
            generateMessage={generateMessage}
          />
          <span className="cb__icon" onClick={handleSubmission}>
            <Icons.send />
          </span>
          <label htmlFor="file" className="cb__icon">
            <Icons.upload />
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={handleFileUpload}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export default ChatBubble;
