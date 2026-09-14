import { useEffect, useState } from 'react'
import TodoForm from './components/TodoForm.jsx'
import TodoList from './components/TodoList.jsx'
import TodoFilter from './components/TodoFilter.jsx'
import './App.css'

const STORAGE_KEY = 'moon-todo-app.todos'

function loadTodos() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export default function App() {
  const [todos, setTodos] = useState(loadTodos)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const addTodo = (text) => {
    const trimmed = text.trim()
    if (!trimmed) return
    setTodos((prev) => [
      { id: crypto.randomUUID(), text: trimmed, completed: false },
      ...prev,
    ])
  }

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const editTodo = (id, text) => {
    const trimmed = text.trim()
    if (!trimmed) return
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text: trimmed } : todo)),
    )
  }

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed))
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const remainingCount = todos.filter((todo) => !todo.completed).length

  return (
    <div className="app">
      <h1>Todo App</h1>
      <TodoForm onAdd={addTodo} />
      <TodoFilter filter={filter} onChange={setFilter} />
      <TodoList todos={filteredTodos} onToggle={toggleTodo} onDelete={deleteTodo} onEdit={editTodo} />
      <footer className="app-footer">
        <span>{remainingCount}개 남음</span>
        <button
          type="button"
          className="clear-btn"
          onClick={clearCompleted}
          disabled={todos.every((todo) => !todo.completed)}
        >
          완료 항목 삭제
        </button>
      </footer>
    </div>
  )
}
