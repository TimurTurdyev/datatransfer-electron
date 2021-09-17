<script>
	import {onMount} from "svelte";

	// Ready state controller
	let ready = false;
	onMount(() => ready = true);
</script>

{#if ready}
    <slot/>
{:else}
    Загрузка...
{/if}