import { Schema, model } from 'mongoose'

const productSchema = new Schema({
    name: String,
    category: String,
    price: Number,
    imgUrl: String
}, {
    timestamps: true,
    versionKey: false //para que no apoarezca el _v
})

export default model('Product', productSchema)