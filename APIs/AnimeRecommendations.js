
async function fetchRandomAnime() {
    const URL = 'https://api.jikan.moe/v4/recommendations/anime';

    try {
        const response = await fetch(URL);
        const result = await response.json();
        console.log(result);
        displaySchedules(result);
    } catch (error) {
        console.error(error);
    }
}
fetchRandomAnime();