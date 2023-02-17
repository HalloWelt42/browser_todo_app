<script>
	import { modus, todo_manager } from "../../todo_manager.ts";

	function handleClick() {
		$modus.todos_show_completed = !$modus.todos_show_completed;
		$todo_manager = $todo_manager;
	}
</script>

<div
	class="check"
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
	@import "src/vars.scss";

	.check > .active {
		color: $icon-active;
	}

	.check {
		display: flex;
		gap: 15px;
		align-items: center;
		color: $icon-normal;
		cursor: pointer;

		&:hover {
			color: $icon-hover;
		}

		&:active {
			color: $icon-clicked;
		}

		.icon {
			margin: 10px 20px 10px 20px;
			padding: 10px;
		}
	}
</style>
