import React, { useState } from 'react';
import { HTML_CODE_SAMPLE, CSS_CODE_SAMPLE, JS_CODE_SAMPLE } from '../data/sourceCodeSamples';
import { Code, Copy, Check, X, FileCode, Palette, Terminal } from 'lucide-react';

interface CodeViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CodeViewerModal: React.FC<CodeViewerModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentCode =
    activeTab === 'html'
      ? HTML_CODE_SAMPLE
      : activeTab === 'css'
      ? CSS_CODE_SAMPLE
      : JS_CODE_SAMPLE;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="relative w-full max-w-4xl max-h-[85vh] bg-slate-900 text-slate-100 rounded-xl shadow-2xl border border-slate-700 flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center gap-2">
            <Code className="w-5 h-5 text-sky-400" />
            <div>
              <h3 className="text-sm font-bold text-white">
                Standalone HTML, CSS & JavaScript Source Code
              </h3>
              <p className="text-[11px] text-slate-400">
                Educational reference implementation of the Student Registration Form
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 px-4 py-2 border-b border-slate-800 bg-slate-950">
          <button
            type="button"
            onClick={() => setActiveTab('html')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium cursor-pointer transition-colors ${
              activeTab === 'html'
                ? 'bg-sky-600/20 text-sky-400 border border-sky-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Semantic HTML5 (index.html)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('css')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium cursor-pointer transition-colors ${
              activeTab === 'css'
                ? 'bg-sky-600/20 text-sky-400 border border-sky-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Form Stylesheet (styles.css)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('js')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium cursor-pointer transition-colors ${
              activeTab === 'js'
                ? 'bg-sky-600/20 text-sky-400 border border-sky-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Validation & Logic (script.js)</span>
          </button>
        </div>

        {/* Code Content */}
        <div className="flex-1 overflow-auto p-4 bg-slate-950/80 font-mono text-xs leading-relaxed text-slate-300">
          <pre className="whitespace-pre">
            <code>{currentCode}</code>
          </pre>
        </div>

        {/* Footer Explanations */}
        <div className="p-3 border-t border-slate-800 bg-slate-950 text-[11px] text-slate-400 flex items-center justify-between">
          <span>
            {activeTab === 'html' && '• Semantic HTML5: <form>, <fieldset>, <legend>, <label htmlFor>, input types (text, email, tel, date, select, checkbox, radio).'}
            {activeTab === 'css' && '• Clean CSS: CSS variables, CSS grid/flexbox, accessible focus rings, print media stylesheet, custom form controls.'}
            {activeTab === 'js' && '• Vanilla JavaScript: Real-time validation, multi-step pagination, age verification, email regex, localStorage persistence.'}
          </span>
          <span className="font-mono text-slate-500">UTF-8 · Standard DOM API</span>
        </div>
      </div>
    </div>
  );
};
