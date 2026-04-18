import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    }
    return [
      {
        id: 1,
        text: 'Criar funcionalidade x no sistema',
        category: 'Trabalho',
        isCompleted: false,
      },
      {
        id: 2,
        text: 'Ir para a academia',
        category: 'Pessoal',
        isCompleted: false,
      },
      {
        id: 3,
        text: 'Estudar React',
        category: 'Estudos',
        isCompleted: false,
      },
    ];
  })

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const [filter, setFilter] = useState("All")
  const [search, setSearch] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Função para adicionar nova tarefa
  const addTodo = (text, category) => {
    const newTodo = {
      id: Math.floor(Math.random() * 10000),
      text,
      category,
      isCompleted: false,
    }
    setTodos([...todos, newTodo])
  }

  // Função para remover tarefa
  const removeTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id)
    setTodos(newTodos)
  }

  // Função para completar tarefa
  const completeTodo = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    )
    setTodos(newTodos)
  }

  // Toggle menu mobile
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      {/* Navbar Cyberpunk */}
      <nav className="cyberpunk-navbar">
        <div className="navbar-content">
          <div className="navbar-logo">
            <span className="navbar-icon">⚡</span>
            <h1>TaskFlow</h1>
          </div>
          
          <div className={`navbar-menu ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            <a href="#home" className="navbar-item active">
              📋 Tarefas
            </a>
            <a href="#stats" className="navbar-item">
              📊 Estatísticas
            </a>
            <a href="#settings" className="navbar-item">
              ⚙️ Configurações
            </a>
            <div className="navbar-status">
              <span className="status-dot"></span>
              <span>Online</span>
            </div>
          </div>
          
          <div 
            className={`navbar-toggle ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      <div className="app">
        <h1>Lista de Tarefas</h1>
        
        {/* Formulário para adicionar nova tarefa */}
        <div className="todo-form">
          <h2>Criar Tarefa</h2>
          <form onSubmit={(e) => {
            e.preventDefault()
            const text = e.target.text.value
            const category = e.target.category.value
            if (!text) return
            addTodo(text, category)
            e.target.reset()
          }}>
            <input
              type="text"
              name="text"
              placeholder="Digite sua tarefa..."
              maxLength="50"
            />
            <select name="category">
              <option value="Trabalho">Trabalho</option>
              <option value="Pessoal">Pessoal</option>
              <option value="Estudos">Estudos</option>
            </select>
            <button type="submit">Criar Tarefa</button>
          </form>
        </div>

        {/* Filtros e busca */}
        <div className="search-filter">
          <h2>Pesquisar Tarefa</h2>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar..."
          />
          <div className="filter-options">
            <p>Status:</p>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="All">Todas</option>
              <option value="Completed">Completas</option>
              <option value="Incomplete">Incompletas</option>
            </select>
          </div>
        </div>

        <div className="todo-list">
          {todos
            .filter((todo) =>
              filter === "All"
                ? true
                : filter === "Completed"
                ? todo.isCompleted
                : !todo.isCompleted
            )
            .filter((todo) =>
              todo.text.toLowerCase().includes(search.toLowerCase())
            )
            .map((todo) => (
              <div 
                key={todo.id} 
                className={`todo ${todo.isCompleted ? 'completed' : ''}`}
              >
                <div className="content">
                  <p>{todo.text}</p>
                  <p className='category'>({todo.category})</p>
                </div>
                <div>
                  <button onClick={() => completeTodo(todo.id)}>
                    {todo.isCompleted ? 'Desfazer' : 'Completar'}
                  </button>
                  <button onClick={() => removeTodo(todo.id)}>
                    Remover
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
      
      {/* Footer Princesa */}
      <footer className="princess-footer">
        <div className="footer-text">
          <span className="crown-emoji">👑</span>
          Criado por Ana Karoline Ribeiro 
          <span className="sparkle-emoji">✨</span>
        </div>
        <div className="footer-subtitle">
          Desenvolvido com dedicação e tecnologia ✨
        </div>
      </footer>
    </>
  )
}

export default App