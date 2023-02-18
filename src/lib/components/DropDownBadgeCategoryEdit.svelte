<script>
	import DeleteButton from "./buttons/DeleteButton.svelte";
	import EditButton from "./buttons/EditButton.svelte";
	import { createEventDispatcher } from "svelte";
	import { EditActions } from "../model/EditActions.ts";

	let dispatch = new createEventDispatcher();

	function handleEditButton() {
		dispatch("message", EditActions.edit);
	}

	function handleDeleteButton() {
		dispatch("message", EditActions.delete);
	}
</script>

<div class="button-container">
	<EditButton on:click={handleEditButton} title="Bezeichnung ändern" />
</div>
<div class="button-container">
	<DeleteButton on:click={handleDeleteButton} title="Kategorie löschen" />
</div>

<style lang="scss">
	.button-container {
		padding-left: 5px;
		padding-right: 5px;
	}
</style>
