const TOTAL_RABBITS = 50;
const INITIAL_PER_COLOR = TOTAL_RABBITS / 2;
const GAME_SECONDS = 30;
const FOX_WIDTH = 150;
const RABBIT_WIDTH = 66;
const BITE_RADIUS = 22;
const ESCAPE_DURATION = 0.7;

const gameCanvas = document.getElementById("gameCanvas");
const gameCtx = gameCanvas.getContext("2d");
const lightChart = document.getElementById("lightChart");
const darkChart = document.getElementById("darkChart");
const lightChartCtx = lightChart.getContext("2d");
const darkChartCtx = darkChart.getContext("2d");

const timerEl = document.getElementById("timer");
const caughtEl = document.getElementById("caught");
const lightCountEl = document.getElementById("lightCount");
const darkCountEl = document.getElementById("darkCount");
const messageEl = document.getElementById("message");
const interpretationEl = document.getElementById("interpretation");
const newGameButton = document.getElementById("newGameButton");
const pauseButton = document.getElementById("pauseButton");
const languageSelect = document.getElementById("languageSelect");
const closeCredit = document.getElementById("closeCredit");
const creditBanner = document.getElementById("creditBanner");
const startPanel = document.getElementById("startPanel");
const startButton = document.getElementById("startButton");
const endPanel = document.getElementById("endPanel");
const endConclusion = document.getElementById("endConclusion");
const endSummary = document.getElementById("endSummary");
const endMetrics = document.getElementById("endMetrics");
const endReason = document.getElementById("endReason");
const environmentInputs = [...document.querySelectorAll("input[name='environment']")];
const difficultyInputs = [...document.querySelectorAll("input[name='difficulty']")];
const lightChartTitle = document.getElementById("lightChartTitle");
const darkChartTitle = document.getElementById("darkChartTitle");

const difficultySettings = {
  easy: { speedMin: 38, speedMax: 68, escapeMin: 4.5, escapeMax: 9.5 },
  medium: { speedMin: 48, speedMax: 88, escapeMin: 3.2, escapeMax: 8.5 },
  hard: { speedMin: 64, speedMax: 112, escapeMin: 2.3, escapeMax: 6.2 },
};

