//Check for ablity to use look behind
let isLookBehindSupported = false;
try {
  new RegExp("(?<=)");
  isLookBehindSupported = true;
} catch (err) {
  console.log('This browser sucks at look behind: '+err);
}

//List of irregular verbs that have to be parsed through for lemmatization
const irregular_verbs = [
    {
      "lemma": "argue",
      "SVA": "argues",
      "past": "argued",
      "participle": "argued",
      "continuous": "arguing"
    },
    {
      "lemma": "arise",
      "SVA": "arises",
      "past": "arose",
      "participle": "arisen",
      "continuous": "arising"
    },
    {
      "lemma": "awake",
      "SVA": "awakes",
      "past": "awoke",
      "participle": "awoken",
      "continuous": "awakening"
    },
    {
      "lemma": "bear",
      "SVA": "bears",
      "past": "bore",
      "participle": "born",
      "continuous": "bearing"
    },
    {
      "lemma": "beat",
      "SVA": "beats",
      "past": "beated",
      "participle": "beaten",
      "continuous": "beating"
    },
    {
      "lemma": "become",
      "SVA": "becomes",
      "past": "became",
      "participle": "become",
      "continuous": "becomeing"
    },
    {
      "lemma": "begin",
      "SVA": "begins",
      "past": "began",
      "participle": "begun",
      "continuous": "beginning"
    },
    {
      "lemma": "bend",
      "SVA": "bends",
      "past": "bended",
      "participle": "bent",
      "continuous": "bending"
    },
    {
      "lemma": "bind",
      "SVA": "binds",
      "past": "bound",
      "participle": "bound",
      "continuous": "binding"
    },
    {
      "lemma": "bite",
      "SVA": "bites",
      "past": "bit",
      "participle": "bitten",
      "continuous": "biting"
    },
    {
      "lemma": "bleed",
      "SVA": "bleeds",
      "past": "bled",
      "participle": "bled",
      "continuous": "bleeding"
    },
    {
      "lemma": "blow",
      "SVA": "blows",
      "past": "blew",
      "participle": "blown",
      "continuous": "blowing"
    },
    {
      "lemma": "break",
      "SVA": "breaks",
      "past": "broke",
      "participle": "broken",
      "continuous": "breaking"
    },
    {
      "lemma": "breed",
      "SVA": "breeds",
      "past": "breeded",
      "participle": "bred",
      "continuous": "breeding"
    },
    {
      "lemma": "bring",
      "SVA": "brings",
      "past": "brought",
      "participle": "brought",
      "continuous": "bringing"
    },
    {
      "lemma": "build",
      "SVA": "builds",
      "past": "built",
      "participle": "built",
      "continuous": "building"
    },
    {
      "lemma": "burn",
      "SVA": "burns",
      "past": "burned",
      "participle": "burnt",
      "continuous": "burning"
    },
    {
      "lemma": "buy",
      "SVA": "buys",
      "past": "bought",
      "participle": "bought",
      "continuous": "buying"
    },
    {
      "lemma": "catch",
      "SVA": "catchs",
      "past": "caught",
      "participle": "caught",
      "continuous": "catching"
    },
    {
      "lemma": "choose",
      "SVA": "chooses",
      "past": "chose",
      "participle": "chosen",
      "continuous": "choosing"
    },
    {
      "lemma": "cling",
      "SVA": "clings",
      "past": "clinged",
      "participle": "clung",
      "continuous": "clinging"
    },
    {
      "lemma": "come",
      "SVA": "comes",
      "past": "came",
      "participle": "came",
      "continuous": "coming"
    },
    {
      "lemma": "creep",
      "SVA": "creeps",
      "past": "crept",
      "participle": "crept",
      "continuous": "creeping"
    },
    {
      "lemma": "deal",
      "SVA": "deals",
      "past": "dealt",
      "participle": "dealt",
      "continuous": "dealing"
    },
    {
      "lemma": "die",
      "SVA": "dies",
      "past": "died",
      "participle": "died",
      "continuous": "dying"
    },
    {
      "lemma": "dig",
      "SVA": "digs",
      "past": "dug",
      "participle": "dug",
      "continuous": "diging"
    },
    {
      "lemma": "do",
      "SVA": "does",
      "past": "did",
      "participle": "done",
      "continuous": "doing"
    },
    {
      "lemma": "draw",
      "SVA": "draws",
      "past": "drew",
      "participle": "drawn",
      "continuous": "drawing"
    },
    {
      "lemma": "dream",
      "SVA": "dreams",
      "past": "dreamt",
      "participle": "dreamed",
      "continuous": "dreaming"
    },
    {
      "lemma": "drink",
      "SVA": "drinks",
      "past": "drank",
      "participle": "drunk",
      "continuous": "drinking"
    },
    {
      "lemma": "drive",
      "SVA": "drives",
      "past": "drove",
      "participle": "driven",
      "continuous": "driving"
    },
    {
      "lemma": "eat",
      "SVA": "eats",
      "past": "ate",
      "participle": "eaten",
      "continuous": "eating"
    },
    {
      "lemma": "fall",
      "SVA": "falls",
      "past": "fell",
      "participle": "fallen",
      "continuous": "falling"
    },
    {
      "lemma": "feed",
      "SVA": "feeds",
      "past": "fed",
      "participle": "fed",
      "continuous": "feeding"
    },
    {
      "lemma": "feel",
      "SVA": "feels",
      "past": "felt",
      "participle": "felt",
      "continuous": "feeling"
    },
    {
      "lemma": "fight",
      "SVA": "fights",
      "past": "fought",
      "participle": "fought",
      "continuous": "fighting"
    },
    {
      "lemma": "find",
      "SVA": "finds",
      "past": "found",
      "participle": "found",
      "continuous": "finding"
    },
    {
      "lemma": "fly",
      "SVA": "flys",
      "past": "flew",
      "participle": "flown",
      "continuous": "flying"
    },
    {
      "lemma": "forbid",
      "SVA": "forbids",
      "past": "forbade",
      "participle": "forbidden",
      "continuous": "forbidding"
    },
    {
      "lemma": "forget",
      "SVA": "forgets",
      "past": "forgot",
      "participle": "forgotten",
      "continuous": "forgetting"
    },
    {
      "lemma": "forgive",
      "SVA": "forgives",
      "past": "forgave",
      "participle": "forgiven",
      "continuous": "forgiving"
    },
    {
      "lemma": "freeze",
      "SVA": "freezes",
      "past": "froze",
      "participle": "frozen",
      "continuous": "freezing"
    },
    {
      "lemma": "get",
      "SVA": "gets",
      "past": "got",
      "participle": "got",
      "continuous": "geting"
    },
    {
      "lemma": "give",
      "SVA": "gives",
      "past": "gave",
      "participle": "given",
      "continuous": "giving"
    },
    {
      "lemma": "go",
      "SVA": "goes",
      "past": "went",
      "participle": "gone",
      "continuous": "going"
    },
    {
      "lemma": "grind",
      "SVA": "grinds",
      "past": "grinded",
      "participle": "ground",
      "continuous": "grinding"
    },
    {
      "lemma": "grow",
      "SVA": "grows",
      "past": "grew",
      "participle": "grown",
      "continuous": "growing"
    },
    {
      "lemma": "hang",
      "SVA": "hangs",
      "past": "hanged",
      "participle": "hung",
      "continuous": "hanging"
    },
    {
      "lemma": "have",
      "SVA": "has",
      "past": "had",
      "participle": "had",
      "continuous": "having"
    },
    {
      "lemma": "hear",
      "SVA": "hears",
      "past": "heard",
      "participle": "heard",
      "continuous": "hearing"
    },
    {
      "lemma": "hide",
      "SVA": "hides",
      "past": "hid",
      "participle": "hidden",
      "continuous": "hiding"
    },
    {
      "lemma": "hold",
      "SVA": "holds",
      "past": "held",
      "participle": "held",
      "continuous": "holding"
    },
    {
      "lemma": "keep",
      "SVA": "keeps",
      "past": "kept",
      "participle": "kept",
      "continuous": "keeping"
    },
    {
      "lemma": "kneel",
      "SVA": "kneels",
      "past": "kneeled",
      "participle": "knelt",
      "continuous": "kneeling"
    },
    {
      "lemma": "know",
      "SVA": "knows",
      "past": "knew",
      "participle": "known",
      "continuous": "knowing"
    },
    {
      "lemma": "lay",
      "SVA": "lays",
      "past": "layed",
      "participle": "laid",
      "continuous": "laying"
    },
    {
      "lemma": "lie",
      "SVA": "lies",
      "past": "lied",
      "participle": "lied",
      "continuous": "lying"
    },
    {
      "lemma": "lead",
      "SVA": "leads",
      "past": "led",
      "participle": "led",
      "continuous": "leading"
    },
    {
      "lemma": "lean",
      "SVA": "leans",
      "past": "leaned",
      "participle": "leaned",
      "continuous": "leaning"
    },
    {
      "lemma": "leap",
      "SVA": "leaps",
      "past": "leapt",
      "participle": "leaped",
      "continuous": "leaping"
    },
    {
      "lemma": "learn",
      "SVA": "learns",
      "past": "learned",
      "participle": "learnt",
      "continuous": "learning"
    },
    {
      "lemma": "leave",
      "SVA": "leaves",
      "past": "left",
      "participle": "left",
      "continuous": "leaving"
    },
    {
      "lemma": "lend",
      "SVA": "lends",
      "past": "lended",
      "participle": "lent",
      "continuous": "lending"
    },
    {
      "lemma": "lie",
      "SVA": "lies",
      "past": "lay",
      "participle": "lain",
      "continuous": "lying"
    },
    {
      "lemma": "light",
      "SVA": "lights",
      "past": "lighted",
      "participle": "lit",
      "continuous": "lighting"
    },
    {
      "lemma": "lose",
      "SVA": "loses",
      "past": "lost",
      "participle": "lost",
      "continuous": "losing"
    },
    {
      "lemma": "make",
      "SVA": "makes",
      "past": "made",
      "participle": "made",
      "continuous": "making"
    },
    {
      "lemma": "mean",
      "SVA": "means",
      "past": "meant",
      "participle": "meant",
      "continuous": "meaning"
    },
    {
      "lemma": "meet",
      "SVA": "meets",
      "past": "met",
      "participle": "met",
      "continuous": "meeting"
    },
    {
      "lemma": "mow",
      "SVA": "mows",
      "past": "mowed",
      "participle": "mown",
      "continuous": "mowing"
    },
    {
      "lemma": "overtake",
      "SVA": "overtakes",
      "past": "overtook",
      "participle": "overtaken",
      "continuous": "overtakeing"
    },
    {
      "lemma": "pay",
      "SVA": "pays",
      "past": "paid",
      "participle": "paid",
      "continuous": "paying"
    },
    {
      "lemma": "plead",
      "SVA": "pleads",
      "past": "pled",
      "participle": "pleaded",
      "continuous": "pleading"
    },
    {
      "lemma": "rebuild",
      "SVA": "rebuilds",
      "past": "rebuilt",
      "participle": "rebuilt",
      "continuous": "rebuilding"
    },
    {
      "lemma": "rewrite",
      "SVA": "rewrites",
      "past": "rewrote",
      "participle": "rewritten",
      "continuous": "rewriting"
    },
    {
      "lemma": "ride",
      "SVA": "rides",
      "past": "rode",
      "participle": "ridden",
      "continuous": "riding"
    },
    {
      "lemma": "ring",
      "SVA": "rings",
      "past": "rang",
      "participle": "rung",
      "continuous": "ringing"
    },
    {
      "lemma": "rise",
      "SVA": "rises",
      "past": "rose",
      "participle": "risen",
      "continuous": "rising"
    },
    {
      "lemma": "run",
      "SVA": "runs",
      "past": "ran",
      "participle": "run",
      "continuous": "running"
    },
    {
      "lemma": "say",
      "SVA": "says",
      "past": "said",
      "participle": "said",
      "continuous": "saying"
    },
    {
      "lemma": "see",
      "SVA": "sees",
      "past": "saw",
      "participle": "seen",
      "continuous": "seeing"
    },
    {
      "lemma": "seek",
      "SVA": "seeks",
      "past": "sought",
      "participle": "sought",
      "continuous": "seeking"
    },
    {
      "lemma": "sell",
      "SVA": "sells",
      "past": "sold",
      "participle": "sold",
      "continuous": "selling"
    },
    {
      "lemma": "send",
      "SVA": "sends",
      "past": "sent",
      "participle": "sent",
      "continuous": "sending"
    },
    {
      "lemma": "sew",
      "SVA": "sews",
      "past": "sewed",
      "participle": "sewn",
      "continuous": "sewing"
    },
    {
      "lemma": "shake",
      "SVA": "shakes",
      "past": "shook",
      "participle": "shaken",
      "continuous": "shaking"
    },
    {
      "lemma": "shine",
      "SVA": "shines",
      "past": "shined",
      "participle": "shone",
      "continuous": "shining"
    },
    {
      "lemma": "shoot",
      "SVA": "shoots",
      "past": "shot",
      "participle": "shot",
      "continuous": "shooting"
    },
    {
      "lemma": "show",
      "SVA": "shows",
      "past": "showed",
      "participle": "shown",
      "continuous": "showing"
    },
    {
      "lemma": "shrink",
      "SVA": "shrinks",
      "past": "shrank",
      "participle": "shrunk",
      "continuous": "shrinking"
    },
    {
      "lemma": "sing",
      "SVA": "sings",
      "past": "sang",
      "participle": "sung",
      "continuous": "singing"
    },
    {
      "lemma": "sink",
      "SVA": "sinks",
      "past": "sank",
      "participle": "sunk",
      "continuous": "sinking"
    },
    {
      "lemma": "sit",
      "SVA": "sits",
      "past": "sat",
      "participle": "sat",
      "continuous": "sitting"
    },
    {
      "lemma": "sleep",
      "SVA": "sleeps",
      "past": "sleeped",
      "participle": "slept",
      "continuous": "sleeping"
    },
    {
      "lemma": "slide",
      "SVA": "slides",
      "past": "slided",
      "participle": "slid",
      "continuous": "sliding"
    },
    {
      "lemma": "sling",
      "SVA": "slings",
      "past": "slinged",
      "participle": "slung",
      "continuous": "slinging"
    },
    {
      "lemma": "smell",
      "SVA": "smells",
      "past": "smelled",
      "participle": "smelt",
      "continuous": "smelling"
    },
    {
      "lemma": "sow",
      "SVA": "sows",
      "past": "sowed",
      "participle": "sown",
      "continuous": "sowing"
    },
    {
      "lemma": "speak",
      "SVA": "speaks",
      "past": "spoke",
      "participle": "spoken",
      "continuous": "speaking"
    },
    {
      "lemma": "spell",
      "SVA": "spells",
      "past": "spelled",
      "participle": "spelt",
      "continuous": "spelling"
    },
    {
      "lemma": "speed",
      "SVA": "speeds",
      "past": "sped",
      "participle": "sped",
      "continuous": "speeding"
    },
    {
      "lemma": "spend",
      "SVA": "spends",
      "past": "spent",
      "participle": "spent",
      "continuous": "spending"
    },
    {
      "lemma": "spill",
      "SVA": "spills",
      "past": "spilt",
      "participle": "spilled",
      "continuous": "spilling"
    },
    {
      "lemma": "spit",
      "SVA": "spits",
      "past": "spat",
      "participle": "spat",
      "continuous": "spitting"
    },
    {
      "lemma": "spread",
      "SVA": "spreads",
      "past": "spreaded",
      "participle": "spread",
      "continuous": "spreading"
    },
    {
      "lemma": "stand",
      "SVA": "stands",
      "past": "stood",
      "participle": "stood",
      "continuous": "standing"
    },
    {
      "lemma": "steal",
      "SVA": "steals",
      "past": "stole",
      "participle": "stolen",
      "continuous": "stealing"
    },
    {
      "lemma": "stick",
      "SVA": "sticks",
      "past": "stuck",
      "participle": "stuck",
      "continuous": "sticking"
    },
    {
      "lemma": "sting",
      "SVA": "stings",
      "past": "stung",
      "participle": "stung",
      "continuous": "stinging"
    },
    {
      "lemma": "string",
      "SVA": "strings",
      "past": "strang",
      "participle": "strung",
      "continuous": "stringing"
    },
    {
      "lemma": "stink",
      "SVA": "stinks",
      "past": "stank",
      "participle": "stunk",
      "continuous": "stinking"
    },
    {
      "lemma": "strike",
      "SVA": "strikes",
      "past": "struck",
      "participle": "struck",
      "continuous": "strikeing"
    },
    {
      "lemma": "swear",
      "SVA": "swears",
      "past": "swore",
      "participle": "sworn",
      "continuous": "swearing"
    },
    {
      "lemma": "sweep",
      "SVA": "sweeps",
      "past": "sweeped",
      "participle": "swept",
      "continuous": "sweeping"
    },
    {
      "lemma": "swell",
      "SVA": "swells",
      "past": "swelled",
      "participle": "swollen",
      "continuous": "swelling"
    },
    {
      "lemma": "swim",
      "SVA": "swims",
      "past": "swam",
      "participle": "swum",
      "continuous": "swimming"
    },
    {
      "lemma": "swing",
      "SVA": "swings",
      "past": "swung",
      "participle": "swung",
      "continuous": "swinging"
    },
    {
      "lemma": "take",
      "SVA": "takes",
      "past": "took",
      "participle": "taken",
      "continuous": "taking"
    },
    {
      "lemma": "teach",
      "SVA": "teachs",
      "past": "taached",
      "participle": "taught",
      "continuous": "teaching"
    },
    {
      "lemma": "tear",
      "SVA": "tears",
      "past": "tore",
      "participle": "torn",
      "continuous": "tearing"
    },
    {
      "lemma": "tell",
      "SVA": "tells",
      "past": "told",
      "participle": "told",
      "continuous": "telling"
    },
    {
      "lemma": "think",
      "SVA": "thinks",
      "past": "thought",
      "participle": "thought",
      "continuous": "thinking"
    },
    {
      "lemma": "tie",
      "SVA": "ties",
      "past": "tied",
      "participle": "tied",
      "continuous": "tying"
    },
    {
      "lemma": "throw",
      "SVA": "throws",
      "past": "threw",
      "participle": "thrown",
      "continuous": "throwing"
    },
    {
      "lemma": "understand",
      "SVA": "understands",
      "past": "understood",
      "participle": "understood",
      "continuous": "understanding"
    },
    {
      "lemma": "undo",
      "SVA": "undoes",
      "past": "undid",
      "participle": "undone",
      "continuous": "undoing"
    },
    {
      "lemma": "unfreeze",
      "SVA": "unfreezes",
      "past": "unfroze",
      "participle": "unfrozen",
      "continuous": "unfreezing"
    },
    {
      "lemma": "unmake",
      "SVA": "unmakes",
      "past": "unmade",
      "participle": "unmade",
      "continuous": "unmaking"
    },
    {
      "lemma": "unstring",
      "SVA": "unstrings",
      "past": "unstringed",
      "participle": "unstrung",
      "continuous": "unstringing"
    },
    {
      "lemma": "unstick",
      "SVA": "unsticks",
      "past": "unsticked",
      "participle": "unstuck",
      "continuous": "unsticking"
    },
    {
      "lemma": "unwind",
      "SVA": "unwinds",
      "past": "unwinded",
      "participle": "unwound",
      "continuous": "unwinding"
    },
    {
      "lemma": "wake",
      "SVA": "wakes",
      "past": "woke",
      "participle": "woken",
      "continuous": "waking"
    },
    {
      "lemma": "wear",
      "SVA": "wears",
      "past": "wore",
      "participle": "worn",
      "continuous": "wearing"
    },
    {
      "lemma": "weep",
      "SVA": "weeps",
      "past": "wept",
      "participle": "wept",
      "continuous": "weeping"
    },
    {
      "lemma": "win",
      "SVA": "wins",
      "past": "won",
      "participle": "won",
      "continuous": "winning"
    },
    {
      "lemma": "wind",
      "SVA": "winds",
      "past": "winded",
      "participle": "wound",
      "continuous": "willing"
    },
    {
      "lemma": "write",
      "SVA": "writes",
      "past": "wrote",
      "participle": "written",
      "continuous": "writing"
    },
    {
      "lemma": "can",
      "SVA": "can",
      "past": "could",
      "participle": "could",
      "continuous": "can"
    },
    {
      "lemma": "shall",
      "SVA": "shall",
      "past": "should",
      "participle": "should",
      "continuous": "should"
    },
    {
      "lemma": "will",
      "SVA": "will",
      "past": "would",
      "participle": "would",
      "continuous": "willing"
    },
    {
      "lemma": "wreak",
      "SVA": "wreaks",
      "past": "wreaked",
      "participle": "wrought",
      "continuous": "wreaking"
    }
];

