import { db } from '../db/firebase';

// export const getFeed = async () => {
//   const posts = await db.collection('posts').get();
//   const owners = []
//   const data = posts.docs.map((doc) => doc.data());
//   const postsWithUsers = data.map(async (post) => {
//     return await db
//       .collection('users')
//       .where('userId', '==', post.userId)
//       .get().then((querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//           setPostOwner(doc.data());
//         });
//       })
//   });
//   return postsWithUsers;
// };
