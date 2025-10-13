"use client"
import React, { useRef, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import Modal from './Modal'

export default function AddTask() {
    // const dialogRef = useRef<HTMLDialogElement | null>(null);
    const [open, setOpen] = useState<Boolean>(false);

    const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
    return (
        <div>
             <button className="btn btn-primary w-full" onClick={openModal}>
        Add new task <AiOutlinePlus className="ml-2" size={22} />
      </button>
            {open && <Modal onClose={closeModal} />}
            
        </div>
    )
}
