const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Product = require("./models/Product");
const User = require("./models/User");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected");
})
.catch(err => console.log(err));

app.get("/", (req, res) => {

  res.sendFile(
    path.join(__dirname, "public", "index.html")
  );

});

/* PRODUCTS */

app.get("/api/products", async (req, res) => {

  const products = await Product.find();

  res.json(products);

});

app.post("/api/products", async (req, res) => {

  const newProduct = new Product(req.body);

  await newProduct.save();

  res.json(newProduct);

});

/* SIGNUP */

app.post("/api/signup", async (req, res) => {

  const { username, email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {

    return res.json({
      message: "User already exists"
    });

  }

  const salt = await bcrypt.genSalt(10);

  const hashedPassword =
    await bcrypt.hash(password, salt);

  const newUser = new User({

    username,
    email,
    password: hashedPassword

  });

  await newUser.save();

  res.json({
    message: "Signup successful"
  });

});

/* LOGIN */

app.post("/api/login", async (req, res) => {

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {

    return res.json({
      message: "User not found"
    });

  }

  const validPassword =
    await bcrypt.compare(password, user.password);

  if (!validPassword) {

    return res.json({
      message: "Invalid password"
    });

  }

  const token = jwt.sign(

    { id: user._id },

    process.env.JWT_SECRET,

    { expiresIn: "7d" }

  );

  res.json({

    token,

    user: {
      username: user.username,
      email: user.email
    }

  });

});

const PORT = process.env.PORT || 1000;

app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);

});