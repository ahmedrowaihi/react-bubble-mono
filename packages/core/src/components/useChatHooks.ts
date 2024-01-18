import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { Message } from "./MessageUtils";
import { ChatBubbleStorageService } from "../services/localstorage-service";

export const useLocalStorageMessages = (key: string) => {
  const service = useMemo(() => new ChatBubbleStorageService(key), [key]);

  const [messages, setMessages] = useState<Message[]>(service.get() || []);

  useEffect(() => {
    service.set(messages);
  }, [messages, service]);

  return [messages, setMessages] as const;
};

export const useDebouncedScroll = (delay: number, dep: unknown) => {
  const messagesRef = useRef<HTMLDivElement>(null);
  const debouncedScroll = useRef<number | null>(null);

  const scroll = useCallback(() => {
    if (!messagesRef.current) return;
    messagesRef.current.scrollTo({
      top: messagesRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    if (debouncedScroll.current) clearTimeout(debouncedScroll.current);
    debouncedScroll.current = window.setTimeout(scroll, delay);
    return () => clearTimeout(debouncedScroll.current!);
  }, [scroll, delay, dep]);

  const forceScroll = useCallback(() => {
    if (!messagesRef.current) return;
    messagesRef.current.scrollTo({
      top: messagesRef.current.scrollHeight,
      behavior: "auto",
    });
  }, []);
  return { messagesRef, forceScroll };
};
