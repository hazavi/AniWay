// Get the manga ID from the URL
function getMangaIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

async function fetchMangaInfo(mangaId) {
    const URL = `https://api.jikan.moe/v4/manga/${mangaId}/full`;

    try {
        const response = await fetch(URL);
        const result = await response.json();
        console.log(result); // Check the API response
        
        displayMangaInfo(result);

    } catch (error) {
        console.error('Fetch error:', error);
    }
}

function displayMangaInfo(manga) {
    const container = document.querySelector('.manga-info-container');
    container.innerHTML = ''; // Clear previous content

    // Helper function to create and append elements
    function createElement(tag, className, textContent, parent) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (textContent) element.textContent = textContent;
        if (parent) parent.appendChild(element);
        return element;
    }

    // Manga title and image
    const header = createElement('div', 'manga-header', null, container);
    const image = createElement('img', 'manga-image', null, header);
    image.src = manga.data.images.jpg.large_image_url;
    image.alt = manga.data.title;

    const details = createElement('div', 'manga-details', null, header);
    createElement('h2', 'manga-title', manga.data.title, details);

    // Titles section
    if (manga.data.titles?.length) {
        const titlesContainer = createElement('div', 'titles-container', null, details);
        manga.data.titles.forEach((title, index) => {
            createElement('span', 'title', title.title, titlesContainer);
            if (index < manga.data.titles.length - 1) {
                titlesContainer.appendChild(document.createTextNode(', '));
            }
        });
    }
    // Manga details
    createElement('h3', 'manga-info', `#${manga.data.rank}`, details);
    createElement('p', 'manga-info', `Type: ${manga.data.type || 'N/A'}`, details);
    createElement('p', 'manga-info', `Chapters: ${manga.data.chapters || 'N/A'}`, details);
    createElement('p', 'manga-info', `Volumes: ${manga.data.volumes || 'N/A'}`, details);
    createElement('p', 'manga-info', `Published: ${manga.data.published?.string || 'N/A'}`, details);
    createElement('p', 'manga-info', `Status: ${manga.data.status}`, details);

    // Create genres section
    if (manga.data.genres?.length) {
        const genresContainer = createElement('div', 'genres-container', null, details);
        manga.data.genres.forEach(genre => {
            createElement('span', 'genre', genre.name, genresContainer);
        });
    }

    // Synopsis
    createElement('h3', 'section-title', 'Synopsis', container);
    createElement('p', 'manga-synopsis', manga.data.synopsis || 'No synopsis available.', container);

    // Background section
    if (manga.data.background) {
        createElement('h3', 'section-title', 'Background', container);
        createElement('p', 'manga-synopsis', manga.data.background, container);
    }
}

// Get manga ID and fetch information
const mangaId = getMangaIdFromUrl();
if (mangaId) {
    fetchMangaInfo(mangaId);
} else {
    console.error('No manga ID found in the URL.');
}
