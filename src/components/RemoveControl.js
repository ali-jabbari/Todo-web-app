import React from 'react'
import {useAtom} from "jotai"
import {taskItems} from "../States/state"
import { Button } from './ui/Button'
import styled from 'styled-components'
import tw from 'twin.macro'

const ButtonsContainer = styled.div`
    ${tw`flex flex-col justify-end m-4 sm:flex-row`}
`


const RemoveControl = () => {

    const [tasks, setTasks] = useAtom(taskItems)

    const clearCompletedHandler = () => {
        const filteredTask = tasks.filter(item => item.completed === false)
        setTasks(filteredTask)
        localStorage.setItem('TASKS', JSON.stringify(filteredTask))
    }

    const removeAllHandler = () => {
        setTasks([])
        localStorage.removeItem('TASKS')
    }

    return (
        <ButtonsContainer>
            <Button style2 onClick={clearCompletedHandler}>Clear Completed</Button>
            <Button style2 onClick={removeAllHandler}>Remove All</Button>
        </ButtonsContainer>
    )
}

export default RemoveControl