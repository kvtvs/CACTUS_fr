'use strict';

const url = 'http://localhost:3000'

const section = document.querySelector('section');

// create the sales ad
const createSalesAd = (tuotteet) => {
  tuotteet.forEach((Tuote) => {

    const img = document.createElement('img');
    img.src = url + '/' + Tuote.Filename;
    img.alt = Tuote.Nimi;
    //img.classList.add('resp');

    // figure start
    const figcaption = document.createElement('figcaption');
    figcaption.innerHTML = `${Tuote.Julkaisu_pvm}`;

    const figure = document.createElement('figure');
    figure.appendChild(img)
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
    const a = document.createElement('a');
    a.href = '#';
    const i = document.createElement ('i');
    i.className = 'far fa-star';

    i.addEventListener('click', (evt) => {
    evt.preventDefault();
      // Tässä kohtaa palvelimelle tieto tykkäyksestä
      if (i.classList.contains('far')) {
        i.classList.remove('far');
        i.classList.add('fas');
      } else {
        i.classList.remove('fas');
        i.classList.add('far');
      }
    });


    a.appendChild(i);
    favourite.appendChild(a);
    favourite.classList.add('favourite')

    const textdiv = document.createElement('div');
    textdiv.appendChild(name);
    textdiv.appendChild(description);
    textdiv.appendChild(price);
    textdiv.appendChild(favourite);
    textdiv.classList.add('text');
    //text div end

    // other div start
    const seller = document.createElement('p');
    seller.innerHTML = `${Tuote.KäyttäjäID}`

    const buyButton = document.createElement('button');
    buyButton.innerHTML = 'OSTA NYT';

    const otherdiv = document.createElement('div');
    otherdiv.appendChild(seller);
    otherdiv.appendChild(buyButton);
    otherdiv.classList.add('other');
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
