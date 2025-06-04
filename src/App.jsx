import { useEffect, useState } from "react";
import { Header } from "./components/header";
import { Tasks } from "./components/tasks";

const API_URL = "https://65f019aada8c6584131ac3e0.mockapi.io/Todo/Stalin/Todo";

function App() {

  const [tasks, setTasks] = useState([])

  async function loadTasks() {
    try {
      const response = await fetch(API_URL)
      const data = await response.json()
      setTasks(data)
    } catch (e) {
      console.error("Failed to load tasks", e)
    }
  }

  useEffect(() => {
    loadTasks()
  }, [])

  async function addTask(taskText) {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: taskText, isCompleted: false })
      })
      const newTask = await response.json()
      setTasks((prev) => [...prev, newTask])
    } catch (e) {
      console.error("Failed to add task", e)
    }
  }

  async function toggleTaskCompletedById(taskId) {
    const taskToToggle = tasks.find((task) => task.id === taskId)
    if (!taskToToggle) return
    const updated = {
      ...taskToToggle,
      isCompleted: !taskToToggle.isCompleted
    }
    try {
      const response = await fetch(`${API_URL}/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated)
      })
      const updatedTask = await response.json()
      setTasks((prev) => prev.map((t) => (t.id === taskId ? updatedTask : t)))
    } catch (e) {
      console.error("Failed to update task", e)
    }
  }

  async function deleteTaskById(taskId) {
    try {
      await fetch(`${API_URL}/${taskId}`, { method: "DELETE" })
      setTasks((prev) => prev.filter((task) => task.id !== taskId))
    } catch (e) {
      console.error("Failed to delete task", e)
    }
  }

  return (
    <>
      <Header onAddTask={addTask} />
      <Tasks
        tasks={tasks}
        onComplete={toggleTaskCompletedById}
        onDelete={deleteTaskById}
      />
    </>
  )
}

export default App
