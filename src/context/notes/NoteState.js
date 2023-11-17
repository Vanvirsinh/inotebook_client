import NoteContext from './noteContext.js';
import { useState } from 'react';

const NoteState = (props) => {

    const initialNotes = [
        {
            title: "My first title",
            description: "My first description of my first note."
        },
        {
            title: "My second title",
            description: "My second description of my second note. My second description of my second note. My second description of my second note."
        },
        {
            title: "My second title",
            description: "My second description of my second note."
        },
        {
            title: "My first title",
            description: "My first description of my first note."
        },
        {
            title: "My second title",
            description: "My second description of my second note."
        },
        {
            title: "My second title",
            description: "My second description of my second note."
        }
    ]

    const [notes, setNotes] = useState(initialNotes);

    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default  NoteState;