<script lang="ts">

    import {todo_manager} from "./todo_manager";
    import {text_sanitizer} from "./helper/text_sanitizer";

    function switch_status(id) {
        $todo_manager.toggleTodoStatus(id);
        $todo_manager = $todo_manager;
    }

    function saveTodoName(id: string, e) {
        let text = text_sanitizer(e.target.innerText,'Aufgabe');
        $todo_manager.updateTodoName(id, text);
        e.target.innerText = 'Aufgabe';
        $todo_manager = $todo_manager;
    }

    function deleteTodo(id: string) {
        $todo_manager.deleteTodo(id);
        $todo_manager = $todo_manager;
    }

    function removeText(e) {
        if(
               e.target.innerText === 'Aufgabe'
            || e.target.innerText === 'Der Name der Aufgabe darf nicht leer sein!'
        ){
            e.target.innerText = '';
        }
        $todo_manager = $todo_manager;
    }
    
    function saveByReturn(id: string, e) {
        if(e.keyCode === 13 || e.keyCode === 10){
           e.target.blur();
           e.stopPropagation();
           saveTodoName(id,e);
        }
    }

</script>


<div class="todo-list">
    {#if $todo_manager.getTodos().length > 0}
        <table class="table">
            <thead>
            <th></th>
            <th class="has-text-grey-light">Aufgaben</th>
            <th class="has-text-grey-light">Kategorien</th>
            <th></th>
            </thead>
            {#each $todo_manager.getTodos() as item}
                {#if item.status !== 'archived'}
                    <tr>
                        <!-- Status -->
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
                        <!-- Name -->
                        <td class="todo">
                            <div class="todo-name"
                                 contenteditable="true"
                                 on:focus={removeText}
                                 on:keypress={(event)=>saveByReturn(item.id,event)}
                                 on:focusout={(event)=>saveTodoName(item.id,event)}
                                 class:warning={item.name==='Der Name der Aufgabe darf nicht leer sein!'}
                            >{item.name}</div>
                        </td>
                        <!--                -->
                        <td class="has-text-grey-light">
                            <!--{#each item.categories as id}-->
                            {item.categories.length}
                            <!--{$todo_manager.getCategoryName(id)}-->
                            <!--{/each}-->
                        </td>
                        <!-- Options -->
                        <td on:click={()=>deleteTodo(item.id)}>
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
        /*border: 1px solid;*/
        width: 800px;
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