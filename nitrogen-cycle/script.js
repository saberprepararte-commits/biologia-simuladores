const controlGroup = {
  plants: 100,
  bacteria: 100,
  ammonia: 8,
  nitrate: 25,
};

const translations = {
  es: {
    ui: {
      title: "Ciclo del nitrógeno BioLab",
      subtitle: "Explora cómo el nitrógeno cambia entre atmósfera, suelo, microorganismos y plantas.",
      controlPanel: "Panel nitrogenado",
      controlTag: "CONTROL",
      controlGroup: "Grupo control: N₂ atmosférico 78%",
      plantsVar: "Número de plantas",
      bacteriaVar: "Bacterias fijadoras de N₂",
      ammoniaVar: "Amoníaco / amonio",
      nitrateVar: "Nitrato",
      plantsHelp: "Controla la demanda de nitrato y la asimilación vegetal.",
      bacteriaHelp: "Aumentan la entrada biológica de nitrógeno al suelo.",
      ammoniaHelp: "Sustrato que alimenta la nitrificación; en exceso puede estresar raíces.",
      nitrateHelp: "Forma disponible para asimilación; en exceso puede lixiviarse.",
      plantNitrogen: "Nitrógeno en plantas",
      soilNitrogen: "Nitrógeno en suelo",
      microbialActivity: "Actividad microbiana",
      systemBalance: "Balance del ciclo",
      indicators: "Indicadores del ciclo",
      relativeFlow: "flujos relativos",
      metricsTitle: "Lecturas del laboratorio",
      ammoniaState: "Estado del amoníaco",
      leachingState: "Estado de lixiviación",
      plantAccess: "Disponibilidad para plantas",
      fixationMetric: "Fijación biológica",
      leachingRisk: "Riesgo de lixiviación",
      ammoniaStress: "Estrés por amoníaco",
      plantAccessShort: "Plantas",
      fixationShort: "Fij.",
      leachingShort: "Lix.",
      stressShort: "Estrés",
    },
    diagram: {
      atmosphere: "Nitrógeno atmosférico (N₂)",
      plants: "Plantas",
      assimilation: "Asimilación",
      rootBacteria: "Bacterias fijadoras de N₂ de las raíces",
      soilBacteria: "Bacterias fijadoras de N₂ del suelo",
      decomposers: "Descomponedores<br>(bacterias, hongos)",
      ammonification: "Amonificación",
      ammonium: "Amonio (NH₄⁺)",
      nitrification: "Nitrificación",
      nitrite: "Nitrito (NO₂⁻)",
      nitrate: "Nitrato (NO₃⁻)",
      nitrifyingBacteria: "Bacterias nitrificantes",
      denitrifyingBacteria: "Bacterias desnitrificantes",
      denitrification: "Desnitrificación",
    },
    status: {
      stableTitle: "Grupo control estable",
      stableText: "Los reservorios se mantienen estables. Hay fijación suficiente, nitrato disponible para las plantas y bajo riesgo de pérdida de nitrógeno.",
      moderateTitle: "Ciclo con cambios moderados",
      unbalancedTitle: "Ciclo en desequilibrio",
      fallback: "El ciclo funciona, pero ya se alejó del control: observa si el nitrógeno queda retenido en plantas o se acumula en el suelo.",
      lowBacteria: "Pocas bacterias fijadoras reducen la entrada de nitrógeno al suelo; con el tiempo bajaría la producción de amonio y nitrato.",
      highBacteria: "Muchas bacterias fijadoras aumentan la entrada biológica de nitrógeno y pueden elevar los compuestos nitrogenados del suelo.",
      lowPlants: "Con pocas plantas se asimila menos nitrato; aumenta la probabilidad de que el nitrato se acumule o se pierda por lixiviación.",
      highPlants: "Muchas plantas elevan la demanda de nitrógeno; si el nitrato no alcanza, aparece competencia y menor crecimiento.",
      highAmmonia: "El amoníaco alto puede estresar raíces y microorganismos; la nitrificación tendría que transformarlo rápidamente para evitar toxicidad.",
      lowAmmonia: "El amoníaco bajo limita el sustrato que alimenta la nitrificación hacia nitritos y nitratos.",
      optimalAmmonia: "El amoníaco está en un rango útil: aporta sustrato para la nitrificación sin provocar estrés importante en las raíces.",
      alertAmmonia: "El amoníaco empieza a ser elevado: puede favorecer la nitrificación, pero ya aumenta el estrés radicular.",
      toxicAmmonia: "El amoníaco muy alto puede volverse tóxico: reduce el crecimiento de raíces, altera la actividad microbiana y baja el balance del ciclo.",
      lowLeaching: "La lixiviación baja ayuda a conservar nitrato en la zona de raíces, siempre que las plantas puedan asimilarlo.",
      retentionRisk: "La lixiviación es baja, pero con mucho nitrato y pocas plantas puede acumularse nitrógeno en el suelo y aumentar la desnitrificación si el suelo se satura de agua.",
      highLeaching: "La lixiviación alta arrastra nitrato fuera de la zona de raíces: baja la fertilidad del suelo y aumenta el riesgo de contaminación de aguas subterráneas.",
      highNitrate: "El nitrato alto favorece la asimilación, pero si supera la demanda vegetal aumenta el riesgo de lixiviación y desnitrificación.",
      lowNitrate: "El nitrato bajo limita la asimilación de las plantas y puede reducir el crecimiento vegetal.",
    },
  },
  en: {
    ui: {
      title: "Nitrogen Cycle BioLab",
      subtitle: "Explore how nitrogen moves through the atmosphere, soil, microorganisms, and plants.",
      controlPanel: "Nitrogen panel",
      controlTag: "CONTROL",
      controlGroup: "Control group: atmospheric N<sub>2</sub> 78%",
      plantsVar: "Number of plants",
      bacteriaVar: "N<sub>2</sub>-fixing bacteria",
      ammoniaVar: "Ammonia / ammonium",
      nitrateVar: "Nitrate",
      plantsHelp: "Controls nitrate demand and plant assimilation.",
      bacteriaHelp: "Increase biological nitrogen input into soil.",
      ammoniaHelp: "Substrate for nitrification; in excess it can stress roots.",
      nitrateHelp: "Available form for assimilation; in excess it can leach.",
      plantNitrogen: "Nitrogen in plants",
      soilNitrogen: "Nitrogen in soil",
      microbialActivity: "Microbial activity",
      systemBalance: "Cycle balance",
      indicators: "Cycle indicators",
      relativeFlow: "relative flows",
      metricsTitle: "Lab readings",
      ammoniaState: "Ammonia state",
      leachingState: "Leaching state",
      plantAccess: "Plant availability",
      fixationMetric: "Biological fixation",
      leachingRisk: "Leaching risk",
      ammoniaStress: "Ammonia stress",
      plantAccessShort: "Plants",
      fixationShort: "Fix.",
      leachingShort: "Leach.",
      stressShort: "Stress",
    },
    diagram: {
      atmosphere: "Atmospheric nitrogen (N₂)",
      plants: "Plants",
      assimilation: "Assimilation",
      rootBacteria: "N₂-fixing bacteria in roots",
      soilBacteria: "N₂-fixing bacteria in soil",
      decomposers: "Decomposers<br>(bacteria, fungi)",
      ammonification: "Ammonification",
      ammonium: "Ammonium (NH₄⁺)",
      nitrification: "Nitrification",
      nitrite: "Nitrite (NO₂⁻)",
      nitrate: "Nitrate (NO₃⁻)",
      nitrifyingBacteria: "Nitrifying bacteria",
      denitrifyingBacteria: "Denitrifying bacteria",
      denitrification: "Denitrification",
    },
    status: {
      stableTitle: "Stable control group",
      stableText: "Reservoirs remain stable. Fixation is sufficient, nitrate is available to plants, and nitrogen loss risk is low.",
      moderateTitle: "Cycle with moderate changes",
      unbalancedTitle: "Unbalanced cycle",
      fallback: "The cycle still works, but it moved away from the control group: observe whether nitrogen is retained by plants or accumulates in the soil.",
      lowBacteria: "Few fixing bacteria reduce nitrogen input to the soil; over time, ammonium and nitrate production would decrease.",
      highBacteria: "Many fixing bacteria increase biological nitrogen input and may raise nitrogen compounds in the soil.",
      lowPlants: "With few plants, less nitrate is assimilated; nitrate is more likely to accumulate or be lost by leaching.",
      highPlants: "Many plants increase nitrogen demand; if nitrate is not enough, competition and reduced growth appear.",
      highAmmonia: "High ammonia can stress roots and microorganisms; nitrification would need to transform it quickly to avoid toxicity.",
      lowAmmonia: "Low ammonia limits the substrate that feeds nitrification toward nitrites and nitrates.",
      optimalAmmonia: "Ammonia is in a useful range: it feeds nitrification without major root stress.",
      alertAmmonia: "Ammonia is becoming elevated: it may feed nitrification, but root stress is already increasing.",
      toxicAmmonia: "Very high ammonia can become toxic: it reduces root growth, disrupts microbial activity, and lowers cycle balance.",
      lowLeaching: "Low leaching helps retain nitrate in the root zone, as long as plants can assimilate it.",
      retentionRisk: "Leaching is low, but with high nitrate and few plants, nitrogen can accumulate in soil and increase denitrification risk if the soil becomes waterlogged.",
      highLeaching: "High leaching carries nitrate away from the root zone: soil fertility drops and groundwater contamination risk increases.",
      highNitrate: "High nitrate supports assimilation, but if it exceeds plant demand, leaching and denitrification risk increase.",
      lowNitrate: "Low nitrate limits plant assimilation and can reduce plant growth.",
    },
  },
};

