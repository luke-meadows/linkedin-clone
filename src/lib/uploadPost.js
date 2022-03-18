import { db } from '../db/firebase';
import firebase from 'firebase';

export const uploadPost = async (postData) => {
  await db
    .collection('posts')
    .doc()
    .set({
      ...postData,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  return;
};
