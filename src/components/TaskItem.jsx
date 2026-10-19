export default function TaskItem({text, completed, onToggle, onView, onEdit, onDelete}) {
    return(
        <div className="task">
            <input type="checkbox" className="check" checked={completed} onChange={onToggle} />
            <span className={`task-text ${completed ? "is-done" : ""}`}>
                {text}
            </span>

            <div className="task-actions">
                <button className="icon-btn view" onClick={onView} aria-label="View task"><i className="fa-solid fa-eye"></i></button>
                <button className="icon-btn edit" onClick={onEdit} aria-label="Edit task"><i className="fa-solid fa-pen"></i></button>
                <button className="icon-btn delete" onClick={onDelete} aria-label="Delete Task"><i className="fa-regular fa-trash-can"></i></button>
            </div>
        </div>
    );
}