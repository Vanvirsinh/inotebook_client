import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import LoadingButton from '@mui/lab/LoadingButton';
import Delete from '@mui/icons-material/Delete';

function DeleteNote({ handleClose, open, deleteNote, deleteId }) {

    const [loading, setLoading] = useState(false);

    const handleDelete = () => {
        setLoading(true);
        deleteNote(deleteId, () => {
            setLoading(false);
            handleClose();
        })
    }

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Delete Alert!</DialogTitle>
                <DialogContent>
                    <div className='py-2'>
                        <p>Please note that the following action will permanently remove the selected item/data. Are you sure you want to delete this item/data? This action cannot be undone.</p>
                    </div>
                    <div>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <div>
                                {
                                    loading ? (
                                        <LoadingButton loading variant="outlined">
                                            Delete
                                        </LoadingButton>
                                    ) : (
                                        <Button type='submit' startIcon={<Delete />} onClick={handleDelete} variant="contained" color="error">Delete</Button>
                                    )
                                }
                            </div>
                        </DialogActions>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default DeleteNote