//Irregular plurals that have to be parsed through for lemmatization
const irregular_plurals = [
      {
        "base": "addendum",
        "weirdo": "addenda"
      },
      {
        "base": "alumna",
        "weirdo": "alumnae"
      },
      {
        "base": "alumnus",
        "weirdo": "alumni"
      },
      {
        "base": "analysis",
        "weirdo": "analyses"
      },
      {
        "base": "antenna",
        "weirdo": "antennae"
      },
      {
        "base": "antithesis",
        "weirdo": "antitheses"
      },
      {
        "base": "apex",
        "weirdo": "apices"
      },
      {
        "base": "appendix",
        "weirdo": "appendices"
      },
      {
        "base": "bacillus",
        "weirdo": "bacilli"
      },
      {
        "base": "bacterium",
        "weirdo": "bacteria"
      },
      {
        "base": "cactus",
        "weirdo": "cacti"
      },
      {
        "base": "child",
        "weirdo": "children"
      },
      {
        "base": "codex",
        "weirdo": "codices"
      },
      {
        "base": "corpus",
        "weirdo": "corpora"
      },
      {
        "base": "crisis",
        "weirdo": "crises"
      },
      {
        "base": "criterion",
        "weirdo": "criteria"
      },
      {
        "base": "curriculum",
        "weirdo": "curricula"
      },
      {
        "base": "datum",
        "weirdo": "data"
      },
      {
        "base": "die",
        "weirdo": "dice"
      },
      {
        "base": "dwarf",
        "weirdo": "dwarves"
      },
      {
        "base": "ellipsis",
        "weirdo": "ellipses"
      },
      {
        "base": "erratum",
        "weirdo": "errata"
      },
      {
        "base": "focus",
        "weirdo": "foci"
      },
      {
        "base": "foot",
        "weirdo": "feet"
      },
      {
        "base": "formula",
        "weirdo": "formulae"
      },
      {
        "base": "fungus",
        "weirdo": "fungi"
      },
      {
        "base": "gas",
        "weirdo": "gases"
      },
      {
        "base": "goose",
        "weirdo": "geese"
      },
      {
        "base": "half",
        "weirdo": "halves"
      },
      {
        "base": "hoof",
        "weirdo": "hooves"
      },
      {
        "base": "hypothesis",
        "weirdo": "hypotheses"
      },
      {
        "base": "index",
        "weirdo": "indices"
      },
      {
        "base": "knife",
        "weirdo": "knives"
      },
      {
        "base": "larva",
        "weirdo": "larvae"
      },
      {
        "base": "loaf",
        "weirdo": "loaves"
      },
      {
        "base": "locus",
        "weirdo": "loci"
      },
      {
        "base": "louse",
        "weirdo": "lice"
      },
      {
        "base": "man",
        "weirdo": "men"
      },
      {
        "base": "matrix",
        "weirdo": "matrices"
      },
      {
        "base": "memorandum",
        "weirdo": "memoranda"
      },
      {
        "base": "minutia",
        "weirdo": "minutiae"
      },
      {
        "base": "mouse",
        "weirdo": "mice"
      },
      {
        "base": "nebula",
        "weirdo": "nebulae"
      },
      {
        "base": "nucleus",
        "weirdo": "nuclei"
      },
      {
        "base": "oasis",
        "weirdo": "oases"
      },
      {
        "base": "ovum",
        "weirdo": "ova"
      },
      {
        "base": "ox",
        "weirdo": "oxen"
      },
      {
        "base": "parenthesis",
        "weirdo": "parentheses"
      },
      {
        "base": "phenomenon",
        "weirdo": "phenomena"
      },
      {
        "base": "phylum",
        "weirdo": "phyla"
      },
      {
        "base": "radius",
        "weirdo": "radii"
      },
      {
        "base": "referendum",
        "weirdo": "referenda"
      },
      {
        "base": "scarf",
        "weirdo": "scarves"
      },
      {
        "base": "self",
        "weirdo": "selves"
      },
      {
        "base": "shelf",
        "weirdo": "shelves"
      },
      {
        "base": "stimulus",
        "weirdo": "stimuli"
      },
      {
        "base": "stratum",
        "weirdo": "strata"
      },
      {
        "base": "syllabus",
        "weirdo": "syllabi"
      },
      {
        "base": "symposium",
        "weirdo": "symposia"
      },
      {
        "base": "synopsis",
        "weirdo": "synopses"
      },
      {
        "base": "thesis",
        "weirdo": "theses"
      },
      {
        "base": "thief",
        "weirdo": "thieves"
      },
      {
        "base": "tooth",
        "weirdo": "teeth"
      },
      {
        "base": "vertebra",
        "weirdo": "vertebrae"
      },
      {
        "base": "vertex",
        "weirdo": "vertices"
      },
      {
        "base": "vita",
        "weirdo": "vitae"
      },
      {
        "base": "vortex",
        "weirdo": "vortices"
      },
      {
        "base": "wharf",
        "weirdo": "wharves"
      },
      {
        "base": "wife",
        "weirdo": "wives"
      },
      {
        "base": "wolf",
        "weirdo": "wolves"
      },
      {
        "base": "woman",
        "weirdo": "women"
      },
      {
        "base": "species",
        "weirdo": "species"
      },
      {
        "base": "fish",
        "weirdo": "fish"
      },      
      {
        "base": "sheep",
        "weirdo": "sheep"
      },
      {
        "base": "houses",
        "weirdo": "house"
      },
      {
        "base": "a",
        "weirdo": "an"
      },
      {
        "base": "sheep",
        "weirdo": "sheep"
      },
      {
        "base": "as",
        "weirdo": "as"
      },
      {
        "base": "her",
        "weirdo": "her"
      },
      {
        "base": "good",
        "weirdo": "better"
      },
      {
        "base": "good",
        "weirdo": "best"
      },
      {
        "base": "bad",
        "weirdo": "worse"
      },
      {
        "base": "bad",
        "weirdo": "worst"
      },
      {
        "base": "far",
        "weirdo": "farther"
      },
      {
        "base": "far",
        "weirdo": "farthest"
      },
      {
        "base": "genre",
        "weirdo": "genres"
      }
];

