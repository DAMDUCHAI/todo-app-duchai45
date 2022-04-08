import { ToDoListDarkTheme } from "../../Themes/ToDoListDarkTheme";
import {arrTheme} from '../../Themes/ThemeManager'
import {
  add_task,
  change_theme,
  delete_task,
  done_task,
  edit_task,
  update_task
} from "../types/TodoListType";
const initialState = {
  themeTodoList: ToDoListDarkTheme,
  taskList: [
    {
      id: "1",
      taskName: "Sleeping",
      isDone: false,
    },
    {
      id: "2",
      taskName: "Eating",
      isDone: false,
    },
    {
      id: "3",
      taskName: "Learning",
      isDone: true,
    },
    {
      id: "4",
      taskName: "Working",
      isDone: true,
    },
  ],
  taskEdit:{ id: "", taskName: 'task 1', done: false }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case add_task: {
      let newTask = action.newTask;
      if (newTask.taskName.trim() === "") {
        alert("task name require !");
        return { ...state };
      }
      let index = state.taskList.findIndex(
        (task) => task.taskName === newTask.taskName
      );
      if (index !== -1) {
        alert("task name already exists !");
        return { ...state };
      }
      state.taskList.push(newTask);

      //update state taskList
      state.taskList = [...state.taskList];
      console.log(state.taskList);

      return { ...state };
    }
    case delete_task: {
      let index = state.taskList.findIndex((task) => task.id === action.id);
      if (index !== -1) {
        state.taskList.splice(index, 1);
      }
      state.taskList = [...state.taskList];

      return { ...state };
    }

    case done_task: {
      let index = state.taskList.findIndex((task) => task.id === action.id);
      if (index !== -1) {
        state.taskList[index].isDone = true;
      }
      state.taskList = [...state.taskList];

      return { ...state };
    }
  case change_theme:{
let index =arrTheme.findIndex((theme)=>theme.id===parseInt(action.value,20)) ;
if(index !==-1){
    state.themeTodoList=arrTheme[index].theme;
}     
      return { ...state };

  }
  case edit_task: {
    return { ...state, taskEdit: action.task }
}
  case update_task:{
         
         // console.log(action.taskName)
            //Chỉnh sửa lại taskName của taskEdit
            state.taskEdit = { ...state.taskEdit, taskName: action.taskName };

            //Tìm trong taskList cập nhật lại taskEdit người dùng update
            let taskListUpdate = [...state.taskList];

            let index = taskListUpdate.findIndex(task => task.id === state.taskEdit.id);

            console.log(index);

            if (index !== -1) {
                taskListUpdate[index] = state.taskEdit;
            }

            state.taskList = taskListUpdate;
            state.taskEdit = {id:'-1',taskName:'',done:false}

            return { ...state }
  }
    default: {
      return { ...state };
    }
  }
};
