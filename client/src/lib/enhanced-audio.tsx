import { useState, useCallback, useRef, useEffect } from 'react';

export interface EnhancedAudioState {
  isPlaying: boolean;
  isLoading: boolean;
  error: string | null;
  currentVoice: string | null;
  availableVoices: SpeechSynthesisVoice[];
}

export interface UseEnhancedAudioReturn {
  audioState: EnhancedAudioState;
  playCharacterSound: (characterName: string, sound: string) => Promise<void>;
  playNarratedLesson: (text: string, voiceType?: 'narrator' | 'character') => Promise<void>;
  playSuccessSound: () => Promise<void>;
  playErrorSound: () => Promise<void>;
  setPreferredVoice: (voiceName: string) => void;
  getAvailableVoices: () => SpeechSynthesisVoice[];
}

// Morgan Freeman-style voice configuration for all character types
const VoiceConfigurations = {
  narrator: {
    rate: 0.7,    // Slow, deliberate pace like Morgan Freeman
    pitch: 0.6,   // Deep, resonant tone
    volume: 0.9,
    voiceFilter: (voice: SpeechSynthesisVoice) => 
      voice.lang.startsWith('en') && 
      (voice.name.toLowerCase().includes('daniel') ||
       voice.name.toLowerCase().includes('alex') ||
       voice.name.toLowerCase().includes('fred') ||
       voice.name.toLowerCase().includes('ralph') ||
       voice.name.toLowerCase().includes('bruce'))
  },
  character: {
    rate: 0.7,    // Same Morgan Freeman pace for character sounds
    pitch: 0.6,   // Consistent deep voice for all pronunciation
    volume: 0.9,
    voiceFilter: (voice: SpeechSynthesisVoice) => 
      voice.lang.startsWith('en') && 
      (voice.name.toLowerCase().includes('daniel') ||
       voice.name.toLowerCase().includes('alex') ||
       voice.name.toLowerCase().includes('fred') ||
       voice.name.toLowerCase().includes('ralph'))
  },
  child: {
    rate: 0.7,    // Morgan Freeman teaching children - warm but deep
    pitch: 0.6,   // Maintain the authoritative deep voice
    volume: 0.9,
    voiceFilter: (voice: SpeechSynthesisVoice) => 
      voice.lang.startsWith('en') && 
      (voice.name.toLowerCase().includes('daniel') ||
       voice.name.toLowerCase().includes('alex') ||
       voice.name.toLowerCase().includes('fred'))
  }
};

// Create Morgan Freeman-style narration for characters
const createCharacterNarration = (characterName: string, sound: string): string => {
  const morganFreemanIntros = [
    `In the ancient world, long before modern alphabets... the letter ${characterName} carried deep meaning`,
    `Picture this... thousands of years ago, the Hebrew people spoke the sacred letter ${characterName}`,
    `There is something profound about the way our ancestors pronounced ${characterName}`,
    `Listen closely... and you will hear the wisdom of ages in the sound of ${characterName}`,
    `In the beginning... there was the word... and ${characterName} was part of that ancient language`
  ];
  
  const morganFreemanEndings = [
    `That sound... that is the voice of history itself`,
    `Remember this sound... it connects you to thousands of years of wisdom`,
    `And that, my young friend, is how ${characterName} has always been spoken`,
    `Such is the power of the ancient Hebrew letter ${characterName}`,
    `This is the sound that echoed through the valleys of ancient Israel`
  ];
  
  const intro = morganFreemanIntros[Math.floor(Math.random() * morganFreemanIntros.length)];
  const ending = morganFreemanEndings[Math.floor(Math.random() * morganFreemanEndings.length)];
  
  return `${intro}... ${sound}... ${ending}.`;
};

// Enhanced speech synthesis with voice modulation
const generateEnhancedSpeech = async (
  text: string, 
  voiceType: 'narrator' | 'character' | 'child' = 'narrator',
  preferredVoice?: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!window.speechSynthesis) {
      reject(new Error('Speech synthesis not supported'));
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const config = VoiceConfigurations[voiceType];
    
    // Configure voice settings
    utterance.rate = config.rate;
    utterance.pitch = config.pitch;
    utterance.volume = config.volume;
    
    // Find the best voice for the configuration
    const voices = window.speechSynthesis.getVoices();
    let selectedVoice: SpeechSynthesisVoice | null = null;

    // First try to use preferred voice if specified
    if (preferredVoice) {
      selectedVoice = voices.find(voice => voice.name === preferredVoice) || null;
    }

    // If no preferred voice or not found, use configuration filter
    if (!selectedVoice) {
      const filteredVoices = voices.filter(config.voiceFilter);
      
      // Prefer voices with "premium", "neural", or "enhanced" in the name
      const premiumVoices = filteredVoices.filter(voice => 
        voice.name.toLowerCase().includes('premium') ||
        voice.name.toLowerCase().includes('neural') ||
        voice.name.toLowerCase().includes('enhanced') ||
        voice.name.toLowerCase().includes('natural')
      );
      
      selectedVoice = premiumVoices[0] || filteredVoices[0] || voices.find(v => v.lang.startsWith('en'));
    }
    
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    // Add emotional inflection for character voices
    if (voiceType === 'character') {
      utterance.rate *= 0.9; // Slightly slower for emphasis
      utterance.pitch *= 1.05; // Slightly higher for engagement
    }

    utterance.onend = () => resolve();
    utterance.onerror = (event) => reject(new Error(`Speech synthesis error: ${event.error}`));
    
    // Add a small delay to ensure previous speech is cancelled
    setTimeout(() => {
      window.speechSynthesis.speak(utterance);
    }, 100);
  });
};

