import React, {useContext, useState} from 'react'

import noteContext from "../context/notes/NoteContext";

export default function AddNote(props) {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [notes, setNotes] = useState({title: "", description: "", tag:""})

    const handleSubmit = (e) => {
        e.preventDefault()
        addNote(notes.title, notes.description, notes.tag)
        setNotes({title: "", description: "", tag:""})
        props.showAlert("Notes Added Successfully", "primary")
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
          <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={notes.title} onChange={onChange} required minLength={5} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" name="description" value={notes.description} onChange={onChange} required minLength={5}/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" name="tag" value={notes.tag} onChange={onChange}/>
        </div>
        <button disabled={notes.title.length<5 || notes.description.length<5} type="submit" className="btn btn-primary" onClick={handleSubmit}>Add Note</button>
      </form>
      </div>
  )
}
