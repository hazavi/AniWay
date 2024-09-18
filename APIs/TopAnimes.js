const URL = 'https://api.jikan.moe/v4/top/anime';
let currentPage = 1;
const perPage = 24; // Number of animes per page: max 25

async function fetchTopAnimes(page = 1) {
    try {
        const response = await fetch(`${URL}?page=${page}&limit=${perPage}`);
        const result = await response.json();
        console.log(result.data);
        displayTopAnimes(result);
        setupPagination(result.pagination);
    } catch (error) {
        console.error(error);
    }
}

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

        const image = document.createElement('img');
        image.src = anime.images.jpg.large_image_url;
        image.alt = anime.title;

        const title = document.createElement('h2');
        title.textContent = anime.title;

        const score = document.createElement('h4');
        score.textContent = `★ ${anime.score}`;



        animeElement.appendChild(image);
        animeElement.appendChild(title);
        animeElement.appendChild(score);
        container.appendChild(animeElement);
    });
}

function setupPagination(pagination) {
    const paginationContainer = document.querySelector('.pagination');
    paginationContainer.innerHTML = ''; // Clear previous pagination

    const { has_next_page, last_visible_page } = pagination;

    // Previous button
    if (currentPage > 1) {
        const prevButton = document.createElement('button');
        prevButton.textContent = '<';
        prevButton.addEventListener('click', () => {
            currentPage--;
            fetchTopAnimes(currentPage);
        });
        paginationContainer.appendChild(prevButton);
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
            currentPage = i;
            fetchTopAnimes(currentPage);
        });
        paginationContainer.appendChild(pageButton);
    }

    // Next button
    if (has_next_page) {
        const nextButton = document.createElement('button');
        nextButton.textContent = '>';
        nextButton.addEventListener('click', () => {
            currentPage++;
            fetchTopAnimes(currentPage);
        });
        paginationContainer.appendChild(nextButton);
    }
}

fetchTopAnimes();
