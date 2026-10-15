import React, { useState } from 'react';
import { sounds } from '../sound';

export const InteractiveSandbox: React.FC = () => {
  const [mode, setMode] = useState<'two_lines' | 'transversal' | 'three_lines' | 'real_life'>('two_lines');
  const [angle, setAngle] = useState<number>(55);
  const [showProtractor, setShowProtractor] = useState<boolean>(false);
  const [threeLineState, setThreeLineState] = useState<'point' | 'triangle' | 'parallel'>('triangle');
  const [scissorAngle, setScissorAngle] = useState<number>(45);

  const rad = (angle * Math.PI) / 180;
  const suppAngle = 180 - angle;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Sandbox Sub-Header Navigation */}
      <div className="bg-slate-100/80 border-b border-slate-200 p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 p-1 bg-slate-200/70 rounded-xl">
          <button
            onClick={() => {
              setMode('two_lines');
              sounds.playClick();
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              mode === 'two_lines' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            İki Doğru & Açıölçer
          </button>
          <button
            onClick={() => {
              setMode('transversal');
              sounds.playClick();
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              mode === 'transversal' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Paraleller ve Kesen
          </button>
          <button
            onClick={() => {
              setMode('three_lines');
              sounds.playClick();
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              mode === 'three_lines' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            3 Doğru Durumları
          </button>
          <button
            onClick={() => {
              setMode('real_life');
              sounds.playClick();
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              mode === 'real_life' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Günlük Hayat Modelleri
          </button>
        </div>

        {mode === 'two_lines' && (
          <button
            onClick={() => {
              setShowProtractor(!showProtractor);
              sounds.playClick();
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors flex items-center gap-1.5 ${
              showProtractor
                ? 'bg-amber-100 text-amber-800 border-amber-300'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            <span>{showProtractor ? 'İletkiyi Gizle' : '📐 İletki (Açıölçer) Koy'}</span>
          </button>
        )}
      </div>

      {/* Main Sandbox Interactive Area */}
      <div className="p-4 sm:p-6">
        {mode === 'two_lines' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Interactive SVG Display */}
            <div className="lg:col-span-8 bg-slate-950 rounded-2xl p-4 flex flex-col items-center justify-center relative min-h-[360px] shadow-inner">
              <svg viewBox="0 0 400 320" className="w-full h-full max-w-[420px]">
                {/* Subtle Grid */}
                <defs>
                  <pattern id="sandboxGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="400" height="320" fill="url(#sandboxGrid)" rx="16" />

                {/* Horizontal Baseline d1 */}
                <line x1="30" y1="160" x2="370" y2="160" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" />
                <text x="375" y="165" fill="#38BDF8" fontSize="13" fontWeight="bold">d₁</text>

                {/* Tilted Rotating Line d2 */}
                {(() => {
                  const len = 150;
                  const x2 = 200 + len * Math.cos(rad);
                  const y2 = 160 - len * Math.sin(rad);
                  const x1 = 200 - len * Math.cos(rad);
                  const y1 = 160 + len * Math.sin(rad);
                  return (
                    <g>
                      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
                      <text x={x2 + 8} y={y2} fill="#F59E0B" fontSize="13" fontWeight="bold">d₂</text>

                      {/* Right Angle Symbol or Arcs */}
                      {angle === 90 ? (
                        <g>
                          <rect x="200" y="132" width="28" height="28" fill="none" stroke="#10B981" strokeWidth="2.5" />
                          <circle cx="214" cy="146" r="3" fill="#10B981" />
                        </g>
                      ) : (
                        <g>
                          {/* Acute Arc */}
                          <path
                            d={`M ${200 + 45} 160 A 45 45 0 0 0 ${200 + 45 * Math.cos(rad)} ${160 - 45 * Math.sin(rad)}`}
                            fill="rgba(16, 185, 129, 0.25)"
                            stroke="#10B981"
                            strokeWidth="3"
                          />
                          <text x={200 + 55 * Math.cos(rad / 2)} y={160 - 30 * Math.sin(rad / 2)} fill="#34D399" fontSize="13" fontWeight="bold">
                            {angle}°
                          </text>

                          {/* Obtuse Arc */}
                          <path
                            d={`M ${200 + 40 * Math.cos(rad)} ${160 - 40 * Math.sin(rad)} A 40 40 0 0 0 160 160`}
                            fill="rgba(244, 63, 94, 0.25)"
                            stroke="#F43F5E"
                            strokeWidth="3"
                          />
                          <text x="145" y="140" fill="#FB7185" fontSize="13" fontWeight="bold">
                            {suppAngle}°
                          </text>

                          {/* Opposite Acute Arc */}
                          <path
                            d={`M 155 160 A 45 45 0 0 0 ${200 - 45 * Math.cos(rad)} ${160 + 45 * Math.sin(rad)}`}
                            fill="rgba(16, 185, 129, 0.25)"
                            stroke="#10B981"
                            strokeWidth="3"
                          />
                          <text x={200 - 65 * Math.cos(rad / 2)} y={160 + 45 * Math.sin(rad / 2)} fill="#34D399" fontSize="13" fontWeight="bold">
                            {angle}° (Ters)
                          </text>

                          {/* Opposite Obtuse Arc */}
                          <path
                            d={`M ${200 - 40 * Math.cos(rad)} ${160 + 40 * Math.sin(rad)} A 40 40 0 0 0 240 160`}
                            fill="rgba(244, 63, 94, 0.25)"
                            stroke="#F43F5E"
                            strokeWidth="3"
                          />
                          <text x="215" y="195" fill="#FB7185" fontSize="13" fontWeight="bold">
                            {suppAngle}° (Ters)
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })()}

                {/* Center Pivot O */}
                <circle cx="200" cy="160" r="6" fill="#EF4444" stroke="#FFF" strokeWidth="2" />
                <text x="195" y="185" fill="#EF4444" fontSize="13" fontWeight="bold">O (Kesişim Noktası)</text>

                {/* Virtual Protractor Overlay */}
                {showProtractor && (
                  <g opacity="0.85">
                    {/* Semicircle */}
                    <path
                      d="M 60 160 A 140 140 0 0 1 340 160 Z"
                      fill="rgba(254, 240, 138, 0.15)"
                      stroke="#EAB308"
                      strokeWidth="2"
                    />
                    {/* Protractor degree ticks */}
                    {Array.from({ length: 19 }).map((_, i) => {
                      const deg = i * 10;
                      const rDeg = (deg * Math.PI) / 180;
                      const tickInner = deg % 30 === 0 ? 120 : 130;
                      const xA = 200 + 140 * Math.cos(rDeg);
                      const yA = 160 - 140 * Math.sin(rDeg);
                      const xB = 200 + tickInner * Math.cos(rDeg);
                      const yB = 160 - tickInner * Math.sin(rDeg);
                      return (
                        <g key={deg}>
                          <line x1={xA} y1={yA} x2={xB} y2={yB} stroke="#FDE047" strokeWidth={deg % 30 === 0 ? '2' : '1'} />
                          {deg % 30 === 0 && (
                            <text
                              x={200 + 110 * Math.cos(rDeg)}
                              y={160 - 110 * Math.sin(rDeg) + 4}
                              fill="#FEF08A"
                              fontSize="9"
                              textAnchor="middle"
                              fontWeight="bold"
                            >
                              {deg}°
                            </text>
                          )}
                        </g>
                      );
                    })}
                  </g>
                )}
              </svg>
            </div>

            {/* Sandbox Controls & Live Info */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-bold text-slate-800">Açıyı Ayarla:</label>
                  <span className="text-xl font-bold font-mono text-indigo-600">{angle}°</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="170"
                  value={angle}
                  onChange={(e) => {
                    setAngle(Number(e.target.value));
                  }}
                  className="w-full accent-indigo-600 cursor-pointer"
                />

                <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
                  <span>10° (Dar)</span>
                  <button
                    onClick={() => {
                      setAngle(90);
                      sounds.playCorrect();
                    }}
                    className="text-emerald-700 font-bold hover:underline cursor-pointer"
                  >
                    90° (Tam Dik ⊥)
                  </button>
                  <span>170° (Geniş)</span>
                </div>
              </div>

              {/* Angle Classification Badge Cards */}
              <div className="space-y-2">
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs">
                  <div className="font-bold text-emerald-800 flex items-center justify-between">
                    <span>Oluşan Dar Açı:</span>
                    <span className="font-mono text-sm">{Math.min(angle, suppAngle)}°</span>
                  </div>
                  <p className="text-emerald-700 mt-0.5">
                    Ters açısı da tam olarak {Math.min(angle, suppAngle)}° dir.
                  </p>
                </div>

                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs">
                  <div className="font-bold text-rose-800 flex items-center justify-between">
                    <span>Oluşan Geniş Açı:</span>
                    <span className="font-mono text-sm">{Math.max(angle, suppAngle)}°</span>
                  </div>
                  <p className="text-rose-700 mt-0.5">
                    Bütünler açı kuralı: 180° - {Math.min(angle, suppAngle)}° = {Math.max(angle, suppAngle)}°
                  </p>
                </div>

                <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-xs">
                  <div className="font-bold text-indigo-800">Tümler Açı Hatırlatıcısı:</div>
                  <p className="text-indigo-700 mt-0.5">
                    {angle < 90 ? (
                      <>
                        Bu {angle}° lik açının tümleri: <strong>{90 - angle}°</strong> (Toplamları 90° eder).
                      </>
                    ) : (
                      <>90° ve daha büyük açıların tümleri olmaz (sadece 90°den küçük dar açıların tümleri vardır).</>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {mode === 'transversal' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 bg-slate-950 rounded-2xl p-4 flex flex-col items-center justify-center relative min-h-[360px] shadow-inner">
              <svg viewBox="0 0 400 300" className="w-full h-full max-w-[420px]">
                <rect width="400" height="300" fill="#0A0F1D" rx="16" />

                {/* Parallel Line 1 */}
                <line x1="30" y1="90" x2="370" y2="90" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" />
                <text x="375" y="94" fill="#38BDF8" fontSize="13" fontWeight="bold">d₁</text>

                {/* Parallel Line 2 */}
                <line x1="30" y1="210" x2="370" y2="210" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" />
                <text x="375" y="214" fill="#38BDF8" fontSize="13" fontWeight="bold">d₂</text>

                {/* Parallel marks */}
                <path d="M 80 85 L 85 90 L 80 95 M 88 85 L 93 90 L 88 95" stroke="#FFF" strokeWidth="1.5" fill="none" />
                <path d="M 80 205 L 85 210 L 80 215 M 88 205 L 93 210 L 88 215" stroke="#FFF" strokeWidth="1.5" fill="none" />

                {/* Transversal Line */}
                {(() => {
                  const shift = (120 / Math.tan(rad)) || 60;
                  const tx1 = 200 + shift / 2 + 50 * Math.cos(rad);
                  const ty1 = 90 - 50 * Math.sin(rad);
                  const tx2 = 200 - shift / 2 - 50 * Math.cos(rad);
                  const ty2 = 210 + 50 * Math.sin(rad);

                  const p1x = 200 + shift / 2;
                  const p1y = 90;
                  const p2x = 200 - shift / 2;
                  const p2y = 210;

                  return (
                    <g>
                      <line x1={tx1} y1={ty1} x2={tx2} y2={ty2} stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
                      <text x={tx1 + 5} y={ty1 + 5} fill="#F59E0B" fontSize="13" fontWeight="bold">k (Kesen)</text>

                      {/* Centers */}
                      <circle cx={p1x} cy={p1y} r="5" fill="#EF4444" />
                      <circle cx={p2x} cy={p2y} r="5" fill="#EF4444" />

                      {/* Labeled 8 Angles */}
                      <text x={p1x + 24} y={p1y - 12} fill="#34D399" fontSize="12" fontWeight="bold">∠1 ({angle}°)</text>
                      <text x={p1x - 55} y={p1y - 12} fill="#FB7185" fontSize="12" fontWeight="bold">∠2 ({suppAngle}°)</text>
                      <text x={p1x - 55} y={p1y + 24} fill="#34D399" fontSize="12" fontWeight="bold">∠3 ({angle}°)</text>
                      <text x={p1x + 24} y={p1y + 24} fill="#FB7185" fontSize="12" fontWeight="bold">∠4 ({suppAngle}°)</text>

                      <text x={p2x + 24} y={p2y - 12} fill="#34D399" fontSize="12" fontWeight="bold">∠5 ({angle}°)</text>
                      <text x={p2x - 55} y={p2y - 12} fill="#FB7185" fontSize="12" fontWeight="bold">∠6 ({suppAngle}°)</text>
                      <text x={p2x - 55} y={p2y + 24} fill="#34D399" fontSize="12" fontWeight="bold">∠7 ({angle}°)</text>
                      <text x={p2x + 24} y={p2y + 24} fill="#FB7185" fontSize="12" fontWeight="bold">∠8 ({suppAngle}°)</text>
                    </g>
                  );
                })()}
              </svg>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-bold text-slate-800">Kesen Açısını Çevir:</label>
                  <span className="text-xl font-bold font-mono text-amber-600">{angle}°</span>
                </div>
                <input
                  type="range"
                  min="35"
                  max="145"
                  value={angle}
                  onChange={(e) => setAngle(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs space-y-2">
                <div className="font-bold text-amber-900 text-sm">✨ Sihirli 2 Değer Kuralı:</div>
                <p className="text-amber-800">
                  Şekildeki 8 açının tamamı sadece <strong>2 farklı değere</strong> sahiptir:
                </p>
                <div className="grid grid-cols-2 gap-2 pt-1 font-mono">
                  <div className="bg-white p-2 rounded border border-emerald-300 text-emerald-700 font-bold text-center">
                    Tüm Dar Açılar<br />{angle}°
                  </div>
                  <div className="bg-white p-2 rounded border border-rose-300 text-rose-700 font-bold text-center">
                    Tüm Geniş Açılar<br />{suppAngle}°
                  </div>
                </div>
                <p className="text-amber-900 font-semibold pt-1">
                  Yöndeş Açılar (∠1 = ∠5), Ters Açılar (∠1 = ∠3), İç Ters Açılar (∠3 = ∠5) hep aynı kalır!
                </p>
              </div>
            </div>
          </div>
        )}

        {mode === 'three_lines' && (
          <div className="flex flex-col gap-6">
            <div className="flex justify-center gap-3">
              <button
                onClick={() => {
                  setThreeLineState('triangle');
                  sounds.playClick();
                }}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                  threeLineState === 'triangle'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                1. İkişer İkişer Kesişim (Üçgen)
              </button>
              <button
                onClick={() => {
                  setThreeLineState('point');
                  sounds.playClick();
                }}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                  threeLineState === 'point'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                2. Bir Noktada Kesişim (Noktadaş)
              </button>
              <button
                onClick={() => {
                  setThreeLineState('parallel');
                  sounds.playClick();
                }}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                  threeLineState === 'parallel'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                3. Üçü de Paralel (Kesişmez)
              </button>
            </div>

            <div className="bg-slate-950 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[300px]">
              {threeLineState === 'triangle' && (
                <div className="text-center">
                  <svg viewBox="0 0 340 220" className="w-80 h-52 mx-auto">
                    <polygon points="170,40 70,180 270,180" fill="rgba(99, 102, 241, 0.25)" stroke="#818CF8" strokeWidth="2" />
                    <line x1="20" y1="180" x2="320" y2="180" stroke="#38BDF8" strokeWidth="3" />
                    <line x1="30" y1="220" x2="220" y2="0" stroke="#10B981" strokeWidth="3" />
                    <line x1="310" y1="220" x2="120" y2="0" stroke="#F59E0B" strokeWidth="3" />

                    <circle cx="170" cy="40" r="6" fill="#EF4444" />
                    <text x="170" y="28" textAnchor="middle" fill="#EF4444" fontSize="12" fontWeight="bold">1. Köşe</text>

                    <circle cx="70" cy="180" r="6" fill="#EF4444" />
                    <text x="50" y="200" fill="#EF4444" fontSize="12" fontWeight="bold">2. Köşe</text>

                    <circle cx="270" cy="180" r="6" fill="#EF4444" />
                    <text x="270" y="200" fill="#EF4444" fontSize="12" fontWeight="bold">3. Köşe</text>

                    <text x="170" y="145" textAnchor="middle" fill="#FFF" fontSize="16" fontWeight="bold">ÜÇGEN</text>
                  </svg>
                  <p className="text-slate-200 text-sm mt-3 font-medium">
                    3 doğru birbirini ikişer ikişer kestiğinde <span className="text-amber-400 font-bold">3 kesişim noktası</span> oluşur ve bir üçgen meydana gelir.
                  </p>
                </div>
              )}

              {threeLineState === 'point' && (
                <div className="text-center">
                  <svg viewBox="0 0 340 220" className="w-80 h-52 mx-auto">
                    <line x1="30" y1="110" x2="310" y2="110" stroke="#38BDF8" strokeWidth="4" />
                    <line x1="60" y1="190" x2="280" y2="30" stroke="#10B981" strokeWidth="4" />
                    <line x1="60" y1="30" x2="280" y2="190" stroke="#F59E0B" strokeWidth="4" />
                    <circle cx="170" cy="110" r="8" fill="#EF4444" stroke="#FFF" strokeWidth="2" />
                    <text x="170" y="90" textAnchor="middle" fill="#EF4444" fontSize="14" fontWeight="bold">M (Tek Ortak Nokta)</text>
                  </svg>
                  <p className="text-slate-200 text-sm mt-3 font-medium">
                    Tüm doğrular tek bir noktadan geçerse <span className="text-rose-400 font-bold">Noktadaş Doğrular</span> denir. Kesişim noktası sayısı: <strong className="text-white">1</strong>.
                  </p>
                </div>
              )}

              {threeLineState === 'parallel' && (
                <div className="text-center">
                  <svg viewBox="0 0 340 220" className="w-80 h-52 mx-auto">
                    <line x1="30" y1="60" x2="310" y2="60" stroke="#38BDF8" strokeWidth="4" />
                    <text x="315" y="65" fill="#38BDF8" fontSize="12" fontWeight="bold">d₁</text>
                    <line x1="30" y1="110" x2="310" y2="110" stroke="#10B981" strokeWidth="4" />
                    <text x="315" y="115" fill="#10B981" fontSize="12" fontWeight="bold">d₂</text>
                    <line x1="30" y1="160" x2="310" y2="160" stroke="#F59E0B" strokeWidth="4" />
                    <text x="315" y="165" fill="#F59E0B" fontSize="12" fontWeight="bold">d₃</text>
                  </svg>
                  <p className="text-slate-200 text-sm mt-3 font-medium">
                    <span className="text-sky-400 font-bold">d₁ // d₂ // d₃</span>: Üçü de paraleldir. Kesişim noktası sayısı: <strong className="text-white">0</strong> dır.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {mode === 'real_life' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Scissors Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-base mb-1">✂️ Terzi Makası ve Ters Açılar</h4>
                  <p className="text-xs text-slate-600 mb-4">
                    Makasın kollarını açtığında, bıçaklar ile sapların açısının nasıl her zaman birbirine eşit kaldığını gör!
                  </p>
                  <div className="bg-slate-900 rounded-xl p-3 flex flex-col items-center">
                    <svg viewBox="0 0 240 180" className="w-56 h-40">
                      {(() => {
                        const sRad = (scissorAngle * Math.PI) / 360;
                        const r = 80;
                        const bx1 = 120 + r * Math.sin(sRad);
                        const by1 = 90 - r * Math.cos(sRad);
                        const bx2 = 120 - r * Math.sin(sRad);
                        const by2 = 90 - r * Math.cos(sRad);
                        const hx1 = 120 - 50 * Math.sin(sRad);
                        const hy1 = 90 + 50 * Math.cos(sRad);
                        const hx2 = 120 + 50 * Math.sin(sRad);
                        const hy2 = 90 + 50 * Math.cos(sRad);
                        return (
                          <g>
                            <line x1={hx1} y1={hy1} x2={bx1} y2={by1} stroke="#CBD5E1" strokeWidth="8" strokeLinecap="round" />
                            <line x1={hx2} y1={hy2} x2={bx2} y2={by2} stroke="#94A3B8" strokeWidth="8" strokeLinecap="round" />
                            <circle cx={hx1 - 8} cy={hy1 + 8} r="14" fill="none" stroke="#0284C7" strokeWidth="6" />
                            <circle cx={hx2 + 8} cy={hy2 + 8} r="14" fill="none" stroke="#E11D48" strokeWidth="6" />
                            <circle cx="120" cy="90" r="5" fill="#F59E0B" />
                            <text x="120" y="55" textAnchor="middle" fill="#38BDF8" fontSize="12" fontWeight="bold">
                              {scissorAngle}° (Ağız Açısı)
                            </text>
                            <text x="120" y="130" textAnchor="middle" fill="#FB7185" fontSize="12" fontWeight="bold">
                              {scissorAngle}° (Sap Açısı)
                            </text>
                          </g>
                        );
                      })()}
                    </svg>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200">
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                    <span>Makası Aç / Kapat:</span>
                    <span className="font-mono text-indigo-600">{scissorAngle}°</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="90"
                    value={scissorAngle}
                    onChange={(e) => setScissorAngle(Number(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                </div>
              </div>

              {/* Railway Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-base mb-1">🚆 Tren Rayları ve Sabit Mesafe</h4>
                  <p className="text-xs text-slate-600 mb-4">
                    Raylar birbirine paraleldir. Mesafe hep sabittir (143.5 cm standart hat). Kesişmezler ve açı oluşturmazlar!
                  </p>
                  <div className="bg-slate-900 rounded-xl p-3 flex flex-col items-center">
                    <svg viewBox="0 0 240 180" className="w-56 h-40">
                      <rect x="20" y="30" width="200" height="120" rx="8" fill="#1E293B" />
                      {[40, 75, 110, 145, 180].map((x) => (
                        <rect key={x} x={x} y="40" width="14" height="100" fill="#78350F" stroke="#451A03" strokeWidth="1" rx="2" />
                      ))}
                      <line x1="15" y1="65" x2="225" y2="65" stroke="#38BDF8" strokeWidth="5" strokeLinecap="round" />
                      <line x1="15" y1="115" x2="225" y2="115" stroke="#38BDF8" strokeWidth="5" strokeLinecap="round" />
                      <line x1="120" y1="65" x2="120" y2="115" stroke="#F59E0B" strokeWidth="2" strokeDasharray="3 3" />
                      <text x="130" y="94" fill="#F59E0B" fontSize="11" fontWeight="bold">d = Sabit</text>
                    </svg>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200">
                  <div className="text-xs text-emerald-800 bg-emerald-100/70 p-2.5 rounded-xl font-medium">
                    Paralellik kuralı: Kesişim = 0, Açı = Yoktur, Aradaki Dik Mesafe = Daima Eşittir!
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
