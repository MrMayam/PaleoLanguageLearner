import type { Achievement } from "@shared/schema";

interface AchievementBadgeProps {
  achievement: Achievement;
  isUnlocked: boolean;
  showDescription?: boolean;
}

export function AchievementBadge({ achievement, isUnlocked, showDescription = false }: AchievementBadgeProps) {
  const colors = [
    "from-yellow-300 to-orange-400",
    "from-teal-400 to-blue-400",
    "from-purple-400 to-pink-400",
    "from-green-400 to-teal-400",
  ];
  
  const colorIndex = achievement.id % colors.length;
  const gradientClass = colors[colorIndex];

  return (
    <div className={`text-center p-4 rounded-2xl text-white shadow-lg transition-all duration-300 ${
      isUnlocked 
        ? `bg-gradient-to-br ${gradientClass} transform hover:scale-105`
        : 'bg-gray-300 text-gray-600 opacity-60'
    }`}>
      <div className="text-3xl mb-2">
        {isUnlocked ? achievement.icon : '🔒'}
      </div>
      <h4 className="fredoka text-sm mb-1">{achievement.name}</h4>
      {showDescription && (
        <p className="text-xs opacity-90">{achievement.description}</p>
      )}
      {!showDescription && (
        <p className="text-xs opacity-90">
          {isUnlocked ? `${achievement.points} pts` : achievement.requirement}
        </p>
      )}
    </div>
  );
}
