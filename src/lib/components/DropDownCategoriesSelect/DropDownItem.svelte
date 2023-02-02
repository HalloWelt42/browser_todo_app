<script lang="ts">
	import { todo_manager } from "../../todo_manager.js";

	export let item;
	export let category;

	function toggleCategory(category_id, item_id) {
		$todo_manager.toggleItemCategory(category_id, item_id);
		$todo_manager = $todo_manager;
	}
</script>

<a
	class="dropdown-item"
	class:is-active={$todo_manager.existsCategoryInCategories(item.categories, category.id)}
	on:click|stopPropagation={toggleCategory(category.id, item.id)}>{category.name}</a>
