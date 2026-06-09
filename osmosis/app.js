const insideSlider = document.querySelector("#insideSolute");
const outsideSlider = document.querySelector("#outsideSolute");
const insideValue = document.querySelector("#insideValue");
const outsideValue = document.querySelector("#outsideValue");
const stateLabel = document.querySelector("#stateLabel");
const solutionName = document.querySelector("#solutionName");
const solutionDetail = document.querySelector("#solutionDetail");
const explanation = document.querySelector("#explanation");
const cell = document.querySelector("#cell");
const stage = document.querySelector("#stage");
const particleField = document.querySelector("#particleField");
const outsideSolutes = document.querySelector("#outsideSolutes");
const cellSolutes = document.querySelector("#cellSolutes");
const insideWater = document.querySelector("#insideWater");
const waterStreams = document.querySelector("#waterStreams");
const cellWaterMolecules = document.querySelector("#cellWaterMolecules");
const startBtn = document.querySelector("#startBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const restartBtn = document.querySelector("#restartBtn");
const presets = document.querySelectorAll(".preset");
const cellBody = document.querySelector("#cellBody");
const phospholipidLayer = document.querySelector("#phospholipidLayer");
const topBeaker = document.querySelector("#topBeaker");
const leftWater = document.querySelector("#leftWater");
const rightWater = document.querySelector("#rightWater");
const topSoluteLayer = document.querySelector("#topSoluteLayer");
const topMovingLayer = document.querySelector("#topMovingLayer");
const topStartBtn = document.querySelector("#topStartBtn");
const topPauseBtn = document.querySelector("#topPauseBtn");
const topRestartBtn = document.querySelector("#topRestartBtn");
const languageToggle = document.querySelector("#languageToggle");
const languageMenu = document.querySelector("#languageMenu");
const languageCurrent = document.querySelector("#languageCurrent");

const initialInternalWater = 100;
const initialExternalWater = 160;
const totalWater = initialInternalWater + initialExternalWater;
let currentLang = "es";
let internalWater = initialInternalWater;
let activeInsideSolute = Number(insideSlider.value);
let activeOutsideSolute = Number(outsideSlider.value);
let targetInternalWater = initialInternalWater;
let running = false;
let lowerWaterMoleculesActive = false;
let frameId = null;
let lastTime = 0;
let topLeftLevel = 43;
let topRightLevel = 43;
let topRunning = false;
let topPaused = false;
let topFrameId = null;
let topSpawnTimer = null;
const lipidCount = 184;
const lipids = [];

const translations = {
  es: {
    languageName: "Español",
    pageTitle: "Simulador de ósmosis",
    topWater: "moléculas<br>de agua",
    topMembrane: "membrana<br>semipermeable",
    topSolute: "soluto",
    topLow: "menor concentración<br>de soluto",
    topHigh: "mayor concentración<br>de soluto",
    topEquilibrium: "equilibrio osmótico",
    controls: "Controles",
    intro: "Ajusta la concentración de sacarosa dentro y fuera de la célula.",
    insideLabel: "Concentración de soluto DENTRO (%)",
    outsideLabel: "Concentración de soluto FUERA (%)",
    quick: "Ajustes rápidos",
    note: "Soluto utilizado: sacarosa, que no atraviesa la membrana celular.",
    language: "Idioma",
    statePrefix: "Estado actual:",
    transportIn: "En solución hipotónica: el agua entra a la célula.",
    transportOut: "En solución hipertónica: el agua sale de la célula.",
    info: "Información",
    happening: "Qué está ocurriendo",
    facts: "Datos curiosos",
    factsText: "Las células de nuestro cuerpo funcionan mejor en ambientes isotónicos. Por ejemplo, la solución salina al 0.9% es casi isotónica para las células humanas.",
    solutionTitle: "Tipo de solución",
    start: "START",
    pause: "PAUSE",
    restart: "RESTART",
    presets: { iso: "Isotónica 50/50", hyper: "Hipertónica", hypo: "Hipotónica" },
    solutions: {
      iso: { name: "Isotónica", detail: "Concentración igual dentro y fuera de la célula.", text: "Cuando la concentración de soluto es igual dentro y fuera de la célula, la solución es isotónica y no hay movimiento neto de agua." },
      hyper: { name: "Hipertónica", detail: "Hay más soluto fuera; el agua sale de la célula.", text: "El exterior tiene mayor concentración de soluto. El agua se mueve hacia afuera de la célula, por eso la célula reduce su volumen hasta acercarse al equilibrio." },
      hypo: { name: "Hipotónica", detail: "Hay más soluto dentro; el agua entra a la célula.", text: "El interior tiene mayor concentración de soluto. El agua entra a la célula y aumenta su volumen hasta que la diferencia de concentración se equilibra." },
      equilibrium: { name: "Equilibrio", detail: "El movimiento neto de agua se ha detenido.", text: "La célula alcanzó equilibrio: el agua puede seguir moviéndose en ambas direcciones, pero ya no hay transporte neto." }
    }
  },
  en: {
    languageName: "English",
    pageTitle: "Osmosis simulator",
    topWater: "water<br>molecules",
    topMembrane: "semipermeable<br>membrane",
    topSolute: "solute",
    topLow: "lower solute<br>concentration",
    topHigh: "higher solute<br>concentration",
    topEquilibrium: "osmotic equilibrium",
    controls: "Controls",
    intro: "Adjust the sucrose concentration inside and outside the cell.",
    insideLabel: "Solute concentration INSIDE (%)",
    outsideLabel: "Solute concentration OUTSIDE (%)",
    quick: "Quick settings",
    note: "Solute used: sucrose, which does not cross the cell membrane.",
    language: "Language",
    statePrefix: "Current state:",
    transportIn: "In a hypotonic solution: water enters the cell.",
    transportOut: "In a hypertonic solution: water leaves the cell.",
    info: "Information",
    happening: "What is happening",
    facts: "Fun facts",
    factsText: "Cells in our body work best in isotonic environments. For example, 0.9% saline is almost isotonic for human cells.",
    solutionTitle: "Solution type",
    start: "START",
    pause: "PAUSE",
    restart: "RESTART",
    presets: { iso: "Isotonic 50/50", hyper: "Hypertonic", hypo: "Hypotonic" },
    solutions: {
      iso: { name: "Isotonic", detail: "Equal concentration inside and outside the cell.", text: "When solute concentration is equal inside and outside the cell, the solution is isotonic and there is no net movement of water." },
      hyper: { name: "Hypertonic", detail: "There is more solute outside; water leaves the cell.", text: "The outside has a higher solute concentration. Water moves out of the cell, so the cell reduces its volume until it approaches equilibrium." },
      hypo: { name: "Hypotonic", detail: "There is more solute inside; water enters the cell.", text: "The inside has a higher solute concentration. Water enters the cell and increases its volume until the concentration difference balances." },
      equilibrium: { name: "Equilibrium", detail: "Net water movement has stopped.", text: "The cell reached equilibrium: water can still move in both directions, but there is no net transport." }
    }
  },
  pt: {
    languageName: "Português",
    pageTitle: "Simulador de osmose",
    topWater: "moléculas<br>de água",
    topMembrane: "membrana<br>semipermeável",
    topSolute: "soluto",
    topLow: "menor concentração<br>de soluto",
    topHigh: "maior concentração<br>de soluto",
    topEquilibrium: "equilíbrio osmótico",
    controls: "Controles",
    intro: "Ajuste a concentração de sacarose dentro e fora da célula.",
    insideLabel: "Concentração de soluto DENTRO (%)",
    outsideLabel: "Concentração de soluto FORA (%)",
    quick: "Ajustes rápidos",
    note: "Soluto utilizado: sacarose, que não atravessa a membrana celular.",
    language: "Idioma",
    statePrefix: "Estado atual:",
    transportIn: "Em solução hipotônica: a água entra na célula.",
    transportOut: "Em solução hipertônica: a água sai da célula.",
    info: "Informação",
    happening: "O que está acontecendo",
    facts: "Curiosidades",
    factsText: "As células do nosso corpo funcionam melhor em ambientes isotônicos. Por exemplo, a solução salina a 0,9% é quase isotônica para as células humanas.",
    solutionTitle: "Tipo de solução",
    start: "INICIAR",
    pause: "PAUSAR",
    restart: "REINICIAR",
    presets: { iso: "Isotônica 50/50", hyper: "Hipertônica", hypo: "Hipotônica" },
    solutions: {
      iso: { name: "Isotônica", detail: "Concentração igual dentro e fora da célula.", text: "Quando a concentração de soluto é igual dentro e fora da célula, a solução é isotônica e não há movimento líquido de água." },
      hyper: { name: "Hipertônica", detail: "Há mais soluto fora; a água sai da célula.", text: "O exterior tem maior concentração de soluto. A água se move para fora da célula, por isso a célula reduz seu volume até se aproximar do equilíbrio." },
      hypo: { name: "Hipotônica", detail: "Há mais soluto dentro; a água entra na célula.", text: "O interior tem maior concentração de soluto. A água entra na célula e aumenta seu volume até que a diferença de concentração se equilibre." },
      equilibrium: { name: "Equilíbrio", detail: "O movimento líquido de água parou.", text: "A célula alcançou equilíbrio: a água ainda pode se mover em ambas as direções, mas não há transporte líquido." }
    }
  },
  fr: {
    languageName: "Français",
    pageTitle: "Simulateur d'osmose",
    topWater: "molécules<br>d'eau",
    topMembrane: "membrane<br>semi-perméable",
    topSolute: "soluté",
    topLow: "plus faible concentration<br>de soluté",
    topHigh: "plus forte concentration<br>de soluté",
    topEquilibrium: "équilibre osmotique",
    controls: "Contrôles",
    intro: "Ajustez la concentration de saccharose à l'intérieur et à l'extérieur de la cellule.",
    insideLabel: "Concentration de soluté DEDANS (%)",
    outsideLabel: "Concentration de soluté DEHORS (%)",
    quick: "Réglages rapides",
    note: "Soluté utilisé : saccharose, qui ne traverse pas la membrane cellulaire.",
    language: "Langue",
    statePrefix: "État actuel :",
    transportIn: "En solution hypotonique : l'eau entre dans la cellule.",
    transportOut: "En solution hypertonique : l'eau sort de la cellule.",
    info: "Information",
    happening: "Ce qui se passe",
    facts: "Faits intéressants",
    factsText: "Les cellules de notre corps fonctionnent mieux dans des milieux isotoniques. Par exemple, une solution saline à 0,9 % est presque isotonique pour les cellules humaines.",
    solutionTitle: "Type de solution",
    start: "DÉMARRER",
    pause: "PAUSE",
    restart: "REDÉMARRER",
    presets: { iso: "Isotonique 50/50", hyper: "Hypertonique", hypo: "Hypotonique" },
    solutions: {
      iso: { name: "Isotonique", detail: "Concentration égale à l'intérieur et à l'extérieur de la cellule.", text: "Lorsque la concentration de soluté est égale à l'intérieur et à l'extérieur de la cellule, la solution est isotonique et il n'y a pas de mouvement net d'eau." },
      hyper: { name: "Hypertonique", detail: "Il y a plus de soluté dehors ; l'eau sort de la cellule.", text: "L'extérieur a une concentration de soluté plus élevée. L'eau sort de la cellule, donc la cellule réduit son volume jusqu'à se rapprocher de l'équilibre." },
      hypo: { name: "Hypotonique", detail: "Il y a plus de soluté dedans ; l'eau entre dans la cellule.", text: "L'intérieur a une concentration de soluté plus élevée. L'eau entre dans la cellule et augmente son volume jusqu'à ce que la différence de concentration s'équilibre." },
      equilibrium: { name: "Équilibre", detail: "Le mouvement net de l'eau s'est arrêté.", text: "La cellule a atteint l'équilibre : l'eau peut encore se déplacer dans les deux directions, mais il n'y a plus de transport net." }
    }
  },
  it: {
    languageName: "Italiano",
    pageTitle: "Simulatore di osmosi",
    topWater: "molecole<br>d'acqua",
    topMembrane: "membrana<br>semipermeabile",
    topSolute: "soluto",
    topLow: "minore concentrazione<br>di soluto",
    topHigh: "maggiore concentrazione<br>di soluto",
    topEquilibrium: "equilibrio osmotico",
    controls: "Controlli",
    intro: "Regola la concentrazione di saccarosio dentro e fuori dalla cellula.",
    insideLabel: "Concentrazione di soluto DENTRO (%)",
    outsideLabel: "Concentrazione di soluto FUORI (%)",
    quick: "Impostazioni rapide",
    note: "Soluto usato: saccarosio, che non attraversa la membrana cellulare.",
    language: "Lingua",
    statePrefix: "Stato attuale:",
    transportIn: "In soluzione ipotonica: l'acqua entra nella cellula.",
    transportOut: "In soluzione ipertonica: l'acqua esce dalla cellula.",
    info: "Informazione",
    happening: "Che cosa succede",
    facts: "Curiosità",
    factsText: "Le cellule del nostro corpo funzionano meglio in ambienti isotonici. Per esempio, la soluzione salina allo 0,9% è quasi isotonica per le cellule umane.",
    solutionTitle: "Tipo di soluzione",
    start: "AVVIA",
    pause: "PAUSA",
    restart: "RIAVVIA",
    presets: { iso: "Isotonica 50/50", hyper: "Ipertonica", hypo: "Ipotonica" },
    solutions: {
      iso: { name: "Isotonica", detail: "Concentrazione uguale dentro e fuori dalla cellula.", text: "Quando la concentrazione di soluto è uguale dentro e fuori dalla cellula, la soluzione è isotonica e non c'è movimento netto di acqua." },
      hyper: { name: "Ipertonica", detail: "C'è più soluto fuori; l'acqua esce dalla cellula.", text: "L'esterno ha una concentrazione di soluto maggiore. L'acqua si muove fuori dalla cellula, quindi la cellula riduce il suo volume fino ad avvicinarsi all'equilibrio." },
      hypo: { name: "Ipotonica", detail: "C'è più soluto dentro; l'acqua entra nella cellula.", text: "L'interno ha una concentrazione di soluto maggiore. L'acqua entra nella cellula e aumenta il volume fino a equilibrare la differenza di concentrazione." },
      equilibrium: { name: "Equilibrio", detail: "Il movimento netto dell'acqua si è fermato.", text: "La cellula ha raggiunto l'equilibrio: l'acqua può ancora muoversi in entrambe le direzioni, ma non c'è trasporto netto." }
    }
  },
  de: {
    languageName: "Deutsch",
    pageTitle: "Osmose-Simulator",
    topWater: "Wasser-<br>moleküle",
    topMembrane: "semipermeable<br>Membran",
    topSolute: "gelöster Stoff",
    topLow: "geringere Konzentration<br>gelöster Stoffe",
    topHigh: "höhere Konzentration<br>gelöster Stoffe",
    topEquilibrium: "osmotisches Gleichgewicht",
    controls: "Steuerung",
    intro: "Stelle die Saccharosekonzentration innerhalb und außerhalb der Zelle ein.",
    insideLabel: "Konzentration gelöster Stoffe INNEN (%)",
    outsideLabel: "Konzentration gelöster Stoffe AUSSEN (%)",
    quick: "Schnelleinstellungen",
    note: "Verwendeter gelöster Stoff: Saccharose, die die Zellmembran nicht durchquert.",
    language: "Sprache",
    statePrefix: "Aktueller Zustand:",
    transportIn: "In hypotonischer Lösung: Wasser tritt in die Zelle ein.",
    transportOut: "In hypertonischer Lösung: Wasser verlässt die Zelle.",
    info: "Information",
    happening: "Was passiert",
    facts: "Interessante Fakten",
    factsText: "Die Zellen unseres Körpers funktionieren am besten in isotonischen Umgebungen. Zum Beispiel ist eine 0,9%ige Kochsalzlösung für menschliche Zellen fast isotonisch.",
    solutionTitle: "Lösungstyp",
    start: "START",
    pause: "PAUSE",
    restart: "NEUSTART",
    presets: { iso: "Isotonisch 50/50", hyper: "Hypertonisch", hypo: "Hypotonisch" },
    solutions: {
      iso: { name: "Isotonisch", detail: "Gleiche Konzentration innerhalb und außerhalb der Zelle.", text: "Wenn die Konzentration gelöster Stoffe innerhalb und außerhalb der Zelle gleich ist, ist die Lösung isotonisch und es gibt keine Netto-Wasserbewegung." },
      hyper: { name: "Hypertonisch", detail: "Außen gibt es mehr gelöste Stoffe; Wasser verlässt die Zelle.", text: "Außen ist die Konzentration gelöster Stoffe höher. Wasser bewegt sich aus der Zelle heraus, deshalb verringert die Zelle ihr Volumen, bis sie sich dem Gleichgewicht nähert." },
      hypo: { name: "Hypotonisch", detail: "Innen gibt es mehr gelöste Stoffe; Wasser tritt in die Zelle ein.", text: "Innen ist die Konzentration gelöster Stoffe höher. Wasser tritt in die Zelle ein und vergrößert ihr Volumen, bis sich der Konzentrationsunterschied ausgleicht." },
      equilibrium: { name: "Gleichgewicht", detail: "Die Netto-Wasserbewegung hat aufgehört.", text: "Die Zelle hat das Gleichgewicht erreicht: Wasser kann sich weiterhin in beide Richtungen bewegen, aber es gibt keinen Nettotransport mehr." }
    }
  }
};

function t() {
  return translations[currentLang] || translations.es;
}

function setText(selector, value) {
  const element = document.querySelector(selector);
  if (element) {
    element.textContent = value;
  }
}

function setHTML(selector, value) {
  const element = document.querySelector(selector);
  if (element) {
    element.innerHTML = value;
  }
}

function getSolutes(useActive = false) {
  const inside = useActive ? activeInsideSolute : Number(insideSlider.value);
  const outside = useActive ? activeOutsideSolute : Number(outsideSlider.value);
  return {
    inside,
    outside,
    insideUnits: Math.max(inside, 0.1) * initialInternalWater / 100,
    outsideUnits: Math.max(outside, 0.1) * initialExternalWater / 100
  };
}

function computeTargetWater() {
  const { insideUnits, outsideUnits } = getSolutes(true);
  const raw = (insideUnits * totalWater) / (insideUnits + outsideUnits);
  return Math.min(145, Math.max(55, raw));
}

function effectiveConcentrations() {
  const { insideUnits, outsideUnits } = getSolutes(true);
  const externalWater = totalWater - internalWater;
  return {
    inside: insideUnits / internalWater,
    outside: outsideUnits / externalWater
  };
}

function solutionType(useActive = false) {
  const { inside, outside } = getSolutes(useActive);
  const diff = outside - inside;

  if (Math.abs(diff) <= 4) {
    return { key: "iso", ...t().solutions.iso };
  }

  if (diff > 0) {
    return { key: "hyper", ...t().solutions.hyper };
  }

  return { key: "hypo", ...t().solutions.hypo };
}

function placeParticle(el, x, y) {
  el.style.left = `${x}%`;
  el.style.top = `${y}%`;
}

function buildParticles() {
  particleField.innerHTML = "";
  insideWater.innerHTML = "";
  outsideSolutes.innerHTML = "";
  waterStreams.innerHTML = "";
  cellWaterMolecules.innerHTML = "";

  for (let i = 0; i < 42; i += 1) {
    const particle = document.createElement("i");
    particle.className = "particle";
    const x = 7 + Math.random() * 86;
    const y = 10 + Math.random() * 76;
    const dx = x - 50;
    const dy = y - 49;
    if (Math.hypot(dx / 1.4, dy) < 20) {
      placeParticle(particle, x < 50 ? x - 18 : x + 18, y);
    } else {
      placeParticle(particle, x, y);
    }
    particle.style.transform = `scale(${0.65 + Math.random() * 0.65})`;
    particle.style.animation = `float ${5 + Math.random() * 5}s ease-in-out ${Math.random() * -5}s infinite`;
    particleField.appendChild(particle);
  }

  const streamPositions = [
    [18, 27, 28], [16, 49, 8], [23, 69, -22],
    [75, 27, 152], [78, 49, 178], [73, 69, -156]
  ];

  streamPositions.forEach(([x, y, angle], index) => {
    const stream = document.createElement("i");
    stream.className = "stream";
    stream.style.left = `${x}%`;
    stream.style.top = `${y}%`;
    stream.style.setProperty("--angle", `${angle}deg`);
    stream.style.animationDelay = `${index * -.14}s`;
    waterStreams.appendChild(stream);
  });

  buildCellWaterMolecules();
  buildInsideWater();
  renderSoluteDistribution();
}

function buildInsideWater() {
  for (let i = 0; i < 38; i += 1) {
    const water = document.createElement("i");
    water.className = "inside-water-sphere";
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.sqrt(Math.random()) * 34;
    placeParticle(water, 50 + Math.cos(angle) * radius, 50 + Math.sin(angle) * radius);
    water.style.transform = `scale(${0.62 + Math.random() * 0.65})`;
    insideWater.appendChild(water);
  }
  renderInsideWater();
}

function renderInsideWater() {
  const visibleCount = Math.round(12 + ((internalWater - 55) / 90) * 24);
  const waters = insideWater.querySelectorAll(".inside-water-sphere");
  waters.forEach((water, index) => {
    water.style.opacity = index < visibleCount ? ".78" : "0";
  });
}

function createSolute(className = "solute") {
  const solute = document.createElement("i");
  solute.className = className;
  return solute;
}

function renderSoluteDistribution() {
  const inside = Number(insideSlider.value);
  const outside = Number(outsideSlider.value);
  const insideCount = Math.round(6 + inside * 0.46);
  const outsideCount = Math.round(6 + outside * 0.58);

  cellSolutes.innerHTML = "";
  outsideSolutes.innerHTML = "";

  for (let i = 0; i < insideCount; i += 1) {
    const solute = createSolute("solute");
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.sqrt(Math.random()) * 36;
    placeParticle(solute, 50 + Math.cos(angle) * radius, 50 + Math.sin(angle) * radius);
    solute.style.transform = `scale(${0.78 + Math.random() * 0.55})`;
    cellSolutes.appendChild(solute);
  }

  for (let i = 0; i < outsideCount; i += 1) {
    const solute = createSolute("outside-solute");
    const zone = Math.random();
    let x;
    let y;

    if (zone < 0.34) {
      x = 7 + Math.random() * 27;
      y = 14 + Math.random() * 72;
    } else if (zone < 0.68) {
      x = 66 + Math.random() * 27;
      y = 14 + Math.random() * 72;
    } else {
      x = 28 + Math.random() * 44;
      y = Math.random() > 0.5 ? 8 + Math.random() * 16 : 76 + Math.random() * 15;
    }

    placeParticle(solute, x, y);
    solute.style.transform = `scale(${0.72 + Math.random() * 0.52})`;
    solute.style.animationDelay = `${Math.random() * -4}s`;
    outsideSolutes.appendChild(solute);
  }
}

function createStageWaterMolecule(className, delay, angle, ringOffset = 0) {
  const molecule = document.createElement("span");
  molecule.className = `stage-water-molecule ${className}`;
  molecule.style.animationDelay = `${delay}s`;
  molecule.style.setProperty("--duration", `${1.65 + Math.random() * 0.45}s`);
  molecule.style.setProperty("--angle", `${angle * 180 / Math.PI}deg`);

  const centerX = 50;
  const centerY = 51;
  const fromRadiusX = 31 + ringOffset;
  const fromRadiusY = 27 + ringOffset * 0.7;
  const toRadiusX = 16.5 + ringOffset * 0.18;
  const toRadiusY = 15.5 + ringOffset * 0.16;
  const jitterX = (Math.random() - 0.5) * 2.4;
  const jitterY = (Math.random() - 0.5) * 2.4;

  molecule.style.setProperty("--from-x", `${centerX + Math.cos(angle) * fromRadiusX + jitterX}%`);
  molecule.style.setProperty("--from-y", `${centerY + Math.sin(angle) * fromRadiusY + jitterY}%`);
  molecule.style.setProperty("--to-x", `${centerX + Math.cos(angle) * toRadiusX}%`);
  molecule.style.setProperty("--to-y", `${centerY + Math.sin(angle) * toRadiusY}%`);
  molecule.innerHTML = `
    <span class="oxygen">O</span>
    <span class="hydrogen h1">H</span>
    <span class="hydrogen h2">H</span>
  `;
  return molecule;
}

function buildCellWaterMolecules() {
  const count = 18;
  for (let i = 0; i < count; i += 1) {
    const angle = (Math.PI * 2 * i) / count + (i % 2 ? 0.08 : -0.05);
    const delay = i * 0.12;
    const offset = i % 3;
    cellWaterMolecules.appendChild(createStageWaterMolecule("water-in", delay, angle, offset));
    cellWaterMolecules.appendChild(createStageWaterMolecule("water-out", delay + 0.18, angle + 0.07, offset));
  }
}

function createPhospholipids() {
  phospholipidLayer.innerHTML = "";
  lipids.length = 0;

  for (let i = 0; i < lipidCount; i += 1) {
    const lipid = document.createElement("span");
    lipid.className = "phospholipid";
    lipid.innerHTML = `
      <span class="head outer"></span>
      <span class="tail"></span>
      <span class="head inner"></span>
    `;
    phospholipidLayer.appendChild(lipid);
    lipids.push(lipid);
  }
}

function radiusForCellState(theta, state) {
  if (state === "hypotonic") {
    return 0.425 + 0.006 * Math.sin(theta * 4);
  }

  if (state === "hypertonic") {
    return (
      0.345 +
      0.038 * Math.sin(theta * 5 + 0.6) +
      0.027 * Math.sin(theta * 9 - 1.1) +
      0.018 * Math.sin(theta * 15 + 2.4)
    );
  }

  return 0.385 + 0.005 * Math.sin(theta * 3);
}

function updateCellShape(state) {
  const size = cell.offsetWidth || 320;
  const center = size / 2;
  const polygonPoints = [];
  const polygonSteps = state === "hypertonic" ? 96 : 72;

  for (let i = 0; i < polygonSteps; i += 1) {
    const theta = (Math.PI * 2 * i) / polygonSteps;
    const membraneRadius = radiusForCellState(theta, state) * size;
    const innerRadius = Math.max(size * 0.2, membraneRadius - size * 0.065);
    const x = center + Math.cos(theta) * innerRadius;
    const y = center + Math.sin(theta) * innerRadius;
    polygonPoints.push(`${((x / size) * 100).toFixed(2)}% ${((y / size) * 100).toFixed(2)}%`);
  }

  cellBody.style.clipPath = `polygon(${polygonPoints.join(",")})`;

  lipids.forEach((lipid, index) => {
    const theta = (Math.PI * 2 * index) / lipidCount;
    const radius = radiusForCellState(theta, state) * size;
    const x = center + Math.cos(theta) * radius;
    const y = center + Math.sin(theta) * radius;
    const angleDeg = theta * 180 / Math.PI + 90;
    lipid.style.left = `${x}px`;
    lipid.style.top = `${y}px`;
    lipid.style.transform = `translate(-50%, -50%) rotate(${angleDeg}deg)`;
    lipid.style.opacity = "1";
  });
}

function buildTopDemo() {
  topSoluteLayer.innerHTML = "";
  topMovingLayer.innerHTML = "";

  for (let i = 0; i < 7; i += 1) {
    topSoluteLayer.appendChild(createTopSolute(random(10, 40), random(69, 85)));
  }

  const cols = 7;
  const rows = 5;
  const startX = 61;
  const startY = 59;
  const xGap = 4.5;
  const yGap = 5.2;

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const x = startX + col * xGap + (row % 2 ? 1.2 : 0);
      const y = startY + row * yGap;
      topSoluteLayer.appendChild(createTopSolute(x, y));
    }
  }
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function createTopSolute(x, y) {
  const particle = document.createElement("div");
  particle.className = "top-solute-particle";
  placeParticle(particle, x, y);
  return particle;
}

