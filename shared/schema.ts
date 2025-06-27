import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email"),
  stars: integer("stars").default(0),
  totalProgress: integer("total_progress").default(0),
  charactersLearned: integer("characters_learned").default(0),
  pronunciationScore: integer("pronunciation_score").default(0),
  wordBuildingScore: integer("word_building_score").default(0),
  achievements: jsonb("achievements").$type<string[]>().default([]),
  // Subscription fields
  subscriptionType: text("subscription_type").default("free"), // free, premium, school
  subscriptionStatus: text("subscription_status").default("inactive"), // active, inactive, cancelled
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  subscriptionEndDate: text("subscription_end_date"),
  // Premium features
  premiumCharacterPacks: jsonb("premium_character_packs").$type<string[]>().default([]),
  offlineContentAccess: boolean("offline_content_access").default(false),
  parentReportsAccess: boolean("parent_reports_access").default(false),
  createdAt: text("created_at").default("now()"),
  updatedAt: text("updated_at").default("now()"),
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

// Character packs for premium content
export const characterPacks = pgTable("character_packs", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  price: integer("price").notNull(), // in cents
  characterIds: jsonb("character_ids").$type<number[]>().default([]),
  isPremium: boolean("is_premium").default(true),
  order: integer("order").default(0),
  imageUrl: text("image_url"),
});

// Purchases table for tracking individual purchases
export const purchases = pgTable("purchases", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  type: text("type").notNull(), // subscription, character_pack, offline_content, parent_reports
  itemId: integer("item_id"), // character pack id or null for subscriptions
  amount: integer("amount").notNull(), // in cents
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  status: text("status").default("pending"), // pending, completed, failed, refunded
  purchasedAt: text("purchased_at").default("now()"),
});

// School licenses for educational institutions
export const schoolLicenses = pgTable("school_licenses", {
  id: serial("id").primaryKey(),
  schoolName: text("school_name").notNull(),
  contactEmail: text("contact_email").notNull(),
  licenseType: text("license_type").default("classroom"), // classroom, institution
  maxStudents: integer("max_students").default(30),
  price: integer("price").notNull(), // in cents
  status: text("status").default("active"), // active, expired, suspended
  startDate: text("start_date").default("now()"),
  endDate: text("end_date"),
  stripeSubscriptionId: text("stripe_subscription_id"),
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
export type CharacterPack = typeof characterPacks.$inferSelect;
export type Purchase = typeof purchases.$inferSelect;
export type SchoolLicense = typeof schoolLicenses.$inferSelect;
