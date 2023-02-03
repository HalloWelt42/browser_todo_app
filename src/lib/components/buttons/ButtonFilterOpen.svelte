<script>
	import { modus, todo_manager } from "../../todo_manager.ts";

	function handleClick() {
		$modus.todos_show_open = !$modus.todos_show_open;
		$todo_manager = $todo_manager;
	}
</script>

<div
	class="open badge-container"
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
	@import "src/vars.scss";

	.open > .active {
		color: $icon-active;
	}

	.open {
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
