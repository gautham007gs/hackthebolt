import { useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered,
  Quote,
  Code,
  Link,
  Image,
  Palette,
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Eye,
  Save,
  Publish,
  Draft,
  Settings,
  Plus,
  Minus,
  RotateCcw,
  RotateCw,
  FileText,
  Hash,
  Calendar,
  Tag,
  Globe,
  Lock
} from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

interface BlogPost {
  id?: number;
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
  views?: number;
  likes?: number;
  featured?: boolean;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

const textColors = [
  '#000000', '#333333', '#666666', '#999999', '#CCCCCC', '#FFFFFF',
  '#FF0000', '#FF6600', '#FFCC00', '#33FF00', '#0099FF', '#6600FF',
  '#FF0099', '#FF3366', '#FF6699', '#66FF99', '#99CCFF', '#CC99FF'
];

const backgroundColors = [
  'transparent', '#F8F9FA', '#E9ECEF', '#DEE2E6', '#CED4DA', '#ADB5BD',
  '#FFF3CD', '#D4EDDA', '#D1ECF1', '#F8D7DA', '#E2E3E5', '#F5F5F5'
];

const fontSizes = [
  { label: 'Small', value: '14px' },
  { label: 'Normal', value: '16px' },
  { label: 'Medium', value: '18px' },
  { label: 'Large', value: '24px' },
  { label: 'Extra Large', value: '32px' },
  { label: 'Huge', value: '48px' }
];

const categories = [
  'Technology', 'Cybersecurity', 'Web Development', 'DevOps', 'Data Science',
  'Machine Learning', 'Cloud Computing', 'Tutorials', 'News', 'Opinion'
];

export default function CreatorBlogEditor({ postId }: { postId?: number }) {
  const [post, setPost] = useState<BlogPost>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featuredImage: '',
    authorId: 'user_1',
    category: '',
    tags: [],
    status: 'draft',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: ''
  });

  const [currentTag, setCurrentTag] = useState('');
  const [isPreview, setIsPreview] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const contentRef = useRef<HTMLDivElement>(null);

  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch existing post if editing
  useQuery({
    queryKey: ['/api/blog', postId],
    queryFn: () => apiRequest(`/api/blog/${postId}`),
    enabled: !!postId,
    onSuccess: (data) => setPost(data)
  });

  // Save draft mutation
  const saveDraftMutation = useMutation({
    mutationFn: (postData: BlogPost) => 
      postId 
        ? apiRequest(`/api/blog/${postId}`, { method: 'PUT', body: JSON.stringify(postData) })
        : apiRequest('/api/blog', { method: 'POST', body: JSON.stringify({ ...postData, status: 'draft' }) }),
    onSuccess: () => {
      toast({ title: "Draft saved successfully" });
      queryClient.invalidateQueries({ queryKey: ['/api/blog'] });
    }
  });

  // Publish mutation
  const publishMutation = useMutation({
    mutationFn: (postData: BlogPost) => 
      postId 
        ? apiRequest(`/api/blog/${postId}`, { method: 'PUT', body: JSON.stringify({ ...postData, status: 'published' }) })
        : apiRequest('/api/blog', { method: 'POST', body: JSON.stringify({ ...postData, status: 'published' }) }),
    onSuccess: () => {
      toast({ title: "Post published successfully" });
      queryClient.invalidateQueries({ queryKey: ['/api/blog'] });
    }
  });

  const handleTextChange = (field: keyof BlogPost, value: string) => {
    setPost(prev => ({ ...prev, [field]: value }));
    
    // Auto-generate slug from title
    if (field === 'title') {
      const slug = value.toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setPost(prev => ({ ...prev, slug }));
    }
  };

  const insertFormatting = (tag: string, hasClosing = true) => {
    const selection = window.getSelection();
    if (!selection || !contentRef.current) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.toString();
    
    let replacement = '';
    switch (tag) {
      case 'h1':
        replacement = `# ${selectedText || 'Heading 1'}`;
        break;
      case 'h2':
        replacement = `## ${selectedText || 'Heading 2'}`;
        break;
      case 'h3':
        replacement = `### ${selectedText || 'Heading 3'}`;
        break;
      case 'bold':
        replacement = `**${selectedText || 'bold text'}**`;
        break;
      case 'italic':
        replacement = `*${selectedText || 'italic text'}*`;
        break;
      case 'underline':
        replacement = `<u>${selectedText || 'underlined text'}</u>`;
        break;
      case 'code':
        replacement = `\`${selectedText || 'code'}\``;
        break;
      case 'quote':
        replacement = `> ${selectedText || 'quote'}`;
        break;
      case 'ul':
        replacement = `- ${selectedText || 'list item'}`;
        break;
      case 'ol':
        replacement = `1. ${selectedText || 'numbered item'}`;
        break;
      case 'link':
        replacement = `[${selectedText || 'link text'}](url)`;
        break;
      case 'image':
        replacement = `![${selectedText || 'alt text'}](image-url)`;
        break;
    }

    if (replacement) {
      range.deleteContents();
      range.insertNode(document.createTextNode(replacement));
      setPost(prev => ({ ...prev, content: contentRef.current?.textContent || '' }));
    }
  };

  const applyTextStyle = (style: string, value: string) => {
    document.execCommand(style, false, value);
    setPost(prev => ({ ...prev, content: contentRef.current?.innerHTML || '' }));
  };

  const addTag = () => {
    if (currentTag.trim() && !post.tags.includes(currentTag.trim())) {
      setPost(prev => ({ ...prev, tags: [...prev.tags, currentTag.trim()] }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setPost(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove) }));
  };

  const renderPreview = () => {
    return (
      <div className="prose prose-lg max-w-none dark:prose-invert">
        <h1>{post.title}</h1>
        <div className="text-gray-600 dark:text-gray-400 mb-4">
          {post.excerpt}
        </div>
        {post.featuredImage && (
          <img src={post.featuredImage} alt={post.title} className="w-full rounded-lg mb-6" />
        )}
        <div 
          dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }}
        />
        <div className="flex flex-wrap gap-2 mt-6">
          {post.tags.map((tag, index) => (
            <Badge key={index} variant="outline">{tag}</Badge>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{postId ? 'Edit Post' : 'Create New Post'}</h1>
          <p className="text-gray-600 dark:text-gray-400">
            {post.status === 'published' ? 'Published' : 'Draft'} • Last saved: {new Date().toLocaleTimeString()}
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => saveDraftMutation.mutate(post)}
            disabled={saveDraftMutation.isPending}
          >
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
          <Button 
            onClick={() => publishMutation.mutate(post)}
            disabled={publishMutation.isPending || !post.title.trim()}
          >
            <Publish className="w-4 h-4 mr-2" />
            Publish
          </Button>
        </div>
      </div>

      <Tabs defaultValue="editor" className="w-full">
        <TabsList>
          <TabsTrigger value="editor">Editor</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>

        <TabsContent value="editor" className="space-y-6">
          {/* Main Editor */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Content Area */}
            <div className="lg:col-span-3 space-y-4">
              {/* Title */}
              <div>
                <Input
                  placeholder="Enter your post title..."
                  value={post.title}
                  onChange={(e) => handleTextChange('title', e.target.value)}
                  className="text-3xl font-bold border-none px-0 py-3 placeholder:text-gray-400"
                />
              </div>

              {/* Slug */}
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Globe className="w-4 h-4" />
                <span>URL: /blog/{post.slug || 'your-post-url'}</span>
              </div>

              {/* Excerpt */}
              <div>
                <Textarea
                  placeholder="Write a compelling excerpt..."
                  value={post.excerpt}
                  onChange={(e) => handleTextChange('excerpt', e.target.value)}
                  className="min-h-20"
                />
              </div>

              {/* Formatting Toolbar */}
              <Card>
                <CardContent className="pt-4">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {/* Text Formatting */}
                    <div className="flex gap-1 border-r pr-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => insertFormatting('h1')}
                        title="Heading 1"
                      >
                        H1
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => insertFormatting('h2')}
                        title="Heading 2"
                      >
                        H2
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => insertFormatting('h3')}
                        title="Heading 3"
                      >
                        H3
                      </Button>
                    </div>

                    {/* Style Formatting */}
                    <div className="flex gap-1 border-r pr-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => insertFormatting('bold')}
                        title="Bold"
                      >
                        <Bold className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => insertFormatting('italic')}
                        title="Italic"
                      >
                        <Italic className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => insertFormatting('underline')}
                        title="Underline"
                      >
                        <Underline className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Lists */}
                    <div className="flex gap-1 border-r pr-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => insertFormatting('ul')}
                        title="Bullet List"
                      >
                        <List className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => insertFormatting('ol')}
                        title="Numbered List"
                      >
                        <ListOrdered className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Special Elements */}
                    <div className="flex gap-1 border-r pr-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => insertFormatting('quote')}
                        title="Quote"
                      >
                        <Quote className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => insertFormatting('code')}
                        title="Code"
                      >
                        <Code className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => insertFormatting('link')}
                        title="Link"
                      >
                        <Link className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => insertFormatting('image')}
                        title="Image"
                      >
                        <Image className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Colors */}
                    <div className="flex gap-1">
                      <Select>
                        <SelectTrigger className="w-auto">
                          <Palette className="w-4 h-4" />
                        </SelectTrigger>
                        <SelectContent>
                          <div className="grid grid-cols-6 gap-1 p-2">
                            {textColors.map((color) => (
                              <button
                                key={color}
                                className="w-6 h-6 rounded border"
                                style={{ backgroundColor: color }}
                                onClick={() => applyTextStyle('foreColor', color)}
                              />
                            ))}
                          </div>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Font Size */}
                  <div className="flex gap-2 mb-4">
                    <Select>
                      <SelectTrigger className="w-32">
                        <Type className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Font Size" />
                      </SelectTrigger>
                      <SelectContent>
                        {fontSizes.map((size) => (
                          <SelectItem key={size.value} value={size.value}>
                            {size.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Content Editor */}
              <Card>
                <CardContent className="pt-4">
                  <div
                    ref={contentRef}
                    contentEditable
                    className="min-h-96 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ whiteSpace: 'pre-wrap' }}
                    onInput={(e) => setPost(prev => ({ ...prev, content: e.currentTarget.textContent || '' }))}
                    suppressContentEditableWarning={true}
                  >
                    {post.content || 'Start writing your post...'}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Post Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Post Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    {post.status === 'published' ? (
                      <Badge className="bg-green-100 text-green-800">
                        <Globe className="w-3 h-3 mr-1" />
                        Published
                      </Badge>
                    ) : (
                      <Badge variant="outline">
                        <Draft className="w-3 h-3 mr-1" />
                        Draft
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {post.status === 'published' && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Published on {new Date().toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Category */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={post.category} onValueChange={(value) => setPost(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Tags */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    Tags
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add tag"
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addTag()}
                    />
                    <Button size="sm" onClick={addTag}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {post.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="cursor-pointer">
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="ml-1 hover:text-red-500"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Featured Image */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Featured Image</CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    placeholder="Image URL"
                    value={post.featuredImage}
                    onChange={(e) => setPost(prev => ({ ...prev, featuredImage: e.target.value }))}
                  />
                  {post.featuredImage && (
                    <div className="mt-2">
                      <img
                        src={post.featuredImage}
                        alt="Featured"
                        className="w-full rounded-lg"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              {renderPreview()}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Post Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Custom Slug</label>
                <Input
                  value={post.slug}
                  onChange={(e) => setPost(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="custom-url-slug"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={post.featured || false}
                  onChange={(e) => setPost(prev => ({ ...prev, featured: e.target.checked }))}
                />
                <label htmlFor="featured" className="text-sm">Featured Post</label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
              <CardDescription>
                Optimize your post for search engines
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">SEO Title</label>
                <Input
                  value={post.seoTitle}
                  onChange={(e) => setPost(prev => ({ ...prev, seoTitle: e.target.value }))}
                  placeholder="SEO optimized title"
                />
                <p className="text-xs text-gray-500 mt-1">Recommended: 50-60 characters</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Meta Description</label>
                <Textarea
                  value={post.seoDescription}
                  onChange={(e) => setPost(prev => ({ ...prev, seoDescription: e.target.value }))}
                  placeholder="Brief description for search results"
                  maxLength={160}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {post.seoDescription.length}/160 characters
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Keywords</label>
                <Input
                  value={post.seoKeywords}
                  onChange={(e) => setPost(prev => ({ ...prev, seoKeywords: e.target.value }))}
                  placeholder="keyword1, keyword2, keyword3"
                />
                <p className="text-xs text-gray-500 mt-1">Separate keywords with commas</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}