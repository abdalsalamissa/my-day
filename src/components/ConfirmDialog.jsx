

export default function ConfirmDialog({onConfirm, onCancel}) {
    return (
        <div className="overlay" onClick={onCancel}>
            <div className="dialog" onClick={(e) => e.stopPropagation()}>
                <h2>Delete this Task?</h2>
                <p className="muted">This can't be undone!.</p>
                <div className="dialog-actions">
                    <button className="btn danger-solid" onClick={onConfirm}>Delete</button>
                    <button className="btn" onClick={onCancel} >Cancel</button>
                </div>
            </div>
        </div>
    );
}