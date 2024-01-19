// useFileUpload.ts
import { startTransition, useCallback } from "react";
import { Message, generateMessage } from "../utils";

type UseFileUploadProps = {
  setMessage: React.Dispatch<React.SetStateAction<Message>>;
  handleSubmission: (message: Message) => void;
};

export const useFileUpload = ({
  setMessage,
  handleSubmission,
}: UseFileUploadProps) => {
  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;
      const file = e.target.files[0];
      const reader = new FileReader();

      // Optionally, handle the start of file reading
      reader.onloadstart = () => {};

      reader.onload = () => {
        if (!reader.result) return;
        const url = URL.createObjectURL(file);
        const type = file.type.split("/")[0] as Message["type"];

        const newMessage = generateMessage(url, type);
        setMessage(newMessage);

        // Start transition to avoid blocking the UI
        startTransition(() => handleSubmission(newMessage));
      };

      reader.onerror = () => {
        console.error("Error reading file");
        setMessage(generateMessage("", "text"));
      };

      reader.readAsDataURL(file);
    },
    [setMessage, handleSubmission]
  );

  return handleFileUpload;
};
