async function fetchSeasonNow() {
    const URL = 'https://api.jikan.moe/v4/seasons/now';

    try {
        const response = await fetch(URL);
        const result = await response.json();
        displaySeasonNow(result.data.slice(0, 5)); // Get only the first 5 animes
    } catch (error) {
        console.error(error);
    }
}

function displaySeasonNow(animeList) {
    const container = document.querySelector('.season-now-container');
    container.innerHTML = ''; // Clear previous content

    // Add "Season Now" header
    const header = document.createElement('h3');
    header.textContent = 'Season Now';
    header.classList.add('season-now-header'); 
    container.appendChild(header);

    // Loop through the anime list and display each anime
    animeList.forEach((anime, index) => {
        const animeElement = document.createElement('div');
        animeElement.classList.add('season-item');

        // redirects to anime info page
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
        animeImage.title = anime.title; // Tooltip with full title on hover
        animeElement.appendChild(animeImage);

        // Create a container for title and details
        const animeDetailsContainer = document.createElement('div');
        animeDetailsContainer.classList.add('anime-details');

        // Add anime title 
        const animeTitle = document.createElement('h4');
        animeTitle.textContent = anime.title;
        animeTitle.title = anime.title; 
        animeTitle.classList.add('anime-title'); 
        animeDetailsContainer.appendChild(animeTitle);

        // Add anime details
        const animeDetails = document.createElement('p');
        animeDetails.textContent = ` ${anime.episodes || '0'} eps `; // Change according to available data
        animeDetails.classList.add('anime-details'); 
        animeDetailsContainer.appendChild(animeDetails);

        // Append the details container to the anime item
        animeElement.appendChild(animeDetailsContainer);

        container.appendChild(animeElement);
    });

    // Add the "More" button to redirect to the full Season Now page
    const moreButton = document.createElement('a');
    moreButton.href = '/AniWay/season-now.html'; 
    moreButton.textContent = 'More';
    moreButton.classList.add('more-btn');
    container.appendChild(moreButton);
}

fetchSeasonNow();
