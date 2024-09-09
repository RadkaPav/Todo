import React, { useState, useRef, useEffect } from 'react'
import { Todo } from '../model'
import { GiCheckMark } from "react-icons/gi";
import { MdDeleteForever, MdModeEditOutline } from "react-icons/md";
import { Draggable } from 'react-beautiful-dnd';

interface Props {
    index: number
    todo: Todo
    activeTodos: Todo[]
    setActiveTodos: React.Dispatch<React.SetStateAction<Todo[]>>
    completedTodos: Todo[]
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>
    allTodos: Todo[]
    setAllTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const Task = ({ index, todo, activeTodos: activeTodos, setActiveTodos: setActiveTodos, completedTodos, setCompletedTodos, allTodos, setAllTodos }: Props) => {
    const [edit, setEdit] = useState<boolean>(false)
    const [editTodo, setEditTodo] = useState<string>(todo.todo)

    const handleDone = (id: number) => {
        setAllTodos(allTodos.map(todo => todo.id === id ? { ...todo, isDone: !todo.isDone } : todo))
    }

    const handleDelete = (id: number) => {
        setAllTodos(allTodos.filter((todo) => todo.id !== id))
    }

    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault()
        setAllTodos(allTodos.map((todo) => todo.id === id ? { ...todo, todo: editTodo } : todo))
        setEdit(false)
    }

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        inputRef.current?.focus()
    }, [edit])

    return (
        <Draggable draggableId={todo.id.toString()} index={index}>
            {
                (provided) => (
                    <form className='w-[90%] bg-orange-400 my-1 mx-auto px-3 py-1 flex justify-between items-center rounded'
                        onSubmit={(e) => handleEdit(e, todo.id)} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        {
                            edit ?
                                <input className='outline-none w-8/12 pl-3' ref={inputRef} value={editTodo} onChange={(e) => setEditTodo(e.target.value)} /> : <span>{todo.todo}</span>
                        }
                        <div className='flex'>
                            <MdModeEditOutline
                                className='text-2xl bg-white m-1 p-1'
                                onClick={() => {
                                    if (!edit && !todo.isDone) setEdit(!edit)
                                }} />
                            <GiCheckMark
                                className={`text-2xl m-1 p-1 ${todo.isDone ? "bg-green-600" : "bg-white"}`}
                                onClick={() => handleDone(todo.id)} />
                            <MdDeleteForever
                                className='text-2xl bg-white m-1 p-1'
                                onClick={() => handleDelete(todo.id)} />
                        </div>
                    </form>
                )
            }
        </Draggable>
    )
}


export default Task