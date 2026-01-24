import mongoose from "mongoose";

import Product from "./models/product.js";

mongoose
  .connect(
    "mongodb+srv://tbapp:tbapp123@travelblog.zgpzw7h.mongodb.net/products_test?appName=TravelBlog"
  )
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch(() => {
    console.log("Connection to MongoDB failed!");
  });

const createProduct = async (req, res, next) => {
  const createdProduct = new Product({
    name: req.body.name,
    price: req.body.price,
  });
  const result = await createdProduct.save();

  res.json(result);
};

const getProducts = async (req,res,next) => {
    const products = await Product.find().exec();
    res.json(products);
}

export default { createProduct, getProducts };