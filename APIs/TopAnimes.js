const URL = 'https://api.jikan.moe/v4/top/anime';
let currentPage = 1;
const perPage = 24; // Number of animes per page: max 25
let currentParam = 'type';
let currentValue = '';

// Function to fetch the top animes for a specific page and filter
async function fetchTopAnimes(page = 1, param = 'type', value = '') {
    try {
        let apiUrl = `${URL}?page=${page}&limit=${perPage}`;
        if (value) {
            apiUrl += `&${param}=${value}`;
        }
        const response = await fetch(apiUrl);
        const result = await response.json();
        displayTopAnimes(result);
        setupPagination(result.pagination);
        updatePageTitle(param, value);
    } catch (error) {
        console.error('Error fetching anime data:', error);
        displayError('Failed to load anime data. Please try again later.');
    }
}
// Function to update the page title based on the current filter
function updatePageTitle(param, value) {
    const pageTitle = document.getElementById('page-title');
    const filterTitles = {
        '': 'Top Anime',
        'airing': 'Top Airing Anime',
        'upcoming': 'Top Upcoming Anime',
        'tv': 'Top TV Anime Series',
        'movie': 'Top Anime Movies',
        'ova': 'Top Anime OVAs',
        'ona': 'Top Anime ONAs',
        'special': 'Top Anime Specials',
        'bypopularity': 'Most Popular Anime',
        'favorite': 'Most Favorited Anime'
    };
    pageTitle.textContent = filterTitles[value] || 'Top Anime';
}

// Function to display the top animes
function displayTopAnimes(result) {
    const container = document.querySelector('.anime-container');
    container.innerHTML = ''; // Clear previous content

    if (!result.data || result.data.length === 0) {
        displayError('No anime found for this category.');
        return;
    }

    result.data.forEach(anime => {
        const animeElement = document.createElement('div');
        animeElement.classList.add('anime-item');

        animeElement.addEventListener('click', () => {
            window.location.href = `AnimeInfo.html?id=${anime.mal_id}`;
        });

        // Rank element (if available)
        if (anime.rank) {
            const rankElement = document.createElement('div');
            rankElement.classList.add('anime-rank');
            rankElement.textContent = `#${anime.rank}`;
            animeElement.appendChild(rankElement);
        }

        // Image element
        const image = document.createElement('img');
        image.src = anime.images.jpg.large_image_url || 'path/to/placeholder-image.jpg';
        image.alt = anime.title || 'Anime title not available';
        image.title = anime.title || 'Anime title not available';

        // Custom tooltip
        const tooltip = document.createElement('div');
        tooltip.classList.add('custom-tooltip');
        tooltip.textContent = anime.title || 'Anime title not available';

        image.addEventListener('mouseenter', () => tooltip.style.display = 'block');
        image.addEventListener('mouseleave', () => tooltip.style.display = 'none');

        // Title element
        const title = document.createElement('h2');
        title.textContent = anime.title || 'Untitled';
        title.title = anime.title || 'Untitled';

        animeElement.appendChild(image);
        animeElement.appendChild(tooltip);
        animeElement.appendChild(title);

        // Popup for genres, year, and synopsis
        const popup = document.createElement('div');
        popup.classList.add('anime-popup');
        popup.innerHTML = `
            <p><strong>${(anime.genres || []).map(genre => genre.name).join(', ') || 'No genres available'}</strong></p>
            <p><strong>${anime.aired?.prop?.from?.year || 'Year not available'}</strong></p>
            <p>${anime.synopsis || 'No synopsis available'}</p>
        `;
        animeElement.appendChild(popup);

        container.appendChild(animeElement);
    });
}

// Function to display error messages
function displayError(message) {
    const container = document.querySelector('.anime-container');
    container.innerHTML = `<p class="error-message">${message}</p>`;
}

