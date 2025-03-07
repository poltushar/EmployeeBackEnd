import mongoose from "mongoose";

const connectDatabase = async () => {
  console.log(process.env.MongoDB_URL);
  try {
    await mongoose.connect(process.env.MongoDB_URL);
  } catch (error) {
    console.log(error);
  }
};

export default connectDatabase;
