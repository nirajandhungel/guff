export function formatMessageTimestamp(timestamp) {
  const now = new Date();
  const date = new Date(timestamp);

  const diffInSeconds = Math.floor((now - date) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  // 1. Just now
  if (diffInSeconds < 60) return "Just now";

  // 2. Minutes ago
  if (diffInMinutes < 60) return `${diffInMinutes} min${diffInMinutes > 1 ? "s" : ""}`;

  // 3. Hours ago
  if (diffInHours < 24) return `${diffInHours} hr${diffInHours > 1 ? "s" : ""}`;

  // 4. Yesterday
  if (diffInDays === 1) return "Yesterday";

  // 5. Same year: Show like "12 Jan"
  const sameYear = now.getFullYear() === date.getFullYear();
  const options = { day: "numeric", month: "short" };

  if (sameYear) return date.toLocaleDateString("en-US", options);

  // 6. Previous year: Show like "12 Jan 2024"
  return date.toLocaleDateString("en-US", { ...options, year: "numeric" });
}
