<script lang="ts">

    import ListToolbox from "./lib/ListToolbox.svelte";
    import Lists from "./lib/Lists.svelte";
    import Statusbar from "./lib/Statusbar.svelte";

    import {todo_manager} from "./lib/todo_manager";
    import {v4} from "uuid";
    import AddTodo from "./lib/AddTodo.svelte";
    import ModalDialog from "./lib/ModalDialog.svelte";
    import {TodoListController} from "./lib/controller/TodoListController";
    import TodoList from "./lib/TodoList.svelte";

    $todo_manager = new TodoListController();
    $todo_manager.addCategory({
        id: v4(),
        name: 'general',
        selected: true
    });

    let visibillity = false;

    $:{
        console.log($todo_manager);
    }

</script>

<ModalDialog {visibillity}/>

<div class="app-container">
    <header>
        <div class="header-container">
            <ListToolbox/>
            <Lists/>
        </div>
    </header>
    <main>
        <div class="add-todo">
            <AddTodo/>
        </div>
        <section class="todo-list">
            <TodoList/>
        </section>
    </main>
    <footer>
        <Statusbar/>
    </footer>
</div>


<style>

    header, main, footer, .app-container {
        display: flex;
        flex-direction: column;
    }


    .add-todo{
        margin-top: 50px;
    }

    .todo-list {
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-top: 80px;
    }

    .header-container {
        display: flex;
    }

    .app-container {
        min-height: 100%;
    }

    main {
        margin-top: 70px;
    }


    header {
        background-color: hsla(0, 100%, 100%, 1);
        position: fixed;
        width: 100%;
        box-shadow: 0px 5px 50px gray;
        top: 0;
    }


    footer {
        width: 100%;
        background-color: hsla(0, 100%, 100%, 1);
        color: hsla(0, 0%, 50%, 1);
        box-shadow: -10px 5px 50px gray;
        position: fixed;
        bottom: 0;
        height: 3em;
    }
</style>