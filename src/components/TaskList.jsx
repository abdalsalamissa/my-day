import TaskItem from "./TaskItem.jsx";

export default function TaskList({tasks, onToggle, onView, onEdit, onDelete}) {
    return(
        <section className="task-list">
            {tasks.map((task) => (
                <TaskItem key={task.id} text={task.text} completed={task.completed} onToggle={() => onToggle(task.id)} onView={() => onView(task.id)} onEdit={() => onEdit(task.id)} onDelete={() => onDelete(task.id)} />
            ))}
        </section>
    );
}