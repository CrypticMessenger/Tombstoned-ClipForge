'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Scissors, 
  Link as LinkIcon, 
  Key, 
  Play, 
  Download, 
  Settings, 
  LogOut,
  Upload,
  Clock,
  CheckCircle,
  AlertCircle,
  Zap,
  Menu,
  X
} from "lucide-react";
import Link from "next/link";
import { useRouter } from 'next/navigation';

interface ConversionJob {
  id: string;
  title: string;
  url: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  createdAt: string;
  clips?: Array<{
    id: string;
    title: string;
    duration: string;
    thumbnail: string;
  }>;
}

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [geminiKey, setGeminiKey] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [jobs, setJobs] = useState<ConversionJob[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/auth');
      return;
    }
    setUser(JSON.parse(userData));

    // Load saved Gemini key
    const savedKey = localStorage.getItem('gemini_key');
    if (savedKey) {
      setGeminiKey(savedKey);
    }

    // Load conversion jobs
    const savedJobs = localStorage.getItem('conversion_jobs');
    if (savedJobs) {
      setJobs(JSON.parse(savedJobs));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('gemini_key');
    router.push('/');
  };

  const saveGeminiKey = () => {
    localStorage.setItem('gemini_key', geminiKey);
  };

  const handleConversion = () => {
    if (!youtubeUrl || !geminiKey) return;

    const newJob: ConversionJob = {
      id: Date.now().toString(),
      title: `YouTube Video - ${new Date().toLocaleString()}`,
      url: youtubeUrl,
      status: 'processing',
      progress: 0,
      createdAt: new Date().toISOString()
    };

    setJobs(prev => [newJob, ...prev]);
    setIsProcessing(true);
    setYoutubeUrl('');

    // Simulate processing
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        // Update job with completion
        setJobs(prev => prev.map(job => 
          job.id === newJob.id 
            ? {
                ...job,
                status: 'completed',
                progress: 100,
                clips: [
                  {
                    id: '1',
                    title: 'Best Moment #1',
                    duration: '00:30',
                    thumbnail: 'https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=300'
                  },
                  {
                    id: '2',
                    title: 'Engaging Segment #2',
                    duration: '00:45',
                    thumbnail: 'https://images.pexels.com/photos/1109543/pexels-photo-1109543.jpeg?auto=compress&cs=tinysrgb&w=300'
                  },
                  {
                    id: '3',
                    title: 'Viral Clip #3',
                    duration: '00:20',
                    thumbnail: 'https://images.pexels.com/photos/2067569/pexels-photo-2067569.jpeg?auto=compress&cs=tinysrgb&w=300'
                  }
                ]
              }
            : job
        ));
        setIsProcessing(false);
      } else {
        setJobs(prev => prev.map(job => 
          job.id === newJob.id 
            ? { ...job, progress }
            : job
        ));
      }
    }, 1000);

    // Save jobs to localStorage
    localStorage.setItem('conversion_jobs', JSON.stringify([newJob, ...jobs]));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'processing':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                  <Scissors className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ClipForge
                </span>
              </Link>
              <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs sm:text-sm">
                Pro Plan
              </Badge>
            </div>
            
            {/* Desktop User Menu */}
            <div className="hidden md:flex items-center space-x-4">
              <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.name?.[0]?.toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="hidden lg:block">
                <div className="font-medium text-sm sm:text-base">{user.name}</div>
                <div className="text-xs sm:text-sm text-gray-500">{user.email}</div>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout} className="text-xs sm:text-sm">
                <LogOut className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Logout
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-gray-600" />
              ) : (
                <Menu className="h-5 w-5 text-gray-600" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-3 mb-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.name?.[0]?.toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-sm">{user.name}</div>
                  <div className="text-xs text-gray-500">{user.email}</div>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout} className="w-full text-sm">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          )}
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-sm sm:text-base text-gray-600">Convert your YouTube content into engaging short clips</p>
        </div>

        <Tabs defaultValue="convert" className="space-y-4 sm:space-y-6">
          <TabsList className="grid w-full grid-cols-3 text-xs sm:text-sm">
            <TabsTrigger value="convert">Convert</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="convert" className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
              {/* Input Form */}
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4 sm:pb-6">
                  <CardTitle className="flex items-center text-lg sm:text-xl">
                    <Upload className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    Convert YouTube Video
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Paste your YouTube URL and let AI create engaging clips
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="youtube-url" className="text-sm sm:text-base">YouTube Video URL</Label>
                    <div className="relative">
                      <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="youtube-url"
                        type="url"
                        placeholder="https://www.youtube.com/watch?v=..."
                        className="pl-10 text-sm sm:text-base"
                        value={youtubeUrl}
                        onChange={(e) => setYoutubeUrl(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="gemini-key" className="text-sm sm:text-base">Gemini API Key</Label>
                    <div className="relative">
                      <Key className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="gemini-key"
                        type="password"
                        placeholder="Enter your Gemini API key"
                        className="pl-10 text-sm sm:text-base"
                        value={geminiKey}
                        onChange={(e) => setGeminiKey(e.target.value)}
                        onBlur={saveGeminiKey}
                      />
                    </div>
                    <p className="text-xs text-gray-500">
                      Your API key is stored securely and never shared
                    </p>
                  </div>

                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-sm sm:text-base"
                    onClick={handleConversion}
                    disabled={!youtubeUrl || !geminiKey || isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Clock className="h-4 w-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Zap className="h-4 w-4 mr-2" />
                        Start Conversion
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4 sm:pb-6">
                  <CardTitle className="text-lg sm:text-xl">Recent Conversions</CardTitle>
                  <CardDescription className="text-sm sm:text-base">Your latest video processing activity</CardDescription>
                </CardHeader>
                <CardContent>
                  {jobs.length === 0 ? (
                    <div className="text-center py-6 sm:py-8 text-gray-500">
                      <Scissors className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-4 opacity-50" />
                      <p className="text-sm sm:text-base">No conversions yet</p>
                      <p className="text-xs sm:text-sm">Start by adding a YouTube URL above</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {jobs.slice(0, 3).map((job) => (
                        <div key={job.id} className="border rounded-lg p-3 sm:p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(job.status)}
                              <span className="font-medium text-sm sm:text-base truncate">{job.title}</span>
                            </div>
                            <Badge className={`${getStatusColor(job.status)} text-xs`}>
                              {job.status}
                            </Badge>
                          </div>
                          {job.status === 'processing' && (
                            <Progress value={job.progress} className="mb-2" />
                          )}
                          {job.clips && (
                            <div className="text-xs sm:text-sm text-gray-600">
                              {job.clips.length} clips generated
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4 sm:space-y-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Conversion History</CardTitle>
                <CardDescription className="text-sm sm:text-base">All your video conversion jobs</CardDescription>
              </CardHeader>
              <CardContent>
                {jobs.length === 0 ? (
                  <div className="text-center py-8 sm:py-12 text-gray-500">
                    <Scissors className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-4 opacity-50" />
                    <h3 className="text-base sm:text-lg font-medium mb-2">No conversions yet</h3>
                    <p className="text-sm sm:text-base">Start converting your first YouTube video to see it here</p>
                  </div>
                ) : (
                  <div className="space-y-4 sm:space-y-6">
                    {jobs.map((job) => (
                      <Card key={job.id} className="border">
                        <CardContent className="pt-4 sm:pt-6">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 space-y-2 sm:space-y-0">
                            <div>
                              <h3 className="font-medium text-sm sm:text-base">{job.title}</h3>
                              <p className="text-xs sm:text-sm text-gray-500">
                                {new Date(job.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(job.status)}
                              <Badge className={`${getStatusColor(job.status)} text-xs`}>
                                {job.status}
                              </Badge>
                            </div>
                          </div>
                          
                          {job.status === 'processing' && (
                            <div className="mb-4">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs sm:text-sm text-gray-600">Processing...</span>
                                <span className="text-xs sm:text-sm text-gray-600">{Math.round(job.progress)}%</span>
                              </div>
                              <Progress value={job.progress} />
                            </div>
                          )}

                          {job.clips && job.clips.length > 0 && (
                            <div>
                              <h4 className="font-medium mb-3 text-sm sm:text-base">Generated Clips</h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                                {job.clips.map((clip) => (
                                  <div key={clip.id} className="border rounded-lg p-3">
                                    <img 
                                      src={clip.thumbnail} 
                                      alt={clip.title}
                                      className="w-full h-20 sm:h-24 object-cover rounded mb-2"
                                    />
                                    <h5 className="font-medium text-xs sm:text-sm mb-1 truncate">{clip.title}</h5>
                                    <div className="flex items-center justify-between">
                                      <span className="text-xs text-gray-500">{clip.duration}</span>
                                      <Button size="sm" variant="outline" className="text-xs">
                                        <Download className="h-3 w-3 mr-1" />
                                        Download
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg sm:text-xl">
                    <Settings className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    API Configuration
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">Configure your API keys and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="settings-gemini-key" className="text-sm sm:text-base">Gemini API Key</Label>
                    <div className="relative">
                      <Key className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="settings-gemini-key"
                        type="password"
                        placeholder="Enter your Gemini API key"
                        className="pl-10 text-sm sm:text-base"
                        value={geminiKey}
                        onChange={(e) => setGeminiKey(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button onClick={saveGeminiKey} className="w-full text-sm sm:text-base">
                    Save API Key
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Account Information</CardTitle>
                  <CardDescription className="text-sm sm:text-base">Your account details and usage</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm sm:text-base">Email</Label>
                    <Input value={user.email} disabled className="text-sm sm:text-base" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm sm:text-base">Name</Label>
                    <Input value={user.name} disabled className="text-sm sm:text-base" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm sm:text-base">Plan</Label>
                    <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs sm:text-sm">
                      Pro Plan
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}