
// Get the anime ID from the URL
function getMangaIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

async function fetchMangaInfo(mangaId) {
    const URL = `https://api.jikan.moe/v4/manga/${mangaId}/full`;

    try {
        const response = await fetch(URL);
        const result = await response.json();
        console.log(result);
        
        displayMangaInfo(result);

    } catch (error) {
        console.error(error);
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

    // Create and append basic info
    createElement('h2', null, manga.data.title, container);
    const image = createElement('img', null, null, container);
    image.src = manga.data.images.jpg.image_url;
    image.alt = manga.data.title;

    // Create and append info Items
    const infoItems = [
        { text: manga.data.synopsis },
        { text: `Rating: ${manga.data.rating}` },
        { text: `Rank: #${manga.data.rank}` },
        { text: `Score: ${manga.data.score}` },
        { text: `Episodes: ${manga.data.episodes}` },
        { text: `Chapters: ${manga.data.chapters}` },
        { text: `Volumes: ${manga.data.volumes}` },
        { text: `Status: ${manga.data.status}` }

    ];

    infoItems.forEach(info => createElement('p', null, info.text, container));

    // Display genres
    if (manga.data.genres?.length) {
        const genresContainer = createElement('div', 'genres-container', null, container);
        createElement('h3', null, 'Genres:', genresContainer);

        manga.data.genres.forEach((genre, index) => {
            createElement('span', 'genre', genre.name, genresContainer);
        
            if (index < manga.data.genres.length - 1) {
                genresContainer.appendChild(document.createTextNode(', '));
            }
        });
        
    }
    
    // Display themes
    if (manga.data.themes?.length) {
        const themesContainer = createElement('div', 'themes-container', null, container);
        createElement('h3', null, 'Themes:', themesContainer);

        manga.data.themes.forEach((theme, index) => {
            createElement('span', 'theme', theme.name, themesContainer);
        
            if (index < manga.data.themes.length - 1) {
                themesContainer.appendChild(document.createTextNode(', '));
            }
        });
        
    }
}


const mangaId = getMangaIdFromUrl();
if (mangaId) {
    fetchMangaInfo(mangaId);
} else {
    console.error('No manga ID found in the URL.');
}
