import ChatBox from "./features/chat/ChatBox";
import FileUpload from "./components/FileUpload";

function App() {
  return (
    <div style={{ padding: "1rem" }}>
      <h1>AI Customer Support Chat</h1>
      <FileUpload />
      <ChatBox />
    </div>
  );
}

export default App;
