window.countriesBackup = [];
getAllCountries();


document.querySelector('#search_button').onclick = e => {
   getBySearchValue(document.querySelector('#search').value);
}

document.querySelector('#clear').onclick = e => {
   document.querySelector('#search').value = '';
   getAllCountries();
}



function renderCountries(countriesBackup, searchValue) {
   if (!searchValue) {
      document.querySelector('#search').value = '';
   }

   if (document.querySelector('.table')) {
      document.querySelector('.table').remove();
   }

   if (document.querySelector('.alert-danger')) {
      document.querySelector('.alert-danger').remove();
   }

   let countriesElement = document.createElement('table');
   countriesElement.className = 'table table-bordered table-striped';
   let htmlStr = countriesBackup.reduce((acc, country) => {
      return acc + `<tr>
      <td>${country.name}</td>
      <td>${country.population}</td>
      <td>${country.area}</td>
      <td>${country.region}</td>
      </tr>`;
   }, '');

   
   countriesElement.innerHTML = `<thead>
   <th>Name</th>
   <th>Population</th>
   <th>Area</th>
   <th>Region</th>
   </thead>
   <tbody>${htmlStr}</tbody>`;
   document.querySelector('.container').append(countriesElement);
}



/*document.querySelector('#search').value = '';
document.querySelector('#search').onkeyup = function (e) {
   let searchValue = e.currentTarget.value.trim().toLowerCase();
   filterCountries(searchValue);
};*/


function getBySearchValue(searchValue) {
   fetch(`https://restcountries.com/v2/name/${searchValue}`)
      .then(response => response.json())
      .then(data => {
         if (data.status === 404) {
            if (!document.querySelector('.alert-danger')) {
               document.querySelector('.table').remove();

               let notFoundDivElement = document.createElement('div');
               notFoundDivElement.className = 'alert alert-danger text-center';
               notFoundDivElement.innerText = 'Not found';
               document.querySelector('.container').append(notFoundDivElement);
            }
            return;
         };

         renderCountries(mapData(data), searchValue);
      });
}

function getAllCountries() {
   fetch('https://restcountries.com/v2/all')
      .then(response => response.json())
      .then(data => {
         window.countriesBackup = data;
         renderCountries(mapData(data));
      });
}
function mapData(data) {
   return data.map(el => {
      return {
         name: el.name,
         region: el.region,
         area: el.area,
         population: el.population,
      }
   })
}
