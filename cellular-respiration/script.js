const controlGroup = {
  glucose: 90,
  oxygen: 96,
  mitochondria: 80,
  demand: 55,
  temperature: 37,
};

const state = { ...controlGroup };
let language = "es";

const translations = {
  es: {
    title: "Respiración celular BioLab",
    subtitle: "Explora cómo la célula transforma glucosa y oxígeno en ATP, CO₂, agua y calor.",
    controlPanel: "Panel celular",
    controlTag: "CONTROL",
    controlGroup: "Grupo control: respiración aeróbica estable",
    glucoseVar: "Glucosa disponible",
    oxygenVar: "Oxígeno disponible",
    mitochondriaVar: "Actividad mitocondrial",
    demandVar: "Demanda energética",
    temperatureVar: "Temperatura celular",
    glucoseHelp: "Combustible químico que alimenta glucólisis y respiración aeróbica.",
    oxygenHelp: "Permite que la cadena de transporte de electrones produzca ATP.",
    mitochondriaHelp: "Representa enzimas, membranas internas y capacidad de producir ATP.",
    demandHelp: "Simula reposo, ejercicio o una célula con alta actividad metabólica.",
    temperatureHelp: "Afecta la velocidad enzimática; el exceso reduce eficiencia.",
    indicators: "Indicadores metabólicos",
    relativeFlow: "valores relativos (%)",
    atpShort: "ATP",
    debtShort: "Deuda O₂",
    co2Short: "CO₂",
    lactateShort: "Lactato",
    metricsTitle: "Lecturas del laboratorio",
    oxygenState: "Estado del oxígeno",
    temperatureState: "Estado térmico",
    atpMetric: "Producción de ATP (ATP/glucosa)",
    efficiencyMetric: "Eficiencia aeróbica (%)",
    oxygenDebtMetric: "Deuda de oxígeno (% O₂)",
    lactateMetric: "Fermentación láctica (mmol/L)",
    atpReservoir: "ATP producido",
    co2Reservoir: "CO₂ liberado",
    lactateReservoir: "Lactato",
    balanceReservoir: "Balance celular",
    legendGlucose: "Glucosa",
    legendPyruvate: "Piruvato",
    legendOxygen: "Oxígeno",
    legendAtp: "ATP",
    legendCo2: "CO₂",
    legendWater: "Agua",
    legendLactate: "Lactato",
    creditText: "Desarrollada por Rafael Otero",
    diagram: {
      equation: "C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP",
      cytoplasm: "Citoplasma",
      glycolysis: "Glucólisis",
      pyruvate: "Piruvato",
      mitochondria: "Mitocondria",
      krebs: "Ciclo de Krebs",
      etc: "Cadena de transporte de electrones",
      atp: "ATP",
      co2: "CO₂",
      water: "H₂O",
      lactate: "Lactato",
      extracellular: "Medio extracelular",
      heat: "Calor",
    },
    processInfo: {
      cytoplasm: {
        title: "Citoplasma",
        text: "Medio acuoso donde ocurre la glucólisis. Aquí la glucosa inicia su degradación y se forman piruvato, una pequeña ganancia de ATP y transportadores reducidos.",
      },
      glycolysis: {
        title: "Glucólisis",
        text: "Rompe una molécula de glucosa en dos moléculas de piruvato. No requiere oxígeno y produce una ganancia neta aproximada de 2 ATP por glucosa.",
      },
      pyruvate: {
        title: "Piruvato",
        text: "Producto final de la glucólisis. Si hay oxígeno y mitocondrias activas entra a la mitocondria; si falta oxígeno puede desviarse hacia lactato.",
      },
      mitochondria: {
        title: "Mitocondria",
        text: "Organelo encargado de la respiración aeróbica. En su matriz ocurre el ciclo de Krebs y en su membrana interna la cadena de transporte de electrones produce la mayor parte del ATP celular.",
      },
      krebs: {
        title: "Ciclo de Krebs",
        text: "Ocurre en la matriz mitocondrial. Oxida derivados del piruvato, libera CO₂ y carga transportadores de electrones que alimentan la producción alta de ATP.",
      },
      etc: {
        title: "Cadena de transporte de electrones",
        text: "Está en la membrana interna mitocondrial. Usa oxígeno como aceptor final de electrones y genera el gradiente que impulsa la síntesis de ATP.",
      },
      co2: {
        title: "CO₂",
        text: "Producto de la oxidación del carbono de la glucosa durante la respiración aeróbica. Sale de la célula como desecho metabólico.",
      },
      atp: {
        title: "ATP",
        text: "Molécula de transferencia energética. Su producción aumenta cuando glucosa, oxígeno, temperatura y actividad mitocondrial están en rangos adecuados.",
      },
      heat: {
        title: "Calor",
        text: "Parte de la energía química se libera como calor. La temperatura moderada favorece enzimas; el exceso térmico reduce eficiencia celular.",
      },
      lactate: {
        title: "Lactato",
        text: "Aumenta cuando la demanda energética supera la disponibilidad de oxígeno o la capacidad mitocondrial. Indica mayor fermentación láctica.",
      },
      extracellular: {
        title: "Medio extracelular",
        text: "Entorno externo de la célula. Desde allí ingresan glucosa y oxígeno, y hacia allí se liberan CO₂, agua, calor y otros productos.",
      },
    },
    oxygenLabels: {
      optimal: "Óptimo",
      limited: "Limitado",
      low: "Bajo: deuda de O₂",
      critical: "Crítico: fermentación",
    },
    tempLabels: {
      cold: "Baja: enzimas lentas",
      optimal: "Rango enzimático",
      warm: "Alta: estrés térmico",
      hot: "Muy alta: daño enzimático",
    },
    status: {
      stableTitle: "Respiración aeróbica estable",
      stableText: "La célula tiene glucosa, oxígeno y actividad mitocondrial suficientes para producir ATP de forma eficiente.",
      imbalanceTitle: "Metabolismo en desequilibrio",
      lowGlucose: "La glucosa baja limita la glucólisis: llega menos piruvato a la mitocondria y puede caer la producción de ATP.",
      highGlucose: "La glucosa alta aporta combustible, pero si oxígeno o mitocondrias no acompañan, no toda se transforma eficientemente.",
      lowOxygen: "El oxígeno bajo reduce la cadena de transporte de electrones: aparece deuda de oxígeno y aumenta la fermentación láctica.",
      criticalOxygen: "Con oxígeno crítico, la célula depende más de fermentación; produce menos ATP y acumula lactato.",
      lowMito: "La baja actividad mitocondrial reduce ciclo de Krebs y cadena de transporte, incluso si hay glucosa disponible.",
      highDemand: "La demanda energética alta consume ATP rápido; si supera la capacidad aeróbica, aumenta lactato.",
      coldTemp: "Temperatura baja vuelve más lentas las reacciones enzimáticas y reduce el rendimiento metabólico.",
      hotTemp: "Temperatura alta estresa enzimas y membranas; si es muy alta, baja la eficiencia y el balance celular.",
    },
  },
  en: {
    title: "Cellular Respiration BioLab",
    subtitle: "Explore how the cell transforms glucose and oxygen into ATP, CO₂, water, and heat.",
    controlPanel: "Cell panel",
    controlTag: "CONTROL",
    controlGroup: "Control group: stable aerobic respiration",
    glucoseVar: "Available glucose",
    oxygenVar: "Available oxygen",
    mitochondriaVar: "Mitochondrial activity",
    demandVar: "Energy demand",
    temperatureVar: "Cell temperature",
    glucoseHelp: "Chemical fuel that feeds glycolysis and aerobic respiration.",
    oxygenHelp: "Allows the electron transport chain to produce ATP.",
    mitochondriaHelp: "Represents enzymes, inner membranes, and ATP-producing capacity.",
    demandHelp: "Simulates rest, exercise, or a highly active cell.",
    temperatureHelp: "Affects enzyme speed; excess temperature reduces efficiency.",
    indicators: "Metabolic indicators",
    relativeFlow: "relative values (%)",
    atpShort: "ATP",
    debtShort: "O₂ debt",
    co2Short: "CO₂",
    lactateShort: "Lactate",
    metricsTitle: "Lab readings",
    oxygenState: "Oxygen state",
    temperatureState: "Thermal state",
    atpMetric: "ATP production (ATP/glucose)",
    efficiencyMetric: "Aerobic efficiency (%)",
    oxygenDebtMetric: "Oxygen debt (% O₂)",
    lactateMetric: "Lactic fermentation (mmol/L)",
    atpReservoir: "ATP produced",
    co2Reservoir: "CO₂ released",
    lactateReservoir: "Lactate",
    balanceReservoir: "Cell balance",
    legendGlucose: "Glucose",
    legendPyruvate: "Pyruvate",
    legendOxygen: "Oxygen",
    legendAtp: "ATP",
    legendCo2: "CO₂",
    legendWater: "Water",
    legendLactate: "Lactate",
    creditText: "Developed by Rafael Otero",
    diagram: {
      equation: "C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP",
      cytoplasm: "Cytoplasm",
      glycolysis: "Glycolysis",
      pyruvate: "Pyruvate",
      mitochondria: "Mitochondrion",
      krebs: "Krebs cycle",
      etc: "Electron transport chain",
      atp: "ATP",
      co2: "CO₂",
      water: "H₂O",
      lactate: "Lactate",
      extracellular: "Extracellular medium",
      heat: "Heat",
    },
    processInfo: {
      cytoplasm: {
        title: "Cytoplasm",
        text: "Aqueous medium where glycolysis occurs. Glucose begins to break down here, forming pyruvate, a small ATP yield, and reduced carriers.",
      },
      glycolysis: {
        title: "Glycolysis",
        text: "Splits one glucose molecule into two pyruvate molecules. It does not require oxygen and yields about 2 net ATP per glucose.",
      },
      pyruvate: {
        title: "Pyruvate",
        text: "Final product of glycolysis. With oxygen and active mitochondria it enters the mitochondrion; when oxygen is limited it may become lactate.",
      },
      mitochondria: {
        title: "Mitochondrion",
        text: "Organelle responsible for aerobic respiration. The Krebs cycle occurs in its matrix, and the electron transport chain in its inner membrane produces most cellular ATP.",
      },
      krebs: {
        title: "Krebs cycle",
        text: "Occurs in the mitochondrial matrix. It oxidizes pyruvate derivatives, releases CO₂, and loads electron carriers for high ATP production.",
      },
      etc: {
        title: "Electron transport chain",
        text: "Located in the inner mitochondrial membrane. It uses oxygen as the final electron acceptor and builds the gradient that drives ATP synthesis.",
      },
      co2: {
        title: "CO₂",
        text: "Product of carbon oxidation from glucose during aerobic respiration. It leaves the cell as a metabolic waste product.",
      },
      atp: {
        title: "ATP",
        text: "Energy-transfer molecule. Its production rises when glucose, oxygen, temperature, and mitochondrial activity are within suitable ranges.",
      },
      heat: {
        title: "Heat",
        text: "Some chemical energy is released as heat. Moderate temperature supports enzymes; excessive heat lowers cellular efficiency.",
      },
      lactate: {
        title: "Lactate",
        text: "Rises when energy demand exceeds oxygen availability or mitochondrial capacity. It indicates increased lactic fermentation.",
      },
      extracellular: {
        title: "Extracellular medium",
        text: "The environment outside the cell. Glucose and oxygen enter from here, while CO₂, water, heat, and other products are released outward.",
      },
    },
    oxygenLabels: {
      optimal: "Optimal",
      limited: "Limited",
      low: "Low: O₂ debt",
      critical: "Critical: fermentation",
    },
    tempLabels: {
      cold: "Low: slow enzymes",
      optimal: "Enzyme range",
      warm: "High: heat stress",
      hot: "Very high: enzyme damage",
    },
    status: {
      stableTitle: "Stable aerobic respiration",
      stableText: "The cell has enough glucose, oxygen, and mitochondrial activity to produce ATP efficiently.",
      imbalanceTitle: "Metabolism out of balance",
      lowGlucose: "Low glucose limits glycolysis: less pyruvate reaches the mitochondrion, and ATP production may fall.",
      highGlucose: "High glucose provides fuel, but if oxygen or mitochondria do not keep up, not all of it is transformed efficiently.",
      lowOxygen: "Low oxygen reduces the electron transport chain: oxygen debt appears and lactic fermentation increases.",
      criticalOxygen: "With critical oxygen, the cell relies more on fermentation; it produces less ATP and accumulates lactate.",
      lowMito: "Low mitochondrial activity reduces the Krebs cycle and transport chain, even if glucose is available.",
      highDemand: "High energy demand uses ATP quickly; if it exceeds aerobic capacity, lactate rises.",
      coldTemp: "Low temperature slows enzyme reactions and reduces metabolic performance.",
      hotTemp: "High temperature stresses enzymes and membranes; if it is very high, efficiency and cell balance fall.",
    },
  },
};