const sliders = document.querySelectorAll("[data-variable]");
const valueLabels = document.querySelectorAll("[data-value]");
const controlButton = document.querySelector("[data-action='control']");
const statusTitle = document.querySelector("[data-status-title]");
const consequenceText = document.querySelector("[data-consequence]");
const metricBars = document.querySelectorAll("[data-metric]");
const chartBars = document.querySelectorAll("[data-bar]");
const reservoirValues = document.querySelectorAll("[data-reservoir]");
const languageButton = document.querySelector("[data-lang]");
const textLabels = document.querySelectorAll("[data-i18n]");
const htmlLabels = document.querySelectorAll("[data-i18n-html]");
const diagramLabels = document.querySelectorAll("[data-diagram-label]");
const scene = document.querySelector(".image-wrap");
const ammoniaReadout = document.querySelector("[data-ammonia-readout]");
const ammoniaLevel = document.querySelector("[data-ammonia-level]");
const leachingReadout = document.querySelector("[data-leaching-readout]");
const leachingLevel = document.querySelector("[data-leaching-level]");

let language = "es";

function clamp(value, min = 0, max = 100) {
  return Math.min(max, Math.max(min, value));
}

function getAmmoniaStage(ammonia) {
  if (ammonia < 4) return "low";
  if (ammonia <= 18) return "optimal";
  if (ammonia <= 35) return "alert";
  if (ammonia <= 55) return "high";
  return "toxic";
}