const translations = {
  es: {
    docTitle: "Selección natural: conejos y zorros",
    eyebrow: "Simulador educativo",
    title: "Selección natural: conejos y zorros",
    subtitle: "Mueve el zorro y haz clic solo cuando su boca esté sobre un conejo para cazarlo.",
    language: "Idioma",
    newGame: "Nuevo juego",
    pause: "Pausa",
    close: "Cerrar",
    resume: "Continuar",
    environment: "Ambiente",
    lightEnv: "Claro",
    darkEnv: "Oscuro",
    difficulty: "Nivel",
    easy: "Fácil",
    medium: "Medio",
    hard: "Difícil",
    time: "Tiempo",
    caught: "Cazados",
    initial: "Inicial",
    result: "Resultado",
    lightRabbits: "Conejos claros",
    darkRabbits: "Conejos oscuros",
    remaining: "restantes",
    reportKicker: "Reporte final",
    complete: "Simulación completa",
    readyKicker: "Antes de comenzar",
    readyTitle: "Iniciar simulación",
    readyText: "El zorro solo caza cuando su boca está exactamente sobre un conejo y haces clic. Los conejos pueden escapar y reaparecer en otra parte.",
    startSimulation: "Iniciar simulación",
    prompt: "Ubica la boca del zorro sobre un conejo y haz clic para cazar.",
    missed: "Aún no hay un conejo justo en la boca del zorro.",
    caughtOne: "Conejo cazado.",
    paused: "Simulación en pausa.",
    lightMessage: "Ambiente claro: los conejos claros se camuflan mejor.",
    darkMessage: "Ambiente oscuro: los conejos oscuros se camuflan mejor.",
    equal: "Al iniciar, ambos grupos tienen la misma población.",
    lightBetter: "Los conejos claros están sobreviviendo mejor.",
    darkBetter: "Los conejos oscuros están sobreviviendo mejor.",
    chartLight: "Población de conejos claros",
    chartDark: "Población de conejos oscuros",
    percent: "Porcentaje",
    seconds: "Tiempo (segundos)",
    metricEaten: "Conejos cazados",
    metricLight: "Claros restantes",
    metricDark: "Oscuros restantes",
    reportSummary: ({ eaten, environmentName, lightPct, darkPct, light, dark }) =>
      `El zorro cazó ${eaten} conejos durante la simulación. La población inicial fue 50% de conejos claros y 50% de conejos oscuros en un ambiente ${environmentName}. Al finalizar, la población sobreviviente quedó en ${lightPct}% claros y ${darkPct}% oscuros: ${light} conejos claros y ${dark} conejos oscuros.`,
    reportReason: ({ visible, camouflaged, moreEaten }) =>
      `La presión de depredación favoreció a los conejos ${camouflaged}, porque se confundieron mejor con el fondo. Como los conejos ${visible} eran más visibles, el zorro ${moreEaten}.`,
    conclusionFavored: ({ favored }) => `Conclusión: el ambiente favoreció a los conejos ${favored}.`,
    conclusionEqual: "Conclusión: el ambiente no favoreció claramente a un color; ambos grupos quedaron equilibrados.",
    lightName: "claro",
    darkName: "oscuro",
    lightPlural: "claros",
    darkPlural: "oscuros",
    sameEaten: "cazó cantidades similares de ambos grupos",
    moreLight: "cazó más conejos claros",
    moreDark: "cazó más conejos oscuros",
  },
  fr: {
    docTitle: "Sélection naturelle : lapins et renards",
    eyebrow: "Simulateur éducatif",
    title: "Sélection naturelle : lapins et renards",
    subtitle: "Déplacez le renard et cliquez seulement quand sa bouche est sur un lapin.",
    language: "Langue",
    newGame: "Nouvelle partie",
    pause: "Pause",
    close: "Fermer",
    resume: "Reprendre",
    environment: "Environnement",
    lightEnv: "Clair",
    darkEnv: "Sombre",
    difficulty: "Niveau",
    easy: "Facile",
    medium: "Moyen",
    hard: "Difficile",
    time: "Temps",
    caught: "Capturés",
    initial: "Initial",
    result: "Résultat",
    lightRabbits: "Lapins clairs",
    darkRabbits: "Lapins sombres",
    remaining: "restants",
    reportKicker: "Rapport final",
    complete: "Simulation terminée",
    readyKicker: "Avant de commencer",
    readyTitle: "Démarrer la simulation",
    readyText: "Le renard capture un lapin seulement quand sa bouche est exactement sur le lapin et que vous cliquez. Les lapins peuvent s'échapper et réapparaître ailleurs.",
    startSimulation: "Démarrer la simulation",
    prompt: "Placez la bouche du renard sur un lapin, puis cliquez pour le capturer.",
    missed: "Aucun lapin n'est exactement dans la bouche du renard.",
    caughtOne: "Lapin capturé.",
    paused: "Simulation en pause.",
    lightMessage: "Environnement clair : les lapins clairs sont mieux camouflés.",
    darkMessage: "Environnement sombre : les lapins sombres sont mieux camouflés.",
    equal: "Au départ, les deux groupes ont la même population.",
    lightBetter: "Les lapins clairs survivent mieux.",
    darkBetter: "Les lapins sombres survivent mieux.",
    chartLight: "Population de lapins clairs",
    chartDark: "Population de lapins sombres",
    percent: "Pourcentage",
    seconds: "Temps (secondes)",
    metricEaten: "Lapins capturés",
    metricLight: "Clairs restants",
    metricDark: "Sombres restants",
    reportSummary: ({ eaten, environmentName, lightPct, darkPct, light, dark }) =>
      `Le renard a capturé ${eaten} lapins pendant la simulation. La population initiale était composée de 50 % de lapins clairs et de 50 % de lapins sombres dans un environnement ${environmentName}. À la fin, la population survivante est de ${lightPct} % de lapins clairs et ${darkPct} % de lapins sombres : ${light} lapins clairs et ${dark} lapins sombres.`,
    reportReason: ({ visible, camouflaged, moreEaten }) =>
      `La pression de prédation a favorisé les lapins ${camouflaged}, car ils se confondaient mieux avec le fond. Les lapins ${visible} étant plus visibles, le renard ${moreEaten}.`,
    conclusionFavored: ({ favored }) => `Conclusion : l'environnement a favorisé les lapins ${favored}.`,
    conclusionEqual: "Conclusion : l'environnement n'a pas clairement favorisé une couleur; les deux groupes sont restés équilibrés.",
    lightName: "clair",
    darkName: "sombre",
    lightPlural: "clairs",
    darkPlural: "sombres",
    sameEaten: "a capturé des quantités similaires dans les deux groupes",
    moreLight: "a capturé plus de lapins clairs",
    moreDark: "a capturé plus de lapins sombres",
  },
  en: {
    docTitle: "Natural selection: rabbits and foxes",
    eyebrow: "Educational simulator",
    title: "Natural selection: rabbits and foxes",
    subtitle: "Move the fox and click only when its mouth is over a rabbit to catch it.",
    language: "Language",
    newGame: "New game",
    pause: "Pause",
    close: "Close",
    resume: "Resume",
    environment: "Environment",
    lightEnv: "Light",
    darkEnv: "Dark",
    difficulty: "Level",
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
    time: "Time",
    caught: "Caught",
    initial: "Initial",
    result: "Result",
    lightRabbits: "Light rabbits",
    darkRabbits: "Dark rabbits",
    remaining: "remaining",
    reportKicker: "Final report",
    complete: "Simulation complete",
    readyKicker: "Before you begin",
    readyTitle: "Start simulation",
    readyText: "The fox only catches a rabbit when its mouth is exactly over the rabbit and you click. Rabbits can escape and reappear somewhere else.",
    startSimulation: "Start simulation",
    prompt: "Place the fox's mouth over a rabbit, then click to catch it.",
    missed: "There is no rabbit directly at the fox's mouth yet.",
    caughtOne: "Rabbit caught.",
    paused: "Simulation paused.",
    lightMessage: "Light environment: light rabbits are better camouflaged.",
    darkMessage: "Dark environment: dark rabbits are better camouflaged.",
    equal: "At the start, both groups have the same population.",
    lightBetter: "Light rabbits are surviving better.",
    darkBetter: "Dark rabbits are surviving better.",
    chartLight: "Light rabbit population",
    chartDark: "Dark rabbit population",
    percent: "Percent",
    seconds: "Time (seconds)",
    metricEaten: "Rabbits caught",
    metricLight: "Light remaining",
    metricDark: "Dark remaining",
    reportSummary: ({ eaten, environmentName, lightPct, darkPct, light, dark }) =>
      `The fox caught ${eaten} rabbits during the simulation. The initial population was 50% light rabbits and 50% dark rabbits in a ${environmentName} environment. At the end, the surviving population was ${lightPct}% light and ${darkPct}% dark: ${light} light rabbits and ${dark} dark rabbits.`,
    reportReason: ({ visible, camouflaged, moreEaten }) =>
      `Predation pressure favored the ${camouflaged} rabbits because they blended into the background more effectively. Since the ${visible} rabbits were easier to see, the fox ${moreEaten}.`,
    conclusionFavored: ({ favored }) => `Conclusion: the environment favored the ${favored} rabbits.`,
    conclusionEqual: "Conclusion: the environment did not clearly favor one color; both groups remained balanced.",
    lightName: "light",
    darkName: "dark",
    lightPlural: "light",
    darkPlural: "dark",
    sameEaten: "caught similar numbers from both groups",
    moreLight: "caught more light rabbits",
    moreDark: "caught more dark rabbits",
  },
  zh: {
    docTitle: "自然选择：兔子与狐狸",
    eyebrow: "教育模拟器",
    title: "自然选择：兔子与狐狸",
    subtitle: "移动狐狸，只有当狐狸的嘴对准兔子时点击，才会捕食。",
    language: "语言",
    newGame: "新游戏",
    pause: "暂停",
    close: "关闭",
    resume: "继续",
    environment: "环境",
    lightEnv: "浅色",
    darkEnv: "深色",
    difficulty: "难度",
    easy: "简单",
    medium: "中等",
    hard: "困难",
    time: "时间",
    caught: "捕食",
    initial: "初始",
    result: "结果",
    lightRabbits: "浅色兔子",
    darkRabbits: "深色兔子",
    remaining: "剩余",
    reportKicker: "最终报告",
    complete: "模拟完成",
    readyKicker: "开始之前",
    readyTitle: "开始模拟",
    readyText: "只有当狐狸的嘴正好对准兔子并点击时，狐狸才会捕食。兔子可能会逃跑并在其他位置重新出现。",
    startSimulation: "开始模拟",
    prompt: "把狐狸的嘴对准兔子，然后点击捕食。",
    missed: "狐狸的嘴还没有对准兔子。",
    caughtOne: "捕到一只兔子。",
    paused: "模拟已暂停。",
    lightMessage: "浅色环境：浅色兔子伪装更好。",
    darkMessage: "深色环境：深色兔子伪装更好。",
    equal: "开始时，两个群体数量相同。",
    lightBetter: "浅色兔子的存活情况更好。",
    darkBetter: "深色兔子的存活情况更好。",
    chartLight: "浅色兔子种群",
    chartDark: "深色兔子种群",
    percent: "百分比",
    seconds: "时间（秒）",
    metricEaten: "捕食兔子",
    metricLight: "浅色剩余",
    metricDark: "深色剩余",
    reportSummary: ({ eaten, environmentName, lightPct, darkPct, light, dark }) =>
      `本次模拟中，狐狸捕食了 ${eaten} 只兔子。初始种群为 50% 浅色兔子和 50% 深色兔子，环境为${environmentName}。结束时，存活种群为 ${lightPct}% 浅色和 ${darkPct}% 深色：浅色兔子 ${light} 只，深色兔子 ${dark} 只。`,
    reportReason: ({ visible, camouflaged, moreEaten }) =>
      `捕食压力更有利于${camouflaged}兔子，因为它们与背景融合得更好。由于${visible}兔子更容易被发现，狐狸${moreEaten}。`,
    conclusionFavored: ({ favored }) => `结论：环境有利于${favored}兔子。`,
    conclusionEqual: "结论：环境没有明显有利于某一种颜色；两个群体保持相对平衡。",
    lightName: "浅色",
    darkName: "深色",
    lightPlural: "浅色",
    darkPlural: "深色",
    sameEaten: "捕食了数量相近的两个群体",
    moreLight: "捕食了更多浅色兔子",
    moreDark: "捕食了更多深色兔子",
  },
};

