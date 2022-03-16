import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';

export default function ProfileImage() {
  const user = useSelector(selectUser);

  return (
    <div>
      {user.profilePic ? (
        <img
          src={user.profilePic}
          alt=""
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            margin: ' 0 0 -2px 0 ',
            cursor: 'pointer',
          }}
        />
      ) : (
        <Avatar style={{ width: '50px', height: '50px', cursor: 'pointer' }} />
      )}
    </div>
  );
}
