import { db } from '../db/firebase';

export const getUser = async (userId) => {
  const user = await db.collection('users').where('userId', '==', userId).get();
  const userData = user.docs.map((doc) => doc.data())[0];
  return userData;
};
export const getUsers = async (userId) => {
  const users = await db.collection('users').get();
  const userData = users.docs.map((doc) => doc.data());
  return userData;
};
