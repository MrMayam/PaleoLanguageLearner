// Authentic Paleo Hebrew character data with ancient names and meanings
export interface PaleoHebrewCharacter {
  id: number;
  name: string;
  character: string;
  sound: string;
  order: number;
  description: string;
  meaning: string;
  shape: string;
  modernEquivalent: string;
}

export const paleoHebrewCharacters: PaleoHebrewCharacter[] = [
  {
    id: 1,
    name: "Ah-Lap",
    character: "𐤀",
    sound: "Ah",
    order: 1,
    description: "First letter, represents an ox head",
    meaning: "Ox, cattle, strength, leader",
    shape: "Ox head with horns",
    modernEquivalent: "א (Aleph)"
  },
  {
    id: 2,
    name: "Ba-Yath",
    character: "𐤁",
    sound: "Ba",
    order: 2,
    description: "House, represents a dwelling place",
    meaning: "House, tent, family, in",
    shape: "Floor plan of a house",
    modernEquivalent: "ב (Bet)"
  },
  {
    id: 3,
    name: "Ga-Mal",
    character: "𐤂",
    sound: "Ga",
    order: 3,
    description: "Camel, represents a walking stick or staff",
    meaning: "Camel, lift up, pride",
    shape: "Camel's hump or throwing stick",
    modernEquivalent: "ג (Gimel)"
  },
  {
    id: 4,
    name: "Da-Lath",
    character: "𐤃",
    sound: "Da",
    order: 4,
    description: "Door, represents an entrance or pathway",
    meaning: "Door, path, hang, dangle",
    shape: "Tent door hanging",
    modernEquivalent: "ד (Dalet)"
  },
  {
    id: 5,
    name: "Ha",
    character: "𐤄",
    sound: "Ha",
    order: 5,
    description: "Window, represents light and revelation",
    meaning: "Behold, window, breath, sigh",
    shape: "Window with lattice work",
    modernEquivalent: "ה (Hey)"
  },
  {
    id: 6,
    name: "Wa-Wa",
    character: "𐤅",
    sound: "Wa",
    order: 6,
    description: "Nail or tent peg, represents connection",
    meaning: "Nail, peg, hook, add, secure",
    shape: "Tent peg or nail",
    modernEquivalent: "ו (Vav)"
  },
  {
    id: 7,
    name: "Za-Yan",
    character: "𐤆",
    sound: "Za",
    order: 7,
    description: "Weapon or mattock, represents tool for cutting",
    meaning: "Weapon, sword, cut, harvest",
    shape: "Mattock or weapon",
    modernEquivalent: "ז (Zayin)"
  },
  {
    id: 8,
    name: "Chaa-Lan",
    character: "𐤇",
    sound: "Chaa",
    order: 8,
    description: "Fence or wall, represents enclosure and protection",
    meaning: "Fence, wall, outside, divide",
    shape: "Fence posts connected",
    modernEquivalent: "ח (Chet)"
  },
  {
    id: 9,
    name: "Ta",
    character: "𐤈",
    sound: "Ta",
    order: 9,
    description: "Snake or serpent, represents cunning and wisdom",
    meaning: "Snake, serpent, surround",
    shape: "Coiled snake",
    modernEquivalent: "ט (Tet)"
  },
  {
    id: 10,
    name: "Yad",
    character: "𐤉",
    sound: "Ya",
    order: 10,
    description: "Hand or arm, represents work and deed",
    meaning: "Hand, arm, work, throw, make",
    shape: "Hand and forearm",
    modernEquivalent: "י (Yud)"
  },
  {
    id: 11,
    name: "Ka-Phan",
    character: "𐤊",
    sound: "Ka",
    order: 11,
    description: "Palm of hand, represents bent or curved",
    meaning: "Palm, bend, curve, allow, tame",
    shape: "Curved palm of hand",
    modernEquivalent: "כ (Kaf)"
  },
  {
    id: 12,
    name: "La-Mam",
    character: "𐤋",
    sound: "La",
    order: 12,
    description: "Shepherd's staff, represents authority and teaching",
    meaning: "Staff, goad, toward, teach, yoke",
    shape: "Shepherd's crook or goad",
    modernEquivalent: "ל (Lamed)"
  },
  {
    id: 13,
    name: "Ma-Yam",
    character: "𐤌",
    sound: "Ma",
    order: 13,
    description: "Water, represents chaos and mighty",
    meaning: "Water, mighty, blood, chaos",
    shape: "Waves of water",
    modernEquivalent: "מ (Mem)"
  },
  {
    id: 14,
    name: "Na-Chash",
    character: "𐤍",
    sound: "Na",
    order: 14,
    description: "Fish or seed, represents life and activity",
    meaning: "Fish, seed, activity, life",
    shape: "Swimming fish",
    modernEquivalent: "ן/נ (Nun)"
  },
  {
    id: 15,
    name: "Sa-Mak",
    character: "𐤎",
    sound: "Sa",
    order: 15,
    description: "Thorn or prop, represents support and memory",
    meaning: "Thorn, grab, hate, protect",
    shape: "Thorn or support post",
    modernEquivalent: "ס (Samech)"
  },
  {
    id: 16,
    name: "I-Yan",
    character: "𐤏",
    sound: "I",
    order: 16,
    description: "Eye, represents sight and knowledge",
    meaning: "Eye, see, know, shade, experience",
    shape: "Eye with pupil",
    modernEquivalent: "ע (Ayin)"
  },
  {
    id: 17,
    name: "Pa",
    character: "𐤐",
    sound: "Pa",
    order: 17,
    description: "Mouth, represents speech and communication",
    meaning: "Mouth, speak, word, edge",
    shape: "Open mouth",
    modernEquivalent: "פ/ף (Pey)"
  },
  {
    id: 18,
    name: "Tza-Da",
    character: "𐤑",
    sound: "Tza",
    order: 18,
    description: "Fish hook, represents desire and need",
    meaning: "Fish hook, desire, need, hunt",
    shape: "Fishing hook",
    modernEquivalent: "צ/ץ (Tzade)"
  },
  {
    id: 19,
    name: "Qa-Phan",
    character: "𐤒",
    sound: "Qa",
    order: 19,
    description: "Back of head, represents what is behind",
    meaning: "Back of head, behind, last, least",
    shape: "Back of head with hair",
    modernEquivalent: "ק (Qof)"
  },
  {
    id: 20,
    name: "Ra-Ash",
    character: "𐤓",
    sound: "Ra",
    order: 20,
    description: "Head of man, represents highest and first",
    meaning: "Head, top, beginning, first, chief",
    shape: "Profile of head",
    modernEquivalent: "ר (Resh)"
  },
  {
    id: 21,
    name: "Sha-Yan",
    character: "𐤔",
    sound: "Sha",
    order: 21,
    description: "Teeth, represents sharp and press",
    meaning: "Teeth, sharp, press, eat, two",
    shape: "Two front teeth",
    modernEquivalent: "ש (Shin)"
  },
  {
    id: 22,
    name: "Tha-Wa",
    character: "𐤕",
    sound: "Tha",
    order: 22,
    description: "Mark or cross, represents sign and covenant",
    meaning: "Mark, sign, signal, monument",
    shape: "Cross or mark",
    modernEquivalent: "ת (Tav)"
  }
];

