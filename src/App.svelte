<script lang="ts">
    import CategoryAdd from "./lib/CategoryAdd.svelte";
    import Categories from "./lib/Categories.svelte";
    import Statusbar from "./lib/Statusbar.svelte";

    import {modus, todo_manager} from "./lib/todo_manager";

    import AddTodo from "./lib/AddTodo.svelte";
    import ModalDialog from "./lib/ModalDialog.svelte";
    import {TodoListController} from "./lib/controller/TodoListController";
    import TodoList from "./lib/TodoList.svelte";
    import CategoriesEdit from "./lib/CategoriesEdit.svelte";

    $todo_manager = new TodoListController();
    $modus = {
        categories_edit_active: true
    };

    let visibility = false;
    // Trigger
    $: {
        $todo_manager.saveTodo();
    }
</script>


<ModalDialog bind:visibility/>

<div class="app-container">
    <header>
        <div class="header-container">
            <CategoryAdd/>
            <div class="categories-container">
                <Categories/>
            </div>
            <CategoriesEdit/>
        </div>
    </header>
    <main>
        <div class="add-todo">
            <AddTodo/>
        </div>
        <section class="todo-list-wrapper">
            <TodoList/>
        </section>
    </main>
    <footer>
        <Statusbar/>
    </footer>
</div>


<style lang="scss">

  header,
  main,
  footer,
  .app-container {
    display: flex;
    flex-direction: column;
  }

  header {
    position: fixed;
    width: 100%;
    box-shadow: 0 0 10px #ddd;
    top: 0;
    z-index: 1;
    padding: 10px 0;
  }

  .add-todo {
    margin-top: 50px;
  }

  .todo-list-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 80px;
    margin-bottom: 54px;
  }

  .header-container, .categories-container {
    display: flex;
  }

  .categories-container {
    padding: 8px 0;
  }

  .categories-container {
    width: 100%;
    margin-left: 15px;
    margin-right: 15px;
    //border: 1px solid red;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    scroll-behavior: smooth;
  }

  .categories-container::-webkit-scrollbar {
    display: none;
  }

  .app-container {
    min-height: 100%;
  }

  main {
    margin-top: 70px;
    margin-bottom: 48px;
  }

  footer {
    width: 100%;
    box-shadow: 0 0 10px #ddd;
    position: fixed;
    bottom: 0;
    height: 48px;
  }
</style>
