import React, { useState } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import { Todo } from './model';

const App = () => {
  const [todo, setTodo] = useState<string>('')
  const [todos, setTodos] = useState<Todo[]>([])
  
const handleAdd = (e:React.FormEvent) => {
e.preventDefault()
if(todo) {
  setTodos([...todos, {id: Date.now(), todo, isDone: false}])
  setTodo('')
}
}

  return (
    <div className="bg-blue-300 w-full">
     <h1 className='text-3xl text my-5 text-center'>TODO</h1>
     <TaskInput todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
     <TaskList todos={todos} setTodos={setTodos}/>
    </div>
  )
}

export default App;
