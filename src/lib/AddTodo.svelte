<script lang="ts">
    import {todo_manager} from "./todo_manager";

    function addTodo() {
        $todo_manager.addTodo({
            id: crypto.randomUUID(),
            name: 'Aufgabe',
            status: 'open',
            categories:[]
        });
        $todo_manager = $todo_manager;
    }
</script>


<div class="tool-container">
    <div class="tool button is-white" on:click={addTodo}>
        <i class="fas fa-plus icon"></i>&nbsp;&nbsp;neue Aufgabe
    </div>
    <div class="tool button is-white has-text-grey">
        ({$todo_manager.getCategoriesCount()}) für ausgewählte Kategorien
    </div>
</div>


<style lang="scss">
    .tool {
        display: flex;
    }
</style>