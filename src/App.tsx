import React, { useState } from 'react';
import TaskInput from './components/TaskInput';
import { log } from 'console';

const App:React.FC = () => {
  const [todo, setTodo] = useState<string>('')
   console.log(todo)
  return (
    <div className="bg-blue-300 w-full">
     <h1 className='text-3xl text my-5 text-center'>TODO</h1>
     <TaskInput todo={todo} setTodo={setTodo}/>
    </div>
  )
}

export default App;
