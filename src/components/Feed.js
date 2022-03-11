import '../styles/Feed.css';
import CreatePost from './CreatePost';
import Post from './Post';
import portfolio from '../assets/portfolio.png';
import above from '../assets/above.png';
import roller from '../assets/roller.png';
export default function Feed() {
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
