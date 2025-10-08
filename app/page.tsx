'use client';

import React, { useState, useEffect } from 'react';
import { Users, Lightbulb, Target, Award, Calendar, MapPin, ArrowRight, Code, Heart, Rocket, Zap, Menu, X, Sparkles, Building2, Brain, Briefcase, GraduationCap, Github, Twitter, Linkedin, Mail, Star, TreePine, Laptop, ChevronDown } from 'lucide-react';
import dynamic from 'next/dynamic';

const ChallengeWizard = dynamic(() => import('./components/ChallengeWizard'), { ssr: false });

type ModalType = 'builder' | 'challenge' | 'sponsor' | 'academic' | 'contact' | null;

export default function HackTheGapLanding() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState<ModalType>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: '',
    experience: '',
    portfolio: ''
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openModal = (type: ModalType) => {
    setModalOpen(type);
    setMobileMenuOpen(false);
  };

  const closeModal = () => {
    setModalOpen(null);
    setFormData({
      name: '',
      email: '',
      organization: '',
      message: '',
      experience: '',
      portfolio: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get the modal type for the email subject
    const subjectMap = {
      builder: 'Product Builder Application',
      sponsor: 'Sponsorship Inquiry',
      academic: 'Academic Partnership',
      contact: 'General Inquiry'
    };
    
    const subject = subjectMap[modalOpen as keyof typeof subjectMap] || 'Hack the Gap Inquiry';
    
    // Create email body
    let body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A`;
    
    if (formData.organization) {
      body += `Organization: ${formData.organization}%0D%0A`;
    }
    
    if (formData.experience) {
      body += `Experience: ${formData.experience}%0D%0A`;
    }
    
    if (formData.portfolio) {
      body += `Portfolio/Links: ${formData.portfolio}%0D%0A`;
    }
    
    if (formData.message) {
      body += `%0D%0AMessage:%0D%0A${formData.message}`;
    }
    
    // Open mailto link
    window.location.href = `mailto:contact@hackthegap.xyz?subject=${encodeURIComponent(subject)}&body=${body}`;
    
    // Close modal after submission
    setTimeout(() => {
      closeModal();
    }, 500);
  };

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
              <button onClick={() => openModal('builder')} className="bg-[#00D9C0] border-4 border-black px-6 py-2 font-black uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all">
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
                <button onClick={() => openModal('builder')} className="bg-[#00D9C0] border-4 border-black px-6 py-3 font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
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
            <div className="mb-3 sm:mb-6 relative">
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
                Stop building <span className="bg-[#FF6B9D] border-3 sm:border-4 border-black px-1.5 py-0.5 sm:px-3 sm:py-1 inline-block shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-1">problems looking for solutions</span>
              </p>
              <p className="text-xs sm:text-lg md:text-xl font-bold leading-tight relative z-10">
                And start solving <span className="bg-[#00D9C0] border-3 sm:border-4 border-black px-1.5 py-0.5 sm:px-3 sm:py-1 inline-block shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-1">challenges that matter</span>
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-4 mb-4 sm:mb-6">
              <button onClick={() => openModal('builder')} className="group bg-[#00D9C0] border-3 sm:border-4 border-black px-4 sm:px-8 py-2.5 sm:py-4 font-black text-xs sm:text-base uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] sm:hover:translate-x-[3px] sm:hover:translate-y-[3px] transition-all flex items-center justify-center gap-1.5 sm:gap-2">
                <Rocket strokeWidth={3} size={16} className="sm:w-5 sm:h-5" />
                <span className="whitespace-nowrap">Apply as Builder</span>
                <ArrowRight strokeWidth={3} size={16} className="sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={() => openModal('challenge')} className="bg-[#FFD93D] border-3 sm:border-4 border-black px-4 sm:px-8 py-2.5 sm:py-4 font-black text-xs sm:text-base uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] sm:hover:translate-x-[3px] sm:hover:translate-y-[3px] transition-all flex items-center justify-center gap-1.5 sm:gap-2">
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
      <section id="about" className="py-16 sm:py-24 md:py-32 bg-white border-y-2 sm:border-y-4 border-black">
        <div className="container mx-auto px-3 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 sm:mb-16 md:mb-20">
              <div className="inline-block mb-4 sm:mb-6 md:mb-8">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-[#FFD93D] border-2 sm:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center mx-auto">
                  <Lightbulb size={32} className="sm:w-10 sm:h-10 md:w-12 md:h-12" strokeWidth={3} />
                </div>
              </div>
              <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-black mb-4 sm:mb-6 md:mb-8 tracking-tighter px-2">
                THE NEW REALITY
              </h2>
              <p className="text-base sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight max-w-4xl mx-auto px-2">
                When code becomes trivial with AI, the quality of <span className="bg-[#00D9C0] px-1 sm:px-2">ideation</span> and turning ideas into <span className="bg-[#FFD93D] px-1 sm:px-2">products people want</span> become the only differentiators.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              {/* The Problem */}
              <div className="bg-[#FF6B9D] border-2 sm:border-4 border-black p-4 sm:p-6 md:p-8 lg:p-10 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-black flex items-center justify-center">
                    <X className="text-white sm:w-7 sm:h-7 md:w-8 md:h-8" size={24} strokeWidth={4} />
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-black">THE PROBLEM</h3>
                </div>
                <div className="space-y-3 sm:space-y-4 md:space-y-6 text-sm sm:text-base md:text-lg lg:text-xl font-bold leading-relaxed">
                  <p>Traditional hackathons waste time on <span className="bg-white px-1 sm:px-2">shallow brainstorming</span>, producing technically impressive demos that solve <span className="bg-white px-1 sm:px-2">non-existent problems</span>.</p>
                  <p>Experts with deep domain knowledge lack the <span className="bg-white px-1 sm:px-2">product craft</span> to transform insights into solutions people actually use.</p>
                </div>
              </div>

              {/* The Solution */}
              <div className="bg-[#00D9C0] border-2 sm:border-4 border-black p-4 sm:p-6 md:p-8 lg:p-10 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-black flex items-center justify-center">
                    <Target className="text-white sm:w-7 sm:h-7 md:w-8 md:h-8" size={24} strokeWidth={3} />
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-black">THE SOLUTION</h3>
                </div>
                <div className="space-y-3 sm:space-y-4 md:space-y-6 text-sm sm:text-base md:text-lg lg:text-xl font-bold leading-relaxed">
                  <p><span className="bg-black text-white px-1 sm:px-2 py-0.5 sm:py-1">EXPERTS</span> (NGOs, researchers, professionals) define thoughtful challenges based on real-world expertise.</p>
                  <p><span className="bg-black text-white px-1 sm:px-2 py-0.5 sm:py-1">PRODUCT BUILDERS</span> transform these visions into usable products in one weekend.</p>
                  <div className="mt-4 sm:mt-6 md:mt-8 pt-3 sm:pt-4 md:pt-6 border-t-2 sm:border-t-4 border-black">
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-black">
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
      <section id="principles" className="py-16 sm:py-24 md:py-32">
        <div className="container mx-auto px-3 sm:px-6">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <div className="inline-block mb-4 sm:mb-6 md:mb-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-[#00D9C0] border-2 sm:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center mx-auto">
                <Star size={32} strokeWidth={3} className="sm:w-10 sm:h-10 md:w-12 md:h-12 fill-black" />
              </div>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-black mb-3 sm:mb-4 md:mb-6 tracking-tighter px-2">
              THE 5 PRINCIPLES
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl font-bold">Our manifesto for the AI era</p>
          </div>

          <div className="max-w-5xl mx-auto space-y-3 sm:space-y-4 md:space-y-6">
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
                className="bg-white border-2 sm:border-4 border-black p-4 sm:p-6 md:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] sm:hover:translate-x-[3px] sm:hover:translate-y-[3px] md:hover:translate-x-[4px] md:hover:translate-y-[4px] transition-all"
              >
                <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
                  <div 
                    className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 flex-shrink-0 border-2 sm:border-4 border-black flex items-center justify-center text-xl sm:text-2xl md:text-3xl font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    style={{ backgroundColor: principle.color }}
                  >
                    {principle.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-black mb-1 sm:mb-2 leading-tight">{principle.title}</h3>
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg font-bold opacity-70">{principle.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audiences Section */}
      <section id="audiences" className="py-16 sm:py-24 md:py-32 bg-white border-y-2 sm:border-y-4 border-black">
        <div className="container mx-auto px-3 sm:px-6">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <div className="inline-block mb-4 sm:mb-6 md:mb-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-[#FF6B9D] border-2 sm:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center mx-auto">
                <Users size={32} strokeWidth={3} className="sm:w-10 sm:h-10 md:w-12 md:h-12" />
              </div>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-black mb-3 sm:mb-4 md:mb-6 tracking-tighter px-2">
              WHO SHOULD JOIN
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl font-bold">Four paths to create impact</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
            {/* Product Builders */}
            <div className="bg-[#00D9C0] border-2 sm:border-4 border-black p-4 sm:p-6 md:p-8 lg:p-10 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] sm:hover:translate-x-[3px] sm:hover:translate-y-[3px] md:hover:translate-x-[4px] md:hover:translate-y-[4px] transition-all">
              <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-black border-2 sm:border-4 border-black flex items-center justify-center mb-3 sm:mb-4 md:mb-6 shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] sm:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] md:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                <Rocket size={28} strokeWidth={3} className="text-[#00D9C0] sm:w-8 sm:h-8 md:w-10 md:h-10" />
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black mb-2 sm:mb-3 md:mb-4 uppercase">Product Builders</h3>
              <p className="text-sm sm:text-base md:text-lg font-bold mb-4 sm:mb-5 md:mb-6 leading-relaxed">
                Product-minded creators who use AI tools to build experiences people love. Obsessed with user needs, not tech stacks.
              </p>
              <ul className="space-y-2 sm:space-y-2.5 md:space-y-3 mb-4 sm:mb-6 md:mb-8 font-bold text-sm sm:text-base">
                <li className="flex items-start gap-1.5 sm:gap-2">
                  <span className="text-lg sm:text-xl md:text-2xl">▸</span>
                  <span>Leverage AI tools (Claude, GPT, Cursor)</span>
                </li>
                <li className="flex items-start gap-1.5 sm:gap-2">
                  <span className="text-lg sm:text-xl md:text-2xl">▸</span>
                  <span>Focus on product craft over coding</span>
                </li>
                <li className="flex items-start gap-1.5 sm:gap-2">
                  <span className="text-lg sm:text-xl md:text-2xl">▸</span>
                  <span>Build solutions people actually use</span>
                </li>
              </ul>
              <button onClick={() => openModal('builder')} className="w-full bg-black text-[#00D9C0] border-2 sm:border-4 border-black px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-4 font-black text-sm sm:text-base uppercase shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] sm:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] md:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] sm:hover:shadow-[2.5px_2.5px_0px_0px_rgba(255,255,255,1)] md:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[1.5px] hover:translate-y-[1.5px] sm:hover:translate-x-[2px] sm:hover:translate-y-[2px] md:hover:translate-x-[3px] md:hover:translate-y-[3px] transition-all flex items-center justify-center gap-1.5 sm:gap-2">
                Apply as Builder
                <ArrowRight strokeWidth={3} size={16} className="sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Expert Partners */}
            <div className="bg-[#FFD93D] border-2 sm:border-4 border-black p-4 sm:p-6 md:p-8 lg:p-10 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] sm:hover:translate-x-[3px] sm:hover:translate-y-[3px] md:hover:translate-x-[4px] md:hover:translate-y-[4px] transition-all">
              <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-black border-2 sm:border-4 border-black flex items-center justify-center mb-3 sm:mb-4 md:mb-6 shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] sm:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] md:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                <Target size={28} strokeWidth={3} className="text-[#FFD93D] sm:w-8 sm:h-8 md:w-10 md:h-10" />
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black mb-2 sm:mb-3 md:mb-4 uppercase">Expert Partners</h3>
              <p className="text-sm sm:text-base md:text-lg font-bold mb-4 sm:mb-5 md:mb-6 leading-relaxed">
                NGOs, researchers, and professionals with field experience who define challenges worth solving.
              </p>
              <ul className="space-y-2 sm:space-y-2.5 md:space-y-3 mb-4 sm:mb-6 md:mb-8 font-bold text-sm sm:text-base">
                <li className="flex items-start gap-1.5 sm:gap-2">
                  <span className="text-lg sm:text-xl md:text-2xl">▸</span>
                  <span>Share your domain expertise</span>
                </li>
                <li className="flex items-start gap-1.5 sm:gap-2">
                  <span className="text-lg sm:text-xl md:text-2xl">▸</span>
                  <span>Get usable solutions in 48 hours</span>
                </li>
                <li className="flex items-start gap-1.5 sm:gap-2">
                  <span className="text-lg sm:text-xl md:text-2xl">▸</span>
                  <span>No development costs</span>
                </li>
              </ul>
              <button onClick={() => openModal('challenge')} className="w-full bg-black text-[#FFD93D] border-2 sm:border-4 border-black px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-4 font-black text-sm sm:text-base uppercase shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] sm:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] md:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] sm:hover:shadow-[2.5px_2.5px_0px_0px_rgba(255,255,255,1)] md:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[1.5px] hover:translate-y-[1.5px] sm:hover:translate-x-[2px] sm:hover:translate-y-[2px] md:hover:translate-x-[3px] md:hover:translate-y-[3px] transition-all flex items-center justify-center gap-1.5 sm:gap-2">
                Submit Challenge
                <ArrowRight strokeWidth={3} size={16} className="sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Sponsors */}
            <div className="bg-[#FF6B9D] border-2 sm:border-4 border-black p-4 sm:p-6 md:p-8 lg:p-10 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] sm:hover:translate-x-[3px] sm:hover:translate-y-[3px] md:hover:translate-x-[4px] md:hover:translate-y-[4px] transition-all">
              <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-black border-2 sm:border-4 border-black flex items-center justify-center mb-3 sm:mb-4 md:mb-6 shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] sm:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] md:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                <Award size={28} strokeWidth={3} className="text-[#FF6B9D] sm:w-8 sm:h-8 md:w-10 md:h-10" />
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black mb-2 sm:mb-3 md:mb-4 uppercase">Sponsors</h3>
              <p className="text-sm sm:text-base md:text-lg font-bold mb-4 sm:mb-5 md:mb-6 leading-relaxed">
                Tech companies who want their tools used for positive impact and connect with product-minded talent.
              </p>
              <ul className="space-y-2 sm:space-y-2.5 md:space-y-3 mb-4 sm:mb-6 md:mb-8 font-bold text-sm sm:text-base">
                <li className="flex items-start gap-1.5 sm:gap-2">
                  <span className="text-lg sm:text-xl md:text-2xl">▸</span>
                  <span>Showcase your product&apos;s impact</span>
                </li>
                <li className="flex items-start gap-1.5 sm:gap-2">
                  <span className="text-lg sm:text-xl md:text-2xl">▸</span>
                  <span>Connect with next-gen builders</span>
                </li>
                <li className="flex items-start gap-1.5 sm:gap-2">
                  <span className="text-lg sm:text-xl md:text-2xl">▸</span>
                  <span>Support real-world solutions</span>
                </li>
              </ul>
              <button onClick={() => openModal('sponsor')} className="w-full bg-black text-[#FF6B9D] border-2 sm:border-4 border-black px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-4 font-black text-sm sm:text-base uppercase shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] sm:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] md:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] sm:hover:shadow-[2.5px_2.5px_0px_0px_rgba(255,255,255,1)] md:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[1.5px] hover:translate-y-[1.5px] sm:hover:translate-x-[2px] sm:hover:translate-y-[2px] md:hover:translate-x-[3px] md:hover:translate-y-[3px] transition-all flex items-center justify-center gap-1.5 sm:gap-2">
                Become Sponsor
                <ArrowRight strokeWidth={3} size={16} className="sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Academic Institutions */}
            <div className="bg-[#C996FF] border-2 sm:border-4 border-black p-4 sm:p-6 md:p-8 lg:p-10 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] sm:hover:translate-x-[3px] sm:hover:translate-y-[3px] md:hover:translate-x-[4px] md:hover:translate-y-[4px] transition-all">
              <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-black border-2 sm:border-4 border-black flex items-center justify-center mb-3 sm:mb-4 md:mb-6 shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] sm:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] md:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                <GraduationCap size={28} strokeWidth={3} className="text-[#C996FF] sm:w-8 sm:h-8 md:w-10 md:h-10" />
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black mb-2 sm:mb-3 md:mb-4 uppercase">Academic Institutions</h3>
              <p className="text-sm sm:text-base md:text-lg font-bold mb-4 sm:mb-5 md:mb-6 leading-relaxed">
                Universities teaching product craft, not just code. Connect students with real impact opportunities.
              </p>
              <ul className="space-y-2 sm:space-y-2.5 md:space-y-3 mb-4 sm:mb-6 md:mb-8 font-bold text-sm sm:text-base">
                <li className="flex items-start gap-1.5 sm:gap-2">
                  <span className="text-lg sm:text-xl md:text-2xl">▸</span>
                  <span>Prove applied value of research</span>
                </li>
                <li className="flex items-start gap-1.5 sm:gap-2">
                  <span className="text-lg sm:text-xl md:text-2xl">▸</span>
                  <span>Develop modern product skills</span>
                </li>
                <li className="flex items-start gap-1.5 sm:gap-2">
                  <span className="text-lg sm:text-xl md:text-2xl">▸</span>
                  <span>Visibility on concrete innovation</span>
                </li>
              </ul>
              <button onClick={() => openModal('academic')} className="w-full bg-black text-[#C996FF] border-2 sm:border-4 border-black px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-4 font-black text-sm sm:text-base uppercase shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] sm:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] md:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] sm:hover:shadow-[2.5px_2.5px_0px_0px_rgba(255,255,255,1)] md:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[1.5px] hover:translate-y-[1.5px] sm:hover:translate-x-[2px] sm:hover:translate-y-[2px] md:hover:translate-x-[3px] md:hover:translate-y-[3px] transition-all flex items-center justify-center gap-1.5 sm:gap-2">
                Partner With Us
                <ArrowRight strokeWidth={3} size={16} className="sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section id="details" className="py-16 sm:py-24 md:py-32">
        <div className="container mx-auto px-3 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 sm:mb-16 md:mb-20">
              <div className="inline-block mb-4 sm:mb-6 md:mb-8">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-[#6BCF7F] border-2 sm:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center mx-auto">
                  <Calendar size={32} strokeWidth={3} className="sm:w-10 sm:h-10 md:w-12 md:h-12" />
                </div>
              </div>
              <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-black mb-3 sm:mb-4 md:mb-6 tracking-tighter px-2">
                EVENT DETAILS
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8 md:mb-12">
              <div className="bg-[#00D9C0] border-2 sm:border-4 border-black p-4 sm:p-6 md:p-8 lg:p-10 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <Calendar size={36} strokeWidth={3} className="mb-3 sm:mb-4 md:mb-6 sm:w-12 sm:h-12 md:w-14 md:h-14" />
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black mb-2 sm:mb-3 uppercase">When</h3>
                <p className="text-lg sm:text-xl md:text-2xl font-black mb-1 sm:mb-2">October 23-24, 2025</p>
                <p className="text-sm sm:text-base md:text-lg font-bold">One intense weekend</p>
              </div>

              <div className="bg-[#FFD93D] border-2 sm:border-4 border-black p-4 sm:p-6 md:p-8 lg:p-10 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <MapPin size={36} strokeWidth={3} className="mb-3 sm:mb-4 md:mb-6 sm:w-12 sm:h-12 md:w-14 md:h-14" />
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black mb-2 sm:mb-3 uppercase">Where</h3>
                <p className="text-lg sm:text-xl md:text-2xl font-black mb-1 sm:mb-2">42 Paris</p>
                <p className="text-sm sm:text-base md:text-lg font-bold">The iconic coding school</p>
              </div>
            </div>

            <div className="bg-white border-2 sm:border-4 border-black p-4 sm:p-6 md:p-8 lg:p-12 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black mb-6 sm:mb-8 md:mb-10 uppercase flex items-center gap-2 sm:gap-3">
                <Sparkles size={24} strokeWidth={3} className="sm:w-7 sm:h-7 md:w-8 md:h-8" />
                The Weekend Flow
              </h3>
              <div className="space-y-4 sm:space-y-6 md:space-y-8">
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
                  <div key={step.num} className="flex gap-3 sm:gap-4 md:gap-6 items-start">
                    <div 
                      className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex-shrink-0 border-2 sm:border-4 border-black flex items-center justify-center text-lg sm:text-xl md:text-2xl font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                      style={{ backgroundColor: step.color }}
                    >
                      {step.num}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2 md:gap-3 mb-1 sm:mb-2">
                        <h4 className="font-black text-base sm:text-lg md:text-xl lg:text-2xl uppercase">{step.title}</h4>
                        <span className="text-xs sm:text-sm font-black uppercase bg-black text-white px-1.5 py-0.5 sm:px-2 sm:py-1 inline-block w-fit">{step.subtitle}</span>
                      </div>
                      <p className="text-sm sm:text-base md:text-lg font-bold leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mantras */}
      <section className="py-16 sm:py-24 md:py-32 bg-black text-white border-y-2 sm:border-y-4 border-black">
        <div className="container mx-auto px-3 sm:px-6">
          <div className="max-w-5xl mx-auto space-y-8 sm:space-y-12 md:space-y-16">
            {[
              "When everyone can code, creating products people love becomes everything.",
              "Stop celebrating technical demos. Start shipping real products.",
              "AI writes code. Humans create experiences.",
              "The best products come from real problems, properly understood.",
              "Build less, but build better."
            ].map((mantra, i) => (
              <div key={i} className="relative">
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-center leading-tight px-2">
                  &quot;{mantra}&quot;
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-24 md:py-32 lg:py-40">
        <div className="container mx-auto px-3 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="bg-[#00D9C0] border-2 sm:border-4 border-black p-6 sm:p-10 md:p-12 lg:p-16 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sm:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] md:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] lg:shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] text-center">
              <div className="mb-4 sm:mb-6 md:mb-8">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-black border-2 sm:border-4 border-black flex items-center justify-center mx-auto shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] sm:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] md:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
                  <Sparkles size={32} strokeWidth={3} className="text-[#00D9C0] sm:w-10 sm:h-10 md:w-12 md:h-12" />
                </div>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-black mb-4 sm:mb-6 md:mb-8 leading-tight uppercase">
                Ready to Build<br />Solutions That<br />Actually Matter?
              </h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-6 sm:mb-8 md:mb-12 max-w-3xl mx-auto leading-tight px-2">
                Join us for a weekend where expertise meets execution, and real problems find thoughtful solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                <button onClick={() => openModal('builder')} className="bg-black text-[#00D9C0] border-2 sm:border-4 border-black px-6 sm:px-10 md:px-12 py-3 sm:py-5 md:py-6 font-black text-base sm:text-lg md:text-xl uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] sm:hover:translate-x-[3px] sm:hover:translate-y-[3px] md:hover:translate-x-[4px] md:hover:translate-y-[4px] transition-all flex items-center justify-center gap-2 sm:gap-3">
                  <Rocket strokeWidth={3} size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  Apply Now
                </button>
                <button onClick={() => openModal('contact')} className="bg-white border-2 sm:border-4 border-black px-6 sm:px-10 md:px-12 py-3 sm:py-5 md:py-6 font-black text-base sm:text-lg md:text-xl uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] sm:hover:translate-x-[3px] sm:hover:translate-y-[3px] md:hover:translate-x-[4px] md:hover:translate-y-[4px] transition-all flex items-center justify-center gap-2 sm:gap-3">
                  <Mail strokeWidth={3} size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 sm:border-t-4 border-black py-8 sm:py-12 md:py-16 bg-white">
        <div className="container mx-auto px-3 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8 mb-8 sm:mb-12">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-[#00D9C0] border-2 sm:border-4 border-black flex items-center justify-center font-black text-2xl sm:text-3xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                H
              </div>
              <span className="text-xl sm:text-2xl md:text-3xl font-black">
                Hack the Gap
              </span>
            </div>
            <div className="flex gap-3 sm:gap-4">
              {[
                { icon: Twitter, label: 'Twitter' },
                { icon: Linkedin, label: 'LinkedIn' },
                { icon: Github, label: 'GitHub' },
                { icon: Mail, label: 'Email' }
              ].map(({ icon: Icon, label }) => (
                <a 
                  key={label}
                  href="#" 
                  className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white border-2 sm:border-4 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] sm:hover:translate-x-[2px] sm:hover:translate-y-[2px] transition-all"
                  aria-label={label}
                >
                  <Icon strokeWidth={3} size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </a>
              ))}
            </div>
          </div>
          <div className="text-center border-t-2 sm:border-t-4 border-black pt-6 sm:pt-8">
            <p className="font-black text-base sm:text-lg mb-1 sm:mb-2">© 2025 Hack the Gap</p>
            <p className="font-bold text-sm sm:text-base">Building products that matter</p>
          </div>
        </div>
      </footer>

      {/* Challenge Wizard */}
      {modalOpen === 'challenge' && (
        <ChallengeWizard onClose={closeModal} />
      )}

      {/* Modal for other types */}
      {modalOpen && modalOpen !== 'challenge' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black bg-opacity-50" onClick={closeModal}>
          <div 
            className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-[#00D9C0] border-b-4 border-black p-6 flex justify-between items-center">
              <h2 className="text-3xl font-black uppercase">
                {modalOpen === 'builder' && 'Apply as Product Builder'}
                {modalOpen === 'sponsor' && 'Become a Sponsor'}
                {modalOpen === 'academic' && 'Partner With Us'}
                {modalOpen === 'contact' && 'Get in Touch'}
              </h2>
              <button 
                onClick={closeModal}
                className="w-12 h-12 bg-black text-white flex items-center justify-center hover:bg-[#333] transition-colors"
              >
                <X size={24} strokeWidth={3} />
              </button>
            </div>

            {/* Modal Content */}
            <form onSubmit={handleSubmit} className="p-8">
              <div className="space-y-6">
                {/* Name Field - All forms */}
                <div>
                  <label htmlFor="name" className="block text-lg font-black mb-2 uppercase">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full border-4 border-black px-4 py-3 font-bold focus:outline-none focus:ring-4 focus:ring-[#00D9C0]"
                    placeholder="Your full name"
                  />
                </div>

                {/* Email Field - All forms */}
                <div>
                  <label htmlFor="email" className="block text-lg font-black mb-2 uppercase">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border-4 border-black px-4 py-3 font-bold focus:outline-none focus:ring-4 focus:ring-[#00D9C0]"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Organization Field - All except contact */}
                {modalOpen !== 'contact' && (
                  <div>
                    <label htmlFor="organization" className="block text-lg font-black mb-2 uppercase">
                      {modalOpen === 'builder' ? 'Current Company/School' : 'Organization'}
                    </label>
                    <input
                      type="text"
                      id="organization"
                      name="organization"
                      value={formData.organization}
                      onChange={handleInputChange}
                      className="w-full border-4 border-black px-4 py-3 font-bold focus:outline-none focus:ring-4 focus:ring-[#00D9C0]"
                      placeholder={modalOpen === 'builder' ? 'Where you currently work or study' : 'Your organization name'}
                    />
                  </div>
                )}

                {/* Builder-specific fields */}
                {modalOpen === 'builder' && (
                  <>
                    <div>
                      <label htmlFor="experience" className="block text-lg font-black mb-2 uppercase">
                        Product Building Experience
                      </label>
                      <textarea
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full border-4 border-black px-4 py-3 font-bold focus:outline-none focus:ring-4 focus:ring-[#00D9C0]"
                        placeholder="Tell us about your product building experience..."
                      />
                    </div>
                    <div>
                      <label htmlFor="portfolio" className="block text-lg font-black mb-2 uppercase">
                        Portfolio/Links
                      </label>
                      <input
                        type="text"
                        id="portfolio"
                        name="portfolio"
                        value={formData.portfolio}
                        onChange={handleInputChange}
                        className="w-full border-4 border-black px-4 py-3 font-bold focus:outline-none focus:ring-4 focus:ring-[#00D9C0]"
                        placeholder="GitHub, LinkedIn, personal website, etc."
                      />
                    </div>
                  </>
                )}


                {/* Message Field - All forms */}
                <div>
                  <label htmlFor="message" className="block text-lg font-black mb-2 uppercase">
                    {modalOpen === 'builder' && 'Why do you want to join?'}
                    {modalOpen === 'sponsor' && 'Your Sponsorship Goals'}
                    {modalOpen === 'academic' && 'Partnership Interests'}
                    {modalOpen === 'contact' && 'Message *'}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required={modalOpen === 'contact'}
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full border-4 border-black px-4 py-3 font-bold focus:outline-none focus:ring-4 focus:ring-[#00D9C0]"
                    placeholder={
                      modalOpen === 'builder' ? 'Tell us why you want to participate...' :
                      modalOpen === 'sponsor' ? 'What are you looking to achieve...' :
                      modalOpen === 'academic' ? 'What type of partnership are you interested in...' :
                      'Your message...'
                    }
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8 flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-[#00D9C0] border-4 border-black px-8 py-4 font-black text-lg uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-8 py-4 border-4 border-black font-black text-lg uppercase hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
