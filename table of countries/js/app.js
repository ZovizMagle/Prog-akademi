console.log(countries);
let htmlString = '';
for(let item in countries) {
   let country = countries[item];
   htmlString += `<tr>
      <td>${country.name.official}</td>
      <td>${country.region}</td>
      <td>${country.population}</td>
      <td><img src="${country.flags.png}"></td>
   </tr>`
}

document.getElementById('countries').innerHTML = htmlString;
