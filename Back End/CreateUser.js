// const express = require("express")
// const router = express.Router()
// const User = require('../models/User')


// router.post("/createuser",
// async(req,res)=>{

//         try{
//             await User.create({
//             name: "Shyam Das",
//             password: "123456",
//             email: "shyamdas@hotmail.com",
//             location: "Barowaritala, Kolkata"
//         })
//         res.json({success: true})
//     }
//     catch(error){
//         console.log("error")
//         res.json({success: false})
//     }
// })

// module.exports = router; 

// cd .. 





const express = require("express")
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
const mongoose = require('mongoose');

const jwtSecret = "MyNameIsHrishitAryan$#"
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")   /* IMP */

router.post("/createuser", [
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password', 'Incorrect Password').isLength({ min: 5 })],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const salt = await bcrypt.genSalt(10)
        let secPassword = await bcrypt.hash(req.body.password, salt)

        try {

            await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location
                // name: "Shyam Das",
                // password: "123456",
                // email: "shyamdas@hotmail.com",
                // location: "Barowaritala, Kolkata"
            }).then(res.json({ success: true }))
        }
        catch (error) {
            console.log(error)
            res.json({ success: false })
        }
    });

    
    
//     router.post('/fooddata', (req,res)=>{
//         try{

//             // console.log(global.food_catagory)
//             // console.log(global.food_items)
            
//             res.send([global.food_items, global.food_catagory])
            
            
//         } catch (error){
//             console.error(error.message)
//             res.send("Server Error")
//         }
        
//     })


// module.exports = router;

router.post("/loginuser", [
    body('email').isEmail(),
    body('password', 'Incorrect Password').isLength({ min: 5 })],
    async (req, res) => {

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        let email = req.body.email
        try {
            let userData = await User.findOne({ email });
            if (!userData) {
                return res.status(400).json({ errors: "Try log in with correct credentials" })
            }

            const pwdCompare = await bcrypt.compare(req.body.password, userData.password) 

            if (!pwdCompare) {
                return res.status(400).json({ errors: "Try log in with correct credentials" })
            }

            const data = {
                user: {
                    id:userData.id
                }
            }

            const authToken = jwt.sign(data,jwtSecret)
            return res.json({ success: true, authToken:authToken})

            // if (req.body.password !== userData.password) {
            //     return res.status(400).json({ errors: "Try log in with correct credentials" })
            // }
        }
        catch (error) {
            console.log(error)
            res.json({ success: false })
        }
    })

module.exports = router; 