import React, { FC } from 'react'
import {TaskInter, TodoListInter } from '../types/typesIndex'
import Task from './Task'


export default function TodoList({ tasks }: TodoListInter) {
    // const router = useRouter

    return (
        <div className="overflow-x-auto">
            <table className="table">
                
                <thead>
                    <tr>
                        
                        <th>Task</th>
                        <th style={{textAlign: "center"}} >Action</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {tasks.map((tsk:TaskInter) => (
                        <Task key={tsk.id} task={tsk} />
                        
                    ))}

                </tbody>
            </table>
        </div>
    )
}
