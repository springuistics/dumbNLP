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
      "continuous": "getting"
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
const endsExceptions = new Set(['angeles','alias','always','as','bias','chaos','christmas','downstairs','gas','kansas','los','nowadays','ourselves','pants','perhaps','series','themselves','upstairs','whereas','yourselves']);

//These words that end in -us SHOULD drop the s
const wordsEndInU = new Set([
  'adius', 'bayous', 'beaus', 'bubus', 'chous', 'crus', 'emus', 'emeus', 'fugus', 'gurus','haikus','hausfraus','habus','jambeaus', 'jacus', 'jambus', 'jiujutsus', 'jujus', 'jujitsus', 'kadus', 'katsus', 'kombus', 'kudzus', 'kus', 'laulaus', 'lieus', 'leus', 'lulus', 'manteaus', 'menus', 'plateaus', 'ponzus', 'purlieus', 'sifus', 'shifus', 'shiatsus', 'sensus', 'snafus', 'tofus', 'tutus', 'urdus', 'vodous', 'wagyus', 'zulus', 'yous', 'yuzus', 'voulus'
]);

//These words end in d but should be left alone
const endsDExceptions = new Set([
  'bed', 'biped', 'bloodshed', 'breed', 'creed', 'cred', 'crossbreed', 'coed', 'deed', 'deathbed', 'dogsled', 'dead', 'ed', 'fred', 'flowerbed', 'feed', 'ged', 'greed', 'heed', 'hatred', 'hotbed', 'handicapped', 'hundred', 'infared', 'indeed',
  'kindred', 'led', 'leed', 'meed', 'milliped', 'milkweed', 'med', 'naked', 'need', 'nosebleed', 'newlywed', 'ped', 'qed', 'red', 'reed', 'roadbed', 'riverbed', 'shed', 'seed', 'grapeseed', 
  'multifaceted', 'reputed','sled', 'speed', 'steed', 'screed', 'seabed', 'seasoned','seaweed', 'sickbed', 'succeed', 'thoroughbred', 'tweed', 'tumbleweed', 'toolshed', 'watershed', 'woodshed', 'wed', 'weed',
  'wicked','crooked','ragged','jagged','dogged','beloved','learned','winged','forked','feathered']);

//These are letters that precede ed/ing that should be removed but an e should be written there
const eBackExceptions = new Set(['at', 'dg', 'ng', 'ns', 'lg', 'rg', 'nc', 'bl', 'cl', 'dl', 'fl', 'gl', 'pl', 'kl', 'tl', 'xl', 'yl', 'br', 'cr', 'gr', 'tr', 'yr', 'lv', 'rc','rv', 'rs', 'yz', 'ys', 'zl', 'nz']);

//These are exceptions to the l rule
const llBack2to1 = new Set(["dial", "expel", "fuel", "wool", "panel", "lapel", "repel", "gruel", "gravel", "level", "mural", "petal", "metal", "total", "cabal", "jewel", "brail", "excel", "label", "annul", "equal", "hovel", "libel", "refuel", "chisel", "funnel", "tunnel", "rappel", "defuel", "drivel", "laurel", "travel", "dispel", "swivel", "tinsel", "weasel", "tassel", "compel", "propel", "redial", "cancel", "parcel", "corral", "shovel", "snivel", "spiral", "patrol", "symbol", "control", "bedevil", "initial", "stencil", "bejewel", "misdial", "lateral", "trammel", "pummel", "tendril", "marshal", "quarrel", "counsel", "council", "backpedal", "disembowel", "squirrel", "parallel", "credential", "label"]);

//These are words that begin with un and become participles AND are actual verbs
const beginUNedExceptions = new Set(['unarmed','unboxed','unblocked','unburdened','unblindfolded','unbolted','uncoiled','unchained','uncovered','uncocked','unclinched','uncorked','unclasped','unclotheed','uclipped','uncapped','unciphered','unclinged','uncurled','uncoupled','uncrossed','uncluttered','uncowled','uncrowned','unclenched','unclogged','uncloaked','uncased','uncaged','undressed','undulated','unearthed','unencumbered','unfitted','unfastened','unfriended','unfeudalizeed','unteathered','unfurled','unfettered','unfolded','unformed','unfixed','unfiled','unglued','unglazed','unhooked','unhitched','unhooded','unhumanized','unhealed','unhinged','unified','unifionized','univeralised','univeralized','uniformized','united','unitarianized','unitized','uniformed','uniformised','unjoined','unknoted','unkenneled','unleashed','unloaded','unloosed','unlinked','unlocked','unloosened','unlimbered','unlayed','unlearned','unlatched','unmolded','unmantled','unmuffled','unmasked','unmuzzled','unnested','unnaturalizeed','unpinned','unpacked','unplugged','unpegged','unenrolled','unreeled','unroofed','unraveled','unroosted','unrobed','unsealed','unscrewed','unseated','unsaddleed','unstrapped','unsettled','unsheathed','unsteadied','unsoldered','unspelled','unshackled','unsealed','unsocketed','untied','untangled','unentwined','untucked','unthroned','unturned','unveiled','unwrapped','unwired','unwrinkled','unzipped']);
const beginUNingExceptions = new Set(['unarming','unboxing','unblocking','unburdening','unblindfolding','unbolting','uncoiling','unchaining','uncovering','uncocking','unclinching','uncorking','unclasping','unclotheing','uclipping','uncapping','unciphering','unclinging','uncurling','uncoupling','uncrossing','uncluttering','uncowling','uncrowning','unclenching','unclogging','uncloaking','uncasing','uncaging','undressing','undulating','unearthing','unencumbering','unfitting','unfastening','unfriending','unfeudalizeing','unteathering','unfurling','unfettering','unfolding','unforming','unfixing','unfiling','ungluing','unglazing','unhooking','unhitching','unhooding','unhumanizing','unhealing','unhinging','unifiing','unifionizing','univeralising','univeralizing','uniformizing','uniting','unitarianizing','unitizing','uniforming','uniformising','unjoining','unknoting','unkenneling','unleashing','unloading','unloosing','unlinking','unlocking','unloosening','unlimbering','unlaying','unlearning','unlatching','unmolding','unmantling','unmuffling','unmasking','unmuzzling','unnesting','unnaturalizeing','unpinning','unpacking','unplugging','unpegging','unenrolling','unreeling','unroofing','unraveling','unroosting','unrobing','unsealing','unscrewing','unseating','unsaddleing','unstrapping','unsettling','unsheathing','unsteadiing','unsoldering','unspelling','unshackling','unsealing','unsocketing','untiing','untangling','unentwining','untucking','unthroning','unturning','unveiling','unwrapping','unwiring','unwrinkling','unzipping']);

