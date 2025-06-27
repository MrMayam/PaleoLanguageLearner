import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, TrendingUp, Clock, Award, Download, Calendar } from "lucide-react";

export default function ParentDashboard() {
  const { data: user } = useQuery({
    queryKey: ["/api/user/1"],
  });

  const { data: userProgress = [] } = useQuery({
    queryKey: ["/api/user/1/progress"],
  });

  const { data: achievements = [] } = useQuery({
    queryKey: ["/api/user/1/achievements"],
  });

  const { data: characters = [] } = useQuery({
    queryKey: ["/api/characters"],
  });

  // Calculate analytics
  const totalCharacters = characters.length;
  const learnedCharacters = user?.charactersLearned || 0;
  const overallProgress = totalCharacters > 0 ? (learnedCharacters / totalCharacters) * 100 : 0;

  const pronunciationAccuracy = userProgress.length > 0 
    ? userProgress.reduce((acc, p) => {
        const attempts = p.pronunciationAttempts || 0;
        const correct = p.pronunciationCorrect || 0;
        return acc + (attempts > 0 ? (correct / attempts) * 100 : 0);
      }, 0) / userProgress.length
    : 0;

  const tracingAccuracy = userProgress.length > 0
    ? userProgress.reduce((acc, p) => {
        const attempts = p.tracingAttempts || 0;
        const correct = p.tracingCorrect || 0;
        return acc + (attempts > 0 ? (correct / attempts) * 100 : 0);
      }, 0) / userProgress.length
    : 0;

  const recentActivity = userProgress
    .filter(p => p.lastStudied)
    .sort((a, b) => new Date(b.lastStudied!).getTime() - new Date(a.lastStudied!).getTime())
    .slice(0, 5);

  const weeklyProgress = [
    { day: 'Mon', characters: 2, time: 15 },
    { day: 'Tue', characters: 3, time: 22 },
    { day: 'Wed', characters: 1, time: 12 },
    { day: 'Thu', characters: 4, time: 28 },
    { day: 'Fri', characters: 2, time: 18 },
    { day: 'Sat', characters: 3, time: 25 },
    { day: 'Sun', characters: 1, time: 10 },
  ];

  const totalWeeklyTime = weeklyProgress.reduce((acc, day) => acc + day.time, 0);

  const hasParentReportsAccess = user?.parentReportsAccess || false;

  if (!hasParentReportsAccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
            <BarChart3 className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Parent Dashboard</h1>
          <p className="text-lg text-gray-600 mb-8">
            Get detailed insights into your child's Paleo Hebrew learning progress
          </p>
          
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Unlock Parent Reports</CardTitle>
              <CardDescription>
                Get detailed analytics and progress reports for just $1.99/month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Weekly progress reports</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BarChart3 className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Detailed learning analytics</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Time spent tracking</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Achievement notifications</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Download className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Downloadable reports</span>
                </div>
              </div>
              
              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={() => window.location.href = '/premium'}
              >
                Unlock Parent Reports - $1.99/month
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Parent Dashboard</h1>
            <p className="text-gray-600">Track {user?.username || 'your child'}'s Paleo Hebrew learning journey</p>
          </div>
          <Button variant="outline" className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export Report</span>
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallProgress.toFixed(1)}%</div>
              <Progress value={overallProgress} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">
                {learnedCharacters} of {totalCharacters} characters mastered
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pronunciation Accuracy</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pronunciationAccuracy.toFixed(1)}%</div>
              <Progress value={pronunciationAccuracy} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">
                Average across all characters
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Weekly Study Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalWeeklyTime}min</div>
              <Progress value={(totalWeeklyTime / 210) * 100} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">
                Target: 30min/day
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Achievements</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{achievements.length}</div>
              <p className="text-xs text-muted-foreground mt-2">
                Badges earned this month
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="characters">Characters</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Progress</CardTitle>
                  <CardDescription>Daily study time and characters learned</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {weeklyProgress.map((day, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 text-sm font-medium">{day.day}</div>
                          <div className="flex-1">
                            <Progress value={(day.time / 30) * 100} className="h-2" />
                          </div>
                        </div>
                        <div className="text-right text-sm text-gray-600">
                          <div>{day.characters} chars</div>
                          <div>{day.time}min</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Learning Strengths</CardTitle>
                  <CardDescription>Areas where your child excels</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Pronunciation</span>
                      <Badge variant={pronunciationAccuracy > 80 ? "default" : "secondary"}>
                        {pronunciationAccuracy > 80 ? "Excellent" : "Good"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Character Recognition</span>
                      <Badge variant={overallProgress > 70 ? "default" : "secondary"}>
                        {overallProgress > 70 ? "Strong" : "Developing"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Tracing Accuracy</span>
                      <Badge variant={tracingAccuracy > 75 ? "default" : "secondary"}>
                        {tracingAccuracy > 75 ? "Precise" : "Improving"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Consistency</span>
                      <Badge variant={totalWeeklyTime > 140 ? "default" : "secondary"}>
                        {totalWeeklyTime > 140 ? "Daily Learner" : "Regular"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="characters" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Character Mastery</CardTitle>
                <CardDescription>Progress on each Paleo Hebrew character</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {characters.slice(0, 10).map((character: any) => {
                    const progress = userProgress.find(p => p.characterId === character.id);
                    const mastery = progress?.masteryLevel || 0;
                    
                    return (
                      <div key={character.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl font-hebrew">{character.character}</div>
                          <div>
                            <div className="font-medium">{character.name}</div>
                            <div className="text-sm text-gray-600">{character.sound}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{mastery}%</div>
                          <Progress value={mastery} className="w-16 h-2" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest learning sessions and progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => {
                    const character = characters.find((c: any) => c.id === activity.characterId);
                    
                    return (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <div>
                            <div className="font-medium">Studied {character?.name}</div>
                            <div className="text-sm text-gray-600">
                              {activity.lastStudied ? new Date(activity.lastStudied).toLocaleDateString() : 'Recently'}
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline">
                          {activity.masteryLevel}% mastery
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Earned Achievements</CardTitle>
                <CardDescription>Celebrate your child's learning milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {achievements.length > 0 ? (
                    achievements.map((achievement: any, index: number) => (
                      <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg bg-yellow-50">
                        <Award className="h-8 w-8 text-yellow-600" />
                        <div>
                          <div className="font-medium">{achievement.name}</div>
                          <div className="text-sm text-gray-600">{achievement.description}</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-8 text-gray-500">
                      <Award className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                      <p>No achievements earned yet. Keep learning to unlock your first badge!</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}