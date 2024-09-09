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
      <div className='w-[40%]'>
        <Droppable droppableId='TasksList'>
          {
            (provided, snapshot) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className={`mt-4 text-center py-1 ${snapshot.isDraggingOver ? "bg-teal-700" : "bg-teal-400"}`}>
                <h3>Aktivní úkoly</h3>
                {activeTodos.map((todo, index) => (
                  <Task todo={todo} activeTodos={activeTodos} setActiveTodos={setActiveTodos} index={index} key={todo.id} completedTodos={completedTodos} setCompletedTodos={setCompletedTodos} allTodos={allTodos} setAllTodos={setAllTodos}/>
                ))}
                {provided.placeholder}
              </div>
            )
          }
        </Droppable>
      </div>

      <div className='w-[40%]'>
        <Droppable droppableId='TasksRemove'>
          {
            (provided, snapshot) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className={`mt-4  text-center py-1 ${snapshot.isDraggingOver ? "bg-red-600" : "bg-red-400"}`}>
                <span>Splněné úkoly</span>
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
  

