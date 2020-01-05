'use strict';

import { EventEmitter } from "events";

export class TodoListModel extends EventEmitter {
  constructor() {
    super();
    this.items = [];
  }
  
  getTodoItems() {
    return this.items;
  }

  onChange(listener) {
    this.addListener('change', listener);
  }

  offChange(listener) {
    this.removeListener('change', listener);
  }

  emitChange() {
    this.emit('change');
  }


  addTodo(todoItem) {
    this.items.push(todoItem);
    this.emitChange();
  }

  updateTodo({id, completed}) {
    const todoItem = this.items.find(todo => todo.id === id);
    if (!todoItem) {
      return;
    }
    todoItem.completed = completed;
    this.emitChange();
  }

  deleteTodo({id}) {
    this.items = this.items.filter(todo => {
      return todo.id !== id;
    });
    this.emitChange();
  }
}