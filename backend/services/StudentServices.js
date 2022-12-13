import {Student} from "../models/index.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import config from "config";

//CRUD services for student
export const saveStudent = async (studentObjToCreate) => {
    try {
        const saltForHash = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(studentObjToCreate.password, saltForHash);
        const newStudent = Student(studentObjToCreate);
        newStudent.password = hashedPassword;
        await newStudent.save();
        const payload = {
            userId: newStudent.id
        }
        const token = jsonwebtoken.sign(payload, config.get("jwtSecret"), {expiresIn: 3600});//creating jwt
        const studentObjCreated = {
            name: newStudent.name,
            email: newStudent.email,
            phone: newStudent.phone,
            education: newStudent.education,
            experience: newStudent.experience,
            greScore: newStudent.greScore,
            toeflScore: newStudent.toeflScore,
            ieltsScore: newStudent.ieltsScore,
            governmentId: newStudent.governmentId,
        }
        const savedStudentObj = {
            token,
            ...studentObjCreated
        };
        return savedStudentObj;
    } catch (error) {
        console.log(error);
    }
}

export const loginService = async (email, password) => {
    const student = await Student.findOne({email});
    if (!student){
        return null;
    }
    const verify = await bcryptjs.compare(password, student.password);
    if(!verify){
        return null;
    }
    const payload = {
        userId: student.id
    }
    const studentObj = {
        token: jsonwebtoken.sign(payload, config.get("jwtSecret"), {expiresIn: 3600}),
        _id: student.id,
        name: student.name,
        email: student.email,
        phone: student.phone,
        education: student.education,
        experience: student.experience,
        greScore: student.greScore,
        toeflScore: student.toeflScore,
        ieltsScore: student.ieltsScore,
        governmentId: student.governmentId,
        shortlistedUniversities: student.shortlistedUniversities,
        dateOfBirth: student.dateOfBirth,
        gender: student.gender
    }
    return studentObj;
}

export const getStudentById = (id) => {
    try {
        const studentObj = Student.findById(id).select("-password");
        return studentObj;
    } catch (error) {
        console.log(error);
    }
}

export const updateStudentById = (id, studentObj) => {
    try {
        const newStudentObj = Student.findByIdAndUpdate(id, studentObj, {new: true}).select("-password");
        return newStudentObj;
    } catch (error) {
        console.log(error);
    }
}

export const deleteStudentById = (id) => {
    try {
        const deletedOj = Student.findByIdAndDelete(id);
        return deletedOj;
    } catch (error) {
        console.log(error);
    }
}

export const addEducationService = async(id, educationObj) => {
    try {
        const studentObj = await Student.findById(id);
        studentObj.education.push(educationObj);
        return studentObj.save();
    } catch (error) {
        console.log(error);
    }
}

export const addExperienceService = async(id, experienceObj) => {
    try {
        const studentObj = await Student.findById(id);
        studentObj.experience.push(experienceObj);
        return studentObj.save();
    } catch (error) {
        console.log(error);
    }
}