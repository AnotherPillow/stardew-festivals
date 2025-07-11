import csvtojson from 'csvtojson'

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

const festivalIdsToNames = {
    'Vanilla': 'Vanilla',
    '7thAxis.LitD': 'Lurking in the Dark',
    'Rafseazz.RSVCP': 'Ridgeside Village',
    'BaldursVillage.BVCP': "Baldur's Village",
    'bigsquishy97.Daulton': "Daulton and Maple",
    'Rexstrife20.MineralTownCP': "Mineral Town",
    'Lumisteria.MtVapius': "Visit Mount Vapius",
    'Lilaoliu.RedPandaBazaar': "Red Panda Bazaar",
    'LemurKat.EastScarpe.CP': "East Scarp",
    'LemurKat.Mr.Ginger.NPC': "Mr. Ginger",
    'LemurKat.JulietHouse.NPC': "Jessie & Juliet",
    'Lemurkat.NPCJasper': "Professor Jasper Thomas",
    'ichortower.HatMouseLacey': "Hat Mouse Lacy",
    'FlashShifter.StardewValleyExpandedCP': "Stardew Valley Expanded",
    'Fellowclown.PC': "Passerby Cemetary",
    'EastScarp.FGES': "Fieval Goes East Scarp",
    'Arknir.Jonghyuk': "Jonghyuk and Spanner",
    'skellady.SBVCP': "Sunberry Village",
    'Feliciano': "Feliciano the Werewolf",
    'fire.OpenFire': "Custom NPC - Openfire",
    'Chiko.Alune1.6': "New NPC Alune",
    'AndrewJC.CoalPointFarm': "Coal Point Farm",
    'Bagi.Nora.CP': "Nora the Herpetologist",
    'Adaire.Aymeric': "Aymeric de Borel - FFXIV",
    'YenaLoomer.CutCharacters': "Cut Characters (Beta Release)",
    'vickylchq.Lumen': "New NPC - Lumen from Arknights",
    'TheFrenchDodo.WWWA': "Creative Differences - NPC Rodney",
    'tiakall.jortsandjean': "Jorts and Jean the helper Cats",
    'TenebrousNova.EliDylan.CP': "Eli and Dylan - Custom NPCs for East Scarp",
    'SoftPandaBoi.CPAlecRevisited': "Alec Revisited",
    'SauriConservationintheValley': "Conservation in the Valley",
    'ritzygen.gabrielmod': "Custom NPC Gabriel Mod",
    'Lex.Sydney': "Sydney - A Custom NPC",
    'Kawaillusion.EyjafjallaForYou': "Eyjafjalla to the Farm",
    'Lavender.Nagito': "Nagito",
    'jkkps.quinn': "Jakk's Quinn",
    'Jiusui.jiu': "Add New NPC Jiu",
    'invatorzen.AspenCP': "Aspen - New Custom Dateable NPC",
    'Himetarts.ARV.CP': "Always Raining in the Valley",
    'HaruNesukts.DesertExpansionCP': "Desert Expansion",
    'handwrittenhello.dbda': "Dead Boy Detectives",
    'FuzzyMittens.Toshinori': "Toshinori Yagi",
    'Foxtail.AmonMod': "Custom NPC Amon",
    'Fernandtea.NewNPCWilford': "Wilford - New Custom NPC",
    'Erevendi.Eruri': "Eruri - Erwin Smith and Levi Ackerman",
    'EmpressKimi.Zoro': "Custom NPC - Roronoa Zoro",
    'Cursedcure.SatoruGojoNPC': "Satoru Gojo NPC",
    'ConsciouslyLazy.SVTNiki': "Meet Niki - A Stardew Valley Tribune Journalist",
    'Chiko.Lorence1.6': "New NPC lorence",
    'BURAKMESE.SKE': "Stardew Kids Expansion",
    'CC.Taro': "Ranger Taro - Custom NPC",
    'atelier99.LaniCC': "Lani - Custom NPC for Sunberry Village",
    'AndrewJC.APelicanTown': "A Pelican Town",
    'Airyn.Dao.CP': "Dao - Custom Npc for Sunberry Village",
    'Adelaide.Magpie1.6': "New NPC Magpie 1.6",
    'yujis-hat.heiansukuna': "Ryomen Sukuna NPC - Jujutsu Kaisen",
    'YujisHat.Sukuna': "Ryomen Sukuna NPC - Jujutsu Kaisen",
    'yujihat.higuruma': "Higuruma Hiromi NPC - Jujutsu Kaisen",
    'woshi.Jane': "Jane - Custom NPC",
    'VoidWitchCult.CP.TheFishmongerNPC': "The Fishmonger - Custom NPC",
    'Wem.Peeta': "Peeta Mellark NPC - Life After Panem",
    'Visorlights.EmetSelchCustomNPC': "Emet-Selch - Custom NPC",
    'tottlesfarm.fleurine': "Once Upon a Fleurine - Custom NPC",
    'Tikamin557.CP.MikuModPlus': "Miku Mod Plus",
    'tiakall.wren': "Wren the Plumber - Custom NPC for Sunberry Village",
    'StrojvedouciDenis.Eleanor': "NPC Eleanor",
    'Squeaks.MGC.CP': "Metalcore Goes Cottagecore",
    'SOLAIRE.doudz': "Solaire of Astora",
    'FurryTale.Pauline': "Pauline - Custom NPC",
    'yuki9977.LuRen': "NPC-LuRen",
    'Goldenglow': "Goldenglow",
    'hanbweh.SuguruNPC': "Geto Suguru Custom NPC",
    'Krayon4k.Matthew1.6': "New NPC Matthew 1.6",
    'LittlePippi.Erwin': "Erwin Smith - NPC - Attack on Titan",
    'LittlePippi.Levi': "Levi Ackerman - NPC - Attack on Titan",
    'LP.Figg1.6': "New NPC Figg 1.6",
    'MadDog.HashtagBearFam': "Bear Family Custom NPCs",
    'RaffieJohn.Reyla_ES': "NPC Reyla",
    'Papaya.ShikoTakahashi': "Shiko - New Custom NPC",
    'Rinser.Sunny.New': "New Custom NPC-Sunny",
    'Shiiteyan.Caleb': "Interactive NPC - Caleb",
    'SapieEugeneEnglish': "Eugene NPC - English Translation (1.6 and SVE Ready)",
    'shuki.Thurstan1.6': "New NPC Thurstan 1.6",
    'SuanNi': "SuanNi-Custom NPC",
    'teanopi.TeaNPC': "Tea - Custom NPC",
    'New.Carnelian1.6': "New NPC Carnelian 1.6",
    'F1F4.F1F4Gift': "F1F4's Anniversary Gift",
    'sapphicsaph_casper': "Casper And The Box - Custom NPC",
    'Yuyu.Masahi': "Chinese translation of Masahi (may not be original source?)",
    'Clara.Ripley': "Ripley the Farmer - Custom NPC for Sunberry Village",
    'dreamy.kickitspot': "Cape Stardew",
    'Halostar.Sylusmod': "Sylus stardew NPC (LADS)",
    'kArmag0re.Akaza': "Akaza NPC - Demon Slayer",
    'milina.Tantei': "Custom NPC add - Tantei _1.6 Compatible",
    'Wildflour.SASS': "Rose and the Alchemist - Custom NPCs for Sunberry Village",
    'annachibi.SorrenNPC': "Sorren - Original NPC",
    'Arknir.Lucikiel': "Lucikiel - New Custom NPC (King's Raid)",
    'balverine.autumnnpc': "Leif - New Gotoran NPC",
    'BexTX.MandoNPC': "Mandalorian and Baby Yoda NPCs",
    'Evellyn.Uriell': "Custom NPC Uriell",
    'fire.Belos1.6': "New NPC Belos 1.6",
    'Ginnyclaire.PaulNPC': "Paul the Optometrist (1.6)",
    'hana.shinazugawa': "Demon Slayer - Kyojuro Sanemi and Genya",
    'LLL.YuBuwang.New': "New NPC BuwangYu 1.6",
    'CC.Koda.Platonic': "Unknown",
    'MidnightRose.PM': "Unknown",
    'Miihau.CatBoy': "Miihau's CatBoy NPC - The NinoKito Mod",
    'Jyangnam.Wellwick': "'Prophet' Wellwick",
    'k80chimaera.CinderCircle': "Cindersnap Circle",
    'krypt.SuguruNPC': "Suguru Geto NPC (Jujutsu Kaisen)",
    'LatteHoln.EnyaCatSith': "Enya the CatSith - A Small Expansion Mod",
    'Isaiahmod.velocityissin': "Custom NPC Isaiah",
    'Luoxue.npc': "Custom NPC Snow",
    'lusif1.BeansNPC': "Beans The Loveable NPC",
    'MIDI.Blanche': "Blanche - The librarian Custom NPC",
    'malic.cp.jadeNPC': "Jade - Custom NPC (1.6)",
    'MrMrRogers.Richie': "Richie - New Custom NPC",
    'OurpleKay.ChosoJJkNPC': "Choso Custom NPC (Jujutsu Kaisen)",
    'OurpleKay.NanamiJJkNPC': "Nanami Custom NPC (Jujutsu Kaisen)",
    'Rafseazz.LunnaCP': "Lunna - Astray in Stardew Valley",
    'Rumi.BoothnClem_mod': "Boothill Honkai Star Rail Mod",
    'thatotterthing.Biscuit': "Biscuit the Puppy- NPC",
    'yujihat.yuji': "Itadori Yuji NPC - Jujutsu Kaisen",
    'Chiko.Rydell1.6': "New NPC Rydell",
    'hakydaki.HakanNPC': "Hakan NPC - Furry Wolfman",
    'Loonimae.TogeInumakiNPC': "Toge Inumaki NPC Jujutsu Kaisen",
    'rikai.Cotton': "Cotton the sweetest shopkeeper (maybe?)",
    'SYS.AB': "Abandoned Bride - Custom NPC",
    'SYS.mike': "College Boy Mike - Custom NPC",
    'TheLimeyDragon.Ayeisha': "Ayeisha - The Postal Worker (Custom NPC)",
    'N3cro_92.KidsfortheSchool': "Kids for the School",
    'DN.SnS': "Sword and Sorcery - A Fantasy Expansion for East Scarp",
    'ritzygen.adventurersguildextrashop': "Adventurer's Guild Extra Shop",
    'sdvhead.LawAndOrderSV': "Law and Order SV",
    'NPC.Cain1.6': "New NPC Cain and Nightcat 1.6",
}

