<script lang="ts">

    import {todo_manager} from "./todo_manager";
    import {text_sanitizer} from "./helper/text_sanitizer";
    import DropDownPrio from "./components/DropDownPrio/DropDownPrio.svelte";

    let priority;

    function switch_status(id) {
        $todo_manager.toggleTodoStatus(id);
        $todo_manager = $todo_manager;
    }

    function saveTodoName(id: string, e) {
        let text = text_sanitizer(e.target.innerHTML, 'Aufgabe');
        $todo_manager.updateTodoName(id, text);
        $todo_manager = $todo_manager;
    }

    function deleteTodo(id: string) {
        $todo_manager.deleteTodo(id);
        $todo_manager = $todo_manager;
    }

    function clearInput(id, e) {
        let text = e.target.innerHTML;
        if (text === 'Aufgabe') {
            e.target.innerHTML = '';
        }
    }

    function saveByReturn(id: string, e) {
        if (e.keyCode === 13) {
            saveTodoName(id, e);
            e.target.blur();
        }
    }
</script>


<div class="todo-list">
    {#if $todo_manager.getTodos().length > 0}
        <table class="table">
            <thead>
            <th></th>
            <th class="has-text-grey-light">Aufgaben</th>
            <th></th>
            <th></th>
            <th></th>
            </thead>
            {#each $todo_manager.getTodos() as item}
                {#if item.status !== 'archived'}
                    <tr>
                        <!-- status -->
                        <td on:click={()=>switch_status(item.id)}>
                            {#if item.status === 'open'}
                                <i class="open is-size-4 icon fa-regular fa-circle-check"></i>
                            {/if}
                            {#if item.status === 'in_progress'}
                                <i class="in_progress is-size-4 has-text-info icon fa-solid fa-hourglass"></i>
                            {/if}
                            {#if item.status === 'completed'}
                                <i class="completed is-size-4 has-text-success icon fa-solid fa-circle-check"></i>
                            {/if}
                            {#if item.status === 'archived'}
                                <i class="archived is-size-4 has-text-grey icon fa-solid fa-box-archive"></i>
                            {/if}
                        </td>
                        <!-- toto name -->
                        <td class="todo">
                            <div class="todo-name"
                                 contenteditable="true"
                                 on:keypress={(event)=>saveByReturn(item.id,event)}
                                 on:focusout={(event)=>saveTodoName(item.id,event)}
                                 on:click={(event)=>clearInput(item.id,event)}
                                 on:focus={(event)=>clearInput(item.id,event)}
                                 class:warning={item.name==='Der Name der Aufgabe darf nicht leer sein!'}
                                 bind:innerHTML={item.name}
                            ></div>
                        </td>
                        <!-- categories edit -->
                        <td>

                        </td>
                        <!-- priorities switcher -->
                        <td>
                            <DropDownPrio {item} />
                        </td>
                        <!-- delete -->
                        <td on:click={()=>deleteTodo(item.id)}
                            on:click|stopPropagation
                        >
                            <button class="is-medium delete"></button>
                        </td>
                    </tr>
                {/if}
            {/each}
        </table>
    {/if}
</div>


<style>
    .todo-list {
        width: 860px;
        margin-left: 50px;
        margin-right: 50px;
    }

    .todo-name {
        font-weight: lighter;
        font-size: 1.5rem;
        outline: none;
    }

    .todo {
        width: 100%;
    }

    .table {
        width: 100%;
    }

    .icon {
        color: hsla(0, 0%, 90%, 1);
        cursor: pointer;
    }

    .warning {
        color: orangered;
    }

    tr, td {
        vertical-align: middle;
    }

</style>