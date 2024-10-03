async function fetchSeasonNow() {
    const URL = `https://api.jikan.moe/v4/seasons/now?limit=${24}`;

    try {
        const response = await fetch(URL);
        const result = await response.json();
        displaySeasonNow(result);
    } catch (error) {
        console.error(error);
    }
}

function displaySeasonNow(result) {
    const gridContainer = document.getElementById('seasonGrid');
    gridContainer.innerHTML = ''; // Clear previous content

    result.data.forEach(anime => {
        const animeElement = document.createElement('div');
        animeElement.classList.add('season-item');

        animeElement.addEventListener('click', () => {
            window.location.href = `AnimeInfo.html?id=${anime.mal_id}`;
        });

        const animeImage = document.createElement('img');
        animeImage.src = anime.images.jpg.image_url;
        animeImage.alt = anime.title;
        animeImage.title = anime.title;
        animeElement.appendChild(animeImage);

        const animeTitle = document.createElement('div');
        animeTitle.classList.add('season-item-title');
        animeTitle.textContent = anime.title;
        animeTitle.title = anime.title;
        animeElement.appendChild(animeTitle);

        gridContainer.appendChild(animeElement);
    });
}

fetchSeasonNow();
