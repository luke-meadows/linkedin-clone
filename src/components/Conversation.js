import { useEffect, useRef, useState } from 'react';
import { db } from '../db/firebase';
import { v4 as uuidv4 } from 'uuid';
import CloseIcon from '@mui/icons-material/Close';
import firebase from 'firebase';
import '../styles/Chat.css';
import { selectUser } from '../features/userSlice';
import { useSelector } from 'react-redux';
import { profileLinkStyle } from './UserProfileLink';
import { Link } from 'react-router-dom';
import { clearNotifications } from '../lib/clearNotifications';

export default function Conversation({ conversation, setActiveChat }) {
  const loggedInUser = useSelector(selectUser);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesRef = useRef();
  useEffect(() => {
    // Collect the messages from the chat id
    const getChats = db
      .collection('chats')
      .doc(conversation.id)
      .collection('messages')
      .orderBy('createdAt', 'asc')
      .limit(20)
      .onSnapshot((querySnapshot) => {
        var returnedMessages = [];
        querySnapshot.forEach((doc) => {
          returnedMessages.push(doc.data());
        });
        setMessages(returnedMessages);
      });
    return () => getChats();
  }, []);

  useEffect(() => {
    clearNotifications(conversation.participantId, loggedInUser.userId);
  }, [messages]);

  useEffect(() => {
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [messages]);

  function sendMessage(e) {
    e.preventDefault();
    db.collection('chats')
      .doc(conversation.id)
      .collection('messages')
      .doc()
      .set({
        message: messageText,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        owner: loggedInUser.userId,
      });
    setMessageText('');
  }

  return (
    <div>
      <div className="conversation">
        <div className="conversation__top">
          <Link
            style={profileLinkStyle}
            to={`profile/${conversation.participantId}`}
          >
            {conversation.participant}
          </Link>
          <CloseIcon onClick={() => setActiveChat(null)} />
        </div>
        <div>
          <div className="conversation__messages" ref={messagesRef}>
            {messages?.map((message) => {
              const key = uuidv4();
              return (
                <p
                  key={key}
                  className={
                    message.owner === loggedInUser.userId
                      ? 'message sent'
                      : 'message received'
                  }
                >
                  {message.message}
                </p>
              );
            })}
          </div>
          <form action="" onSubmit={sendMessage} className="conversation__form">
            <input
              placeholder="Say something"
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}
