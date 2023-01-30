<script lang="ts">
	import { text_sanitizer } from "./helper/text_sanitizer";
	import { todo_manager } from "./todo_manager";

	export let item;

	function toggleCategorySelected(categoryId: string) {
		$todo_manager.toggleCategorySelected(categoryId);
		$todo_manager = $todo_manager;
	}

	function deleteCategory(categoryId: string) {
		$todo_manager.deleteCategory(categoryId);
		$todo_manager = $todo_manager;
	}

	function saveCategoryName(id: string, e) {
		let text = text_sanitizer(e.target.innerHTML, "Kategorie");
		$todo_manager.updateCategoryName(id, text);
		$todo_manager = $todo_manager;
	}

	function clearInput(id, e) {
		let text = e.target.innerHTML;
		if (text === "Kategorie") {
			e.target.innerHTML = "";
		}
	}

	function saveByReturn(id: string, e) {
		if (e.keyCode === 13) {
			saveCategoryName(id, e);
			e.target.blur();
		}
	}
</script>

<button
	class="list button is-link"
	on:click={() => toggleCategorySelected(item.id)}
	class:is-light={!item.selected}>
	<span
		class="name-field"
		contenteditable="true"
		on:keypress={(event) => saveByReturn(item.id, event)}
		on:focusout={(event) => saveCategoryName(item.id, event)}
		on:click={(event) => clearInput(item.id, event)}
		on:focus={(event) => clearInput(item.id, event)}
		bind:innerHTML={item.name}
		on:click|stopPropagation></span>
	<span class="delete" on:click={() => deleteCategory(item.id)} on:click|stopPropagation />
	<span class="badge">{$todo_manager.getTodosCountBy(item.id)}</span>
</button>

<style>
	.delete {
		margin-left: 10px;
	}

	.name-field {
		min-width: 40px;
		cursor: text;
		outline: none;
	}

	.badge {
		font-weight: bold;
		font-size: 0.8rem;
	}
</style>
