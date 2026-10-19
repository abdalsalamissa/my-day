import PageHeader from "./PageHeader.jsx";
import TaskList from "./TaskList.jsx";

export default function TaskListPage({ title, description, tasks, onToggle, onView, onEdit, onDelete }) {
    return (
        <>
            <PageHeader title={title} description={description} />
            <TaskList tasks={tasks} onToggle={onToggle} onView={onView} onEdit={onEdit} onDelete={onDelete} />
        </>
    );
}