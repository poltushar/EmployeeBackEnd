//Step2: To Add Controller

import { Employee } from "../models/Employee.js";
import Leave from "../models/Leave.js";

export const addLeave = async (req, res) => {
  try {
    const { userId, leaveType, startDate, endDate, reason } = req.body;

    console.log(req.body);

    const employee = await Employee.findOne({ userId });
    const newLeave = new Leave({
      employeeId: employee._id,
      leaveType,
      startDate,
      endDate,
      reason,
    });

    await newLeave.save();

    return res.status(200).json({ success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "leave add server Error " });
  }
};

export const getLeave = async (req, res) => {
  try {
    const { id, role } = req.params;

    let leaves;
    if (role === "admin") {
      leaves = await Leave.find({ employeeId: id });
    } else {
      const employee = await Employee.findOne({ userId: id });

      leaves = await Leave.find({ employeeId: employee._id });
    }

    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "leave get server Error " });
  }
};

export const getLeaves = async (req, res) => {
  try {
    //leave is connection with employee thats way populate
    const leaves = await Leave.find().populate({
      path: "employeeId",
      populate: [
        {
          path: "department",
          select: "dep_name",
        },
        {
          path: "userId",
          select: "name",
        },
      ],
    });
    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "leave get server Error " });
  }
};

export const getLeaveDatail = async (req, res) => {
  try {
    //leave is connection with employee thats way populate

    const { id } = req.params;
    const leave = await Leave.findById({ _id: id }).populate({
      path: "employeeId",
      populate: [
        {
          path: "department",
          select: "dep_name",
        },
        {
          path: "userId",
          select: "name profileImage",
        },
      ],
    });
    return res.status(200).json({ success: true, leave });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "leave getdetail server Error " });
  }
};

export const updateLeave = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(req.body.status);

    const leave = await Leave.findByIdAndUpdate(
      { _id: id },
      { status: req.body.status }
    );

    if (!leave) {
      return res.status(404).json({ success: false, error: "leave not found" });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "leave update server Error " });
  }
};
