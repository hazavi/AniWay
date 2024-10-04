const URL = 'https://api.jikan.moe/v4/top/manga';
let currentMangaPage = 1;
const perMangaPage = 24; // Number of mangas per page: max 25

// Function to fetch top mangas
async function fetchTopMangas(page = 1) {
    try {
        const response = await fetch(`${URL}?page=${page}&limit=${perMangaPage}`);
        const result = await response.json();
        console.log(result.data);
        displayTopMangas(result);
        setupMangaPagination(result.pagination);
    } catch (error) {
        console.error(error);
    }
}

// Function to display top mangas
function displayTopMangas(result) {
    const container = document.querySelector('.manga-container'); // Use a separate container for mangas
    container.innerHTML = ''; // Clear previous content

    result.data.forEach(manga => {
        const mangaElement = document.createElement('div');
        mangaElement.classList.add('manga-item');

        // Redirect to the manga info page with the manga ID as a query parameter
        mangaElement.addEventListener('click', () => {
            window.location.href = `MangaInfo.html?id=${manga.mal_id}`;
        });

        // Rank element
        const rankElement = document.createElement('div');
        rankElement.classList.add('anime-rank'); // Reuse anime rank class
        rankElement.textContent = `#${manga.rank}`;
        mangaElement.appendChild(rankElement);

        // Image element
        const image = document.createElement('img');
        image.src = manga.images.jpg.large_image_url;
        image.alt = manga.title;

        // Custom tooltip
        const tooltip = document.createElement('div');
        tooltip.classList.add('custom-tooltip');
        tooltip.textContent = manga.title;

        // Show tooltip on hover
        image.addEventListener('mouseenter', () => {
            tooltip.style.display = 'block';
        });
        image.addEventListener('mouseleave', () => {
            tooltip.style.display = 'none';
        });

        // Title element
        const title = document.createElement('h2');
        title.textContent = manga.title;

        // Popup for genres, year, and synopsis
        const popup = document.createElement('div');
        popup.classList.add('manga-popup'); // Reuse the popup class from anime
        popup.innerHTML = `
            <p><strong>${manga.genres.map(genre => genre.name).join(', ')}</strong></p>
            <p><strong>${manga.published.prop.from.year}</strong></p>
            <p><strong></strong> ${manga.synopsis || 'No synopsis available.'}</p>
        `;
        mangaElement.appendChild(popup);

        mangaElement.appendChild(image);
        mangaElement.appendChild(tooltip);
        mangaElement.appendChild(title);
        container.appendChild(mangaElement);
    });
}

// Function to set up pagination for mangas
function setupMangaPagination(pagination) {
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

// Function to change the manga page and update the URL hash
function changePage(page) {
    currentPage = page;
    window.location.hash = `page=${currentPage}`;
    fetchTopMangas(currentPage);
}

// Function to get the current manga page from the URL
function getCurrentMangaPageFromURL() {
    const hash = window.location.hash;
    if (hash) {
        const pageMatch = hash.match(/page=(\d+)/);
        if (pageMatch && pageMatch[1]) {
            return parseInt(pageMatch[1], 10);
        }
    }
    return 1; // Default to page 1 if no page is specified in the URL
}

// On page load, get the current manga page from the URL and fetch data
window.addEventListener('DOMContentLoaded', () => {
    currentPage = getCurrentMangaPageFromURL();
    fetchTopMangas(currentPage);
});

