function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function fetchTopAiring() {
  const URL = "https://api.jikan.moe/v4/top/anime?filter=airing";
  const container = document.querySelector(".top-airing-container");

  // Show loading message
  container.innerHTML = '<p class="loading">Loading top airing anime...</p>';

  try {
    await delay(200); // Small delay before fetching

    const response = await fetch(URL);
    if (!response.ok) throw new Error("Failed to fetch");

    const result = await response.json();
    displayTopAiring(result.data.slice(0, 5));
  } catch (error) {
    console.error("Error fetching Top Airing:", error);
    container.innerHTML =
      '<p class="error">Failed to load top airing anime.</p>';
  }
}

function displayTopAiring(animeList) {
  const container = document.querySelector(".top-airing-container");
  container.innerHTML = ""; // Clear previous content

  // header
  const header = document.createElement("h3");
  header.textContent = "Top Airing";
  header.classList.add("top-airing-header");
  container.appendChild(header);

  // Loop through the anime list and display each anime
  animeList.forEach((anime, index) => {
    const animeElement = document.createElement("div");
    animeElement.classList.add("top-item");

    // redirects to anime info page
    animeElement.addEventListener("click", () => {
      window.location.href = `AnimeInfo.html?id=${anime.mal_id}`;
    });

    // Add rank number
    const rank = document.createElement("span");
    rank.textContent = index + 1;
    rank.classList.add("rank");
    animeElement.appendChild(rank);

    // Add anime image
    const animeImage = document.createElement("img");
    animeImage.src = anime.images.jpg.image_url;
    animeImage.alt = anime.title;
    animeImage.title = anime.title; // Tooltip with full title on hover
    animeElement.appendChild(animeImage);

    // Create a container for title and details
    const animeDetailsContainer = document.createElement("div");
    animeDetailsContainer.classList.add("anime-details");

    // Add anime title
    const animeTitle = document.createElement("h4");
    animeTitle.textContent = anime.title;
    animeTitle.title = anime.title;
    animeTitle.classList.add("anime-title");
    animeDetailsContainer.appendChild(animeTitle);

    // Add anime details
    const animeDetails = document.createElement("p");
    animeDetails.textContent = ` ${anime.episodes || "0"} eps `; // Change according to available data
    animeDetails.classList.add("anime-details");
    animeDetailsContainer.appendChild(animeDetails);

    // Append the details container to the anime item
    animeElement.appendChild(animeDetailsContainer);

    container.appendChild(animeElement);
  });

  // Add the "More" button to redirect to the full Season Now page
  const moreButton = document.createElement("a");
  moreButton.href = "./TopAnimes.html#page=1&filter=airing";
  moreButton.textContent = "More";
  moreButton.classList.add("more-btn");
  container.appendChild(moreButton);
}

fetchTopAiring();
