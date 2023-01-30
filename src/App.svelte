<script lang="ts">
	import CategoriesToolbox from "./lib/CategoriesToolbox.svelte";
	import Categories from "./lib/Categories.svelte";
	import Statusbar from "./lib/Statusbar.svelte";

	import { todo_manager } from "./lib/todo_manager";

	import AddTodo from "./lib/AddTodo.svelte";
	import ModalDialog from "./lib/ModalDialog.svelte";
	import { TodoListController } from "./lib/controller/TodoListController";
	import TodoList from "./lib/TodoList.svelte";

	$todo_manager = new TodoListController();
	let visibility = false;

	// Trigger
	$: {
		$todo_manager.saveTodo();
	}
</script>

<ModalDialog bind:visibility />

<div class="app-container">
	<header>
		<div class="header-container">
			<CategoriesToolbox />
			<Categories />
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
		<Statusbar />
	</footer>
</div>

<style>
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
		box-shadow: 0 5px 20px #ddd;
		top: 0;
		z-index: 1;
		padding: 5px 0;
	}

	.add-todo {
		margin-top: 50px;
	}

	.todo-list-wrapper {
		display: flex;
		flex-direction: row;
		justify-content: center;
		margin-top: 80px;
		margin-bottom: 54px;
	}

	.header-container {
		display: flex;
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
		box-shadow: 0 -5px 20px #ddd;
		position: fixed;
		bottom: 0;
		height: 48px;
	}
</style>
