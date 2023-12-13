

const { Router } = require("express");
const authSignInController = Router();

// const express = require('express');
const jwt = require('jsonwebtoken');
// const app = express();
const {userModel} = require("./module/user.model");






authSignInController.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email, password });
    if (user) {
        const secretKey = 'your-secret-key'; 
        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' }); 
        res.json({ message: 'Login Success', token });
    } else {
        res.status(401).json({ message: 'Login failed' });
    }
});


module.exports = authSignInController;