import React, {useContext} from 'react'
import NoteItem from './NoteItem';
import NoteContext from '../../context/notes/noteContext.js';

function Notes() {
    const context = useContext(NoteContext);
    const {notes, setNotes} = context;
  return (
    <div>
        <div className='grid grid-cols-3 gap-5 mt-8'>
        {notes.map((note) => {
            return <NoteItem note={note} />
        })}
        </div>
    </div>
  )
}

export default Notes