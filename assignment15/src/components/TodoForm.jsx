import { useEffect, useState } from "react";
import { addTodo, updateTodo } from "../lib/firebase";

const TodoForm = ({ onComplete, editingTodo, onEditComplete }) => {
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");
    const [deadline, setDeadline] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (editingTodo) {
            setTitle(editingTodo.title || "");
            setDetails(editingTodo.details || "");

            if (editingTodo.deadline) {
                const date = new Date(editingTodo.deadline);
                setDeadline(date.toISOString().split("T")[0]);
            } else {
                setDeadline("");
            }
        } else {
            resetForm();
        }
    }, [editingTodo]);

    const resetForm = () => {
        setTitle("");
        setDetails("");
        setDeadline("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            alert("제목을 입력해주세요");
            return;
        }

        setIsSubmitting(true);

        try {
            const todoData = {
                title: title.trim(),
                details: details.trim(),
                deadline: deadline ? new Date(deadline).getTime() : null,
            };

            if (editingTodo) {
                await updateTodo(editingTodo.id, todoData);
                onEditComplete();
            } else {
                todoData.createdAt = Date.now();
                await addTodo(todoData);
                resetForm();
                onComplete();
            }
        } catch (error) {
            console.error("Error saving todo:", error);
            alert("저장 중 오류가 발생했습니다.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="todo-form">
            <h3>{editingTodo ? "할 일 수정" : "새 할 일 추가"}</h3>

            <div className="form-group">
                <label htmlFor="title">제목:</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="할 일 제목"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="details">세부사항:</label>
                <textarea
                    id="details"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="세부사항 (선택사항)"
                    rows="3"
                />
            </div>

            <div className="form-group">
                <label htmlFor="deadline">마감기한:</label>
                <input
                    type="date"
                    id="deadline"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                />
            </div>

            <div className="button-group">
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting
                        ? "저장 중..."
                        : editingTodo
                        ? "수정하기"
                        : "추가하기"}
                </button>

                {editingTodo && (
                    <button
                        type="button"
                        onClick={onEditComplete}
                        className="cancel-btn"
                    >
                        취소
                    </button>
                )}
            </div>
        </form>
    );
};

export default TodoForm;
