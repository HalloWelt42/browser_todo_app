<script lang="ts">
	import { todo_manager } from "./todo_manager.js";
	import CategoryButton from "./CategoryButton.svelte";
</script>

<div class="lists">
	{#each $todo_manager.getCategories() as item}
		<CategoryButton {item} />
	{/each}
</div>

<style>
	.lists {
		display: flex;
		gap: 15px;
		align-items: center;
	}
</style>
