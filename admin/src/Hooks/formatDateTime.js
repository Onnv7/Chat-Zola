export const formatDateTime = (time) => {
    const epochTime = Date.parse(time);
    const result = new Date(epochTime);
    const timeString = result.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateString = result.toDateString();
    return timeString + dateString
}