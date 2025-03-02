import { Todo } from "./todo";

export class Project {
  #title;
  #todos;
  constructor(title, todos = []) {
    this.#todos = todos;
    this.#title = title;
  }

  get title() {
    return this.#title;
  }

  get todos() {
    return this.#todos;
  }

  addTodo(todo) {
    this.#todos.push(todo);
  }

  editTodo(id, todo) {
    this.#todos[id] = todo;
  }

  deleteTodo(id) {
    this.#todos.splice(id, 1);
  }

  toggleTodoDone(id) {
    this.#todos[id].toggleDone();
  }

  toJSON() {
    return {
      title: this.#title,
      todos: this.#todos,
    }
  }

  static fromJSON({title, todos}) {
    return new Project(title, todos.map(
      todo => Todo.fromJSON(todo)
    ));
  }
}