<script>
	import { modus, todo_manager } from "../../todo_manager.ts";

	function handleClick() {
		$modus.todos_show_open = !$modus.todos_show_open;
		$todo_manager = $todo_manager;
	}
</script>

<div
	class="task-icon open"
	on:click={handleClick}
	on:keypress={handleClick}
	title="offene Aufgaben filtern">
	{#if $modus.todos_show_open === true}
		<i class="icon active fa-regular fa-circle-check">
			{#if $todo_manager.getTodosCountStatus("open") > 0}
				<div class="my-badge">{$todo_manager.getTodosCountStatus("open")}</div>
			{/if}
		</i>
	{/if}
	{#if $modus.todos_show_open === false}
		<i class="icon fa-regular fa-circle-check">
			{#if $todo_manager.getTodosCountStatus("open") > 0}
				<div class="my-badge">{$todo_manager.getTodosCountStatus("open")}</div>
			{/if}
		</i>
	{/if}
</div>

<style lang="scss">
</style>
