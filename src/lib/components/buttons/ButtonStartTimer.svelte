<script lang="ts">
	export let state;

	function handleClick() {
		state = !state;
	}
</script>

<i
	on:click
	on:click={handleClick}
	on:keypress={handleClick}
	class="timer timer-icon fa-solid fa-circle-pause is-size-5"
	title="Aufgabe pausieren" />

<style lang="scss">
	.timer {
		display: flex;
		align-items: center;
	}
</style>
