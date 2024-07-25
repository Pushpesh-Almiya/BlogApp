function convertTimestampToReadable(timestamp) {
    const date = new Date(timestamp);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC'
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }
  function convertTimestampToReadableTime(timestamp) {
    const date = new Date(timestamp);
    const options = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        timeZone: 'UTC'
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}

export {convertTimestampToReadable,convertTimestampToReadableTime}