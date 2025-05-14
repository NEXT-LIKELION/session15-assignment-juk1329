import { useState } from "react";
import { deleteTodo } from "../lib/firebase";

const TodoItem = ({ todo, onEdit, onDelete }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const formatDate = (timestamp) => {
        if (!timestamp) return "No deadline";

        const date = new Date(timestamp);
        return date.toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const handleDelete = async () => {
        if (window.confirm("이 할 일을 삭제하시겠습니까?")) {
            try {
                await deleteTodo(todo.id);
                onDelete();
            } catch (error) {
                console.error("Error deleting todo:", error);
            }
        }
    };

    return (
        <div className="todo-item">
            <div
                className="todo-header"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <h3>{todo.title}</h3>
                <div className="todo-controls">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit(todo);
                        }}
                        className="edit-btn"
                    >
                        수정
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDelete();
                        }}
                        className="delete-btn"
                    >
                        삭제
                    </button>
                </div>
            </div>

            {isExpanded && (
                <div className="todo-details">
                    <p>
                        <strong>세부사항:</strong>{" "}
                        {todo.details || "세부사항이 없습니다."}
                    </p>
                    <p>
                        <strong>마감기한:</strong> {formatDate(todo.deadline)}
                    </p>
                    <p>
                        <strong>생성일:</strong> {formatDate(todo.createdAt)}
                    </p>
                </div>
            )}
        </div>
    );
};

export default TodoItem;