//Provides lemmas from a text. Returns an array of lemmas, or a single word if only a single word is passed into the function.
const Lemmatize = function(text){
    // Normalize and clean text
    let cleaned = text
      .toLowerCase()
      // remove punctuation except hyphens and apotraphes
      .replace(/[#"!$%\^&\*;:?{}=\_`~()]/g, "")
      // convert em/en dashes to spaces
      .replace(/[\u2014\u2013]/g, " ")
      // normalize slashes, newlines, backslashes to spaces
      .replace(/[\r\n/\\]+/g, " ");

    // Hyphen exceptions
    const hyphenExceptions = new Set(["pre", "non", "re", "co", "semi", "quasi", "post", "pro","under", "mid", "inter", "pseudo", "anti", "contra", "multi", "ultra"]);
    // Split hyphenated words unless first part is an exception
    cleaned = cleaned.replace(/\b([a-z0-9]+(?:-[a-z0-9]+)+)\b/gi, (match) => {
      const parts = match.split("-");
      return hyphenExceptions.has(parts[0].toLowerCase())
        ? match
        : parts.join(" ");
    });

    // Collapse extra spaces and split
    const results1 = cleaned.trim().replace(/\s+/g, " ").split(" ");
    let results = [];

    //this simple functoin helps get particular letters
    function len(word, x) {let a = word.charAt(word.length + x); return a}
    function lastx(word, x) {let a = word.slice(-x); return a}

    results1.forEach((word) => {
      // Number detection
      if (/^\d*[\.,\/]?\d+$/.test(word)) {
        results.push(word);
        return;
      }
      // Remove punctuation inside words
      word = word.replace(/[\.,\/]/g, "");
      const lower = word.toLowerCase();
      // Direct contraction dictionary
      const contractions = {
        "i'm": ["i", "am"],
        "won't": ["will", "not"],
        "can't": ["can", "not"],
        "let's": ["let", "us"]
      };
      if (contractions[lower]) {
        results.push(...contractions[lower]);
        return;
      }
      // Generic endings (IE-safe)
      if (lower.slice(-3) === "'re") {
        results.push(word.slice(0, -3), "are");
        return;
      }
      if (lower.slice(-3) === "n't") {
        results.push(word.slice(0, -3), "not");
        return;
      }
      if (lower.slice(-3) === "'ve") {
        results.push(word.slice(0, -3), "have");
        return;
      }
      if (lower.slice(-3) === "'ll") {
        results.push(word.slice(0, -3), "will");
        return;
      }
      if (lower.slice(-2) === "'d") {
        results.push(word.slice(0, -2), "would");
        return;
      }
      if (lower.slice(-2) === "'s") {
        const base = word.slice(0, -2);
        const sIndics = new Set([
          "here", "there", "he", "she", "it", "that", "this",
          "why", "how", "what", "who"
        ]);
        if (sIndics.has(base)) {
          results.push(base, "is");
        } else {
          results.push(base);
        }
        return;
      }
      if (lower.slice(-1) === "'") {
        results.push(word.slice(0, -1));
        return;
      }
      results.push(word);
    });
    let diff_words = [];
    results.forEach(function(word){
      let possible_lemma = "";

          // --- 1. Irregular verb lookup (fast) ---
          function irreg(word) {
              for (let i = 0; i < irregular_verbs.length; i++) {
                  const v = irregular_verbs[i];
                  if (
                      word === v.SVA ||
                      word === v.lemma ||
                      word === v.past ||
                      word === v.continuous ||
                      word === v.participle
                  ) {
                      return v.lemma;
                  }
              }
              return "";
          }

          // --- 2. Irregular plural lookup ---
          function irregPlural(word) {
              for (let i = 0; i < irregular_plurals.length; i++) {
                  if (word === irregular_plurals[i].weirdo) {
                      return irregular_plurals[i].base;
                  }
              }
              return "";
          }

          // --- 3. Be-verbs ---
          const beForms = {
              "be": 1, "is": 1, "are": 1, "am": 1,
              "was": 1, "were": 1, "being": 1, "been": 1
          };

        // 1. be-verbs
        if (beForms[word]) {
              possible_lemma = "be";
        }

        // 2. irregular plurals
        if (possible_lemma === "") {
              const pluralLemma = irregPlural(word);
              if (pluralLemma !== "") {
                  possible_lemma = pluralLemma;
              }
        }

        // 3. irregular verbs
        if (possible_lemma === "") {
              const irregLemma = irreg(word);
              if (irregLemma !== "") {
                  possible_lemma = irregLemma;
              }
        }

        // 4. regular endings
        if (possible_lemma === "") {

          //lemmatize words with various common endings
          if (word.endsWith("oes") && !["shoes", "does", "goes"].includes(word)) {
              possible_lemma = word.slice(0, -2); // remove "es"
          }
          else if (word.endsWith('es')) {
            const backScut1Words = new Set(['axes','cuties','genies','movies','shoes','stereotypes','types','aches','backaches','headaches','stomachaches']);
            const specialEsWords = new Set(["focuses","campuses","circuses","sinuses","choruses","fetuses","omnibuses","impetuses","pluses","minuses","buses","lotuses","viruses","mucuses","caucuses","cactuses","statuses","biases", "walruses"]);
            const last2 = len(word, -2);
            const last3 = len(word, -3);
            const last4 = len(word, -4);
            const last5 = len(word, -5);
            if (endsExceptions.has(word)) {
                    possible_lemma = word;
                }
                // words like "movies", "shoes", "cuties"
                else if (backScut1Words.has(word) || (last3 === "e" && last2 === "e")) {
                    possible_lemma = word.slice(0, -1);
                }
                // special -uses words
                else if (specialEsWords.has(word)) {
                    possible_lemma = word.slice(0, -2);
                }
                // babies → baby
                else if (last3 === "i") {
                    possible_lemma = word.slice(0, -3) + "y";
                }
                // vowel + es
                else if (vowel.includes(last3)) {
                    if (last3 === "u") {
                        possible_lemma = word.slice(0, -1);
                    } else {
                        possible_lemma = word.slice(0, -2);
                    }
                }
                // consonant + es
                else {
                    // ss, ch, sh, ia + l, x
                    if (
                        (last3 === "s" && last4 === "s") ||
                        (last3 === "h" && last4 === "c") ||
                        (last3 === "h" && last4 === "s") ||
                        (last3 === "l" && last4 === "i" && last5 === "a") ||
                        (last3 === "x")
                    ) {
                        possible_lemma = word.slice(0, -2);
                    }

                    // exceptions like "theses" → "these" (your eBackExceptions)
                    else if (eBackExceptions.has(last4 + last3)) {
                        possible_lemma = word.slice(0, -1);
                    }

                    // double letter before -es (e.g., "buzzes" → "buzz")
                    else if (last3 === last4) {
                        possible_lemma = word.slice(0, -3);
                    }

                    // vowel before consonant + es (e.g., "rises", "poses")
                    else if (
                        vowel.includes(last4) ||
                        (last3 === "s" && last4 === "r") ||
                        (last3 === "s" && last4 === "p")
                    ) {
                        possible_lemma = word.slice(0, -1);
                    }

                    else {
                        possible_lemma = word;
                    }
                }
          } else if (word.endsWith("s")) {
                const last1 = len(word, -1);
                const last2 = len(word, -2);

                // 1. Words ending in -us → sometimes plural, sometimes not
                if (last2 === "u") {
                    if (wordsEndInU.has(word)) {
                        possible_lemma = word.slice(0, -1);   // remove final s
                    } else {
                        possible_lemma = word;                // leave unchanged
                    }
                }
                // 2. Words that should never be lemmatized
                else if (endsExceptions.has(word)) {
                    possible_lemma = word;
                }
                // 3. Words ending in ss → not plural (e.g., "boss", "glass")
                else if (last2 === "s") {
                    possible_lemma = word;
                }
                // 4. Words ending in 's (possessives)
                else if (last2 === "'") {
                    possible_lemma = word;
                }
                // 5. Words ending in -is (not plural)
                else if (last2 === "i") {
                    possible_lemma = word;
                }
                // 6. Default: remove final s
                else {
                    possible_lemma = word.slice(0, -1);
                }
            } else if (word.endsWith('er')) {
                    const commonadjs = new Set(['blacker','blanker','bolder','brasher','briefer','brighter','calmer','cheaper','chiller','cleaner','clearer','crisper','cleverer','deader','deeper','defter','drunker','duller','dumber','fainter','fairer','faster','fewer','firmer','fouler','franker','fuller','grander','greater','greener','grosser','harder','higher','hollower','iller','kinder','laxer','leaner','lesser','lighter','longer','louder','lower','meaner','moister','narrower','nearer','newer','odder','older','plumper','prouder','quieter','rasher','richer','righter','rounder','rougher','sharper','shorter','shyer','sicker','sleeker','slower','smaller','smoother','softer','sourer','steeper','sterner','stiller','straighter','stricter','stronger','stupider','swifter','tenderer','tighter','tougher','warmer','weirder','wilder','yellower','younger']);
                    const commonadjs2 = new Set(['bluer','braver','closer','completer','denser','falser','finer','freer','gentler','graver','humbler','larger','lamer','looser','nicer','politer','purer','rarer','riper','safer','securer','simpler','squarer','tamer','truer','whiter']);
                    const commonadjs3 = new Set(['angrier','bloodier','bossier','busier','chewier','chubbier','classier','cloudier','clumsier','crazier','creepier','crunchier','curlier','deadlier','dirtier','drier','earlier','easier','emptier','fancier','filthier','flakier','funnier','furrier','greasier','gloomier','greedier','happier','healthier','heavier','hungrier','juicier','lazier','littler','lonelier','prettier','readier','roomier','saltier','shinier','skinnier','smellier','windier','wealthier','tidier']);
                    const commonadjs4 = new Set(["bigger","dimmer","fatter","fitter","flatter","hotter","madder","redder","sadder","slimmer","wetter"]);
                    if (commonadjs.has(word)) {
                        possible_lemma = word.slice(0, -2);        // remove -er
                    } else if (commonadjs4.has(word)) {
                        possible_lemma = word.slice(0, -3);        // double consonant
                    } else if (commonadjs2.has(word)) {
                        possible_lemma = word.slice(0, -1);        // remove only -r
                    } else if (commonadjs3.has(word)) {
                        possible_lemma = word.slice(0, -3) + "y";  // y → ier
                    } else {possible_lemma = word;}
          } else if (word.endsWith('est')) {
                    const commonadjest = new Set(['blackest','blankest','boldest','brashest','brightest','briefest','calmest','cheapest','chillest','cleanest','clearest','crispest','cleverest','deadest','deepest','deftest','drunkest','dullest','dumbest','faintest','fairest','fastest','fewest','firmest','foulest','frankest','fullest','grandest','greatest','greenest','grossest','hardest','highest','hollowest','illest','kindest','laxest','leanest','lessest','lightest','longest','loudest','lowest','meanest','moistest','narrowest','nearest','newest','oddest','oldest','plumpest','proudest','quietest','rashest','richest','rightest','roundest','roughest','sharpest','shortest','shyest','sickest','sleekest','slowest','smallest','smoothest','softest','sourest','steepest','sternest','stillest','straightest','strictest','strongest','stupidest','swiftest','tenderest','tightest','toughest','warmest','weirdest','wildest','yellowest','youngest']);
                    const commonadjest2 = new Set(['bluest','bravest','closest','completest','densest','falser','falsest','finest','freest','gentlest','gravest','humblest','largest','lamest','loosest','nicest','politest','purest','rarest','ripest','safest','securest','simplest','squarest','tamest','truest','whitest']);
                    const commonadjest3 = new Set(['angriest','bloodiest','bossiest','busiest','chewiest','chubbiest','classiest','cloudiest','clumsiest','craziest','creepiest','crunchiest','curliest','deadliest','dirtiest','driest','earliest','easiest','emptiest','fanciest','filthiest','flakiest','funniest','furriest','greasiest','gloomiest','greediest','happiest','healthiest','heaviest','hungriest','juiciest','laziest','littlest','loneliest','prettiest','readiest','roomiest','saltiest','shiniest','skinniest','smelliest','windiest','wealthiest','tidiest']);
                    const commonadjest4 = new Set(["biggest","dimmest","fattest","fittest","flattest","hottest","maddest","reddest","saddest","slimmest","wettest"]);
                    if (commonadjest.has(word)) {
                        possible_lemma = word.slice(0, -3);  // remove -est
                    } else if (commonadjest4.has(word)) {
                        possible_lemma = word.slice(0, -4);  // double consonant
                    } else if (commonadjest2.has(word)) {
                        possible_lemma = word.slice(0, -2);   // remove onlst -st
                    } else if (commonadjest3.has(word)) {
                        possible_lemma = word.slice(0, -4) + "y";   // y -> iest
                    } else { possible_lemma = word;}

          } else if (word.endsWith('ed')) {
                    const oredBackExceptions = new Set(['bored','pored','gored','cored','scored','adored','snored','chored','whored','stored','ignored','encored','restored','explored','implored','outscored','deplored','underscored','unrestored','unopened']);
                    const edSlice1Exceptions = new Set(["adhered","aged","axed","challenged","cited","cleansed","convened","continued","created","freed","guided","intrigued","owed","recreated","shared","typed"]);
                    const edSlice2Exception = new Set(['aimed','added','developed','erred','focused','purred','ordered','opened','reopened','reasoned','veiled','unveiled']);
                    const lowerEdvcExceptions = new Set(["acquired","completed","excited","invited","persuaded","quoted","required"]);
                    const l3 = len(word, -3);
                    const l4 = len(word, -4);
                    const l5 = len(word, -5);
                    const l6 = len(word, -6);
                    // Words that should never be lemmatized
                    if (endsDExceptions.has(word)) {
                            possible_lemma = word;
                    }
                    // Handle ooed words (booed, cooed, mooed, etc.)
                    else if (word.endsWith("ooed")) {
                        possible_lemma = word.slice(0, -2);   // remove only "ed"
                    }
                    // Handle eed words (freed → free, agreed → agree)
                    else if (word.endsWith("eed")) {
                        possible_lemma = word.slice(0, -1);   // remove only "d"
                    }
                    else if (word.endsWith("yed")) {
                        possible_lemma = word.slice(0, -2);   // remove "ed"
                    }
                    // Handle owed words (snowed → snow, owed → owe), but only if not in edSlice1Exceptions
                    else if (word.endsWith("owed") && !edSlice1Exceptions.has(word)) {
                        possible_lemma = word.slice(0, -2);   // remove "ed"
                    }
                    // Words where removing "ed" is correct
                    else if (edSlice2Exception.has(word)) {
                        possible_lemma = word.slice(0, -2);
                    }
                    // Words beginning with "un-" but not "under-"
                    else if ( word.startsWith("un") && !word.startsWith("under") && !beginUNedExceptions.has(word)) {
                            possible_lemma = word;
                    }
                    // Words where only the final "d" should be removed
                    else if (
                            (l5 === "e" && l4 === "a" && l3 === "s") ||   // "eased"
                            (l5 === "a" && l4 === "i" && l3 === "s") ||   // "aised"
                            (l4 === "y" && l3 === "p") ||                 // "yped"
                            (l4 === "r" && l3 === "c") ||                 // "rced"
                            (l4 === "p" && l3 === "s") ||                 // "sped"
                            lastx(word, 7) === "changed" ||
                            lastx(word, 6) === "ranged" ||
                            lastx(word, 5) === "inged" ||
                            edSlice1Exceptions.has(word)
                          ) {possible_lemma = word.slice(0, -1);
                      }
                    // Words where removing "ed" is correct (broad patterns)
                    else if (
                            (l5 === "o" && l4 === "a") ||                 // "oaked"
                            (l5 === "e" && l4 === "a") ||                 // "eaked"
                            l3 === "x" ||                                 // "mixed", "boxed"
                            (l4 === "e" && l3 === "n") ||                 // "tended", "mended"
                            (l4 === "n" && l3 === "g")                    // "ringed"
                          ){ possible_lemma = word.slice(0, -2);
                    }
                    // y → ied → y
                    else if (l3 === "i") {
                            possible_lemma = word.slice(0, -3) + "y";
                    }
                    // ey → eyed (played, obeyed, stayed)
                    else if (l3 === "y") {
                            possible_lemma = word.slice(0, -2);
                    }
                    // Vowel + n + ed patterns
                    else if (vowel.includes(l4) && l3 === "n") {
                            if (word.endsWith("ined")){
                              possible_lemma = word.slice(0, -1);
                            } else if (!vowel.includes(l5) && !vowel.includes(l6) && l6 !== "r") {
                                possible_lemma = word.slice(0, -2);
                            } else if (!vowel.includes(l5)) {
                                possible_lemma = word.slice(0, -1);
                            } else {
                                possible_lemma = word.slice(0, -2);
                            }
                    }

                    // er/ or / ai / le patterns
                    else if (
                            (l3 === "r" && (l4 === "e" || l4 === "o")) ||
                            (l5 === "a" && l4 === "i") ||
                            (l3 === "l" && l4 === "e")
                          ) {
                            if (oredBackExceptions.has(word)) {
                                possible_lemma = word.slice(0, -1);
                            } else {
                                possible_lemma = word.slice(0, -2);
                            }
                    }

                    // Double consonant patterns (stopped, filled)
                    else if (l3 === l4) {

                            if (l3 === "s" || l3 === "l") {
                                if (llBack2to1.has(word.slice(0, -3))) {
                                    possible_lemma = word.slice(0, -3);
                                } else {
                                    possible_lemma = word.slice(0, -2);
                                }
                            } else {
                                possible_lemma = word.slice(0, -3);
                            }
                    }

                    // Consonant + consonant + ed
                    else if (!vowel.includes(l3) && !vowel.includes(l4)) {

                        if (eBackExceptions.has(l4 + l3)) {
                                possible_lemma = word.slice(0, -1);
                        } else if (l3 === "l") {
                                if (l4 === "r") {
                                    possible_lemma = word.slice(0, -2);
                                } else {
                                    possible_lemma = word.slice(0, -1);
                                }
                        } else {
                                possible_lemma = word.slice(0, -2);
                            }
                    }

                    // Vowel + consonant + ed
                    else if (!vowel.includes(l3) && vowel.includes(l4)) {
                        if (lowerEdvcExceptions.has(word)) {
                            possible_lemma = word.slice(0, -1);
                        } else if (l3 === "r" && l4 === "e" && l5 === l6) {
                            possible_lemma = word.slice(0, -2);
                        } else if (l3 === "t" && (l4 === "i" || l4 === "e")) {
                            possible_lemma = word.slice(0, -2);
                        } else if ((vowel.includes(l5) && l4 === l5) ||(l5 === "u" && !(l4 === "a" && l3 === "t"))) {
                            possible_lemma = word.slice(0, -2);
                        } else if ((l3 === "r" && vowel.includes(l5)) || (l3 === "g" && vowel.includes(l5)) || (l3 === "d" && vowel.includes(l5)) || l3 === "w") {
                                possible_lemma = word.slice(0, -2);
                        } else {
                                possible_lemma = word.slice(0, -1);
                        }
                    }

                                      // e → ed (baked, hoped)
                    else if (l3 === "e") {
                            possible_lemma = word.slice(0, -1);
                    }

                    // Default fallback
                    else {possible_lemma = word;}

          }  else if (word.endsWith("ing")) {
                  const oringBackExceptions = new Set(['acquiring','completing','creating','convening','recreating','persuading','boring','requiring','quoting','inspiring','assuming','poring','goring','coring','scoring','adoring','snoring','choring','whoring','storing','ignoring','encoring','restoring','exploring','imploring','outscoring','deploring','underscoring','unrestoring']);
                  const leaveAloneExceptions = new Set(['boing','bring','ceiling','during','evening','king','morning','ongoing','outing','outgoing','offspring','outstanding','ring','sing','sling','spring','handspring','wellspring','sting','string','hamstring','drawstring','heartstring','shoestring','swing','thing','well-being','wing','wring']);
                  const ingTocutExceptions = new Set(['adding','asking','allowing','aiming','developing','erring','focusing','freezing','opening','reopening','reasoning','unveiling','veiling','waxing']);
                  const ingToaddEExceptions = new Set(['adhering','citing','continuing','exciting','eying','inviting','owing','sharing','tiring','using']);
                  const l3 = len(word, -3);   // i
                  const l4 = len(word, -4);
                  const l5 = len(word, -5);
                  const l6 = len(word, -6);
                  const l7 = len(word, -7);

                  // Words that should never be lemmatized
                  if (leaveAloneExceptions.has(word)) {
                      possible_lemma = word;
                  }
                  // Words where we simply remove "ing"
                  else if (ingTocutExceptions.has(word)) {
                      possible_lemma = word.slice(0, -3);
                  }
                  // 3. Words where we remove "ing" and add "e"
                  else if (ingToaddEExceptions.has(word)) {
                      possible_lemma = word.slice(0, -3) + "e";
                  }

                  // 4. Words beginning with "un-" but not "under-"
                  else if (
                      word.startsWith("un") &&
                      !word.startsWith("under") &&
                      !beginUNingExceptions.has(word)
                  ) {
                      possible_lemma = word;
                  }

                  // 5. Words where the base ends in "e" (your original oringBack logic)
                  else if (
                      oringBackExceptions.has(word) ||
                      (l6 === "e" && l5 === "a" && l4 === "s") ||
                      (l6 === "a" && l5 === "i" && l4 === "s") ||
                      (l5 === "y" && l4 === "p") ||
                      (l5 === "r" && l4 === "c") ||
                      (l5 === "p" && l4 === "s") ||
                      word === "challenging" ||
                      word === "aging" ||
                      (
                          l5 === "n" && l4 === "g" &&
                          (lastx(word, 8) === "changing" ||
                          lastx(word, 6) === "ranging" ||
                          lastx(word, 5) === "inging")
                      )
                  ) {
                      possible_lemma = word.slice(0, -3) + "e";
                  }

                  // 6. Words ending in "thing"
                  else if (word.endsWith("thing")) {
                      possible_lemma = word;
                  }

                  // 7. Words where we remove "ing" (ea, oa, x, en patterns)
                  else if (
                      (l6 === "e" && l5 === "a") ||
                      (l6 === "o" && l5 === "a") ||
                      l4 === "x" ||
                      (l5 === "e" && l4 === "n")
                  ) {
                      possible_lemma = word.slice(0, -3);
                  }

                  // 8. Words ending in "cring" (e.g., "caring")
                  else if (l4 === "c" && l5 === "r") {
                      possible_lemma = word.slice(0, -3) + "e";
                  }

                  // 9. Words ending in "ying" or "eeing"
                  else if (l4 === "y" || (l4 === "e" && l5 === "e")) {
                      possible_lemma = word.slice(0, -3);
                  }

                  // 10. Words ending in "ialing" etc.
                  else if (l4 === "l" && l5 === "i" && l6 === "a") {
                      possible_lemma = word.slice(0, -3);
                  }

                  // 11. Vowel + n + ing patterns
                  else if (vowel.includes(l5) && l4 === "n") {
                      if (word.endsWith('ining')){
                        possible_lemma = word.slice(0, -3) + "e";
                      } else if (!vowel.includes(l6) && !vowel.includes(l7) && l7 !== "r") {
                          possible_lemma = word.slice(0, -3);
                      } else if (!vowel.includes(l6)) {
                          possible_lemma = word.slice(0, -3) + "e";
                      } else {
                          possible_lemma = word.slice(0, -3);
                      }
                  }

                  // 12. er/ el / or / ai patterns
                  else if (
                      (l4 === "r" && l5 === "e") ||
                      (l4 === "l" && l5 === "e") ||
                      (l4 === "r" && l5 === "o") ||
                      (l6 === "a" && l5 === "i")
                  ) {
                      possible_lemma = word.slice(0, -3);
                  }

                  // 13. Vowel doubling patterns
                  else if (vowel.includes(l5) && l5 === l6) {
                      possible_lemma = word.slice(0, -3);
                  }

                  // 14. Double consonant patterns
                  else if (l5 === l4) {
                      if (l5 === "s" || l5 === "l") {
                          if (llBack2to1.has(word.slice(0, -4))) {
                              possible_lemma = word.slice(0, -4);
                          } else {
                              possible_lemma = word.slice(0, -3);
                          }
                      } else {
                          possible_lemma = word.slice(0, -4);
                      }
                  }

                  // 15. Consonant + ing patterns
                  else if (!vowel.includes(l4)) {
                      if (vowel.includes(l5)) {
                          if (l6 === l5 || (l4 === "r" && vowel.includes(l6))) {
                              possible_lemma = word.slice(0, -3);
                          } else if (
                              (l5 === "e" && l6 === "i") ||
                              (l4 === "r" && l5 === "u")
                          ) {
                              possible_lemma = word.slice(0, -3) + "e";
                          } else if (
                              (l4 === "t" && (l5 === "i" || l5 === "e"))
                          ) {
                              possible_lemma = word.slice(0, -3);
                          } else if (
                              (vowel.includes(l6) && l5 === l6) ||
                              (l6 === "u" && !(l5 === "a" && l4 === "t"))
                          ) {
                              possible_lemma = word.slice(0, -3) + "e";
                          } else if (
                              (l4 === "r" && vowel.includes(l6)) ||
                              (l4 === "g" && vowel.includes(l6)) ||
                              (l4 === "d" && vowel.includes(l6)) ||
                              l4 === "w"
                          ) {
                              possible_lemma = word.slice(0, -3);
                          } else {
                              possible_lemma = word.slice(0, -3) + "e";
                          }
                      } else if (eBackExceptions.has(l5 + l4)) {
                          possible_lemma = word.slice(0, -3) + "e";
                      } else if (!vowel.includes(l5)) {
                          possible_lemma = word.slice(0, -3);
                      }
                  }

                  // 16. Vowel + ing patterns
                  else if (vowel.includes(l4)) {
                      if (l4 === l5) {
                          possible_lemma = word.slice(0, -4);
                      } else {
                          possible_lemma = word.slice(0, -4) + "e";
                      }
                  }

                  // 17. Fallback
                  else {
                      possible_lemma = word;
                  }
          } else {
            possible_lemma = word;
          }
        }

        diff_words.push(possible_lemma);
        if (word == "" || word == "-" || word == "–" || word == "—" || word == "–"){
            diff_words.pop();
        }

    });
    return diff_words;
}

//Oldie but goodie
function safeDivision(x, y) {
    if (typeof x !== "number" || typeof y !== "number") {
        return 0;
    }
    if (y === 0) {
        return 0;
    }
    return x / y;
}

//Takes a string, provides word count
function CountWords(text) {
    // 1. Lowercase
    var cleaned = text.toLowerCase();
    // 2. Remove punctuation except hyphens and apostrophes
    cleaned = cleaned.replace(/[#"!$%\^&\*;:?{}=\_`~()]/g, "");
    // 3. Convert em/en dashes to spaces
    cleaned = cleaned.replace(/[\u2014\u2013]/g, " ");
    // 4. Normalize slashes, newlines, backslashes to spaces
    cleaned = cleaned.replace(/[\r\n\/\\]+/g, " ");
    // 5. Hyphen exceptions
    var hyphenExceptions = {
        "pre": 1, "non": 1, "re": 1, "co": 1, "semi": 1, "quasi": 1,
        "post": 1, "pro": 1, "under": 1, "mid": 1, "inter": 1,
        "pseudo": 1, "anti": 1, "contra": 1, "multi": 1, "ultra": 1
    };
    // 6. Split hyphenated words unless first part is an exception
    cleaned = cleaned.replace(/\b([a-z0-9]+(?:-[a-z0-9]+)+)\b/gi, function(match) {
        var parts = match.split("-");
        var first = parts[0].toLowerCase();
        // If first part is an exception, keep the hyphenated word intact
        if (hyphenExceptions[first]) {
            return match;
        }
        // Otherwise split into separate words
        return parts.join(" ");
    });
    // 7. Collapse multiple spaces
    cleaned = cleaned.replace(/\s+/g, " ");
    // 8. Trim leading/trailing spaces
    cleaned = cleaned.replace(/^\s+|\s+$/g, "");
    // 9. Handle empty string
    if (cleaned === "") {
        return 0;
    }
    // 10. Split and count
    return cleaned.split(" ").length;
}

//Takes a string, provides a sentence count based on punctuation and line breaks
function CountSentences(text) {
    // Split on sentence-ending punctuation or line breaks
    var parts = text.split(/[.?!]+|\r\n|\n|\r/);
    // Remove empty entries caused by trailing punctuation or blank lines
    var count = 0;
    for (var i = 0; i < parts.length; i++) {
        if (parts[i].replace(/\s+/g, "") !== "") {
            count++;
        }
    }
    return count;
}

//Takes a string and provides the mean length of sentences.
const CalculateMLS = function(text){
    let sentences = ProvideSentences(text);
    let wordCount = 0;
    for (let i=0; i<sentences.length; i++){
        wordCount += CountWords(sentences[i]);
    }
    return safeDivision(wordCount, sentences.length)
}

//Takes a string, provides array of clean words (no punctuation) and capitalization removed
const ProvideWords = function (text){
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
const ProvideWordsWithPunctuation = function(text){
    let words = text.split(" ");
    for (let i=0; i<words.length; i++){
        if (words[i] == ""){
            words.splice(i,1)
        }
    } 
    return words;
}

//Takes a number (for n) and a string, provides an array of n-grams
const ProvideNgrams = function (number, text){
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
function ProvideSentences(text) {
    // 1. Normalize line breaks into ". "
    var cleaned = text.replace(/(\r\n|\n|\r)/g, ". ");

    // 2. Abbreviations that should NOT trigger a split
    var abbreviations = {
        "mr.": 1, "mrs.": 1, "ms.": 1, "dr.": 1, "prof.": 1,
        "sr.": 1, "st.": 1
    };
    var sentences = [];
    var buffer = "";
    var i = 0;
    var len = cleaned.length;
    while (i < len) {
        var ch = cleaned.charAt(i);
        buffer += ch;
        // Sentence-ending punctuation
        if (ch === "." || ch === "!" || ch === "?") {
            // Look ahead to skip whitespace
            var j = i + 1;
            while (j < len && /\s/.test(cleaned.charAt(j))) {
                j++;
            }
            // Extract last word in buffer
            var trimmed = buffer.replace(/^\s+|\s+$/g, "");
            var parts = trimmed.split(/\s+/);
            var lastWord = parts[parts.length - 1].toLowerCase();
            // Check abbreviation
            if (!abbreviations[lastWord]) {
                // Valid sentence boundary
                sentences.push(trimmed);
                buffer = "";
                i = j - 1; // jump to next non-space
            }
        }
        i++;
    }
    // Push any remaining text
    var leftover = buffer.replace(/^\s+|\s+$/g, "");
    if (leftover !== "") {
        sentences.push(leftover);
    }
    return sentences;
}

//Takes a number (n) which represents the n-grams to be compared, then a string (written text) and a second string (scoure text). 
//Returns a percentage copied by n-gram and an index of the copied words that can be matched to an array of words
const CompareWritingToSource = function (n, writing, source){
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
const CheckForKeywordsPreprocessed = function(writing, keywords){
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
const CheckForKeywordsAndPhrasesPreprocessed = function(writing, keywords){
    let counter = 0;
    const indexes = [];
    const lengths = [];
    const individualCounts = new Map();
    const keyOrder = [];

    // init counts
    for (const kw of keywords) {
        individualCounts.set(kw, 0);
    }

    //adds keyOrdermap
    const keywordIndexMap = new Map();
    keywords.forEach((kw, idx) => {
        keywordIndexMap.set(kw, idx);
    });


    // bucket keywords by length, store tokenized form + wildcard info
    const buckets = { 1: [], 2: [], 3: [], 4: [], 5: [] };

    for (const kw of keywords) {
        const parts = kw.split(" ");
        const len = parts.length;
        if (len < 1 || len > 5) continue;

        const hasWildcard = len >= 3 && parts.includes("*"); // your rule
        buckets[len].push({
            raw: kw,
            parts,
            hasWildcard
        });
    }

    const matchWithWildcards = (slice, parts) => {
        for (let i = 0; i < parts.length; i++) {
            if (parts[i] !== "*" && parts[i] !== slice[i]) {
                return false;
            }
        }
        return true;
    };

    // slide over writing and try 1–5-grams at each position
    for (let start = 0; start < writing.length; start++) {
        for (let n = 1; n <= 5; n++) {
            if (start + n > writing.length) break;

            const slice = writing.slice(start, start + n);
            const keys = buckets[n];
            if (!keys.length) continue;

            for (const key of keys) {
                let isMatch = false;

                if (key.hasWildcard) {
                    // wildcard match (only for len >= 3)
                    isMatch = matchWithWildcards(slice, key.parts);
                } else {
                    // exact match
                    let ok = true;
                    for (let i = 0; i < n; i++) {
                        if (slice[i] !== key.parts[i]) {
                            ok = false;
                            break;
                        }
                    }
                    isMatch = ok;
                }

                if (isMatch) {
                    counter++;
                    individualCounts.set(
                        key.raw,
                        individualCounts.get(key.raw) + 1
                    );
                    indexes.push(start); // start index in writing
                    lengths.push(n);     // phrase length in words
                    keyOrder.push(keywordIndexMap.get(key.raw)); // Pushes keyOrders
                }
            }
        }
    }

    return {"count" : counter, "keycounts": individualCounts, "indexes": indexes, "lengths": lengths, "keyOrder": keyOrder}
}

//Takes a pre-processed array of writing. Recommend using lemmatize to create word lists.
//Provides a count of different words and a map of all different words and the counts of each. Use X.DWCounts.get("word") to retrieve. Use "for (let [key, value] of X.DWcounts)" to itterate
function DifferentWordsPreprocessed(array) {
    var counts = new Map();
    var i, word;

    // Count each word in one pass
    for (i = 0; i < array.length; i++) {
        word = array[i];

        if (counts.has(word)) {
            counts.set(word, counts.get(word) + 1);
        } else {
            counts.set(word, 1);
        }
    }

    // NDW = number of unique keys
    return {
        NDW: counts.size,
        DWCounts: counts
    };
}

//Takes a pre-processed array of writing. Removes all function words (pronouns, prepositions, articles) - useful for types of text density / TTR ratios.
const RemoveFunctionWords = function(inputArray){
  return inputArray.filter(word => !FunctionWords.includes(word));
}

//Takes true / false (true = remove function words, false = do not remove them) and a pre-processed (already lemmatized) array of writing. Calculates CTTR.
const CalculateCTTRfromArray = function(remove, array){
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
const CalculateCTTRfromText = function(remove, text){
    let theLemmas = Lemmatize(text);
    if (remove == true) {
        RemoveFunctionWords(theLemmas);
    }
    let WC = theLemmas.length;
    return safeDivision(DifferentWordsPreprocessed(theLemmas).NDW, ((2 * WC) ** 0.5))
}

//Takes a text and creates an array of original words with an index that will match lemmatization (i.e. breaks up the contractions)
const MakeMatchingArrayforLemmatization = function(text) {
    let temp1 = text.toLowerCase();
    let temp2 = temp1.replace(/[#"!$%\^&\*;:?{}=\_`~()]/gm,"");
    temp2 = temp2.replace(/[\u2014\u2013]/gm, " ");
    temp2 = temp2.replace(/[\r\n/\\]+/gm, " ");
    const hyphenExceptions = ["pre", "non", "re", "co", "semi", "quasi", "post", "pro", "under", "mid", "inter", "pseudo", "anti", "contra", "multi", "ultra"];
    const replaceHyphen = (str) => {
      return str.replace(/\b([a-z0-9]+(?:-[a-z0-9]+)+)\b/gi, (match) => {
        const parts = match.split("-");
        const first = parts[0].toLowerCase();

        // If the first part is an exception, keep the whole word
        if (hyphenExceptions.includes(first)) {
          return match;
        }

        // Otherwise split into separate words
        return parts.join(" ");
      });
    };
    let temp3 = replaceHyphen(temp2);
    let temp4 = temp3.replace(/\s\s+/g, ' ');
    let results1 = temp4.split(" ");
    let results = [];

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

  return results;
};

//Counts syllables
const syllableCount = function(word) {
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

const countSyllablesArray = function(array){
  let sylCount = 0;
  for (let i=0; i<array.length; i++){
    sylCount += syllableCount(array[i])
  }
  return sylCount;
}

const FleschKincaid = function(text){
  let sent = CountSentences(text);
  let words = CountWords(text);
  let allWords = ProvideWords(text);
  let syllables = countSyllablesArray(allWords);
  let ReadingEase = 206.835 - (1.015*(safeDivision(words,sent))) - (84.6 * (safeDivision(syllables, words)));
  let GradeLevel = (0.39*(safeDivision(words,sent))) + (11.8 * (safeDivision(syllables, words))) - 15.59;
  return {"RE" : ReadingEase, "GL": GradeLevel}
}

const convertNumbertoWord = function(tempString){
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
const sanitizeText = function (firsttext) {
    // 1. Convert full-width ASCII range (！ to ～) to half-width
    firsttext = firsttext.replace(/[\uFF01-\uFF5E]/g, ch =>
      String.fromCharCode(ch.charCodeAt(0) - 0xFEE0)
    );

    // 2. Convert full-width space → normal space
    firsttext = firsttext.replace(/\u3000/g, ' ');

    // 3. Convert Japanese punctuation to ASCII
    firsttext = firsttext
      .replace(/、/g, ',')   // Japanese comma
      .replace(/。/g, '.');  // Japanese period

    // 4. Normalize Japanese quotation marks → "
    firsttext = firsttext.replace(/[「」『』【】《》]/g, '"');

    // 5. Normalize curly quotes and similar punctuation
    firsttext = firsttext
      .replace(/[\u2018\u2019]/g, "'")   // curly single quotes
      .replace(/[\u201C\u201D]/g, '"')   // curly double quotes
      .replace(/\u2026/g, '…');          // keep ellipsis (allowed)

    // 6. Allow em-dash — but convert other dashes to ASCII hyphen
    firsttext = firsttext.replace(/[–―]/g, '-');   // en-dash, horizontal bar → hyphen
    // em-dash (—) is allowed, so we do NOT replace it

    // 7. Remove any remaining Japanese characters (kanji, kana)
    firsttext = firsttext.replace(/[\u3040-\u30FF\u4E00-\u9FFF]/g, '');

    // 8. Replace line breaks with space
    firsttext = firsttext.replace(/[\r\n]+/g, ' ');

    // 9. Collapse multiple spaces
    firsttext = firsttext.replace(/\s\s+/g, ' ');

    return firsttext.trim();
};

//Takes string of elementID and uses that to grab the "value" property (for inputs and text areas) and then returns sanitzed text.
const grabCleanText = function(elementID){
  let thisText = document.getElementById(elementID).value;
  return sanitizeText(thisText);
}

//Requires loading the ngsl.js first. This one takes an array of pre-lematized words.
const NGSLPercentage = function(array){
    var total = array.length;
    var count = 0;
    // Convert NGSL array to a Set-like lookup table (only once!)
    if (!NGSL._lookup) {
        var lookup = {};
        for (var i = 0; i < NGSL.length; i++) {
            lookup[NGSL[i]] = 1;
        }
        NGSL._lookup = lookup;
    }
    var table = NGSL._lookup;
    // Count NGSL words
    for (var j = 0; j < array.length; j++) {
        if (table[array[j]]) {
            count++;
        }
    }
    return safeDivision(count, total);
}

//Takes an array of pre-lematized words. Runs a check of repeated words/phrases that are suspicious
const bullshitRepetition = function(array){
    var numWords = array.length;
    var oneWord = [];
    var twoWord = [];
    var threeWord = [];
    var i;
    // --- 1-word repetition ---
    for (i = 0; i < numWords - 1; i++) {
        if (array[i] === array[i + 1]) {
            oneWord.push(i);
        }
    }
    // --- 2-word repetition ---
    for (i = 0; i < numWords - 3; i++) {
        if (indexNotFlagged(i, oneWord) && indexNotFlagged(i, twoWord)) {
            var a1 = array[i] + " " + array[i + 1];
            var b1 = array[i + 1] + " " + array[i + 2];
            var b2 = array[i + 2] + " " + array[i + 3];

            if (a1 === b1 || a1 === b2) {
                twoWord.push(i);
            }
        }
    }
    // --- 3-word repetition ---
    for (i = 0; i < numWords - 5; i++) {
        if (
            indexNotFlagged(i, oneWord) &&
            indexNotFlagged(i, twoWord) &&
            indexNotFlagged(i, threeWord)
        ) {
            var p1 = array[i] + " " + array[i + 1] + " " + array[i + 2];
            var q1 = array[i + 2] + " " + array[i + 3] + " " + array[i + 4];
            var q2 = array[i + 1] + " " + array[i + 2] + " " + array[i + 3];
            var q3 = array[i + 3] + " " + array[i + 4] + " " + array[i + 5];

            if (p1 === q1 || p1 === q2 || p1 === q3) {
                threeWord.push(i);
            }
        }
    }

    var total = oneWord.length + twoWord.length + threeWord.length;
    return safeDivision(total, numWords);
}

// Helper: avoid repeated .includes() calls
function indexNotFlagged(i, arr) {
    for (var j = 0; j < arr.length; j++) {
        if (arr[j] === i) return false;
    }
    return true;
}


//Takes a pre-lemmatized array and checks for nonsense by using the NGSL and bullshitRepetion functions. Returns true if nonsense is detected, otherwise, false.
const checkForNonsense = function(array){
  let thisBS = bullshitRepetition(array);
  let thisNGSL = NGSLPercentage(array);
  if (thisNGSL < 0.6 || thisBS > 0.3){
    return true;
  } else {
    return false;
  }
}

const checkForAI = function(text){
    const signals = ["**","translated by","deepl","delv","—","+1","+2",
      "i don't have access",
      "i cannot access",
      "i can't access",
      "i can't view",
      "i can't watch",
      "i am unable to access",
      "as an ai",
      "as a language model",
      "i can't open that link",
      "i can't browse the internet",
      "i cannot browse the internet",
      "i can't browse",
      "i don't have the ability to",
      "if you can provide the text",
      "if you can provide more details",
      "sorry, but i can't",
    ];
    const lower = text.toLowerCase();
    return signals.some(sig => lower.includes(sig));
}

//Requires loading the cefrJ.js first. This one takes an array of pre-lematized words.
const cefrJpercentage = function(array){
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