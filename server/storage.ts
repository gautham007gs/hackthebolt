import { 
  users, 
  blogPosts, 
  githubTools, 
  siteConfig, 
  achievements, 
  userActivity,
  comments,
  seoMetrics,
  type User, 
  type UpsertUser,
  type BlogPost,
  type InsertBlogPost,
  type GithubTool,
  type InsertGithubTool,
  type Comment,
  type InsertComment,
  type Achievement,
  type SiteConfig,
  type UserActivity,
  type SeoMetric
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, like, sql } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  updateUserRole(id: string, role: string): Promise<void>;
  updateUserPoints(id: string, points: number): Promise<void>;
  
  // Blog operations
  getAllBlogPosts(status?: string): Promise<BlogPost[]>;
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost & { authorId: string }): Promise<BlogPost>;
  updateBlogPost(id: number, post: Partial<BlogPost>): Promise<BlogPost>;
  deleteBlogPost(id: number): Promise<void>;
  updateBlogPostStatus(id: number, status: string): Promise<void>;
  incrementBlogViews(id: number): Promise<void>;
  
  // GitHub Tools operations
  getAllGithubTools(): Promise<GithubTool[]>;
  getGithubTool(id: number): Promise<GithubTool | undefined>;
  getGithubToolBySlug(slug: string): Promise<GithubTool | undefined>;
  createGithubTool(tool: InsertGithubTool & { authorId: string }): Promise<GithubTool>;
  updateGithubTool(id: number, tool: Partial<GithubTool>): Promise<GithubTool>;
  deleteGithubTool(id: number): Promise<void>;
  incrementToolViews(id: number): Promise<void>;
  
  // Site configuration
  getSiteConfig(key: string): Promise<SiteConfig | undefined>;
  setSiteConfig(key: string, value: string, updatedBy: string, description?: string): Promise<void>;
  getAllSiteConfig(): Promise<SiteConfig[]>;
  
  // Comments
  getCommentsByPost(postId: number): Promise<Comment[]>;
  createComment(comment: InsertComment & { authorId: string }): Promise<Comment>;
  deleteComment(id: number): Promise<void>;
  
  // Analytics and tracking
  trackUserActivity(activity: Omit<UserActivity, 'id' | 'createdAt'>): Promise<void>;
  getUserAchievements(userId: string): Promise<Achievement[]>;
  addUserAchievement(achievement: Omit<Achievement, 'id' | 'unlockedAt'>): Promise<void>;
  
  // SEO metrics
  updateSeoMetrics(url: string, data: Partial<SeoMetric>): Promise<void>;
  getSeoMetrics(url: string): Promise<SeoMetric | undefined>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async updateUserRole(id: string, role: string): Promise<void> {
    await db.update(users).set({ role, updatedAt: new Date() }).where(eq(users.id, id));
  }

  async updateUserPoints(id: string, points: number): Promise<void> {
    await db.update(users).set({ points, updatedAt: new Date() }).where(eq(users.id, id));
  }

  // Blog operations
  async getAllBlogPosts(status?: string): Promise<BlogPost[]> {
    const query = db.select().from(blogPosts);
    if (status) {
      return await query.where(eq(blogPosts.status, status)).orderBy(desc(blogPosts.createdAt));
    }
    return await query.orderBy(desc(blogPosts.createdAt));
  }

  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post || undefined;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post || undefined;
  }

  async createBlogPost(post: InsertBlogPost & { authorId: string }): Promise<BlogPost> {
    const [newPost] = await db.insert(blogPosts).values(post).returning();
    return newPost;
  }

  async updateBlogPost(id: number, post: Partial<BlogPost>): Promise<BlogPost> {
    const [updatedPost] = await db
      .update(blogPosts)
      .set({ ...post, updatedAt: new Date() })
      .where(eq(blogPosts.id, id))
      .returning();
    return updatedPost;
  }

  async deleteBlogPost(id: number): Promise<void> {
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
  }

  async updateBlogPostStatus(id: number, status: string): Promise<void> {
    await db.update(blogPosts).set({ 
      status, 
      updatedAt: new Date(),
      publishedAt: status === 'published' ? new Date() : null
    }).where(eq(blogPosts.id, id));
  }

  async incrementBlogViews(id: number): Promise<void> {
    await db.update(blogPosts).set({ 
      views: sql`${blogPosts.views} + 1` 
    }).where(eq(blogPosts.id, id));
  }

  // GitHub Tools operations
  async getAllGithubTools(): Promise<GithubTool[]> {
    return await db.select().from(githubTools).orderBy(desc(githubTools.createdAt));
  }

  async getGithubTool(id: number): Promise<GithubTool | undefined> {
    const [tool] = await db.select().from(githubTools).where(eq(githubTools.id, id));
    return tool || undefined;
  }

  async getGithubToolBySlug(slug: string): Promise<GithubTool | undefined> {
    const [tool] = await db.select().from(githubTools).where(eq(githubTools.slug, slug));
    return tool || undefined;
  }

  async createGithubTool(tool: InsertGithubTool & { authorId: string }): Promise<GithubTool> {
    const [newTool] = await db.insert(githubTools).values(tool).returning();
    return newTool;
  }

  async updateGithubTool(id: number, tool: Partial<GithubTool>): Promise<GithubTool> {
    const [updatedTool] = await db
      .update(githubTools)
      .set({ ...tool, updatedAt: new Date() })
      .where(eq(githubTools.id, id))
      .returning();
    return updatedTool;
  }

  async deleteGithubTool(id: number): Promise<void> {
    await db.delete(githubTools).where(eq(githubTools.id, id));
  }

  async incrementToolViews(id: number): Promise<void> {
    await db.update(githubTools).set({ 
      views: sql`${githubTools.views} + 1` 
    }).where(eq(githubTools.id, id));
  }

  // Site configuration
  async getSiteConfig(key: string): Promise<SiteConfig | undefined> {
    const [config] = await db.select().from(siteConfig).where(eq(siteConfig.key, key));
    return config || undefined;
  }

  async setSiteConfig(key: string, value: string, updatedBy: string, description?: string): Promise<void> {
    await db
      .insert(siteConfig)
      .values({ key, value, updatedBy, description })
      .onConflictDoUpdate({
        target: siteConfig.key,
        set: { value, updatedBy, updatedAt: new Date(), description },
      });
  }

  async getAllSiteConfig(): Promise<SiteConfig[]> {
    return await db.select().from(siteConfig).orderBy(siteConfig.key);
  }

  // Comments
  async getCommentsByPost(postId: number): Promise<Comment[]> {
    return await db.select().from(comments).where(eq(comments.postId, postId)).orderBy(desc(comments.createdAt));
  }

  async createComment(comment: InsertComment & { authorId: string }): Promise<Comment> {
    const [newComment] = await db.insert(comments).values(comment).returning();
    return newComment;
  }

  async deleteComment(id: number): Promise<void> {
    await db.delete(comments).where(eq(comments.id, id));
  }

  // Analytics and tracking
  async trackUserActivity(activity: Omit<UserActivity, 'id' | 'createdAt'>): Promise<void> {
    await db.insert(userActivity).values(activity);
  }

  async getUserAchievements(userId: string): Promise<Achievement[]> {
    return await db.select().from(achievements).where(eq(achievements.userId, userId)).orderBy(desc(achievements.unlockedAt));
  }

  async addUserAchievement(achievement: Omit<Achievement, 'id' | 'unlockedAt'>): Promise<void> {
    await db.insert(achievements).values(achievement);
  }

  // SEO metrics
  async updateSeoMetrics(url: string, data: Partial<SeoMetric>): Promise<void> {
    await db
      .insert(seoMetrics)
      .values({ url, ...data })
      .onConflictDoUpdate({
        target: seoMetrics.url,
        set: { ...data, createdAt: new Date() },
      });
  }

  async getSeoMetrics(url: string): Promise<SeoMetric | undefined> {
    const [metrics] = await db.select().from(seoMetrics).where(eq(seoMetrics.url, url));
    return metrics || undefined;
  }
}

export const storage = new DatabaseStorage();
