import { db } from '../db/firebase';

export const getFeed = async () => {
  const posts = await db.collection('posts').orderBy('createdAt', 'desc').get();
  const data = posts.docs.map((doc) => doc.data());
  return data;
};
