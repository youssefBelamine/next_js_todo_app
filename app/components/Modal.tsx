"use client";
import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { TaskInter } from "../types/typesIndex";
import { addTask, updateTask } from "../services/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

interface ModalProps {
  onClose: () => void;
  task?: TaskInter;
}

export default function Modal({ onClose, task }: ModalProps) {
  const [tsk, setTask] = useState<string>("");
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const router = useRouter();

  const openModal = () => dialogRef.current?.showModal();

  const closeModal = () => {
    setTask("");
    dialogRef.current?.close();
    onClose();
  };

  const onWriteTask = (ev: ChangeEvent<HTMLInputElement>) => {
    setTask(ev.target.value);
  };

  const AddNewTask = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (!tsk.trim()) return alert("You need to write a task first.");

    try {
      const newTask: TaskInter = { id: uuidv4(), task: tsk };
      if (task != undefined){
        const newTask:TaskInter = {id: task.id, task: tsk}
        const result = await updateTask(newTask)
        console.log(result.message)
      }else {
          await addTask(newTask);
      }
      router.refresh();
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    openModal();
    if (task) setTask(task.task);
  }, [task]);

  return (
    <dialog ref={dialogRef} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box relative">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          aria-label="Close modal"
          onClick={closeModal}
        >
          ✕
        </button>

        <form onSubmit={AddNewTask}>
          <h2 className="text-xl font-bold mb-4">
            {task ? "Edit Task" : "Add New Task"}
          </h2>

          <input
            onChange={onWriteTask}
            value={tsk}
            type="text"
            className="input input-bordered w-full"
            placeholder="Write task here..."
          />

          <div className="modal-action mt-4">
            <button
              className="btn btn-primary rounded-2xl"
              type="submit"
              disabled={tsk === task?.task || tsk.trim().length === 0}
            >
              {task ? "Edit" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
