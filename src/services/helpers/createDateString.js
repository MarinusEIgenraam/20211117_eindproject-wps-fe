export default function createDateString(timestamp) {
    const day = new Date(timestamp * 1000);

    return day.toLocaleDateString('us-EN', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
}