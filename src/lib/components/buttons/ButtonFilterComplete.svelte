<script>
	import { modus, todo_manager } from "../../todo_manager.ts";

	function handleClick() {
		$modus.todos_show_completed = !$modus.todos_show_completed;
		$todo_manager = $todo_manager;
	}
</script>

<div
	class="task-icon check"
	on:click={handleClick}
	on:keypress={handleClick}
	title="erledigte Aufgaben filtern">
	{#if $modus.todos_show_completed === true}
		<i class="icon active fa-solid fa-circle-check">
			{#if $todo_manager.getTodosCountStatus("completed") > 0}
				<div class="my-badge">{$todo_manager.getTodosCountStatus("completed")}</div>
			{/if}
		</i>
	{/if}
	{#if $modus.todos_show_completed === false}
		<i class="icon fa-solid fa-circle-check">
			{#if $todo_manager.getTodosCountStatus("completed") > 0}
				<div class="my-badge">{$todo_manager.getTodosCountStatus("completed")}</div>
			{/if}
		</i>
	{/if}
</div>

<style lang="scss">
</style>
