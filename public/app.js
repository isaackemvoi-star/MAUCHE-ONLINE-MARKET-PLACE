const productGrid =
document.querySelector(".product-grid");

const form =
document.getElementById("productForm");

const authModal =
document.getElementById("authModal");

const openLogin =
document.getElementById("openLogin");

const openSignup =
document.getElementById("openSignup");

const closeModal =
document.getElementById("closeModal");

const loginForm =
document.getElementById("loginForm");

const signupForm =
document.getElementById("signupForm");

/* FETCH PRODUCTS */

async function fetchProducts(){

const response =
await fetch("/api/products");

const products =
await response.json();

displayProducts(products);

}

/* DISPLAY PRODUCTS */

function displayProducts(products){

productGrid.innerHTML = "";

products.forEach(product => {

productGrid.innerHTML += `

<div class="product-card">

<img src="${product.image}">

<h3>${product.name}</h3>

<p class="price">
Ksh ${product.price}
</p>

<button>Add To Cart</button>

</div>

`;

});

}

/* ADD PRODUCT */

form.addEventListener("submit", async (e)=>{

e.preventDefault();

const product = {

name:
document.getElementById("name").value,

price:
document.getElementById("price").value,

image:
document.getElementById("image").value

};

await fetch("/api/products",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(product)

});

form.reset();

fetchProducts();

});

/* LOGIN MODAL */

openLogin.addEventListener("click", ()=>{

authModal.style.display = "flex";

loginForm.classList.remove("hidden");

signupForm.classList.add("hidden");

});

openSignup.addEventListener("click", ()=>{

authModal.style.display = "flex";

signupForm.classList.remove("hidden");

loginForm.classList.add("hidden");

});

closeModal.addEventListener("click", ()=>{

authModal.style.display = "none";

});

/* SIGNUP */

signupForm.addEventListener("submit", async (e)=>{

e.preventDefault();

const username =
document.getElementById("signupUsername").value;

const email =
document.getElementById("signupEmail").value;

const password =
document.getElementById("signupPassword").value;

const response =
await fetch("/api/signup",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
username,
email,
password
})

});

const data =
await response.json();

alert(data.message);

});

/* LOGIN */

loginForm.addEventListener("submit", async (e)=>{

e.preventDefault();

const email =
document.getElementById("loginEmail").value;

const password =
document.getElementById("loginPassword").value;

const response =
await fetch("/api/login",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
email,
password
})

});

const data =
await response.json();

if(data.token){

localStorage.setItem(
"token",
data.token
);

alert("Login Successful");

authModal.style.display = "none";

}else{

alert(data.message);

}

});

fetchProducts();