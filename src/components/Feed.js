import '../styles/Feed.css';
import CreatePost from './CreatePost';
import Post from './Post';
import portfolio from '../assets/portfolio.png';
import { useEffect, useState } from 'react';
import { db } from '../db/firebase';
import { logRoles } from '@testing-library/react';

export default function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection('posts').onSnapshot((snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            data: doc.data(),
          };
        })
      );
    });
  }, []);

  return (
    <div className="feed__container">
      <CreatePost />
      {posts.map((post, key) => {
        return (
          <Post
            key={key}
            text={post.data.content}
            image={portfolio}
            userId={post.data.userId}
            likes={post.data.likeCount}
            comments={post.data.commentCount}
          />
        );
      })}
      {/* <Post
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
      /> */}
    </div>
  );
}
