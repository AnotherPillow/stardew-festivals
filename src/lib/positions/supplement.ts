export default function supplement(main: TileNPC[], fallback: TileNPC[]) {
    const extras = []
    for (const fallbackNpc of fallback) {
        if (!main.find(npc => npc.internalID == fallbackNpc.internalID)) extras.push(fallbackNpc)
    }

    return [...main, ...extras]
}