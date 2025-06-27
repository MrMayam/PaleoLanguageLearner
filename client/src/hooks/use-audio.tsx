import { useState, useCallback, useRef, useEffect } from 'react';
import { useToast } from './use-toast';

export interface AudioState {
  isPlaying: boolean;
  isLoading: boolean;
  error: string | null;
  duration: number;
  currentTime: number;
}

export interface UseAudioReturn {
  audioState: AudioState;
  play: (audioUrl?: string) => Promise<void>;
  pause: () => void;
  stop: () => void;
  setVolume: (volume: number) => void;
  playCharacterSound: (characterName: string) => Promise<void>;
  playSuccessSound: () => Promise<void>;
  playErrorSound: () => Promise<void>;
}

// Generate speech synthesis for character sounds
const generateCharacterSpeech = (characterName: string, sound: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!window.speechSynthesis) {
      reject(new Error('Speech synthesis not supported'));
      return;
    }

    const utterance = new SpeechSynthesisUtterance();
    
    // Create pronunciation text
    const pronunciationText = `${characterName}. Sound: ${sound}`;
    utterance.text = pronunciationText;
    
    // Configure voice settings for kid-friendly pronunciation
    utterance.rate = 0.7; // Slower for kids
    utterance.pitch = 1.2; // Slightly higher pitch
    utterance.volume = 0.8;
    
    // Try to find an appropriate voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.lang.startsWith('en') && 
      (voice.name.includes('Female') || voice.name.includes('Child'))
    ) || voices.find(voice => voice.lang.startsWith('en'));
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onend = () => resolve();
    utterance.onerror = (event) => reject(new Error(`Speech synthesis error: ${event.error}`));
    
    window.speechSynthesis.speak(utterance);
  });
};

export const useAudio = (): UseAudioReturn => {
  const [audioState, setAudioState] = useState<AudioState>({
    isPlaying: false,
    isLoading: false,
    error: null,
    duration: 0,
    currentTime: 0,
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentUrlRef = useRef<string>('');
  const { toast } = useToast();

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('loadstart', handleLoadStart);
        audioRef.current.removeEventListener('canplay', handleCanPlay);
        audioRef.current.removeEventListener('play', handlePlay);
        audioRef.current.removeEventListener('pause', handlePause);
        audioRef.current.removeEventListener('ended', handleEnded);
        audioRef.current.removeEventListener('error', handleError);
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
      }
    };
  }, []);

  const handleLoadStart = () => {
    setAudioState(prev => ({ ...prev, isLoading: true, error: null }));
  };

  const handleCanPlay = () => {
    setAudioState(prev => ({ ...prev, isLoading: false }));
  };

  const handlePlay = () => {
    setAudioState(prev => ({ ...prev, isPlaying: true }));
  };

  const handlePause = () => {
    setAudioState(prev => ({ ...prev, isPlaying: false }));
  };

  const handleEnded = () => {
    setAudioState(prev => ({ ...prev, isPlaying: false, currentTime: 0 }));
  };

  const handleError = (e: Event) => {
    const target = e.target as HTMLAudioElement;
    const errorMessage = target.error?.message || 'Audio playback failed';
    setAudioState(prev => ({ ...prev, error: errorMessage, isLoading: false, isPlaying: false }));
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setAudioState(prev => ({ ...prev, currentTime: audioRef.current!.currentTime }));
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setAudioState(prev => ({ ...prev, duration: audioRef.current!.duration }));
    }
  };

  const setupAudio = (url: string) => {
    if (audioRef.current && currentUrlRef.current === url) {
      return; // Audio already set up for this URL
    }

    // Clean up existing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.removeEventListener('loadstart', handleLoadStart);
      audioRef.current.removeEventListener('canplay', handleCanPlay);
      audioRef.current.removeEventListener('play', handlePlay);
      audioRef.current.removeEventListener('pause', handlePause);
      audioRef.current.removeEventListener('ended', handleEnded);
      audioRef.current.removeEventListener('error', handleError);
      audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
    }

    // Create new audio element
    audioRef.current = new Audio(url);
    currentUrlRef.current = url;

    // Add event listeners
    audioRef.current.addEventListener('loadstart', handleLoadStart);
    audioRef.current.addEventListener('canplay', handleCanPlay);
    audioRef.current.addEventListener('play', handlePlay);
    audioRef.current.addEventListener('pause', handlePause);
    audioRef.current.addEventListener('ended', handleEnded);
    audioRef.current.addEventListener('error', handleError);
    audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);

    // Set volume
    audioRef.current.volume = 0.8;
  };

  const play = useCallback(async (audioUrl?: string): Promise<void> => {
    try {
      if (audioUrl) {
        setupAudio(audioUrl);
      }

      if (!audioRef.current) {
        throw new Error('No audio source available');
      }

      await audioRef.current.play();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to play audio';
      setAudioState(prev => ({ ...prev, error: errorMessage, isPlaying: false }));
      throw error;
    }
  }, []);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, []);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  const setVolume = useCallback((volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, volume));
    }
  }, []);

  const playCharacterSound = useCallback(async (characterName: string): Promise<void> => {
    try {
      setAudioState(prev => ({ ...prev, isLoading: true, error: null }));

      // Extract sound from character name for speech synthesis
      const characterData = {
        "Ah-Lap": "Ah",
        "Ba-Yath": "Ba", 
        "Ga-Mal": "Ga",
        "Da-Lath": "Da",
        "Ha": "Ha",
        "Wa-Wa": "Wa",
        "Za-Yan": "Za",
        "Chaa-Lan": "Chaa",
        "Ta": "Ta",
        "Yad": "Ya",
        "Ka-Phan": "Ka",
        "La-Mam": "La",
        "Ma-Yam": "Ma",
        "Na-Chash": "Na",
        "Sa-Mak": "Sa",
        "I-Yan": "I",
        "Pa": "Pa",
        "Tza-Da": "Tza",
        "Qa-Phan": "Qa",
        "Ra-Ash": "Ra",
        "Sha-Yan": "Sha",
        "Tha-Wa": "Tha",
      };

      const sound = characterData[characterName as keyof typeof characterData];
      if (!sound) {
        throw new Error(`Unknown character: ${characterName}`);
      }

      await generateCharacterSpeech(characterName, sound);
      
      setAudioState(prev => ({ ...prev, isLoading: false }));
      
      toast({
        title: "🔊 Sound played",
        description: `You heard "${characterName}" with sound "${sound}"`,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to play character sound';
      setAudioState(prev => ({ ...prev, error: errorMessage, isLoading: false }));
      
      toast({
        title: "Audio unavailable",
        description: "Character sound will be available when audio files are added",
        variant: "destructive",
      });
    }
  }, [toast]);

  const playSuccessSound = useCallback(async (): Promise<void> => {
    try {
      // Create success sound using Web Audio API
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Create a pleasant success chord
      oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
      oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
      oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
      console.warn('Could not play success sound:', error);
    }
  }, []);

  const playErrorSound = useCallback(async (): Promise<void> => {
    try {
      // Create error sound using Web Audio API
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Create a gentle error sound (not harsh for kids)
      oscillator.frequency.setValueAtTime(220, audioContext.currentTime); // A3
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
      console.warn('Could not play error sound:', error);
    }
  }, []);

  return {
    audioState,
    play,
    pause,
    stop,
    setVolume,
    playCharacterSound,
    playSuccessSound,
    playErrorSound,
  };
};
