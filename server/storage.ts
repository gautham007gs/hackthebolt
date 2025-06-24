import { 
  users, 
  blogPosts, 
  githubTools, 
  siteConfig, 
  achievements, 
  userActivity,
  comments,
  seoMetrics,
  labs,
  labProgress,
  ctfChallenges,
  ctfSubmissions,
  certificates,
  leaderboards,
  labReviews,
  type User, 
  type UpsertUser,
  type BlogPost,
  type InsertBlogPost,
  type GithubTool,
  type InsertGithubTool,
  type Comment,
  type InsertComment,
  type Lab,
  type InsertLab,
  type LabProgress,
  type CtfChallenge,
  type InsertCtfChallenge,
  type CtfSubmission,
  type InsertCtfSubmission,
  type Certificate,
  type InsertCertificate,
  type Leaderboard,
  type LabReview,
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
  
  // Labs operations
  getAllLabs(category?: string, difficulty?: string): Promise<Lab[]>;
  getLab(id: number): Promise<Lab | undefined>;
  getLabBySlug(slug: string): Promise<Lab | undefined>;
  createLab(lab: InsertLab & { authorId: string }): Promise<Lab>;
  updateLab(id: number, lab: Partial<Lab>): Promise<Lab>;
  deleteLab(id: number): Promise<void>;
  
  // Lab progress tracking
  getLabProgress(userId: string, labId: number): Promise<LabProgress | undefined>;
  getUserLabProgress(userId: string): Promise<LabProgress[]>;
  updateLabProgress(userId: string, labId: number, progress: Partial<LabProgress>): Promise<LabProgress>;
  completeLabProgress(userId: string, labId: number, score: number, timeSpent: number): Promise<void>;
  
  // CTF operations
  getAllCtfChallenges(category?: string, difficulty?: string): Promise<CtfChallenge[]>;
  getCtfChallenge(id: number): Promise<CtfChallenge | undefined>;
  getCtfChallengeBySlug(slug: string): Promise<CtfChallenge | undefined>;
  createCtfChallenge(challenge: InsertCtfChallenge & { authorId: string }): Promise<CtfChallenge>;
  updateCtfChallenge(id: number, challenge: Partial<CtfChallenge>): Promise<CtfChallenge>;
  deleteCtfChallenge(id: number): Promise<void>;
  
  // CTF submissions
  submitCtfFlag(userId: string, challengeId: number, flag: string): Promise<{ correct: boolean; points: number; message: string }>;
  getCtfSubmissions(userId: string, challengeId?: number): Promise<CtfSubmission[]>;
  getCtfLeaderboard(challengeId?: number): Promise<Leaderboard[]>;
  
  // Certificates
  getUserCertificates(userId: string): Promise<Certificate[]>;
  createCertificate(certificate: InsertCertificate & { userId: string }): Promise<Certificate>;
  verifyCertificate(certificateCode: string): Promise<Certificate | undefined>;
  
  // Reviews and ratings
  createLabReview(userId: string, labId: number, rating: number, review?: string): Promise<LabReview>;
  getLabReviews(labId: number): Promise<LabReview[]>;
}

