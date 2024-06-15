import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        name : {type : String, required: true},
        email : {type: String, required: true, unique: true},
        // mobileNumber : {type: Number, required: false},
        password: {type: String, required: true},
       
    },
    {
        timestamps: true, 
        versionKey: false
    }
)

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
})

userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compareSync(enteredPassword, this.password);
}


const User = mongoose.model("User", userSchema);

export default User;