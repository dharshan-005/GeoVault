import fs from "fs";
import path from "path";

import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import placesRouter from "./routes/places-routes.js";
import usersRouter from "./routes/users-routes.js";
import HttpError from "./models/http-error.js";

const app = express();

app.use(bodyParser.json());

app.use("/uploads/images", express.static(path.join("uploads", "images")));

// CORS handling
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST,PATCH, DELETE");
  next();
});

app.use("/api/places", placesRouter);
app.use("/api/users", usersRouter);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

// error Handling
app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }

  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error" });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@travelblog.zgpzw7h.mongodb.net/${process.env.DB_NAME}?appName=TravelBlog`,
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
