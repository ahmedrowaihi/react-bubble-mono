import ReactTextareaAutosize from "react-textarea-autosize";
import { Message } from "../utils";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { useChatBubbleI18n } from "../context";
interface Props {
  direction: string;
  isPending: boolean;
  message: Message;
  setMessage: React.Dispatch<React.SetStateAction<Message>>;
  generateMessage: (content: string, type: Message["type"]) => Message;
}

export interface DefferedTextareaRef {
  fixFlicker: () => void;
}

const DefferedTextarea = forwardRef(function DefferedTextarea(
  { direction, isPending, message, setMessage, generateMessage }: Props,
  ref
) {
  const [render, setRender] = useState(false);
  const defferedRef = useRef<number | null>(null);
  const { t } = useChatBubbleI18n();
  if (message.type === "text" && !render) {
    defferedRef.current = window.setTimeout(() => {
      setRender(true);
    }, 200);
  }
  useImperativeHandle(ref, () => ({
    fixFlicker: () => {
      if (defferedRef.current) {
        clearTimeout(defferedRef.current);
        setRender(true);
      }
    },
  }));
  if (!render) return null;
  return (
    <ReactTextareaAutosize
      dir={direction}
      placeholder={t("placeholder")}
      disabled={isPending || message.type !== "text"}
      value={message.type === "text" ? message.content : ""}
      onChange={(e) => setMessage(generateMessage(e.target.value, "text"))}
    />
  );
});

export default DefferedTextarea;
