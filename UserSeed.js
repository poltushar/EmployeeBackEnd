import connectDatabase from "./dbConnection/db.js";
import User from "./models/User.js";
import bcrypt from "bcrypt";

const userRegister = async () => {
  connectDatabase();
  try {
    const hashPassword = await bcrypt.hash("admin", 10);
    console.log("d");
    const newUser = new User({
      name: "Admin",
      email: "admin@gmail",
      password: hashPassword,
      role: "admin",
    });
    console.log("d");

    await newUser.save();
  } catch (error) {
    console.log(error);
  }
};

userRegister();