function getAmmoniaLabel(stage) {
  const labels = {
    es: {
      low: "Bajo: limita nitrificación",
      optimal: "Rango óptimo",
      alert: "Elevado: observar raíces",
      high: "Alto: estrés radicular",
      toxic: "Muy alto: toxicidad",
    },
    en: {
      low: "Low: limits nitrification",
      optimal: "Optimal range",
      alert: "Elevated: watch roots",
      high: "High: root stress",
      toxic: "Very high: toxicity",
    },
  };

  return labels[language][stage];
}

function getLeachingStage(leaching, state) {
  if (leaching > 62) return "high";
  if (leaching < 10 && state.nitrate > 70 && state.plants < 70) return "accumulation";
  if (leaching < 18) return "low";
  return "balanced";
}

function getLeachingLabel(stage) {
  const labels = {
    es: {
      low: "Baja: conserva nitrato",
      balanced: "Retención equilibrada",
      accumulation: "Baja: riesgo de acumulación",
      high: "Alta: pérdida de nitrato",
    },
    en: {
      low: "Low: nitrate retained",
      balanced: "Balanced retention",
      accumulation: "Low: accumulation risk",
      high: "High: nitrate loss",
    },
  };

  return labels[language][stage];
}

function getState() {
  return Array.from(sliders).reduce((state, slider) => {
    state[slider.dataset.variable] = Number(slider.value);
    return state;
  }, {});
}

