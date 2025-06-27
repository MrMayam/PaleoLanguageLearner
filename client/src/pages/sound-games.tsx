import { AppHeader } from "@/components/app-header";
import { NavigationBar } from "@/components/navigation-bar";
import { LearningCompanion } from "@/components/learning-companion";
import { CelebrationModal } from "@/components/celebration-modal";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { ChevronLeft, Volume2, RotateCcw, Trophy } from "lucide-react";
import { Link } from "wouter";
import type { PaleoCharacter, User } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useCharacterSound } from "@/lib/audio-context";

interface GameState {
  currentCharacter: PaleoCharacter | null;
  options: string[];
  score: number;
  streak: number;
  gameStarted: boolean;
  isAnswered: boolean;
  selectedAnswer: string | null;
  correctAnswer: string;
}

export default function SoundGames() {
  const [gameState, setGameState] = useState<GameState>({
    currentCharacter: null,
    options: [],
    score: 0,
    streak: 0,
    gameStarted: false,
    isAnswered: false,
    selectedAnswer: null,
    correctAnswer: "",
  });
  
  const [showCelebration, setShowCelebration] = useState(false);
  const { playSound } = useCharacterSound();
  
  // For demo purposes, using user ID 1
  const userId = 1;

  const { data: user } = useQuery<User>({
    queryKey: [`/api/user/${userId}`],
  });

  const { data: characters = [] } = useQuery<PaleoCharacter[]>({
    queryKey: ["/api/characters"],
  });

  const updateProgressMutation = useMutation({
    mutationFn: async ({ characterId, correct }: { characterId: number, correct: boolean }) => {
      return apiRequest("POST", `/api/user/${userId}/progress/${characterId}`, {
        pronunciationAttempts: 1,
        pronunciationCorrect: correct ? 1 : 0,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/user/${userId}`] });
      queryClient.invalidateQueries({ queryKey: [`/api/user/${userId}/progress`] });
    },
  });

  const generateGameQuestion = () => {
    if (characters.length === 0) return;
    
    const randomCharacter = characters[Math.floor(Math.random() * characters.length)];
    const correctSound = randomCharacter.sound;
    
    // Generate wrong options
    const allSounds = characters.map(c => c.sound);
    const wrongSounds = allSounds.filter(sound => sound !== correctSound);
    const shuffledWrong = wrongSounds.sort(() => Math.random() - 0.5).slice(0, 3);
    
    const options = [correctSound, ...shuffledWrong].sort(() => Math.random() - 0.5);
    
    setGameState(prev => ({
      ...prev,
      currentCharacter: randomCharacter,
      options,
      correctAnswer: correctSound,
      isAnswered: false,
      selectedAnswer: null,
    }));
  };

  const startGame = () => {
    setGameState(prev => ({
      ...prev,
      gameStarted: true,
      score: 0,
      streak: 0,
    }));
    generateGameQuestion();
  };

  const resetGame = () => {
    setGameState({
      currentCharacter: null,
      options: [],
      score: 0,
      streak: 0,
      gameStarted: false,
      isAnswered: false,
      selectedAnswer: null,
      correctAnswer: "",
    });
  };

  const handleAnswer = (selectedSound: string) => {
    if (gameState.isAnswered || !gameState.currentCharacter) return;
    
    const isCorrect = selectedSound === gameState.correctAnswer;
    
    setGameState(prev => ({
      ...prev,
      isAnswered: true,
      selectedAnswer: selectedSound,
      score: isCorrect ? prev.score + 10 : prev.score,
      streak: isCorrect ? prev.streak + 1 : 0,
    }));

    // Update progress
    updateProgressMutation.mutate({
      characterId: gameState.currentCharacter.id,
      correct: isCorrect,
    });

    if (isCorrect) {
      // Correct answer feedback
      if (gameState.streak + 1 === 5) {
        setShowCelebration(true);
      }
    } else {
      // Incorrect answer feedback  
    }

    // Next question after delay
    setTimeout(() => {
      generateGameQuestion();
    }, 2000);
  };

  const playCharacterSound = async () => {
    if (!gameState.currentCharacter) return;
    
    await playSound(gameState.currentCharacter.name, gameState.currentCharacter.sound);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-pink-400">
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
            <LearningCompanion characterId="storyteller" size="sm" />
            <div>
              <h1 className="text-2xl fredoka text-white drop-shadow-lg">Sound Games</h1>
              <p className="text-white/90 text-sm">Match characters to their ancient sounds</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            className="text-white hover:bg-white/20 p-2"
            onClick={resetGame}
          >
            <RotateCcw size={24} />
          </Button>
        </div>

        {!gameState.gameStarted ? (
          /* Game Start Screen */
          <div className="text-center space-y-8">
            <Card className="bg-white/90 backdrop-blur shadow-2xl max-w-md mx-auto">
              <CardContent className="p-8">
                <div className="w-24 h-24 bg-purple-400 rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                  <Volume2 size={40} />
                </div>
                <h2 className="text-2xl fredoka text-gray-800 mb-4">Sound Matching Game</h2>
                <p className="text-gray-600 mb-6">
                  Listen to the character sound and choose the correct pronunciation from the options below!
                </p>
                <Button 
                  onClick={startGame}
                  className="bg-purple-400 hover:bg-purple-500 text-white px-8 py-4 rounded-2xl font-bold text-lg w-full"
                >
                  Start Game
                </Button>
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card className="bg-white/80 backdrop-blur">
              <CardContent className="p-6">
                <h3 className="fredoka text-lg text-gray-800 mb-4">How to Play:</h3>
                <ul className="text-gray-600 text-sm space-y-2 text-left">
                  <li>• Click the sound button to hear the pronunciation</li>
                  <li>• Choose the correct sound from the options</li>
                  <li>• Get streak bonuses for consecutive correct answers</li>
                  <li>• Learn the authentic ancient pronunciations</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Game Play Screen */
          <div className="space-y-6">
            {/* Score Display */}
            <Card className="bg-white/90 backdrop-blur">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Trophy className="text-yellow-500" size={20} />
                      <span className="fredoka text-gray-800">Score: {gameState.score}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-orange-400">🔥</span>
                      <span className="fredoka text-gray-800">Streak: {gameState.streak}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {gameState.currentCharacter && (
              <>
                {/* Character Display */}
                <Card className="bg-white shadow-2xl">
                  <CardContent className="p-8 text-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-3xl flex items-center justify-center mx-auto mb-6 text-white text-6xl font-bold shadow-lg">
                      {gameState.currentCharacter.character}
                    </div>
                    <h2 className="text-2xl fredoka text-gray-800 mb-4">
                      {gameState.currentCharacter.name}
                    </h2>
                    <Button 
                      onClick={playCharacterSound}
                      className="bg-purple-400 hover:bg-purple-500 text-white px-8 py-4 rounded-2xl font-bold text-lg"
                      disabled={gameState.isAnswered}
                    >
                      <Volume2 className="mr-2" size={20} />
                      Play Sound
                    </Button>
                  </CardContent>
                </Card>

                {/* Answer Options */}
                <div className="grid grid-cols-2 gap-4">
                  {gameState.options.map((option, index) => {
                    let buttonClass = "bg-white hover:bg-gray-50 text-gray-800 px-6 py-4 rounded-2xl font-bold text-lg w-full transition-all duration-200";
                    
                    if (gameState.isAnswered) {
                      if (option === gameState.correctAnswer) {
                        buttonClass = "bg-green-400 text-white px-6 py-4 rounded-2xl font-bold text-lg w-full";
                      } else if (option === gameState.selectedAnswer && option !== gameState.correctAnswer) {
                        buttonClass = "bg-red-400 text-white px-6 py-4 rounded-2xl font-bold text-lg w-full";
                      } else {
                        buttonClass = "bg-gray-300 text-gray-600 px-6 py-4 rounded-2xl font-bold text-lg w-full";
                      }
                    }
                    
                    return (
                      <Button
                        key={index}
                        onClick={() => handleAnswer(option)}
                        className={buttonClass}
                        disabled={gameState.isAnswered}
                      >
                        "{option}"
                      </Button>
                    );
                  })}
                </div>

                {/* Feedback */}
                {gameState.isAnswered && (
                  <Card className={`${gameState.selectedAnswer === gameState.correctAnswer ? 'bg-green-100 border-green-400' : 'bg-red-100 border-red-400'}`}>
                    <CardContent className="p-4 text-center">
                      <p className="text-gray-700">
                        {gameState.selectedAnswer === gameState.correctAnswer 
                          ? `Excellent! ${gameState.currentCharacter.name} makes the "${gameState.correctAnswer}" sound.`
                          : `The correct answer is "${gameState.correctAnswer}". Keep practicing!`
                        }
                      </p>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </div>
        )}

        {/* Diverse Character Encouragement */}
        <Card className="bg-gradient-to-r from-yellow-300 to-orange-400 text-white border-none">
          <CardContent className="p-6">
            <div className="flex items-center justify-center space-x-4">
              <div className="text-2xl">👦🏿</div>
              <div className="text-center">
                <p className="fredoka">Keep practicing those ancient sounds!</p>
                <p className="text-sm opacity-90">Every correct answer brings you closer to mastery!</p>
              </div>
              <div className="text-2xl">👧🏽</div>
            </div>
          </CardContent>
        </Card>
      </main>

      <NavigationBar />
      <CelebrationModal 
        isOpen={showCelebration}
        onClose={() => setShowCelebration(false)}
        message="Amazing! You got 5 in a row! You're becoming a sound master!"
      />
    </div>
  );
}