// Audio file mappings for each character
export const characterAudioFiles: Record<string, string> = {
  "Ah-Lap": "/audio/ah-lap.mp3",
  "Ba-Yath": "/audio/ba-yath.mp3",
  "Ga-Mal": "/audio/ga-mal.mp3",
  "Da-Lath": "/audio/da-lath.mp3",
  "Ha": "/audio/ha.mp3",
  "Wa-Wa": "/audio/wa-wa.mp3",
  "Za-Yan": "/audio/za-yan.mp3",
  "Chaa-Lan": "/audio/chaa-lan.mp3",
  "Ta": "/audio/ta.mp3",
  "Yad": "/audio/yad.mp3",
  "Ka-Phan": "/audio/ka-phan.mp3",
  "La-Mam": "/audio/la-mam.mp3",
  "Ma-Yam": "/audio/ma-yam.mp3",
  "Na-Chash": "/audio/na-chash.mp3",
  "Sa-Mak": "/audio/sa-mak.mp3",
  "I-Yan": "/audio/i-yan.mp3",
  "Pa": "/audio/pa.mp3",
  "Tza-Da": "/audio/tza-da.mp3",
  "Qa-Phan": "/audio/qa-phan.mp3",
  "Ra-Ash": "/audio/ra-ash.mp3",
  "Sha-Yan": "/audio/sha-yan.mp3",
  "Tha-Wa": "/audio/tha-wa.mp3",
};

// Example ancient Hebrew words using these characters
export const ancientWords = [
  {
    id: 1,
    characters: ["Ah-Lap", "Ba-Yath"],
    sounds: ["Ah", "Ba"], 
    meaning: "Father",
    pronunciation: "Ah-Ba",
    description: "The word for father, combining strength (ox) and house"
  },
  {
    id: 2,
    characters: ["Ba-Yath", "Yad", "Tha-Wa"],
    sounds: ["Ba", "Ya", "Tha"],
    meaning: "House",
    pronunciation: "Ba-Ya-Tha",
    description: "House or dwelling place with the mark of ownership"
  },
  {
    id: 3,
    characters: ["Yad", "Ah-Lap", "Da-Lath"],
    sounds: ["Ya", "Ah", "Da"],
    meaning: "Hand",
    pronunciation: "Ya-Ah-Da", 
    description: "The working hand that leads and opens doors"
  },
  {
    id: 4,
    characters: ["Ma-Yam", "Yad", "Mam"],
    sounds: ["Ma", "Ya", "Ma"],
    meaning: "Water",
    pronunciation: "Ma-Ya-Ma",
    description: "The mighty waters worked by the hand"
  },
  {
    id: 5,
    characters: ["Ra-Ash", "Ah-Lap", "Sha-Yan"],
    sounds: ["Ra", "Ah", "Sha"],
    meaning: "Head", 
    pronunciation: "Ra-Ah-Sha",
    description: "The head of strength that is sharp and first"
  }
];

// Learning tips for each character
export const learningTips: Record<string, string[]> = {
  "Ah-Lap": [
    "Remember the ox horns in the shape",
    "First letter, like 'A' is first in English",
    "Think of strength and leadership"
  ],
  "Ba-Yath": [
    "Picture a house floor plan",
    "Think of 'Ba' as in 'baby' at home", 
    "Remember family and dwelling"
  ],
  "Ga-Mal": [
    "Visualize a camel's hump",
    "Think of lifting up and pride",
    "Remember the walking staff shape"
  ],
  // Add more tips for other characters...
};
