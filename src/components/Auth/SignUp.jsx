import React, { useContext, useState } from 'react';
import AuthContext from '../../context/auth/authContext';
import NoteContext from '../../context/notes/noteContext';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import InfoIcon from '@mui/icons-material/Info';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import { AlertBox } from '../Alert/Alert';

function SignUp({ handleClose }) {

    const context = useContext(AuthContext);
    const { register } = context;

    const noteContext = useContext(NoteContext);
    const { getAllNotes, setLoading } = noteContext;

    const [user, setUser] = useState({ name: "", email: "", password: "" });
    const [loading, isLoading] = useState(false);
    const [alert, setAlert] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        isLoading(true);
        register(user, (response) => {
            isLoading(false);
            if (response.type === "success") {
                setLoading(true);
                getAllNotes();
                handleClose();
                setUser({ name: "", email: "", password: "" });
                setAlert(null);
            } else {
                setAlert(response);
            }
        });
    }

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    return (
        <>
            <DialogTitle>Sign Up</DialogTitle>
            <DialogContent>
                <p className="modal-text">
                    Welcome! Sign up to get access to save your notes in cloud.
                </p>
                <form action="" className='flex flex-col gap-y-5 mt-8'>
                    <TextField type='name' name='name' value={user.name} onChange={handleChange} id="name" label="Enter your name" variant="outlined" />
                    <TextField type='email' name='email' value={user.email} onChange={handleChange} id="email" label="Enter your email" variant="outlined" />
                    <TextField type='password' name='password' value={user.password} onChange={handleChange} id="password" label="Enter your password" variant="outlined" />
                    <div className='flex gap-x-2 text-[#A9A9A9] text-[15px]'>
                        <InfoIcon />
                        <p className='text-md'>Password should be of Minimum 8 characters, at least one uppercase letter, one lowercase letter, one digit, one special character.</p>
                    </div>
                    <DialogActions>
                        {
                            loading ? (
                                <LoadingButton loading variant="outlined">
                                    Signing In
                                </LoadingButton>
                            ) : (
                                <Button type='submit' onClick={handleSubmit} variant="contained">Sign Up</Button>
                            )
                        }
                    </DialogActions>
                </form>
            </DialogContent>
            <div className='p-2'>
                {
                    alert ? (
                        <div className='flex flex-col gap-y-1'>
                            {alert.message.map((item, index) => {
                                return <AlertBox message={item.msg} key={index} type={alert.type} />
                            })}
                        </div>
                    ) : (
                        <div></div>
                    )
                }
            </div>
        </>
    )
}

export default SignUp