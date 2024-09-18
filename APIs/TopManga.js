const URL = 'https://api.jikan.moe/v4/top/manga';
let currentMangaPage = 1;
const perMangaPage = 24; // Number of mangas per page: max 25

// Fetch top mangas
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

        const image = document.createElement('img');
        image.src = manga.images.jpg.large_image_url;
        image.alt = manga.title;

        const title = document.createElement('h2');
        title.textContent = manga.title;

        const score = document.createElement('h4');
        score.textContent = `★ ${manga.score}`;

        mangaElement.appendChild(image);
        mangaElement.appendChild(title);
        mangaElement.appendChild(score);
        container.appendChild(mangaElement);
    });
}

// Function to set up pagination for mangas
function setupMangaPagination(pagination) {
    const paginationContainer = document.querySelector('.pagination');
    paginationContainer.innerHTML = ''; // Clear previous pagination

    const { has_next_page, last_visible_page } = pagination;

    // Previous button
    if (currentMangaPage > 1) {
        const prevButton = document.createElement('button');
        prevButton.textContent = '<';
        prevButton.addEventListener('click', () => {
            currentMangaPage--;
            fetchTopMangas(currentMangaPage);
        });
        paginationContainer.appendChild(prevButton);
    }

    // Page numbers
    let startPage = Math.max(1, currentMangaPage - 2);
    let endPage = Math.min(last_visible_page, currentMangaPage + 2);

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
        if (i === currentMangaPage) {
            pageButton.classList.add('active');
        }
        pageButton.addEventListener('click', () => {
            currentMangaPage = i;
            fetchTopMangas(currentMangaPage);
        });
        paginationContainer.appendChild(pageButton);
    }

    // Next button
    if (has_next_page) {
        const nextButton = document.createElement('button');
        nextButton.textContent = '>';
        nextButton.addEventListener('click', () => {
            currentMangaPage++;
            fetchTopMangas(currentMangaPage);
        });
        paginationContainer.appendChild(nextButton);
    }
}

// Initial call to fetch top mangas
fetchTopMangas();