const sliders = document.querySelectorAll("[data-variable]");
const valueLabels = document.querySelectorAll("[data-value]");
const controlButton = document.querySelector("[data-action='control']");
const languageButton = document.querySelector("[data-lang]");
const textLabels = document.querySelectorAll("[data-i18n]");
const diagramLabels = document.querySelectorAll("[data-diagram-label]");
const processButtons = document.querySelectorAll("[data-process]");
const processPopover = document.querySelector("[data-process-popover]");
const processTitle = document.querySelector("[data-process-title]");
const processText = document.querySelector("[data-process-text]");
const processClose = document.querySelector("[data-process-close]");
const developerCredit = document.querySelector("[data-developer-credit]");
const creditClose = document.querySelector("[data-credit-close]");
const metricBars = document.querySelectorAll("[data-metric]");
const chartBars = document.querySelectorAll("[data-bar]");
const chartValues = document.querySelectorAll("[data-bar-value]");
const labValues = document.querySelectorAll("[data-lab-value]");
const reservoirValues = document.querySelectorAll("[data-reservoir]");
const statusTitle = document.querySelector("[data-status-title]");
const consequenceText = document.querySelector("[data-consequence]");
const oxygenReadout = document.querySelector("[data-oxygen-readout]");
const oxygenLevel = document.querySelector("[data-oxygen-level]");
const tempReadout = document.querySelector("[data-temp-readout]");
const tempLevel = document.querySelector("[data-temp-level]");
const scene = document.querySelector(".cell-scene");
const particleGroups = {
  glucose: document.querySelectorAll(".particle-glucose"),
  oxygen: document.querySelectorAll(".particle-o2"),
  pyruvate: document.querySelectorAll(".particle-pyruvate"),
  atp: document.querySelectorAll(".particle-atp"),
  co2: document.querySelectorAll(".particle-co2"),
  water: document.querySelectorAll(".particle-h2o"),
  lactate: document.querySelectorAll(".particle-lactate"),
};

