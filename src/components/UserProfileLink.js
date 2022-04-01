import { Link } from 'react-router-dom';
export const profileLinkStyle = {
  fontSize: '14px',
  fontWeight: 600,
  textDecoration: 'none',
  color: 'black',
};
export default function UserProfileLink({ user }) {
  // direct logged in user to /profile
  return (
    <Link style={profileLinkStyle} to={`profile/${user.userId}`}>
      {user.username}
    </Link>
  );
}
