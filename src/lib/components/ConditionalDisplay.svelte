<script lang="ts">
	export let visible = true;

    $:{
        visible;
        setTimeout(()=>{
            visible = false;
        },1500);
    }
</script>

<i class="conditional-display-bl fa-solid fa-floppy-disk is-size-3 has-text-success {visible ? 'show':'fade-out'}" />

<style lang="scss">
	.conditional-display-bl {
		position: absolute;
		right: -5px;
		bottom: -10px;
	}

	.show {
      visibility: visible;
	}

	.fade-out {
		transition: opacity 1s;
		opacity: 0;
	}
</style>
