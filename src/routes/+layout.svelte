<script lang="ts">
    import '@fontsource-variable/jetbrains-mono';
    import '@fontsource-variable/open-sans';
    
	import '../app.pcss';
	
    import { ModeWatcher } from "mode-watcher";
	let { children } = $props();
</script>

<svelte:head>
    <title>Stardew Festivals</title> 
</svelte:head>

<ModeWatcher />
{@render children()}

