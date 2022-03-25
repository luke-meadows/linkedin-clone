import { db } from '../db/firebase';
import { getUser } from './getUser';

export default async function getPostComments(postId) {
  const comments = await db
    .collection('comments')
    .doc(postId)
    .collection('postComments')
    .orderBy('createdAt', 'desc')
    .get();
  const data = comments.docs.map((doc) => doc.data());

  let uniqueCommentOwners = [...new Set(data.map((data) => data.owner))];
  const promises = [];
  promises.push(data);
  uniqueCommentOwners.forEach((userId) => {
    promises.push(getUser(userId));
  });

  return Promise.all(promises);
}
