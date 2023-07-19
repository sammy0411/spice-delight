const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require ('express-validator');

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "HelloMyNameIsSampadaSumanFromNIT"

router.post("/createuser",
    body('email','Invalid Email').isEmail(),
    body('password','Invalid Password').isLength({ min: 6 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password,salt);

        try {
            await User.create({   // mongoose model use krke ye data jaega dataase mein
                name: req.body.name,
                location: req.body.location,
                password: secPassword,
                email: req.body.email
            })
            res.json({ success: true });
        } catch (error) {
            console.log(error)
            res.json({ success: false }); //ye tab hoga j endpoint hit karke response laega
        }
    })


router.post("/loginuser",
    body('email','Invalid Email').isEmail(),
    body('password','Invalid Password').isLength({ min: 6 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        let email = req.body.email;

        try {
            
            let userData = await User.findOne({email});

            if(!userData)
            return res.status(400).json({ errors: "Enter valid credentials" });

            const pwdCompare = bcrypt.compare(req.body.password,userData.password);

            if(!pwdCompare)
            return res.status(400).json({ errors: "Enter valid password" });

            const data = {
                user:{
                    id:userData.id
                }
            }
            const authToken = jwt.sign(data,jwtSecret)

            res.json({ success: true , authToken:authToken});
        } catch (error) {
            console.log(error)
            res.json({ success: false }); //ye tab hoga j endpoint hit karke response laega
        }
    })


module.exports = router;