import mongoose from 'mongoose';

const dbConnect = async () => {
    console.log('DB_URL:', process.env.DB_URL); // Check DB_URL here
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process with failure
  }
};

export default dbConnect;
