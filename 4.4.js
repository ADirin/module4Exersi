// Assuming you have an object representing a TV show
const tvShow = {
  title: "Example Show",
  image: null // or undefined, or a missing image URL
};

// URL for the default image if missing
const defaultImage = "https://via.placeholder.com/210x295?text=Not%20Found";

// Using the ternary operator to check for the existence of the image property
const imageUrl = tvShow.image ? tvShow.image : defaultImage;

// Alternatively, using an if/else statement
let imageUrlIfElse;
if (tvShow.image) {
  imageUrlIfElse = tvShow.image;
} else {
  imageUrlIfElse = defaultImage;
}

// Render the image in HTML
const imgElement = `<img src="${imageUrl}" alt="${tvShow.title}">`;

// Render using the if/else variable
const imgElementIfElse = `<img src="${imageUrlIfElse}" alt="${tvShow.title}">`;

console.log(imgElement);
console.log(imgElementIfElse);
