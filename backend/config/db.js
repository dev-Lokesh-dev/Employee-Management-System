import { connect } from "mongoose";
import { config } from "dotenv";

config()
const connectionString = process.env.connectionString

export const dbConnection = async() =>{
    await connect(connectionString)
    console.log('db connected');
    
}