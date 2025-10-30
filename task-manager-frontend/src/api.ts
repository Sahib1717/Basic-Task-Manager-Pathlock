import axios from "axios";
import { TaskItem } from "./types";

// const API_URL = "http://localhost:5164/api/tasks";
const API_URL = "https://basic-task-manager-pathlock-3.onrender.com/api/tasks";


export const getTasks = () => axios.get<TaskItem[]>(API_URL);
export const addTask = (task: Omit<TaskItem, "id">) => axios.post(API_URL, task);
export const updateTask = (id: string, task: TaskItem) =>
  axios.put(`${API_URL}/${id}`, task);
export const deleteTask = (id: string) => axios.delete(`${API_URL}/${id}`);