function clamp(value, min = 0, max = 100) {
  return Math.min(max, Math.max(min, value));
}

function setState(nextState) {
  Object.assign(state, nextState);
  sliders.forEach((slider) => {
    slider.value = state[slider.dataset.variable];
  });
  render();
}

function getOxygenStage(oxygen) {
  if (oxygen >= 86) return "optimal";
  if (oxygen >= 68) return "limited";
  if (oxygen >= 48) return "low";
  return "critical";
}

function getTemperatureStage(temperature) {
  if (temperature < 34) return "cold";
  if (temperature <= 38) return "optimal";
  if (temperature <= 41) return "warm";
  return "hot";
}

function calculateMetrics() {
  const tempDistance = Math.abs(state.temperature - 37);
  const tempEfficiency = clamp(100 - tempDistance ** 2.05 * 2.2);
  const glucoseSupply = clamp(((state.glucose - 20) / 160) * 100);
  const oxygenSupply = clamp(((state.oxygen - 30) / 70) * 100);
  const mitoCapacity = state.mitochondria;
  const aerobicCapacity = clamp(glucoseSupply * 0.28 + oxygenSupply * 0.34 + mitoCapacity * 0.28 + tempEfficiency * 0.1);
  const demandPressure = clamp(state.demand / 1.4);
  const oxygenShortage = clamp(state.demand - oxygenSupply * 0.88);
  const mitoShortage = clamp(state.demand - mitoCapacity * 0.95);
  const tempStress = clamp(tempDistance * 12 + Math.max(0, state.temperature - 40) * 14);
  const oxygenDebt = clamp(oxygenShortage * 0.8 + mitoShortage * 0.32 + Math.max(0, state.demand - aerobicCapacity) * 0.42);
  const lactate = clamp(oxygenDebt * 0.72 + Math.max(0, state.demand - 95) * 0.34 + Math.max(0, 45 - oxygenSupply) * 0.52);
  const atp = clamp(aerobicCapacity * 0.84 + demandPressure * 0.24 + 8 - oxygenDebt * 0.3 - tempStress * 0.24);
  const co2 = clamp(atp * 0.78 + glucoseSupply * 0.14 + oxygenSupply * 0.08 - lactate * 0.12);
  const efficiency = clamp(atp - lactate * 0.38 - oxygenDebt * 0.28 - tempStress * 0.24 + 16);
  const balance = clamp(
    100 -
      Math.abs(90 - state.glucose) * 0.18 -
      Math.abs(96 - state.oxygen) * 0.38 -
      Math.abs(80 - state.mitochondria) * 0.26 -
      Math.abs(55 - state.demand) * 0.24 -
      tempStress * 0.48 -
      lactate * 0.22,
  );

  return {
    glucoseSupply,
    oxygenSupply,
    pyruvateFlow: clamp(glucoseSupply * 0.68 + Math.min(state.demand, 100) * 0.22 + tempEfficiency * 0.1),
    respirationFlow: clamp(aerobicCapacity - oxygenDebt * 0.34 - lactate * 0.16),
    oxygenStage: getOxygenStage(state.oxygen),
    tempStage: getTemperatureStage(state.temperature),
    atp,
    co2,
    efficiency,
    oxygenDebt,
    lactate,
    balance,
  };
}

