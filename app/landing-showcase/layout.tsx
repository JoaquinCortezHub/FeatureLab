import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Landing Page Showcase',
  description:
    'Explore different design directions for the FeatureLab landing page',
};

export default function ShowcaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-500 focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-black"
      >
        Skip to main content
      </a>

      <div id="main-content" className="min-h-screen bg-black">
        {children}
      </div>
    </>
  );
}
