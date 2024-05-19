import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3001");

function App() {
  const sendMessage = () => {
    socket.emit("send_message", { message });
  };

  const [message, setMessage] = useState("");
  const [messageRecieved, setMessageRecieved] = useState("");

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageRecieved(data.message);
    });
  }, [socket]);

  return (
    <div className="App">
      <input
        placeholder="Message"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <button onClick={sendMessage}> Send Message</button>
      <h1>Message:</h1>
      {messageRecieved}
    </div>
  );
}

export default App;
