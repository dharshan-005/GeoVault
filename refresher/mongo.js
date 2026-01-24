import { MongoClient } from "mongodb";

const url =
  "mongodb+srv://tbapp:tbapp123@travelblog.zgpzw7h.mongodb.net/products_test?appName=TravelBlog";

const createProduct = async (req, res, next) => {
  const newProduct = {
    name: req.body.name,
    price: req.body.price,
  };

  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db();
    const result = await db.collection("products").insertOne(newProduct);
  } catch (error) {
    return res.json({ message: "Creating product failed!" });
  }
  client.close();

  res.json(newProduct);
};

const getProducts = async (req, res, next) => {
  const client = new MongoClient(url);

  let products;

  try {
    await client.connect();
    const db = client.db();
    products = await db.collection("products").find().toArray();
  } catch (error) {
    return res.json({ mssage: "We could not retrieve products!" });
  };
  client.close();

  res.json(products);
};

export default { createProduct, getProducts };
