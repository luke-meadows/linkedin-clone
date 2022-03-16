import { useEffect } from 'react';
import { getFeed } from '../lib/getFeed';

export default function Test() {
  useEffect(async () => {
    // const feed = await getFeed();
    // console.log(feed);
  }, []);
  return <div>TEST</div>;
}
