import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.js";
import departmentRouter from "./routes/department.js";
import employeeRouter from "./routes/employee.js";
import connectDatabase from "./dbConnection/db.js";
import salaryRouter from "./routes/salary.js";
import LeaveRouter from "./routes/leave.js";
import changePasswordRoute from "./routes/ChangePassword.js";

import dashboardRouter from "./routes/dashboard.js";

import attendanceRouter from "./routes/attendance.js";

LeaveRouter;

//Step4:Add Routes
connectDatabase();

const app = express();
app.use(express.static("public/uploads"));

app.use(
  cors({
    origin: "https://fresh-mern-employee-front-end.vercel.app",
    credentials: true,
  })
);
app.use(express.json()); //to convert nodejs  file to json file

//first
app.use("/api/auth", authRouter);
//second
app.use("/api/department", departmentRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/salary", salaryRouter);
app.use("/api/leave", LeaveRouter);

app.use("/api/dashboard", changePasswordRoute);

app.use("/api/dashboard", dashboardRouter);

app.use("/api/attendance", attendanceRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is Running on Port ${process.env.PORT}`);
});
