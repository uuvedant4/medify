const mongoose = require("mongoose");

const DB =
  "mongodb+srv://uuvedant4:uUW4d30yOvy5cZcZ@cluster0.zznsutl.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("DataBase Connected"))
  .catch((errr) => {
    console.log(errr);
  });
