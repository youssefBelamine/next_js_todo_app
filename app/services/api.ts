import { TaskInter } from "./types/Tasktype";

const baseUrl = "http://localhost:3333/tasks";

export default async function getAllTasks(): Promise<TaskInter[]>{
    const res = await fetch(baseUrl);
    if (!res.ok) throw new Error("Failed to fetch");
    const tasks = await res.json();
    return tasks;
}