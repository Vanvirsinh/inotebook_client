import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Slide from '@mui/material/Slide';
import SignUp from './SignUp';
import Login from './Login';
import CloseIcon from '@mui/icons-material/Close';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default function AuthModal({ handleClose, open, reference }) {

    return (
        <React.Fragment>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <div className='pt-5'>
                    <div className='absolute right-0 top-0'>
                        <DialogActions>
                            <IconButton onClick={handleClose} className='cursor-pointer'>
                                <CloseIcon />
                            </IconButton>
                        </DialogActions>
                    </div>
                    {
                        reference === "signUp" ? <SignUp handleClose={handleClose} /> : <Login handleClose={handleClose} />
                    }
                </div>
            </Dialog>
        </React.Fragment>
    );
}
