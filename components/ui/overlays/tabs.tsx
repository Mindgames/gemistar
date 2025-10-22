/**
 * Tabs UI Components
 *
 * A collection of accessible tab components built on top of Radix UI's Tabs primitive.
 * Provides tabbed interface functionality with proper keyboard navigation, ARIA
 * attributes, and consistent styling.
 *
 * Features:
 * - Built on Radix UI for accessibility
 * - Customizable styling with Tailwind CSS
 * - TypeScript support with proper typing
 * - Keyboard navigation support
 * - Focus management
 * - Active state management
 *
 * @example
 * ```typescript
 * import {
 *   Tabs,
 *   TabsContent,
 *   TabsList,
 *   TabsTrigger,
 * } from "@/components/ui/tabs";
 *
 * function SettingsTabs() {
 *   return (
 *     <Tabs defaultValue="account" className="w-full">
 *       <TabsList className="grid w-full grid-cols-3">
 *         <TabsTrigger value="account">Account</TabsTrigger>
 *         <TabsTrigger value="password">Password</TabsTrigger>
 *         <TabsTrigger value="billing">Billing</TabsTrigger>
 *       </TabsList>
 *
 *       <TabsContent value="account" className="mt-4">
 *         <div className="space-y-4">
 *           <h3 className="text-lg font-medium">Account Settings</h3>
 *           <p className="text-sm text-muted-foreground">
 *             Manage your account information and preferences.
 *           </p>
 *         </div>
 *       </TabsContent>
 *
 *       <TabsContent value="password" className="mt-4">
 *         <div className="space-y-4">
 *           <h3 className="text-lg font-medium">Change Password</h3>
 *           <p className="text-sm text-muted-foreground">
 *             Update your password to keep your account secure.
 *           </p>
 *         </div>
 *       </TabsContent>
 *
 *       <TabsContent value="billing" className="mt-4">
 *         <div className="space-y-4">
 *           <h3 className="text-lg font-medium">Billing Information</h3>
 *           <p className="text-sm text-muted-foreground">
 *             View and manage your subscription details.
 *           </p>
 *         </div>
 *       </TabsContent>
 *     </Tabs>
 *   );
 * }
 * ```
 */

'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '@/utils/cn';

/**
 * Root tabs component that manages the tab state and renders children.
 *
 * @see {@link https://www.radix-ui.com/docs/primitives/components/tabs} - Radix UI Tabs documentation
 */
const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'inline-flex h-10 items-center justify-center rounded-md bg-slate-100 p-1 text-slate-500 dark:bg-slate-800 dark:text-slate-400',
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-slate-950 data-[state=active]:shadow-sm dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 dark:data-[state=active]:bg-slate-950 dark:data-[state=active]:text-slate-50',
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300',
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
