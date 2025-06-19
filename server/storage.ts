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

// Minimal storage implementation for migration compatibility
export class MemoryStorage implements IStorage {
  private nextId = 1;

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    return undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return undefined;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const now = new Date();
    const user: User = {
      id: userData.id || `user_${this.nextId++}`,
      username: userData.username || null,
      email: userData.email || null,
      firstName: userData.firstName || null,
      lastName: userData.lastName || null,
      profileImageUrl: userData.profileImageUrl || null,
      bio: userData.bio || null,
      role: userData.role || 'user',
      isEmailVerified: userData.isEmailVerified || false,
      points: userData.points || 0,
      level: userData.level || 1,
      isActive: userData.isActive !== false,
      lastLoginAt: userData.lastLoginAt || null,
      createdAt: userData.createdAt || now,
      updatedAt: now,
    };
    this.users.set(user.id, user);
    return user;
  }

  async updateUserRole(id: string, role: string): Promise<void> {
    const user = this.users.get(id);
    if (user) {
      user.role = role;
      user.updatedAt = new Date();
      this.users.set(id, user);
    }
  }

  async updateUserPoints(id: string, points: number): Promise<void> {
    const user = this.users.get(id);
    if (user) {
      user.points = points;
      user.updatedAt = new Date();
      this.users.set(id, user);
    }
  }

  // Blog operations
  async getAllBlogPosts(status?: string): Promise<BlogPost[]> {
    const posts = Array.from(this.blogPosts.values());
    if (status) {
      return posts.filter(post => post.status === status).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }
    return posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    for (const post of this.blogPosts.values()) {
      if (post.slug === slug) return post;
    }
    return undefined;
  }

  async createBlogPost(post: InsertBlogPost & { authorId: string }): Promise<BlogPost> {
    const now = new Date();
    const blogPost: BlogPost = {
      id: this.nextId++,
      title: post.title,
      slug: post.slug,
      content: post.content,
      excerpt: post.excerpt || '',
      authorId: post.authorId,
      status: post.status || 'draft',
      tags: post.tags || [],
      category: post.category || '',
      featuredImage: post.featuredImage || null,
      seoTitle: post.seoTitle || null,
      seoDescription: post.seoDescription || null,
      views: 0,
      likes: 0,
      createdAt: now,
      updatedAt: now,
      publishedAt: post.status === 'published' ? now : null,
    };
    this.blogPosts.set(blogPost.id, blogPost);
    return blogPost;
  }

  async updateBlogPost(id: number, post: Partial<BlogPost>): Promise<BlogPost> {
    const existing = this.blogPosts.get(id);
    if (!existing) throw new Error('Blog post not found');
    
    const updated = { ...existing, ...post, updatedAt: new Date() };
    this.blogPosts.set(id, updated);
    return updated;
  }

  async deleteBlogPost(id: number): Promise<void> {
    this.blogPosts.delete(id);
  }

  async updateBlogPostStatus(id: number, status: string): Promise<void> {
    const post = this.blogPosts.get(id);
    if (post) {
      post.status = status;
      post.updatedAt = new Date();
      if (status === 'published' && !post.publishedAt) {
        post.publishedAt = new Date();
      }
      this.blogPosts.set(id, post);
    }
  }

  async incrementBlogViews(id: number): Promise<void> {
    const post = this.blogPosts.get(id);
    if (post) {
      post.views++;
      this.blogPosts.set(id, post);
    }
  }

  // GitHub Tools operations
  async getAllGithubTools(): Promise<GithubTool[]> {
    return Array.from(this.githubTools.values()).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getGithubTool(id: number): Promise<GithubTool | undefined> {
    return this.githubTools.get(id);
  }

  async getGithubToolBySlug(slug: string): Promise<GithubTool | undefined> {
    for (const tool of this.githubTools.values()) {
      if (tool.slug === slug) return tool;
    }
    return undefined;
  }

  async createGithubTool(tool: InsertGithubTool & { authorId: string }): Promise<GithubTool> {
    const now = new Date();
    const githubTool: GithubTool = {
      id: this.nextId++,
      name: tool.name,
      slug: tool.slug,
      description: tool.description,
      repository: tool.repository,
      authorId: tool.authorId,
      category: tool.category || '',
      tags: tool.tags || [],
      difficulty: tool.difficulty || 'beginner',
      language: tool.language || '',
      stars: tool.stars || 0,
      forks: tool.forks || 0,
      lastUpdated: tool.lastUpdated || now,
      documentation: tool.documentation || '',
      installCommand: tool.installCommand || '',
      usageExample: tool.usageExample || '',
      views: 0,
      likes: 0,
      createdAt: now,
      updatedAt: now,
    };
    this.githubTools.set(githubTool.id, githubTool);
    return githubTool;
  }

  async updateGithubTool(id: number, tool: Partial<GithubTool>): Promise<GithubTool> {
    const existing = this.githubTools.get(id);
    if (!existing) throw new Error('GitHub tool not found');
    
    const updated = { ...existing, ...tool, updatedAt: new Date() };
    this.githubTools.set(id, updated);
    return updated;
  }

  async deleteGithubTool(id: number): Promise<void> {
    this.githubTools.delete(id);
  }

  async incrementToolViews(id: number): Promise<void> {
    const tool = this.githubTools.get(id);
    if (tool) {
      tool.views++;
      this.githubTools.set(id, tool);
    }
  }

  // Site configuration
  async getSiteConfig(key: string): Promise<SiteConfig | undefined> {
    return this.siteConfigs.get(key);
  }

  async setSiteConfig(key: string, value: string, updatedBy: string, description?: string): Promise<void> {
    const now = new Date();
    const config: SiteConfig = {
      id: this.nextId++,
      key,
      value,
      description: description || '',
      updatedBy,
      createdAt: now,
      updatedAt: now,
    };
    this.siteConfigs.set(key, config);
  }

  async getAllSiteConfig(): Promise<SiteConfig[]> {
    return Array.from(this.siteConfigs.values());
  }

  // Comments
  async getCommentsByPost(postId: number): Promise<Comment[]> {
    return Array.from(this.comments.values())
      .filter(comment => comment.postId === postId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  async createComment(comment: InsertComment & { authorId: string }): Promise<Comment> {
    const now = new Date();
    const newComment: Comment = {
      id: this.nextId++,
      content: comment.content,
      authorId: comment.authorId,
      postId: comment.postId,
      postType: comment.postType,
      parentId: comment.parentId || null,
      likes: 0,
      createdAt: now,
      updatedAt: now,
    };
    this.comments.set(newComment.id, newComment);
    return newComment;
  }

  async deleteComment(id: number): Promise<void> {
    this.comments.delete(id);
  }

  // Analytics and tracking
  async trackUserActivity(activity: Omit<UserActivity, 'id' | 'createdAt'>): Promise<void> {
    const userActivity: UserActivity = {
      id: this.nextId++,
      ...activity,
      createdAt: new Date(),
    };
    this.userActivities.push(userActivity);
  }

  async getUserAchievements(userId: string): Promise<Achievement[]> {
    return this.achievements.get(userId) || [];
  }

  async addUserAchievement(achievement: Omit<Achievement, 'id' | 'unlockedAt'>): Promise<void> {
    const newAchievement: Achievement = {
      id: this.nextId++,
      ...achievement,
      unlockedAt: new Date(),
    };
    
    const userAchievements = this.achievements.get(achievement.userId) || [];
    userAchievements.push(newAchievement);
    this.achievements.set(achievement.userId, userAchievements);
  }

  // SEO metrics
  async updateSeoMetrics(url: string, data: Partial<SeoMetric>): Promise<void> {
    const now = new Date();
    const existing = this.seoMetrics.get(url);
    
    const seoMetric: SeoMetric = {
      id: existing?.id || this.nextId++,
      url,
      title: data.title || existing?.title || '',
      description: data.description || existing?.description || '',
      keywords: data.keywords || existing?.keywords || '',
      ogImage: data.ogImage || existing?.ogImage || null,
      views: data.views || existing?.views || 0,
      clicks: data.clicks || existing?.clicks || 0,
      impressions: data.impressions || existing?.impressions || 0,
      avgPosition: data.avgPosition || existing?.avgPosition || 0,
      createdAt: existing?.createdAt || now,
      updatedAt: now,
    };
    
    this.seoMetrics.set(url, seoMetric);
  }

  async getSeoMetrics(url: string): Promise<SeoMetric | undefined> {
    return this.seoMetrics.get(url);
  }
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

// Use memory storage during migration, database storage can be enabled later
console.log('Using in-memory storage for migration compatibility');
export const storage: IStorage = new MemoryStorage();
