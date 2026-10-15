/**
 * GeoMacera: 5. Sınıf Geometri Labirenti & Sevimli Kaşif
 * MEB 5. Sınıf Matematik Müfredatı (Sayfa 45-49)
 */

import React, { useState } from 'react';
import {
  Compass,
  Sliders,
  Download,
  Code2,
  Trophy,
  Gamepad2,
  BookOpen
} from 'lucide-react';
import { MazeGame } from './components/MazeGame';
import { InteractiveSandbox } from './components/InteractiveSandbox';
import { downloadSingleFileHtml, generateSingleFileHtml } from './components/SingleFileExport';
import { sounds } from './sound';

export default function App() {
  const [activeTab, setActiveTab] = useState<'maze' | 'sandbox'>('maze');
  const [showCodeModal, setShowCodeModal] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const handleCopyCode = () => {
    const code = generateSingleFileHtml();
    navigator.clipboard.writeText(code).then(() => {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* 1. Top Bar */}
      <header className="bg-slate-950 border-b border-slate-800 sticky top-0 z-40 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 shadow-md">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-md">
            🧭
          </div>
          <div>
            <span className="text-lg font-black text-white tracking-tight whitespace-nowrap">
              Geo<span className="text-indigo-400">Macera</span>
            </span>
            <span className="hidden sm:inline-block text-xs font-semibold text-slate-400 ml-2">
              · Sevimli Kaşifin Geometri Labirenti
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Mode Switch */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-800/80 rounded-xl border border-slate-700">
          <button
            onClick={() => {
              setActiveTab('maze');
              sounds.playClick();
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'maze'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>Labirent Macerası</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('sandbox');
              sounds.playClick();
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'sandbox'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Serbest Atölye</span>
          </button>
        </div>

        {/* Zone 3: Single-File HTML Download & Code Modal */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              downloadSingleFileHtml();
              sounds.playClick();
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 active:scale-95 rounded-xl shadow-md transition-all whitespace-nowrap cursor-pointer"
            title="Tek dosya olarak bilgisayarına indirip internetsiz oyna"
          >
            <Download className="w-3.5 h-3.5" />
            <span>oyun.html İndir</span>
          </button>

          <button
            onClick={() => setShowCodeModal(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer border border-slate-700"
            title="HTML kaynak kodunu görüntüle"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Kodu Gör</span>
          </button>
        </div>
      </header>

      {/* 2. Main Game Viewport */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 flex flex-col items-center">
        {activeTab === 'maze' ? (
          <MazeGame />
        ) : (
          <div className="w-full">
            <InteractiveSandbox />
          </div>
        )}
      </main>

      {/* Standalone HTML Code Modal */}
      {showCodeModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl max-w-3xl w-full max-h-[85vh] p-6 flex flex-col shadow-2xl border border-slate-700 text-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div>
                <h3 className="text-base font-bold text-white">
                  Tek Dosya (oyun.html) Labirent Oyunu Kodu
                </h3>
                <p className="text-xs text-slate-400">
                  Bu kodu bilgisayarınıza "oyun.html" adıyla kaydedip direkt tarayıcıda çalıştırabilirsiniz.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyCode}
                  className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  {copiedCode ? '✓ Kopyalandı!' : 'Kodu Kopyala'}
                </button>
                <button
                  onClick={() => setShowCodeModal(false)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl cursor-pointer"
                >
                  Kapat
                </button>
              </div>
            </div>

            <textarea
              readOnly
              value={generateSingleFileHtml()}
              className="flex-1 w-full bg-slate-950 text-emerald-400 font-mono text-xs p-4 rounded-2xl resize-none outline-none overflow-y-auto border border-slate-800 selection:bg-indigo-600"
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-3.5 px-6 text-center text-xs text-slate-500">
        <p>
          MEB 5. Sınıf Matematik Dersi · Sayfa 45-49: İki Doğrunun Kesişimi, Paralellik, Üç Doğru ve Kesen Doğru Labirenti
        </p>
      </footer>
    </div>
  );
}
