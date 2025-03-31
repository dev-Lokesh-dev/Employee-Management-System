import express from 'express'
import { config } from 'dotenv'
import { dbConnection } from './config/db.js';
import { userRouter } from './routes/user.route.js';
import { authMiddleware } from './middleware/auth.middleware.js';
import { emplyeeRoute } from './routes/employee.routes.js';
import cors from 'cors'

const app = express();
config();
const port = process.env.port

app.use(express.json())
app.use(cors())
app.use('/user',userRouter)

app.use('/employee',authMiddleware,emplyeeRoute)

app.listen(port,async() =>{
    await dbConnection();
    console.log(`server is runing on ${port}`);
});



