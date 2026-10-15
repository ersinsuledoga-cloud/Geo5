import React, { useState } from 'react';

interface VisualProps {
  type: string;
  data?: {
    angle1?: number;
    angle2?: number;
    targetAngle?: string;
    isRightAngle?: boolean;
    missingAngleLabel?: string;
  };
  interactive?: boolean;
}

export const GeometryVisual: React.FC<VisualProps> = ({ type, data, interactive = false }) => {
  const [userAngle, setUserAngle] = useState(data?.angle1 ?? 60);
  const [coincidentOffset, setCoincidentOffset] = useState(30);

  const angle = data?.angle1 ?? userAngle;
  const rad = (angle * Math.PI) / 180;
  const suppAngle = 180 - angle;

  if (type === 'scissors') {
    // Scissors model
    const scissorAngle = angle;
    const halfAngle = scissorAngle / 2;
    const r = 110;
    const radHalf = (halfAngle * Math.PI) / 180;
    const x1 = 150 + r * Math.sin(radHalf);
    const y1 = 120 - r * Math.cos(radHalf);
    const x2 = 150 - r * Math.sin(radHalf);
    const y2 = 120 - r * Math.cos(radHalf);

    // Handles
    const hx1 = 150 - 75 * Math.sin(radHalf);
    const hy1 = 120 + 75 * Math.cos(radHalf);
    const hx2 = 150 + 75 * Math.sin(radHalf);
    const hy2 = 120 + 75 * Math.cos(radHalf);

    return (
      <div className="flex flex-col items-center justify-center p-4 bg-slate-900 rounded-xl text-slate-100 shadow-inner">
        <div className="w-full max-w-[340px] aspect-square relative">
          <svg viewBox="0 0 300 240" className="w-full h-full drop-shadow">
            {/* Grid background */}
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="300" height="240" fill="url(#grid)" rx="12" />

            {/* Back Blade */}
            <path
              d={`M ${hx1} ${hy1} L 150 120 L ${x1} ${y1}`}
              stroke="#94A3B8"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Front Blade */}
            <path
              d={`M ${hx2} ${hy2} L 150 120 L ${x2} ${y2}`}
              stroke="#CBD5E1"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Handles circles */}
            <circle cx={hx1 - 12} cy={hy1 + 12} r="18" fill="none" stroke="#38BDF8" strokeWidth="8" />
            <circle cx={hx2 + 12} cy={hy2 + 12} r="18" fill="none" stroke="#F43F5E" strokeWidth="8" />

            {/* Pivot screw */}
            <circle cx="150" cy="120" r="7" fill="#F59E0B" stroke="#78350F" strokeWidth="2" />
            <circle cx="150" cy="120" r="3" fill="#FFF" />

            {/* Top Angle Arc (Dar Açı) */}
            <path
              d={`M ${150 + 40 * Math.sin(radHalf)} ${120 - 40 * Math.cos(radHalf)} A 40 40 0 0 0 ${150 - 40 * Math.sin(radHalf)} ${120 - 40 * Math.cos(radHalf)}`}
              fill="rgba(56, 189, 248, 0.25)"
              stroke="#38BDF8"
              strokeWidth="2.5"
            />
            <text x="150" y="70" textAnchor="middle" fill="#38BDF8" fontSize="13" fontWeight="bold">
              {scissorAngle}° (Açı 1)
            </text>

            {/* Bottom Angle Arc (Ters Açı!) */}
            <path
              d={`M ${150 - 35 * Math.sin(radHalf)} ${120 + 35 * Math.cos(radHalf)} A 35 35 0 0 0 ${150 + 35 * Math.sin(radHalf)} ${120 + 35 * Math.cos(radHalf)}`}
              fill="rgba(244, 63, 94, 0.25)"
              stroke="#F43F5E"
              strokeWidth="2.5"
            />
            <text x="150" y="175" textAnchor="middle" fill="#F43F5E" fontSize="13" fontWeight="bold">
              {data?.targetAngle === 'ters' ? '? (Ters Açı)' : `${scissorAngle}° (Ters Açı)`}
            </text>
          </svg>
        </div>
        <div className="mt-2 text-center text-xs text-slate-300">
          <span className="text-sky-400 font-semibold">Üst Açı</span> ile{' '}
          <span className="text-rose-400 font-semibold">Alt Açı</span> birbirine ters yöne bakar ve{' '}
          <strong className="text-amber-400 font-bold">ÖLÇÜLERİ DAİMA EŞİTTİR!</strong>
        </div>
      </div>
    );
  }

  if (type === 'intersecting_angles') {
    const isRight = data?.isRightAngle || angle === 90;
    const a1 = isRight ? 90 : angle;
    const a2 = 180 - a1;
    const rad1 = (a1 * Math.PI) / 180;

    // Line 1: horizontal
    // Line 2: tilted by angle a1
    const len = 120;
    const cx = 160;
    const cy = 110;

    const lx1 = cx - len;
    const ly1 = cy;
    const lx2 = cx + len;
    const ly2 = cy;

    const kx1 = cx - len * Math.cos(rad1);
    const ky1 = cy + len * Math.sin(rad1);
    const kx2 = cx + len * Math.cos(rad1);
    const ky2 = cy - len * Math.sin(rad1);

    return (
      <div className="flex flex-col items-center justify-center p-4 bg-slate-900 rounded-xl text-slate-100 shadow-inner">
        <div className="w-full max-w-[340px] aspect-[4/3] relative">
          <svg viewBox="0 0 320 220" className="w-full h-full drop-shadow">
            {/* Grid lines */}
            <line x1="20" y1="110" x2="300" y2="110" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
            <line x1="160" y1="20" x2="160" y2="200" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />

            {/* Line 1 (Horizontal) */}
            <line x1={lx1} y1={ly1} x2={lx2} y2={ly2} stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" />
            <polygon points={`${lx2 + 8},${ly2} ${lx2 - 4},${ly2 - 5} ${lx2 - 4},${ly2 + 5}`} fill="#38BDF8" />
            <polygon points={`${lx1 - 8},${ly1} ${lx1 + 4},${ly1 - 5} ${lx1 + 4},${ly1 + 5}`} fill="#38BDF8" />
            <text x={lx2 + 10} y={ly2 + 15} fill="#38BDF8" fontSize="13" fontWeight="bold">d₁</text>

            {/* Line 2 (Tilted) */}
            <line x1={kx1} y1={ky1} x2={kx2} y2={ky2} stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
            <polygon points={`${kx2 + 6 * Math.cos(rad1)},${ky2 - 6 * Math.sin(rad1)} ${kx2 - 5},${ky2 - 2} ${kx2 + 2},${ky2 + 5}`} fill="#F59E0B" />
            <polygon points={`${kx1 - 6 * Math.cos(rad1)},${ky1 + 6 * Math.sin(rad1)} ${kx1 + 5},${ky1 + 2} ${kx1 - 2},${ky1 - 5}`} fill="#F59E0B" />
            <text x={kx2 + 10} y={ky2 - 5} fill="#F59E0B" fontSize="13" fontWeight="bold">d₂</text>

            {/* Intersection Point O */}
            <circle cx={cx} cy={cy} r="5" fill="#EF4444" />
            <text x={cx - 15} y={cy + 18} fill="#EF4444" fontSize="12" fontWeight="bold">O</text>

            {/* Right Angle Symbol or Arcs */}
            {isRight ? (
              <g>
                <rect x={cx} y={cy - 24} width="24" height="24" fill="none" stroke="#10B981" strokeWidth="2.5" />
                <circle cx={cx + 12} cy={cy - 12} r="2.5" fill="#10B981" />
                <text x={cx + 30} y={cy - 28} fill="#10B981" fontSize="13" fontWeight="bold">90° (Dik Açı)</text>
              </g>
            ) : (
              <g>
                {/* Acute Angle Arc (Right-Top) */}
                <path
                  d={`M ${cx + 35} ${cy} A 35 35 0 0 0 ${cx + 35 * Math.cos(rad1)} ${cy - 35 * Math.sin(rad1)}`}
                  fill="rgba(16, 185, 129, 0.2)"
                  stroke="#10B981"
                  strokeWidth="2.5"
                />
                <text x={cx + 42} y={cy - 15} fill="#10B981" fontSize="12" fontWeight="bold">
                  {a1}°
                </text>

                {/* Obtuse Angle Arc (Left-Top) */}
                <path
                  d={`M ${cx + 30 * Math.cos(rad1)} ${cy - 30 * Math.sin(rad1)} A 30 30 0 0 0 ${cx - 30} ${cy}`}
                  fill="rgba(244, 63, 94, 0.2)"
                  stroke="#F43F5E"
                  strokeWidth="2.5"
                />
                <text x={cx - 50} y={cy - 15} fill="#F43F5E" fontSize="12" fontWeight="bold">
                  {data?.missingAngleLabel || `${a2}°`}
                </text>

                {/* Opposite Angle (Left-Bottom) */}
                <path
                  d={`M ${cx - 35} ${cy} A 35 35 0 0 0 ${cx - 35 * Math.cos(rad1)} ${cy + 35 * Math.sin(rad1)}`}
                  fill="rgba(16, 185, 129, 0.2)"
                  stroke="#10B981"
                  strokeWidth="2.5"
                />
                <text x={cx - 60} y={cy + 25} fill="#10B981" fontSize="12" fontWeight="bold">
                  {a1}° (Ters)
                </text>

                {/* Opposite Obtuse (Right-Bottom) */}
                <path
                  d={`M ${cx - 30 * Math.cos(rad1)} ${cy + 30 * Math.sin(rad1)} A 30 30 0 0 0 ${cx + 30} ${cy}`}
                  fill="rgba(244, 63, 94, 0.2)"
                  stroke="#F43F5E"
                  strokeWidth="2.5"
                />
                <text x={cx + 35} y={cy + 25} fill="#F43F5E" fontSize="12" fontWeight="bold">
                  {a2}° (Ters)
                </text>
              </g>
            )}
          </svg>
        </div>

        {interactive && (
          <div className="w-full mt-3 px-4 flex flex-col gap-1">
            <div className="flex justify-between text-xs text-slate-300">
              <span>Açıyı Değiştir:</span>
              <span className="font-mono text-amber-400 font-bold">{userAngle}°</span>
            </div>
            <input
              type="range"
              min="20"
              max="90"
              value={userAngle}
              onChange={(e) => setUserAngle(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>
        )}

        <div className="mt-2 text-center text-xs text-slate-300">
          <span className="text-emerald-400 font-medium">Dar Açı: {a1}°</span> +{' '}
          <span className="text-rose-400 font-medium">Geniş Açı: {a2}°</span> ={' '}
          <strong className="text-white">180° (Doğru Açı / Bütünler)</strong>
        </div>
      </div>
    );
  }

  if (type === 'train_tracks') {
    return (
      <div className="flex flex-col items-center justify-center p-4 bg-slate-900 rounded-xl text-slate-100 shadow-inner">
        <div className="w-full max-w-[340px] aspect-[4/3] relative">
          <svg viewBox="0 0 320 200" className="w-full h-full drop-shadow">
            {/* Gravel bed */}
            <rect x="20" y="45" width="280" height="110" rx="8" fill="#1E293B" />

            {/* Wooden cross ties (Traversler) */}
            {[45, 80, 115, 150, 185, 220, 255].map((x) => (
              <g key={x}>
                <rect x={x} y="55" width="16" height="90" rx="2" fill="#78350F" stroke="#451A03" strokeWidth="1" />
                {/* Fasteners */}
                <circle cx={x + 8} cy="75" r="2.5" fill="#CBD5E1" />
                <circle cx={x + 8} cy="125" r="2.5" fill="#CBD5E1" />
              </g>
            ))}

            {/* Steel Rail 1 */}
            <line x1="15" y1="75" x2="305" y2="75" stroke="#38BDF8" strokeWidth="6" strokeLinecap="round" />
            <polygon points="310,75 298,71 298,79" fill="#38BDF8" />
            <text x="270" y="68" fill="#38BDF8" fontSize="13" fontWeight="bold">d₁</text>

            {/* Steel Rail 2 */}
            <line x1="15" y1="125" x2="305" y2="125" stroke="#38BDF8" strokeWidth="6" strokeLinecap="round" />
            <polygon points="310,125 298,121 298,129" fill="#38BDF8" />
            <text x="270" y="142" fill="#38BDF8" fontSize="13" fontWeight="bold">d₂</text>

            {/* Parallel Symbols (// arrows) */}
            <path d="M 120 70 L 126 75 L 120 80 M 128 70 L 134 75 L 128 80" stroke="#FFF" strokeWidth="2" fill="none" />
            <path d="M 120 120 L 126 125 L 120 130 M 128 120 L 134 125 L 128 130" stroke="#FFF" strokeWidth="2" fill="none" />

            {/* Fixed distance dimension line */}
            <line x1="190" y1="75" x2="190" y2="125" stroke="#F59E0B" strokeWidth="2" strokeDasharray="3 3" />
            <polygon points="190,75 187,83 193,83" fill="#F59E0B" />
            <polygon points="190,125 187,117 193,117" fill="#F59E0B" />
            <rect x="195" y="93" width="60" height="18" rx="4" fill="#0F172A" />
            <text x="200" y="106" fill="#F59E0B" fontSize="11" fontWeight="bold">Mesafe: 4 cm</text>
          </svg>
        </div>
        <div className="mt-2 text-center text-xs text-slate-300">
          <span className="font-semibold text-sky-400">d₁ // d₂ (Paralel Doğrular)</span>
          <p className="text-slate-400 mt-0.5">Hiçbir noktada kesişmezler. Ortak nokta sayısı: <strong>0</strong>. Açı: <strong>Yoktur!</strong></p>
        </div>
      </div>
    );
  }

  if (type === 'coincident_lines') {
    const isMerged = coincidentOffset === 0;

    return (
      <div className="flex flex-col items-center justify-center p-4 bg-slate-900 rounded-xl text-slate-100 shadow-inner">
        <div className="w-full max-w-[340px] aspect-[4/3] relative">
          <svg viewBox="0 0 320 200" className="w-full h-full drop-shadow">
            <rect width="320" height="200" fill="#0F172A" rx="8" />

            {/* Line 1 (Blue) */}
            <line x1="30" y1="100" x2="290" y2="100" stroke="#38BDF8" strokeWidth="5" strokeLinecap="round" opacity={isMerged ? 0.4 : 0.9} />
            <text x="35" y="92" fill="#38BDF8" fontSize="12" fontWeight="bold">d₁ Doğrusu</text>

            {/* Line 2 (Orange -> Merges into line 1) */}
            <line
              x1="30"
              y1={100 - coincidentOffset}
              x2="290"
              y2={100 - coincidentOffset}
              stroke={isMerged ? '#A855F7' : '#F97316'}
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={isMerged ? 'none' : '6 4'}
            />
            <text x="220" y={100 - coincidentOffset - 8} fill={isMerged ? '#A855F7' : '#F97316'} fontSize="12" fontWeight="bold">
              {isMerged ? 'Çakışık (d₁ = d₂)' : 'd₂ Doğrusu'}
            </text>

            {/* Dot markers along the line when merged */}
            {isMerged && (
              <g>
                <circle cx="80" cy="100" r="4" fill="#FACC15" />
                <circle cx="160" cy="100" r="4" fill="#FACC15" />
                <circle cx="240" cy="100" r="4" fill="#FACC15" />
                <text x="160" y="130" textAnchor="middle" fill="#FACC15" fontSize="12" fontWeight="bold">
                  Tüm Noktalar Ortak! (Sonsuz Nokta)
                </text>
              </g>
            )}
          </svg>
        </div>

        <div className="w-full mt-3 px-4 flex flex-col gap-1">
          <div className="flex justify-between text-xs text-slate-300">
            <span>Doğruları Üst Üste Getir:</span>
            <span className={isMerged ? 'text-purple-400 font-bold' : 'text-slate-400'}>
              {isMerged ? 'ÇAKIŞIK OLDU!' : `${coincidentOffset} px ayrık`}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="40"
            value={coincidentOffset}
            onChange={(e) => setCoincidentOffset(Number(e.target.value))}
            className="w-full accent-purple-500 cursor-pointer"
          />
        </div>

        <div className="mt-2 text-center text-xs text-slate-300">
          {isMerged ? (
            <span className="text-purple-300 font-semibold">Tüm noktaları ortak olan doğrular çakışıktır ve açı oluşturmazlar.</span>
          ) : (
            <span className="text-slate-400">Kaydırıcıyı sola çekerek doğruları tam üst üste çakıştır!</span>
          )}
        </div>
      </div>
    );
  }

  if (type === 'three_lines_point') {
    // 3 lines through single point
    return (
      <div className="flex flex-col items-center justify-center p-4 bg-slate-900 rounded-xl text-slate-100 shadow-inner">
        <div className="w-full max-w-[340px] aspect-[4/3] relative">
          <svg viewBox="0 0 320 200" className="w-full h-full drop-shadow">
            <rect width="320" height="200" fill="#0F172A" rx="8" />

            {/* Line 1 (Horizontal) */}
            <line x1="30" y1="100" x2="290" y2="100" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
            <text x="295" y="104" fill="#38BDF8" fontSize="11" fontWeight="bold">d₁</text>

            {/* Line 2 (Tilted 45) */}
            <line x1="60" y1="170" x2="260" y2="30" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
            <text x="265" y="35" fill="#10B981" fontSize="11" fontWeight="bold">d₂</text>

            {/* Line 3 (Tilted -45) */}
            <line x1="60" y1="30" x2="260" y2="170" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
            <text x="265" y="175" fill="#F59E0B" fontSize="11" fontWeight="bold">d₃</text>

            {/* Center Intersection Point P */}
            <circle cx="160" cy="100" r="7" fill="#EF4444" stroke="#FFF" strokeWidth="2" />
            <text x="160" y="85" textAnchor="middle" fill="#EF4444" fontSize="13" fontWeight="bold">P (Tek Ortak Nokta)</text>
          </svg>
        </div>
        <div className="mt-2 text-center text-xs text-slate-300">
          <strong className="text-rose-400">Noktadaş Doğrular:</strong> Üç doğru tek bir P noktasında kesişir. Kesişim noktası sayısı: <strong className="text-white">1</strong>.
        </div>
      </div>
    );
  }

  if (type === 'three_lines_triangle') {
    // 3 lines intersecting pairwise to form a triangle
    return (
      <div className="flex flex-col items-center justify-center p-4 bg-slate-900 rounded-xl text-slate-100 shadow-inner">
        <div className="w-full max-w-[340px] aspect-[4/3] relative">
          <svg viewBox="0 0 320 220" className="w-full h-full drop-shadow">
            <rect width="320" height="220" fill="#0F172A" rx="8" />

            {/* Triangle fill */}
            <polygon points="160,50 80,160 240,160" fill="rgba(56, 189, 248, 0.2)" stroke="none" />

            {/* Line d1 (Bottom horizontal) */}
            <line x1="30" y1="160" x2="290" y2="160" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
            <text x="295" y="164" fill="#38BDF8" fontSize="11" fontWeight="bold">d₁</text>

            {/* Line d2 (Left slanted) */}
            <line x1="40" y1="210" x2="200" y2="0" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
            <text x="205" y="20" fill="#10B981" fontSize="11" fontWeight="bold">d₂</text>

            {/* Line d3 (Right slanted) */}
            <line x1="280" y1="210" x2="120" y2="0" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
            <text x="105" y="20" fill="#F59E0B" fontSize="11" fontWeight="bold">d₃</text>

            {/* Vertices A, B, C */}
            <circle cx="160" cy="50" r="6" fill="#EF4444" stroke="#FFF" strokeWidth="2" />
            <text x="160" y="38" textAnchor="middle" fill="#EF4444" fontSize="12" fontWeight="bold">A (1. Nokta)</text>

            <circle cx="80" cy="160" r="6" fill="#EF4444" stroke="#FFF" strokeWidth="2" />
            <text x="55" y="180" fill="#EF4444" fontSize="12" fontWeight="bold">B (2. Nokta)</text>

            <circle cx="240" cy="160" r="6" fill="#EF4444" stroke="#FFF" strokeWidth="2" />
            <text x="245" y="180" fill="#EF4444" fontSize="12" fontWeight="bold">C (3. Nokta)</text>

            {/* Center label */}
            <text x="160" y="130" textAnchor="middle" fill="#38BDF8" fontSize="14" fontWeight="bold">
              ÜÇGEN
            </text>
          </svg>
        </div>
        <div className="mt-2 text-center text-xs text-slate-300">
          <strong className="text-amber-400">İkişer İkişer Kesişim:</strong> 3 kesişim noktası oluşur ve ortada bir <strong className="text-sky-300">ÜÇGEN</strong> meydana gelir!
        </div>
      </div>
    );
  }

  if (type === 'three_lines_parallel') {
    return (
      <div className="flex flex-col items-center justify-center p-4 bg-slate-900 rounded-xl text-slate-100 shadow-inner">
        <div className="w-full max-w-[340px] aspect-[4/3] relative">
          <svg viewBox="0 0 320 200" className="w-full h-full drop-shadow">
            <rect width="320" height="200" fill="#0F172A" rx="8" />

            <line x1="30" y1="50" x2="290" y2="50" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" />
            <text x="295" y="54" fill="#38BDF8" fontSize="11" fontWeight="bold">d₁</text>

            <line x1="30" y1="100" x2="290" y2="100" stroke="#10B981" strokeWidth="4" strokeLinecap="round" />
            <text x="295" y="104" fill="#10B981" fontSize="11" fontWeight="bold">d₂</text>

            <line x1="30" y1="150" x2="290" y2="150" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
            <text x="295" y="154" fill="#F59E0B" fontSize="11" fontWeight="bold">d₃</text>
          </svg>
        </div>
        <div className="mt-2 text-center text-xs text-slate-300">
          <strong>d₁ // d₂ // d₃</strong> (Üçü de paraleldir, hiç kesişim noktası yoktur: <strong>0</strong>).
        </div>
      </div>
    );
  }

  // Default: Two Parallel Lines Cut by a Transversal (Paralel Kesen)
  const aDar = angle;
  const aGenis = suppAngle;
  const tRad = (60 * Math.PI) / 180; // 60 deg tilt for transversal

  // Upper intersection center
  const cx1 = 175;
  const cy1 = 65;
  // Lower intersection center
  const cx2 = 135;
  const cy2 = 155;

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-slate-900 rounded-xl text-slate-100 shadow-inner">
      <div className="w-full max-w-[340px] aspect-[4/3] relative">
        <svg viewBox="0 0 320 220" className="w-full h-full drop-shadow">
          <rect width="320" height="220" fill="#0F172A" rx="8" />

          {/* Parallel Line 1 */}
          <line x1="25" y1={cy1} x2="295" y2={cy1} stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" />
          <text x="300" y={cy1 + 4} fill="#38BDF8" fontSize="12" fontWeight="bold">d₁</text>
          {/* Parallel symbols */}
          <path d={`M 70 ${cy1 - 5} L 75 ${cy1} L 70 ${cy1 + 5} M 77 ${cy1 - 5} L 82 ${cy1} L 77 ${cy1 + 5}`} stroke="#FFF" strokeWidth="1.5" fill="none" />

          {/* Parallel Line 2 */}
          <line x1="25" y1={cy2} x2="295" y2={cy2} stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" />
          <text x="300" y={cy2 + 4} fill="#38BDF8" fontSize="12" fontWeight="bold">d₂</text>
          <path d={`M 70 ${cy2 - 5} L 75 ${cy2} L 70 ${cy2 + 5} M 77 ${cy2 - 5} L 82 ${cy2} L 77 ${cy2 + 5}`} stroke="#FFF" strokeWidth="1.5" fill="none" />

          {/* Transversal Line (k) */}
          <line x1="195" y1="20" x2="115" y2="200" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
          <text x="200" y="30" fill="#F59E0B" fontSize="12" fontWeight="bold">k (Kesen)</text>

          {/* Intersection Points */}
          <circle cx={cx1} cy={cy1} r="4" fill="#EF4444" />
          <circle cx={cx2} cy={cy2} r="4" fill="#EF4444" />

          {/* Upper Angles */}
          {/* Angle 1 (Right-Top: Acute) */}
          <circle cx={cx1 + 22} cy={cy1 - 14} r="12" fill="rgba(16, 185, 129, 0.3)" />
          <text x={cx1 + 22} y={cy1 - 10} textAnchor="middle" fill="#34D399" fontSize="11" fontWeight="bold">{aDar}°</text>

          {/* Angle 2 (Left-Top: Obtuse) */}
          <circle cx={cx1 - 22} cy={cy1 - 14} r="12" fill="rgba(244, 63, 94, 0.3)" />
          <text x={cx1 - 22} y={cy1 - 10} textAnchor="middle" fill="#FB7185" fontSize="11" fontWeight="bold">{aGenis}°</text>

          {/* Angle 3 (Left-Bottom: Acute, Opposite to Angle 1) */}
          <circle cx={cx1 - 22} cy={cy1 + 16} r="12" fill="rgba(16, 185, 129, 0.3)" />
          <text x={cx1 - 22} y={cy1 + 20} textAnchor="middle" fill="#34D399" fontSize="11" fontWeight="bold">{aDar}°</text>

          {/* Angle 4 (Right-Bottom: Obtuse, Opposite to Angle 2) */}
          <circle cx={cx1 + 22} cy={cy1 + 16} r="12" fill="rgba(244, 63, 94, 0.3)" />
          <text x={cx1 + 22} y={cy1 + 20} textAnchor="middle" fill="#FB7185" fontSize="11" fontWeight="bold">{aGenis}°</text>

          {/* Lower Angles */}
          {/* Angle 5 (Right-Top: Acute - Yöndeş with Angle 1!) */}
          <circle cx={cx2 + 22} cy={cy2 - 14} r="12" fill="rgba(16, 185, 129, 0.3)" />
          <text x={cx2 + 22} y={cy2 - 10} textAnchor="middle" fill="#34D399" fontSize="11" fontWeight="bold">
            {data?.targetAngle === 'yondes' ? '? (Yöndeş)' : `${aDar}°`}
          </text>

          {/* Angle 6 (Left-Top: Obtuse) */}
          <circle cx={cx2 - 22} cy={cy2 - 14} r="12" fill="rgba(244, 63, 94, 0.3)" />
          <text x={cx2 - 22} y={cy2 - 10} textAnchor="middle" fill="#FB7185" fontSize="11" fontWeight="bold">
            {data?.missingAngleLabel || `${aGenis}°`}
          </text>

          {/* Angle 7 (Left-Bottom: Acute) */}
          <circle cx={cx2 - 22} cy={cy2 + 16} r="12" fill="rgba(16, 185, 129, 0.3)" />
          <text x={cx2 - 22} y={cy2 + 20} textAnchor="middle" fill="#34D399" fontSize="11" fontWeight="bold">{aDar}°</text>

          {/* Angle 8 (Right-Bottom: Obtuse) */}
          <circle cx={cx2 + 22} cy={cy2 + 16} r="12" fill="rgba(244, 63, 94, 0.3)" />
          <text x={cx2 + 22} y={cy2 + 20} textAnchor="middle" fill="#FB7185" fontSize="11" fontWeight="bold">{aGenis}°</text>
        </svg>
      </div>

      <div className="mt-2 flex items-center justify-center gap-4 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
          <span className="text-emerald-400 font-semibold">4 Dar Açı: {aDar}° (Eşit)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>
          <span className="text-rose-400 font-semibold">4 Geniş Açı: {aGenis}° (Eşit)</span>
        </div>
      </div>
    </div>
  );
};
