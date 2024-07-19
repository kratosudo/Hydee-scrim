//declaring variables
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");
  const movieList = document.getElementById("movie-list");
  

  //add eventlistener for search button
  searchButton.addEventListener("click", () => {
    const query = searchInput.value;
    if (query) {
      fetchMovies(query);
    }
  });

  // add eventlistener for enter key press in search input
  searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      const query = searchInput.value;
      if (query) {
        fetchMovies(query);
      }
    }
  });

  //add eventListner for dark mode toggle
  const darkModeToggle = document.createElement("button");
  darkModeToggle.textContent = "Toggle Dark Mode";
  darkModeToggle.className = "mt-4 bg-gray-700 text-white py-2 px-4 rounded";
  document.querySelector("header").appendChild(darkModeToggle);

  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("bg-gray-900");
    document.body.classList.toggle("text-gray-100");

    const movieItems = document.querySelectorAll(".movie-item");
    movieItems.forEach((item) => {
      item.classList.toggle("bg-gray-700");
      item.classList.toggle("text-white");
    });
  });

  //function to fetch movies
  const fetchMovies = async (query) => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${query}&apikey=d2a713b4`
      );
      const data = await response.json();
      if (data.Response === "True") {
        displayMovies(data.Search); // Corrected 'search' to 'Search'
      } else {
        movieList.innerHTML =
          '<p class="text-center text-red-500">No movies found.</p>';
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  //display movies
  const displayMovies = (movies) => {
    movieList.innerHTML = "";
    movies.forEach((movie) => {
      const movieItem = document.createElement("div");
      movieItem.className = "bg-white p-4 rounded shadow-md cursor-pointer";
      movieItem.innerHTML = `
        <h2 class="text-xl font-bold">${movie.Title}</h2>
        <p>${movie.Year}</p>
        <img src="${movie.Poster}" alt="${movie.Title}" class="w-full h-64 object-cover mt-2">
      `;

      // Add event listener to movie item
      movieItem.addEventListener("click", () => {
        handleMovieSelection(movie, movieItem);
      });

      movieList.appendChild(movieItem);
    });
  };

  // Handle movie selection
  const handleMovieSelection = (movie, movieItem) => {
    // Deselect any previously selected movie
    const selectedMovie = document.querySelector(".selected");
    if (selectedMovie) {
      selectedMovie.classList.remove("selected", "border-4", "border-blue-500");
    }

    // Select the clicked movie
    movieItem.classList.add("selected", "border-4", "border-blue-500");

    // Perform any additional actions with the selected movie
    console.log("Selected movie:", movie);
  };
});

