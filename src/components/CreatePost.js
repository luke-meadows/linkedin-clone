import '../styles/CreatePost.css';
import ImageIcon from '@mui/icons-material/Image';
import ProfileImage from './ProfileImage';
import useCreatePost from '../hooks/useCreatePost';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectDisableScreen,
  toggleDisableScreen,
} from '../features/disableScreen';
import { useEffect } from 'react';

export default function CreatePost({ posts, setPosts, withPhoto }) {
  const disableScreen = useSelector(selectDisableScreen);
  const dispatch = useDispatch();
  const {
    inputs,
    handleChange,
    handleSubmit,
    loading,
    preview,
    createPostModalVisible,
    setCreatePostModalVisible,
  } = useCreatePost(
    {
      post: '',
      image: '',
    },
    setPosts,
    posts
  );
  useEffect(() => {
    dispatch(toggleDisableScreen(createPostModalVisible));
  }, [createPostModalVisible]);
  return (
    <div className="create__post">
      <div className="create__post__top">
        {withPhoto && <ProfileImage withMargin />}
        {loading && <h4>Loading.</h4>}
        <div
          className="create__post__start__button"
          onClick={() => {
            console.log('click');
            setCreatePostModalVisible(true);
          }}
        >
          What's on your mind?
        </div>

        {createPostModalVisible && (
          <div className="create__post__modal">
            <AddIcon
              onClick={() => {
                setCreatePostModalVisible(false);
              }}
            />
            <form className="create__post__form" onSubmit={handleSubmit}>
              <textarea
                className="create__post__text"
                required
                name="post"
                value={inputs.post}
                onChange={handleChange}
                placeholder="Start a post"
              />
              <label htmlFor="image">
                <div style={{ textAlign: 'left' }}>
                  <ImageIcon style={{ color: '#0a66c2' }} />
                </div>
              </label>
              <input
                style={{ display: 'none' }}
                type="file"
                id="image"
                name="image"
                onChange={handleChange}
              />
              {preview && (
                <>
                  <img src={preview} className="create__post__photo__preview" />
                </>
              )}
              <button type="submit" className="create__post__button">
                Post
              </button>
            </form>
          </div>
        )}
      </div>
      <div className="create__post__bottom">
        {/* <div className="post__icon">
          <ImageIcon style={{ color: '#0a66c2' }} />
          <p>Photo</p>
        </div> */}
        {/* <div className="post__icon">
          <VideoIcon style={{ color: '#4fa44f' }} />
          <p>Video</p>
        </div> */}
      </div>
    </div>
  );
}
