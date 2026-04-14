const boxesWordMapping = {

    // ── Flying High (Words 1–15) ──────────────────────────────────────────────

    'the': { sounds: ['th','e'], colors: ['#ffffffff','#ffffffff'] },
    'see': { sounds: ['s','ee'], colors: ['#ffffffff','#ffffffff'] },
    'his': { sounds: ['h','i','s'], colors: ['#ffffffff','#ffffffff','#ffffffff'] },
    'to': { sounds: ['th','or'], colors: ['#ffffffff','#ffffffff'] },
    'of': { sounds: ['o','f'], colors: ['#ffffffff','#ffffffff'] },
    'and': { sounds: ['a','n','d'], colors: ['#ffffffff','#ffffffff','#ffffffff'] },
    'a': { sounds: ['a'], colors: ['#ffffffff'] },
    'you': { sounds: ['y','ou'], colors: ['#ffffffff','#ffffffff'] },
    'said': { sounds: ['s','ai','d'], colors: ['#ffffffff','#ffffffff','#ffffffff'] },
    'for': { sounds: ['f','or'], colors: ['#ffffffff','#ffffffff'] },
    'go': { sounds: ['g','o'], colors: ['#ffffffff','#ffffffff'] },
    'he': { sounds: ['h','e'], colors: ['#ffffffff','#ffffffff'] },
    'as': { sounds: ['a','s'], colors: ['#ffffffff','#ffffffff'] },
    'was': { sounds: ['w','ai','s'], colors: ['#ffffffff','#ffffffff','#ffffffff'] },
    'are': { sounds: ['are'], colors: ['#ffffffff'] },

    // ── Sunny Island (Words 16–31) ────────────────────────────────────────────

    'is': { sounds: ['i','s'], colors: ['#ffffffff','#ffffffff'] },
    'my': { sounds: ['m','y'], colors: ['#ffffffff','#ffffffff'] },
    'me': { sounds: ['m','e'], colors: ['#ffffffff','#ffffffff'] },
    'we': { sounds: ['w','e'], colors: ['#ffffffff','#ffffffff'] },
    'say': { sounds: ['s','ay'], colors: ['#ffffffff','#ffffffff'] },
    'come': { sounds: ['c','o','me'], colors: ['#ffffffff','#ffffffff','#ffffffff'] },
    'has': { sounds: ['h','a','s'], colors: ['#ffffffff','#ffffffff','#ffffffff'] },
    'they': { sounds: ['th','ey'], colors: ['#ffffffff','#ffffffff'] },
    'where': { sounds: ['wh','ere'], colors: ['#ffffffff','#ffffffff'] },
    'have': { sounds: ['h','a','ve'], colors: ['#ffffffff','#ffffffff','#ffffffff'] },
    'away': { sounds: ['a','w','ay'], colors: ['#ffffffff','#ffffffff','#ffffffff'] },
    'what': { sounds: ['wh','a','t'], colors: ['#ffffffff','#ffffffff','#ffffffff'] },
    'from': { sounds: ['f','r','o','m'], colors: ['#ffffffff','#ffffffff','#ffffffff','#ffffffff'] },
    'by': { sounds: ['b','y'], colors: ['#ffffffff','#ffffffff'] },
    'find': { sounds: ['f','ind'], colors: ['#ffffffff','#ffffffff'] },
    'funny': { sounds: ['f','u','nn','y'], colors: ['#ffffffff','#ffffffff','#ffffffff','#ffffffff'] },

    // ── Springtime Fun (Words 32–46) ──────────────────────────────────────────

    'blue': { sounds: ['b','l','ue'], colors: ['#ffffffff','#ffffffff','#ffffffff'] },
    'yellow': { sounds: ['y','e','ll','ow'], colors: ['#ffffffff','#ffffffff','#ffffffff','#ffffffff'] },
    'green': { sounds: ['g','r','ee','n'], colors: ['#ffffffff','#ffffffff','#ffffffff','#ffffffff'] },
    'purple': { sounds: ['p','ur','p','le'], colors: ['#ffffffff','#ffffffff','#ffffffff','#ffffffff'] },
    'pink': { sounds: ['p','ink'], colors: ['#ffffffff','#ffffffff'] },
    'white': { sounds: ['wh','i','te'], colors: ['#ffffffff','#ffffffff','#ffffffff'] },
    'black': { sounds: ['b','l','a','ck'], colors: ['#ffffffff','#ffffffff','#ffffffff','#ffffffff'] },
    'one': { sounds: ['one'], colors: ['#ffffffff'] },
    'two': { sounds: ['tw','o'], colors: ['#ffffffff','#ffffffff'] },
    'three': { sounds: ['th','r','ee'], colors: ['#ffffffff','#ffffffff','#ffffffff'] },
    'four': { sounds: ['f','our'], colors: ['#ffffffff','#ffffffff'] },
    'five': { sounds: ['f','i','ve'], colors: ['#ffffffff','#ffffffff','#ffffffff'] },
    'seven': { sounds: ['s','e','v','en'], colors: ['#ffffffff','#ffffffff','#ffffffff','#ffffffff'] },
    'eight': { sounds: ['eigh','t'], colors: ['#ffffffff','#ffffffff'] },
    'nine': { sounds: ['n','i','ne'], colors: ['#ffffffff','#ffffffff','#ffffffff'] },

    // ── Alien Adventures (Words 47–61) ────────────────────────────────────────

    'all': { sounds: ['all'], colors: ['#ffffffff'] },
    'look': { sounds: ['l','oo','k'], colors: ['#ffffffff','#ffffffff','#ffffffff'] },
    'little': { sounds: ['l','i','tt','le'], colors: ['#ffffffff','#ffffffff','#ffffffff','#ffffffff'] },
    'were': { sounds: ['w','ere'], colors: ['#ffffffff','#ffffffff'] },
    'your': { sounds: ['y','our'], colors: ['#ffffffff','#ffffffff'] },
    'down': { sounds: ['d','ow','n'], colors: ['#ffffffff','#ffffffff','#ffffffff'] },
    'there': { sounds: ['th','ere'], colors: ['#ffffffff','#ffffffff'] },
    'do': { sounds: ['d','o'], colors: ['#ffffffff','#ffffffff'] },
    'their': { sounds: ['th','eir'], colors: ['#ffffffff','#ffffffff'] },
    'here': { sounds: ['h','ere'], colors: ['#ffffffff','#ffffffff'] },
    'other': { sounds: ['o','th','er'], colors: ['#ffffffff','#ffffffff','#ffffffff'] },
    'about': { sounds: ['a','b','ou','t'], colors: ['#ffffffff','#ffffffff','#ffffffff','#ffffffff'] },
    'want': { sounds: ['w','a','n','t'], colors: ['#ffffffff','#ffffffff','#ffffffff','#ffffffff'] },
    'too': { sounds: ['t','oo'], colors: ['#ffffffff','#ffffffff'] },
    'many': { sounds: ['m','a','n','y'], colors: ['#ffffffff','#ffffffff','#ffffffff','#ffffffff'] },

    // ── Outer Space (Words 62–76) ─────────────────────────────────────────────

    'some': { sounds: ['s','o','me'], colors: ['#ffffffff','#ffffffff','#ffffffff'] },
    'pretty': { sounds: ['p','r','e','tt','y'], colors: ['#ffffffff','#ffffffff','#ffffffff','#ffffffff','#ffffffff'] },
    'would': { sounds: ['w','ould'], colors: ['#ffffffff','#ffffffff'] },
    'into': { sounds: ['i','n','t','ow'], colors: ['#ffffffff','#ffffffff','#ffffffff','#ffffffff'] },
    'saw': { sounds: ['s','aw'], colors: ['#ffffffff','#ffffffff'] },
    'more': { sounds: ['m','ore'], colors: ['#ffffffff','#ffffffff'] },
    'write': { sounds: ['wr','i','te'], colors: ['#ffffffff','#ffffffff','#ffffffff'] },
    'who': { sounds: ['who'], colors: ['#ffffffff'] },
    'new': { sounds: ['n','ew'], colors: ['#ffffffff','#ffffffff'] },
    'under': { sounds: ['u','n','d','er'], colors: ['#ffffffff','#ffffffff','#ffffffff','#ffffffff'] },
    'could': { sounds: ['c','ould'], colors: ['#ffffffff','#ffffffff'] },
    'walk': { sounds: ['w','alk'], colors: ['#ffffffff','#ffffffff'] },
    'again': { sounds: ['a','g','ai','n'], colors: ['#ffffffff','#ffffffff','#ffffffff','#ffffffff'] },
    'soon': { sounds: ['s','oo','n'], colors: ['#ffffffff','#ffffffff','#ffffffff'] },
    'people': { sounds: ['p','eo','p','le'], colors: ['#ffffffff','#ffffffff','#ffffffff','#ffffffff'] },

    // ── Planets and Beyond (Words 77–91) ──────────────────────────────────────

    'please': { sounds: ['p','l','ea','se'], colors: ['#ffffffff','#ffffffff','#ffffffff','#ffffffff'] },
    'her': { sounds: ['h','er'], colors: ['#ffffffff','#ffffffff'] },
    'water': { sounds: ['w','a','t','er'], colors: ['#ffffffff','#ffffffff','#ffffffff','#ffffffff'] },
    'been': { sounds: ['b','ee','n'], colors: ['#ffffffff','#ffffffff','#ffffffff'] },
    'our': { sounds: ['ou','r'], colors: ['#ffffffff','#ffffffff'] },
    'called': { sounds: ['c','a','d'], colors: ['#ffffffff','#ffffffff','#ffffffff'] },
    'ask': { sounds: ['a','s','k'], colors: ['#ffffffff','#ffffffff','#ffffffff'] },
    'any': { sounds: ['a','n','y'], colors: ['#ffffffff','#ffffffff','#ffffffff'] },
    'long': { sounds: ['l','ong'], colors: ['#ffffffff','#ffffffff'] },
    'know': { sounds: ['kn','ow'], colors: ['#ffffffff','#ffffffff'] },
    'put': { sounds: ['p','u','t'], colors: ['#ffffffff','#ffffffff','#ffffffff'] },
    'every': { sounds: ['e','v','er','y'], colors: ['#ffffffff','#ffffffff','#ffffffff','#ffffffff'] },
    'think': { sounds: ['th','ink'], colors: ['#ffffffff','#ffffffff'] },
    'why': { sounds: ['wh','y'], colors: ['#ffffffff','#ffffffff'] },
    'give': { sounds: ['g','i','ve'], colors: ['#ffffffff','#ffffffff','#ffffffff'] },

    // ── Diving Deep (Words 92–100) ────────────────────────────────────────────

    'once': { sounds: ['once'], colors: ['#ffffffff'] },
    'live': { sounds: ['l','i','ve'], colors: ['#ffffffff','#ffffffff','#ffffffff'] },
    'thank': { sounds: ['th','ank'], colors: ['#ffffffff','#ffffffff'] },
    'should': { sounds: ['sh','ould'], colors: ['#ffffffff','#ffffffff'] },
    'very': { sounds: ['v','er','y'], colors: ['#ffffffff','#ffffffff','#ffffffff'] },
    'wash': { sounds: ['w','a','sh'], colors: ['#ffffffff','#ffffffff','#ffffffff'] },
    'does': { sounds: ['d','oe','z'], colors: ['#ffffffff','#ffffffff','#ffffffff'] },
    'warm': { sounds: ['w','ar','m'], colors: ['#ffffffff','#ffffffff','#ffffffff'] },
    'work': { sounds: ['w','or','k'], colors: ['#ffffffff','#ffffffff','#ffffffff'] },
};

export default boxesWordMapping;