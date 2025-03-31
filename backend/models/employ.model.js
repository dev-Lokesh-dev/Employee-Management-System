import mongoose from "mongoose";

const employ = mongoose.Schema({
    name:{type:String,required:true},
    adminEmail:{type:String,required:true},
    position:{type:String,required:true},
    contact:{type:String,required:true},
    email:{type:String,required:true},
    ProfilePicture:{type:String,required:true}
});

const employModel = mongoose.model('employee',employ);

export {employModel};