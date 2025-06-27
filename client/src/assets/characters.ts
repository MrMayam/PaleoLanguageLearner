// Character image imports for diverse children as ancient Israelites
import scholarImg from "@assets/download_1751002902762.jpeg";
import storytellerImg from "@assets/download (1)_1751002902758.jpeg";
import explorerImg from "@assets/download (2)_1751002902759.jpeg";
import guardianImg from "@assets/download (3)_1751002902760.jpeg";
import artistImg from "@assets/download (4)_1751002902760.jpeg";

// Animal character imports for Hebrew letter meanings
import oxImg from "@assets/download (1)_1751005336967.jpeg";
import camelImg from "@assets/download (2)_1751005336969.jpeg";
import fishImg from "@assets/download (9)_1751005336970.jpeg";
import serpentImg from "@assets/download_1751005336970.jpeg";

export const ancientCharacters = {
  scholar: scholarImg,

  storyteller: storytellerImg,

  explorer: explorerImg,

  guardian: guardianImg,

  artist: artistImg
};

export const animalCharacters = {
  ox: oxImg,
  camel: camelImg,
  fish: fishImg,
  serpent: serpentImg
};

export const animalData = [
  {
    id: "ox",
    name: "Strong Ox",
    description: "Represents the letter Ah-Lap - strength and leadership",
    hebrewLetter: "𐤀",
    meaning: "ox, strength, leader"
  },
  {
    id: "camel",
    name: "Noble Camel", 
    description: "Represents the letter Ga-Mal - lifting up and pride",
    hebrewLetter: "𐤂",
    meaning: "camel, lift up, pride"
  },
  {
    id: "fish",
    name: "Swimming Fish",
    description: "Represents the letter Na-Chash or Ma-Yam - water and life",
    hebrewLetter: "𐤌",
    meaning: "water, chaos, mighty"
  },
  {
    id: "serpent",
    name: "Wise Serpent",
    description: "Represents the letter Na-Chash - whisper and magic",
    hebrewLetter: "𐤍",
    meaning: "snake, whisper, magic"
  }
];

export const characterData = [
  {
    id: "scholar",
    name: "Miriam the Scholar",
    description: "A wise young scholar who loves learning ancient Hebrew",
    personality: "thoughtful and curious"
  },
  {
    id: "storyteller", 
    name: "David the Storyteller",
    description: "An expressive child who brings ancient stories to life",
    personality: "animated and engaging"
  },
  {
    id: "explorer",
    name: "Sarah the Explorer", 
    description: "A brave young explorer discovering ancient lands",
    personality: "adventurous and determined"
  },
  {
    id: "guardian",
    name: "Joshua the Guardian",
    description: "A strong protector watching over the ancient knowledge",
    personality: "brave and protective"
  },
  {
    id: "artist",
    name: "Rebecca the Artist",
    description: "A creative young artist who paints ancient stories",
    personality: "imaginative and joyful"
  }
];