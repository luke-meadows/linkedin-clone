import { useEffect, useState } from 'react';
import { db } from '../db/firebase';
import { v4 as uuidv4 } from 'uuid';
import CloseIcon from '@mui/icons-material/Close';

import '../styles/Chat.css';

export default function Conversation({ conversation }) {
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState([]);
  const [conversationOpen, setConversationOpen] = useState(false);
  const [conversationWindowOpen, setConversationWindowOpen] = useState(false);
  const [activeConversation, setActiveConversation] = useState({});
  useEffect(async () => {
    // Collect the messages from the chat Id
    db.collection('chats')
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
    // return () => setFullscreen(false);
  }, []);

  useEffect(() => {
    if (!conversationOpen) return;
    setActiveConversation({
      participant: conversation.participant,
      messages: messages,
    });
  }, [messages]);

  function openConversation() {
    console.log('click');
    setConversationOpen(true);
    setActiveConversation({
      participant: conversation.participant,
      messages: messages,
    });
    setConversationWindowOpen(true);
  }

  return (
    <div>
      <p className="conversation__button" onClick={openConversation}>
        {conversation.participant}
      </p>
      {conversationWindowOpen && (
        <div className="conversation">
          <div className="conversation__top">
            <h6>{activeConversation.participant}</h6>
            <CloseIcon onClick={() => setConversationWindowOpen(false)} />
          </div>
          <div className="conversation__messages">
            {activeConversation.messages.map((message, i) => {
              const key = uuidv4();
              return (
                <p
                  key={key}
                  className={i % 2 > 0 ? 'message sent' : 'message received'}
                >
                  {message.message}
                </p>
              );
            })}
          </div>
          <form action="">
            <input
              placeholder="Say something"
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
            />
            <button>Send</button>
          </form>
        </div>
      )}
    </div>
  );
}
