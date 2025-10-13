"use client"
import React from 'react'
import { TaskInter, TaskProps, TodoListInter } from '../types/typesIndex'
// import ShowTask from './ShowTask'
import { MdDeleteForever } from "react-icons/md";
import { FaPenToSquare } from "react-icons/fa6";
import { delTask } from '../services/api';
import { useRouter } from 'next/navigation';


export default function Task({ task}: TaskProps) {
    const router = useRouter();
    const deleteTask = async ({id, task} : TaskInter):Promise<void> => {
        const confirmed:boolean = window.confirm(`Task: ${task}\nAre you sure you want to delete this task.`)
        if (!confirmed) return;
        const data = await delTask(id);
        console.log(data)
        router.refresh();
    
    }
    return (
        <tr key={task.id} >
            <th> {task.task} </th>
            {/* <td> <ShowTask task={task} /> </td> */}
            <td style={{display: "flex", justifyContent: "space-between"}}>

                <button style={{cursor: "pointer"}}>
                <FaPenToSquare size={30} color='#090' />
                </button>

                <button  style={{cursor: "pointer"}} onClick={() => deleteTask(task)}>
                <MdDeleteForever size={32} color='#900' />
                </button>

                
            </td>

        </tr>
    )
}
