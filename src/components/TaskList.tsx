import React from 'react'
import Task from './Task'
import { Todo } from '../model'

interface Props {
    todos: Todo[]
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}
const TaskList = ({ todos, setTodos }: Props) => {
  return (
    <div className='mt-4'>
        {todos.map((todo, index) => {
            return <Task todo={todo} todos={todos} setTodos={setTodos} key={index}/>
        })}
    </div>
  )
}

export default TaskList