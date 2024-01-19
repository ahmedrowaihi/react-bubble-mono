import React from "react";
import { useChatBubbleI18n } from "../context";
import Icons from "./icons";

type ChatHeaderProps = {
  toggleCollapse: () => void;
  setLocale: (locale: "ar" | "en") => void;
};

const ChatHeader: React.FC<ChatHeaderProps> = ({
  toggleCollapse,
  setLocale,
}) => {
  const { locale, direction, t } = useChatBubbleI18n();

  return (
    <div className="cb__head" dir={direction} lang={locale}>
      <h3>{t("chat")}</h3>
      <div className="cb__head__actions">
        <div className="cb__head__locale">
          <span onClick={() => setLocale(locale === "en" ? "ar" : "en")}>
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
  );
};

export default ChatHeader;
