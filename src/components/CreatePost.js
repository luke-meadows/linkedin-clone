import '../styles/CreatePost.css';
import ImageIcon from '@mui/icons-material/Image';
import VideoIcon from '@mui/icons-material/SlowMotionVideo';
import ProfileImage from './ProfileImage';
import useCreatePost from '../hooks/useCreatePost';

export default function CreatePost({ posts, setPosts, withPhoto }) {
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
                <ImageIcon style={{ color: '#0a66c2' }} />
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
