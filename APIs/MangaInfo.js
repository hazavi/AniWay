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

    // Manga title and image
    createElement('h2', 'manga-title', manga.data.title, container);
    const image = createElement('img', 'manga-image', null, container);
    image.src = manga.data.images.jpg.image_url;
    image.alt = manga.data.title;

    // Titles section
    if (manga.data.titles?.length) {
        const titlesContainer = createElement('div', 'titles-container', null, container);
        createElement('h3', 'section-title', 'Titles', titlesContainer);

        manga.data.titles.forEach((title, index) => {
            createElement('span', 'title', title.title, titlesContainer);
        
            if (index < manga.data.titles.length - 1) {
                titlesContainer.appendChild(document.createTextNode(', '));
            }
        });
    }
    
    // Synopsis
    createElement('h3', 'section-title', 'Synopsis', container);
    createElement('p', 'manga-synopsis', manga.data.synopsis, container);

    // Information section
    createElement('h3', 'section-title', 'Information', container);
    const infoContainer = createElement('div', 'info-container', null, container);

    const infoItems = [
        { text: `Type: ${manga.data.demographics[0].type}` },
        { text: `Episodes: ${manga.data.episodes}` },
        { text: `Chapters: ${manga.data.chapters}` },
        { text: `Volumes: ${manga.data.volumes}` },
        { text: `Status: ${manga.data.status}` },
        { text: `Demographic: ${manga.data.demographics[0].name}` },
        { text: `Published: ${manga.data.published.string}` }
    ];

    infoItems.forEach(info => createElement('p', 'info-item', info.text, infoContainer));

    // Statistics section
    createElement('h3', 'section-title', 'Statistics', container);
    const statsContainer = createElement('div', 'stats-container', null, container);

    const statisticItems = [
        { text: `Rank: #${manga.data.rank}` },
        { text: `Score: ${manga.data.score}` }
    ];

    statisticItems.forEach(stat => createElement('p', 'stat-item', stat.text, statsContainer));

    

    // Genres section
    if (manga.data.genres?.length) {
        const genresContainer = createElement('div', 'genres-container', null, container);
        createElement('h3', 'section-title', 'Genres', genresContainer);

        manga.data.genres.forEach((genre, index) => {
            createElement('span', 'genre', genre.name, genresContainer);
        
            if (index < manga.data.genres.length - 1) {
                genresContainer.appendChild(document.createTextNode(', '));
            }
        });
    }

    // Themes section
    if (manga.data.themes?.length) {
        const themesContainer = createElement('div', 'themes-container', null, container);
        createElement('h3', 'section-title', 'Themes', themesContainer);

        manga.data.themes.forEach((theme, index) => {
            createElement('span', 'theme', theme.name, themesContainer);
        
            if (index < manga.data.themes.length - 1) {
                themesContainer.appendChild(document.createTextNode(', '));
            }
        });
    }

     // background
     createElement('h3', 'section-title', 'Background', container);
     createElement('p', 'manga-synopsis', manga.data.background, container);   
}

// Get manga ID and fetch information
const mangaId = getMangaIdFromUrl();
if (mangaId) {
    fetchMangaInfo(mangaId);
} else {
    console.error('No manga ID found in the URL.');
}
