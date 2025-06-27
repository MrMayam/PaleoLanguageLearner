import { createContext, useContext, ReactNode } from 'react';
import { useAudio, UseAudioReturn } from '@/hooks/use-audio';

interface AudioContextType extends UseAudioReturn {
  // Additional methods for app-specific audio management
  playLearningSound: (type: 'correct' | 'incorrect' | 'achievement') => Promise<void>;
  preloadCharacterSounds: (characterNames: string[]) => Promise<void>;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

interface AudioProviderProps {
  children: ReactNode;
}

export function AudioProvider({ children }: AudioProviderProps) {
  const audioHook = useAudio();

  const playLearningSound = async (type: 'correct' | 'incorrect' | 'achievement'): Promise<void> => {
    switch (type) {
      case 'correct':
        await audioHook.playSuccessSound();
        break;
      case 'incorrect':
        await audioHook.playErrorSound();
        break;
      case 'achievement':
        // Play a special achievement sound sequence
        try {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          
          // Create a triumphant achievement sound
          const playNote = (frequency: number, startTime: number, duration: number) => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.setValueAtTime(frequency, startTime);
            oscillator.type = 'triangle';

            gainNode.gain.setValueAtTime(0.4, startTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

            oscillator.start(startTime);
            oscillator.stop(startTime + duration);
          };

          // Play achievement fanfare: C-E-G-C
          const currentTime = audioContext.currentTime;
          playNote(523.25, currentTime, 0.3); // C5
          playNote(659.25, currentTime + 0.15, 0.3); // E5
          playNote(783.99, currentTime + 0.3, 0.3); // G5
          playNote(1046.5, currentTime + 0.45, 0.5); // C6
        } catch (error) {
          console.warn('Could not play achievement sound:', error);
        }
        break;
    }
  };

  const preloadCharacterSounds = async (characterNames: string[]): Promise<void> => {
    // In a real implementation, this would preload audio files
    // For now, we'll just ensure speech synthesis is ready
    try {
      if (window.speechSynthesis) {
        // Load voices if not already loaded
        let voices = window.speechSynthesis.getVoices();
        if (voices.length === 0) {
          // Wait for voices to load
          await new Promise<void>((resolve) => {
            const loadVoices = () => {
              voices = window.speechSynthesis.getVoices();
              if (voices.length > 0) {
                window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
                resolve();
              }
            };
            window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
            // Fallback timeout
            setTimeout(resolve, 2000);
          });
        }
      }
    } catch (error) {
      console.warn('Could not preload character sounds:', error);
    }
  };

  const contextValue: AudioContextType = {
    ...audioHook,
    playLearningSound,
    preloadCharacterSounds,
  };

  return (
    <AudioContext.Provider value={contextValue}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudioContext(): AudioContextType {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudioContext must be used within an AudioProvider');
  }
  return context;
}

// Hook for easy access to character sound playing
export function useCharacterSound() {
  const { playCharacterSound, audioState } = useAudioContext();

  const playSound = async (characterName: string): Promise<void> => {
    try {
      await playCharacterSound(characterName);
    } catch (error) {
      console.warn(`Failed to play sound for ${characterName}:`, error);
    }
  };

  return {
    playSound,
    isPlaying: audioState.isPlaying,
    isLoading: audioState.isLoading,
    error: audioState.error,
  };
}

// Hook for learning feedback sounds
export function useLearningFeedback() {
  const { playLearningSound } = useAudioContext();

  const playCorrectSound = () => playLearningSound('correct');
  const playIncorrectSound = () => playLearningSound('incorrect');
  const playAchievementSound = () => playLearningSound('achievement');

  return {
    playCorrectSound,
    playIncorrectSound,
    playAchievementSound,
  };
}
