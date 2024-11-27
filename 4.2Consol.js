// Function to fetch TV show data and display it in the console
function searchTVShow(query) {
  // Ensure the query is not empty
  if (!query) {
    console.log("Please enter a search term.");
    return;
  }

  // Fetch data from the TVMaze API using the query
  fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`)
    .then(response => {
      // Check if the response is okay (status 200)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json(); // Parse the JSON data from the response
    })
    .then(data => {
      displayResults(data); // Print the results to the console
    })
    .catch(error => {
      // If an error occurs, log it to the console
      console.error("An error occurred while fetching the data:", error);
    });
}

// Function to print the results to the console
function displayResults(data) {
  // If no results are found, log that to the console
  if (data.length === 0) {
    console.log("No results found.");
    return;
  }

  // Loop through the results and print each show's details to the console
  data.forEach(item => {
    const show = item.show;

    // Log formatted details to the console
    console.log("Name:", show.name || "N/A");
    console.log("Genres:", show.genres ? show.genres.join(", ") : "N/A");
    console.log("Language:", show.language || "N/A");
    console.log("Summary:", show.summary ? show.summary.replace(/<[^>]+>/g, '') : "No summary available");
    console.log("Image URL:", show.image ? show.image.medium : "No image available");
    console.log("-------------------------");
  });
}

// Detect environment and prompt for input
if (typeof prompt === "function") {
  // Browser environment
  const searchTerm = prompt("Enter the name of the TV show you want to search for:");
  searchTVShow(searchTerm);
} else {
  // Non-browser environment (e.g., Node.js)
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  readline.question("Enter the name of the TV show you want to search for: ", (searchTerm) => {
    searchTVShow(searchTerm);
    readline.close();
  });
}
