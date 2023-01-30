<script lang="ts">

    import {todo_manager} from "./todo_manager";
    import DropDownPrio from "./components/DropDownPrio/DropDownPrio.svelte";
    import DeleteButton from "./components/buttons/DeleteButton.svelte";
    import Todo from "./Todo.svelte";

    function switch_status(id) {
        $todo_manager.toggleTodoStatus(id);
        $todo_manager = $todo_manager;
    }

    function deleteTodo(id: string) {
        $todo_manager.deleteTodo(id);
        $todo_manager = $todo_manager;
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
                {#if item.status !== "archived"}
                    <tr>
                        <!-- status -->
                        <td on:click={() => switch_status(item.id)}>
                            {#if item.status === "open"}
                                <i class="open is-size-4 icon fa-regular fa-circle-check"></i>
                            {/if}
                            {#if item.status === "in_progress"}
                                <i class="in_progress is-size-4 has-text-info icon fa-solid fa-hourglass"></i>
                            {/if}
                            {#if item.status === "completed"}
                                <i class="completed is-size-4 has-text-success icon fa-solid fa-circle-check"></i>
                            {/if}
                            {#if item.status === "archived"}
                                <i class="archived is-size-4 has-text-grey icon fa-solid fa-box-archive"></i>
                            {/if}
                        </td>
                        <!-- toto name -->
                        <td class="todo">
                            <Todo {item}/>
                        </td>
                        <!-- categories edit -->
                        <td></td>
                        <!-- priorities switcher -->
                        <td>
                            <DropDownPrio {item}/>
                        </td>
                        <!-- delete -->
                        <td on:click={() => deleteTodo(item.id)} on:click|stopPropagation>
                            <DeleteButton/>
                        </td>
                    </tr>
                {/if}
            {/each}
        </table>
    {/if}
</div>


<style lang="scss">
  .todo-list {
    width: 860px;
    margin-left: 50px;
    margin-right: 50px;
    overflow-y: scroll;
    height: calc(100vh - 387px);

    .table {
      width: 100%;

      tr,
      td {
        vertical-align: middle;
      }

      .todo {
        width: 100%;

        .todo-name {
          font-weight: lighter;
          font-size: 1.5rem;
          outline: none;
        }
      }

      .icon {
        color: hsla(0, 0%, 90%, 1);
        cursor: pointer;
      }

      .warning {
        color: orangered;
      }
    }
  }
</style>
