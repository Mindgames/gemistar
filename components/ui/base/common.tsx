/**
 * @fileoverview Common UI components for typography and layout elements.
 * @author Your Name
 */

import * as React from 'react';

/**
 * H1 heading component for main page titles.
 *
 * This component provides consistent styling for the largest heading level,
 * typically used for page titles or major section headers. It includes
 * responsive font sizing and proper semantic HTML.
 *
 * @component
 * @param {React.HTMLAttributes<HTMLHeadingElement>} props - HTML heading attributes
 * @returns {JSX.Element} The rendered H1 heading
 *
 * @example
 * ```typescript
 * <H1 className="text-center">Welcome to Our Platform</H1>
 * ```
 */
export const H1: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  ...props
}) => (
  <h1 className={`text-4xl font-bold tracking-tight ${className}`} {...props} />
);

/**
 * H2 heading component for section titles.
 *
 * This component provides consistent styling for second-level headings,
 * typically used for major section titles or important content divisions.
 * It maintains proper heading hierarchy and responsive design.
 *
 * @component
 * @param {React.HTMLAttributes<HTMLHeadingElement>} props - HTML heading attributes
 * @returns {JSX.Element} The rendered H2 heading
 *
 * @example
 * ```typescript
 * <H2 className="mb-4">Getting Started</H2>
 * ```
 */
export const H2: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  ...props
}) => (
  <h2
    className={`text-3xl font-semibold tracking-tight ${className}`}
    {...props}
  />
);

/**
 * H3 heading component for subsection titles.
 *
 * This component provides styling for third-level headings,
 * used for subsections within major content areas. It maintains
 * proper semantic hierarchy and responsive typography.
 *
 * @component
 * @param {React.HTMLAttributes<HTMLHeadingElement>} props - HTML heading attributes
 * @returns {JSX.Element} The rendered H3 heading
 *
 * @example
 * ```typescript
 * <H3>Installation Guide</H3>
 * ```
 */
export const H3: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  ...props
}) => (
  <h3
    className={`text-2xl font-semibold tracking-tight ${className}`}
    {...props}
  />
);

/**
 * H4 heading component for minor section titles.
 *
 * This component provides styling for fourth-level headings,
 * used for smaller subsections or content groupings. It ensures
 * proper heading hierarchy and consistent visual treatment.
 *
 * @component
 * @param {React.HTMLAttributes<HTMLHeadingElement>} props - HTML heading attributes
 * @returns {JSX.Element} The rendered H4 heading
 *
 * @example
 * ```typescript
 * <H4>Step 1: Setup</H4>
 * ```
 */
export const H4: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  ...props
}) => (
  <h4
    className={`text-xl font-semibold tracking-tight ${className}`}
    {...props}
  />
);

/**
 * Paragraph component for body text content.
 *
 * This component provides consistent styling for paragraph text,
 * including proper line height and spacing for improved readability.
 * It supports all standard paragraph HTML attributes.
 *
 * @component
 * @param {React.HTMLAttributes<HTMLParagraphElement>} props - HTML paragraph attributes
 * @returns {JSX.Element} The rendered paragraph
 *
 * @example
 * ```typescript
 * <P className="mb-4">
 *   This is a paragraph of text with proper spacing and line height
 *   for optimal readability.
 * </P>
 * ```
 */
export const P: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className,
  ...props
}) => <p className={`text-base leading-relaxed ${className}`} {...props} />;

/**
 * Blockquote component for quoted content.
 *
 * This component provides distinctive styling for block quotes,
 * with a left border and italic text to differentiate quoted content
 * from regular body text.
 *
 * @component
 * @param {React.HTMLAttributes<HTMLQuoteElement>} props - HTML quote attributes
 * @returns {JSX.Element} The rendered blockquote
 *
 * @example
 * ```typescript
 * <Blockquote>
 *   "This is a quoted passage that stands out from the main content."
 * </Blockquote>
 * ```
 */
export const Blockquote: React.FC<React.HTMLAttributes<HTMLQuoteElement>> = ({
  className,
  ...props
}) => (
  <blockquote
    className={`border-l-4 border-gray-300 pl-4 italic ${className}`}
    {...props}
  />
);

/**
 * Table component for displaying tabular data.
 *
 * This component provides consistent styling for tables with proper
 * borders, spacing, and responsive behavior. It supports all standard
 * table HTML attributes.
 *
 * @component
 * @param {React.TableHTMLAttributes<HTMLTableElement>} props - HTML table attributes
 * @returns {JSX.Element} The rendered table
 *
 * @example
 * ```typescript
 * <Table>
 *   <thead>
 *     <tr>
 *       <th>Name</th>
 *       <th>Email</th>
 *     </tr>
 *   </thead>
 *   <tbody>
 *     <tr>
 *       <td>John Doe</td>
 *       <td>john@example.com</td>
 *     </tr>
 *   </tbody>
 * </Table>
 * ```
 */
