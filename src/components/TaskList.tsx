import React from 'react'
import Task from './Task'
import { Todo } from '../model'
import { Droppable } from 'react-beautiful-dnd'

interface Props {
  activeTodos: Todo[]
  setActiveTodos: React.Dispatch<React.SetStateAction<Todo[]>>
  completedTodos: Todo[]
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>
allTodos: Todo[]
  setAllTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}
const TaskList = ({ activeTodos: activeTodos, setActiveTodos: setActiveTodos, completedTodos, setCompletedTodos, allTodos, setAllTodos }: Props) => {
  return (
<div className='flex justify-evenly'>
      <div className='mt-4 bg-teal-400 w-[40%] text-center py-1'>
        <h3>Aktivní úkoly</h3>
        <Droppable droppableId='TasksList'>
          {
            (provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className=''>
                {activeTodos.map((todo, index) => (
                  <Task todo={todo} activeTodos={activeTodos} setActiveTodos={setActiveTodos} index={index} key={todo.id} completedTodos={completedTodos} setCompletedTodos={setCompletedTodos} allTodos={allTodos} setAllTodos={setAllTodos}/>
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
                  <Task todo={todo} activeTodos={activeTodos} setActiveTodos={setActiveTodos} index={index} key={todo.id} completedTodos={completedTodos} setCompletedTodos={setCompletedTodos} allTodos={allTodos} setAllTodos={setAllTodos}/>
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
  

