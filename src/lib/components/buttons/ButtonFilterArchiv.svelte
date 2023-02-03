<script>
	import { modus, todo_manager } from "../../todo_manager.ts";

	function handleClick() {
		$modus.todos_show_archived = !$modus.todos_show_archived;
		$todo_manager = $todo_manager;
	}
</script>

<div
	class="archived badge-container"
	on:click={handleClick}
	on:keypress={handleClick}
	title="archivierte Aufgaben filtern">
	{#if $modus.todos_show_archived === true}
		<i class="icon active fa-solid fa-box-archive">
			{#if $todo_manager.getTodosCountStatus("archived") > 0}
				<div class="my-badge">{$todo_manager.getTodosCountStatus("archived")}</div>
			{/if}
		</i>
	{/if}
	{#if $modus.todos_show_archived === false}
		<i class="icon fa-solid fa-box-archive">
			{#if $todo_manager.getTodosCountStatus("archived") > 0}
				<span class="my-badge">{$todo_manager.getTodosCountStatus("archived")}</span>
			{/if}
		</i>
	{/if}
</div>

<style lang="scss">
	@import "src/vars.scss";

	.archived > .active {
		color: $icon-active;
	}

	.archived {
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
