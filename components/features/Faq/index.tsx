import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/overlays/accordion';

import React from 'react';

/**
 * @interface FaqProps
 * @description Defines the props for the Faq component.
 * @property {object[]} items - An array of FAQ items.
 * @property {string} items.trigger - The question or trigger text for the FAQ item.
 * @property {string} items.content - The answer or content for the FAQ item.
 * @property {string} items.value - A unique value for the FAQ item.
 * @property {string} title - The title of the FAQ section.
 * @property {string} description - The description of the FAQ section.
 */
interface FaqProps {
  items: {
    trigger: string;
    content: string;
    value: string;
  }[];
  title: string;
  description: string;
}

/**
 * Renders a frequently asked questions (FAQ) section.
 *
 * This component displays a list of questions and answers in an accordion format.
 *
 * @param {FaqProps} props - The component props.
 * @returns {JSX.Element} The rendered FAQ section.
 */
const Faq: React.FC<FaqProps> = ({ items, title, description }) => {
  return (
    <section
      className="relative w-full border-t my-24 border-border bg-transparent py-16 sm:py-24 lg:py-32"
      id="ctaOne"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-base tracking-tight text-foreground sm:text-5xl">
            {title}
          </h2>
        </div>
        <div className="mx-auto mt-10 max-w-3xl">
          <Accordion type="single" collapsible>
            {items.map((item) => (
              <AccordionItem key={item.value} value={item.value}>
                <AccordionTrigger>{item.trigger}</AccordionTrigger>
                <AccordionContent>{item.content}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default Faq;

// Usage example
// <Faq
//   title="Frequently Asked Questions"
//   description="<p>Here are some of the most common questions we receive.</p>"
//   items={[
//     { trigger: "Is it accessible?", content: "Yes. It adheres to the WAI-ARIA design pattern.", value: "item-1" },
//     // Add more items as needed
//   ]}
// />
