const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB is connected`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;

// Use the following code to in server.js file
// const connectDB = require("./config/connect-db");

// const startServer = async () => {
//   try {
//     await connectDB();
//     app.listen(PORT, () => {
//       console.log(`Server is running on : ${PORT}`);
//     });
//   } catch (error) {
//     console.log(error);
//   };
// };
// startServer();
