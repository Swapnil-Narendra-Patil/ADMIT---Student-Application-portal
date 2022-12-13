import mongoose from "mongoose";
import {programSchema} from "./program.js";

//University object 
const universitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  programs: {
    type: [programSchema],
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  images: [{
    type: String
  }]
});

const University = mongoose.model("University", universitySchema);

export default University;
