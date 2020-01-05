'use strict';

import { TodoItemView } from "./TodoItemView";
import { element } from "./html-util";

export class TodoListView {
  createElement(todoItems, {onUpdateTodo, onDeleteTodo}) {
    const todoListElement = element`<ul class="list todo__list container" />`;
    todoItems.forEach(todoItem => {
      const todoItemView = new TodoItemView();
      const todoItemElement = todoItemView.createElement(todoItem, {onUpdateTodo, onDeleteTodo});
      todoListElement.appendChild(todoItemElement);
    });
    return todoListElement;
  }
}