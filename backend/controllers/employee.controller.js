import { employModel } from "../models/employ.model.js";
import { uploadToCloudinary } from "../middleware/upload.js";
import { v2 as cloudinary } from 'cloudinary';

const createEmployee = async(req,res) =>{
    const {adminEmail} = req.user;
    const {name,position,email,contact} = req.body;
   
    
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    if(!name || ! position || !contact){
        return res.status(401).json({ error: 'filed is missing' });
    }

    try {
        const imageUrl = await uploadToCloudinary(req.file.path);
        console.log(imageUrl);
        await  employModel.create({name,adminEmail,position,email,contact,ProfilePicture:imageUrl});
        res.status(201).json({msg:'sucessful'});

    } catch (error) {
        return res.status(401).json(error);
    }
    
}



const getEmployees = async (req, res) => {
    const {adminEmail} = req.user;
    try {
        const employees = await employModel.find({adminEmail});
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ error: "Error fetching employees" });
    }
};


const updateEmployee = async (req, res) => {
    const { id, name, position, email, contact } = req.body;

    try {
        const employee = await employModel.findById(id);
        if (!employee) return res.status(404).json({ error: "Employee not found" });

        let imageUrl = employee.ProfilePicture;

        if (req.file) {
            if (employee.ProfilePicture) {
                try {
                    const publicId = employee.ProfilePicture.split("/").pop().split(".")[0];
                    await cloudinary.uploader.destroy(`uploads/${publicId}`);
                } catch (error) {
                    console.error("Cloudinary delete error:", error);
                }
            }
            
            imageUrl = await uploadToCloudinary(req.file.path);
        }

        const updatedEmployee = await employModel.findByIdAndUpdate(
            id,
            { name, position, email, contact, ProfilePicture: imageUrl },
            { new: true }
        );

        res.status(200).json({ msg: "Employee updated successfully", updatedEmployee });
    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ error: "Error updating employee" });
    }
};



const deleteEmployee = async (req, res) => {
    const { id } = req.params;

    try {
        const employee = await employModel.findById(id);

        const publicId = employee.ProfilePicture.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`uploads/${publicId}`);

        await employModel.findByIdAndDelete(id);

        res.status(200).json({ msg: "Employee deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting employee" });
    }
};

export {createEmployee, getEmployees, updateEmployee, deleteEmployee}