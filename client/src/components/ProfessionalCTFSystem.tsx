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
  Flag, 
  Clock, 
  Star, 
  Users, 
  Trophy, 
  Target, 
  Download, 
  Lightbulb,
  CheckCircle,
  XCircle,
  Timer,
  Award,
  Filter,
  Search,
  Shield,
  Lock,
  Code,
  Cpu,
  Globe,
  FileText,
  Zap,
  Brain
} from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

interface CtfChallenge {
  id: number;
  title: string;
  slug: string;
  description: string;
  category: string;
  difficulty: string;
  tags: string[];
  flag: string;
  flagFormat: string;
  points: number;
  solves: number;
  files: any[];
  hints: any[];
  environment: any;
  writeupRequired: boolean;
  isActive: boolean;
  authorId: string;
  createdAt: string;
  updatedAt: string;
}

interface CtfSubmission {
  id: number;
  userId: string;
  challengeId: number;
  submittedFlag: string;
  isCorrect: boolean;
  points: number;
  solveTime: number | null;
  submittedAt: string;
}

const difficultyColors = {
  easy: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
  hard: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
  insane: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
};

const categoryIcons = {
  web: Globe,
  crypto: Lock,
  pwn: Cpu,
  reverse: Code,
  forensics: Search,
  misc: Brain
};

