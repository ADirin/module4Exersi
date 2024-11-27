// Initialize Leaflet map
const map = L.map('map').setView([60.200692, 24.934302], 13); // Default view (school location)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// Karaportti 2 coordinates (school location)
const schoolCoords = [60.2241077, 24.7587198];

// Add a marker for the school
L.marker(schoolCoords).addTo(map).bindPopup('School (Karaportti 2)').openPopup();

// Handle form submission
document.getElementById('routeForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const address = document.getElementById('address').value;
  if (address) {
    getCoordinates(address); // Fetch coordinates for the user address
  }
});

// Function to get coordinates from the user-provided address
function getCoordinates(address) {
  const geocodeURL = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;

  fetch(geocodeURL)
    .then(response => response.json())
    .then(data => {
      if (data && data.length > 0) {
        const userCoords = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
        map.setView(userCoords, 13); // Center the map on user location
        L.marker(userCoords).addTo(map).bindPopup('Your location').openPopup();
        getRoute(userCoords); // Fetch route to the school
      } else {
        alert('Address not found!');
      }
    })
    .catch(error => console.error('Error fetching coordinates:', error));
}

// Function to get the route from the user location to the school
function getRoute(userCoords) {
  const routeAPIUrl = `https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql`;

  const query = `
    {
      plan(
        from: {lat: ${userCoords[0]}, lon: ${userCoords[1]}}
        to: {lat: ${schoolCoords[0]}, lon: ${schoolCoords[1]}}
      ) {
        itineraries {
          startTime
          endTime
          legs {
            mode
            from {
              name
              lat
              lon
            }
            to {
              name
              lat
              lon
            }
          }
        }
      }
    }`;

  fetch(routeAPIUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  })
    .then(response => response.json())
    .then(data => {
      const itineraries = data?.data?.plan?.itineraries;
      if (itineraries && itineraries.length > 0) {
        const itinerary = itineraries[0];
        displayRouteDetails(itinerary); // Display start and end time
        plotRouteOnMap(itinerary); // Plot the route on the map
      } else {
        alert('No route found!');
      }
    })
    .catch(error => console.error('Error fetching route data:', error));
}

// Function to display route details (start and end times)
function displayRouteDetails(itinerary) {
  const resultsDiv = document.getElementById('results');
  const startTime = new Date(itinerary.startTime).toLocaleTimeString();
  const endTime = new Date(itinerary.endTime).toLocaleTimeString();

  resultsDiv.innerHTML = `
    <h3>Route Details</h3>
    <p><strong>Start Time:</strong> ${startTime}</p>
    <p><strong>End Time:</strong> ${endTime}</p>
  `;
}

// Function to plot the route on the map
function plotRouteOnMap(itinerary) {
  const routeCoords = [];

  itinerary.legs.forEach(leg => {
    if (leg.from.lat && leg.from.lon) {
      routeCoords.push([leg.from.lat, leg.from.lon]);
    }
  });

  // Add the destination (school)
  routeCoords.push([schoolCoords[0], schoolCoords[1]]);

  const polyline = L.polyline(routeCoords, { color: 'blue' }).addTo(map);
  map.fitBounds(polyline.getBounds()); // Adjust map to fit the route
}
