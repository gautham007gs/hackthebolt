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

export type Achievement = typeof achievements.$inferSelect;
export type UserActivity = typeof userActivity.$inferSelect;
export type SiteConfig = typeof siteConfig.$inferSelect;
export type SeoMetric = typeof seoMetrics.$inferSelect;
