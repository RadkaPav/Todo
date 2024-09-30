import React, { useState, useRef, useEffect } from 'react'
import { Todo } from '../model'
import { GiCheckMark } from "react-icons/gi"
import { MdDeleteForever, MdModeEditOutline } from "react-icons/md"
import { Draggable } from 'react-beautiful-dnd'
import { projectFirestore } from '../firebase/config'

interface Props {
    index: number
    todo: Todo
}

const Task = ({ index, todo }: Props) => {
    const [edit, setEdit] = useState<boolean>(false)
    const [editTodo, setEditTodo] = useState<string>(todo.todo)

    const handleDone = (id: string) => {
        if (todo.isDone) {
            projectFirestore.collection('todos').doc(id).update({isDone: false})
        } else {
            projectFirestore.collection('todos').doc(id).update({isDone: true})
        }
    }

    const handleDelete = (id: string) => {
        projectFirestore.collection("todos").doc(id).delete()
    }

    const handleEdit = (e: React.FormEvent, id: string) => {
        e.preventDefault()
        projectFirestore.collection('todos').doc(id).update({todo: editTodo})
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
                    <form className='w-[90%] bg-gray-200 my-1 mx-auto px-3 py-1 flex justify-between items-center rounded'
                        onSubmit={(e) => handleEdit(e, todo.id)} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        {
                            edit ?
                                <input className='outline-none w-8/12 pl-3' ref={inputRef} value={editTodo} onChange={(e) => setEditTodo(e.target.value)} /> : <span>{todo.todo}</span>
                        }
                        <div className='flex'>
                            <MdModeEditOutline
                                className='text-2xl bg-white border-2 border-gray-400 rounded m-1 p-1'
                                onClick={() => {
                                    if (!edit && !todo.isDone) setEdit(!edit)
                                }} />
                            <GiCheckMark
                                className={`text-2xl m-1 p-1 border-2 border-gray-400 rounded ${todo.isDone ? "bg-green-600" : "bg-white"}`}
                                onClick={() => handleDone(todo.id)} />
                            <MdDeleteForever
                                className='text-2xl bg-white border-2 border-gray-400 rounded m-1 p-1'
                                onClick={() => handleDelete(todo.id)} />
                        </div>
                    </form>
                )
            }
        </Draggable>
    )
}

export default Task