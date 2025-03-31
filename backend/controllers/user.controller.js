import { User } from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const signup = async (req, res) => {
    try {
        console.log('akfk');
        const { name, email, password } = req.body;
        console.log(name,email,password);
        

        if (!name || !email || !password) {
            return res.status(400).json({ msg: 'Field is missing' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await User.create({ name, email, password: hashedPassword });

        res.status(201).json({ msg: 'User created successfully', newUser });
    } catch (error) {
        res.status(500).json({ msg: 'Internal server error', error });
    }
};

const login = async (req, res) => {
    try {
        
        
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ msg: 'Field is missing' });
        }

        const loggedUser = await User.findOne({ email });
        if (!loggedUser) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const verifyPassword = await bcrypt.compare(password, loggedUser.password);
        if (!verifyPassword) {
            return res.status(401).json({ msg: 'Wrong password' });
        }

        const token = jwt.sign({ adminEmail: loggedUser.email, id: loggedUser._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });

        res.status(200).json({ msg: 'Login successful', token:token });
    } catch (error) {
        console.error('Login Error:', error); 
        res.status(500).json({ msg: 'Internal server error', error: error.message });
    }
};


export { signup, login };
