import { useState, useRef, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { 
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight,
  List, ListOrdered, Link, Image, Code, Quote, Type,
  Eye, Save, FileText, Palette, Smartphone, Monitor
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { apiRequest, queryClient } from '../lib/queryClient';
import { useToast } from '../hooks/use-toast';

interface BlogPost {
  id?: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  status: string;
  featuredImage?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
}

export function MobileFriendlyCreatorEditor() {
  const { toast } = useToast();
  const [post, setPost] = useState<BlogPost>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'cybersecurity',
    tags: [],
    status: 'draft',
    featuredImage: '',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: ''
  });
  
  const [isPreview, setIsPreview] = useState(false);
  const [isMobilePreview, setIsMobilePreview] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [selectedText, setSelectedText] = useState('');
  const contentRef = useRef<HTMLTextAreaElement>(null);

  // Generate slug from title
  useEffect(() => {
    if (post.title) {
      const slug = post.title
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .trim();
      setPost(prev => ({ ...prev, slug }));
    }
  }, [post.title]);

  const saveMutation = useMutation({
    mutationFn: (postData: BlogPost) => apiRequest('/api/blog', {
      method: 'POST',
      body: JSON.stringify({ ...postData, authorId: 'user_1' })
    }),
    onSuccess: () => {
      toast({ title: 'Post saved successfully!' });
      queryClient.invalidateQueries({ queryKey: ['/api/creator/posts'] });
    },
    onError: () => {
      toast({ title: 'Failed to save post', variant: 'destructive' });
    }
  });

  const formatText = (format: string) => {
    if (!contentRef.current) return;
    
    const textarea = contentRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    
    let formattedText = '';
    
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'underline':
        formattedText = `<u>${selectedText}</u>`;
        break;
      case 'code':
        formattedText = `\`${selectedText}\``;
        break;
      case 'quote':
        formattedText = `> ${selectedText}`;
        break;
      case 'h1':
        formattedText = `# ${selectedText}`;
        break;
      case 'h2':
        formattedText = `## ${selectedText}`;
        break;
      case 'h3':
        formattedText = `### ${selectedText}`;
        break;
      case 'ul':
        formattedText = `- ${selectedText}`;
        break;
      case 'ol':
        formattedText = `1. ${selectedText}`;
        break;
      case 'link':
        formattedText = `[${selectedText}](url)`;
        break;
      case 'image':
        formattedText = `![${selectedText}](image-url)`;
        break;
      default:
        formattedText = selectedText;
    }
    
    const newContent = 
      textarea.value.substring(0, start) + 
      formattedText + 
      textarea.value.substring(end);
    
    setPost(prev => ({ ...prev, content: newContent }));
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + formattedText.length,
        start + formattedText.length
      );
    }, 0);
  };

  const addTag = () => {
    if (tagInput.trim() && !post.tags.includes(tagInput.trim())) {
      setPost(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setPost(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSave = () => {
    if (!post.title || !post.content) {
      toast({ title: 'Title and content are required', variant: 'destructive' });
      return;
    }
    saveMutation.mutate(post);
  };

  const renderPreview = () => {
    const processedContent = post.content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 rounded">$1</code>')
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mb-4">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-semibold mb-3">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-medium mb-2">$1</h3>')
      .replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-blue-500 pl-4 italic">$1</blockquote>')
      .replace(/^\- (.*$)/gm, '<li class="ml-4">$1</li>')
      .replace(/^\d+\. (.*$)/gm, '<li class="ml-4">$1</li>')
      .replace(/\n/g, '<br>');

    return (
      <div 
        className={`prose max-w-none ${isMobilePreview ? 'max-w-sm mx-auto' : ''}`}
        dangerouslySetInnerHTML={{ __html: processedContent }}
      />
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        <div className="mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Blog Editor
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create engaging cybersecurity content with professional formatting tools
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Editor Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Toolbar */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Formatting Tools</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Mobile-optimized toolbar */}
                <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2 mb-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => formatText('bold')}
                    className="h-8 w-8 p-0"
                  >
                    <Bold className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => formatText('italic')}
                    className="h-8 w-8 p-0"
                  >
                    <Italic className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => formatText('underline')}
                    className="h-8 w-8 p-0"
                  >
                    <Underline className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => formatText('code')}
                    className="h-8 w-8 p-0"
                  >
                    <Code className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => formatText('quote')}
                    className="h-8 w-8 p-0"
                  >
                    <Quote className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => formatText('ul')}
                    className="h-8 w-8 p-0"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => formatText('ol')}
                    className="h-8 w-8 p-0"
                  >
                    <ListOrdered className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => formatText('link')}
                    className="h-8 w-8 p-0"
                  >
                    <Link className="h-4 w-4" />
                  </Button>
                </div>

                {/* Heading tools */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => formatText('h1')}
                    className="text-xs"
                  >
                    H1
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => formatText('h2')}
                    className="text-xs"
                  >
                    H2
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => formatText('h3')}
                    className="text-xs"
                  >
                    H3
                  </Button>
                </div>

                {/* Preview toggles */}
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={isPreview ? "default" : "outline"}
                    size="sm"
                    onClick={() => setIsPreview(!isPreview)}
                    className="flex items-center gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    <span className="hidden sm:inline">Preview</span>
                  </Button>
                  <Button
                    variant={isMobilePreview ? "default" : "outline"}
                    size="sm"
                    onClick={() => setIsMobilePreview(!isMobilePreview)}
                    className="flex items-center gap-2"
                  >
                    <Smartphone className="h-4 w-4" />
                    <span className="hidden sm:inline">Mobile</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Content Editor */}
            <Card>
              <CardHeader>
                <CardTitle>Post Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Post Title"
                  value={post.title}
                  onChange={(e) => setPost(prev => ({ ...prev, title: e.target.value }))}
                  className="text-lg font-medium"
                />
                
                <Input
                  placeholder="URL Slug (auto-generated)"
                  value={post.slug}
                  onChange={(e) => setPost(prev => ({ ...prev, slug: e.target.value }))}
                  className="text-sm text-gray-600"
                />

                <Textarea
                  placeholder="Brief excerpt (for previews)"
                  value={post.excerpt}
                  onChange={(e) => setPost(prev => ({ ...prev, excerpt: e.target.value }))}
                  rows={2}
                />

                {isPreview ? (
                  <div className="min-h-[400px] p-4 border rounded-lg bg-white dark:bg-gray-800">
                    <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
                    {renderPreview()}
                  </div>
                ) : (
                  <Textarea
                    ref={contentRef}
                    placeholder="Write your content here... Use the toolbar above for formatting."
                    value={post.content}
                    onChange={(e) => setPost(prev => ({ ...prev, content: e.target.value }))}
                    rows={20}
                    className="font-mono text-sm"
                  />
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publishing */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Publish</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select value={post.status} onValueChange={(value) => setPost(prev => ({ ...prev, status: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={post.category} onValueChange={(value) => setPost(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                    <SelectItem value="penetration-testing">Penetration Testing</SelectItem>
                    <SelectItem value="ctf">CTF</SelectItem>
                    <SelectItem value="tutorials">Tutorials</SelectItem>
                    <SelectItem value="news">News</SelectItem>
                  </SelectContent>
                </Select>

                <Button 
                  onClick={handleSave}
                  disabled={saveMutation.isPending}
                  className="w-full"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {saveMutation.isPending ? 'Saving...' : 'Save Post'}
                </Button>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tags</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add tag"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                    className="flex-1"
                  />
                  <Button onClick={addTag} size="sm">Add</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <Badge 
                      key={index}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => removeTag(tag)}
                    >
                      {tag} ×
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Featured Image */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Featured Image</CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder="Image URL"
                  value={post.featuredImage || ''}
                  onChange={(e) => setPost(prev => ({ ...prev, featuredImage: e.target.value }))}
                />
                {post.featuredImage && (
                  <div className="mt-3">
                    <img 
                      src={post.featuredImage} 
                      alt="Featured" 
                      className="w-full h-32 object-cover rounded-lg"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* SEO */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">SEO Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="SEO Title"
                  value={post.seoTitle || ''}
                  onChange={(e) => setPost(prev => ({ ...prev, seoTitle: e.target.value }))}
                />
                <Textarea
                  placeholder="Meta Description"
                  value={post.seoDescription || ''}
                  onChange={(e) => setPost(prev => ({ ...prev, seoDescription: e.target.value }))}
                  rows={3}
                />
                <Input
                  placeholder="Keywords (comma-separated)"
                  value={post.seoKeywords || ''}
                  onChange={(e) => setPost(prev => ({ ...prev, seoKeywords: e.target.value }))}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}