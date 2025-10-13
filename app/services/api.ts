import { TaskInter } from "../types/typesIndex";

const baseUrl = "http://localhost:3333";

/**
 * Fetch all tasks
 */
export async function getAllTasks(): Promise<TaskInter[]> {
  try {
    const res = await fetch(`${baseUrl}/tasks?_sort=-id`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch tasks");

    const tasks = await res.json();
    return tasks;
  } catch (error: any) {
    console.error("Error fetching tasks:", error.message);
    throw error;
  }
}

/**
 * Add a new task
 */
export async function addTask(task: TaskInter) {
  try {
    const res = await fetch(`${baseUrl}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });

    if (!res.ok) throw new Error("Failed to add task");

    const newTask = await res.json();
    return {
      data: newTask,
      status: 201,
      message: "New task created successfully",
    };
  } catch (error: any) {
    console.error("Error adding task:", error.message);
    return { data: null, error: error.message }
  }
}

/**
 * Delete a task by ID
 */
export async function delTask(id: string) {
  try {
    const res = await fetch(`${baseUrl}/tasks/${id}`, {
      method: "DELETE",
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Task deleting failed");

    const data = await res.json().catch(() => null);
    return data || { message: "Task deleted successfully" };
  } catch (error: any) {
    console.error("Error deleting task:", error.message);
    return { data: null, error: error.message }
  }
}

/**
 * Update a task
 */
export async function updateTask(task: TaskInter) {
  try {
    const res = await fetch(`${baseUrl}/tasks/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });

    if (!res.ok)
      throw new Error(`Task update failed with status: ${res.status}`);

    const updatedTask = await res.json();
    return {
      data: updatedTask,
      message: "Task updated successfully",
    };
  } catch (error: any) {
    console.error("Error updating task:", error.message);
    return { data: null, error: error.message }
  }
}
