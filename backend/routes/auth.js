const express = require('express')
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'IamaGoodb$oy'


//CREATE a User using: POST "/api/auth/createuser" Doesn't require Login
router.post('/createuser',[
    body('name','Enter a Valid Name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password','Min 5 char required').isLength({ min: 5 })

    ], async (req, res) => {

    //if there are errors return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


    try {
        //check whether the user with this email exist already
        let user = await User.findOne({email: req.body.email})
        if(user) {
            return res.status(400).json({Error: 'Sorry a user with this email exists'})
        }

        //bcrypt password
        const salt = await bcrypt.genSalt(10)
        const secPassword = await bcrypt.hash(req.body.password, salt)

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPassword,
        })
        
        //jwt
        const data = {
            user: {
                id: user.id
            }
        }
        const token = jwt.sign(data, JWT_SECRET)        //generate token synchronously
        res.json({token})

    } catch (error) {
        console.error(error.message)
        res.status(500).send('internal server error')
    }
})

//LOGIN User: POST "/api/auth/loginuser" 
router.post('/loginuser', [
    body('email', 'Enter a valid email').isEmail(),
    body('password','password cannot be blank').exists()
], async (req, res)=> {

    //if error return bad request
    const errors = await validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const {email, password} = req.body

    try {
        let user = await User.findOne({email})
        if(!user) {
            return res.status(400).json({error: 'Please try to login with correct credentials'})
        }

        //password compare with hashPassword
        const passwordCompare = await bcrypt.compare(password, user.password)
        if(!passwordCompare) {
            return res.status(400).json({error: 'Please try to login with correct credentials'})
        }

        //generate token
        const data = {
            user: {
                id: user.id
            }
        }
        const token = jwt.sign(data, JWT_SECRET)
        res.json({token})

    } catch (error) {
        console.log(error.message)
        res.status(500).send('internal server error')
    }
})

module.exports = router