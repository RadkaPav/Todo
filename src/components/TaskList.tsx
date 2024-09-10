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
  title: string
  data: Todo[]
}
const TaskList = ({ activeTodos: activeTodos, setActiveTodos: setActiveTodos, completedTodos, setCompletedTodos, allTodos, setAllTodos, title, data }: Props) => {
  return (
    <div className='w-full md:w-[40%]'>
        <Droppable droppableId={`${data === activeTodos ? "TasksList" : "TasksRemove"}`}>
          {
            (provided, snapshot) => (
              <div ref={provided.innerRef} {...provided.droppableProps}
                className={`mt-4 mx-2 text-center pt-1 pb-4 rounded
                ${data === activeTodos ?
                    snapshot.isDraggingOver ? "bg-teal-700" : "bg-teal-400" :
                    snapshot.isDraggingOver ? "bg-red-600" : "bg-red-400"
                  }`}>
                <h3 className='text-lg'>{title}</h3>
                {data.map((todo, index) => (
                  <Task todo={todo} activeTodos={activeTodos} setActiveTodos={setActiveTodos} index={index} key={todo.id} completedTodos={completedTodos} setCompletedTodos={setCompletedTodos} allTodos={allTodos} setAllTodos={setAllTodos} />
                ))}
                {provided.placeholder}
              </div>
            )
          }
        </Droppable>
      </div>
  )
}

export default TaskList


