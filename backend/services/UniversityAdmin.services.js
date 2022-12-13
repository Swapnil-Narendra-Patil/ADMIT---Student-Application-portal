import { UniversityAdmin } from "../models/index.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import config from "config";

//CRUD services for university admin
export const saveUniversityAdmin = async (universityAdminObjToCreate) => {
  try {
    const saltForHash = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(
      universityAdminObjToCreate.password,
      saltForHash
    );
    const newUniversityAdmin = UniversityAdmin(universityAdminObjToCreate);
    newUniversityAdmin.password = hashedPassword;
    await newUniversityAdmin.save();
    const payload = {
      uniAdminId: newUniversityAdmin.id,
    };
    const token = jsonwebtoken.sign(payload, config.get("jwtSecret"), {
      expiresIn: 1800,
    }); //creating jwt
    const universityAdminObjCreated = {
      email: newUniversityAdmin.email,
      university: newUniversityAdmin.university,
      universityName: newUniversityAdmin.universityName,
    };
    const savedUniversityAdminObj = {
      token,
      ...universityAdminObjCreated,
    };
    return savedUniversityAdminObj;
  } catch (error) {
    console.log(error);
  }
};

export const loginUniversityAdminService = async (email, password) => {
  const universityAdmin = await UniversityAdmin.findOne({ email });
  if (!universityAdmin) {
    return null;
  }
  const verify = await bcryptjs.compare(password, universityAdmin.password);
  if (!verify) {
    return null;
  }
  const payload = {
    uniAdminId: universityAdmin.id,
  };
  const universityAdminObj = {
    token: jsonwebtoken.sign(payload, config.get("jwtSecret"), {
      expiresIn: 1800,
    }),
    uniAdminId: universityAdmin.id,
    email: universityAdmin.email,
    university: universityAdmin.university,
    universityName: universityAdmin.universityName,
  };
  return universityAdminObj;
};

export const getUniversityAdminById = (id) => {
  try {
    const universityAdminObj = UniversityAdmin.findById(id);
    return universityAdminObj;
  } catch (error) {
    console.log(error);
  }
};

export const updateUniversityAdminById = (id, universityAdminObj) => {
  try {
    const newUniversityAdminObj = UniversityAdmin.findByIdAndUpdate(
      id,
      universityAdminObj,
      {
        new: true,
      }
    );
    return newUniversityAdminObj;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUniversityAdminById = (id) => {
  try {
    const deletedOj = UniversityAdmin.findByIdAndDelete(id);
    return deletedOj;
  } catch (error) {
    console.log(error);
  }
};
