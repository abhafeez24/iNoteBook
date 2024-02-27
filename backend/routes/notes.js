const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator');
const router = express.Router();



//ROUTE 1: Add new notes using: POST "/api/notes/addnote". Login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({min: 3}),
    body('description', 'Discription must be 5 characters').isLength({min: 5})
] ,async (req, res)=> {
    try {
        const {title, description, tag} = req.body

        //if  there is any error return bad request
        const errors = validationResult(req);
        if(!errors.isEmpty) {
            return res.status(400).json({errors: errors.array()})
        }

        //create new note
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('internal server error')
    }
    
})


//ROUTE 2: Get all notes using: GET "/api/notes/getuser". Login required
router.get('/fetchallnotes', fetchuser ,async (req, res)=> {
    try {
        const notes = await Notes.find({user: req.user.id})
        res.json(notes)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('internal server error')
    }
})

module.exports = router