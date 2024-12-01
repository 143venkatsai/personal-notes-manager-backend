const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const router = express.Router();
// const { check, validationResult } = require("express-validator");

const JWT_SECRET = process.env.JWT_SECRET

// Signup Route
router.post("/signup", async (req, res) =>{
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({name, email, password: hashedPassword});
        await user.save();
        res.status(201).json({message: "User created successfully"})
    } catch (error) {
        console.log("signup Error:", error);
        res.status(500).json({ message: "Failed to create user" });
    }                   
});

// Login Route 
router.post('/login', async (req, res) =>{
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "1d" });
        res.json({ token });
    } catch (error) {
        return res.status(500).json({ message: "Failed to login user" });
    }
});

module.exports = router;