;(async function() {
    const csv = (await Bun.file('scarlett.csv').text())
    const json = await csvtojson().fromString(csv)
    // console.log(json[1])

    const festivals: Record<string, TileNPC[]> = {
        eggfestival_setup: [],
        eggfestival_mainevent: [],
        eggfestival_setup_y2: [],
        eggfestival_mainevent_y2: [],
        eggfestival_setup_sve: [],
        eggfestival_mainevent_sve: [],
        eggfestival_setup_y2_sve: [],
        eggfestival_mainevent_y2_sve: [],
        
        flowerdance_setup: [],
        flowerdance_mainevent: [],
        flowerdance_setup_y2: [],
        flowerdance_mainevent_y2: [],
        flowerdance_setup_sve: [],
        flowerdance_mainevent_sve: [],
        flowerdance_setup_y2_sve: [],
        flowerdance_mainevent_y2_sve: [],
        
        moonlightjellies_setup: [],
        moonlightjellies_setup_y2: [],
        moonlightjellies_setup_sve: [],
        moonlightjellies_setup_y2_sve: [],

        svfair_setup: [],
        svfair_setup_y2: [],
        svfair_setup_sve: [],
        svfair_setup_y2_sve: [],
        
        spiriteve_setup: [],
        spiriteve_setup_y2: [],
        spiriteve_setup_sve: [],
        spiriteve_setup_y2_sve: [],
        
        icefestival_setup: [],
        icefestival_mainevent: [],
        icefestival_setup_sve: [],
        icefestival_mainevent_sve: [],

        winterstar_setup: [],
        winterstar_setup_y2: [],
        winterstar_setup_sve: [],
        winterstar_setup_y2_sve: [],
        
        luau_setup: [],
        luau_mainevent: [],
        luau_setup_y2: [],
        luau_mainevent_y2: [],
        luau_setup_sve: [],
        luau_mainevent_sve: [],
        luau_setup_y2_sve: [],
        luau_mainevent_y2_sve: [],
        
        moonlightjellies_mainevent: [],
        moonlightjellies_mainevent_sve: [],
        moonlightjellies_mainevent_y2: [],
        moonlightjellies_mainevent_y2_sve: [],
        
        icefestival_setup_y2: [],
        icefestival_mainevent_y2: [],
        icefestival_setup_y2_sve: [],
        icefestival_mainevent_y2_sve: [],

        gathering_setup: [],
        gathering_mainevent: [],
        gathering_setup_y2: [],
        gathering_mainevent_y2: [],
        
        embers_setup: [],
        embers_mainevent: [],
        embers_setup_y2: [],
        embers_mainevent_y2: [],

        spiriteve_mainevent: [],
        spiriteve_mainevent_y2: [],
        spiriteve_mainevent_sve: [],
        spiriteve_mainevent_y2_sve: [],

        winterstar_mainevent: [],
        winterstar_mainevent_y2: [],
        winterstar_mainevent_sve: [],
        winterstar_mainevent_y2_sve: [],

    }

    // for (const row of csv.slice(1)) {
    //     const parts = row.split(',')

        
    // }
    for (const npc of json) {
        for (const key of Object.keys(festivals)) {
            if (npc[key]) {
                const pos = npc[key].split(' ').map(e => Number(e))
                festivals[key].push({
                    displayName: npc['Display Name'],
                    internalID: npc['Internal Name'],
                    modUniqueID: npc['modid'],
                    modDisplayName: festivalIdsToNames[npc['modid']] ?? `${npc['modid']} (no name specified)`,
                    image: `/sprites/${npc['Internal Name']}.png`,
                    tileX: pos[0],
                    tileY: pos[1],
                })
            }
        }
    }

    await Bun.file('festivals.json').write(JSON.stringify(festivals, null, 4))
})()