function createTopWaterMolecule() {
  const molecule = document.createElement("div");
  molecule.className = "top-water-molecule";

  const oxygen = document.createElement("div");
  oxygen.className = "oxygen";
  oxygen.textContent = "O";

  const h1 = document.createElement("div");
  h1.className = "hydrogen h1";
  h1.textContent = "H";

  const h2 = document.createElement("div");
  h2.className = "hydrogen h2";
  h2.textContent = "H";

  molecule.append(oxygen, h1, h2);
  return molecule;
}

function createTopMovingMolecule() {
  if (!topRunning || topPaused || topBeaker.classList.contains("top-equilibrium")) {
    return;
  }

  const mover = document.createElement("div");
  mover.className = "top-moving";
  mover.style.left = "9%";
  mover.style.top = `${56 + Math.random() * 12}%`;
  mover.style.animationDuration = `${1.35 + Math.random() * 0.4}s`;

  const molecule = createTopWaterMolecule();
  molecule.style.transform = `rotate(${-8 + Math.random() * 16}deg)`;
  mover.appendChild(molecule);
  topMovingLayer.appendChild(mover);
  mover.addEventListener("animationend", () => mover.remove());
}

function renderTopDemo() {
  leftWater.style.setProperty("--water-height", `${topLeftLevel}%`);
  rightWater.style.setProperty("--water-height", `${topRightLevel}%`);
  topBeaker.classList.toggle("top-running", topRunning && !topPaused);
  topBeaker.classList.toggle("top-paused", topPaused);
  topBeaker.classList.toggle("top-equilibrium", topRightLevel >= 57);
  topStartBtn.disabled = (topRunning && !topPaused) || topRightLevel >= 57;
  topPauseBtn.disabled = !topRunning || topRightLevel >= 57;
}

