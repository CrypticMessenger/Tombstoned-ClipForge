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
  Zap
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
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Scissors className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ClipForge
              </span>
            </Link>
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              Pro Plan
            </Badge>
          </div>
          
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.name?.[0]?.toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <div className="font-medium">{user.name}</div>
              <div className="text-sm text-gray-500">{user.email}</div>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Convert your YouTube content into engaging short clips</p>
        </div>

        <Tabs defaultValue="convert" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="convert">Convert Video</TabsTrigger>
            <TabsTrigger value="history">Conversion History</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="convert" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Input Form */}
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Upload className="h-5 w-5 mr-2" />
                    Convert YouTube Video
                  </CardTitle>
                  <CardDescription>
                    Paste your YouTube URL and let AI create engaging clips
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="youtube-url">YouTube Video URL</Label>
                    <div className="relative">
                      <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="youtube-url"
                        type="url"
                        placeholder="https://www.youtube.com/watch?v=..."
                        className="pl-10"
                        value={youtubeUrl}
                        onChange={(e) => setYoutubeUrl(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="gemini-key">Gemini API Key</Label>
                    <div className="relative">
                      <Key className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="gemini-key"
                        type="password"
                        placeholder="Enter your Gemini API key"
                        className="pl-10"
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
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
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
                <CardHeader>
                  <CardTitle>Recent Conversions</CardTitle>
                  <CardDescription>Your latest video processing activity</CardDescription>
                </CardHeader>
                <CardContent>
                  {jobs.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Scissors className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No conversions yet</p>
                      <p className="text-sm">Start by adding a YouTube URL above</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {jobs.slice(0, 3).map((job) => (
                        <div key={job.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(job.status)}
                              <span className="font-medium">{job.title}</span>
                            </div>
                            <Badge className={getStatusColor(job.status)}>
                              {job.status}
                            </Badge>
                          </div>
                          {job.status === 'processing' && (
                            <Progress value={job.progress} className="mb-2" />
                          )}
                          {job.clips && (
                            <div className="text-sm text-gray-600">
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

          <TabsContent value="history" className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Conversion History</CardTitle>
                <CardDescription>All your video conversion jobs</CardDescription>
              </CardHeader>
              <CardContent>
                {jobs.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <Scissors className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-medium mb-2">No conversions yet</h3>
                    <p>Start converting your first YouTube video to see it here</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {jobs.map((job) => (
                      <Card key={job.id} className="border">
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h3 className="font-medium">{job.title}</h3>
                              <p className="text-sm text-gray-500">
                                {new Date(job.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(job.status)}
                              <Badge className={getStatusColor(job.status)}>
                                {job.status}
                              </Badge>
                            </div>
                          </div>
                          
                          {job.status === 'processing' && (
                            <div className="mb-4">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-gray-600">Processing...</span>
                                <span className="text-sm text-gray-600">{Math.round(job.progress)}%</span>
                              </div>
                              <Progress value={job.progress} />
                            </div>
                          )}

                          {job.clips && job.clips.length > 0 && (
                            <div>
                              <h4 className="font-medium mb-3">Generated Clips</h4>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {job.clips.map((clip) => (
                                  <div key={clip.id} className="border rounded-lg p-3">
                                    <img 
                                      src={clip.thumbnail} 
                                      alt={clip.title}
                                      className="w-full h-24 object-cover rounded mb-2"
                                    />
                                    <h5 className="font-medium text-sm mb-1">{clip.title}</h5>
                                    <div className="flex items-center justify-between">
                                      <span className="text-xs text-gray-500">{clip.duration}</span>
                                      <Button size="sm" variant="outline">
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

          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="h-5 w-5 mr-2" />
                    API Configuration
                  </CardTitle>
                  <CardDescription>Configure your API keys and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="settings-gemini-key">Gemini API Key</Label>
                    <div className="relative">
                      <Key className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="settings-gemini-key"
                        type="password"
                        placeholder="Enter your Gemini API key"
                        className="pl-10"
                        value={geminiKey}
                        onChange={(e) => setGeminiKey(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button onClick={saveGeminiKey} className="w-full">
                    Save API Key
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>Your account details and usage</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input value={user.email} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input value={user.name} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Plan</Label>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
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