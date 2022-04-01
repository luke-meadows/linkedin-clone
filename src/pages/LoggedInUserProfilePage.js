import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';

import UserProfile from '../components/UserProfile';

export default function LoggedInUserProfilePage() {
  const user = useSelector(selectUser);
  if (!user) return <p>Loading</p>;
  return (
    <div className="app__body profile__grid">
      <UserProfile user={user} />
    </div>
  );
}
