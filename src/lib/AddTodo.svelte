<script lang="ts">
	import { todo_manager } from "./todo_manager";
	import { Priority } from "./model/Priority";

	function addTodo() {
		let time = new Date().getTime();
		$todo_manager.addTodo({
			id: crypto.randomUUID(),
			name: "Aufgabe",
			create_time: time,
			start_time: time,
			duration_time: 0,
			end_time: time,
			status: "open",
			priority: Priority.low,
			categories: [],
		});
		$todo_manager = $todo_manager;
	}
</script>

<div class="tool-container">
	<div class="button-container">
		{#if $todo_manager.getCategoriesCount() === 0}
			<button class="tool button is-white has-text-grey-light">
				<i class="fas fa-plus icon is-size-4" />
				<span>neue Aufgabe</span>
			</button>
		{/if}
		{#if $todo_manager.getCategoriesCount() > 0}
			<button class="tool button is-white" on:click={addTodo}>
				<i class="fas fa-plus icon is-size-4" />
				<span>neue Aufgabe</span>
			</button>
		{/if}
	</div>
	<div class="tool is-white has-text-grey">
		{#if $todo_manager.getCategoriesCount() === 0}
			{#if $todo_manager.categories.length === 0}
				<span class="has-text-grey-dark"
					>Legen Sie als erstes eine Kategorie an und wählen sie diese anschließend aus!</span>
			{/if}
			{#if $todo_manager.categories.length > 0}
				<span class="has-text-grey-dark">Es muss mindestens eine Kategorie ausgewählt werden!</span>
			{/if}
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
	.tool,
	.button-container {
		display: flex;
		align-items: center;
		justify-content: center;
		/*border: 1px solid red;*/
	}
</style>
