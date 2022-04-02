import { useEffect, useState } from 'react';
import UserProfile from '../components/UserProfile';
import { getUser } from '../lib/getUser';
import { useLocation } from 'react-router-dom';

export default function ProfilePage() {
  const location = useLocation();
  const userId = location.pathname.split('/')[2];
  const [user, setUser] = useState();
  useEffect(async () => {
    const user = await getUser(userId);
    setUser(user);
  }, [userId]);
  if (!user) return <p>Loading</p>;
  return (
    <div className="app__body profile__grid">
      <UserProfile user={user} />
    </div>
  );
}
