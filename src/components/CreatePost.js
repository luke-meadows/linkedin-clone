import '../styles/CreatePost.css';
import ProfileImage from './ProfileImage';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDisableScreen } from '../features/disableScreen';
import { useEffect } from 'react';
import { selectCreatePost, toggleCreatePost } from '../features/createPost';

export default function CreatePost({ withPhoto }) {
  const dispatch = useDispatch();
  const createPostModalOpen = useSelector(selectCreatePost);

  useEffect(() => {
    dispatch(toggleDisableScreen(createPostModalOpen));
  }, [createPostModalOpen]);
  return (
    <div className="create__post">
      <div className="create__post__top">
        {withPhoto && <ProfileImage withMargin />}
        {/* {loading && <h4>Loading.</h4>} */}
        <div
          className="create__post__start__button"
          onClick={() => {
            console.log('click');
            dispatch(toggleCreatePost(true));
          }}
        >
          What's on your mind?
        </div>
      </div>
    </div>
  );
}
