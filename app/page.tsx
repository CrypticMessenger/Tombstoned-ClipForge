'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play, Scissors, Zap, Shield, Clock, Users, Star, Check, X, Menu, XIcon } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const pricingPlans = [
    {
      name: "Starter",
      price: "Free",
      period: "forever",
      description: "Perfect for trying out ClipForge",
      features: [
        "5 video conversions per month",
        "Up to 3 clips per video",
        "720p output quality",
        "Basic AI analysis",
        "Email support"
      ],
      limitations: [
        "No priority processing",
        "No custom branding",
        "No API access"
      ],
      popular: false,
      cta: "Get Started Free"
    },
    {
      name: "Pro",
      price: "$29",
      period: "per month",
      description: "For serious content creators",
      features: [
        "50 video conversions per month",
        "Up to 10 clips per video",
        "1080p output quality",
        "Advanced AI analysis",
        "Priority processing",
        "Custom thumbnails",
        "Priority support",
        "Analytics dashboard"
      ],
      limitations: [
        "No API access",
        "No white-label solution"
      ],
      popular: true,
      cta: "Start Pro Trial"
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "per month",
      description: "For agencies and large creators",
      features: [
        "Unlimited video conversions",
        "Unlimited clips per video",
        "4K output quality",
        "Advanced AI with custom models",
        "Instant processing",
        "Custom branding",
        "API access",
        "Dedicated account manager",
        "Custom integrations",
        "White-label solution"
      ],
      limitations: [],
      popular: false,
      cta: "Contact Sales"
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <Scissors className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ClipForge
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('features')} 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('how-it-works')} 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              How it Works
            </button>
            <button 
              onClick={() => scrollToSection('pricing')} 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Pricing
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')} 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Testimonials
            </button>
            <Link href="/auth">
              <Button variant="outline" className="mr-2">Sign In</Button>
            </Link>
            <Link href="/auth">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Get Started
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <XIcon className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="container mx-auto px-4 py-4 space-y-4">
              <button 
                onClick={() => scrollToSection('features')} 
                className="block w-full text-left text-gray-600 hover:text-gray-900 transition-colors py-2"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('how-it-works')} 
                className="block w-full text-left text-gray-600 hover:text-gray-900 transition-colors py-2"
              >
                How it Works
              </button>
              <button 
                onClick={() => scrollToSection('pricing')} 
                className="block w-full text-left text-gray-600 hover:text-gray-900 transition-colors py-2"
              >
                Pricing
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')} 
                className="block w-full text-left text-gray-600 hover:text-gray-900 transition-colors py-2"
              >
                Testimonials
              </button>
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <Link href="/auth" className="block">
                  <Button variant="outline" className="w-full">Sign In</Button>
                </Link>
                <Link href="/auth" className="block">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 sm:py-20 text-center">
        <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">
          ✨ Powered by Advanced AI Technology
        </Badge>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-6 leading-tight">
          Transform Long Videos
          <br />
          Into Viral Clips
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed px-4">
          Convert your YouTube content into engaging short-form videos automatically. 
          Let AI identify the best moments and create clips that drive engagement and growth.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 px-4">
          <Link href="/auth">
            <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 text-lg">
              Start Converting Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 py-4 text-lg">
            <Play className="mr-2 h-5 w-5" />
            Watch Demo
          </Button>
        </div>
        
        {/* Stats */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-6 sm:gap-8 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900">10,000+</div>
            <div className="text-sm sm:text-base text-gray-600">Videos Processed</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900">5M+</div>
            <div className="text-sm sm:text-base text-gray-600">Clips Generated</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900">98%</div>
            <div className="text-sm sm:text-base text-gray-600">Accuracy Rate</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-12 sm:py-20">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Everything you need to create compelling short-form content from your long videos
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-gray-50 rounded-full w-fit">
                  {feature.icon}
                </div>
                <CardTitle className="text-lg sm:text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-center text-sm sm:text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="bg-white/50 backdrop-blur-sm py-12 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Simple 3-step process to transform your content
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center text-xl sm:text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Upload YouTube Link</h3>
              <p className="text-gray-600 text-sm sm:text-base px-4">Paste your YouTube video URL and let our AI analyze the content</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center text-xl sm:text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">AI Processing</h3>
              <p className="text-gray-600 text-sm sm:text-base px-4">Our AI identifies key moments and creates engaging short clips</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center text-xl sm:text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Download & Share</h3>
              <p className="text-gray-600 text-sm sm:text-base px-4">Get your processed clips ready for social media platforms</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container mx-auto px-4 py-12 sm:py-20">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Choose the perfect plan for your content creation needs
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <Card key={index} className={`relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white ${plan.popular ? 'ring-2 ring-blue-500 lg:scale-105' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}
              <CardHeader className="text-center pb-6 sm:pb-8">
                <CardTitle className="text-xl sm:text-2xl font-bold">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-3xl sm:text-4xl font-bold text-gray-900">{plan.price}</span>
                  {plan.price !== "Free" && <span className="text-gray-600 ml-2 text-sm sm:text-base">{plan.period}</span>}
                </div>
                <CardDescription className="mt-2 text-sm sm:text-base">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                <div className="space-y-2 sm:space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start">
                      <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm sm:text-base">{feature}</span>
                    </div>
                  ))}
                  {plan.limitations.map((limitation, limitationIndex) => (
                    <div key={limitationIndex} className="flex items-start opacity-60">
                      <X className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-500 text-sm sm:text-base">{limitation}</span>
                    </div>
                  ))}
                </div>
                <Link href="/auth" className="block">
                  <Button 
                    className={`w-full ${plan.popular 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' 
                      : 'bg-gray-900 hover:bg-gray-800'
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8 sm:mt-12 px-4">
          <p className="text-gray-600 mb-4 text-sm sm:text-base">All plans include a 14-day free trial. No credit card required.</p>
          <p className="text-xs sm:text-sm text-gray-500">
            Need a custom solution? <a href="#" className="text-blue-600 hover:text-blue-800 underline">Contact our sales team</a>
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="bg-white/50 backdrop-blur-sm py-12 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">What Creators Say</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Join thousands of content creators who trust ClipForge
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic text-sm sm:text-base">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm sm:text-base">{testimonial.name}</div>
                    <div className="text-xs sm:text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-12 sm:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Content?
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto px-4">
            Join thousands of creators who are already using ClipForge to grow their audience
          </p>
          <Link href="/auth">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg">
              Get Started for Free
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Scissors className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <span className="text-lg sm:text-xl font-bold">ClipForge</span>
            </div>
            <div className="text-gray-400 text-xs sm:text-sm text-center">
              © 2025 ClipForge. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}