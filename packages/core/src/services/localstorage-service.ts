import { Message } from "../components/MessageUtils";

export class ChatBubbleStorageService {
  #key: string;
  constructor(key: string) {
    this.#key = key;
  }
  get() {
    const storedMessages = localStorage.getItem(this.#key);
    return storedMessages ? JSON.parse(storedMessages) : [];
  }
  set(value: Message[]) {
    localStorage.setItem(this.#key, JSON.stringify(value));
  }
}
