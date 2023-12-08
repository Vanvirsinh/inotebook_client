import NoteContext from './noteContext.js';
import { useState, useContext } from 'react';
import AuthContext from '../auth/authContext.js';
import Cookies from 'js-cookie';

const NoteState = (props) => {

    const host = "http://localhost:5000";

    const context = useContext(AuthContext);
    const { checkAuth } = context;

    const [notes, setNotes] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    const getAllNotes = async () => {
        if (await checkAuth()) {
            try {
                const token = Cookies.get('token');
                const response = await fetch(`${host}/api/notes`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "auth-token": token
                        },
                    }
                )
                const jsonData = await response.json();

                if (response.status === 200) {
                    setNotes(jsonData);
                    setError(false);
                } else {
                    setError(jsonData);
                }

                setLoading(false);

            } catch {
                setError({ errors: "Oops, Some Internal Error Occurred!" });
                setLoading(false);
            }
        } else {
            setError({ errors: "Please, Register/Log In to start using features of I-Notebook!" });
            setLoading(false);
        }
    }


    // Add a new note

    const addNote = async ({ title, description, tags }, callback) => {
        if (await checkAuth()) {
            try {
                const token = Cookies.get('token');
                const response = await fetch(`${host}/api/notes`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "auth-token": token
                        },
                        body: JSON.stringify({ title, description, tags })
                    }
                )

                const jsonData = await response.json();
                setNotes(notes.concat(jsonData));
                setLoading(false);
                callback({
                    type: "success",
                    message: "Note added successfully!"
                });
            } catch {
                setError({ errors: "Oops, Some Internal Error Occurred!" });
                setLoading(false);
                callback({
                    type: "error",
                    message: "Oops, Some Internal Error Occurred!"
                });
            }
        } else {
            setError({ errors: "Please, Register/Log In to start using features of I-Notebook!" });
            setLoading(false);
            callback({
                type: "info",
                message: "Register/Log In to start using features of I-Notebook!"
            });
        }
    }

    // Edit a Note
    const editNote = async ({ etitle, edescription, etags, _id }, callback) => {
        if (await checkAuth()) {
            try {
                const token = Cookies.get('token');
                const response = await fetch(`${host}/api/notes/updateNote/${_id}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "auth-token": token
                        },
                        body: JSON.stringify({ title: etitle, description: edescription, tags: etags })
                    }
                )

                const jsonData = await response.json();

                const updatedNotes = () => {
                    return notes.map(note => {
                        if (note._id === _id) {
                            return { ...note, ...jsonData }
                        }
                        return note;
                    })

                }

                setNotes(updatedNotes());
                setLoading(false);
                callback();
            } catch {
                setError({ errors: "Oops, Some Internal Error Occurred!" });
                setLoading(false);
                callback();
            }
        } else {
            setError({ errors: "Please, Register/Log In to start using features of I-Notebook!" });
            setLoading(false);
            callback();
        }
    }

    // Delete a Note
    const deleteNote = async (id, callback) => {
        if (await checkAuth()) {
            try {
                const token = Cookies.get('token');
                const newNote = notes.filter(note => {
                    return note._id !== id;
                });

                await fetch(`${host}/api/notes/deleteNote/${id}`,
                    {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            "auth-token": token
                        },
                    }
                )

                setNotes(newNote);
                setLoading(false);
                callback()

            } catch {
                setError({ errors: "Oops, Some Internal Error Occurred!" });
                setLoading(false);
                callback();
            }
        } else {
            setError({ errors: "Please, Register/Log In to start using features of I-Notebook!" });
            setLoading(false);
            callback();
        }
    }

    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, getAllNotes, editNote, error, loading, setLoading }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;