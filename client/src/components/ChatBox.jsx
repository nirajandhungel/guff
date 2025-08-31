import React from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
const ChatBox = () => {
  const { chats, getChats, isMessagesLoading, selectedUser } = useChatStore();
  
  React.useEffect(() => {
    getChats(selectedUser._id);
  }, [selectedUser._id, getChats]);

  if (isMessagesLoading) return <div>Loading...</div>;
  return(
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader></ChatHeader>
      <p className="">messages...</p>
      <MessageInput></MessageInput>
    </div>
  )
};

export default ChatBox;
