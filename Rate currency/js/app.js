window.currencys = [];


function filterCurrencys(searchValue) {
   let result = [];
   for(let currency of currencys) {
      let currencyName = currency.txt.trim().toLowerCase();
      let currencysValue = currency.rate + '';
      if (currencyName.indexOf(searchValue) >= 0 || currencysValue.indexOf(searchValue) >= 0) {
         result.push(currency);
      }
   }
   renderCurrencys(result);
}

function renderCurrencys(currencys) {
   let htmlStr = '';

   if (!currencys.length) {
      htmlStr = `<tr><td colspan='4' class='text-center'>No Items Found</td></tr>`;
      document.getElementById('currencys').innerHTML = htmlStr;
      return;
}


   for (let currency of currencys) {
      htmlStr += `<tr>
         <td>${currency.txt}</td>
         <td>${currency.rate}</td>
      </tr>`
   }
   document.getElementById('currencys').innerHTML = htmlStr;

   let trs = document.getElementsByTagName('tr');
   for (let item = 0; item < trs.length; item++) {
      let tr = trs[item];
      tr.onmouseenter = function(e) {
         e.currentTarget.classList.add('bg-success');
      }
      
      tr.onmouseleave = function(e) {
         e.currentTarget.classList.remove('bg-success');
      }
   }
}





fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=20221110&json').then(res => res.json()).then(function (data) {
   window.currencys = data;
   renderCurrencys(data);
});


let search = document.getElementById('search');
search.onkeyup = function (e) {
   let searchValue = e.currentTarget.value;
   filterCurrencys(searchValue.trim().toLowerCase());
}

