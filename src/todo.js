import { format } from "date-fns";

export class Todo {
  #title;
  #description;
  #dueDate;
  #priority;
  #isDone;
  constructor(title, description, dueDate, priority, isDone) {
    this.#title = title;
    this.#description = description;
    this.#dueDate = dueDate;
    this.#priority = priority;
    this.#isDone = isDone;
  }

  get mainInfo() {
    return {
      title: this.#title,
      dueDate: format(this.#dueDate, "dd/MM/yyyy"),
      priority: this.#priority,
      isDone: this.#isDone,
    }
  }

  get allInfo() {
    return {
      title: this.#title,
      description: this.#description,
      dueDate: this.#dueDate,
      priority: this.#priority,
      isDone: this.#isDone,
    }
  }

  toggleDone() {
    this.#isDone = !this.#isDone;
  }

  toJSON() {
    return { 
      title: this.#title, 
      description: this.#description,
      dueDate: this.#dueDate.toISOString(),
      priority: this.#priority, 
      isDone: this.#isDone 
    }
  }

  static fromJSON({title, description, dueDate, priority, isDone}) {
    return new Todo(title, description, new Date(dueDate), priority, isDone);
  }
}