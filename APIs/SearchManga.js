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

        const title = document.createElement('h2');
        title.textContent = manga.title;

        const score = document.createElement('h4');
        score.textContent = `★ ${manga.score}`;

        mangaElement.appendChild(image);
        mangaElement.appendChild(tooltip);
        mangaElement.appendChild(title);
        mangaElement.appendChild(score);
        container.appendChild(mangaElement);
    });
}
