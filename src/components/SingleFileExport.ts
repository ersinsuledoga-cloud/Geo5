/**
 * Standalone single-file HTML generator for offline use.
 * Generates 'oyun.html' containing the entire interactive Geometric Maze Game,
 * cute explorer character moving with keyboard arrow keys, vector canvas graphics,
 * Web Audio API sounds, and questions with zero hints in choices.
 */

export function generateSingleFileHtml(): string {
  return `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GeoMacera: 5. Sınıf Geometri Labirenti</title>
  <style>
    :root {
      --primary: #4f46e5;
      --primary-hover: #4338ca;
      --bg: #090d16;
      --surface: #1e293b;
      --border: #334155;
      --text: #f8fafc;
      --text-muted: #94a3b8;
      --accent: #f59e0b;
      --success: #10b981;
      --danger: #f43f5e;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
    body { background-color: var(--bg); color: var(--text); min-height: 100vh; display: flex; flex-direction: column; outline: none; }
    
    header {
      background: #0f172a;
      border-bottom: 1px solid var(--border);
      padding: 12px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: sticky;
      top: 0;
      z-index: 50;
    }
    .brand { font-size: 1.15rem; font-weight: 800; color: #ffffff; display: flex; align-items: center; gap: 8px; }
    .brand span { color: #818cf8; }
    
    .stats-bar { display: flex; align-items: center; gap: 10px; font-size: 0.82rem; font-weight: 700; }
    .stat-pill { background: #1e293b; padding: 6px 12px; border-radius: 8px; border: 1px solid var(--border); display: flex; align-items: center; gap: 6px; }
    .stat-pill.pts { color: #facc15; border-color: #854d0e; }
    
    main { flex: 1; max-width: 900px; width: 100%; margin: 0 auto; padding: 16px; display: flex; flex-direction: column; align-items: center; }
    
    .level-info { width: 100%; background: #1e293b; border: 1px solid var(--border); border-radius: 14px; padding: 12px 16px; margin-bottom: 14px; display: flex; justify-content: space-between; align-items: center; }
    .level-title { font-size: 1rem; font-weight: 800; color: #ffffff; }
    .level-desc { font-size: 0.78rem; color: var(--text-muted); }

    .canvas-box {
      background: #020617;
      border: 3px solid #334155;
      border-radius: 20px;
      padding: 10px;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
      position: relative;
      cursor: pointer;
      outline: none;
    }
    .canvas-box:focus { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.35); }
    canvas { display: block; max-width: 100%; height: auto; border-radius: 12px; }

    .legend-bar { display: flex; flex-wrap: wrap; gap: 14px; font-size: 0.75rem; color: var(--text-muted); margin-top: 10px; justify-content: center; }
    .legend-item { display: flex; align-items: center; gap: 6px; }
    .dot { width: 12px; height: 12px; border-radius: 3px; display: inline-block; }

    /* D-PAD */
    .d-pad { display: flex; flex-direction: column; align-items: center; gap: 6px; margin-top: 14px; user-select: none; }
    .d-row { display: flex; gap: 10px; }
    .d-btn {
      width: 54px;
      height: 54px;
      background: #1e293b;
      border: 2px solid var(--border);
      border-radius: 12px;
      color: #ffffff;
      font-size: 1.25rem;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.1s;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.3);
    }
    .d-btn.active, .d-btn:active { background: #4f46e5; border-color: #818cf8; transform: scale(0.95); }

    /* MODAL */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(2, 6, 23, 0.85);
      backdrop-filter: blur(4px);
      z-index: 100;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 16px;
    }
    .modal-overlay.open { display: flex; }
    .modal-card {
      background: #1e293b;
      border: 1px solid var(--border);
      border-radius: 20px;
      max-width: 480px;
      width: 100%;
      padding: 24px;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
    }
    .modal-title { font-size: 1.15rem; font-weight: 800; color: #ffffff; margin-bottom: 4px; display: flex; align-items: center; gap: 8px; }
    .modal-badge { font-size: 0.75rem; color: #818cf8; font-weight: 700; margin-bottom: 14px; }
    .modal-visual { background: #0b0f19; border-radius: 14px; padding: 12px; margin-bottom: 16px; display: flex; justify-content: center; }
    .modal-prompt { font-size: 0.9rem; line-height: 1.45; color: #e2e8f0; margin-bottom: 16px; font-weight: 600; }
    
    .opt-list { display: flex; flex-direction: column; gap: 8px; margin-bottom: 14px; }
    .opt-btn {
      background: #0f172a;
      border: 2px solid var(--border);
      border-radius: 10px;
      padding: 12px 14px;
      color: #ffffff;
      font-size: 0.88rem;
      font-weight: 600;
      text-align: left;
      cursor: pointer;
      transition: all 0.15s;
    }
    .opt-btn:hover:not(:disabled) { border-color: var(--primary); background: #1e1b4b; }
    .opt-btn.correct { background: #064e3b; border-color: var(--success); color: #a7f3d0; font-weight: 700; }
    .opt-btn.wrong { background: #4c0519; border-color: var(--danger); color: #fecdd3; }

    .modal-feedback { font-size: 0.82rem; line-height: 1.4; padding: 10px 12px; border-radius: 8px; display: none; }
    .modal-feedback.show { display: block; }
    .modal-feedback.correct { background: #064e3b; color: #6ee7b7; border: 1px solid #059669; }
    .modal-feedback.wrong { background: #4c0519; color: #fda4af; border: 1px solid #e11d48; }

    #confettiCanvas { position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 150; }
  </style>
</head>
<body tabindex="0">
  <canvas id="confettiCanvas"></canvas>

  <header>
    <div class="brand">
      🧭 <span>GeoMacera</span> · Sevimli Kaşifin Geometri Labirenti
    </div>
    <div class="stats-bar">
      <div class="stat-pill pts">⭐ <span id="scoreDisplay">0</span> Puan</div>
      <div class="stat-pill">💎 <span id="crystalDisplay">0</span> Kristal</div>
      <div class="stat-pill">🔓 <span id="gateDisplay">0</span> Kapı</div>
      <button onclick="toggleSound()" id="soundBtn" class="stat-pill" style="cursor:pointer;">🔊</button>
    </div>
  </header>

  <main>
    <div class="level-info">
      <div>
        <div class="level-title" id="levelTitle">1. Kesişen Doğrular ve Açılar Bahçesi</div>
        <div class="level-desc" id="levelDesc">Kesişen doğrular ve ters açılar kapılarını çözerek çıkıştaki Altın Tapınağa ulaş!</div>
      </div>
      <div style="font-size:0.8rem; font-weight:bold; color:#818cf8;" id="levelCounter">Seviye 1 / 4</div>
    </div>

    <div class="canvas-box" id="canvasBox" tabindex="0" onclick="this.focus()" title="Klavye yön tuşlarıyla hareket ettir">
      <canvas id="mazeCanvas"></canvas>
    </div>

    <div class="legend-bar">
      <div class="legend-item"><span class="dot" style="background:#4f46e5;"></span> Sevimli Kaşif (Can)</div>
      <div class="legend-item"><span class="dot" style="background:#f59e0b;"></span> Kristal (+50 P)</div>
      <div class="legend-item"><span class="dot" style="background:#f43f5e;"></span> Geometri Kapısı</div>
      <div class="legend-item"><span class="dot" style="background:#818cf8;"></span> Altın Tapınak (Çıkış)</div>
      <div class="legend-item" style="color:#818cf8; font-weight:bold;">⌨️ Klavye Yön Tuşları: [↑] [↓] [←] [→]</div>
    </div>

    <!-- Directional Buttons -->
    <div class="d-pad">
      <button class="d-btn" id="btnUp" onclick="movePlayer(0, -1, 'up')">▲</button>
      <div class="d-row">
        <button class="d-btn" id="btnLeft" onclick="movePlayer(-1, 0, 'left')">◀</button>
        <button class="d-btn" id="btnDown" onclick="movePlayer(0, 1, 'down')">▼</button>
        <button class="d-btn" id="btnRight" onclick="movePlayer(1, 0, 'right')">▶</button>
      </div>
    </div>
  </main>

  <!-- GATE PUZZLE MODAL (İpucu Yoktur) -->
  <div class="modal-overlay" id="gateModal">
    <div class="modal-card">
      <div class="modal-title">
        🔒 <span id="gateName">Kilitli Kapı</span>
      </div>
      <div class="modal-badge" id="gateTopic">Geometri Kazanımı</div>

      <div class="modal-visual" id="gateVisual"></div>

      <p class="modal-prompt" id="gatePrompt"></p>

      <div class="opt-list" id="gateOptions"></div>

      <div class="modal-feedback" id="gateFeedback"></div>
    </div>
  </div>

  <script>
    // --- 1. SES MOTORU (Web Audio API) ---
    let soundOn = true;
    let audioCtx = null;
    function getAudio() {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      return audioCtx;
    }
    function toggleSound() {
      soundOn = !soundOn;
      document.getElementById('soundBtn').innerText = soundOn ? '🔊' : '🔇';
    }
    function playBeep(freq, dur = 0.1, type = 'sine') {
      if (!soundOn) return;
      try {
        const ctx = getAudio();
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        g.gain.setValueAtTime(0.12, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
        osc.connect(g);
        g.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + dur);
      } catch(e) {}
    }
    function playStep() { playBeep(150 + Math.random() * 20, 0.04, 'triangle'); }
    function playCrystal() { playBeep(880, 0.1, 'sine'); setTimeout(() => playBeep(1320, 0.15, 'sine'), 50); }
    function playUnlock() {
      [587, 740, 880, 1174].forEach((f, i) => setTimeout(() => playBeep(f, 0.12, 'sine'), i * 60));
    }
    function playWrong() { playBeep(220, 0.22, 'sawtooth'); }

    // --- 2. LABİRENT MÜFREDAT VERİSİ (MEB 5. Sınıf Sayfa 45-49) ---
    const LEVELS = [
      {
        title: "1. Kesişen Doğrular ve Açılar Labirenti",
        desc: "Kesişme noktaları, ters açılar ve komşu bütünler açılar kapılarını çöz!",
        w: 13, h: 9,
        start: { x: 1, y: 1 },
        grid: [
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          [1, 0, 2, 0, 1, 0, 2, 0, 1, 2, 0, 0, 1],
          [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
          [1, 0, 1, 3, 1, 0, 1, 3, 1, 0, 1, 0, 1],
          [1, 2, 0, 0, 0, 2, 0, 0, 0, 2, 1, 0, 1],
          [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
          [1, 0, 0, 0, 1, 2, 0, 0, 0, 3, 0, 0, 1],
          [1, 2, 1, 0, 0, 0, 1, 1, 1, 0, 1, 4, 1],
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        gates: {
          "3,3": {
            name: "Makas Kapısı",
            topic: "Ters Açılar",
            prompt: "Şekildeki makasın kollarından biri 50° dir. Soru işareti (?) ile gösterilen ters açının ölçüsü kaç derecedir?",
            visual: "scissors",
            angle: 50,
            options: [
              { text: "50°", correct: true },
              { text: "40°", correct: false },
              { text: "130°", correct: false },
              { text: "90°", correct: false }
            ],
            exp: "Doğru! Cevap: 50°"
          },
          "7,3": {
            name: "Komşu Bütünler Kapısı",
            topic: "Komşu Bütünler Açılar",
            prompt: "Kesişen iki doğrudan oluşan dar açı 65° ise, bu doğrunun üzerindeki komşu bütünler açı kaç derecedir?",
            visual: "intersecting",
            angle: 65,
            options: [
              { text: "115°", correct: true },
              { text: "25°", correct: false },
              { text: "125°", correct: false },
              { text: "90°", correct: false }
            ],
            exp: "Doğru! Cevap: 115°"
          },
          "9,6": {
            name: "Dik Kesişen Doğrular Kapısı (⊥)",
            topic: "Dik Kesişen Doğrular",
            prompt: "İki doğru birbirini dik kestiğinde (d₁ ⊥ d₂), oluşan 4 açının her birinin ölçüsü kaç derecedir?",
            visual: "intersecting",
            angle: 90,
            options: [
              { text: "90°", correct: true },
              { text: "45°", correct: false },
              { text: "180°", correct: false },
              { text: "60°", correct: false }
            ],
            exp: "Doğru! Cevap: 90°"
          }
        }
      },
      {
        title: "2. Paralel ve Çakışık Raylar Labirenti",
        desc: "Tren rayları, sabit dik mesafe ve açı oluşturmayan doğrular!",
        w: 13, h: 9,
        start: { x: 1, y: 1 },
        grid: [
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          [1, 0, 0, 0, 1, 2, 0, 0, 0, 2, 0, 0, 1],
          [1, 2, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
          [1, 0, 1, 3, 0, 0, 1, 2, 0, 3, 1, 0, 1],
          [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
          [1, 2, 0, 2, 1, 0, 0, 0, 1, 2, 0, 2, 1],
          [1, 1, 1, 0, 1, 1, 1, 3, 1, 0, 1, 1, 1],
          [1, 0, 2, 0, 0, 2, 0, 0, 0, 0, 2, 4, 1],
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        gates: {
          "3,3": {
            name: "Raylar Kapısı",
            topic: "Paralel Doğrularda Açı",
            prompt: "Düzlemde bulunan paralel iki doğru arasındaki açı kaç derecedir?",
            visual: "train",
            options: [
              { text: "Açı oluşturmazlar", correct: true },
              { text: "90° dir", correct: false },
              { text: "180° dir", correct: false },
              { text: "0° dir", correct: false }
            ],
            exp: "Doğru! Cevap: Açı oluşturmazlar"
          },
          "9,3": {
            name: "Sabit Mesafe Kapısı",
            topic: "Paralel Doğrular Arasındaki Uzaklık",
            prompt: "Paralel iki doğru arasındaki dik uzaklık bir noktada 4 cm ise, 50 metre ileride kaç cm olur?",
            visual: "train",
            options: [
              { text: "4 cm", correct: true },
              { text: "8 cm", correct: false },
              { text: "0 cm", correct: false },
              { text: "2 cm", correct: false }
            ],
            exp: "Doğru! Cevap: 4 cm"
          },
          "7,6": {
            name: "Çakışık Doğrular Kapısı",
            topic: "Çakışık Doğrular",
            prompt: "Düzlemde tüm noktaları ortak olan iki doğrunun ortak nokta sayısı kaçtır?",
            visual: "coincident",
            options: [
              { text: "Sonsuz", correct: true },
              { text: "1", correct: false },
              { text: "0", correct: false },
              { text: "2", correct: false }
            ],
            exp: "Doğru! Cevap: Sonsuz"
          }
        }
      },
      {
        title: "3. Üç Doğru ve Üçgen Dağları Labirenti",
        desc: "Noktadaş doğrular ve ikişer ikişer kesişip üçgen oluşturanlar!",
        w: 13, h: 9,
        start: { x: 1, y: 1 },
        grid: [
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          [1, 0, 2, 0, 1, 0, 0, 0, 1, 2, 0, 0, 1],
          [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
          [1, 0, 1, 3, 1, 2, 1, 2, 1, 3, 1, 0, 1],
          [1, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2, 1],
          [1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1],
          [1, 0, 0, 0, 1, 2, 0, 2, 1, 3, 0, 0, 1],
          [1, 2, 1, 0, 0, 0, 1, 0, 0, 0, 1, 4, 1],
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        gates: {
          "3,3": {
            name: "Üçgen Kapısı",
            topic: "İkişer İkişer Kesişim",
            prompt: "Düzlemde 3 doğru birbirini ikişer ikişer kestiğinde oluşan kesişim noktası sayısı ve şekil nedir?",
            visual: "three_triangle",
            options: [
              { text: "3 kesişim noktası ve Üçgen", correct: true },
              { text: "1 kesişim noktası ve Daire", correct: false },
              { text: "4 kesişim noktası ve Dörtgen", correct: false },
              { text: "0 kesişim noktası ve Çizgi", correct: false }
            ],
            exp: "Doğru! Cevap: 3 kesişim noktası ve Üçgen"
          },
          "9,3": {
            name: "Noktadaş Doğrular Kapısı",
            topic: "Bir Noktada Kesişen Doğrular",
            prompt: "Tek bir ortak noktadan geçen 3 doğruya ne ad verilir?",
            visual: "three_point",
            options: [
              { text: "Noktadaş Doğrular", correct: true },
              { text: "Paralel Doğrular", correct: false },
              { text: "Çakışık Doğrular", correct: false },
              { text: "Kesen Doğrular", correct: false }
            ],
            exp: "Doğru! Cevap: Noktadaş Doğrular"
          },
          "9,6": {
            name: "Kesişim Sayısı Kapısı",
            topic: "Kesişim Durumları",
            prompt: "Düzlemde 3 farklı doğrunun kesişim noktası sayısı aşağıdakilerden hangisi OLAMAZ?",
            visual: "three_triangle",
            options: [
              { text: "4", correct: true },
              { text: "0", correct: false },
              { text: "1", correct: false },
              { text: "3", correct: false }
            ],
            exp: "Doğru! Cevap: 4"
          }
        }
      },
      {
        title: "4. Kesen Doğru ve Süper Açılar Labirenti",
        desc: "İki paralel doğruyu kesen bir doğru ve açı özellikleri",
        w: 13, h: 9,
        start: { x: 1, y: 1 },
        grid: [
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          [1, 0, 0, 0, 1, 2, 0, 0, 0, 2, 0, 0, 1],
          [1, 2, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
          [1, 0, 1, 3, 0, 0, 1, 0, 0, 3, 1, 0, 1],
          [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
          [1, 2, 0, 2, 1, 0, 0, 0, 1, 2, 0, 2, 1],
          [1, 1, 1, 0, 1, 1, 1, 3, 1, 0, 1, 1, 1],
          [1, 0, 2, 0, 0, 2, 0, 0, 0, 0, 2, 4, 1],
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        gates: {
          "3,3": {
            name: "Yöndeş Açılar Kapısı",
            topic: "Yöndeş Açılar",
            prompt: "İki paralel doğruyu kesen bir doğrudan oluşan açılardan biri 70° dir. Alttaki yöndeş açının ölçüsü kaç derecedir?",
            visual: "transversal",
            angle: 70,
            options: [
              { text: "70°", correct: true },
              { text: "110°", correct: false },
              { text: "20°", correct: false },
              { text: "90°", correct: false }
            ],
            exp: "Doğru! Cevap: 70°"
          },
          "9,3": {
            name: "Geniş Açı Kapısı",
            topic: "Açı Hesaplama",
            prompt: "Paralelleri kesen şekilde dar açılardan biri 55° dir. GENİŞ açılardan birinin ölçüsü kaç derecedir?",
            visual: "transversal",
            angle: 55,
            options: [
              { text: "125°", correct: true },
              { text: "55°", correct: false },
              { text: "135°", correct: false },
              { text: "35°", correct: false }
            ],
            exp: "Doğru! Cevap: 125°"
          },
          "7,6": {
            name: "Sekiz Açı Kapısı",
            topic: "Açıların Dağılımı",
            prompt: "İki paralel doğruyu kesen bir doğru tarafından oluşturulan 8 açı hakkında hangisi KESİNLİKLE DOĞRUDUR?",
            visual: "transversal",
            angle: 60,
            options: [
              { text: "4 açı birbirine eşit dar, 4 açı birbirine eşit geniştir", correct: true },
              { text: "8 açının hepsi birbirinden farklıdır", correct: false },
              { text: "Tüm açılar her zaman 90 derecedir", correct: false },
              { text: "Tüm dar açılar 45 derecedir", correct: false }
            ],
            exp: "Doğru! Cevap: 4 açı birbirine eşit dar, 4 açı birbirine eşit geniştir"
          }
        }
      }
    ];

    let currentLvlIdx = 0;
    let grid = [];
    let player = { x: 1, y: 1, dir: 'down', anim: 0 };
    let score = 0;
    let crystals = 0;
    let gates = 0;
    let activeGateData = null;

    function initLevel(idx) {
      currentLvlIdx = idx;
      const lvl = LEVELS[idx];
      grid = lvl.grid.map(row => [...row]);
      player.x = lvl.start.x;
      player.y = lvl.start.y;
      player.dir = 'down';

      document.getElementById('levelTitle').innerText = lvl.title;
      document.getElementById('levelDesc').innerText = lvl.desc;
      document.getElementById('levelCounter').innerText = \`Seviye \${idx + 1} / \${LEVELS.length}\`;
      drawMaze();
      
      const box = document.getElementById('canvasBox');
      if (box) box.focus();
    }

    // --- 3. DİNAMİK VEKTÖREL SVGLER ---
    function getSvg(type, angle = 60) {
      if (type === 'scissors') {
        const rad = (angle / 2 * Math.PI) / 180;
        const x1 = 150 + 80 * Math.sin(rad), y1 = 100 - 80 * Math.cos(rad);
        const x2 = 150 - 80 * Math.sin(rad), y2 = 100 - 80 * Math.cos(rad);
        const hx1 = 150 - 50 * Math.sin(rad), hy1 = 100 + 50 * Math.cos(rad);
        const hx2 = 150 + 50 * Math.sin(rad), hy2 = 100 + 50 * Math.cos(rad);
        return \`<svg viewBox="0 0 300 200" style="width:260px; height:160px;">
          <line x1="\${hx1}" y1="\${hy1}" x2="\${x1}" y2="\${y1}" stroke="#cbd5e1" stroke-width="8" stroke-linecap="round"/>
          <line x1="\${hx2}" y1="\${hy2}" x2="\${x2}" y2="\${y2}" stroke="#94a3b8" stroke-width="8" stroke-linecap="round"/>
          <circle cx="\${hx1 - 8}" cy="\${hy1 + 8}" r="12" fill="none" stroke="#38bdf8" stroke-width="5"/>
          <circle cx="\${hx2 + 8}" cy="\${hy2 + 8}" r="12" fill="none" stroke="#f43f5e" stroke-width="5"/>
          <circle cx="150" cy="100" r="6" fill="#f59e0b"/>
          <text x="150" y="60" text-anchor="middle" fill="#38bdf8" font-size="14" font-weight="bold">\${angle}°</text>
          <text x="150" y="160" text-anchor="middle" fill="#f43f5e" font-size="14" font-weight="bold">?</text>
        </svg>\`;
      }
      if (type === 'intersecting') {
        const rad = (angle * Math.PI) / 180;
        const len = 90;
        const x2 = 150 + len * Math.cos(rad), y2 = 100 - len * Math.sin(rad);
        const x1 = 150 - len * Math.cos(rad), y1 = 100 + len * Math.sin(rad);
        return \`<svg viewBox="0 0 300 200" style="width:260px; height:160px;">
          <line x1="40" y1="100" x2="260" y2="100" stroke="#38bdf8" stroke-width="4" stroke-linecap="round"/>
          <line x1="\${x1}" y1="\${y1}" x2="\${x2}" y2="\${y2}" stroke="#f59e0b" stroke-width="4" stroke-linecap="round"/>
          <circle cx="150" cy="100" r="5" fill="#ef4444"/>
          <text x="195" y="85" fill="#10b981" font-size="13" font-weight="bold">\${angle}°</text>
          <text x="100" y="85" fill="#f43f5e" font-size="13" font-weight="bold">\${angle === 90 ? '90°' : '?'}</text>
        </svg>\`;
      }
      if (type === 'train') {
        return \`<svg viewBox="0 0 300 160" style="width:260px; height:140px;">
          <rect x="20" y="30" width="260" height="100" rx="8" fill="#0f172a"/>
          \${[40, 75, 110, 145, 180, 215, 250].map(x => \`<rect x="\${x}" y="40" width="12" height="80" rx="2" fill="#78350f"/>\`).join('')}
          <line x1="15" y1="60" x2="285" y2="60" stroke="#38bdf8" stroke-width="5"/>
          <line x1="15" y1="100" x2="285" y2="100" stroke="#38bdf8" stroke-width="5"/>
          <line x1="180" y1="60" x2="180" y2="100" stroke="#f59e0b" stroke-width="2" stroke-dasharray="3 3"/>
          <text x="190" y="85" fill="#f59e0b" font-size="10" font-weight="bold">4 cm</text>
        </svg>\`;
      }
      if (type === 'coincident') {
        return \`<svg viewBox="0 0 300 160" style="width:260px; height:140px;">
          <line x1="30" y1="80" x2="270" y2="80" stroke="#a855f7" stroke-width="6" stroke-linecap="round"/>
          <circle cx="80" cy="80" r="4" fill="#facc15"/>
          <circle cx="150" cy="80" r="4" fill="#facc15"/>
          <circle cx="220" cy="80" r="4" fill="#facc15"/>
          <text x="150" y="60" text-anchor="middle" fill="#a855f7" font-size="13" font-weight="bold">d₁ ve d₂</text>
        </svg>\`;
      }
      if (type === 'three_triangle') {
        return \`<svg viewBox="0 0 300 180" style="width:260px; height:150px;">
          <polygon points="150,30 60,140 240,140" fill="rgba(56, 189, 248, 0.25)" stroke="#38bdf8" stroke-width="2"/>
          <line x1="20" y1="140" x2="280" y2="140" stroke="#38bdf8" stroke-width="3"/>
          <line x1="30" y1="170" x2="200" y2="10" stroke="#10b981" stroke-width="3"/>
          <line x1="270" y1="170" x2="100" y2="10" stroke="#f59e0b" stroke-width="3"/>
          <circle cx="150" cy="30" r="5" fill="#ef4444"/>
          <circle cx="60" cy="140" r="5" fill="#ef4444"/>
          <circle cx="240" cy="140" r="5" fill="#ef4444"/>
        </svg>\`;
      }
      if (type === 'three_point') {
        return \`<svg viewBox="0 0 300 180" style="width:260px; height:150px;">
          <line x1="30" y1="90" x2="270" y2="90" stroke="#38bdf8" stroke-width="3"/>
          <line x1="50" y1="150" x2="250" y2="30" stroke="#10b981" stroke-width="3"/>
          <line x1="50" y1="30" x2="250" y2="150" stroke="#f59e0b" stroke-width="3"/>
          <circle cx="150" cy="90" r="6" fill="#ef4444"/>
          <text x="150" y="75" text-anchor="middle" fill="#ef4444" font-size="12" font-weight="bold">P</text>
        </svg>\`;
      }
      if (type === 'transversal') {
        const supp = 180 - angle;
        return \`<svg viewBox="0 0 300 180" style="width:260px; height:150px;">
          <line x1="20" y1="50" x2="280" y2="50" stroke="#38bdf8" stroke-width="4"/>
          <line x1="20" y1="130" x2="280" y2="130" stroke="#38bdf8" stroke-width="4"/>
          <line x1="180" y1="15" x2="120" y2="165" stroke="#f59e0b" stroke-width="4"/>
          <circle cx="166" cy="50" r="4" fill="#ef4444"/>
          <circle cx="134" cy="130" r="4" fill="#ef4444"/>
          <text x="185" y="42" fill="#34d399" font-size="12" font-weight="bold">\${angle}°</text>
          <text x="120" y="42" fill="#fb7185" font-size="12" font-weight="bold">\${supp}°</text>
          <text x="155" y="122" fill="#34d399" font-size="12" font-weight="bold">?</text>
          <text x="90" y="122" fill="#fb7185" font-size="12" font-weight="bold">\${supp}°</text>
        </svg>\`;
      }
      return '';
    }

    // --- 4. CANVAS LABİRENT VE SEVİMLİ ÇOCUK KARAKTERİ ---
    function drawMaze() {
      const canvas = document.getElementById('mazeCanvas');
      const ctx = canvas.getContext('2d');
      const lvl = LEVELS[currentLvlIdx];
      const T = 42;
      canvas.width = lvl.w * T;
      canvas.height = lvl.h * T;

      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let y = 0; y < lvl.h; y++) {
        for (let x = 0; x < lvl.w; x++) {
          const val = grid[y][x];
          const px = x * T, py = y * T;

          if (val === 1) {
            ctx.fillStyle = '#1e293b';
            ctx.fillRect(px, py, T, T);
            ctx.strokeStyle = '#334155';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(px + 1, py + 1, T - 2, T - 2);
          } else {
            ctx.fillStyle = '#090d16';
            ctx.fillRect(px, py, T, T);

            if (val === 2) {
              ctx.save();
              ctx.translate(px + T/2, py + T/2);
              ctx.fillStyle = '#f59e0b';
              ctx.beginPath();
              ctx.moveTo(0, -8); ctx.lineTo(6, 0); ctx.lineTo(0, 8); ctx.lineTo(-6, 0);
              ctx.closePath();
              ctx.fill();
              ctx.fillStyle = '#fef08a';
              ctx.beginPath();
              ctx.moveTo(0, -4); ctx.lineTo(3, 0); ctx.lineTo(0, 4); ctx.lineTo(-3, 0);
              ctx.closePath();
              ctx.fill();
              ctx.restore();
            } else if (val === 3) {
              ctx.fillStyle = '#831843';
              ctx.fillRect(px + 2, py + 2, T - 4, T - 4);
              ctx.strokeStyle = '#f43f5e';
              ctx.lineWidth = 2;
              ctx.strokeRect(px + 4, py + 4, T - 8, T - 8);
              ctx.fillStyle = '#facc15';
              ctx.fillRect(px + T/2 - 4, py + T/2 - 3, 8, 7);
            } else if (val === 4) {
              ctx.save();
              ctx.translate(px + T/2, py + T/2);
              ctx.fillStyle = '#4338ca';
              ctx.beginPath(); ctx.arc(0, 0, 14, 0, Math.PI * 2); ctx.fill();
              ctx.fillStyle = '#facc15';
              ctx.beginPath(); ctx.arc(0, 0, 7, 0, Math.PI * 2); ctx.fill();
              ctx.restore();
            }
          }
        }
      }

      // Sevimli Çocuk Karakteri
      const cx = player.x * T + T/2;
      const cy = player.y * T + T/2;
      const bob = player.anim % 2 === 0 ? 0 : -2;

      ctx.save();
      ctx.translate(cx, cy + bob);

      if (player.dir === 'up') {
        ctx.fillStyle = '#ea580c';
        ctx.fillRect(-8, -4, 16, 12);
      }

      ctx.fillStyle = '#1e293b';
      ctx.fillRect(-6, 9, 4, 3);
      ctx.fillRect(2, 9, 4, 3);

      ctx.fillStyle = '#4f46e5';
      ctx.beginPath(); ctx.roundRect(-8, 0, 16, 11, 3); ctx.fill();

      ctx.fillStyle = '#fed7aa';
      ctx.beginPath(); ctx.arc(0, -5, 8.5, 0, Math.PI * 2); ctx.fill();

      ctx.fillStyle = 'rgba(251, 113, 133, 0.4)';
      ctx.beginPath(); ctx.arc(-5, -4, 2, 0, Math.PI * 2); ctx.arc(5, -4, 2, 0, Math.PI * 2); ctx.fill();

      if (player.dir !== 'up') {
        const off = player.dir === 'left' ? -2 : player.dir === 'right' ? 2 : 0;
        ctx.fillStyle = '#0f172a';
        ctx.beginPath(); ctx.arc(-3 + off, -6, 2, 0, Math.PI * 2); ctx.arc(3 + off, -6, 2, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.beginPath(); ctx.arc(-3.5 + off, -6.5, 0.8, 0, Math.PI * 2); ctx.arc(2.5 + off, -6.5, 0.8, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#7c2d12'; ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.arc(0 + off, -3, 2, 0.1 * Math.PI, 0.9 * Math.PI); ctx.stroke();
      }

      ctx.fillStyle = '#0284c7';
      ctx.beginPath(); ctx.arc(0, -8.5, 9, Math.PI, 0, false); ctx.fill();
      ctx.fillStyle = '#f59e0b';
      if (player.dir === 'left') ctx.fillRect(-11, -9.5, 7, 3);
      else if (player.dir === 'right') ctx.fillRect(4, -9.5, 7, 3);
      else if (player.dir === 'down') ctx.fillRect(-5, -8, 10, 2.5);

      ctx.restore();
    }

    // --- 5. HAREKET VE KAPI MEKANİĞİ ---
    function movePlayer(dx, dy, dir) {
      if (activeGateData) return;
      player.dir = dir;
      player.anim++;

      const nx = player.x + dx;
      const ny = player.y + dy;
      const lvl = LEVELS[currentLvlIdx];

      if (nx < 0 || nx >= lvl.w || ny < 0 || ny >= lvl.h) return;

      const cell = grid[ny][nx];
      if (cell === 1) return;

      if (cell === 3) {
        const gateKey = \`\${nx},\${ny}\`;
        const g = lvl.gates[gateKey];
        if (g) openGateModal(g, nx, ny);
        return;
      }

      playStep();

      if (cell === 2) {
        playCrystal();
        score += 50;
        crystals++;
        grid[ny][nx] = 0;
        updateHUD();
      }

      if (cell === 4) {
        playUnlock();
        fireConfetti();
        score += 300;
        updateHUD();
        setTimeout(() => {
          if (currentLvlIdx + 1 < LEVELS.length) {
            alert(\`Tebrikler! \${lvl.title} geçildi!\`);
            initLevel(currentLvlIdx + 1);
          } else {
            alert(\`🏆 TEBRİKLER! Tüm labirentleri tamamladın! Toplam Puanın: \${score}\`);
            initLevel(0);
          }
        }, 300);
      }

      player.x = nx;
      player.y = ny;
      drawMaze();
    }

    function openGateModal(gate, gx, gy) {
      activeGateData = { gate, gx, gy };
      playWrong();

      document.getElementById('gateName').innerText = gate.name;
      document.getElementById('gateTopic').innerText = gate.topic;
      document.getElementById('gatePrompt').innerText = gate.prompt;
      document.getElementById('gateVisual').innerHTML = getSvg(gate.visual, gate.angle);

      const optsBox = document.getElementById('gateOptions');
      optsBox.innerHTML = '';
      gate.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'opt-btn';
        btn.innerText = opt.text;
        btn.onclick = () => answerGate(btn, opt.correct, gate.exp);
        optsBox.appendChild(btn);
      });

      const fb = document.getElementById('gateFeedback');
      fb.className = 'modal-feedback';
      fb.innerText = '';

      document.getElementById('gateModal').classList.add('open');
    }

    function answerGate(btn, isCorrect, exp) {
      const fb = document.getElementById('gateFeedback');
      fb.classList.add('show');

      if (isCorrect) {
        btn.classList.add('correct');
        fb.className = 'modal-feedback show correct';
        fb.innerText = 'Doğru Cevap! Kapı açıldı.';
        playUnlock();
        fireConfetti();
        score += 150;
        gates++;
        updateHUD();

        setTimeout(() => {
          grid[activeGateData.gy][activeGateData.gx] = 0;
          document.getElementById('gateModal').classList.remove('open');
          activeGateData = null;
          drawMaze();
          const box = document.getElementById('canvasBox');
          if (box) box.focus();
        }, 1200);
      } else {
        btn.classList.add('wrong');
        fb.className = 'modal-feedback show wrong';
        fb.innerText = 'Yanlış Cevap! Kapı kilitli kaldı.';
        playWrong();
      }
    }

    function updateHUD() {
      document.getElementById('scoreDisplay').innerText = score;
      document.getElementById('crystalDisplay').innerText = crystals;
      document.getElementById('gateDisplay').innerText = gates;
    }

    function fireConfetti() {
      const canvas = document.getElementById('confettiCanvas');
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const pts = [];
      const cols = ['#818cf8', '#38bdf8', '#34d399', '#facc15', '#f43f5e'];
      for (let i = 0; i < 40; i++) {
        pts.push({
          x: canvas.width / 2, y: canvas.height * 0.4,
          vx: (Math.random() - 0.5) * 14, vy: (Math.random() - 0.8) * 14,
          c: cols[Math.floor(Math.random() * cols.length)], a: 1
        });
      }
      function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let ok = false;
        pts.forEach(p => {
          p.x += p.vx; p.y += p.vy; p.vy += 0.3; p.a -= 0.02;
          if (p.a > 0) { ok = true; ctx.fillStyle = p.c; ctx.globalAlpha = p.a; ctx.fillRect(p.x, p.y, 7, 7); }
        });
        if (ok) requestAnimationFrame(loop);
        else ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      loop();
    }

    // --- KLAVYE YÖN TUŞLARI DİNLEYİCİSİ (ArrowUp, ArrowDown, ArrowLeft, ArrowRight + WASD) ---
    function handleKey(e) {
      const isUp = e.key === 'ArrowUp' || e.key === 'Up' || e.code === 'ArrowUp' || e.key === 'w' || e.key === 'W' || e.code === 'KeyW';
      const isDown = e.key === 'ArrowDown' || e.key === 'Down' || e.code === 'ArrowDown' || e.key === 's' || e.key === 'S' || e.code === 'KeyS';
      const isLeft = e.key === 'ArrowLeft' || e.key === 'Left' || e.code === 'ArrowLeft' || e.key === 'a' || e.key === 'A' || e.code === 'KeyA';
      const isRight = e.key === 'ArrowRight' || e.key === 'Right' || e.code === 'ArrowRight' || e.key === 'd' || e.key === 'D' || e.code === 'KeyD';

      if (isUp || isDown || isLeft || isRight) {
        if (e.cancelable) e.preventDefault();
      }

      if (isUp) {
        movePlayer(0, -1, 'up');
        highlightBtn('btnUp');
      } else if (isDown) {
        movePlayer(0, 1, 'down');
        highlightBtn('btnDown');
      } else if (isLeft) {
        movePlayer(-1, 0, 'left');
        highlightBtn('btnLeft');
      } else if (isRight) {
        movePlayer(1, 0, 'right');
        highlightBtn('btnRight');
      }
    }

    window.addEventListener('keydown', handleKey, { passive: false });
    document.addEventListener('keydown', handleKey, { passive: false });

    window.addEventListener('keyup', e => {
      ['btnUp', 'btnDown', 'btnLeft', 'btnRight'].forEach(id => {
        const btn = document.getElementById(id);
        if (btn) btn.classList.remove('active');
      });
    });

    function highlightBtn(id) {
      const btn = document.getElementById(id);
      if (btn) {
        btn.classList.add('active');
        setTimeout(() => btn.classList.remove('active'), 150);
      }
    }

    // Başlangıç Yüklemesi ve Odaklanma
    window.onload = () => {
      initLevel(0);
      window.focus();
    };
    initLevel(0);
  </script>
</body>
</html>`;
}

export function downloadSingleFileHtml() {
  const html = generateSingleFileHtml();
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'oyun.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
