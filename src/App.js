import TaskList from "./components/TaskList"
import { useRef, useState } from "react"
import { activeTaskItems, completedTaskItems, taskItems } from "./States/state"
import { useAtom } from "jotai"
import { v4 as generateUId } from "uuid"
import Controls from "./components/Controls"
import RemoveControl from "./components/RemoveControl"
import styled from "styled-components"
import tw from "twin.macro"

// Styles
const Container = styled.div`
  ${tw`p-5 m-auto md:w-[70%] xl:w-[50%]`}
`

const Logo = styled.h1`
  ${tw`text-4xl my-7 font-bold text-center text-slate-200`}
`

const NewTaskContainer = styled.div`
  box-shadow: rgba(17, 12, 46, 0.15) 0 48px 100px 0;
  ${tw`p-10`}
`

const NewTaskInput = styled.input`
  ${tw`w-full border-none text-3xl placeholder:text-slate-300 
    focus:outline-none transition-none`}
`

function App() {
  const [tasks, setTasks] = useAtom(taskItems)
  const [activeTasks] = useAtom(activeTaskItems)
  const [completedTasks] = useAtom(completedTaskItems)

  const [tasksToShow, setTasksToShow] = useState("All")

  const taskText = useRef()

  const submitNewTaskHandler = (e) => {
    e.preventDefault()

    //validation
    if (taskText.current.value === "") {
      return
    }

    //append new task to state
    const newTask = {
      id: generateUId(),
      title: taskText.current.value,
      completed: false,
    }
    setTasks([...tasks, newTask])

    //add to local storage
    localStorage.setItem("TASKS", JSON.stringify([...tasks, newTask]))

    // Empty the text Input
    taskText.current.value = ""
  }

  //show all tasks
  const onAllClickHandler = () => {
    setTasksToShow("All")
  }

  //show active tasks
  const onActiveClickHandler = () => {
    setTasksToShow("Active")
  }

  //show completed tasks
  const onCompletedClickHandler = () => {
    setTasksToShow("Completed")
  }

  return (
    <Container>
      <Logo>To DO APP</Logo>

      {/*Controls*/}
      <Controls
        onAllCick={onAllClickHandler}
        onActiveCick={onActiveClickHandler}
        onCompletedCick={onCompletedClickHandler}
      />

      {/*Add new Task*/}
      <NewTaskContainer>
        <form onSubmit={submitNewTaskHandler}>
          <NewTaskInput ref={taskText} type="text" placeholder="Add new task" />
        </form>
      </NewTaskContainer>

      {/*Tasks List*/}
      <TaskList
        items={
          tasksToShow === "All"
            ? tasks
            : tasksToShow === "Active"
            ? activeTasks
            : tasksToShow === "Completed"
            ? completedTasks
            : null
        }
      />

      {/* Remove Control */}
      <RemoveControl />
    </Container>
  )
}

export default App
