import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ReadNote from './ReadNote';

function NoteItem(props) {

    const { title, description, tags, date } = props.note;

    const [open, setOpen] = useState(false);

    const handleOpenNoteModel = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <>
            <div className='relative border border-[#e0e0e0] rounded p-3 pb-16 flex flex-col gap-y-3'>
                <span className='text-sm w-full inline-block text-end'>{date}</span>
                <h1 className='text-xl'>{title}</h1>
                <p className='text-[#352F44]'>
                    {
                        description.length >= 300 ? (
                            <div>
                                <span>{description.slice(0, 300)}...</span>
                                <button onClick={handleOpenNoteModel} className='text-[#1AACAC] font-semibold text-sm'>Read More</button>
                            </div>
                        ) : (description)
                    }
                </p>
                <div className='absolute left-0 bottom-3 flex justify-between w-full px-3'>
                    <div className='flex gap-x-2 mt-2'>
                        <DeleteIcon onClick={() => props.handleDeleteOpen(props.note._id)} className='cursor-pointer' sx={{ fontSize: 20 }} />
                        <EditIcon onClick={() => props.handleClickOpen(props.note)} className='cursor-pointer' sx={{ fontSize: 20 }} />
                    </div>
                    <div>
                        <div className='px-3 pb-1 pt-[1.5px] bg-[#1AACAC] rounded-full text-white'>
                            <p className='text-sm'>{tags}</p>
                        </div>
                    </div>
                </div>
            </div>
            <ReadNote open={open} handleClose={handleClose} note={props.note} />
        </>
    )
}

export default NoteItem