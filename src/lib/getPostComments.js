import { db } from '../db/firebase';
import firebase from 'firebase';

export default async function getPostComments(postId) {
  const comments = await db
    .collection('comments')
    .doc(postId)
    .collection('postComments')
    .get();
  const data = comments.docs.map((doc) => doc.data());
  return data;
}
