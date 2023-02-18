<script lang="ts">
	import { clickOutside } from "../../helper/click_outside";
	import { todo_manager } from "../../todo_manager.js";
	import DropDownItem from "./DropDownItem.svelte";

	export let item;

	let active = false;

	function toggle() {
		active = !active;
	}

	function handleClickOutside() {
		active = false;
	}
</script>

<div class="dropdown" class:is-active={active}>
	<!-- trigger -->
	<div class="dropdown-trigger">
		<button
			class="button is-small is-rounded has-text-grey"
			aria-haspopup="true"
			aria-controls="dropdown-menu"
			on:click={toggle}>
			<span>Kategorie</span>
			<span class="icon is-small">
				<i class="fas fa-angle-down" aria-hidden="true" />
			</span>
		</button>
	</div>
	<!-- menu -->
	<div class="dropdown-menu" role="menu" use:clickOutside on:click_outside={handleClickOutside}>
		<div class="dropdown-content">
			{#each $todo_manager.getCategories() as category}
				<DropDownItem {category} {item} />
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	.dropdown-menu {
		width: 350px;
		left: -250px;
	}

	.button {
		background: inherit;
		border: none;
	}
</style>