function durationFromFlow(flow, slowSeconds, fastSeconds) {
  const ratio = clamp(flow, 0, 100) / 100;
  return `${(slowSeconds - (slowSeconds - fastSeconds) * ratio).toFixed(2)}s`;
}

function setParticleCount(group, activeCount) {
  const particles = particleGroups[group];
  particles.forEach((particle, index) => {
    particle.classList.toggle("is-paused", index >= activeCount);
  });
}

function countFromFlow(flow, total, minimum = 1) {
  if (flow < 8) return 0;
  return clamp(Math.ceil((flow / 100) * total), minimum, total);
}

function renderParticleSystem(metrics) {
  const glucoseCount = countFromFlow(metrics.glucoseSupply, particleGroups.glucose.length, 1);
  const oxygenCount = countFromFlow(metrics.oxygenSupply, particleGroups.oxygen.length, 1);
  const pyruvateCount = countFromFlow(metrics.pyruvateFlow, particleGroups.pyruvate.length, 1);
  const atpCount = countFromFlow(metrics.atp, particleGroups.atp.length, 1);
  const co2Count = countFromFlow(metrics.co2, particleGroups.co2.length, 1);
  const waterCount = countFromFlow(metrics.respirationFlow, particleGroups.water.length, 1);
  const lactateCount = countFromFlow(metrics.lactate, particleGroups.lactate.length, 0);

  setParticleCount("glucose", glucoseCount);
  setParticleCount("oxygen", oxygenCount);
  setParticleCount("pyruvate", pyruvateCount);
  setParticleCount("atp", atpCount);
  setParticleCount("co2", co2Count);
  setParticleCount("water", waterCount);
  setParticleCount("lactate", lactateCount);

  scene.style.setProperty("--glucose-speed", durationFromFlow(metrics.glucoseSupply, 11, 4.8));
  scene.style.setProperty("--oxygen-speed", durationFromFlow(metrics.oxygenSupply, 10.5, 4.4));
  scene.style.setProperty("--pyruvate-speed", durationFromFlow(metrics.pyruvateFlow, 11, 4.6));
  scene.style.setProperty("--atp-speed", durationFromFlow(metrics.atp, 10.5, 3.8));
  scene.style.setProperty("--co2-speed", durationFromFlow(metrics.co2, 11, 4.8));
  scene.style.setProperty("--water-speed", durationFromFlow(metrics.respirationFlow, 11, 5));
  scene.style.setProperty("--lactate-speed", durationFromFlow(metrics.lactate, 10, 4.6));
}

