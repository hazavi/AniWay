async function fetchMostPopular() {
    const URL = 'https://api.jikan.moe/v4/top/anime?filter=bypopularity';

    try {
        const response = await fetch(URL);
        const result = await response.json();
        displayMostPopular(result);
    } catch (error) {
        console.error(error);
    }
}

function displayMostPopular(result) {
    const container = document.querySelector('.most-popular-container');
    
    if (!container) {
        console.error('Most Popular container not found');
        return;
    }

    container.innerHTML = ''; // Clear previous content

    result.data.forEach(anime => {
        const animeElement = document.createElement('div');
        animeElement.classList.add('popular-item');

        // redirects to anime info page
        animeElement.addEventListener('click', () => {
            window.location.href = `AnimeInfo.html?id=${anime.mal_id}`;
        });
        
        // Add anime title and image
        const animeImage = document.createElement('img');
        animeImage.src = anime.images.jpg.image_url;
        animeImage.alt = anime.title;
        animeElement.appendChild(animeImage);

        const animeTitle = document.createElement('div');
        animeTitle.classList.add('popular-item-title');
        animeTitle.textContent = anime.title;
        animeElement.appendChild(animeTitle);

        container.appendChild(animeElement);
    });
}


fetchMostPopular();

document.querySelector('.popular-left').addEventListener('click', () => {
    document.querySelector('.most-popular-container').scrollBy({
        left: -300,
        behavior: 'smooth'
    });
});

document.querySelector('.popular-right').addEventListener('click', () => {
    document.querySelector('.most-popular-container').scrollBy({
        left: 300,
        behavior: 'smooth'
    });
});
