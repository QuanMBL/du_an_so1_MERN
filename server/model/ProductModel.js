import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {type: String, require: true}, 
    category : {type: String, require: true},
    image: {type: String, require: true},
    price: {type: String, require: true}
})

export default mongoose.model("Product", userSchema)
        