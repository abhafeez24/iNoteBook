import React, {useContext, useState} from 'react'

import noteContext from "../context/notes/NoteContext";

export default function AddNote() {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [notes, setNotes] = useState({title: "", description: "", tag: "default"})

    const handleClick = (e) => {
        e.preventDefault()
        addNote(notes.title, notes.description, notes.tag)
    }


    const onChange = (e) => {
        setNotes({...notes, [e.target.name]: e.target.value})
    }
  return (
    <div className='container my-3'>
      <h1>Add Note</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" id="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" name="description" onChange={onChange}/>
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
      </form>
      </div>
  )
}
