const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config({ path: "./config/config.env" });

connectDB();

const Product = require("./models/Product");

const prducts = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/products.json`, "utf-8")
);

const importData = async () => {
  try {
    await Product.create(prducts);

    console.log("Data imported...");
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

const deleteData = async () => {
  try {
    await Product.deleteMany();

    console.log("Data destroyed...");
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}