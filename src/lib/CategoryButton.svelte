<script lang="ts">
    import {text_sanitizer} from "./helper/text_sanitizer";
    import {todo_manager} from "./todo_manager";

    export let item;

    function toggleCategorySelected(categoryId: string) {
        $todo_manager.toggleCategorySelected(categoryId);
        $todo_manager = $todo_manager;
    }

    function deleteCategory(categoryId: string) {
        $todo_manager.deleteCategory(categoryId);
        $todo_manager = $todo_manager;
    }

    function saveCategoryName(id: string, e) {
        let text = text_sanitizer(e.target.innerText, 'Kategorie');
        if ($todo_manager.existsCategoryName(text)) {
            $todo_manager.updateCategoryName(id, 'Kategorie');
            e.target.innerText = 'Kategorie';
        } else {
            $todo_manager.updateCategoryName(id, text);
        }
        $todo_manager = $todo_manager;
    }

    function removeText(e) {
        if (
            e.target.innerText === 'Kategorie'
            // || e.target.innerText === ''
        ) {
            e.target.innerText = '';
        }
        $todo_manager = $todo_manager;
    }

    function saveByReturn(id: string, e) {
        if (e.keyCode === 13 || e.keyCode === 10) {
            e.target.blur();
            // e.stopPropagation();
            saveCategoryName(id, e);
        }
    }

</script>

<div class="list button is-link"
     on:click={()=>toggleCategorySelected(item.id)}
     class:is-light={!item.selected}>
    <span class="namefield"
          contenteditable={item.name !== 'Allgemein'}
          on:focus={removeText}
          on:keypress={(event)=>saveByReturn(item.id,event)}
          on:focusout={(event)=>saveCategoryName(item.id,event)}
    >{item.name}</span>
    {#if item.name !== 'Allgemein'}
    <span class="delete"
          on:click={()=>deleteCategory(item.id)}
          on:click|stopPropagation>
    </span>
    {/if}
</div>


<style>
    .delete {
        margin-left: 10px;
    }

    .list {
        margin: 5px;
    }

    .namefield {
        min-width: 40px;
        cursor: text;
        outline: none;
    }

</style>