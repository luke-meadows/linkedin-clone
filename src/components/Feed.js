import '../styles/Feed.css';
import CreatePost from './CreatePost';
import Post from './Post';
import portfolio from '../assets/portfolio.png';
import { useEffect, useState } from 'react';
import { db } from '../db/firebase';
import { logRoles } from '@testing-library/react';
import { calculatePostTime } from '../lib/calculatePostTime';

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
      {!posts && <h6>loading</h6>}
      {posts &&
        posts.map((post, key) => {
          const { data } = post;
          console.log(data.createdAt);
          const time = calculatePostTime(data.createdAt);
          return (
            <Post
              key={key}
              text={data.content}
              image={portfolio}
              userId={data.userId}
              likes={data.likeCount}
              comments={data.commentCount}
              time={time}
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
