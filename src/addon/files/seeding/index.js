const mongoSeedFaker = require("mongo-seed-faker");
const fs = require("fs");
const dbUri = "mongodb://localhost:27017"; //set mongodb uri
const dbName = "test"; //set mongodb database name

fs.readdirSync("./seeds").forEach(async (file) => {
  console.log(file.extname)
  const model =  require("./seeds/" + file);
  const seedData = [
    {
      collectionName: model.collectionName,
      seedOnlyIfEmpty: true,
      template: model.seedingModel,
      howMany: model.seedCount
    }
  ];
   mongoSeedFaker(seedData, dbUri, dbName);
});
