import { Chapter } from '../types';

export const CHAPTERS: Chapter[] = [
  {
    id: 'kesisen',
    order: 1,
    title: '1. İki Doğrunun Kesişimi ve Açılar',
    shortDesc: 'Kesişme noktası, dar-dik-geniş açılar, ters, komşu, tümler ve bütünler açılar.',
    badgeTitle: 'Açı Kaşifi',
    badgeIcon: 'Scissors',
    theoryPoints: [
      {
        keyword: 'Kesişen Doğrular',
        title: 'Tek Bir Ortak Nokta',
        content: 'Aynı düzlemde tek bir noktada buluşan doğrulara kesişen doğrular denir. Buluştukları noktaya kesişim noktası adı verilir.'
      },
      {
        keyword: 'Ters Açılar',
        title: 'Ölçüleri Daima Eşittir!',
        content: 'İki doğru kesiştiğinde birbirine zıt yönlere bakan açılara ters açılar denir. Tıpkı bir makasın kolları gibi; ters açıların ölçüleri her zaman BİRBİRİNE EŞİTTİR.'
      },
      {
        keyword: 'Komşu & Bütünler Açılar',
        title: 'Toplamı 180° Olan Komşular',
        content: 'Birer kolları ortak olan yan yana açılara komşu açılar denir. Bir doğru üzerinde yan yana duran iki komşu açının toplamı daima 180° olur (bütünler açılar).'
      },
      {
        keyword: 'Tümler Açılar',
        title: 'Toplamı 90° Eden Açılar',
        content: 'Ölçüleri toplamı 90° (dik açı) olan iki açıya tümler açılar denir. Örneğin 30° ile 60° tümler açılardır.'
      }
    ],
    questions: [
      {
        id: 'q1_1',
        type: 'multiple_choice',
        title: 'Makasın Açısı ve Ters Açılar',
        prompt: 'Bir terzi makasını açtığında, şekildeki açılardan biri 50° olarak ölçülüyor. Bu açı ile zıt yöne bakan "ters açı" kaç derecedir?',
        hint: 'Makas modeli: Kesişen iki doğrudan oluşan ters açıların ölçüleri birbirine daima eşittir!',
        explanation: 'Harika! Kesişen iki doğrunun oluşturduğu ters açılar birbirine eşittir. Bu yüzden ters açının ölçüsü de 50° dir.',
        visualType: 'scissors',
        visualData: { angle1: 50, targetAngle: 'ters' },
        options: [
          { id: 'a', text: '40°', isCorrect: false },
          { id: 'b', text: '50°', isCorrect: true },
          { id: 'c', text: '130°', isCorrect: false },
          { id: 'd', text: '90°', isCorrect: false }
        ],
        realLifeExample: {
          title: 'Günlük Hayatta Makas',
          description: 'Makasın iki kolu kesişen iki doğru gibidir. Makası ne kadar açarsan, arka kolları da tam olarak aynı açıyla açılır!',
          icon: 'Scissors'
        }
      },
      {
        id: 'q1_2',
        type: 'angle_calc',
        title: 'Komşu Bütünler Açıyı Bulalım!',
        prompt: 'Kesişen iki doğrudan biri üzerinde yan yana duran iki komşu açı vardır. Dar olan açının ölçüsü 65° ise, onun komşu bütünleri olan geniş açı kaç derecedir?',
        hint: 'Bir doğrunun üzerindeki açı 180° dir. 180° - 65° işlemini yapabilirsin.',
        explanation: 'Tebrikler! Doğru üzerindeki komşu iki açının toplamı 180° dir (bütünler açı). 180° - 65° = 115° bulunur.',
        visualType: 'intersecting_angles',
        visualData: { angle1: 65, missingAngleLabel: '?' },
        options: [
          { id: 'a', text: '115°', isCorrect: true },
          { id: 'b', text: '25°', isCorrect: false },
          { id: 'c', text: '125°', isCorrect: false },
          { id: 'd', text: '90°', isCorrect: false }
        ]
      },
      {
        id: 'q1_3',
        type: 'multiple_choice',
        title: 'Tümler Açılar Dedektifi',
        prompt: 'Ölçüsü 35° olan bir açının "tümleri" olan açı kaç derecedir?',
        hint: 'Tümler açıların ölçüleri toplamı tam 90° (dik açı) yapar. 90 - 35 = ?',
        explanation: 'Çok iyi! İki açının tümler olması için toplamlarının 90° olması gerekir. 90° - 35° = 55° dir.',
        visualType: 'intersecting_angles',
        visualData: { angle1: 35, isRightAngle: true },
        options: [
          { id: 'a', text: '145°', isCorrect: false },
          { id: 'b', text: '55°', isCorrect: true },
          { id: 'c', text: '65°', isCorrect: false },
          { id: 'd', text: '45°', isCorrect: false }
        ]
      },
      {
        id: 'q1_4',
        type: 'true_false',
        title: 'Dik Kesişen Doğrular (⊥)',
        prompt: 'İki doğru birbirini dik kestiğinde (90° açı oluşturduğunda) kesişim noktasında oluşan 4 açının DÖRDÜ DE 90° (dik açı) olur. Bu ifade doğru mudur?',
        hint: 'Biri 90° ise, komşusu 180-90=90°, tersi de 90° olur!',
        explanation: 'Kesinlikle Doğru! İki doğru dik kesiştiğinde (d₁ ⊥ d₂) kesişim noktasındaki dört açının her biri 90° lik dik açılardır.',
        visualType: 'intersecting_angles',
        visualData: { angle1: 90 },
        options: [
          { id: 't', text: 'Doğru (Tüm açılar 90° olur)', isCorrect: true },
          { id: 'f', text: 'Yanlış (Sadece iki tanesi 90° olur)', isCorrect: false }
        ]
      }
    ]
  },
  {
    id: 'paralel_cakisik',
    order: 2,
    title: '2. Düzlemde Açı Oluşturmayan Doğrular',
    shortDesc: 'Hiç kesişmeyen paralel doğrular ve üst üste binen çakışık doğrular.',
    badgeTitle: 'Ray Mühendisi',
    badgeIcon: 'TrainTrack',
    theoryPoints: [
      {
        keyword: 'Paralel Doğrular (//)',
        title: 'Asla Kesişmeyen Yollar',
        content: 'Aynı düzlemde bulunan ve sonsuza kadar uzatılsalar bile hiçbir noktada kesişmeyen doğrulara paralel doğrular denir. Aralarındaki dik mesafe her zaman sabittir.'
      },
      {
        keyword: 'Açı Oluşmaz',
        title: 'Neden Açı Oluşmaz?',
        content: 'Açı oluşması için iki doğrunun ya da ışının tek bir ortak noktada (köşede) buluşması gerekir. Paralel doğrular hiç buluşmadığı için düzlemde açı oluşturmazlar!'
      },
      {
        keyword: 'Çakışık Doğrular',
        title: 'Üst Üste Binen Sonsuz Nokta',
        content: 'Bütün noktaları ortak olan (üst üste gelen) iki doğruya çakışık doğrular denir. Aslında aynı doğrunun üst üste çizilmiş hâlidir ve onlar da açı oluşturmaz.'
      }
    ],
    questions: [
      {
        id: 'q2_1',
        type: 'multiple_choice',
        title: 'Tren Rayları ve Paralellik',
        prompt: 'Bir tren rayının iki demir çeliği düz bir hat boyunca uzanmaktadır. Bu iki demir rayın birbirine göre durumu nedir ve aralarında açı oluşur mu?',
        hint: 'Trenin güvenle gidebilmesi için rayların arasındaki mesafenin hiç değişmemesi ve rayların asla birbirine çarpmaması (kesişmemesi) gerekir.',
        explanation: 'Harika gözlem! Tren rayları paralel doğrulardır. Hiç kesişmedikleri için aralarında açı oluşturmazlar.',
        visualType: 'train_tracks',
        options: [
          { id: 'a', text: 'Paralel doğrulardır ve açı oluşturmazlar.', isCorrect: true },
          { id: 'b', text: 'Kesişen doğrulardır ve dik açı oluştururlar.', isCorrect: false },
          { id: 'c', text: 'Çakışık doğrulardır ve 180° açı oluştururlar.', isCorrect: false },
          { id: 'd', text: 'Noktadaş doğrulardır ve dar açı oluştururlar.', isCorrect: false }
        ],
        realLifeExample: {
          title: 'Tren Rayları ve Elektrik Telleri',
          description: 'Tren rayları ve yol kenarındaki paralel elektrik telleri, hiçbir zaman kesişmeyen paralel doğruların en güzel örnekleridir.',
          icon: 'TrainTrack'
        }
      },
      {
        id: 'q2_2',
        type: 'visual_identify',
        title: 'Aralarındaki Mesafe Kuralı',
        prompt: 'd₁ ve d₂ doğruları birbirine paraleldir (d₁ // d₂). A noktasından d₂ doğrusuna indirilen dikme 4 cm ise, 10 metre ilerideki B noktasından indirilen dikme kaç cm olmalıdır?',
        hint: 'Paralel doğrular arasındaki dik uzaklık hiçbir yerde değişmez!',
        explanation: 'Bravo! Paralel doğruların en temel özelliği, aralarındaki dik mesafenin her noktada birbirine eşit olmasıdır. Bu yüzden mesafe yine 4 cm kalır.',
        visualType: 'train_tracks',
        options: [
          { id: 'a', text: '8 cm (Gittikçe açılır)', isCorrect: false },
          { id: 'b', text: '4 cm (Mesafe her zaman eşittir)', isCorrect: true },
          { id: 'c', text: '0 cm (Sonunda kesişirler)', isCorrect: false },
          { id: 'd', text: '2 cm (Daralır)', isCorrect: false }
        ]
      },
      {
        id: 'q2_3',
        type: 'multiple_choice',
        title: 'Çakışık Doğruların Özelliği',
        prompt: 'Düzlemde verilen k ve m doğrularının ortak nokta sayısı sonsuz tanedir (tüm noktaları ortaktır). Bu iki doğru için hangisi kesinlikle doğrudur?',
        hint: 'Tüm noktaları birbiriyle eşleşen doğrular üst üste gelmiştir.',
        explanation: 'Doğru bildin! Tüm noktaları ortak olan iki doğru "çakışık doğrular" olarak adlandırılır. Birbirlerinin tıpatıp aynısıdırlar.',
        visualType: 'coincident_lines',
        options: [
          { id: 'a', text: 'Kesişen doğrulardır ve 90° açı yaparlar.', isCorrect: false },
          { id: 'b', text: 'Paraleldirler ve ortak noktaları yoktur.', isCorrect: false },
          { id: 'c', text: 'Çakışık doğrulardır, üst üste binerler.', isCorrect: true },
          { id: 'd', text: 'Üçgen oluşturan doğrulardır.', isCorrect: false }
        ]
      }
    ]
  },
  {
    id: 'uc_dogru',
    order: 3,
    title: '3. Üç Doğrunun Birbirine Göre Durumları',
    shortDesc: 'Noktadaş doğrular, ikişer ikişer kesişip üçgen oluşturanlar ve paralel üçlüler.',
    badgeTitle: 'Üçgen Mimarı',
    badgeIcon: 'Triangle',
    theoryPoints: [
      {
        keyword: '1. Durum: Üçü de Paralel',
        title: 'Sıfır Kesişim Noktası',
        content: 'Üç doğru da aynı yönde uzanabilir ve hiçbiri diğeriyle kesişmez (d₁ // d₂ // d₃). Defter çizgileri buna örnektir.'
      },
      {
        keyword: '2. Durum: Tek Noktada Kesişim',
        title: 'Noktadaş Doğrular',
        content: 'Üç doğrunun üçü de tek bir ortak noktadan geçebilir. Bisiklet tekerleğinin telleri veya dairesel bir kavşağın merkezinde buluşan yollar gibi!'
      },
      {
        keyword: '3. Durum: İkişer İkişer Kesişim',
        title: 'Ve İşte Bir Üçgen!',
        content: 'Üç doğru birbirini ikişer ikişer keserse tam 3 farklı kesişim noktası oluşur. Bu kesişim noktaları birleştiğinde ortada bir ÜÇGEN meydana gelir.'
      },
      {
        keyword: '4. Durum: İkisi Paralel, Biri Kesen',
        title: '2 Kesişim Noktası',
        content: 'İki doğru birbirine paralel uzanırken, üçüncü bir doğru her ikisini birden farklı noktalarda kesebilir.'
      }
    ],
    questions: [
      {
        id: 'q3_1',
        type: 'multiple_choice',
        title: 'Ortada Bir Üçgen Belirdi!',
        prompt: 'Bir kağıda çizilen 3 doğru birbirini ikişer ikişer farklı noktalarda kesmektedir. Bu çizimde toplam kaç kesişim noktası vardır ve hangi geometrik şekil oluşur?',
        hint: 'Her doğru diğer iki doğruyu kesiyor: 3 köşe oluşur.',
        explanation: 'Harika! 3 doğru ikişer ikişer kesiştiğinde tam 3 kesişim noktası (köşe) oluşur ve aralarında bir ÜÇGEN meydana gelir.',
        visualType: 'three_lines_triangle',
        options: [
          { id: 'a', text: '3 kesişim noktası oluşur ve Üçgen meydana gelir.', isCorrect: true },
          { id: 'b', text: '1 kesişim noktası oluşur ve Daire meydana gelir.', isCorrect: false },
          { id: 'c', text: 'Hiç kesişim noktası olmaz ve Kare oluşur.', isCorrect: false },
          { id: 'd', text: '4 kesişim noktası oluşur ve Dikdörtgen meydana gelir.', isCorrect: false }
        ],
        realLifeExample: {
          title: 'Üçgen Yol Kavşağı (Ada)',
          description: 'Birbirini ikişer ikişer kesen üç cadde, ortasında yeşillik bir üçgen ada ve 3 farklı yaya geçidi noktası oluşturur.',
          icon: 'Compass'
        }
      },
      {
        id: 'q3_2',
        type: 'multiple_choice',
        title: 'Bisiklet Tekerleği ve Noktadaş Doğrular',
        prompt: 'Bir bisiklet tekerleğinin 3 farklı teli tam göbekteki merkez milinde (tek bir noktada) birleşiyor. Bu 3 doğrunun durumu için hangisi söylenir?',
        hint: 'Üçü de tek bir ortak noktadan geçmektedir.',
        explanation: 'Mükemmel! Tek bir ortak noktadan geçen doğrulara "noktadaş doğrular" denir. Kesişim noktası sayısı sadece 1 dir.',
        visualType: 'three_lines_point',
        options: [
          { id: 'a', text: 'Noktadaş doğrulardır (Kesişim noktası 1 tanedir).', isCorrect: true },
          { id: 'b', text: 'Paralel doğrulardır (Kesişim noktası yoktur).', isCorrect: false },
          { id: 'c', text: 'Üçgen oluşturan doğrulardır (3 nokta vardır).', isCorrect: false },
          { id: 'd', text: 'Çakışık doğrulardır.', isCorrect: false }
        ]
      },
      {
        id: 'q3_3',
        type: 'multiple_choice',
        title: 'Kaç Farklı Durum Olabilir?',
        prompt: 'Bir düzlemde bulunan 3 farklı doğrunun birbirine göre kesişim noktası sayısı aşağıdakilerden hangisi OLAMAZ?',
        hint: '0 nokta (üçü paralel), 1 nokta (noktadaş), 2 nokta (ikisi paralel biri kesen), 3 nokta (üçgen). Acaba 4 nokta olabilir mi?',
        explanation: 'Tebrikler! 3 doğru en fazla 3 noktada kesişebilir (üçgen durumu). Asla 4 farklı kesişim noktası oluşturamazlar.',
        visualType: 'three_lines_triangle',
        options: [
          { id: 'a', text: '0 (Üçü de paralel olduğunda)', isCorrect: false },
          { id: 'b', text: '1 (Bir noktada kesiştiklerinde)', isCorrect: false },
          { id: 'c', text: '3 (İkişer ikişer kesiştiklerinde)', isCorrect: false },
          { id: 'd', text: '4 (Bu durum imkânsızdır)', isCorrect: true }
        ]
      }
    ]
  },
  {
    id: 'paralel_kesen',
    order: 4,
    title: '4. İki Paralel Doğru ve Bir Kesen',
    shortDesc: 'Yöndeş, ters, iç ters açılar ve "Sihirli 2 Sayı" gizemi!',
    badgeTitle: 'Açı Dedektifi',
    badgeIcon: 'Target',
    theoryPoints: [
      {
        keyword: '8 Açının Sırrı',
        title: 'Toplam 8 Açı Oluşur',
        content: 'İki paralel doğruyu üçüncü bir doğru kestiğinde üstte 4, altta 4 olmak üzere toplam 8 açı meydana gelir.'
      },
      {
        keyword: 'Sihirli 2 Değer Kuralı',
        title: 'Sadece 2 Farklı Sayı Vardır!',
        content: 'Bu 8 açıdan dar olan 4 tanesinin ölçüsü birbirine tamamen EŞİTTİR. Geniş olan 4 tanesinin ölçüsü de birbirine tamamen EŞİTTİR! Bir dar ile bir genişin toplamı ise 180° dir.'
      },
      {
        keyword: 'Yöndeş Açılar',
        title: 'Aynı Yöne Bakan Açılar Eştir',
        content: 'Hem üstteki hem alttaki kesişimde aynı yöne (örneğin sağ-yukarı) bakan açılara yöndeş açılar denir ve ölçüleri birbirine eşittir.'
      },
      {
        keyword: 'Ters ve İç-Ters Açılar',
        title: 'Z Harfi ve Eş Açılar',
        content: 'Paraleller arasında Z harfi çizen açılar (iç ters açılar) birbirine eşittir. Tıpkı ters açılar gibi!'
      }
    ],
    questions: [
      {
        id: 'q4_1',
        type: 'multiple_choice',
        title: 'Yöndeş Açıları Bulalım!',
        prompt: 'Birbirine paralel d₁ ve d₂ doğrularını bir k doğrusu kesiyor. Üstteki kesişimde sağ-üst köşede bulunan açı 70° ise, alttaki kesişimde sağ-üst köşedeki "yöndeş açı" kaç derecedir?',
        hint: 'Yöndeş açılar aynı yöne bakar ve paralel doğrular arasında ölçüleri BİRBİRİNE EŞİTTİR!',
        explanation: 'Harikasın! Yöndeş açılar aynı yöne baktığı için ölçüleri birbirine eşittir. O da 70° dir.',
        visualType: 'parallel_transversal',
        visualData: { angle1: 70, targetAngle: 'yondes' },
        options: [
          { id: 'a', text: '70° (Çünkü yöndeş açılar eştir)', isCorrect: true },
          { id: 'b', text: '110° (Bütünleridir)', isCorrect: false },
          { id: 'c', text: '20° (Tümleridir)', isCorrect: false },
          { id: 'd', text: '90° (Dik açıdır)', isCorrect: false }
        ],
        realLifeExample: {
          title: 'Merdiven Korkulukları ve Basamaklar',
          description: 'Bir merdivenin basamakları (paralel) ile tırabzan borusu (kesen) arasındaki tüm basamak açıları tamamen birbirine eşittir.',
          icon: 'Target'
        }
      },
      {
        id: 'q4_2',
        type: 'angle_calc',
        title: 'Sihirli 2 Değer: Eksik Açıyı Bul!',
        prompt: 'Şekilde iki paralel doğruyu kesen bir doğru verilmiştir. Dar açılardan biri 55° olarak ölçülmüştür. Bu şeklin oluşturduğu GENİŞ açılardan birinin ölçüsü kaç derece olmalıdır?',
        hint: 'Bir doğru üzerindeki dar açı ile geniş açının toplamı daima 180° dir (komşu bütünler). 180 - 55 = ?',
        explanation: 'Mükemmel matematikçi! Bir dar açı 55° ise, geniş açı onun 180° ye tamamlayanıdır: 180° - 55° = 125° dir. Bütün geniş açılar 125° dir!',
        visualType: 'parallel_transversal',
        visualData: { angle1: 55, missingAngleLabel: 'x' },
        options: [
          { id: 'a', text: '125°', isCorrect: true },
          { id: 'b', text: '55°', isCorrect: false },
          { id: 'c', text: '135°', isCorrect: false },
          { id: 'd', text: '35°', isCorrect: false }
        ]
      },
      {
        id: 'q4_3',
        type: 'multiple_choice',
        title: 'Sekiz Açının Tamamı!',
        prompt: 'İki paralel doğruyu bir kesen kestiğinde oluşan 8 açı hakkında aşağıdakilerden hangisi KESİNLİKLE DOĞRUDUR?',
        hint: 'Sihirli 2 sayı kuralını hatırla: 4 dar açı birbirine eşit, 4 geniş açı birbirine eşittir.',
        explanation: 'Doğru bildin! Oluşan 8 açıdan 4 tanesi dar açı olup birbirine eşittir, diğer 4 tanesi de geniş açı olup birbirine eşittir.',
        visualType: 'parallel_transversal',
        visualData: { angle1: 60 },
        options: [
          { id: 'a', text: '4 açı birbirine eşit dar, 4 açı birbirine eşit geniştir.', isCorrect: true },
          { id: 'b', text: '8 açının sekizi de birbirinden tamamen farklıdır.', isCorrect: false },
          { id: 'c', text: 'Tüm açılar her zaman 90 derecedir.', isCorrect: false },
          { id: 'd', text: 'Açıların toplamı her zaman 100 derecedir.', isCorrect: false }
        ]
      }
    ]
  },
  {
    id: 'sampiyona',
    order: 5,
    title: '5. Büyük Geometri Şampiyonası',
    shortDesc: 'Tüm konuların harmanlandığı büyük final sınavı ve Altın Geometri Kupası!',
    badgeTitle: 'Geometri Şampiyonu',
    badgeIcon: 'Trophy',
    theoryPoints: [
      {
        keyword: 'Büyük Sınav',
        title: 'Öğrendiğin Her Şeyi Gösterme Vakti',
        content: 'Kesişen doğrular, ters ve komşu açılar, tren rayları (paralellik), üçgen oluşturan doğrular ve kesenin oluşturduğu eş açılar. Bakalım kaç puan toplayacaksın!'
      }
    ],
    questions: [
      {
        id: 'q5_1',
        type: 'multiple_choice',
        title: 'Soru 1: Ters Açılar Testi',
        prompt: 'Kesişen iki doğrunun oluşturduğu açılardan biri 132° dir. Bu açının karşısındaki TERS AÇI kaç derecedir?',
        hint: 'Ters açıların ölçüleri her zaman eşittir!',
        explanation: 'Tebrikler! Ters açılar eşit olduğu için o da 132° dir.',
        visualType: 'intersecting_angles',
        visualData: { angle1: 132 },
        options: [
          { id: 'a', text: '132°', isCorrect: true },
          { id: 'b', text: '48°', isCorrect: false },
          { id: 'c', text: '90°', isCorrect: false },
          { id: 'd', text: '180°', isCorrect: false }
        ]
      },
      {
        id: 'q5_2',
        type: 'multiple_choice',
        title: 'Soru 2: Paralellik ve Açı',
        prompt: 'Aynı düzlemde bulunan d ve m doğruları hiçbir noktada kesişmemektedir. Bu iki doğru arasındaki açı kaç derecedir?',
        hint: 'Kesişmeyen (paralel) doğrular açı oluşturur mu?',
        explanation: 'Harika! Paralel doğruların ortak kesişim noktası olmadığı için aralarında bir açı oluşmaz.',
        visualType: 'train_tracks',
        options: [
          { id: 'a', text: 'Kesişmedikleri için açı oluşturmazlar.', isCorrect: true },
          { id: 'b', text: '90° açı oluştururlar.', isCorrect: false },
          { id: 'c', text: '180° açı oluştururlar.', isCorrect: false },
          { id: 'd', text: '360° açı oluştururlar.', isCorrect: false }
        ]
      },
      {
        id: 'q5_3',
        type: 'multiple_choice',
        title: 'Soru 3: Üçgen Oluşumu',
        prompt: 'Bir düzlemdeki üç doğru bir araya gelerek bir ÜÇGEN oluşturmuştur. Bu doğruların kesişim noktası sayısı kaçtır?',
        hint: 'Üçgenin kaç köşesi vardır?',
        explanation: 'Doğru! Üçgen oluşturan üç doğru ikişer ikişer kesişir ve tam 3 kesişim noktası (köşe) meydana gelir.',
        visualType: 'three_lines_triangle',
        options: [
          { id: 'a', text: '1', isCorrect: false },
          { id: 'b', text: '2', isCorrect: false },
          { id: 'c', text: '3', isCorrect: true },
          { id: 'd', text: '4', isCorrect: false }
        ]
      },
      {
        id: 'q5_4',
        type: 'multiple_choice',
        title: 'Soru 4: Paralelleri Kesen Doğru',
        prompt: 'İki paralel doğru bir kesenle kesildiğinde, dar açılardan biri 45° dir. Buna göre geniş açılardan birinin ölçüsü kaç derecedir?',
        hint: 'Dar açı + Geniş açı = 180° dir. 180 - 45 = ?',
        explanation: 'Şampiyonsun! 180° - 45° = 135° dir.',
        visualType: 'parallel_transversal',
        visualData: { angle1: 45 },
        options: [
          { id: 'a', text: '135°', isCorrect: true },
          { id: 'b', text: '45°', isCorrect: false },
          { id: 'c', text: '90°', isCorrect: false },
          { id: 'd', text: '145°', isCorrect: false }
        ]
      }
    ]
  }
];