const imageSources = {
  fox: "assets/fox.png",
  rabbitLight: "assets/rabbit-light.png",
  rabbitDark: "assets/rabbit-dark.png",
  backgroundLight: "assets/background-light.png",
  backgroundDark: "assets/background-dark.png",
};

const images = Object.fromEntries(
  Object.entries(imageSources).map(([key, src]) => {
    const image = new Image();
    image.src = src;
    image.addEventListener("load", () => drawGame());
    return [key, image];
  })
);

let currentLanguage = "es";
let rabbits = [];
let fox = { x: gameCanvas.width / 2, y: gameCanvas.height / 2, radius: 34 };
let environment = "light";
let difficulty = "medium";
let startedAt = 0;
let pausedAt = 0;
let pausedTotal = 0;
let isPaused = false;
let isOver = false;
let hasStarted = false;
let history = [];
let lastFrame = 0;
let foxRunPhase = 0;
let foxMotion = 0;
let audioContext = null;

function t(key) {
  return translations[currentLanguage][key];
}

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function createRabbit(color, index) {
  const angle = randomBetween(0, Math.PI * 2);
  const settings = difficultySettings[difficulty];
  const speed = randomBetween(settings.speedMin, settings.speedMax);
  return {
    id: `${color}-${index}`,
    color,
    x: randomBetween(58, gameCanvas.width - 58),
    y: randomBetween(58, gameCanvas.height - 58),
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    radius: 21,
    hopPhase: randomBetween(0, Math.PI * 2),
    escapeTimer: randomBetween(settings.escapeMin, settings.escapeMax),
    escapePhase: 0,
    escaping: false,
    relocated: false,
    alive: true,
  };
}

