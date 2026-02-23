import { useState, useEffect, useRef, useCallback } from "react";

const STATIONS = [
  {
    id: 0,
    name: "Турция, Каш с Гоголь Скул",
    subtitle: "",
    dates: "15–27 марта\n4–17 октября",
    emoji: "🎭",
    tarotName: "Колесо Фортуны",
    tarotNumeral: "X",
    tarotMessage: "Колесо поворачивается — и открывает неожиданные встречи, творческие импульсы и перемены, которых ты ждал. Каш станет декорацией, в которой ты будешь главным героем.",
    link: "https://smenastation.com/smenagogolturkey",
    photo: "https://i.imgur.com/ggJfmRE.png",
    promoCode: "MagicKashGS",
  },
  {
    id: 1,
    name: "Вьетнам, Хойан",
    subtitle: "",
    dates: "22 марта – 4 апр.\n14–27 февраля",
    emoji: "🏮",
    tarotName: "Верховная Жрица",
    tarotNumeral: "II",
    tarotMessage: "Жрица хранит тайны интуиции. Тысяча фонарей отражается в тихой воде, а ты прислушиваешься к внутреннему голосу. Хойан откроет то, что ты давно чувствовал, но не решался признать.",
    link: "https://smenastation.com/stationvietnam",
    photo: "https://i.imgur.com/agezT0I.png",
    promoCode: "MagicHoiAn",
  },
  {
    id: 2,
    name: "Грузия, Тбилиси: Музыкальная Смена",
    subtitle: "",
    dates: "5–18 апреля",
    emoji: "🎵",
    tarotName: "Звезда",
    tarotNumeral: "XVII",
    tarotMessage: "Звезда — карта вдохновения и надежды. Тбилиси встретит тебя тёплыми мелодиями, вином и разговорами до рассвета. Здесь ты найдёшь гармонию между внешним миром и внутренним звучанием — а Hot Horist поможет выпустить его наружу: хором, громко и без правил.",
    link: "https://smenastation.com/stationmusic",
    photo: "https://i.imgur.com/6CJN7Om.png",
    promoCode: "MagicTbilisi",
  },
  {
    id: 3,
    name: "Португалия, Албуфейра с Настей Прониной",
    subtitle: "кулинарный заезд",
    dates: "11–25 апреля",
    emoji: "🍳",
    tarotName: "Солнце",
    tarotNumeral: "XIX",
    tarotMessage: "Солнце дарит ясность и радость. Настя Пронина научит готовить так, чтобы удалёнка не убивала качество жизни: система заготовок, свежие продукты с португальских рынков и ужины у океана. Ты вернёшься с новым отношением к еде как к ритуалу — а не к проблеме.",
    link: "https://smenastation.com/stationportugal2026",
    photo: "https://i.imgur.com/MQIazlM.png",
    promoCode: "MagicAlbufeira",
  },
  {
    id: 4,
    name: "Турция, Каш",
    subtitle: "",
    dates: "11–25 апреля",
    emoji: "🌊",
    tarotName: "Умеренность",
    tarotNumeral: "XIV",
    tarotMessage: "Умеренность — карта баланса и потока. Бирюзовая вода Каша научит тебя замедляться и находить золотую середину между работой и наслаждением жизнью.",
    link: "https://smenastation.com/smenaturkey",
    photo: "https://i.imgur.com/y6wYtZJ.png",
    promoCode: "MagicKash",
  },
  {
    id: 5,
    name: "Франция, Париж",
    subtitle: "",
    dates: "1–10 мая",
    emoji: "🗼",
    tarotName: "Императрица",
    tarotNumeral: "III",
    tarotMessage: "Императрица воплощает красоту и изобилие. Париж — это про искусство жить, про то, как наполнять каждый день эстетикой. Здесь ты позволишь себе больше, чем обычно.",
    link: "https://smenastation.com/stationparis",
    photo: "https://i.imgur.com/0URFGuI.png",
    promoCode: "MagicParis",
  },
  {
    id: 6,
    name: "Грузия, Тбилиси: играем в падел",
    subtitle: "",
    dates: "1 мая",
    emoji: "🏓",
    tarotName: "Рыцарь Кубков",
    tarotNumeral: "",
    tarotMessage: "Рыцарь Кубков отправляется в путь, ведомый сердцем. Ракетка в руке, мяч в воздухе, Тбилиси за спиной — здесь азарт игры сплетается с грузинским гостеприимством, и ты возвращаешься домой с новыми друзьями и приятной усталостью в мышцах.",
    link: "https://smenastation.com/stationmusic",
    photo: "https://i.imgur.com/OO0sqaW.png",
    promoCode: "MagicPadel",
  },
  {
    id: 7,
    name: "Италия, Тоскана: Смена Гедонизма",
    subtitle: "",
    dates: "9–23 мая",
    emoji: "🍷",
    tarotName: "Мир",
    tarotNumeral: "XXI",
    tarotMessage: "Мир — карта завершённости и полноты. Тосканские холмы, вино и долгие ужины под звёздами — вселенная говорит, что ты заслужил наслаждение. Прими его.",
    link: "https://smenastation.com/smenatoscana",
    photo: "https://i.imgur.com/dJidzY5.png",
    promoCode: "MagicTuscany",
  },
  {
    id: 8,
    name: "Франция, Нормандия",
    subtitle: "",
    dates: "6–20 июня\n16–30 августа",
    emoji: "🌿",
    tarotName: "Отшельник",
    tarotNumeral: "IX",
    tarotMessage: "Отшельник несёт фонарь мудрости через туман. За дымкой нормандского побережья скрывается тишина, в которой родятся твои лучшие идеи и самые честные ответы.",
    link: "https://smenastation.com/stationnormandy",
    photo: "https://i.imgur.com/az7VoS9.png",
    promoCode: "MagicNormandy",
  },
  {
    id: 9,
    name: "Россия: спортивный заезд",
    subtitle: "",
    dates: "1 июля",
    emoji: "⚽",
    tarotName: "Колесница",
    tarotNumeral: "VII",
    tarotMessage: "Колесница мчится вперёд — ветер в лицо, пульс на максимуме. Лето в разгаре — самое время вытащить тело из-за экрана и напомнить ему, зачем оно нужно. Здесь ты почувствуешь драйв, который разбудит тело и перезарядит голову на весь сезон.",
    link: "https://smenastation.com/smenabaltic",
    photo: "https://i.imgur.com/3SZWKPd.png",
    promoCode: "MagicSport",
  },
  {
    id: 10,
    name: "Грузия, Гудаури",
    subtitle: "",
    dates: "12–25 июля",
    emoji: "⛰️",
    tarotName: "Маг",
    tarotNumeral: "I",
    tarotMessage: "Маг — это чистая воля и потенциал. В горах, где земля касается неба, ты обнаружишь, что у тебя есть всё необходимое. Осталось только решиться.",
    link: "https://smenastation.com/stationgudauri",
    photo: "https://i.imgur.com/iqALClI.png",
    promoCode: "MagicGudauri",
  },
  {
    id: 11,
    name: "Россия, Балтийск",
    subtitle: "",
    dates: "23 авг. – 5 сент.",
    emoji: "✨",
    tarotName: "Сила",
    tarotNumeral: "VIII",
    tarotMessage: "Сила — это то, что накапливается медленно, как янтарь. Балтийское море хранит его тысячелетиями: застывший свет, который никуда не спешит. В конце лета ты приедешь сюда и почувствуешь, что у тебя тоже есть такой стержень — и узнаешь, куда двигаться дальше.",
    link: "https://smenastation.com/smenabaltic",
    photo: "https://i.imgur.com/FsSg3AB.png",
    promoCode: "MagicBaltic",
  },
  {
    id: 12,
    name: "Марокко, Эссуэйра",
    subtitle: "",
    dates: "25 окт. – 7 нояб.",
    emoji: "🏜️",
    tarotName: "Император",
    tarotNumeral: "IV",
    tarotMessage: "Император выстраивает порядок из хаоса. Медины, пустыня и запах специй — Марокко закружит, но не собьёт с пути. Ты научишься держать внутреннюю структуру там, где всё вокруг — лабиринт, и вернёшься с чувством, что можешь управлять чем угодно.",
    link: "https://smenastation.com/",
    photo: "https://i.imgur.com/PCmCB4B.png",
    promoCode: "MagicEssaouira",
  },
  {
    id: 13,
    name: "Таиланд, Чиангмай",
    subtitle: "",
    dates: "1–14 ноября\n24 янв. – 6 февр.",
    emoji: "🙏",
    tarotName: "Влюблённые",
    tarotNumeral: "VI",
    tarotMessage: "Влюблённые — карта связи и выбора. Храмы в утренней дымке, ночные рынки и случайные разговоры, которые меняют судьбу. Чиангмай сведёт тебя с людьми, рядом с которыми захочется быть настоящим.",
    link: "https://smenastation.com/smenatailand",
    photo: "https://i.imgur.com/j6lydEu.png",
    promoCode: "MagicChiangMai",
  },
  {
    id: 14,
    name: "Бали: музыкальный заезд",
    subtitle: "",
    dates: "15–28 ноября",
    emoji: "🎶",
    tarotName: "Жрец",
    tarotNumeral: "V",
    tarotMessage: "Жрец передаёт знание не через слова, а через присутствие. Бали — остров, где музыка встроена в ритм дня: утренние церемонии, вечерние храмы, живой звук повсюду. Здесь ты научишься слышать то, что обычно заглушает шум будней.",
    link: "https://smenastation.com/stationbali2026",
    photo: "https://i.imgur.com/rDL6W51.png",
    promoCode: "MagicBaliMusic",
  },
  {
    id: 15,
    name: "Бали, Сибату",
    subtitle: "",
    dates: "21 февр. – 6 марта",
    emoji: "🌺",
    tarotName: "Королева Кубков",
    tarotNumeral: "",
    tarotMessage: "Королева Кубков — это забота и глубина чувств. Бали обнимет тебя влажным теплом, запахом франжипани и мягким светом. Здесь не нужно ничего доказывать — только позволить себе наполниться и выдохнуть.",
    link: "https://smenastation.com/stationbali2026",
    photo: "https://i.imgur.com/llUaQLl.png",
    promoCode: "MagicBali",
  },
];

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const StarField = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    let w, h, stars = [], af;
    const resize = () => { w = c.width = c.offsetWidth; h = c.height = c.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    for (let i = 0; i < 120; i++) stars.push({ x: Math.random() * 2000, y: Math.random() * 2000, r: Math.random() * 1.5 + 0.3, a: Math.random(), s: Math.random() * 0.008 + 0.003 });
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      stars.forEach(s => {
        s.a += s.s;
        const o = 0.3 + Math.abs(Math.sin(s.a)) * 0.7;
        ctx.beginPath();
        ctx.arc(s.x % w, s.y % h, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${o})`;
        ctx.fill();
      });
      af = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(af); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} />;
};

const CardBack = ({ idx, onClick, hovered, onHover, onLeave, total, isMobile, dealt }) => {
  const angle = isMobile ? 0 : (idx - (total - 1) / 2) * 5;
  const yOff = isMobile ? 0 : Math.abs(idx - (total - 1) / 2) * 4;
  const w = isMobile ? 64 : 72;
  const h = isMobile ? 100 : 112;
  const delay = idx * 0.06;
  return (
    <div
      onClick={dealt ? onClick : undefined}
      onMouseEnter={dealt ? onHover : undefined}
      onMouseLeave={dealt ? onLeave : undefined}
      style={{
        width: w, height: h, borderRadius: 9,
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        border: "1.5px solid rgba(255,255,255,0.15)",
        cursor: dealt ? "pointer" : "default",
        opacity: dealt ? 1 : 0,
        transform: dealt
          ? `rotate(${angle}deg) translateY(${yOff - (hovered ? 14 : 0)}px) scale(${hovered ? 1.1 : 1})`
          : `rotate(0deg) translateY(40px) scale(0.7)`,
        transition: `opacity 0.4s ease ${delay}s, transform 0.5s cubic-bezier(0.4,0,0.2,1) ${dealt ? (hovered !== false ? '0s' : delay + 's') : delay + 's'}, box-shadow 0.3s ease`,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0, position: "relative", overflow: "hidden",
        boxShadow: hovered ? "0 8px 30px rgba(225,93,65,0.15)" : "0 2px 8px rgba(0,0,0,0.3)",
      }}
    >
      <div style={{ position: "absolute", inset: 3, borderRadius: 7, border: "1px solid rgba(255,255,255,0.08)" }} />
      <div style={{ fontSize: isMobile ? 16 : 20, color: "#e15d41", opacity: 0.6 }}>✦</div>
    </div>
  );
};

const ResultCard = ({ station, isMobile }) => {
  const cw = isMobile ? 210 : 240;
  const ch = isMobile ? 330 : 370;
  return (
    <div style={{
      width: cw, height: ch, margin: "0 auto 24px",
      borderRadius: 14, position: "relative", overflow: "hidden",
      border: "1px solid rgba(255,255,255,0.12)",
      background: "#0d1b2a",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        background: station.photo
          ? `url(${station.photo}) center/cover`
          : "linear-gradient(180deg, #1a1a2e 0%, #0d1b2a 100%)",
      }} />
      {station.photo && <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, rgba(10,10,15,0.3) 0%, rgba(10,10,15,0.85) 55%)",
      }} />}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: station.photo ? "flex-end" : "center",
        padding: station.photo ? "20px 16px 24px" : "20px 16px",
        zIndex: 2,
      }}>
        {!station.photo && (
          <>
            <div style={{
              fontSize: 11, letterSpacing: "0.15em", color: "rgba(255,255,255,0.35)",
              marginBottom: 12, textTransform: "uppercase",
            }}>
              {station.tarotNumeral}
            </div>
            <div style={{ fontSize: 48, marginBottom: 16 }}>{station.emoji}</div>
          </>
        )}
        <div style={{
          fontSize: 11, letterSpacing: "0.15em", color: "#e15d41",
          marginBottom: 6, textTransform: "uppercase", fontWeight: 400,
        }}>
          {(station.tarotNumeral ? station.tarotNumeral + " · " : "") + station.tarotName}
        </div>
        <div style={{
          fontSize: 15, fontWeight: 400, color: "#fff",
          letterSpacing: "0.02em", marginBottom: 4, textAlign: "center",
        }}>
          {station.name}
        </div>
        {station.subtitle && (
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 4 }}>
            {station.subtitle}
          </div>
        )}
        <div style={{
          fontSize: 11, color: "rgba(255,255,255,0.35)",
          letterSpacing: "0.05em", textAlign: "center", whiteSpace: "pre-line",
        }}>
          {station.dates}
        </div>
      </div>
      <div style={{
        position: "absolute", inset: 6, borderRadius: 10,
        border: "1px solid rgba(255,255,255,0.06)", pointerEvents: "none", zIndex: 3,
      }} />
    </div>
  );
};

function generateShareImage(station, callback) {
  const W = 1080;
  const H = 1920;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");

  const drawText = (photoH) => {
    ctx.textAlign = "center";
    ctx.fillStyle = "#e15d41";
    ctx.font = "600 26px 'Segoe UI', system-ui, sans-serif";
    const tarotLabel = ((station.tarotNumeral ? station.tarotNumeral + " · " : "") + station.tarotName).toUpperCase();
    ctx.fillText(tarotLabel, W / 2, photoH + 70);

    ctx.fillStyle = "#ffffff";
    ctx.font = "400 46px 'Segoe UI', system-ui, sans-serif";
    ctx.fillText(station.name, W / 2, photoH + 140);

    ctx.fillStyle = "rgba(255,255,255,0.4)";
    ctx.font = "300 26px 'Segoe UI', system-ui, sans-serif";
    const dateLines = station.dates.split("\n");
    dateLines.forEach((line, i) => {
      ctx.fillText(line, W / 2, photoH + 190 + i * 38);
    });

    ctx.fillStyle = "rgba(255,255,255,0.55)";
    ctx.font = "italic 300 26px 'Segoe UI', system-ui, sans-serif";
    const msgY = photoH + 190 + dateLines.length * 38 + 50;
    const maxW = W - 140;
    const words = station.tarotMessage.split(" ");
    let line = "";
    let lineY = msgY;
    words.forEach((word) => {
      const test = line + (line ? " " : "") + word;
      if (ctx.measureText(test).width > maxW && line) {
        ctx.fillText(line, W / 2, lineY);
        line = word;
        lineY += 38;
      } else {
        line = test;
      }
    });
    if (line) ctx.fillText(line, W / 2, lineY);

    ctx.fillStyle = "rgba(255,255,255,0.2)";
    ctx.font = "300 20px 'Segoe UI', system-ui, sans-serif";
    ctx.fillText("Таро Смены · smenastation.com", W / 2, H - 50);

    ctx.fillStyle = "rgba(225,93,65,0.3)";
    ctx.font = "48px sans-serif";
    ctx.fillText("✦", 70, 70);
    ctx.fillText("✦", W - 70, H - 80);
  };

  const finish = () => {
    try {
      canvas.toBlob((blob) => { if (blob) callback(blob); else callback(null); }, "image/png");
    } catch (e) {
      callback(null);
    }
  };

  const drawWithPhoto = (img) => {
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, "#0d1b2a");
    grad.addColorStop(1, "#0a0a0f");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    const photoH = 760;
    const aspect = img.width / img.height;
    let sw = W, sh = photoH;
    if (aspect > W / photoH) { sh = photoH; sw = sh * aspect; }
    else { sw = W; sh = sw / aspect; }
    ctx.drawImage(img, (W - sw) / 2, 0, sw, sh);
    const overlay = ctx.createLinearGradient(0, photoH * 0.3, 0, photoH);
    overlay.addColorStop(0, "rgba(10,10,15,0)");
    overlay.addColorStop(1, "rgba(10,10,15,0.95)");
    ctx.fillStyle = overlay;
    ctx.fillRect(0, 0, W, photoH);

    drawText(photoH);
    finish();
  };

  const drawWithoutPhoto = () => {
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, "#0d1b2a");
    grad.addColorStop(1, "#0a0a0f");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Decorative emoji in place of photo
    ctx.textAlign = "center";
    ctx.font = "140px sans-serif";
    ctx.fillText(station.emoji, W / 2, 440);
    if (station.tarotNumeral) {
      ctx.fillStyle = "rgba(255,255,255,0.15)";
      ctx.font = "300 42px 'Segoe UI', system-ui, sans-serif";
      ctx.fillText(station.tarotNumeral, W / 2, 540);
    }

    drawText(680);
    finish();
  };

  if (station.photo) {
    // Try loading via fetch + blob to bypass CORS tainted canvas
    fetch(station.photo, { mode: "cors" })
      .then(r => { if (!r.ok) throw new Error("fetch failed"); return r.blob(); })
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const img = new Image();
        img.onload = () => { drawWithPhoto(img); URL.revokeObjectURL(url); };
        img.onerror = () => { URL.revokeObjectURL(url); drawWithoutPhoto(); };
        img.src = url;
      })
      .catch(() => {
        // Fallback: try Image with crossOrigin
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          try { drawWithPhoto(img); }
          catch (e) { drawWithoutPhoto(); }
        };
        img.onerror = () => drawWithoutPhoto();
        img.src = station.photo;
      });
  } else {
    drawWithoutPhoto();
  }
}

const DownloadIcon = ({ onClick, downloading, isMobile }) => (
  <button
    onClick={onClick}
    aria-label="Скачать картинку"
    style={{
      background: "transparent", border: "none", cursor: downloading ? "default" : "pointer",
      padding: 6, display: "flex", alignItems: "center", justifyContent: "center",
      opacity: downloading ? 0.3 : 0.45,
      transition: "opacity 0.2s",
      pointerEvents: downloading ? "none" : "auto",
    }}
    onMouseEnter={e => { if (!downloading) e.currentTarget.style.opacity = 1; }}
    onMouseLeave={e => { if (!downloading) e.currentTarget.style.opacity = 0.45; }}
  >
    <svg width={isMobile ? 22 : 24} height={isMobile ? 22 : 24} viewBox="0 0 20 20" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="14" height="14" rx="2" />
      <line x1="10" y1="7" x2="10" y2="13" />
      <polyline points="7,11 10,14 13,11" />
    </svg>
  </button>
);

export default function App() {
  const [phase, setPhase] = useState("intro");
  const [hovered, setHovered] = useState(-1);
  const [chosen, setChosen] = useState(null);
  const [introFade, setIntroFade] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [shuffled, setShuffled] = useState(() => shuffleArray(STATIONS));
  const [downloading, setDownloading] = useState(false);
  const [dealt, setDealt] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 600);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleStart = () => {
    setIntroFade(true);
    setDealt(false);
    setTimeout(() => {
      setPhase("spread");
      requestAnimationFrame(() => setDealt(true));
    }, 550);
  };

  const handlePick = (station) => {
    setChosen(station);
    setPhase("flip");
    setTimeout(() => setPhase("result"), 1300);
  };

  const handleRetry = () => {
    setChosen(null);
    setHovered(-1);
    setDealt(false);
    setShuffled(shuffleArray(STATIONS));
    setPhase("spread");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setDealt(true));
    });
  };

  const handleDownload = useCallback(() => {
    if (!chosen || downloading) return;
    setDownloading(true);
    generateShareImage(chosen, (blob) => {
      setDownloading(false);
      if (!blob) {
        alert("Не удалось создать картинку. Попробуй сделать скриншот экрана.");
        return;
      }
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `tarot-smena-${chosen.tarotName.replace(/\s/g, "-")}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 3000);
    });
  }, [chosen, downloading]);

  const showDownload = phase === "result" && chosen;

  return (
    <div style={{
      minHeight: "100vh", background: "#0a0a0f", color: "#fff",
      fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
      position: "relative", overflow: "hidden",
      display: "flex", flexDirection: "column",
    }}>
      <StarField />

      {/* Header */}
      <div style={{
        position: "relative", zIndex: 10, padding: isMobile ? "14px 16px" : "20px 24px",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <span style={{
          fontSize: isMobile ? 13 : 14, fontWeight: 400,
          letterSpacing: "0.15em", textTransform: "uppercase",
          color: "rgba(255,255,255,0.5)",
        }}>
          Станция Смена
        </span>

      </div>

      {/* Main */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        position: "relative", zIndex: 10,
        padding: isMobile ? "0 16px 32px" : "0 20px 40px",
      }}>

        {/* INTRO */}
        {phase === "intro" && (
          <div style={{
            textAlign: "center", maxWidth: 480,
            opacity: introFade ? 0 : 1,
            transform: introFade ? "translateY(-20px)" : "none",
            transition: "all 0.5s ease",
            padding: "0 8px",
          }}>
            <div style={{ fontSize: isMobile ? 44 : 56, marginBottom: 16, color: "#e15d41" }}>✦</div>
            <h1 style={{
              fontSize: isMobile ? 24 : 30, fontWeight: 300,
              letterSpacing: "0.02em", marginBottom: 12, lineHeight: 1.3,
            }}>
              Таро Смены
            </h1>
            <p style={{
              fontSize: isMobile ? 13 : 15, color: "rgba(255,255,255,0.5)",
              lineHeight: 1.6, marginBottom: 32, fontWeight: 300,
            }}>
              Вселенная уже знает, какая станция ждёт тебя в этом сезоне.
              <br />Вытяни карту и узнай свою судьбу.
            </p>
            <button
              onClick={handleStart}
              style={{
                background: "transparent", color: "#fff",
                border: "1px solid rgba(255,255,255,0.3)",
                padding: isMobile ? "11px 32px" : "13px 44px",
                fontSize: isMobile ? 13 : 14,
                letterSpacing: "0.1em", textTransform: "uppercase",
                cursor: "pointer", borderRadius: 0, fontWeight: 300,
                transition: "all 0.3s ease",
              }}
              onMouseEnter={e => { e.target.style.background = "rgba(255,255,255,0.08)"; e.target.style.borderColor = "rgba(255,255,255,0.6)"; }}
              onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.borderColor = "rgba(255,255,255,0.3)"; }}
            >
              Довериться Вселенной
            </button>
          </div>
        )}

        {/* SPREAD */}
        {phase === "spread" && (
          <div style={{
            textAlign: "center", width: "100%",
            maxWidth: isMobile ? 380 : 700,
            animation: "fadeIn 0.6s ease both",
          }}>
            <p style={{
              fontSize: isMobile ? 13 : 15, color: "rgba(255,255,255,0.5)",
              marginBottom: isMobile ? 16 : 28, fontWeight: 300, letterSpacing: "0.05em",
            }}>
              Выбери свою карту
            </p>
            <div style={{
              display: "flex", justifyContent: "center",
              gap: isMobile ? 5 : 6,
              flexWrap: "wrap",
              padding: isMobile ? "4px 0" : "16px 0",
            }}>
              {shuffled.map((s, i) => (
                <CardBack
                  key={s.id} idx={i} total={shuffled.length}
                  onClick={() => handlePick(s)}
                  hovered={hovered === i}
                  onHover={() => setHovered(i)}
                  onLeave={() => setHovered(-1)}
                  isMobile={isMobile}
                  dealt={dealt}
                />
              ))}
            </div>
          </div>
        )}

        {/* FLIPPING */}
        {phase === "flip" && (
          <div style={{ textAlign: "center", animation: "fadeIn 0.3s ease" }}>
            <div style={{
              width: isMobile ? 170 : 200,
              height: isMobile ? 270 : 310,
              margin: "0 auto", perspective: 800,
            }}>
              <div style={{
                width: "100%", height: "100%",
                animation: "flipCard 1.2s ease forwards",
                transformStyle: "preserve-3d", position: "relative",
              }}>
                <div style={{
                  position: "absolute", inset: 0, backfaceVisibility: "hidden",
                  background: "linear-gradient(135deg, #1a1a2e, #0f3460)",
                  borderRadius: 14, border: "1.5px solid rgba(255,255,255,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <div style={{ fontSize: 40, color: "#e15d41", opacity: 0.6 }}>✦</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* RESULT */}
        {phase === "result" && chosen && (
          <div style={{
            textAlign: "center", maxWidth: isMobile ? 340 : 480,
            animation: "fadeIn 0.8s ease both", padding: "0 4px",
          }}>
            <ResultCard station={chosen} isMobile={isMobile} />

            <p style={{
              fontSize: isMobile ? 13 : 15,
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.7, fontWeight: 300, fontStyle: "italic",
              maxWidth: 380, margin: "0 auto 20px",
            }}>
              {chosen.tarotMessage}
            </p>

            {/* ── Compact promo (two lines) ── */}
            <div style={{
              margin: "0 auto 24px", maxWidth: 380,
              lineHeight: 1.65, textAlign: "center",
            }}>
              <span style={{ fontSize: isMobile ? 13 : 14, color: "rgba(255,255,255,0.55)" }}>
                {"По промокоду "}
              </span>
              <span style={{ fontSize: isMobile ? 13 : 14, color: "#e15d41", fontWeight: 500 }}>
                {chosen.promoCode}
              </span>
              <span style={{ fontSize: isMobile ? 13 : 14, color: "rgba(255,255,255,0.55)" }}>
                {" –50$"}
              </span>
              <br />
              <span style={{ fontSize: isMobile ? 12 : 13, color: "rgba(255,255,255,0.35)" }}>
                скажи его на звонке-знакомстве
              </span>
            </div>

            {/* ── Action buttons ── */}
            <div style={{
              display: "flex", gap: 12, justifyContent: "center",
              flexWrap: "wrap", marginBottom: 16,
            }}>
              <a
                href={chosen.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "#e15d41", color: "#fff",
                  padding: isMobile ? "10px 24px" : "12px 30px",
                  fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase",
                  textDecoration: "none", fontWeight: 400,
                  transition: "opacity 0.3s",
                }}
                onMouseEnter={e => e.target.style.opacity = 0.85}
                onMouseLeave={e => e.target.style.opacity = 1}
              >
                Узнать больше
              </a>
              <button
                onClick={handleRetry}
                style={{
                  background: "transparent", color: "rgba(255,255,255,0.5)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  padding: isMobile ? "10px 24px" : "12px 30px",
                  fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase",
                  cursor: "pointer", fontWeight: 300, transition: "all 0.3s",
                }}
                onMouseEnter={e => { e.target.style.color = "#fff"; e.target.style.borderColor = "rgba(255,255,255,0.4)"; }}
                onMouseLeave={e => { e.target.style.color = "rgba(255,255,255,0.5)"; e.target.style.borderColor = "rgba(255,255,255,0.15)"; }}
              >
                Другая карта
              </button>
            </div>

            {/* ── Share hint + download ── */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              gap: 8, margin: 0,
            }}>
              <p style={{
                fontSize: 11, color: "rgba(255,255,255,0.25)",
                margin: 0,
              }}>
                Поделись результатом — узнай, какая карта выпадет друзьям ✦
              </p>
              <DownloadIcon onClick={handleDownload} downloading={downloading} isMobile={isMobile} />
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{
        position: "relative", zIndex: 10,
        textAlign: "center", padding: 16,
        fontSize: 11, color: "rgba(255,255,255,0.2)",
        letterSpacing: "0.05em",
      }}>
        Сезон 2026–2027 · smenastation.com
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes flipCard {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(180deg); }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>
    </div>
  );
}
