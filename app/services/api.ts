import { TaskInter } from "../types/typesIndex";

const baseUrl = "http://localhost:3333";

export async function getAllTasks(): Promise<TaskInter[]>{
    const res = await fetch(`${baseUrl}/tasks?_sort=-id`, {cache: "no-store"});
    if (!res.ok) throw new Error("Failed to fetch");
    const tasks = await res.json();
    return tasks;
}

export async function addTask(task: TaskInter){

    const res2 = await fetch(`${baseUrl}/tasks`,{
        method: "POST",
        headers: {"Content-type": "application-json"},
        body: JSON.stringify(task)
    })
    if (!res2.ok) throw new Error("Failed to add task");
    const newTask = await res2.json();
    const myOptions = {statusText: "New task created successfully", status: 201};
    return new Response(newTask, myOptions);
}

export async function delTask(id: string) {
  const res = await fetch(`${baseUrl}/tasks/${id}`, {
    method: "DELETE",
    cache: "no-store", // optional, ensures no caching issues
  });

  if (!res.ok) {
    throw new Error("Task deleting failed.");
  }

  const data = await res.json().catch(() => null); // in case the API sends JSON back
  return data || "Task deleted successfully.";
}


// const tsk:TaskInter = {id: "4", task: ""}