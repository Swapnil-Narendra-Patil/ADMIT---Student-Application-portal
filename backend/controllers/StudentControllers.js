import Student from "../models/student.js";
import { deleteStudentById, getStudentById, saveStudent, updateStudentById, loginService, addEducationService, addExperienceService } from "../services/StudentServices.js";
import { setResponse, setRequestError, setServerError} from "./utils.js";

//register a student
const registerStudent = async (req, res) => {
    try {
        var studentObj = req.body;
        const isStudentPresent = await Student.exists({email: studentObj.email});
        if(isStudentPresent){
            return setRequestError({msg: "Student already exists!"}, res);
        }
        const savedStudent = await saveStudent(studentObj);
        return setResponse(savedStudent, res);
    } catch (error) {
        console.log(error)
        return setServerError({msg: "Internal server error"}, res);
    }
}

//get a student based on the id
const getStudent = async (req, res) => {
    try {
        const studentObj = await getStudentById(req.userId);
        if(studentObj){
            return setResponse(studentObj, res);
        }
        return setRequestError({msg: "Student does not exist!"}, res); 
    } catch (error) {
        console.log(error)
        return setRequestError({msg: "Internal server error"}, res); 
    }
}

//update a student -> edit profile in the frontend
const updateStudent = async (req, res) => {
    try {
        const currentStudent = req.body;
        const isStudentPresent = await Student.findById(req.params.id).select("_id");
        if(isStudentPresent._id.toString() != req.userId){ // added this to make sure that students can only update thier own profile
            return setRequestError({msg: "Not authorized"}, res);  
        }
        if(!isStudentPresent){
            return setRequestError({msg: "Student does not exist!"}, res); 
        }
        const updatedStudent = await updateStudentById(req.params.id, currentStudent);  
        if(updatedStudent){
            updatedStudent.userId = req.params.id;
            await updatedStudent.save();
            console.log(updatedStudent)
            return setResponse(updatedStudent, res);
        }
        return setRequestError({msg: "Could not update the student!"}, res); 
    } catch (error) {
        console.log(error)
        return setRequestError({msg: "Internal server error"}, res); 
    }
}

const deleteStudent = async (req, res) => {
    try {
        const isStudentPresent = await Student.findById(req.params.id).select("_id");
        if(isStudentPresent._id.toString() != req.userId){ // added this to make sure that students can only delete thier own profile
            return setRequestError({msg: "Not authorized"}, res);  
        }
        const deletedOj = await deleteStudentById(req.params.id);
        return setResponse(deletedOj, res);
    } catch (error) {
        console.log(error)
        return setRequestError({msg: "Internal server error"}, res); 
    }
}

// Logs in the student if correct email and password combination is used
const loginStudent = async (req, res) => {
    try {
        const {email, password} = req.body;
        const studentObj = await loginService(email, password);
        if(!studentObj){
            return setRequestError({msg: "Incorrect credentials!"}, res); 
        }
        return setResponse(studentObj, res);

    } catch (error) {
        console.log(error);
        return setRequestError({msg: "Internal server error"}, res); 
    }
}

//Add education to the student array
const addEducation = async (req, res) => {
    try {
        const newStudentObj = await addEducationService(req.params.id, req.body);
        return setResponse(newStudentObj, res);
    } catch (error) {
        console.log(error);
        return setRequestError({msg: "Internal server error"}, res); 
    }
}

//add experience to the student array
const addExperience = async (req, res) => {
    try {
        const newStudentObj = await addExperienceService(req.params.id, req.body);
        return setResponse(newStudentObj, res);
    } catch (error) {
        console.log(error);
        return setRequestError({msg: "Internal server error"}, res); 
    }
}

export {
    registerStudent,
    getStudent,
    updateStudent,
    deleteStudent,
    loginStudent,
    addEducation,
    addExperience,
}