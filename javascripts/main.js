'use strict';

const url = 'http://localhost:3000'

const ul = document.querySelector('#list');

// create the sales ad
const createSalesAd = (plants) => {
  ul.innerHTML = '';
  plants.forEach((plant) => {
    const img = document.createElement('img');
    img.src = url + '/' + plant.filename;
    img.alt = plant.name;
    img.classList.add('resp');

    const figure = document.createElement('figure').appendChild(img);

    const name = document.createElement('h2');
    name.innerHTML = plant.name;

    const seller = document.createElement('p');
    seller.innerHTML = `${plant.seller}`;

    const description = document.createElement('p');
    description.innerHTML = `${plant.description}`;

    const price = document.createElement('p');
    price.innerHTML = `${plant.price}€`;

    const date = document.createElement('p');
    date.innerHTML = `${plant.date}`;

    const buyButton = document.createElement('button');
    buyButton.innerHTML = 'Osta';
    // TODO: function for buying something

    const li = document.createElement('li');
    li.classList.add('light-border');

    li.appendChild(name);
    li.appendChild(figure);
    li.appendChild(seller);
    li.appendChild(description);
    li.appendChild(price);
    li.appendChild(date);
    li.appendChild(buyButton);
    ul.appendChild(li);
  });
};

//AJAX CALL

const getPlant = async () => {
  try {
    const fetchOptions = {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/plant', fetchOptions);
    const plants = await response.json();
    createSalesAd(plants);
  } catch (e){
    console.log(e.message);
  }
};

getPlant();