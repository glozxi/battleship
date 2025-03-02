import { Todo } from "./todo";
import { Project } from "./project";

const PROJECTS_KEY = "projects";
function saveToStorage(projects) {
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
}

const project1 = new Project("Default Project", [
  new Todo("Default todo", "", new Date(), "high", false),
]);

export let projects = [project1];

export function getData() {
  const storage = localStorage.getItem(PROJECTS_KEY);

  if (storage) {
    projects = JSON.parse(storage).map(Project.fromJSON);
  }
}

export function addProject(project) {
  projects.push(project);
  saveToStorage(projects);
}

export function removeProject(id) {
  projects.splice(id, 1);
  saveToStorage(projects);
}

export function addTodo(id, todo) {
  projects[id].addTodo(todo);
  saveToStorage(projects);
}

export function editTodo(projectId, todoId, todo) {
  projects[projectId].editTodo(todoId, todo);
  saveToStorage(projects);
}

export function deleteTodo(projectId, id) {
  projects[projectId].deleteTodo(id);
  saveToStorage(projects);
}

export function toggleTodoDone(projectId, todoId) {
  projects[projectId].toggleTodoDone(todoId);
  saveToStorage(projects);
}