const mongoose = require("mongoose");
const chalk = require("chalk");

mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true });
const db = mongoose.connection;

const startDbPromise = new Promise(function(resolve, reject) {
  db.on("open", resolve);
  db.on("error", console.error.bind(console, "connection error:"));
});

console.log(chalk.yellow("Opening connection to MongoDB . . ."));

startDbPromise.then(() => {
  console.log(chalk.blue("MongoDB connection opened!"));
});

module.exports = startDbPromise;
