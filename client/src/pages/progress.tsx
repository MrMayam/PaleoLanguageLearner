import { AppHeader } from "@/components/app-header";
import { NavigationBar } from "@/components/navigation-bar";
import { AchievementBadge } from "@/components/achievement-badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, Star, TrendingUp, Target, Award } from "lucide-react";
import { Link } from "wouter";
import type { User, Achievement, UserAchievement, UserProgress, PaleoCharacter } from "@shared/schema";

export default function ProgressPage() {
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

  const { data: userProgress = [] } = useQuery<UserProgress[]>({
    queryKey: [`/api/user/${userId}/progress`],
  });

  const unlockedAchievementIds = new Set(userAchievements.map(ua => ua.achievementId));
  const progressPercentage = user ? Math.round(((user.charactersLearned || 0) / 22) * 100) : 0;
  const pronunciationPercentage = user ? Math.round(((user.pronunciationScore || 0) / 100) * 100) : 0;
  const wordBuildingPercentage = user ? Math.round(((user.wordBuildingScore || 0) / 100) * 100) : 0;

  const learnedCharacters = userProgress.filter(p => p.isLearned).length;
  const tracedCharacters = userProgress.filter(p => p.tracingCompleted).length;
  const perfectPronunciations = userProgress.filter(p => 
    (p.pronunciationAttempts || 0) > 0 && p.pronunciationCorrect === (p.pronunciationAttempts || 0)
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 to-purple-400">
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
            <h1 className="text-2xl fredoka text-white drop-shadow-lg">Your Progress</h1>
            <p className="text-white/90 text-sm">Track your Paleo Hebrew journey</p>
          </div>
          <div className="w-10" /> {/* Spacer */}
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-white/90 backdrop-blur">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-2">
                <Star className="text-white" size={20} />
              </div>
              <div className="text-2xl fredoka text-gray-800">{user?.stars || 0}</div>
              <div className="text-xs text-gray-600">Stars Earned</div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-2">
                <Target className="text-white" size={20} />
              </div>
              <div className="text-2xl fredoka text-gray-800">{learnedCharacters}/22</div>
              <div className="text-xs text-gray-600">Letters Learned</div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-purple-400 rounded-full flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="text-white" size={20} />
              </div>
              <div className="text-2xl fredoka text-gray-800">{perfectPronunciations}</div>
              <div className="text-xs text-gray-600">Perfect Sounds</div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center mx-auto mb-2">
                <Award className="text-white" size={20} />
              </div>
              <div className="text-2xl fredoka text-gray-800">{userAchievements.length}</div>
              <div className="text-xs text-gray-600">Achievements</div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Progress */}
        <section>
          <h2 className="text-xl fredoka text-white mb-4 text-center drop-shadow-lg">
            Learning Progress
          </h2>
          
          <div className="space-y-4">
            <Card className="bg-white shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white">
                      ✓
                    </div>
                    <div>
                      <h4 className="fredoka text-gray-800">Letters Mastered</h4>
                      <p className="text-gray-600 text-sm">{learnedCharacters} out of 22 characters</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-800">{progressPercentage}%</div>
                  </div>
                </div>
                <Progress value={progressPercentage} className="h-3" />
              </CardContent>
            </Card>

            <Card className="bg-white shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-400 rounded-full flex items-center justify-center text-white">
                      🎤
                    </div>
                    <div>
                      <h4 className="fredoka text-gray-800">Pronunciation Skills</h4>
                      <p className="text-gray-600 text-sm">Ancient sounds mastered</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-800">{pronunciationPercentage}%</div>
                  </div>
                </div>
                <Progress value={pronunciationPercentage} className="h-3" />
              </CardContent>
            </Card>

            <Card className="bg-white shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-teal-400 rounded-full flex items-center justify-center text-white">
                      🧱
                    </div>
                    <div>
                      <h4 className="fredoka text-gray-800">Word Building</h4>
                      <p className="text-gray-600 text-sm">Ancient word construction</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-800">{wordBuildingPercentage}%</div>
                  </div>
                </div>
                <Progress value={wordBuildingPercentage} className="h-3" />
              </CardContent>
            </Card>

            <Card className="bg-white shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center text-white">
                      ✏️
                    </div>
                    <div>
                      <h4 className="fredoka text-gray-800">Tracing Practice</h4>
                      <p className="text-gray-600 text-sm">{tracedCharacters} characters traced</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-800">
                      {Math.round((tracedCharacters / 22) * 100)}%
                    </div>
                  </div>
                </div>
                <Progress value={Math.round((tracedCharacters / 22) * 100)} className="h-3" />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* All Achievements */}
        <section>
          <h2 className="text-xl fredoka text-white mb-4 text-center drop-shadow-lg">
            All Achievements
          </h2>
          
          <Card className="bg-white shadow-xl">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {achievements.map((achievement) => (
                  <AchievementBadge
                    key={achievement.id}
                    achievement={achievement}
                    isUnlocked={unlockedAchievementIds.has(achievement.id)}
                    showDescription={true}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Character Progress Grid */}
        <section>
          <h2 className="text-xl fredoka text-white mb-4 text-center drop-shadow-lg">
            Character Mastery
          </h2>
          
          <Card className="bg-white shadow-xl">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {characters.map((character) => {
                  const progress = userProgress.find(p => p.characterId === character.id);
                  const isLearned = progress?.isLearned || false;
                  const isTraced = progress?.tracingCompleted || false;
                  const pronunciationAttempts = progress?.pronunciationAttempts || 0;
                  const hasPerfectPronunciation = progress && pronunciationAttempts > 0 && 
                    progress.pronunciationCorrect === pronunciationAttempts;

                  return (
                    <div key={character.id} className="text-center p-3 bg-gray-50 rounded-2xl relative">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2 text-white text-lg font-bold ${
                        isLearned ? 'bg-green-400' : 'bg-gray-300'
                      }`}>
                        {character.character}
                      </div>
                      <div className="text-xs fredoka text-gray-800 mb-1">{character.name}</div>
                      
                      {/* Progress indicators */}
                      <div className="flex justify-center space-x-1">
                        {isLearned && <div className="w-2 h-2 bg-green-400 rounded-full" title="Learned" />}
                        {isTraced && <div className="w-2 h-2 bg-orange-400 rounded-full" title="Traced" />}
                        {hasPerfectPronunciation && <div className="w-2 h-2 bg-purple-400 rounded-full" title="Perfect Pronunciation" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Encouragement */}
        <Card className="bg-gradient-to-r from-yellow-300 to-orange-400 text-white border-none">
          <CardContent className="p-6">
            <div className="flex items-center justify-center space-x-4">
              <div className="text-2xl">👦🏿</div>
              <div className="text-center">
                <p className="fredoka">Keep up the amazing work!</p>
                <p className="text-sm opacity-90">You're on your way to mastering ancient Hebrew!</p>
              </div>
              <div className="text-2xl">👧🏽</div>
              <div className="text-2xl">🧒🏾</div>
            </div>
          </CardContent>
        </Card>
      </main>

      <NavigationBar />
    </div>
  );
}
