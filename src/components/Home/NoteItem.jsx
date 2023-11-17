import React from 'react'

function NoteItem(props) {
    const { title, description } = props.note;
    return (
        <div className='border border-[#e0e0e0] rounded p-3 flex flex-col gap-y-3'>
            <h1 className='text-xl'>{title}</h1>
            <p className='text-[#352F44]'>{description}</p>
        </div>
    )
}

export default NoteItem