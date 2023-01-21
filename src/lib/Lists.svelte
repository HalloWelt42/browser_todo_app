<script lang="ts">
    import {todo_manager} from "./todo_manager.js";
    import CategoryButton from "./CategoryButton.svelte";


</script>

<div class="lists">

    {#each $todo_manager.getCategories() as item}

        {#if item.name === 'general'}
            <div class="list button is-link">{item.name}</div>
        {:else}
            <CategoryButton {item}/>
        {/if}

    {/each}
</div>


<style>

    .lists, .list {
        display: flex;
    }

    .list {
        margin: 5px;
    }



</style>