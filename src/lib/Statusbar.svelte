<script lang="ts">
    import DataBaseIcon from "./components/DataBaseIcon/DataBaseIcon.svelte";
    import {States} from "./components/DataBaseIcon/States";
    let current_state:string = States[States.ready];
</script>


<DataBaseIcon bind:current_state/>