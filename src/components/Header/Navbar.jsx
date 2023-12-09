import Logo from '../../assets/logo.png';
import { NavLink } from "react-router-dom";
import AuthModal from '../Auth/AuthModal';
import { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import NoteContext from '../../context/notes/noteContext';
import Cookies from 'js-cookie';
import Logout from './Logout';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

function Navbar() {

    const context = useContext(AuthContext);
    const { getUser, user, logout, isAuthenticated, userLoading } = context;

    const noteContext = useContext(NoteContext);
    const { setNotes, getAllNotes } = noteContext;
    const [open, setOpen] = useState(false);
    const [reference, setReference] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [shouldVisible, setShouldVisible] = useState(null);
    const [showMenu, setShowMenu] = useState(false);
    const openMenu = Boolean(anchorEl);

    useEffect(() => {
        if (window.screen.width < 460) {
            setShouldVisible(true);
        } else {
            setShouldVisible(false);
        }
        const token = Cookies.get('token');
        if (token) {
            getUser(token);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

    const handleSubMenu = () => {
        if (showMenu) {
            setShowMenu(false);
        } else {
            setShowMenu(true);
        }
    }

    return (
        <>
            <nav>
                <div className="sm:px-10 px-1 py-2 sm:py-2 bg-[#000] text-[#fff]">
                    <div className='flex justify-between items-center'>
                        <div className={`flex items-center sm:gap-x-16 relative z-[10] ${shouldVisible ? 'justify-between w-full' : ''}`}>
                            <div className='h-[60px] sm:h-[70px]'>
                                <img className='h-full' src={Logo} alt="" />
                            </div>
                            {shouldVisible ? (
                                <div className='flex items-center justify-center relative z-10'>
                                    <div className='flex justify-center items-center'>
                                        <Logout shouldVisible={shouldVisible} user={user} anchorEl={anchorEl} handleClickOpen={handleClickOpen} userLoading={userLoading} isAuthenticated={isAuthenticated} handleLogout={handleLogout} open={open} openMenu={openMenu} handleOpenAvtar={handleOpenAvtar} handleCloseAvtar={handleCloseAvtar} />
                                    </div>
                                    <div className='cursor-pointer ml-2' onClick={handleSubMenu}>
                                        { showMenu ? (<CloseIcon />) : (<MenuIcon />)}
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <ul className='flex sm:gap-x-5 gap-x-2'>
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
                            )}
                        </div>

                        {shouldVisible ? (
                            <div>
                                <div onClick={() => setShowMenu(false)} className={`ease-in-out duration-300 py-5 px-2 -z-1 absolute ${showMenu ? 'top-[70px]' : '-top-[250px]'} left-0 w-full bg-[#000]/[0.90] container flex flex-col`}>
                                    <div>
                                        <ul className='flex flex-col justify-center items-center gap-y-5'>
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
                            </div>
                        ) : (
                            <Logout shouldVisible={shouldVisible} user={user} anchorEl={anchorEl} handleClickOpen={handleClickOpen} userLoading={userLoading} isAuthenticated={isAuthenticated} handleLogout={handleLogout} open={open} openMenu={openMenu} handleOpenAvtar={handleOpenAvtar} handleCloseAvtar={handleCloseAvtar} />
                        )}
                    </div>
                </div>
            </nav>
            <AuthModal open={open} handleClose={handleClose} reference={reference} />
        </>
    )
}

export default Navbar;