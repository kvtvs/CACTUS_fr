'use strict';
const url = 'http://localhost:3000'; // change url when uploading to server
const path = 'http://127.0.0.1:5500';
//const path = 'http://localhost:63342/CACTUS_fr';

(async () => {
  try {
    const response = await fetch(url + '/auth/logout');
    const json = await response.json();
    console.log(json);
    // remove token
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    alert('Olet kirjautunut ulos! Palaa takaisin kirjautumissivulle painamalla OK.');
    location.href = path + '/login/login.html';
  } catch (e) {
    console.log(e.message);
  }
})();