require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const FinancialRecordRouter = require("./routes/financial-records.js");

const app = express();

app.use(express.json());

const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI)
  .then(() => console.log("connected to mongodb!"))
  .catch((err) => console.error("failed to connect to mongodb:("));

app.use("/financial-records", FinancialRecordRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is running on port: ${port}...`);
});
