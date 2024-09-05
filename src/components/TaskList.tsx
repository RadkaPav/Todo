import React from 'react'
import Task from './Task'
import { Todo } from '../model'
import { Droppable } from 'react-beautiful-dnd'

interface Props {
  todos: Todo[]
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
  completedTodos: Todo[]
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}
const TaskList = ({ todos, setTodos, completedTodos, setCompletedTodos }: Props) => {
  return (
<div className='flex justify-evenly'>
      <div className='mt-4 bg-teal-400 w-[40%] text-center py-1'>
        <h3>Aktivní úkoly</h3>
        <Droppable droppableId='TasksList'>
          {
            (provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className=''>
                {todos.map((todo, index) => (
                  <Task todo={todo} todos={todos} setTodos={setTodos} index={index} key={todo.id} />
                ))}
                {provided.placeholder}
              </div>
            )
          }
        </Droppable>
      </div>

      <div className='mt-4 bg-red-400 w-[40%] text-center py-1'>
        <span>Splněné úkoly</span>
        <Droppable droppableId='TasksRemove'>
          {
            (provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {completedTodos.map((todo, index) => (
                  <Task todo={todo} todos={completedTodos} setTodos={setCompletedTodos} index={index} key={todo.id} />
                ))}
                {provided.placeholder}
              </div>
            )
          }
        </Droppable>
      </div> 
    </div>
  )
  
}

export default TaskList
  

