//this is a part 3

import { Department } from "../models/Department.js";

//step2: for part 3 create function to add data in db

export const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();

    return res.status(200).json({ success: true, departments });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "get department server error" });
  }
};

export const addDepartment = async (req, res) => {
  try {
    const { dep_name, description } = req.body;

    const newDep = new Department({
      dep_name,
      description,
    });
    await newDep.save();

    return res.status(200).json({ success: true, department: newDep });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "add department server error" });
  }
};

export const getDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    const department = await Department.findById({ _id: id });

    return res.status(200).json({ success: true, department });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "get department server error" });
  }
};

export const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { dep_name, description } = req.body;

    const updateDep = await Department.findByIdAndUpdate(
      { _id: id },
      {
        dep_name,
        description,
      }
    );
    return res.status(200).json({ success: true, updateDep });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Edit department server error" });
  }
};

export const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    //Step2:
    const deleteDep = await Department.findById({ _id: id });

    await deleteDep.deleteOne();
    return res.status(200).json({ success: true, deleteDep });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "delete department server error" });
  }
};
//video length 18.06 part 4
