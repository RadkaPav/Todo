import React from 'react'
import TaskList from './TaskList'
import { Todo } from '../model'

interface Props {
    activeTodos: Todo[]
    setActiveTodos: React.Dispatch<React.SetStateAction<Todo[]>>
    completedTodos: Todo[]
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>
    allTodos: Todo[]
    setAllTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const TaskContainer = ({ activeTodos: activeTodos, setActiveTodos: setActiveTodos, completedTodos, setCompletedTodos, allTodos, setAllTodos }: Props) => {
    return (
        <div className='flex flex-col md:flex-row justify-evenly'>
            <TaskList activeTodos={activeTodos} setActiveTodos={setActiveTodos} completedTodos={completedTodos} setCompletedTodos={setCompletedTodos} allTodos={allTodos} setAllTodos={setAllTodos} title="Aktivní úkoly" data={activeTodos} />
            <TaskList activeTodos={activeTodos} setActiveTodos={setActiveTodos} completedTodos={completedTodos} setCompletedTodos={setCompletedTodos} allTodos={allTodos} setAllTodos={setAllTodos} title="Splněné úkoly" data={completedTodos} />
        </div>
    )
}

export default TaskContainer