function topTick() {
  if (!topRunning || topPaused) {
    return;
  }

  const dt = 50;
  const step = dt * 0.006;
  topLeftLevel = Math.max(35, topLeftLevel - step);
  topRightLevel = Math.min(57, topRightLevel + step);

  if (topRightLevel >= 57) {
    topRunning = false;
    topPaused = false;
    topRightLevel = 57;
    topLeftLevel = 35;
    clearInterval(topSpawnTimer);
    clearInterval(topFrameId);
    topSpawnTimer = null;
    topFrameId = null;
    topMovingLayer.innerHTML = "";
  }

  renderTopDemo();
}

function startTopDemo() {
  if (topRightLevel >= 57) {
    renderTopDemo();
    return;
  }
  topRunning = true;
  topPaused = false;
  clearInterval(topFrameId);
  clearInterval(topSpawnTimer);
  createTopMovingMolecule();
  topSpawnTimer = setInterval(createTopMovingMolecule, 650);
  topFrameId = setInterval(topTick, 50);
  renderTopDemo();
}

function pauseTopDemo() {
  if (!topRunning || topRightLevel >= 57) {
    return;
  }
  topPaused = !topPaused;
  if (topPaused) {
    clearInterval(topSpawnTimer);
    topSpawnTimer = null;
    topMovingLayer.innerHTML = "";
    clearInterval(topFrameId);
    topFrameId = null;
  } else {
    clearInterval(topSpawnTimer);
    topSpawnTimer = setInterval(createTopMovingMolecule, 650);
    clearInterval(topFrameId);
    topFrameId = setInterval(topTick, 50);
  }
  renderTopDemo();
}

