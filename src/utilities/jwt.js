import jwt from "jsonwebtoken";

/**
 * Creates a JWT token with the provided data.
 * 
 * @param {object} data - Data to be included in the JWT payload
 * @returns {string} Generated JWT token
 */
const createToken = (data) => {
    return jwt.sign(data, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d" // Token expires in 1 day
    });
};

/**
 * Verifies and decodes a JWT token.
 * 
 * @param {string} token - JWT token to be verified
 * @returns {object} Decoded JWT payload
 */
const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
};

export {
    createToken,
    verifyToken
};
