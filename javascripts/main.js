'use strict';

const url = 'http://localhost:3000'

const section = document.querySelector('section');
section.innerHTML = '';
// create the sales ad
const createSalesAd = (tuotteet) => {
  tuotteet.forEach((Tuote) => {

    const img = document.createElement('img');
    img.src = // TODO: linkki kuvaan/kuviin! url + '/' + plant.filename;
    img.alt = Tuote.Nimi;
    //img.classList.add('resp');

    const figcaption = document.createElement('figcaption');
    figcaption.innerHTML = `${Tuote.Julkaisu_pvm}`;

    const figure = document.createElement('figure').appendChild(img);
    figure.appendChild(figcaption);

    const name = document.createElement('h3');
    name.innerHTML = `${Tuote.Nimi}`;

    const description = document.createElement('p');
    description.innerHTML = `${Tuote.Kuvaus}`;

    const price = document.createElement('p');
    price.innerHTML = `${Tuote.Hinta}€`;

    const seller = document.createElement('p');
    seller.innerHTML = `${Tuote.KäyttäjäID}`

    const buyButton = document.createElement('button');
    buyButton.innerHTML = 'Osta';
    // TODO: function for buying something

    const article = document.createElement('article');

    li.appendChild(name);
    li.appendChild(figure);
    li.appendChild(sellername);
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