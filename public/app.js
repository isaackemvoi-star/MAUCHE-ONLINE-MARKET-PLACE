const productGrid = document.querySelector(".product-grid");

async function fetchProducts() {

  try {

    const response = await fetch("/api/products");

    const products = await response.json();

    displayProducts(products);

  } catch (error) {

    console.log("Error fetching products:", error);

  }

}

function displayProducts(products) {

  productGrid.innerHTML = "";

  products.forEach(product => {

    productGrid.innerHTML += `
    
      <div class="product-card">

        <img src="${product.image}" alt="${product.name}">

        <h3>${product.name}</h3>

        <p class="price">Ksh ${product.price}</p>

        <button>Add To Cart</button>

      </div>

    `;

  });

}

fetchProducts();