import React, { useState } from 'react'
import icRemove from "../images/ic_remove.svg"
import { useAtom } from "jotai"
import { taskItems } from "../States/state"
import styled from 'styled-components'
import tw from 'twin.macro'

//styles
const ItemsContainer = styled.div`
    box-shadow: rgba(17, 12, 46, 0.15) 0 48px 100px 0;
    ${tw`flex justify-between bg-white p-4`}
`

const CheckBoxContainer = styled.div`
    ${tw`text-center`}
`

const TitleContainer = styled.div`
    flex-grow: 8;
    ${tw`basis-full break-all mr-5`}
`

const Title = styled.p`
    font-weight: 500;
    ${props => props.isComplete && tw`text-slate-400 line-through`}
`

const RemoveButtonContainer = styled.div`
    ${tw`text-center`}
`

const CheckboxInput = styled.input.attrs({type: "checkbox"})`
    ${tw`w-7 h-7 cursor-pointer mr-4`}
`

const ImageButton = styled.button`
    ${tw`border-none w-8 h-8 bg-no-repeat bg-cover bg-white text-red-600 cursor-pointer`}
`



const TaskItem = (props) => {

    const [tasks, setTasks] = useAtom(taskItems)

    //checkbox state
    const [checked, setChecked] = useState(props.item.completed)

    //remove item
    const removeHandler = () => {
        const filteredTasks = tasks.filter(item => item.id !== props.item.id)
        setTasks(filteredTasks)
        localStorage.setItem('TASKS', JSON.stringify(filteredTasks))
    }

    const onChangeHandler = () => {
        setChecked(prevState => !prevState)

        if (!checked) {
            //mark item as completed
            const updatedTasks = tasks.map(item => {
                if (item.id === props.item.id) {
                    item.completed = true
                }
                return item
            })
            setTasks(updatedTasks)
            localStorage.setItem('TASKS', JSON.stringify(updatedTasks))

        } else {
            //mark item as active
            const updatedTasks = tasks.map(item => {
                if (item.id === props.item.id) {
                    item.completed = false
                }
                return item
            })
            setTasks(updatedTasks)
            localStorage.setItem('TASKS', JSON.stringify(updatedTasks))
        }
    }

    return (
        <ItemsContainer>
            <CheckBoxContainer>
                <CheckboxInput
                    type="checkbox"
                    //defaultChecked={checked}
                    checked={props.item.completed}
                    onChange={onChangeHandler}
                />
            </CheckBoxContainer>

            <TitleContainer>
                <Title isComplete={props.item.completed}>
                    {props.item.title}
                </Title>
            </TitleContainer>

            <RemoveButtonContainer>
                <ImageButton
                    style={{ backgroundImage: `url(${icRemove})` }}
                    onClick={removeHandler}>
                </ImageButton>
            </RemoveButtonContainer>

        </ItemsContainer>
    )
}

export default TaskItem