import { addOnClicks, createCloseModalButton } from "./buttons";
import { createTodoForm, createProjectForm, editTodoForm } from "./modalContent";
import { uiState } from "./uiState";

function createModal(heading, form) {
  const section = document.querySelector(".modal");
  section.innerHTML = '';
  const header = document.createElement("header");
  const h4 = document.createElement("h4");
  header.appendChild(h4);
  header.appendChild(createCloseModalButton());
  h4.textContent = heading;
  section.appendChild(header);
  section.append(form);
  const overlay = document.querySelector(".overlay");
  section.classList.remove("hidden");
  overlay.classList.remove("hidden");
  return section;
}

export function closeModal() {
  const modal = document.querySelector(".modal");
  const overlay = document.querySelector(".overlay");
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

export function createAddTodoModal() {
  return createModal("Add todo", createTodoForm());
}

export function createAddProjectModal() {
  return createModal("Add project", createProjectForm());
}

export function createTodoDetailsModal(todoId, todo) {
  return createModal("Todo details", editTodoForm(todoId, todo));
}

function createProjectItem(title, isSelected, id) {
  const li = document.createElement("li");
  li.onclick = () => {
    uiState.selectedProject = id;
    reset();
  }
  const titleDiv = document.createElement("div");
  titleDiv.textContent = title;
  li.appendChild(titleDiv);
  if (isSelected) {
    li.classList.add("selected");
    return li;
  }
  const deleteButton = document.createElement("button");
  deleteButton.onclick = (e) => {
    uiState.removeProject(id);
    reset();
    e.stopPropagation();
  }
  const svgString = `<svg fill="#000000" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 408.483 408.483" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M87.748,388.784c0.461,11.01,9.521,19.699,20.539,19.699h191.911c11.018,0,20.078-8.689,20.539-19.699l13.705-289.316 H74.043L87.748,388.784z M247.655,171.329c0-4.61,3.738-8.349,8.35-8.349h13.355c4.609,0,8.35,3.738,8.35,8.349v165.293 c0,4.611-3.738,8.349-8.35,8.349h-13.355c-4.61,0-8.35-3.736-8.35-8.349V171.329z M189.216,171.329 c0-4.61,3.738-8.349,8.349-8.349h13.355c4.609,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.737,8.349-8.349,8.349h-13.355 c-4.61,0-8.349-3.736-8.349-8.349V171.329L189.216,171.329z M130.775,171.329c0-4.61,3.738-8.349,8.349-8.349h13.356 c4.61,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.738,8.349-8.349,8.349h-13.356c-4.61,0-8.349-3.736-8.349-8.349V171.329z"></path> <path d="M343.567,21.043h-88.535V4.305c0-2.377-1.927-4.305-4.305-4.305h-92.971c-2.377,0-4.304,1.928-4.304,4.305v16.737H64.916 c-7.125,0-12.9,5.776-12.9,12.901V74.47h304.451V33.944C356.467,26.819,350.692,21.043,343.567,21.043z"></path> </g> </g> </g></svg>`;
  deleteButton.innerHTML = svgString;
  li.appendChild(deleteButton);
  return li;
}

function resetProjects() {
  const lst = document.querySelector(".projects ul");
  lst.innerHTML = "";
  for (const [i, item] of uiState.projectsShown.entries()) {
    lst.appendChild(createProjectItem(item.title, i === uiState.selectedProject, i));
  }
}

function createTodoItem(id, todo) {
  const {title, isDone, priority, dueDate} = todo.mainInfo;
  const li = document.createElement("li");
  li.classList.add("card");
  li.classList.add(`${priority}-priority`);
  li.onclick = () => createTodoDetailsModal(id, todo);
  if (isDone) {
    li.classList.add("done");
  }
  const h4 = document.createElement("h4");
  h4.textContent = title;
  const span = document.createElement("span");
  span.textContent = dueDate;
  li.appendChild(h4);
  li.appendChild(span);
  return li;
}

function resetTodos() {
  const lst = document.querySelector(".todos .list");
  lst.innerHTML = "";
  for (const [i, item] of uiState.todosShown.entries()) {
    lst.appendChild(createTodoItem(i, item))
  }
}

export function initialize() {
  addOnClicks();
  reset();
}

export function reset() {
  resetProjects();
  resetTodos();
}