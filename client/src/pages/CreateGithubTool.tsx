import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  Upload, 
  X, 
  Image as ImageIcon, 
  Video, 
  FileImage, 
  Plus,
  ArrowUp,
  ArrowDown,
  Eye,
  Save,
  RefreshCw,
  ExternalLink,
  Github,
  Globe,
  FileText,
  Tags,
  Cpu,
  Monitor,
  Smartphone,
  Apple,
  Zap
} from "lucide-react";

export default function CreateGithubTool() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    category: "",
    difficulty: "beginner",
    content: "",
    tags: [] as string[],
    useCases: [] as string[],
    alternatives: [] as string[],
    bestPractices: [] as string[],
    requirements: [] as string[],
    platforms: [] as string[],
    officialUrl: "",
    githubUrl: "",
    documentation: "",
    installCommand: "",
    usageExample: "",
    seoTitle: "",
    seoDescription: "",
    seoKeywords: "",
    status: "draft"
  });

  // Input states
  const [currentTag, setCurrentTag] = useState("");
  const [currentUseCase, setCurrentUseCase] = useState("");
  const [currentAlternative, setCurrentAlternative] = useState("");
  const [currentBestPractice, setCurrentBestPractice] = useState("");
  const [currentRequirement, setCurrentRequirement] = useState("");
  const [mediaItems, setMediaItems] = useState<any[]>([]);
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const [githubSyncing, setGithubSyncing] = useState(false);

  // Auto-generate slug from name
  const updateFormData = (field: string, value: any) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      if (field === 'name' && !prev.slug) {
        updated.slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
      }
      return updated;
    });
  };

  const createToolMutation = useMutation({
    mutationFn: async (data: any) => {
      const screenshots = mediaItems.filter(item => item.type === 'screenshot').map(item => ({
        url: item.url,
        caption: item.caption,
        alt: item.alt
      }));
      
      const videos = mediaItems.filter(item => item.type === 'video').map(item => ({
        url: item.url,
        caption: item.caption,
        type: item.videoType || 'direct'
      }));
      
      const gifs = mediaItems.filter(item => item.type === 'gif').map(item => ({
        url: item.url,
        caption: item.caption,
        alt: item.alt
      }));

      const payload = {
        ...data,
        screenshots,
        videos,
        gifs,
        mediaOrder: mediaItems.map((item, index) => ({ type: item.type, index }))
      };

      return apiRequest("/api/github-tools", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/github-tools"] });
      toast({
        title: "GitHub Tool Created",
        description: "Your tool has been created successfully and is ready for review.",
      });
      setLocation("/creator/github-tools");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create GitHub tool",
        variant: "destructive",
      });
    },
  });

  // Handle file upload
  const handleFileUpload = async (files: FileList | null, type: 'screenshot' | 'video' | 'gif') => {
    if (!files || files.length === 0) return;
    
    setUploadingMedia(true);
    
    try {
      for (const file of Array.from(files)) {
        const validTypes = {
          screenshot: ['image/jpeg', 'image/png', 'image/webp'],
          video: ['video/mp4', 'video/webm', 'video/quicktime'],
          gif: ['image/gif']
        };
        
        if (!validTypes[type].includes(file.type)) {
          toast({
            title: "Invalid File Type",
            description: `Please select a valid ${type} file`,
            variant: "destructive",
          });
          continue;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', type);
        
        const response = await fetch('/api/upload-media', {
          method: 'POST',
          body: formData,
        });
        
        if (!response.ok) {
          throw new Error('Failed to upload file');
        }
        
        const result = await response.json();
        
        const newMediaItem = {
          id: crypto.randomUUID(),
          type,
          url: result.url,
          caption: '',
          alt: file.name
        };
        
        setMediaItems(prev => [...prev, newMediaItem]);
      }
      
      toast({
        title: "Media Uploaded",
        description: "Your media files have been uploaded successfully",
      });
    } catch (error) {
      toast({
        title: "Upload Error",
        description: "Failed to upload media files",
        variant: "destructive",
      });
    } finally {
      setUploadingMedia(false);
    }
  };

  const syncGithubData = async () => {
    if (!formData.githubUrl) {
      toast({
        title: "GitHub URL Required",
        description: "Please enter a GitHub repository URL first",
        variant: "destructive",
      });
      return;
    }

    setGithubSyncing(true);
    
    try {
      const response = await fetch(`/api/github-sync?url=${encodeURIComponent(formData.githubUrl)}`);
      if (!response.ok) throw new Error('Failed to sync GitHub data');
      
      const data = await response.json();
      
      if (data.description && !formData.description) {
        updateFormData('description', data.description);
      }
      
      toast({
        title: "GitHub Data Synced",
        description: "Repository information has been imported successfully",
      });
    } catch (error) {
      toast({
        title: "Sync Error",
        description: "Failed to sync GitHub repository data",
        variant: "destructive",
      });
    } finally {
      setGithubSyncing(false);
    }
  };

  const addArrayItem = (field: string, value: string, setState: (value: string) => void) => {
    if (!value.trim()) return;
    
    const currentValues = formData[field as keyof typeof formData] as string[];
    if (!currentValues.includes(value.trim())) {
      updateFormData(field, [...currentValues, value.trim()]);
    }
    setState("");
  };

  const removeArrayItem = (field: string, index: number) => {
    const currentValues = formData[field as keyof typeof formData] as string[];
    updateFormData(field, currentValues.filter((_, i) => i !== index));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createToolMutation.mutate(formData);
  };

  const categories = [
    "reconnaissance", "vulnerability-scanning", "exploitation", "post-exploitation",
    "network-analysis", "web-security", "forensics", "cryptography", 
    "reverse-engineering", "social-engineering", "mobile-security", "cloud-security"
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Create GitHub Tool</h1>
        <p className="text-muted-foreground">
          Share a cybersecurity tool with the community. Include detailed information, 
          screenshots, and documentation to help others learn and use the tool effectively.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-8">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
          </TabsList>

          {/* Basic Information Tab */}
          <TabsContent value="basic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Basic Information
                </CardTitle>
                <CardDescription>
                  Essential details about the GitHub tool
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Tool Name *</label>
                    <Input 
                      placeholder="e.g., Nmap Network Scanner" 
                      value={formData.name}
                      onChange={(e) => updateFormData('name', e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">URL Slug *</label>
                    <Input 
                      placeholder="e.g., nmap-network-scanner" 
                      value={formData.slug}
                      onChange={(e) => updateFormData('slug', e.target.value)}
                      required
                    />
                    <p className="text-xs text-muted-foreground mt-1">Auto-generated from name. Used in the URL.</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description *</label>
                  <Textarea 
                    placeholder="Brief description of what this tool does and its main features..."
                    className="min-h-[100px]"
                    value={formData.description}
                    onChange={(e) => updateFormData('description', e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Category *</label>
                    <Select value={formData.category} onValueChange={(value) => updateFormData('category', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
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

                  <div>
                    <label className="block text-sm font-medium mb-2">Difficulty Level *</label>
                    <Select value={formData.difficulty} onValueChange={(value) => updateFormData('difficulty', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                        <SelectItem value="expert">Expert</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Status</label>
                    <Select value={formData.status} onValueChange={(value) => updateFormData('status', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="pending">Pending Review</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Links Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ExternalLink className="h-5 w-5" />
                  External Links
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                      <Github className="h-4 w-4" />
                      GitHub Repository
                    </label>
                    <div className="flex gap-2">
                      <Input 
                        placeholder="https://github.com/user/repo" 
                        value={formData.githubUrl}
                        onChange={(e) => updateFormData('githubUrl', e.target.value)}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={syncGithubData}
                        disabled={githubSyncing}
                      >
                        {githubSyncing ? (
                          <RefreshCw className="h-4 w-4 animate-spin" />
                        ) : (
                          <RefreshCw className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Sync repository data automatically</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      Official Website
                    </label>
                    <Input 
                      placeholder="https://tool-website.com" 
                      value={formData.officialUrl}
                      onChange={(e) => updateFormData('officialUrl', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Documentation URL</label>
                  <Input 
                    placeholder="https://docs.tool-website.com" 
                    value={formData.documentation}
                    onChange={(e) => updateFormData('documentation', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Content</CardTitle>
                <CardDescription>
                  Provide comprehensive information about the tool
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Description *</label>
                  <Textarea 
                    placeholder="Detailed explanation of the tool, its features, capabilities, and how to use it effectively. Support for Markdown formatting."
                    className="min-h-[300px]"
                    value={formData.content}
                    onChange={(e) => updateFormData('content', e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1">Use Markdown for formatting. Include usage examples, features, and best practices.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Installation Command</label>
                    <Input 
                      placeholder="pip install tool-name" 
                      value={formData.installCommand}
                      onChange={(e) => updateFormData('installCommand', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Basic Usage Example</label>
                    <Input 
                      placeholder="tool-name -h target.com" 
                      value={formData.usageExample}
                      onChange={(e) => updateFormData('usageExample', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Media Tab */}
          <TabsContent value="media" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5" />
                  Media Files
                </CardTitle>
                <CardDescription>
                  Upload screenshots, videos, and GIFs to showcase the tool
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full h-24 flex flex-col gap-2"
                      onClick={() => {
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.accept = 'image/jpeg,image/png,image/webp';
                        input.multiple = true;
                        input.onchange = (e) => handleFileUpload((e.target as HTMLInputElement).files, 'screenshot');
                        input.click();
                      }}
                      disabled={uploadingMedia}
                    >
                      <FileImage className="h-6 w-6" />
                      <span>Screenshots</span>
                    </Button>
                  </div>

                  <div className="text-center">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full h-24 flex flex-col gap-2"
                      onClick={() => {
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.accept = 'video/mp4,video/webm,video/quicktime';
                        input.multiple = true;
                        input.onchange = (e) => handleFileUpload((e.target as HTMLInputElement).files, 'video');
                        input.click();
                      }}
                      disabled={uploadingMedia}
                    >
                      <Video className="h-6 w-6" />
                      <span>Videos</span>
                    </Button>
                  </div>

                  <div className="text-center">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full h-24 flex flex-col gap-2"
                      onClick={() => {
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.accept = 'image/gif';
                        input.multiple = true;
                        input.onchange = (e) => handleFileUpload((e.target as HTMLInputElement).files, 'gif');
                        input.click();
                      }}
                      disabled={uploadingMedia}
                    >
                      <Zap className="h-6 w-6" />
                      <span>GIFs</span>
                    </Button>
                  </div>
                </div>

                {uploadingMedia && (
                  <div className="text-center py-4">
                    <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Uploading media files...</p>
                  </div>
                )}

                {mediaItems.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="font-semibold">Uploaded Media ({mediaItems.length})</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {mediaItems.map((item, index) => (
                        <Card key={item.id} className="relative">
                          <CardContent className="p-4">
                            <div className="aspect-video bg-muted rounded-lg mb-2 relative overflow-hidden">
                              <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                                {item.type === 'screenshot' || item.type === 'gif' ? (
                                  <FileImage className="h-8 w-8 text-muted-foreground" />
                                ) : (
                                  <Video className="h-8 w-8 text-muted-foreground" />
                                )}
                              </div>
                              
                              <div className="absolute top-2 right-2">
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => setMediaItems(prev => prev.filter(m => m.id !== item.id))}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                            
                            <Badge variant="outline" className="mb-2">
                              {item.type}
                            </Badge>
                            
                            <Input
                              placeholder="Add caption..."
                              value={item.caption || ''}
                              onChange={(e) => {
                                setMediaItems(prev => prev.map(m => 
                                  m.id === item.id ? { ...m, caption: e.target.value } : m
                                ));
                              }}
                              className="text-sm"
                            />
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Details Tab */}
          <TabsContent value="details" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tags className="h-5 w-5" />
                  Tags & Categories
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add tag (e.g., network, scanner, nmap)"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addArrayItem('tags', currentTag, setCurrentTag);
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addArrayItem('tags', currentTag, setCurrentTag)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag: string, index: number) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeArrayItem('tags', index)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SEO Tab */}
          <TabsContent value="seo" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>SEO Optimization</CardTitle>
                <CardDescription>
                  Optimize your tool page for search engines
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">SEO Title</label>
                  <Input 
                    placeholder="Tool Name - Category | HackTheShell" 
                    value={formData.seoTitle}
                    onChange={(e) => updateFormData('seoTitle', e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">Recommended: 50-60 characters. Will use tool name if empty.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">SEO Description</label>
                  <Textarea 
                    placeholder="Concise description that appears in search results..."
                    className="min-h-[100px]"
                    value={formData.seoDescription}
                    onChange={(e) => updateFormData('seoDescription', e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">Recommended: 150-160 characters. Will use tool description if empty.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">SEO Keywords</label>
                  <Input 
                    placeholder="cybersecurity, network scanner, penetration testing" 
                    value={formData.seoKeywords}
                    onChange={(e) => updateFormData('seoKeywords', e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">Comma-separated keywords for search optimization</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Submit Buttons */}
        <div className="flex justify-between items-center pt-6 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={() => setLocation("/creator/github-tools")}
          >
            Cancel
          </Button>
          
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                updateFormData('status', 'draft');
                setTimeout(() => onSubmit(new Event('submit') as any), 100);
              }}
              disabled={createToolMutation.isPending}
            >
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
            
            <Button
              type="submit"
              disabled={createToolMutation.isPending}
              onClick={() => updateFormData('status', 'pending')}
            >
              {createToolMutation.isPending ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Eye className="h-4 w-4 mr-2" />
              )}
              Submit for Review
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}