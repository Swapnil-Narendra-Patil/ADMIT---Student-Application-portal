import { Program } from "../models/index.js";

//CRUD services for program
export const saveProgram = async (programObjToCreate) => {
  try {
    const newProgram = Program(programObjToCreate);
    await newProgram.save();
    const programObjCreated = {
      courseName: newProgram.courseName,
      courseDuration: newProgram.courseDuration,
      credits: newProgram.credits,
      university: newProgram.university,
      fees: newProgram.fees,
      education: newProgram.education,
      specialization: newProgram.specialization,
      description: newProgram.description,
      school: newProgram.school,
    };
    return programObjCreated;
  } catch (error) {
    console.log(error);
  }
};

export const updateProgramById = async (programId, programObjToUpdate) => {
  try {
    const program = await Program.findByIdAndUpdate(
      programId,
      programObjToUpdate,
      { new: true }
    );
    return program;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProgramById = async (programId) => {
  try {
    const program = await Program.findByIdAndDelete(programId);
    return program;
  } catch (error) {
    console.log(error);
  }
};

export const getAllPrograms = async () => {
  try {
    const programs = await Program.find();
    return programs;
  } catch (error) {
    console.log(error);
  }
};
