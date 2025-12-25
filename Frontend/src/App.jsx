import "./App.css";
import Sidebar from "./Sidebar.jsx";
import ChatWindow from "./ChatWindow.jsx";

import { MyContext } from "./MyContext.jsx";
import { useState, useContext } from "react";
import { v1 as uuidv1 } from "uuid";

import { AuthContext } from "./AuthContext";
import Login from "./Login";

function App() {
  const { user, logout } = useContext(AuthContext);

  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currThreadId, setCurrThreadId] = useState(uuidv1());
  const [prevChats, setPrevChats] = useState([]);
  const [newChat, setNewChat] = useState(true);
  const [allThreads, setAllThreads] = useState([]);

  const providerValues = {
    prompt,
    setPrompt,
    reply,
    setReply,
    currThreadId,
    setCurrThreadId,
    newChat,
    setNewChat,
    prevChats,
    setPrevChats,
    allThreads,
    setAllThreads,
  };

  // 🔒 protect app
  if (!user) return <Login />;

  return (
    <div className="app">
      <button onClick={logout} style={{ position: "absolute", top: 10, right: 10 }}>
        Logout
      </button>

      <MyContext.Provider value={providerValues}>
        <Sidebar />
        <ChatWindow />
      </MyContext.Provider>
    </div>
  );
}

export default App;