// Generate sophisticated sound effects using Web Audio API
const createAdvancedAudioEffect = async (
  type: 'success' | 'error' | 'achievement',
  context?: AudioContext
): Promise<void> => {
  try {
    const audioContext = context || new (window.AudioContext || (window as any).webkitAudioContext)();
    
    const createTone = (frequency: number, startTime: number, duration: number, volume: number = 0.3) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      const filterNode = audioContext.createBiquadFilter();

      oscillator.connect(filterNode);
      filterNode.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(frequency, startTime);
      oscillator.type = 'sine';
      
      // Add filtering for warmer sound
      filterNode.type = 'lowpass';
      filterNode.frequency.setValueAtTime(2000, startTime);
      
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(volume, startTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

      oscillator.start(startTime);
      oscillator.stop(startTime + duration);
    };

    const currentTime = audioContext.currentTime;

    switch (type) {
      case 'success':
        // Ascending major chord progression
        createTone(261.63, currentTime, 0.3, 0.25); // C4
        createTone(329.63, currentTime + 0.1, 0.3, 0.2); // E4
        createTone(392.00, currentTime + 0.2, 0.4, 0.25); // G4
        createTone(523.25, currentTime + 0.3, 0.5, 0.3); // C5
        break;
        
      case 'error':
        // Gentle descending tone (kid-friendly)
        createTone(349.23, currentTime, 0.2, 0.15); // F4
        createTone(293.66, currentTime + 0.1, 0.3, 0.2); // D4
        break;
        
      case 'achievement':
        // Triumphant fanfare
        const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
        notes.forEach((freq, index) => {
          createTone(freq, currentTime + index * 0.15, 0.4, 0.3);
        });
        // Add harmonic
        createTone(1318.5, currentTime + 0.6, 0.6, 0.2); // E6
        break;
    }
  } catch (error) {
    console.warn(`Could not play ${type} sound:`, error);
  }
};

export const useEnhancedAudio = (): UseEnhancedAudioReturn => {
  const [audioState, setAudioState] = useState<EnhancedAudioState>({
    isPlaying: false,
    isLoading: false,
    error: null,
    currentVoice: null,
    availableVoices: [],
  });

  const audioContextRef = useRef<AudioContext | null>(null);
  const preferredVoiceRef = useRef<string>('');

  // Initialize audio context and voices
  useEffect(() => {
    const initializeAudio = async () => {
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        
        // Load voices
        const loadVoices = () => {
          const voices = window.speechSynthesis.getVoices();
          setAudioState(prev => ({ ...prev, availableVoices: voices }));
          
          // Set default preferred voice (look for premium/enhanced voices)
          const preferredVoice = voices.find(voice => 
            voice.lang.startsWith('en') && 
            (voice.name.toLowerCase().includes('premium') ||
             voice.name.toLowerCase().includes('enhanced') ||
             voice.name.toLowerCase().includes('neural'))
          ) || voices.find(voice => voice.lang.startsWith('en'));
          
          if (preferredVoice && !preferredVoiceRef.current) {
            preferredVoiceRef.current = preferredVoice.name;
            setAudioState(prev => ({ ...prev, currentVoice: preferredVoice.name }));
          }
        };

        // Load voices immediately if available
        loadVoices();
        
        // Also listen for voice loading event
        window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
        
        return () => {
          window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
        };
      } catch (error) {
        console.warn('Could not initialize enhanced audio:', error);
      }
    };

    initializeAudio();
  }, []);

  const playCharacterSound = useCallback(async (characterName: string, sound: string): Promise<void> => {
    try {
      setAudioState(prev => ({ ...prev, isLoading: true, error: null, isPlaying: true }));

      const narrationText = createCharacterNarration(characterName, sound);
      await generateEnhancedSpeech(narrationText, 'narrator', preferredVoiceRef.current);
      
      setAudioState(prev => ({ ...prev, isLoading: false, isPlaying: false }));
      
      // Character sound played successfully
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to play character sound';
      setAudioState(prev => ({ ...prev, error: errorMessage, isLoading: false, isPlaying: false }));
      
      // Enhanced audio processing fallback
    }
  }, []);

  const playNarratedLesson = useCallback(async (text: string, voiceType: 'narrator' | 'character' = 'narrator'): Promise<void> => {
    try {
      setAudioState(prev => ({ ...prev, isLoading: true, error: null, isPlaying: true }));
      
      await generateEnhancedSpeech(text, voiceType, preferredVoiceRef.current);
      
      setAudioState(prev => ({ ...prev, isLoading: false, isPlaying: false }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to play narrated lesson';
      setAudioState(prev => ({ ...prev, error: errorMessage, isLoading: false, isPlaying: false }));
    }
  }, []);

  const playSuccessSound = useCallback(async (): Promise<void> => {
    await createAdvancedAudioEffect('success', audioContextRef.current || undefined);
  }, []);

  const playErrorSound = useCallback(async (): Promise<void> => {
    await createAdvancedAudioEffect('error', audioContextRef.current || undefined);
  }, []);

  const setPreferredVoice = useCallback((voiceName: string) => {
    preferredVoiceRef.current = voiceName;
    setAudioState(prev => ({ ...prev, currentVoice: voiceName }));
  }, []);

  const getAvailableVoices = useCallback(() => {
    return window.speechSynthesis.getVoices();
  }, []);

  return {
    audioState,
    playCharacterSound,
    playNarratedLesson,
    playSuccessSound,
    playErrorSound,
    setPreferredVoice,
    getAvailableVoices,
  };
};