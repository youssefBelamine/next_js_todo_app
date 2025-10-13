export interface TaskInter {
    id: string,
    task: string
}

export interface TodoListInter {
    tasks: TaskInter[]
}

export interface TaskProps {
  task: TaskInter;
}