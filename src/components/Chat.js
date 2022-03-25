import '../styles/Chat.css';
import getChats from '../lib/getChats';
import { useEffect } from 'react';

export default function Chat() {
  useEffect(async () => {
    const chats = await getChats();
    console.log(chats);
  }, []);
  return (
    <div className="chat">
      <div className="chat__top">
        <h3>Chat</h3>
      </div>
    </div>
  );
}
