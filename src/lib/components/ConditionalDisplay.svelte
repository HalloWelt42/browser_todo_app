<script lang="ts">
	export let save_data_animation;

    $:{
        save_data_animation;
        setTimeout(()=>{
            save_data_animation = false;
        },0);
    }
</script>

<i class="fa-solid fa-floppy-disk is-size-3 has-text-success {save_data_animation ? 'show':'fade-out'}" />

<style lang="scss">
	.show {
      visibility: visible;
	}

	.fade-out {
		transition: opacity 1s;
        animation-timing-function: ease;
		opacity: 0;
	}
</style>
