import { useParams, useNavigate } from "react-router-dom";
import ViewTask from "./ViewTask.jsx";

export default function ViewTaskPage({ tasks }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const task = tasks.find((t) => t.id === parseInt(id));

    if (!task) {
        return <p className="muted">Task not found</p>;
    }

    return (
        <ViewTask 
            task={task}
            onCancel={() => navigate("/home")}
        />
    );
}