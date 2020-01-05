'use strict';

import './src/scss/index.scss'
import { App } from "./src/js/App";

const form = document.querySelector('#js-form');
const input = form.querySelector('#js-form-input');
const listContainer = document.querySelector('#js-todo-list');

const app = new App({form, input, listContainer});

window.addEventListener('load', () => {
  app.mount();
});
window.addEventListener('unload', () => {
  app.unmount();
});