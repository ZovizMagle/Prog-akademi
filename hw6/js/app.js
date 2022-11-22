window.productsBackup = [];

fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(function (data) {
    window.productsBackup = data;
    renderProducts(data)
  })
    

    function renderProducts(productsBackup) {
      let htmlStr = '';
    for (let product of productsBackup) {
      htmlStr += `<div class="card">
      <img class="card-img-top" src="${product.image}" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">${product.title}</h5>
        <p class="card-text">${product.category}</p>
        <p class="card-price">${product.price}</p>
      </div>
    </div>`
      }
      document.querySelector('#products').innerHTML = htmlStr;
    }

document.querySelector('#search').onkeyup = function (e) {
  let searchValue = e.currentTarget.value.trim().toLowerCase();
  filterProducts(searchValue);
};



function filterProducts(searchValue) {
  let filteredProducts = productsBackup.filter(function (product) {
    return product.title.toLowerCase().indexOf(searchValue) >= 0 || product.category.toLowerCase().indexOf(searchValue) >= 0;
  });
  renderProducts(filteredProducts);
}









































