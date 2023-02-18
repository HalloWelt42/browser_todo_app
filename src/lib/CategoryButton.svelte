<script lang="ts">
	import { todo_manager } from "./todo_manager";
	import DropDownBadgeCategoryEdit from "./components/DropDownBadgeCategoryEdit.svelte";
	import { EditActions } from "./model/EditActions";
	import { textSanitizer } from "./helper/text_sanitizer";
	import ConditionalDisplay from "./components/ConditionalDisplay.svelte";

	export let item;

	let css_class_danger = "";
	let edit_mode = false;
	let visible = false;

	function init(element) {
		element.focus();
	}

	function toggleCategorySelected(categoryId: string) {
		$todo_manager.toggleCategorySelected(categoryId);
		$todo_manager = $todo_manager;
	}

	function massageHandler(event) {
		switch (event.detail) {
			case EditActions.edit:
				edit_mode = true;
				break;
			case EditActions.delete:
				deleteCategory(item.id);
				break;
		}
	}

	function deleteCategory(categoryId: string) {
		if ($todo_manager.getTodosCountBy(item.id) === 0) {
			$todo_manager.deleteCategory(categoryId);
		} else {
			css_class_danger = "danger";
			setTimeout(() => {
				css_class_danger = "";
			}, 250);
		}
		$todo_manager = $todo_manager;
	}

	function saveCategoryName(id: string, e) {
		let text = textSanitizer(e.target.innerHTML, "Kategorie");
		edit_mode = false;
		visible = true;
		$todo_manager.updateCategoryName(id, text);
		$todo_manager = $todo_manager;
	}

	function clearInput(id, e) {
		let text = e.target.innerHTML;
		if (text === "Kategorie") {
			e.target.innerHTML = "";
		}
	}

	function saveByReturn(id: string, e) {
		if (e.keyCode === 13) {
			saveCategoryName(id, e);
			e.target.blur();
		}
	}
</script>

<div class="badged-button-container {css_class_danger}">
	{#if edit_mode === false}
		<button
			title="Aufgaben über Kategorie filtern"
			class="category-button list button is-link {css_class_danger}"
			on:click={() => {
				toggleCategorySelected(item.id);
			}}
			class:is-light={!item.selected && css_class_danger !== "css_class_danger"}>
			{item.name}
		</button>
		<div class="edit-badge">
			<DropDownBadgeCategoryEdit on:message={massageHandler} />
		</div>
		{#if $todo_manager.getTodosCountBy(item.id) > 0}
			<div class="badge">{$todo_manager.getTodosCountBy(item.id)}</div>
		{/if}
	{/if}
	{#if edit_mode === true}
		<button
			title="Aufgaben über Kategorie filtern"
			class="name-field category-button list button is-link"
			contenteditable="true"
			on:keypress={(event) => saveByReturn(item.id, event)}
			on:focusout={(event) => saveCategoryName(item.id, event)}
			on:click={(event) => clearInput(item.id, event)}
			on:focus={(event) => clearInput(item.id, event)}
			bind:innerHTML={item.name}
			on:click|stopPropagation
			use:init
			class:is-light={!item.selected && css_class_danger !== "css_class_danger"}>
			{item.name}
		</button>
	{/if}
	<ConditionalDisplay bind:visible/>
</div>

<style lang="scss">
	.category-button {
		display: flex;
		align-items: center;
	}

	.category-button:hover ~ .badge,
	.edit-badge:hover ~ .badge {
		display: none;
	}

	.edit-badge {
		display: none;
	}

	.category-button:hover ~ .edit-badge,
	.edit-badge:hover {
		display: flex;
	}

	.danger {
		background: hsl(348, 86%, 43%);
		color: #fff;
	}

	.badged-button-container .name-field {
		min-width: 110px;
		color: hsl(217deg, 71%, 53%);
		background-color: #fff;
		border-color: black;
		border-width: 2px;
	}
</style>
