import React, { useState, useRef, useEffect } from 'react'
import { Todo } from '../model'
import { GiCheckMark } from "react-icons/gi";
import { MdDeleteForever, MdModeEditOutline } from "react-icons/md";

interface Props {
    todo: Todo
    todos: Todo[]
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>

}

const Task = ({ todo, todos, setTodos }: Props) => {
    const [edit, setEdit] = useState<boolean>(false)
    const [editTodo, setEditTodo] = useState<string>(todo.todo)

    const handleDone = (id: number) => {
        setTodos(todos.map((todo) => {
            return todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
        }))
    }

    const handleDelete = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id))
    }

    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault()
        setTodos(todos.map((todo) => todo.id === id ? { ...todo, todo: editTodo } : todo))
        setEdit(false)
    }

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        inputRef.current?.focus()
    }, [edit])

    return (
        <form className='w-[90%] bg-orange-400 mt-1 mx-auto px-3 py-1 flex justify-between items-center rounded'
            onSubmit={(e) => handleEdit(e, todo.id)} >
            {
                edit ? (
                    <input className='outline-none w-8/12 pl-3' ref={inputRef} value={editTodo} onChange={(e) => setEditTodo(e.target.value)} />
                ) : (
                    <span>{todo.todo}</span>
                )
            }

            <div className='flex'>
                <MdModeEditOutline
                    className='text-2xl bg-white m-1 p-1'
                    onClick={() => {
                        if (!edit && !todo.isDone) setEdit(!edit)
                    }} />
                <GiCheckMark
                    className='text-2xl bg-white m-1 p-1'
                    onClick={() => handleDone(todo.id)} />
                <MdDeleteForever
                    className='text-2xl bg-white m-1 p-1'
                    onClick={() => handleDelete(todo.id)} />

            </div>
        </form>
    )
}

export default Task