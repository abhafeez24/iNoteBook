

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
    return (
        <NoteContext.Provider value = {{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;