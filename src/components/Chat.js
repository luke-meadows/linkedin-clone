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
  const loggedInUser = useSelector(selectUser);
  const [conversations, setConversations] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [selectUserToChatOpen, setSelectUserToChatOpen] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  useEffect(async () => {
    // const userConversations = await getChats(loggedInUser.uid);
    const getChatIds = await db
      .collection('users')
      .doc(loggedInUser.uid)
      .collection('chats')
      .onSnapshot((querySnapshot) => {
        var returnedChats = [];
        querySnapshot.forEach((doc) => {
          returnedChats.push(doc.data());
        });
        setConversations(returnedChats);
      });
    // const chatIds = getChatIds.docs.map((doc) => doc.data());
  }, []);

  async function getAllUsers() {
    const users = await db
      .collection('users')
      .where('userId', '!=', loggedInUser.uid)
      .get();
    const userData = users.docs.map((doc) => doc.data());
    setAllUsers(userData);
  }

  function startNewChat(recipient) {
    // first check if convo already exists
    const convoExistsIdx = conversations.findIndex(
      (convo) => convo.participantId === recipient.userId
    );
    // if so set active chat to that chat
    if (convoExistsIdx >= 0) {
      setActiveChat(conversations[convoExistsIdx]);
      setSelectUserToChatOpen(false);
      return;
    } else {
      // if chat between that user does not exist
      db.collection('chats')
        .add({})
        .then((docRef) => {
          setActiveChat({
            id: docRef.id,
            participant: recipient.username,
            participantId: recipient.userId,
          });
          return docRef;
        })
        .then((docRef) => {
          // add record in recipient user doc chats collection
          db.collection('users')
            .doc(recipient.userId)
            .collection('chats')
            .doc()
            .set({
              id: docRef.id,
              participant: `${loggedInUser.firstName} ${loggedInUser.lastName}`,
              participantId: loggedInUser.uid,
            });
          // add record in logged in user's user doc chats collection
          db.collection('users')
            .doc(loggedInUser.uid)
            .collection('chats')
            .doc()
            .set({
              id: docRef.id,
              participant: recipient.username,
              participantId: recipient.userId,
            });
        })
        .catch(function (error) {});
    }
    setSelectUserToChatOpen(false);
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
            <p onClick={() => startNewChat(user)} key={user.userId}>
              {user.username}
            </p>
          ))}
        </div>
      )}
    </div>
  );
});