function restartTopDemo() {
  clearInterval(topSpawnTimer);
  clearInterval(topFrameId);
  topLeftLevel = 43;
  topRightLevel = 43;
  topRunning = false;
  topPaused = false;
  topFrameId = null;
  topSpawnTimer = null;
  topMovingLayer.innerHTML = "";
  topBeaker.classList.remove("top-running", "top-paused", "top-equilibrium", "top-frozen");
  buildTopDemo();
  renderTopDemo();
}

function updatePresetState() {
  presets.forEach((button) => {
    const active = button.dataset.inside === insideSlider.value && button.dataset.outside === outsideSlider.value;
    button.classList.toggle("active", active);
  });
}

function updateDirectionClass() {
  const direction = targetInternalWater - internalWater;
  stage.classList.toggle("running", lowerWaterMoleculesActive && (running || Math.abs(direction) > 0.18));
  stage.classList.toggle("water-active", lowerWaterMoleculesActive);
  stage.classList.toggle("inward", direction > 0.18);
  stage.classList.toggle("outward", direction < -0.18);
}

function render() {
  const type = solutionType(true);
  const cellState = type.key === "hyper" ? "hypertonic" : type.key === "hypo" ? "hypotonic" : "isotonic";
  const scale = 0.78 + (internalWater - 55) / 90 * 0.42;
  const effective = effectiveConcentrations();
  const balanced = Math.abs(effective.inside - effective.outside) < 0.004;

  insideValue.textContent = `${insideSlider.value}%`;
  outsideValue.textContent = `${outsideSlider.value}%`;
  stateLabel.textContent = balanced ? t().solutions.equilibrium.name : type.name;
  solutionName.textContent = balanced ? t().solutions.equilibrium.name : type.name;
  solutionDetail.textContent = balanced ? t().solutions.equilibrium.detail : type.detail;
  explanation.textContent = balanced && running === false ? t().solutions.equilibrium.text : type.text;
  cell.style.setProperty("--cell-scale", scale.toFixed(3));
  renderInsideWater();
  stage.classList.toggle("isotonic", cellState === "isotonic");
  stage.classList.toggle("hypertonic", cellState === "hypertonic");
  stage.classList.toggle("hypotonic", cellState === "hypotonic");
  updateCellShape(cellState);
  updatePresetState();
  updateDirectionClass();
}

