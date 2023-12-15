import React, { useContext, useState } from 'react'
import NoteContext from '../../context/notes/noteContext.js';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import CreateIcon from '@mui/icons-material/Create';
import { AlertBox, alertStyle } from '../Alert/Alert';

function AddNote() {
    const context = useContext(NoteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tags: "General" });
    const [formData, setFormData] = useState({ title: '', description: '', tags: '' });
    const [isFormValidated, setIsFormValidated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        addNote(note, (response) => {
            setLoading(false);
            setIsFormValidated(false);
            setAlert(response);
            if(response.type === "success") {
                setFormData({ title: '', description: '', tags: '' });
                setNote({ title: "", description: "", tags: "General" });
            }
            setTimeout(() => {
                setAlert(null);
            }, 5000);
        })
    }

    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
        setFormData({ ...formData, [e.target.name]: e.target.value })

        if (note.title.length >= 3 && note.description.length >= 5 && note.tags.length >= 2) {
            setIsFormValidated(true);
        } else {
            setIsFormValidated(false);
        }
    }

    return (
        <div className='overflow-hidden'>
            <form id='form' className='flex flex-col gap-y-5 mt-8'>
                <input type="text" name='title' value={formData.title} onChange={handleChange} placeholder='Enter your title' className='rounded p-3 border-2' />
                <textarea name="description" value={formData.description} cols="30" rows="7" onChange={handleChange} placeholder='Enter your content' className='p-3 border-2 rounded'></textarea>
                <input type="text" name='tags' value={formData.tags} onChange={handleChange} placeholder='Tag (e.g. Personal, Study, Work, etc.)' className='rounded p-3 border-2' />
                {
                    isFormValidated ? (
                        <div>
                            {
                                loading ? (
                                    <LoadingButton loading variant="outlined">
                                        Save Note
                                    </LoadingButton>
                                ) : (
                                    <Button variant="contained" type='submit' onClick={handleSubmit} className='w-fit' startIcon={<CreateIcon />}>Save Note</Button>
                                )
                            }
                        </div>
                    ) : (
                        <Button disabled variant="contained" type='submit' onClick={handleSubmit} className='w-fit' startIcon={<CreateIcon />}>Save Note</Button>
                    )
                }
            </form>
            {
                alert ? (
                    <div style={alertStyle}>
                        {
                            alert.message.map((err, index) => {
                                return <AlertBox key={index} message={err.msg} type={alert.type} />
                            })
                        }
                    </div>
                ) : (
                    <div></div>
                )
            }
        </div>
    )
}

export default AddNote;