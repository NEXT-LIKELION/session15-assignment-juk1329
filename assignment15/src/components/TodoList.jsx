import { useEffect, useState } from "react";
import { getAllTodos } from "../lib/firebase";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingTodo, setEditingTodo] = useState(null);

    const fetchTodos = async () => {
        setLoading(true);
        try {
            const todoData = await getAllTodos();
            setTodos(todoData);
        } catch (error) {
            console.error("Error fetching todos:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    const handleEditClick = (todo) => {
        setEditingTodo(todo);
    };

    const handleEditComplete = () => {
        setEditingTodo(null);
        fetchTodos();
    };

    return (
        <div className="todo-list-container">
            <h2>할 일 목록</h2>
            <TodoForm
                onComplete={fetchTodos}
                editingTodo={editingTodo}
                onEditComplete={handleEditComplete}
            />

            {loading ? (
                <p>로딩 중...</p>
            ) : (
                <div className="todo-items">
                    {todos.length === 0 ? (
                        <p>할 일이 없습니다. 새로운 할 일을 추가해보세요!</p>
                    ) : (
                        todos.map((todo) => (
                            <TodoItem
                                key={todo.id}
                                todo={todo}
                                onEdit={handleEditClick}
                                onDelete={fetchTodos}
                            />
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default TodoList;
