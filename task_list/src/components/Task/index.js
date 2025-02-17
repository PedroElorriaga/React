import React from "react";
import "./Task.css";
import PropTypes from "prop-types";

export default function Task({ taskToBeShowed, loopActiveTasks, handleEditTask, handleDeleteTask }) {
  return (
    <div className="active_tasks">
      <h3>Tasks ativas</h3>
      <ul>{loopActiveTasks(taskToBeShowed, handleDeleteTask, handleEditTask)}</ul>
    </div>
  );
}

Task.propTypes = {
  taskToBeShowed: PropTypes.any.isRequired,
  loopActiveTasks: PropTypes.func.isRequired,
  handleEditTask: PropTypes.func.isRequired,
  handleDeleteTask: PropTypes.func.isRequired
};
