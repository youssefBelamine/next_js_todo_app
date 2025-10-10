import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'

export default function AddTask() {
    return (
        <div>
            <button className='btn btn-primary w-full'>
                Add new task <AiOutlinePlus className='ml-2' size={22} />
            </button>
        </div>
    )
}
