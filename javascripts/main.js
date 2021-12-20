'use strict';

//const url = 'http://localhost:3000'; // change url when uploading to server
const url ='https://10.114.34.88/app/'
//const path = 'http://127.0.0.1:5500';
//const path = 'http://localhost:63342/CACTUS_fr';
const path = 'https://10.114.34.88/~CACTUS_fr/';
const user = JSON.parse(sessionStorage.getItem('user'));

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
    const modifyButton = document.createElement('button');
    modifyButton.innerHTML = 'MUOKKAA';
    
    const buyButton = document.createElement('button');
    buyButton.innerHTML = 'OTA YHTEYTTÄ';

    const a2 = document.createElement('a');
    a2.href = 'mailto:esimerkki@sahkoposti.com';
    a2.appendChild(buyButton);

    const a3 = document.createElement('a');
    a3.href = '/modifyproduct/modifyproduct.html?plant_id=' + Tuote.TuoteID;
    a3.classList.add('modify');

    if (Tuote.KäyttäjäID === user.KäyttäjäID) {
    a3.appendChild(modifyButton);
  };

    const otherdiv = document.createElement('div');
    otherdiv.appendChild(a3);
    otherdiv.appendChild(a2);
    otherdiv.classList.add('other');
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