//Function words that can be removed from some complexity checking measures or not, based on user choice
const FunctionWords = [
    'about', 'above', 'across', 'after', 'against', 'along', 'amid', 'among', 'around', 'as', 'at', 'before', 'behind', 'below', 'beneath', 'beside', 'between', 'beyond', 'but', 'by', 'down', 'during', 'for', 'from', 'in', 'inside', 'into', 'next', 'of', 'off', 'on', 'onto', 'out', 'over', 'since', 'than', 'through', 'to', 'toward', 'under', 'underneath', 'until', 'up', 'upon', 'via', 'with', 'within', 'without', 'the', 'a', 'an', 'all', 'another', 'any', 'anybody', 'anyone', 'anything', 'as', 'both', 'each', 'either', 'everybody', 'everyone', 'everything', 'few', 'he', 'her', 'hers', 'herself', 'him', 'himself', 'his', 'i', 'it', 'its', 'itself', 'many', 'me', 'mine', 'most', 'my', 'myself', 'neither', 'nobody', 'none', 'nothing', 'one', 'other', 'others', 'our', 'ours', 'ourself', 'ourselves', 'several', 'she', 'some', 'somebody', 'someone', 'something', 'somewhat', 'such', 'that', 'their', 'theirs', 'theirself', 'theirselves', 'them', 'themself', 'themselves', 'there', 'these', 'they', 'this', 'those', 'us', 'we', 'what', 'whatever', 'whatnot', 'whatsoever', 'whence', 'where', 'whereby', 'wherefrom', 'wherein', 'whereinto', 'whereof', 'whereon', 'wheresoever', 'whereto', 'whereunto', 'wherever', 'wherewith', 'wherewithal', 'whether', 'which', 'whichever', 'whichsoever', 'who', 'whoever', 'whom', 'whomever', 'whomso', 'whomsoever', 'whose', 'whosesoever', 'whosever', 'whoso', 'whosoever', 'you', 'your', 'yours', 'yourself', 'yourselves'
];

//These words end in s but should be left as is, excluding those that end in -us
const endsExceptions = ['angeles','always', 'as', 'bias','chaos','christmas','downstairs','kansas','los','nowadays','ourselves','pants','series','themselves','upstairs','whereas','yourselves'];

//These words that end in -us SHOULD drop the s
const wordsEndInU = [
  'adius', 'bayous', 'beaus', 'bubus', 'chous', 'crus', 'emus', 'emeus', 'fugus', 'gurus','haikus','hausfraus','habus','jambeaus', 'jacus', 'jambus', 'jiujutsus', 'jujus', 'jujitsus', 'kadus', 'katsus', 'kombus', 'kudzus', 'kus', 'laulaus', 'lieus', 'leus', 'lulus', 'manteaus', 'menus', 'plateaus', 'ponzus', 'purlieus', 'sifus', 'shifus', 'shiatsus', 'sensus', 'snafus', 'tofus', 'tutus', 'urdus', 'vodous', 'wagyus', 'zulus', 'yous', 'yuzus', 'voulus'
];

//These words end in d but should be left alone
const endsDExceptions = [
  'bed', 'biped', 'bloodshed', 'breed', 'creed', 'cred', 'crossbreed', 'coed', 'deed', 'deathbed', 'dogsled', 'dead', 'ed', 'fred', 'flowerbed', 'feed', 'ged', 'greed', 'heed', 'hatred', 'hotbed', 'handicapped', 'hundred', 'infared', 'indeed',
  'kindred', 'led', 'leed', 'meed', 'milliped', 'milkweed', 'med', 'need', 'nosebleed', 'newlywed', 'ped', 'qed', 'red', 'reed', 'roadbed', 'riverbed', 'shed', 'seed', 'grapeseed', 
  'multifaceted', 'sled', 'speed', 'steed', 'screed', 'seabed', 'seasoned','seaweed', 'sickbed', 'succeed', 'thoroughbred', 'tweed', 'tumbleweed', 'toolshed', 'watershed', 'woodshed', 'wed', 'weed'];

//These are letters that precede ed/ing that should be removed but an e should be written there
const eBackExceptions = ['at', 'dg', 'ng', 'ns', 'lg', 'rg', 'nc', 'bl', 'cl', 'dl', 'fl', 'gl', 'pl', 'kl', 'tl', 'xl', 'yl', 'br', 'cr', 'gr', 'tr', 'yr', 'lv', 'rc','rv', 'rs', 'yz', 'ys', 'zl', 'nz'];

//These are exceptions to the l rule
const llBack2to1 = ["dial", "expel", "fuel", "wool", "panel", "lapel", "repel", "gruel", "gravel", "level", "mural", "petal", "metal", "total", "cabal", "jewel", "brail", "excel", "label", "annul", "equal", "hovel", "libel", "refuel", "chisel", "funnel", "tunnel", "rappel", "defuel", "drivel", "laurel", "travel", "dispel", "swivel", "tinsel", "weasel", "tassel", "compel", "propel", "redial", "cancel", "parcel", "corral", "shovel", "snivel", "spiral", "patrol", "symbol", "control", "bedevil", "initial", "stencil", "bejewel", "misdial", "lateral", "trammel", "pummel", "tendril", "marshal", "quarrel", "counsel", "council", "backpedal", "disembowel", "squirrel", "parallel", "credential", "label"]

