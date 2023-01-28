<script lang="ts">
	import { todo_manager } from "./todo_manager";
	import { text_sanitizer } from "./helper/text_sanitizer";
	import DropDownPrio from "./components/DropDownPrio/DropDownPrio.svelte";

	function switch_status(id) {
		$todo_manager.toggleTodoStatus(id);
		$todo_manager = $todo_manager;
	}

	function saveTodoName(id: string, e) {
		let text = text_sanitizer(e.target.innerHTML, "Aufgabe");
		$todo_manager.updateTodoName(id, text);
		$todo_manager = $todo_manager;
	}

	function deleteTodo(id: string) {
		$todo_manager.deleteTodo(id);
		$todo_manager = $todo_manager;
	}

	function clearInput(id, e) {
		let text = e.target.innerHTML;
		if (text === "Aufgabe") {
			e.target.innerHTML = "";
		}
	}

	function saveByReturn(id: string, e) {
		if (e.keyCode === 13) {
			saveTodoName(id, e);
			e.target.blur();
		}
	}
</script>

<div class="todo-list">
	{#if $todo_manager.getTodos().length > 0}
		<table class="table">
			<thead>
				<th />
				<th class="has-text-grey-light">Aufgaben</th>
				<th />
				<th />
				<th />
			</thead>
			{#each $todo_manager.getTodos() as item}
				{#if item.status !== "archived"}
					<tr>
						<!-- status -->
						<td on:click={() => switch_status(item.id)}>
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
							<div
								class="todo-name"
								contenteditable="true"
								on:keypress={(event) => saveByReturn(item.id, event)}
								on:focusout={(event) => saveTodoName(item.id, event)}
								on:click={(event) => clearInput(item.id, event)}
								on:focus={(event) => clearInput(item.id, event)}
								class:warning={item.name === "Der Name der Aufgabe darf nicht leer sein!"}
								bind:innerHTML={item.name} />
						</td>
						<!-- categories edit -->
						<td />
						<!-- priorities switcher -->
						<td>
							<DropDownPrio {item} />
						</td>
						<!-- delete -->
						<td on:click={() => deleteTodo(item.id)} on:click|stopPropagation>
							<i class="delete-task fa-solid fa-circle-xmark" />
						</td>
					</tr>
				{/if}
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

				.todo-name {
					font-weight: lighter;
					font-size: 1.5rem;
					outline: none;
				}
			}

			.icon {
				color: hsla(0, 0%, 90%, 1);
				cursor: pointer;
			}

			.warning {
				color: orangered;
			}

			.delete-task {
				color: rgba(10, 10, 10, 0.2);
				font-size: 1.5rem;

				&:hover {
					cursor: pointer;
					color: rgba(10, 10, 10, 0.3);
				}

				&:active {
					color: rgba(10, 10, 10, 0.4);
				}
			}
		}
	}
</style>
