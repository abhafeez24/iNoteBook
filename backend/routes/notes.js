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

//ROUTE 3: update note using: PUT "/api/notes/updatenote". Login required

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const {title, description, tag} = req.body

        //create a new note object
        const newNote ={}
        if(title){newNote.title = title}
        if(description){newNote.description = description}
        if(tag){newNote.tag = tag}

        //find the note to be updated by id provided in param
        let note = await Notes.findById(req.params.id)
        if(!note) {
            return res.status(404).send('Not Found')
        }

        //check the user is updating his own notes or not
        if(note.user.toString() !== req.user.id) {
            return res.status(401).send('Not Allowed')
        }


        //update note
        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
        res.send({note})
    } catch (error) {
        console.log(error.message)
        res.status(500).send('internal server error')
    }    
})

//ROUTE 4: delete note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchuser, async (req,res) => {
    try {
        //find note to be deleted and delete it
        let note = await Notes.findById(req.params.id)
        if(!note) {
            return res.status(404).send('Not Found')   
        }

        //check the user is deleting his own notes or not
        if(note.user.toString() !== req.user.id) {
            return res.status(401).send('Not Allowed')
        }

        //delete note
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({"Success":"deleted Successfully"})
    } catch (error) {
        console.log(error.message)
        res.status(500).send('internal server error')
    }
})



module.exports = router