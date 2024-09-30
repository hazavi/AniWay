// Get the current year and season dynamically
function getCurrentYearAndSeason() {
    const now = new Date();
    const year = now.getFullYear();
    
    // Determine the current season based on the month
    const month = now.getMonth(); // January is 0, December is 11
    let season = '';

    if (month >= 0 && month <= 2) {
        season = 'winter';
    } else if (month >= 3 && month <= 5) {
        season = 'spring';
    } else if (month >= 6 && month <= 8) {
        season = 'summer';
    } else if (month >= 9 && month <= 11) {
        season = 'fall';
    }

    return { year, season };
}

// Fetch anime data for the current year and season
async function fetchNowYearSeason() {
    const { year, season } = getCurrentYearAndSeason(); // Get current year and season
    const URL = `https://api.jikan.moe/v4/seasons/${year}/${season}`;

    try {
        const response = await fetch(URL);
        const result = await response.json();
        displayResults(result.data); // Display the results
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Display the fetched anime results
function displayResults(animes) {
    const container = document.querySelector('.display-container');
    container.innerHTML = ''; // Clear previous content

    animes.forEach(anime => {
        const animeElement = document.createElement('div');
        animeElement.classList.add('anime-item');

        const image = document.createElement('img');
        image.src = anime.images.jpg.large_image_url;
        image.alt = anime.title;

        const title = document.createElement('h2');
        title.textContent = anime.title;

        animeElement.appendChild(image);
        animeElement.appendChild(title);
        container.appendChild(animeElement);

        // Redirect to the anime info page when clicked
        animeElement.addEventListener('click', () => {
            window.location.href = `AnimeInfo.html?id=${anime.mal_id}`;
        });
    });
}

// On page load, fetch the current season's anime
document.addEventListener('DOMContentLoaded', fetchNowYearSeason);