function resetRabbitEscape(rabbit) {
  const settings = difficultySettings[difficulty];
  rabbit.escapeTimer = randomBetween(settings.escapeMin, settings.escapeMax);
  rabbit.escapePhase = 0;
  rabbit.escaping = false;
  rabbit.relocated = false;
}

function relocateRabbit(rabbit) {
  rabbit.x = randomBetween(58, gameCanvas.width - 58);
  rabbit.y = randomBetween(58, gameCanvas.height - 58);
  const settings = difficultySettings[difficulty];
  const speed = randomBetween(settings.speedMin, settings.speedMax + 4);
  const angle = randomBetween(0, Math.PI * 2);
  rabbit.vx = Math.cos(angle) * speed;
  rabbit.vy = Math.sin(angle) * speed;
}

function resetGame() {
  rabbits = [];
  for (let i = 0; i < INITIAL_PER_COLOR; i += 1) {
    rabbits.push(createRabbit("light", i));
    rabbits.push(createRabbit("dark", i));
  }

  fox = { x: gameCanvas.width / 2, y: gameCanvas.height / 2, radius: 34 };
  startedAt = performance.now();
  pausedAt = 0;
  pausedTotal = 0;
  isPaused = false;
  isOver = false;
  hasStarted = false;
  history = [{ second: 0, light: INITIAL_PER_COLOR, dark: INITIAL_PER_COLOR }];
  lastFrame = startedAt;
  foxRunPhase = 0;
  foxMotion = 0;
  endPanel.hidden = true;
  startPanel.hidden = false;
  gameCanvas.hidden = false;
  messageEl.hidden = false;
  messageEl.textContent = t("prompt");
  applyLanguage();
  updateHud(performance.now());
  drawCharts();
}

function startSimulation() {
  if (hasStarted) return;
  unlockAudio();
  hasStarted = true;
  isPaused = false;
  startedAt = performance.now();
  pausedAt = 0;
  pausedTotal = 0;
  lastFrame = startedAt;
  startPanel.hidden = true;
  messageEl.textContent = t("prompt");
  applyLanguage();
}

function getElapsedSeconds(now) {
  if (!hasStarted) return 0;
  if (isPaused) {
    return Math.floor((pausedAt - startedAt - pausedTotal) / 1000);
  }
  return Math.floor((now - startedAt - pausedTotal) / 1000);
}

function getRemainingSeconds(now) {
  return Math.max(0, GAME_SECONDS - getElapsedSeconds(now));
}

