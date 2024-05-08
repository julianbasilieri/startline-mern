export const getElapsedTime = (createdAt) => {
    const now = new Date();
    const createdTime = new Date(createdAt);
    const timeDifference = now - createdTime;
    const minutes = Math.floor(timeDifference / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) {
        return `${minutes} min ago`;
    } else if (hours < 24) {
        return `${hours} hr ago`;
    } else {
        return `${days} day${days !== 1 ? 's' : ''} ago`;
    }
};

