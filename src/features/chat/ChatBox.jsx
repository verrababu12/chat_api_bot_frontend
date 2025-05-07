import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { addUserMessage, sendMessage, fetchChatHistory } from "./chatSlice";

const userId = "6646a0013b29d98a7e87d8a9"; // replace with real ID or auth system

export default function ChatBox() {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const [input, setInput] = useState("");

  useEffect(() => {
    dispatch(fetchChatHistory(userId));
  }, [dispatch]);

  const handleSend = () => {
    if (!input.trim()) return;
    dispatch(addUserMessage(input));
    dispatch(sendMessage({ userId, message: input }));
    setInput("");
  };

  return (
    <div className="chat-box">
      <div className="messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`msg ${msg.sender}`}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder="Type your message..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}
