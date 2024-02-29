

import { useState } from 'react'
import NoteContext from './NoteContext'

const NoteState = (props) => {
   const notesInitial = [
    {
      "_id": "65deffc8v9f6ffdcf6a5c1b24",
      "user": "65deff699f6ffdcf6a5c1b1d",
      "title": "iNotebook front-end",
      "description": "Frontend note",
      "tag": "project",
      "date": "2024-02-28T09:41:28.675Z",
      "__v": 0
    },
    {
      "_id": "65deffc8c9f6ffdcf6a5c1b24",
      "user": "65deff699f6ffdcf6a5c1b1d",
      "title": "iNotebook front-end",
      "description": "Frontend note",
      "tag": "project",
      "date": "2024-02-28T09:41:28.675Z",
      "__v": 0
    },
    {
      "_id": "65deffc89f6ffzdcf6a5c1b24",
      "user": "65deff699f6ffdcf6a5c1b1d",
      "title": "iNotebook front-end",
      "description": "Frontend note",
      "tag": "project",
      "date": "2024-02-28T09:41:28.675Z",
      "__v": 0
    },
    {
      "_id": "65deffc89f6ffdcf6fa5c1b24",
      "user": "65deff699f6ffdcf6a5c1b1d",
      "title": "iNotebook front-end",
      "description": "Frontend note",
      "tag": "project",
      "date": "2024-02-28T09:41:28.675Z",
      "__v": 0
    },
    {
      "_id": "65defffc89f6ffdcf6a5c1b24",
      "user": "65deff699f6ffdcf6a5c1b1d",
      "title": "iNotebook front-end",
      "description": "Frontend note",
      "tag": "project",
      "date": "2024-02-28T09:41:28.675Z",
      "__v": 0
    },
    {
      "_id": "65deffc89ff6ffdcf6a5c1b24",
      "user": "65deff699f6ffdcf6a5c1b1d",
      "title": "iNotebook front-end",
      "description": "Frontend note",
      "tag": "project",
      "date": "2024-02-28T09:41:28.675Z",
      "__v": 0
    },
    {
      "_id": "65deffc89f6ffdcf6a5fc1b24",
      "user": "65deff699f6ffdcf6a5c1b1d",
      "title": "iNotebook front-end",
      "description": "Frontend note",
      "tag": "project",
      "date": "2024-02-28T09:41:28.675Z",
      "__v": 0
    },
    {
      "_id": "65deffc89f6ffdcf6aa5c1b24",
      "user": "65deff699f6ffdcf6a5c1b1d",
      "title": "iNotebook front-end",
      "description": "Frontend note",
      "tag": "project",
      "date": "2024-02-28T09:41:28.675Z",
      "__v": 0
    },
    {
      "_id": "65deffc89f6ffdcsf6a5c1b24",
      "user": "65deff699f6ffdcf6a5c1b1d",
      "title": "iNotebook front-end",
      "description": "Frontend note",
      "tag": "project",
      "date": "2024-02-28T09:41:28.675Z",
      "__v": 0
    }
  ]
  const [notes, setNotes] = useState(notesInitial)

//Add Note
const addNote = (title, description, tag) => {
    //TODO : API Call
    console.log('Add Note')
    const note = {
        "_id": "65deffc89f6ffdcsf6a534c1b24",
        "user": "65deff699f6ffdcf6a5c1b1d",
        "title": title,
        "description": description,
        "tag": tag,
        "date": "2024-02-28T09:41:28.675Z",
        "__v": 0
      }
    setNotes(notes.concat(note))
}
//Delete Note
const deleteNote = (id) => {
    //TODO : API Call
    console.log('delete note ' + id)
    const newNotes = notes.filter((note)=> {return note._id !== id})
    setNotes(newNotes)
}

//update Note
const editNote = (id, title, description, tag) => {
    //TODO : API Call

}


    return (
        <NoteContext.Provider value = {{notes, addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;