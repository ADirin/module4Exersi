// Function to fetch and display a random Chuck Norris joke
function getChuckNorrisJoke() {
  fetch('https://api.chucknorris.io/jokes/random') // Make a GET request to the API
    .then(response => response.json()) // Parse the response as JSON
    .then(data => {
      // Print only the joke (the 'value' property) to the console
      console.log(data.value);
    })
    .catch(error => {
      // Handle any errors (e.g., network issues)
      console.error('Error fetching joke:', error);
    });
}

// Call the function to get a random joke
getChuckNorrisJoke();
