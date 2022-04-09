import '../styles/CreatePost.css';
import CancelIcon from '@mui/icons-material/Add';
import useCreatePost from '../hooks/useCreatePost';
import { useDispatch } from 'react-redux';
import { toggleCreatePost } from '../features/createPost';

export default function CreatePostModal() {
  const dispatch = useDispatch();

  const {
    inputs,
    handleChange,
    handleSubmit,
    loading,
    preview,
    createPostModalVisible,
    setCreatePostModalVisible,
  } = useCreatePost({
    post: '',
    image: '',
  });
  return (
    <div className="create__post__modal">
      <CancelIcon
        onClick={() => {
          dispatch(toggleCreatePost(false));
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
            {/* <ImageIcon style={{ color: '#0a66c2' }} /> */}
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
  );
}
