import User from "../models/user.model.js";
import { verifyToken } from "../utilities/jwt.js";

/**
 * Middleware function to authenticate user requests based on JWT token.
 * If the token is valid, sets `req.user` with the user object fetched from the database.
 * 
 * @param {import("express").Request} req - Express request object containing cookies with authToken
 * @param {import("express").Response} res - Express response object to send the response
 * @param {import("express").NextFunction} next - Express next function to pass control to the next middleware
 */
const authentication = async (req, res, next) => {
    try {
        const token = req.cookies.authToken;
        if (!token) {
            return res.status(401).send({ message: "Unauthorized" });
        }
        const decoded = verifyToken(token);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).send({ message: "Unauthorized" });
        }
        req.user = user; // Set `req.user` to the authenticated user object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(500).send({ message: "Error in authorizing the user", error: error.message });
    }
};

export {
    authentication
};
