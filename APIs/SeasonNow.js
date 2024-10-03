async function fetchSeasonNow() {
    const URL = 'https://api.jikan.moe/v4/seasons/now';

    try {
        const response = await fetch(URL);
        const result = await response.json();
        displaySeasonNow(result);
    } catch (error) {
        console.error(error);
    }
}

function displaySeasonNow(result) {
    const container = document.querySelector('.season-now-container');
    container.innerHTML = ''; // Clear previous content

    // Limit to displaying 5 anime
    result.data.forEach(anime => {
        const animeElement = document.createElement('div');
        animeElement.classList.add('season-item');

        // redirects to anime info page
        animeElement.addEventListener('click', () => {
            window.location.href = `AnimeInfo.html?id=${anime.mal_id}`;
        });

        // Add anime title and image
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

        container.appendChild(animeElement);
    });
}


fetchSeasonNow();

document.querySelector('.season-left').addEventListener('click', () => {
    document.querySelector('.season-now-container').scrollBy({
        left: -300,
        behavior: 'smooth'
    });
});

document.querySelector('.season-right').addEventListener('click', () => {
    document.querySelector('.season-now-container').scrollBy({
        left: 300,
        behavior: 'smooth'
    });
});
