import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Star } from "lucide-react";
import type { User } from "@shared/schema";

interface AppHeaderProps {
  user?: User;
}

export function AppHeader({ user }: AppHeaderProps) {
  const progressPercentage = user ? Math.round((user.charactersLearned / 22) * 100) : 0;

  return (
    <Card className="bg-white shadow-lg rounded-b-3xl mx-4 mt-4">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Custom mascot - diverse character */}
            <div className="w-16 h-16 bg-orange-400 rounded-full flex items-center justify-center text-white text-2xl fredoka shadow-lg">
              🦉
            </div>
            <div>
              <h1 className="text-2xl fredoka text-gray-800">Paleo Hebrew</h1>
              <p className="text-gray-600 text-sm">Ancient Letters Adventure!</p>
            </div>
          </div>
          
          {/* Progress indicator */}
          <div className="text-right">
            <div className="flex items-center space-x-2 mb-2">
              <Star className="text-yellow-400" size={20} />
              <span className="text-xl font-bold text-gray-800">{user?.stars || 0}</span>
            </div>
            <div className="w-24 mb-2">
              <Progress value={progressPercentage} className="h-3" />
            </div>
            <p className="text-xs text-gray-600">
              {user?.charactersLearned || 0}/22 Letters
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
