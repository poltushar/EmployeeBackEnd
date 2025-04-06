//Step3:Create a addEmployee to add

//multer library to store image in database
import multer from "multer";
import { Employee } from "../models/Employee.js";
import User from "../models/User.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";
// import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcrypt";

import cloudinaryPkg from "cloudinary";
const { v2: cloudinary } = cloudinaryPkg;

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/uploads");
//   },

//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// //to check where is a put on the images

// export const upload = multer({ storage: storage });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_kEY,
  api_secret: process.env.CLOUDINARY_API_Secret,

  secure: true,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
    format: async (req, file) => "png" || "jpg",
    public_id: (req, file) => file.originalname.split(".")[0] + "",
  },
});
export const upload = multer({ storage: storage });

export const addEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      dob,
      employeeId,
      maritalStatus,
      gender,
      designation,
      department,
      Salary,
      password,
      role,
    } = req.body;

    console.log(req.body);

    const user = await User.findOne({ email });

    console.log(req.file);

    if (user) {
      return res
        .status(400)
        .json({ success: false, error: "User Already Registed in Employee" });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const newUSer = new User({
      name,
      email,
      password: hashpassword,
      role,
      profileImage: req.file ? req.file.path : "",
    });

    const savedUser = await newUSer.save();

    const newEmployee = new Employee({
      userId: savedUser._id,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      Salary,
    });

    await newEmployee.save();

    return res.status(200).json({ success: true, message: "employee created" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "server error in adding employee" });
  }
};

export const getEmployees = async (req, res) => {
  //populate means get userid data  and department data (means userid,email,password ,department,designation)
  try {
    //password 0 means not return password to server
    const employees = await Employee.find()
      .populate("userId", { password: 0 })
      .populate("department");

    return res.status(200).json({ success: true, employees });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "get Employees server error" });
  }
};

export const getEmployee = async (req, res) => {
  //populate means get userid data  and department data (means userid,email,password ,department,designation)

  const { id } = req.params;
  try {
    //password 0 means not return password to server

    let employee;

    //this is check a employee id
    employee = await Employee.findById({ _id: id })
      .populate("userId", { password: 0 })
      .populate("department");

    //if employee id  is not present then you have to find out the  userId on employee profile

    if (!employee) {
      employee = await Employee.findOne({ userId: id })
        .populate("userId", { password: 0 })
        .populate("department");
    }

    return res.status(200).json({ success: true, employee });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "get Employees server error" });
  }
};

//its updating based on user if user is present then show error and else not presenting then add the data annd also find employee db
export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, maritalStatus, designation, Salary, department } = req.body;

    const employee = await Employee.findById({ _id: id });

    if (!employee) {
      return res
        .status(404)
        .json({ success: false, error: "Employee is not found" });
    }

    const user = await User.findById({ _id: employee.userId });

    if (!user) {
      return res.status(404).json({ success: false, error: "user not found" });
    }

    const updateUser = await User.findByIdAndUpdate(
      { _id: employee.userId },
      { name }
    );

    const updateEmployee = await Employee.findByIdAndUpdate(
      { _id: id },
      { maritalStatus, designation, Salary, department }
    );

    if (!updateEmployee || !updateUser) {
      return res
        .status(404)
        .json({ success: false, error: "documnet not found" });
    } else {
      return res
        .status(200)
        .json({ success: true, message: "employee update" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Edit employee server error" });
  }
};

export const fetchEmployeesByDepId = async (req, res) => {
  const { id } = req.params;
  try {
    //password 0 means not return password to server
    const employee = await Employee.find({ department: id });

    return res.status(200).json({ success: true, employee });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "get EmployeesByDepId server error" });
  }
};
