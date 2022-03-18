import { getUser } from './getUser';

export async function getBannerImg(uid) {
  const user = await getUser(uid);
  return user[0].bannerImage;
}
