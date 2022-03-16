export const calculatePostTime = (postTime) => {
  if (!postTime) return 'now';
  const timestamp = postTime.seconds * 1000;
  const secondsDifference = (Date.now() - timestamp) / 1000;

  const hours = Math.floor(secondsDifference / 1000 / 3600);
  let secondsRemaining = secondsDifference % 3600;
  const minutes = Math.floor(secondsRemaining / 60);
  secondsRemaining = secondsRemaining % 60;

  if (hours > 0) return `${hours} ${hours > 1 ? 'hours' : 'hour'} ago`;
  if (minutes > 0)
    return `${minutes} ${minutes > 1 ? 'minutes' : 'minute'} ago`;
  return `${Math.floor(secondsRemaining)} seconds ago`;
};