// Minimal storage implementation for migration compatibility
export class MemoryStorage implements IStorage {
  private nextId = 1;
  private users = new Map<string, User>();
  private blogPosts = new Map<number, BlogPost>();
  private githubTools = new Map<number, GithubTool>();
  private comments: Comment[] = [];
  private siteConfigs = new Map<string, SiteConfig>();
  private achievements = new Map<string, Achievement>();
  private userActivities: UserActivity[] = [];
  private seoMetrics = new Map<string, SeoMetric>();
  private labs: Lab[] = [];
  private labProgresses: LabProgress[] = [];
  private ctfChallenges: CtfChallenge[] = [];
  private ctfSubmissions: CtfSubmission[] = [];
  private certificates: Certificate[] = [];
  private leaderboards: Leaderboard[] = [];
  private labReviews: LabReview[] = [];

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
    return Array.from(this.achievements.values()).filter(achievement => achievement.userId === userId);
  }

  async addUserAchievement(achievement: Omit<Achievement, 'id' | 'unlockedAt'>): Promise<void> {
    const id = this.nextId++;
    const newAchievement: Achievement = {
      id,
      ...achievement,
      unlockedAt: new Date(),
    };
    this.achievements.set(`${achievement.userId}-${id}`, newAchievement);
  }

  // SEO metrics
  async updateSeoMetrics(url: string, data: Partial<SeoMetric>): Promise<void> {
    const now = new Date();
    const existing = this.seoMetrics.get(url);
    
    const seoMetric: SeoMetric = {
      id: existing?.id || this.nextId++,
      url,
      title: data.title || existing?.title || null,
      description: data.description || existing?.description || null,
      keywords: data.keywords || existing?.keywords || null,
      views: data.views || existing?.views || 0,
      clicks: data.clicks || existing?.clicks || 0,
      impressions: data.impressions || existing?.impressions || 0,
      position: data.position || existing?.position || null,
      createdAt: existing?.createdAt || now,
      lastCrawled: now,
    };
    
    this.seoMetrics.set(url, seoMetric);
  }

  async getSeoMetrics(url: string): Promise<SeoMetric | undefined> {
    return this.seoMetrics.get(url);
  }

  // Labs operations
  async getAllLabs(category?: string, difficulty?: string): Promise<Lab[]> {
    let filtered = this.labs.filter(lab => lab.isActive);
    if (category) filtered = filtered.filter(lab => lab.category === category);
    if (difficulty) filtered = filtered.filter(lab => lab.difficulty === difficulty);
    return filtered.sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }

  async getLab(id: number): Promise<Lab | undefined> {
    return this.labs.find(lab => lab.id === id);
  }

  async getLabBySlug(slug: string): Promise<Lab | undefined> {
    return this.labs.find(lab => lab.slug === slug);
  }

  async createLab(lab: InsertLab & { authorId: string }): Promise<Lab> {
    const now = new Date();
    const newLab: Lab = {
      id: this.nextId++,
      ...lab,
      completionRate: 0,
      averageRating: 0,
      totalRatings: 0,
      featured: false,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    };
    this.labs.push(newLab);
    return newLab;
  }

  async updateLab(id: number, lab: Partial<Lab>): Promise<Lab> {
    const index = this.labs.findIndex(l => l.id === id);
    if (index === -1) throw new Error('Lab not found');
    this.labs[index] = { ...this.labs[index], ...lab, updatedAt: new Date() };
    return this.labs[index];
  }

  async deleteLab(id: number): Promise<void> {
    const index = this.labs.findIndex(lab => lab.id === id);
    if (index !== -1) this.labs.splice(index, 1);
  }

  // Lab progress tracking
  async getLabProgress(userId: string, labId: number): Promise<LabProgress | undefined> {
    return this.labProgresses.find(p => p.userId === userId && p.labId === labId);
  }

  async getUserLabProgress(userId: string): Promise<LabProgress[]> {
    return this.labProgresses.filter(p => p.userId === userId);
  }

  async updateLabProgress(userId: string, labId: number, progress: Partial<LabProgress>): Promise<LabProgress> {
    let existing = this.labProgresses.find(p => p.userId === userId && p.labId === labId);
    
    if (!existing) {
      existing = {
        id: this.nextId++,
        userId,
        labId,
        status: 'not_started',
        attempts: 0,
        score: 0,
        timeSpent: 0,
        hints_used: 0,
        completedAt: null,
        lastAccessedAt: new Date(),
        progress: null,
        createdAt: new Date(),
      };
      this.labProgresses.push(existing);
    }

    Object.assign(existing, progress, { lastAccessedAt: new Date() });
    return existing;
  }

  async completeLabProgress(userId: string, labId: number, score: number, timeSpent: number): Promise<void> {
    await this.updateLabProgress(userId, labId, {
      status: 'completed',
      score,
      timeSpent,
      completedAt: new Date()
    });
  }

  // CTF operations
  async getAllCtfChallenges(category?: string, difficulty?: string): Promise<CtfChallenge[]> {
    let filtered = this.ctfChallenges.filter(challenge => challenge.isActive);
    if (category) filtered = filtered.filter(challenge => challenge.category === category);
    if (difficulty) filtered = filtered.filter(challenge => challenge.difficulty === difficulty);
    return filtered.sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }

  async getCtfChallenge(id: number): Promise<CtfChallenge | undefined> {
    return this.ctfChallenges.find(challenge => challenge.id === id);
  }

  async getCtfChallengeBySlug(slug: string): Promise<CtfChallenge | undefined> {
    return this.ctfChallenges.find(challenge => challenge.slug === slug);
  }

  async createCtfChallenge(challenge: InsertCtfChallenge & { authorId: string }): Promise<CtfChallenge> {
    const now = new Date();
    const newChallenge: CtfChallenge = {
      id: this.nextId++,
      ...challenge,
      solves: 0,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    };
    this.ctfChallenges.push(newChallenge);
    return newChallenge;
  }

  async updateCtfChallenge(id: number, challenge: Partial<CtfChallenge>): Promise<CtfChallenge> {
    const index = this.ctfChallenges.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Challenge not found');
    this.ctfChallenges[index] = { ...this.ctfChallenges[index], ...challenge, updatedAt: new Date() };
    return this.ctfChallenges[index];
  }

  async deleteCtfChallenge(id: number): Promise<void> {
    const index = this.ctfChallenges.findIndex(challenge => challenge.id === id);
    if (index !== -1) this.ctfChallenges.splice(index, 1);
  }

  // CTF submissions
  async submitCtfFlag(userId: string, challengeId: number, flag: string): Promise<{ correct: boolean; points: number; message: string }> {
    const challenge = await this.getCtfChallenge(challengeId);
    if (!challenge) throw new Error('Challenge not found');

    // Check if already solved
    const existingCorrect = this.ctfSubmissions.find(s => s.userId === userId && s.challengeId === challengeId && s.isCorrect);
    if (existingCorrect) {
      return { correct: false, points: 0, message: 'You have already solved this challenge!' };
    }

    const isCorrect = flag.trim() === challenge.flag;
    const points = isCorrect ? challenge.points : 0;

    const submission: CtfSubmission = {
      id: this.nextId++,
      userId,
      challengeId,
      submittedFlag: flag,
      isCorrect,
      points,
      solveTime: null,
      submittedAt: new Date(),
    };

    this.ctfSubmissions.push(submission);

    if (isCorrect) {
      // Update challenge solves count
      challenge.solves = (challenge.solves || 0) + 1;
      await this.updateUserPoints(userId, points);
    }

    return {
      correct: isCorrect,
      points,
      message: isCorrect ? 'Congratulations! Correct flag!' : 'Incorrect flag. Try again!'
    };
  }

  async getCtfSubmissions(userId: string, challengeId?: number): Promise<CtfSubmission[]> {
    let filtered = this.ctfSubmissions.filter(s => s.userId === userId);
    if (challengeId) filtered = filtered.filter(s => s.challengeId === challengeId);
    return filtered.sort((a, b) => (b.submittedAt?.getTime() || 0) - (a.submittedAt?.getTime() || 0));
  }

  async getCtfLeaderboard(challengeId?: number): Promise<Leaderboard[]> {
    return this.leaderboards.filter(l => challengeId ? l.metadata?.challengeId === challengeId : true)
      .sort((a, b) => a.rank - b.rank);
  }

  // Certificates
  async getUserCertificates(userId: string): Promise<Certificate[]> {
    return this.certificates.filter(cert => cert.userId === userId && !cert.isRevoked)
      .sort((a, b) => (b.issueDate?.getTime() || 0) - (a.issueDate?.getTime() || 0));
  }

  async createCertificate(certificate: InsertCertificate & { userId: string }): Promise<Certificate> {
    const now = new Date();
    const newCertificate: Certificate = {
      id: this.nextId++,
      ...certificate,
      issueDate: now,
      isRevoked: false,
      createdAt: now,
    };
    this.certificates.push(newCertificate);
    return newCertificate;
  }

  async verifyCertificate(certificateCode: string): Promise<Certificate | undefined> {
    return this.certificates.find(cert => cert.certificateCode === certificateCode && !cert.isRevoked);
  }

  // Reviews and ratings
  async createLabReview(userId: string, labId: number, rating: number, review?: string): Promise<LabReview> {
    const newReview: LabReview = {
      id: this.nextId++,
      userId,
      labId,
      rating,
      review: review || null,
      difficulty_rating: null,
      helpful: false,
      createdAt: new Date(),
    };
    this.labReviews.push(newReview);
    return newReview;
  }

  async getLabReviews(labId: number): Promise<LabReview[]> {
    return this.labReviews.filter(review => review.labId === labId)
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
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
    await db
      .update(users)
      .set({ role, updatedAt: new Date() })
      .where(eq(users.id, id));
  }

  async updateUserPoints(id: string, points: number): Promise<void> {
    await db
      .update(users)
      .set({ points, updatedAt: new Date() })
      .where(eq(users.id, id));
  }

  // Blog operations
  async getAllBlogPosts(status?: string): Promise<BlogPost[]> {
    if (status) {
      return await db.select().from(blogPosts).where(eq(blogPosts.status, status));
    }
    return await db.select().from(blogPosts);
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
    const [newPost] = await db
      .insert(blogPosts)
      .values(post)
      .returning();
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
    await db
      .update(blogPosts)
      .set({ status, updatedAt: new Date() })
      .where(eq(blogPosts.id, id));
  }

  async incrementBlogViews(id: number): Promise<void> {
    await db
      .update(blogPosts)
      .set({ 
        views: sql`${blogPosts.views} + 1`,
        updatedAt: new Date()
      })
      .where(eq(blogPosts.id, id));
  }

  // GitHub Tools operations
  async getAllGithubTools(): Promise<GithubTool[]> {
    return await db.select().from(githubTools);
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
    const [newTool] = await db
      .insert(githubTools)
      .values(tool)
      .returning();
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
    await db
      .update(githubTools)
      .set({ 
        views: sql`${githubTools.views} + 1`,
        updatedAt: new Date()
      })
      .where(eq(githubTools.id, id));
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
        set: {
          value,
          updatedBy,
          description,
          updatedAt: new Date(),
        },
      });
  }

  async getAllSiteConfig(): Promise<SiteConfig[]> {
    return await db.select().from(siteConfig);
  }

  // Comments
  async getCommentsByPost(postId: number): Promise<Comment[]> {
    return await db.select().from(comments).where(eq(comments.postId, postId));
  }

  async createComment(comment: InsertComment & { authorId: string }): Promise<Comment> {
    const [newComment] = await db
      .insert(comments)
      .values(comment)
      .returning();
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
    return await db.select().from(achievements).where(eq(achievements.userId, userId));
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
        set: {
          ...data,
          lastCrawled: new Date(),
        },
      });
  }

  async getSeoMetrics(url: string): Promise<SeoMetric | undefined> {
    const [metrics] = await db.select().from(seoMetrics).where(eq(seoMetrics.url, url));
    return metrics || undefined;
  }

  // Labs operations
  async getAllLabs(category?: string, difficulty?: string): Promise<Lab[]> {
    let query = db.select().from(labs);
    
    if (category) {
      query = query.where(eq(labs.category, category));
    }
    if (difficulty) {
      query = query.where(eq(labs.difficulty, difficulty));
    }
    
    return await query;
  }

  async getLab(id: number): Promise<Lab | undefined> {
    const [lab] = await db.select().from(labs).where(eq(labs.id, id));
    return lab || undefined;
  }

  async getLabBySlug(slug: string): Promise<Lab | undefined> {
    const [lab] = await db.select().from(labs).where(eq(labs.slug, slug));
    return lab || undefined;
  }

  async createLab(lab: InsertLab & { authorId: string }): Promise<Lab> {
    const [newLab] = await db
      .insert(labs)
      .values(lab)
      .returning();
    return newLab;
  }

  async updateLab(id: number, lab: Partial<Lab>): Promise<Lab> {
    const [updatedLab] = await db
      .update(labs)
      .set({ ...lab, updatedAt: new Date() })
      .where(eq(labs.id, id))
      .returning();
    return updatedLab;
  }

  async deleteLab(id: number): Promise<void> {
    await db.delete(labs).where(eq(labs.id, id));
  }

  // Lab progress tracking
  async getLabProgress(userId: string, labId: number): Promise<LabProgress | undefined> {
    const [progress] = await db
      .select()
      .from(labProgress)
      .where(and(eq(labProgress.userId, userId), eq(labProgress.labId, labId)));
    return progress || undefined;
  }

  async getUserLabProgress(userId: string): Promise<LabProgress[]> {
    return await db.select().from(labProgress).where(eq(labProgress.userId, userId));
  }

  async updateLabProgress(userId: string, labId: number, progress: Partial<LabProgress>): Promise<LabProgress> {
    const [updatedProgress] = await db
      .update(labProgress)
      .set({ ...progress, updatedAt: new Date() })
      .where(and(eq(labProgress.userId, userId), eq(labProgress.labId, labId)))
      .returning();
    return updatedProgress;
  }

  async completeLabProgress(userId: string, labId: number, score: number, timeSpent: number): Promise<void> {
    await db
      .insert(labProgress)
      .values({
        userId,
        labId,
        score,
        timeSpent,
        completedAt: new Date(),
        status: 'completed',
      })
      .onConflictDoUpdate({
        target: [labProgress.userId, labProgress.labId],
        set: {
          score,
          timeSpent,
          completedAt: new Date(),
          status: 'completed',
          updatedAt: new Date(),
        },
      });
  }

  // CTF operations
  async getAllCtfChallenges(category?: string, difficulty?: string): Promise<CtfChallenge[]> {
    let query = db.select().from(ctfChallenges);
    
    if (category) {
      query = query.where(eq(ctfChallenges.category, category));
    }
    if (difficulty) {
      query = query.where(eq(ctfChallenges.difficulty, difficulty));
    }
    
    return await query;
  }

  async getCtfChallenge(id: number): Promise<CtfChallenge | undefined> {
    const [challenge] = await db.select().from(ctfChallenges).where(eq(ctfChallenges.id, id));
    return challenge || undefined;
  }

  async getCtfChallengeBySlug(slug: string): Promise<CtfChallenge | undefined> {
    const [challenge] = await db.select().from(ctfChallenges).where(eq(ctfChallenges.slug, slug));
    return challenge || undefined;
  }

  async createCtfChallenge(challenge: InsertCtfChallenge & { authorId: string }): Promise<CtfChallenge> {
    const [newChallenge] = await db
      .insert(ctfChallenges)
      .values(challenge)
      .returning();
    return newChallenge;
  }

  async updateCtfChallenge(id: number, challenge: Partial<CtfChallenge>): Promise<CtfChallenge> {
    const [updatedChallenge] = await db
      .update(ctfChallenges)
      .set({ ...challenge, updatedAt: new Date() })
      .where(eq(ctfChallenges.id, id))
      .returning();
    return updatedChallenge;
  }

  async deleteCtfChallenge(id: number): Promise<void> {
    await db.delete(ctfChallenges).where(eq(ctfChallenges.id, id));
  }

  // CTF submissions
  async submitCtfFlag(userId: string, challengeId: number, flag: string): Promise<{ correct: boolean; points: number; message: string }> {
    const challenge = await this.getCtfChallenge(challengeId);
    if (!challenge) {
      return { correct: false, points: 0, message: 'Challenge not found' };
    }

    const correct = flag === challenge.flag;
    
    await db.insert(ctfSubmissions).values({
      userId,
      challengeId,
      flag,
      correct,
      points: correct ? challenge.points : 0,
    });

    if (correct) {
      // Update user points
      await this.updateUserPoints(userId, (await this.getUser(userId))?.points || 0 + challenge.points);
    }

    return {
      correct,
      points: correct ? challenge.points : 0,
      message: correct ? 'Congratulations! Flag is correct!' : 'Incorrect flag. Try again!'
    };
  }

  async getCtfSubmissions(userId: string, challengeId?: number): Promise<CtfSubmission[]> {
    let query = db.select().from(ctfSubmissions).where(eq(ctfSubmissions.userId, userId));
    
    if (challengeId) {
      query = query.where(eq(ctfSubmissions.challengeId, challengeId));
    }
    
    return await query;
  }

  async getCtfLeaderboard(challengeId?: number): Promise<Leaderboard[]> {
    return await db.select().from(leaderboards);
  }

  // Certificates
  async getUserCertificates(userId: string): Promise<Certificate[]> {
    return await db.select().from(certificates).where(eq(certificates.userId, userId));
  }

  async createCertificate(certificate: InsertCertificate & { userId: string }): Promise<Certificate> {
    const [newCertificate] = await db
      .insert(certificates)
      .values(certificate)
      .returning();
    return newCertificate;
  }

  async verifyCertificate(certificateCode: string): Promise<Certificate | undefined> {
    const [certificate] = await db.select().from(certificates).where(eq(certificates.certificateCode, certificateCode));
    return certificate || undefined;
  }

  // Reviews and ratings
  async createLabReview(userId: string, labId: number, rating: number, review?: string): Promise<LabReview> {
    const [newReview] = await db
      .insert(labReviews)
      .values({ userId, labId, rating, review })
      .returning();
    return newReview;
  }

  async getLabReviews(labId: number): Promise<LabReview[]> {
    return await db.select().from(labReviews).where(eq(labReviews.labId, labId));
  }
}

// Use database storage now that we have a database
console.log('Using database storage with PostgreSQL');
export const storage: IStorage = new DatabaseStorage();