function getLabValue(metric, metrics) {
  if (metric === "atpYield") return (metrics.atp * 0.32).toFixed(1);
  if (metric === "efficiency") return `${Math.round(metrics.efficiency)}%`;
  if (metric === "oxygenDebt") return `${Math.round(metrics.oxygenDebt)}%`;
  if (metric === "lactateMmol") return (0.7 + (metrics.lactate / 100) * 4.5).toFixed(1);
  return "";
}

function getStatus(metrics) {
  const t = translations[language].status;
  const messages = [];

  if (metrics.balance > 78 && metrics.oxygenStage === "optimal" && metrics.tempStage === "optimal" && metrics.lactate < 25) {
    return { title: t.stableTitle, text: t.stableText };
  }

  if (state.glucose < 48) messages.push(t.lowGlucose);
  if (state.glucose > 145) messages.push(t.highGlucose);
  if (metrics.oxygenStage === "low") messages.push(t.lowOxygen);
  if (metrics.oxygenStage === "critical") messages.push(t.criticalOxygen);
  if (state.mitochondria < 42) messages.push(t.lowMito);
  if (state.demand > 98) messages.push(t.highDemand);
  if (metrics.tempStage === "cold") messages.push(t.coldTemp);
  if (metrics.tempStage === "warm" || metrics.tempStage === "hot") messages.push(t.hotTemp);

  return {
    title: t.imbalanceTitle,
    text: messages.slice(0, 3).join(" ") || t.stableText,
  };
}