function resetWaterForCurrentConcentration() {
  internalWater = initialInternalWater;
  activeInsideSolute = Number(insideSlider.value);
  activeOutsideSolute = Number(outsideSlider.value);
  targetInternalWater = computeTargetWater();
  running = false;
  lowerWaterMoleculesActive = false;
  cancelAnimationFrame(frameId);
  frameId = null;
  lastTime = 0;
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  render();
}

function tick(time) {
  if (!running) {
    return;
  }

  if (!lastTime) {
    lastTime = time;
  }

  const dt = Math.min(50, time - lastTime);
  lastTime = time;
  const distance = targetInternalWater - internalWater;
  const step = Math.sign(distance) * Math.min(Math.abs(distance), dt * 0.018);
  internalWater += step;

  if (Math.abs(targetInternalWater - internalWater) <= 0.12) {
    internalWater = targetInternalWater;
    running = false;
    lowerWaterMoleculesActive = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
  }

  render();
  frameId = requestAnimationFrame(tick);
}

function startSimulation() {
  activeInsideSolute = Number(insideSlider.value);
  activeOutsideSolute = Number(outsideSlider.value);
  targetInternalWater = computeTargetWater();
  if (Math.abs(targetInternalWater - internalWater) <= 0.12) {
    lowerWaterMoleculesActive = true;
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    render();
    return;
  }

  running = true;
  lowerWaterMoleculesActive = true;
  startBtn.disabled = true;
  pauseBtn.disabled = false;
  lastTime = 0;
  cancelAnimationFrame(frameId);
  frameId = requestAnimationFrame(tick);
  render();
}

