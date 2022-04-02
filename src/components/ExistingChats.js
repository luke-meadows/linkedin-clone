import { v4 as uuidv4 } from 'uuid';
export default function ExistingChats({ conversations, setActiveChat }) {
  return (
    <div>
      {conversations.map((convo) => {
        const key = uuidv4();
        return (
          <div
            className="recipient"
            key={key}
            onClick={() => setActiveChat(convo)}
          >
            <p>{convo.participant}</p>
            {convo.notifications && <span>{convo.notifications}</span>}
          </div>
        );
      })}
    </div>
  );
}
