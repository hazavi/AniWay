// Get the anime ID from the URL
function getAnimeIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

async function fetchAnimeInfo(animeId) {
    const URL = `https://api.jikan.moe/v4/anime/${animeId}/full`;

    try {
        const response = await fetch(URL);
        const result = await response.json();
        console.log(result);
        
        displayAnimeInfo(result);

    } catch (error) {
        console.error(error);
    }
}

function displayAnimeInfo(anime) {
    const container = document.querySelector('.anime-info-container');
    container.innerHTML = ''; // Clear previous content

    // Helper function to create and append elements
    function createElement(tag, className, textContent, parent) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (textContent) element.textContent = textContent;
        if (parent) parent.appendChild(element);
        return element;
    }

    // Create and append basic info
    createElement('h2', null, anime.data.title, container);
    const image = createElement('img', null, null, container);
    image.src = anime.data.images.jpg.image_url;
    image.alt = anime.data.title;

    // Create and append info Items
    const infoItems = [
        { text: anime.data.synopsis },
        { text: `Rating: ${anime.data.rating}` },
        { text: `Rank: #${anime.data.rank}` },
        { text: `Score: ${anime.data.score}` },
        { text: `Episodes: ${anime.data.episodes}` },
        { text: `Duration: ${anime.data.duration}` },
        { text: `Broadcast: ${anime.data.broadcast.string}` },
        { text: `Year: ${anime.data.year}` },
        { text: `Status: ${anime.data.status}` }

    ];

    infoItems.forEach(info => createElement('p', null, info.text, container));

    // Add the video (trailer) if available
    if (anime.data.trailer?.embed_url) {
        const videoContainer = createElement('div', 'video-container', null, container);
        const iframe = createElement('iframe', null, null, videoContainer);
        iframe.src = anime.data.trailer.embed_url;
        iframe.width = "300";
        iframe.height = "170";
        iframe.frameBorder = "0";
        iframe.allow = " encrypted-media";
        iframe.allowFullscreen = true;
    }

    // Display genres
    if (anime.data.genres?.length) {
        const genresContainer = createElement('div', 'genres-container', null, container);
        createElement('h3', null, 'Genres:', genresContainer);

        anime.data.genres.forEach((genre, index) => {
            createElement('span', 'genre', genre.name, genresContainer);
        
            if (index < anime.data.genres.length - 1) {
                genresContainer.appendChild(document.createTextNode(', '));
            }
        });
        
    }
    
    // Display themes
    if (anime.data.themes?.length) {
        const themesContainer = createElement('div', 'themes-container', null, container);
        createElement('h3', null, 'Themes:', themesContainer);

        anime.data.themes.forEach((theme, index) => {
            createElement('span', 'theme', theme.name, themesContainer);
        
            if (index < anime.data.themes.length - 1) {
                themesContainer.appendChild(document.createTextNode(', '));
            }
        });
        
    }
}


// Get the anime ID and fetch the info
const animeId = getAnimeIdFromUrl();
if (animeId) {
    fetchAnimeInfo(animeId);
} else {
    console.error('No anime ID found in the URL.');
}
