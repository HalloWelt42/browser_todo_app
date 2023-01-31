<script>
    import {modus, todo_manager} from "../../todo_manager.ts";

    function handleClick() {
        $modus.todos_show_in_progress = !$modus.todos_show_in_progress;
        $todo_manager = $todo_manager;
    }
</script>

<div class="in_progress" on:click={handleClick}>
    {#if $modus.todos_show_in_progress === true}
        <i class="icon active fa-solid fa-hourglass-half"></i>
    {/if}
    {#if $modus.todos_show_in_progress === false}
        <i class="icon fa-solid fa-hourglass-half"></i>
    {/if}
</div>

<style lang="scss">
  @import "src/vars.scss";

  .in_progress > .active {
    color: $icon-active;
  }

  .in_progress {
    display: flex;
    gap: 15px;
    align-items: center;
    color: $icon-normal;
    cursor: pointer;

    &:hover {
      color: $icon-hover;
    }

    &:active {
      color: $icon-clicked;
    }

    .icon{
      margin: 10px 20px 10px 20px;
      padding: 10px;
    }

  }
</style>