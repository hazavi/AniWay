async function fetchTopAiring() {
    const URL = 'https://api.jikan.moe/v4/top/anime?filter=airing';

    try {
        const response = await fetch(URL);
        const result = await response.json();
        displayTopAiring(result.data.slice(0, 5)); // Get only the first 5 animes
    } catch (error) {
        console.error(error);
    }
}

function displayTopAiring(animeList) {
    const container = document.querySelector('.top-airing-container');
    container.innerHTML = ''; // Clear previous content

    // header
    const header = document.createElement('h3');
    header.textContent = 'Top Airing';
    header.classList.add('top-airing-header'); 
    container.appendChild(header);

    // Loop through the anime list and display each anime
    animeList.forEach((anime, index) => {
        const animeElement = document.createElement('div');
        animeElement.classList.add('top-item');

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
    moreButton.href = '/TopAnimes.html#page=1&filter=airing'; 
    moreButton.textContent = 'More';
    moreButton.classList.add('more-btn');
    container.appendChild(moreButton);
}

fetchTopAiring();
