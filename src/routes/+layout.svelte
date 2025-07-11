<script lang="ts">
    import '@fontsource-variable/jetbrains-mono';
    import '@fontsource-variable/open-sans';
    
	import '../app.pcss';
	
    import { ModeWatcher } from "mode-watcher";
	let { children } = $props();
</script>

<svelte:head>
    <title>Stardew Festivals</title> 
    <meta content="Stardew Festival Positions" property="og:title" />
    <meta content="https://festivals.pillow.rocks/favicon.png" property="og:image" />
    <meta content="An interactive online viewer to see festival positions of Stardew Valley NPCs (modded and vanilla)" property="og:description" />
    <meta content="https://festivals.pillow.rocks" property="og:url" />
    <meta content="#FF42A6" name="theme-color" />
    <meta property="og:type" content="website" />
</svelte:head>

<ModeWatcher />
{@render children()}

