import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/User.js';

import { validateRegisterData, validateLoginData } from '../validators/authValidator.js';
import { generateProfileImage, generateUniqueUsername } from '../helpers/authHelper.js';

const register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        const errors = await validateRegisterData({ fullName, email, password });
        if (errors) {
            return res.status(400).json({ errors });
        }

        const username = await generateUniqueUsername(email);
        const passwordHashed = await bcrypt.hash(password, 10);

        const profileImage = generateProfileImage();

        const newUser = new User({
            personalInfo: {
                fullName,
                email,
                password: passwordHashed,
                username,
                profileImage,
            },
        });

        await newUser.save();

        res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Failed to register user:', error.message);
        res.status(500).json({ error: 'Failed to register user' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const errors = await validateLoginData({ email, password });
        if (errors) {
            return res.status(400).json({ errors });
        }

        const user = await User.findOne({ 'personalInfo.email': email });
        if (!user || !(await bcrypt.compare(password, user.personalInfo.password))) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

        res.status(200).json({ message: 'User logged in successfully', token });
    } catch (error) {
        console.error('Failed to login user:', error.message);
        res.status(500).json({ error: 'Failed to login user' });
    }
};

const me = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized: No token provided' });
        }

        const token = authHeader.split(' ')[1];

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ error: 'Token expired, please login again' });
            } else if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ error: 'Invalid token, please login again' });
            } else {
                return res.status(500).json({ error: 'Token verification failed' });
            }
        }

        req.user = decoded.userId;

        const user = await User.findById(req.user);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error('Failed to fetch current user:', error.message);
        res.status(500).json({ error: 'Failed to fetch current user' });
    }
};

export { register, login, me };