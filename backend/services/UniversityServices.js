import { University } from "../models/index.js";
import config from "config";
import path from "path";
import { fileURLToPath } from "url";

//CRUD for university
const saveUniversityService = async universityObj => {
    try {
        const savedUniversityObj = University(universityObj);
        return savedUniversityObj.save();
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getAllUniversitiesService = async () => {
    try {
        const allUniversities = University.find();
        return allUniversities;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getUniversitiesByIdsService = async ids => {
    try {
        const universities = await University.find({ _id: { $in: ids } });
        return universities;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getUniversityByIdService = async id => {
    try {
        const university = University.findById(id);
        return university;
    } catch (error) {
        console.log(error);
        return null;
    }
};

// search university by Name
const getUniversityByNameService = async name => {
    try {
        console.log(name);
        const university = University.find({
            name: { $regex: name, $options: "i" },
        }).limit(10);
        console.log(university);
        return university;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const updateUniversityByIdService = async (id, updateUniversity) => {
    try {
        const updatedUniversity = University.findByIdAndUpdate(id, updateUniversity, {
            new: true,
        });
        return updatedUniversity;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const deleteUniversityByIdService = async id => {
    try {
        const deletedUniversity = University.findByIdAndDelete(id);
        return deletedUniversity;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getUniversityImageService = async id => {
    try {
        const university = University.findById(id);
        return university;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export {
    saveUniversityService,
    getAllUniversitiesService,
    getUniversitiesByIdsService,
    getUniversityByNameService,
    getUniversityByIdService,
    updateUniversityByIdService,
    deleteUniversityByIdService,
    getUniversityImageService,
};
