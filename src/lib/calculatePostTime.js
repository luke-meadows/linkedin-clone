export const calculatePostTime = (postTime) => {
  if (!postTime) return 'now';
  const timestamp = postTime.seconds * 1000;
  const secondsDifference = (Date.now() - timestamp) / 1000;

  const days = Math.floor(secondsDifference / 86400);
  let secondsRemaining = secondsDifference % 86400;
  const hours = Math.floor(secondsRemaining / 3600);
  secondsRemaining = secondsDifference % 3600;
  const minutes = Math.floor(secondsRemaining / 60);
  secondsRemaining = secondsRemaining % 60;

  if (days > 0) return `${days} ${days > 1 ? 'days' : 'day'} ago`;

  if (hours > 0 && days < 1)
    return `${hours} ${hours > 1 ? 'hours' : 'hour'} ago`;

  if (minutes > 0 && hours < 1 && days < 1)
    return `${minutes} ${minutes > 1 ? 'minutes' : 'minute'} ago`;

  return `${Math.floor(secondsRemaining)} seconds ago`;
};
