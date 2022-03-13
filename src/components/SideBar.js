import '../styles/Sidebar.css';
import { Avatar } from '@mui/material';
import BannerImage from '../assets/abstract-cosmic-gravity-field-with-2-planets-vector.jpeg';

export default function SideBar({ logout }) {
  const topic = (topic) => {
    return (
      <div className="topic__container">
        <div className="hashtag">#</div>
        <div className="topic__text">{topic}</div>
      </div>
    );
  };

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <img src={BannerImage} alt="" />
        <Avatar sx={{ height: '60px', width: '60px' }} />
        <h2>Welcome, Luke!</h2>
        <h6>hello@lukemeadows.dev</h6>
      </div>
      <div className="sidebar__stats">
        <div className="sidebar__stat">
          <p>Who viewed you</p>
          <p>1,111</p>
        </div>
        <div className="sidebar__stat">
          <p>Views on post</p>
          <p>2,341</p>
        </div>
      </div>
      <div className="sidebar__bottom">
        <h6>Followed Hashtags</h6>
        {topic('react')}
        {topic('webdevelopment')}
        {topic('softwareengineering')}
        {topic('fullstack')}
      </div>
      <button onClick={logout}>logout</button>
    </div>
  );
}
