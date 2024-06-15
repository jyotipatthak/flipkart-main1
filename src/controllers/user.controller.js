import User from "../models/user.model.js";
import { sendEmail } from "../utilities/email.js";
import { createToken } from "../utilities/jwt.js";

/**
 * Registers a new user with the provided name, email, and password.
 * Sends a welcome email upon successful registration.
 * 
 * @param {import("express").Request} req - Express request object containing user registration data in req.body
 * @param {import("express").Response} res - Express response object to send the response
 * @returns {Promise<void>}
 */
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Create a new user with provided details
    const user = await User.create({
      name,
      email,
      password,
    });

    // Prepare and send a welcome email to the registered user
    const emailOptions = {
      from: "jyotipathak604@gmail.com",
      to: email,
      subject: "Welcome to our platform",
      html: `<h1>Welcome ${name}</h1> 
            <p>Thanks for registering on our platform</p>
            <p>Now you can login to our platform with your email and password</p>
            <p>Thanks</p>`,
    };
    sendEmail(emailOptions);

    // Respond with a success message upon successful user registration
    return res.status(201).send({ message: "User registered successfully" });
  } catch (error) {
    // Handle errors that occur during user registration
    return res.status(500).send({ message: "Error registering user", error: error.message });
  }
};

/**
 * Logs in a user with the provided email and password.
 * Generates and sets an authentication token as a cookie upon successful login.
 * 
 * @param {import("express").Request} req - Express request object containing user login data in req.body
 * @param {import("express").Response} res - Express response object to send the response
 * @returns {Promise<void>}
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "Invalid credentials" });
    }

    // Verify if the entered password matches the stored password
    const passwordMatch = await user.matchPassword(password);
    if (!passwordMatch) {
      return res.status(400).send({ message: "Invalid credentials" });
    }

    // Create an authentication token and set it as a cookie
    const token = createToken({ id: user._id });
    res.cookie("authToken", token, {
      path: "/",
      expires: new Date(Date.now() + 3600000), // Token expiration time (1 hour)
      secure: true, // Cookie can only be sent over HTTPS
      httpOnly: true, // Cookie cannot be accessed via client-side scripts
      sameSite: "None", // Cookie is sent with cross-origin requests
    });

    // Respond with a success message and the authentication token
    return res.status(200).send({ message: "User logged in successfully", token });
  } catch (error) {
    // Handle errors that occur during user login
    return res.status(500).send({ message: "Error in logging the user", error: error.message });
  }
};

/**
 * Logs out the currently logged-in user by clearing the authentication cookie.
 * 
 * @param {import("express").Request} req - Express request object
 * @param {import("express").Response} res - Express response object to send the response
 * @returns {Promise<void>}
 */
const logout = async (req, res) => {
  // Clear the authentication token cookie
  res.clearCookie("authToken");

  // Respond with a success message upon successful logout
  return res.status(200).send({ message: "User logged out successfully" });
};

/**
 * Deletes a user with the specified ID from the database.
 * 
 * @param {import("express").Request} req - Express request object containing user ID in req.params
 * @param {import("express").Response} res - Express response object to send the response
 * @returns {Promise<void>}
 */
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the user by ID
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Respond with a success message upon successful user deletion
    return res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    // Handle errors that occur during user deletion
    return res.status(500).send({ message: "Error in deleting the user", error: error.message });
  }
};

export { register, login, logout, deleteUser };
