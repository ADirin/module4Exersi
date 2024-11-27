// Function to fetch and display jokes based on the search term
function searchChuckNorrisJokes(searchTerm) {
  // Clear previous results
  const jokesContainer = document.getElementById('jokesContainer');
  jokesContainer.innerHTML = '';

  // Send request to the Chuck Norris API with the search term
  fetch(`https://api.chucknorris.io/jokes/search?query=${searchTerm}`)
    .then(response => response.json()) // Parse the response as JSON
    .then(data => {
      // Check if jokes are found and display them
      if (data.result.length > 0) {
        // Loop through each joke and display it
        data.result.forEach(joke => {
          const articleElement = document.createElement('article');
          const jokeElement = document.createElement('p');
          jokeElement.textContent = joke.value; // Display joke text

          // Append the joke to the article element, then append to the container
          articleElement.appendChild(jokeElement);
          jokesContainer.appendChild(articleElement);
        });
      } else {
        // If no jokes found, display a message
        const messageElement = document.createElement('p');
        messageElement.textContent = 'No jokes found for this search term.';
        jokesContainer.appendChild(messageElement);
      }
    })
    .catch(error => {
      // Handle any errors during the fetch request
      console.error('Error fetching jokes:', error);
    });
}

// Handle form submission
document.getElementById('jokeSearchForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form from refreshing the page

  // Get the search term from the input field
  const searchTerm = document.getElementById('searchInput').value.trim();

  if (searchTerm) {
    // Call the function to fetch jokes with the entered search term
    searchChuckNorrisJokes(searchTerm);
  }
});
