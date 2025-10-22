import Link from 'next/link';

/**
 * Renders a 404 "Page Not Found" error page.
 *
 * This component is displayed when a user tries to access a route
 * that does not exist. It provides a clear message and a link to
 * navigate back to the homepage.
 *
 * @returns {JSX.Element} The rendered 404 page component.
 */
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-gray-900">404</h1>
      <p className="text-lg text-gray-600 mt-2">Page not found</p>
      <Link
        href="/"
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Go Home
      </Link>
    </div>
  );
}
