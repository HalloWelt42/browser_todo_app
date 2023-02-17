<script lang="ts">
	export let state;

	function handleClick() {
		state = !state;
	}
</script>

{#if state === true}
	<i on:click on:click={handleClick} on:keypress={handleClick} class="icon fa-solid fa-circle-pause is-size-5" title="Aufgabe pausieren"/>
{/if}

<style lang="scss">
	@import "src/vars.scss";

	.archived > .active {
		color: $icon-active;
	}

	.timer {
		display: flex;
		align-items: center;
	}

	.count {
		margin-left: 1rem;
	}

	.icon {
		display: flex;
		gap: 15px;
		color: $icon-normal;
		cursor: pointer;

		&:hover {
			color: $icon-hover;
		}

		&:active {
			color: $icon-clicked;
		}


	}
</style>
