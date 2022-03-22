import { db } from '../db/firebase';

export default function hasUserLikedPost(postId, userId) {
  return new Promise((resolve, reject) => {
    var docRef = db.collection('likes').doc(`${postId}_${userId}`);
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          resolve(true);
        } else {
          // doc.data() will be undefined in this case
          resolve(false);
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  });
}
