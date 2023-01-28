<script lang="ts">
	import { todo_manager } from "./todo_manager";
	import { Priority } from "./model/Priority";

	function addTodo() {
		$todo_manager.addTodo({
			id: crypto.randomUUID(),
			name: "Aufgabe",
			status: "open",
			priority: Priority.low,
			categories: [],
		});
		$todo_manager = $todo_manager;
	}
</script>

<div class="tool-container">
	<div class="tool button is-white" on:click={addTodo}>
		<i class="fas fa-plus icon" />&nbsp;&nbsp;neue Aufgabe
	</div>
	<div class="tool button is-white has-text-grey">
		{#if $todo_manager.getCategoriesCount() === 0}
			ohne ausgewählte Kategorien
		{/if}
		{#if $todo_manager.getCategoriesCount() === 1}
			für eine ausgewählte Kategorie
		{/if}
		{#if $todo_manager.getCategoriesCount() > 1}
			für {$todo_manager.getCategoriesCount()} ausgewählte Kategorien
		{/if}
	</div>
</div>

<style lang="css">
	.tool {
		display: flex;
	}
</style>
