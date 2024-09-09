import React, { useState, useEffect } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import { Todo } from './model';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';


const App = () => {
  const [todo, setTodo] = useState<string>('')
  const [allTodos, setAllTodos] = useState<Todo[]>([])
  const [activeTodos, setActiveTodos] = useState<Todo[]>([])
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (todo) {
      setAllTodos([...activeTodos, { id: Date.now(), todo, isDone: false }])
      setTodo('')
    }
  }

console.log(allTodos)

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result
    
    if (!destination) return
    if (destination.droppableId === source.droppableId) return

    let add
    let active = activeTodos
    let complete = completedTodos

    if (source.droppableId === "TasksList") {
      add = active[source.index]
      active.splice(source.index, 1)
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === "TasksList") {
      active.splice(destination.index, 0, add);
      add.isDone = false
    } else {
      complete.splice(destination.index, 0, add);
      add.isDone = true
    }
   
    setCompletedTodos(complete);
    setActiveTodos(active);
  }

useEffect(() => {
  setActiveTodos(allTodos.filter((todo) => !todo.isDone))
  setCompletedTodos(allTodos.filter((todo) => todo.isDone))
}, [allTodos])

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="bg-blue-300 w-full">
        <h1 className='text-3xl text my-5 text-center'>TODO</h1>
        <TaskInput todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TaskList activeTodos={activeTodos} setActiveTodos={setActiveTodos} completedTodos={completedTodos} setCompletedTodos={setCompletedTodos} allTodos={allTodos} setAllTodos={setAllTodos}/>
      </div>
    </DragDropContext>
  )
}

export default App;
