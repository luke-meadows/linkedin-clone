import { useState } from 'react';
import '../styles/Network.css';
export default function Network() {
  const [users, setUsers] = useState([]);
  return (
    <div className="network__container">
      <div className="profile">
        <div className="top__section">
          <img src="" alt="" className="banner" />
        </div>
      </div>
      <div className="profile"></div>
      <div className="profile"></div>
      <div className="profile"></div>
      <div className="profile"></div>
      <div className="profile"></div>
      <div className="profile"></div>
      <div className="profile"></div>
    </div>
  );
}
