'use strict';

import { TodoListModel } from "./model/TodoListModel";
import { TodoItemModel } from "./model/TodoItemModel";
import { render } from "./view/html-util";
import { TodoListView } from "./view/TodoListView";

export class App {
  constructor({form, input, listContainer}) {
    this.form = form;
    this.input = input;
    this.listContainer = listContainer;
    this.savedItems = JSON.parse(localStorage.getItem('items')) || [];
    this.todoListModel = new TodoListModel();
    this.todoListView = new TodoListView();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleList = this.handleList.bind(this);
  }

  handleAdd(title, completed = false) {
    this.todoListModel.addTodo(new TodoItemModel({title: title, completed: completed}));
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.input.value === '') {
      return;
    }
    this.handleAdd(this.input.value);
    this.input.value = '';
  }

  handleUpdate({id, completed}) {
    this.todoListModel.updateTodo({id, completed});
  }

  handleDelete({id}) {
    this.todoListModel.deleteTodo({id});
  }

  handleList() {
    const todoItems = this.todoListModel.getTodoItems();
    const todoListElement = this.todoListView.createElement(todoItems, {
      onUpdateTodo: ({id, completed}) => {
        this.handleUpdate({id, completed});
      },
      onDeleteTodo: ({id}) => {
        this.handleDelete({id});
      }
    })
    render(todoListElement, this.listContainer);
  }

  handleSaved(savedItems) {
    savedItems.forEach(savedItem => {
      this.handleAdd(savedItem.title);
    });
    this.handleList();
  }

  mount() {
    this.handleSaved(this.savedItems);
    this.todoListModel.onChange(this.handleList);
    this.form.addEventListener('submit', this.handleSubmit);
  }

  unmount() {
    localStorage.setItem('items', JSON.stringify(this.todoListModel.getTodoItems()));
    this.todoListModel.offChange(this.handleList);
    this.form.removeEventListener('submit', this.handleSubmit);
  }

}