// Assuming we have an array of TV shows (from an API or search result)
const tvShows = [
  {
    show: {
      name: "Example Show 1",
      url: "https://www.example1.com",
      image: { medium: "https://via.placeholder.com/210x295?text=Example+Show+1" },
      summary: "This is the summary of Example Show 1."
    }
  },
  {
    show: {
      name: "Example Show 2",
      url: "https://www.example2.com",
      image: null, // No image for this show
      summary: "This is the summary of Example Show 2."
    }
  }
];

// Function to display TV show details on the web page
function displayTvShows(tvShows) {
  // Wait for the DOM to load
  document.addEventListener('DOMContentLoaded', () => {
    // Select the container for results
    const resultsContainer = document.getElementById('results');

    // Clear old results before appending new ones
    resultsContainer.innerHTML = '';

    // Loop through each show in the tvShows array
    tvShows.forEach(tvShow => {
      const show = tvShow.show;

      // Create the <article> element
      const articleElement = document.createElement('article');

      // Create <h2> element for the show name
      const nameElement = document.createElement('h2');
      nameElement.textContent = show.name;

      // Create <a> element for the show URL with target="_blank"
      const linkElement = document.createElement('a');
      linkElement.href = show.url;
      linkElement.target = "_blank";
      linkElement.textContent = "View Details";

      // Create <img> element for the show image, using optional chaining to handle missing image
      const imgElement = document.createElement('img');
      imgElement.src = show.image?.medium || "https://via.placeholder.com/210x295?text=Not%20Found"; // Default image if missing
      imgElement.alt = show.name;

      // Create <div> element for the summary
      const summaryElement = document.createElement('div');
      summaryElement.innerHTML = show.summary;

      // Append all elements to the <article> element
      articleElement.appendChild(nameElement);
      articleElement.appendChild(linkElement);
      articleElement.appendChild(imgElement);
      articleElement.appendChild(summaryElement);

      // Append the <article> element to the results container
      resultsContainer.appendChild(articleElement);
    });
  });
}

// Call the function to display TV shows
displayTvShows(tvShows);
