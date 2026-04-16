import React from 'react'

import Todo from './components/Todo'

    const Todo = ({ todo }) => {
        return (
            <div className="app">
                <h1>Lista de Tarefas</h1>
                <div className="todo-list">
                    {todos.map((todo) => (
                        <Todo todo={todo}  />
                    ))}
                </div>    
            </div>
        )
    }

export default App;