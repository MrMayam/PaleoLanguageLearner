// Character image imports for diverse children as ancient Israelites
import scholarImg from "@assets/download_1751002902762.jpeg";
import storytellerImg from "@assets/download (1)_1751002902758.jpeg";
import explorerImg from "@assets/download (2)_1751002902759.jpeg";
import guardianImg from "@assets/download (3)_1751002902760.jpeg";
import artistImg from "@assets/download (4)_1751002902760.jpeg";

// Small character images for compact displays
import smallScholarImg from "@assets/download_1751004963176.jpeg";
import smallStorytellerImg from "@assets/download (1)_1751004963170.jpeg";
import smallExplorerImg from "@assets/download (2)_1751004963175.jpeg";
import smallGuardianImg from "@assets/download (9)_1751004963176.jpeg";

export const ancientCharacters = {
  scholar: scholarImg,
  storyteller: storytellerImg,
  explorer: explorerImg,
  guardian: guardianImg,
  artist: artistImg
};

// Small versions for compact displays
export const smallCharacters = {
  scholar: smallScholarImg,
  storyteller: smallStorytellerImg,
  explorer: smallExplorerImg,
  guardian: smallGuardianImg,
  artist: artistImg // Using regular size for artist as no small version provided
};

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