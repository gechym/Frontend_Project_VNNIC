import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function dbConnect() {
    console.log('process.env.DB_URL', process.env.DB_URL);
  mongoose
    .connect(
      process.env.DB_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      console.log("Successfully connected to MongoDB Atlas!");
    })
    .catch((error) => {
      console.log("Unable to connect to MongoDB Atlas!");
      console.error(error);
    });
}

export default dbConnect;
