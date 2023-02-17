<script lang="ts">
	import type { Todo } from "../../model/Todo";
	import ButtonStartTimer from "../buttons/ButtonStartTimer.svelte";
	import { todo_manager } from "../../todo_manager";
	import { TimeFormat } from "../../helper/time_format";

	export let item: Todo;
	let state = true;
	let time = 0;
	let tick_time = duration(item.duration_time);

	function handleClickToPause(item: Todo): void {
		$todo_manager.setOpenStatus(item.id);
		tick_intervall = null;
		$todo_manager = $todo_manager;
	}

	let tick_intervall = setInterval(() => {
		if (item.status === "in_progress") {
			time = item.duration_time + new Date().getTime() - item.start_time;
			tick_time = duration(time);
		}
	}, 1000);

	function duration(time) {
		const current_time = new TimeFormat(time);
		return current_time.getTimeHoursMinutesSecounds();
	}
</script>

<div class="timer">
	{#if item.status !== "open" || item.duration_time}
		<div><span class="time">{tick_time}</span></div>
	{/if}
	{#if item.status === "in_progress"}
		<ButtonStartTimer on:click={handleClickToPause(item)} bind:state />
	{/if}
</div>

<style lang="scss">
	.timer {
		display: flex;
	}

	.time {
		margin-right: 0.5rem;
		white-space: nowrap;
	}
</style>
