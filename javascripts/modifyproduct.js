'use strict';
const url = 'http://localhost:3000'; // change url when uploading to server
const path = 'http://127.0.0.1:5500';

// get query parameter
const getQParam = (param) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
};

// get id from address
const plant_id = getQParam('id');

// select existing html elements
const modForm = document.querySelector('#modifyProductForm');

// get user data
const user = JSON.parse(sessionStorage.getItem('user'));

// add existing product data to form
const getPlant = async (id) => {
  const fetchOptions = {
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
    },
  };
  const response = await fetch(url + '/plant/' + id, fetchOptions);
  const plant = await response.json();
  const inputs = modForm.querySelectorAll('input');
  inputs[0].value = plant.name;
  inputs[1].value = plant.price;
  inputs[2].value = plant.description;
};

// submit modify form
modForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const data = serializeJson(modForm);
  // remove empty properties
  for (const [prop, value] of Object.entries(data)) {
    if (value === '') {
      delete data[prop];
    }
  }
  const fetchOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
    },
    body: JSON.stringify(data),
  };

  console.log(fetchOptions);
  const response = await fetch(url + '/plant/' + plant_id, fetchOptions);
  const json = await response.json();
  if (json.error) {
    alert(json.error.message);
  } else {
    alert(json.message);
  }
  location.href = path + '/mainpage/main.html';
});

// start filling the form
//if (user.role === 0) {
  //getUsers(); // if admin
//} else {
  //getCat(cat_id); // if regular user
//}
