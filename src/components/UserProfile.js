import '../styles/UserProfile.css';
import { Avatar } from '@mui/material';
import CreatePost from '../components/CreatePost';
import { useEffect, useState } from 'react';
import { db } from '../db/firebase';
import { calculatePostTime } from '../lib/calculatePostTime';
import Post from './Post';
import FollowingButton from './FollowingButton';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import FollowerCount from './FollowerCount';
import { showModal } from '../features/addPhoto';
import ScrollContainer from './ScrollContainer';
import SidePanel from './SidePanel';
import ProfileInfo from './ProfileInfo';

export default function UserProfile({ user }) {
  const loggedInUserId = useSelector(selectUser).userId;
  const isThisLoggedInUserProfile = loggedInUserId === user.userId;

  const dispatch = useDispatch();
  function handleImageClick(e) {
    dispatch(
      showModal({
        showModal: true,
        photoToBeUpdated: e.currentTarget.dataset.imagetype,
      })
    );
  }

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
            className={
              isThisLoggedInUserProfile
                ? 'profile__banner '
                : 'profile__banner pointer__events__off'
            }
            data-imagetype="banner"
            onClick={handleImageClick}
          >
            {user.bannerImage && (
              <img className="banner__image" src={user.bannerImage} alt="" />
            )}
          </div>

          {/* Display user image if there is one set */}
          {user.profilePic ? (
            <img
              data-imagetype="profile"
              className={
                isThisLoggedInUserProfile
                  ? 'profile__image '
                  : 'profile__image pointer__events__off'
              }
              src={user.profilePic}
              alt=""
              onClick={handleImageClick}
            />
          ) : (
            <Avatar
              data-imagetype="profile"
              className={
                isThisLoggedInUserProfile
                  ? 'profile__image '
                  : 'profile__image pointer__events__off'
              }
              style={{ width: '100px', height: '100px' }}
              onClick={handleImageClick}
            />
          )}
        </div>

        <div className="profile__container__bottom ">
          <h2 className="user__display__name">{user.username}</h2>
          {/* If on personal profile show followers else show button to follow */}
          {!isThisLoggedInUserProfile ? (
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
      <div className="profile__bottom">
        <ProfileInfo />
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
    </div>
  );
}
