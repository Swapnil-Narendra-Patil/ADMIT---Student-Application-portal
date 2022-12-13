import * as ProgramControllers from "../controllers/ProgramController.js";
import express from "express";
import authJwt from "../middlewares/index.js";

const ProgramRoutes = express.Router();
//Routes for post
ProgramRoutes.post("/", ProgramControllers.createProgram);

ProgramRoutes.get("/", ProgramControllers.getPrograms);

ProgramRoutes.put("/:id", ProgramControllers.updateProgram);

ProgramRoutes.delete("/:id", ProgramControllers.deleteProgram);

export default ProgramRoutes;
