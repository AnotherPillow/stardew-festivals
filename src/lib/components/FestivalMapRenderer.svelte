<script lang="ts">
    import { maps } from "$lib/festivals";
    import { onMount } from "svelte";

    // props for ComboBox let { entries = festivals.festivals, selectedValue = $bindable<ListedEntry>() } = $props<{} & Props>();
    
    let {
        festivalId, modificationId, selectedTile = $bindable<SelectedFestivalTile | null>(),
    } = $props<{} & FestivalMapRendererProps>();

    selectedTile = {}
    
    const map: MapData = $derived(maps[`${festivalId}_${modificationId}`]) as MapData;

    let viewerOutsideContainer: HTMLDivElement = $state(null!);
    onMount(() => {
        if (!viewerOutsideContainer || !map) return;

        viewerOutsideContainer.scrollLeft = (map.widthTiles * 32) / 2;
        viewerOutsideContainer.scrollTop = (map.heightTiles * 32) / 2;
    })

    const isNullish = (v: any) => v == null || v == undefined

    const getNPCs = (x: number, y: number) => {
        if (!map.npcs || isNullish(x) || isNullish(y)) return [];
        return map.npcs.filter(npc => npc.tileX == x && npc.tileY == y)
    }
</script>

<div bind:this={viewerOutsideContainer} 
    id="viewer-container" 
    class="w-full h-full bg-cover bg-center bg-no-repeat overflow-scroll rounded-md"
    style={`--h: ${map.heightTiles * 32}px; --w: ${map.widthTiles * 32}px`}
>
    <!-- <p class="font-semibold">festivalId: {festivalId}</p>
    <p class="font-semibold">modificationId: {modificationId}</p>
    <p class="font-semibold">map ({`${festivalId}_${modificationId}`}): {JSON.stringify(map)}</p> -->
    <div id="viewer-inner-container" class="relative">
        <img
            src={map.image}
            alt="Map"
            class={`rounded-md z-1 absolute top-0 left-0 aspect-[${map.widthTiles}/${map.heightTiles}] object-cover`}
        />
        <div id="tiles-container" class="absolute top-0 left-0 z-2 flex flex-wrap">
            {#each new Array(map?.heightTiles ?? 0).fill(0) as _, y}
                {#each new Array(map?.widthTiles ?? 0).fill(0) as _, x}
                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                    <!-- svelte-ignore event_directive_deprecated -->
                    <div
                        class="tile w-8 h-8 cursor-pointer rounded-sm pixelated bg-norepeat bg-cover bg-center"
                        style={`left: ${x * 32}px; top: ${y * 32}px; background-image: url(${getNPCs(x, y).find(x=>x.image)?.image}); ${getNPCs(x, y).length > 1 ? 'background-color: yellow;' : ''} background-position: -${x * 32}px -${y * 32}px;`}
                        data-chars={map.npcs ? getNPCs(x, y).map(npc => npc.internalID).join(',') : ''}
                        on:click={() => {
                            selectedTile = {
                                x,
                                y,
                                festivalId: `${festivalId}_${modificationId}`,
                            };
                        }}
                    >
                        &nbsp;
                    </div>
                {/each}
            {/each}

        </div>
    </div>
</div>

<style lang="scss">
    img {
        image-rendering: pixelated;
    }

    #viewer-inner-container, #viewer-inner-container>img, #tiles-container {
        width: var(--w);
        height: var(--h);
    }

    .tile:hover {
        background-color: hsl(var(--background) / 0.5);
        filter: brightness(0.5);
    }
</style>