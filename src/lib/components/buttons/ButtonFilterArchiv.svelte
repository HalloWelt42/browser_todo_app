<script>
    import {info, modus, todo_manager} from "../../todo_manager.ts";

    function handleClick() {
        $modus.todos_show_archived = !$modus.todos_show_archived;
        $todo_manager = $todo_manager;
    }
</script>

<div class="active" on:click={handleClick}>
    {#if $modus.todos_show_archived === true}
        <i class="icon active fa-solid fa-box-archive is-size-3"></i>
    {/if}
    {#if $modus.todos_show_archived === false}
        <i class="icon fa-solid fa-box-archive is-size-3"></i>
    {/if}
</div>

<style lang="scss">
  @import "src/vars.scss";

  .active > .active {
    color: $icon-active;
  }

  .active {
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