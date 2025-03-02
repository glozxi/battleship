import {
  addProject as addProjectToStorage,
  addTodo as addTodoToStorage,
  editTodo as editTodoInStorage,
  deleteTodo as deleteTodoInStorage,
  toggleTodoDone as toggleTodoDoneInStorage,
  projects,
  removeProject as removeProjectFromStorage
} from "./storage";

class UiState {
  static #instance;
  constructor() {
    if (UiState.#instance) {
      return UiState.#instance;
    }
    this.selectedProject = 0;
    UiState.#instance = this;
  }

  get selectedProject() {
    return UiState.selectedProject;
  }

  set selectedProject(id) {
    UiState.selectedProject = id;
  }

  get projectsShown() {
    const res = [];
    return projects;
  }

  get todosShown() {
    return projects[UiState.selectedProject].todos;
  }

  removeProject(id) {
    const selected = UiState.selectedProject;
    UiState.selectedProject = id > selected ? selected : selected - 1;
    removeProjectFromStorage(id);
  }

  addTodo(todo) {
    addTodoToStorage(UiState.selectedProject, todo);
  }

  editTodo(todoId, todo) {
    editTodoInStorage(UiState.selectedProject, todoId, todo);
  }

  toggleDoneTodo(todoId) {
    toggleTodoDoneInStorage(UiState.selectedProject, todoId);
  }

  deleteTodo(todoId) {
    deleteTodoInStorage(UiState.selectedProject, todoId);
  }

  addProject(project) {
    addProjectToStorage(project);
  }

}

export const uiState = new UiState();