import React, { Component } from "react";
import Form from "./Form";
import Task from "./Task";
import "./Main.css";
import { CgClose, CgOptions } from "react-icons/cg";

export default class Main extends Component {
  state = {
    novaTask: '',
    nonTasks: [
      'Estudar...',
      'Fazer Almoço...'
    ],
    activeTask: JSON.parse(localStorage.getItem('tasks')) || [],
    index: -1
  };

  handleNewTask = (event) => {
    this.setState({
      novaTask: event.target.value
    });
  };

  handleDeleteTask = (item) => {
    const { activeTask } = this.state;
    const index = activeTask.indexOf(item);
    activeTask.splice(index, 1);
    this.setState({
      activeTask: [...activeTask]
    }, this.saveTasksOnLocalStorage);
  };

  handleAddNewTask = (event) => {
    event.preventDefault();
    const { novaTask, activeTask, index } = this.state;
    const trimmedTask = novaTask.trim();
    if (!trimmedTask || activeTask.includes(trimmedTask)) return;
    if (index !== -1) {
      activeTask[index] = trimmedTask;
      this.setState({
        activeTask: [...activeTask],
        novaTask: '',
        index: -1
      }, this.saveTasksOnLocalStorage);
    } else {
      this.setState({
        activeTask: [...activeTask, trimmedTask],
        novaTask: '',
        index: -1
      }, this.saveTasksOnLocalStorage);
    }
  };

  handleEditTask = (item) => {
    const { activeTask } = this.state;
    const index = activeTask.indexOf(item);
    this.setState({
      novaTask: activeTask[index],
      index: index
    });
  };

  saveTasksOnLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.state.activeTask));
  }

  loopActiveTasks(tasks, handleDeleteTask, handleEditTask) {
    const tasksList = [];
    tasks.forEach((item) => {
      tasksList.push(
        <li>
          {item}
          <div className="buttons">
            <button onClick={() => handleEditTask(item)}><CgOptions /></button>
            <button onClick={() => handleDeleteTask(item)}><CgClose /></button>
          </div>
        </li>
      );
    });
    return tasksList;
  }

  render() {
    const { novaTask, nonTasks, activeTask } = this.state;
    const taskToBeShowed = activeTask.length > 0 ? activeTask : nonTasks;

    return (
      <>
        <h1>TASK LIST By React</h1>
        <p>Para adicionar uma task, escreva ela abaixo e clique em adicionar</p>
        <Form
          novaTask={novaTask}
          handleAddNewTask={this.handleAddNewTask}
          handleNewTask={this.handleNewTask}
        />
        <Task
          taskToBeShowed={taskToBeShowed}
          loopActiveTasks={this.loopActiveTasks}
          handleEditTask={this.handleEditTask}
          handleDeleteTask={this.handleDeleteTask}
        />
      </>
    );
  }
}
