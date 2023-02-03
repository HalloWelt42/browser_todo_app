<script lang="ts">
	import { modus } from "./todo_manager";

	function handleClick() {
		$modus.categories_edit_active = !$modus.categories_edit_active;
	}
</script>

<div class="edit" on:click={handleClick} on:keypress={handleClick} title="Kategorien bearbeiten">
	{#if $modus.categories_edit_active === true}
		<i class="icon active fa-regular fa-pen-to-square is-size-3" />
	{/if}
	{#if $modus.categories_edit_active === false}
		<i class="icon fa-regular fa-pen-to-square is-size-3" />
	{/if}
</div>

<style lang="scss">
	@import "src/vars.scss";

	.edit > .active {
		color: $icon-active;
	}

	.edit {
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
