function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function fetchSeasonUpcoming() {
    const URL = 'https://api.jikan.moe/v4/seasons/upcoming';

    try {
        await delay(1000); //  delay
        const response = await fetch(URL);
        const result = await response.json();
        displaySeasonUpcoming(result.data.slice(0, 5)); // Pass fetched data to display function
    } catch (error) {
        console.error(error);
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

        // Redirect to anime info page
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
       
        // Append the details container to the anime item
        animeElement.appendChild(animeDetailsContainer);

        container.appendChild(animeElement);
    });

    // Add the "More" button to redirect to the full Season Upcoming page
    const moreButton = document.createElement('a');
    moreButton.href = '/AniWay/season-upcoming.html'; // Change to actual Season Upcoming page URL
    moreButton.textContent = 'More';
    moreButton.classList.add('more-btn');
    container.appendChild(moreButton);
}

fetchSeasonUpcoming();
