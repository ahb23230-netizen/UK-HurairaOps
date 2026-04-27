import { useState, useRef, useEffect } from 'react';
import Sidebar from './Sidebar';
import FloatingChatWidget from './FloatingChatWidget';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef<number>(0);

  // Save scroll position before unmount
  useEffect(() => {
    const navElement = navRef.current;
    if (navElement) {
      scrollPositionRef.current = navElement.scrollTop;
    }
  });

  // Restore scroll position after mount
  useEffect(() => {
    const navElement = navRef.current;
    if (navElement && scrollPositionRef.current > 0) {
      setTimeout(() => {
        navElement.scrollTop = scrollPositionRef.current;
      }, 0);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-white rounded-lg shadow-md"
      >
        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Global Sidebar - Persists across navigations */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onUpgradeClick={() => window.location.href = '/pricing'}
        navRef={navRef}
      />

      {/* Main Content - Centered with max-width for professional look */}
      <div className="lg:ml-72 min-h-screen p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </div>

      <FloatingChatWidget />
    </div>
  );
}