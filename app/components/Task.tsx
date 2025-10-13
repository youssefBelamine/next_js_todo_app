"use client"
import React, { useState } from 'react'
import { TaskInter, TaskProps, TodoListInter } from '../types/typesIndex'
// import ShowTask from './ShowTask'
import { MdDeleteForever } from "react-icons/md";
import { FaPenToSquare } from "react-icons/fa6";
import { delTask } from '../services/api';
import { useRouter } from 'next/navigation';
import Modal from './Modal';


export default function Task({ task}: TaskProps) {
    const router = useRouter();
    const [showModal, setShowModal] = useState<boolean>(false)
    const deleteTask = async ({id, task} : TaskInter):Promise<void> => {
        const confirmed:boolean = window.confirm(`Task: ${task}\nAre you sure you want to delete this task.`)
        if (!confirmed) return;
        const data = await delTask(id);
        console.log(data)
        router.refresh();
    
    }

    const closeModal = () => setShowModal(false);

    return (
        <tr key={task.id} >
            <th> {task.task} </th>
            {/* <td> <ShowTask task={task} /> </td> */}
            <td style={{display: "flex", justifyContent: "space-between"}}>

                <button style={{cursor: "pointer"}} onClick={() => setShowModal(true)} >
                <FaPenToSquare size={30} color='#090' />
                </button>

                <button  style={{cursor: "pointer"}} onClick={() => deleteTask(task)}>
                    <MdDeleteForever size={32} color='#900' />
                </button>
            </td>
            {showModal && <Modal onClose={closeModal} task={task} />}

        </tr>
    )
}
