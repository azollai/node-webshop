const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");

dotenv.config({ path: "./config/config.env" });

connectDB();

const products = require("./routes/products");
const basketItems = require("./routes/basket-items");

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/products", products);
app.use("/api/v1/basket-items", basketItems);

const PORT = process.env.PORT || 6000;

const server = app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);

process.on("unhandledRejection", (error, promise) => {
  console.log(`Error: ${error.message}`);
  server.close(() => process.exit(1));
});
