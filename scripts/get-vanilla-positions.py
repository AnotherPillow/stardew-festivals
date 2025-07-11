from typing import List
import typing
from bs4 import Tag
from tmxpy import TMXpy
import os, json
from pathlib import Path

contentDirectory = 'C:\\Program Files (x86)\\Steam\\steamapps\\common\\Stardew Valley\\Content (unpacked)\\Maps'

CHARACTER_SHEET_IDS = [
    ['Abigail','Abigail','Abigail','Abigail','Caroline','Caroline','Caroline','Caroline'],
    ['Clint','Clint','Clint','Clint','Demetrius','Demetrius','Demetrius','Demetrius'],
    ['Willy','Willy','Willy','Willy','Elliott','Elliott','Elliott','Elliott'],
    ['Emily','Emily','Emily','Emily','Evelyn','Evelyn','Evelyn','Evelyn'],
    ['George','George','George','George','Gus','Gus','Gus','Gus'],
    ['Haley','Haley','Haley','Haley','Harvey','Harvey','Harvey','Harvey'],
    ['Jas','Jas','Jas','Jas','Jodi','Jodi','Jodi','Jodi'],
    ['Alex','Alex','Alex','Alex','Kent','Kent','Kent','Kent'],
    ['Leah','Leah','Leah','Leah','Lewis','Lewis','Lewis','Lewis'],
    ['Linus','Linus','Linus','Linus','Marlon','Marlon','Marlon','Marlon'],
    ['Marnie','Marnie','Marnie','Marnie','Maru','Maru','Maru','Maru'],
    ['Pam','Pam','Pam','Pam','Penny','Penny','Penny','Penny'],
    ['Pierre','Pierre','Pierre','Pierre','Robin','Robin','Robin','Robin'],
    ['Sam','Sam','Sam','Sam','Sebastian','Sebastian','Sebastian','Sebastian'],
    ['Shane','Shane','Shane','Shane','Vincent','Vincent','Vincent','Vincent'],
    ['Wizard','Wizard','Wizard','Wizard','Dwarf','Dwarf','Dwarf','Dwarf'],
    ['Sandy','Sandy','Sandy','Sandy','Krobus','Krobus','Krobus','Krobus'],
    ['Leo','Leo','Leo','Leo'], # bottom right 4 are empty
]

MAP_NAMES = [
    'Town-Christmas.tmx',
    'Town-Christmas2.tmx',
    'Town-DogHouse.tmx',
    'Town-EggFestival.tmx',
    'Town-EggFestival2.tmx',
    'Town-Fair.tmx',
    'Town-Fair2.tmx',
    'Town-Halloween.tmx',
    'Town-Halloween2.tmx',
    'Beach-Jellies.tmx',
    'Beach-Jellies2.tmx',
    'Beach-Luau.tmx',
    'Beach-Luau2.tmx',
    # desert festival does not exist:tm:
    'Forest-FlowerFestival.tmx',
    'Forest-FlowerFestival2.tmx',
    'Forest-IceFestival.tmx',
    'Forest-IceFestival2.tmx',
]

data = {}

for name in MAP_NAMES:
    tmx = TMXpy(
        [Path(contentDirectory)], 
        path=Path.joinpath(Path(contentDirectory), name)
    )
    tmx.generateGIDDict()
    tmx.generateMapPropertiesDict()

    layers: list[Tag] = tmx.inputFile.find_all("layer")

    for layer in layers:
        if layer["name"] not in ['Set-Up', 'Main-Event', 'MainEvent']: continue
        key = f'{name}_{layer["name"]}'
        data[key] = []

        layer = typing.cast(Tag, layer)
        # print(f'{name}: {layer["name"]}')

        tiles = layer.text.split(",")

        for i, tile in enumerate(tiles):
            tile = tile.strip()
            if tile == "0":
                continue
            if '\n' in tile:
                tile = tile.split('\n')[0].strip()

            tileInfo = tmx.tiles[tile]
            if (tileInfo['src'] != 'characterSheet'): continue

            mapx = int(i % int(layer['width'])) #type: ignore
            mapy = int(i / int(layer['width'])) #type: ignore

            obj = {
                "displayName": CHARACTER_SHEET_IDS[tileInfo["y"]][tileInfo["x"]],
                "internalID": CHARACTER_SHEET_IDS[tileInfo["y"]][tileInfo["x"]],
                "modUniqueID": "Vanilla",
                "modDisplayName": "Vanilla",
                "image": f"/sprites/{CHARACTER_SHEET_IDS[tileInfo['y']][tileInfo['x']]}.png",
                "tileX": mapx,
                "tileY": mapy,
            }

            data[key].append(obj)

            print(f'{name}->{layer["name"]}: {CHARACTER_SHEET_IDS[tileInfo["y"]][tileInfo["x"]]} @ x/y {mapx}/{mapy}')

open('vanilla-festivals.json', 'w').write(json.dumps(data, indent=4))