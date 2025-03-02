import { reset, closeModal } from "./display";
import { Project } from "./project";
import { deleteTodo } from "./storage";
import { Todo } from "./todo";
import { uiState } from "./uiState";
import { parse } from "date-fns";

function onSubmitTodo(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const {title, description, due, priority} = Object.fromEntries(formData);
  const dueDate = parse(due, 'yyyy-MM-dd', new Date());
  const newTodo = new Todo(title, description, dueDate, priority, false);
  uiState.addTodo(newTodo);
  reset();
  closeModal();
}

function onEditTodo(e, todoId, todo) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const {title, description, due, priority} = Object.fromEntries(formData);
  const dueDate = parse(due, 'yyyy-MM-dd', new Date());
  const newTodo = new Todo(title, description, dueDate, priority, todo.allInfo.isDone);
  uiState.editTodo(todoId, newTodo);
  reset();
  closeModal();
}

function onToggleDoneTodo(e, todoId) {
  e.preventDefault();
  uiState.toggleDoneTodo(todoId);
  reset();
  closeModal();
}

function onDeleteTodo(e, todoId) {
  e.preventDefault();
  uiState.deleteTodo(todoId);
  reset();
  closeModal();
}

function onSubmitProject(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const {title} = Object.fromEntries(formData);
  const newProject = new Project(title);
  uiState.addProject(newProject);
  reset();
  closeModal();
}

function createFormInput(label, input) {
  const p = document.createElement("p");
  p.appendChild(label);
  p.appendChild(input);
  return p;
}

function createOption(value, textContent) {
  const option = document.createElement("option");
  option.value = value;
  option.textContent = textContent;
  return option;
}

export function attachTodoFormInputs(form) {
  let label = document.createElement("label");
  label.for = "title";
  label.textContent = "Reminder";
  let input = document.createElement("input");
  input.type = "text";
  input.name = "title";
  input.id = "title";
  input.required = true;
  form.appendChild(createFormInput(label, input));
  
  label = document.createElement("label");
  label.for = "description";
  label.textContent = "Description";
  let textarea = document.createElement("textarea");
  textarea.name = "description";
  textarea.id = "description";
  textarea.rows = "3";
  form.appendChild(createFormInput(label, textarea));

  label = document.createElement("label");
  label.for = "due";
  label.textContent = "Due date";
  input = document.createElement("input");
  input.type = "date";
  input.name = "due";
  input.id = "due";
  input.required = true;
  form.appendChild(createFormInput(label, input));

  label = document.createElement("label");
  label.for = "priority";
  label.textContent = "Priority";
  let select = document.createElement("select");
  select.name = "priority";
  select.id = "priority";
  select.required = true;
  select.appendChild(createOption("high", "High"));
  select.appendChild(createOption("mid", "Medium"));
  select.appendChild(createOption("low", "Low"));
  form.appendChild(createFormInput(label, select));
}

export function createTodoForm() {
  const form = document.createElement("form");
  
  attachTodoFormInputs(form);

  const actionButtons = document.createElement("div");
  const button = document.createElement("button");
  button.textContent = "Add";
  button.type = "submit";
  actionButtons.appendChild(button);
  form.appendChild(actionButtons);
  form.onsubmit = onSubmitTodo;

  return form;
}

export function editTodoForm(todoId, todo) {
  const {title, description, dueDate, priority, isDone} = todo.allInfo;
  const form = document.createElement("form");
  attachTodoFormInputs(form);
  form.querySelector("#title").value = title;
  form.querySelector("#description").value = description;
  form.querySelector("#due").valueAsDate = dueDate;
  form.querySelector("#priority").value = priority;

  const actionButtons = document.createElement("div");

  const deleteButton = document.createElement("button")
  deleteButton.textContent = "Delete";
  deleteButton.type = "button"
  deleteButton.onclick = (e) => onDeleteTodo(e, todoId);
  deleteButton.classList.add("delete");
  actionButtons.appendChild(deleteButton);

  const toddleDoneButton = document.createElement("button")
  toddleDoneButton.textContent = "Toggle Done";
  toddleDoneButton.type = "button"
  toddleDoneButton.onclick = (e) => onToggleDoneTodo(e, todoId);
  actionButtons.appendChild(toddleDoneButton);

  const editButton = document.createElement("button")
  editButton.textContent = "Edit";
  editButton.type = "submit"
  actionButtons.appendChild(editButton);

  form.appendChild(actionButtons);
  form.onsubmit = (e) => onEditTodo(e, todoId, todo);

  return form;
}

export function createProjectForm() {
  const form = document.createElement("form");
  
  let label = document.createElement("label");
  label.for = "title";
  label.textContent = "Title";
  let input = document.createElement("input");
  input.type = "text";
  input.name = "title";
  input.id = "title";
  input.required = true;
  form.appendChild(createFormInput(label, input));

  const button = document.createElement("button");
  button.textContent = "Add";
  form.appendChild(button);
  form.onsubmit = onSubmitProject;

  return form;
}