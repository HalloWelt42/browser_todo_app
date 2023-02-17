<script lang="ts">
	import { fly } from "svelte/transition";
	import { flip } from "svelte/animate";
	import { modus, todo_manager } from "./todo_manager";
	import DropDownPrio from "./components/DropDownPrio/DropDownPrio.svelte";
	import DeleteButton from "./components/buttons/DeleteButton.svelte";
	import Todo from "./Todo.svelte";
	import ButtonFilterArchiv from "./components/buttons/ButtonFilterArchiv.svelte";
	import ButtonFilterComplete from "./components/buttons/ButtonFilterComplete.svelte";
	import ButtonFilterInProgress from "./components/buttons/ButtonFilterInProgress.svelte";
	import ButtonFilterOpen from "./components/buttons/ButtonFilterOpen.svelte";
	import DropDownCategoriesSelect from "./components/DropDownCategoriesSelect/DropDownCategoriesSelect.svelte";
	import StatStopTimer from "./components/timer/StatStopTimer.svelte";

	function switch_status(id) {
		$todo_manager.toggleTodoStatus(id);
		$todo_manager = $todo_manager;
	}

	function deleteTodo(id: string) {
		$todo_manager.deleteTodo(id);
		$todo_manager = $todo_manager;
	}

	function filter(item): boolean {
		return (
			$todo_manager.isOneCategoriesSelected(item.categories) &&
			((item.status === "open" && $modus.todos_show_open === true) ||
				(item.status === "completed" && $modus.todos_show_completed === true) ||
				(item.status === "in_progress" && $modus.todos_show_in_progress === true) ||
				(item.status === "archived" && $modus.todos_show_archived === true))
		);
	}
</script>

<div class="todo-list">
	{#if $todo_manager.getTodos().length > 0}
		<div class="filter is-size-4">
			<i class="fa-solid fa-filter is-size-5" />
			<ButtonFilterOpen />
			<ButtonFilterInProgress />
			<ButtonFilterComplete />
			<ButtonFilterArchiv />
		</div>
		<table class="table">
			<thead>
				<tr>
					<th />
					<th class="has-text-grey-light"
						>insgesamt {$todo_manager.getTodos().length} Aufgaben vorhanden
					</th>
					<th />
					<th />
					<th />
					<th />
				</tr>
			</thead>
			{#each $todo_manager.getTodos() as item, index (item.id)}
				<tr
					animate:flip={{ duration: 300 }}
					in:fly|local={{ x: -80, duration: 300 }}
					out:fly|local={{ x: +80, duration: 300 }}>
					{#if filter(item)}
						<!-- status -->
						<td on:click={() => switch_status(item.id)} on:keypress={() => switch_status(item.id)}>
							{#if item.status === "open"}
								<i class="open is-size-4 icon fa-regular fa-circle-check" />
							{/if}
							{#if item.status === "in_progress"}
								<i class="in_progress is-size-4 has-text-info icon fa-solid fa-hourglass" />
							{/if}
							{#if item.status === "completed"}
								<i class="completed is-size-4 has-text-success icon fa-solid fa-circle-check" />
							{/if}
							{#if item.status === "archived"}
								<i class="archived is-size-4 has-text-grey icon fa-solid fa-box-archive" />
							{/if}
						</td>
						<!-- toto name -->
						<td class="todo">
							<Todo {item} />
						</td>
						<td>
							<StatStopTimer {item} />
						</td>
						<!-- categories edit -->
						<td>
							<DropDownCategoriesSelect {item} />
						</td>
						<!-- priorities switcher -->
						<td>
							<DropDownPrio {item} />
						</td>
						<!-- delete -->
						<td
							on:click={() => deleteTodo(item.id)}
							on:click|stopPropagation
							on:keypress={() => deleteTodo(item.id)}
							on:click|stopPropagation>
							<DeleteButton />
						</td>
					{/if}
				</tr>
			{/each}
		</table>
	{/if}
</div>

<style lang="scss">
	.todo-list {
		width: 860px;
		margin-left: 50px;
		margin-right: 50px;
		overflow-y: scroll;
		height: calc(100vh - 387px);

		.table {
			width: 100%;

			tr,
			td {
				vertical-align: middle;
			}

			.todo {
				width: 100%;
			}

			.icon {
				color: hsla(0, 0%, 90%, 1);
				cursor: pointer;
			}
		}
	}

	.filter {
		display: flex;
		justify-content: flex-end;
		gap: 30px;
		margin-top: 5px;
	}
</style>
