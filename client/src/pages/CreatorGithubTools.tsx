import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  Github, 
  Globe, 
  Star, 
  GitFork, 
  Calendar,
  TrendingUp,
  FileImage,
  Video,
  Zap,
  Settings,
  MoreVertical
} from "lucide-react";
import type { GithubTool } from "@shared/schema";

export default function CreatorGithubTools() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const { data: tools = [], isLoading } = useQuery({
    queryKey: ["/api/github-tools"],
  });

  const deleteToolMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest(`/api/github-tools/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/github-tools"] });
      toast({
        title: "Tool Deleted",
        description: "GitHub tool has been deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete tool",
        variant: "destructive",
      });
    },
  });

  // Filter tools based on search and filters
  const filteredTools = tools.filter((tool: GithubTool) => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (tool.tags && tool.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
    
    const matchesStatus = statusFilter === "all" || tool.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || tool.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleDeleteTool = (id: number, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      deleteToolMutation.mutate(id);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'default';
      case 'pending': return 'secondary';
      case 'draft': return 'outline';
      case 'rejected': return 'destructive';
      default: return 'outline';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'advanced': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'expert': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const categories = [
    "reconnaissance", "vulnerability-scanning", "exploitation", "post-exploitation",
    "network-analysis", "web-security", "forensics", "cryptography", 
    "reverse-engineering", "social-engineering", "mobile-security", "cloud-security"
  ];

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="h-64 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">GitHub Tools</h1>
          <p className="text-muted-foreground">
            Manage your cybersecurity tool submissions and documentation
          </p>
        </div>
        <Button onClick={() => setLocation("/creator/github-tools/create")}>
          <Plus className="h-4 w-4 mr-2" />
          Create Tool
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Tools</p>
                <p className="text-2xl font-bold">{tools.length}</p>
              </div>
              <FileImage className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Published</p>
                <p className="text-2xl font-bold">
                  {tools.filter((t: GithubTool) => t.status === 'published').length}
                </p>
              </div>
              <Eye className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Draft</p>
                <p className="text-2xl font-bold">
                  {tools.filter((t: GithubTool) => t.status === 'draft').length}
                </p>
              </div>
              <Edit className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                <p className="text-2xl font-bold">
                  {tools.reduce((sum: number, tool: GithubTool) => sum + (tool.views || 0), 0)}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tools by name, description, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category.split('-').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tools Grid */}
      {filteredTools.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <FileImage className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Tools Found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || statusFilter !== 'all' || categoryFilter !== 'all' 
                ? "No tools match your search criteria" 
                : "You haven't created any GitHub tools yet"}
            </p>
            {(!searchTerm && statusFilter === 'all' && categoryFilter === 'all') && (
              <Button onClick={() => setLocation("/creator/github-tools/create")}>
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Tool
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool: GithubTool) => (
            <Card key={tool.id} className="group hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg mb-1 truncate">{tool.name}</CardTitle>
                    <CardDescription className="line-clamp-2 text-sm">
                      {tool.description}
                    </CardDescription>
                  </div>
                  <Badge variant={getStatusColor(tool.status || 'draft')} className="ml-2 shrink-0">
                    {tool.status || 'draft'}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Media Indicators */}
                {(tool.screenshots || tool.videos || tool.gifs) && (
                  <div className="flex gap-2">
                    {tool.screenshots && Array.isArray(tool.screenshots) && tool.screenshots.length > 0 && (
                      <Badge variant="outline" className="text-xs">
                        <FileImage className="h-3 w-3 mr-1" />
                        {tool.screenshots.length} Screenshots
                      </Badge>
                    )}
                    {tool.videos && Array.isArray(tool.videos) && tool.videos.length > 0 && (
                      <Badge variant="outline" className="text-xs">
                        <Video className="h-3 w-3 mr-1" />
                        {tool.videos.length} Videos
                      </Badge>
                    )}
                    {tool.gifs && Array.isArray(tool.gifs) && tool.gifs.length > 0 && (
                      <Badge variant="outline" className="text-xs">
                        <Zap className="h-3 w-3 mr-1" />
                        {tool.gifs.length} GIFs
                      </Badge>
                    )}
                  </div>
                )}

                {/* Category and Difficulty */}
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {tool.category.split('-').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </Badge>
                  <Badge className={`text-xs ${getDifficultyColor(tool.difficulty)}`}>
                    {tool.difficulty}
                  </Badge>
                </div>

                {/* GitHub Stats */}
                {(tool.githubStars || tool.githubForks) && (
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    {tool.githubStars && (
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        {tool.githubStars.toLocaleString()}
                      </div>
                    )}
                    {tool.githubForks && (
                      <div className="flex items-center gap-1">
                        <GitFork className="h-3 w-3" />
                        {tool.githubForks.toLocaleString()}
                      </div>
                    )}
                  </div>
                )}

                {/* Links */}
                <div className="flex items-center gap-2">
                  {tool.githubUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="flex-1"
                    >
                      <a href={tool.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-3 w-3 mr-1" />
                        GitHub
                      </a>
                    </Button>
                  )}
                  {tool.officialUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="flex-1"
                    >
                      <a href={tool.officialUrl} target="_blank" rel="noopener noreferrer">
                        <Globe className="h-3 w-3 mr-1" />
                        Website
                      </a>
                    </Button>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {tool.views || 0} views
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(tool.createdAt!).toLocaleDateString()}
                  </div>
                </div>

                {/* Tags */}
                {tool.tags && tool.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {tool.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {tool.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{tool.tags.length - 3} more
                      </Badge>
                    )}
                  </div>
                )}
              </CardContent>

              {/* Actions */}
              <div className="p-4 pt-0">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setLocation(`/tools/${tool.slug}`)}
                    className="flex-1"
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setLocation(`/creator/github-tools/edit/${tool.id}`)}
                    className="flex-1"
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteTool(tool.id, tool.name)}
                    disabled={deleteToolMutation.isPending}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}