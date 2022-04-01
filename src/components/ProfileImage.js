import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';

export default function ProfileImage({ withMargin }) {
  const user = useSelector(selectUser);

  return (
    <div style={withMargin ? { marginRight: '10px' } : {}}>
      {user.profilePic ? (
        <img
          src={user.profilePic}
          alt=""
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            margin: ' 0 0 -2px 0 ',
            cursor: 'pointer',
            objectFit: 'cover',
          }}
        />
      ) : (
        <Avatar style={{ width: '50px', height: '50px', cursor: 'pointer' }} />
      )}
    </div>
  );
}