export default function ProfessionalCTFSystem() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChallenge, setSelectedChallenge] = useState<CtfChallenge | null>(null);
  const [flagInput, setFlagInput] = useState('');
  const [usedHints, setUsedHints] = useState<number[]>([]);
  const [startTime, setStartTime] = useState<Date | null>(null);

  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch challenges
  const { data: challenges = [], isLoading } = useQuery({
    queryKey: ['/api/ctf', selectedCategory, selectedDifficulty],
    queryFn: () => apiRequest(`/api/ctf?category=${selectedCategory}&difficulty=${selectedDifficulty}`)
  });

  // Fetch user submissions
  const { data: userSubmissions = [] } = useQuery({
    queryKey: ['/api/user/ctf-submissions'],
    queryFn: () => apiRequest('/api/user/ctf-submissions')
  });

  // Fetch leaderboard
  const { data: leaderboard = [] } = useQuery({
    queryKey: ['/api/ctf/leaderboard'],
    queryFn: () => apiRequest('/api/ctf/leaderboard')
  });

  // Submit flag mutation
  const submitFlagMutation = useMutation({
    mutationFn: ({ challengeId, flag }: { challengeId: number; flag: string }) => 
      apiRequest(`/api/ctf/${challengeId}/submit`, { 
        method: 'POST', 
        body: JSON.stringify({ flag })
      }),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ['/api/user/ctf-submissions'] });
      queryClient.invalidateQueries({ queryKey: ['/api/ctf/leaderboard'] });
      
      if (result.correct) {
        toast({
          title: "🎉 Correct Flag!",
          description: `You earned ${result.points} points! Congratulations!`,
          variant: "default",
        });
        setFlagInput('');
        setSelectedChallenge(null);
      } else {
        toast({
          title: "❌ Incorrect Flag",
          description: result.message,
          variant: "destructive",
        });
      }
    }
  });

  // Filter challenges
  const filteredChallenges = challenges.filter((challenge: CtfChallenge) => {
    const matchesCategory = selectedCategory === 'all' || challenge.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || challenge.difficulty === selectedDifficulty;
    const matchesSearch = challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         challenge.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         challenge.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  const getChallengeStatus = (challengeId: number) => {
    return userSubmissions.find((s: CtfSubmission) => s.challengeId === challengeId && s.isCorrect);
  };

  const getAttemptCount = (challengeId: number) => {
    return userSubmissions.filter((s: CtfSubmission) => s.challengeId === challengeId).length;
  };

  const handleStartChallenge = (challenge: CtfChallenge) => {
    setSelectedChallenge(challenge);
    setStartTime(new Date());
    setUsedHints([]);
    setFlagInput('');
  };

  const useHint = (hintIndex: number) => {
    if (!usedHints.includes(hintIndex)) {
      setUsedHints([...usedHints, hintIndex]);
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">
            CTF Challenges
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Test your skills against real-world cybersecurity challenges
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-sm text-gray-600 dark:text-gray-400">Your Rank</div>
            <div className="text-2xl font-bold text-yellow-600">#12</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Points</div>
            <div className="text-2xl font-bold text-blue-600">2,450</div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Solved</p>
                <p className="text-3xl font-bold text-green-600">
                  {userSubmissions.filter((s: CtfSubmission) => s.isCorrect).length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Attempts</p>
                <p className="text-3xl font-bold text-blue-600">{userSubmissions.length}</p>
              </div>
              <Target className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Success Rate</p>
                <p className="text-3xl font-bold text-purple-600">
                  {userSubmissions.length > 0 
                    ? Math.round((userSubmissions.filter((s: CtfSubmission) => s.isCorrect).length / userSubmissions.length) * 100)
                    : 0}%
                </p>
              </div>
              <Award className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Streak</p>
                <p className="text-3xl font-bold text-orange-600">7</p>
              </div>
              <Zap className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search challenges by title, description, or tags..."
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
                <SelectItem value="web">Web</SelectItem>
                <SelectItem value="crypto">Crypto</SelectItem>
                <SelectItem value="pwn">PWN</SelectItem>
                <SelectItem value="reverse">Reverse</SelectItem>
                <SelectItem value="forensics">Forensics</SelectItem>
                <SelectItem value="misc">Misc</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
                <SelectItem value="insane">Insane</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="challenges" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>

        <TabsContent value="challenges" className="space-y-6">
          {/* Challenge Grid */}
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
              filteredChallenges.map((challenge: CtfChallenge) => {
                const isSolved = getChallengeStatus(challenge.id);
                const attempts = getAttemptCount(challenge.id);
                const IconComponent = categoryIcons[challenge.category as keyof typeof categoryIcons] || Shield;

                return (
                  <Card key={challenge.id} className={`group hover:shadow-lg transition-all duration-300 border-l-4 ${
                    isSolved ? 'border-l-green-500 bg-green-50/50 dark:bg-green-900/10' : 'border-l-red-500'
                  }`}>
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <IconComponent className="w-5 h-5 text-red-600" />
                          <Badge className={difficultyColors[challenge.difficulty as keyof typeof difficultyColors]}>
                            {challenge.difficulty}
                          </Badge>
                        </div>
                        {isSolved && (
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Solved
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg group-hover:text-red-600 transition-colors">
                        {challenge.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {challenge.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Challenge stats */}
                      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Award className="w-4 h-4" />
                          {challenge.points}pts
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {challenge.solves} solves
                        </div>
                        {attempts > 0 && (
                          <div className="flex items-center gap-1">
                            <Target className="w-4 h-4" />
                            {attempts} attempts
                          </div>
                        )}
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {challenge.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {challenge.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{challenge.tags.length - 3}
                          </Badge>
                        )}
                      </div>

                      {/* Files */}
                      {challenge.files && challenge.files.length > 0 && (
                        <div className="flex items-center gap-2 text-sm text-blue-600">
                          <Download className="w-4 h-4" />
                          {challenge.files.length} file(s) available
                        </div>
                      )}

                      {/* Action button */}
                      <Button
                        className="w-full"
                        onClick={() => handleStartChallenge(challenge)}
                        variant={isSolved ? 'outline' : 'default'}
                      >
                        {isSolved ? (
                          <>
                            <Trophy className="w-4 h-4 mr-2" />
                            View Solution
                          </>
                        ) : (
                          <>
                            <Flag className="w-4 h-4 mr-2" />
                            Start Challenge
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-600" />
                Global Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboard.slice(0, 10).map((entry: any, index: number) => (
                  <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${
                    index < 3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20' : 'bg-gray-50 dark:bg-gray-800'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        index === 0 ? 'bg-yellow-500 text-white' :
                        index === 1 ? 'bg-gray-400 text-white' :
                        index === 2 ? 'bg-orange-600 text-white' :
                        'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-semibold">{entry.username}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {entry.solvedChallenges} challenges solved
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">{entry.totalPoints}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">points</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Challenge Detail Modal */}
      {selectedChallenge && (
        <AlertDialog open={!!selectedChallenge} onOpenChange={() => setSelectedChallenge(null)}>
          <AlertDialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                {React.createElement(categoryIcons[selectedChallenge.category as keyof typeof categoryIcons] || Shield, {
                  className: "w-5 h-5 text-red-600"
                })}
                {selectedChallenge.title}
                <Badge className={difficultyColors[selectedChallenge.difficulty as keyof typeof difficultyColors]}>
                  {selectedChallenge.difficulty}
                </Badge>
              </AlertDialogTitle>
              <AlertDialogDescription>
                {selectedChallenge.description}
              </AlertDialogDescription>
            </AlertDialogHeader>

            <div className="space-y-6">
              {/* Challenge Info */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{selectedChallenge.points}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Points</div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{selectedChallenge.solves}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Solves</div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{selectedChallenge.flagFormat}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Flag Format</div>
                </div>
              </div>

              {/* Files */}
              {selectedChallenge.files && selectedChallenge.files.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Downloads
                  </h4>
                  <div className="space-y-2">
                    {selectedChallenge.files.map((file: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div>
                          <div className="font-medium">{file.name}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">{file.size} | {file.type}</div>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Hints */}
              {selectedChallenge.hints && selectedChallenge.hints.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4" />
                    Hints ({usedHints.length}/{selectedChallenge.hints.length} used)
                  </h4>
                  <div className="space-y-2">
                    {selectedChallenge.hints.map((hint: any, index: number) => (
                      <div key={index} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        {usedHints.includes(index) ? (
                          <p className="text-sm">{hint.content}</p>
                        ) : (
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Hint {index + 1} - Cost: {hint.cost || 0} points
                            </p>
                            <Button size="sm" variant="outline" onClick={() => useHint(index)}>
                              Reveal Hint
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Flag Submission */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Flag className="w-4 h-4" />
                  Submit Flag
                </h4>
                <div className="flex gap-2">
                  <Input
                    placeholder={`Enter flag in format: ${selectedChallenge.flagFormat}`}
                    value={flagInput}
                    onChange={(e) => setFlagInput(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    onClick={() => submitFlagMutation.mutate({ 
                      challengeId: selectedChallenge.id, 
                      flag: flagInput 
                    })}
                    disabled={!flagInput.trim() || submitFlagMutation.isPending}
                  >
                    {submitFlagMutation.isPending ? 'Submitting...' : 'Submit'}
                  </Button>
                </div>
              </div>
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel>Close</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}