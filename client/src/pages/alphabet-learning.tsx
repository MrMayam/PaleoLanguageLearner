import { AppHeader } from "@/components/app-header";
import { NavigationBar } from "@/components/navigation-bar";
import { CharacterCard } from "@/components/character-card";
import { LearningCompanion } from "@/components/learning-companion";
import { CelebrationModal } from "@/components/celebration-modal";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { ChevronLeft, BookOpen } from "lucide-react";
import { Link } from "wouter";
import type { PaleoCharacter, User, UserProgress } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useCharacterSound } from "@/lib/audio-context";

export default function AlphabetLearning() {
  const [selectedCharacter, setSelectedCharacter] = useState<PaleoCharacter | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationMessage, setCelebrationMessage] = useState("");
  const { playSound } = useCharacterSound();
  
  // For demo purposes, using user ID 1
  const userId = 1;

  const { data: user } = useQuery<User>({
    queryKey: [`/api/user/${userId}`],
  });

  const { data: characters = [] } = useQuery<PaleoCharacter[]>({
    queryKey: ["/api/characters"],
  });

  const { data: userProgress = [] } = useQuery<UserProgress[]>({
    queryKey: [`/api/user/${userId}/progress`],
  });

  const markAsLearnedMutation = useMutation({
    mutationFn: async (characterId: number) => {
      return apiRequest("POST", `/api/user/${userId}/progress/${characterId}`, {
        isLearned: true,
      });
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [`/api/user/${userId}`] });
      queryClient.invalidateQueries({ queryKey: [`/api/user/${userId}/progress`] });
      
      // Show celebration for new achievements
      response.json().then((data) => {
        if (data.newAchievements && data.newAchievements.length > 0) {
          setCelebrationMessage("Congratulations! You've unlocked new achievements!");
          setShowCelebration(true);
        }
      });
      
      // Character learned successfully
    },
  });

  const learnedCharacterIds = new Set(
    userProgress.filter(p => p.isLearned).map(p => p.characterId)
  );

  const handleLearnCharacter = (character: PaleoCharacter) => {
    setSelectedCharacter(character);
    if (!learnedCharacterIds.has(character.id)) {
      markAsLearnedMutation.mutate(character.id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 to-teal-400">
      <AppHeader user={user} />
      
      <main className="p-6 space-y-8 pb-24">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" className="text-white hover:bg-white/20 p-2">
              <ChevronLeft size={24} />
            </Button>
          </Link>
          <div className="text-center flex items-center gap-3">
            <LearningCompanion characterId="scholar" size="sm" />
            <div>
              <h1 className="text-2xl fredoka text-white drop-shadow-lg">Paleo Hebrew Alphabet</h1>
              <p className="text-white/90 text-sm">Learn all 22 ancient characters</p>
            </div>
          </div>
          <div className="w-10" /> {/* Spacer */}
        </div>

        {/* Character Detail Modal */}
        {selectedCharacter && (
          <Card className="bg-white shadow-2xl border-4 border-orange-200">
            <CardContent className="p-8 text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-red-400 rounded-3xl flex items-center justify-center mx-auto mb-6 text-white text-6xl font-bold shadow-lg">
                {selectedCharacter.character}
              </div>
              <h2 className="text-3xl fredoka text-gray-800 mb-2">{selectedCharacter.name}</h2>
              <p className="text-gray-600 mb-2">Sound: "{selectedCharacter.sound}"</p>
              <p className="text-gray-600 text-sm mb-6">{selectedCharacter.description}</p>
              
              <div className="flex gap-4 justify-center">
                <Button 
                  className="bg-purple-400 hover:bg-purple-500 text-white px-6 py-3 rounded-2xl font-bold"
                  onClick={() => {
                    if (selectedCharacter) {
                      playSound(selectedCharacter.name, selectedCharacter.sound);
                    }
                  }}
                >
                  🔊 Listen
                </Button>
                <Button 
                  className="bg-green-400 hover:bg-green-500 text-white px-6 py-3 rounded-2xl font-bold"
                  onClick={() => setSelectedCharacter(null)}
                >
                  Got It!
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Progress Overview */}
        <Card className="bg-white/90 backdrop-blur shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-orange-400 rounded-full flex items-center justify-center text-white">
                  <BookOpen size={24} />
                </div>
                <div>
                  <h3 className="fredoka text-gray-800 text-lg">Your Progress</h3>
                  <p className="text-gray-600 text-sm">
                    {learnedCharacterIds.size} of {characters.length} letters learned
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl fredoka text-orange-400">
                  {Math.round((learnedCharacterIds.size / characters.length) * 100)}%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Characters Grid */}
        <section>
          <h2 className="text-xl fredoka text-white mb-4 text-center drop-shadow-lg">
            Ancient Paleo Hebrew Characters
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {characters.map((character) => (
              <div
                key={character.id}
                className={`cursor-pointer transform transition-all duration-200 hover:scale-105 ${
                  learnedCharacterIds.has(character.id) ? 'ring-4 ring-green-400' : ''
                }`}
                onClick={() => handleLearnCharacter(character)}
              >
                <CharacterCard 
                  character={character} 
                  isLearned={learnedCharacterIds.has(character.id)}
                />
                {learnedCharacterIds.has(character.id) && (
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    ✓
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Learning Tips */}
        <Card className="bg-gradient-to-r from-purple-400 to-pink-400 text-white border-none">
          <CardContent className="p-6">
            <h3 className="fredoka text-xl mb-4">💡 Learning Tips</h3>
            <ul className="space-y-2 text-sm">
              <li>• Each character has an ancient name and authentic sound</li>
              <li>• Practice saying the character names out loud</li>
              <li>• Remember that these are the original forms of Hebrew letters</li>
              <li>• Try to connect each character to its meaning and symbol</li>
            </ul>
          </CardContent>  
        </Card>
      </main>

      <NavigationBar />
      <CelebrationModal 
        isOpen={showCelebration}
        onClose={() => setShowCelebration(false)}
        message={celebrationMessage}
      />
    </div>
  );
}
