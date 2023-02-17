<script lang="ts">
	import { modus } from "../../todo_manager.ts";

	function handleClick() {
		$modus.categories_edit_active = !$modus.categories_edit_active;
	}
</script>

<div
	class="task-icon edit"
	on:click={handleClick}
	on:keypress={handleClick}
	title="Kategorien bearbeiten">
	{#if $modus.categories_edit_active === true}
		<i class="icon active fa-regular fa-pen-to-square is-size-3" />
	{/if}
	{#if $modus.categories_edit_active === false}
		<i class="icon fa-regular fa-pen-to-square is-size-3" />
	{/if}
</div>

<style lang="scss">
	.edit{
		margin-right: 20px;
	}
</style>