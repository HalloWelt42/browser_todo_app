<script lang="ts">

    import {todo_manager} from "./todo_manager";
    import {v4} from "uuid";

    function addListItem() {
        $todo_manager.addCategory({
            id: v4(),
            name: 'Kategorie',
            selected: false
        })
        $todo_manager = $todo_manager;
    }

</script>


<div class="tool-box-container">

    <div class="tool-container">
        <div class="tool button is-white" on:click={addListItem}>
            <i class="fas fa-plus icon"></i>&nbsp;&nbsp;neue Kategorie
        </div>
    </div>

</div>


<style>
    .tool-container {
        margin: 5px;
    }
</style>