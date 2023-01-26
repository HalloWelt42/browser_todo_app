<script lang="ts">
    export let visibility = true;

    function toggle(): void {
        visibility = !visibility;
    }
</script>


<div class="modal is-active" class:is-active={visibility}>
    <div class="modal-background"></div>
    <div class="modal-content">
        <div class="notification">
            <button class="delete" on:click={toggle}
            ></button>
            Lorem ipsum dolor sit amet, consectetur
            adipiscing elit lorem ipsum dolor. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta
            nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis
            venenatis</a> efficitur.
        </div>
        <slot></slot>
    </div>
</div>

<style>
    .modal-content {
        display: flex;
        justify-content: center;
    }

    .button {
        width: 200px;
    }
</style>