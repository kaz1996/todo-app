'use strict';

import { element } from "./html-util";

export class TodoItemView {
  createElement(todoItem, {onUpdateTodo, onDeleteTodo}) {
    const line = todoItem.completed ? 'line-through' : '';
    const done = todoItem.completed ? 'check-circle' : 'circle';
    const checked = todoItem.completed ? 'list__check-button--green' : '';
    const todoItemElement = element`
      <li class="list__item">
        <button class="list__check-button ${checked}">
          <i class="far fa-${done} fa-lg"></i>
        </button>
        <p class="list__text list__text--${line}">${todoItem.title}</p>
        <button class="list__delete-button">
          <i class="far fa-trash-alt fa-lg"></i>
        </button>
      </li>`;
    const checkbox = todoItemElement.querySelector('.list__check-button');
    checkbox.addEventListener('click', () => {
      onUpdateTodo({
        id: todoItem.id,
        completed: !todoItem.completed
      });
    });

    const deleteButton = todoItemElement.querySelector('.list__delete-button');
    deleteButton.addEventListener('click', () => {
      onDeleteTodo({
        id: todoItem.id
      });
    });
    return todoItemElement;
  }
}