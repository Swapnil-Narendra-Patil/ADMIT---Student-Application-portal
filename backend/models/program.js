import mongoose from "mongoose";

//Program schema has details related to a particular program

const programSchema = new mongoose.Schema({
    courseName: {
      type: String,
      required: false,
    },
    courseDuration: {
      type: String,
      required: false,
    },
    credits: {
      type: Number,
      required: false,
    },
    university: {
      type: String,
      required: false,
    },
    fees: {
      type: Number,
      required: false,
    },
    education: {
      type: String,
      required: false,
    },
    specialization: {
      type: [String],
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    school: {
      type: String,
      required: false,
    },
  });
  
  const Program = mongoose.model("Program", programSchema);
  
  export {Program, programSchema};
  