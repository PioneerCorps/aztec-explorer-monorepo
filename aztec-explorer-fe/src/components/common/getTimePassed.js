/**
 * Calculate how much time has passed since the given date string.
 * @param {string} dateString - The date string in ISO format (e.g., "2024-09-02T19:27:18.499Z").
 * @returns {string} - A string indicating the largest time frame that has passed (e.g., "2 days", "5 months", etc.), or an error message.
 */
export function timeSince(dateString) {
  const pastDate = new Date(dateString);
  if (isNaN(pastDate.getTime())) {
    console.error(
      "Cannot convert time. The date string may be in an incorrect format."
    );
    return "Invalid date format";
  }

  const now = new Date();

  const timeDifference = now - pastDate;

  // Constants for time calculations
  const millisecondsInSecond = 1000;
  const millisecondsInMinute = millisecondsInSecond * 60;
  const millisecondsInHour = millisecondsInMinute * 60;
  const millisecondsInDay = millisecondsInHour * 24;
  const millisecondsInWeek = millisecondsInDay * 7;
  const millisecondsInMonth = millisecondsInDay * 30;
  const millisecondsInYear = millisecondsInDay * 365;

  if (timeDifference >= millisecondsInYear) {
    const years = Math.floor(timeDifference / millisecondsInYear);
    return `${years} year${years > 1 ? "s" : ""}`;
  } else if (timeDifference >= millisecondsInMonth) {
    const months = Math.floor(timeDifference / millisecondsInMonth);
    return `${months} month${months > 1 ? "s" : ""}`;
  } else if (timeDifference >= millisecondsInWeek) {
    const weeks = Math.floor(timeDifference / millisecondsInWeek);
    return `${weeks} week${weeks > 1 ? "s" : ""}`;
  } else if (timeDifference >= millisecondsInDay) {
    const days = Math.floor(timeDifference / millisecondsInDay);
    return `${days} day${days > 1 ? "s" : ""}`;
  } else if (timeDifference >= millisecondsInHour) {
    const hours = Math.floor(timeDifference / millisecondsInHour);
    return `${hours} hour${hours > 1 ? "s" : ""}`;
  } else if (timeDifference >= millisecondsInMinute) {
    const minutes = Math.floor(timeDifference / millisecondsInMinute);
    return `${minutes} minute${minutes > 1 ? "s" : ""}`;
  } else {
    const seconds = Math.floor(timeDifference / millisecondsInSecond);
    return `${seconds} second${seconds > 1 ? "s" : ""}`;
  }
}

export function formatDate(dateString) {
  const date = new Date(dateString);

  // Manually extract and format each part of the date
  const year = date.getUTCFullYear();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getUTCMonth()]; // Get the short month name
  const day = String(date.getUTCDate()).padStart(2, "0"); // Ensure two digits for day

  const hours = date.getUTCHours() % 12 || 12; // Convert to 12-hour format
  const minutes = String(date.getUTCMinutes()).padStart(2, "0"); // Ensure two digits for minutes
  const seconds = String(date.getUTCSeconds()).padStart(2, "0"); // Ensure two digits for seconds

  const period = date.getUTCHours() >= 12 ? "PM" : "AM";

  return `${month}-${day}-${year} ${hours}:${minutes}:${seconds} ${period} UTC`;
}
