import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { MobileFriendlyCreatorEditor } from '../components/MobileFriendlyCreatorEditor';
import { PlusCircle, Edit, BarChart, Settings, FileText, Eye, Clock, TrendingUp } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  status: string;
  category: string;
  publishedAt: string;
  views: number;
  likes: number;
}

interface Analytics {
  totalViews: number;
  totalLikes: number;
  publishedCount: number;
  totalPosts: number;
  avgViews: number;
  avgLikes: number;
}

export default function ImprovedCreatorPageWithEditor() {
  const [activeTab, setActiveTab] = useState('overview');

  const { data: posts = [] } = useQuery<BlogPost[]>({
    queryKey: ['/api/creator/posts'],
    queryFn: () => fetch('/api/creator/posts?authorId=user_1').then(res => res.json())
  });

  const { data: analytics } = useQuery<Analytics>({
    queryKey: ['/api/creator/analytics'],
    queryFn: () => fetch('/api/creator/analytics?authorId=user_1').then(res => res.json())
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-500';
      case 'draft': return 'bg-gray-500';
      case 'scheduled': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Creator Dashboard</h1>
            <Button 
              onClick={() => setActiveTab('editor')}
              className="flex items-center gap-2"
            >
              <PlusCircle className="h-4 w-4" />
              New Post
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-4 mb-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="posts" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Posts</span>
            </TabsTrigger>
            <TabsTrigger value="editor" className="flex items-center gap-2">
              <Edit className="h-4 w-4" />
              <span className="hidden sm:inline">Editor</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="space-y-6">
              {/* Analytics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Views</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {analytics?.totalViews?.toLocaleString() || '0'}
                        </p>
                      </div>
                      <Eye className="h-8 w-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Published Posts</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {analytics?.publishedCount || '0'}
                        </p>
                      </div>
                      <FileText className="h-8 w-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg. Views</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {analytics?.avgViews || '0'}
                        </p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-purple-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Likes</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {analytics?.totalLikes || '0'}
                        </p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-red-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Posts */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Posts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {posts.slice(0, 5).map((post) => (
                      <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 dark:text-white truncate">
                            {post.title}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                            <span>{formatDate(post.publishedAt)}</span>
                            <span>{post.views} views</span>
                            <span>{post.likes} likes</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <Badge className={`${getStatusColor(post.status)} text-white`}>
                            {post.status}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="posts">
            <Card>
              <CardHeader>
                <CardTitle>All Posts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {posts.map((post) => (
                    <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 dark:text-white truncate">
                          {post.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                          <span>{formatDate(post.publishedAt)}</span>
                          <span>{post.category}</span>
                          <span>{post.views} views</span>
                          <span>{post.likes} likes</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Badge className={`${getStatusColor(post.status)} text-white`}>
                          {post.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="editor">
            <MobileFriendlyCreatorEditor />
          </TabsContent>

          <TabsContent value="settings">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Display Name</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border rounded-lg"
                      defaultValue="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Bio</label>
                    <textarea 
                      rows={3}
                      className="w-full p-2 border rounded-lg"
                      defaultValue="Cybersecurity expert and content creator"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Website</label>
                    <input 
                      type="url" 
                      className="w-full p-2 border rounded-lg"
                      defaultValue="https://johndoe.com"
                    />
                  </div>
                  <Button>Save Profile</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Publishing Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Auto-publish scheduled posts</label>
                    <input type="checkbox" className="rounded" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Email notifications</label>
                    <input type="checkbox" className="rounded" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">SEO optimization suggestions</label>
                    <input type="checkbox" className="rounded" defaultChecked />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Default Category</label>
                    <select className="w-full p-2 border rounded-lg">
                      <option>Cybersecurity</option>
                      <option>Penetration Testing</option>
                      <option>CTF</option>
                      <option>Tutorials</option>
                    </select>
                  </div>
                  <Button>Save Preferences</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}