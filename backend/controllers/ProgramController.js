import { Program } from "../models/index.js";
import {
  saveProgram,
  updateProgramById,
  deleteProgramById,
  getAllPrograms,
} from "../services/Program.service.js";
import { setResponse, setRequestError, setServerError } from "./utils.js";

//Create program route
async function createProgram(req, res) {
  try {
    var programObj = req.body;
    const isProgramPresent = await Program.exists({
      courseName: programObj.courseName,
      university: programObj.university,
    });
    if (isProgramPresent) {
      return setRequestError({ msg: "Program already exists!" }, res);
    }
    const savedProgram = await saveProgram(programObj);
    return setResponse(savedProgram, res);
  } catch (error) {
    console.log(error);
    return setServerError({ msg: "Internal server error" }, res);
  }
}

//get all programs
async function getPrograms(req, res) {
  try {
    const programObj = await getAllPrograms(req.params.id);
    return setResponse(programObj, res);
  } catch (error) {
    console.log(error);
    return setRequestError({ msg: "Internal server error" }, res);
  }
}


//update a program
async function updateProgram(req, res) {
  try {
    const currentProgram = req.body;
    const isProgramPresent = await Program.findById(req.params.id).select(
      "_id"
    );
    if (!isProgramPresent) {
      return setRequestError({ msg: "Program does not exist!" }, res);
    }
    const updatedProgram = await updateProgramById(
      req.params.id,
      currentProgram
    );
    if (updatedProgram) {
      return setResponse(updatedProgram, res);
    }
    return setRequestError({ msg: "Could not update the program!" }, res);
  } catch (error) {
    console.log(error);
    return setRequestError({ msg: "Internal server error" }, res);
  }
}


//delete a program
async function deleteProgram(req, res) {
  try {
    const isProgramPresent = await Program.findById(req.params.id).select(
      "_id"
    );
    if (!isProgramPresent) {
      return setRequestError({ msg: "Program does not exist!" }, res);
    }
    const deletedProgram = await deleteProgramById(req.params.id);
    if (deletedProgram) {
      return setResponse(deletedProgram, res);
    }
    return setRequestError({ msg: "Could not delete the program!" }, res);
  } catch (error) {
    console.log(error);
    return setRequestError({ msg: "Internal server error" }, res);
  }
}

export { createProgram, getPrograms, updateProgram, deleteProgram };
