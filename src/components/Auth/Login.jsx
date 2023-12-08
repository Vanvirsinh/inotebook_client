import React, { useContext, useState } from 'react';
import AuthContext from '../../context/auth/authContext';
import NoteContext from '../../context/notes/noteContext';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import { AlertBox } from '../Alert/Alert';

function Login({ handleClose }) {

    const context = useContext(AuthContext);
    const { login } = context;

    const noteContext = useContext(NoteContext);
    const { getAllNotes, setLoading } = noteContext;

    const [user, setUser] = useState({ email: "", password: "" });
    const [loading, isLoading] = useState(false);
    const [alert, setAlert] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        isLoading(true);
        login(user, (response) => {
            isLoading(false);
            if (response.type === "success") {
                handleClose();
                setUser({ email: "", password: "" });
                setLoading(true);
                getAllNotes();
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
            <div>
                <DialogTitle>Login</DialogTitle>
                <DialogContent>
                    <p className="modal-text">
                        Login to get access to save your notes in cloud.
                    </p>
                    <form action="" className='flex flex-col gap-y-5 mt-8'>
                        <TextField type='email' name='email' value={user.email} onChange={handleChange} id="email" label="Enter your email" variant="outlined" />
                        <TextField type='password' name='password' value={user.password} onChange={handleChange} id="password" label="Enter your password" variant="outlined" />
                        <DialogActions>
                            {
                                loading ? (
                                    <LoadingButton loading variant="outlined">
                                        Logging In
                                    </LoadingButton>
                                ) : (
                                    <Button type='submit' onClick={handleSubmit} variant="contained">Login</Button>
                                )
                            }
                        </DialogActions>
                    </form>
                </DialogContent>
            </div>
            <div className='p-2'>
                {
                    alert ? (
                        <div>
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

export default Login