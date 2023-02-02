<script>
	import { modus, todo_manager } from "../../todo_manager.ts";

	function handleClick() {
		$modus.todos_show_in_progress = !$modus.todos_show_in_progress;
		$todo_manager = $todo_manager;
	}
</script>

<div class="in-progress badge-container" on:click={handleClick} title="laufende Aufgaben filtern">
	{#if $modus.todos_show_in_progress === true}
		<i class="icon active fa-solid fa-hourglass-half">
			{#if $todo_manager.getTodosCountStatus("in_progress") > 0}
				<div class="my-badge">{$todo_manager.getTodosCountStatus("in_progress")}</div>
			{/if}
		</i>
	{/if}
	{#if $modus.todos_show_in_progress === false}
		<i class="icon fa-solid fa-hourglass-half">
			{#if $todo_manager.getTodosCountStatus("in_progress") > 0}
				<div class="my-badge">{$todo_manager.getTodosCountStatus("in_progress")}</div>
			{/if}
		</i>
	{/if}
</div>

<style lang="scss">
	@import "src/vars.scss";

	.in-progress > .active {
		color: $icon-active;
	}

	.in-progress {
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
