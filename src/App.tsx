import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, 
  Rocket, 
  Compass, 
  Cpu, 
  Code, 
  Bot,
  Settings,
  ArrowRight, 
  Check, 
  ChevronDown, 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Mail, 
  Building, 
  Briefcase, 
  DollarSign, 
  Shield, 
  Sparkles, 
  X, 
  Menu,
  ArrowUpRight, 
  CheckCircle, 
  ChevronRight, 
  Database, 
  Terminal, 
  Lock, 
  Users, 
  TrendingUp, 
  Layers, 
  FileText, 
  RefreshCw,
  Award,
  Handshake,
  GraduationCap,
  Activity,
  Landmark,
  Leaf,
  Plus,
  Minus,
  Search,
  Paintbrush,
  Hammer,
  Repeat
} from 'lucide-react';
import { SERVICES_DATA, PORTFOLIO_DATA, FAQ_DATA, BLOG_DATA } from './data';
import { Service, PortfolioItem, FaqItem, BlogArticle, AiProposal, Lead, IndustryType } from './types';
import InstallApp from './components/InstallApp';

const whyChooseUsCards = [
  {
    title: "Product-First Thinking",
    description: "We think beyond code. Every decision is guided by product strategy, user value, and long-term business outcomes.",
    icon: "Rocket"
  },
  {
    title: "Builders of AI Products",
    description: "Our expertise comes from building AI ventures across multiple industries—not just delivering client projects.",
    icon: "Hammer"
  },
  {
    title: "Collaborative Partnership",
    description: "You're involved throughout the journey with regular reviews, transparent communication, and shared decision-making.",
    icon: "Handshake"
  },
  {
    title: "Responsible AI",
    description: "Security, privacy, transparency, and ethical AI practices are integrated from day one.",
    icon: "Shield"
  },
  {
    title: "Built to Scale",
    description: "Every solution is engineered for performance, reliability, and future growth—not just launch day.",
    icon: "TrendingUp"
  },
  {
    title: "End-to-End Partnership",
    description: "From idea validation to post-launch optimization, we stay with you as your product evolves.",
    icon: "Repeat"
  }
];

