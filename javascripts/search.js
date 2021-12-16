'use strict';

const url = 'http://localhost:3000'
const path = 'http://127.0.0.1:5500';
//const path = 'http://localhost:63342/CACTUS_fr';

const plantList = document.getElementById('plantList');
const searchBar = document.getElementById('searchBar');
let plants = [];

/*
console.log(searchBar);
searchBar.addEventListener('keyup', (e) => {
  console.log(e.target.value);
});
*/



searchBar.addEventListener('keyup', (e) => {
  const searchString = e.target.value.toLowerCase();

  const filteredPlants = plants.filter((Tuote) => {
    return (
        Tuote.Nimi.toLowerCase().includes(searchString) ||
        Tuote.Kuvaus.toLowerCase().includes(searchString)

    );
  });
  displayCharacters(filteredPlants);
  console.log(filteredPlants);
});


//HAE MYYNTI-ILMOITUS (AJAX CALL)
const loadPlants = async () => {
  try {
    const response = await fetch(url + '/plant'); //tähän API url
    plants = await response.json();
    displayCharacters(plants);
    console.log(plants)
  } catch (err) {
    console.error(err);
  }
};

const displayCharacters = (tuotteet) => {
  const htmlString = tuotteet
  .map((Tuote) => {
    return `
            <li class="character">
                <h2>${Tuote.Nimi}</h2>
                <p>Kuvaus: ${Tuote.Kuvaus}</p>
                <p>Hinta: ${Tuote.Hinta}</p>
                <img src="${Tuote.Filename}"></img>
            </li>
        `;
  })
  .join('');
  plantList.innerHTML = htmlString;
};

loadPlants();
