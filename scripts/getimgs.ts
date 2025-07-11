import * as fs from 'node:fs'

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

function flipMap(originalMap) {
    const flippedMap = new Map();
    for (const [key, value] of originalMap.entries()) {
        flippedMap.set(value, key);
    }
    return flippedMap;
}

;(async function() {
    
    const data = JSON.parse(await Bun.file('festivals.json').text()) as Record<string, TileNPC[]>
    const vanillaCharactersList = Object.keys(JSON.parse(await Bun.file('vanilla-characters.json').text())) // they're almost all just their didplay name as id

    const displayToInternal = new Map(
        Object.values(data).flatMap((arr) =>
            arr.map((item) => [item.displayName, item.internalID]),
        ),
    );
    for (const vanillaChar of vanillaCharactersList) displayToInternal.set(vanillaChar, vanillaChar)

    const internalToDisplay = flipMap(displayToInternal)

    const displays = Array.from(displayToInternal.keys())
    const internals = Array.from(displayToInternal.values())

    const internalToSprite = new Map<string, string>()
    
    const sprites = fs.readdirSync('./raw-sprites')
    for (const sprite of sprites) {
        const internalByContains = internals.find(id => sprite.toLowerCase().includes(id.toLowerCase()))
        if (internalByContains) {
            internalToSprite.set(internalByContains, sprite)
            continue;
        }

        const displayByContains = displays.find(name => sprite.toLowerCase().includes(name.toLowerCase()))
        if (displayByContains) {
            internalToSprite.set(displayToInternal.get(displayByContains)!, sprite)
            continue
        }

        console.log(`Not sure who ${sprite} is`)
    }

    const coveredSprites = new Set(
        Array.from(internalToSprite.values()).map((x) => x.toLowerCase()),
    );

    console.log(internalToSprite, `found ${internalToSprite.size} out of ${displayToInternal.size}`)
    console.log(`could not figure out NPCs: `, Array.from(internalToDisplay.keys()).filter(k => !internalToSprite.get(k)) )
    
    const obj = {
        'JortsCat': 'jortssprites.png'
    }
    Array.from(internalToSprite.entries()).forEach(([k, v]) => obj[k] = v)
    
    Bun.file('internalid-to-sprite-filename.json').write(JSON.stringify(obj, null, 4))
})()