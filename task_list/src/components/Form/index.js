import React, { Component } from "react";
import { CgMathPlus, CgClose, CgOptions } from "react-icons/cg";
import "./Form.css";

export default class Form extends Component {
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

  loopActiveTasks(tasks) {
    const tasksList = [];
    tasks.forEach((item) => {
      tasksList.push(
        <li>
          {item}
          <div className="buttons">
            <button onClick={() => this.handleEditTask(item)}><CgOptions /></button>
            <button onClick={() => this.handleDeleteTask(item)}><CgClose /></button>
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
        <form onSubmit={this.handleAddNewTask} action="#" id="main_form">
          <input type="text" placeholder="Ex: Fazer a janta" onChange={this.handleNewTask} value={novaTask} />
          <button type="submit"><CgMathPlus /></button>
        </form>
        <div className="active_tasks">
          <h3>Taks ativas</h3>
          <ul>{this.loopActiveTasks(taskToBeShowed)}</ul>
        </div>
      </>
    );
  }
}
