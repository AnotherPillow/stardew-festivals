<script lang="ts">
    import Check from "@lucide/svelte/icons/check";
    import ChevronsUpDown from "@lucide/svelte/icons/chevrons-up-down";
    import { tick } from "svelte";
    import * as Command from "$lib/components/ui/command/index.js";
    import * as Popover from "$lib/components/ui/popover/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { cn } from "$lib/utils.js";
    import * as festivals from "$lib/festivals";

    interface Props {
        entries: ListedEntry[];
        selectedValue: ListedEntry;
    }

    let { entries = festivals.festivals, selectedValue = $bindable<ListedEntry>() } = $props<{} & Props>();
    
    let open = $state(false);
    let value = $state("");
    let triggerRef = $state<HTMLButtonElement>(null!);

    // i hate runes
    // const _selectedValue = $derived<ListedEntry>(entries.find((f: ListedEntry) => f?.value === value) as ListedEntry)
    $effect(() => {
    //     if (_selectedValue && selectedValue !== _selectedValue) selectedValue = _selectedValue;
        selectedValue = entries.find((f: ListedEntry) => f?.value === value) as ListedEntry;
    });
    
    function closeAndFocusTrigger() {
        open = false;
        tick().then(() => {
            triggerRef.focus();
        });
    }
</script>
 
<Popover.Root bind:open>
    <Popover.Trigger bind:ref={triggerRef}>
        {#snippet child({ props })}
            <Button
                variant="outline"
                class="min-w-[200px] justify-between"
                {...props}
                role="combobox"
                aria-expanded={open}
            >
                {(selectedValue && selectedValue.label) || "Select an option..."}
                <ChevronsUpDown class="ml-2 size-4 shrink-0 opacity-50" />
            </Button>
        {/snippet}
    </Popover.Trigger>
    <Popover.Content class="min-w-[300px] p-0">
        <Command.Root>
            <Command.Input placeholder="Search..." />
            <Command.List>
                <Command.Empty>No item found.</Command.Empty>
                <Command.Group>
                    {#each entries as entry}
                        <Command.Item
                            value={entry.value}
                            onSelect={() => {
                                value = entry.value;
                                closeAndFocusTrigger();
                            }}
                            >
                            <Check
                                class={cn(
                                "mr-2 size-4",
                                value !== entry.value && "text-transparent"
                                )}
                            />
                            {entry.label}
                        </Command.Item>
                    {/each}
                </Command.Group>
            </Command.List>
        </Command.Root>
    </Popover.Content>
</Popover.Root>