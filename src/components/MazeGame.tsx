import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MAZE_LEVELS, MazeLevel, MazeGatePuzzle } from '../data/mazeData';
import { sounds } from '../sound';
import { GeometryVisual } from './GeometryVisuals';
import {
  Trophy,
  Flame,
  Volume2,
  VolumeX,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Lock,
  Unlock,
  CheckCircle2,
  XCircle,
  HelpCircle
} from 'lucide-react';

interface MazeGameProps {
  onWinGame?: (score: number) => void;
}

export const MazeGame: React.FC<MazeGameProps> = () => {
  const [levelIndex, setLevelIndex] = useState<number>(0);
  const currentLevel = MAZE_LEVELS[levelIndex] || MAZE_LEVELS[0];

  // Grid state (copied from currentLevel so gates/crystals can be cleared)
  const [grid, setGrid] = useState<number[][]>(() =>
    currentLevel.grid.map((row) => [...row])
  );

  // Player state
  const [playerPos, setPlayerPos] = useState<{ x: number; y: number }>(
    currentLevel.startPos
  );
  const [playerDir, setPlayerDir] = useState<'down' | 'up' | 'left' | 'right'>('down');
  const [stepAnim, setStepAnim] = useState<number>(0);

  // Score & Stats
  const [score, setScore] = useState<number>(0);
  const [crystalsCollected, setCrystalsCollected] = useState<number>(0);
  const [gatesUnlocked, setGatesUnlocked] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Active Gate Puzzle Modal
  const [activeGate, setActiveGate] = useState<{
    gate: MazeGatePuzzle;
    gx: number;
    gy: number;
  } | null>(null);
  const [selectedOptId, setSelectedOptId] = useState<string | null>(null);
  const [gateFeedback, setGateFeedback] = useState<{
    isCorrect: boolean;
    text: string;
  } | null>(null);

  // Level Complete Modal
  const [showLevelFinish, setShowLevelFinish] = useState<boolean>(false);
  const [allLevelsComplete, setAllLevelsComplete] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const confettiCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Reset grid and player when level changes
  useEffect(() => {
    setGrid(currentLevel.grid.map((row) => [...row]));
    setPlayerPos({ ...currentLevel.startPos });
    setPlayerDir('down');
    setShowLevelFinish(false);
  }, [levelIndex, currentLevel]);

  // Confetti generator
  const triggerConfetti = useCallback(() => {
    const canvas = confettiCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
    }> = [];

    const colors = ['#6366F1', '#38BDF8', '#10B981', '#F59E0B', '#EC4899', '#A855F7'];

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 250,
        y: canvas.height * 0.4,
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 0.8) * 16,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
      });
    }

    let frame = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let active = false;
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.3;
        p.alpha -= 0.018;
        if (p.alpha > 0) {
          active = true;
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.fillRect(p.x, p.y, p.size, p.size);
        }
      });
      frame++;
      if (active && frame < 90) {
        requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
    animate();
  }, []);

  // Movement Logic
  const movePlayer = useCallback(
    (dx: number, dy: number, dir: 'down' | 'up' | 'left' | 'right') => {
      if (activeGate || showLevelFinish || allLevelsComplete) return;

      setPlayerDir(dir);
      setStepAnim((prev) => (prev + 1) % 4);

      const targetX = playerPos.x + dx;
      const targetY = playerPos.y + dy;

      // Bounds check
      if (
        targetX < 0 ||
        targetX >= currentLevel.width ||
        targetY < 0 ||
        targetY >= currentLevel.height
      ) {
        return;
      }

      const cell = grid[targetY][targetX];

      // Wall (1) -> block
      if (cell === 1) {
        return;
      }

      // Gate (3) -> trigger puzzle
      if (cell === 3) {
        const key = `${targetX},${targetY}`;
        const gateData = currentLevel.gates[key];
        if (gateData) {
          sounds.playWrong();
          setActiveGate({ gate: gateData, gx: targetX, gy: targetY });
          setSelectedOptId(null);
          setGateFeedback(null);
        }
        return;
      }

      // Step sound
      sounds.playStep();

      // Collect crystal (2)
      if (cell === 2) {
        sounds.playCrystal();
        triggerConfetti();
        setCrystalsCollected((prev) => prev + 1);
        setScore((prev) => prev + 50);

        setGrid((prev) => {
          const next = prev.map((row) => [...row]);
          next[targetY][targetX] = 0;
          return next;
        });
      }

      // Exit (4) -> Level Finish
      if (cell === 4) {
        sounds.playFanfare();
        triggerConfetti();
        setScore((prev) => prev + 300);
        setShowLevelFinish(true);
      }

      // Move player
      setPlayerPos({ x: targetX, y: targetY });
    },
    [
      playerPos,
      grid,
      currentLevel,
      activeGate,
      showLevelFinish,
      allLevelsComplete,
      triggerConfetti,
    ]
  );

  // Container ref for focus management
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activePressedKey, setActivePressedKey] = useState<string | null>(null);

  // Auto-focus container on mount and level change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.focus();
    }
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, [levelIndex]);

  // Robust Keyboard Navigation with Arrow Keys & WASD
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check both key and code for cross-browser & OS reliability
      const isUp = e.key === 'ArrowUp' || e.key === 'Up' || e.code === 'ArrowUp' || e.key === 'w' || e.key === 'W' || e.code === 'KeyW';
      const isDown = e.key === 'ArrowDown' || e.key === 'Down' || e.code === 'ArrowDown' || e.key === 's' || e.key === 'S' || e.code === 'KeyS';
      const isLeft = e.key === 'ArrowLeft' || e.key === 'Left' || e.code === 'ArrowLeft' || e.key === 'a' || e.key === 'A' || e.code === 'KeyA';
      const isRight = e.key === 'ArrowRight' || e.key === 'Right' || e.code === 'ArrowRight' || e.key === 'd' || e.key === 'D' || e.code === 'KeyD';

      if (isUp || isDown || isLeft || isRight) {
        if (e.cancelable) e.preventDefault(); // Stop page scrolling
      }

      if (isUp) {
        setActivePressedKey('up');
        movePlayer(0, -1, 'up');
      } else if (isDown) {
        setActivePressedKey('down');
        movePlayer(0, 1, 'down');
      } else if (isLeft) {
        setActivePressedKey('left');
        movePlayer(-1, 0, 'left');
      } else if (isRight) {
        setActivePressedKey('right');
        movePlayer(1, 0, 'right');
      }
    };

    const handleKeyUp = () => {
      setActivePressedKey(null);
    };

    window.addEventListener('keydown', handleKeyDown, { passive: false });
    document.addEventListener('keydown', handleKeyDown, { passive: false });
    window.addEventListener('keyup', handleKeyUp);
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [movePlayer]);

  // Canvas Maze Renderer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const tileSize = 44;
    canvas.width = currentLevel.width * tileSize;
    canvas.height = currentLevel.height * tileSize;

    // Clear background
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw Floor and Walls
    for (let y = 0; y < currentLevel.height; y++) {
      for (let x = 0; x < currentLevel.width; x++) {
        const val = grid[y][x];
        const px = x * tileSize;
        const py = y * tileSize;

        if (val === 1) {
          // Wall (Detailed Stone Castle Tile)
          ctx.fillStyle = '#1e293b';
          ctx.fillRect(px, py, tileSize, tileSize);

          // Stone block lines
          ctx.strokeStyle = '#334155';
          ctx.lineWidth = 1.5;
          ctx.strokeRect(px + 1, py + 1, tileSize - 2, tileSize - 2);

          // Brick pattern inside wall
          ctx.strokeStyle = '#0f172a';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(px, py + tileSize / 2);
          ctx.lineTo(px + tileSize, py + tileSize / 2);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(px + tileSize / 2, py);
          ctx.lineTo(px + tileSize / 2, py + tileSize / 2);
          ctx.stroke();
        } else {
          // Walkable Floor (Paved tiles)
          ctx.fillStyle = '#0b1120';
          ctx.fillRect(px, py, tileSize, tileSize);

          ctx.strokeStyle = 'rgba(255,255,255,0.03)';
          ctx.lineWidth = 1;
          ctx.strokeRect(px, py, tileSize, tileSize);

          // Collectible Crystal (2)
          if (val === 2) {
            ctx.save();
            ctx.translate(px + tileSize / 2, py + tileSize / 2);

            // Glowing diamond
            ctx.fillStyle = '#F59E0B';
            ctx.shadowColor = '#F59E0B';
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.moveTo(0, -9);
            ctx.lineTo(7, 0);
            ctx.lineTo(0, 9);
            ctx.lineTo(-7, 0);
            ctx.closePath();
            ctx.fill();

            // Diamond inner facet
            ctx.fillStyle = '#FEF08A';
            ctx.beginPath();
            ctx.moveTo(0, -6);
            ctx.lineTo(4, 0);
            ctx.lineTo(0, 6);
            ctx.lineTo(-4, 0);
            ctx.closePath();
            ctx.fill();

            ctx.restore();
          }

          // Locked Gate (3)
          if (val === 3) {
            ctx.fillStyle = '#831843'; // Deep ruby gate background
            ctx.fillRect(px + 2, py + 2, tileSize - 4, tileSize - 4);

            ctx.strokeStyle = '#F43F5E';
            ctx.lineWidth = 2.5;
            ctx.strokeRect(px + 4, py + 4, tileSize - 8, tileSize - 8);

            // Energy Gate Laser Lines
            ctx.strokeStyle = '#FDA4AF';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(px + 6, py + tileSize / 2);
            ctx.lineTo(px + tileSize - 6, py + tileSize / 2);
            ctx.moveTo(px + tileSize / 2, py + 6);
            ctx.lineTo(px + tileSize / 2, py + tileSize - 6);
            ctx.stroke();

            // Lock Icon
            ctx.fillStyle = '#FACC15';
            ctx.beginPath();
            ctx.arc(px + tileSize / 2, py + tileSize / 2 - 2, 4, Math.PI, 0, false);
            ctx.stroke();
            ctx.fillRect(px + tileSize / 2 - 4, py + tileSize / 2 - 2, 8, 7);
          }

          // Exit Portal / Temple (4)
          if (val === 4) {
            ctx.save();
            ctx.translate(px + tileSize / 2, py + tileSize / 2);

            // Golden swirl portal
            ctx.fillStyle = '#4338CA';
            ctx.beginPath();
            ctx.arc(0, 0, 16, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#F59E0B';
            ctx.shadowColor = '#F59E0B';
            ctx.shadowBlur = 12;

            // Star emblem
            ctx.beginPath();
            for (let i = 0; i < 5; i++) {
              ctx.lineTo(
                Math.cos(((18 + i * 72) * Math.PI) / 180) * 12,
                -Math.sin(((18 + i * 72) * Math.PI) / 180) * 12
              );
              ctx.lineTo(
                Math.cos(((54 + i * 72) * Math.PI) / 180) * 5,
                -Math.sin(((54 + i * 72) * Math.PI) / 180) * 5
              );
            }
            ctx.closePath();
            ctx.fill();

            ctx.restore();
          }
        }
      }
    }

    // --- DRAW ADORABLE EXPLORER CHILD CHARACTER ---
    const cx = playerPos.x * tileSize + tileSize / 2;
    const cy = playerPos.y * tileSize + tileSize / 2;
    const bob = stepAnim % 2 === 0 ? 0 : -2;

    ctx.save();
    ctx.translate(cx, cy + bob);

    // 1. Little Backpack
    if (playerDir === 'up') {
      ctx.fillStyle = '#EA580C';
      ctx.beginPath();
      ctx.roundRect(-9, -4, 18, 14, 4);
      ctx.fill();
      ctx.fillStyle = '#C2410C';
      ctx.fillRect(-7, 0, 14, 4);
    } else if (playerDir === 'left') {
      ctx.fillStyle = '#EA580C';
      ctx.beginPath();
      ctx.roundRect(4, -4, 6, 12, 3);
      ctx.fill();
    } else if (playerDir === 'right') {
      ctx.fillStyle = '#EA580C';
      ctx.beginPath();
      ctx.roundRect(-10, -4, 6, 12, 3);
      ctx.fill();
    }

    // 2. Cute Little Boots / Feet
    ctx.fillStyle = '#1E293B';
    const legOffset = stepAnim === 1 ? -3 : stepAnim === 3 ? 3 : 0;
    ctx.beginPath();
    ctx.roundRect(-7 + legOffset, 10, 5, 4, 2);
    ctx.roundRect(2 - legOffset, 10, 5, 4, 2);
    ctx.fill();

    // 3. Child's Jacket / Body
    ctx.fillStyle = '#4F46E5'; // Bright Indigo Jacket
    ctx.beginPath();
    ctx.roundRect(-8, 0, 16, 12, 4);
    ctx.fill();

    // Golden zipper line
    ctx.strokeStyle = '#FACC15';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 10);
    ctx.stroke();

    // 4. Round Chubby Head & Face
    ctx.fillStyle = '#FED7AA'; // Skin tone
    ctx.beginPath();
    ctx.arc(0, -5, 9, 0, Math.PI * 2);
    ctx.fill();

    // Cute Rosy Blushing Cheeks
    ctx.fillStyle = 'rgba(251, 113, 133, 0.45)';
    ctx.beginPath();
    ctx.arc(-6, -4, 2.5, 0, Math.PI * 2);
    ctx.arc(6, -4, 2.5, 0, Math.PI * 2);
    ctx.fill();

    // Eyes (Expressive big anime/child eyes with sparkle)
    if (playerDir !== 'up') {
      ctx.fillStyle = '#0F172A';
      const eyeXOffset = playerDir === 'left' ? -2 : playerDir === 'right' ? 2 : 0;

      // Left eye
      ctx.beginPath();
      ctx.arc(-3.5 + eyeXOffset, -6, 2.2, 0, Math.PI * 2);
      ctx.fill();
      // Left eye sparkle
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(-4 + eyeXOffset, -7, 0.9, 0, Math.PI * 2);
      ctx.fill();

      // Right eye
      ctx.fillStyle = '#0F172A';
      ctx.beginPath();
      ctx.arc(3.5 + eyeXOffset, -6, 2.2, 0, Math.PI * 2);
      ctx.fill();
      // Right eye sparkle
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(3 + eyeXOffset, -7, 0.9, 0, Math.PI * 2);
      ctx.fill();

      // Happy Smiling Little Mouth
      ctx.strokeStyle = '#7C2D12';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(0 + eyeXOffset, -3, 2.5, 0.1 * Math.PI, 0.9 * Math.PI);
      ctx.stroke();
    }

    // 5. Explorer Baseball Cap
    ctx.fillStyle = '#0284C7'; // Blue cap
    ctx.beginPath();
    ctx.arc(0, -9, 9.5, Math.PI, 0, false);
    ctx.fill();

    // Cap Visor (Güneşlik)
    ctx.fillStyle = '#F59E0B'; // Yellow visor
    if (playerDir === 'left') {
      ctx.fillRect(-12, -10, 8, 3.5);
    } else if (playerDir === 'right') {
      ctx.fillRect(4, -10, 8, 3.5);
    } else if (playerDir === 'down') {
      ctx.fillRect(-6, -8, 12, 3);
    }

    // Small Cap Button on top
    ctx.fillStyle = '#FEF08A';
    ctx.beginPath();
    ctx.arc(0, -18, 1.8, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }, [grid, playerPos, playerDir, stepAnim, currentLevel]);

  // Answer Gate Question (NO HINTS, direct validation!)
  const handleAnswerGate = (optionId: string, isCorrect: boolean) => {
    if (!activeGate) return;
    setSelectedOptId(optionId);

    if (isCorrect) {
      sounds.playGateUnlock();
      triggerConfetti();
      setScore((prev) => prev + 150 + streak * 30);
      setGatesUnlocked((prev) => prev + 1);
      setStreak((prev) => prev + 1);

      setGateFeedback({
        isCorrect: true,
        text: `Tebrikler! ${activeGate.gate.explanation}`,
      });

      // Clear gate from maze grid
      setTimeout(() => {
        setGrid((prev) => {
          const next = prev.map((row) => [...row]);
          next[activeGate.gy][activeGate.gx] = 0; // Turn gate into walkable floor
          return next;
        });
        setActiveGate(null);
      }, 1400);
    } else {
      sounds.playWrong();
      setStreak(0);
      setGateFeedback({
        isCorrect: false,
        text: "Yanlış cevap! Kapı kilitli kaldı. Tekrar düşün ve doğru seçeneği bul!",
      });
    }
  };

  // Next Level
  const handleNextLevel = () => {
    sounds.playFanfare();
    if (levelIndex + 1 < MAZE_LEVELS.length) {
      setLevelIndex((prev) => prev + 1);
    } else {
      setAllLevelsComplete(true);
      setShowLevelFinish(false);
    }
  };

  // Restart Maze Game
  const handleRestart = () => {
    setLevelIndex(0);
    setScore(0);
    setCrystalsCollected(0);
    setGatesUnlocked(0);
    setStreak(0);
    setAllLevelsComplete(false);
    setShowLevelFinish(false);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto">
      <canvas ref={confettiCanvasRef} className="fixed inset-0 pointer-events-none z-50" />

      {/* Top HUD: Score, Crystals, Gates, Level Info */}
      <div className="w-full bg-white border border-slate-200 rounded-2xl p-4 mb-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block">
            Labirent Görevi · MEB 5. Sınıf Geometri
          </span>
          <h2 className="text-base sm:text-lg font-black text-slate-900">
            {currentLevel.title}
          </h2>
          <p className="text-xs text-slate-500">{currentLevel.subtitle}</p>
        </div>

        <div className="flex items-center gap-3 text-xs font-bold">
          <div className="px-3 py-1.5 bg-amber-50 text-amber-900 rounded-xl border border-amber-200 flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span className="tabular-nums font-mono text-sm">{score}</span>
            <span>Puan</span>
          </div>

          <div className="px-3 py-1.5 bg-emerald-50 text-emerald-900 rounded-xl border border-emerald-200 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span className="tabular-nums font-mono text-sm">{crystalsCollected}</span>
            <span>Kristal</span>
          </div>

          <div className="px-3 py-1.5 bg-purple-50 text-purple-900 rounded-xl border border-purple-200 flex items-center gap-1.5">
            <Unlock className="w-4 h-4 text-purple-600" />
            <span className="tabular-nums font-mono text-sm">{gatesUnlocked}</span>
            <span>Kapı</span>
          </div>

          <div className="px-3 py-1.5 bg-rose-50 text-rose-900 rounded-xl border border-rose-200 flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-rose-500" />
            <span className="tabular-nums font-mono text-sm">{streak}</span>
            <span>Seri</span>
          </div>

          <button
            onClick={() => {
              sounds.enabled = !soundEnabled;
              setSoundEnabled(!soundEnabled);
            }}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            title={soundEnabled ? 'Sesi Kapat' : 'Sesi Aç'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>
        </div>
      </div>

      {/* Maze Canvas Stage */}
      <div
        ref={containerRef}
        tabIndex={0}
        onClick={() => containerRef.current?.focus()}
        className="w-full bg-slate-950 p-4 sm:p-6 rounded-3xl shadow-xl flex flex-col items-center justify-center border-4 border-slate-800 relative outline-none focus:ring-4 focus:ring-indigo-500/50 transition-all cursor-pointer"
        title="Oynamak için tıkla veya klavye yön tuşlarını kullan"
      >
        <canvas
          ref={canvasRef}
          className="rounded-2xl shadow-inner max-w-full h-auto"
        />

        {/* Legend / Info below canvas */}
        <div className="w-full mt-4 flex flex-wrap items-center justify-between text-xs text-slate-400 px-2 gap-3">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-indigo-600 inline-block"></span> Sevimli Kaşif (Can)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-amber-400 inline-block"></span> Kristal (+50 P)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-rose-600 inline-block"></span> Kapı (Soru)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-full bg-indigo-500 inline-block"></span> Tapınak (Çıkış)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-indigo-950 text-indigo-300 border border-indigo-700/60 rounded-lg font-bold flex items-center gap-1.5">
              <span>⌨️ Yön Tuşları:</span>
              <kbd className={`px-1.5 py-0.5 rounded text-[11px] font-mono ${activePressedKey === 'up' ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-300'}`}>↑</kbd>
              <kbd className={`px-1.5 py-0.5 rounded text-[11px] font-mono ${activePressedKey === 'down' ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-300'}`}>↓</kbd>
              <kbd className={`px-1.5 py-0.5 rounded text-[11px] font-mono ${activePressedKey === 'left' ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-300'}`}>←</kbd>
              <kbd className={`px-1.5 py-0.5 rounded text-[11px] font-mono ${activePressedKey === 'right' ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-300'}`}>→</kbd>
            </span>
          </div>
        </div>
      </div>

      {/* On-screen Directional Touch Controls */}
      <div className="mt-5 flex flex-col items-center gap-1.5 select-none">
        <button
          onClick={() => {
            movePlayer(0, -1, 'up');
            containerRef.current?.focus();
          }}
          className={`w-14 h-14 border-2 rounded-2xl flex items-center justify-center shadow-md active:scale-95 transition-all cursor-pointer ${
            activePressedKey === 'up'
              ? 'bg-indigo-600 text-white border-indigo-400'
              : 'bg-white border-slate-300 text-slate-800'
          }`}
          aria-label="Yukarı Git"
        >
          <ArrowUp className={`w-6 h-6 ${activePressedKey === 'up' ? 'text-white' : 'text-indigo-600'}`} />
        </button>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              movePlayer(-1, 0, 'left');
              containerRef.current?.focus();
            }}
            className={`w-14 h-14 border-2 rounded-2xl flex items-center justify-center shadow-md active:scale-95 transition-all cursor-pointer ${
              activePressedKey === 'left'
                ? 'bg-indigo-600 text-white border-indigo-400'
                : 'bg-white border-slate-300 text-slate-800'
            }`}
            aria-label="Sola Git"
          >
            <ArrowLeft className={`w-6 h-6 ${activePressedKey === 'left' ? 'text-white' : 'text-indigo-600'}`} />
          </button>
          <button
            onClick={() => {
              movePlayer(0, 1, 'down');
              containerRef.current?.focus();
            }}
            className={`w-14 h-14 border-2 rounded-2xl flex items-center justify-center shadow-md active:scale-95 transition-all cursor-pointer ${
              activePressedKey === 'down'
                ? 'bg-indigo-600 text-white border-indigo-400'
                : 'bg-white border-slate-300 text-slate-800'
            }`}
            aria-label="Aşağı Git"
          >
            <ArrowDown className={`w-6 h-6 ${activePressedKey === 'down' ? 'text-white' : 'text-indigo-600'}`} />
          </button>
          <button
            onClick={() => {
              movePlayer(1, 0, 'right');
              containerRef.current?.focus();
            }}
            className={`w-14 h-14 border-2 rounded-2xl flex items-center justify-center shadow-md active:scale-95 transition-all cursor-pointer ${
              activePressedKey === 'right'
                ? 'bg-indigo-600 text-white border-indigo-400'
                : 'bg-white border-slate-300 text-slate-800'
            }`}
            aria-label="Sağa Git"
          >
            <ArrowRight className={`w-6 h-6 ${activePressedKey === 'right' ? 'text-white' : 'text-indigo-600'}`} />
          </button>
        </div>
      </div>

      {/* ACTIVE GATE PUZZLE MODAL (DIRECT QUESTION - NO HINTS) */}
      {activeGate && (
        <div className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    {activeGate.gate.doorName}
                  </h3>
                  <span className="text-xs text-indigo-600 font-semibold">
                    {activeGate.gate.topic}
                  </span>
                </div>
              </div>
            </div>

            {/* Geometric Diagram Preview */}
            <div className="bg-slate-900 rounded-2xl p-4 flex flex-col items-center justify-center mb-4">
              <GeometryVisual
                type={activeGate.gate.visualType}
                data={{
                  angle1: activeGate.gate.visualData.angle1,
                  isRightAngle: activeGate.gate.visualData.isRight,
                  missingAngleLabel: activeGate.gate.visualData.missingLabel,
                }}
              />
            </div>

            {/* Question Prompt */}
            <p className="text-sm font-semibold text-slate-800 mb-4 leading-relaxed">
              {activeGate.gate.prompt}
            </p>

            {/* Options List */}
            <div className="space-y-2 mb-4">
              {activeGate.gate.options.map((opt) => {
                const isSelected = selectedOptId === opt.id;
                let btnStyle = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-indigo-50';

                if (gateFeedback) {
                  if (opt.isCorrect) {
                    btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                  } else if (isSelected && !opt.isCorrect) {
                    btnStyle = 'bg-rose-50 border-rose-500 text-rose-900 font-bold';
                  } else {
                    btnStyle = 'bg-slate-50 opacity-50 border-slate-200 text-slate-400';
                  }
                }

                return (
                  <button
                    key={opt.id}
                    disabled={Boolean(gateFeedback?.isCorrect)}
                    onClick={() => handleAnswerGate(opt.id, opt.isCorrect)}
                    className={`w-full text-left p-3.5 rounded-xl border-2 transition-all flex items-center justify-between text-xs sm:text-sm font-semibold cursor-pointer ${btnStyle}`}
                  >
                    <span>{opt.text}</span>
                    {gateFeedback && opt.isCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
                    )}
                    {gateFeedback && isSelected && !opt.isCorrect && (
                      <XCircle className="w-4 h-4 text-rose-500 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Direct Feedback Box */}
            {gateFeedback && (
              <div
                className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
                  gateFeedback.isCorrect
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    : 'bg-rose-50 border-rose-200 text-rose-800'
                }`}
              >
                {gateFeedback.text}
              </div>
            )}
          </div>
        </div>
      )}

      {/* LEVEL FINISH MODAL */}
      {showLevelFinish && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-center shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-600 mx-auto flex items-center justify-center mb-4">
              <Trophy className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-black text-slate-900 mb-1">
              Harika İş! Labirent Geçildi!
            </h3>
            <p className="text-xs text-slate-600 mb-4">
              Sevimli kaşif tapınağa ulaştı ve {currentLevel.title} kazanımlarını tamamladı!
            </p>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 font-bold text-sm mb-5">
              ⭐ Toplam Puanın: {score}
            </div>

            <button
              onClick={handleNextLevel}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer"
            >
              Sonraki Labirente Geç ➔
            </button>
          </div>
        </div>
      )}

      {/* ALL LEVELS COMPLETED (CHAMPIONSHIP) */}
      {allLevelsComplete && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 text-center shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95">
            <div className="w-20 h-20 rounded-3xl bg-amber-100 text-amber-500 mx-auto flex items-center justify-center mb-4 shadow-sm">
              <Trophy className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-black text-slate-900 mb-2">
              🏆 BÜYÜK GEOMETRİ ŞAMPİYONU!
            </h3>
            <p className="text-xs text-slate-600 mb-6 leading-relaxed">
              Tüm labirentleri geçtin, kesişen, paralel, çakışık doğruları ve 8 açıyı başarıyla çözdün!
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-6 space-y-1">
              <div className="text-xs text-slate-500 font-semibold">Kazanılan Toplam Puan:</div>
              <div className="text-3xl font-black font-mono text-indigo-600">{score}</div>
              <div className="text-xs text-emerald-600 font-bold">Toplanan Kristaller: {crystalsCollected} ⭐</div>
            </div>

            <button
              onClick={handleRestart}
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer"
            >
              Oyunu Yeniden Oyna 🔄
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
