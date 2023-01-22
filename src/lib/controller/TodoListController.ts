import type {Todo} from "../model/Todo";
import type {Category} from "../model/Category";
import type {Status} from "../model/Status";
import {todo_manager} from "../todo_manager";

export {TodoListController}

class TodoListController {

    private todos: Todo[];
    private categories: Category[];
    private default_category: string;

    constructor() {
        this.todos = [];
        this.categories = [];
        this.default_category = 'Allgemein'
    }

    addCategory(category: Category): void {
        this.categories.push(category);
    }

    updateCategoryName(id: string, name: string): void {
        let index = this.categories.findIndex((category) => {
            return category.id === id;
        });
        this.categories[index].name = name;
    }

    existsCategoryName(name: string): boolean {
        let index = this.categories.findIndex((category) => {
            return category.name === name;
        });
        return index !== -1;
    }

    deleteCategory(id: string): void {
        this.categories = this.categories.filter((category) => {
            return category.id !== id;
        });
    }

    toggleCategorySelected(id: string) {
        let index = this.categories.findIndex((category) => {
            return category.id === id;
        });

        this.categories[index].selected = !this.categories[index].selected;
    }

    getCategories(): Category[] {
        return this.categories;
    }

    getIdsFromCategories(): string[] {
        let ids = [];
        this.categories.forEach((category) => {
            if (
                    category.selected === true
                ||  category.name === this.default_category
            ) {
                ids.push(category.id);
            }
        });
        return ids;
    }

    getIdFromCategory(name: string): string {
        let id = '';
        this.categories.forEach((category) => {
            if (category.name === name) {
                id = category.id;
                return;
            }
        });
        return id;
    }

    toggleTodoStatus(id: string) {

        let index = this.todos.findIndex((todo) => {
            return todo.id === id;
        });

        let status = this.todos[index].status;

        switch (status) {
            case 'open':
                this.todos[index].status = 'in_progress';
                break;
            case 'in_progress':
                this.todos[index].status = 'completed';
                break;
            case 'completed':
                this.todos[index].status = 'archived';
                break;
        }
    }

    getTodos(): Todo[] {
        return this.todos;
    }

    addTodo(todo: Todo): void {
        // get all selected categories
        todo.categories = this.getIdsFromCategories();
        this.todos.push(todo);
    }

    deleteTodo(id: string): void {
        let index = this.todos.findIndex((todo) => {
            return todo.id === id;
        });
        this.todos.splice(index, 1);
    }

    updateTodoName(id: string, name: string): void {
        let index = this.todos.findIndex((todo) => {
            return todo.id === id;
        });
        this.todos[index].name = name;
    }

}

