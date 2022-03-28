import '../styles/Chat.css';
import getChats from '../lib/getChats';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { db } from '../db/firebase';
import { v4 as uuidv4 } from 'uuid';

export const Chat = React.memo(() => {
  const [chats, setChats] = useState([]);
  const user = useSelector(selectUser);
  useEffect(async () => {
    const fetchedChats = await getChats(user.uid);
    const ids = fetchedChats.map((chat) => chat.id);
    ids.forEach((id) => {
      const chatsRef = db.collection('chats').doc(id).collection('messages');
      const messages = [];
      chatsRef.onSnapshot((snap) => {
        snap.forEach((x) => {
          messages.push(x.data());
        });
        setChats([...chats, { [id]: [...messages] }]);
      });
    });
  }, []);
  return (
    <div className="chat">
      <div className="chat__top">
        <h3>Chat</h3>
      </div>
      {chats &&
        chats.map((chat) => {
          console.log(chat);
          const uuid = uuidv4();
          return <p key={uuid}>{chat.text}</p>;
        })}
    </div>
  );
});
