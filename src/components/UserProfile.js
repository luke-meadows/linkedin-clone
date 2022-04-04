import '../styles/UserProfile.css';
import { Avatar } from '@mui/material';
import useAddImage from '../hooks/useAddImage';
import CreatePost from '../components/CreatePost';
import { useEffect, useState } from 'react';
import { db } from '../db/firebase';
import { calculatePostTime } from '../lib/calculatePostTime';
import Post from './Post';
import FollowingButton from './FollowingButton';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import FollowerCount from './FollowerCount';
export default function UserProfile({ user }) {
  const loggedInUserId = useSelector(selectUser).userId;
  // Add user profile img hook
  const [setShowProfileImageModal, showProfileImageModal, ProfileImageModal] =
    useAddImage('profile');
  const [setShowBannerImageModal, showBannerImageModal, BannerImageModal] =
    useAddImage('banner');

  const [posts, setPosts] = useState();

  useEffect(async () => {
    db.collection('posts')
      .where('userId', '==', `${user.userId}`)
      .orderBy('createdAt', 'desc')
      .limit(15)
      .onSnapshot((posts) => {
        setPosts(posts.docs.map((doc) => doc.data()));
      });
  }, [user]);

  return (
    <div>
      <div className="profile__container">
        <div className="profile__container__top">
          <div
            className="profile__banner"
            onClick={() => setShowBannerImageModal(!showBannerImageModal)}
          >
            {user.bannerImage && (
              <img className="banner__image" src={user.bannerImage} alt="" />
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
        // move these to app level and add redux state to manage it
        {showProfileImageModal && <ProfileImageModal />}
        {showBannerImageModal && <BannerImageModal />}
        // ----------
        <div className="profile__container__bottom">
          <h2 className="user__display__name">{user.username}</h2>
          {/* If on personal profile show followers else show button to follow */}
          {loggedInUserId != user.userId ? (
            <div className="following__container">
              <div className="follow__button__container">
                <FollowingButton
                  loggedInUserId={loggedInUserId}
                  otherUserId={user.userId}
                  width="120px"
                />
              </div>
              <div className="follower__count">
                <FollowerCount userId={user.userId} />
              </div>
            </div>
          ) : (
            <div className="follower__count">
              <FollowerCount userId={loggedInUserId} />
            </div>
          )}
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