export const Table: React.FC<React.TableHTMLAttributes<HTMLTableElement>> = ({
  className,
  ...props
}) => (
  <table
    className={`min-w-full divide-y divide-gray-200 ${className}`}
    {...props}
  />
);

/**
 * List component for unordered lists.
 *
 * This component provides consistent styling for bulleted lists
 * with proper indentation and spacing. It uses disc bullets by default.
 *
 * @component
 * @param {React.HTMLAttributes<HTMLUListElement>} props - HTML list attributes
 * @returns {JSX.Element} The rendered list
 *
 * @example
 * ```typescript
 * <List>
 *   <li>First item</li>
 *   <li>Second item</li>
 *   <li>Third item</li>
 * </List>
 * ```
 */
export const List: React.FC<React.HTMLAttributes<HTMLUListElement>> = ({
  className,
  ...props
}) => <ul className={`list-disc pl-5 ${className}`} {...props} />;

/**
 * Inline code component for code snippets within text.
 *
 * This component provides distinctive styling for inline code references,
 * with a gray background and monospace font to differentiate code from
 * regular text content.
 *
 * @component
 * @param {React.HTMLAttributes<HTMLElement>} props - HTML element attributes
 * @returns {JSX.Element} The rendered inline code element
 *
 * @example
 * ```typescript
 * <P>
 *   Use the <InlineCode>npm install</InlineCode> command to install packages.
 * </P>
 * ```
 */
export const InlineCode: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  className,
  ...props
}) => (
  <code
    className={`bg-gray-100 rounded px-1 py-0.5 font-mono text-sm ${className}`}
    {...props}
  />
);

/**
 * Lead paragraph component for introductory content.
 *
 * This component provides styling for lead paragraphs that introduce
 * sections or pages. It uses larger text and muted color to create
 * visual hierarchy.
 *
 * @component
 * @param {React.HTMLAttributes<HTMLParagraphElement>} props - HTML paragraph attributes
 * @returns {JSX.Element} The rendered lead paragraph
 *
 * @example
 * ```typescript
 * <Lead className="text-center">
 *   This introduction sets the context for the entire section.
 * </Lead>
 * ```
 */
export const Lead: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className,
  ...props
}) => (
  <p className={`text-2xl text-muted-foreground ${className}`} {...props} />
);

/**
 * Large text component for emphasized content.
 *
 * This component provides styling for text that needs to be larger
 * and more prominent than regular body text, but not as prominent
 * as headings.
 *
 * @component
 * @param {React.HTMLAttributes<HTMLParagraphElement>} props - HTML paragraph attributes
 * @returns {JSX.Element} The rendered large text
 *
 * @example
 * ```typescript
 * <Large className="font-bold">Important Notice</Large>
 * ```
 */
export const Large: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className,
  ...props
}) => <p className={`text-xl font-semibold ${className}`} {...props} />;

/**
 * Small text component for secondary content.
 *
 * This component provides styling for text that should be smaller
 * than regular body text, typically used for captions, disclaimers,
 * or secondary information.
 *
 * @component
 * @param {React.HTMLAttributes<HTMLParagraphElement>} props - HTML paragraph attributes
 * @returns {JSX.Element} The rendered small text
 *
 * @example
 * ```typescript
 * <Small className="text-gray-600">
 *   * This feature requires a premium subscription
 * </Small>
 * ```
 */
export const Small: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className,
  ...props
}) => <p className={`text-sm ${className}`} {...props} />;

/**
 * Muted text component for de-emphasized content.
 *
 * This component provides styling for text that should be less prominent,
 * typically used for secondary information, hints, or metadata.
 * It uses a gray color to reduce visual emphasis.
 *
 * @component
 * @param {React.HTMLAttributes<HTMLParagraphElement>} props - HTML paragraph attributes
 * @returns {JSX.Element} The rendered muted text
 *
 * @example
 * ```typescript
 * <Muted>Last updated 2 hours ago</Muted>
 * ```
 */
export const Muted: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className,
  ...props
}) => <p className={`text-sm text-gray-500 ${className}`} {...props} />;

/**
 * Props interface for the Container component.
 *
 * This interface extends HTML div attributes and adds specific props
 * for controlling container width and vertical padding.
 *
 * @interface ContainerProps
 * @extends React.HTMLAttributes<HTMLDivElement>
 *
 * @property {'sm' | 'default' | 'lg' | 'full'} [width='default'] - Container width variant
 * @property {'none' | 'sm' | 'lg' | 'xl'} [paddingY='none'] - Vertical padding variant
 *
 * @example
 * ```typescript
 * // Default container
 * <Container>Content</Container>
 *
 * // Full width with large padding
 * <Container width="full" paddingY="lg">
 *   <div>Wide content area</div>
 * </Container>
 * ```
 */
interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: 'sm' | 'default' | 'lg' | 'full';
  paddingY?: 'none' | 'sm' | 'lg' | 'xl';
}

/**
 * Container component for consistent layout and spacing.
 *
 * This component provides a responsive container with configurable width
 * and vertical padding options. It centers content horizontally and
 * provides consistent spacing across different screen sizes.
 *
 * @component
 * @param {ContainerProps} props - Container component props
 * @returns {JSX.Element} The rendered container
 *
 * @example
 * ```typescript
 * // Default container (max-width: 7xl, no vertical padding)
 * <Container>
 *   <div>Content</div>
 * </Container>
 *
 * // Small container with small padding
 * <Container width="sm" paddingY="sm">
 *   <H1>Page Title</H1>
 *   <P>Page content...</P>
 * </Container>
 *
 * // Full width with extra large padding
 * <Container width="full" paddingY="xl">
 *   <div className="grid grid-cols-3 gap-4">
 *     <div>Column 1</div>
 *     <div>Column 2</div>
 *     <div>Column 3</div>
 *   </div>
 * </Container>
 * ```
 */
export const Container: React.FC<ContainerProps> = ({
  className,
  width = 'default',
  paddingY = 'none',
  ...props
}) => {
  const widthClass =
    width === 'sm' ? 'max-w-5xl' : width === 'full' ? 'w-full' : 'max-w-7xl';
  const paddingYClass =
    paddingY === 'none'
      ? 'py-0'
      : paddingY === 'sm'
        ? 'py-2 sm:py-4'
        : paddingY === 'lg'
          ? 'py-4 sm:py-8'
          : 'py-6 sm:py-12'; // for 'xl'
  return (
    <div
      className={`container mx-auto px-4 ${widthClass} ${paddingYClass} ${className}`}
      {...props}
    />
  );
};

/**
 * Props interface for the Heading and Subheading components.
 *
 * This interface extends HTML heading attributes and adds a required level
 * prop to specify which heading level (h1-h6) should be rendered.
 *
 * @interface HeadingProps
 * @extends React.HTMLAttributes<HTMLHeadingElement>
 *
 * @property {1 | 2 | 3 | 4 | 5 | 6} level - The heading level (1-6)
 *
 * @example
 * ```typescript
 * // H1 heading
 * <Heading level={1}>Main Title</Heading>
 *
 * // H3 heading with custom class
 * <Heading level={3} className="text-blue-600">Section Title</Heading>
 * ```
 */
interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

/**
 * Flexible heading component that renders any heading level (h1-h6).
 *
 * This component provides a programmatic way to create headings with
 * consistent styling. It automatically applies appropriate text sizes
 * and responsive behavior for each heading level.
 *
 * @component
 * @param {HeadingProps} props - Heading component props
 * @returns {JSX.Element} The rendered heading element
 *
 * @example
 * ```typescript
 * // H1 - Main page title
 * <Heading level={1} className="text-center">
 *   Welcome to Our Platform
 * </Heading>
 *
 * // H2 - Section title
 * <Heading level={2}>Getting Started</Heading>
 *
 * // H4 - Subsection title
 * <Heading level={4}>Advanced Configuration</Heading>
 * ```
 */
export const Heading: React.FC<HeadingProps> = ({
  level,
  className,
  ...props
}) => {
  const textSizeClasses = [
    'text-6xl', // for level 1
    'text-5xl', // for level 2
    'text-4xl', // for level 3
    'text-3xl', // for level 4
    'text-2xl', // for level 5
    'text-xl' // for level 6
  ];

  const textSizeClass = textSizeClasses[level - 1] || 'text-4xl';

  return React.createElement(`h${level}`, {
    className: `text-pretty ${textSizeClass} font-medium tracking-tighter text-gray-950 data-[dark]:text-white sm:${textSizeClass} ${className}`,
    ...props
  });
};

/**
 * Subheading component for secondary headings with bold styling.
 *
 * This component provides an alternative to the regular Heading component
 * with bold font weight and consistent sizing. It's useful for creating
 * visual hierarchy within content sections.
 *
 * @component
 * @param {HeadingProps} props - Subheading component props
 * @returns {JSX.Element} The rendered subheading element
 *
 * @example
 * ```typescript
 * // Bold H2 subheading
 * <Subheading level={2}>Important Notice</Subheading>
 *
 * // Bold H3 subheading with custom styling
 * <Subheading level={3} className="text-blue-600">
 *   Configuration Options
 * </Subheading>
 * ```
 */
export const Subheading: React.FC<HeadingProps> = ({
  level,
  className,
  ...props
}) => {
  return React.createElement(`h${level}`, {
    className: `text-4xl font-bold tracking-tight ${className}`,
    ...props
  });
};
