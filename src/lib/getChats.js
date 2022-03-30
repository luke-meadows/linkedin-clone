import { db } from '../db/firebase';
export default async function getChats(user) {
  const promises = [];

  // First get the list of the users chat IDs from the user collection
  const getChatIds = await db
    .collection('users')
    .doc(user)
    .collection('chats')
    .get();
  const chatIds = getChatIds.docs.map((doc) => doc.data());
  return chatIds;
}

async function getMessages(chat) {
  // Fetch messages by querying the chat ID
  const idArr = await db
    .collection('chats')
    .doc(chat.id)
    .collection('messages')
    .get();
  const messages = idArr.docs.map((doc) => {
    console.log(doc.data());
    return {
      chatId: chat.id,
      messages: doc.data(),
      participant: chat.participant,
    };
  });
  return messages[0];
}
