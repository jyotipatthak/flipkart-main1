// src/middlewares/user.middleware.js

import User from "../models/user.model.js";
import { verifyToken } from "../utilities/jwt.js";

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
        req.user = user;
        next();
    } catch (error) {
        return res.status(500).send({ message: "Error in authorizing the user", error: error.message });
    }
};

export {
    authentication
};
