<script lang="ts">
	import { todo_manager } from "./todo_manager";
	import { textSanitizer } from "./helper/text_sanitizer";

	export let item;

	function saveByReturn(id: string, e): void {
		if (e.keyCode === 13) {
			saveTodoName(id, e);
			e.target.blur();
		}
	}

	function saveTodoName(id: string, e): void {
		let text = textSanitizer(e.target.innerHTML, "Aufgabe");
		$todo_manager.updateTodoName(id, text);
		$todo_manager = $todo_manager;
	}

	function clearInput(id, e): void {
		let text = e.target.innerHTML;
		if (text === "Aufgabe") {
			e.target.innerHTML = "";
		}
	}
</script>

<div
	class="todo-name is-size-3"
	contenteditable="true"
	on:keypress={(event) => saveByReturn(item.id, event)}
	on:focusout={(event) => saveTodoName(item.id, event)}
	on:click={(event) => clearInput(item.id, event)}
	on:focus={(event) => clearInput(item.id, event)}
	class:warning={item.name === "Der Name der Aufgabe darf nicht leer sein!"}
	bind:innerHTML={item.name} />

<style lang="scss">
	.todo-name {
		font-weight: lighter;
		outline: none;
	}
</style>
