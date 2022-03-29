import '../styles/Chat.css';
import getChats from '../lib/getChats';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { db } from '../db/firebase';
import { v4 as uuidv4 } from 'uuid';
import Conversation from './Conversation';

//first grab the ids of the chats
//then add a listener onto each chat so user is notified when a new message comes in
// then display chats in the widget

export const Chat = React.memo(() => {
  const user = useSelector(selectUser);
  const [conversations, setConversations] = useState([]);

  useEffect(async () => {
    const userConversations = await getChats(user.uid);
    setConversations(userConversations);
  }, []);

  return (
    <div className="chat">
      <div className="chat__top">
        <h3>Chat</h3>
      </div>
      {conversations.map((convo) => {
        const key = uuidv4();
        return <Conversation key={key} conversation={convo} />;
      })}
    </div>
  );
});