const industriesWeServe = [
  {
    name: "Education",
    description: "AI-powered learning platforms, knowledge systems, student analytics, and educational innovation.",
    icon: "GraduationCap",
    color: "from-blue-500/10 to-indigo-500/10",
    textColor: "text-blue-600",
    bgAccent: "bg-blue-50/50 border-blue-100"
  },
  {
    name: "Healthcare",
    description: "Patient engagement, clinical intelligence, healthcare automation, and responsible AI solutions.",
    icon: "Activity",
    color: "from-rose-500/10 to-red-500/10",
    textColor: "text-rose-600",
    bgAccent: "bg-rose-50/50 border-rose-100"
  },
  {
    name: "Startups",
    description: "Idea validation, MVP development, AI integration, and technical partnership for founders.",
    icon: "Rocket",
    color: "from-amber-500/10 to-orange-500/10",
    textColor: "text-amber-600",
    bgAccent: "bg-amber-50/50 border-amber-100"
  },
  {
    name: "Finance",
    description: "Financial intelligence, explainable AI, analytics, and business decision support.",
    icon: "DollarSign",
    color: "from-emerald-500/10 to-teal-500/10",
    textColor: "text-emerald-600",
    bgAccent: "bg-emerald-50/50 border-emerald-100"
  },
  {
    name: "Human Resources",
    description: "AI recruitment, hiring intelligence, talent matching, and workforce automation.",
    icon: "Users",
    color: "from-purple-500/10 to-violet-500/10",
    textColor: "text-purple-600",
    bgAccent: "bg-purple-50/50 border-purple-100"
  },
  {
    name: "Enterprise",
    description: "Custom AI software, internal copilots, workflow automation, and digital transformation.",
    icon: "Building",
    color: "from-slate-500/10 to-zinc-500/10",
    textColor: "text-slate-700",
    bgAccent: "bg-slate-100/50 border-slate-200"
  },
  {
    name: "Government & Public Sector",
    description: "AI platforms that improve citizen services, operational efficiency, and data-driven decision making.",
    icon: "Landmark",
    color: "from-cyan-500/10 to-sky-500/10",
    textColor: "text-cyan-600",
    bgAccent: "bg-cyan-50/50 border-cyan-100"
  },
  {
    name: "Sustainability",
    description: "Carbon intelligence, ESG reporting, environmental analytics, and climate technology.",
    icon: "Leaf",
    color: "from-green-500/10 to-emerald-500/10",
    textColor: "text-green-600",
    bgAccent: "bg-green-50/50 border-green-100"
  }
];

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'home' | 'services' | 'portfolio' | 'methodology' | 'planner' | 'admin'>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      // 4. Sticky navbar scroll check
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // 5. Active navigation scroll detection
      const sections = [
        { id: 'hero-section', name: 'home' },
        { id: 'services-section', name: 'services' },
        { id: 'portfolio-section', name: 'portfolio' },
        { id: 'methodology-section', name: 'methodology' },
        { id: 'industries-section', name: 'industries' },
        { id: 'blog-section', name: 'blog' },
        { id: 'faq-section', name: 'faq' }
      ];

      let currentSection = 'home';
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If the section is taking up a significant portion of the viewport near the top
          if (rect.top <= 160 && rect.bottom >= 160) {
            currentSection = section.name;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Fade out and remove the initial loading splash screen once React is fully mounted
    const loader = document.getElementById('initial-pwa-loader');
    if (loader) {
      loader.style.opacity = '0';
      loader.style.visibility = 'hidden';
      const timeout = setTimeout(() => {
        loader.remove();
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, []);
  
  // Services Interactive State
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  
  // Portfolio Interactive State
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
  
  // FAQ Interactive State
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('faq-1');
  
  // Blog Interactive State
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);

  // Interactive Ecosystem Visualization State & Data
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const ECOSYSTEM_NODES = [
    { id: 'ai-products', label: 'AI Products', desc: 'Fully customized and scalable intelligence products designed for real-world impact.' },
    { id: 'atsfy', label: 'ATSFY', desc: 'Founder-led boutique product studio engineering custom AI solutions.' },
    { id: 'startup-mvp', label: 'Startup MVP', desc: 'High-velocity proof-of-concept development and rapid market entry with clean architectures.' },
    { id: 'enterprise-ai', label: 'Enterprise AI', desc: 'Deeply integrated custom LLM agents, automated data parsing, and secure cognitive workflows.' },
    { id: 'automation', label: 'Automation', desc: 'Autonomous workflow pipelines, custom agent loops, and robotic cognitive pipelining.' },
    { id: 'education', label: 'Education', desc: 'Education AI - Intelligent lesson planning and semantic student analytics built with real classroom feedback.' },
    { id: 'healthcare', label: 'Healthcare', desc: 'Healthcare AI - HIPAA-compliant diagnostics assistance and smart medical chart parsing.' },
    { id: 'hiring', label: 'Hiring', desc: 'AI Hiring Platform - Bias-resistant automatic candidate vetting and cognitive recruiting pipelines.' },
    { id: 'finance', label: 'Finance', desc: 'Finance AI - Real-time market risk analysis, regulatory forecasting, and algorithmic decision models.' },
    { id: 'sustainability', label: 'Sustainability', desc: 'Carbon Intelligence - Real-time green credit calculation, dynamic supply chain auditing, and carbon reporting.' },
    { id: 'startup-tools', label: 'Startup Tools', desc: 'Startup Validation - VC-grade idea assessment, dynamic target market analysis, and prototype stress testing.' }
  ];

  // AI Strategy Planner Wizard States
  const [productIdea, setProductIdea] = useState('');
  const [targetIndustry, setTargetIndustry] = useState<IndustryType>('Education');
  const [budgetRange, setBudgetRange] = useState('$10,000 - $30,000');
  const [desiredTimeline, setDesiredTimeline] = useState('4 - 6 Weeks');
  
  const [isGeneratingProposal, setIsGeneratingProposal] = useState(false);
  const [generationSteps, setGenerationSteps] = useState<string[]>([]);
  const [proposal, setProposal] = useState<AiProposal | null>(null);
  const [generationError, setGenerationError] = useState<string | null>(null);

  // Booking Flow States
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactCompany, setContactCompany] = useState('');
  const [selectedDate, setSelectedDate] = useState('2026-07-01');
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Admin Dashboard State
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoadingLeads, setIsLoadingLeads] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAdminLead, setSelectedAdminLead] = useState<Lead | null>(null);

  // Floating AI Strategy Assistant Chat States
  const [isGuidanceOpen, setIsGuidanceOpen] = useState(false);
  const [guidancePrompt, setGuidancePrompt] = useState('');
  const [guidanceMessages, setGuidanceMessages] = useState<{ sender: 'user' | 'assistant'; text: string }[]>([
    {
      sender: 'assistant',
      text: "👋 Welcome to ATSFY's AI Strategy Consultant!\n\nDescribe your AI product idea, technical challenges, or automation goals. I'll analyze it in real-time and provide custom product names, recommended tech stacks, suggested development phases, and strategic use cases."
    }
  ]);
  const [isGuidanceLoading, setIsGuidanceLoading] = useState(false);

  const handleSendGuidance = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guidancePrompt.trim() || isGuidanceLoading) return;

    const userMessage = guidancePrompt.trim();
    setGuidancePrompt('');
    setGuidanceMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    setIsGuidanceLoading(true);

    try {
      const response = await fetch('/api/ai-guidance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMessage })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch guidance');
      }

      const data = await response.json();
      setGuidanceMessages(prev => [...prev, { sender: 'assistant', text: data.response }]);
    } catch (error) {
      console.error("Guidance Error:", error);
      setGuidanceMessages(prev => [...prev, {
        sender: 'assistant',
        text: "⚠️ I encountered an error analyzing your idea. Please check your connection, try again, or book a direct slot using our strategy session planner below!"
      }]);
    } finally {
      setIsGuidanceLoading(false);
    }
  };



  // Industry sectors for Portfolio filter
  const categories: string[] = ['All', 'Education', 'Healthcare', 'Hiring', 'Finance', 'Startup Intelligence', 'Sustainability'];

  // Development blueprint stages
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const developmentStages = [
    {
      phase: "01",
      title: "Discover",
      shortDescription: "Understand your business, goals, users, and opportunities.",
      longDescription: "Every successful AI product starts with understanding the business problem. We work closely with your team to understand your goals, users, challenges, and high-impact AI opportunities before recommending the right solution.",
      icon: "Search",
      deliverable: "📄 Business Discovery Report",
      timeline: "1 Week",
      collaboration: "🤝 Workshop",
      outcome: "Product Vision & Scope"
    },
    {
      phase: "02",
      title: "Design",
      shortDescription: "Create user flows, prototypes, AI workflows, and technical architecture.",
      longDescription: "Before development begins, we transform your vision into an interactive product experience and technical blueprint. This stage ensures everyone shares the same understanding before any engineering work starts.",
      icon: "Paintbrush",
      deliverable: "🎨 Interactive Prototype",
      timeline: "1–2 Weeks",
      collaboration: "🤝 Design Review",
      outcome: "Product Blueprint"
    },
    {
      phase: "03",
      title: "Build",
      shortDescription: "Develop secure, scalable AI applications using modern technologies.",
      longDescription: "Our engineering team develops secure, scalable, and maintainable applications using modern technologies and responsible AI practices. Every feature is built with long-term performance, reliability, and future growth in mind.",
      icon: "Code",
      deliverable: "💻 Production-Ready MVP",
      timeline: "4–10 Weeks",
      collaboration: "🤝 Sprint Review",
      outcome: "Production-Ready Solution"
    },
    {
      phase: "04",
      title: "Test",
      shortDescription: "Validate quality, performance, security, and AI reliability.",
      longDescription: "Every product undergoes rigorous testing to ensure performance, security, usability, and AI reliability. We continuously refine the solution until it meets top-tier industry standards and user expectations.",
      icon: "Shield",
      deliverable: "✅ QA & AI Evaluation Report",
      timeline: "1 Week",
      collaboration: "🤝 User Testing",
      outcome: "Launch-Ready Product"
    },
    {
      phase: "05",
      title: "Launch & Scale",
      shortDescription: "Deploy, monitor, optimize, and continuously improve your product.",
      longDescription: "Launching is only the beginning. We help you monitor, improve, and scale your AI product as your business grows. Whether you're onboarding users, expanding features, or optimizing model parameters, we're here to support your journey.",
      icon: "Rocket",
      deliverable: "🚀 Deployment & Growth Plan",
      timeline: "Continuous",
      collaboration: "🤝 Launch Review",
      outcome: "Long-Term Growth"
    }
  ];

  // Fetch leads when admin tab is accessed
  const fetchLeads = async () => {
    setIsLoadingLeads(true);
    try {
      const res = await fetch('/api/leads');
      if (res.ok) {
        const data = await res.json();
        setLeads(data);
      }
    } catch (e) {
      console.error("Failed to fetch leads from API", e);
    } finally {
      setIsLoadingLeads(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'admin') {
      fetchLeads();
    }
  }, [activeTab]);

  // Handle Strategy Generator
  const generateStrategy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productIdea.trim()) return;

    setIsGeneratingProposal(true);
    setGenerationError(null);
    setProposal(null);
    setGenerationSteps([]);

    // Simulated terminal generation steps for interactive feedback
    const steps = [
      "Initializing ATSFY Blueprint Analyzer...",
      "Extracting contextual industry vectors...",
      "Comparing budget limits against hosting costs...",
      "Evaluating Gemini 3.5 multi-agent pipelines...",
      "Drafting PII sanitization and safety architecture...",
      "Finalizing VC-grade MVP Roadmap JSON..."
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 600));
      setGenerationSteps(prev => [...prev, steps[i]]);
    }

    try {
      const response = await fetch('/api/strategy-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idea: productIdea,
          industry: targetIndustry,
          budget: budgetRange,
          timeline: desiredTimeline
        })
      });

      if (!response.ok) {
        throw new Error("Strategy generation failed. Server returned status code " + response.status);
      }

      const result = await response.json();
      setProposal(result);
    } catch (err: any) {
      console.error(err);
      setGenerationError(err.message || "An unexpected error occurred while communicating with the AI. Please try again.");
    } finally {
      setIsGeneratingProposal(false);
    }
  };

  // Handle Strategy Booking
  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim()) return;

    setIsSubmittingBooking(true);
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          company: contactCompany,
          idea: productIdea || "Direct Booking without strategy session",
          industry: targetIndustry,
          budget: budgetRange,
          timeline: desiredTimeline,
          selectedDate,
          selectedTime,
          aiProposal: proposal
        })
      });

      if (response.ok) {
        setBookingSuccess(true);
        // Reset planner after dynamic interval
        setTimeout(() => {
          setProductIdea('');
          setProposal(null);
        }, 15000);
      } else {
        alert("Booking submission failed. Please try again.");
      }
    } catch (err) {
      console.error("Error booking session:", err);
      alert("A network error occurred. Please try again.");
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  // Helper for rendering icons dynamically
  const renderIcon = (name: string, className = "w-6 h-6") => {
    switch (name) {
      case 'Brain': return <Brain className={className} />;
      case 'Rocket': return <Rocket className={className} />;
      case 'Compass': return <Compass className={className} />;
      case 'Cpu': return <Cpu className={className} />;
      case 'Code': return <Code className={className} />;
      case 'Bot': return <Bot className={className} />;
      case 'Settings': return <Settings className={className} />;
      case 'Layers': return <Layers className={className} />;
      case 'Shield': return <Shield className={className} />;
      case 'Briefcase': return <Briefcase className={className} />;
      case 'TrendingUp': return <TrendingUp className={className} />;
      case 'RefreshCw': return <RefreshCw className={className} />;
      case 'Handshake': return <Handshake className={className} />;
      case 'Users': return <Users className={className} />;
      case 'Database': return <Database className={className} />;
      case 'GraduationCap': return <GraduationCap className={className} />;
      case 'Activity': return <Activity className={className} />;
      case 'Landmark': return <Landmark className={className} />;
      case 'Leaf': return <Leaf className={className} />;
      case 'DollarSign': return <DollarSign className={className} />;
      case 'Building': return <Building className={className} />;
      case 'Search': return <Search className={className} />;
      case 'Paintbrush': return <Paintbrush className={className} />;
      case 'Hammer': return <Hammer className={className} />;
      case 'Repeat': return <Repeat className={className} />;
      default: return <Brain className={className} />;
    }
  };

  // Helper for displaying category display names with emojis
  const categoryDisplay = (cat: string) => {
    switch (cat) {
      case 'All': return '✨ All Sectors';
      case 'Education': return '🎓 Education';
      case 'Healthcare': return '🏥 Healthcare';
      case 'Hiring': return '👥 HR Tech';
      case 'Finance': return '💰 FinTech';
      case 'Sustainability': return '🌱 Sustainability';
      case 'Startup Intelligence': return '🚀 Startup Ecosystem';
      default: return cat;
    }
  };

  // Helper for category badge styling
  const getCategoryDetails = (category: string, id: string) => {
    switch (category) {
      case 'Education':
        return { label: 'Education', emoji: '🎓', bg: 'bg-blue-50 border-blue-100 text-blue-700', hoverBg: 'group-hover:bg-blue-600 group-hover:text-white' };
      case 'Healthcare':
        return { label: 'Healthcare', emoji: '🏥', bg: 'bg-emerald-50 border-emerald-100 text-emerald-700', hoverBg: 'group-hover:bg-emerald-600 group-hover:text-white' };
      case 'Hiring':
        return { label: 'HR Tech', emoji: '👥', bg: 'bg-purple-50 border-purple-100 text-purple-700', hoverBg: 'group-hover:bg-purple-600 group-hover:text-white' };
      case 'Finance':
        return { label: 'FinTech', emoji: '💰', bg: 'bg-amber-50 border-amber-100 text-amber-700', hoverBg: 'group-hover:bg-amber-600 group-hover:text-white' };
      case 'Sustainability':
        return { label: 'Sustainability', emoji: '🌱', bg: 'bg-teal-50 border-teal-100 text-teal-700', hoverBg: 'group-hover:bg-teal-600 group-hover:text-white' };
      case 'Startup Intelligence':
        return { label: 'Startup Ecosystem', emoji: '🚀', bg: 'bg-indigo-50 border-indigo-100 text-indigo-700', hoverBg: 'group-hover:bg-indigo-600 group-hover:text-white' };
      default:
        return { label: category, emoji: '✨', bg: 'bg-slate-50 border-slate-100 text-slate-700', hoverBg: 'group-hover:bg-slate-600 group-hover:text-white' };
    }
  };

  // Helper for rendering interactive product visual mockups directly in CSS
  const renderProductMockup = (id: string) => {
    switch (id) {
      case 'education-ai':
        return (
          <div className="relative w-full h-full bg-slate-950/60 rounded-2xl border border-white/5 overflow-hidden p-5 font-sans text-[10px]">
            <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-4">
              <span className="font-mono text-slate-400 font-bold">EduAI Analytics Platform</span>
              <div className="flex gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500/60"></span>
                <span className="w-2 h-2 rounded-full bg-yellow-500/60"></span>
                <span className="w-2 h-2 rounded-full bg-green-500/60"></span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-blue-400 font-extrabold text-[11px]">Adaptive Learning Path</span>
                  <span className="text-emerald-400 font-mono text-[9px] bg-emerald-500/10 px-2 py-0.5 rounded-full font-bold">Active Mastery</span>
                </div>
                <p className="text-slate-400 text-[10px]">Linear Algebra & Vector Subspaces</p>
              </div>
              
              {/* Visual Analytics Nodes */}
              <div className="flex gap-2">
                <div className="flex-1 p-2 bg-white/5 border border-white/5 rounded-xl text-center">
                  <span className="text-slate-500 block text-[8px] uppercase tracking-wider font-extrabold">Attention Span</span>
                  <span className="text-[11px] font-extrabold text-slate-200">High (94%)</span>
                </div>
                <div className="flex-1 p-2 bg-white/5 border border-white/5 rounded-xl text-center">
                  <span className="text-slate-500 block text-[8px] uppercase tracking-wider font-extrabold">Hint Trigger</span>
                  <span className="text-[11px] font-extrabold text-blue-400">Adaptive (0.2s)</span>
                </div>
              </div>

              {/* Live Chart Line Mockup */}
              <div className="p-3 bg-white/5 border border-white/5 rounded-xl space-y-1.5">
                <div className="flex justify-between text-[8px] text-slate-500 uppercase tracking-widest font-extrabold">
                  <span>Engagement Curve</span>
                  <span className="text-blue-400 font-mono">Real-time telemetry</span>
                </div>
                <div className="h-10 flex items-end gap-2 pt-2 px-1">
                  <div className="w-full bg-blue-500/20 h-1/3 rounded-md"></div>
                  <div className="w-full bg-blue-500/30 h-1/2 rounded-md"></div>
                  <div className="w-full bg-blue-500/50 h-3/4 rounded-md"></div>
                  <div className="w-full bg-blue-600 h-full rounded-md shadow-[0_0_12px_rgba(59,130,246,0.6)]"></div>
                  <div className="w-full bg-blue-500/80 h-4/5 rounded-md"></div>
                  <div className="w-full bg-blue-500/40 h-2/3 rounded-md"></div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'knowledge-enabler':
        return (
          <div className="relative w-full h-full bg-slate-950/60 rounded-2xl border border-white/5 overflow-hidden p-5 font-sans text-[10px]">
            <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-4">
              <span className="font-mono text-slate-400 font-bold">RAG Workspace Engine</span>
              <span className="text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full font-mono text-[8px] font-bold">Chunk Indexer</span>
            </div>
            <div className="space-y-3">
              <div className="flex gap-2.5 items-center text-[10px] text-slate-400 p-2.5 bg-white/5 rounded-xl border border-white/5">
                <span className="w-2.5 h-2.5 rounded bg-amber-500"></span>
                <span className="font-mono text-slate-300 font-medium">annual_report_2026.pdf</span>
                <span className="text-slate-500 ml-auto font-mono text-[9px]">14.2 MB</span>
              </div>

              <div className="p-3 bg-blue-500/5 border border-blue-500/10 rounded-xl space-y-2">
                <p className="text-slate-300 italic text-[10px]">"Explain our supply chain carbon mitigation roadmap for Q3."</p>
                <div className="p-2.5 bg-slate-900/80 rounded-lg text-slate-400 border border-white/5 text-[9px] leading-relaxed">
                  <span className="text-blue-400 font-extrabold block mb-1">AI Agent Response:</span>
                  Based on Section 4.2 of the Q3 Log, we are consolidating 3 shipping routes, reducing expected overhead carbon output by 94%...
                </div>
              </div>

              <div className="flex gap-2 text-[8px] justify-between text-slate-500 px-1 font-mono uppercase font-bold tracking-wider">
                <span>Chunks Indexed: 1,420</span>
                <span>Ref Confidence: 99.4%</span>
              </div>
            </div>
          </div>
        );
      case 'ashasethu':
        return (
          <div className="relative w-full h-full bg-slate-950/60 rounded-2xl border border-white/5 overflow-hidden p-5 font-sans text-[10px]">
            <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-4">
              <span className="font-mono text-slate-400 font-bold">AshaSethu Healthcare Portal</span>
              <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-mono text-[8px] font-bold">Triage Bot</span>
            </div>
            <div className="space-y-3">
              <div className="flex gap-2">
                <div className="flex-1 p-2.5 bg-white/5 border border-white/5 rounded-xl space-y-1">
                  <span className="text-slate-500 text-[8px] uppercase tracking-wider font-extrabold">Clinic Intake</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-base font-extrabold text-slate-200">65%</span>
                    <span className="text-emerald-400 text-[8px] font-semibold">↓ Redirected</span>
                  </div>
                </div>
                <div className="flex-1 p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl space-y-1">
                  <span className="text-emerald-400 text-[8px] uppercase font-bold tracking-wider">Preliminary Triage</span>
                  <span className="text-slate-300 block font-medium">Non-Emergency</span>
                </div>
              </div>

              <div className="p-3 bg-slate-900/80 rounded-xl border border-white/5 space-y-2">
                <span className="text-slate-400 font-mono text-[8px] uppercase tracking-wider font-bold">Symptom Tracker Output</span>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-4/5 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
                </div>
                <p className="text-[9px] text-slate-500 leading-normal">Initial assessment completed across 8 languages. Patient routed safely to remote consultancy portal.</p>
              </div>
            </div>
          </div>
        );
      case 'atsfy-core':
        return (
          <div className="relative w-full h-full bg-slate-950/60 rounded-2xl border border-white/5 overflow-hidden p-5 font-sans text-[10px]">
            <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-4">
              <span className="font-mono text-slate-400 font-bold">ATSFY Recruitment Engine</span>
              <span className="text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full font-mono text-[8px] font-bold">Bias-Free</span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center bg-white/5 p-2.5 rounded-xl border border-white/5">
                <div>
                  <span className="font-mono text-slate-300 block font-bold">Candidate #819A</span>
                  <span className="text-slate-500 text-[8px] font-medium">Senior Systems Architect</span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-black text-blue-400">95% Match</span>
                  <span className="text-[8px] text-emerald-400 block font-bold">Verified Tech</span>
                </div>
              </div>

              {/* Multi-tier scorecard */}
              <div className="space-y-2 p-2.5 bg-slate-900/60 rounded-xl border border-white/5">
                <div className="space-y-1">
                  <div className="flex justify-between text-[8px] text-slate-400 uppercase font-bold tracking-wider">
                    <span>Distributed Systems Vetting</span>
                    <span className="text-emerald-400">Expert</span>
                  </div>
                  <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-11/12"></div>
                  </div>
                </div>
                
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[8px] text-slate-400 uppercase font-bold tracking-wider">
                    <span>Concurrent State Management</span>
                    <span className="text-emerald-400">Advanced</span>
                  </div>
                  <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-4/5"></div>
                  </div>
                </div>
              </div>

              <div className="p-2 bg-blue-500/10 rounded-xl text-center text-blue-400 font-extrabold text-[9px] uppercase tracking-wide border border-blue-500/20">
                Vetting Speed: 4 hours (Saves 14 days)
              </div>
            </div>
          </div>
        );
      case 'finance-xai':
        return (
          <div className="relative w-full h-full bg-slate-950/60 rounded-2xl border border-white/5 overflow-hidden p-5 font-sans text-[10px]">
            <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-4">
              <span className="font-mono text-slate-400 font-bold">XAI Balance Sheet Explainers</span>
              <span className="text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full font-mono text-[8px] font-bold">Explainable</span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center bg-white/5 p-2.5 rounded-xl border border-white/5">
                <div>
                  <span className="text-slate-400 font-bold">Suggested Cash Flow Strategy</span>
                  <span className="text-slate-500 block text-[8px]">Transaction Volume: $30M+</span>
                </div>
                <span className="text-[11px] font-black text-purple-400">+18% Leak Found</span>
              </div>

              <div className="p-3 bg-purple-500/5 border border-purple-500/15 rounded-xl space-y-2 text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]"></span>
                  <span className="font-extrabold text-[8px] text-purple-300 uppercase tracking-wider">Automated Strategy Log</span>
                </div>
                <p className="text-[9px] leading-relaxed text-slate-400">
                  "Cashflow variance identified in Q2 SaaS subscriptions. Consolidating multi-region seat licenses saves $18k/month, increasing immediate margins by 3.2%."
                </p>
              </div>
            </div>
          </div>
        );
      case 'startuplens':
        return (
          <div className="relative w-full h-full bg-slate-950/60 rounded-2xl border border-white/5 overflow-hidden p-5 font-sans text-[10px]">
            <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-4">
              <span className="font-mono text-slate-400 font-bold">StartupLens Market Scraper</span>
              <span className="text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full font-mono text-[8px] font-bold">Validation</span>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-white/5 border border-white/5 rounded-xl space-y-2">
                <div className="flex justify-between items-center text-[8px] text-slate-500 uppercase tracking-widest font-extrabold">
                  <span>Competitor Gaps Scraped</span>
                  <span className="text-blue-400 font-mono">Completed</span>
                </div>
                <div className="flex gap-1.5 pt-1">
                  <span className="text-[8px] bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded-md font-bold">Oversaturated</span>
                  <span className="text-[8px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-md font-bold">Market Gap (Blue Ocean)</span>
                </div>
              </div>

              <div className="flex gap-2">
                <div className="flex-1 p-2.5 bg-slate-900/80 rounded-xl border border-white/5 text-center">
                  <span className="text-slate-500 block text-[7px] uppercase tracking-wider font-extrabold">Market Report</span>
                  <span className="text-[11px] font-extrabold text-slate-200">30 Pages</span>
                </div>
                <div className="flex-1 p-2.5 bg-blue-500/10 border border-blue-500/20 rounded-xl text-center">
                  <span className="text-blue-400 block text-[7px] uppercase tracking-wider font-extrabold font-bold">Scraping Time</span>
                  <span className="text-[11px] font-extrabold text-blue-300">180s (3 Min)</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'pitch-deck-pro':
        return (
          <div className="relative w-full h-full bg-slate-950/60 rounded-2xl border border-white/5 overflow-hidden p-5 font-sans text-[10px]">
            <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-4">
              <span className="font-mono text-slate-400 font-bold">Storytelling & Presentation Compiler</span>
              <span className="text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full font-mono text-[8px] font-bold">Investor-Ready</span>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-amber-500/5 border border-amber-500/10 rounded-xl space-y-1">
                <span className="text-[8px] font-bold text-amber-400 uppercase tracking-widest block">Slide 3: The Problem Statement</span>
                <p className="text-[9px] text-slate-400 leading-normal">
                  "90% of technical architectures operate with 12% computational waste. We introduce a sub-100ms vector index routing mechanism to save cash flow."
                </p>
              </div>

              {/* Simulated slide thumbnail layout */}
              <div className="grid grid-cols-3 gap-2 pt-1">
                <div className="p-1.5 border border-white/10 rounded-lg bg-white/5 text-center text-[7px] text-slate-500 font-bold">1. Cover</div>
                <div className="p-1.5 border border-amber-500/30 rounded-lg bg-amber-500/10 text-center text-[7px] text-amber-400 font-bold">2. Problem</div>
                <div className="p-1.5 border border-white/10 rounded-lg bg-white/5 text-center text-[7px] text-slate-500 font-bold">3. Solution</div>
              </div>

              <div className="p-1.5 bg-slate-900/60 rounded-xl text-center text-slate-400 text-[8px] font-medium border border-white/5">
                Total funds raised by clients: <span className="font-bold text-white font-mono">$15M+</span>
              </div>
            </div>
          </div>
        );
      case 'green-to-gold':
        return (
          <div className="relative w-full h-full bg-slate-950/60 rounded-2xl border border-white/5 overflow-hidden p-5 font-sans text-[10px]">
            <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-4">
              <span className="font-mono text-slate-400 font-bold">Carbon Ingestion Portal</span>
              <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-mono text-[8px] font-bold">ESG Standard</span>
            </div>
            <div className="space-y-3">
              <div className="flex gap-2.5">
                <div className="flex-1 p-2.5 bg-emerald-500/5 border border-emerald-500/10 rounded-xl space-y-1">
                  <span className="text-slate-500 text-[7px] uppercase tracking-wider font-extrabold">Carbon Offset</span>
                  <span className="text-xs font-black text-emerald-400 block">800 Tons</span>
                </div>
                <div className="flex-1 p-2.5 bg-white/5 border border-white/5 rounded-xl space-y-1">
                  <span className="text-slate-500 text-[7px] uppercase tracking-wider font-extrabold">Audit Cost Saved</span>
                  <span className="text-xs font-black text-slate-200 block">94% Saved</span>
                </div>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-xl border border-white/5 space-y-1.5 text-slate-400">
                <div className="flex justify-between items-center text-[8px] text-slate-500 uppercase tracking-widest font-extrabold">
                  <span>Manifest Cargo Ingestion</span>
                  <span className="text-emerald-400 font-mono">Mapped</span>
                </div>
                <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-10/12"></div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const filteredPortfolio = PORTFOLIO_DATA.filter(item => 
    selectedCategory === 'All' || item.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white flex flex-col justify-between">
      {/* Dynamic Background Accents */}
      <div className="absolute top-0 left-0 right-0 h-[650px] bg-gradient-to-b from-blue-50/70 via-slate-50 to-transparent pointer-events-none -z-10" />
      <div className="absolute top-[200px] right-[10%] w-[350px] h-[350px] bg-blue-400/10 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-slow" />
      <div className="absolute top-[600px] left-[5%] w-[450px] h-[450px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-slow" />

      {/* Top Header Navigation */}
      <header className={`sticky top-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200/40' : 'bg-white/60 backdrop-blur-sm border-b border-transparent'}`}>
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all duration-300 ${isScrolled ? 'py-3.5' : 'py-5'}`}>
          {/* Logo */}
          <div 
            onClick={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} 
            className="flex items-center gap-3 cursor-pointer group"
            id="nav-logo"
          >
            <div className="w-10 h-10 bg-slate-950 text-white rounded-xl flex items-center justify-center font-bold tracking-wider shadow-md shadow-blue-500/5 group-hover:bg-blue-600 transition-colors duration-300">
              <span className="text-sm font-extrabold rotate-12 group-hover:rotate-0 transition-transform">AT</span>
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tighter text-slate-950">ATSFY</span>
              <span className="text-xs block font-bold text-blue-600 tracking-widest uppercase">Technologies</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => { setActiveTab('home'); setTimeout(() => document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }}
              className={`text-sm font-semibold tracking-wide transition-colors ${activeTab === 'home' && activeSection === 'services' ? 'text-blue-600 font-bold' : 'text-slate-600 hover:text-slate-950'}`}
              id="link-services"
            >
              Services
            </button>
            <button 
              onClick={() => { setActiveTab('home'); setTimeout(() => document.getElementById('portfolio-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }}
              className={`text-sm font-semibold tracking-wide transition-colors ${activeTab === 'home' && activeSection === 'portfolio' ? 'text-blue-600 font-bold' : 'text-slate-600 hover:text-slate-950'}`}
              id="link-portfolio"
            >
              Portfolio
            </button>
            <button 
              onClick={() => { setActiveTab('home'); setTimeout(() => document.getElementById('methodology-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }}
              className={`text-sm font-semibold tracking-wide transition-colors ${activeTab === 'home' && activeSection === 'methodology' ? 'text-blue-600 font-bold' : 'text-slate-600 hover:text-slate-950'}`}
              id="link-methodology"
            >
              Process
            </button>
            <button 
              onClick={() => { setActiveTab('home'); setTimeout(() => document.getElementById('industries-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }}
              className={`text-sm font-semibold tracking-wide transition-colors ${activeTab === 'home' && activeSection === 'industries' ? 'text-blue-600 font-bold' : 'text-slate-600 hover:text-slate-950'}`}
              id="link-industries"
            >
              Industries
            </button>
            <button 
              onClick={() => { setActiveTab('home'); setTimeout(() => document.getElementById('blog-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }}
              className={`text-sm font-semibold tracking-wide transition-colors ${activeTab === 'home' && activeSection === 'insights' ? 'text-blue-600 font-bold' : 'text-slate-600 hover:text-slate-950'}`}
              id="link-insights"
            >
              Insights
            </button>
            <button 
              onClick={() => { setActiveTab('home'); setTimeout(() => document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }}
              className={`text-sm font-semibold tracking-wide transition-colors ${activeTab === 'home' && activeSection === 'faq' ? 'text-blue-600 font-bold' : 'text-slate-600 hover:text-slate-950'}`}
              id="link-faq"
            >
              FAQ
            </button>
          </nav>

          {/* Right Area: Mobile Toggle & Desktop CTA Button */}
          <div className="flex items-center gap-3">
            {/* Header Action Button */}
            <button 
              onClick={() => {
                setActiveTab('planner');
                setTimeout(() => document.getElementById('strategy-planner-box')?.scrollIntoView({ behavior: 'smooth' }), 100);
              }}
              className="hidden md:block px-5 py-2.5 bg-blue-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 hover:bg-blue-700 transition-all duration-300"
              id="header-cta"
            >
              Book Free Strategy Session
            </button>

            {/* Mobile Menu Toggle Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 focus:outline-none cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Panel Drawer with Small Brand Intro */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-md overflow-hidden"
            >
              <div className="px-4 py-6 space-y-6">
                {/* Brand Intro */}
                <div className="space-y-1.5 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-slate-950 text-white rounded-md flex items-center justify-center font-bold text-[10px]">
                      <span>AT</span>
                    </div>
                    <span className="text-base font-extrabold tracking-tight text-slate-950">ATSFY</span>
                  </div>
                  <p className="text-[9px] font-bold text-blue-600 uppercase tracking-widest font-mono">
                    AI Product Development Studio
                  </p>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal">
                    Designing intelligent AI products for startups & enterprises.
                  </p>
                </div>

                <div className="border-t border-slate-100 my-2" />

                {/* Navigation Links */}
                <div className="flex flex-col gap-3.5 pl-2">
                  <button 
                    onClick={() => {
                      setActiveTab('home');
                      setIsMobileMenuOpen(false);
                      setTimeout(() => document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' }), 100);
                    }}
                    className={`text-left text-sm font-semibold tracking-wide transition-colors ${activeTab === 'home' && activeSection === 'services' ? 'text-blue-600 font-bold' : 'text-slate-600 hover:text-slate-950'}`}
                  >
                    Services
                  </button>
                  <button 
                    onClick={() => {
                      setActiveTab('home');
                      setIsMobileMenuOpen(false);
                      setTimeout(() => document.getElementById('portfolio-section')?.scrollIntoView({ behavior: 'smooth' }), 100);
                    }}
                    className={`text-left text-sm font-semibold tracking-wide transition-colors ${activeTab === 'home' && activeSection === 'portfolio' ? 'text-blue-600 font-bold' : 'text-slate-600 hover:text-slate-950'}`}
                  >
                    Portfolio
                  </button>
                  <button 
                    onClick={() => {
                      setActiveTab('home');
                      setIsMobileMenuOpen(false);
                      setTimeout(() => document.getElementById('methodology-section')?.scrollIntoView({ behavior: 'smooth' }), 100);
                    }}
                    className={`text-left text-sm font-semibold tracking-wide transition-colors ${activeTab === 'home' && activeSection === 'methodology' ? 'text-blue-600 font-bold' : 'text-slate-600 hover:text-slate-950'}`}
                  >
                    Process
                  </button>
                  <button 
                    onClick={() => {
                      setActiveTab('home');
                      setIsMobileMenuOpen(false);
                      setTimeout(() => document.getElementById('industries-section')?.scrollIntoView({ behavior: 'smooth' }), 100);
                    }}
                    className={`text-left text-sm font-semibold tracking-wide transition-colors ${activeTab === 'home' && activeSection === 'industries' ? 'text-blue-600 font-bold' : 'text-slate-600 hover:text-slate-950'}`}
                  >
                    Industries
                  </button>
                  <button 
                    onClick={() => {
                      setActiveTab('home');
                      setIsMobileMenuOpen(false);
                      setTimeout(() => document.getElementById('blog-section')?.scrollIntoView({ behavior: 'smooth' }), 100);
                    }}
                    className={`text-left text-sm font-semibold tracking-wide transition-colors ${activeTab === 'home' && activeSection === 'insights' ? 'text-blue-600 font-bold' : 'text-slate-600 hover:text-slate-950'}`}
                  >
                    Insights
                  </button>
                  <button 
                    onClick={() => {
                      setActiveTab('home');
                      setIsMobileMenuOpen(false);
                      setTimeout(() => document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' }), 100);
                    }}
                    className={`text-left text-sm font-semibold tracking-wide transition-colors ${activeTab === 'home' && activeSection === 'faq' ? 'text-blue-600 font-bold' : 'text-slate-600 hover:text-slate-950'}`}
                  >
                    FAQ
                  </button>
                </div>

                <div className="border-t border-slate-100 my-2" />

                {/* Mobile CTA */}
                <button 
                  onClick={() => {
                    setActiveTab('planner');
                    setIsMobileMenuOpen(false);
                    setTimeout(() => document.getElementById('strategy-planner-box')?.scrollIntoView({ behavior: 'smooth' }), 100);
                  }}
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-center block"
                >
                  Book Free Strategy Session
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Container */}
      <main className="flex-grow">
        {/* TAB 1: Main Home Experience */}
        {activeTab === 'home' && (
          <div>
            {/* HERO SECTION */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 md:pt-20" id="hero-section">
              <div className="grid grid-cols-1 lg:grid-cols-20 gap-10 xl:gap-14 items-center">
                {/* Left Column (45%) */}
                <div className="lg:col-span-9 space-y-8">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-1.5 bg-blue-50/80 border border-blue-100/70 px-4 py-2 rounded-xl shadow-sm">
                    <span className="text-[11px] font-extrabold text-blue-600 uppercase tracking-widest flex items-center gap-1.5">
                      <span>🚀</span>
                      <span>AI Product Development Studio</span>
                    </span>
                  </div>

                  {/* Headline */}
                  <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tighter text-slate-950 leading-[1.1]" id="hero-headline">
                    Build Intelligent AI Products That <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Drive Real Business Growth.</span>
                  </h1>

                  {/* Supporting paragraph */}
                  <div className="text-slate-600 text-sm md:text-base leading-relaxed">
                    <p>
                      From idea validation to production-ready AI applications, ATSFY partners with startups, enterprises, and innovators to design, build, and scale intelligent products that solve real-world problems. We combine product strategy, AI engineering, and responsible development to help you launch with confidence.
                    </p>
                  </div>

                  {/* CTA buttons */}
                  <div className="flex flex-wrap gap-4 pt-2">
                    <button 
                      onClick={() => {
                        setActiveTab('planner');
                        setTimeout(() => document.getElementById('strategy-planner-box')?.scrollIntoView({ behavior: 'smooth' }), 150);
                      }}
                      className="px-6 py-4 bg-blue-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 hover:bg-blue-700 transition-all duration-300 flex items-center gap-2 group cursor-pointer"
                      id="hero-primary-cta"
                    >
                      <span>🚀 Start Your Company Registration</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button 
                      onClick={() => {
                        setActiveTab('home');
                        setTimeout(() => document.getElementById('portfolio-section')?.scrollIntoView({ behavior: 'smooth' }), 100);
                      }}
                      className="px-6 py-4 bg-white text-slate-800 border border-slate-200 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 cursor-pointer"
                      id="hero-secondary-cta"
                    >
                      Explore Our Work
                    </button>
                  </div>

                  {/* PWA Install Banner */}
                  <InstallApp />

                  {/* Trusted Expertise (Trust indicators) */}
                  <div className="pt-6 border-t border-slate-200/60 grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-slate-700 font-semibold text-xs sm:text-sm">
                      <span className="text-emerald-600 font-extrabold text-base">✓</span>
                      <span>Free Strategy Session</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700 font-semibold text-xs sm:text-sm">
                      <span className="text-emerald-600 font-extrabold text-base">✓</span>
                      <span>Product-First Approach</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700 font-semibold text-xs sm:text-sm">
                      <span className="text-emerald-600 font-extrabold text-base">✓</span>
                      <span>Responsible AI</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700 font-semibold text-xs sm:text-sm">
                      <span className="text-emerald-600 font-extrabold text-base">✓</span>
                      <span>End-to-End Development</span>
                    </div>
                  </div>

                  {/* Credibility Strip */}
                  <div className="py-3.5 px-4 bg-slate-50 border border-slate-200/60 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-x-4 gap-y-2 text-xs text-slate-500">
                    <span className="font-bold text-slate-800 uppercase tracking-wider text-[10px] shrink-0">Built Across:</span>
                    <div className="flex flex-wrap gap-2 items-center font-medium">
                      <span className="bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full border border-blue-100/60 text-[10px]">Education AI</span>
                      <span className="bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full border border-indigo-100/60 text-[10px]">Healthcare AI</span>
                      <span className="bg-purple-50 text-purple-700 px-2.5 py-0.5 rounded-full border border-purple-100/60 text-[10px]">HR Tech</span>
                      <span className="bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-100/60 text-[10px]">FinTech</span>
                      <span className="bg-teal-50 text-teal-700 px-2.5 py-0.5 rounded-full border border-teal-100/60 text-[10px]">Climate Tech</span>
                      <span className="bg-amber-50 text-amber-700 px-2.5 py-0.5 rounded-full border border-amber-100/60 text-[10px]">Startup Ecosystem</span>
                    </div>
                  </div>

                  {/* Supporting Statement */}
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-xs text-slate-500 leading-relaxed italic">
                    Whether you're validating a startup idea, modernizing enterprise workflows, or launching an AI-powered platform, ATSFY combines strategic thinking, product expertise, and responsible AI engineering to help you build with confidence.
                  </div>
                </div>

                {/* Right Column (55%) - Interactive Ecosystem Visualization */}
                <div className="lg:col-span-11">
                  <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl border border-slate-800" id="interactive-ecosystem-box">
                    {/* Subtle grid background overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />
                    
                    <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10 flex flex-col items-center">
                      {/* Interactive Section Header */}
                      <div className="w-full flex justify-between items-center mb-6">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                          <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">ATSFY Active Ecosystem</span>
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono">Hover to Explore</div>
                      </div>

                      {/* Tree Structure */}
                      <div className="w-full space-y-6">
                        {/* Tier 1: Root Node */}
                        <div className="flex flex-col items-center">
                          <div 
                            onMouseEnter={() => setHoveredNodeId('ai-products')}
                            onMouseLeave={() => setHoveredNodeId(null)}
                            className={`px-5 py-2.5 rounded-xl border font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                              hoveredNodeId === 'ai-products' 
                                ? 'bg-blue-600/20 border-blue-400 text-blue-300 shadow-lg shadow-blue-500/20 scale-105' 
                                : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                            }`}
                          >
                            <div className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                              AI Products
                            </div>
                          </div>
                          {/* Connection line down to ATSFY */}
                          <div className="w-px h-6 bg-gradient-to-b from-blue-500/80 to-indigo-500/80" />
                        </div>

                        {/* Tier 2: ATSFY Anchor Node */}
                        <div className="flex flex-col items-center">
                          <div 
                            onMouseEnter={() => setHoveredNodeId('atsfy')}
                            onMouseLeave={() => setHoveredNodeId(null)}
                            className={`px-8 py-3.5 rounded-2xl border font-extrabold text-base tracking-widest transition-all duration-300 cursor-pointer shadow-xl relative group ${
                              hoveredNodeId === 'atsfy'
                                ? 'bg-blue-600 border-blue-400 text-white shadow-blue-600/30 scale-105'
                                : 'bg-slate-950 border-blue-500/40 text-blue-400 hover:border-blue-400/80 hover:text-blue-300'
                            }`}
                          >
                            {/* Pulse glow around ATSFY */}
                            <div className="absolute inset-0 bg-blue-500/20 rounded-2xl filter blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            <div className="relative flex items-center gap-2">
                              <Sparkles className={`w-4 h-4 ${hoveredNodeId === 'atsfy' ? 'text-white' : 'text-blue-400'}`} />
                              ATSFY
                            </div>
                          </div>
                          {/* Horizontal connector bar to the pillars */}
                          <div className="relative w-full flex justify-center mt-3 h-5">
                            {/* Vertical core line */}
                            <div className="absolute top-0 bottom-0 w-px bg-indigo-500/50" />
                            {/* Horizontal crossbar line */}
                            <div className="absolute top-1/2 left-[16.6%] right-[16.6%] h-px bg-indigo-500/40" />
                          </div>
                        </div>

                        {/* Tier 3: 3 Pillars Column Layout */}
                        <div className="grid grid-cols-3 gap-3 relative">
                          {/* Pillar 1: Startup MVP */}
                          <div className="flex flex-col items-center">
                            <div 
                              onMouseEnter={() => setHoveredNodeId('startup-mvp')}
                              onMouseLeave={() => setHoveredNodeId(null)}
                              onClick={() => {
                                setActiveTab('home');
                                setTimeout(() => document.getElementById('portfolio-section')?.scrollIntoView({ behavior: 'smooth' }), 100);
                              }}
                              className={`w-full px-2 sm:px-4 py-3 rounded-xl border text-center transition-all duration-300 cursor-pointer ${
                                hoveredNodeId === 'startup-mvp'
                                  ? 'bg-blue-600/20 border-blue-400 text-blue-300 scale-105 shadow-md shadow-blue-500/10'
                                  : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                              }`}
                            >
                              <div className="text-[11px] font-bold uppercase tracking-wider mb-1">Startup MVP</div>
                              <div className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">Fast POC</div>
                            </div>
                            {/* Vertical line down to Education / Finance */}
                            <div className="w-px h-6 bg-slate-800" />
                          </div>

                          {/* Pillar 2: Enterprise AI */}
                          <div className="flex flex-col items-center">
                            <div 
                              onMouseEnter={() => setHoveredNodeId('enterprise-ai')}
                              onMouseLeave={() => setHoveredNodeId(null)}
                              onClick={() => {
                                setActiveTab('home');
                                setTimeout(() => document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' }), 100);
                              }}
                              className={`w-full px-2 sm:px-4 py-3 rounded-xl border text-center transition-all duration-300 cursor-pointer ${
                                hoveredNodeId === 'enterprise-ai'
                                  ? 'bg-indigo-600/20 border-indigo-400 text-indigo-300 scale-105 shadow-md shadow-indigo-500/10'
                                  : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                              }`}
                            >
                              <div className="text-[11px] font-bold uppercase tracking-wider mb-1">Enterprise AI</div>
                              <div className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">Enterprise agent</div>
                            </div>
                            {/* Vertical line down to Healthcare / Sustainability */}
                            <div className="w-px h-6 bg-slate-800" />
                          </div>

                          {/* Pillar 3: Automation */}
                          <div className="flex flex-col items-center">
                            <div 
                              onMouseEnter={() => setHoveredNodeId('automation')}
                              onMouseLeave={() => setHoveredNodeId(null)}
                              className={`w-full px-2 sm:px-4 py-3 rounded-xl border text-center transition-all duration-300 cursor-pointer ${
                                hoveredNodeId === 'automation'
                                  ? 'bg-purple-600/20 border-purple-400 text-purple-300 scale-105 shadow-md shadow-purple-500/10'
                                  : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                              }`}
                            >
                              <div className="text-[11px] font-bold uppercase tracking-wider mb-1">Automation</div>
                              <div className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">Cognitive pipes</div>
                            </div>
                            {/* Vertical line down to Hiring / Startup Tools */}
                            <div className="w-px h-6 bg-slate-800" />
                          </div>
                        </div>

                        {/* Tier 4: Domains Row 1 (Education, Healthcare, Hiring) */}
                        <div className="grid grid-cols-3 gap-3">
                          {/* Domain: Education */}
                          <div className="flex flex-col items-center">
                            <div 
                              onMouseEnter={() => setHoveredNodeId('education')}
                              onMouseLeave={() => setHoveredNodeId(null)}
                              className={`w-full px-2 py-3 rounded-xl border text-center transition-all duration-300 cursor-pointer ${
                                hoveredNodeId === 'education'
                                  ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 scale-105 shadow-sm shadow-emerald-500/10'
                                  : 'bg-slate-950/50 border-slate-900 text-slate-400 hover:border-slate-800 hover:text-slate-200'
                              }`}
                            >
                              <div className="text-[10px] font-semibold">Education</div>
                            </div>
                            {/* Connector down to Finance */}
                            <div className="w-px h-5 bg-slate-800/80" />
                          </div>

                          {/* Domain: Healthcare */}
                          <div className="flex flex-col items-center">
                            <div 
                              onMouseEnter={() => setHoveredNodeId('healthcare')}
                              onMouseLeave={() => setHoveredNodeId(null)}
                              className={`w-full px-2 py-3 rounded-xl border text-center transition-all duration-300 cursor-pointer ${
                                hoveredNodeId === 'healthcare'
                                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 scale-105 shadow-sm shadow-cyan-500/10'
                                  : 'bg-slate-950/50 border-slate-900 text-slate-400 hover:border-slate-800 hover:text-slate-200'
                              }`}
                            >
                              <div className="text-[10px] font-semibold">Healthcare</div>
                            </div>
                            {/* Connector down to Sustainability */}
                            <div className="w-px h-5 bg-slate-800/80" />
                          </div>

                          {/* Domain: Hiring */}
                          <div className="flex flex-col items-center">
                            <div 
                              onMouseEnter={() => setHoveredNodeId('hiring')}
                              onMouseLeave={() => setHoveredNodeId(null)}
                              className={`w-full px-2 py-3 rounded-xl border text-center transition-all duration-300 cursor-pointer ${
                                hoveredNodeId === 'hiring'
                                  ? 'bg-amber-500/20 border-amber-400 text-amber-300 scale-105 shadow-sm shadow-amber-500/10'
                                  : 'bg-slate-950/50 border-slate-900 text-slate-400 hover:border-slate-800 hover:text-slate-200'
                              }`}
                            >
                              <div className="text-[10px] font-semibold">Hiring</div>
                            </div>
                            {/* Connector down to Startup Tools */}
                            <div className="w-px h-5 bg-slate-800/80" />
                          </div>
                        </div>

                        {/* Tier 5: Domains Row 2 (Finance, Sustainability, Startup Tools) */}
                        <div className="grid grid-cols-3 gap-3">
                          {/* Domain: Finance */}
                          <div className="flex flex-col items-center">
                            <div 
                              onMouseEnter={() => setHoveredNodeId('finance')}
                              onMouseLeave={() => setHoveredNodeId(null)}
                              className={`w-full px-2 py-3 rounded-xl border text-center transition-all duration-300 cursor-pointer ${
                                hoveredNodeId === 'finance'
                                  ? 'bg-blue-500/20 border-blue-400 text-blue-300 scale-105 shadow-sm shadow-blue-500/10'
                                  : 'bg-slate-950/50 border-slate-900 text-slate-400 hover:border-slate-800 hover:text-slate-200'
                              }`}
                            >
                              <div className="text-[10px] font-semibold">Finance</div>
                            </div>
                          </div>

                          {/* Domain: Sustainability */}
                          <div className="flex flex-col items-center">
                            <div 
                              onMouseEnter={() => setHoveredNodeId('sustainability')}
                              onMouseLeave={() => setHoveredNodeId(null)}
                              className={`w-full px-2 py-3 rounded-xl border text-center transition-all duration-300 cursor-pointer ${
                                hoveredNodeId === 'sustainability'
                                  ? 'bg-teal-500/20 border-teal-400 text-teal-300 scale-105 shadow-sm shadow-teal-500/10'
                                  : 'bg-slate-950/50 border-slate-900 text-slate-400 hover:border-slate-800 hover:text-slate-200'
                              }`}
                            >
                              <div className="text-[10px] font-semibold">Sustainability</div>
                            </div>
                          </div>

                          {/* Domain: Startup Tools */}
                          <div className="flex flex-col items-center">
                            <div 
                              onMouseEnter={() => setHoveredNodeId('startup-tools')}
                              onMouseLeave={() => setHoveredNodeId(null)}
                              className={`w-full px-2 py-3 rounded-xl border text-center transition-all duration-300 cursor-pointer ${
                                hoveredNodeId === 'startup-tools'
                                  ? 'bg-rose-500/20 border-rose-400 text-rose-300 scale-105 shadow-sm shadow-rose-500/10'
                                  : 'bg-slate-950/50 border-slate-900 text-slate-400 hover:border-slate-800 hover:text-slate-200'
                              }`}
                            >
                              <div className="text-[10px] font-semibold">Startup Tools</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Dynamic Details Area */}
                      <div className="w-full mt-6 bg-slate-950/80 border border-slate-800 rounded-2xl p-4 min-h-[95px] flex flex-col justify-center transition-all duration-300">
                        {hoveredNodeId ? (
                          <div className="animate-in fade-in slide-in-from-bottom-2 duration-200 text-left">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                              <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                                {ECOSYSTEM_NODES.find(n => n.id === hoveredNodeId)?.label}
                              </span>
                            </div>
                            <p className="text-xs text-slate-300 leading-relaxed">
                              {ECOSYSTEM_NODES.find(n => n.id === hoveredNodeId)?.desc}
                            </p>
                          </div>
                        ) : (
                          <div className="text-center text-xs text-slate-500 italic py-2 select-none">
                            Hover over any node in the interactive architecture to explore ATSFY’s built products, pillars, and domains.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scroll Cue at bottom of Hero */}
              <div className="flex flex-col items-center justify-center pt-10 pb-4 animate-bounce">
                <button 
                  onClick={() => document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group flex flex-col items-center gap-1.5 text-slate-400 hover:text-blue-600 transition-colors text-xs font-bold uppercase tracking-widest cursor-pointer"
                >
                  <span className="text-sm font-bold">↓</span>
                  <span>Discover Our Services</span>
                </button>
              </div>
            </section>

            {/* BUILT FOR AMBITIOUS IDEAS SECTION */}
            <section className="bg-slate-900 text-white py-20 relative overflow-hidden" id="stats-section">
              {/* Background Glow effects */}
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Left Column: Heading and Description */}
                  <div className="lg:col-span-6 space-y-6">
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-widest bg-blue-500/10 px-3 py-1.5 rounded-full border border-blue-500/20">
                      ATSFY Philosophy
                    </span>
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight" id="built-ambitious-title">
                      Built for <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Ambitious Ideas</span>
                    </h2>
                    <p className="text-slate-300 text-base md:text-lg leading-relaxed font-normal">
                      From early-stage startups to enterprise teams, we turn complex AI ideas into production-ready products with strategy, design, and engineering under one roof.
                    </p>
                  </div>

                  {/* Right Column: Grid of High-Impact Value Pillars */}
                  <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6" id="ambitious-pillars">
                    {[
                      {
                        title: "AI Product Development",
                        desc: "Transforming ambitious AI concepts into robust, validated, production-ready systems.",
                        iconBg: "bg-blue-500/10 text-blue-400 border-blue-500/20",
                      },
                      {
                        title: "Intelligent Automation",
                        desc: "Streamlining operations and workflows with advanced agentic LLM integrations.",
                        iconBg: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
                      },
                      {
                        title: "Custom Software",
                        desc: "Crafting highly performant, custom-tailored full-stack platforms from the ground up.",
                        iconBg: "bg-purple-500/10 text-purple-400 border-purple-500/20",
                      },
                      {
                        title: "Long-Term Partnership",
                        desc: "Supporting your growth scale-by-scale, ensuring seamless system evolution.",
                        iconBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                      }
                    ].map((pillar, idx) => (
                      <div 
                        key={idx} 
                        className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 hover:bg-slate-800/75 hover:border-slate-700/80 transition-all duration-300 group shadow-lg"
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg mb-4 border ${pillar.iconBg} group-hover:scale-110 transition-transform duration-300`}>
                          ✓
                        </div>
                        <h4 className="text-base font-bold text-white mb-2 tracking-tight group-hover:text-blue-300 transition-colors">
                          {pillar.title}
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {pillar.desc}
                        </p>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </section>

            {/* SERVICES SECTION */}
            <section className="bg-slate-50/70 border-y border-slate-100/80 py-24" id="services-section">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Out-of-the-box outcomes strip: We Help You */}
                <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-6 bg-white border border-slate-200/50 rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center gap-2 text-slate-800 font-extrabold text-xs uppercase tracking-wider shrink-0">
                    <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
                    <span>We Help You:</span>
                  </div>
                  <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-6 gap-y-3 font-semibold text-xs sm:text-sm text-slate-700">
                    <div className="flex items-center gap-1.5">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>Validate Ideas</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>Build MVPs</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>Launch AI Products</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>Automate Operations</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>Scale Software</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                  <div className="space-y-4 max-w-3xl">
                    <span className="px-3 py-1 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-md">capabilities</span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
                      AI Solutions Built Around Your Business Goals
                    </h2>
                    <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                      From AI-powered products to intelligent automation, we help startups, enterprises, and organizations transform ideas into scalable digital solutions.
                    </p>
                  </div>
                  <div className="shrink-0">
                    <div className="inline-flex flex-col items-center bg-white border border-slate-200/60 px-4 py-2.5 rounded-xl shadow-sm text-center">
                      <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400">Typical Engagement</span>
                      <span className="text-xs font-bold text-blue-600">6–16 Weeks</span>
                    </div>
                  </div>
                </div>

                {/* Services Grid with 100ms stagger animation setup */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {SERVICES_DATA.map((service, index) => (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      key={service.id}
                      onClick={() => setSelectedService(service)}
                      className="group bg-white border border-slate-200/80 p-8 rounded-3xl shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-blue-500/50 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                      id={`service-card-${service.id}`}
                    >
                      <div className="space-y-5">
                        <div className="flex items-start justify-between">
                          {/* Service Icon Box */}
                          <div className="w-12 h-12 bg-slate-50 text-slate-900 border border-slate-100 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300 group-hover:scale-105">
                            {renderIcon(service.iconName, "w-6 h-6")}
                          </div>

                          {/* "Best For" Tag */}
                          {service.idealFor && (
                            <span className="text-[10px] font-bold text-slate-500 bg-slate-100/80 px-2.5 py-1 rounded-full border border-slate-200/50">
                              🏷 Best For: {service.idealFor.join(' • ')}
                            </span>
                          )}
                        </div>

                        <div>
                          <h3 className="text-lg font-bold tracking-tight text-slate-950 mb-2 group-hover:text-blue-600 transition-colors">
                            {service.title}
                          </h3>
                          
                          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed min-h-[40px] line-clamp-2">
                            {service.description}
                          </p>
                        </div>

                        {/* Deliverables Block */}
                        <div className="space-y-2 pt-2 border-t border-slate-100">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Key Deliverables:</span>
                          <ul className="space-y-2">
                            {service.features.map((feature, fIdx) => (
                              <li key={fIdx} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                                <span className="text-emerald-600 font-extrabold text-xs">✓</span>
                                <span className="line-clamp-1">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-xs font-bold text-blue-600 group-hover:text-blue-700 uppercase tracking-wider inline-flex items-center gap-1">
                          <span>Learn More</span>
                          <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">spec sheet</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Closing Line & CTA */}
                <div className="mt-16 text-center space-y-6 max-w-2xl mx-auto bg-white border border-slate-200/60 p-8 rounded-3xl shadow-sm">
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    Not sure which service fits your needs? <br className="hidden sm:inline" />
                    <strong>Book a Free AI Strategy Session</strong>, and we'll help you choose the right approach based on your goals.
                  </p>
                  <div>
                    <button 
                      onClick={() => {
                        setActiveTab('planner');
                        setTimeout(() => document.getElementById('strategy-planner-box')?.scrollIntoView({ behavior: 'smooth' }), 100);
                      }}
                      className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 inline-flex items-center gap-2 cursor-pointer"
                    >
                      <span>Book Free Strategy Session</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            </section>

            {/* SERVICES DETAIL MODAL DRAWER */}
            {selectedService && (
              <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-200" id="service-detail-modal">
                  <div className="sticky top-0 bg-slate-50 border-b border-slate-100 px-8 py-5 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center">
                        {renderIcon(selectedService.iconName, "w-5 h-5")}
                      </div>
                      <span className="text-sm font-bold tracking-wide uppercase text-slate-500">Service Specs</span>
                    </div>
                    <button 
                      onClick={() => setSelectedService(null)}
                      className="w-8 h-8 rounded-full hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="p-8 space-y-6">
                    <div>
                      <h3 className="text-3xl font-extrabold text-slate-950 tracking-tight mb-3">
                        {selectedService.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        {selectedService.longDescription}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">Key Engineering Deliverables:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {selectedService.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-sm text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                            <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-2">Primary Stacks:</span>
                      {selectedService.techStack.map((tech, i) => (
                        <span key={i} className="text-xs px-2.5 py-1 bg-slate-900 text-slate-100 font-mono rounded-md">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="p-4 bg-blue-50/70 border border-blue-100/50 rounded-2xl">
                      <p className="text-xs font-bold uppercase text-blue-800 tracking-wider mb-1">Impact Metric</p>
                      <p className="text-sm text-blue-950 font-medium leading-relaxed">{selectedService.impactMetric}</p>
                    </div>

                    <div className="pt-4 flex gap-3">
                      <button 
                        onClick={() => {
                          setSelectedService(null);
                          setActiveTab('planner');
                          setTimeout(() => document.getElementById('strategy-planner-box')?.scrollIntoView({ behavior: 'smooth' }), 100);
                        }}
                        className="flex-1 py-3 bg-blue-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl text-center shadow-md hover:bg-blue-700 transition-colors"
                      >
                        Plan MVP in this Sector
                      </button>
                      <button 
                        onClick={() => setSelectedService(null)}
                        className="px-6 py-3 border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs uppercase tracking-wider rounded-xl"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PORTFOLIO SHOWCASE SECTION */}
            <section className="bg-slate-50 border-t border-slate-200/60 py-24" id="portfolio-section">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <div className="mb-16 space-y-5 max-w-3xl">
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 border border-blue-200/60 text-xs font-bold uppercase tracking-widest rounded-md">Our Proven Track Record</span>
                  <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950">
                    Building AI Products Across Industries
                  </h2>
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                    Our experience comes from building real AI products that solve real business challenges. Every solution strengthens the expertise we bring to our client partnerships.
                  </p>
                </div>

                {/* Statistics Row above portfolio grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16 max-w-5xl mx-auto">
                  <div className="bg-white border border-slate-200/60 p-5 rounded-2xl shadow-sm text-center space-y-1">
                    <span className="text-3xl sm:text-4xl font-extrabold text-blue-600 tracking-tight block">8+</span>
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-500 block">AI Products</span>
                  </div>
                  <div className="bg-white border border-slate-200/60 p-5 rounded-2xl shadow-sm text-center space-y-1">
                    <span className="text-3xl sm:text-4xl font-extrabold text-blue-600 tracking-tight block">6+</span>
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-500 block">Industries</span>
                  </div>
                  <div className="bg-white border border-slate-200/60 p-5 rounded-2xl shadow-sm text-center space-y-1">
                    <span className="text-3xl sm:text-4xl font-extrabold text-blue-600 tracking-tight block">100%</span>
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-500 block">Custom Solutions</span>
                  </div>
                  <div className="bg-white border border-slate-200/60 p-5 rounded-2xl shadow-sm text-center space-y-1">
                    <span className="text-2xl sm:text-3xl font-extrabold text-blue-600 tracking-tight block py-1">End-to-End</span>
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-500 block">Development</span>
                  </div>
                </div>

                {/* Filter Tab Bar */}
                <div className="flex flex-wrap gap-2 mb-12 border-b border-slate-200 pb-6">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 text-xs font-bold tracking-wider uppercase rounded-xl transition-all duration-300 cursor-pointer ${
                        selectedCategory === cat 
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-600/10' 
                          : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                      id={`portfolio-filter-${cat.toLowerCase().replace(' ', '-')}`}
                    >
                      {categoryDisplay(cat)}
                    </button>
                  ))}
                </div>

                {/* Portfolio Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPortfolio.map((project, index) => {
                    return (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        key={project.id}
                        onClick={() => setSelectedProject(project)}
                        className="group bg-white border border-slate-200/80 p-6 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-blue-500/50 transition-all duration-300 cursor-pointer flex flex-col justify-between h-full"
                        id={`portfolio-card-${project.id}`}
                      >
                        <div className="space-y-5">
                          {/* Screenshot Container */}
                          <div className="aspect-[16/10] bg-slate-950/95 border border-slate-800 rounded-2xl relative overflow-hidden flex flex-col transition-all duration-500 group-hover:scale-[1.03] group-hover:shadow-md group-hover:shadow-blue-500/10">
                            {/* Browser header */}
                            <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-slate-900/40">
                              <div className="flex gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-red-500/60"></span>
                                <span className="w-2 h-2 rounded-full bg-yellow-500/60"></span>
                                <span className="w-2 h-2 rounded-full bg-green-500/60"></span>
                              </div>
                              <div className="text-[8px] font-mono text-slate-500 bg-slate-950 px-3 py-0.5 rounded border border-white/5 truncate max-w-[120px]">
                                atsfy.com/{project.id}
                              </div>
                              <div className="w-8"></div>
                            </div>
                            {/* Visual Interface */}
                            <div className="flex-1 p-3 flex items-center justify-center relative overflow-hidden">
                              {renderProductMockup(project.id)}
                            </div>
                          </div>

                          {/* Industry Badge & Top Metric */}
                          <div className="space-y-2.5">
                            <div className="flex justify-between items-center gap-2">
                              {(() => {
                                const details = getCategoryDetails(project.category, project.id);
                                return (
                                  <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full border ${details.bg} group-hover:border-blue-400 group-hover:shadow-sm transition-all duration-300`}>
                                    {details.emoji} {details.label}
                                  </span>
                                );
                              })()}
                              
                              <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 shrink-0">
                                {project.metricValue} {project.metricLabel}
                              </span>
                            </div>

                            {/* Title & One-line Value Prop */}
                            <div className="space-y-1">
                              <h3 className="text-xl font-extrabold tracking-tight text-slate-950 group-hover:text-blue-600 transition-colors">
                                {project.title}
                              </h3>
                              <p className="text-xs font-semibold text-slate-400 tracking-wide italic leading-normal">
                                "{project.tagline}"
                              </p>
                            </div>

                            {/* Business Outcome (shifting focus from features to outcomes) */}
                            {project.businessOutcome && (
                              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                                {project.businessOutcome}
                              </p>
                            )}
                          </div>

                          {/* Capabilities tags (3-4) */}
                          {project.capabilities && (
                            <div className="space-y-1.5 pt-3 border-t border-slate-100">
                              <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 block">Core Capabilities:</span>
                              <div className="flex flex-wrap gap-1.5">
                                {project.capabilities.slice(0, 3).map((cap, i) => (
                                  <span key={i} className="text-[10px] bg-slate-50 border border-slate-200/60 text-slate-700 px-2.5 py-0.5 rounded-lg font-semibold">
                                    {cap}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Tech stack and CTA */}
                        <div className="pt-4 mt-5 border-t border-slate-100 flex flex-col gap-3">
                          <div className="flex flex-wrap gap-1">
                            {project.techStack.slice(0, 4).map((tech, i) => (
                              <span key={i} className="text-[9px] font-mono bg-slate-50 border border-slate-100 text-slate-500 px-2 py-0.5 rounded">
                                {tech}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center justify-between text-blue-600 font-extrabold uppercase tracking-wider text-[11px] pt-1">
                            <span className="group-hover:text-blue-700 inline-flex items-center gap-1 transition-colors">
                              <span>View Case Study</span>
                              <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </span>
                            <span className="text-[9px] text-slate-400 font-mono font-normal">case study</span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Transition CTA card */}
                <div className="mt-20 text-center space-y-6 max-w-2xl mx-auto bg-white border border-slate-200/60 p-8 rounded-3xl shadow-sm">
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    Your idea could be the next product in our portfolio. <br className="hidden sm:inline" />
                    <strong>Let's collaborate to engineer high-impact AI built around your business goals.</strong>
                  </p>
                  <div>
                    <button 
                      onClick={() => {
                        const plannerEl = document.getElementById('strategy-planner-box') || document.getElementById('planner-section');
                        if (plannerEl) {
                          plannerEl.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 inline-flex items-center gap-2 cursor-pointer"
                    >
                      <span>Book a Free AI Strategy Session</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            </section>

            {/* PORTFOLIO DETAILED BLUEPRINT MODAL */}
            {selectedProject && (
              <div className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-slate-950 border border-white/10 rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl text-white animate-in fade-in zoom-in duration-200" id="portfolio-detail-modal">
                  
                  {/* Sticky Top Bar */}
                  <div className="sticky top-0 bg-slate-900/90 backdrop-blur border-b border-white/10 px-8 py-5 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-black tracking-widest uppercase bg-blue-600 text-white px-2.5 py-1 rounded">
                        {selectedProject.category} Case Study
                      </span>
                    </div>
                    <button 
                      onClick={() => setSelectedProject(null)}
                      className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-8 space-y-8">
                    <div>
                      <h3 className="text-3xl font-extrabold tracking-tight mb-2">
                        {selectedProject.title}
                      </h3>
                      <p className="text-lg text-blue-400 font-medium italic">
                        "{selectedProject.tagline}"
                      </p>
                    </div>

                    {/* Numeric Impact Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white/5 p-6 rounded-2xl border border-white/5">
                      <div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Key Dynamic Metric</span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl font-black text-blue-400">{selectedProject.metricValue}</span>
                          <span className="text-sm font-semibold text-slate-300">{selectedProject.metricLabel}</span>
                        </div>
                      </div>
                      <div className="border-t sm:border-t-0 sm:border-l border-white/10 pt-4 sm:pt-0 sm:pl-6">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Audit Outcome</span>
                        <span className="text-xs text-slate-300 leading-relaxed block">
                          This metric was verified through post-deployment database validation and telemetry tracking.
                        </span>
                      </div>
                    </div>

                    {/* Challenge vs Solution */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <h4 className="text-sm font-extrabold uppercase text-slate-400 tracking-wider flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                          <span>The Challenge</span>
                        </h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {selectedProject.challenge}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-sm font-extrabold uppercase text-slate-400 tracking-wider flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <span>The ATSFY Engineering Solution</span>
                        </h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {selectedProject.solution}
                        </p>
                      </div>
                    </div>

                    {/* Verified Metrics list */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-extrabold uppercase text-slate-400 tracking-wider">Verified Project Milestones</h4>
                      <div className="space-y-2">
                        {selectedProject.impact.map((metric, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-slate-200 bg-white/5 p-3 rounded-xl border border-white/5">
                            <CheckCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                            <span>{metric}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Client Testimonial */}
                    {selectedProject.clientQuote && (
                      <div className="border-l-4 border-blue-600 bg-white/5 p-5 rounded-r-2xl">
                        <p className="text-xs italic text-slate-300 leading-relaxed mb-3">
                          "{selectedProject.clientQuote}"
                        </p>
                        <div className="text-right">
                          <p className="text-xs font-bold text-white">{selectedProject.clientAuthor}</p>
                          <p className="text-[10px] text-slate-400">{selectedProject.clientRole}</p>
                        </div>
                      </div>
                    )}

                    {/* Tech stacks */}
                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-2">Tech Specs Deployed:</span>
                      {selectedProject.techStack.map((tech, i) => (
                        <span key={i} className="text-xs px-2.5 py-1 bg-slate-900 text-slate-100 font-mono rounded-md border border-white/10">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* CTA Footer */}
                    <div className="pt-4 flex gap-3">
                      <button 
                        onClick={() => {
                          setSelectedProject(null);
                          setActiveTab('planner');
                          setTimeout(() => document.getElementById('strategy-planner-box')?.scrollIntoView({ behavior: 'smooth' }), 100);
                        }}
                        className="flex-1 py-3.5 bg-blue-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl text-center shadow-md hover:bg-blue-700 transition-colors"
                      >
                        Request Case Implementation for your Business
                      </button>
                      <button 
                        onClick={() => setSelectedProject(null)}
                        className="px-6 py-3.5 border border-white/10 text-slate-300 hover:bg-white/5 font-bold text-xs uppercase tracking-wider rounded-xl"
                      >
                        Close Logs
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* DEVELOPMENT BLUEPRINT PROCESS SECTION */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-slate-200/50" id="methodology-section">
              <div className="mb-12 text-center max-w-3xl mx-auto space-y-5">
                <span className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold uppercase tracking-widest rounded-md">
                  Our Proven Development Process
                </span>
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950">
                  From Idea to AI Product — Our Proven Development Process
                </h2>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                  Every successful AI product follows a clear roadmap. Our collaborative process ensures transparency, faster execution, and measurable business outcomes at every stage.
                </p>
                
                {/* Biggest Improvement Accent Statement */}
                <div className="pt-2">
                  <div className="inline-block bg-blue-50/75 border border-blue-100/80 px-6 py-3.5 rounded-2xl max-w-2xl text-center shadow-sm">
                    <p className="text-blue-800 text-xs sm:text-sm font-extrabold tracking-wide leading-relaxed">
                      💡 "Every project is led with the mindset of a product team—not just a software development team."
                    </p>
                  </div>
                </div>
              </div>

              {/* Connected Timeline Header above the process steps */}
              <div className="bg-white border border-slate-200/60 rounded-3xl p-6 mb-10 max-w-5xl mx-auto shadow-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-slate-50/30 -z-10" />
                <div className="flex flex-col md:flex-row items-stretch justify-between gap-4 md:gap-2 relative">
                  {/* Connecting horizontal line for desktop */}
                  <div className="hidden md:block absolute left-[10%] right-[10%] top-[24px] h-[2px] bg-dashed-line bg-[linear-gradient(to_right,#e2e8f0_50%,transparent_50%)] bg-[length:10px_100%] -z-10" />
                  
                  {developmentStages.map((stage, idx) => {
                    const isSelected = activeStageIndex === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => setActiveStageIndex(idx)}
                        className="flex flex-row md:flex-col items-center gap-3.5 md:gap-2.5 text-left md:text-center flex-1 cursor-pointer group focus:outline-none p-3 rounded-2xl hover:bg-slate-50/50 transition-all duration-300"
                      >
                        {/* Phase Circle bubble */}
                        <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm border transition-all duration-500 shrink-0 ${
                          isSelected 
                            ? 'bg-blue-600 text-white border-blue-600 ring-4 ring-blue-100/70 shadow-md shadow-blue-500/10 scale-105' 
                            : 'bg-white text-slate-500 border-slate-200 group-hover:border-slate-300 group-hover:text-slate-800'
                        }`}>
                          {stage.phase}
                        </div>
                        
                        {/* Text details inside timeline bubble header */}
                        <div className="flex flex-col">
                          <span className={`text-xs font-black tracking-tight transition-colors duration-300 ${
                            isSelected ? 'text-blue-600' : 'text-slate-700 group-hover:text-slate-900'
                          }`}>
                            {stage.title}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400 font-extrabold uppercase tracking-wider mt-0.5">
                            {stage.timeline}
                          </span>
                        </div>

                        {/* Mobile arrow indicator */}
                        {idx < developmentStages.length - 1 && (
                          <span className="md:hidden text-slate-300 ml-auto font-bold text-sm">↓</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Connected Cards Timeline - Horizontal on desktop, Vertical on mobile */}
              <div className="relative flex flex-col md:flex-row gap-4 lg:gap-5 justify-between items-stretch mb-8">
                {developmentStages.map((stage, idx) => {
                  const isSelected = activeStageIndex === idx;
                  return (
                    <div key={idx} className="relative flex-1 flex flex-col">
                      <button
                        onClick={() => setActiveStageIndex(idx)}
                        className={`w-full text-left p-6 rounded-2xl border transition-all duration-500 cursor-pointer flex flex-col justify-between h-full relative z-10 ${
                          isSelected 
                            ? 'bg-white border-blue-600 shadow-xl shadow-blue-500/5 ring-1 ring-blue-500/15 -translate-y-1' 
                            : 'bg-white border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/50 hover:-translate-y-0.5'
                        }`}
                        id={`process-card-${idx}`}
                      >
                        {/* Phase Number & Icon */}
                        <div className="flex justify-between items-center w-full mb-4">
                          <span className={`text-xl font-extrabold font-mono transition-colors duration-300 ${
                            isSelected ? 'text-blue-600' : 'text-slate-300'
                          }`}>
                            {stage.phase}
                          </span>
                          <div className={`p-2.5 rounded-xl transition-colors duration-300 ${
                            isSelected ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-500'
                          }`}>
                            {renderIcon(stage.icon, "w-4 h-4")}
                          </div>
                        </div>

                        {/* Title, Short Description & Deliverable preview */}
                        <div className="space-y-2">
                          <h4 className={`text-sm font-extrabold tracking-tight transition-colors duration-300 ${
                            isSelected ? 'text-slate-950' : 'text-slate-800'
                          }`}>
                            {stage.title}
                          </h4>
                          <p className="text-xs text-slate-500 leading-relaxed font-medium">
                            {stage.shortDescription}
                          </p>
                          <div className="pt-2 border-t border-slate-100 flex items-center gap-1">
                            <span className="text-[10px] font-mono text-slate-400 font-extrabold uppercase tracking-wider block">Est: {stage.timeline}</span>
                          </div>
                        </div>
                      </button>

                      {/* Desktop horizontal connector */}
                      {idx < developmentStages.length - 1 && (
                        <div className="hidden md:block absolute top-[40px] -right-3 lg:-right-4 w-6 lg:w-8 h-0.5 z-20">
                          <div className={`h-full border-t-2 border-dashed transition-colors duration-500 ${
                            activeStageIndex > idx ? 'border-blue-500' : 'border-slate-300'
                          }`} />
                        </div>
                      )}

                      {/* Mobile vertical connector arrow */}
                      {idx < developmentStages.length - 1 && (
                        <div className="md:hidden flex justify-center py-2 text-slate-300">
                          <span className="text-lg">↓</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Trust Promise Callout Box */}
              <div className="text-center py-5 bg-slate-50 border border-slate-200/60 rounded-2xl max-w-4xl mx-auto shadow-sm">
                <p className="text-xs md:text-sm font-bold text-slate-600 italic max-w-2xl mx-auto px-4">
                  No hidden processes. No unnecessary complexity. Just a clear roadmap from idea to launch—with transparency at every stage.
                </p>
              </div>

              {/* Expandable details below timeline with Framer Motion */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStageIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="mt-8 bg-white border border-slate-200/80 rounded-3xl p-8 lg:p-12 shadow-md relative overflow-hidden"
                >
                  {/* Backdrop glowing accent */}
                  <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-50/40 rounded-full blur-3xl pointer-events-none -z-10" />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left details side */}
                    <div className="lg:col-span-7 space-y-6">
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 font-bold uppercase tracking-wider rounded-full">
                            Phase {developmentStages[activeStageIndex].phase}
                          </span>
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                          <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                            {developmentStages[activeStageIndex].title} Stage
                          </span>
                        </div>
                        <h3 className="text-3xl font-extrabold tracking-tight text-slate-950">
                          {developmentStages[activeStageIndex].title}
                        </h3>
                        <p className="text-slate-500 text-sm md:text-base font-semibold leading-relaxed">
                          "{developmentStages[activeStageIndex].shortDescription}"
                        </p>
                      </div>

                      <p className="text-slate-600 text-sm md:text-base leading-relaxed font-normal">
                        {developmentStages[activeStageIndex].longDescription}
                      </p>

                      {/* Outcome Box */}
                      <div className="p-5 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl space-y-2">
                        <span className="text-[10px] font-extrabold text-emerald-600 uppercase tracking-widest block">Stage Outcome</span>
                        <p className="text-xs md:text-sm text-slate-950 font-bold leading-normal flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{developmentStages[activeStageIndex].outcome}</span>
                        </p>
                      </div>
                    </div>

                    {/* Right deliverables list */}
                    <div className="lg:col-span-5 space-y-5 lg:pl-8 lg:border-l border-slate-100 flex flex-col justify-between h-full">
                      <div className="space-y-4">
                        <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">
                          Stage Parameters & Deliverables
                        </h4>
                        
                        {/* Timeline */}
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100/80 space-y-1">
                          <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-400 block">Estimated Timeline</span>
                          <div className="flex items-center gap-2.5 text-slate-900 font-bold text-sm">
                            <Clock className="w-4 h-4 text-blue-600" />
                            <span>{developmentStages[activeStageIndex].timeline}</span>
                          </div>
                        </div>

                        {/* Deliverable */}
                        <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100/50 space-y-1">
                          <span className="text-[9px] uppercase tracking-wider font-extrabold text-blue-500 block">Highlighted Deliverable</span>
                          <div className="text-slate-900 font-extrabold text-sm">
                            {developmentStages[activeStageIndex].deliverable}
                          </div>
                        </div>

                        {/* Collaboration */}
                        <div className="bg-indigo-50/40 p-4 rounded-xl border border-indigo-100/40 space-y-1">
                          <span className="text-[9px] uppercase tracking-wider font-extrabold text-indigo-500 block">Client Involvement</span>
                          <div className="text-slate-900 font-bold text-sm flex items-center gap-1.5">
                            <Handshake className="w-4 h-4 text-indigo-600" />
                            <span>{developmentStages[activeStageIndex].collaboration}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* What Makes Our Process Different? Block */}
              <div className="mt-16 bg-slate-50 border border-slate-200/60 rounded-3xl p-8 lg:p-12 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-indigo-50/30 rounded-full blur-3xl pointer-events-none -z-10" />
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-4 space-y-3">
                    <span className="text-[10px] bg-indigo-100 text-indigo-700 px-2.5 py-1 font-bold uppercase tracking-wider rounded-md border border-indigo-200">
                      Our Philosophy
                    </span>
                    <h3 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-950">
                      What Makes Our Process Different?
                    </h3>
                  </div>
                  <div className="lg:col-span-8 space-y-4 text-slate-600 text-sm md:text-base leading-relaxed font-normal">
                    <p className="font-semibold text-slate-800">
                      More than a development partner—we're product builders.
                    </p>
                    <p>
                      We combine business strategy, product thinking, engineering excellence, and responsible AI practices to create solutions designed for long-term success—not short-term delivery.
                    </p>
                    <p className="font-semibold text-blue-600">
                      Every stage is collaborative, transparent, and focused on creating measurable business outcomes.
                    </p>
                  </div>
                </div>
              </div>

              {/* Transition CTA block to Why Choose Us */}
              <div className="mt-12 text-center max-w-2xl mx-auto py-8 px-6 bg-slate-100/50 border border-slate-200/50 rounded-3xl">
                <p className="text-slate-800 text-base md:text-lg font-bold">
                  A great process creates great products—but the right partner makes all the difference.
                </p>
                <div className="mt-4 flex justify-center">
                  <button 
                    onClick={() => {
                      document.getElementById('why-choose-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-xs font-extrabold uppercase tracking-widest text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer group"
                  >
                    <span>Discover Why We Are That Partner</span>
                    <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>

            </section>

            {/* WHY CHOOSE US SECTION */}
            <section className="bg-gradient-to-b from-slate-50 to-blue-50/30 py-24 border-t border-slate-200/50" id="why-choose-section">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header Section */}
                <div className="mb-12 text-center max-w-3xl mx-auto space-y-4">
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold uppercase tracking-widest rounded-md">
                    Why Businesses Choose ATSFY
                  </span>
                  <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950 leading-tight">
                    Why Businesses Choose ATSFY
                  </h2>
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                    We combine product strategy, AI engineering, and real-world venture-building experience to create AI products that deliver measurable business value.
                  </p>
                </div>

                {/* Evidence-Based Positioning / Biggest Improvement */}
                <div className="mb-16 bg-blue-500/5 border border-blue-500/10 rounded-3xl p-6 md:p-8 max-w-4xl mx-auto text-center relative overflow-hidden shadow-sm">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100/30 rounded-full blur-2xl pointer-events-none" />
                  <p className="text-blue-900 font-extrabold text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
                    ⭐ "Our experience is shaped by building AI products across education, healthcare, HR, finance, sustainability, and the startup ecosystem. Every client benefits from those lessons."
                  </p>
                </div>

                {/* Six Premium Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-20">
                  {whyChooseUsCards.map((card, idx) => (
                    <div 
                      key={idx}
                      className="bg-white border border-slate-200/80 rounded-3xl p-6 lg:p-8 shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-blue-500/50 transition-all duration-500 flex flex-col justify-between group h-full"
                    >
                      <div className="space-y-4">
                        <div className="w-12 h-12 bg-slate-50 border border-slate-100 text-slate-700 rounded-2xl flex items-center justify-center shadow-inner group-hover:bg-blue-50 group-hover:border-blue-100 group-hover:text-blue-600 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shrink-0">
                          {renderIcon(card.icon, "w-6 h-6 transition-all duration-300")}
                        </div>
                        <h3 className="text-base lg:text-lg font-extrabold tracking-tight text-slate-950 group-hover:text-blue-600 transition-colors duration-300">{card.title}</h3>
                        <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-normal">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Founder Mindset Highlight Callout */}
                <div className="my-16 relative bg-slate-900 text-white rounded-3xl p-8 lg:p-12 overflow-hidden shadow-xl border border-slate-800 max-w-5xl mx-auto">
                  <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 opacity-[0.03] pointer-events-none">
                    <Sparkles className="w-[350px] h-[350px]" />
                  </div>
                  <div className="max-w-3xl space-y-4 relative z-10">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full border border-blue-500/30 inline-block">
                      The Founder Mindset
                    </span>
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-extrabold leading-snug tracking-tight text-white italic">
                      "We don't approach projects like an outsourcing agency. We approach them like product builders who care about long-term success."
                    </h3>
                    <p className="text-slate-400 text-xs md:text-sm font-semibold uppercase tracking-wider flex items-center gap-2 mt-2">
                      <span className="w-4 h-0.5 bg-blue-500" />
                      The ATSFY Product & Venture Team
                    </p>
                  </div>
                </div>

                {/* Comparison Table Section */}
                <div className="my-20 space-y-8 max-w-5xl mx-auto">
                  <div className="text-center space-y-2">
                    <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-950">
                      How We Compare
                    </h3>
                    <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                      We replace transactional outsourcing patterns with true collaborative engineering and product ownership.
                    </p>
                  </div>

                  <div className="overflow-x-auto bg-white border border-slate-200/60 rounded-3xl shadow-sm">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50/75 border-b border-slate-200/80">
                          <th className="p-5 text-xs font-bold uppercase tracking-wider text-slate-500 w-[24%]">Focus Area</th>
                          <th className="p-5 text-xs font-bold uppercase tracking-wider text-slate-500 w-[38%]">Typical Development Agency</th>
                          <th className="p-5 text-xs font-extrabold uppercase tracking-wider text-blue-600 bg-blue-50/40 w-[38%]">ATSFY Approach</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        <tr className="hover:bg-slate-50/20 transition-colors">
                          <td className="p-5 text-xs font-extrabold text-slate-700">Strategy & Vision</td>
                          <td className="p-5 text-xs sm:text-sm text-slate-500 font-medium">Builds software strictly from specifications</td>
                          <td className="p-5 text-xs sm:text-sm text-blue-900 font-extrabold bg-blue-50/10">
                            <span className="text-blue-600 mr-2">✓</span> Helps shape the product strategy
                          </td>
                        </tr>
                        <tr className="hover:bg-slate-50/20 transition-colors">
                          <td className="p-5 text-xs font-extrabold text-slate-700">Core Metric</td>
                          <td className="p-5 text-xs sm:text-sm text-slate-500 font-medium">Focuses on delivery and ticket completion</td>
                          <td className="p-5 text-xs sm:text-sm text-blue-900 font-extrabold bg-blue-50/10">
                            <span className="text-blue-600 mr-2">✓</span> Focuses on real business outcomes
                          </td>
                        </tr>
                        <tr className="hover:bg-slate-50/20 transition-colors">
                          <td className="p-5 text-xs font-extrabold text-slate-700">Client Integration</td>
                          <td className="p-5 text-xs sm:text-sm text-slate-500 font-medium">Limited and transactional post-launch care</td>
                          <td className="p-5 text-xs sm:text-sm text-blue-900 font-extrabold bg-blue-50/10">
                            <span className="text-blue-600 mr-2">✓</span> Long-term product partnership
                          </td>
                        </tr>
                        <tr className="hover:bg-slate-50/20 transition-colors">
                          <td className="p-5 text-xs font-extrabold text-slate-700">Technology Focus</td>
                          <td className="p-5 text-xs sm:text-sm text-slate-500 font-medium">Technology-first or template-first</td>
                          <td className="p-5 text-xs sm:text-sm text-blue-900 font-extrabold bg-blue-50/10">
                            <span className="text-blue-600 mr-2">✓</span> Business-first integration of technology
                          </td>
                        </tr>
                        <tr className="hover:bg-slate-50/20 transition-colors">
                          <td className="p-5 text-xs font-extrabold text-slate-700">Team Alignment</td>
                          <td className="p-5 text-xs sm:text-sm text-slate-500 font-medium">Project execution mindset</td>
                          <td className="p-5 text-xs sm:text-sm text-blue-900 font-extrabold bg-blue-50/10">
                            <span className="text-blue-600 mr-2">✓</span> Venture-builder and product mindset
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Small Confidence Metrics Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 my-20 max-w-5xl mx-auto">
                  <div className="bg-white border border-slate-200/60 p-5 rounded-2xl shadow-sm text-center space-y-1">
                    <span className="text-3xl font-extrabold text-blue-600 tracking-tight block">8+ Ventures</span>
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-500 block">AI Products Built</span>
                  </div>
                  <div className="bg-white border border-slate-200/60 p-5 rounded-2xl shadow-sm text-center space-y-1">
                    <span className="text-3xl font-extrabold text-blue-600 tracking-tight block">6+ Sectors</span>
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-500 block">Multiple Industries</span>
                  </div>
                  <div className="bg-white border border-slate-200/60 p-5 rounded-2xl shadow-sm text-center space-y-1">
                    <span className="text-3xl font-extrabold text-blue-600 tracking-tight block">100% Custom</span>
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-500 block">End-to-End Development</span>
                  </div>
                  <div className="bg-white border border-slate-200/60 p-5 rounded-2xl shadow-sm text-center space-y-1">
                    <span className="text-3xl font-extrabold text-blue-600 tracking-tight block">Built-In</span>
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-500 block">Responsible AI Approach</span>
                  </div>
                </div>

                {/* End with a Strong Statement and transition */}
                <div className="mt-20 text-center max-w-3xl mx-auto space-y-6 pt-12 border-t border-slate-200/60">
                  <h4 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-relaxed">
                    "Technology alone doesn't create successful products. <br />
                    The right strategy, the right execution, and the right partner do."
                  </h4>
                  
                  <div className="pt-2 flex justify-center">
                    <button 
                      onClick={() => {
                        document.getElementById('industries-section')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-xs font-extrabold uppercase tracking-widest text-blue-600 hover:text-blue-700 flex items-center gap-1.5 cursor-pointer group"
                    >
                      <span>Explore the Industries We Serve</span>
                      <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </div>

              </div>
            </section>

            {/* INDUSTRIES WE SERVE SECTION */}
            <section className="bg-white py-24 border-t border-slate-200/50" id="industries-section">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Section Header */}
                <div className="mb-16 text-center max-w-3xl mx-auto space-y-4">
                  <span className="px-3 py-1 bg-blue-500/10 text-blue-700 text-xs font-bold uppercase tracking-widest rounded-md border border-blue-500/20 animate-fade-in">
                    Sectors & Expertise
                  </span>
                  <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950">
                    Industries We Serve
                  </h2>
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                    We combine domain-specific insights with advanced AI engineering to build bespoke products tailored for real-world impact across key sectors.
                  </p>
                </div>

                {/* Industries Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
                  {industriesWeServe.map((industry, idx) => (
                    <div 
                      key={idx}
                      className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-blue-500/25 transition-all duration-500 flex flex-col justify-between group h-full"
                      id={`industry-card-${industry.name.toLowerCase().replace('& ', '').replace(' ', '-')}`}
                    >
                      <div className="space-y-4">
                        {/* Icon Container */}
                        <div className="w-12 h-12 bg-slate-50 border border-slate-100 text-slate-700 rounded-2xl flex items-center justify-center shadow-inner group-hover:bg-blue-50 group-hover:border-blue-100 group-hover:text-blue-600 transition-colors duration-300">
                          {renderIcon(industry.icon, "w-6 h-6 transition-colors duration-300")}
                        </div>
                        
                        {/* Title */}
                        <h3 className="text-base lg:text-lg font-extrabold tracking-tight text-slate-950 group-hover:text-blue-600 transition-colors duration-300">
                          {industry.name}
                        </h3>
                        
                        {/* Description */}
                        <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-normal">
                          {industry.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Don't See Your Industry Callout Card */}
                <div className="bg-slate-50 border border-slate-200/60 rounded-3xl p-8 lg:p-12 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-50/40 rounded-full blur-3xl pointer-events-none -z-10" />
                  
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-8 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        <span className="text-xs font-extrabold uppercase tracking-widest text-slate-500">
                          Tailored Solutions
                        </span>
                      </div>
                      <h3 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-950">
                        Don't see your industry?
                      </h3>
                      <p className="text-slate-600 text-sm md:text-base leading-relaxed font-normal max-w-2xl">
                        Great products begin with understanding unique challenges. Let's explore how AI can create value for your business.
                      </p>
                    </div>
                    
                    <div className="lg:col-span-4 lg:text-right">
                      <button 
                        onClick={() => {
                          setActiveTab('planner');
                          setTimeout(() => document.getElementById('strategy-planner-box')?.scrollIntoView({ behavior: 'smooth' }), 100);
                        }}
                        className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 inline-flex items-center gap-2 cursor-pointer"
                        id="industry-cta-button"
                      >
                        <span>Book Free Strategy Session</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* REAL-TIME AI STRATEGY PLANNER INTRO CALLOUT */}
            <section className="bg-blue-600 text-white py-16">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
                <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight">Ready to map out your custom AI product?</h3>
                <p className="text-blue-100 text-base max-w-2xl mx-auto leading-relaxed">
                  Use our live, server-side AI Product Strategy Planner to instantly outline recommended architectural patterns, MVP features, and data-compliance guardrails for your specific business.
                </p>
                <div>
                  <button 
                    onClick={() => {
                      setActiveTab('planner');
                      setTimeout(() => document.getElementById('strategy-planner-box')?.scrollIntoView({ behavior: 'smooth' }), 100);
                    }}
                    className="px-8 py-4 bg-white text-blue-600 font-bold text-sm tracking-wide rounded-2xl shadow-xl hover:bg-slate-950 hover:text-white transition-all duration-300"
                  >
                    Launch Interactive Strategy Assistant
                  </button>
                </div>
              </div>
            </section>

            {/* FREQUENTLY ASKED QUESTIONS SECTION */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24" id="faq-section">
              {/* Header Section */}
              <div className="mb-16 text-center space-y-4 max-w-3xl mx-auto">
                <span className="px-3 py-1 bg-blue-500/10 text-blue-700 text-xs font-bold uppercase tracking-widest rounded-md border border-blue-500/20">
                  Intellectual Clarity
                </span>
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-950">
                  Frequently Asked Questions
                </h2>
                <p className="text-slate-800 text-sm md:text-base font-semibold">
                  Everything you need to know before starting your AI product journey.
                </p>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed max-w-2xl mx-auto font-normal">
                  Building an AI product is a significant investment, and it's natural to have questions. Here are answers to the most common questions founders, businesses, and organizations ask before partnering with ATSFY.
                </p>
              </div>

              {/* Accordion Layout */}
              <div className="space-y-4">
                {FAQ_DATA.map((faq) => {
                  const isExpanded = expandedFaqId === faq.id;
                  return (
                    <div 
                      key={faq.id}
                      className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${
                        isExpanded 
                          ? 'border-blue-500/35 shadow-md shadow-blue-500/5' 
                          : 'border-slate-200/80 shadow-sm hover:border-slate-300'
                      }`}
                    >
                      <button
                        onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                        className="w-full px-6 py-5 text-left flex justify-between items-center gap-4 hover:bg-slate-50/50 transition-colors group focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-2 rounded-2xl"
                        aria-expanded={isExpanded}
                        aria-controls={`faq-answer-${faq.id}`}
                      >
                        <span className={`text-base font-bold tracking-tight transition-colors duration-200 ${isExpanded ? 'text-blue-600' : 'text-slate-950 group-hover:text-blue-600'}`}>
                          {faq.question}
                        </span>
                        
                        {/* Plus / Minus Outline Icon */}
                        <div className={`p-1.5 rounded-xl border transition-colors duration-300 ${
                          isExpanded 
                            ? 'bg-blue-50 border-blue-100 text-blue-600' 
                            : 'bg-slate-50 border-slate-100 text-slate-400 group-hover:bg-slate-100 group-hover:text-slate-600'
                        }`}>
                          {isExpanded ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </div>
                      </button>

                      {/* Smooth Height/Opacity Expansion */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            id={`faq-answer-${faq.id}`}
                            role="region"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6 pt-2 border-t border-slate-100 text-xs md:text-sm text-slate-600 leading-relaxed font-normal whitespace-pre-line">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Still Have Questions CTA card */}
              <div className="mt-16 bg-slate-50 border border-slate-200/60 rounded-3xl p-8 lg:p-12 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-blue-50/50 rounded-full blur-3xl pointer-events-none -z-10" />
                <div className="max-w-xl mx-auto space-y-4">
                  <span className="text-[10px] bg-indigo-100 text-indigo-700 px-2.5 py-1 font-bold uppercase tracking-wider rounded-md">
                    Still Have Questions?
                  </span>
                  <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-slate-950">
                    Every great product starts with a conversation.
                  </h3>
                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-normal">
                    If you didn't find the answer you're looking for, we'd be happy to discuss your idea, challenges, and goals.
                  </p>
                  <div className="pt-2">
                    <button 
                      onClick={() => {
                        setActiveTab('planner');
                        setTimeout(() => document.getElementById('strategy-planner-box')?.scrollIntoView({ behavior: 'smooth' }), 100);
                      }}
                      className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 inline-flex items-center gap-2 cursor-pointer"
                    >
                      <span>Book Free Strategy Session</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

            </section>

            {/* BLOG SECTION PREVIEW */}
            <section className="bg-slate-50 py-24 border-t border-slate-200/50" id="blog-section">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Section Header */}
                <div className="space-y-4 max-w-3xl mb-16">
                  <span className="px-3 py-1 bg-blue-500/10 text-blue-700 text-[10px] font-bold uppercase tracking-widest rounded-md border border-blue-500/20 inline-block">
                    INSIGHTS & RESOURCES
                  </span>
                  <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-950">
                    Insights That Help You Build Better AI Products
                  </h2>
                  <h3 className="text-lg md:text-xl font-bold text-slate-800 tracking-tight">
                    Practical knowledge from builders, not just developers.
                  </h3>
                  <p className="text-slate-500 text-sm md:text-base leading-relaxed font-normal">
                    Building successful AI products requires more than choosing the right technology. Our insights are designed to help founders, business leaders, and innovators make informed decisions throughout their AI journey.
                  </p>
                  <p className="text-slate-400 text-xs md:text-sm leading-relaxed font-normal italic">
                    Explore expert articles, product insights, implementation guides, and real-world perspectives from the team behind ATSFY.
                  </p>
                </div>

                {/* Premium Blog Cards Grid - horizontal scroll on mobile, rigid grid on desktop */}
                <div className="mb-20">
                  <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-6 block">
                    Featured Insights
                  </h4>
                  
                  <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 scrollbar-thin scrollbar-thumb-slate-200 md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-x-visible md:pb-0">
                    {BLOG_DATA.map((article) => (
                      <div 
                        key={article.id}
                        onClick={() => setSelectedArticle(article)}
                        className="flex-shrink-0 w-[85vw] sm:w-[380px] md:w-auto snap-start bg-white border border-slate-200/60 rounded-3xl overflow-hidden hover:shadow-xl hover:border-blue-500/30 transition-all duration-300 cursor-pointer flex flex-col justify-between group"
                      >
                        {/* Image Header */}
                        {article.imageUrl && (
                          <div className="h-52 w-full overflow-hidden relative">
                            <img 
                              src={article.imageUrl} 
                              alt={article.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute top-4 left-4">
                              <span className="text-[9px] font-extrabold uppercase bg-slate-950/80 backdrop-blur-md text-white px-2.5 py-1 rounded-md tracking-wider border border-white/10">
                                {article.category}
                              </span>
                            </div>
                            <div className="absolute top-4 right-4">
                              <span className="text-[9px] font-bold bg-white/90 backdrop-blur-md text-slate-900 px-2 py-0.5 rounded font-mono shadow-sm">
                                {article.readTime}
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Article Content Box */}
                        <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                          <div className="space-y-3">
                            <span className="text-[10px] font-bold text-slate-400 tracking-wider block font-mono">
                              {article.date}
                            </span>
                            
                            <h3 className="text-base font-bold text-slate-950 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                              {article.title}
                            </h3>

                            {/* Guaranteed 2-line summary constraint */}
                            <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 font-normal">
                              {article.excerpt}
                            </p>
                          </div>

                          <div className="pt-5 border-t border-slate-100 mt-5 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <img 
                                src={article.author.avatarUrl} 
                                alt={article.author.name}
                                className="w-8 h-8 rounded-full border border-slate-100 shrink-0 object-cover" 
                              />
                              <div>
                                <p className="text-[11px] font-bold text-slate-950">{article.author.name}</p>
                                <p className="text-[9px] text-slate-400 font-medium">{article.author.role}</p>
                              </div>
                            </div>

                            <div className="text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                              <span>Read Article</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Strategy, Philosophy & Google EEAT Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-8 border-t border-slate-200/60">
                  
                  {/* Left: Our Philosophy & Content Pipeline Strategy */}
                  <div className="lg:col-span-7 space-y-8 flex flex-col justify-between">
                    <div className="space-y-4">
                      <h4 className="text-xs font-extrabold text-blue-600 uppercase tracking-widest flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Our Philosophy</span>
                      </h4>
                      <p className="text-slate-800 text-sm md:text-base font-semibold leading-relaxed">
                        We believe that informed decisions lead to better products.
                      </p>
                      <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-normal">
                        Whether you work with ATSFY or not, we want to help founders and businesses better understand AI, reduce unnecessary complexity, and build technology that creates lasting value.
                      </p>
                    </div>

                    <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 space-y-6">
                      <div className="space-y-2">
                        <span className="text-[9px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 font-bold uppercase rounded font-mono">
                          SEO Content Strategy
                        </span>
                        <h4 className="text-lg font-bold tracking-tight">Weekly Publishing Pipeline</h4>
                        <p className="text-slate-400 text-xs leading-relaxed font-normal">
                          We recommend publishing 2 high-quality articles every week to accelerate search authority and drive persistent organic traffic.
                        </p>
                      </div>

                      {/* Content Category bento-grid tags */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1.5">
                          <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block">1. Startup</span>
                          <ul className="text-[10px] text-slate-500 space-y-1 font-normal list-disc pl-3">
                            <li>AI Startup Checklist</li>
                            <li>MVP Cost Guide</li>
                            <li>Finding Product-Market Fit</li>
                          </ul>
                        </div>
                        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1.5">
                          <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block">2. Business</span>
                          <ul className="text-[10px] text-slate-500 space-y-1 font-normal list-disc pl-3">
                            <li>AI for Manufacturing</li>
                            <li>AI for Healthcare</li>
                            <li>AI for HR & Education</li>
                          </ul>
                        </div>
                        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1.5">
                          <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider block">3. Technical</span>
                          <ul className="text-[10px] text-slate-500 space-y-1 font-normal list-disc pl-3">
                            <li>AI Agents Explained</li>
                            <li>RAG vs Fine-tuning</li>
                            <li>LLM Architecture</li>
                          </ul>
                        </div>
                        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1.5">
                          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">4. Product</span>
                          <ul className="text-[10px] text-slate-500 space-y-1 font-normal list-disc pl-3">
                            <li>UX for AI Products</li>
                            <li>Designing AI Workflows</li>
                            <li>Scaling AI Products</li>
                          </ul>
                        </div>
                      </div>

                      <div className="pt-2">
                        <button
                          onClick={() => {
                            const plannerBox = document.getElementById('strategy-planner-box');
                            if (plannerBox) plannerBox.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md text-center"
                        >
                          Visit the Insights Hub
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right: Why This Section Matters (Google E-E-A-T Framework) */}
                  <div className="lg:col-span-5 bg-white border border-slate-200/70 rounded-3xl p-6 md:p-8 flex flex-col justify-between">
                    <div className="space-y-4">
                      <span className="text-[9px] bg-slate-100 text-slate-600 border border-slate-200 px-2 py-0.5 font-mono font-bold uppercase rounded">
                        Why This Matters
                      </span>
                      <h4 className="text-xl font-bold text-slate-950 tracking-tight leading-snug">
                        Demonstrating Expert Authority (E-E-A-T)
                      </h4>
                      <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-normal">
                        Google highly prioritizes and rewards websites that clearly demonstrate deep industry experience, technical expertise, and absolute trustworthiness. Here is how our publications build your organic footprint:
                      </p>
                    </div>

                    <div className="space-y-4 my-8">
                      {/* E-E-A-T checklist metrics */}
                      <div className="flex gap-4 items-start p-3 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0 font-extrabold text-sm">
                          E
                        </div>
                        <div className="space-y-0.5">
                          <h5 className="text-xs font-bold text-slate-950">Experience</h5>
                          <p className="text-[10px] text-slate-500 leading-relaxed font-normal">Real-world case studies detailing how we engineer and manage AI products.</p>
                        </div>
                      </div>

                      <div className="flex gap-4 items-start p-3 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shrink-0 font-extrabold text-sm">
                          E
                        </div>
                        <div className="space-y-0.5">
                          <h5 className="text-xs font-bold text-slate-950">Expertise</h5>
                          <p className="text-[10px] text-slate-500 leading-relaxed font-normal">Rigorous architectural guides explaining latency compression and secure guardrails.</p>
                        </div>
                      </div>

                      <div className="flex gap-4 items-start p-3 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center shrink-0 font-extrabold text-sm">
                          A
                        </div>
                        <div className="space-y-0.5">
                          <h5 className="text-xs font-bold text-slate-950">Authority</h5>
                          <p className="text-[10px] text-slate-500 leading-relaxed font-normal">In-depth insights setting the standard for VC-grade startup MVPs and compliance frameworks.</p>
                        </div>
                      </div>

                      <div className="flex gap-4 items-start p-3 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0 font-extrabold text-sm">
                          T
                        </div>
                        <div className="space-y-0.5">
                          <h5 className="text-xs font-bold text-slate-950">Trust</h5>
                          <p className="text-[10px] text-slate-500 leading-relaxed font-normal">Uncompromising commitment to responsible ethics, data privacy, and HIPAA/GDPR guardrails.</p>
                        </div>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-400 italic font-normal text-center">
                      Our SEO strategy acts as the reliable organic baseline driving qualified business leads.
                    </p>
                  </div>

                </div>

              </div>
            </section>

            {/* RICH BLOG ARTICLE READING MODAL */}
            {selectedArticle && (
              <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl text-slate-900 animate-in fade-in zoom-in duration-200" id="blog-reading-modal">
                  
                  {/* Banner */}
                  <div className="sticky top-0 bg-slate-50 border-b border-slate-100 px-8 py-5 flex justify-between items-center">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                      Article Context — {selectedArticle.category}
                    </span>
                    <button 
                      onClick={() => setSelectedArticle(null)}
                      className="w-8 h-8 rounded-full hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Document Body */}
                  <div className="p-8 space-y-6">
                    <div className="space-y-3">
                      <span className="text-xs font-bold text-slate-400">{selectedArticle.date} • {selectedArticle.readTime}</span>
                      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-950">
                        {selectedArticle.title}
                      </h2>
                    </div>

                    {/* Author Box */}
                    <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <img 
                        src={selectedArticle.author.avatarUrl} 
                        alt={selectedArticle.author.name}
                        className="w-10 h-10 rounded-full object-cover border"
                      />
                      <div>
                        <p className="text-xs font-bold text-slate-950">{selectedArticle.author.name}</p>
                        <p className="text-[10px] text-slate-500">{selectedArticle.author.role}</p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="text-slate-700 space-y-4 text-sm leading-relaxed prose max-w-none">
                      {selectedArticle.content.split('\n\n').map((paragraph, i) => {
                        if (paragraph.startsWith('###')) {
                          return <h3 key={i} className="text-xl font-bold text-slate-950 pt-4">{paragraph.replace('###', '')}</h3>;
                        }
                        if (paragraph.startsWith('####')) {
                          return <h4 key={i} className="text-base font-bold text-slate-950 pt-2">{paragraph.replace('####', '')}</h4>;
                        }
                        if (paragraph.startsWith('*')) {
                          return (
                            <ul key={i} className="list-disc pl-5 space-y-1">
                              {paragraph.split('\n').map((li, j) => (
                                <li key={j} className="text-slate-600">{li.replace('*', '').trim()}</li>
                              ))}
                            </ul>
                          );
                        }
                        return <p key={i}>{paragraph}</p>;
                      })}
                    </div>

                    <div className="pt-6 border-t border-slate-100 flex gap-3">
                      <button 
                        onClick={() => {
                          setSelectedArticle(null);
                          setActiveTab('planner');
                          setTimeout(() => document.getElementById('strategy-planner-box')?.scrollIntoView({ behavior: 'smooth' }), 100);
                        }}
                        className="flex-1 py-3 bg-blue-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-blue-700 transition-colors"
                      >
                        Schedule Free AI Strategy Session with {selectedArticle.author.name.split(' ')[0]}
                      </button>
                      <button 
                        onClick={() => setSelectedArticle(null)}
                        className="px-6 py-3 border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs uppercase tracking-wider rounded-xl"
                      >
                        Close Article
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: AI STRATEGY PLANNER & CALL BOOKER */}
        {(activeTab === 'planner' || activeTab === 'home') && (
          <section className="bg-slate-950 text-slate-100 py-24 border-t border-slate-900 relative overflow-hidden" id="strategy-planner-section">
            {/* Background glowing elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              
              {/* PREMIUM HERO LANDING BLOCK */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
                
                {/* Left Side: Headline, Paragraph, CTA */}
                <div className="lg:col-span-7 space-y-8">
                  <div className="space-y-4">
                    <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-widest rounded-md border border-blue-500/20">
                      FINAL CTA
                    </span>
                    <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
                      Great AI Products<br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                        Don't Start With Code.
                      </span>
                    </h2>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-200 tracking-tight">
                      They start with the right conversation.
                    </h3>
                    <div className="text-slate-400 text-sm md:text-base leading-relaxed space-y-4 font-normal">
                      <p>
                        Whether you're building your first AI startup, transforming your business, or exploring what's possible with artificial intelligence, we're here to help you take the next step.
                      </p>
                      <p className="border-l-2 border-blue-500/40 pl-4 py-1 text-slate-300 font-medium">
                        Let's turn your vision into a product that creates real impact. Book your confidential roadmap strategy consultation with our core architects today.
                      </p>
                    </div>
                  </div>

                  {/* CTA & Trust Pills */}
                  <div className="space-y-4 pt-2">
                    <div>
                      <button 
                        onClick={() => {
                          const sandboxElement = document.getElementById('strategy-planner-box');
                          if (sandboxElement) sandboxElement.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 inline-flex items-center gap-2 cursor-pointer"
                        id="planner-hero-cta"
                      >
                        <span>Book Free Strategy Session</span>
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Trust Pills */}
                    <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-400">
                      <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800/80 px-3 py-1.5 rounded-full">
                        <span>🔒</span>
                        <span>100% Confidential</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800/80 px-3 py-1.5 rounded-full">
                        <span>📅</span>
                        <span>30–45 Minute Session</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800/80 px-3 py-1.5 rounded-full">
                        <span>💬</span>
                        <span>No Sales Pressure</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Right Side: Graphic Illustration representing: Founder, AI roadmap, Product Planning */}
                <div className="lg:col-span-5 relative">
                  <div className="absolute inset-0 bg-blue-500/10 rounded-3xl blur-2xl pointer-events-none" />
                  
                  <div className="relative bg-slate-900 border border-slate-800/85 rounded-3xl p-8 shadow-2xl space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
                        <span className="font-mono text-xs text-slate-400 font-bold uppercase tracking-wider">
                          Product Architecture Session
                        </span>
                      </div>
                      <span className="text-[10px] text-blue-400 font-mono font-bold bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                        ACTIVE STREAM
                      </span>
                    </div>

                    {/* 1. Founder discussing ideas */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs text-slate-300 font-bold">
                          F
                        </div>
                        <span className="text-xs font-bold text-slate-200">Founder & Builder Alignment</span>
                      </div>
                      <div className="bg-slate-950/60 border border-slate-800/60 rounded-xl p-3 text-xs text-slate-400">
                        <p className="italic">"We need to validate our custom document analyzer, map the LLM context limits, and check compliance parameters before building our MVP."</p>
                      </div>
                    </div>

                    {/* Connection Line */}
                    <div className="flex justify-center h-4">
                      <div className="w-0.5 bg-gradient-to-b from-blue-500/80 to-indigo-500/80 h-full" />
                    </div>

                    {/* 2. AI Roadmap Layer */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs text-slate-300 font-bold">
                          R
                        </div>
                        <span className="text-xs font-bold text-slate-200">Dynamic AI Roadmap Phases</span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2">
                        <div className="p-2.5 bg-slate-950/40 border border-slate-800 rounded-lg text-center">
                          <span className="block text-[8px] uppercase tracking-wider text-slate-500 font-black">Phase 1</span>
                          <span className="text-[10px] font-bold text-blue-400 font-mono">Validation</span>
                        </div>
                        <div className="p-2.5 bg-slate-950/40 border border-slate-800 rounded-lg text-center">
                          <span className="block text-[8px] uppercase tracking-wider text-slate-500 font-black">Phase 2</span>
                          <span className="text-[10px] font-bold text-indigo-400 font-mono">MVP Setup</span>
                        </div>
                        <div className="p-2.5 bg-slate-950/40 border border-slate-800 rounded-lg text-center">
                          <span className="block text-[8px] uppercase tracking-wider text-slate-500 font-black">Phase 3</span>
                          <span className="text-[10px] font-bold text-emerald-400 font-mono">V1 Scale</span>
                        </div>
                      </div>
                    </div>

                    {/* Connection Line */}
                    <div className="flex justify-center h-4">
                      <div className="w-0.5 bg-gradient-to-b from-indigo-500/80 to-emerald-500/80 h-full" />
                    </div>

                    {/* 3. Product Planning Layer */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs text-slate-300 font-bold">
                          P
                        </div>
                        <span className="text-xs font-bold text-slate-200">System Architecture Planning</span>
                      </div>
                      
                      <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1.5 font-mono text-[10px] text-slate-400">
                        <div className="flex justify-between border-b border-slate-800/50 pb-1">
                          <span>LLM COGNITIVE LAYER:</span>
                          <span className="text-blue-400">Gemini 3.5 series</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-800/50 pb-1">
                          <span>GUARDRAILS:</span>
                          <span className="text-indigo-400">PII Redactor v2</span>
                        </div>
                        <div className="flex justify-between">
                          <span>PERSISTENCE:</span>
                          <span className="text-emerald-400">Durable Firestore</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>

              {/* WHAT YOU'LL WALK AWAY WITH (GRID / BENTO CARDS) */}
              <div className="mb-24 space-y-8">
                <div className="text-center space-y-2">
                  <span className="text-xs font-mono font-black text-blue-400 uppercase tracking-widest">
                    VALUE DELIVERY
                  </span>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                    What You'll Walk Away With
                  </h3>
                  <p className="text-slate-400 text-xs md:text-sm max-w-xl mx-auto font-normal">
                    We deliver customized strategic assets directly after each conversation. No generic feedback, pure actionable engineering value.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Item 1 */}
                  <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 hover:border-blue-500/30 transition-colors duration-300 flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/25 text-blue-400 rounded-xl flex items-center justify-center shrink-0">
                      <Check className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-white">Product & Idea Validation</h4>
                      <p className="text-xs text-slate-400 leading-relaxed font-normal">
                        We'll evaluate your concept, identify potential risks, and explore opportunities before you invest in development.
                      </p>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 hover:border-blue-500/30 transition-colors duration-300 flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/25 text-blue-400 rounded-xl flex items-center justify-center shrink-0">
                      <Check className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-white">AI Opportunity Assessment</h4>
                      <p className="text-xs text-slate-400 leading-relaxed font-normal">
                        Discover where AI can create the greatest business value and which solutions are worth pursuing.
                      </p>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 hover:border-blue-500/30 transition-colors duration-300 flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/25 text-blue-400 rounded-xl flex items-center justify-center shrink-0">
                      <Check className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-white">Product Roadmap</h4>
                      <p className="text-xs text-slate-400 leading-relaxed font-normal">
                        Receive high-level recommendations for features, development phases, and launch priorities.
                      </p>
                    </div>
                  </div>

                  {/* Item 4 */}
                  <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 hover:border-blue-500/30 transition-colors duration-300 flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/25 text-blue-400 rounded-xl flex items-center justify-center shrink-0">
                      <Check className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-white">Technology Recommendations</h4>
                      <p className="text-xs text-slate-400 leading-relaxed font-normal">
                        We'll suggest the most suitable technologies, AI models, architecture, and integrations based on your goals.
                      </p>
                    </div>
                  </div>

                  {/* Item 5 */}
                  <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 hover:border-blue-500/30 transition-colors duration-300 flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/25 text-blue-400 rounded-xl flex items-center justify-center shrink-0">
                      <Check className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-white">Timeline & Investment Estimate</h4>
                      <p className="text-xs text-slate-400 leading-relaxed font-normal">
                        Get an estimated development timeline and a realistic investment range for your project.
                      </p>
                    </div>
                  </div>

                  {/* Item 6 */}
                  <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 hover:border-blue-500/30 transition-colors duration-300 flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/25 text-blue-400 rounded-xl flex items-center justify-center shrink-0">
                      <Check className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-white">Expert Guidance</h4>
                      <p className="text-xs text-slate-400 leading-relaxed font-normal">
                        Ask questions, discuss challenges, and gain insights from a team that has experience building AI products across multiple industries.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* WHO SHOULD BOOK & HOW IT WORKS SPLIT PANEL */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24 items-start">
                
                {/* Left Column: Who Should Book */}
                <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 space-y-6">
                  <h4 className="text-lg font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-400" />
                    <span>Who Should Book This Session?</span>
                  </h4>
                  <ul className="space-y-3">
                    {[
                      "Startup Founders with a new idea",
                      "Businesses looking to automate operations",
                      "Enterprises planning AI initiatives",
                      "Organizations exploring digital transformation",
                      "Product teams seeking technical guidance",
                      "Innovators ready to build something meaningful"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 text-xs text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="bg-blue-950/40 border border-blue-900/40 rounded-2xl p-4 mt-4">
                    <p className="text-[11px] uppercase tracking-wider text-blue-400 font-extrabold mb-1">Why We Offer This Free</p>
                    <p className="text-xs text-slate-400 leading-relaxed font-normal">
                      We believe the best partnerships start with understanding—not selling. Even if we're not the right fit, you'll leave with greater clarity and a better understanding of what's needed to bring your idea to life.
                    </p>
                  </div>
                </div>

                {/* Right Column: What Happens Next */}
                <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 space-y-6">
                  <h4 className="text-lg font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
                    <Compass className="w-5 h-5 text-indigo-400" />
                    <span>What Happens Next?</span>
                  </h4>
                  
                  <div className="space-y-4">
                    {[
                      {
                        step: "1. Book Your Session",
                        desc: "Choose a convenient time for your strategy call."
                      },
                      {
                        step: "2. Discovery Conversation",
                        desc: "We'll learn about your business, goals, challenges, and vision."
                      },
                      {
                        step: "3. Strategic Recommendations",
                        desc: "You'll receive practical insights and recommendations tailored to your project."
                      },
                      {
                        step: "4. Decide Your Next Step",
                        desc: "Move forward with ATSFY—or simply leave with a clearer understanding of your options. No pressure. No obligations. Just valuable guidance."
                      }
                    ].map((stepObj, idx) => (
                      <div key={idx} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-bold flex items-center justify-center text-[10px]">
                            {idx + 1}
                          </div>
                          {idx < 3 && <div className="w-0.5 bg-slate-800 flex-grow my-1.5" />}
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-xs font-bold text-slate-200">{stepObj.step}</p>
                          <p className="text-[11px] text-slate-400 leading-relaxed font-normal">{stepObj.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* DYNAMIC SANDBOX BOX CONTAINER */}
              <div 
                className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden" 
                id="strategy-planner-box"
              >
                
                {/* Header Banner */}
                <div className="bg-slate-950 text-white px-8 py-10 relative overflow-hidden border-b border-slate-800">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

                  <div className="relative z-10 space-y-3">
                    <span className="px-2.5 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[10px] font-bold uppercase tracking-widest rounded">Interactive MVP Sandbox</span>
                    <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">AI Strategy Assistant & Roadmap Scoper</h2>
                    <p className="text-slate-400 text-xs md:text-sm max-w-2xl leading-relaxed font-normal">
                      Describe your software or AI automation idea. Our server-side Gemini 3.5 analyzer will draft a customized conceptual technical roadmap, complete with model scoping, safety filters, and recommended stages.
                    </p>
                  </div>
                </div>

                {/* Main Grid: Inputs vs Output Generator */}
                <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
                  
                  {/* Left Side: Parameters Input Form */}
                  <div className="p-8 space-y-6">
                    <h3 className="text-base font-bold text-white border-b border-slate-800 pb-2">
                      1. Configure Your MVP Profile
                    </h3>

                    <form onSubmit={generateStrategy} className="space-y-4">
                      {/* Product Idea description */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                          Briefly Describe Your Idea or Core Requirements
                        </label>
                        <textarea
                          value={productIdea}
                          onChange={(e) => setProductIdea(e.target.value)}
                          placeholder="e.g. A conversational document analyzer for medical records that identifies patient diagnostic histories and auto-generates HIPAA SOAP records..."
                          className="w-full h-32 px-4 py-3 bg-slate-950 text-white border border-slate-800 rounded-xl focus:bg-slate-950 focus:border-blue-500 text-sm outline-none resize-none transition-all placeholder:text-slate-600"
                          required
                        />
                        <span className="text-[10px] text-slate-500 block">Provide at least a single sentence describing your main features.</span>
                      </div>

                      {/* Industry Selector */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                            Target Industry Focus
                          </label>
                          <select
                            value={targetIndustry}
                            onChange={(e) => setTargetIndustry(e.target.value as IndustryType)}
                            className="w-full px-3 py-2.5 bg-slate-950 text-white border border-slate-800 rounded-xl focus:bg-slate-950 focus:border-blue-500 text-sm outline-none transition-all cursor-pointer font-medium"
                          >
                            <option value="Education">Education</option>
                            <option value="Healthcare">Healthcare</option>
                            <option value="Hiring">Hiring</option>
                            <option value="Finance">Finance</option>
                            <option value="Startup Intelligence">Startup Intelligence</option>
                            <option value="Sustainability">Sustainability</option>
                          </select>
                        </div>

                        {/* Desired timeline */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                            Target Delivery Timeline
                          </label>
                          <select
                            value={desiredTimeline}
                            onChange={(e) => setDesiredTimeline(e.target.value)}
                            className="w-full px-3 py-2.5 bg-slate-950 text-white border border-slate-800 rounded-xl focus:bg-slate-950 focus:border-blue-500 text-sm outline-none transition-all cursor-pointer font-medium"
                          >
                            <option value="2 - 4 Weeks">2 - 4 Weeks (Extreme MVP)</option>
                            <option value="4 - 6 Weeks">4 - 6 Weeks (Standard)</option>
                            <option value="6 - 8 Weeks">6 - 8 Weeks (Complex RAG)</option>
                            <option value="8+ Weeks">8+ Weeks (Relational Enterprise)</option>
                          </select>
                        </div>
                      </div>

                      {/* Budget Selector */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                          Approximate MVP Development Budget
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {['$10k - $25k', '$25k - $50k', '$50k+'].map((range) => (
                            <button
                              key={range}
                              type="button"
                              onClick={() => setBudgetRange(range)}
                              className={`py-2 px-1 text-xs font-bold tracking-wide rounded-lg border transition-all ${
                                budgetRange.includes(range.substring(0, 4))
                                  ? 'bg-blue-600 border-blue-600 text-white shadow-sm shadow-blue-500/20'
                                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-white'
                              }`}
                            >
                              {range}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Submit Strategy Planner */}
                      <div className="pt-4">
                        <button
                          type="submit"
                          disabled={isGeneratingProposal || !productIdea.trim()}
                          className={`w-full py-4 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                            isGeneratingProposal || !productIdea.trim()
                              ? 'bg-slate-800 border border-slate-700 text-slate-500 cursor-not-allowed'
                              : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/10'
                          }`}
                        >
                          {isGeneratingProposal ? (
                            <>
                              <RefreshCw className="w-4 h-4 animate-spin" />
                              <span>Structuring Custom Plan...</span>
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-4 h-4 text-blue-200" />
                              <span>Generate Technical Roadmap Blueprint</span>
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Right Side: AI Generated Architecture Proposal Display */}
                  <div className="p-8 bg-slate-950/40 flex flex-col justify-between">
                    <div className="space-y-6">
                      <h3 className="text-base font-bold text-white border-b border-slate-800 pb-2 flex items-center justify-between">
                        <span>2. Technical Recommendation Output</span>
                        {proposal && (
                          <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-900/30 px-2 py-0.5 font-bold uppercase rounded flex items-center gap-1">
                            <Check className="w-3 h-3" /> Ready
                          </span>
                        )}
                      </h3>

                      {/* Not started default view */}
                      {!isGeneratingProposal && !proposal && !generationError && (
                        <div className="h-full min-h-[220px] flex flex-col items-center justify-center text-center p-6 space-y-3">
                          <div className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center text-slate-400 shadow-sm">
                            <Brain className="w-6 h-6" />
                          </div>
                          <p className="text-sm font-bold text-white">Your AI Strategy Sandbox is Offline</p>
                          <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                            Configure your custom requirements in Step 1 and launch the technical analyzer to receive direct architectural layouts from ATSFY.
                          </p>
                        </div>
                      )}

                      {/* Scanning / Terminals steps loading state */}
                      {isGeneratingProposal && (
                        <div className="space-y-4 font-mono text-xs bg-slate-950 text-emerald-400 p-5 rounded-2xl border border-slate-900 shadow-inner min-h-[260px]">
                          <div className="flex items-center gap-2 border-b border-white/10 pb-2 text-white">
                            <Terminal className="w-4 h-4 text-emerald-400 animate-pulse" />
                            <span>atfsy-compiler-v3.sh</span>
                          </div>
                          <div className="space-y-1">
                            {generationSteps.map((step, index) => (
                              <p key={index} className="animate-in fade-in duration-300">
                                <span className="text-slate-500">&gt;</span> {step}
                              </p>
                            ))}
                            <div className="flex items-center gap-1 pt-2">
                              <span className="w-1.5 h-3 bg-emerald-400 animate-ping" />
                              <span className="text-slate-400 italic">parsing payload vectors...</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Error Handling */}
                      {generationError && (
                        <div className="bg-rose-950/40 border border-rose-900/50 p-5 rounded-2xl space-y-2 text-xs">
                          <p className="font-bold text-rose-400">API Connection Notice</p>
                          <p className="text-rose-300">{generationError}</p>
                          <p className="text-slate-500">The analyzer will proceed using standard high-quality templates once connections are established.</p>
                        </div>
                      )}

                      {/* Success Output rendering dynamic Gemini Response */}
                      {proposal && (
                        <div className="space-y-4 animate-in fade-in zoom-in duration-200">
                          
                          {/* Suggested Title */}
                          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Proposed Product Title</span>
                            <span className="text-base font-black text-blue-400 block">{proposal.productName}</span>
                          </div>

                          {/* Summary */}
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Executive Architecture Summary</span>
                            <p className="text-xs text-slate-300 leading-relaxed font-normal bg-slate-900 p-3 rounded-xl border border-slate-800/60">
                              {proposal.executiveSummary}
                            </p>
                          </div>

                          {/* Architecture Specifications */}
                          <div className="space-y-1.5">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Recommended Technology Blueprint</span>
                            <div className="bg-slate-950 text-slate-300 p-3 rounded-xl border border-slate-800 font-mono text-[11px] leading-relaxed">
                              {proposal.architecture}
                            </div>
                          </div>

                          {/* Five MVP feature checkpoints */}
                          <div className="space-y-2">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Suggested Core MVP Scope (V1)</span>
                            <div className="grid grid-cols-1 gap-1.5">
                              {proposal.mvpScope.map((feature, i) => (
                                <div key={i} className="flex items-start gap-2 bg-slate-900 p-2.5 rounded-lg border border-slate-800/80 text-xs">
                                  <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                                  <span className="text-slate-300">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Responsible AI Advisory */}
                          <div className="p-3.5 bg-indigo-950/40 border border-indigo-900/50 rounded-xl space-y-1">
                            <span className="text-[9px] font-extrabold text-indigo-400 uppercase tracking-wider block">Responsible AI Guardrail Recommendations</span>
                            <p className="text-xs text-indigo-200 leading-relaxed font-normal">
                              {proposal.responsibleAI}
                            </p>
                          </div>

                          {/* Timeframe estimate */}
                          <div className="flex justify-between items-center bg-slate-950 text-white p-3.5 rounded-xl text-xs font-mono border border-slate-800">
                            <span className="text-slate-400">Engineering Timeframe:</span>
                            <span className="text-emerald-400 font-bold">{proposal.estimatedEffort}</span>
                          </div>

                          {/* Next Steps */}
                          <p className="text-[11px] text-slate-500 italic text-center font-normal">
                            {proposal.nextStep}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Booking Triggers inside workspace */}
                    {proposal && !bookingSuccess && (
                      <div className="pt-8 border-t border-slate-800 mt-6">
                        <button
                          onClick={() => {
                            const bookForm = document.getElementById('meeting-booking-form');
                            if (bookForm) bookForm.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl text-center shadow-md flex items-center justify-center gap-2"
                        >
                          <span>Proceed to Strategy Booking</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* MEETING BOOKING FORM SECTION */}
                <div className="p-8 border-t border-slate-800 bg-slate-950/30" id="meeting-booking-form">
                  <div className="max-w-3xl mx-auto space-y-6">
                    
                    <div className="text-center space-y-2">
                      {/* Highlighted session metrics */}
                      <div className="flex justify-center gap-3 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest pb-1">
                        <span>📅 30–45 Minutes</span>
                        <span>•</span>
                        <span>No Obligation</span>
                        <span>•</span>
                        <span>🔒 100% Confidential</span>
                      </div>
                      
                      <h3 className="text-2xl font-extrabold text-white tracking-tight">
                        3. Book Your Free AI Strategy Session
                      </h3>
                      <p className="text-slate-400 text-xs font-normal">
                        Select an available session slot. ATSFY's principal engineer will review your generated roadmap blueprint live on the call.
                      </p>
                    </div>

                    {bookingSuccess ? (
                      <div className="bg-emerald-950/40 border border-emerald-900/40 rounded-3xl p-8 text-center space-y-4 animate-in zoom-in-95 duration-300">
                        <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                          <Check className="w-10 h-10" />
                        </div>
                        <h4 className="text-2xl font-bold text-emerald-100">Strategy Session Booking Confirmed!</h4>
                        <p className="text-sm text-emerald-300 max-w-md mx-auto leading-relaxed font-normal">
                          Thank you, <strong className="text-white">{contactName}</strong>. We have registered your AI Product Idea and scheduled your strategy call for:
                        </p>
                        <div className="inline-flex items-center gap-4 bg-slate-900 px-6 py-3 rounded-2xl border border-emerald-900/30 shadow-sm text-sm font-semibold">
                          <div className="flex items-center gap-1.5 text-slate-100">
                            <CalendarIcon className="w-4 h-4 text-emerald-400" />
                            <span>{selectedDate}</span>
                          </div>
                          <span className="text-slate-700">|</span>
                          <div className="flex items-center gap-1.5 text-slate-100">
                            <Clock className="w-4 h-4 text-emerald-400" />
                            <span>{selectedTime}</span>
                          </div>
                        </div>
                        <p className="text-xs text-slate-400 font-normal">
                          A direct video invitation link and your compiled custom architecture blueprint has been dispatched to <strong className="text-slate-200">{contactEmail}</strong>.
                        </p>
                        <div className="pt-4">
                          <button
                            onClick={() => {
                              setBookingSuccess(false);
                              setContactName('');
                              setContactEmail('');
                              setContactCompany('');
                            }}
                            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors"
                          >
                            Schedule Another Session
                          </button>
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handleBooking} className="space-y-6">
                        
                        {/* Dynamic Grid: Calendar Pickers vs Inputs */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-900 p-6 rounded-2xl border border-slate-800">
                          
                          {/* Calendar & Slot Picker */}
                          <div className="space-y-4">
                            <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-widest">Select Date & Time</h4>
                            
                            {/* Date select */}
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Appointment Date</label>
                              <div className="relative">
                                <CalendarIcon className="absolute left-3.5 top-3 w-4 h-4 text-slate-500 pointer-events-none" />
                                <input
                                  type="date"
                                  value={selectedDate}
                                  onChange={(e) => setSelectedDate(e.target.value)}
                                  min="2026-06-30"
                                  max="2026-07-31"
                                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 text-white border border-slate-800 rounded-xl focus:bg-slate-950 focus:border-blue-500 text-xs outline-none font-semibold cursor-pointer"
                                />
                              </div>
                            </div>

                            {/* Standard times list */}
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Available Slot Times (EST)</label>
                              <div className="grid grid-cols-2 gap-2">
                                {['10:00 AM', '11:30 AM', '02:00 PM', '04:30 PM'].map((time) => (
                                  <button
                                    key={time}
                                    type="button"
                                    onClick={() => setSelectedTime(time)}
                                    className={`py-2 px-2 text-xs rounded-xl font-bold border transition-all ${
                                      selectedTime === time
                                        ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-900'
                                    }`}
                                  >
                                    {time}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Contact input fields */}
                          <div className="space-y-3">
                            <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-widest">Enter Credentials</h4>

                            <div className="space-y-1.5">
                              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                                <User className="w-3.5 h-3.5 text-slate-500" />
                                <span>Full Name</span>
                              </label>
                              <input
                                type="text"
                                value={contactName}
                                onChange={(e) => setContactName(e.target.value)}
                                placeholder="Soren Chen"
                                className="w-full px-3 py-2.5 bg-slate-950 text-white border border-slate-800 rounded-xl text-xs outline-none focus:bg-slate-950 focus:border-blue-500 font-medium"
                                required
                              />
                            </div>

                            <div className="space-y-1.5">
                              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                                <Mail className="w-3.5 h-3.5 text-slate-500" />
                                <span>Corporate Email Address</span>
                              </label>
                              <input
                                type="email"
                                value={contactEmail}
                                onChange={(e) => setContactEmail(e.target.value)}
                                placeholder="soren@mycompany.com"
                                className="w-full px-3 py-2.5 bg-slate-950 text-white border border-slate-800 rounded-xl text-xs outline-none focus:bg-slate-950 focus:border-blue-500 font-medium"
                                required
                              />
                            </div>

                            <div className="space-y-1.5">
                              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                                <Building className="w-3.5 h-3.5 text-slate-500" />
                                <span>Company Name (Optional)</span>
                              </label>
                              <input
                                type="text"
                                value={contactCompany}
                                onChange={(e) => setContactCompany(e.target.value)}
                                placeholder="Stealth AI Corp"
                                className="w-full px-3 py-2.5 bg-slate-950 text-white border border-slate-800 rounded-xl text-xs outline-none focus:bg-slate-950 focus:border-blue-500 font-medium"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Submit Action Button & Trust Pills */}
                        <div className="text-center pt-2 space-y-4">
                          <button
                            type="submit"
                            disabled={isSubmittingBooking}
                            className={`px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer ${
                              isSubmittingBooking ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                          >
                            {isSubmittingBooking ? "Securing Slot..." : "Book Free Strategy Session"}
                          </button>

                          {/* Trust Pills under button */}
                          <div className="flex justify-center flex-wrap gap-4 text-[10px] font-bold text-slate-500">
                            <span className="flex items-center gap-1">🔒 100% Confidential</span>
                            <span className="flex items-center gap-1">📅 30–45 Minute Session</span>
                            <span className="flex items-center gap-1">💬 No Sales Pressure</span>
                          </div>
                        </div>
                      </form>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </section>
        )}

        {/* TAB 3: ADMIN LEADS PANEL (REAL-TIME DEMO DATABASE AUDITOR) */}
        {activeTab === 'admin' && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="admin-panel-section">
            <div className="bg-white border border-slate-200 rounded-3xl shadow-lg overflow-hidden">
              
              {/* Header */}
              <div className="bg-slate-950 text-white px-8 py-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <span className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-widest block">ADMIN ENVIRONMENT SECURITY CONTEXT</span>
                  <h2 className="text-2xl font-black tracking-tight">Qualified Real-Time Leads Audit</h2>
                  <p className="text-xs text-slate-400 leading-relaxed mt-1">
                    Review and verify incoming database submissions, complete with AI roadmap attachments.
                  </p>
                </div>
                <button
                  onClick={fetchLeads}
                  disabled={isLoadingLeads}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold uppercase tracking-wider rounded-lg flex items-center gap-2"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoadingLeads ? 'animate-spin' : ''}`} />
                  <span>Refresh Leads</span>
                </button>
              </div>

              {/* Filtering / Searching leads */}
              <div className="p-6 border-b border-slate-100 bg-slate-50 flex flex-col sm:flex-row justify-between items-center gap-4">
                <input
                  type="text"
                  placeholder="Search by candidate name, company, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:max-w-md px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500"
                />
                <span className="text-xs text-slate-500 font-medium">
                  Showing {leads.filter(l => l.name.toLowerCase().includes(searchTerm.toLowerCase()) || l.company.toLowerCase().includes(searchTerm.toLowerCase())).length} Qualified Candidates
                </span>
              </div>

              {/* Table Body */}
              <div className="p-6 overflow-x-auto">
                {isLoadingLeads ? (
                  <div className="py-20 text-center text-slate-400 space-y-2">
                    <RefreshCw className="w-8 h-8 animate-spin mx-auto text-blue-600" />
                    <p className="text-xs font-mono">Quering Leads Cache API...</p>
                  </div>
                ) : leads.length === 0 ? (
                  <div className="py-20 text-center text-slate-400 space-y-3">
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto text-slate-400">
                      <FileText className="w-6 h-6" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">No Submissions Recorded</h3>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      Go to the Strategy Planner tab and submit a strategy call booking. The detailed lead payload will persist instantly here!
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Left Column: Leads Table List */}
                    <div className="lg:col-span-6 space-y-3">
                      <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-3">Qualified Submissions List</h3>
                      {leads
                        .filter(l => 
                          l.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          l.company.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((lead) => (
                          <div 
                            key={lead.id}
                            onClick={() => setSelectedAdminLead(lead)}
                            className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                              selectedAdminLead?.id === lead.id 
                                ? 'bg-blue-50/50 border-blue-500 shadow-sm' 
                                : 'bg-white border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="text-xs font-black text-slate-950">{lead.name}</h4>
                                <p className="text-[10px] font-semibold text-slate-500">{lead.company}</p>
                              </div>
                              <span className="text-[9px] bg-slate-900 text-white px-2 py-0.5 rounded uppercase font-bold tracking-wider">
                                {lead.industry}
                              </span>
                            </div>

                            <p className="text-[11px] text-slate-600 italic line-clamp-1 mb-3">
                              "{lead.idea}"
                            </p>

                            <div className="flex justify-between items-center text-[10px] text-slate-400 pt-3 border-t border-slate-100">
                              <span>Slot: {lead.selectedDate} | {lead.selectedTime}</span>
                              <span className="text-blue-600 font-bold">Review Roadmap →</span>
                            </div>
                          </div>
                        ))}
                    </div>

                    {/* Right Column: Selected Lead's AI Roadmap Payload */}
                    <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-2xl p-6 min-h-[300px]">
                      {selectedAdminLead ? (
                        <div className="space-y-4">
                          <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                            <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Lead Roadmap Details</h3>
                            <button 
                              onClick={() => setSelectedAdminLead(null)}
                              className="text-slate-400 hover:text-slate-600 text-xs"
                            >
                              Dismiss
                            </button>
                          </div>

                          <div className="space-y-1">
                            <span className="text-[10px] text-slate-400 uppercase font-bold">Contact Email</span>
                            <p className="text-xs font-mono font-bold text-slate-800">{selectedAdminLead.email}</p>
                          </div>

                          <div className="space-y-1 bg-white p-3 rounded-xl border border-slate-100">
                            <span className="text-[10px] text-slate-400 uppercase font-bold">Submitted Idea Context</span>
                            <p className="text-xs text-slate-700 leading-relaxed font-normal">{selectedAdminLead.idea}</p>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white p-3 rounded-xl border border-slate-100">
                              <span className="text-[10px] text-slate-400 uppercase font-bold block">Budget Limit</span>
                              <span className="text-xs font-bold text-slate-800">{selectedAdminLead.budget}</span>
                            </div>
                            <div className="bg-white p-3 rounded-xl border border-slate-100">
                              <span className="text-[10px] text-slate-400 uppercase font-bold block">Timeline Range</span>
                              <span className="text-xs font-bold text-slate-800">{selectedAdminLead.timeline}</span>
                            </div>
                          </div>

                          {/* Render the actual roadmap proposal locked with this lead */}
                          <div className="pt-4 border-t border-slate-200 space-y-3">
                            <h4 className="text-xs font-extrabold text-indigo-900 uppercase tracking-widest">
                              🔒 Tied AI Product Architecture Proposal
                            </h4>
                            
                            {selectedAdminLead.aiProposal ? (
                              <div className="space-y-3 bg-indigo-50/50 border border-indigo-100 p-4 rounded-xl text-xs">
                                <div className="flex justify-between">
                                  <span className="font-bold text-indigo-950">Suggested Product Name:</span>
                                  <span className="font-bold text-blue-600">{selectedAdminLead.aiProposal.productName}</span>
                                </div>
                                <div className="space-y-1">
                                  <span className="font-bold text-slate-500 block">Executive Summary:</span>
                                  <p className="text-slate-700 leading-relaxed">{selectedAdminLead.aiProposal.executiveSummary}</p>
                                </div>
                                <div className="space-y-1">
                                  <span className="font-bold text-slate-500 block">Technical Architecture Stack:</span>
                                  <pre className="p-2.5 bg-slate-950 text-slate-200 rounded text-[10px] overflow-x-auto whitespace-pre-wrap font-mono">
                                    {selectedAdminLead.aiProposal.architecture}
                                  </pre>
                                </div>
                                <div className="space-y-1">
                                  <span className="font-bold text-slate-500 block">MVP Core Features Checklist:</span>
                                  <ul className="list-disc pl-4 space-y-1 text-slate-700">
                                    {selectedAdminLead.aiProposal.mvpScope.map((scopeItem, sIdx) => (
                                      <li key={sIdx}>{scopeItem}</li>
                                    ))}
                                  </ul>
                                </div>
                                <div className="space-y-1">
                                  <span className="font-bold text-slate-500 block">Responsible AI Advisory:</span>
                                  <p className="text-slate-700 leading-relaxed">{selectedAdminLead.aiProposal.responsibleAI}</p>
                                </div>
                              </div>
                            ) : (
                              <div className="p-4 bg-slate-100 text-slate-500 text-center rounded-xl text-xs">
                                No custom AI proposal was generated for this lead. Direct schedule request was initiated.
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 space-y-2 py-12">
                          <Database className="w-8 h-8 text-slate-300" />
                          <p className="text-xs font-bold text-slate-700">Lead Detail Workspace Empty</p>
                          <p className="text-[11px] text-slate-500 max-w-xs leading-relaxed">
                            Click on any lead record card in the list to inspect their full details, chosen timeline, and custom AI-generated architecture payloads.
                          </p>
                        </div>
                      )}
                    </div>

                  </div>
                )}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Global Bottom Navigation Footer */}
      <footer className="bg-slate-950 text-white border-t border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Column 1 Logo */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white text-slate-950 rounded-xl flex items-center justify-center font-bold tracking-wider">
                  <span>AT</span>
                </div>
                <div>
                  <span className="text-xl font-extrabold tracking-tighter text-white">ATSFY Technologies</span>
                  <span className="text-xs block font-bold text-blue-400 tracking-widest uppercase">AI Product Development Studio</span>
                </div>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
                Building AI Products That Create Real Business Value. We design and deliver production-ready, VC-grade intelligent solutions with zero compromises.
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-1 rounded font-mono font-bold uppercase">
                  ● RESPONSIBLE AI FIRST
                </span>
              </div>
            </div>

            {/* Column 2 Navigation */}
            <div className="md:col-span-4 space-y-3">
              <h4 className="text-xs font-extrabold uppercase text-slate-400 tracking-widest">Navigation</h4>
              <ul className="space-y-2 text-xs text-slate-300 font-medium">
                <li><a href="#services-section" className="hover:text-blue-400 transition-colors">Services</a></li>
                <li><a href="#portfolio-section" className="hover:text-blue-400 transition-colors">Portfolio</a></li>
                <li><a href="#blog-section" className="hover:text-blue-400 transition-colors">Insights</a></li>
                <li><a href="#meeting-booking-form" className="hover:text-blue-400 transition-colors">Contact</a></li>
                <li><button onClick={() => { setActiveTab('admin'); }} className="hover:text-blue-400 text-left transition-colors font-semibold">Leads Database (Admin)</button></li>
              </ul>
            </div>

            {/* Column 3 Connect */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="text-xs font-extrabold uppercase text-slate-400 tracking-widest">Connect</h4>
              <ul className="space-y-2 text-xs text-slate-300 font-bold tracking-wider font-sans">
                <li>
                  <a 
                    href="https://www.linkedin.com/in/atsfy/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-blue-400 block transition-colors"
                  >
                    LINKEDIN
                  </a>
                </li>
                <li>
                  <a 
                    href="https://github.com/Ayanpal98" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-blue-400 block transition-colors"
                  >
                    GITHUB
                  </a>
                </li>
                <li>
                  <a 
                    href="mailto:info.atsfy@gmail.com" 
                    className="hover:text-blue-400 block font-mono font-medium lowercase transition-colors"
                  >
                    info.atsfy@gmail.com
                  </a>
                </li>
                <li>
                  <a 
                    href="tel:+919862510477" 
                    className="hover:text-blue-400 block font-mono font-medium transition-colors"
                  >
                    +91 9862510477
                  </a>
                </li>
                <li>
                  <div className="pt-1">
                    <span className="text-[10px] bg-slate-900 border border-slate-800 text-slate-400 px-2.5 py-1 rounded-full font-medium inline-block cursor-pointer hover:border-blue-500/40 transition-colors">
                      📬 Subscribe to Newsletter
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Legal Bar */}
          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-slate-400 font-medium">
            <p>
              © 2026 ATSFY Technologies. Building AI Products That Create Real Business Value.
            </p>
            <div className="flex gap-4">
              <span className="hover:text-white cursor-pointer">PRIVACY POLICY</span>
              <span>•</span>
              <span className="hover:text-white cursor-pointer">TERMS OF COMPLIANCE</span>
            </div>
          </div>

        </div>
      </footer>

      {/* Persistent Floating AI Guidance Assistant */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        
        {/* Chat Panel Box */}
        {isGuidanceOpen && (
          <div className="w-[92vw] sm:w-[420px] h-[550px] bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden relative mb-4 animate-in fade-in slide-in-from-bottom-5 duration-300">
            
            {/* Header */}
            <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                <div>
                  <h4 className="text-xs font-bold text-white tracking-wide uppercase">✨ Ask ATSFY AI</h4>
                  <p className="text-[9px] text-slate-400 font-medium">💡 AI Project Advisor</p>
                </div>
              </div>
              <button 
                onClick={() => setIsGuidanceOpen(false)}
                className="text-slate-400 hover:text-white p-1 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat History */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-800">
              {guidanceMessages.map((msg, idx) => (
                <div 
                  key={idx}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs ${
                      msg.sender === 'user' 
                        ? 'bg-blue-600 text-white rounded-br-none' 
                        : 'bg-slate-900 text-slate-100 rounded-bl-none border border-slate-800/80'
                    }`}
                  >
                    {msg.sender === 'assistant' ? (
                      <div className="space-y-1 font-normal">
                        {msg.text.split('\n').map((line, lineIdx) => {
                          if (line.startsWith('### ')) {
                            return <h5 key={lineIdx} className="text-[13px] font-bold text-blue-400 mt-3 mb-1 block">{line.replace('### ', '')}</h5>;
                          }
                          if (line.startsWith('**') && line.endsWith('**')) {
                            return <p key={lineIdx} className="text-xs font-bold text-white mt-1.5">{line.replaceAll('**', '')}</p>;
                          }
                          if (line.startsWith('* ')) {
                            return <li key={lineIdx} className="text-xs text-slate-300 ml-4 list-disc mt-1">{line.replace('* ', '')}</li>;
                          }
                          if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ') || line.startsWith('4. ')) {
                            return <p key={lineIdx} className="text-xs text-slate-300 ml-1.5 mt-1 pl-1 border-l border-blue-500/40">{line}</p>;
                          }
                          return <p key={lineIdx} className="text-[11px] text-slate-300 leading-relaxed mt-1 font-normal">{line}</p>;
                        })}
                      </div>
                    ) : (
                      <p className="leading-relaxed font-medium">{msg.text}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* Loader feedback */}
              {isGuidanceLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-900 text-slate-300 border border-slate-800 rounded-2xl rounded-bl-none p-3.5 space-y-2 flex items-center gap-3">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold">CTO Analyzing...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Form Input Footer */}
            <form onSubmit={handleSendGuidance} className="p-3 bg-slate-900 border-t border-slate-800 flex gap-2">
              <input 
                type="text"
                value={guidancePrompt}
                onChange={(e) => setGuidancePrompt(e.target.value)}
                placeholder="Describe your idea... (e.g. AI-powered real estate)"
                disabled={isGuidanceLoading}
                className="flex-grow bg-slate-950 text-white text-xs px-3.5 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-blue-500 placeholder-slate-500 disabled:opacity-50"
              />
              <button 
                type="submit"
                disabled={isGuidanceLoading || !guidancePrompt.trim()}
                className="bg-blue-600 hover:bg-blue-500 text-white px-3.5 rounded-xl flex items-center justify-center transition-colors disabled:opacity-40 disabled:hover:bg-blue-600 cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

          </div>
        )}

        {/* Floating Toggle Button */}
        <button
          onClick={() => setIsGuidanceOpen(!isGuidanceOpen)}
          className={`px-5 py-3.5 rounded-full font-bold text-xs uppercase tracking-widest flex items-center gap-2 shadow-2xl transition-all duration-300 ease-in-out cursor-pointer hover:scale-105 active:scale-95 ${
            isGuidanceOpen 
              ? 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800' 
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500'
          }`}
        >
          {isGuidanceOpen ? (
            <>
              <X className="w-4 h-4" />
              <span>Close Assistant</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>✨ Ask ATSFY AI</span>
            </>
          )}
        </button>

      </div>
    </div>
  );
}
