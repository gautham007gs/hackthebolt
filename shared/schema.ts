import { 
  pgTable, 
  text, 
  serial, 
  integer, 
  boolean, 
  timestamp, 
  jsonb,
  varchar,
  index 
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for authentication
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// Enhanced users table with admin roles and creator features
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  username: text("username").unique(),
  bio: text("bio"),
  role: text("role").notNull().default("user"), // user, creator, admin
  isEmailVerified: boolean("is_email_verified").default(false),
  points: integer("points").default(0),
  level: integer("level").default(1),
  isActive: boolean("is_active").default(true),
  lastLoginAt: timestamp("last_login_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Blog posts for creator platform
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  featuredImage: text("featured_image"),
  authorId: varchar("author_id").notNull(),
  category: text("category").notNull(),
  tags: text("tags").array(),
  status: text("status").notNull().default("draft"), // draft, pending, published, rejected
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  seoKeywords: text("seo_keywords"),
  views: integer("views").default(0),
  likes: integer("likes").default(0),
  featured: boolean("featured").default(false),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// GitHub tools content
export const githubTools = pgTable("github_tools", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  difficulty: text("difficulty").notNull(),
  content: text("content").notNull(),
  useCases: text("use_cases").array(),
  alternatives: text("alternatives").array(),
  commonErrors: jsonb("common_errors"),
  bestPractices: text("best_practices").array(),
  officialUrl: text("official_url"),
  githubUrl: text("github_url"),
  documentation: text("documentation"),
  views: integer("views").default(0),
  featured: boolean("featured").default(false),
  authorId: varchar("author_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Site configuration for admin control
export const siteConfig = pgTable("site_config", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  value: text("value"),
  description: text("description"),
  updatedBy: varchar("updated_by").notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// User achievements and gamification
export const achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull(),
  type: text("type").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  icon: text("icon"),
  points: integer("points").default(0),
  unlockedAt: timestamp("unlocked_at").defaultNow(),
});

// User engagement analytics
export const userActivity = pgTable("user_activity", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id"),
  action: text("action").notNull(),
  resourceType: text("resource_type"),
  resourceId: text("resource_id"),
  metadata: jsonb("metadata"),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Comments system
export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  authorId: varchar("author_id").notNull(),
  postId: integer("post_id").notNull(),
  content: text("content").notNull(),
  parentId: integer("parent_id"),
  status: text("status").notNull().default("published"), // published, hidden, flagged
  likes: integer("likes").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// SEO tracking and analytics
export const seoMetrics = pgTable("seo_metrics", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  title: text("title"),
  description: text("description"),
  keywords: text("keywords"),
  views: integer("views").default(0),
  clicks: integer("clicks").default(0),
  impressions: integer("impressions").default(0),
  position: integer("position"),
  lastCrawled: timestamp("last_crawled"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Professional Labs System
export const labs = pgTable("labs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  category: text("category").notNull(), // web-security, network, forensics, crypto, reverse-engineering
  difficulty: text("difficulty").notNull(), // beginner, intermediate, advanced, expert
  tags: text("tags").array(),
  objectives: text("objectives").array(),
  prerequisites: text("prerequisites").array(),
  estimatedTime: integer("estimated_time"), // in minutes
  maxAttempts: integer("max_attempts").default(3),
  content: jsonb("content").notNull(), // lab instructions, hints, resources
  environment: jsonb("environment"), // docker config, vm setup, etc
  solution: jsonb("solution"), // step-by-step solution
  hints: jsonb("hints").array(),
  resources: jsonb("resources").array(),
  points: integer("points").default(0),
  completionRate: integer("completion_rate").default(0),
  averageRating: integer("average_rating").default(0),
  totalRatings: integer("total_ratings").default(0),
  featured: boolean("featured").default(false),
  isActive: boolean("is_active").default(true),
  authorId: varchar("author_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Lab Progress Tracking
export const labProgress = pgTable("lab_progress", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull(),
  labId: integer("lab_id").notNull(),
  status: text("status").notNull().default("not_started"), // not_started, in_progress, completed, failed
  attempts: integer("attempts").default(0),
  score: integer("score").default(0),
  timeSpent: integer("time_spent").default(0), // in seconds
  hints_used: integer("hints_used").default(0),
  completedAt: timestamp("completed_at"),
  lastAccessedAt: timestamp("last_accessed_at").defaultNow(),
  progress: jsonb("progress"), // checkpoints, flags found, etc
  createdAt: timestamp("created_at").defaultNow(),
});

// CTF Challenges System
export const ctfChallenges = pgTable("ctf_challenges", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  category: text("category").notNull(), // web, crypto, pwn, reverse, forensics, misc
  difficulty: text("difficulty").notNull(), // easy, medium, hard, insane
  tags: text("tags").array(),
  flag: text("flag").notNull(), // encrypted or hashed
  flagFormat: text("flag_format").default("CTF{...}"),
  points: integer("points").notNull(),
  solves: integer("solves").default(0),
  files: jsonb("files").array(), // downloadable files
  hints: jsonb("hints").array(),
  environment: jsonb("environment"), // deployment info
  writeupRequired: boolean("writeup_required").default(false),
  isActive: boolean("is_active").default(true),
  authorId: varchar("author_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// CTF Submissions
export const ctfSubmissions = pgTable("ctf_submissions", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull(),
  challengeId: integer("challenge_id").notNull(),
  submittedFlag: text("submitted_flag").notNull(),
  isCorrect: boolean("is_correct").notNull(),
  points: integer("points").default(0),
  solveTime: integer("solve_time"), // time to solve in seconds
  submittedAt: timestamp("submitted_at").defaultNow(),
});

// Certificates System
export const certificates = pgTable("certificates", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull(),
  type: text("type").notNull(), // course_completion, lab_mastery, ctf_champion, skill_badge
  title: text("title").notNull(),
  description: text("description"),
  category: text("category"), // web-security, network, forensics, etc
  criteria: jsonb("criteria"), // requirements met
  imageUrl: text("image_url"),
  certificateCode: text("certificate_code").unique().notNull(),
  verificationUrl: text("verification_url"),
  issueDate: timestamp("issue_date").defaultNow(),
  expiryDate: timestamp("expiry_date"),
  metadata: jsonb("metadata"), // additional data like score, rank, etc
  isRevoked: boolean("is_revoked").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Leaderboards
export const leaderboards = pgTable("leaderboards", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull(),
  category: text("category").notNull(), // overall, monthly, ctf, labs
  rank: integer("rank").notNull(),
  score: integer("score").notNull(),
  periodStart: timestamp("period_start"),
  periodEnd: timestamp("period_end"),
  metadata: jsonb("metadata"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Lab Reviews and Ratings
export const labReviews = pgTable("lab_reviews", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull(),
  labId: integer("lab_id").notNull(),
  rating: integer("rating").notNull(), // 1-5 stars
  review: text("review"),
  difficulty_rating: integer("difficulty_rating"), // actual vs expected
  helpful: boolean("helpful").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  firstName: true,
  lastName: true,
  bio: true,
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).pick({
  title: true,
  slug: true,
  excerpt: true,
  content: true,
  featuredImage: true,
  category: true,
  tags: true,
  seoTitle: true,
  seoDescription: true,
  seoKeywords: true,
});

export const insertGithubToolSchema = createInsertSchema(githubTools).pick({
  name: true,
  slug: true,
  description: true,
  category: true,
  difficulty: true,
  content: true,
  useCases: true,
  alternatives: true,
  bestPractices: true,
  officialUrl: true,
  githubUrl: true,
  documentation: true,
});

export const insertCommentSchema = createInsertSchema(comments).pick({
  postId: true,
  content: true,
  parentId: true,
});

export const insertLabSchema = createInsertSchema(labs).pick({
  title: true,
  slug: true,
  description: true,
  category: true,
  difficulty: true,
  tags: true,
  objectives: true,
  prerequisites: true,
  estimatedTime: true,
  maxAttempts: true,
  content: true,
  environment: true,
  solution: true,
  hints: true,
  resources: true,
  points: true,
});

export const insertCtfChallengeSchema = createInsertSchema(ctfChallenges).pick({
  title: true,
  slug: true,
  description: true,
  category: true,
  difficulty: true,
  tags: true,
  flag: true,
  flagFormat: true,
  points: true,
  files: true,
  hints: true,
  environment: true,
  writeupRequired: true,
});

export const insertCtfSubmissionSchema = createInsertSchema(ctfSubmissions).pick({
  challengeId: true,
  submittedFlag: true,
});

export const insertCertificateSchema = createInsertSchema(certificates).pick({
  type: true,
  title: true,
  description: true,
  category: true,
  criteria: true,
  imageUrl: true,
  certificateCode: true,
  verificationUrl: true,
  expiryDate: true,
  metadata: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type UpsertUser = typeof users.$inferInsert;

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;

export type GithubTool = typeof githubTools.$inferSelect;
export type InsertGithubTool = z.infer<typeof insertGithubToolSchema>;

export type Comment = typeof comments.$inferSelect;
export type InsertComment = z.infer<typeof insertCommentSchema>;

export type Lab = typeof labs.$inferSelect;
export type InsertLab = z.infer<typeof insertLabSchema>;
export type LabProgress = typeof labProgress.$inferSelect;

export type CtfChallenge = typeof ctfChallenges.$inferSelect;
export type InsertCtfChallenge = z.infer<typeof insertCtfChallengeSchema>;
export type CtfSubmission = typeof ctfSubmissions.$inferSelect;
export type InsertCtfSubmission = z.infer<typeof insertCtfSubmissionSchema>;

export type Certificate = typeof certificates.$inferSelect;
export type InsertCertificate = z.infer<typeof insertCertificateSchema>;

export type Leaderboard = typeof leaderboards.$inferSelect;
export type LabReview = typeof labReviews.$inferSelect;

export type Achievement = typeof achievements.$inferSelect;
export type UserActivity = typeof userActivity.$inferSelect;
export type SiteConfig = typeof siteConfig.$inferSelect;
export type SeoMetric = typeof seoMetrics.$inferSelect;
