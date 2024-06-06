export const formatDate = (date) => {
    const updatedAt = new Date(date);
    const dateString = updatedAt.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
    const timeString = updatedAt.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    const formattedDateTime = `${dateString} - ${timeString}`;
    return formattedDateTime;
};