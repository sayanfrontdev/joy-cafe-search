document.addEventListener('DOMContentLoaded', function () {
    const searchBox = document.getElementById('searchBox');
    const cafeList = document.getElementById('cafeList');

    // Fetch cafes and places on page load
    fetchCafesAndPlaces();

    // Add event listener to the search box
    searchBox.addEventListener('input', function () {
        const searchTerm = searchBox.value.trim().toLowerCase();
        filterCafes(searchTerm);
    });

    // Function to fetch cafes and places from the given endpoints
    function fetchCafesAndPlaces() {
        const cafesEndpoint = 'https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/cafes.json';
        const placesEndpoint = 'https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/places.json';

        Promise.all([fetchData(cafesEndpoint), fetchData(placesEndpoint)])
            .then(([cafes, places]) => {
                displayCafes(cafes, places);
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    // Function to fetch data from a given endpoint
    function fetchData(endpoint) {
        return fetch(endpoint)
            .then(response => response.json())
            .catch(error => console.error('Error fetching data:', error));
    }

    // Function to display cafes based on the search term
    function filterCafes(searchTerm) {
        const filteredCafes = cafes.filter(cafe => cafe.name.toLowerCase().includes(searchTerm));
        displayCafes(filteredCafes, places);
    }

    // Function to display cafes in the table
    function displayCafes(cafes, places) {
        cafeList.innerHTML = '';

        cafes.forEach(cafe => {
            const place = places.find(place => place.id === cafe.place_id);
            if (place) {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${cafe.name}</td>
                    <td>${place.street_no}</td>
                    <td>${place.locality}</td>
                    <td>${place.postal_code}</td>
                    <td>${place.lat}</td>
                    <td>${place.long}</td>
                `;
                cafeList.appendChild(row);
            }
        });
    }
});
