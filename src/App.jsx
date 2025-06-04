import { useEffect, useState } from "react";
import { Header } from "./components/header";
import { Tasks } from "./components/tasks";
import { Login } from "./components/Login";
import { Register } from "./components/Register";

const TASKS_API_URL = "https://65f019aada8c6584131ac3e0.mockapi.io/Todo/Stalin/Todo";

function App() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
  const [showRegister, setShowRegister] = useState(false);

  async function loadTasks() {
    try {
      const response = await fetch(TASKS_API_URL);
      const data = await response.json();
      setTasks(data);
    } catch (e) {
      console.error("Failed to load tasks", e);
    }
  }

  useEffect(() => {
    if (user) {
      loadTasks();
    }
  }, [user]);

  async function addTask(taskText) {
    try {
      const response = await fetch(TASKS_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: taskText, isCompleted: false })
      });
      const newTask = await response.json();
      setTasks((prev) => [...prev, newTask]);
    } catch (e) {
      console.error("Failed to add task", e);
    }
  }

  async function toggleTaskCompletedById(taskId) {
    const taskToToggle = tasks.find((task) => task.id === taskId);
    if (!taskToToggle) return;
    const updated = {
      ...taskToToggle,
      isCompleted: !taskToToggle.isCompleted
    };
    try {
      const response = await fetch(`${TASKS_API_URL}/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated)
      });
      const updatedTask = await response.json();
      setTasks((prev) => prev.map((t) => (t.id === taskId ? updatedTask : t)));
    } catch (e) {
      console.error("Failed to update task", e);
    }
  }

  async function deleteTaskById(taskId) {
    try {
      await fetch(`${TASKS_API_URL}/${taskId}`, { method: "DELETE" });
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    } catch (e) {
      console.error("Failed to delete task", e);
    }
  }

  function handleLogin(u) {
    setUser(u);
    localStorage.setItem("user", JSON.stringify(u));
  }

  function handleRegister(u) {
    setUser(u);
    localStorage.setItem("user", JSON.stringify(u));
  }

  function handleLogout() {
    setUser(null);
    localStorage.removeItem("user");
    setTasks([]);
  }

  if (!user) {
    return showRegister ? (
      <Register onRegister={handleRegister} onShowLogin={() => setShowRegister(false)} />
    ) : (
      <Login onLogin={handleLogin} onShowRegister={() => setShowRegister(true)} />
    );
  }

  return (
    <>
      <button onClick={handleLogout}>Logout</button>
      <Header onAddTask={addTask} />
      <Tasks
        tasks={tasks}
        onComplete={toggleTaskCompletedById}
        onDelete={deleteTaskById}
      />
    </>
  );
}

export default App;
