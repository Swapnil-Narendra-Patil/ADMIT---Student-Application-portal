import axios from "axios";
import { setAuthToken } from '../utils';
import { IMG1_RECEIVED, IMG2_RECEIVED, IMG3_RECEIVED, UNIVERSITY_LOADED, UNIVERSITY_LOADED_FAILED, UNIVERSITY_LOAD_START } from "./types";

//THis action gets the university and its three images 
export const getUniversityById = (id) => async dispatch => {
    const token = localStorage.getItem('token');
    if(token){
        setAuthToken(token);
    }
    console.log("University action invoked");
    try {
        const response = await axios.get("/universities/" + id)
        dispatch({
            type: UNIVERSITY_LOADED,
            payload: response.data
        })
        const imgResponse1 = await axios.get("/universities/university-images/" + id + "/0", {responseType: "blob"});
        var imageUrl1 = URL.createObjectURL(imgResponse1.data);
        dispatch({
            type: IMG1_RECEIVED,
            payload: imageUrl1
        })
        const imgResponse2 = await axios.get("/universities/university-images/" + id + "/1", {responseType: "blob"});
        var imageUrl2 = URL.createObjectURL(imgResponse2.data);
        dispatch({
            type: IMG2_RECEIVED,
            payload: imageUrl2
        })
        const imgResponse3 = await axios.get("/universities/university-images/" + id + "/2", {responseType: "blob"});
        var imageUrl3 = URL.createObjectURL(imgResponse3.data);
        dispatch({
            type: IMG3_RECEIVED,
            payload: imageUrl3
        })
    } catch (error) {
        console.log(error);
        dispatch({
            type: UNIVERSITY_LOADED_FAILED,
            payload: null
        })
    }
}

//This action starts the load process
export const startUniversityLoad = (id) => async dispatch => {
    dispatch({
        type: UNIVERSITY_LOAD_START,
        payload: id
    })
}