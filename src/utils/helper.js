export function formatDate(date) {
  const today = new Date();
  const diffTime = Math.abs(today - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    if (diffHours === 0) {
      if (diffMinutes === 0) {
        return "~1 minute ago";
      } else if (diffMinutes === 1) {
        return "1 minute ago";
      } else {
        return `${diffMinutes} minutes ago`;
      }
    } else if (diffHours === 1) {
      return "1 hour ago";
    } else {
      return `${diffHours} hours ago`;
    }
  } else if (diffDays <= 7) {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[date.getDay()];
  } else {
    return date.toLocaleDateString();
  }
}
