import { useEffect } from 'react';
export default function Conversation({ conversation }) {
  useEffect(() => {}, []);
  return (
    <div>
      <p>{conversation.participant}</p>
    </div>
  );
}
