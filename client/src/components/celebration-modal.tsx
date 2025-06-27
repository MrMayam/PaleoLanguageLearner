import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface CelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

export function CelebrationModal({ isOpen, onClose, message }: CelebrationModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <div className="text-center p-8">
          <div className="text-6xl mb-4 animate-bounce-gentle">🎉</div>
          <h3 className="text-2xl fredoka text-gray-800 mb-2">Amazing Work!</h3>
          <p className="text-gray-600 mb-6">{message}</p>
          
          {/* Diverse character celebration */}
          <div className="flex justify-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-orange-400 rounded-full flex items-center justify-center text-2xl animate-bounce">
              👦🏿
            </div>
            <div className="w-16 h-16 bg-teal-400 rounded-full flex items-center justify-center text-2xl animate-bounce" style={{ animationDelay: '0.1s' }}>
              👧🏽
            </div>
            <div className="w-16 h-16 bg-purple-400 rounded-full flex items-center justify-center text-2xl animate-bounce" style={{ animationDelay: '0.2s' }}>
              🧒🏾
            </div>
          </div>
          
          <Button 
            onClick={onClose}
            className="bg-orange-400 hover:bg-orange-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Continue Learning!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
