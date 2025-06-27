import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import type { PaleoCharacter } from "@shared/schema";
import { useCharacterSound } from "@/lib/audio-context";

interface CharacterCardProps {
  character: PaleoCharacter;
  isLearned?: boolean;
  onClick?: () => void;
}

export function CharacterCard({ character, isLearned = false, onClick }: CharacterCardProps) {
  const { playSound, isLoading } = useCharacterSound();

  const handlePlaySound = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await playSound(character.name, character.sound);
  };

  const colors = [
    "from-orange-400 to-red-400",
    "from-teal-400 to-blue-400", 
    "from-purple-400 to-pink-400",
    "from-green-400 to-teal-400",
    "from-yellow-400 to-orange-400",
  ];
  
  const colorIndex = character.id % colors.length;
  const gradientClass = colors[colorIndex];

  return (
    <Card 
      className={`hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer bg-white relative ${
        isLearned ? 'ring-2 ring-green-400' : ''
      }`}
      onClick={onClick}
    >
      <CardContent className="p-4 text-center">
        <div className={`w-16 h-16 bg-gradient-to-br ${gradientClass} rounded-2xl flex items-center justify-center mx-auto mb-3 text-white text-2xl font-bold shadow-lg`}>
          {character.character}
        </div>
        <h3 className="text-sm fredoka text-gray-800 mb-1">{character.name}</h3>
        <p className="text-gray-600 text-xs mb-3">Sound: "{character.sound}"</p>
        <Button 
          onClick={handlePlaySound}
          disabled={isLoading}
          className={`bg-gradient-to-r ${gradientClass} hover:opacity-90 text-white px-4 py-2 rounded-xl font-semibold text-sm w-full transition-all duration-200 disabled:opacity-50`}
        >
          <Play className="mr-2" size={12} />
          {isLoading ? "Playing..." : "Listen"}
        </Button>
      </CardContent>
      
      {isLearned && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
          ✓
        </div>
      )}
    </Card>
  );
}
