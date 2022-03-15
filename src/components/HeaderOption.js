import { Link } from 'react-router-dom';
import '../styles/HeaderOption.css';
export default function HeaderOption({ Icon, header, avatar, url }) {
  return (
    <Link to={url} className="Header__Option">
      {Icon && <Icon />}
      {avatar && <img src={avatar} />}
      <h3>{header}</h3>
    </Link>
  );
}
