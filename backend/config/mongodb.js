import config from "config"
import mongoose from "mongoose";

const dbURI = config.get('MongoURI');

const MongoConnect = async () => {
    try {
        await mongoose.connect(dbURI);
        console.log("DB Connected!")
    } catch (error) {
        console.log(error);
    } 
}


export {
    MongoConnect
}