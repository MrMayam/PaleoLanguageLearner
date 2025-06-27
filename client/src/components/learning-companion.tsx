import { ancientCharacters, characterData } from "@/assets/characters";

interface LearningCompanionProps {
  characterId?: string;
  size?: "sm" | "md" | "lg";
  showName?: boolean;
  className?: string;
}

export function LearningCompanion({ 
  characterId = "scholar", 
  size = "md", 
  showName = false,
  className = "" 
}: LearningCompanionProps) {
  const character = characterData.find(c => c.id === characterId) || characterData[0];
  
  const sizeClasses = {
    sm: "w-12 h-18",
    md: "w-16 h-24", 
    lg: "w-20 h-30"
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div 
        className={`${sizeClasses[size]} bg-white rounded-lg shadow-md flex items-center justify-center`}
        dangerouslySetInnerHTML={{ 
          __html: ancientCharacters[character.id as keyof typeof ancientCharacters] 
        }}
      />
      {showName && (
        <p className="text-xs text-center mt-1 text-gray-600 fredoka">
          {character.name}
        </p>
      )}
    </div>
  );
}