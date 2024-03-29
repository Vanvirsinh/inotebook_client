import React, { useContext, useEffect, useState } from 'react'
import NoteItem from './NoteItem';
import NoteContext from '../../context/notes/noteContext.js';
import UpdateNote from './UpdateNote.jsx';
import DeleteNote from './DeleteNote.jsx';
import CircularProgress from '@mui/material/CircularProgress';
import Masonry from '@mui/lab/Masonry';

function Notes() {
  const context = useContext(NoteContext);
  const { notes, getAllNotes, editNote, error, loading, deleteNote } = context;

  useEffect(() => {
    getAllNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [note, setNote] = useState({ etitle: "", edescription: "", etags: "default" });
  const [deleteId, setDeleteId] = useState(null);

  const handleClickOpen = (currentNote) => {
    setNote({ _id: currentNote._id, user: currentNote.user, etitle: currentNote.title, edescription: currentNote.description, etags: currentNote.tags })
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteOpen = (id) => {
    setDeleteOpen(true);
    setDeleteId(id);
  }

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  }

  return (
    <>
      <div>
        {loading ? (
          <div className="container mt-10 flex justify-center">
            <CircularProgress />
          </div>
        ) :
          error ? (
            <div className="container mt-10">
              <h1 className='text-center text-xl'>{error.errors}</h1>
            </div>
          ) : notes.length === 0 ? (
            <div className="container mt-10">
              <h1 className='text-center text-xl'>" No notes to display 🤨🤨🤨"</h1>
            </div>
          ) : (
            <div className='mt-8'>
              <Masonry columns={{xs: 1, sm: 2, md: 3}}
                spacing={2}>
                {notes.slice().reverse().map((note) => {
                  return <NoteItem note={note} key={note._id} handleClickOpen={handleClickOpen} handleDeleteOpen={handleDeleteOpen} />
                })}
              </Masonry>
            </div>
          )

        }
      </div>
      <UpdateNote handleClose={handleClose} open={open} note={note} setNote={setNote} editNote={editNote} />
      <DeleteNote handleClose={handleDeleteClose} open={deleteOpen} deleteNote={deleteNote} deleteId={deleteId} />
    </>
  )
}

export default Notes