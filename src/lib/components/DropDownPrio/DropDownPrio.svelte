<script lang="ts">
	import { todo_manager } from "../../todo_manager";
	import { Priority } from "../../model/Priority";

	export let item;
	// let priority_keys = Object.keys(Priority).filter(k => typeof Priority[k as any] === "number");
	let active = false;

	function toggle() {
		active = !active;
	}

	function changePrio(id: string, priority: Priority): void {
		$todo_manager.setTodoPriority(id, priority);
		$todo_manager = $todo_manager;
	}
</script>

<div class="dropdown" class:is-active={active}>
	<!-- trigger -->
	<div class="dropdown-trigger">
		<button
			class="button {item.priority} is-small is-rounded"
			aria-haspopup="true"
			aria-controls="dropdown-menu"
			on:click={toggle}>
			<span>Priorität</span>
			<span class="icon is-small">
				<i class="fas fa-angle-down" aria-hidden="true" />
			</span>
		</button>
	</div>
	<!-- menu -->
	<div class="dropdown-menu" role="menu">
		<div class="dropdown-content" on:click={toggle}>
			{#each Object.entries(Priority) as [priority, priority]}
				<a
					class="dropdown-item"
					on:click={() => changePrio(item.id, priority)}
					class:is-active={item.priority === priority}>{priority}</a>
			{/each}
		</div>
	</div>
</div>

<style>
	.prio {
		padding: 2px;
		border-radius: 15px;
	}

	.low {
		background: inherit;
		border-color: transparent;
	}

	.medium {
		background: hsl(48, 100%, 90%);
		color: hsl(48, 100%, 25%);
		border-color: hsl(48, 100%, 25%);
	}

	.high {
		background: hsl(347, 90%, 96%);
		color: hsl(348, 86%, 43%);
		border-color: hsl(348, 86%, 43%);
	}
</style>
