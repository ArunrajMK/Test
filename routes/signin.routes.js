

const { Router } = require("express");
const router = Router();

// const express = require('express');
const jwt = require('jsonwebtoken');
// const app = express();
const {userModel} = require("../module/user.model");







router.post("/", async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (user) {
        // If the user exists, compare the provided password with the hashed password stored in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            const secretKey = 'your-secret-key';
            const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
            res.json({ message: 'Login Success', token, name: user.name, firm_name: user.firm_name, mobile: user.mobile, email: user.email });
        } else {
            // Password does not match
            res.status(401).json({ message: 'Login failed: Incorrect password' });
        }
    } else {
        // User not found with the provided email
        res.status(401).json({ message: 'Login failed: User not found' });
    }
});


module.exports = router;