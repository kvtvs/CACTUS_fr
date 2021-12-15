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

  const filteredPlants = plants.filter((character) => {
    return (
        character.name.toLowerCase().includes(searchString) ||  //joku muu kuin character??
        character.description.toLowerCase().includes(searchString)

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

const displayCharacters = (characters) => {
  const htmlString = characters
  .map((character) => {
    return `
            <li class="character">
                <h2>${character.name}</h2>
                <p>House: ${character.house}</p>
                <img src="${character.image}"></img>
            </li>
        `;
  })
  .join('');
  plantList.innerHTML = htmlString;
};

loadPlants();
