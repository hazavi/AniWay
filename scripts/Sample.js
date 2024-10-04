
async function fetchSample() {
    const URL = `https://api.jikan.moe/v4/top/anime?filter=airing`;

    try {
        const response = await fetch(URL);
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}
fetchSample();