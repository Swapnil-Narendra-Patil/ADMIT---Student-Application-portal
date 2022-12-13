import jsonwebtoken from "jsonwebtoken";
import { setResponse, setRequestError, setServerError} from "../controllers/utils.js";
import config from "config";

// This middleware function is used to check whether a person is authenticated or not
//If an unauthorized user tries to access a private route, they will be sent 400 status response
//Use this function before all private controller
const authJwt = async (req, res, next) => {
    const token = req.header('x-auth-token');

    if(!token){
        return setRequestError({ msg : "Cannot authenticate!" }, res);
    }

    try {
        const verifyToken = jsonwebtoken.verify(token, config.get('jwtSecret'));
        req.userId = verifyToken.userId;
        
        next();

    } catch (error) {
        console.log(error)
        return setRequestError({ msg : "Token Invalid" }, res);
    }
}

export default authJwt;