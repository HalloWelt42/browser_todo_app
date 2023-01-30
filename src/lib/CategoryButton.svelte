<script lang="ts">
    import {text_sanitizer} from "./helper/text_sanitizer";
    import {todo_manager} from "./todo_manager";
    import DeleteButton from "./components/buttons/DeleteButton.svelte";

    export let item;

    let danger = '';
    $:{
        console.log(danger);
        console.log(categoryClasses());
    }

    function categoryClasses():string {
        return danger;
    }

    function toggleCategorySelected(categoryId: string) {
        $todo_manager.toggleCategorySelected(categoryId);
        $todo_manager = $todo_manager;
    }

    function deleteCategory(categoryId: string) {
        if ($todo_manager.getTodosCountBy(item.id) === 0) {
            $todo_manager.deleteCategory(categoryId);
        } else {
            danger = 'danger';
            setTimeout(()=>{danger=''},500);
        }
        $todo_manager = $todo_manager;
    }

    function saveCategoryName(id: string, e) {
        let text = text_sanitizer(e.target.innerHTML, "Kategorie");
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

<button
        class="category-button list button is-link {danger}"
        on:click={() => toggleCategorySelected(item.id)}
        class:is-light={!item.selected && danger !== 'danger'}>
    <div
            class="name-field"
            contenteditable="true"
            on:keypress={(event) => saveByReturn(item.id, event)}
            on:focusout={(event) => saveCategoryName(item.id, event)}
            on:click={(event) => clearInput(item.id, event)}
            on:focus={(event) => clearInput(item.id, event)}
            bind:innerHTML={item.name}
            on:click|stopPropagation></div>

    <div class="delete-category" on:click={() => deleteCategory(item.id)} on:click|stopPropagation>
        <DeleteButton/>
    </div>
    {#if $todo_manager.getTodosCountBy(item.id) > 0}
        <div class="badge">&nbsp;{$todo_manager.getTodosCountBy(item.id)}&nbsp;</div>
    {/if}
</button>

<style>
    .delete-category {
        display: flex;
        align-items: center;
        margin-left: 10px;
    }

    .category-button {
        display: flex;
        align-items: center;
    }

    .name-field {
        display: flex;
        align-items: center;
        min-width: 40px;
        cursor: text;
        outline: none;
    }

    .badge {
        font-weight: bold;
        font-size: 0.8rem;
        z-index: 1;
    }

    .category-button.danger {
        background: hsl(348, 86%, 43%);
        color: #fff;
    }

</style>
