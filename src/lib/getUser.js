import { db } from '../db/firebase';

export const getUser = async (userId) => {
  const user = await db.collection('users').where('userId', '==', userId).get();
  const userData = user.docs.map((doc) => doc.data());
  return userData;
};
