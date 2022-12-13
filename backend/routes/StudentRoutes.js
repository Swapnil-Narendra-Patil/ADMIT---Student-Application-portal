import * as StudentControllers from "../controllers/StudentControllers.js";
import express from "express";
import authJwt from "../middlewares/index.js";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

//
const StudentRoutes = express.Router();

StudentRoutes.post("/signup", StudentControllers.registerStudent);

StudentRoutes.post("/login", StudentControllers.loginStudent);

//using auth middleware to allow only authenticated users to pass through
StudentRoutes.get("/", authJwt, StudentControllers.getStudent);

StudentRoutes.put("/:id", authJwt, StudentControllers.updateStudent);

StudentRoutes.delete("/:id", authJwt, StudentControllers.deleteStudent);

StudentRoutes.put("/add-education/:id", authJwt, StudentControllers.addEducation);

StudentRoutes.put("/add-experience/:id", authJwt, StudentControllers.addExperience);


export default StudentRoutes;
