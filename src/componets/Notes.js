import React, { useContext, useEffect, useRef,useState } from "react";
import noteContext from "../context/notes/NoteContext";
import NoteItem from '../componets/NoteItem'

import AddNote from './AddNote'

const Notes = ()=>  {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;

  
  useEffect(() => {
    getNotes()
    //eslint-disable-next-line
  }, [])
  
  let modalref = useRef(null)
  let refClose = useRef(null)
  const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: ""})

  const updateNote = (currentNote) => {
    
    modalref.current.click()
    setNote({id: currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag})

  }


    const handleSubmit = (e) => {

      editNote(note.id, note.etitle, note.edescription, note.etag);
      refClose.current.click()
      
    }


    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value})
    }

  return (
    <>
    <AddNote />
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
                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange}/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange}/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" value={note.etag} className="form-label">Tag</label>
                    <input type="text" className="form-control" id="etag" name="etag" onChange={onChange}/>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button ref={refClose} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>Update changes</button>
              </div>
            </div>
          </div>
        </div>

    <div className="row my-30">
      <h2>Your Note</h2>
      {notes.map((note) => {
        return <NoteItem key={note._id} updateNote={updateNote} note={note}/>
      })}
    </div>
    </>
  );
}

export default Notes


