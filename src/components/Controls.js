import React, { useState } from 'react'
import { useAtom } from "jotai"
import { taskItems } from "../States/state"
import styled from 'styled-components'
import tw from 'twin.macro'
import { Button } from './ui/Button'



// Styles
const Container = styled.div`
    ${tw`flex items-center justify-between`}
`

const ButtonsContainer = styled.div`
    ${tw`flex flex-col justify-between m-4 text-slate-500 sm:flex-row`}
`

const NumOfActives = styled.p`
    ${tw`mr-5 text-slate-500`}
`

const Controls = (props) => {

    const [tasks] = useAtom(taskItems)

    const [btnState, setBtnState] = useState({
        activeObject: 'All',
        objects: ['All', 'Active', 'Completed']
    })

    const toggleActive = (value) => {
        setBtnState({ ...btnState, activeObject: value })

        //Buttons onClick
        switch (value) {
            case 'All':
                props.onAllCick()
                break
            case 'Active':
                props.onActiveCick()
                break
            case 'Completed':
                props.onCompletedCick()
                break
        }
    }

    const toggleActiveStyles = (value) => {
        if (value === btnState.activeObject) {
            return true
        } else {
            return false
        }
    }

    const numOfActiveItems = tasks.filter(item => item.completed === false).length


    return (
        <Container>
            {/*Buttons*/}
            <ButtonsContainer>
                {btnState.objects.map(value => (
                    <Button
                        style1
                        active={toggleActiveStyles(value)}
                        key={value}
                        onClick={() => toggleActive(value)}
                    >{value}</Button>
                )
                )}
            </ButtonsContainer>

            {/*  Num of active tasks  */}
            <NumOfActives>
                {numOfActiveItems} task left
            </NumOfActives>

        </Container>
    )
}

export default Controls