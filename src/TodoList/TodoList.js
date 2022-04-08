import React, { Component } from "react";
import { Container } from "../ComponentsToDoList/Container";
import { ThemeProvider } from "styled-components";
import { Dropdown } from "../ComponentsToDoList/Dropdown";
import { Heading3,} from "../ComponentsToDoList/Heading";
import { TextField,  } from "../ComponentsToDoList/TextField";
import { Button } from "../ComponentsToDoList/Button";
import { Table, Tr, Th, Thead,  } from "../ComponentsToDoList/Table";
import { connect } from 'react-redux'
import { v4 as uuidv4 } from 'uuid';
import { addTaskAction ,deleteTaskAction,doneTaskAction,changeThemeAction,editTaskAction,updateTaskAction} from '../redux/actions/TodoListAction'
import {arrTheme} from '../Themes/ThemeManager'
export  class TodoList extends Component {

renderTaskTodo=()=>{
return this.props.taskList.filter(task => !task.isDone).map((task,index)=>{
  return <Tr key={index}>
    <Th style={{ verticalAlign: "middle" }}>{task.taskName}</Th>
    <Th className="text-right">
      <Button onClick={() => {

this.setState({
    disabled: false
}, () => {
    this.props.dispatch(editTaskAction(task))
})

}}>
        <i className="fa fa-edit"></i>
      </Button>

      <Button className="ml-1" onClick={()=>{
        this.props.dispatch(doneTaskAction(task.id))
      }}>
        <i className="fa fa-check"></i>
      </Button>

      <Button className="ml-1" onClick={()=>{
        this.props.dispatch(deleteTaskAction(task.id))
      }}>
        <i className="fa fa-trash"></i>
      </Button>
    </Th>
  </Tr>
  
})

}


renderTaskComplete=()=>{
return this.props.taskList.filter(task=>task.isDone).map((task,index)=>{
  return <Tr key={index}>
  <Th style={{ verticalAlign: "middle" }}>{task.taskName}</Th>
  <Th className="text-right">
    <Button>
    <i className="fas fa-trash-alt"  onClick={()=>{
        this.props.dispatch(deleteTaskAction(task.id))
      }}></i>
    </Button>


  </Th>
</Tr>
})

}

renderOptionTheme=()=>{
  return arrTheme.map((option,index)=>{
    return   <option value={option.id} key={index}>{option.name}</option>

  })
}
    state={
        taskName:''
    }
    

  render() {
    return (

      <ThemeProvider theme={this.props.themTodoList}>
        <Container className="w-50">
          <Dropdown onChange={(event)=>{
              let value=event.target.value;
              this.props.dispatch(changeThemeAction(value))
          }}>{this.renderOptionTheme()}</Dropdown>
          <Heading3>To do list</Heading3>

          <TextField className="w-50" value={this.state.taskName}  onChange={(event)=>{
              this.setState({
                  taskName:event.target.value
              } )

          }} ></TextField>
          <Button className="ml-2" onClick={()=>{
              let {taskName} = this.state;

              let newTask={
                  id:uuidv4(),
                  taskName:taskName,
                  isDone:false

              }
              this.props.dispatch(addTaskAction(newTask))

}}>
            <i className="fas fa-plus" style={{ marginRight: "10px" }}></i>Add Task
          </Button>
          <Button className="ml-2" onClick={() => {
                                let {taskName} = this.state;
                                this.setState({
                                    disabled: true,
                                    taskName:''
                                }, () => {
                                    this.props.dispatch(updateTaskAction(taskName))
                                })

                            }}>
            <i className="fas fa-edit" style={{ marginRight: "10px" }}></i>Update
            Task
          </Button>
          <hr />
          <Heading3>Task to do</Heading3>
          <Table>
          <Thead>
     {this.renderTaskTodo()}
                    </Thead>
          </Table>

          {/* task completed */}
          <Heading3>Task completed</Heading3>
          <Table>
          <Thead>
           {this.renderTaskComplete()}
              </Thead>
          </Table>
        </Container>
      </ThemeProvider>
    );
  }
      //Đây là lifecycle trả về props cũ và state cũ của component trước khi render (lifecycle này chạy sau render)
      componentDidUpdate(prevProps, prevState) {

        //So sánh nếu như props trước đó (taskEdit trước mà khác taskEdit hiện tại thì mình mới setState)
        if (prevProps.taskEdit.id !== this.props.taskEdit.id) {
            this.setState({
                taskName: this.props.taskEdit.taskName
            })

        }


    }
}


const mapStateToProps =(state)=>{
    return{
        themTodoList:state.ToDoListReducer.themeTodoList,
        taskList:state.ToDoListReducer.taskList,
        taskEdit:state.ToDoListReducer.taskEdit
    }
}

export default connect(mapStateToProps)(TodoList)