import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import '../styles/HeaderOption.css';
export default function HeaderOption({ Icon, header, avatar, url }) {
  return (
    <Link to={url} className="Header__Option">
      {avatar && <img src={avatar} />}
      {!avatar && !Icon && <Avatar style={{ height: '45px', width: '45px' }} />}
      {Icon && <Icon />}
      {header && <p>{header}</p>}
    </Link>
  );
}
