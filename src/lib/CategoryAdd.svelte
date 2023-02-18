<script lang="ts">
	import { todo_manager } from "./todo_manager";

	function addListItem() {
		$todo_manager.addCategory({
			id: crypto.randomUUID(),
			name: "Kategorie",
			create_time: new Date().getTime(),
			selected: false,
		});
		$todo_manager = $todo_manager;
	}
</script>

<div class="tool-container">
	<button class="tool button is-white" on:click={addListItem} on:keypress={addListItem}>
		<i class="fas fa-plus icon is-size-4" /><span>neue Kategorie</span>
	</button>
</div>

<style>
	.tool-container {
		display: flex;
		align-items: center;
		margin: 5px;
	}
</style>
