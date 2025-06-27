import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { animalCharacters, animalData } from "@/assets/characters";

interface AnimalShowcaseProps {
  className?: string;
}

export function AnimalShowcase({ className = "" }: AnimalShowcaseProps) {
  const [currentAnimal, setCurrentAnimal] = useState(0);

  const nextAnimal = () => {
    setCurrentAnimal((prev) => (prev + 1) % animalData.length);
  };

  const prevAnimal = () => {
    setCurrentAnimal((prev) => (prev - 1 + animalData.length) % animalData.length);
  };

  const animal = animalData[currentAnimal];

  return (
    <Card className={`bg-gradient-to-br from-green-100 to-blue-100 border-2 border-green-300 ${className}`}>
      <CardContent className="p-6">
        <h3 className="text-xl fredoka text-center text-green-800 mb-4">
          Sacred Animals of Ancient Hebrew
        </h3>
        
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={prevAnimal}
            className="text-green-600 hover:bg-green-200 p-2"
          >
            <ChevronLeft size={20} />
          </Button>

          <div className="flex-1 text-center">
            <div className="w-32 h-32 mx-auto mb-4 bg-white rounded-xl shadow-lg overflow-hidden">
              <img 
                src={animalCharacters[animal.id as keyof typeof animalCharacters] as string}
                alt={animal.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="text-4xl mb-2">{animal.hebrewLetter}</div>
            <h4 className="text-lg fredoka text-green-800 mb-1">{animal.name}</h4>
            <p className="text-green-600 text-sm mb-2">{animal.meaning}</p>
            <p className="text-green-600 text-xs italic">{animal.description}</p>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={nextAnimal}
            className="text-green-600 hover:bg-green-200 p-2"
          >
            <ChevronRight size={20} />
          </Button>
        </div>

        <div className="flex justify-center mt-4 space-x-1">
          {animalData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentAnimal(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentAnimal ? 'bg-green-500' : 'bg-green-300'
              }`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}