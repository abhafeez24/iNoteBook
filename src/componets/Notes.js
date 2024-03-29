import React, { useContext, useEffect, useRef,useState } from "react";
import noteContext from "../context/notes/NoteContext";
import NoteItem from '../componets/NoteItem'

import AddNote from './AddNote'
import { useNavigate } from "react-router-dom";

const Notes = (props)=>  {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
const navigate = useNavigate()
  
  useEffect(() => {
    if(localStorage.getItem('token')) {
      getNotes()
    } else {
      navigate("/login")
    }
    
    //eslint-disable-next-line
  }, [])
  
  let modalref = useRef(null)
  let refClose = useRef(null)
  const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: ""})

  const updateNote = (currentNote) => {
    
    modalref.current.click()
    setNote({id: currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag})
    props.showAlert("Note Updated", "info")
  }


    const handleSubmit = (e) => {

      editNote(note.id, note.etitle, note.edescription, note.etag);
      props.showAlert("Notes Updated Successfully","primary")
      refClose.current.click()
      
    }


    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value})
    }

  return (
    <>
    <AddNote showAlert={props.showAlert} />
        <button ref={modalref} type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModalLong">
          Launch demo modal
        </button>
        <div className="modal fade" id="exampleModalLong" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Edit Note</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" id="etitle" className="form-label">Title</label>
                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" value={note.etag} className="form-label">Tag</label>
                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange}/>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button ref={refClose} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleSubmit}>Update changes</button>
              </div>
            </div>
          </div>
        </div>

    <div className="container row">
      <h2>Your Note</h2>
      <div className="container">
        {notes.length === 0 && 'No Note to Display'}
        </div>  
      {notes.map((note) => {
        return <NoteItem showAlert={props.showAlert} key={note._id} updateNote={updateNote} note={note}/>
      })}
    </div>
    </>
  );
}

export default Notes


