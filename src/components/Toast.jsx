import { useEffect } from "react";

export default function Toast({message, onClose}) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="toast-container">
            <div className="toast-message">
                {message}
                <button className="toast-close" onClick={onClose}><i className="fa-solid fa-x"></i></button>
            </div>
        </div>
    );
}