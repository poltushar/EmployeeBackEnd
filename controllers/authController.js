import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";

//this function to check user is present or not in database
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //to check user is match or not
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ success: false, error: "User Not Found" });
    }

    //to check password is match or not
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(404).json({ success: false, error: "Wrong Password" });
    }
    //this is a jwt web token
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: "10d" }
    );

    //return  a data property if everything is correct to show  front end

    res.status(200).json({
      success: true,
      token,
      user: { _id: user._id, name: user.name, role: user.role },
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const verify = (req, res) => {
  return res.status(200).json({ success: true, user: req.user });
};
