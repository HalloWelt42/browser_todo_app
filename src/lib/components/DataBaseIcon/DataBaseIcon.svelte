<script lang="ts">

    import {States} from "./States.ts";

    export let current_state: States;
    let css_classes: { layer_b: string; layer_a: string };
    const getCSSClasses = (state: States) => {
        css_classes = {layer_a: '', layer_b: ''};
        switch (States[state]) {
            case States.empty:
                css_classes = {layer_a: state.toString(), layer_b: "hidden"}
                break;
            case States.busy:
                css_classes = {layer_a: state.toString(), layer_b: "hidden"}
                break;
            case States.ready:
                css_classes = {layer_a: state.toString(), layer_b: "hidden"}
                break;
            case States.full:
                css_classes = {layer_a: state.toString(), layer_b: "hidden"}
                break;
            case States.offline:
                css_classes = {layer_a: state.toString(), layer_b: ""}
                break;
            case States.has_content:
                css_classes = {layer_a: "", layer_b: "hidden"}
                break;
            default:
                css_classes = {layer_a: state.toString(), layer_b: "hidden"}
        }
        return css_classes;
    }

    $:{css_classes = getCSSClasses(current_state);}

</script>


<div>
    <i class="layer-a fa-solid fa-database icon is-large fa-1x {css_classes.layer_a}"></i>
    <i class="layer-b fa-solid fa-slash icon is-large fa-1x {css_classes.layer_b}"></i>
</div>


<style>
    .layer-a {
        position: absolute;
    }

    .layer-b {
        position: relative;
    }

    .full,.fa-slash {
        color: hsl(348, 86%, 43%);
    }

    .empty,.offline {
        color: hsl(0, 0%, 86%);
    }

    .busy{
        color: hsl(48, 100%, 67%);
    }

    .ready {
        animation-name: pulse;
        animation-duration: 0.3s;
    }

    .hidden {
        visibility: hidden;
    }

    @keyframes pulse {
        from {color: hsl(141, 71%, 48%);}
        to {color: initial;}
    }

</style>