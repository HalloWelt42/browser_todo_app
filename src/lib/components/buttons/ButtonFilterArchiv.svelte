<script>
	import { modus, todo_manager } from "../../todo_manager.ts";

	function handleClick() {
		$modus.todos_show_archived = !$modus.todos_show_archived;
		$todo_manager = $todo_manager;
	}
</script>

<div
	class="task-icon archived"
	on:click={handleClick}
	on:keypress={handleClick}
	title="archivierte Aufgaben filtern">
	{#if $modus.todos_show_archived === true}
		<i class="icon active fa-solid fa-box-archive">
			{#if $todo_manager.getTodosCountStatus("archived") > 0}
				<div class="badge">{$todo_manager.getTodosCountStatus("archived")}</div>
			{/if}
		</i>
	{/if}
	{#if $modus.todos_show_archived === false}
		<i class="icon fa-solid fa-box-archive">
			{#if $todo_manager.getTodosCountStatus("archived") > 0}
				<span class="badge">{$todo_manager.getTodosCountStatus("archived")}</span>
			{/if}
		</i>
	{/if}
</div>

<style lang="scss">
</style>
