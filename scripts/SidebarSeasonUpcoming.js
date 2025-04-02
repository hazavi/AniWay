function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchSeasonUpcoming(retries = 3) {
  const URL = "https://api.jikan.moe/v4/seasons/upcoming";
  const container = document.querySelector(".season-upcoming-container");

  // Show loading message
  container.innerHTML = '<p class="loading">Loading upcoming anime...</p>';

  try {
    await delay(1000); // Increase delay to 1 second

    const response = await fetch(URL);
    if (!response.ok) {
      if (response.status === 429 && retries > 0) {
        console.warn("Too many requests, retrying...");
        await delay(3000); // Wait 3 seconds before retrying
        return fetchSeasonUpcoming(retries - 1);
      }
      throw new Error("Failed to fetch");
    }

    const result = await response.json();
    displaySeasonUpcoming(result.data.slice(0, 5));
  } catch (error) {
    console.error("Error fetching Season Upcoming:", error);
    container.innerHTML =
      '<p class="error">Failed to load upcoming season. Try again later.</p>';
  }
}

function displaySeasonUpcoming(animeList) {
  const container = document.querySelector(".season-upcoming-container");
  container.innerHTML = ""; // Clear previous content

  // Add "Season Upcoming" header
  const header = document.createElement("h3");
  header.textContent = "Season Upcoming";
  header.classList.add("season-upcoming-header");
  container.appendChild(header);

  // Loop through the anime list and display each anime
  animeList.forEach((anime, index) => {
    const animeElement = document.createElement("div");
    animeElement.classList.add("top-item");

    // Redirect to anime info page
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

    // Append the details container to the anime item
    animeElement.appendChild(animeDetailsContainer);

    container.appendChild(animeElement);
  });

  // Add the "More" button to redirect to the full Season Upcoming page
  const moreButton = document.createElement("a");
  moreButton.href = "./TopAnimes.html#page=1&filter=upcoming"; // Change to actual Season Upcoming page URL
  moreButton.textContent = "More";
  moreButton.classList.add("more-btn");
  container.appendChild(moreButton);
}

fetchSeasonUpcoming();
