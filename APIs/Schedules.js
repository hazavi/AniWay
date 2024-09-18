
async function fetchSchedules() {
    const URL = 'https://api.jikan.moe/v4/schedules';

    try {
        const response = await fetch(URL);
        const result = await response.json();
        console.log(result);
        
    } catch (error) {
        console.error(error);
    }
}

fetchSchedules();