import {
  ArrowRight,
  BarChart3,
  Brain,
  CheckCircle2,
  Clock,
  Globe,
  MessageSquare,
  Shield,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
  Zap
} from 'lucide-react';

export const heroMetrics = [
  { label: 'Active Users', value: '50K+', icon: Users },
  { label: 'Messages Processed', value: '2M+', icon: MessageSquare },
  { label: 'Time Saved', value: '15hrs/week', icon: Clock },
  { label: 'Success Rate', value: '98%', icon: TrendingUp }
];

export const trustIndicators = [
  'Trusted by Fortune 500 companies',
  'SOC 2 Type II Certified',
  'GDPR & HIPAA Compliant',
  'Enterprise-grade security'
];

export const features = [
  {
    icon: Brain,
    title: 'Contextual Intelligence',
    description:
      'Advanced AI that understands nuance, emotion, and intent across all your conversations',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description:
      'Instant responses powered by cutting-edge language models and optimized infrastructure',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description:
      'Bank-grade encryption with SOC 2 compliance and zero data retention policies',
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    icon: MessageSquare,
    title: 'Multi-Platform',
    description:
      'Seamlessly integrated across email, Slack, LinkedIn, and 50+ business tools',
    gradient: 'from-orange-500 to-red-500'
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description:
      'Deep insights into your communication patterns with actionable recommendations',
    gradient: 'from-indigo-500 to-purple-500'
  },
  {
    icon: Sparkles,
    title: 'Personalization Engine',
    description:
      'AI that adapts to your unique communication style and continuously improves',
    gradient: 'from-pink-500 to-rose-500'
  }
];

export const problemSolution = {
  problem: {
    title: 'Communication is Broken in the AI Era',
    description:
      'Teams lose 15+ hours weekly on repetitive responses, missed context, and inconsistent messaging. Traditional AI tools generate generic replies that damage relationships and brand reputation.',
    stats: [
      '15+ hours lost weekly',
      '73% of messages ignored',
      '$1.2M annual productivity loss'
    ]
  },
  solution: {
    title: 'Gamistar: Your AI Communication Partner',
    description:
      "The world's most advanced AI agent that understands context, remembers relationships, and crafts perfect responses while maintaining your authentic voice.",
    benefits: [
      'Context-aware responses that build relationships',
      'Consistent brand voice across all channels',
      '15x faster response times with higher engagement',
      'Zero learning curve - works exactly like you'
    ]
  }
};

export const testimonials = [
  {
    quote:
      'Gamistar transformed how we communicate. Our response time improved by 400% and customer satisfaction scores jumped 35 points.',
    author: {
      name: 'Sarah Chen',
      title: 'VP of Customer Success',
      company: 'TechFlow Inc.',
      image: '/images/people/sarah.jpg'
    },
    metrics: { responseTime: '-75%', satisfaction: '+35%' }
  },
  {
    quote:
      "The AI understands our brand voice perfectly. It's like having a senior communications expert available 24/7.",
    author: {
      name: 'Marcus Rodriguez',
      title: 'Head of Marketing',
      company: 'GrowthLabs',
      image: '/images/people/marcus.jpg'
    },
    metrics: { consistency: '99%', engagement: '+200%' }
  },
  {
    quote:
      'Gamistar eliminated communication bottlenecks. Our sales team now responds instantly while maintaining personal relationships.',
    author: {
      name: 'Emily Watson',
      title: 'Sales Director',
      company: 'EnterpriseCorp',
      image: '/images/people/emily.jpg'
    },
    metrics: { conversion: '+45%', retention: '+60%' }
  }
];

export const pricingPreview = {
  starter: {
    name: 'Starter',
    price: '$29',
    period: '/month',
    features: [
      'Up to 1,000 messages/month',
      'Basic AI responses',
      'Email integration',
      'Standard support'
    ]
  },
  professional: {
    name: 'Professional',
    price: '$79',
    period: '/month',
    features: [
      'Up to 10,000 messages/month',
      'Advanced AI with context',
      'Multi-platform integration',
      'Priority support',
      'Analytics dashboard'
    ],
    popular: true
  },
  enterprise: {
    name: 'Enterprise',
    price: 'Custom',
    period: 'pricing',
    features: [
      'Unlimited messages',
      'Custom AI training',
      'Dedicated account manager',
      'Enterprise security',
      'SLA guarantee'
    ]
  }
};

export const finalCTA = {
  title: 'Ready to Transform Your Communication?',
  description:
    'Join thousands of professionals who have already revolutionized their productivity with Gamistar.',
  primaryButton: {
    text: 'Start Free Trial',
    href: '/waitlist'
  },
  secondaryButton: {
    text: 'Schedule Demo',
    href: '/demo'
  },
  guarantee: '30-day money-back guarantee • No credit card required'
};




