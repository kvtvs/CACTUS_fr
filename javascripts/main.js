'use strict';

const url = 'http://localhost:3000'

const section = document.querySelector('section');

// create the sales ad
const createSalesAd = (tuotteet) => {
  tuotteet.forEach((Tuote) => {

    const img = document.createElement('img');
    img.src = url + '/' + Tuote.Filename;
    img.alt = Tuote.Nimi;
    img.classList.add('resp');

    // figure start
    const figcaption = document.createElement('figcaption');
    figcaption.innerHTML = `${Tuote.Julkaisu_pvm}`;

    const figure = document.createElement('figure').appendChild(img);
    figure.appendChild(figcaption);
    // figure end

    //text div start
    const name = document.createElement('h3');
    name.innerHTML = `${Tuote.Nimi}`;

    const description = document.createElement('p');
    description.innerHTML = `${Tuote.Kuvaus}`;

    const price = document.createElement('p');
    price.innerHTML = `${Tuote.Hinta}€`;

    const favourite = document.createElement('div');
    const i = document.createElement ('i');
    i.className = 'far fa-star';
    favourite.appendChild(i);

    const textdiv = document.createElement('div');
    textdiv.appendChild(name);
    textdiv.appendChild(description);
    textdiv.appendChild(price);
    textdiv.appendChild(favourite);
    //text div end

    // other div start
    const seller = document.createElement('p');
    seller.innerHTML = `${Tuote.KäyttäjäID}`

    const buyButton = document.createElement('button');
    buyButton.innerHTML = 'OSTA NYT';

    const otherdiv = document.createElement('div');
    otherdiv.appendChild(seller);
    otherdiv.appendChild(buyButton);
    // TODO: function for buying something
    //other div end

    const article = document.createElement('article');
    article.appendChild(figure);
    article.appendChild(textdiv);
    article.appendChild(otherdiv);
    section.appendChild(article);
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