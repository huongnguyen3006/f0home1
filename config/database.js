const mongoose = require("mongoose")

MONGO_URI = "mongodb+srv://patientF0:patientF0@cluster0.ixwar.mongodb.net/F0treatment?retryWrites=true&w=majority";

// mongodb+srv://patientF0:<password>@cluster0.ixwar.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

exports.connect = () => {
  // Connecting to the database
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
};

