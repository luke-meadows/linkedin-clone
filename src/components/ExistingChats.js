import { v4 as uuidv4 } from 'uuid';
export default function ExistingChats({ conversations, setActiveChat }) {
  return (
    <div>
      {conversations.map((convo) => {
        const key = uuidv4();
        return (
          <p
            className="recipient"
            key={key}
            onClick={() => setActiveChat(convo)}
          >
            {convo.participant}
          </p>
        );
      })}
    </div>
  );
}
