import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function ReadNote({open, handleClose, note}) {

    return (
        <React.Fragment>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{note.title}</DialogTitle>
                <DialogContent>
                    <div>
                        <p>{note.description}</p>
                        <DialogActions>
                            <Button onClick={handleClose}>Close</Button>
                        </DialogActions>
                    </div>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}