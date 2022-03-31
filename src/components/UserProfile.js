import '../styles/UserProfile.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { Avatar } from '@mui/material';
import useAddImage from '../hooks/useAddImage';
import CreatePost from '../components/CreatePost';
import { useEffect, useState } from 'react';
import { db } from '../db/firebase';
import { calculatePostTime } from '../lib/calculatePostTime';
import Post from './Post';
export default function UserProfile() {
  const user = useSelector(selectUser);
  console.log(user.uid);

  // Add user profile img hook
  const [setShowProfileImageModal, showProfileImageModal, ProfileImageModal] =
    useAddImage('profile');
  const [setShowBannerImageModal, showBannerImageModal, BannerImageModal] =
    useAddImage('banner');

  const [posts, setPosts] = useState();

  useEffect(async () => {
    db.collection('posts')
      .where('userId', '==', `${user.uid}`)
      .orderBy('createdAt', 'desc')
      .limit(15)
      .onSnapshot((posts) => {
        setPosts(posts.docs.map((doc) => doc.data()));
      });
  }, [user]);

  if (!user.bannerPic) return <h1>Loading...</h1>;
  return (
    <div>
      <div className="profile__container">
        <div className="user__profile__left__top">
          <div className="profile__container__top">
            <div
              className="profile__banner"
              onClick={() => setShowBannerImageModal(!showBannerImageModal)}
            >
              {user.bannerPic && (
                <img className="banner__image" src={user.bannerPic} alt="" />
              )}
            </div>

            {/* Display user image if there is one set */}
            {user.profilePic ? (
              <img
                className="profile__image"
                src={user.profilePic}
                alt=""
                onClick={() => setShowProfileImageModal(!showProfileImageModal)}
              />
            ) : (
              <Avatar
                className="profile__image"
                style={{ width: '100px', height: '100px' }}
                onClick={() => setShowProfileImageModal(!showProfileImageModal)}
              />
            )}
          </div>

          {showProfileImageModal && <ProfileImageModal />}
          {showBannerImageModal && <BannerImageModal />}

          <div className="profile__container__bottom">
            <h2 className="user__display__name">
              {user.firstName + ' ' + user.lastName}
            </h2>
          </div>
        </div>
        <CreatePost />
      </div>
      <div className="feed__container">
        {posts?.map((post, i) => {
          const time = calculatePostTime(post.createdAt);
          return (
            <Post
              key={post.userId + i}
              text={post.content}
              image={post.image || null}
              userId={post.userId}
              likes={post.likeCount}
              comments={post.commentCount}
              time={time}
              postId={post.postId}
            />
          );
        })}
      </div>
    </div>
  );
}