function updateHud(now) {
  const remaining = getRemainingSeconds(now || performance.now());
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  timerEl.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  const counts = getCounts();
  const caught = TOTAL_RABBITS - counts.light - counts.dark;
  caughtEl.textContent = caught;
  lightCountEl.textContent = counts.light;
  darkCountEl.textContent = counts.dark;

  const totalRemaining = Math.max(1, counts.light + counts.dark);
  const lightPct = Math.round((counts.light / totalRemaining) * 100);
  const darkPct = 100 - lightPct;
  lightChartTitle.textContent = `${t("chartLight")}: ${lightPct}%`;
  darkChartTitle.textContent = `${t("chartDark")}: ${darkPct}%`;

  if (counts.light === counts.dark) {
    interpretationEl.textContent = t("equal");
  } else if (counts.light > counts.dark) {
    interpretationEl.textContent = t("lightBetter");
  } else {
    interpretationEl.textContent = t("darkBetter");
  }
}

function getCounts() {
  return rabbits.reduce(
    (acc, rabbit) => {
      if (!rabbit.alive) return acc;
      acc[rabbit.color] += 1;
      return acc;
    },
    { light: 0, dark: 0 }
  );
}

function recordHistory(second) {
  const previous = history[history.length - 1];
  if (previous && previous.second === second) return;
  const counts = getCounts();
  history.push({ second, light: counts.light, dark: counts.dark });
}

function setFoxPosition(clientX, clientY) {
  const rect = gameCanvas.getBoundingClientRect();
  const scaleX = gameCanvas.width / rect.width;
  const scaleY = gameCanvas.height / rect.height;
  const nextX = clamp((clientX - rect.left) * scaleX, FOX_WIDTH / 2 + 4, gameCanvas.width - FOX_WIDTH / 2 - 4);
  const foxHeight = getFoxHeight();
  const nextY = clamp((clientY - rect.top) * scaleY, foxHeight / 2 + 4, gameCanvas.height - foxHeight / 2 - 4);
  foxMotion = clamp(Math.hypot(nextX - fox.x, nextY - fox.y) * 0.08, 0, 1);
  fox.x = nextX;
  fox.y = nextY;
}

function getFoxHeight() {
  const sprite = images.fox;
  return sprite.complete && sprite.naturalWidth ? FOX_WIDTH * (sprite.naturalHeight / sprite.naturalWidth) : 68;
}

function getMouthPoint() {
  const height = getFoxHeight();
  return {
    x: fox.x + FOX_WIDTH * 0.41,
    y: fox.y - height * 0.08,
  };
}

function moveRabbits(delta) {
  for (const rabbit of rabbits) {
    if (!rabbit.alive) continue;

    if (rabbit.escaping) {
      rabbit.escapePhase += delta;
      if (!rabbit.relocated && rabbit.escapePhase >= ESCAPE_DURATION / 2) {
        relocateRabbit(rabbit);
        rabbit.relocated = true;
      }
      if (rabbit.escapePhase >= ESCAPE_DURATION) {
        resetRabbitEscape(rabbit);
      }
      continue;
    }

    rabbit.escapeTimer -= delta;
    if (rabbit.escapeTimer <= 0) {
      rabbit.escaping = true;
      rabbit.escapePhase = 0;
      rabbit.relocated = false;
      continue;
    }

    rabbit.hopPhase += delta * 13;
    rabbit.x += rabbit.vx * delta;
    rabbit.y += rabbit.vy * delta;

    if (rabbit.x < 30 || rabbit.x > gameCanvas.width - 30) {
      rabbit.vx *= -1;
      rabbit.x = clamp(rabbit.x, 30, gameCanvas.width - 30);
    }
    if (rabbit.y < 30 || rabbit.y > gameCanvas.height - 30) {
      rabbit.vy *= -1;
      rabbit.y = clamp(rabbit.y, 30, gameCanvas.height - 30);
    }

    if (Math.random() < 0.01) {
      const turn = randomBetween(-0.9, 0.9);
      const speed = Math.hypot(rabbit.vx, rabbit.vy);
      const angle = Math.atan2(rabbit.vy, rabbit.vx) + turn;
      rabbit.vx = Math.cos(angle) * speed;
      rabbit.vy = Math.sin(angle) * speed;
    }
  }
}

function tryCatchAtMouth() {
  if (!hasStarted || isPaused || isOver) return;
  const mouth = getMouthPoint();
  let target = null;
  let closestDistance = Infinity;

  for (const rabbit of rabbits) {
    if (!rabbit.alive) continue;
    if (rabbit.escaping && getEscapeAlpha(rabbit) < 0.7) continue;
    const distance = Math.hypot(rabbit.x - mouth.x, rabbit.y - mouth.y);
    if (distance < rabbit.radius + BITE_RADIUS && distance < closestDistance) {
      target = rabbit;
      closestDistance = distance;
    }
  }

  if (!target) {
    messageEl.textContent = t("missed");
    return;
  }

  target.alive = false;
  messageEl.textContent = t("caughtOne");
  playFoxCatchSound();
  updateHud(performance.now());
  drawCharts();
}

function unlockAudio() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }
}

