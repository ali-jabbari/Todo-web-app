import React from 'react'
import TaskItem from "./TaskItem"

const TaskList = (props) => {

    return (
        <div>
            {props.items.map(item => (
                <TaskItem key={item.id} item={item}/>
            ))}
        </div>
    )
}

export default TaskList