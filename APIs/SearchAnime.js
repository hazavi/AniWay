// Extract search query from the URL
function getSearchQueryFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('query');
}

// Fetch and display searched anime
async function fetchSearchedAnime(animeName) {
    const searchURL = `https://api.jikan.moe/v4/anime?q=${animeName}&sfw`;

    try {
        const response = await fetch(searchURL);
        const result = await response.json();
        console.log(result);
        displaySearchedAnimes(result.data); // Display fetched anime
    } catch (error) {
        console.error(error);
    }
}

// Function to display searched anime results
function displaySearchedAnimes(animeList) {
    const container = document.querySelector('.display-container');
    container.innerHTML = ''; // Clear previous content

    animeList.forEach(anime => {
        const animeElement = document.createElement('div');
        animeElement.classList.add('anime-item');

        // Redirect to the anime info page with the anime ID as a query parameter
        animeElement.addEventListener('click', () => {
            window.location.href = `AnimeInfo.html?id=${anime.mal_id}`;
        });

        const image = document.createElement('img');
        image.src = anime.images.jpg.large_image_url;
        image.alt = anime.title;

        const title = document.createElement('h2');
        title.textContent = anime.title;

        animeElement.appendChild(image);
        animeElement.appendChild(title);
        container.appendChild(animeElement);
    });
}

// On page load, get the search query and fetch the search results
document.addEventListener('DOMContentLoaded', () => {
    const searchQuery = getSearchQueryFromUrl();
    if (searchQuery) {
        fetchSearchedAnime(searchQuery); // Fetch and display the search results
    }
});
