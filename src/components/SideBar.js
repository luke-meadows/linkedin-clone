import '../styles/Sidebar.css';
import { Avatar } from '@mui/material';
import { useEffect } from 'react';
import BannerImage from '../assets/abstract-cosmic-gravity-field-with-2-planets-vector.jpeg';

export default function SideBar() {
  useEffect(() => {});
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <img src={BannerImage} alt="" />
        <Avatar />
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
          <p>1,111</p>
        </div>
      </div>
      <div className="sidebar__bottom">
        <p>Recent</p>
      </div>
    </div>
  );
}
