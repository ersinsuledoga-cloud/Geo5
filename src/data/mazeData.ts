export interface MazeGatePuzzle {
  gateId: string;
  doorName: string;
  topic: string;
  prompt: string;
  visualType: 'scissors' | 'intersecting' | 'train' | 'coincident' | 'three_lines_triangle' | 'three_lines_point' | 'transversal';
  visualData: {
    angle1?: number;
    angle2?: number;
    isRight?: boolean;
    missingLabel?: string;
  };
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
}

export interface MazeLevel {
  id: number;
  title: string;
  subtitle: string;
  themeColor: string;
  startPos: { x: number; y: number };
  exitPos: { x: number; y: number };
  width: number;
  height: number;
  grid: number[][];
  gates: { [key: string]: MazeGatePuzzle };
}

export const MAZE_LEVELS: MazeLevel[] = [
  {
    id: 1,
    title: "1. Kesişen Doğrular ve Açılar Labirenti",
    subtitle: "Kesişme noktaları, ters açılar ve komşu bütünler açılar",
    themeColor: "#4f46e5",
    width: 13,
    height: 9,
    startPos: { x: 1, y: 1 },
    exitPos: { x: 11, y: 7 },
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
        gateId: "g1_1",
        doorName: "Makas Kapısı",
        topic: "Ters Açılar",
        prompt: "Şekildeki makasın kollarından biri 50° dir. Soru işareti (?) ile gösterilen ters açının ölçüsü kaç derecedir?",
        visualType: "scissors",
        visualData: { angle1: 50 },
        options: [
          { id: "a", text: "50°", isCorrect: true },
          { id: "b", text: "40°", isCorrect: false },
          { id: "c", text: "130°", isCorrect: false },
          { id: "d", text: "90°", isCorrect: false }
        ],
        explanation: "Doğru cevap 50°."
      },
      "7,3": {
        gateId: "g1_2",
        doorName: "Bütünler Açı Kapısı",
        topic: "Komşu Bütünler Açılar",
        prompt: "Kesişen iki doğrudan oluşan dar açı 65° ise, bu doğrunun üzerindeki diğer komşu bütünler açı kaç derecedir?",
        visualType: "intersecting",
        visualData: { angle1: 65, missingLabel: "?" },
        options: [
          { id: "a", text: "115°", isCorrect: true },
          { id: "b", text: "25°", isCorrect: false },
          { id: "c", text: "125°", isCorrect: false },
          { id: "d", text: "90°", isCorrect: false }
        ],
        explanation: "Doğru cevap 115°."
      },
      "9,6": {
        gateId: "g1_3",
        doorName: "Dik Kesişen Doğrular Kapısı",
        topic: "Dik Kesişen Doğrular (⊥)",
        prompt: "İki doğru birbirini dik kestiğinde (d₁ ⊥ d₂), kesişim noktasında oluşan 4 açının her birinin ölçüsü kaç derecedir?",
        visualType: "intersecting",
        visualData: { angle1: 90, isRight: true },
        options: [
          { id: "a", text: "90°", isCorrect: true },
          { id: "b", text: "45°", isCorrect: false },
          { id: "c", text: "180°", isCorrect: false },
          { id: "d", text: "60°", isCorrect: false }
        ],
        explanation: "Doğru cevap 90°."
      }
    }
  },
  {
    id: 2,
    title: "2. Paralel ve Çakışık Raylar Labirenti",
    subtitle: "Paralel ve çakışık doğruların özellikleri",
    themeColor: "#0284c7",
    width: 13,
    height: 9,
    startPos: { x: 1, y: 1 },
    exitPos: { x: 11, y: 7 },
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
        gateId: "g2_1",
        doorName: "Raylar Kapısı",
        topic: "Paralel Doğrularda Açı",
        prompt: "Düzlemde bulunan paralel iki doğru arasındaki açı kaç derecedir?",
        visualType: "train",
        visualData: {},
        options: [
          { id: "a", text: "Açı oluşturmazlar", isCorrect: true },
          { id: "b", text: "90° dir", isCorrect: false },
          { id: "c", text: "180° dir", isCorrect: false },
          { id: "d", text: "0° dir", isCorrect: false }
        ],
        explanation: "Doğru cevap: Açı oluşturmazlar."
      },
      "9,3": {
        gateId: "g2_2",
        doorName: "Sabit Mesafe Kapısı",
        topic: "Paralel Doğrular Arasındaki Uzaklık",
        prompt: "Paralel d₁ ve d₂ doğruları arasındaki dik mesafe başlangıçta 4 cm ise, 50 metre ileride kaç cm olur?",
        visualType: "train",
        visualData: {},
        options: [
          { id: "a", text: "4 cm", isCorrect: true },
          { id: "b", text: "8 cm", isCorrect: false },
          { id: "c", text: "0 cm", isCorrect: false },
          { id: "d", text: "2 cm", isCorrect: false }
        ],
        explanation: "Doğru cevap 4 cm."
      },
      "7,6": {
        gateId: "g2_3",
        doorName: "Çakışık Doğrular Kapısı",
        topic: "Çakışık Doğrular",
        prompt: "Düzlemde tüm noktaları ortak olan iki doğrunun ortak nokta sayısı kaçtır?",
        visualType: "coincident",
        visualData: {},
        options: [
          { id: "a", text: "Sonsuz", isCorrect: true },
          { id: "b", text: "1", isCorrect: false },
          { id: "c", text: "0", isCorrect: false },
          { id: "d", text: "2", isCorrect: false }
        ],
        explanation: "Doğru cevap Sonsuz."
      }
    }
  },
  {
    id: 3,
    title: "3. Üç Doğru ve Üçgen Dağları Labirenti",
    subtitle: "Üç doğrunun birbirine göre durumları",
    themeColor: "#d97706",
    width: 13,
    height: 9,
    startPos: { x: 1, y: 1 },
    exitPos: { x: 11, y: 7 },
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
        gateId: "g3_1",
        doorName: "Üçgen Kapısı",
        topic: "İkişer İkişer Kesişim",
        prompt: "Düzlemde 3 doğru birbirini ikişer ikişer kestiğinde oluşan kesişim noktası sayısı ve şekil nedir?",
        visualType: "three_lines_triangle",
        visualData: {},
        options: [
          { id: "a", text: "3 kesişim noktası ve Üçgen", isCorrect: true },
          { id: "b", text: "1 kesişim noktası ve Daire", isCorrect: false },
          { id: "c", text: "4 kesişim noktası ve Dörtgen", isCorrect: false },
          { id: "d", text: "0 kesişim noktası ve Çizgi", isCorrect: false }
        ],
        explanation: "Doğru cevap: 3 kesişim noktası ve Üçgen."
      },
      "9,3": {
        gateId: "g3_2",
        doorName: "Noktadaş Doğrular Kapısı",
        topic: "Bir Noktada Kesişen Doğrular",
        prompt: "Tek bir ortak noktadan geçen 3 doğruya ne ad verilir?",
        visualType: "three_lines_point",
        visualData: {},
        options: [
          { id: "a", text: "Noktadaş Doğrular", isCorrect: true },
          { id: "b", text: "Paralel Doğrular", isCorrect: false },
          { id: "c", text: "Çakışık Doğrular", isCorrect: false },
          { id: "d", text: "Kesen Doğrular", isCorrect: false }
        ],
        explanation: "Doğru cevap: Noktadaş Doğrular."
      },
      "9,6": {
        gateId: "g3_3",
        doorName: "Kesişim Sayısı Kapısı",
        topic: "Kesişim Durumları",
        prompt: "Düzlemde bulunan 3 farklı doğrunun kesişim noktası sayısı aşağıdakilerden hangisi OLAMAZ?",
        visualType: "three_lines_triangle",
        visualData: {},
        options: [
          { id: "a", text: "4", isCorrect: true },
          { id: "b", text: "0", isCorrect: false },
          { id: "c", text: "1", isCorrect: false },
          { id: "d", text: "3", isCorrect: false }
        ],
        explanation: "Doğru cevap: 4."
      }
    }
  },
  {
    id: 4,
    title: "4. Kesen Doğru ve Süper Açılar Labirenti",
    subtitle: "İki paralel ve bir kesenin oluşturduğu açılar",
    themeColor: "#059669",
    width: 13,
    height: 9,
    startPos: { x: 1, y: 1 },
    exitPos: { x: 11, y: 7 },
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
        gateId: "g4_1",
        doorName: "Yöndeş Açılar Kapısı",
        topic: "Yöndeş Açılar",
        prompt: "İki paralel doğruyu kesen bir doğrudan oluşan açılardan biri 70° dir. Alttaki yöndeş açının ölçüsü kaç derecedir?",
        visualType: "transversal",
        visualData: { angle1: 70 },
        options: [
          { id: "a", text: "70°", isCorrect: true },
          { id: "b", text: "110°", isCorrect: false },
          { id: "c", text: "20°", isCorrect: false },
          { id: "d", text: "90°", isCorrect: false }
        ],
        explanation: "Doğru cevap 70°."
      },
      "9,3": {
        gateId: "g4_2",
        doorName: "Geniş Açı Kapısı",
        topic: "Açı Hesaplama",
        prompt: "Paralelleri kesen şekilde dar açılardan biri 55° dir. Buna göre şekildeki GENİŞ açılardan birinin ölçüsü kaç derecedir?",
        visualType: "transversal",
        visualData: { angle1: 55 },
        options: [
          { id: "a", text: "125°", isCorrect: true },
          { id: "b", text: "55°", isCorrect: false },
          { id: "c", text: "135°", isCorrect: false },
          { id: "d", text: "35°", isCorrect: false }
        ],
        explanation: "Doğru cevap 125°."
      },
      "7,6": {
        gateId: "g4_3",
        doorName: "Sekiz Açı Kapısı",
        topic: "Açıların Dağılımı",
        prompt: "İki paralel doğruyu kesen bir doğru tarafından oluşturulan 8 açı hakkında hangisi KESİNLİKLE DOĞRUDUR?",
        visualType: "transversal",
        visualData: { angle1: 60 },
        options: [
          { id: "a", text: "4 açı birbirine eşit dar, 4 açı birbirine eşit geniştir", isCorrect: true },
          { id: "b", text: "8 açının hepsi birbirinden farklıdır", isCorrect: false },
          { id: "c", text: "Tüm açılar her zaman 90 derecedir", isCorrect: false },
          { id: "d", text: "Tüm dar açılar 45 derecedir", isCorrect: false }
        ],
        explanation: "Doğru cevap: 4 açı birbirine eşit dar, 4 açı birbirine eşit geniştir."
      }
    }
  }
];
