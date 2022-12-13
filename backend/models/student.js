import mongoose from "mongoose";

//Education details to be included in the education array
const educationSchema = new mongoose.Schema({
  university: {
    type: String,
  },
  gpa: {
    type: Number,
  },
  degree: {
    type: String,
  },
  specialization: {
    type: String,
  },
});

//experience details to be included in the experience array
const experienceSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: false,
  },
  currentWorkFlag: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    required: true,
  },
});

const studentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  // education is an array of ids referring to the education model
  education: {
    type: [educationSchema],
    required: false,
    default: [],
  },
  // experience is an array of ids referring to the experience model
  experience: {
    type: [experienceSchema],
    required: false,
    default: [],
  },
  // array of application ids
  applications: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Application",
    required: false,
    default: [],
  },
  // array of shortlisted universities, links to university model
  shortlistedUniversities: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "University",
    required: false,
    default: [],
  },
  greScore: {
    type: Number,
    required: false,
  },
  toeflScore: {
    type: Number,
    required: false,
  },
  ieltsScore: {
    type: Number,
    required: false,
  },
  governmentId: {
    type: String,
    required: false,
  },
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
