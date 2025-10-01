'use client';

type Props = {
  currentTime: Date | null;
  mounted: boolean;
  showMobileMenu: boolean;
  setShowMobileMenu: (show: boolean) => void;
};

export default function TopBar({ currentTime, mounted, showMobileMenu, setShowMobileMenu }: Props) {
  return (
    <div className="bg-[#323233] border-b border-gray-800 px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="text-sm text-gray-400 font-[family-name:var(--font-space)] hidden sm:block flex items-center gap-2">
          <span className="text-cyan-400">divyanshu-portfolio</span>
          <span className="text-gray-600">—</span>
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold">
            DevForge Studio ⚡
          </span>
        </span>
        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="sm:hidden text-gray-400 hover:text-white"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      <div className="text-[10px] sm:text-xs md:text-sm text-gray-500 font-mono">
        {mounted && currentTime ? (
          <>
            {/* Mobile: Short date format */}
            <span className="sm:hidden">{currentTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} • </span>
            {/* Desktop: Full date format */}
            <span className="hidden sm:inline">{currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })} • </span>
            {/* Time - Always visible */}
            <span className="whitespace-nowrap">{currentTime.toLocaleTimeString()}</span>
          </>
        ) : (
          <span className="whitespace-nowrap">--:--:--</span>
        )}
      </div>
    </div>
  );
}

