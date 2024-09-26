async function fetchSchedules() {
    const URL = 'https://api.jikan.moe/v4/schedules';

    try {
        const response = await fetch(URL);
        const result = await response.json();
        console.log(result);
        displaySchedules(result);
    } catch (error) {
        console.error(error);
    }
}

function displaySchedules(result) {
    const container = document.querySelector('.schedules-container');
    container.innerHTML = ''; // Clear previous content

    // Limit to displaying 5 anime
    result.data.forEach(anime => {
        const animeElement = document.createElement('div');
        animeElement.classList.add('schedule-item');

        // Add anime title and image
        const animeImage = document.createElement('img');
        animeImage.src = anime.images.jpg.image_url;
        animeImage.alt = anime.title;
        animeElement.appendChild(animeImage);

        const animeTitle = document.createElement('h4');
        animeTitle.textContent = anime.title;
        animeElement.appendChild(animeTitle);

        container.appendChild(animeElement);
    });
}

fetchSchedules();

document.querySelector('.scroll-left').addEventListener('click', () => {
    document.querySelector('.schedules-container').scrollBy({
        left: -300,
        behavior: 'smooth'
    });
});

document.querySelector('.scroll-right').addEventListener('click', () => {
    document.querySelector('.schedules-container').scrollBy({
        left: 300,
        behavior: 'smooth'
    });
});
