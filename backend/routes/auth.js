const express = require('express')
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const router = express.Router();


//CREATE a User using: POST "/api/auth/createU\user" Doesn't require Login
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
        //check whether the user wit hthis email exist already
        let user = await User.findOne({email: req.body.email})
        if(user) {
            return res.status(400).json({Error: 'Sorry a user with this email exists'})
        }
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        
        res.send(req.body)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Some error occured')
    }
})

module.exports = router