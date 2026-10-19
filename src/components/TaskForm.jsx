import { useState } from "react";

const MIN = 4;
const MAX = 80;

function validate(value) {
    const text = value.trim();
    if(text.length === 0) {
        return `Task Can't be empty. Enter at least ${MIN} characters.`
    }
    if(text.length < MIN) {
        return `Task is too short. Use at least ${MIN} characters.`
    }
    if(text.length > MAX) {
        return `Task is too long. Use ${MAX} characters or fewer.`
    }
    return "";
}

export default function TaskForm({mode, task, onSubmit, onCancel, onDelete}) {

    const isEdit = mode === "edit";

    const [text, setText] = useState(task ? task.text : "");
    const [completed, setCompleted] = useState(task ? task.completed : false)
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const message = validate(text);
        if(message) {
            setError(message);
            return;
        }
        onSubmit(text.trim(), completed);
    };

    return(
        <>
            <button className="back" onClick={onCancel}><i className="fa-solid fa-angle-left"></i>All Tasks</button>

            <form className="card form" onSubmit={handleSubmit} noValidate>
                <h1>{isEdit ? "Edit Task" : "New Task"}</h1>
                <p className="muted">{
                    isEdit ?
                        "Change the wording or mark it complete. Cancel leaves the task untouched" : 
                        "Add a task to your list. You can edit or delete it later"}</p>

                <label htmlFor="task-input" className="label">Task Name</label>
                
                <input
                    id="task-input"
                    className={`input ${error ? "has-error" : ""}`}
                    value={text}
                    placeholder="What needs doing?"
                    autoFocus
                    onChange={(e) => {
                        setText(e.target.value);
                        setError("");
                    }}
                />

                <div className="hint-row">
                    <span className={error ? "error" : "muted small"}>{error || `Between ${MIN} and ${MAX} characters.`}</span>
                    <span className="muted small">{text.length} / {MAX}</span>
                </div>


                {isEdit && (
                    <label className="complete-box">
                    <input
                        type="checkbox"
                        className="check"
                        checked={completed}
                        onChange={(e) => setCompleted(e.target.checked)}
                    />
                    Mark this task as completed
                    </label>
                )}

                <div className="form-actions">
                    <button type="submit" className="btn primary">Save task</button>
                    <button type="button" className="btn" onClick={onCancel}>Cancel</button>
                    {isEdit && (
                        <button type="button" className="btn danger push" onClick={onDelete}>
                            Delete task
                        </button>
                    )}
                </div>
            </form>
        </>
    );
}