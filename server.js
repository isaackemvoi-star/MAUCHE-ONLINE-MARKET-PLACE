const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

/* FRONTEND CONNECTION */
app.use(express.static(path.join(__dirname, "public")));

/* PRODUCTS */
const products = [
  {
    id: 1,
    name: "Running Shoes",
    price: 4500,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000"
  },
  {
    id: 2,
    name: "Smart Phone",
    price: 25000,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1000"
  },
  {
    id: 3,
    name: "Fashion T-shirt",
    price: 1200,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000"
  }
];

/* ROUTES */

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

/* SERVER */

const PORT = 1000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});