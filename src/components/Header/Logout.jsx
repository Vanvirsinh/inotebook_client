import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';

function Logout({ shouldVisible, anchorEl, userLoading, isAuthenticated, handleClickOpen, handleLogout, user, openMenu, handleOpenAvtar, handleCloseAvtar }) {

    return (
        <div className='sm:w-56 flex sm:justify-end'>
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
                            aria-controls={openMenu ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={openMenu ? 'true' : undefined}
                        >
                            <Avatar sx={{ width: 32, height: 32 }}>{user.name.charAt(0)}</Avatar>
                        </IconButton>
                        {
                            shouldVisible ? ('') : (<h2>{user.name}</h2>)
                        }
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
    )
}

export default Logout