import { useParams, useNavigate } from "react-router-dom";
import TaskForm from "./TaskForm.jsx";

export default function EditTaskPage({ tasks, updateTask, requestDelete }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const task = tasks.find((t) => t.id === parseInt(id));

    if (!task) {
        return <p className="muted">Task not found</p>;
    }

    return (
        <TaskForm
            key={task.id}
            mode="edit"
            task={task}
            onSubmit={(text, completed) => {
                updateTask(task.id, text, completed);
                navigate("/home");
            }}
            onCancel={() => navigate("/home")}
            onDelete={() => {
                requestDelete(task.id);
            }}
        />
    );
}