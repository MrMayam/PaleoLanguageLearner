import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  stars: integer("stars").default(0),
  totalProgress: integer("total_progress").default(0),
  charactersLearned: integer("characters_learned").default(0),
  pronunciationScore: integer("pronunciation_score").default(0),
  wordBuildingScore: integer("word_building_score").default(0),
  achievements: jsonb("achievements").$type<string[]>().default([]),
  createdAt: text("created_at").default("now()"),
});

export const paleoCharacters = pgTable("paleo_characters", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  character: text("character").notNull(),
  sound: text("sound").notNull(),
  order: integer("order").notNull(),
  description: text("description"),
});

export const userProgress = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  characterId: integer("character_id").notNull(),
  isLearned: boolean("is_learned").default(false),
  pronunciationAttempts: integer("pronunciation_attempts").default(0),
  pronunciationCorrect: integer("pronunciation_correct").default(0),
  tracingCompleted: boolean("tracing_completed").default(false),
  lastPracticed: text("last_practiced"),
});

export const achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  requirement: text("requirement").notNull(),
  points: integer("points").default(10),
});

export const userAchievements = pgTable("user_achievements", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  achievementId: integer("achievement_id").notNull(),
  unlockedAt: text("unlocked_at").default("now()"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
});

export const insertUserProgressSchema = createInsertSchema(userProgress).omit({
  id: true,
});

export const updateUserProgressSchema = createInsertSchema(userProgress).omit({
  id: true,
  userId: true,
  characterId: true,
}).partial();

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type PaleoCharacter = typeof paleoCharacters.$inferSelect;
export type UserProgress = typeof userProgress.$inferSelect;
export type InsertUserProgress = z.infer<typeof insertUserProgressSchema>;
export type UpdateUserProgress = z.infer<typeof updateUserProgressSchema>;
export type Achievement = typeof achievements.$inferSelect;
export type UserAchievement = typeof userAchievements.$inferSelect;