function setState(nextState) {
  sliders.forEach((slider) => {
    slider.value = nextState[slider.dataset.variable];
  });
  render();
}

function calculateMetrics(state) {
  const ammoniaStage = getAmmoniaStage(state.ammonia);
  const ammoniaBenefit = state.ammonia <= 18 ? state.ammonia * 0.75 : 13.5 + Math.max(0, 35 - state.ammonia) * 0.12;
  const toxicityPenalty = clamp((state.ammonia - 32) * 1.7);
  const fixation = clamp(state.bacteria * 0.72 + state.plants * 0.1);
  const plantDemand = state.plants * 0.62;
  const leaching = clamp((state.nitrate - state.plants * 0.28) * 1.25);
  const leachingStage = getLeachingStage(leaching, state);
  const leachingPenalty = leachingStage === "high" ? leaching * 0.42 : 0;
  const accumulationPenalty = leachingStage === "accumulation" ? (state.nitrate - state.plants) * 0.28 : 0;
  const nitrateExcessPenalty = clamp((state.nitrate - state.plants * 0.68) * 0.72);
  const combinedToxicityPenalty = clamp(toxicityPenalty * 0.82 + nitrateExcessPenalty * 0.55 + leachingPenalty * 0.32);
  const nitrogenSupply = state.nitrate + ammoniaBenefit * 0.42 + fixation * 0.18;
  const plantAccess = clamp((nitrogenSupply / Math.max(1, plantDemand)) * 72 - combinedToxicityPenalty);
  const ammoniaStress = clamp((state.ammonia - 18) * 2.4 + Math.max(0, state.plants - 150) * 0.18);
  const balance = clamp(
    100 -
      Math.abs(100 - state.plants) * 0.18 -
      Math.abs(100 - state.bacteria) * 0.22 -
      Math.abs(25 - state.nitrate) * 0.35 -
      Math.abs(8 - state.ammonia) * 0.45 -
      toxicityPenalty * 0.95 -
      leachingPenalty * 0.35 -
      accumulationPenalty * 0.45 -
      nitrateExcessPenalty * 0.32,
  );
  const plantNitrogen = clamp((state.plants * 0.42 + plantAccess * 0.58));
  const soilNitrogen = clamp(ammoniaBenefit * 0.85 + state.nitrate * 0.55 + fixation * 0.18);
  const microbialActivity = clamp(state.bacteria * 0.78 + ammoniaBenefit * 0.35 - ammoniaStress * 0.35 - toxicityPenalty * 0.45);

  return {
    ammoniaStage,
    leachingStage,
    fixation,
    plantAccess,
    leaching,
    ammoniaStress,
    balance,
    plantNitrogen,
    soilNitrogen,
    microbialActivity,
    systemBalance: balance,
  };
}

