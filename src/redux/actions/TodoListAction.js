import {add_task, change_theme, done_task, delete_task, edit_task,update_task } from '../types/TodoListType'


export const addTaskAction = (newTask) => {
  return (
    {
        type:add_task,
        newTask
    }
  )
}


export const deleteTaskAction = (id) => {
  return (
{
  type:delete_task,
  id
}
    
  )
}

export const doneTaskAction = (id) => {
  return (
{
  type:done_task,
  id
}  )
}


export const changeThemeAction = (value) => {
  return (
{
  type:change_theme,
  value
}  )
}


export const editTaskAction = (task) => {
  return (
{
  type:edit_task,
  task
}  )
}



export const updateTaskAction = (taskName) => ({
  type:update_task,
  taskName
})
