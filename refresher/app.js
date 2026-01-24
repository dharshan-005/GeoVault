import express from "express";
import bodyParser from "body-parser";
import mongoPractice from "./mongoose.js";

const app = express();

app.listen(3000);

app.use(bodyParser.json());

app.post("/products", mongoPractice.createProduct);

app.get("/products", mongoPractice.getProducts);
