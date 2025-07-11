// idk how these dont have to be exported must be ✨ magic ✨

interface ListedEntry {
    label: string;
    value: string;
}

interface FestivalMapRendererProps {
    festivalId: string;
    modificationId: string;
    selectedTile: SelectedFestivalTile | null;
}

interface SelectedFestivalTile {
    x: number;
    y: number;
    festivalId: string; // <FESTIVAL>_<MODIFICATION>
}

interface TileNPC {
    internalID: string;
    displayName: string;
    
    modUniqueID: string;
    modDisplayName: string;

    note?: string;
    image: string;

    tileX: number;
    tileY: number;
}

interface MapData {
    image: string;
    widthTiles: number;
    heightTiles: number;

    npcs: TileNPC[];
}