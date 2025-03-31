import { Router } from "express";
import { createEmployee , getEmployees, updateEmployee, deleteEmployee} from "../controllers/employee.controller.js";
import {upload} from "../middleware/upload.js";

const emplyeeRoute = Router();

emplyeeRoute.post('/create',upload.single('image'),createEmployee)

emplyeeRoute.post('/update',upload.single('image'),updateEmployee)

emplyeeRoute.get('/getEmployee',getEmployees)

emplyeeRoute.delete('/:id',deleteEmployee)

export {emplyeeRoute}
