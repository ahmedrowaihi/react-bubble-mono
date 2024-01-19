import { useEffect, useMemo, useState } from "react";
import { ChatBubbleStorageService } from "../services";
import { Message } from "../utils";

export const useLocalStorageMessages = (key: string) => {
  const service = useMemo(() => new ChatBubbleStorageService(key), [key]);

  const [messages, setMessages] = useState<Message[]>(service.get() || []);

  useEffect(() => {
    service.set(messages);
  }, [messages, service]);

  return [messages, setMessages] as const;
};
