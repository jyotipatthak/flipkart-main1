import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        // User's name, required field
        name: { type: String, required: true },
        // User's email, required and unique field
        email: { type: String, required: true, unique: true },
        // User's password, required field
        password: { type: String, required: true },
        // Additional fields can be added here
    },
    {
        // Automatically manage timestamps for creation and updates
        timestamps: true,
        // Disable the default "__v" field in MongoDB documents
        versionKey: false
    }
);

// Middleware to hash the user's password before saving
userSchema.pre("save", async function(next) {
    if (!this.isModified('password')) {
        next();
    }
    try {
        const salt = await bcrypt.genSaltSync(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
        console.log("Error hashing password", error);
        next(error);
    }
});

// Method to compare entered password with hashed password
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compareSync(enteredPassword, this.password);
};

// Create a User model based on the userSchema
const User = mongoose.model("User", userSchema);

export default User;
