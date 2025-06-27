import {
  users,
  paleoCharacters,
  userProgress,
  achievements,
  userAchievements,
  characterPacks,
  purchases,
  schoolLicenses,
  type User,
  type InsertUser,
  type PaleoCharacter,
  type UserProgress,
  type InsertUserProgress,
  type UpdateUserProgress,
  type Achievement,
  type UserAchievement,
  type CharacterPack,
  type Purchase,
  type SchoolLicense,
} from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";

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

  // Monetization methods
  updateUserSubscription(userId: number, subscriptionData: Partial<User>): Promise<User>;
  getCharacterPacks(): Promise<CharacterPack[]>;
  getUserPurchases(userId: number): Promise<Purchase[]>;
  createPurchase(purchase: Omit<Purchase, 'id' | 'purchasedAt'>): Promise<Purchase>;
  updatePurchaseStatus(purchaseId: number, status: string): Promise<Purchase>;
  hasAccessToCharacterPack(userId: number, packId: number): Promise<boolean>;
  hasActivePremiumSubscription(userId: number): Promise<boolean>;
  getSchoolLicenses(): Promise<SchoolLicense[]>;
  createSchoolLicense(license: Omit<SchoolLicense, 'id' | 'startDate'>): Promise<SchoolLicense>;
}

export class DatabaseStorage implements IStorage {
  constructor() {
    // Initialize default data on first run
    this.initializeDefaultData();
  }

  private async initializeDefaultData() {
    try {
      // Check if data already exists
      const existingCharacters = await db.select().from(paleoCharacters).limit(1);
      if (existingCharacters.length > 0) {
        return; // Data already initialized
      }

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

      await db.insert(paleoCharacters).values(paleoChars);

      // Initialize achievements
      const defaultAchievements = [
        { name: "First Letter", description: "Learned your first Paleo Hebrew character!", icon: "🏆", requirement: "Learn 1 character", points: 10 },
        { name: "Sound Master", description: "Perfect pronunciation on 5 characters!", icon: "🔊", requirement: "5 perfect pronunciations", points: 25 },
        { name: "Word Builder", description: "Built your first ancient word!", icon: "🧱", requirement: "Build 1 word", points: 15 },
        { name: "Tracing Artist", description: "Completed tracing practice for 10 characters!", icon: "✏️", requirement: "Trace 10 characters", points: 20 },
        { name: "Ancient Scholar", description: "Mastered all 22 Paleo Hebrew characters!", icon: "📜", requirement: "Learn all 22 characters", points: 100 },
        { name: "Pronunciation Pro", description: "Perfect pronunciation on all learned characters!", icon: "🎤", requirement: "Perfect pronunciation on all", points: 50 },
      ];

      await db.insert(achievements).values(defaultAchievements);

      // Create a default user for demo
      await this.createUser({ username: "learner" });
    } catch (error) {
      console.error("Error initializing default data:", error);
    }
  }

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUserStats(userId: number, stats: Partial<User>): Promise<User> {
    const [user] = await db
      .update(users)
      .set(stats)
      .where(eq(users.id, userId))
      .returning();
    
    if (!user) throw new Error("User not found");
    return user;
  }

  async getAllCharacters(): Promise<PaleoCharacter[]> {
    return await db.select().from(paleoCharacters).orderBy(paleoCharacters.order);
  }

  async getCharacter(id: number): Promise<PaleoCharacter | undefined> {
    const [character] = await db.select().from(paleoCharacters).where(eq(paleoCharacters.id, id));
    return character || undefined;
  }

  async getUserProgress(userId: number): Promise<UserProgress[]> {
    return await db.select().from(userProgress).where(eq(userProgress.userId, userId));
  }

  async getCharacterProgress(userId: number, characterId: number): Promise<UserProgress | undefined> {
    const [progress] = await db.select().from(userProgress)
      .where(and(eq(userProgress.userId, userId), eq(userProgress.characterId, characterId)));
    return progress || undefined;
  }

  async updateCharacterProgress(userId: number, characterId: number, progress: UpdateUserProgress): Promise<UserProgress> {
    const existing = await this.getCharacterProgress(userId, characterId);
    
    if (!existing) {
      return this.createCharacterProgress({
        userId,
        characterId,
        ...progress,
      });
    }

    const updated = await db
      .update(userProgress)
      .set({ ...progress, lastPracticed: new Date().toISOString() })
      .where(and(eq(userProgress.userId, userId), eq(userProgress.characterId, characterId)))
      .returning();
    
    return updated[0];
  }

  async createCharacterProgress(progress: InsertUserProgress): Promise<UserProgress> {
    const [userProgressItem] = await db
      .insert(userProgress)
      .values({
        ...progress,
        lastPracticed: new Date().toISOString(),
      })
      .returning();
    
    return userProgressItem;
  }

