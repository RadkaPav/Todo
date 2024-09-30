import React, { useState, useEffect } from 'react'
import TaskInput from './components/TaskInput'
import TaskContainer from './components/TaskContainer'
import { Todo } from './model'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { projectFirestore } from './firebase/config'
import { Toaster, toast } from 'react-hot-toast'

const App = () => {
  const [todo, setTodo] = useState<string>('')
  const [allTodos, setAllTodos] = useState<Todo[]>([])
  const [activeTodos, setActiveTodos] = useState<Todo[]>([])
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([])

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (todo) {
      try {
        await projectFirestore.collection('todos').add({ todo, isDone: false })
      } catch (err) {
        toast.error('Úkol nebyl přidán')
      }
      setTodo('')
    }
  }

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result

    if (!destination) return
    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    if (source.droppableId === 'TasksList') {
      projectFirestore.collection('todos').doc(draggableId).update({ isDone: true })
    }
    if (source.droppableId === 'TasksRemove') {
      projectFirestore.collection('todos').doc(draggableId).update({ isDone: false })
    }
  }

  useEffect(() => {
    const unsubscribe = projectFirestore.collection('todos').onSnapshot((snapshot) => {
      if (snapshot.empty) {
        toast.error('Žádné úkoly k vypsání')
        setAllTodos([])
      } else {
        let result: Todo[] = []
        snapshot.docs.forEach(oneTodo => {
          const { todo, isDone } = oneTodo.data()
          result.push({ todo, isDone, id: oneTodo.id })
        })
        setAllTodos(result)
      }
    }, err => toast.error(err.message))

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    setActiveTodos(allTodos.filter((todo) => !todo.isDone))
    setCompletedTodos(allTodos.filter((todo) => todo.isDone))
  }, [allTodos])

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className='bg-blue-200 w-full' >
          <h1 className='text-3xl text my-5 text-center'>SEZNAM ÚKOLŮ</h1>
          <TaskInput todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
          <TaskContainer activeTodos={activeTodos} completedTodos={completedTodos} />
        </div>
      </DragDropContext>
    </div>

  )
}

export default App;
