async function fetchSeasonUpcoming() {
    const URL = 'https://api.jikan.moe/v4/seasons/upcoming';

    try {
        await delay(1000); // Delay to simulate loading time
        const response = await fetch(URL);

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const result = await response.json();
        displaySeasonUpcoming(result.data.slice(0, 5)); // Display only top 5 entries
    } catch (error) {
        console.error(error);
        const container = document.querySelector('.season-upcoming-container');
        container.innerHTML = `<p class="error-message">Failed to load data. Please try again later.</p>`;
    }
}

function displaySeasonUpcoming(animeList) {
    const container = document.querySelector('.season-upcoming-container');
    container.innerHTML = ''; // Clear previous content

    // Add "Season Upcoming" header
    const header = document.createElement('h3');
    header.textContent = 'Season Upcoming';
    header.classList.add('season-upcoming-header');
    container.appendChild(header);

    // Loop through the anime list and display each anime
    animeList.forEach((anime, index) => {
        const animeElement = document.createElement('div');
        animeElement.classList.add('top-item');
        animeElement.addEventListener('click', () => {
            window.location.href = `AnimeInfo.html?id=${anime.mal_id}`;
        });

        // Add rank number
        const rank = document.createElement('span');
        rank.textContent = index + 1;
        rank.classList.add('rank');
        animeElement.appendChild(rank);

        // Add anime image (check for image existence)
        if (anime.images?.jpg?.image_url) {
            const animeImage = document.createElement('img');
            animeImage.src = anime.images.jpg.image_url;
            animeImage.alt = anime.title || 'Anime Image';
            animeImage.title = anime.title || 'Anime'; // Tooltip with full title on hover
            animeElement.appendChild(animeImage);
        }

        // Add anime details
        const animeDetailsContainer = document.createElement('div');
        animeDetailsContainer.classList.add('anime-details');

        const animeTitle = document.createElement('h4');
        animeTitle.textContent = anime.title || 'Unknown Title';
        animeTitle.classList.add('anime-title');
        animeDetailsContainer.appendChild(animeTitle);

        animeElement.appendChild(animeDetailsContainer);
        container.appendChild(animeElement);
    });

    // Add "More" button
    const moreButton = document.createElement('a');
    moreButton.href = './TopAnimes.html#page=1&filter=upcoming';
    moreButton.textContent = 'More';
    moreButton.classList.add('more-btn');
    container.appendChild(moreButton);
}

fetchSeasonUpcoming();