function playFoxCatchSound() {
  unlockAudio();
  const now = audioContext.currentTime;
  const gain = audioContext.createGain();
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.08, now + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
  gain.connect(audioContext.destination);

  const bark = audioContext.createOscillator();
  bark.type = "sawtooth";
  bark.frequency.setValueAtTime(230, now);
  bark.frequency.exponentialRampToValueAtTime(125, now + 0.16);
  bark.connect(gain);
  bark.start(now);
  bark.stop(now + 0.19);

  const bite = audioContext.createOscillator();
  bite.type = "triangle";
  bite.frequency.setValueAtTime(95, now + 0.035);
  bite.frequency.exponentialRampToValueAtTime(70, now + 0.13);
  bite.connect(gain);
  bite.start(now + 0.03);
  bite.stop(now + 0.15);
}

function drawHabitat() {
  const background = environment === "light" ? images.backgroundLight : images.backgroundDark;
  if (background.complete && background.naturalWidth) {
    const scale = Math.max(gameCanvas.width / background.naturalWidth, gameCanvas.height / background.naturalHeight);
    const width = background.naturalWidth * scale;
    const height = background.naturalHeight * scale;
    const x = (gameCanvas.width - width) / 2;
    const y = (gameCanvas.height - height) / 2;
    gameCtx.drawImage(background, x, y, width, height);
    gameCtx.fillStyle = environment === "light" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.12)";
    gameCtx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
    return;
  }

  gameCtx.fillStyle = environment === "light" ? "#d7cfaa" : "#42453e";
  gameCtx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
}

function drawRabbit(rabbit) {
  if (!rabbit.alive) return;

  const sprite = rabbit.color === "light" ? images.rabbitLight : images.rabbitDark;
  const facingRight = rabbit.vx >= 0;
  const alpha = (rabbit.color === environment ? 0.52 : 1) * getEscapeAlpha(rabbit);
  const hop = Math.sin(rabbit.hopPhase) * 3;
  const stretch = 1 + Math.sin(rabbit.hopPhase) * 0.025;
  const lean = clamp(rabbit.vx / 260, -0.12, 0.12);

  if (sprite.complete && sprite.naturalWidth) {
    const width = RABBIT_WIDTH;
    const height = width * (sprite.naturalHeight / sprite.naturalWidth);
    gameCtx.save();
    gameCtx.globalAlpha = alpha;
    gameCtx.translate(rabbit.x, rabbit.y + hop);
    if (rabbit.escaping) drawEscapeCue(rabbit.escapePhase);
    gameCtx.rotate(lean);
    gameCtx.scale(facingRight ? 1 : -1, 1);
    gameCtx.scale(stretch, 1 / stretch);
    gameCtx.drawImage(sprite, -width / 2, -height / 2, width, height);
    drawRabbitLegMotion(width, height, rabbit.hopPhase);
    gameCtx.restore();
  }
}

function drawEscapeCue(phase) {
  const progress = clamp(phase / ESCAPE_DURATION, 0, 1);
  const radius = 16 + progress * 20;
  gameCtx.save();
  gameCtx.globalAlpha = (1 - progress) * 0.45;
  gameCtx.strokeStyle = "rgba(255, 255, 255, 0.95)";
  gameCtx.lineWidth = 2;
  gameCtx.setLineDash([4, 6]);
  gameCtx.beginPath();
  gameCtx.arc(0, 0, radius, 0, Math.PI * 2);
  gameCtx.stroke();
  gameCtx.restore();
}

function getEscapeAlpha(rabbit) {
  if (!rabbit.escaping) return 1;
  const progress = clamp(rabbit.escapePhase / ESCAPE_DURATION, 0, 1);
  if (progress < 0.5) return 1 - progress * 1.7;
  return 0.15 + (progress - 0.5) * 1.7;
}

function drawRabbitLegMotion(width, height, phase) {
  const rear = Math.sin(phase) * 5;
  const front = Math.sin(phase + Math.PI) * 4;
  gameCtx.save();
  gameCtx.globalAlpha *= 0.34;
  gameCtx.strokeStyle = "rgba(30, 25, 20, 0.72)";
  gameCtx.lineWidth = 2;
  gameCtx.lineCap = "round";
  gameCtx.beginPath();
  gameCtx.moveTo(-width * 0.28, height * 0.2);
  gameCtx.lineTo(-width * 0.2 + rear, height * 0.38);
  gameCtx.moveTo(width * 0.15, height * 0.18);
  gameCtx.lineTo(width * 0.23 + front, height * 0.34);
  gameCtx.stroke();
  gameCtx.restore();
}