// Function to set up the pagination buttons
function setupPagination(pagination) {
    const paginationContainer = document.querySelector('.pagination');
    paginationContainer.innerHTML = ''; // Clear previous pagination

    const { has_next_page, last_visible_page } = pagination;

    // Previous button
    if (currentPage > 1) {
        const prevButton = document.createElement('button');
        prevButton.textContent = 'Prev';
        prevButton.addEventListener('click', () => {
            changePage(currentPage - 1);
        });
        paginationContainer.appendChild(prevButton);

        // Add ellipsis if there's more pages after 1
        if (currentPage > 3) {
            const firstButton = document.createElement('button');
            firstButton.textContent = '1';
            firstButton.classList.add('page-button');
            firstButton.addEventListener('click', () => {
                changePage(1);
            });
            paginationContainer.appendChild(firstButton);

            const ellipsis = document.createElement('span');
            ellipsis.textContent = '...';
            ellipsis.classList.add('pagination-ellipsis'); 
            paginationContainer.appendChild(ellipsis);
        }
    }

    // Page numbers
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(last_visible_page, currentPage + 2);

    if (endPage - startPage < 4 && startPage > 1) {
        startPage = Math.max(1, endPage - 4);
    }

    if (endPage - startPage < 4 && endPage < last_visible_page) {
        endPage = Math.min(last_visible_page, startPage + 4);
    }

    for (let i = startPage; i <= endPage; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.classList.add('page-button');
        if (i === currentPage) {
            pageButton.classList.add('active');
        }
        pageButton.addEventListener('click', () => {
            changePage(i);
        });
        paginationContainer.appendChild(pageButton);
    }

    // Ellipses and last page button
    if (endPage < last_visible_page) {
        const ellipsis = document.createElement('span');
        ellipsis.textContent = '...';
        ellipsis.classList.add('pagination-ellipsis');
        paginationContainer.appendChild(ellipsis);

        const lastButton = document.createElement('button');
        lastButton.textContent = last_visible_page;
        lastButton.classList.add('page-button');
        lastButton.addEventListener('click', () => {
            changePage(last_visible_page);
        });
        paginationContainer.appendChild(lastButton);
    }

    // Next button
    if (has_next_page) {
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.addEventListener('click', () => {
            changePage(currentPage + 1);
        });
        paginationContainer.appendChild(nextButton);
    }
}

// Function to change the page and update the URL hash
function changePage(page) {
    currentPage = page;
    window.location.hash = `page=${currentPage}&${currentParam}=${currentValue}`;
    fetchTopAnimes(currentPage, currentParam, currentValue);
}

// Function to get the current page and filter from the URL
function getPageAndFilterFromURL() {
    const hash = window.location.hash;
    let page = 1;
    let param = 'type';
    let value = '';
    if (hash) {
        const pageMatch = hash.match(/page=(\d+)/);
        const typeMatch = hash.match(/type=(\w+)/);
        const filterMatch = hash.match(/filter=(\w+)/);
        if (pageMatch && pageMatch[1]) {
            page = parseInt(pageMatch[1], 10);
        }
        if (typeMatch && typeMatch[1]) {
            param = 'type';
            value = typeMatch[1];
        } else if (filterMatch && filterMatch[1]) {
            param = 'filter';
            value = filterMatch[1];
        }
    }
    return { page, param, value };
}

// Function to handle filter clicks
function handleFilterClick(event) {
    event.preventDefault();
    const filterElement = event.target;
    const newParam = filterElement.dataset.param;
    const newValue = filterElement.dataset.value;

    // Update active class
    document.querySelectorAll('.sub-nav a').forEach(el => el.classList.remove('active'));
    filterElement.classList.add('active');

    currentParam = newParam;
    currentValue = newValue;
    currentPage = 1; // Reset to first page when changing filters
    window.location.hash = `page=${currentPage}&${currentParam}=${currentValue}`;
    fetchTopAnimes(currentPage, currentParam, currentValue);
}

// On page load, get the current page and filter from the URL and fetch data
window.addEventListener('DOMContentLoaded', () => {
    const { page, param, value } = getPageAndFilterFromURL();
    currentPage = page;
    currentParam = param;
    currentValue = value;

    // Set active class on the current filter
    const activeFilterElement = document.querySelector(`.sub-nav a[data-param="${currentParam}"][data-value="${currentValue}"]`);
    if (activeFilterElement) {
        activeFilterElement.classList.add('active');
    }

    // Add a 1 second delay before fetching the data
    setTimeout(() => {
        fetchTopAnimes(currentPage, currentParam, currentValue);
    }, 5000); // Delay in milliseconds (1000 ms = 1 second)

    // Add click event listeners to filter links
    document.querySelectorAll('.sub-nav a').forEach(link => {
        link.addEventListener('click', handleFilterClick);
    });
});
