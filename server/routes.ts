import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBlogPostSchema, insertGithubToolSchema, insertCommentSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Blog Posts API
  app.get('/api/posts', async (req, res) => {
    try {
      const status = req.query.status as string;
      const posts = await storage.getAllBlogPosts(status);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch posts' });
    }
  });

  app.get('/api/posts/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const post = await storage.getBlogPost(id);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      await storage.incrementBlogViews(id);
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch post' });
    }
  });

  app.get('/api/posts/slug/:slug', async (req, res) => {
    try {
      const post = await storage.getBlogPostBySlug(req.params.slug);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      await storage.incrementBlogViews(post.id);
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch post' });
    }
  });

  app.post('/api/posts', async (req, res) => {
    try {
      const postData = insertBlogPostSchema.parse(req.body);
      const authorId = req.body.authorId || 'anonymous'; // In real app, get from auth
      const post = await storage.createBlogPost({ ...postData, authorId });
      res.status(201).json(post);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'Invalid post data', details: error.errors });
      }
      res.status(500).json({ error: 'Failed to create post' });
    }
  });

  app.put('/api/posts/:id/status', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      await storage.updateBlogPostStatus(id, status);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update post status' });
    }
  });

  // GitHub Tools API
  app.get('/api/github-tools', async (req, res) => {
    try {
      const tools = await storage.getAllGithubTools();
      res.json(tools);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch GitHub tools' });
    }
  });

  app.get('/api/github-tools/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const tool = await storage.getGithubTool(id);
      if (!tool) {
        return res.status(404).json({ error: 'Tool not found' });
      }
      await storage.incrementToolViews(id);
      res.json(tool);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch tool' });
    }
  });

  app.get('/api/github-tools/slug/:slug', async (req, res) => {
    try {
      const tool = await storage.getGithubToolBySlug(req.params.slug);
      if (!tool) {
        return res.status(404).json({ error: 'Tool not found' });
      }
      await storage.incrementToolViews(tool.id);
      res.json(tool);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch tool' });
    }
  });

  // Comments API
  app.get('/api/posts/:postId/comments', async (req, res) => {
    try {
      const postId = parseInt(req.params.postId);
      const comments = await storage.getCommentsByPost(postId);
      res.json(comments);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch comments' });
    }
  });

  app.post('/api/posts/:postId/comments', async (req, res) => {
    try {
      const postId = parseInt(req.params.postId);
      const commentData = insertCommentSchema.parse({ ...req.body, postId });
      const authorId = req.body.authorId || 'anonymous'; // In real app, get from auth
      const comment = await storage.createComment({ ...commentData, authorId });
      res.status(201).json(comment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'Invalid comment data', details: error.errors });
      }
      res.status(500).json({ error: 'Failed to create comment' });
    }
  });

  // Admin API
  app.post('/api/admin/maintenance', async (req, res) => {
    try {
      const { enabled } = req.body;
      const updatedBy = 'admin'; // In real app, get from auth
      await storage.setSiteConfig('maintenance_mode', enabled.toString(), updatedBy, 'Site maintenance mode');
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update maintenance mode' });
    }
  });

  app.get('/api/admin/config', async (req, res) => {
    try {
      const config = await storage.getAllSiteConfig();
      res.json(config);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch site config' });
    }
  });

  // SEO Analytics API
  app.post('/api/seo/track', async (req, res) => {
    try {
      const { url, title, description, keywords, referrer, userAgent } = req.body;
      await storage.updateSeoMetrics(url, {
        title,
        description,
        keywords,
        views: 1,
        lastCrawled: new Date()
      });

      // Track user activity
      await storage.trackUserActivity({
        userId: null,
        action: 'page_view',
        resourceType: 'page',
        resourceId: url,
        metadata: { referrer, userAgent },
        ipAddress: req.ip,
        userAgent
      });

      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to track SEO metrics' });
    }
  });

  app.get('/api/seo/metrics', async (req, res) => {
    try {
      const { url } = req.query;
      if (!url || typeof url !== 'string') {
        return res.status(400).json({ error: 'URL parameter required' });
      }
      const metrics = await storage.getSeoMetrics(url);
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch SEO metrics' });
    }
  });

  // User Achievements API
  app.get('/api/users/:userId/achievements', async (req, res) => {
    try {
      const userId = req.params.userId;
      const achievements = await storage.getUserAchievements(userId);
      res.json(achievements);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch achievements' });
    }
  });

  app.post('/api/users/:userId/achievements', async (req, res) => {
    try {
      const userId = req.params.userId;
      const { type, title, description, icon, points } = req.body;
      await storage.addUserAchievement({
        userId,
        type,
        title,
        description,
        icon,
        points
      });
      res.status(201).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to add achievement' });
    }
  });

  // Search API
  app.get('/api/search', async (req, res) => {
    try {
      const { q } = req.query;
      if (!q || typeof q !== 'string') {
        return res.status(400).json({ error: 'Query parameter required' });
      }

      // Search across posts and tools
      const posts = await storage.getAllBlogPosts('published');
      const tools = await storage.getAllGithubTools();

      const searchResults = [
        ...posts.filter(post => 
          post.title.toLowerCase().includes(q.toLowerCase()) ||
          post.content.toLowerCase().includes(q.toLowerCase()) ||
          post.tags?.some(tag => tag.toLowerCase().includes(q.toLowerCase()))
        ).map(post => ({
          id: post.id,
          title: post.title,
          type: 'blog',
          description: post.excerpt || post.content.substring(0, 200),
          url: `/blog/${post.slug}`,
          category: post.category
        })),
        ...tools.filter(tool =>
          tool.name.toLowerCase().includes(q.toLowerCase()) ||
          tool.description.toLowerCase().includes(q.toLowerCase()) ||
          tool.category.toLowerCase().includes(q.toLowerCase())
        ).map(tool => ({
          id: tool.id,
          title: tool.name,
          type: 'tool',
          description: tool.description,
          url: `/github-tools/${tool.slug}`,
          category: tool.category
        }))
      ];

      res.json(searchResults);
    } catch (error) {
      res.status(500).json({ error: 'Search failed' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
