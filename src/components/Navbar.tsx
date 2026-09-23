import React from 'react';
import { Sparkles, Printer, Code } from 'lucide-react';

interface NavbarProps {
  activeView: 'form' | 'directory' | 'card';
  onViewChange: (view: 'form' | 'directory' | 'card') => void;
  onOpenCodeViewer: () => void;
  onFillSampleData: () => void;
  studentsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  onViewChange,
  onOpenCodeViewer,
  onFillSampleData,
  studentsCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand title, one line wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onViewChange('form');
          }}
          className="text-base sm:text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:text-sky-700 transition-colors"
        >
          Samrat Ashok Technological Institute
        </a>

        {/* Zone 2: 4-6 nav links, 1-2 word labels, single-line text links */}
        <nav className="flex items-center gap-1 sm:gap-6 text-xs sm:text-sm font-medium text-slate-600 overflow-x-auto py-1">
          <button
            type="button"
            onClick={() => onViewChange('form')}
            className={`whitespace-nowrap transition-colors cursor-pointer py-1 ${
              activeView === 'form'
                ? 'text-slate-900 font-bold border-b-2 border-slate-900'
                : 'hover:text-slate-900'
            }`}
          >
            Registration Form
          </button>
          <button
            type="button"
            onClick={() => onViewChange('directory')}
            className={`whitespace-nowrap transition-colors cursor-pointer py-1 flex items-center gap-1.5 ${
              activeView === 'directory'
                ? 'text-slate-900 font-bold border-b-2 border-slate-900'
                : 'hover:text-slate-900'
            }`}
          >
            <span>Students Directory</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-700 font-mono tabular-nums">
              {studentsCount}
            </span>
          </button>
          <button
            type="button"
            onClick={() => onViewChange('card')}
            className={`whitespace-nowrap transition-colors cursor-pointer py-1 ${
              activeView === 'card'
                ? 'text-slate-900 font-bold border-b-2 border-slate-900'
                : 'hover:text-slate-900'
            }`}
          >
            Student ID Badge
          </button>
          <button
            type="button"
            onClick={onOpenCodeViewer}
            className="whitespace-nowrap text-slate-600 hover:text-sky-600 transition-colors cursor-pointer py-1 flex items-center gap-1"
          >
            <Code className="w-3.5 h-3.5" />
            <span>View Source Code</span>
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onFillSampleData}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-2xs transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="whitespace-nowrap">Fill Sample</span>
          </button>
          <button
            type="button"
            onClick={() => {
              if (activeView !== 'form') {
                onViewChange('form');
              } else {
                window.print();
              }
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-white shadow-2xs transition-colors whitespace-nowrap cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Slip</span>
          </button>
        </div>
      </div>
    </header>
  );
};
