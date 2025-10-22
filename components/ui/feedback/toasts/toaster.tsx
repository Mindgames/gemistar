'use client';

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport
} from '@/components/ui/feedback/toasts/toast';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useEffect } from 'react';
import { useToast } from '@/components/ui/feedback/toasts/use-toast';

/**
 * Toaster component that manages and displays toast notifications.
 *
 * This component provides a centralized toast notification system that
 * automatically handles URL-based toast parameters and displays them to users.
 * It supports both success and error toasts with customizable messages.
 *
 * Features:
 * - Automatic URL parameter detection for toast messages
 * - Support for success and error toast variants
 * - Responsive design with proper positioning
 * - Integration with Next.js routing and search parameters
 *
 * @component
 * @returns {JSX.Element} The rendered toast notification system
 *
 * @example
 * ```typescript
 * // In a layout component
 * import { Toaster } from '@/components/ui/Toasts/toaster';
 *
 * function Layout() {
 *   return (
 *     <div>
 *       <Toaster />
 *       // Rest of layout
 *     </div>
 *   );
 * }
 * ```
 *
 * @see {@link https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#search-params} - Next.js Search Parameters
 */
export function Toaster() {
  const { toast, toasts } = useToast();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const status = searchParams.get('status');
    const status_description = searchParams.get('status_description');
    const error = searchParams.get('error');
    const error_description = searchParams.get('error_description');
    if (error || status) {
      toast({
        title: error
          ? (error ?? 'Hmm... Something went wrong.')
          : (status ?? 'Alright!'),
        description: error ? error_description : status_description,
        variant: error ? 'destructive' : undefined
      });
      // Clear any 'error', 'status', 'status_description', and 'error_description' search params
      // so that the toast doesn't show up again on refresh, but leave any other search params
      // intact.
      const newSearchParams = new URLSearchParams(searchParams.toString());
      const paramsToRemove = [
        'error',
        'status',
        'status_description',
        'error_description'
      ];
      paramsToRemove.forEach((param) => newSearchParams.delete(param));
      const redirectPath = `${pathname}?${newSearchParams.toString()}`;
      router.replace(redirectPath, { scroll: false });
    }
  }, [searchParams, pathname, router, toast]);

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
