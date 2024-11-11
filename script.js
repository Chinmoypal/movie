//Part 1 UI
document.addEventListener('DOMContentLoaded', () => {
    const movieList = document.getElementById('movieList');
    const movieModal = document.getElementById('movieModal');
    const closeButton = document.querySelector('.close-button');

    function openModal(movie) {
        document.getElementById('movieTitle').textContent = movie.title;
        document.getElementById('movieDirector').textContent = movie.director;
        document.getElementById('movieCast').textContent = movie.cast.join(', ');
        document.getElementById('movieDuration').textContent = movie.duration;
        document.getElementById('movieReleaseDate').textContent = movie.releaseDate;
        document.getElementById('movieRating').textContent = movie.rating;
        document.getElementById('movieTags').textContent = movie.tags.join(', ');
        movieModal.style.display = 'flex';
    }

    closeButton.addEventListener('click', () => {
        movieModal.style.display = 'none';
    });

    // Fetch and display movies (sample data here for testing)
    const movies = [
        { title: "Movie 1", director: "Director 1", cast: ["Actor A", "Actor B"], duration: "120 min", releaseDate: "2021", rating: "8.0", tags: ["Action", "Adventure"], thumbnail: "thumbnail1.jpg" },
        { title: "Movie 2", director: "Director 2", cast: ["Actor C", "Actor D"], duration: "110 min", releaseDate: "2022", rating: "7.5", tags: ["Comedy"], thumbnail: "thumbnail2.jpg" }
    ];

    movies.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.classList.add('movie-item');
        movieItem.innerHTML = <><img src="${https://drive.google.com/file/d/15B1OLJsTPPJvUhN16BYHVwbaGQ1OoAEk/view}" alt="${movie.title}" /><p>${movie.title}</p></>;
        movieItem.addEventListener('click', () => openModal(movie));
        movieList.appendChild(movieItem);
    });
});

// Part-2
function filterMovies() {
    const searchQuery = document.getElementById('searchInput').value.toLowerCase();
    const selectedGenre = document.getElementById('genreFilter').value;
    const filteredMovies = movies.filter(movie => {
        const matchesSearch = movie.title.toLowerCase().includes(searchQuery);
        const matchesGenre = !selectedGenre || movie.tags.includes(selectedGenre);
        return matchesSearch && matchesGenre;
    });
    displayMovies(filteredMovies);
}


// part-3 sorting function
function sortMovies(criteria, order) {
    const sortedMovies = movies.sort((a, b) => order === 'asc' ? a[criteria] - b[criteria] : b[criteria] - a[criteria]);
    displayMovies(sortedMovies);
}

// Pagination
const itemsPerPage = 10;
let currentPage = 1;

function displayPage(page) {
    currentPage = page;
    const start = (page - 1) * itemsPerPage;
    const paginatedMovies = movies.slice(start, start + itemsPerPage);
    displayMovies(paginatedMovies);
}
//part-4 Initialize Firebase (add your Firebase config here)
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function fetchMovies() {
    db.collection("movies").onSnapshot(snapshot => {
        movies = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        displayMovies(movies);
    });
}

fetchMovies();