import TaskList from './TaskList'
import { Todo } from '../model'

interface Props {
    activeTodos: Todo[]
    completedTodos: Todo[]
}

const TaskContainer = ({ activeTodos, completedTodos }: Props) => {
    return (
        <div className='flex flex-col md:flex-row justify-evenly'>
            <TaskList activeTodos={activeTodos} title="Aktivní úkoly" data={activeTodos} />
            <TaskList activeTodos={activeTodos} title="Splněné úkoly" data={completedTodos} />
        </div>
    )
}

export default TaskContainer