function getStatus(state, metrics) {
  const status = translations[language].status;
  const messages = [];
  const ammoniaStage = metrics.ammoniaStage;
  const leachingStage = metrics.leachingStage;

  if (metrics.balance > 82 && ammoniaStage === "optimal") {
    return {
      title: status.stableTitle,
      text: status.stableText,
    };
  }

  if (state.bacteria < 45) messages.push(status.lowBacteria);
  else if (state.bacteria > 150) messages.push(status.highBacteria);

  if (state.plants < 45) messages.push(status.lowPlants);
  else if (state.plants > 150) messages.push(status.highPlants);

  if (ammoniaStage === "low") messages.push(status.lowAmmonia);
  else if (ammoniaStage === "optimal") messages.push(status.optimalAmmonia);
  else if (ammoniaStage === "alert") messages.push(status.alertAmmonia);
  else if (ammoniaStage === "high") messages.push(status.highAmmonia);
  else if (ammoniaStage === "toxic") messages.push(status.toxicAmmonia);

  if (state.nitrate > 70) messages.push(status.highNitrate);
  else if (state.nitrate < 12) messages.push(status.lowNitrate);

  if (leachingStage === "high") messages.push(status.highLeaching);
  else if (leachingStage === "accumulation") messages.push(status.retentionRisk);
  else if (leachingStage === "low") messages.push(status.lowLeaching);

  return {
    title: metrics.balance > 55 ? status.moderateTitle : status.unbalancedTitle,
    text: messages.length ? messages.join(" ") : status.fallback,
  };
}

function paintMetric(metric, value) {
  const bar = document.querySelector(`[data-metric="${metric}"]`);
  bar.style.width = `${clamp(value)}%`;
  bar.classList.remove("warning", "danger");

  if (metric === "leaching" || metric === "ammoniaStress") {
    if (value > 70) bar.classList.add("danger");
    else if (value > 38) bar.classList.add("warning");
    return;
  }

  if (value < 35) bar.classList.add("danger");
  else if (value < 55) bar.classList.add("warning");
}

function renderTranslations() {
  const ui = translations[language].ui;
  const diagram = translations[language].diagram;

  textLabels.forEach((label) => {
    label.textContent = ui[label.dataset.i18n] ?? label.textContent;
  });

  htmlLabels.forEach((label) => {
    label.innerHTML = ui[label.dataset.i18nHtml] ?? label.innerHTML;
  });

  diagramLabels.forEach((label) => {
    label.innerHTML = diagram[label.dataset.diagramLabel] ?? label.innerHTML;
  });

  languageButton.textContent = language === "es" ? "English" : "Español";
  languageButton.dataset.lang = language === "es" ? "en" : "es";
  document.documentElement.lang = language;
}

function render() {
  const state = getState();
  const metrics = calculateMetrics(state);
  const status = getStatus(state, metrics);

  valueLabels.forEach((label) => {
    label.textContent = state[label.dataset.value];
  });

  metricBars.forEach((bar) => {
    paintMetric(bar.dataset.metric, metrics[bar.dataset.metric]);
  });

  chartBars.forEach((bar) => {
    bar.style.height = `${Math.max(2, clamp(metrics[bar.dataset.bar]))}%`;
  });

  reservoirValues.forEach((value) => {
    value.textContent = Math.round(metrics[value.dataset.reservoir]);
  });

  scene.style.setProperty("--n2-flow", clamp(state.bacteria, 25, 180) / 200 + 0.18);
  scene.style.setProperty("--nh4-flow", clamp(state.ammonia + metrics.fixation * 0.42, 20, 140) / 160);
  scene.style.setProperty("--no2-flow", clamp(state.ammonia * 1.15 + state.bacteria * 0.22 - metrics.ammoniaStress * 0.24, 18, 150) / 170);
  scene.style.setProperty("--no3-flow", clamp(state.nitrate + state.plants * 0.18, 20, 155) / 175);

  ammoniaReadout.classList.remove("warning", "danger");
  if (metrics.ammoniaStage === "alert" || metrics.ammoniaStage === "high") ammoniaReadout.classList.add("warning");
  if (metrics.ammoniaStage === "toxic") ammoniaReadout.classList.add("danger");
  ammoniaLevel.textContent = getAmmoniaLabel(metrics.ammoniaStage);

  leachingReadout.classList.remove("warning", "danger");
  if (metrics.leachingStage === "accumulation") leachingReadout.classList.add("warning");
  if (metrics.leachingStage === "high") leachingReadout.classList.add("danger");
  leachingLevel.textContent = getLeachingLabel(metrics.leachingStage);

  statusTitle.textContent = status.title;
  consequenceText.textContent = status.text;
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

renderTranslations();
setState(controlGroup);
