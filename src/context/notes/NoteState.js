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
      body: JSON.stringify({title, description, tag}), 
    }); 
  
    //Logic
    const note = await response.json();
    setNotes(notes.concat(note))
}


//Delete Note
const deleteNote = async (id) => {
    //TODO : API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      mode: "cors", 
      cache: "no-cache",    
      credentials: "same-origin", 
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkZWZmNjk5ZjZmZmRjZjZhNWMxYjFkIn0sImlhdCI6MTcwOTExMzE5M30.pXw0QkHSzxkLZOs-YkbFFOrWPRC5EiULUgxC3R-cl98"
        
      }
    });
    const json = response.json(); 
    const newNotes = notes.filter((note)=> {return note._id !== id})
    setNotes(newNotes)
    props.showAlert("Note Deleted", "info")
}


//update Note
const editNote = async (id, title, description, tag) => {
    //TODO : API 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
    method: "PUT",
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
  const json = await response.json(); 

    let newNotes = JSON.parse(JSON.stringify(notes))
    //logic
    for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if(element._id === id) {
            element.title = title
            element.description = description
            element.tag = tag
            break
        }
        
    }
    setNotes(newNotes)
}


    return (
        <NoteContext.Provider value = {{notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;