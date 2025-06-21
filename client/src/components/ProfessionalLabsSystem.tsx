import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { 
  Shield, 
  Clock, 
  Star, 
  Users, 
  Play, 
  Pause, 
  RotateCcw, 
  Trophy, 
  Target, 
  BookOpen, 
  Lightbulb,
  CheckCircle,
  XCircle,
  Timer,
  Award,
  Filter,
  Search
} from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';

interface Lab {
  id: number;
  title: string;
  slug: string;
  description: string;
  category: string;
  difficulty: string;
  tags: string[];
  objectives: string[];
  prerequisites: string[];
  estimatedTime: number;
  maxAttempts: number;
  content: any;
  environment: any;
  solution: any;
  hints: any[];
  resources: any[];
  points: number;
  completionRate: number;
  averageRating: number;
  totalRatings: number;
  featured: boolean;
  isActive: boolean;
  authorId: string;
  createdAt: string;
  updatedAt: string;
}

interface LabProgress {
  id: number;
  userId: string;
  labId: number;
  status: 'not_started' | 'in_progress' | 'completed' | 'failed';
  attempts: number;
  score: number;
  timeSpent: number;
  hints_used: number;
  completedAt: string | null;
  lastAccessedAt: string;
  progress: any;
  createdAt: string;
}

const difficultyColors = {
  beginner: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
  intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
  advanced: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
  expert: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
};

const categoryIcons = {
  'web-security': Shield,
  'network': Users,
  'forensics': Search,
  'crypto': Target,
  'reverse-engineering': RotateCcw
};

