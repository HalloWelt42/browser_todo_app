<script lang="ts">
	import CategoryAdd from "./lib/CategoryAdd.svelte";
	import Categories from "./lib/Categories.svelte";
	import Statusbar from "./lib/Statusbar.svelte";

	import { modus, todo_manager, info } from "./lib/todo_manager";

	import AddTodo from "./lib/AddTodo.svelte";
	import ModalDialog from "./lib/ModalDialog.svelte";
	import { TodoListController } from "./lib/controller/TodoListController";
	import TodoList from "./lib/TodoList.svelte";
	import CategoriesEdit from "./lib/CategoriesEdit.svelte";

	let mem;

	$todo_manager = new TodoListController();
	$modus = {
		categories_edit_active: false,
		todos_show_open: true,
		todos_show_in_progress: true,
		todos_show_completed: false,
		todos_show_archived: false,
	};
	$info = {
		count_show_todos: 0,
	};

	let visibility = false;
	// Trigger
	$: {
		$todo_manager.saveTodo();
		mem = localStorage.getItem("todo").length;
	}
</script>

<ModalDialog bind:visibility />

<div class="app-container">
	<header>
		<div class="header-container">
			<CategoryAdd />
			<div class="categories-container">
				<Categories />
			</div>
			<CategoriesEdit />
		</div>
	</header>
	<main>
		<div class="add-todo">
			<AddTodo />
		</div>
		<section class="todo-list-wrapper">
			<TodoList />
		</section>
	</main>
	<footer>
		<Statusbar bind:mem />
	</footer>
</div>

<style lang="scss">
	@import "vars";

	header,
	main,
	footer,
	.app-container {
		display: flex;
		flex-direction: column;
	}

	header {
		position: fixed;
		width: 100%;
		box-shadow: 0 0 10px #ddd;
		top: 0;
		z-index: 1;
		padding: 10px 0;
	}

	.add-todo {
		margin-top: 50px;
	}

	.todo-list-wrapper {
		display: flex;
		justify-content: center;
		margin-top: 80px;
		margin-bottom: 54px;
	}

	.header-container,
	.categories-container {
		display: flex;
	}

	.categories-container {
		padding: 8px 0;
	}

	.categories-container {
		width: 100%;
		margin-left: 15px;
		padding-left: 5px;
		padding-right: 5px;
		margin-right: 15px;
		overflow-x: auto;
		scrollbar-width: none;
		-ms-overflow-style: none;
		scroll-behavior: smooth;
	}

	.categories-container::-webkit-scrollbar {
		display: none;
	}

	.app-container {
		min-height: 100%;
	}

	main {
		margin-top: 70px;
		margin-bottom: 48px;
	}

	footer {
		width: 100%;
		box-shadow: 0 0 10px #ddd;
		position: fixed;
		bottom: 0;
		height: 48px;
	}

	:global(.task-icon) {
		color: $icon-normal;
		cursor: pointer;

		&:hover {
			color: $icon-hover;
		}

		&:active {
			color: $icon-clicked;
		}

		& > .active {
			color: $icon-active;
		}

		& > .icon {
			position: relative;
		}
	}

	:global(.my-badge) {
		position: absolute;
		font-weight: bold;
		font-size: 0.8rem;
		height: 21px;
		z-index: 1;
		right: -10px;
		top: -10px;
		padding: 2px 5px;
		border: 2px solid #fff;
		color: #fff;
		background: #00d1b2;
		border-radius: 15px;
		line-height: 1;
	}

	:global(button .my-badge) {
		left: 28px;
		top: -15px;
	}

	:global(.badged-button) {
		position: relative;
	}
</style>
