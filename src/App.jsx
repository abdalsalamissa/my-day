import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { getTasks, createTask as apiCreateTask, updateTask as apiUpdateTask, deleteTask as apiDeleteTask } from "./api.js";
import Sidebar from "./components/Sidebar.jsx"
import TaskForm from "./components/TaskForm.jsx";
import Toast from "./components/Toast.jsx";
import ConfirmDialog from "./components/ConfirmDialog.jsx"
import TaskListPage from "./components/TaskListPage.jsx";
import EditTaskPage from "./components/EditTaskPage.jsx";
import ViewTaskPage from "./components/ViewTaskPage.jsx";

function App() {

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {

    // load tasks
    async function loadTasks() {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (err) {
        console.log("Failed to load tasks:", err);
          setLoadError("Could not load tasks. Is the backend running?");
      } finally {
          setLoading(false);
      }
    }

    loadTasks();

  }, []);

  // Toggle Task
  const toggleTask = async (id) => {
    const task = tasks.find((task) => task.id === id);
    if (!task) return;

    try {
      const saved = await apiUpdateTask(id, task.text, !task.completed);
      setTasks((previous) => previous.map((task) => (task.id === id ? saved : task)));
      setToastMessage("Task Toggled!");
    } catch (err) {
      console.error("Failed to toggle task:", err);
      setToastMessage("Something went wrong, Try again.");
    }
  };

  // Create Task
  const createTask = async (text) => {
    try {
      const created = await apiCreateTask(text);
      setTasks((previous) => [...previous, created]);
      setToastMessage("Task Created!");
      navigate("/home");
    } catch (err) {
        console.error("Failed to create task:", err);
        setToastMessage("Something went wrong, Try again.");
    }
  };

  // Update Task
  const updateTask = async (id, text, completed) => {
    try {
      const saved = await apiUpdateTask(id, text, completed);
      setTasks((previous) => previous.map((task) => (task.id === id ? saved : task)));
      setToastMessage("Task Updated!");
      navigate("/home");
    } catch (err) {
      console.error("Failed to update task:", err);
      setToastMessage("Something went wrong, Try again.");
    }
  };

  // Delete Task
  const confirmDelete = async () => {
    try {
      await apiDeleteTask(deletingId);
      setTasks((previous) => previous.filter((task) => task.id !== deletingId));
      setDeletingId(null);
      setToastMessage("Task Deleted!");
      navigate("/home");
    } catch (err) {
      console.error("Failed to update task:", err);
      setDeletingId(null);
      setToastMessage("Something went wrong, Try again.")
    }
  }

// Variables
  const activeCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  // Conditions
  if (loading) return <p className="muted">Loading Tasks...</p>
  if (loadError) return <p className="error">{loadError}</p>
  
  return (
      <div className="layout">
        {/* sidebar */}
        <Sidebar totalCount={tasks.length} completedCount={completedCount} />

        {/* main section */}
        <main className="main">
          <Routes>
            {/* default route */}
            <Route 
              path="/" 
              element={<Navigate to="/home" />} />

            {/* Home Page */}
            <Route
              path="/home"
              element={
                <TaskListPage
                  title="Home Page"
                  description={`${activeCount} active · ${completedCount} completed`}
                  tasks={tasks}
                  onToggle={toggleTask}
                  onView={(id) => navigate(`/view/${id}`)}
                  onEdit={(id) => navigate(`/edit/${id}`)}
                  onDelete={(id) => setDeletingId(id)}
                />
              }
            />

            {/* Completed Tasks Page */}
            <Route
              path="/completed"
              element={
                <TaskListPage
                  title="Completed Tasks"
                  description={`${completedCount} completed`}
                  tasks={tasks.filter((task) => task.completed)}
                  onToggle={toggleTask}
                  onView={(id) => navigate(`/view/${id}`)}
                  onEdit={(id) => navigate(`/edit/${id}`)}
                  onDelete={(id) => setDeletingId(id)}
                />
              }
            />

            {/* Create Task Page */}
            <Route
              path="/create"
              element={
                <TaskForm
                  mode="create"
                  onSubmit={createTask}
                  onCancel={() => navigate("/home")}
                />
              }
            />

            {/* Edit Task Page */}
            <Route
              path="/edit/:id"
              element={
                <EditTaskPage
                  tasks={tasks}
                  updateTask={updateTask}
                  requestDelete={(id) => setDeletingId(id)}
                />
              }
            />

            {/* View Task Page */}
            <Route
              path="/view/:id"
              element={
                <ViewTaskPage tasks={tasks} />
              }
            />

            {/* Not Found Page */}
            <Route
              path="*"
              element={<p className="muted">Page not found</p>}
            />
          </Routes>
        </main>

        {/* delete pop-up */}
        {deletingId !==null && (
          <ConfirmDialog onConfirm={confirmDelete} onCancel={() => setDeletingId(null)} />
        )}

        {/* Render Toast */}
        {toastMessage && (
          <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
        )}
      </div>
  );
}

export default App