function drawFox() {
  const sprite = images.fox;
  if (sprite.complete && sprite.naturalWidth) {
    const width = FOX_WIDTH;
    const height = width * (sprite.naturalHeight / sprite.naturalWidth);
    const bob = Math.sin(foxRunPhase) * 1.6 * foxMotion;
    const lean = Math.sin(foxRunPhase * 0.5) * 0.025 * foxMotion;
    gameCtx.save();
    gameCtx.translate(fox.x, fox.y + bob);
    gameCtx.rotate(lean);
    gameCtx.drawImage(sprite, -width / 2, -height / 2, width, height);
    drawFoxLegMotion(width, height);
    gameCtx.restore();
  }
}

function drawFoxLegMotion(width, height) {
  if (foxMotion < 0.08) return;
  const stride = Math.sin(foxRunPhase) * 5 * foxMotion;
  gameCtx.save();
  gameCtx.globalAlpha = 0.34 * foxMotion;
  gameCtx.strokeStyle = "rgba(35, 22, 14, 0.8)";
  gameCtx.lineWidth = 2.2;
  gameCtx.lineCap = "round";
  gameCtx.beginPath();
  gameCtx.moveTo(-width * 0.1, height * 0.18);
  gameCtx.lineTo(-width * 0.08 + stride, height * 0.42);
  gameCtx.moveTo(width * 0.25, height * 0.12);
  gameCtx.lineTo(width * 0.28 - stride, height * 0.42);
  gameCtx.stroke();
  gameCtx.restore();
}

function drawMouthMarker() {
  const mouth = getMouthPoint();
  gameCtx.save();
  gameCtx.beginPath();
  gameCtx.arc(mouth.x, mouth.y, BITE_RADIUS, 0, Math.PI * 2);
  gameCtx.fillStyle = "rgba(255, 255, 255, 0.14)";
  gameCtx.strokeStyle = "rgba(255, 255, 255, 0.88)";
  gameCtx.lineWidth = 2;
  gameCtx.fill();
  gameCtx.stroke();
  gameCtx.restore();
}

function drawGame() {
  drawHabitat();
  for (const rabbit of rabbits) drawRabbit(rabbit);
  drawFox();
  if (!isOver) drawMouthMarker();
}

function drawCharts() {
  drawSingleChart(lightChartCtx, "light");
  drawSingleChart(darkChartCtx, "dark");
}

function drawSingleChart(ctx, color) {
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;
  const plot = { x: 44, y: 14, w: width - 58, h: height - 52 };
  const barColor = color === "light" ? "#b7b9b0" : "#424640";

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = "#17211b";
  ctx.lineWidth = 1.2;
  ctx.strokeRect(plot.x, plot.y, plot.w, plot.h);

  ctx.strokeStyle = "rgba(23,33,27,0.22)";
  ctx.lineWidth = 1;
  for (let i = 1; i < 4; i += 1) {
    const y = plot.y + (plot.h / 4) * i;
    ctx.beginPath();
    ctx.moveTo(plot.x, y);
    ctx.lineTo(plot.x + plot.w, y);
    ctx.stroke();
  }
  for (let i = 1; i < 3; i += 1) {
    const x = plot.x + (plot.w / 3) * i;
    ctx.beginPath();
    ctx.moveTo(x, plot.y);
    ctx.lineTo(x, plot.y + plot.h);
    ctx.stroke();
  }

  const samples = history.length ? history : [{ second: 0, light: INITIAL_PER_COLOR, dark: INITIAL_PER_COLOR }];
  const barWidth = Math.max(2, plot.w / GAME_SECONDS - 1.5);
  ctx.fillStyle = barColor;
  for (const sample of samples) {
    const x = Math.min(plot.x + (sample.second / GAME_SECONDS) * plot.w, plot.x + plot.w - barWidth - 1);
    const pct = sample[color] / INITIAL_PER_COLOR;
    const h = pct * plot.h;
    ctx.fillRect(x + 1, plot.y + plot.h - h, barWidth, h);
  }

  ctx.fillStyle = "#17211b";
  ctx.font = "13px 'Segoe UI', Arial, sans-serif";
  ctx.fillText("100", 7, plot.y + 5);
  ctx.fillText("75", 16, plot.y + plot.h * 0.25 + 5);
  ctx.fillText("50", 16, plot.y + plot.h * 0.5 + 5);
  ctx.fillText("25", 16, plot.y + plot.h * 0.75 + 5);
  ctx.fillText("0", 26, plot.y + plot.h + 4);

  ctx.fillText("0", plot.x - 3, height - 18);
  ctx.fillText("10", plot.x + plot.w / 3 - 7, height - 18);
  ctx.fillText("20", plot.x + (plot.w * 2) / 3 - 7, height - 18);
  ctx.fillText("30", plot.x + plot.w - 8, height - 18);

  ctx.save();
  ctx.translate(14, plot.y + plot.h / 2 + 26);
  ctx.rotate(-Math.PI / 2);
  ctx.font = "italic 13px 'Segoe UI', Arial, sans-serif";
  ctx.fillText(t("percent"), 0, 0);
  ctx.restore();

  ctx.font = "italic 13px 'Segoe UI', Arial, sans-serif";
  ctx.fillText(t("seconds"), plot.x + plot.w / 2 - 54, height - 3);
}

