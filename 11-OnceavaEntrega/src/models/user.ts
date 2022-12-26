import mongoose from "mongoose"
import byCript from "bcrypt"
const users= 'users'

const usersSchema = new mongoose.Schema(
    {
    username: { type: String, require: true},
    password: { type: String, require: true, max: 100 },
},
{timestamps: true}
)


const userModel = mongoose.model(users, usersSchema)
export default userModel 