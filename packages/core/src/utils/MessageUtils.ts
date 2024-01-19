export interface Message {
  id: string;
  content: string;
  type: "text" | "image" | "audio" | "video";
  timestamp: number;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  isMe: boolean;
}

const users = ["Jony", "Kate", "Noah"];

export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36) + "";
};

export const generateMessage = (content: string, type: Message["type"]) => {
  return {
    id: generateId(),
    content,
    type,
    timestamp: Date.now(),
    user: {
      id: "1",
      name: users[Math.floor(Math.random() * users.length)],
      avatar: "https://i.pravatar.cc/300",
    },
    isMe: true,
  };
};

// == mock utils ==
const randomMessages = [
  "Hello!",
  "How are you?",
  "I'm good, you?",
  "I'm good too!",
  "What are you doing?",
  "Nothing much, just chilling",
  "Nice!",
  "Yeah!",
  "Bye!",
  "Bye!",
];

export const generateRandomMessage = (index?: number) => {
  const content =
    randomMessages[
      typeof index === "number"
        ? index
        : Math.floor(Math.random() * randomMessages.length)
    ];
  const message = generateMessage(content, "text");
  message.isMe = false;
  return message;
};
