<script lang="ts">
	import type { Todo } from "../../model/Todo";
	import ButtonPauseTimer from "../buttons/ButtonPauseTimer.svelte";
	import { todo_manager } from "../../todo_manager";
	import { TimeFormat } from "../../helper/time_format";
	import ButtonStartTimer from "../buttons/ButtonStartTimer.svelte";

	export let item: Todo;
	let state = true;
	let time = 0;
	let tick_time = duration(item.duration_time);

	function handleClickToPause(item: Todo): null {
		$todo_manager.setOpenStatus(item.id);
		tick_intervall = null;
		$todo_manager = $todo_manager;
		return null;
	}

	function handleClickToStart(item: Todo): null {
		$todo_manager.setInProgress(item.id);
		$todo_manager = $todo_manager;
		return null;
	}

	let tick_intervall = setInterval(() => {
		if (item.status === "in_progress") {
			time = item.duration_time + (new Date().getTime() - item.start_time);
			tick_time = duration(time);
		}
	}, 200);

	function duration(time) {
		const current_time = new TimeFormat(time);
		return current_time.getTimeHoursMinutesSecounds();
	}
</script>

<div class="timer">
	<div>
		<span class="time">
			{tick_time}
		</span>
	</div>
	{#if item.status === "open"}
		<ButtonStartTimer on:click={handleClickToStart(item)} bind:state />
	{/if}
	{#if item.status === "in_progress"}
		<ButtonPauseTimer on:click={handleClickToPause(item)} bind:state />
	{/if}
</div>

<style lang="scss">
	.timer {
		display: flex;
	}

	.time {
		margin-right: 15px;
		margin-left: 15px;
		white-space: nowrap;
	}
</style>
