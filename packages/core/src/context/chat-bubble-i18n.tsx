import React, { createContext, useState } from "react";

const localize = {
  en: {
    chat: "ChatBubble Group Chat",
    error: "something went wrong",
    send: "Send",
    placeholder: "Type a message...",
  },
  ar: {
    chat: "محادثة جماعية",
    error: "حدث خطأ ما",
    send: "إرسال",
    placeholder: "اكتب رسالة...",
  },
};
interface ChatBubbleI18nProps {
  locale: "en" | "ar";
  setLocale: React.Dispatch<React.SetStateAction<"en" | "ar">>;
  direction: string;
  localization: typeof localize.en | typeof localize.ar;
  t: (key: keyof typeof localize.en) => string;
}
const ChatBubbleI18nContext = createContext<ChatBubbleI18nProps | undefined>(
  undefined
);

// eslint-disable-next-line react-refresh/only-export-components
export const useChatBubbleI18n = () => {
  const context = React.useContext(ChatBubbleI18nContext);
  if (!context) {
    throw new Error(
      "useChatBubbleI18n must be used within a ChatBubbleI18nProvider"
    );
  }
  return context;
};

export const ChatBubbleI18nProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [locale, setLocale] = useState<"en" | "ar">("en");
  const direction = locale === "ar" ? "rtl" : "ltr";
  const localization = localize[locale];
  const t = (key: keyof typeof localize.en) => localization[key];
  return (
    <ChatBubbleI18nContext.Provider
      value={{ locale, setLocale, direction, localization, t }}
    >
      {children}
    </ChatBubbleI18nContext.Provider>
  );
};
