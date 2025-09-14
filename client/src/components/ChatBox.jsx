import React from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { formatMessageTimestamp } from "../lib/utils.js";

const ChatBox = () => {
  const { chats, getChats, isMessagesLoading, selectedUser } = useChatStore();
  const { authUser } = useAuthStore();

  React.useEffect(() => {
    if (selectedUser?._id) {
      getChats(selectedUser._id);
    }
  }, [selectedUser?._id, getChats]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chats.map((chat) => (
          <div
            key={chat._id}
            className={`chat ${
              chat.senderId._id === authUser._id ? "chat-end" : "chat-start"
            }`}
          >
            <div className="chat-image avatar">
              <div className="w-10 h-10 rounded-full border">
                <img
                  src={
                    chat.senderId._id === authUser._id
                      ? authUser.profileImageURL || "/avatar.png"
                      : selectedUser.profileImageURL || "/avatar.png"
                  }
                  alt="Profile Picture"
                />
              </div>
            </div>
            <div className="chat-header mb-1 mt-3">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTimestamp(chat.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {chat.image && (
                <img
                  src={chat.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {chat.message && <p>{chat.message}</p>}
            </div>
          </div>
        ))}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatBox;