//These are words that begin with un and become participles AND are actual verbs
const beginUNedExceptions = ['unarmed','unboxed','unblocked','unburdened','unblindfolded','unbolted','uncoiled','unchained','uncovered','uncocked','unclinched','uncorked','unclasped','unclotheed','uclipped','uncapped','unciphered','unclinged','uncurled','uncoupled','uncrossed','uncluttered','uncowled','uncrowned','unclenched','unclogged','uncloaked','uncased','uncaged','undressed','undulated','unearthed','unencumbered','unfitted','unfastened','unfriended','unfeudalizeed','unteathered','unfurled','unfettered','unfolded','unformed','unfixed','unfiled','unglued','unglazed','unhooked','unhitched','unhooded','unhumanized','unhealed','unhinged','unified','unifionized','univeralised','univeralized','uniformized','united','unitarianized','unitized','uniformed','uniformised','unjoined','unknoted','unkenneled','unleashed','unloaded','unloosed','unlinked','unlocked','unloosened','unlimbered','unlayed','unlearned','unlatched','unmolded','unmantled','unmuffled','unmasked','unmuzzled','unnested','unnaturalizeed','unpinned','unpacked','unplugged','unpegged','unenrolled','unreeled','unroofed','unraveled','unroosted','unrobed','unsealed','unscrewed','unseated','unsaddleed','unstrapped','unsettled','unsheathed','unsteadied','unsoldered','unspelled','unshackled','unsealed','unsocketed','untied','untangled','unentwined','untucked','unthroned','unturned','unveiled','unwrapped','unwired','unwrinkled','unzipped'];
const beginUNingExceptions = ['unarming','unboxing','unblocking','unburdening','unblindfolding','unbolting','uncoiling','unchaining','uncovering','uncocking','unclinching','uncorking','unclasping','unclotheing','uclipping','uncapping','unciphering','unclinging','uncurling','uncoupling','uncrossing','uncluttering','uncowling','uncrowning','unclenching','unclogging','uncloaking','uncasing','uncaging','undressing','undulating','unearthing','unencumbering','unfitting','unfastening','unfriending','unfeudalizeing','unteathering','unfurling','unfettering','unfolding','unforming','unfixing','unfiling','ungluing','unglazing','unhooking','unhitching','unhooding','unhumanizing','unhealing','unhinging','unifiing','unifionizing','univeralising','univeralizing','uniformizing','uniting','unitarianizing','unitizing','uniforming','uniformising','unjoining','unknoting','unkenneling','unleashing','unloading','unloosing','unlinking','unlocking','unloosening','unlimbering','unlaying','unlearning','unlatching','unmolding','unmantling','unmuffling','unmasking','unmuzzling','unnesting','unnaturalizeing','unpinning','unpacking','unplugging','unpegging','unenrolling','unreeling','unroofing','unraveling','unroosting','unrobing','unsealing','unscrewing','unseating','unsaddleing','unstrapping','unsettling','unsheathing','unsteadiing','unsoldering','unspelling','unshackling','unsealing','unsocketing','untiing','untangling','unentwining','untucking','unthroning','unturning','unveiling','unwrapping','unwiring','unwrinkling','unzipping'];

//Helps to clean a string
function cleanString(input) {
  var output = "";
  for (var i=0; i<input.length; i++) {
      if (input.charCodeAt(i) <= 127) {
          output += input.charAt(i);
      }
  }
  return output;
}

