import type { Todo } from "../model/Todo";
import type { Category } from "../model/Category";
import type { Priority } from "../model/Priority";
import type { Status } from "../model/Status";

export { TodoListController };

class TodoListController {
	private todos: Todo[];
	private categories: Category[];
	private default_category: string;

	constructor() {
		const ToDoStore = JSON.parse(localStorage.getItem("todo")) || {};
		this.todos = ToDoStore.todos || [];
		this.categories = ToDoStore.categories || [];
		this.default_category = "Kategorie";
	}

	getCategories(): Category[] {
		return this.categories;
	}

	getTodos(): Todo[] {
		return this.todos;
	}

	getTodosCountBy(category_name: string): number {
		let count = 0;
		this.todos.forEach((todo) => {
			todo.categories.forEach((category) => {
				if (category === category_name) {
					count++;
				}
			});
		});
		return count;
	}

	getTodosCountStatus(status_name: Status): number {
		let count = 0;
		this.todos.forEach((todo) => {
			if (todo.status === status_name) {
				count++;
			}
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

	getIdsFromSelectedCategories(): string[] {
		const ids = [];
		this.categories.forEach((category) => {
			if (category.selected === true) {
				ids.push(category.id);
			}
		});
		return ids;
	}

	addCategory(category: Category): void {
		this.categories.push(category);
	}

	addTodo(todo: Todo): void {
		// get all selected categories
		todo.categories = this.getIdsFromSelectedCategories();
		this.todos.push(todo);
	}

	existsCategoryInCategories(category_ids: Category[], find_id): boolean {
		return category_ids.some((category_id) => {
			return category_id === find_id;
		});
	}

	deleteCategory(id: string): void {
		this.categories = this.categories.filter((category) => {
			return category.id !== id;
		});
	}

	toggleCategorySelected(id: string): void {
		const index = this.categories.findIndex((category) => {
			return category.id === id;
		});

		this.categories[index].selected = !this.categories[index].selected;
	}

	toggleItemCategory(category_id, todo_id): void {
		// find a todo
		let todo_index = this.todos.findIndex((todo) => {
			return todo.id === todo_id;
		});
		// don't find todo -> get a break
		if (todo_index === -1) {
			return;
		}
		// find a category-id in todo
		let todo_category_index = this.todos[todo_index].categories.findIndex((todo_category_id) => {
			return todo_category_id === category_id;
		});
		// if don't find category_id in categories from todo
		if (todo_category_index === -1) {
			this.todos[todo_index].categories.push(category_id);
		} else {
			// find index in categories of selected todo
			// have only one category in todo then break
			if (this.todos[todo_index].categories.length === 1) {
				return;
			}
			this.todos[todo_index].categories.splice(todo_category_index, 1);
		}
	}

	toggleTodoStatus(id: string): void {
		const index = this.todos.findIndex((todo) => {
			return todo.id === id;
		});

		const status = this.todos[index].status;

		switch (status) {
			case "open":
				this.todos[index].status = "in_progress";
				this.todos[index].start_time = new Date().getTime();
				break;
			case "in_progress":
				this.todos[index].status = "completed";
				this.todos[index].end_time = new Date().getTime();
				break;
			case "completed":
				this.todos[index].status = "archived";
				break;
		}
	}

	setOpenStatus(id: string): void {
		const index = this.todos.findIndex((todo) => {
			return todo.id === id;
		});
		let time = new Date().getTime();
		this.todos[index].status = "open";
		this.todos[index].duration_time = this.todos[index].duration_time + time -this.todos[index].start_time;
		this.todos[index].start_time = time;
	}

	setTodoPriority(id: string, priority: Priority): void {
		const index = this.todos.findIndex((todo) => {
			return todo.id === id;
		});
		this.todos[index].priority = priority;
	}

	deleteTodo(id: string): void {
		const index = this.todos.findIndex((todo) => {
			return todo.id === id;
		});
		this.todos.splice(index, 1);
	}

	updateCategoryName(id: string, name: string): void {
		const index = this.categories.findIndex((category) => {
			return category.id === id;
		});
		this.categories[index].name = name;
	}

	updateTodoName(id: string, name: string): void {
		const index = this.todos.findIndex((todo) => {
			return todo.id === id;
		});
		this.todos[index].name = name;
	}

	isOneCategoriesSelected(todo_category_ids: string[]): boolean {
		let categories_selected_ids = this.getIdsFromSelectedCategories();

		if (categories_selected_ids.length === 0) {
			return false;
		}

		for (let category_id of categories_selected_ids) {
			if (
				todo_category_ids.some((todo_category_id) => {
					return todo_category_id === category_id;
				}) === true
			) {
				return true;
			}
		}

		return false;
	}

	saveTodo() {
		localStorage.setItem(
			"todo",
			JSON.stringify({
				todos: this.todos,
				categories: this.categories,
			})
		);
	}
}