function buildFinalReport(now) {
  const counts = getCounts();
  const eaten = TOTAL_RABBITS - counts.light - counts.dark;
  const totalRemaining = Math.max(1, counts.light + counts.dark);
  const lightPct = Math.round((counts.light / totalRemaining) * 100);
  const darkPct = 100 - lightPct;
  const lightEaten = INITIAL_PER_COLOR - counts.light;
  const darkEaten = INITIAL_PER_COLOR - counts.dark;
  const copy = translations[currentLanguage];
  const environmentName = environment === "light" ? copy.lightName : copy.darkName;
  const camouflaged = environment === "light" ? copy.lightPlural : copy.darkPlural;
  const visible = environment === "light" ? copy.darkPlural : copy.lightPlural;
  const moreEaten = lightEaten === darkEaten ? copy.sameEaten : lightEaten > darkEaten ? copy.moreLight : copy.moreDark;
  const data = {
    eaten,
    environmentName,
    lightPct,
    darkPct,
    light: counts.light,
    dark: counts.dark,
    visible,
    camouflaged,
    moreEaten,
  };
  const favored =
    counts.light === counts.dark
      ? null
      : counts.light > counts.dark
        ? copy.lightPlural
        : copy.darkPlural;

  endConclusion.textContent = favored ? copy.conclusionFavored({ favored }) : copy.conclusionEqual;
  endSummary.textContent = copy.reportSummary(data);
  endReason.textContent = copy.reportReason(data);
  endMetrics.innerHTML = `
    <div class="metric-card"><span>${copy.metricEaten}</span><strong>${eaten}</strong></div>
    <div class="metric-card"><span>${copy.metricLight}</span><strong>${counts.light}</strong></div>
    <div class="metric-card"><span>${copy.metricDark}</span><strong>${counts.dark}</strong></div>
  `;
  updateHud(now);
}

function endGame(now) {
  isOver = true;
  recordHistory(GAME_SECONDS);
  drawCharts();
  buildFinalReport(now);
  gameCanvas.hidden = true;
  messageEl.hidden = true;
  endPanel.hidden = false;
}

function animate(now) {
  const delta = Math.min(0.04, (now - lastFrame) / 1000 || 0);
  lastFrame = now;

  if (hasStarted && !isPaused && !isOver) {
    moveRabbits(delta);
    foxRunPhase += delta * (5 + foxMotion * 12);
    foxMotion *= 0.88;
    const elapsed = getElapsedSeconds(now);
    recordHistory(elapsed);
    updateHud(now);

    const counts = getCounts();
    if (getRemainingSeconds(now) <= 0 || counts.light + counts.dark === 0) {
      endGame(now);
    }
  }

  drawGame();
  requestAnimationFrame(animate);
}

function togglePause() {
  if (!hasStarted || isOver) return;
  isPaused = !isPaused;
  if (isPaused) {
    pausedAt = performance.now();
    messageEl.textContent = t("paused");
  } else {
    pausedTotal += performance.now() - pausedAt;
    messageEl.textContent = t("prompt");
  }
  applyLanguage();
}

function applyLanguage() {
  document.documentElement.lang = currentLanguage === "zh" ? "zh" : currentLanguage;
  document.title = t("docTitle");
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  pauseButton.textContent = isPaused ? t("resume") : t("pause");
  pauseButton.setAttribute("aria-pressed", String(isPaused));
  updateHud(performance.now());
  drawCharts();
  if (isOver) buildFinalReport(performance.now());
}

gameCanvas.addEventListener("pointermove", (event) => {
  setFoxPosition(event.clientX, event.clientY);
});

gameCanvas.addEventListener("pointerdown", (event) => {
  gameCanvas.setPointerCapture(event.pointerId);
  setFoxPosition(event.clientX, event.clientY);
  tryCatchAtMouth();
});

newGameButton.addEventListener("click", resetGame);
startButton.addEventListener("click", startSimulation);
pauseButton.addEventListener("click", togglePause);
closeCredit.addEventListener("click", () => {
  creditBanner.hidden = true;
});

languageSelect.addEventListener("change", (event) => {
  currentLanguage = event.target.value;
  messageEl.textContent = t("prompt");
  applyLanguage();
});

environmentInputs.forEach((input) => {
  input.addEventListener("change", (event) => {
    environment = event.target.value;
    messageEl.textContent = environment === "light" ? t("lightMessage") : t("darkMessage");
    drawGame();
  });
});

difficultyInputs.forEach((input) => {
  input.addEventListener("change", (event) => {
    difficulty = event.target.value;
    resetGame();
  });
});

resetGame();
requestAnimationFrame(animate);
