'use client';

import { Button } from '@/components/ui/button';

/**
 * Props for the ReferralCard component.
 */
interface ReferralCardProps {
  /**
   * The unique referral URL to share with others.
   * This URL allows friends to join the waitlist and gives the referrer priority.
   */
  referralUrl: string;
}

/**
 * ReferralCard component for the waitlist system.
 *
 * This component displays a referral link that users can share with friends
 * to get priority in the waitlist queue. It includes a copy-to-clipboard
 * functionality for easy sharing.
 *
 * @component
 * @param {ReferralCardProps} props - The component props
 * @returns {JSX.Element} The rendered referral card
 *
 * @example
 * ```typescript
 * const referralUrl = "https://example.com/waitlist?ref=user123";
 *
 * <ReferralCard referralUrl={referralUrl} />
 * ```
 */
export function ReferralCard({
  referralUrl
}: ReferralCardProps): React.JSX.Element {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <p className="text-gray-600 mt-2 mb-4">
        Invite friends to join the waitlist. You&apos;ll jump ahead in line for
        every friend who signs up through your link.
      </p>
      <div className="mt-4 flex flex-col items-center gap-3">
        <input
          type="text"
          readOnly
          value={referralUrl}
          className="w-full px-3 py-2 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-md text-center"
        />
        <Button
          onClick={() => navigator.clipboard.writeText(referralUrl)}
          className="w-full bg-black text-white hover:bg-gray-900"
        >
          Copy Referral Link
        </Button>
      </div>
    </div>
  );
}
