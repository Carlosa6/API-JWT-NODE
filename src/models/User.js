import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        ref: "Role", //hace referencia al modelo de roles
        type: Schema.Types.ObjectId //guardará el id del rol
    }]
}, {
    timestamps: true,
    versionKey: false
})

userSchema.statics.encryptPassword = async(password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

userSchema.statics.comparePassword = async(password, receivePassword) => {
    return await bcrypt.compare(password, receivePassword)
}

export default model('User', userSchema)