<script lang="ts">
	import { todo_manager } from "./todo_manager.js";
	import CategoryButton from "./CategoryButton.svelte";
</script>

<div class="categories">
	{#each $todo_manager.getCategories() as item}
		<CategoryButton {item} />
	{/each}
</div>

<style>
	.categories {
		display: flex;
		gap: 15px;
		align-items: center;
	}
</style>
