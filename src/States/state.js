import {atom} from "jotai"

const dataFromLocalStorage = JSON.parse(localStorage.getItem('TASKS')) || []

console.log(dataFromLocalStorage)

export const taskItems = atom(dataFromLocalStorage)

export const activeTaskItems = atom(
    get => get(taskItems).filter(item => item.completed === false)
)

export const completedTaskItems = atom(
    get => get(taskItems).filter(item => item.completed !== false)
)

