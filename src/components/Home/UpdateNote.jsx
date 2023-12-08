import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import LoadingButton from '@mui/lab/LoadingButton';

export default function UpdateNote({ handleClose, open, note, setNote, editNote }) {

    const [isFormValidated, setIsFormValidated] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        editNote(note, () => {
            setLoading(false);
            handleClose();
        });
    }

    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });

        if (note.etitle.length >= 3 && note.edescription.length >= 5) {
            setIsFormValidated(true);
        } else {
            setIsFormValidated(false);
        }
    }

    return (
        <React.Fragment>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Update Note</DialogTitle>
                <DialogContent>
                    <div>
                        <form action="" className='flex flex-col gap-y-5'>
                            <input type="text" name='etitle' value={note.etitle} onChange={handleChange} placeholder='Enter your title' className='rounded p-3 border-2 border-#[000]' />
                            <textarea name="edescription" value={note.edescription} onChange={handleChange} cols="60" rows="10" placeholder='Enter your content' className='p-3 border-2 border-#[000] rounded'></textarea>
                            <input type="text" name='etags' value={note.etags} onChange={handleChange} placeholder='e.g. Personal, Study, Work, etc.' className='rounded p-3 border-2 border-#[000]' />
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                {
                                    isFormValidated ? (
                                        <div>
                                            {
                                                loading ? (
                                                    <LoadingButton loading variant="outlined">
                                                        Submit
                                                    </LoadingButton>
                                                ) : (
                                                    <Button type='submit' variant="contained" onClick={handleSubmit}>Update</Button>
                                                )
                                            }
                                        </div>
                                    ) : (
                                        <Button disabled type='submit' variant="contained" onClick={handleSubmit}>Update</Button>
                                    )
                                }
                            </DialogActions>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}