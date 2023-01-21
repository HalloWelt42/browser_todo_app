<script lang="ts">
    import {todo_manager} from "./todo_manager";
    import {v4} from "uuid";

    function addTodo() {
        $todo_manager.addTodo({
            id: v4(),
            name: 'Aufgabe',
            status: 'open',
            categories:$todo_manager.getIdsFromCategories()
        });
        $todo_manager = $todo_manager;
    }
</script>


<div class="tool-container">
    <div class="tool button is-white"
         on:click={addTodo}
    >
        <i class="fas fa-plus icon"></i>&nbsp;&nbsp;neue Aufgabe
    </div>
</div>


<style>
    .tool {
        display: flex;
    }
</style>