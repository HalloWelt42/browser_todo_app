import type {Todo} from "../model/Todo";
import type {Category} from "../model/Category";
import type {Status} from "../model/Status";
import {todo_manager} from "../todo_manager";
import type {Priority} from "../model/Priority";

export {TodoListController}

class TodoListController {

    private todos: Todo[];
    private categories: Category[];
    private default_category: string;

    constructor() {
        let ToDoStore = JSON.parse(localStorage.getItem("todo")) || {};
        this.todos = ToDoStore.todos || [];
        this.categories = ToDoStore.categories || [];
        this.default_category = 'Kategorie'
    }

    saveTodo() {
        localStorage.setItem("todo", JSON.stringify({
            todos: this.todos,
            categories: this.categories
        }));
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

    getCategoryName(id: string): string {
        let index = this.categories.findIndex((category) => {
            return category.id === id;
        });
        let name = this.categories[index].name;
        return name;
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

    getTodosCountBy(category_name: string): number {
        let count = 0;
        this.todos.forEach((todo) => {
            todo.categories.forEach((category) => {
                if (category === category_name) {
                    count++;
                }
            })
        });
        return count;
    }

    getCategoriesCount(): number {
        let count = 0;
        this.categories.forEach((categorie) => {
            if (categorie.selected === true) {
                count++;
            }
        });
        return count;
    }

    getIdsFromCategories(): string[] {
        let ids = [];
        this.categories.forEach((category) => {
            if (category.selected === true) {
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

    setTodoPriority(id: string, priority: Priority): void {
        let index = this.todos.findIndex((todo) => {
            return todo.id === id;
        });
        this.todos[index].priority = priority;
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

