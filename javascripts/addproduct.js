'use strict';
const url = 'http://localhost:3000'; // change url when uploading to server
const path = 'http://127.0.0.1:5500';
//const path = 'http://localhost:63342/CACTUS_fr';


// select existing html elements
const addForm = document.querySelector('#addProductForm');

// submit add product form
addForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const fd = new FormData(addForm);
  const fetchOptions = {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
    },
    body: fd,
  };
  const response = await fetch(url + '/plant', fetchOptions);
  const json = await response.json();
  alert(json.message);
  location.href = path + '/mainpage/main.html';
});
