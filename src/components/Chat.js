import React from "react";
import "./Chat.css";
import { useParams } from "react-router-dom";
import { InfoOutlined, StarBorderOutlined } from "@mui/icons-material";
import { useEffect } from "react";
import db from "../firebase";
import { useState } from "react";
import Message from "./Message";
import ChatInput from "./ChatInput";

const Chat = () => {
  const [roomDetails, setRoomDetails] = useState(null);
  const [roomMessages, setRoomMessages] = useState([]);
  const { roomId } = useParams();

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomDetails(snapshot.data()));
    }

    db.collection("rooms")
      .doc(roomId)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => setRoomMessages(snapshot.docs.map((doc) => doc.data())));
  }, [roomId]);

  console.log(roomMessages);

  return (
    <div className="chat">
      <div class="chat__header">
        <div class="chat__headerLeft">
          <h4 class="chat__channelName">
            <strong># {roomDetails?.name || roomId}</strong>
            <StarBorderOutlined />
          </h4>
        </div>
        <div class="chat__headerRight">
          <p>
            <InfoOutlined /> Details
          </p>
        </div>
      </div>
      <div className="chat__messages">
        {roomMessages.map(({ message, timestamp, username, userImage }) => (
          <Message message={message} timestamp={timestamp} user={username} userImage={userImage} />
        ))}
      </div>
      <ChatInput channelName={roomDetails?.name} channelId={roomId} />
    </div>
  );
};

export default Chat;
