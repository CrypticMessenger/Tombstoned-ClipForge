'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play, Scissors, Zap, Shield, Clock, Users, Star } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  const features = [
    {
      icon: <Scissors className="h-8 w-8 text-blue-500" />,
      title: "Smart Content Extraction",
      description: "AI-powered analysis to identify the most engaging moments from your long-form content"
    },
    {
      icon: <Zap className="h-8 w-8 text-purple-500" />,
      title: "Lightning Fast Processing",
      description: "Convert hours of content into short-form clips in minutes with our optimized workflow"
    },
    {
      icon: <Shield className="h-8 w-8 text-green-500" />,
      title: "Secure & Private",
      description: "Your content and API keys are protected with enterprise-grade security"
    },
    {
      icon: <Clock className="h-8 w-8 text-orange-500" />,
      title: "Time-Saving Automation",
      description: "Automate the tedious process of manual content curation and editing"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Content Creator",
      content: "This tool has revolutionized my content workflow. I can now create 10x more short-form content in the same time!",
      rating: 5
    },
    {
      name: "Mike Rodriguez",
      role: "YouTuber",
      content: "The AI perfectly identifies the most engaging moments. My short-form content now gets 3x more engagement.",
      rating: 5
    },
    {
      name: "Emma Thompson",
      role: "Social Media Manager",
      content: "Game-changer for our agency. We're delivering more value to clients with less manual work.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
            <Scissors className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Azimuth
          </span>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
          <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">How it Works</a>
          <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors">Testimonials</a>
          <Link href="/auth">
            <Button variant="outline" className="mr-2">Sign In</Button>
          </Link>
          <Link href="/auth">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Get Started
            </Button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">
          ✨ Powered by Advanced AI Technology
        </Badge>
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-6 leading-tight">
          Transform Long Videos
          <br />
          Into Viral Clips
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          Convert your YouTube content into engaging short-form videos automatically. 
          Let AI identify the best moments and create clips that drive engagement and growth.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link href="/auth">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 text-lg">
              Start Converting Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
            <Play className="mr-2 h-5 w-5" />
            Watch Demo
          </Button>
        </div>
        
        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-gray-900">10,000+</div>
            <div className="text-gray-600">Videos Processed</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900">5M+</div>
            <div className="text-gray-600">Clips Generated</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900">98%</div>
            <div className="text-gray-600">Accuracy Rate</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to create compelling short-form content from your long videos
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-gray-50 rounded-full w-fit">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-center">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="bg-white/50 backdrop-blur-sm py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple 3-step process to transform your content
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Upload YouTube Link</h3>
              <p className="text-gray-600">Paste your YouTube video URL and let our AI analyze the content</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">AI Processing</h3>
              <p className="text-gray-600">Our AI identifies key moments and creates engaging short clips</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Download & Share</h3>
              <p className="text-gray-600">Get your processed clips ready for social media platforms</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Creators Say</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of content creators who trust Azimuth
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-lg bg-white">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your Content?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of creators who are already using Azimuth to grow their audience
          </p>
          <Link href="/auth">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg">
              Get Started for Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Scissors className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">Azimuth</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2025 Azimuth. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}