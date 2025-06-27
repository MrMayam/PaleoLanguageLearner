import type { Express } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import { storage } from "./storage";
import { insertUserSchema, insertUserProgressSchema, updateUserProgressSchema } from "@shared/schema";
import { z } from "zod";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-05-28.basil",
});

export async function registerRoutes(app: Express): Promise<Server> {
  // User routes
  app.get("/api/user/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const user = await storage.getUser(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/user/username/:username", async (req, res) => {
    try {
      const user = await storage.getUserByUsername(req.params.username);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/user", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid user data", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.patch("/api/user/:id/stats", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const user = await storage.updateUserStats(id, req.body);
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Character routes
  app.get("/api/characters", async (req, res) => {
    try {
      const characters = await storage.getAllCharacters();
      res.json(characters);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/characters/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const character = await storage.getCharacter(id);
      if (!character) {
        return res.status(404).json({ message: "Character not found" });
      }
      res.json(character);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Progress routes
  app.get("/api/user/:userId/progress", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const progress = await storage.getUserProgress(userId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/user/:userId/progress/:characterId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const characterId = parseInt(req.params.characterId);
      const progress = await storage.getCharacterProgress(userId, characterId);
      if (!progress) {
        return res.status(404).json({ message: "Progress not found" });
      }
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/user/:userId/progress/:characterId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const characterId = parseInt(req.params.characterId);
      const progressData = updateUserProgressSchema.parse(req.body);
      const progress = await storage.updateCharacterProgress(userId, characterId, progressData);
      
      // Check for new achievements
      const newAchievements = await storage.checkAndUnlockAchievements(userId);
      
      res.json({ progress, newAchievements });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid progress data", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Achievement routes
  app.get("/api/achievements", async (req, res) => {
    try {
      const achievements = await storage.getAllAchievements();
      res.json(achievements);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/user/:userId/achievements", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const userAchievements = await storage.getUserAchievements(userId);
      res.json(userAchievements);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Monetization routes
  
  // Get character packs
  app.get("/api/character-packs", async (req, res) => {
    try {
      const packs = await storage.getCharacterPacks();
      res.json(packs);
    } catch (error) {
      console.error("Error fetching character packs:", error);
      res.status(500).json({ message: "Failed to fetch character packs" });
    }
  });

  // Check premium access
  app.get("/api/user/:id/premium-access", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const hasPremium = await storage.hasActivePremiumSubscription(userId);
      res.json({ hasPremium });
    } catch (error) {
      console.error("Error checking premium access:", error);
      res.status(500).json({ message: "Failed to check premium access" });
    }
  });

  // Create subscription payment intent
  app.post("/api/create-subscription", async (req, res) => {
    try {
      const { userId, subscriptionType } = req.body;
      
      let amount = 0;
      if (subscriptionType === 'monthly') amount = 499; // $4.99
      if (subscriptionType === 'yearly') amount = 3999; // $39.99
      if (subscriptionType === 'school') amount = 29900; // $299.00

      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "usd",
        metadata: {
          userId: userId.toString(),
          type: 'subscription',
          subscriptionType
        },
      });

      // Create purchase record
      await storage.createPurchase({
        userId,
        type: 'subscription',
        itemId: null,
        amount,
        stripePaymentIntentId: paymentIntent.id,
        status: 'pending'
      });

      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      console.error("Error creating subscription:", error);
      res.status(500).json({ message: "Error creating subscription: " + error.message });
    }
  });

  // Create character pack payment intent
  app.post("/api/purchase-character-pack", async (req, res) => {
    try {
      const { userId, packId } = req.body;
      
      const packs = await storage.getCharacterPacks();
      const pack = packs.find(p => p.id === packId);
      
      if (!pack) {
        return res.status(404).json({ message: "Character pack not found" });
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: pack.price,
        currency: "usd",
        metadata: {
          userId: userId.toString(),
          type: 'character_pack',
          packId: packId.toString()
        },
      });

      // Create purchase record
      await storage.createPurchase({
        userId,
        type: 'character_pack',
        itemId: packId,
        amount: pack.price,
        stripePaymentIntentId: paymentIntent.id,
        status: 'pending'
      });

      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      console.error("Error purchasing character pack:", error);
      res.status(500).json({ message: "Error purchasing character pack: " + error.message });
    }
  });

  // Purchase premium features
  app.post("/api/purchase-premium-feature", async (req, res) => {
    try {
      const { userId, featureType } = req.body;
      
      let amount = 0;
      if (featureType === 'offline_content') amount = 499; // $4.99
      if (featureType === 'parent_reports') amount = 199; // $1.99

      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "usd",
        metadata: {
          userId: userId.toString(),
          type: featureType
        },
      });

      // Create purchase record
      await storage.createPurchase({
        userId,
        type: featureType,
        itemId: null,
        amount,
        stripePaymentIntentId: paymentIntent.id,
        status: 'pending'
      });

      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      console.error("Error purchasing premium feature:", error);
      res.status(500).json({ message: "Error purchasing premium feature: " + error.message });
    }
  });

  // Stripe webhook for payment confirmations
  app.post("/api/stripe-webhook", async (req, res) => {
    try {
      const event = req.body;

      if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object;
        const { userId, type, subscriptionType, packId } = paymentIntent.metadata;

        // Update purchase status
        const purchases = await storage.getUserPurchases(parseInt(userId));
        const purchase = purchases.find(p => p.stripePaymentIntentId === paymentIntent.id);
        
        if (purchase) {
          await storage.updatePurchaseStatus(purchase.id, 'completed');

          // Update user subscription or purchases
          if (type === 'subscription') {
            const endDate = new Date();
            if (subscriptionType === 'monthly') {
              endDate.setMonth(endDate.getMonth() + 1);
            } else if (subscriptionType === 'yearly') {
              endDate.setFullYear(endDate.getFullYear() + 1);
            } else if (subscriptionType === 'school') {
              endDate.setFullYear(endDate.getFullYear() + 1);
            }

            await storage.updateUserSubscription(parseInt(userId), {
              subscriptionType: subscriptionType === 'school' ? 'school' : 'premium',
              subscriptionStatus: 'active',
              subscriptionEndDate: endDate.toISOString()
            });
          } else if (type === 'character_pack') {
            const user = await storage.getUser(parseInt(userId));
            if (user) {
              const currentPacks = user.premiumCharacterPacks || [];
              if (!currentPacks.includes(packId)) {
                await storage.updateUserSubscription(parseInt(userId), {
                  premiumCharacterPacks: [...currentPacks, packId]
                });
              }
            }
          } else if (type === 'offline_content') {
            await storage.updateUserSubscription(parseInt(userId), {
              offlineContentAccess: true
            });
          } else if (type === 'parent_reports') {
            await storage.updateUserSubscription(parseInt(userId), {
              parentReportsAccess: true
            });
          }
        }
      }

      res.json({ received: true });
    } catch (error) {
      console.error("Webhook error:", error);
      res.status(400).json({ message: "Webhook error" });
    }
  });

  // School license routes
  app.post("/api/school-license", async (req, res) => {
    try {
      const { schoolName, contactEmail, licenseType, maxStudents } = req.body;
      
      const price = licenseType === 'classroom' ? 29900 : 99900; // $299 or $999
      
      const license = await storage.createSchoolLicense({
        schoolName,
        contactEmail,
        licenseType,
        maxStudents: maxStudents || 30,
        price,
        status: 'pending',
        stripeSubscriptionId: null,
        endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() // 1 year
      });

      res.json(license);
    } catch (error) {
      console.error("Error creating school license:", error);
      res.status(500).json({ message: "Failed to create school license" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