export default function ProfessionalLabsSystem() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLab, setSelectedLab] = useState<Lab | null>(null);
  const [isLabActive, setIsLabActive] = useState(false);
  const [timer, setTimer] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [currentAttempt, setCurrentAttempt] = useState(1);

  const queryClient = useQueryClient();

  // Fetch labs
  const { data: labs = [], isLoading } = useQuery({
    queryKey: ['/api/labs', selectedCategory, selectedDifficulty],
    queryFn: () => apiRequest(`/api/labs?category=${selectedCategory}&difficulty=${selectedDifficulty}`)
  });

  // Fetch user progress
  const { data: userProgress = [] } = useQuery({
    queryKey: ['/api/user/lab-progress'],
    queryFn: () => apiRequest('/api/user/lab-progress')
  });

  // Start lab mutation
  const startLabMutation = useMutation({
    mutationFn: (labId: number) => apiRequest(`/api/labs/${labId}/start`, { method: 'POST' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/user/lab-progress'] });
      setIsLabActive(true);
      setTimer(0);
    }
  });

  // Submit lab mutation
  const submitLabMutation = useMutation({
    mutationFn: ({ labId, answers }: { labId: number; answers: any }) => 
      apiRequest(`/api/labs/${labId}/submit`, { 
        method: 'POST', 
        body: JSON.stringify({ answers, timeSpent: timer, hintsUsed, attempt: currentAttempt })
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/user/lab-progress'] });
      setIsLabActive(false);
    }
  });

  // Filter labs
  const filteredLabs = labs.filter((lab: Lab) => {
    const matchesCategory = selectedCategory === 'all' || lab.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || lab.difficulty === selectedDifficulty;
    const matchesSearch = lab.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lab.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lab.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLabActive) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isLabActive]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getLabProgress = (labId: number) => {
    return userProgress.find((p: LabProgress) => p.labId === labId);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"><CheckCircle className="w-3 h-3 mr-1" />Completed</Badge>;
      case 'in_progress':
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"><Timer className="w-3 h-3 mr-1" />In Progress</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"><XCircle className="w-3 h-3 mr-1" />Failed</Badge>;
      default:
        return <Badge variant="outline">Not Started</Badge>;
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Cybersecurity Labs
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Master cybersecurity through hands-on practice with real-world scenarios
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <span className="font-semibold">Level 5 Security Analyst</span>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search labs by title, description, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="web-security">Web Security</SelectItem>
                <SelectItem value="network">Network Security</SelectItem>
                <SelectItem value="forensics">Digital Forensics</SelectItem>
                <SelectItem value="crypto">Cryptography</SelectItem>
                <SelectItem value="reverse-engineering">Reverse Engineering</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
                <SelectItem value="expert">Expert</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lab Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          filteredLabs.map((lab: Lab) => {
            const progress = getLabProgress(lab.id);
            const IconComponent = categoryIcons[lab.category as keyof typeof categoryIcons] || Shield;

            return (
              <Card key={lab.id} className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <IconComponent className="w-5 h-5 text-blue-600" />
                      <Badge className={difficultyColors[lab.difficulty as keyof typeof difficultyColors]}>
                        {lab.difficulty}
                      </Badge>
                    </div>
                    {progress && getStatusBadge(progress.status)}
                  </div>
                  <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                    {lab.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {lab.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Progress bar for ongoing labs */}
                  {progress && progress.status === 'in_progress' && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{progress.attempts}/{lab.maxAttempts} attempts</span>
                      </div>
                      <Progress value={(progress.attempts / lab.maxAttempts) * 100} className="h-2" />
                    </div>
                  )}

                  {/* Lab stats */}
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {lab.estimatedTime}min
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      {lab.averageRating.toFixed(1)} ({lab.totalRatings})
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="w-4 h-4" />
                      {lab.points}pts
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {lab.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {lab.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{lab.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Action button */}
                  <Button
                    className="w-full"
                    onClick={() => setSelectedLab(lab)}
                    variant={progress?.status === 'completed' ? 'outline' : 'default'}
                  >
                    {progress?.status === 'completed' ? (
                      <>
                        <Trophy className="w-4 h-4 mr-2" />
                        Review Lab
                      </>
                    ) : progress?.status === 'in_progress' ? (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Continue Lab
                      </>
                    ) : (
                      <>
                        <Target className="w-4 h-4 mr-2" />
                        Start Lab
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* Lab Detail Modal */}
      {selectedLab && (
        <AlertDialog open={!!selectedLab} onOpenChange={() => setSelectedLab(null)}>
          <AlertDialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                {React.createElement(categoryIcons[selectedLab.category as keyof typeof categoryIcons] || Shield, {
                  className: "w-5 h-5 text-blue-600"
                })}
                {selectedLab.title}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {selectedLab.description}
              </AlertDialogDescription>
            </AlertDialogHeader>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="objectives">Objectives</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
                <TabsTrigger value="environment">Environment</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{selectedLab.estimatedTime}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Minutes</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{selectedLab.points}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Points</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">{selectedLab.maxAttempts}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Max Attempts</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{selectedLab.completionRate}%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Completion Rate</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Prerequisites</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    {selectedLab.prerequisites.map((prereq, index) => (
                      <li key={index}>{prereq}</li>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="objectives" className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Learning Objectives
                  </h4>
                  <ul className="space-y-2">
                    {selectedLab.objectives.map((objective, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="resources" className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Additional Resources
                  </h4>
                  <div className="space-y-2">
                    {selectedLab.resources.map((resource, index) => (
                      <div key={index} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="font-medium">{resource.title}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{resource.description}</div>
                        {resource.url && (
                          <a href={resource.url} target="_blank" rel="noopener noreferrer" 
                             className="text-blue-600 hover:text-blue-800 text-sm">
                            View Resource →
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="environment" className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-3">Lab Environment Setup</h4>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-sm space-y-2">
                      <div><strong>Platform:</strong> {selectedLab.environment?.platform || 'Web-based'}</div>
                      <div><strong>Tools Required:</strong> {selectedLab.environment?.tools?.join(', ') || 'Browser only'}</div>
                      <div><strong>Network Access:</strong> {selectedLab.environment?.networkAccess ? 'Required' : 'Not required'}</div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <AlertDialogFooter>
              <AlertDialogCancel>Close</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  startLabMutation.mutate(selectedLab.id);
                  setSelectedLab(null);
                }}
                disabled={startLabMutation.isPending}
              >
                {startLabMutation.isPending ? 'Starting...' : 'Start Lab'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}