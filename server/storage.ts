import {
  users,
  paleoCharacters,
  userProgress,
  achievements,
  userAchievements,
  type User,
  type InsertUser,
  type PaleoCharacter,
  type UserProgress,
  type InsertUserProgress,
  type UpdateUserProgress,
  type Achievement,
  type UserAchievement,
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserStats(userId: number, stats: Partial<User>): Promise<User>;

  // Character methods
  getAllCharacters(): Promise<PaleoCharacter[]>;
  getCharacter(id: number): Promise<PaleoCharacter | undefined>;

  // Progress methods
  getUserProgress(userId: number): Promise<UserProgress[]>;
  getCharacterProgress(userId: number, characterId: number): Promise<UserProgress | undefined>;
  updateCharacterProgress(userId: number, characterId: number, progress: UpdateUserProgress): Promise<UserProgress>;
  createCharacterProgress(progress: InsertUserProgress): Promise<UserProgress>;

  // Achievement methods
  getAllAchievements(): Promise<Achievement[]>;
  getUserAchievements(userId: number): Promise<UserAchievement[]>;
  unlockAchievement(userId: number, achievementId: number): Promise<UserAchievement>;
  checkAndUnlockAchievements(userId: number): Promise<UserAchievement[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private characters: Map<number, PaleoCharacter>;
  private userProgress: Map<string, UserProgress>;
  private achievements: Map<number, Achievement>;
  private userAchievements: Map<string, UserAchievement>;
  private currentUserId: number;
  private currentProgressId: number;
  private currentAchievementId: number;

  constructor() {
    this.users = new Map();
    this.characters = new Map();
    this.userProgress = new Map();
    this.achievements = new Map();
    this.userAchievements = new Map();
    this.currentUserId = 1;
    this.currentProgressId = 1;
    this.currentAchievementId = 1;

    // Initialize with default data
    this.initializeDefaultData();
  }

  private initializeDefaultData() {
    // Initialize Paleo Hebrew characters
    const paleoChars = [
      { name: "Ah-Lap", character: "𐤀", sound: "Ah", order: 1, description: "First letter, represents an ox" },
      { name: "Ba-Yath", character: "𐤁", sound: "Ba", order: 2, description: "House, represents a dwelling" },
      { name: "Ga-Mal", character: "𐤂", sound: "Ga", order: 3, description: "Camel, represents a camel" },
      { name: "Da-Lath", character: "𐤃", sound: "Da", order: 4, description: "Door, represents an entrance" },
      { name: "Ha", character: "𐤄", sound: "Ha", order: 5, description: "Window, represents light" },
      { name: "Wa-Wa", character: "𐤅", sound: "Wa", order: 6, description: "Nail, represents connection" },
      { name: "Za-Yan", character: "𐤆", sound: "Za", order: 7, description: "Weapon, represents protection" },
      { name: "Chaa-Lan", character: "𐤇", sound: "Chaa", order: 8, description: "Fence, represents enclosure" },
      { name: "Ta", character: "𐤈", sound: "Ta", order: 9, description: "Snake, represents wisdom" },
      { name: "Yad", character: "𐤉", sound: "Ya", order: 10, description: "Hand, represents work" },
      { name: "Ka-Phan", character: "𐤊", sound: "Ka", order: 11, description: "Palm, represents blessing" },
      { name: "La-Mam", character: "𐤋", sound: "La", order: 12, description: "Goad, represents teaching" },
      { name: "Ma-Yam", character: "𐤌", sound: "Ma", order: 13, description: "Water, represents chaos" },
      { name: "Na-Chash", character: "𐤍", sound: "Na", order: 14, description: "Fish, represents life" },
      { name: "Sa-Mak", character: "𐤎", sound: "Sa", order: 15, description: "Prop, represents support" },
      { name: "I-Yan", character: "𐤏", sound: "I", order: 16, description: "Eye, represents sight" },
      { name: "Pa", character: "𐤐", sound: "Pa", order: 17, description: "Mouth, represents speech" },
      { name: "Tza-Da", character: "𐤑", sound: "Tza", order: 18, description: "Hunt, represents need" },
      { name: "Qa-Phan", character: "𐤒", sound: "Qa", order: 19, description: "Back of head, represents behind" },
      { name: "Ra-Ash", character: "𐤓", sound: "Ra", order: 20, description: "Head, represents leadership" },
      { name: "Sha-Yan", character: "𐤔", sound: "Sha", order: 21, description: "Teeth, represents sharp" },
      { name: "Tha-Wa", character: "𐤕", sound: "Tha", order: 22, description: "Mark, represents sign" },
    ];

    paleoChars.forEach((char, index) => {
      this.characters.set(index + 1, { id: index + 1, ...char });
    });

    // Initialize achievements
    const defaultAchievements = [
      { name: "First Letter", description: "Learned your first Paleo Hebrew character!", icon: "🏆", requirement: "Learn 1 character", points: 10 },
      { name: "Sound Master", description: "Perfect pronunciation on 5 characters!", icon: "🔊", requirement: "5 perfect pronunciations", points: 25 },
      { name: "Word Builder", description: "Built your first ancient word!", icon: "🧱", requirement: "Build 1 word", points: 15 },
      { name: "Tracing Artist", description: "Completed tracing practice for 10 characters!", icon: "✏️", requirement: "Trace 10 characters", points: 20 },
      { name: "Ancient Scholar", description: "Mastered all 22 Paleo Hebrew characters!", icon: "📜", requirement: "Learn all 22 characters", points: 100 },
      { name: "Pronunciation Pro", description: "Perfect pronunciation on all learned characters!", icon: "🎤", requirement: "Perfect pronunciation on all", points: 50 },
    ];

    defaultAchievements.forEach((achievement, index) => {
      this.achievements.set(index + 1, { id: index + 1, ...achievement });
    });

    // Create a default user for demo
    this.createUser({ username: "learner" });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = {
      id,
      username: insertUser.username,
      stars: 0,
      totalProgress: 0,
      charactersLearned: 0,
      pronunciationScore: 0,
      wordBuildingScore: 0,
      achievements: [],
      createdAt: new Date().toISOString(),
    };
    this.users.set(id, user);
    return user;
  }

  async updateUserStats(userId: number, stats: Partial<User>): Promise<User> {
    const user = this.users.get(userId);
    if (!user) throw new Error("User not found");
    
    const updatedUser = { ...user, ...stats };
    this.users.set(userId, updatedUser);
    return updatedUser;
  }

  async getAllCharacters(): Promise<PaleoCharacter[]> {
    return Array.from(this.characters.values()).sort((a, b) => a.order - b.order);
  }

  async getCharacter(id: number): Promise<PaleoCharacter | undefined> {
    return this.characters.get(id);
  }

  async getUserProgress(userId: number): Promise<UserProgress[]> {
    return Array.from(this.userProgress.values()).filter(progress => progress.userId === userId);
  }

  async getCharacterProgress(userId: number, characterId: number): Promise<UserProgress | undefined> {
    const key = `${userId}-${characterId}`;
    return this.userProgress.get(key);
  }

  async updateCharacterProgress(userId: number, characterId: number, progress: UpdateUserProgress): Promise<UserProgress> {
    const key = `${userId}-${characterId}`;
    const existing = this.userProgress.get(key);
    
    if (!existing) {
      return this.createCharacterProgress({
        userId,
        characterId,
        ...progress,
      });
    }

    const updated = { ...existing, ...progress, lastPracticed: new Date().toISOString() };
    this.userProgress.set(key, updated);
    return updated;
  }

  async createCharacterProgress(progress: InsertUserProgress): Promise<UserProgress> {
    const id = this.currentProgressId++;
    const key = `${progress.userId}-${progress.characterId}`;
    const userProgress: UserProgress = {
      id,
      ...progress,
      lastPracticed: new Date().toISOString(),
    };
    this.userProgress.set(key, userProgress);
    return userProgress;
  }

  async getAllAchievements(): Promise<Achievement[]> {
    return Array.from(this.achievements.values());
  }

  async getUserAchievements(userId: number): Promise<UserAchievement[]> {
    return Array.from(this.userAchievements.values()).filter(ua => ua.userId === userId);
  }

  async unlockAchievement(userId: number, achievementId: number): Promise<UserAchievement> {
    const key = `${userId}-${achievementId}`;
    const existing = this.userAchievements.get(key);
    if (existing) return existing;

    const id = this.currentAchievementId++;
    const userAchievement: UserAchievement = {
      id,
      userId,
      achievementId,
      unlockedAt: new Date().toISOString(),
    };
    this.userAchievements.set(key, userAchievement);
    return userAchievement;
  }

  async checkAndUnlockAchievements(userId: number): Promise<UserAchievement[]> {
    const user = await this.getUser(userId);
    const userProgress = await this.getUserProgress(userId);
    const unlockedAchievements: UserAchievement[] = [];

    if (!user) return unlockedAchievements;

    // Check "First Letter" achievement
    if (user.charactersLearned >= 1) {
      try {
        const achievement = await this.unlockAchievement(userId, 1);
        unlockedAchievements.push(achievement);
      } catch (e) {
        // Already unlocked
      }
    }

    // Check other achievements based on user stats
    const perfectPronunciations = userProgress.filter(p => 
      p.pronunciationAttempts > 0 && p.pronunciationCorrect === p.pronunciationAttempts
    ).length;

    if (perfectPronunciations >= 5) {
      try {
        const achievement = await this.unlockAchievement(userId, 2);
        unlockedAchievements.push(achievement);
      } catch (e) {
        // Already unlocked
      }
    }

    if (user.charactersLearned >= 22) {
      try {
        const achievement = await this.unlockAchievement(userId, 5);
        unlockedAchievements.push(achievement);
      } catch (e) {
        // Already unlocked
      }
    }

    return unlockedAchievements;
  }
}

export const storage = new MemStorage();
