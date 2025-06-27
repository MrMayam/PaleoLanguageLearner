import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export function PWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isInWebAppiOS = (window.navigator as any).standalone === true;
    
    if (isStandalone || isInWebAppiOS) {
      setIsInstalled(true);
      return;
    }

    // Check if iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Don't show banner immediately, wait a bit for user engagement
      setTimeout(() => {
        setShowInstallBanner(true);
      }, 30000); // Show after 30 seconds
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallBanner(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setShowInstallBanner(false);
    }
  };

  const handleDismiss = () => {
    setShowInstallBanner(false);
    // Don't show again for this session
    sessionStorage.setItem('pwa-install-dismissed', 'true');
  };

  // Don't show if already installed or user dismissed
  if (isInstalled || sessionStorage.getItem('pwa-install-dismissed')) {
    return null;
  }

  // iOS installation instructions
  if (isIOS && showInstallBanner) {
    return (
      <div className="fixed bottom-4 left-4 right-4 z-50 bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-4 rounded-lg shadow-lg max-w-sm mx-auto">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-bold text-sm mb-2">Install Paleo Hebrew Learning</h3>
            <p className="text-xs mb-3 opacity-90">
              Add to your home screen for the best experience! Tap the share button 
              <span className="mx-1">📤</span> then "Add to Home Screen"
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDismiss}
            className="text-white hover:bg-white/20 p-1 h-6 w-6"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  // Android/Chrome installation prompt
  if (deferredPrompt && showInstallBanner) {
    return (
      <div className="fixed bottom-4 left-4 right-4 z-50 bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-4 rounded-lg shadow-lg max-w-sm mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="font-bold text-sm mb-1">Install App</h3>
            <p className="text-xs opacity-90">
              Get the full experience with offline access and faster loading
            </p>
          </div>
          <div className="flex gap-2 ml-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="text-white hover:bg-white/20 px-2 py-1 h-8"
            >
              <X className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleInstallClick}
              className="bg-white text-blue-600 hover:bg-gray-100 px-3 py-1 h-8"
            >
              <Download className="h-4 w-4 mr-1" />
              Install
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

// Hook for checking PWA installation status
export function usePWA() {
  const [isInstalled, setIsInstalled] = useState(false);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    // Check if app is running as PWA
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isInWebAppiOS = (window.navigator as any).standalone === true;
    
    setIsInstalled(isStandalone || isInWebAppiOS);

    // Check if app can be installed
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  return { isInstalled, isInstallable };
}