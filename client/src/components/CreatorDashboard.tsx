import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus,
  FileText,
  Eye,
  Edit,
  Trash2,
  TrendingUp,
  Users,
  Heart,
  BarChart3,
  Calendar,
  Clock,
  Globe,
  Draft,
  CheckCircle,
  XCircle,
  Filter,
  Search,
  MoreHorizontal,
  Copy,
  Share2
} from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import CreatorBlogEditor from './CreatorBlogEditor';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  authorId: string;
  category: string;
  tags: string[];
  status: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  views: number;
  likes: number;
  featured: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

const statusColors = {
  published: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
  draft: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
  pending: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
  rejected: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
};

export default function CreatorDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [editingPost, setEditingPost] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch user's blog posts
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['/api/creator/posts'],
    queryFn: () => apiRequest('/api/creator/posts')
  });

  // Fetch analytics
  const { data: analytics = {} } = useQuery({
    queryKey: ['/api/creator/analytics'],
    queryFn: () => apiRequest('/api/creator/analytics')
  });

  // Delete post mutation
  const deletePostMutation = useMutation({
    mutationFn: (postId: number) => apiRequest(`/api/blog/${postId}`, { method: 'DELETE' }),
    onSuccess: () => {
      toast({ title: "Post deleted successfully" });
      queryClient.invalidateQueries({ queryKey: ['/api/creator/posts'] });
    }
  });

  // Duplicate post mutation
  const duplicatePostMutation = useMutation({
    mutationFn: (post: BlogPost) => 
      apiRequest('/api/blog', { 
        method: 'POST', 
        body: JSON.stringify({
          ...post,
          id: undefined,
          title: `${post.title} (Copy)`,
          slug: `${post.slug}-copy`,
          status: 'draft',
          publishedAt: null
        })
      }),
    onSuccess: () => {
      toast({ title: "Post duplicated successfully" });
      queryClient.invalidateQueries({ queryKey: ['/api/creator/posts'] });
    }
  });

  const filteredPosts = posts.filter((post: BlogPost) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published':
        return <Globe className="w-3 h-3" />;
      case 'draft':
        return <Draft className="w-3 h-3" />;
      case 'pending':
        return <Clock className="w-3 h-3" />;
      case 'rejected':
        return <XCircle className="w-3 h-3" />;
      default:
        return <FileText className="w-3 h-3" />;
    }
  };

  if (editingPost !== null) {
    return <CreatorBlogEditor postId={editingPost} />;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Creator Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your content and track performance
          </p>
        </div>
        <Button onClick={() => setEditingPost(0)}>
          <Plus className="w-4 h-4 mr-2" />
          New Post
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Analytics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Posts</p>
                    <p className="text-3xl font-bold">{posts.length}</p>
                  </div>
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
                <div className="flex items-center mt-2 text-sm">
                  <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                  <span className="text-green-600">+12%</span>
                  <span className="text-gray-600 dark:text-gray-400 ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Views</p>
                    <p className="text-3xl font-bold">{analytics.totalViews || 0}</p>
                  </div>
                  <Eye className="w-8 h-8 text-green-600" />
                </div>
                <div className="flex items-center mt-2 text-sm">
                  <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                  <span className="text-green-600">+8%</span>
                  <span className="text-gray-600 dark:text-gray-400 ml-1">from last week</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Likes</p>
                    <p className="text-3xl font-bold">{analytics.totalLikes || 0}</p>
                  </div>
                  <Heart className="w-8 h-8 text-red-600" />
                </div>
                <div className="flex items-center mt-2 text-sm">
                  <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                  <span className="text-green-600">+15%</span>
                  <span className="text-gray-600 dark:text-gray-400 ml-1">engagement up</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Published</p>
                    <p className="text-3xl font-bold">
                      {posts.filter((p: BlogPost) => p.status === 'published').length}
                    </p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-purple-600" />
                </div>
                <div className="flex items-center mt-2 text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    {posts.filter((p: BlogPost) => p.status === 'draft').length} drafts remaining
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Posts */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Posts</CardTitle>
              <CardDescription>Your latest blog posts and their performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {posts.slice(0, 5).map((post: BlogPost) => (
                  <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      {post.featuredImage && (
                        <img
                          src={post.featuredImage}
                          alt={post.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      )}
                      <div>
                        <h3 className="font-semibold">{post.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge className={statusColors[post.status as keyof typeof statusColors]}>
                            {getStatusIcon(post.status)}
                            <span className="ml-1 capitalize">{post.status}</span>
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {new Date(post.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {post.views}
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          {post.likes}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="posts" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search posts..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">All Status</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="pending">Pending</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-t-lg"></div>
                  <CardContent className="pt-4">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  </CardContent>
                </Card>
              ))
            ) : (
              filteredPosts.map((post: BlogPost) => (
                <Card key={post.id} className="group hover:shadow-lg transition-all duration-300">
                  {post.featuredImage && (
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge className={statusColors[post.status as keyof typeof statusColors]}>
                          {getStatusIcon(post.status)}
                          <span className="ml-1 capitalize">{post.status}</span>
                        </Badge>
                      </div>
                    </div>
                  )}
                  <CardContent className="pt-4">
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-1">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {post.views}
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            {post.likes}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {post.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{post.tags.length - 3}
                          </Badge>
                        )}
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingPost(post.id)}
                          className="flex-1"
                        >
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => duplicatePostMutation.mutate(post)}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deletePostMutation.mutate(post.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Total Views</span>
                    <span className="font-semibold">{analytics.totalViews || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Total Likes</span>
                    <span className="font-semibold">{analytics.totalLikes || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Average Engagement</span>
                    <span className="font-semibold">
                      {analytics.totalViews ? ((analytics.totalLikes / analytics.totalViews) * 100).toFixed(1) : 0}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Published Posts</span>
                    <span className="font-semibold">
                      {posts.filter((p: BlogPost) => p.status === 'published').length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Posts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {posts
                    .sort((a: BlogPost, b: BlogPost) => b.views - a.views)
                    .slice(0, 5)
                    .map((post: BlogPost, index: number) => (
                      <div key={post.id} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-sm font-semibold text-blue-600">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium line-clamp-1">{post.title}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {post.views} views • {post.likes} likes
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Creator Settings</CardTitle>
              <CardDescription>Manage your creator preferences and profile</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Display Name</label>
                <Input placeholder="Your display name" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Bio</label>
                <textarea
                  className="w-full px-3 py-2 border rounded-md"
                  rows={4}
                  placeholder="Tell readers about yourself..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Social Links</label>
                <div className="space-y-2">
                  <Input placeholder="Twitter URL" />
                  <Input placeholder="LinkedIn URL" />
                  <Input placeholder="Personal Website URL" />
                </div>
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}