function pauseSimulation() {
  running = false;
  lowerWaterMoleculesActive = false;
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  cancelAnimationFrame(frameId);
  frameId = null;
  render();
}

function restartSimulation() {
  resetWaterForCurrentConcentration();
}

function concentrationChanged() {
  insideValue.textContent = `${insideSlider.value}%`;
  outsideValue.textContent = `${outsideSlider.value}%`;
  renderSoluteDistribution();
  updatePresetState();
}

function applyLanguage(lang) {
  currentLang = translations[lang] ? lang : "es";
  const copy = t();

  document.documentElement.lang = currentLang;
  document.title = copy.pageTitle;
  languageCurrent.textContent = copy.languageName;

  setHTML("#topLegendWater", copy.topWater);
  setHTML("#topLabelMembrane", copy.topMembrane);
  setText("#topLabelSolute", copy.topSolute);
  setHTML("#topLabelLeft", copy.topLow);
  setHTML("#topLabelRight", copy.topHigh);
  setText("#topEquilibriumBadge", copy.topEquilibrium);
  setText("#controlsTitle", copy.controls);
  setText("#controlsIntro", copy.intro);
  setText("#insideLabel", copy.insideLabel);
  setText("#outsideLabel", copy.outsideLabel);
  setText("#quickTitle", copy.quick);
  setText("#soluteNote", copy.note);
  setText("#languageLabel", copy.language);
  setText("#statePrefix", copy.statePrefix);
  setText("#transportIn", copy.transportIn);
  setText("#transportOut", copy.transportOut);
  setText("#infoTitle", copy.info);
  setText("#happeningTitle", copy.happening);
  setText("#factsTitle", copy.facts);
  setText("#factsText", copy.factsText);
  setText("#solutionTitle", copy.solutionTitle);

  [...document.querySelectorAll(".run.start .run-label")].forEach((label) => {
    label.textContent = copy.start;
  });
  [...document.querySelectorAll(".run.pause .run-label")].forEach((label) => {
    label.textContent = copy.pause;
  });
  [...document.querySelectorAll(".run.restart .run-label")].forEach((label) => {
    label.textContent = copy.restart;
  });
  presets.forEach((button) => {
    const presetKey = button.dataset.preset;
    if (copy.presets[presetKey]) {
      button.textContent = copy.presets[presetKey];
    }
  });

  languageMenu.querySelectorAll("[data-lang]").forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === currentLang);
  });

  render();
}

