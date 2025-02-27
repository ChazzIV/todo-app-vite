import todoStore, { Filters } from "../store/todo.store";
import html from "./app.html?raw";
import { renderTodos } from "./use-cases";
import { renderPending } from "./use-cases/render-pending";

const ElementIds = {
    ClearCompleted: '.clear-completed',
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    TodoFilters: '.filtro',
    PendingCountLabel: '#pending-count',
}
/**
 * 
 * @param {String} elementId 
 */
export const App = (elementId) => {
    
    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentfilter());

        renderTodos(ElementIds.TodoList, todos);
        updatePendingCount();
    }

    const updatePendingCount = () => {
        renderPending(ElementIds.PendingCountLabel);
    }

    //cuando la funcion se llama
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();


    //referencias HTML
    const newDescriptionInput = document.querySelector(ElementIds.NewTodoInput);
    const todoListUl = document.querySelector(ElementIds.TodoList);
    const clearCompleted = document.querySelector(ElementIds.ClearCompleted);
    const filtersLIs = document.querySelectorAll(ElementIds.TodoFilters);


    newDescriptionInput.addEventListener('keyup', (event) => {
        if( event.keyCode !== 13) return;
        if( event.target.value.trim().length === 0) return;


        todoStore.addTodo(event.target.value);
        displayTodos();
        event.target.value = '';
    });

    todoListUl.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]');
        todoStore.toggleTodo(element.getAttribute('data-id'));
        displayTodos();
    });
    
    todoListUl.addEventListener('click', (event) => {
        const isDestroyElement = event.target.className === 'destroy';
        const element = event.target.closest('[data-id]');

        if(!element || !isDestroyElement) return;
        todoStore.deleteTodo(element.getAttribute('data-id'));
        displayTodos();
    });

        
    clearCompleted.addEventListener('click', () => {
        todoStore.deleteCompleted();
        displayTodos();
    });
        
    filtersLIs.forEach(element => {
        element.addEventListener('click', (element) => {
            filtersLIs.forEach( ei => ei.classList.remove('selected'))
            element.target.classList.add('selected');

            switch (element.target.text) {
                case 'Todos':
                    todoStore.setfilter(Filters.All);
                break
                case 'Pendientes':
                    todoStore.setfilter(Filters.Pending);
                break
                case 'Completados':
                    todoStore.setfilter(Filters.Completed);
                break
            }

            displayTodos();
        });
    });
}