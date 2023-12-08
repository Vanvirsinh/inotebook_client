import Logo from '../../assets/logo.png';
import { NavLink } from "react-router-dom";
import { Button } from '@mui/material';
import AuthModal from '../Auth/AuthModal';
import { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import NoteContext from '../../context/notes/noteContext';
import Cookies from 'js-cookie';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

function Navbar() {

    const context = useContext(AuthContext);
    const { getUser, user, logout, isAuthenticated, userLoading } = context;

    const noteContext = useContext(NoteContext);
    const { setNotes, getAllNotes } = noteContext;

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            getUser(token);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [open, setOpen] = useState(false);
    const [reference, setReference] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);

    const handleClickOpen = (ref) => {
        setOpen(true);
        setReference(ref);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpenAvtar = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleCloseAvtar = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout(() => {
            getAllNotes();
        });
        setNotes([]);
    }

    return (
        <>
            <nav>
                <div className="px-10 py-2 bg-[#000] text-[#fff]">
                    <div className='flex justify-between items-center'>

                        <div className='flex items-center gap-x-16'>
                            <div className='h-[70px]'>
                                <img className='h-full' src={Logo} alt="" />
                            </div>

                            <div>
                                <ul className='flex gap-x-5'>
                                    <li>
                                        <NavLink className={({ isActive }) =>
                                            `${isActive ? "text-[#fff]" : "text-[#7D7C7C]"}`} to="/">Home</NavLink>
                                    </li>
                                    <li>
                                        <NavLink className={({ isActive }) =>
                                            `${isActive ? "text-[#fff]" : "text-[#7D7C7C]"}`} to="/about">About</NavLink>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className='w-56 flex justify-end'>
                            {userLoading ? (
                                <div className='flex justify-center items-center'>
                                    <Stack spacing={1}>
                                        <div className='flex items-center gap-x-2'>
                                            <Skeleton variant="circular" sx={{ bgcolor: 'grey.900' }} width={40} height={40} />
                                            <Skeleton variant="rounded" sx={{ bgcolor: 'grey.900' }} width={120} height={40} />
                                        </div>
                                    </Stack>
                                </div>
                            ) : isAuthenticated ? (
                                <div>
                                    <div className='flex gap-x-2 items-center'>
                                        <IconButton
                                            onClick={handleOpenAvtar}
                                            size="small"
                                            sx={{ ml: 2 }}
                                            aria-controls={openMenu ? 'account-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={openMenu ? 'true' : undefined}
                                        >
                                            <Avatar sx={{ width: 32, height: 32 }}>{user.name.charAt(0)}</Avatar>
                                        </IconButton>
                                        <h2>{user.name}</h2>
                                        <Menu
                                            anchorEl={anchorEl}
                                            id="account-menu"
                                            open={openMenu}
                                            onClose={handleCloseAvtar}
                                            onClick={handleCloseAvtar
                                            }
                                            PaperProps={{
                                                elevation: 0,
                                                sx: {
                                                    overflow: 'visible',
                                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                    mt: 1.5,
                                                    '& .MuiAvatar-root': {
                                                        width: 32,
                                                        height: 32,
                                                        ml: -0.5,
                                                        mr: 1,
                                                    },
                                                    '&:before': {
                                                        content: '""',
                                                        display: 'block',
                                                        position: 'absolute',
                                                        top: 0,
                                                        right: 14,
                                                        width: 10,
                                                        height: 10,
                                                        bgcolor: 'background.paper',
                                                        transform: 'translateY(-50%) rotate(45deg)',
                                                        zIndex: 0,
                                                    },
                                                },
                                            }}
                                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                        >
                                            <MenuItem onClick={handleLogout}>
                                                Logout <LogoutIcon sx={{ width: 18, height: 18 }} className='ml-2' />
                                            </MenuItem>
                                        </Menu>
                                    </div>
                                </div>
                            ) : (
                                <ul className='flex gap-x-3'>
                                    <li>
                                        <Button variant="outlined" sx={{
                                            color: "#fff",
                                            borderColor: "#fff"
                                        }} onClick={() => handleClickOpen("login")} >Login</Button>
                                    </li>
                                    <li>
                                        <Button variant="contained" onClick={() => handleClickOpen("signUp")}>Sign Up</Button>
                                    </li>
                                </ul>
                            )
                            }
                        </div>
                    </div>
                </div>
            </nav>
            <AuthModal open={open} handleClose={handleClose} reference={reference} />
        </>
    )
}

export default Navbar;