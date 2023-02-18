<script lang="ts">
	import CategoryAdd from "./lib/CategoryAdd.svelte";
	import Categories from "./lib/Categories.svelte";
	import Statusbar from "./lib/Statusbar.svelte";

	import { modus, todo_manager, info } from "./lib/todo_manager";

	import AddTodo from "./lib/AddTodo.svelte";
	import ModalDialog from "./lib/ModalDialog.svelte";
	import { TodoListController } from "./lib/controller/TodoListController";
	import TodoList from "./lib/TodoList.svelte";

	let mem;
	let save_data_animation;

	$todo_manager = new TodoListController();
	$modus = {
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
		let old_mem = localStorage.getItem("todo").length;
		if (old_mem !== mem) {
			save_data_animation = true;
		}
		mem = old_mem;
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
		<Statusbar bind:mem bind:save_data_animation />
	</footer>
</div>

<style lang="scss">
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
		margin-top: 40px;
		margin-bottom: 54px;
	}

	.header-container {
		display: flex;
		align-items: center;
	}

	.categories-container {
		display: flex;
		height: 70px;
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
</style>
