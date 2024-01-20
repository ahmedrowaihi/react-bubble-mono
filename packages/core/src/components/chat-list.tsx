import React from "react";
import { Message } from "../utils";
import { ChatBubbleMessage } from "./chat-message";

type MessageListProps = {
  messages: Message[];
  messagesRef: React.RefObject<HTMLDivElement>;
};

const MessageList: React.FC<MessageListProps> = ({ messages, messagesRef }) => {
  return (
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
  );
};

export default MessageList;
