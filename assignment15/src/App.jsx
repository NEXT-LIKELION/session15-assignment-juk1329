import "./App.css";
import TodoList from "./components/TodoList";

function App() {
    return (
        <div className="app-container">
            <header className="app-header">
                <h1>Todo List Application</h1>
                <p>Firebase Firestore로 만든 할 일 관리 앱</p>
            </header>

            <main className="app-main">
                <TodoList />
            </main>

            <footer className="app-footer">
                <p>&copy; 2023 Todo List App</p>
            </footer>
        </div>
    );
}

export default App;
