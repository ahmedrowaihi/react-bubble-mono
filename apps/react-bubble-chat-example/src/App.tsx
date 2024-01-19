import { ChatBubbleComponent } from "@react-bubble-chat/component";
import "@react-bubble-chat/component/theme.css";
import "./App.css";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
function App() {
  return (
    <>
      <div>
        <span>
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </span>
        <span>
          <img src={reactLogo} className="logo react" alt="React logo" />
        </span>
      </div>
      <h1>Bubble Chat Example</h1>
      <p>This is an example of a React app using Vite.</p>
      <div className="card">
        <ChatBubbleComponent bubbleKey="chat-bubble" />
      </div>
    </>
  );
}

export default App;
