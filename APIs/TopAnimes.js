const URL = 'https://api.jikan.moe/v4/top/anime';
let currentPage = 1;
const perPage = 24; // Number of animes per page: max 25

// Function to fetch the top animes for a specific page
async function fetchTopAnimes(page = 1) {
    try {
        const response = await fetch(`${URL}?page=${page}&limit=${perPage}`);
        const result = await response.json();
        displayTopAnimes(result);
        setupPagination(result.pagination);
    } catch (error) {
        console.error(error);
    }
}

// Function to display the top animes
function displayTopAnimes(result) {
    const container = document.querySelector('.anime-container');
    container.innerHTML = ''; // Clear previous content

    result.data.forEach(anime => {
        const animeElement = document.createElement('div');
        animeElement.classList.add('anime-item');

        // Redirect to the anime info page with the anime ID as a query parameter
        animeElement.addEventListener('click', () => {
            window.location.href = `AnimeInfo.html?id=${anime.mal_id}`;
        });

        // Rank element
        const rankElement = document.createElement('div');
        rankElement.classList.add('anime-rank');
        rankElement.textContent = `#${anime.rank}`;
        animeElement.appendChild(rankElement);

        // Image element
        const image = document.createElement('img');
        image.src = anime.images.jpg.large_image_url;
        image.alt = anime.title;
        image.title = anime.title; // Tooltip with full title on hover

        // Custom tooltip
        const tooltip = document.createElement('div');
        tooltip.classList.add('custom-tooltip');
        tooltip.textContent = anime.title;

        // Show tooltip on hover
        image.addEventListener('mouseenter', () => {
            tooltip.style.display = 'block';
        });
        image.addEventListener('mouseleave', () => {
            tooltip.style.display = 'none';
        });

        // Title element (with truncated text and tooltip on hover)
        const title = document.createElement('h2');
        title.textContent = anime.title;
        title.title = anime.title; // Tooltip with full title on hover

        animeElement.appendChild(image);
        animeElement.appendChild(tooltip);
        animeElement.appendChild(title);
        container.appendChild(animeElement);

        // Popup for genres, year, and synopsis
        const popup = document.createElement('div');
        popup.classList.add('anime-popup');
        popup.innerHTML = `
            <p><strong>${anime.genres.map(genre => genre.name).join(', ')}</strong></p>
            <p><strong> ${anime.aired.prop.from.year}</strong></p>
            <p><strong></strong> ${anime.synopsis }</p>
        `;
        animeElement.appendChild(popup);
    });
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
    window.location.hash = `page=${currentPage}`;
    fetchTopAnimes(currentPage);
}

// Function to get the current page from the URL
function getCurrentPageFromURL() {
    const hash = window.location.hash;
    if (hash) {
        const pageMatch = hash.match(/page=(\d+)/);
        if (pageMatch && pageMatch[1]) {
            return parseInt(pageMatch[1], 10);
        }
    }
    return 1; // Default to page 1 if no page is specified in the URL
}

// On page load, get the current page from the URL and fetch data
window.addEventListener('DOMContentLoaded', () => {
    currentPage = getCurrentPageFromURL();
    fetchTopAnimes(currentPage);
});
