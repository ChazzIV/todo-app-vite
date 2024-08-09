import { Todo } from "../todos/models/todo.models";

export const Filters = {
    All: 'all',
    Completed: 'completed',
    Pending: 'Pending',
}

const state = {
    todos: [
        new Todo('piedra del alma'),
        new Todo('piedra del 2'),
        new Todo('piedra del 3'),
        new Todo('piedra del 4'),
    ],
    filter: Filters.All,
}

const initStore = () => {
    loadStore();
}

const loadStore = () => {
    if( !localStorage.getItem('state') ) return;

    const {todos, filter} = JSON.parse(localStorage.getItem('state'));
    state.todos = todos;
    state.filter = filter;
}

const saveStateToLocalStorage = () => {
    console.log(JSON.stringify(state));
    
    localStorage.setItem('state', JSON.stringify(state));
}

const getTodos = (filters = filter.All) => {
    switch (filters) {
        case  Filters.All:
            return [...state.todos];
        break
        case Filters.Completed:
            return [...state.todos.filter(todo => todo.done)];
        break
        case Filters.Pending:
            return [...state.todos.filter(todo => !todo.done)];
        break
        default: 
        throw new Error('Option is not valid');
    }
}

const addTodo = (description) => {
    if(!description) throw new Error('description is required');

    state.todos.push(new Todo(description));
    saveStateToLocalStorage();
}

const toggleTodo = (todoId) => {
    state.todos = state.todos.map( todo => {
        if(todo.id === todoId) {
            todo.done = !todo.done;
        }
        return todo;
    });
    saveStateToLocalStorage();
}

const deleteTodo = (todoId) => {
    state.todos = state.todos.filter( todo => todo.id !== todoId);
    saveStateToLocalStorage();
}

const deleteCompleted = () => {
    state.todos = state.todos.filter( todo => !todo.done);
    saveStateToLocalStorage();
}

const setfilter = (newFilter = Filters.All) => {
    state.filter = newFilter;
    saveStateToLocalStorage();
}

const getCurrentfilter = (newFilter = Filters.All) => {
    return state.filter;
}

export default {
    initStore,
    loadStore,
    deleteCompleted,
    deleteTodo,
    getCurrentfilter,
    setfilter,
    toggleTodo,
    addTodo,
    getTodos,
}