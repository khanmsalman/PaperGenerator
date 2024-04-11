import jwt from 'jsonwebtoken'
import AuthModel from '../models/AuthModel.js'

const IsUserAuthenticated = async (req, res, next) => {
    let token;
    const { authorization } = req.headers; 
    
    if (authorization && authorization.startsWith("Bearer")) {
        try {
            token = authorization.split(" ")[1];
            // verify token and get user id that i stored during login
            const { userID } = jwt.verify(token, "papergenerator");
            // Get User through userId and remove password
            req.user = await AuthModel.findById(userID).select("-password")
            next() ; 
        } catch (error) {
            res.status(401).json({ message: "UnAuthorized User" })
        }
    } else {
        res.status(401).json({ message: "UnAuthorized User" }) 
    }
}

export default IsUserAuthenticated;