function paintMetric(bar, metric, value) {
  bar.style.width = `${clamp(value)}%`;
  bar.classList.remove("warning", "danger");

  if (metric === "oxygenDebt" || metric === "lactate") {
    if (value > 65) bar.classList.add("danger");
    else if (value > 34) bar.classList.add("warning");
    return;
  }

  if (value < 36) bar.classList.add("danger");
  else if (value < 58) bar.classList.add("warning");
}

function renderTranslations() {
  const labels = translations[language];
  textLabels.forEach((label) => {
    label.textContent = labels[label.dataset.i18n];
  });
  diagramLabels.forEach((label) => {
    label.textContent = labels.diagram[label.dataset.diagramLabel];
  });
  languageButton.textContent = language === "es" ? "English" : "Español";
  languageButton.dataset.lang = language === "es" ? "en" : "es";
  document.documentElement.lang = language;

  if (processPopover.classList.contains("is-visible")) {
    const active = processPopover.dataset.activeProcess;
    if (active) showProcessInfo(active);
  }
}

function showProcessInfo(process) {
  const info = translations[language].processInfo[process];
  if (!info) return;
  processTitle.textContent = info.title;
  processText.textContent = info.text;
  processPopover.dataset.activeProcess = process;
  processPopover.classList.add("is-visible");
}

