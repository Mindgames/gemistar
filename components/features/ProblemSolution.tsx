'use client';

import { CheckCircle2, TrendingDown, TrendingUp, X } from 'lucide-react';

import { Badge } from '@/components/ui/base/badge';
import { problemSolution } from '@/data/modernFrontpageData';

export function ProblemSolution() {
  return (
    <section className="py-24 bg-gradient-to-b from-blue-50/30 via-indigo-50/20 to-purple-50/30 dark:from-slate-900 dark:via-blue-950/20 dark:to-indigo-950/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm font-medium text-blue-600 dark:text-blue-300 mb-6">
              The Problem & Solution
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
              Why Communication AI
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 bg-clip-text text-transparent">
                Actually Matters
              </span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Problem */}
            <div className="relative group">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/30">
                <X className="w-5 h-5 text-white" />
              </div>
              <div className="relative bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-red-500/10 border border-white/20">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent rounded-3xl" />
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
                    {problemSolution.problem.title}
                  </h3>
                  <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
                    {problemSolution.problem.description}
                  </p>
                  <div className="space-y-3">
                    {problemSolution.problem.stats.map((stat, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <TrendingDown className="w-5 h-5 text-red-500" />
                        <span className="font-medium text-slate-700 dark:text-slate-300">
                          {stat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Solution */}
            <div className="relative group">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/30">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <div className="relative bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-green-500/10 border border-white/20">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent rounded-3xl" />
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
                    {problemSolution.solution.title}
                  </h3>
                  <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
                    {problemSolution.solution.description}
                  </p>
                  <div className="space-y-3">
                    {problemSolution.solution.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <TrendingUp className="w-5 h-5 text-green-500" />
                        <span className="font-medium text-slate-700 dark:text-slate-300">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
