import { AppHeader } from "@/components/app-header";
import { NavigationBar } from "@/components/navigation-bar";
import { LearningCompanion } from "@/components/learning-companion";
import { CelebrationModal } from "@/components/celebration-modal";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, PencilLine, RotateCcw, Check } from "lucide-react";
import { Link } from "wouter";
import type { PaleoCharacter, User } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useCharacterSound } from "@/lib/audio-context";

interface TracingState {
  currentCharacter: PaleoCharacter | null;
  isDrawing: boolean;
  tracingComplete: boolean;
  charactersTraced: number;
}

export default function TracingPractice() {
  const [tracingState, setTracingState] = useState<TracingState>({
    currentCharacter: null,
    isDrawing: false,
    tracingComplete: false,
    charactersTraced: 0,
  });
  
  const [showCelebration, setShowCelebration] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { playSound } = useCharacterSound();
  
  // For demo purposes, using user ID 1
  const userId = 1;

  const { data: user } = useQuery<User>({
    queryKey: [`/api/user/${userId}`],
  });

  const { data: characters = [] } = useQuery<PaleoCharacter[]>({
    queryKey: ["/api/characters"],
  });

  const updateTracingMutation = useMutation({
    mutationFn: async (characterId: number) => {
      return apiRequest("POST", `/api/user/${userId}/progress/${characterId}`, {
        tracingCompleted: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/user/${userId}`] });
      queryClient.invalidateQueries({ queryKey: [`/api/user/${userId}/progress`] });
    },
  });

  // Initialize canvas and first character
  useEffect(() => {
    if (characters.length > 0 && !tracingState.currentCharacter) {
      setTracingState(prev => ({
        ...prev,
        currentCharacter: characters[0],
      }));
    }
  }, [characters, tracingState.currentCharacter]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set up canvas
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Draw character outline for tracing
    if (tracingState.currentCharacter) {
      drawCharacterOutline(ctx, tracingState.currentCharacter.character);
    }
  }, [tracingState.currentCharacter]);

  const drawCharacterOutline = (ctx: CanvasRenderingContext2D, character: string) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    // Draw light gray outline of character
    ctx.font = '120px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.strokeStyle = '#e5e5e5';
    ctx.lineWidth = 3;
    ctx.strokeText(character, ctx.canvas.width / 2, ctx.canvas.height / 2);
    
    // Draw dotted tracing guide
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = '#9ca3af';
    ctx.lineWidth = 2;
    ctx.strokeText(character, ctx.canvas.width / 2, ctx.canvas.height / 2);
    ctx.setLineDash([]);
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setTracingState(prev => ({ ...prev, isDrawing: true }));
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!tracingState.isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    ctx.lineTo(x, y);
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.stroke();
  };

  const stopDrawing = () => {
    setTracingState(prev => ({ ...prev, isDrawing: false }));
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || !tracingState.currentCharacter) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    drawCharacterOutline(ctx, tracingState.currentCharacter.character);
    setTracingState(prev => ({ ...prev, tracingComplete: false }));
  };

  const completeTracing = () => {
    if (!tracingState.currentCharacter) return;

    setTracingState(prev => ({
      ...prev,
      tracingComplete: true,
      charactersTraced: prev.charactersTraced + 1,
    }));

    updateTracingMutation.mutate(tracingState.currentCharacter.id);

    // Character traced successfully

    if (tracingState.charactersTraced + 1 === 5) {
      setShowCelebration(true);
    }
  };

  const nextCharacter = () => {
    if (!tracingState.currentCharacter) return;

    const currentIndex = characters.findIndex(c => c.id === tracingState.currentCharacter?.id);
    const nextIndex = (currentIndex + 1) % characters.length;
    
    setTracingState(prev => ({
      ...prev,
      currentCharacter: characters[nextIndex],
      tracingComplete: false,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 to-red-400">
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
            <LearningCompanion characterId="artist" size="sm" />
            <div>
              <h1 className="text-2xl fredoka text-white drop-shadow-lg">Tracing Practice</h1>
              <p className="text-white/90 text-sm">Practice writing Paleo Hebrew characters</p>
            </div>
          </div>
          <div className="w-10" /> {/* Spacer */}
        </div>

        {/* Stats */}
        <Card className="bg-white/90 backdrop-blur">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <PencilLine className="text-orange-500" size={20} />
                  <span className="fredoka text-gray-800">Characters Traced: {tracingState.charactersTraced}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {tracingState.currentCharacter && (
          <>
            {/* Character Info */}
            <Card className="bg-white shadow-2xl">
              <CardContent className="p-6 text-center">
                <h2 className="text-2xl fredoka text-gray-800 mb-2">
                  {tracingState.currentCharacter.name}
                </h2>
                <p className="text-gray-600 mb-4">
                  Sound: "{tracingState.currentCharacter.sound}"
                </p>
                <p className="text-gray-600 text-sm">
                  {tracingState.currentCharacter.description}
                </p>
              </CardContent>
            </Card>

            {/* Tracing Canvas */}
            <Card className="bg-white shadow-2xl">
              <CardContent className="p-6">
                <h3 className="text-lg fredoka text-gray-800 mb-4 text-center">
                  Trace the character below
                </h3>
                
                <div className="bg-gray-50 rounded-2xl p-4 mb-6">
                  <canvas
                    ref={canvasRef}
                    className="w-full h-64 cursor-crosshair touch-none"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                  />
                </div>

                {/* Tracing Controls */}
                <div className="flex gap-4 justify-center">
                  <Button 
                    onClick={clearCanvas}
                    className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-3 rounded-2xl font-bold"
                  >
                    <RotateCcw className="mr-2" size={16} />
                    Clear
                  </Button>
                  
                  <Button 
                    onClick={completeTracing}
                    className="bg-green-400 hover:bg-green-500 text-white px-6 py-3 rounded-2xl font-bold"
                    disabled={tracingState.tracingComplete}
                  >
                    <Check className="mr-2" size={16} />
                    {tracingState.tracingComplete ? "Completed!" : "Done Tracing"}
                  </Button>
                  
                  <Button 
                    onClick={nextCharacter}
                    className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-3 rounded-2xl font-bold"
                    disabled={!tracingState.tracingComplete}
                  >
                    Next Character
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Instructions */}
        <Card className="bg-gradient-to-r from-yellow-300 to-orange-400 text-white border-none">
          <CardContent className="p-6">
            <h3 className="fredoka text-xl mb-4">✏️ Tracing Tips</h3>
            <ul className="space-y-2 text-sm">
              <li>• Follow the dotted outline to trace the character</li>
              <li>• Take your time and make smooth strokes</li>
              <li>• Practice makes perfect - repeat as many times as you need</li>
              <li>• Try to understand the shape and meaning of each character</li>
            </ul>
          </CardContent>
        </Card>

        {/* Encouragement */}
        <Card className="bg-white/80 backdrop-blur">
          <CardContent className="p-6">
            <div className="flex items-center justify-center space-x-4">
              <div className="text-2xl">👦🏿</div>
              <div className="text-center">
                <p className="fredoka text-gray-800">Write like ancient scribes!</p>
                <p className="text-sm text-gray-600">Every stroke brings the letters to life</p>
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
        message="Fantastic! You've traced 5 characters! You're becoming a master scribe!"
      />
    </div>
  );
}
