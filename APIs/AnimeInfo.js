// Utility function to create and append elements
function createElement(tag, className, textContent, parent) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    if (textContent) element.textContent = textContent;
    if (parent) parent.appendChild(element);
    return element;
}

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

        // Check if anime data is available
        if (result && result.data) {
            displayAnimeInfo(result);
        } else {
            console.error('Anime data not found');
        }

    } catch (error) {
        console.error('Error fetching anime info:', error);
    }
}

function displayAnimeInfo(anime) {
    const container = document.querySelector('.anime-info-container');
    container.innerHTML = ''; // Clear previous content

    // Create header section
    const header = createElement('div', 'anime-header', null, container);
    const image = createElement('img', 'anime-image', null, header);
    image.src = anime.data.images.jpg.large_image_url;
    image.alt = anime.data.title;
    
    const details = createElement('div', 'anime-details', null, header);
    createElement('h2', null, anime.data.title, details);

    // Titles section (below main title, above details)
    if (anime.data.titles?.length) {
        const titlesContainer = createElement('div', 'titles-container', null, details);
        anime.data.titles.forEach((title, index) => {
            createElement('span', 'title-item', title.title, titlesContainer);
            if (index < anime.data.titles.length - 1) {
                titlesContainer.appendChild(document.createTextNode(', '));
            }
        });
    }

    // Anime details
    createElement('p', 'anime-info', `#: ${anime.data.rank}`, details);
    createElement('p', 'anime-info', `Episodes: ${anime.data.episodes}`, details);
    createElement('p', 'anime-info', `Broadcast: ${anime.data.broadcast?.string || 'N/A'}`, details);
    createElement('p', 'anime-info', `Duration: ${anime.data.duration}`, details);
    createElement('p', 'anime-info', `Status: ${anime.data.status}`, details);


    // Create genres section
    if (anime.data.genres?.length) {
        const genresContainer = createElement('div', 'genres-container', null, details);
        anime.data.genres.forEach(genre => {
            createElement('span', 'genre', genre.name, genresContainer);
        });
    }

    // Create synopsis section
    const synopsisSection = createElement('div', 'synopsis', null, container);
    createElement('h3', null, 'Synopsis', synopsisSection);
    createElement('p', null, anime.data.synopsis, synopsisSection);

    // Add the video (trailer) if available
    if (anime.data.trailer?.embed_url) {
        const videoContainer = createElement('div', 'video-container', null, container);
        const iframe = createElement('iframe', null, null, videoContainer);
        iframe.src = anime.data.trailer.embed_url;
        iframe.width = "560";
        iframe.height = "315";
        iframe.frameBorder = "0";
        iframe.allow = "autoplay; encrypted-media";
        iframe.allowFullscreen = true;
    }

   // Create background section only if background data exists
   if (anime.data.background) {
        const backgroundSection = createElement('div', 'background', null, container);
        createElement('h3', null, 'Background', backgroundSection);
        createElement('p', null, anime.data.background, backgroundSection);
    }

    const studiosAndProducersSection = createElement('div', 'studios-producers', null, container);

    // Studios 
    const studiosLabel = createElement('p', null, null, studiosAndProducersSection);
    studiosLabel.innerHTML = `<strong class="label-bold">Studios:</strong> ${anime.data.studios.map(studio => studio.name).join(', ')}`;

    // Producers
    const producersLabel = createElement('p', null, null, studiosAndProducersSection);
    producersLabel.innerHTML = `<strong class="label-bold">Producers:</strong> ${anime.data.producers.map(producer => producer.name).join(', ')}`;
}

// Get the anime ID and fetch the info
const animeId = getAnimeIdFromUrl();
if (animeId) {
    fetchAnimeInfo(animeId);
} else {
    console.error('No anime ID found in the URL.');
}
