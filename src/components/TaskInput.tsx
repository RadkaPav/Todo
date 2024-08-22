import React from 'react'

interface Props {
    todo: string,
    setTodo: React.Dispatch<React.SetStateAction<string>>
    handleAdd: (e:React.FormEvent) => void
}

const TaskInput = ({ todo, setTodo, handleAdd}: Props) => {
    return (
        <form className='relative w-[90%] mx-auto' onSubmit={handleAdd}>
            <input
                placeholder='Enter a task'
                className='w-[100%] py-2 px-4 rounded-full outline-none'
                value={todo}
                onChange={e => setTodo(e.target.value)} />
            <button
                type='submit'
                className='bg-blue-800 p-1 rounded-full absolute right-1 top-1 text-white'
            >GO</button>
        </form>
    )
}

export default TaskInput