

export default function ViewTask({task, onCancel}) {
    return (
        <>
            <button className="back" onClick={onCancel}>
                <i className="fa-solid fa-angle-left"></i> All Tasks
            </button>

            <div className="card form">
                <h1>View Task</h1>
                <p className="muted">This is a simple view of the task details.</p>

                <label className="label">Task Name:</label>
                <p className="view-text">{task.text}</p>
                <br />
                <label className="label">Completed:</label>
                <p className="view-text">{task.completed ? "Yes" : "No"}</p>
                
                <div className="form-actions back">
                    <button type="button" className="btn view-back" onClick={onCancel}>Back</button>
                </div>
            </div>
        </>
    );
}