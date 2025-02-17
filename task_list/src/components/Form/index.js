import React from "react";
import "./Form.css";
import PropTypes from "prop-types";
import { CgMathPlus } from "react-icons/cg";

export default function Form({ novaTask, handleAddNewTask, handleNewTask }) {
  return (
    <form onSubmit={handleAddNewTask} action="#" id="main_form">
      <input type="text" placeholder="Ex: Fazer a janta" onChange={handleNewTask} value={novaTask} />
      <button type="submit"><CgMathPlus /></button>
    </form>
  );
}

Form.propTypes = {
  novaTask: PropTypes.any.isRequired,
  handleAddNewTask: PropTypes.func.isRequired,
  handleNewTask: PropTypes.func.isRequired
};
