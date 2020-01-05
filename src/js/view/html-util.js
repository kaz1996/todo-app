'use strict';

export const escapeSpecialChar = (str) => {
  return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
}

export const htmlToElement = (html) => {
  const template = document.createElement('template');
  template.innerHTML = html;
  return template.content.firstElementChild;
}

export const element = (strings, ...values) => {
  const htmlString = strings.reduce((result, str, i) => {
    const value = values[i - 1];
    if (typeof value === 'string') {
      return result + escapeSpecialChar(value) + str;
    } else {
      return result + String(value) + str;
    }
  }) ;
  return htmlToElement(htmlString);
}

export const render = (bodyElement, containerElement) => {
  containerElement.innerHTML = '';
  containerElement.appendChild(bodyElement);
}