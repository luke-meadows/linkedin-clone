import '../styles/Chat.css';
import getChats from '../lib/getChats';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { v4 as uuidv4 } from 'uuid';
import Conversation from './Conversation';
import AddIcon from '@mui/icons-material/Add';
import { db } from '../db/firebase';

export const Chat = React.memo(() => {
  const user = useSelector(selectUser);
  const [conversations, setConversations] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [selectUserToChatOpen, setSelectUserToChatOpen] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(async () => {
    const userConversations = await getChats(user.uid);
    setConversations(userConversations);
  }, []);

  async function getAllUsers() {
    const users = await db
      .collection('users')
      .where('userId', '!=', user.uid)
      .get();
    const userData = users.docs.map((doc) => doc.data());
    setAllUsers(userData);
  }

  return (
    <div className="chat">
      <div className="chat__top">
        <h3>Chat</h3>
        <AddIcon
          onClick={async () => {
            getAllUsers();
            setSelectUserToChatOpen(!selectUserToChatOpen);
          }}
        />
      </div>
      {conversations.map((convo) => {
        const key = uuidv4();
        return (
          <p key={key} onClick={() => setActiveChat(convo)}>
            {convo.participant}
          </p>
        );
      })}

      {activeChat && (
        <Conversation conversation={activeChat} setActiveChat={setActiveChat} />
      )}

      {selectUserToChatOpen && (
        <div className="select__user__to__chat">
          {allUsers?.map((user) => (
            <p key={user.userId}>{user.username}</p>
          ))}
        </div>
      )}
    </div>
  );
});
