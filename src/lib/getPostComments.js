import { db } from '../db/firebase';
import firebase from 'firebase';

export default async function getPostComments(postId) {
  const comments = await db
    .collection('comments')
    .where(firebase.firestore.FieldPath.documentId(), '==', postId)
    .get();
  const data = comments.docs.map((doc) => doc.data());
  return data;
}