  async getAllAchievements(): Promise<Achievement[]> {
    return await db.select().from(achievements);
  }

  async getUserAchievements(userId: number): Promise<UserAchievement[]> {
    return await db.select().from(userAchievements).where(eq(userAchievements.userId, userId));
  }

  async unlockAchievement(userId: number, achievementId: number): Promise<UserAchievement> {
    const existing = await db.select().from(userAchievements)
      .where(and(eq(userAchievements.userId, userId), eq(userAchievements.achievementId, achievementId)));
    
    if (existing.length > 0) return existing[0];

    const result = await db
      .insert(userAchievements)
      .values({
        userId,
        achievementId,
        unlockedAt: new Date().toISOString(),
      })
      .returning();
    
    if (!result[0]) throw new Error("Failed to unlock achievement");
    return result[0];
  }

  async checkAndUnlockAchievements(userId: number): Promise<UserAchievement[]> {
    const user = await this.getUser(userId);
    const progressList = await this.getUserProgress(userId);
    const unlockedAchievements: UserAchievement[] = [];

    if (!user) return unlockedAchievements;

    // Check "First Letter" achievement
    if ((user.charactersLearned || 0) >= 1) {
      try {
        const achievement = await this.unlockAchievement(userId, 1);
        unlockedAchievements.push(achievement);
      } catch (e) {
        // Already unlocked
      }
    }

    // Check other achievements based on user stats
    const perfectPronunciations = progressList.filter(p => 
      (p.pronunciationAttempts || 0) > 0 && (p.pronunciationCorrect || 0) === (p.pronunciationAttempts || 0)
    ).length;

    if (perfectPronunciations >= 5) {
      try {
        const achievement = await this.unlockAchievement(userId, 2);
        unlockedAchievements.push(achievement);
      } catch (e) {
        // Already unlocked
      }
    }

    if ((user.charactersLearned || 0) >= 22) {
      try {
        const achievement = await this.unlockAchievement(userId, 5);
        unlockedAchievements.push(achievement);
      } catch (e) {
        // Already unlocked
      }
    }

    return unlockedAchievements;
  }

  // Monetization methods
  async updateUserSubscription(userId: number, subscriptionData: Partial<User>): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ ...subscriptionData, updatedAt: new Date().toISOString() })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  async getCharacterPacks(): Promise<CharacterPack[]> {
    return await db.select().from(characterPacks).orderBy(characterPacks.order);
  }

  async getUserPurchases(userId: number): Promise<Purchase[]> {
    return await db.select().from(purchases).where(eq(purchases.userId, userId));
  }

  async createPurchase(purchase: Omit<Purchase, 'id' | 'purchasedAt'>): Promise<Purchase> {
    const [newPurchase] = await db
      .insert(purchases)
      .values({ ...purchase, purchasedAt: new Date().toISOString() })
      .returning();
    return newPurchase;
  }

  async updatePurchaseStatus(purchaseId: number, status: string): Promise<Purchase> {
    const [purchase] = await db
      .update(purchases)
      .set({ status })
      .where(eq(purchases.id, purchaseId))
      .returning();
    return purchase;
  }

  async hasAccessToCharacterPack(userId: number, packId: number): Promise<boolean> {
    const user = await this.getUser(userId);
    if (!user) return false;

    // Check if user has premium subscription
    if (user.subscriptionStatus === 'active' && user.subscriptionType === 'premium') {
      return true;
    }

    // Check if user purchased this specific pack
    const purchase = await db
      .select()
      .from(purchases)
      .where(
        and(
          eq(purchases.userId, userId),
          eq(purchases.type, 'character_pack'),
          eq(purchases.itemId, packId),
          eq(purchases.status, 'completed')
        )
      )
      .limit(1);

    return purchase.length > 0;
  }

  async hasActivePremiumSubscription(userId: number): Promise<boolean> {
    const user = await this.getUser(userId);
    if (!user) return false;

    return user.subscriptionStatus === 'active' && 
           (user.subscriptionType === 'premium' || user.subscriptionType === 'school');
  }

  async getSchoolLicenses(): Promise<SchoolLicense[]> {
    return await db.select().from(schoolLicenses).where(eq(schoolLicenses.status, 'active'));
  }

  async createSchoolLicense(license: Omit<SchoolLicense, 'id' | 'startDate'>): Promise<SchoolLicense> {
    const [newLicense] = await db
      .insert(schoolLicenses)
      .values({ ...license, startDate: new Date().toISOString() })
      .returning();
    return newLicense;
  }
}

export const storage = new DatabaseStorage();
