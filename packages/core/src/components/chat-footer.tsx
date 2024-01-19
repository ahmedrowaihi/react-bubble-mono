import React, { useRef } from "react";
import { Message, generateMessage } from "../utils";
import DefferedTextarea, { DefferedTextareaRef } from "./deffered-textarea";
import Icons from "./icons";

type ChatFooterProps = {
  handleSubmission: (message: Message) => void;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  message: Message;
  setMessage: React.Dispatch<React.SetStateAction<Message>>;
  isPending: boolean;
  direction: string;
};

const ChatFooter: React.FC<ChatFooterProps> = ({
  handleSubmission,
  handleFileUpload,
  message,
  setMessage,
  isPending,
  direction,
}) => {
  const textAreaRef = useRef<DefferedTextareaRef>(null);

  return (
    <div className="cb__foot">
      <DefferedTextarea
        ref={textAreaRef}
        direction={direction}
        isPending={isPending}
        message={message}
        setMessage={setMessage}
        generateMessage={generateMessage}
      />
      <span className="cb__icon" onClick={() => handleSubmission(message)}>
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
  );
};

export default ChatFooter;