function closeLanguageMenu() {
  languageMenu.hidden = true;
  languageToggle.setAttribute("aria-expanded", "false");
}

insideSlider.addEventListener("input", concentrationChanged);
outsideSlider.addEventListener("input", concentrationChanged);
startBtn.addEventListener("click", startSimulation);
pauseBtn.addEventListener("click", pauseSimulation);
restartBtn.addEventListener("click", restartSimulation);
topStartBtn.addEventListener("click", startTopDemo);
topPauseBtn.addEventListener("click", pauseTopDemo);
topRestartBtn.addEventListener("click", restartTopDemo);
languageToggle.addEventListener("click", () => {
  const isOpen = !languageMenu.hidden;
  languageMenu.hidden = isOpen;
  languageToggle.setAttribute("aria-expanded", String(!isOpen));
});

languageMenu.addEventListener("click", (event) => {
  const button = event.target.closest("[data-lang]");
  if (!button) {
    return;
  }
  applyLanguage(button.dataset.lang);
  closeLanguageMenu();
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".language-card")) {
    closeLanguageMenu();
  }
});

presets.forEach((button) => {
  button.addEventListener("click", () => {
    insideSlider.value = button.dataset.inside;
    outsideSlider.value = button.dataset.outside;
    concentrationChanged();
  });
});

buildParticles();
createPhospholipids();
buildTopDemo();
resetWaterForCurrentConcentration();
renderTopDemo();
applyLanguage("es");

window.addEventListener("resize", () => {
  const currentState = stage.classList.contains("hypertonic")
    ? "hypertonic"
    : stage.classList.contains("hypotonic")
      ? "hypotonic"
      : "isotonic";
  updateCellShape(currentState);
});
