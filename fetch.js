'use strict';



function performFetch() {
  fetch('http://localhost:8000/movie', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer 65c71052-556c-11e9-8647-d663bd873d93',
    },
    body: JSON.stringify({ test: 'data' }),
  }).then(res => console.log(res));
}

performFetch();