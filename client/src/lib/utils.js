export function formatMessageTimestamp(timestamp) {
  return new Date(timestamp).toLocaleDateString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}