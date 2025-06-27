import { AppHeader } from "@/components/app-header";
import { NavigationBar } from "@/components/navigation-bar";
import { CharacterCard } from "@/components/character-card";
import { AchievementBadge } from "@/components/achievement-badge";
import { CelebrationModal } from "@/components/celebration-modal";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Star, GraduationCap, Volume2, Puzzle, PencilLine } from "lucide-react";
import type { PaleoCharacter, User, Achievement, UserAchievement } from "@shared/schema";
import { useState } from "react";

export default function Home() {
  const [showCelebration, setShowCelebration] = useState(false);
  
  // For demo purposes, using user ID 1
  const userId = 1;

  const { data: user } = useQuery<User>({
    queryKey: [`/api/user/${userId}`],
  });

  const { data: characters = [] } = useQuery<PaleoCharacter[]>({
    queryKey: ["/api/characters"],
  });

  const { data: achievements = [] } = useQuery<Achievement[]>({
    queryKey: ["/api/achievements"],
  });

  const { data: userAchievements = [] } = useQuery<UserAchievement[]>({
    queryKey: [`/api/user/${userId}/achievements`],
  });

  const featuredCharacters = characters.slice(0, 3);
  const progressPercentage = user ? Math.round((user.charactersLearned / 22) * 100) : 0;
  const pronunciationPercentage = user ? Math.round((user.pronunciationScore / 100) * 100) : 0;
  const wordBuildingPercentage = user ? Math.round((user.wordBuildingScore / 100) * 100) : 0;

  const unlockedAchievementIds = new Set(userAchievements.map(ua => ua.achievementId));

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 to-teal-400">
      <AppHeader user={user} />
      
      <main className="p-6 space-y-8 pb-24">
        {/* Daily Challenge Banner */}
        <Card className="bg-gradient-to-r from-yellow-300 to-orange-400 border-none shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-orange-400 text-2xl shadow-inner">
                  👧🏿
                </div>
                <div>
                  <h2 className="text-xl fredoka text-white mb-1">Daily Challenge</h2>
                  <p className="text-white/90 text-sm">Learn 3 new letters today!</p>
                </div>
              </div>
              <Link href="/alphabet">
                <Button className="bg-white text-orange-400 hover:bg-gray-50 px-6 py-3 rounded-2xl font-bold text-lg shadow-lg">
                  START
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Learning Modes */}
        <section>
          <h2 className="text-2xl fredoka text-white mb-6 text-center drop-shadow-lg">
            Choose Your Adventure!
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white">
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 bg-teal-400 rounded-full flex items-center justify-center mx-auto mb-4 text-white shadow-lg">
                  <GraduationCap size={32} />
                </div>
                <h3 className="text-xl fredoka text-gray-800 mb-2">Learn Letters</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Discover the 22 ancient Paleo Hebrew characters with their authentic names like Ah-Lap and Ba-Yath!
                </p>
                <Link href="/alphabet">
                  <Button className="bg-teal-400 hover:bg-teal-500 text-white px-8 py-4 rounded-2xl font-bold text-lg w-full">
                    Start Learning
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white">
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 bg-purple-400 rounded-full flex items-center justify-center mx-auto mb-4 text-white shadow-lg">
                  <Volume2 size={32} />
                </div>
                <h3 className="text-xl fredoka text-gray-800 mb-2">Sound Games</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Match letters to their ancient sounds! Practice pronunciation with authentic phonetics.
                </p>
                <Link href="/sounds">
                  <Button className="bg-purple-400 hover:bg-purple-500 text-white px-8 py-4 rounded-2xl font-bold text-lg w-full">
                    Play Sounds
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white">
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-4 text-white shadow-lg">
                  <Puzzle size={32} />
                </div>
                <h3 className="text-xl fredoka text-gray-800 mb-2">Build Words</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Combine characters to create ancient words using the authentic sound system!
                </p>
                <Link href="/words">
                  <Button className="bg-green-400 hover:bg-green-500 text-white px-8 py-4 rounded-2xl font-bold text-lg w-full">
                    Build Words
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white">
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 bg-orange-400 rounded-full flex items-center justify-center mx-auto mb-4 text-white shadow-lg">
                  <PencilLine size={32} />
                </div>
                <h3 className="text-xl fredoka text-gray-800 mb-2">Trace Letters</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Practice writing Paleo Hebrew characters with guided tracing exercises!
                </p>
                <Link href="/tracing">
                  <Button className="bg-orange-400 hover:bg-orange-500 text-white px-8 py-4 rounded-2xl font-bold text-lg w-full">
                    Start Tracing
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Featured Characters */}  
        <section>
          <h2 className="text-2xl fredoka text-white mb-6 text-center drop-shadow-lg">
            Today's Letters
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredCharacters.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>
          
          <div className="text-center mt-6">
            <Link href="/alphabet">
              <Button className="bg-white text-teal-400 hover:bg-gray-50 px-8 py-4 rounded-2xl font-bold text-lg shadow-lg">
                View All 22 Letters
              </Button>
            </Link>
          </div>
        </section>

        {/* Achievements */}
        <section>
          <h2 className="text-2xl fredoka text-white mb-6 text-center drop-shadow-lg">
            Your Achievements
          </h2>
          
          <Card className="bg-white shadow-xl">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {achievements.slice(0, 4).map((achievement) => (
                  <AchievementBadge
                    key={achievement.id}
                    achievement={achievement}
                    isUnlocked={unlockedAchievementIds.has(achievement.id)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Learning Progress */}
        <section>
          <h2 className="text-2xl fredoka text-white mb-6 text-center drop-shadow-lg">
            Learning Journey
          </h2>
          
          <Card className="bg-white shadow-xl">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white">
                    ✓
                  </div>
                  <div>
                    <h4 className="fredoka text-gray-800">Letters Learned</h4>
                    <p className="text-gray-600 text-sm">{user?.charactersLearned || 0} out of 22 characters</p>
                  </div>
                </div>
                <div className="text-right">
                  <Progress value={progressPercentage} className="w-24 mb-2" />
                  <span className="text-sm font-bold text-gray-800">{progressPercentage}%</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-teal-400 rounded-full flex items-center justify-center text-white">
                    🎤
                  </div>
                  <div>
                    <h4 className="fredoka text-gray-800">Pronunciation</h4>
                    <p className="text-gray-600 text-sm">Ancient sounds mastered</p>
                  </div>
                </div>
                <div className="text-right">
                  <Progress value={pronunciationPercentage} className="w-24 mb-2" />
                  <span className="text-sm font-bold text-gray-800">{pronunciationPercentage}%</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center text-white">
                    🧱
                  </div>
                  <div>
                    <h4 className="fredoka text-gray-800">Word Building</h4>
                    <p className="text-gray-600 text-sm">Ancient word construction</p>
                  </div>
                </div>
                <div className="text-right">
                  <Progress value={wordBuildingPercentage} className="w-24 mb-2" />
                  <span className="text-sm font-bold text-gray-800">{wordBuildingPercentage}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <NavigationBar />
      <CelebrationModal 
        isOpen={showCelebration}
        onClose={() => setShowCelebration(false)}
        message="You've learned a new Paleo Hebrew character!"
      />
    </div>
  );
}