//Provides lemmas from a text. Returns an array of lemmas, or a single word if only a single word is passed into the function.
function Lemmatize(text){
    //Double check that there are no erronious spaces etc
    let temp1 = text.toLowerCase();
    let temp2 = temp1.replace(/[#"!$%\^&\*;:?{}=\_`~()]/gm,"");
    temp2 = temp2.replace(/[\u2014\u2013]/gm, " ");
    temp2 = temp2.replace(/[\r\n/\\]+/gm, " ");
    const hyphenExceptions = ["pre", "non", "re", "co", "semi", "quasi", "post", "pro", "under", "mid", "inter", "pseudo", "anti", "contra", "multi", "ultra"];
    const replaceHyphen = (str) => {
      const regexHyphen = new RegExp(`\\b(?!${hyphenExceptions.join("|")})([a-z]+)-([a-z]+)\\b`, "gi");
      return str.replace(regexHyphen, "$1 $2");
    };
    let temp3 = replaceHyphen(temp2);
    let temp4 = temp3.replace(/\s\s+/g, ' ');
    let results1 = temp4.split(" ");
    let results = [];

    //this simple functoin helps get particular letters
    function len(word, x) {let a = word.charAt(word.length + x); return a}
    function lastx(word, x) {let a = word.slice(-x); return a}

    results1.forEach(function(word){
      let numberTest = /^\d*[\.,\/]?\d+$/.test(word);
      if (numberTest==true){
        results.push(word);
      } else{
        word = word.replace(/[\.,\/]/g, "");
        //splits up contractions into words
        if (word == "i'm") {
            results.push("i");
            results.push("am");
        } else if (word=="won't") {
            results.push("will");
            results.push("not");
        } else if (word.substr(word.length - 3) == "'re") {
            results.push(word.slice(0,-3));
            results.push("are");
        } else if (word.substr(word.length - 3) == "n't") {
            if (word == "can't"){
              results.push(word.slice(0,-2));
              results.push("not");
            } else {
              results.push(word.slice(0,-3));
              results.push("not");
            }
        } else if (word.substr(word.length - 3) == "'ve") {
            results.push(word.slice(0,-3));
            results.push("have");
        } else if (word.substr(word.length - 3) == "'ll") {
            results.push(word.slice(0,-3));
            results.push("will");
        } else if (word.substr(word.length - 2) == "'d") {
            results.push(word.slice(0,-2));
            results.push("would");
        } else if (word.substr(word.length - 2) == "'s") {
          let tempLeft = word.slice(0, -2);
          let sIndics = ["here", "there", "he", "she", "it", "that", "this", "why", "how", "what", "who"];
          if (sIndics.includes(tempLeft)) {
          results.push(word.slice(0,-2));
          results.push("is");
          } else if (word == "let's"){
            results.push(word.slice(0,-2));
            results.push("us");
          } else {results.push(word.slice(0,-2));}
        } else if (word.substr(word.length -1) == "'"){
            results.push(word.slice(0, -1));
        } else {results.push(word);}
      }
    });
    let diff_words = [];
    results.forEach(function(word){
        //over-simplified attempt at lemmatizing
        var possible_lemma = "";
        const vowel = "aeiou";
        function len(word, x) {let a = word.charAt(word.length + x); return a}
        //lemmatize common irregular verbs
        function irreg(word) {
            for(let i = 0; i < irregular_verbs.length; i++) {
                if (word == irregular_verbs[i].SVA) {
                    possible_lemma = irregular_verbs[i].lemma;
                } else if (word == irregular_verbs[i].lemma) {
                    possible_lemma = irregular_verbs[i].lemma;
                } else if (word == irregular_verbs[i].past ){
                    possible_lemma = irregular_verbs[i].lemma;
                } else if (word == irregular_verbs[i].continuous){
                    possible_lemma = irregular_verbs[i].lemma;
                } else if (word == irregular_verbs[i].participle){
                    possible_lemma = irregular_verbs[i].lemma;
                }
              }
            return possible_lemma           
          }
            
        //lemmatize common irregular plurals
        function irregPlural(word){
            let lemma = "";
            for(let i=0; i < irregular_plurals.length; i++){
                if (word == irregular_plurals[i].weirdo){
                    lemma = irregular_plurals[i].base;
                }
            }
            return lemma;
        }
        //lemmatize be verbs
        if (word == "be" || word == "is" || word == "are" || word == "am" || word == "was" || word == "were" || word == "being" || word == "been") {
            possible_lemma = "be";
        } else if (!irregPlural(word) == "") {
          possible_lemma = irregPlural(word);
        } else if (!irreg(word) == ""){
          possible_lemma = irreg(word);
        }
        //lemmatize words with various common endings
        else if (word.endsWith('es')) {
          const backScut1Words = ['axes','cuties','genies','movies','shoes','stereotypes','types'];
                    if (endsExceptions.includes(word)){
                      possible_lemma = word;
                    } else if (backScut1Words.includes(word) || (len(word, -3) == "e" && len(word, -2) == "e") || ((len(word, -5) == "a" && len(word, -4) == "c" && len(word, -3) == "h" && len(word, -2) == "e"))){
                      possible_lemma = word.slice(0, -1);
                    } else if (len(word, -3) == "i") {
                      possible_lemma = word.slice(0, -3) + "y";
                    } else if (vowel.includes(len(word, -3))){
                        if (len(word, -3) == "u") {
                          possible_lemma = word.slice(0, -1);
                        } else {
                          possible_lemma = word.slice(0, -2);
                        }
                    } else if (!vowel.includes(len(word, -3))) {
                        if (len(word, -3) == "s" && len(word, -4) == "s" || len(word, -3) == "h" && len(word, -4) == "c" || len(word, -3) == "h" && len(word, -4) == "s"|| len(word, -3) == "l" && len(word, -4) == "i" && len(word, -5) == "a" || len(word, -3) == "x") {
                          possible_lemma = word.slice(0, -2);
                        } else if (eBackExceptions.includes(len(word, -4) + len(word, -3))) {
                          possible_lemma = word.slice(0,-1)
                        } else if (word == "focuses" || word == "campuses" || word == "sinuses" || word == "choruses" || word == "fetuses" || word == "omnibuses" || word == "impetuses" || word == "pluses" || word  == "minuses" || word  == "buses" || word  == "lotuses" || word  == "viruses" || word  == "mucuses" || word  == "caucuses" || word  == "cactuses" || word  == "statuses" || word  == "biases"){
                          possible_lemma = word.slice(0, -2);
                        } else if (len(word, -3) == len(word, -4)) {
                          possible_lemma = word.slice(0, -3);
                        } else if (vowel.includes(len(word, -4)) || len(word, -3) == "s" && len(word, -4) == "r" || len(word, -3) == "s" && len(word, -4) == "p") {
                          possible_lemma = word.slice(0, -1);
                        } else{possible_lemma = word;}
                    } else {possible_lemma = word;}
        } else if (word.endsWith('s')) {
                    if (len(word,-2) == "u"){
                        if (wordsEndInU.includes(word)){
                          possible_lemma = word.slice(0, -1);
                        } else {
                          possible_lemma = word;
                        }
                    } else if (endsExceptions.includes(word)){
                      possible_lemma = word;
                    } else if (word.endsWith('s') && len(word, -2) == "s") {
                        possible_lemma = word;
                    }   else if (word.endsWith('s') && len(word, -2) == "i") {
                        possible_lemma = word;
                    }   else if (word.endsWith('s') && len(word, -2) == "'") {
                        possible_lemma = word;
                    }   else  {
                        possible_lemma = word.slice(word, -1);
                    }
        } else if (word.endsWith('er')) {
                  const commonadjs = ['blacker', 'blanker', 'bolder', 'brasher', 'briefer', 'brighter', 'calmer', 'cheaper', 'chiller', 'cleaner', 'clearer', 'crisper', 'cleverer', 'deader', 'deeper', 'defter', 'drunker', 'duller', 'dumber', 'fainter', 'fairer', 'faster', 'fewer','firmer', 'fouler', 'franker', 'fuller', 'grander', 'greater', 'greener', 'grosser', 'harder', 'higher', 'hollower', 'iller', 'kinder', 'laxer', 'leaner', 'lesser', 'lighter', 'longer', 'louder', 'lower', 'meaner', 'moister', 'narrower', 'nearer', 'newer', 'odder', 'older','plumper', 'prouder', 'quieter', 'rasher', 'richer', 'righter', 'rounder', 'rougher', 'sharper', 'shorter', 'shyer', 'sicker', 'sleeker', 'slower', 'smaller', 'smoother', 'sourer', 'steeper', 'sterner', 'stiller', 'straighter', 'stricter', 'stronger','stupider', 'swifter', 'tenderer', 'tighter', 'warmer', 'weirder', 'wilder', 'yellower', 'younger'];
                  const commonadjs2 = ['bluer', 'braver', 'closer', 'completer', 'falser', 'finer', 'freer', 'gentler', 'graver', 'humbler', 'larger','lamer', 'looser', 'nicer', 'politer', 'purer', 'rarer', 'riper', 'safer', 'securer', 'simpler', 'squarer', 'tamer', 'truer', 'whiter'];
                  const commonadjs3 = ['angrier', 'bloodier', 'bossier', 'busier', 'chewier', 'chubbier', 'classier', 'cloudier', 'clumsier', 'crazier', 'creepier', 'crunchier', 'curlier', 'deadlier', 'dirtier', 'drier', 'earlier', 'easier', 'emptier', 'fancier', 'filthier', 'flakier', 'funnier', 'furrier', 'greasier', 'gloomier', 'greedier', 'happier','healthier', 'heavier', 'hungrier', 'juicier', 'lazier', 'littler','lonelier', 'prettier', 'readier', 'roomier', 'saltier', 'shinier', 'skinnier', 'smellier', 'windier', 'wealthier', 'tidier'];
                  const commonadjs4 = ["bigger", "dimmer", "fatter", "fitter","flatter","hotter","madder", "redder", "sadder", "slimmer", "wetter"];
                  if (commonadjs.includes(word)){
                    possible_lemma = word.slice(0, -2);
                  } else if (commonadjs4.includes(word)){
                    possible_lemma = word.slice(0, -3);
                  } else if (commonadjs2.includes(word)){
                    possible_lemma = word.slice(0, -1);
                  } else if (commonadjs3.includes(word)){
                    possible_lemma = word.slice(0, -3) + "y";
                  } else {possible_lemma = word;}
        } else if (word.endsWith('est')) {
                  const commonadjest = ['blackest', 'blankest', 'boldest', 'brashest', 'brightest', 'briefest', 'calmest', 'cheapest', 'chillest', 'cleanest', 'clearest', 'cleverst', 'crispest', 'deadest', 'deepest', 'deftest', 'drunkest', 'dullest', 'dumbest', 'faintest', 'fairest', 'fastest', 'fewest','firmest', 'foulest', 'frankest', 'fullest', 'grandest', 'greatest', 'greenest', 'grossest', 'hardest', 'highest', 'hollowest', 'illest', 'kindest', 'laxest', 'leanest', 'lightest', 'longest', 'loudest', 'lowest', 'meanest', 'moistest', 'narrowest', 'nearest', 'newest', 'numbest', 'oddest', 'oldest','plumpest', 'proudest', 'quietest', 'rashest', 'richest', 'rightest', 'roundest', 'roughest', 'sharpest', 'shortest', 'shyest', 'sickest', 'sleekest', 'slowest', 'smallest', 'smoothest', 'sourest', 'steepest', 'sternest', 'stillest', 'straightest', 'strictest','strongest','stupidest', 'swiftest', 'tenderest', 'tightest', 'warmest', 'weirdest', 'wildest', 'yellowest', 'youngest'];
                  const commonadjest2 = ['bluest', 'bravest', 'closest', 'completest', 'gentlest', 'falsest', 'finest', 'freest', 'gravest', 'humblest', 'largest', 'lamest', 'loosest', 'nicest', 'politest', 'purest', 'rarest', 'ripest', 'safest', 'securest', 'simplest', 'squarest', 'strangest', 'tamest', 'truest', 'whitest'];
                  const commonadjest3 = ['angriest', 'bloodiest', 'bossiest', 'busiest', 'chewiest', 'chubbiest', 'classiest', 'cloudiest', 'clumsiest', 'craziest', 'creepiest', 'crunchiest', 'curliest', 'deadliest', 'dirtiest', 'driest', 'earliest', 'easiest', 'emptiest', 'fanciest', 'filthiest', 'flakiest', 'funniest', 'furriest', 'greasiest', 'gloomiest', 'greediest', 'happiest','healthiest', 'heaviest', 'hungriest', 'juiciest', 'laziest', 'littlest', 'loneliest', 'prettiest', 'readiest', 'roomiest', 'saltiest', 'shiniest', 'skinniest', 'smelliest', 'windiest', 'wealthiest','tidiest'];
                  const commonadjest4 = ["biggest", "dimmest", "fattest", "fittest","flattest","hottest","maddest", "reddest", "saddest", "slimmest", "wettest"];
                  if (commonadjest.includes(word)){
                    possible_lemma = word.slice(0, -3);
                  } else if (commonadjest4.includes(word)){
                    possible_lemma = word.slice(0, -4);
                  } else if (commonadjest2.includes(word)){
                    possible_lemma = word.slice(0, -2);
                  } else if (commonadjest3.includes(word)){
                    possible_lemma = word.slice(0, -4) + "y";
                  } else {possible_lemma = word;}
        } else if (word.endsWith('ed')) {
          let oredBackExceptions = ['bored', 'pored', 'gored', 'cored', 'scored', 'adored', 'snored', 'chored', 'whored', 'stored', 'ignored', 'encored', 'restored', 'explored', 'implored', 'outscored', 'deplored', 'underscored', 'unrestored', "unopened"];
          let edSlice1Exceptions = ["adhered","axed","cited","cleansed","convened","continued","created","freed","guided","intrigued","owed","recreated","shared","typed"];
          const edSlice2Exception = ['aimed', 'added', 'developed', 'erred', 'focused', 'purred', 'ordered','opened', 'reopened', 'reasoned','veiled', 'unveiled']
                        if (endsDExceptions.includes(word)) {
                            possible_lemma = word;
                        } else if (edSlice2Exception.includes(word)){
                            possible_lemma = word.slice(0,-2);
                        }else if ( ((word.charAt(0) == "u" && word.charAt(1) == "n") && !(word.charAt(2) == "d" && word.charAt(3) == "e" && word.charAt(4) == "r")) && !beginUNedExceptions.includes(word)){
                            possible_lemma = word;
                        } else if ((len(word, -5) == "e" && len(word,-4) == "a" && len(word, -3) == "s") || (len(word, -5) == "a" && len(word,-4) == "i" && len(word, -3) == "s") || ((len(word,-4) == "y" && len(word, -3) == "p")) || ((len(word,-4) == "r" && len(word, -3) == "c")) || ((len(word,-4) == "p" && len(word, -3) == "s")) || word =="aged" || word =="challenged" || lastx(word, 7) == "changed" || lastx(word, 6) == "ranged" || lastx(word, 5) == "inged" || edSlice1Exceptions.includes(word)){
                          possible_lemma = word.slice(0,-1);
                        } else if ((len(word, -5) == "o" && len(word, -4) == "a") || (len(word, -5) == "e" && len(word, -4) == "a") || len(word, -3) == "x" || (len(word, -4) == "e" && len(word, -3) == "n") || (len(word, -4) == "n" && len(word, -3) == "g")){
                            possible_lemma = word.slice(0,-2);
                        } else if (len(word, -3) == "i") {
                            possible_lemma = word.slice(0,-3) + "y";
                        } else if (len(word, -3) == "y"){
                           possible_lemma = word.slice(0,-2);
                        } else if (len(word, -3) == "e") {
                            possible_lemma = word.slice(0,-1);
                        } else if (vowel.includes(len(word, -4)) && len(word, -3) =="n") {
                            if (!vowel.includes(len(word, -5)) && !vowel.includes(len(word, -6))){
                              possible_lemma = word.slice(0, -2);
                            } else if (!vowel.includes(len(word, -5))){
                              possible_lemma = word.slice(0, -1);
                            } else {
                              possible_lemma = word.slice(0, -2);
                            }
                        } else if (len(word, -3) == "r" && len(word, -4) == "e" || len(word, -3) == "r" && len(word, -4) == "o" || len(word, -5) == "a" && len(word, -4) == "i" || len(word, -3) == "l" && len(word, -4) == "e"){
                              if (oredBackExceptions.includes(word)){
                                possible_lemma = word.slice(0, -1);
                              } else {
                              possible_lemma = word.slice(0, -2);
                              }
                        } else if (len(word, -3) == len(word, -4)) {
                            if (len(word, -3) == "s" || len(word, -3) == "l"){
                              if (llBack2to1.includes(word.slice(0, -3))){
                                possible_lemma = word.slice(0, -3);
                              } else {
                              possible_lemma = word.slice(0, -2);
                              }
                            } else {
                              possible_lemma = word.slice(0, -3);
                            }
                        } else if (!vowel.includes(len(word, -3)) && !vowel.includes(len(word, -4))) {
                            if (eBackExceptions.includes(len(word, -4) + len(word, -3))) {
                              possible_lemma = word.slice(0, -1);
                            } else if (len(word, -3) == "l") {
                               if (len(word, -4) == "r") {
                                possible_lemma = word.slice(0, -2);
                               } else {
                                possible_lemma = word.slice(0, -1);
                               }
                            } else {
                              possible_lemma = word.slice(0, -2);
                            }
                        } else if (!vowel.includes(len(word, -3)) && vowel.includes(len(word, -4))) {
                          const lowerEdvcExceptions = ["acquired", "excited", "invited", "persuaded", "quoted", "required"];
                            if (lowerEdvcExceptions.includes(word)){
                              possible_lemma = word.slice(0, -1);
                            } else if (len(word, -3) == "r" && len(word, -4) == "e" && len(word, -5) == len(word, -6) ){
                              possible_lemma = word.slice(0, -2);
                            } else if (len(word, -3) == "t" && (len(word, -4) == "i" || len(word, -4) == "e")){
                              possible_lemma = word.slice(0, -2);
                            } else if (vowel.includes(len(word, -5)) && len(word, -4) == len(word, -5) || (len(word, -5) == "u" && !(len(word, -4)=="a" && len(word, -3)=="t"))){
                              possible_lemma = word.slice(0, -2);
                            } else if (len(word, -3) == "r" && vowel.includes(len(word, -5))|| len(word, -3) == "g" && vowel.includes(len(word, -5))|| len(word, -3) == "d" && vowel.includes(len(word, -5)) || len(word, -3) == "w"){
                              possible_lemma = word.slice(0, -2);
                            } else {
                              possible_lemma = word.slice(0, -1);
                            }
                        } else {possible_lemma = word;}
        }  else if (word.endsWith('ing')) {
          let oringBackExceptions = ['acquiring', 'creating', 'convening', 'recreating', 'persuading', 'boring', 'requiring', 'quoting', 'inspiring', 'assuming', 'poring', 'goring', 'coring', 'scoring', 'adoring', 'snoring', 'choring', 'whoring', 'storing', 'ignoring', 'encoring', 'restoring', 'exploring', 'imploring', 'outscoring', 'deploring', 'underscoring', 'unrestoring'];
          let leaveAloneExceptions = ['boing', 'bring', 'ceiling', 'during', 'evening', 'king', 'morning', 'ongoing', 'outing', 'outgoing', 'offspring', 'outstanding', 'ring', 'sing', 'sling', 'spring', 'handspring', 'wellspring', 'sting', 'string', 'hamstring', 'drawstring', 'heartstring', 'shoestring', 'swing','thing', 'well-being', 'wing', 'wring']
          const ingTocutExceptions = ['adding', 'asking', 'allowing', 'aiming', 'developing', 'erring','focusing','freezing', 'opening', 'reopening', 'reasoning','unveiling','veiling','waxing'];
          const ingToaddEExceptions = ['adhering', 'citing', 'continuing', 'exciting', 'eying', 'inviting','owing', 'sharing','tiring', 'using'];
                      if (leaveAloneExceptions.includes(word)) {
                          possible_lemma = word;
                      } else if (ingTocutExceptions.includes(word)){
                        possible_lemma = word.slice(0, -3);
                      } else if (ingToaddEExceptions.includes(word)){
                        possible_lemma = word.slice(0, -3) + "e";
                      } else if ( ((word.charAt(0) == "u" && word.charAt(1) == "n") && !(word.charAt(2) == "d" && word.charAt(3) == "e" && word.charAt(4) == "r")) && !beginUNingExceptions.includes(word)){
                        possible_lemma = word;
                      } else if (oringBackExceptions.includes(word) || len(word, -6) == "e" && len(word,-5) == "a" && len(word, -4) == "s" || (len(word, -6) == "a" && len(word,-5) == "i" && len(word, -4) == "s") || (len(word,-5) == "y" && len(word, -4) == "p") || (len(word,-5) == "r" && len(word, -4) == "c") || (len(word,-5) == "p" && len(word, -4) == "s" || word == "challenging" || word=="aging" || ((len(word, -5) == "n" && len(word, -4) == "g") && (lastx(word, 8) == "changing" || lastx(word, 6) == "ranging" || lastx(word, 5) == "inging" )))){
                        possible_lemma = word.slice(0, -3) + "e"; 
                      } else if (word.substr((word.length - 5)) == "thing") {
                          possible_lemma = word; 
                        } else if ( len(word, -6) == "e" && len(word, -5) == "a" || len(word, -6) == "o" && len(word, -5) == "a" || len(word, -4) == "x" || (len(word, -5) == "e" && len(word, -4) == "n")) {
                            possible_lemma = word.slice(0, -3);
                        } else if ( (len(word, 4) == "c" && len(word, 5) == "r")){
                            possible_lemma = word.slice(0, -3) + "e";
                        } else if (len(word, -4) == "y" || (len(word, -4) == "e" && len(word, -5) == "e")) {
                            possible_lemma = word.slice(0, -3);
                        } else if (len(word, -4) == "l" && len(word, -5) == "i" && len(word, -6) == "a"){
                            possible_lemma = word.slice(0, -3);
                        } else if (vowel.includes(len(word, -5)) && len(word, -4) =="n") {
                            if (!vowel.includes(len(word, -6)) && !vowel.includes(len(word, -7))){
                              possible_lemma = word.slice(0, -3);
                            } else if (!vowel.includes(len(word, -6))){
                              possible_lemma = word.slice(0, -3) + "e";
                            } else {
                              possible_lemma = word.slice(0, -3);
                            }
                        } else if ((len(word, -4) == "r" && len(word, -5) == "e") || (len(word, -4) == "l" && len(word, -5) == "e") || (len(word, -4) == "r" && len(word, -5) == "o") || (len(word, -6) == "a" && len(word, -5) == "i")){
                            possible_lemma = word.slice(0, -3);
                        } else if (vowel.includes(len(word, -5) && len(word, -5) == len(word, -6))) {
                                possible_lemma = word.slice(0, -3);
                        } else if (len(word, -5) == len(word, -4)) {
                          if (len(word, -5) == "s" || len(word, -5) == "l") {
                            if (llBack2to1.includes(word.slice(0, -4))){
                                possible_lemma = word.slice(0, -4);
                              } else {
                              possible_lemma = word.slice(0, -3);
                              }
                            } else {
                              possible_lemma = word.slice(0,-4);
                            }
                        } else if (!vowel.includes(len(word, -4))) {
                            if (vowel.includes(len(word, -5))) {
                               if (len(word, -6) == len(word, -5) || (len(word, -4) == "r" && vowel.includes(len(word, -6)) )){
                                  possible_lemma = word.slice(0, -3);
                                } else if ((len(word, -5) == "e" && len(word, -6) == "i") || (len(word, -4) == "r" && len(word, -5) == "u") ){
                                  possible_lemma = word.slice(0, -3) + "e";
                                } else if ((len(word, -4) == "t" && (len(word, -5) == "i" || len(word, -5) == "e"))){
                                  possible_lemma = word.slice(0, -3);
                                } else if (vowel.includes(len(word, -6)) && len(word, -5) == len(word, -6) || (len(word, -6) == "u" && !(len(word, -5)=="a" && len(word, -4)=="t"))){
                                  possible_lemma = word.slice(0, -3) + "e";
                                } else if (len(word, -4) == "r" && vowel.includes(len(word, -6))|| len(word, -4) == "g" && vowel.includes(len(word, -6))|| len(word, -4) == "d" && vowel.includes(len(word, -6)) || len(word, -4) == "w"){
                                  possible_lemma = word.slice(0, -3);
                                } else {
                                  possible_lemma = word.slice(0, -3) + "e";
                                } 
                            }  else if (eBackExceptions.includes(len(word, -5) + len(word, -4)))  {
                                possible_lemma = word.slice(0,-3) + "e";
                            }  else if (!vowel.includes(len(word, -5))) {
                                possible_lemma = word.slice(0, -3);
                            }
                        } else if (vowel.includes(len(word, -4))){
                           if (len(word, -4) == len(word, -5)) {
                              possible_lemma = word.slice(0,-4);
                           } else {
                              possible_lemma = word.slice(0, -4) + "e";
                           }
                        } else {possible_lemma = word;}
        } else {
          possible_lemma = word;
        }
        


        diff_words.push(possible_lemma);
        if (word == "" || word == "-" || word == "–" || word == "—" || word == "–"){
            diff_words.pop();
        }

    });
    return diff_words;
}

//Oldie but goodie
function safeDivision(x,y){
    if (y==0){
        return 0;
    } else {return (x/y);}
}

//Takes a string, provides word count
function CountWords(text){
    let temp1 = text.toLowerCase();
    let temp2 = temp1.replace(/[.,\/#!$%\^&\*;:?{}=\_`~()]/g,"");
    temp2 = temp2.replace(/(\r\n|\n|\r)/g, "");
    let temp4 = temp2.replace(/\s{2,}/g," ");
    let check = temp4.split(" ");
    let realOnes = [];
    for (let i=0; i<check.length; i++){
      if (check[i] != ""){
        realOnes.push(check[i]);
      }
    }
    return realOnes.length;
}

//Takes a string, provides a sentence count based on punctuation and line breaks
function CountSentences(text){
    let check= text.split(/[.?!|\r\n/\\]+/);
    if (check[check.length - 1]==""){
        check.pop();
    }
    return check.length;
}

//Takes a string and provides the mean length of sentences.
function CalculateMLS(text){
    let sentences = ProvideSentences(text);
    let wordCount = 0;
    for (let i=0; i<sentences.length; i++){
        wordCount += CountWords(sentences[i]);
    }
    return safeDivision(wordCount, sentences.length)
}

//Takes a string, provides array of clean words (no punctuation) and capitalization removed
function ProvideWords(text){
    let first = text.toLowerCase();
    let temp1 = first.replace(/[.,\/#!$%\^&\*;:?{}=\-_`~()]/g,"");
    let temp2 = temp1.replace(/\s{2,}/g," ");
    let words = temp2.split(" ");
    for (let i=0; i<words.length; i++){
        if (words[i] == ""){
            words.splice(i,1)
        }
    } 
    return words;
}

//Takes a string, provides array of words with attached punctuation; capitalization as is
function ProvideWordsWithPunctuation(text){
    let words = text.split(" ");
    for (let i=0; i<words.length; i++){
        if (words[i] == ""){
            words.splice(i,1)
        }
    } 
    return words;
}

//Takes a number (for n) and a string, provides an array of n-grams
function ProvideNgrams(number, text){
    let array = ProvideWords(text);
    let noWords = array.length;
    let grams = [];
    array.forEach(function(word, index){
        let checker = index + (number-1);
        let temp_gram = [];
        let mygram = "";
        if (checker < noWords){
            for (let j=0; j<number; j++){
                temp_gram.push(array[index+j]);
            }
            mygram=temp_gram.join(' ');
            grams.push(mygram);
        }
    });
    return grams;
}

//Takes a string, provides an array of sentences as is;
function ProvideSentences(text){
  let cleaned = text.replace(/(\r\n|\n|\r)/g, ". "); // Replace line breaks with periods and spaces
  // List of abbreviations that should not trigger a split
  const abbreviations = ["Mr.", "mr.", "Mrs.", "mrs.", "Ms.", "ms.", "Dr.", "dr.", "Prof.", "prof.", "Sr.", "sr.", "St.", "st."];
  let sentences = [];
  let buffer = "";
  let i = 0;
  while (i < cleaned.length) {
      const char = cleaned[i];
      buffer += char;

      if (char === "." || char === "!" || char === "?") {
        // Look ahead: skip whitespace to check if a sentence ends
        let j = i + 1;
        while (j < cleaned.length && /\s/.test(cleaned[j])) {
          j++;
        }

        // Check if this is an abbreviation
        let lastWord = buffer.trim().split(/\s+/).slice(-1)[0];
        if (!abbreviations.includes(lastWord)) {
          // If not an abbreviation, treat it as a sentence boundary
          sentences.push(buffer.trim());
          buffer = "";
          i = j - 1; // move to next non-whitespace char
        }
      }

      i++;
  }

  // Push any remaining buffer content
  if (buffer.trim()) {
    sentences.push(buffer.trim());
  }

  return sentences;
}

//Takes a number (n) which represents the n-grams to be compared, then a string (written text) and a second string (scoure text). 
//Returns a percentage copied by n-gram and an index of the copied words that can be matched to an array of words
function CompareWritingToSource(n, writing, source){
    let writingArray = ProvideNgrams(n, writing);
    let sourceArray = ProvideNgrams(n, source);
    let counter = 0;
    let hits = [];
    for (let i=0; i < writingArray.length; i++) {
        for (let j=0; j < sourceArray.length; j++) {
            if (writingArray[i] === sourceArray[j]) {
                counter += 1;
                hits.push(i);
            }
        }
    }
    let copyingPCT = safeDivision(counter, writingArray.length).toFixed(4);
    let copiedWords = [];
    for (let i=0; i<hits.length; i++){
        for (let j=0; j<n; j++){
            if (!copiedWords.includes(hits[i]+j)){
                copiedWords.push((hits[i]+j))
            }
        }
    }
    return {"copyPCT": copyingPCT, "copiedWords" : copiedWords}
}

//Takes a pre-processed array of writing and a pre-processed array of keywords. 
//Provides a count of all keywords and a map of counts of each. Use X.keycounts.get("keyword") method to retrieve. Use "for (let [key, value] of X.keycounts)" to itterate
function CheckForKeywordsPreprocessed(writing, keywords){
    let counter = 0;
    let indexes = [];
    let individualCounts = new Map([    ]);
    for (let i=0; i<keywords.length; i++){
        individualCounts.set(keywords[i], 0);
    }
    for (let i=0; i<writing.length; i++){
        for (let j=0; j<keywords.length; j++){
            if (writing[i] == keywords[j]){
                counter ++;
                let tempCount = individualCounts.get(keywords[j]);
                individualCounts.set(keywords[j], tempCount+1);
                indexes.push(i);
            }
        }
    }
    return {"count" : counter, "keycounts": individualCounts, "indexes": indexes}
}

//Takes a pre-processed array of writing and a pre-processed array of keywords and phrases, up to 5-grams (but no more). 
//Provides a count of all keywords and a map of counts of each. Use X.keycounts.get("keyword") method to retrieve. Use "for (let [key, value] of X.keycounts)" to itterate
//Also provides an array of indexes for where each begins, and an array of lengths that tells the length of each phrase (in number of words)
//Index and length can be used to pinpoint where phrases begin and end in main program
//For keywords and phrases of 3 and longer, you can use a star * to represent "any word" and it will match; e.g. keyword "get * up" will match "get it up" and "get them up"
function CheckForKeywordsAndPhrasesPreprocessed(writing, keywords){
    let counter = 0;
    let indexes = [];
    let lengths = [];
    let key1grams = [];
    let key2grams = [];
    let key3grams = [];
    let key4grams = [];
    let key5grams = [];
    let stringOfWriting = writing.join(" ");
    let writing2grams = ProvideNgrams(2, stringOfWriting);
    let writing3grams = ProvideNgrams(3, stringOfWriting);
    let writing4grams = ProvideNgrams(4, stringOfWriting);
    let writing5grams = ProvideNgrams(5, stringOfWriting);
    for (let i=0; i<keywords.length; i++){
        let tempWC = CountWords(keywords[i]);
        if (tempWC == 1) {
            key1grams.push(keywords[i]);
        } else if (tempWC == 2) {
            key2grams.push(keywords[i]);
        } else if (tempWC == 3) {
            key3grams.push(keywords[i]);
        } else if (tempWC == 4) {
            key4grams.push(keywords[i]);
        } else if (tempWC == 5) {
            key5grams.push(keywords[i]);
        }
    }
    let individualCounts = new Map([    ]);
    for (let i=0; i<keywords.length; i++){
        individualCounts.set(keywords[i], 0);
    }
    for (let i=0; i<writing.length; i++){
        for (let j=0; j<key1grams.length; j++){
            if (writing[i] == key1grams[j]){
                counter ++;
                let tempCount = individualCounts.get(key1grams[j]);
                individualCounts.set(key1grams[j], tempCount+1);
                indexes.push(i);
                lengths.push(1);
            }
        }
    }
    for (let i=0; i<writing2grams.length; i++){
        for (let j=0; j<key2grams.length; j++){
            if (writing2grams[i] == key2grams[j]){
                counter ++;
                let tempCount = individualCounts.get(key2grams[j]);
                individualCounts.set(key2grams[j], tempCount+1);
                indexes.push(i);
                lengths.push(2);
            }
        }
    }
    for (let i=0; i<writing3grams.length; i++){
        for (let j=0; j<key3grams.length; j++){
          let starCheck = key3grams[j].split(" ");
          if (!starCheck.includes("*")){
              if (writing3grams[i] == key3grams[j]){
                  counter ++;
                  let tempCount = individualCounts.get(key3grams[j]);
                  individualCounts.set(key3grams[j], tempCount+1);
                  indexes.push(i);
                  lengths.push(3);
              }
          } else {
              let writingCheck = writing3grams[i].split(" ");
              if (writingCheck[0] == starCheck[0] || starCheck[0] == "*"){
                if (writingCheck[1] == starCheck[1] || starCheck[1] == "*"){
                  if (writingCheck[2] == starCheck[2] || starCheck[2] == "*"){
                    counter ++;
                    let tempCount = individualCounts.get(key3grams[j]);
                    individualCounts.set(key3grams[j], tempCount+1);
                    indexes.push(i);
                    lengths.push(3);
                  }
                }
              }
          }
        }
    }
    for (let i=0; i<writing4grams.length; i++){
        for (let j=0; j<key4grams.length; j++){
          let starCheck = key4grams[j].split(" ");
          if (!starCheck.includes("*")){
              if (writing4grams[i] == key4grams[j]){
                  counter ++;
                  let tempCount = individualCounts.get(key4grams[j]);
                  individualCounts.set(key4grams[j], tempCount+1);
                  indexes.push(i);
                  lengths.push(4);
              }
          } else {
            let writingCheck = writing4grams[i].split(" ");
              if (writingCheck[0] == starCheck[0] || starCheck[0] == "*"){
                if (writingCheck[1] == starCheck[1] || starCheck[1] == "*"){
                  if (writingCheck[2] == starCheck[2] || starCheck[2] == "*"){
                    if (writingCheck[3] == starCheck[3] || starCheck[3] == "*"){
                      counter ++;
                      let tempCount = individualCounts.get(key4grams[j]);
                      individualCounts.set(key4grams[j], tempCount+1);
                      indexes.push(i);
                      lengths.push(4);
                    }
                  }
                }
              }
          }
        }
    }
    for (let i=0; i<writing5grams.length; i++){
        for (let j=0; j<key5grams.length; j++){
          let starCheck = key5grams[j].split(" ");
          if (!starCheck.includes("*")){
              if (writing5grams[i] == key5grams[j]){
                  counter ++;
                  let tempCount = individualCounts.get(key5grams[j]);
                  individualCounts.set(key5grams[j], tempCount+1);
                  indexes.push(i);
                  lengths.push(5);
              }
            } else {
              let writingCheck = writing5grams[i].split(" ");
              if (writingCheck[0] == starCheck[0] || starCheck[0] == "*"){
                if (writingCheck[1] == starCheck[1] || starCheck[1] == "*"){
                  if (writingCheck[2] == starCheck[2] || starCheck[2] == "*"){
                    if (writingCheck[3] == starCheck[3] || starCheck[3] == "*"){
                      if (writingCheck[4] == starCheck[4] || starCheck[4] == "*"){
                        counter ++;
                        let tempCount = individualCounts.get(key5grams[j]);
                        individualCounts.set(key5grams[j], tempCount+1);
                        indexes.push(i);
                        lengths.push(5);
                      }
                    }
                  }
                }
              }
            }
        }
    }
    return {"count" : counter, "keycounts": individualCounts, "indexes": indexes, "lengths": lengths}
}

//Takes a pre-processed array of writing. Recommend using lemmatize to create word lists.
//Provides a count of different words and a map of all different words and the counts of each. Use X.DWCounts.get("word") to retrieve. Use "for (let [key, value] of X.DWcounts)" to itterate
function DifferentWordsPreprocessed(array){
    let counter = 0;
    let DWlist = [];
    for (let i=0; i<array.length; i++){
        if (!DWlist.includes(array[i])){
            counter++;
            DWlist.push(array[i]);
        }
    }
    let individualCounts = new Map([    ]);
    for (let i=0; i<DWlist.length; i++){
        individualCounts.set(DWlist[i], 0);
    }
    for (let i=0; i<array.length; i++){
        let tempCount = individualCounts.get(array[i]);
        individualCounts.set(array[i], tempCount+1);
    }
    return {"NDW" : counter, "DWCounts": individualCounts}
}

//Takes a pre-processed array of writing. Removes all function words (pronouns, prepositions, articles) - useful for types of text density / TTR ratios.
function RemoveFunctionWords(inputArray){
  return inputArray.filter(word => !FunctionWords.includes(word));
}

//Takes true / false (true = remove function words, false = do not remove them) and a pre-processed (already lemmatized) array of writing. Calculates CTTR.
function CalculateCTTRfromArray(remove, array){
    let tempArray = [];
    for (let i=0; i<array.length; i++){
      tempArray.push(array[i]);
    }
    if (remove == true) {
        RemoveFunctionWords(tempArray);
    }
    let WC = tempArray.length;
    return safeDivision(DifferentWordsPreprocessed(tempArray).NDW, ((2 * WC) ** 0.5))
}

//Takes true / false (true = remove function words, false = do not remove them) and an unprocessed text (writing). Calculates CTTR.
function CalculateCTTRfromText(remove, text){
    let theLemmas = Lemmatize(text);
    if (remove == true) {
        RemoveFunctionWords(theLemmas);
    }
    let WC = theLemmas.length;
    return safeDivision(DifferentWordsPreprocessed(theLemmas).NDW, ((2 * WC) ** 0.5))
}

//Takes a text and creates an array of original words with an index that will match lemmatization (i.e. breaks up the contractions)
function MakeMatchingArrayforLemmatization(text){
  let results = [];
    let array = ProvideWordsWithPunctuation(text);
    array.forEach(function(word){
        if (word.toLowerCase() == "i'm") {
            results.push("I");
            results.push("am");
        } else if (word.toLowerCase()=="won't") {
            results.push("will");
            results.push("not");
        } else if (word.substr(word.length - 3) == "'re") {
            results.push(word.slice(0,-3));
            results.push("are");
        } else if (word.substr(word.length - 3) == "n't") {
            results.push(word.slice(0,-3));
            results.push("not");
        } else if (word.substr(word.length - 3) == "'ve") {
            results.push(word.slice(0,-3));
            results.push("have");
        } else if (word.substr(word.length - 3) == "'ll") {
            results.push(word.slice(0,-3));
            results.push("will");
        } else if (word.substr(word.length - 2) == "'d") {
            results.push(word.slice(0,-2));
            results.push("would");
        } else if (word.substr(word.length - 2) == "'s") {
            if (word.toLowerCase() == "here's" || word.toLowerCase() == "there's" || word.toLowerCase() == "he's" || word.toLowerCase() == "she's" || word.toLowerCase() == "it's" || word.toLowerCase() == "that's" || word.toLowerCase() == "this's") {
            results.push(word.slice(0,-2));
            results.push("is");
            }
        } else {results.push(word);}
    });
    return array;
}

//Counts syllables
function syllableCount(word) {
  let exceptions = ["the", "be", "me", "she", "we"];
  if (exceptions.includes(word)){
      return 1;
  } else {
      word = word.toLowerCase();
      word = word.replace(/[.,\/#!$%\^&\*;:?{}=\-_`~()]/g,"");
      if (!isNaN(word)){
        word = convertNumbertoWord(word);
        if (!isNaN(word)){
          return 0;
        }
      }                                     
      word = word.replace(/(?:[^laeiouy]|ed|[^laeiouy]e)$/, ''); 
      word = word.replace(/^y/, '');                            
      let syl = word.match(/[aeiouy]{1,2}/g);
          if(syl){
          return syl.length;
      } else {
        return 0;
      }
  }
}

function countSyllablesArray(array){
  let sylCount = 0;
  for (let i=0; i<array.length; i++){
    sylCount += syllableCount(array[i])
  }
  return sylCount;
}

function FleschKincaid(text){
  let sent = CountSentences(text);
  let words = CountWords(text);
  let allWords = ProvideWords(text);
  let syllables = countSyllablesArray(allWords);
  let ReadingEase = 206.835 - (1.015*(safeDivision(words,sent))) - (84.6 * (safeDivision(syllables, words)));
  let GradeLevel = (0.39*(safeDivision(words,sent))) + (11.8 * (safeDivision(syllables, words))) - 15.59;
  return {"RE" : ReadingEase, "GL": GradeLevel}
}

function convertNumbertoWord(tempString){
  let num = parseInt(tempString);
  let db = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
  let db2 = ["twenty", "thirty", "fourty", "fifty", "sixty", "seventy", "eighty", "ninety"];
  if (num<0){
    return tempString;
  } else if (num<20){
    return db[num];
  } else if (num<100){
    let dec = parseInt(tempString.charAt(0));
    let dig = parseInt(tempString.charAt(1));
    if (dig != 0){
      return db2[dec-2]+"-"+db[dig];
    } else {
      return db2[dec-2];
    }
  } else if (num<1000){
    let hun = parseInt(tempString.charAt(0));
    let dec = parseInt(tempString.charAt(1));
    let dig = parseInt(tempString.charAt(2));
    let helpNumFinder = parseInt(tempString.charAt(1)+tempString.charAt(2));
    if (dec > 1){
      if (dig !=0){
        return db[hun] + " hundred "+db2[dec-2]+"-"+db[dig];
      } else {
        return db[hun] + " hundred and "+ db2[dec-2];
      }
    } else {
      if (helpNumFinder == 0) {
        return db[hun] + "hundred"
      } else {
        return db[hun] + " hundred and "+ db[helpNumFinder];
      }
    }
  } else if (num<10000){
    let tho = parseInt(tempString.charAt(0));
    let hun = parseInt(tempString.charAt(1));
    let dec = parseInt(tempString.charAt(2));
    let dig = parseInt(tempString.charAt(3));
    let helpNumFinder = parseInt(tempString.charAt(2)+tempString.charAt(3));
    if (hun !=0) {
      if (dec > 1){
        if (dig !=0){
          return db[tho] + " thousand "+ db[hun] + " hundred "+db2[dec-2]+"-"+db[dig];
        } else {
          return db[tho] + " thousand "+ db[hun] + " hundred and "+ db2[dec-2];
        }
      } else {
        if (helpNumFinder == 0) {
          return db[tho] + " thousand " + db[hun] + "hundred"
        } else {
          return db[tho] + " thousand " +  db[hun] + " hundred and "+ db[helpNumFinder];
        }
      }
    } else {
      if (dec > 1){
        if (dig !=0){
          return db[tho] + " thousand "+ db2[dec-2]+"-"+db[dig];
        } else {
          return db[tho] + " thousand and "+ db2[dec-2];
        }
      } else {
        if (helpNumFinder == 0) {
          return db[tho] + " thousand ";
        } else {
          return db[tho] + " thousand " +  db[helpNumFinder];
        }
      }
    }
    
  } else {
    return tempString;
  }
}

//Completely sanitizes a text to get rid of line breaks and non unicode characters
function sanitizeText(firstText){
  //remove Japanese characters
  firstText = firstText.replace(/[０-９]|[－]/g,
      function(tmpStr) {
          return String.fromCharCode( tmpStr.charCodeAt(0) - 0xFEE0 );
      }
  );
  //Remove non-compliant ', " and ...
  firstText = firstText.replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"').replace(/[\u2026\u00b7]/g, '.');
  //Replace returns with no final punctuation with "." and then remove all erroneous returns and spaces.
  firstText = firstText.replace(/[\r\n][.!?]/gm, ". ");
  firstText = firstText.replace(/[\r\n]+/gm, " ");
  firstText = firstText.replace(/\s\s+/g, ' ');
  return firstText;
}

//Takes string of elementID and uses that to grab the "value" property (for inputs and text areas) and then returns sanitzed text.
function grabCleanText(elementID){
  let thisText = document.getElementById(elementID).value;
  return sanitizeText(thisText);
}

//Requires loading the ngsl.js first. This one takes an array of pre-lematized words.
function NGSLPercentage(array){
  let thisNoW = array.length;
  let thisNGSL = 0;
  array.forEach(function(word){
    if (NGSL.includes(word)){
      thisNGSL++;
    }
  });
  return safeDivision(thisNGSL, thisNoW);
}

//Takes an array of pre-lematized words. Runs a check of repeated words/phrases that are suspicious
function bullshitRepetition(array){
  let numboWords = array.length;
  let oneWordrepeatIndex = [];
  let twoWordrepeatIndex = [];
  let threeWordrepeatIndex = [];
  for (let i=0; i<array.length-1; i++){
    let checkWord = array[i];
    let compWord = array[i+1];
    if (!oneWordrepeatIndex.includes(i)){
        if (checkWord == compWord){
          oneWordrepeatIndex.push(i);
         }
      } 
  }
  
  for (let i=0; i<array.length-3; i++){
    let checkPhrase = array[i] + " " + array[i+1];
    let compPhrase = array[i+1] + " " + array[i+2];
    let compPhrase2 = array[i+2] + " " + array[i+3];
      if (!oneWordrepeatIndex.includes(i) && !twoWordrepeatIndex.includes(i)){
          if (checkPhrase == compPhrase || checkPhrase == compPhrase2){
            twoWordrepeatIndex.push(i);
          }
      } 
    
  }
  for (let i=0; i<array.length-5; i++){
    let checkPhrase = array[i] + " " + array[i+1] + " " + array[i+2];
    let compPhrase = array[i+2] + " " + array[i+3] + " "+ array[i+4];
    let compPhrase2 = array[i+1] + " " + array[i+2] + " " + array[i+3];
    let compPhrase3 = array[i+3] + " " + array[i+4] + " "+ array[i+5];
      if (!oneWordrepeatIndex.includes(i) && !twoWordrepeatIndex.includes(i) && !threeWordrepeatIndex.includes(i)){
          if (checkPhrase == compPhrase || checkPhrase == compPhrase2 || checkPhrase == compPhrase3){
            threeWordrepeatIndex.push(i);
          }
      } 
  }
  let thisBS = oneWordrepeatIndex.length + twoWordrepeatIndex.length + threeWordrepeatIndex.length;
  return safeDivision(thisBS, numboWords);
}

//Takes a pre-lemmatized array and checks for nonsense by using the NGSL and bullshitRepetion functions. Returns true if nonsense is detected, otherwise, false.
function checkForNonsense(array){
  let thisBS = bullshitRepetition(array);
  let thisNGSL = NGSLPercentage(array);
  if (thisNGSL < 0.6 || thisBS > 0.3){
    return true;
  } else {
    return false;
  }
}

//Requires loading the cefrJ.js first. This one takes an array of pre-lematized words.
function cefrJpercentage(array){
  let thisNoW = array.length;
  let thisA1 = 0;
  let thisA2 = 0;
  let thisB1 = 0;
  let thisB2 = 0;
  array.forEach(function(word){
    if (cefrA1.includes(word) || cefrNumbers.includes(word)){
      thisA1++; thisA2++; thisB1++; thisB2++;
    } else if (cefrA2.includes(word)){
      thisA2++; thisB1++; thisB2++;
    } else if (cefrB1.includes(word)){
      thisB1++; thisB2++;
    } else if (cefrB2.includes(word)){
      thisB2++;
    }
  });

  return {"A1pct" : safeDivision(thisA1, thisNoW), "A2pct" : safeDivision(thisA2, thisNoW), "B1pct" : safeDivision(thisB1, thisNoW), "B2pct" : safeDivision(thisB2, thisNoW)}
}