function hideProcessInfo() {
  processPopover.classList.remove("is-visible");
  delete processPopover.dataset.activeProcess;
}

function render() {
  sliders.forEach((slider) => {
    state[slider.dataset.variable] = Number(slider.value);
  });

  const metrics = calculateMetrics();
  const status = getStatus(metrics);

  valueLabels.forEach((label) => {
    label.textContent = state[label.dataset.value];
  });

  metricBars.forEach((bar) => {
    paintMetric(bar, bar.dataset.metric, metrics[bar.dataset.metric]);
  });

  chartBars.forEach((bar) => {
    bar.style.height = `${Math.max(2, clamp(metrics[bar.dataset.bar]))}%`;
  });

  chartValues.forEach((value) => {
    value.textContent = `${Math.round(clamp(metrics[value.dataset.barValue]))}%`;
  });

  labValues.forEach((value) => {
    value.textContent = getLabValue(value.dataset.labValue, metrics);
  });

  reservoirValues.forEach((value) => {
    value.textContent = Math.round(metrics[value.dataset.reservoir]);
  });

  scene.style.setProperty("--glucose-flow", clamp(metrics.glucoseSupply, 8, 100) / 100);
  scene.style.setProperty("--oxygen-flow", clamp(metrics.oxygenSupply, 5, 100) / 100);
  scene.style.setProperty("--atp-flow", clamp(metrics.atp, 4, 100) / 100);
  scene.style.setProperty("--co2-flow", clamp(metrics.co2, 4, 100) / 100);
  scene.style.setProperty("--lactate-flow", clamp(metrics.lactate, 0, 100) / 100);
  renderParticleSystem(metrics);

  oxygenReadout.classList.remove("warning", "danger");
  if (metrics.oxygenStage === "limited" || metrics.oxygenStage === "low") oxygenReadout.classList.add("warning");
  if (metrics.oxygenStage === "critical") oxygenReadout.classList.add("danger");
  oxygenLevel.textContent = translations[language].oxygenLabels[metrics.oxygenStage];

  tempReadout.classList.remove("warning", "danger");
  if (metrics.tempStage === "cold" || metrics.tempStage === "warm") tempReadout.classList.add("warning");
  if (metrics.tempStage === "hot") tempReadout.classList.add("danger");
  tempLevel.textContent = translations[language].tempLabels[metrics.tempStage];

  statusTitle.textContent = status.title;
  consequenceText.textContent = status.text;
}

function getScenarioFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const scenario = {};
  Object.keys(controlGroup).forEach((key) => {
    if (!params.has(key)) return;
    const value = Number(params.get(key));
    if (Number.isFinite(value)) scenario[key] = value;
  });
  return Object.keys(scenario).length ? { ...controlGroup, ...scenario } : controlGroup;
}

function getLanguageFromUrl() {
  const lang = new URLSearchParams(window.location.search).get("lang");
  return lang === "en" || lang === "es" ? lang : language;
}

sliders.forEach((slider) => {
  slider.addEventListener("input", render);
});

controlButton.addEventListener("click", () => setState(controlGroup));

languageButton.addEventListener("click", () => {
  language = languageButton.dataset.lang;
  renderTranslations();
  render();
});

processButtons.forEach((button) => {
  button.addEventListener("click", () => showProcessInfo(button.dataset.process));
});

processClose.addEventListener("click", hideProcessInfo);
creditClose.addEventListener("click", () => {
  developerCredit.classList.add("is-hidden");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") hideProcessInfo();
});

language = getLanguageFromUrl();
renderTranslations();
setState(getScenarioFromUrl());
