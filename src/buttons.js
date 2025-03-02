import { createAddTodoModal, createAddProjectModal, closeModal } from "./display";

export function addOnClicks() {
  const addTodoButton = document.querySelector(".todos .bottom button");
  addTodoButton.onclick = createAddTodoModal;
  const addProjectButton = document.querySelector(".projects .bottom button");
  addProjectButton.onclick = createAddProjectModal;
}

export function createCloseModalButton() {
  const closeButton = document.createElement("button");
  closeButton.textContent = "✖";
  closeButton.onclick = closeModal;
  return closeButton;
}