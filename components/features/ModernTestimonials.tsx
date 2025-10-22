'use client';

const testimonials = [
  {
    quote:
      'It was night and day from one batch to another, adoption went from single digits to over 80%. It just spread like wildfire, all the best communicators were using Gamistar.',
    author: 'Sarah Chen',
    role: 'VP of Customer Success'
  },
  {
    quote:
      'The most useful AI tool that I currently pay for, hands down, is Gamistar. It understands context, maintains my voice, and makes communication effortless.',
    author: 'Marcus Rodriguez',
    role: 'Head of Sales, TechCorp'
  },
  {
    quote:
      'Gamistar quickly grew from hundreds to thousands of enthusiastic team members. We spend significant time on communication, and there are real outcomes when making that process more efficient.',
    author: 'Emily Watson',
    role: 'CEO, EnterpriseCo'
  }
];

export function ModernTestimonials() {
  return (
    <section className="w-full bg-background py-32">
      <div className="container mx-auto max-w-7xl px-6 sm:px-8 md:px-12">
        {/* Simple centered heading */}
        <div className="text-center mb-20">
          <h2 className="text-3xl lg:text-3xl font-base mb-4 text-foreground">
            Trusted by professionals everywhere
          </h2>
        </div>

        {/* Clean testimonial cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="rounded-2xl border border-border bg-card p-8 shadow-lg"
            >
              <blockquote className="text-foreground mb-6 leading-relaxed">
                {testimonial.quote}
              </blockquote>
              <div className="border-t border-border pt-6">
                <div className="font-semibold text-foreground">
                  {testimonial.author}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {testimonial.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
