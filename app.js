const cafesWithPlaces = [];

document.addEventListener("DOMContentLoaded", function () {
  const searchBox = document.getElementById("searchBox");
  const cafeList = document.getElementById("cafeList");

  // Fetch cafes and places on page load
  fetchCafesAndPlaces();

  // Add event listener to the search box
  searchBox.addEventListener("input", function () {
    const searchTerm = searchBox.value.trim().toLowerCase();
    filterCafes(searchTerm);
  });

  // Function to fetch cafes and places from the given endpoints
  function fetchCafesAndPlaces() {
    const cafesEndpoint =
      "https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/cafes.json";
    const placesEndpoint =
      "https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/places.json";

    Promise.all([fetchData(cafesEndpoint), fetchData(placesEndpoint)])
      .then(([{ cafes }, { places }]) => {
        // First store cafes and places in cafesWithPlaces array
        formatAndStoreCafesWithPlaces(cafes, places);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  // Function to fetch data from a given endpoint
  function fetchData(endpoint) {
    return fetch(endpoint)
      .then((response) => response.json())
      .catch((error) => console.error("Error fetching data:", error));
  }

  // Function to display cafes based on the search term
  function filterCafes(searchTerm) {
    let filteredCafes = Object.assign([], cafesWithPlaces);
    if (searchTerm?.length > 0) {
      filteredCafes = cafesWithPlaces.filter((cafe) =>
        cafe.name.toLowerCase().includes(searchTerm)
      );
    }
    console.log("filteredCafes :>> ", filteredCafes);
    displayCafes(filteredCafes);
  }

  // Function to display cafes in the table
  function displayCafes(filteredCafes) {
    // Clear the table
    cafeList.innerHTML = "";
    filteredCafes.forEach((cafe) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${cafe.name}</td>
                <td>${cafe.street_no}</td>
                <td>${cafe.locality}</td>
                <td>${cafe.postal_code}</td>
                <td>${cafe.lat}</td>
                <td>${cafe.long}</td>
            `;
      cafeList.appendChild(row);
    });
  }

  // Function to format and store cafes and places in cafesWithPlaces array
  function formatAndStoreCafesWithPlaces(cafes, places) {
    const idMappedPlaces = {};
    places.forEach((place) => (idMappedPlaces[place.id] = place));
    cafes.forEach((cafe) =>
      cafesWithPlaces.push({
        ...cafe,
        ...idMappedPlaces[cafe.location_id],
      })
    );
    displayCafes(cafesWithPlaces);
  }
});
