'use client';

import { ArrowRight, Check } from 'lucide-react';

import { Badge } from '@/components/ui/base/badge';
import { Button } from '@/components/ui/button';
import { ShimmerButton } from '@/components/design-systems/magicui/shimmer-button';
import { pricingPreview } from '@/data/modernFrontpageData';

export function PricingPreview() {
  return (
    <section className="py-24 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Simple, Transparent Pricing
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Choose Your
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Growth Plan
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Start free, scale as you grow. All plans include our core AI
              features with different usage limits.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {Object.entries(pricingPreview).map(([key, plan]) => (
              <div
                key={key}
                className={`relative bg-white dark:bg-slate-800 rounded-3xl p-8 border-2 transition-all duration-300 hover:-translate-y-2 ${
                  (plan as any).popular
                    ? 'border-blue-500 shadow-xl shadow-blue-500/20'
                    : 'border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl'
                }`}
              >
                {(plan as any).popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 hover:bg-blue-600">
                    Most Popular
                  </Badge>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      {plan.price}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400 ml-1">
                      {plan.period}
                    </span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {(plan as any).popular ? (
                  <ShimmerButton
                    href="/waitlist"
                    className="w-full justify-center"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Get Started
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </ShimmerButton>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full justify-center"
                    disabled
                  >
                    Coming Soon
                  </Button>
                )}
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              All plans include 14-day free trial • Cancel anytime
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" size="lg">
                Compare All Features
              </Button>
              <Button variant="ghost" size="lg">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
