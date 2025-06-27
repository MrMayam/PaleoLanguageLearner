import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ancientCharacters, characterData } from "@/assets/characters";

interface CharacterShowcaseProps {
  className?: string;
}

export function CharacterShowcase({ className = "" }: CharacterShowcaseProps) {
  const [currentCharacter, setCurrentCharacter] = useState(0);

  const nextCharacter = () => {
    setCurrentCharacter((prev) => (prev + 1) % characterData.length);
  };

  const prevCharacter = () => {
    setCurrentCharacter((prev) => (prev - 1 + characterData.length) % characterData.length);
  };

  const character = characterData[currentCharacter];

  return (
    <Card className={`bg-gradient-to-br from-orange-100 to-yellow-100 border-orange-200 ${className}`}>
      <CardContent className="p-6">
        <div className="text-center mb-4">
          <h3 className="text-lg fredoka text-orange-700 mb-2">Meet Your Learning Friends</h3>
          <p className="text-orange-600 text-sm">Ancient Hebrew children who will guide your journey</p>
        </div>
        
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={prevCharacter}
            className="text-orange-600 hover:bg-orange-200 p-2"
          >
            <ChevronLeft size={20} />
          </Button>

          <div className="flex-1 text-center">
            <div className="w-24 h-36 mx-auto mb-3 rounded-xl overflow-hidden">
              <img 
                src={ancientCharacters[character.id as keyof typeof ancientCharacters] as string}
                alt={character.name}
                className="w-full h-full object-contain character-image-large"
              />
            </div>
            
            <h4 className="text-lg fredoka text-orange-800 mb-1">{character.name}</h4>
            <p className="text-orange-600 text-xs mb-1">{character.personality}</p>
            <p className="text-orange-600 text-xs italic">{character.description}</p>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={nextCharacter}
            className="text-orange-600 hover:bg-orange-200 p-2"
          >
            <ChevronRight size={20} />
          </Button>
        </div>

        <div className="flex justify-center mt-4 space-x-1">
          {characterData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentCharacter(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentCharacter ? 'bg-orange-500' : 'bg-orange-300'
              }`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}