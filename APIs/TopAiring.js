async function fetchAllTopAiring() {
    const URL = 'https://api.jikan.moe/v4/top/anime?filter=airing';

    try {
        const response = await fetch(URL);
        const result = await response.json();
        displayTopAiring(result.data);
    } catch (error) {
        console.error(error);
    }
}


function displayTopAiring(animeList) {
    const container = document.querySelector('.top-airing-container');

    animeList.forEach((anime, index) => {
        const animeElement = document.createElement('div');
        animeElement.classList.add('top-item');

        // Redirects to anime info page
        animeElement.addEventListener('click', () => {
            window.location.href = `AnimeInfo.html?id=${anime.mal_id}`;
        });

        // Add rank number
        const rank = document.createElement('span');
        rank.textContent = index + 1;
        rank.classList.add('rank');
        animeElement.appendChild(rank);

        // Add anime image
        const animeImage = document.createElement('img');
        animeImage.src = anime.images.jpg.image_url;
        animeImage.alt = anime.title;
        animeImage.classList.add('anime-image');
        animeElement.appendChild(animeImage);

        const animeDetailsContainer = document.createElement('div');
        animeDetailsContainer.classList.add('anime-details');

        // Add anime title
        const animeTitle = document.createElement('div');
        animeTitle.textContent = anime.title;
        animeTitle.classList.add('anime-title');
        animeDetailsContainer.appendChild(animeTitle);

        // Add anime info
        const animeInfo = document.createElement('div');
        animeInfo.textContent = `${anime.type} (${anime.episodes || '?'} eps) • ${anime.aired.prop.from.year || ''} `;
        animeInfo.classList.add('anime-info');
        animeDetailsContainer.appendChild(animeInfo);

        animeElement.appendChild(animeDetailsContainer);

        // Add score
        const score = document.createElement('span');
        score.textContent = anime.score || 'N/A';
        score.classList.add('score');
        animeElement.appendChild(score);

        container.appendChild(animeElement);
    });
}

fetchAllTopAiring();
