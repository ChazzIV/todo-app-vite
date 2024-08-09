import { Todo } from "../models/todo.models";

/**
 * 
 * @param {Todo} todo 
 */
export const createTodoHtml = (todo) => {
    if(!todo) throw new Error(' A TODO object is required');

    const {done, description, id} = todo;

    const html = `<div class="view">
                        <input class="toggle" type="checkbox" ${done ? 'checked' : ''}>
                        <label>${description}</label>
                        <button class="destroy"></button>
                   </div>
                   <input class="edit" value="Create a TodoMVC template">
                `;

    const LiElement = document.createElement('li');
    LiElement.innerHTML = html;
    LiElement.setAttribute('data-id', id);
    if(todo.done)
        LiElement.classList.add('completed')

    return LiElement;
}