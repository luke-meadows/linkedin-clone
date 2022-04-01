import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUser } from '../features/userSlice';
export const profileLinkStyle = {
  fontSize: '14px',
  fontWeight: 600,
  textDecoration: 'none',
  color: 'black',
};
export default function UserProfileLink({ user }) {
  // direct logged in user to /profile
  const loggedInUser = useSelector(selectUser);
  console.log(loggedInUser);
  const path =
    loggedInUser.userId === user.userId
      ? '/profile'
      : `/profile/${user.userId}`;
  return (
    <Link style={profileLinkStyle} to={path}>
      {user.username}
    </Link>
  );
}
