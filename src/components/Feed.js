import '../styles/Feed.css';
import CreatePost from './CreatePost';
import Post from './Post';
import portfolio from '../assets/portfolio.png';
import above from '../assets/above.png';
import roller from '../assets/roller.png';
import { useEffect, useState } from 'react';
import { db } from '../db/firebase';

export default function Feed() {
  const [posts, setPosts] = useState([]);

  const postsRef = db.collection('posts');
  var testPosts = postsRef.where('body', '==', 'test');

  useEffect(() => {
    // testPosts.get().then((snapshot) => {
    //   snapshot.forEach((shot) => console.log());
    // });
    // db.collection('posts').onSnapshot((snapshot) => {
    //   setPosts(
    //     snapshot.docs.map((doc) => {
    //       return {
    //         id: doc.id,
    //         data: doc.data(),
    //       };
    //     })
    //   );
    // });
  }, []);

  return (
    <div className="feed__container">
      <CreatePost />
      <Post
        text="My Portfolio, check it out!"
        image={portfolio}
        account="Luke Meadows"
        likes="Bare"
        comments="Loads of"
      />
      <Post
        text="Looking to finish the design off today for my Linkedin clone website. Then I will start mapping out the structure of the database."
        account="Luke Meadows"
        likes="Bare"
        comments="Loads of"
      />
      <Post
        text="A client project for an events company"
        image={above}
        account="Luke Meadows"
        likes="Bare"
        comments="Loads of"
      />
      <Post
        text="A project I will clone in the future. Sick!"
        image={roller}
        account="Luke Meadows"
        likes="Bare"
        comments="Loads of"
      />
    </div>
  );
}
