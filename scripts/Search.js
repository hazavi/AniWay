function getSearchParamsFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
        query: urlParams.get('query'),
        type: urlParams.get('type') || 'anime' // Default to anime
    };
}

// Fetch and display anime results
async function fetchSearchedAnime(animeName) {
    const searchURL = `https://api.jikan.moe/v4/anime?q=${animeName}&sfw`;
    try {
        const response = await fetch(searchURL);
        const result = await response.json();
        displayResults(result.data, 'anime');
    } catch (error) {
        console.error('Error fetching anime:', error);
    }
}

// Fetch and display manga results
async function fetchSearchedManga(mangaName) {
    const searchURL = `https://api.jikan.moe/v4/manga?q=${mangaName}&sfw`;
    try {
        const response = await fetch(searchURL);
        const result = await response.json();
        displayResults(result.data, 'manga');
    } catch (error) {
        console.error('Error fetching manga:', error);
    }
}

// Display search results (for both anime and manga)
function displayResults(items, type) {
    const container = document.querySelector('.display-container');
    container.innerHTML = ''; // Clear previous content

    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add(`${type}-item`);

        // Redirect to the info page when clicked
        itemElement.addEventListener('click', () => {
            window.location.href = `${type === 'anime' ? 'AnimeInfo' : 'MangaInfo'}.html?id=${item.mal_id}`;
        });

        const image = document.createElement('img');
        image.src = item.images.jpg.large_image_url;
        image.alt = item.title;

        const title = document.createElement('h2');
        title.textContent = item.title;

        itemElement.appendChild(image);
        itemElement.appendChild(title);
        container.appendChild(itemElement);
    });
}

// On page load, fetch the search results
document.addEventListener('DOMContentLoaded', () => {
    const { query, type } = getSearchParamsFromUrl();
    if (query) {
        if (type === 'anime') {
            fetchSearchedAnime(query);
        } else {
            fetchSearchedManga(query);
        }
    }
});