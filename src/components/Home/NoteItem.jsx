import React, { useContext } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import NoteContext from '../../context/notes/noteContext.js';

function NoteItem(props) {

    const context = useContext(NoteContext);

    const { _id, title, description, tags, date } = props.note;

    return (
        <div className='relative border border-[#e0e0e0] rounded p-3 pb-16 flex flex-col gap-y-3'>
            <span className='text-sm w-full inline-block text-end'>{date}</span>
            <h1 className='text-xl'>{title}</h1>
            <p className='text-[#352F44]'>{description}</p>
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
    )
}

export default NoteItem