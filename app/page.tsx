'use client';

import React, { useState, useEffect } from 'react';
import { Users, Lightbulb, Target, Award, Calendar, MapPin, ArrowRight, Code, Heart, Rocket, Zap, Menu, X, Sparkles, Building2, Brain, Briefcase, GraduationCap, Github, Twitter, Linkedin, Mail, Star, TreePine, Laptop, ChevronDown } from 'lucide-react';

export default function HackTheGapLanding() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="bg-[#FAFAFA] text-black min-h-screen">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all ${
        scrolled ? 'bg-white border-b-4 border-black' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#00D9C0] border-4 border-black flex items-center justify-center font-black text-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                H
              </div>
              <span className="text-2xl font-black tracking-tight">
                Hack the Gap
              </span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              <button onClick={() => scrollToSection('about')} className="font-bold hover:text-[#00D9C0] transition-colors">About</button>
              <button onClick={() => scrollToSection('principles')} className="font-bold hover:text-[#00D9C0] transition-colors">Principles</button>
              <button onClick={() => scrollToSection('audiences')} className="font-bold hover:text-[#00D9C0] transition-colors">Join</button>
              <button onClick={() => scrollToSection('details')} className="font-bold hover:text-[#00D9C0] transition-colors">Details</button>
              <button className="bg-[#00D9C0] border-4 border-black px-6 py-2 font-black uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all">
                Apply Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden w-12 h-12 bg-[#00D9C0] border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} strokeWidth={3} /> : <Menu size={24} strokeWidth={3} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-6 pb-4 border-t-4 border-black pt-4">
              <div className="flex flex-col gap-4">
                <button onClick={() => scrollToSection('about')} className="text-left font-bold text-lg">About</button>
                <button onClick={() => scrollToSection('principles')} className="text-left font-bold text-lg">Principles</button>
                <button onClick={() => scrollToSection('audiences')} className="text-left font-bold text-lg">Join</button>
                <button onClick={() => scrollToSection('details')} className="text-left font-bold text-lg">Details</button>
                <button className="bg-[#00D9C0] border-4 border-black px-6 py-3 font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  Apply Now
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-20 pb-20 min-h-screen flex items-center overflow-hidden bg-[#F0F0F0]">
        {/* Large Decorative Background Shapes */}
        <div className="absolute top-20 right-[5%] w-28 h-28 bg-[#FFD93D] border-4 border-black rotate-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hidden lg:block"></div>
        <div className="absolute top-32 left-[8%] w-32 h-32 bg-[#FF6B9D] border-4 border-black -rotate-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hidden lg:block"></div>
        <div className="absolute bottom-20 right-[15%] w-24 h-24 bg-[#C996FF] border-4 border-black rotate-45 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hidden lg:block"></div>
        <div className="absolute top-[30%] right-[20%] w-16 h-16 bg-[#6BCF7F] border-4 border-black -rotate-12 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hidden xl:block"></div>
        <div className="absolute bottom-16 left-[10%] w-20 h-20 bg-[#00D9C0] border-4 border-black rotate-12 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hidden lg:block"></div>
        
        {/* Floating Icons */}
        <div className="absolute top-20 left-[12%] hidden xl:block">
          <div className="w-16 h-16 bg-[#FFD93D] border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center rotate-6">
            <Laptop strokeWidth={3} size={28} />
          </div>
        </div>
        <div className="absolute top-[45%] left-[5%] hidden xl:block">
          <div className="w-16 h-16 bg-[#FF6B9D] border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center -rotate-12">
            <Brain strokeWidth={3} size={28} />
          </div>
        </div>
        <div className="absolute bottom-28 right-[8%] hidden xl:block">
          <div className="w-16 h-16 bg-[#00D9C0] border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center rotate-12">
            <Lightbulb strokeWidth={3} size={28} />
          </div>
        </div>

        <div className="container mx-auto px-3 sm:px-6 relative z-10 w-full">
          <div className="max-w-6xl mx-auto">
            {/* Date Badge */}
            <div className="mb-3 sm:mb-6">
              <div className="bg-[#FFD93D] border-3 sm:border-4 border-black px-2 sm:px-6 py-1.5 sm:py-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] inline-flex items-center gap-1.5 sm:gap-3 font-black text-[0.65rem] sm:text-sm flex-wrap">
                <Calendar className="w-3.5 h-3.5 sm:w-5 sm:h-5" strokeWidth={3} />
                <span className="hidden sm:inline">November 15-16, 2025</span>
                <span className="sm:hidden">Nov 15-16</span>
                <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-black"></span>
                <MapPin className="w-3.5 h-3.5 sm:w-5 sm:h-5" strokeWidth={3} />
                <span className="sm:hidden">42 Paris</span>
                <span className="hidden sm:inline">42 Paris</span>
              </div>
            </div>
            
            {/* Main Headline with COLORED TEXT */}
            <div className="mb-3 sm:mb-6 relative overflow-hidden">
              <h1 className="text-[2rem] xs:text-[2.5rem] sm:text-[4rem] md:text-[6rem] lg:text-[7.5rem] font-black mb-2 sm:mb-4 leading-[0.9] tracking-tighter">
                <span className="block">
                  <span className="bg-gradient-to-r from-[#00D9C0] via-[#FFD93D] to-[#FF6B9D] border-3 sm:border-4 border-black px-2 py-1.5 sm:px-6 sm:py-3 inline-block shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] -rotate-1 max-w-full break-words">
                    HACK THE GAP!
                  </span>
                </span>
              </h1>
            </div>
            
            <div className="mb-4 sm:mb-6 relative">
              {/* Decorative squares */}
              <div className="absolute -right-8 top-4 w-12 h-12 bg-[#C996FF] border-4 border-black rotate-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hidden lg:block -z-10"></div>
              <div className="absolute -left-16 bottom-4 w-8 h-8 bg-[#6BCF7F] border-4 border-black -rotate-12 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hidden lg:block -z-10"></div>
              
              <p className="text-sm sm:text-xl md:text-2xl font-bold leading-tight mb-2 sm:mb-4 relative z-10">
                Start building <span className="bg-[#00D9C0] border-3 sm:border-4 border-black px-1.5 py-0.5 sm:px-3 sm:py-1 inline-block shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-1">impactful products</span>
              </p>
              <p className="text-xs sm:text-lg md:text-xl font-bold leading-tight relative z-10">
                Where <span className="bg-[#FFD93D] border-3 sm:border-4 border-black px-1.5 py-0.5 sm:px-3 sm:py-1 inline-block shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-1">expert challenges</span> meet <span className="bg-[#FF6B9D] border-3 sm:border-4 border-black px-1.5 py-0.5 sm:px-3 sm:py-1 inline-block shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-1">product craft</span>
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-4 mb-4 sm:mb-6">
              <button className="group bg-[#00D9C0] border-3 sm:border-4 border-black px-4 sm:px-8 py-2.5 sm:py-4 font-black text-xs sm:text-base uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] sm:hover:translate-x-[3px] sm:hover:translate-y-[3px] transition-all flex items-center justify-center gap-1.5 sm:gap-2">
                <Rocket strokeWidth={3} size={16} className="sm:w-5 sm:h-5" />
                <span className="whitespace-nowrap">Apply as Builder</span>
                <ArrowRight strokeWidth={3} size={16} className="sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-[#FFD93D] border-3 sm:border-4 border-black px-4 sm:px-8 py-2.5 sm:py-4 font-black text-xs sm:text-base uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] sm:hover:translate-x-[3px] sm:hover:translate-y-[3px] transition-all flex items-center justify-center gap-1.5 sm:gap-2">
                <Target strokeWidth={3} size={16} className="sm:w-5 sm:h-5" />
                <span className="whitespace-nowrap">Propose Challenge</span>
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
              {[
                { number: '100+', label: 'PRODUCT BUILDERS', bgColor: '#00D9C0' },
                { number: '10-15', label: 'EXPERT MENTORS', bgColor: '#FFD93D' },
                { number: '48HRS', label: 'INTENSE BUILDING', bgColor: '#FF6B9D' },
                { number: '10+', label: 'VIABLE PRODUCTS', bgColor: '#C996FF' }
              ].map((stat, i) => (
                <div 
                  key={i} 
                  className="border-3 sm:border-4 border-black p-2 sm:p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] sm:hover:translate-x-[3px] sm:hover:translate-y-[3px] transition-all"
                  style={{ backgroundColor: stat.bgColor }}
                >
                  <div className="text-2xl sm:text-4xl font-black mb-0.5 sm:mb-1">
                    {stat.number}
                  </div>
                  <div className="text-[0.5rem] sm:text-[0.6rem] font-black uppercase tracking-wide leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <button 
            onClick={() => scrollToSection('about')}
            className="flex flex-col items-center gap-1 sm:gap-2 group cursor-pointer"
            aria-label="Scroll to learn more"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FFD93D] border-3 sm:border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center group-hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all">
              <ChevronDown strokeWidth={3} className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </button>
        </div>
      </section>

      {/* The Thesis Section */}
      <section id="about" className="py-32 bg-white border-y-4 border-black">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <div className="inline-block mb-8">
                <div className="w-24 h-24 bg-[#FFD93D] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center mx-auto">
                  <Lightbulb size={48} strokeWidth={3} />
                </div>
              </div>
              <h2 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter">
                THE NEW REALITY
              </h2>
              <p className="text-2xl md:text-3xl font-bold leading-tight max-w-4xl mx-auto">
                When code becomes trivial with AI, the quality of <span className="bg-[#00D9C0] px-2">ideation</span> and turning ideas into <span className="bg-[#FFD93D] px-2">products people want</span> become the only differentiators.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* The Problem */}
              <div className="bg-[#FF6B9D] border-4 border-black p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-black flex items-center justify-center">
                    <X className="text-white" size={32} strokeWidth={4} />
                  </div>
                  <h3 className="text-4xl font-black">THE PROBLEM</h3>
                </div>
                <div className="space-y-6 text-xl font-bold leading-relaxed">
                  <p>Traditional hackathons waste time on <span className="bg-white px-2">shallow brainstorming</span>, producing technically impressive demos that solve <span className="bg-white px-2">non-existent problems</span>.</p>
                  <p>Experts with deep domain knowledge lack the <span className="bg-white px-2">product craft</span> to transform insights into solutions people actually use.</p>
                </div>
              </div>

              {/* The Solution */}
              <div className="bg-[#00D9C0] border-4 border-black p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-black flex items-center justify-center">
                    <Target className="text-white" size={32} strokeWidth={3} />
                  </div>
                  <h3 className="text-4xl font-black">THE SOLUTION</h3>
                </div>
                <div className="space-y-6 text-xl font-bold leading-relaxed">
                  <p><span className="bg-black text-white px-2 py-1">EXPERTS</span> (NGOs, researchers, professionals) define thoughtful challenges based on real-world expertise.</p>
                  <p><span className="bg-black text-white px-2 py-1">PRODUCT BUILDERS</span> transform these visions into usable products in one weekend.</p>
                  <div className="mt-8 pt-6 border-t-4 border-black">
                    <p className="text-2xl font-black">
                      Domain Expertise + Product Craft = Solutions That Matter
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Principles Section */}
      <section id="principles" className="py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-block mb-8">
              <div className="w-24 h-24 bg-[#00D9C0] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center mx-auto">
                <Star size={48} strokeWidth={3} className="fill-black" />
              </div>
            </div>
            <h2 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter">
              THE 5 PRINCIPLES
            </h2>
            <p className="text-2xl font-bold">Our manifesto for the AI era</p>
          </div>

          <div className="max-w-5xl mx-auto space-y-6">
            {[
              {
                number: '01',
                title: 'Tech is commodity, product is value',
                description: 'Code is free, user experience is precious',
                color: '#00D9C0'
              },
              {
                number: '02',
                title: 'Expert problems deserve product solutions',
                description: 'Not just technical demos',
                color: '#FFD93D'
              },
              {
                number: '03',
                title: 'Great products need both vision AND craft',
                description: 'Ideas alone are not enough',
                color: '#FF6B9D'
              },
              {
                number: '04',
                title: 'Builders aren\'t coders, they\'re product creators',
                description: 'Focus on experience, not the stack',
                color: '#C996FF'
              },
              {
                number: '05',
                title: 'User impact > technical elegance',
                description: 'What matters is adoption',
                color: '#6BCF7F'
              }
            ].map((principle, i) => (
              <div 
                key={i}
                className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all"
              >
                <div className="flex items-center gap-6">
                  <div 
                    className="w-20 h-20 flex-shrink-0 border-4 border-black flex items-center justify-center text-3xl font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    style={{ backgroundColor: principle.color }}
                  >
                    {principle.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-black mb-2 leading-tight">{principle.title}</h3>
                    <p className="text-lg font-bold opacity-70">{principle.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audiences Section */}
      <section id="audiences" className="py-32 bg-white border-y-4 border-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-block mb-8">
              <div className="w-24 h-24 bg-[#FF6B9D] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center mx-auto">
                <Users size={48} strokeWidth={3} />
              </div>
            </div>
            <h2 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter">
              WHO SHOULD JOIN
            </h2>
            <p className="text-2xl font-bold">Four paths to create impact</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Product Builders */}
            <div className="bg-[#00D9C0] border-4 border-black p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all">
              <div className="w-20 h-20 bg-black border-4 border-black flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                <Rocket size={40} strokeWidth={3} className="text-[#00D9C0]" />
              </div>
              <h3 className="text-4xl font-black mb-4 uppercase">Product Builders</h3>
              <p className="text-lg font-bold mb-6 leading-relaxed">
                Product-minded creators who use AI tools to build experiences people love. Obsessed with user needs, not tech stacks.
              </p>
              <ul className="space-y-3 mb-8 font-bold">
                <li className="flex items-start gap-2">
                  <span className="text-2xl">▸</span>
                  <span>Leverage AI tools (Claude, GPT, Cursor)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-2xl">▸</span>
                  <span>Focus on product craft over coding</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-2xl">▸</span>
                  <span>Build solutions people actually use</span>
                </li>
              </ul>
              <button className="w-full bg-black text-[#00D9C0] border-4 border-black px-6 py-4 font-black uppercase shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all flex items-center justify-center gap-2">
                Apply as Builder
                <ArrowRight strokeWidth={3} size={20} />
              </button>
            </div>

            {/* Expert Partners */}
            <div className="bg-[#FFD93D] border-4 border-black p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all">
              <div className="w-20 h-20 bg-black border-4 border-black flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                <Target size={40} strokeWidth={3} className="text-[#FFD93D]" />
              </div>
              <h3 className="text-4xl font-black mb-4 uppercase">Expert Partners</h3>
              <p className="text-lg font-bold mb-6 leading-relaxed">
                NGOs, researchers, and professionals with field experience who define challenges worth solving.
              </p>
              <ul className="space-y-3 mb-8 font-bold">
                <li className="flex items-start gap-2">
                  <span className="text-2xl">▸</span>
                  <span>Share your domain expertise</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-2xl">▸</span>
                  <span>Get usable solutions in 48 hours</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-2xl">▸</span>
                  <span>No development costs</span>
                </li>
              </ul>
              <button className="w-full bg-black text-[#FFD93D] border-4 border-black px-6 py-4 font-black uppercase shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all flex items-center justify-center gap-2">
                Submit Challenge
                <ArrowRight strokeWidth={3} size={20} />
              </button>
            </div>

            {/* Sponsors */}
            <div className="bg-[#FF6B9D] border-4 border-black p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all">
              <div className="w-20 h-20 bg-black border-4 border-black flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                <Award size={40} strokeWidth={3} className="text-[#FF6B9D]" />
              </div>
              <h3 className="text-4xl font-black mb-4 uppercase">Sponsors</h3>
              <p className="text-lg font-bold mb-6 leading-relaxed">
                Tech companies who want their tools used for positive impact and connect with product-minded talent.
              </p>
              <ul className="space-y-3 mb-8 font-bold">
                <li className="flex items-start gap-2">
                  <span className="text-2xl">▸</span>
                  <span>Showcase your product&apos;s impact</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-2xl">▸</span>
                  <span>Connect with next-gen builders</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-2xl">▸</span>
                  <span>Support real-world solutions</span>
                </li>
              </ul>
              <button className="w-full bg-black text-[#FF6B9D] border-4 border-black px-6 py-4 font-black uppercase shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all flex items-center justify-center gap-2">
                Become Sponsor
                <ArrowRight strokeWidth={3} size={20} />
              </button>
            </div>

            {/* Academic Institutions */}
            <div className="bg-[#C996FF] border-4 border-black p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all">
              <div className="w-20 h-20 bg-black border-4 border-black flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                <GraduationCap size={40} strokeWidth={3} className="text-[#C996FF]" />
              </div>
              <h3 className="text-4xl font-black mb-4 uppercase">Academic Institutions</h3>
              <p className="text-lg font-bold mb-6 leading-relaxed">
                Universities teaching product craft, not just code. Connect students with real impact opportunities.
              </p>
              <ul className="space-y-3 mb-8 font-bold">
                <li className="flex items-start gap-2">
                  <span className="text-2xl">▸</span>
                  <span>Prove applied value of research</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-2xl">▸</span>
                  <span>Develop modern product skills</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-2xl">▸</span>
                  <span>Visibility on concrete innovation</span>
                </li>
              </ul>
              <button className="w-full bg-black text-[#C996FF] border-4 border-black px-6 py-4 font-black uppercase shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all flex items-center justify-center gap-2">
                Partner With Us
                <ArrowRight strokeWidth={3} size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section id="details" className="py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-20">
              <div className="inline-block mb-8">
                <div className="w-24 h-24 bg-[#6BCF7F] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center mx-auto">
                  <Calendar size={48} strokeWidth={3} />
                </div>
              </div>
              <h2 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter">
                EVENT DETAILS
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-[#00D9C0] border-4 border-black p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <Calendar size={56} strokeWidth={3} className="mb-6" />
                <h3 className="text-3xl font-black mb-3 uppercase">When</h3>
                <p className="text-2xl font-black mb-2">October 23-24, 2025</p>
                <p className="text-lg font-bold">One intense weekend</p>
              </div>

              <div className="bg-[#FFD93D] border-4 border-black p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <MapPin size={56} strokeWidth={3} className="mb-6" />
                <h3 className="text-3xl font-black mb-3 uppercase">Where</h3>
                <p className="text-2xl font-black mb-2">42 Paris</p>
                <p className="text-lg font-bold">The iconic coding school</p>
              </div>
            </div>

            <div className="bg-white border-4 border-black p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-3xl font-black mb-10 uppercase flex items-center gap-3">
                <Sparkles size={32} strokeWidth={3} />
                The Weekend Flow
              </h3>
              <div className="space-y-8">
                {[
                  {
                    num: 1,
                    title: 'Challenge Design',
                    subtitle: 'Weeks Before',
                    desc: 'Partner organizations document challenges. Organizers transform into actionable product briefs.',
                    color: '#00D9C0'
                  },
                  {
                    num: 2,
                    title: 'Immersion',
                    subtitle: 'Friday Evening',
                    desc: 'Deep dive with experts. Workshops to understand stakes. Teams become co-owners of problems.',
                    color: '#FFD93D'
                  },
                  {
                    num: 3,
                    title: 'Building',
                    subtitle: 'Weekend',
                    desc: 'Create with AI tools. Focus on product craft. Prove you can build AND drive adoption.',
                    color: '#FF6B9D'
                  }
                ].map((step) => (
                  <div key={step.num} className="flex gap-6 items-start">
                    <div 
                      className="w-16 h-16 flex-shrink-0 border-4 border-black flex items-center justify-center text-2xl font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                      style={{ backgroundColor: step.color }}
                    >
                      {step.num}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-3 mb-2">
                        <h4 className="font-black text-2xl uppercase">{step.title}</h4>
                        <span className="text-sm font-black uppercase bg-black text-white px-2 py-1">{step.subtitle}</span>
                      </div>
                      <p className="text-lg font-bold leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mantras */}
      <section className="py-32 bg-black text-white border-y-4 border-black">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto space-y-16">
            {[
              "When everyone can code, creating products people love becomes everything.",
              "Stop celebrating technical demos. Start shipping real products.",
              "AI writes code. Humans create experiences.",
              "The best products come from real problems, properly understood.",
              "Build less, but build better."
            ].map((mantra, i) => (
              <div key={i} className="relative">
                <div className="text-3xl md:text-5xl font-black text-center leading-tight">
                  &quot;{mantra}&quot;
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="bg-[#00D9C0] border-4 border-black p-16 shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] text-center">
              <div className="mb-8">
                <div className="w-24 h-24 bg-black border-4 border-black flex items-center justify-center mx-auto shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
                  <Sparkles size={48} strokeWidth={3} className="text-[#00D9C0]" />
                </div>
              </div>
              <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight uppercase">
                Ready to Build<br />Solutions That<br />Actually Matter?
              </h2>
              <p className="text-2xl font-bold mb-12 max-w-3xl mx-auto leading-tight">
                Join us for a weekend where expertise meets execution, and real problems find thoughtful solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="bg-black text-[#00D9C0] border-4 border-black px-12 py-6 font-black text-xl uppercase shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all flex items-center justify-center gap-3">
                  <Rocket strokeWidth={3} size={24} />
                  Apply Now
                </button>
                <button className="bg-white border-4 border-black px-12 py-6 font-black text-xl uppercase shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all flex items-center justify-center gap-3">
                  <Mail strokeWidth={3} size={24} />
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-4 border-black py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-[#00D9C0] border-4 border-black flex items-center justify-center font-black text-3xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                H
              </div>
              <span className="text-3xl font-black">
                Hack the Gap
              </span>
            </div>
            <div className="flex gap-4">
              {[
                { icon: Twitter, label: 'Twitter' },
                { icon: Linkedin, label: 'LinkedIn' },
                { icon: Github, label: 'GitHub' },
                { icon: Mail, label: 'Email' }
              ].map(({ icon: Icon, label }) => (
                <a 
                  key={label}
                  href="#" 
                  className="w-14 h-14 bg-white border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                  aria-label={label}
                >
                  <Icon strokeWidth={3} size={24} />
                </a>
              ))}
            </div>
          </div>
          <div className="text-center border-t-4 border-black pt-8">
            <p className="font-black text-lg mb-2">© 2025 Hack the Gap</p>
            <p className="font-bold">Building products that matter</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
