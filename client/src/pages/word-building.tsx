import { AppHeader } from "@/components/app-header";
import { NavigationBar } from "@/components/navigation-bar";
import { CelebrationModal } from "@/components/celebration-modal";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { ChevronLeft, Puzzle, RotateCcw, Trash2 } from "lucide-react";
import { Link } from "wouter";
import type { PaleoCharacter, User } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useCharacterSound } from "@/lib/audio-context";

interface WordBuildingState {
  selectedCharacters: PaleoCharacter[];
  availableCharacters: PaleoCharacter[];
  builtWord: string;
  wordSound: string;
  wordsBuilt: number;
}

// Simple ancient words for demonstration
const ancientWords = [
  { characters: ["Ah-Lap", "Ba-Yath"], sounds: ["Ah", "Ba"], meaning: "Father" },
  { characters: ["Ba-Yath", "Yad", "Tza-Da"], sounds: ["Ba", "Ya", "Tza"], meaning: "House" },
  { characters: ["Yad", "Ah-Lap", "Da-Lath"], sounds: ["Ya", "Ah", "Da"], meaning: "Hand" },
];

export default function WordBuilding() {
  const [wordState, setWordState] = useState<WordBuildingState>({
    selectedCharacters: [],
    availableCharacters: [],
    builtWord: "",
    wordSound: "",
    wordsBuilt: 0,
  });
  
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
    enabled: true,
  });

  const updateWordBuildingMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("PATCH", `/api/user/${userId}/stats`, {
        wordBuildingScore: (user?.wordBuildingScore || 0) + 10,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/user/${userId}`] });
    },
  });

  // Initialize available characters when characters load
  useState(() => {
    if (characters.length > 0 && wordState.availableCharacters.length === 0) {
      setWordState(prev => ({
        ...prev,
        availableCharacters: characters.slice(0, 8), // Show first 8 characters
      }));
    }
  });

  const addCharacterToWord = (character: PaleoCharacter) => {
    if (wordState.selectedCharacters.length >= 4) {
      return;
    }

    setWordState(prev => ({
      ...prev,
      selectedCharacters: [...prev.selectedCharacters, character],
      builtWord: prev.builtWord + character.character,
      wordSound: prev.wordSound + character.sound + "-",
    }));

    // Character added to word
  };

  const removeLastCharacter = () => {
    if (wordState.selectedCharacters.length === 0) return;

    const newSelected = wordState.selectedCharacters.slice(0, -1);
    setWordState(prev => ({
      ...prev,
      selectedCharacters: newSelected,
      builtWord: newSelected.map(c => c.character).join(""),
      wordSound: newSelected.map(c => c.sound).join("-") + (newSelected.length > 0 ? "-" : ""),
    }));
  };

  const clearWord = () => {
    setWordState(prev => ({
      ...prev,
      selectedCharacters: [],
      builtWord: "",
      wordSound: "",
    }));
  };

  const saveWord = () => {
    if (wordState.selectedCharacters.length === 0) {
      return;
    }

    // Check if it matches a known ancient word
    const matchedWord = ancientWords.find(word => 
      word.characters.length === wordState.selectedCharacters.length &&
      word.characters.every((charName, index) => 
        wordState.selectedCharacters[index]?.name === charName
      )
    );

    if (matchedWord) {
      setCelebrationMessage(`Amazing! You built "${matchedWord.meaning}" - an ancient Hebrew word!`);
      setShowCelebration(true);
      updateWordBuildingMutation.mutate();
    } else {
      // Word created successfully
    }

    setWordState(prev => ({
      ...prev,
      wordsBuilt: prev.wordsBuilt + 1,
    }));

    // Clear after a moment
    setTimeout(clearWord, 2000);
  };

  const shuffleCharacters = () => {
    const shuffled = [...characters].sort(() => Math.random() - 0.5).slice(0, 8);
    setWordState(prev => ({
      ...prev,
      availableCharacters: shuffled,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-teal-400">
      <AppHeader user={user} />
      
      <main className="p-6 space-y-8 pb-24">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" className="text-white hover:bg-white/20 p-2">
              <ChevronLeft size={24} />
            </Button>
          </Link>
          <div className="text-center">
            <h1 className="text-2xl fredoka text-white drop-shadow-lg">Word Building</h1>
            <p className="text-white/90 text-sm">Create ancient Hebrew words</p>
          </div>
          <Button 
            variant="ghost" 
            className="text-white hover:bg-white/20 p-2"
            onClick={shuffleCharacters}
          >
            <RotateCcw size={24} />
          </Button>
        </div>

        {/* Stats */}
        <Card className="bg-white/90 backdrop-blur">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Puzzle className="text-green-500" size={20} />
                  <span className="fredoka text-gray-800">Words Built: {wordState.wordsBuilt}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Word Building Area */}
        <Card className="bg-white shadow-2xl">
          <CardContent className="p-8">
            <h2 className="text-xl fredoka text-gray-800 mb-6 text-center">Your Ancient Word</h2>
            
            {/* Built Word Display */}
            <div className="bg-gray-50 rounded-2xl p-6 mb-6 min-h-24 flex items-center justify-center">
              {wordState.builtWord ? (
                <div className="text-center">
                  <div className="text-4xl mb-2">{wordState.builtWord}</div>
                  <div className="text-gray-600">
                    Sound: "{wordState.wordSound.slice(0, -1)}"
                  </div>
                </div>
              ) : (
                <div className="text-gray-400 text-center">
                  <Puzzle size={40} className="mx-auto mb-2 opacity-50" />
                  <p>Select characters below to build your word</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <Button 
                onClick={removeLastCharacter}
                disabled={wordState.selectedCharacters.length === 0}
                className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-3 rounded-2xl font-bold"
              >
                Remove Last
              </Button>
              <Button 
                onClick={clearWord}
                disabled={wordState.selectedCharacters.length === 0}
                className="bg-red-400 hover:bg-red-500 text-white px-6 py-3 rounded-2xl font-bold"
              >
                <Trash2 className="mr-2" size={16} />
                Clear
              </Button>
              <Button 
                onClick={saveWord}
                disabled={wordState.selectedCharacters.length === 0}
                className="bg-green-400 hover:bg-green-500 text-white px-6 py-3 rounded-2xl font-bold"
              >
                Save Word
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Available Characters */}
        <section>
          <h2 className="text-xl fredoka text-white mb-4 text-center drop-shadow-lg">
            Choose Characters
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {wordState.availableCharacters.map((character) => (
              <Card 
                key={character.id}
                className="hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer bg-white"
                onClick={() => addCharacterToWord(character)}
              >
                <CardContent className="p-4 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-teal-400 rounded-2xl flex items-center justify-center mx-auto mb-3 text-white text-2xl font-bold shadow-lg">
                    {character.character}
                  </div>
                  <h3 className="text-sm fredoka text-gray-800 mb-1">{character.name}</h3>
                  <p className="text-gray-600 text-xs">"{character.sound}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Example Words */}
        <Card className="bg-gradient-to-r from-yellow-300 to-orange-400 text-white border-none">
          <CardContent className="p-6">
            <h3 className="fredoka text-xl mb-4">🏛️ Ancient Words to Try</h3>
            <div className="space-y-2 text-sm">
              {ancientWords.map((word, index) => (
                <div key={index} className="flex justify-between items-center bg-white/20 rounded-lg p-2">
                  <span>{word.characters.join(" + ")}</span>
                  <span className="font-bold">= {word.meaning}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Encouragement */}
        <Card className="bg-white/80 backdrop-blur">
          <CardContent className="p-6">
            <div className="flex items-center justify-center space-x-4">
              <div className="text-2xl">👧🏽</div>
              <div className="text-center">
                <p className="fredoka text-gray-800">Build words like ancient scribes!</p>
                <p className="text-sm text-gray-600">Combine characters to discover their meanings</p>
              </div>
              <div className="text-2xl">🧒🏾</div>
            </div>
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
