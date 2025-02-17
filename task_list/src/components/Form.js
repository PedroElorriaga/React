import React, { Component } from "react";
import { CgMathPlus, CgClose } from "react-icons/cg";
import "./Form.css";

export default class Form extends Component {
  state = {
    novaTask: '',
    nonTasks: [
      'Estudar...',
      'Fazer Almoço...'
    ],
    activeTask: JSON.parse(localStorage.getItem('tasks')) || []
  };

  handleNewTask = (event) => {
    this.setState({
      novaTask: event.target.value
    });
  };

  handleDeleteTask = (event) => {
    const { activeTask } = this.state;
    const index = activeTask.indexOf(event.target.value);
    activeTask.splice(index, 1);
    this.setState({
      activeTask: [...activeTask]
    }, this.saveTasksOnLocalStorage);
  };

  handleAddNewTask = (event) => {
    event.preventDefault();
    const { novaTask, activeTask } = this.state;
    if (activeTask.indexOf(novaTask.trim()) !== -1) return;
    this.setState({
      activeTask: [...activeTask, novaTask.trim()],
      novaTask: ''
    }, this.saveTasksOnLocalStorage);
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
          <button onClick={this.handleDeleteTask} value={item}><CgClose /></button>
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
