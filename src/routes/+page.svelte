<script lang="ts">
    import * as Resizable from "$lib/components/ui/resizable/index.js";
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { Separator } from "$lib/components/ui/separator/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";

    import Combobox from '$lib/components/Combobox.svelte';
    import DisplayModeSwitch from '$lib/components/DisplayModeSwitch.svelte';
    import FestivalMapRenderer from "$lib/components/FestivalMapRenderer.svelte";
    
    import * as festivals from '$lib/festivals';
    
    let selectedFestival: ListedEntry = $state(festivals.festivals[0]);
    const vanillaModification: ListedEntry = {
        label: 'Vanilla',
        value: 'vanilla'
    };
    let selectedModifcation: ListedEntry = $state(vanillaModification);

    let selectedFestivalTile: SelectedFestivalTile | null = $state(null);

    
</script>

<header class="flex items-center justify-between p-4 bg-[--header-background] m-4 text-[--foreground] rounded-lg">
    <h1 class="text-xl font-semibold">Stardew Festival Spots</h1>
    <DisplayModeSwitch />
</header>

<main class="flex flex-col items-center justify-center h-screen bg-[--background] text-[--foreground] text-center mx-4">
    <Resizable.PaneGroup direction="vertical" class="w-full rounded-lg border">
        <Resizable.Pane defaultSize={30}>
            <Resizable.PaneGroup direction="horizontal">
                <Resizable.Pane defaultSize={50}>
                    <div class="h-full p-6">
                        <h2 class="text-2xl font-semibold mb-4">Festival</h2>
                        <Combobox
                            entries={festivals.festivals}
                            bind:selectedValue={selectedFestival}
                        />

                        {#if selectedFestival}
                            <div class="mt-4">
                                <h3 class="text-lg font-semibold">Modded variation</h3>
                                <Combobox
                                    entries={[
                                        vanillaModification,
                                        ...(selectedFestival && selectedFestival.value && selectedFestival.value in festivals.moddedVariants ? festivals.moddedVariants[selectedFestival.value] : [])
                                    ]}
                                    bind:selectedValue={selectedModifcation}
                                    
                                />
                            </div>
                        {/if}
                    </div>
                </Resizable.Pane>
                <Resizable.Handle />
                <Resizable.Pane defaultSize={50}>
                    <div class="h-full p-6">
                        {#if selectedFestivalTile && Object.keys(selectedFestivalTile).length > 0}
                            <!-- <h3 class="text-lg">X: {selectedFestivalTile.x} Y: {selectedFestivalTile.y}</h3> -->
                            <p class="w-full">X: {selectedFestivalTile.x} Y: {selectedFestivalTile.y}</p>
                            
                            <Separator class="my-4"/>
                            
                            <ul class="w-full">
                                {#each Object(festivals.maps[`${selectedFestival.value}_${selectedModifcation.value}`]).npcs.filter((npc: TileNPC) => npc.tileX == selectedFestivalTile?.x && npc.tileY == selectedFestivalTile?.y) as npc}
                                    <li>
                                        <Dialog.Root>
                                            <Dialog.Trigger>
                                                <span class="inline-block mr-2">
                                                    <img src={npc.image} alt={npc.displayName + ' sprite'} class="w-8 h-8 inline-block pixelated" />
                                                    <span class="ml-2 font-semibold hover:underline">{npc.displayName} (<span class="jetbrains-mono">{npc.internalID}</span>)</span>
                                                </span>
                                            </Dialog.Trigger>
                                            <Dialog.Content>
                                                <!-- <Dialog.Header>
                                                    <Dialog.Title>this is an npc</Dialog.Title>
                                                    <Dialog.Description>
                                                        wow so cool
                                                    </Dialog.Description>
                                                </Dialog.Header> -->
                                                <div class="grid gap-4 py-4">
                                                    <span class="inline-block mr-2 w-full text-center">
                                                        <img src={npc.image} alt={npc.displayName + ' sprite'} class="w-16 h-16 inline-block pixelated" loading="lazy" />
                                                        <span class="text-lg ml-2 font-semibold hover:underline">{npc.displayName}</span>
                                                    </span>
                                                    <div class="w-full gap-4 text-center">
                                                        <p class="w-full">Source mod: {npc.modDisplayName} (<span class="jetbrains-mono bg-sky-200 bg-opacity-20 p-0.5 px-1 mx-0.5 rounded-sm">{npc.modUniqueID}</span>)</p>
                                                    </div>
                                                    <div class="grid grid-cols-4 items-center gap-4">
                                                        <Label for="npc-display" class="text-right">Display Name</Label>
                                                        <Input id="npc-display" value={npc.displayName} class="col-span-3" readonly />
                                                    </div>
                                                    <div class="grid grid-cols-4 items-center gap-4">
                                                        <Label for="internal-name" class="text-right">Internal ID</Label>
                                                        <Input id="internal-name" value={npc.internalID} class="col-span-3" readonly />
                                                    </div>
                                                    <div class="grid grid-cols-4 items-center gap-4">
                                                        <Label for="pos-x" class="text-right">X Position</Label>
                                                        <Input id="pos-x" value={npc.tileX} class="col-span-1" readonly />
                                                        <Label for="pos-y" class="text-right">Y Position</Label>
                                                        <Input id="pos-y" value={npc.tileY} class="col-span-1" readonly />
                                                    </div>
                                                </div>
                                            </Dialog.Content>
                                        </Dialog.Root>
                                    </li>
                                {/each}
                            </ul>
                        {:else}
                            <p class="font-semibold">No tile selected</p>
                        {/if}
                    </div>
                </Resizable.Pane>
            </Resizable.PaneGroup>
        </Resizable.Pane>
        <Resizable.Handle />
        <Resizable.Pane defaultSize={70} class="p-6">
            {#if selectedFestival && selectedModifcation}
                <FestivalMapRenderer    
                    festivalId={selectedFestival?.value}
                    modificationId={selectedModifcation?.value}
                    bind:selectedTile={selectedFestivalTile}
                />
            {/if}
        </Resizable.Pane>
    </Resizable.PaneGroup>
    <p class="mx-4">Festival data collected by Scarlett</p>
</main>