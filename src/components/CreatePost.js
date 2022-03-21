import '../styles/CreatePost.css';
import ImageIcon from '@mui/icons-material/Image';
import VideoIcon from '@mui/icons-material/SlowMotionVideo';
import ProfileImage from './ProfileImage';
import useCreatePost from '../hooks/useCreatePost';

export default function CreatePost({ posts, setPosts }) {
  const { inputs, handleChange, handleSubmit, loading } = useCreatePost(
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
        <ProfileImage />
        {loading && <h4>Loading.</h4>}
        <div className="create__post__start__button">What's on your mind?</div>
        <div className="create__post__modal">
          <form className="create__post__form" onSubmit={handleSubmit}>
            <input
              className="create__post__text"
              required
              type="text"
              name="post"
              value={inputs.post}
              onChange={handleChange}
              placeholder="Start a post"
            />

            <input
              type="file"
              id="image"
              name="image"
              onChange={handleChange}
            />
          </form>
          {/* {preview && (
          <img src={preview} className="create__post__photo__preview" />
        )} */}
        </div>
      </div>
      <div className="create__post__bottom">
        <div className="post__icon">
          <ImageIcon style={{ color: '#0a66c2' }} />
          <p>Photo</p>
        </div>
        <div className="post__icon">
          <VideoIcon style={{ color: '#4fa44f' }} />
          <p>Video</p>
        </div>
      </div>
    </div>
  );
}
