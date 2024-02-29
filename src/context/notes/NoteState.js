

import { useState } from 'react'
import NoteContext from './NoteContext'

const NoteState = (props) => {
  const host = 'http://localhost:5000'

  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  //Fetch All Note
const getNotes = async () => {
  //TODO : API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: "GET",
    mode: "cors", 
    cache: "no-cache",    
    credentials: "same-origin", 
    headers: {
      "Content-Type": "application/json",
      "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkZWZmNjk5ZjZmZmRjZjZhNWMxYjFkIn0sImlhdCI6MTcwOTExMzE5M30.pXw0QkHSzxkLZOs-YkbFFOrWPRC5EiULUgxC3R-cl98"
      
    }
  }); 
  const json = await response.json()
  setNotes(json)
}


//Add Note
const addNote = async (title, description, tag) => {
    //TODO : API Call
      const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      mode: "cors", 
      cache: "no-cache",    
      credentials: "same-origin", 
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkZWZmNjk5ZjZmZmRjZjZhNWMxYjFkIn0sImlhdCI6MTcwOTExMzE5M30.pXw0QkHSzxkLZOs-YkbFFOrWPRC5EiULUgxC3R-cl98"
        
      },
      redirect: "follow", 
      referrerPolicy: "no-referrer", 
      body: JSON.stringify({title, description, tag}), 
    }); 
  
    //Logic
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
const editNote = async (id, title, description, tag) => {
    //TODO : API 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
    method: "POST",
    mode: "cors", 
    cache: "no-cache",    
    credentials: "same-origin", 
    headers: {
      "Content-Type": "application/json",
      "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkZWZmNjk5ZjZmZmRjZjZhNWMxYjFkIn0sImlhdCI6MTcwOTExMzE5M30.pXw0QkHSzxkLZOs-YkbFFOrWPRC5EiULUgxC3R-cl98"
      
    },
    redirect: "follow", 
    referrerPolicy: "no-referrer", 
    body: JSON.stringify({title, description, tag}), 
  });
  const json = response.json(); 


    //logic
    for (let index = 0; index < notes.length; index++) {
        const element = notes[index];
        if(element._id === id) {
            element.title = title
            element.description = description
            element.tag = tag
        }
        
    }
}


    return (
        <NoteContext.Provider value = {{notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;