import './colores.css';
import $ from 'jquery';
import { rutas } from '../rutas.js';
import { Notificacion, wiTip } from '../widev.js';

// ── DEFAULT / BACKUP DE TEMAS OFICIALES ──
const DEFAULT_WII_THEMES = {
  cielo: {
    bg: '#ccefff', card: '#e5f7ff', text: '#000000', tx1: '#1a1a1a', tx2: '#333333', tx3: '#666666',
    txa: '#ffffff', txe: '#000000', accent: '#00a8e6', hva: '#1873cd', primary: '#1978d7', mbg: '#1978d7',
    brd: '#b8d9eb', inp: '#f0f9ff', bg1: '#ffffff26', bg2: '#1978d7', bg3: '#e5f7ff',
    bg4: 'rgba(25, 120, 215, 0.1)', bg5: 'rgba(25, 120, 215, 0.2)', bg6: 'rgba(204, 239, 255, 0.5)',
    bg7: '#ffffff', bg8: '#ffffff'
  },
  dulce: {
    bg: '#ffccd1', card: '#ffebed', text: '#000000', tx1: '#1a0000', tx2: '#330000', tx3: '#660000',
    txa: '#ffffff', txe: '#000000', accent: '#ff7a85', hva: '#ff3849', primary: '#ff3849', mbg: '#ff3849',
    brd: '#ffb3ba', inp: '#fff5f6', bg1: '#ffffff61', bg2: '#ff3849', bg3: '#ffebed',
    bg4: 'rgba(255, 56, 73, 0.1)', bg5: 'rgba(255, 56, 73, 0.2)', bg6: 'rgba(255, 204, 209, 0.5)',
    bg7: '#ffffff', bg8: '#ffffff'
  },
  paz: {
    bg: '#ccffce', card: '#ebffeb', text: '#000000', tx1: '#001a00', tx2: '#003300', tx3: '#006600',
    txa: '#ffffff', txe: '#000000', accent: '#3cd741', hva: '#25b62a', primary: '#25b62a', mbg: '#25b62a',
    brd: '#a8e6ab', inp: '#f0fff1', bg1: '#ffffff42', bg2: '#25b62a', bg3: '#ebffeb',
    bg4: 'rgba(37, 182, 42, 0.1)', bg5: 'rgba(37, 182, 42, 0.2)', bg6: 'rgba(204, 255, 206, 0.5)',
    bg7: '#ffffff', bg8: '#ffffff'
  },
  oro: {
    bg: '#fff8d1', card: '#fffde8', text: '#000000', tx1: '#1a1500', tx2: '#332b00', tx3: '#665500',
    txa: '#000000', txe: '#000000', accent: '#f0cc00', hva: '#c9a800', primary: '#FFDA34', mbg: '#facc00',
    brd: '#ffe066', inp: '#fffef5', bg1: '#ffffff42', bg2: '#FFDA34', bg3: '#fffde8',
    bg4: 'rgba(255, 218, 52, 0.1)', bg5: 'rgba(255, 218, 52, 0.2)', bg6: 'rgba(255, 243, 176, 0.5)',
    bg7: '#ffffff', bg8: '#ffffff'
  },
  mora: {
    bg: '#e4ccff', card: '#f4ebff', text: '#000000', tx1: '#1a001a', tx2: '#330033', tx3: '#660066',
    txa: '#ffffff', txe: '#000000', accent: '#9442ff', hva: '#5f00db', primary: '#6a00f5', mbg: '#6a00f5',
    brd: '#c9a3ff', inp: '#faf5ff', bg1: '#ffffff61', bg2: '#6a00f5', bg3: '#f4ebff',
    bg4: 'rgba(106, 0, 245, 0.1)', bg5: 'rgba(106, 0, 245, 0.2)', bg6: 'rgba(228, 204, 255, 0.5)',
    bg7: '#ffffff', bg8: '#ffffff'
  },
  futuro: {
    bg: '#0a0e1a', card: '#151b2e', text: '#e0e7ff', tx1: '#c7d2fe', tx2: '#a5b4fc', tx3: '#818cf8',
    txa: '#0a0e1a', txe: '#00f3ff', accent: '#00d4ff', hva: '#00f3ff', primary: '#00f3ff', mbg: '#151b2e',
    brd: '#2d3a52', inp: '#0f1421', bg1: 'rgba(0, 243, 255, 0.08)', bg2: '#00f3ff', bg3: '#1a2235',
    bg4: 'rgba(0, 243, 255, 0.12)', bg5: 'rgba(0, 243, 255, 0.25)', bg6: 'rgba(26, 34, 53, 0.7)',
    bg7: '#00f3ff', bg8: '#1a2235'
  }
};

// ── STATE & PALETA DE TRABAJO ──
let state = {
  activeThemeTab: 'general', // Pestaña interna de temas
  baseColor: '#6a00f5',
  selectedWbVar: 'bg', // Variable activa seleccionada para afinar
  selectedTarget: { type: 'workbench', key: 'bg', index: 0 }, // Target unificado para afinador HSL
  workbench: {
    bg: '#0a0e1a',
    card: '#151b2e',
    primary: '#00f3ff',
    accent: '#00d4ff',
    text: '#e0e7ff'
  },
  activeExporterFormat: 'css',
  
  // Colores activos editables de los temas
  wiiThemes: JSON.parse(JSON.stringify(DEFAULT_WII_THEMES)), // Copia profunda para permitir modificaciones
  
  // Mapeo dinámico de datos de temas
  themeColorsData: {
    general: ['#0EBEFF', '#FF5C69', '#29C72E', '#FFDA34', '#7000FF', '#21273B', '#3cd741', '#ff3849', '#ffa726', '#00a8e6'],
    cielo:   ['#ccefff', '#e5f7ff', '#000000', '#1a1a1a', '#333333', '#666666', '#ffffff', '#000000', '#00a8e6', '#1873cd', '#1978d7', '#1978d7', '#b8d9eb', '#f0f9ff', '#ffffff26', '#1978d7', '#e5f7ff', 'rgba(25, 120, 215, 0.1)', 'rgba(25, 120, 215, 0.2)', 'rgba(204, 239, 255, 0.5)', '#ffffff', '#ffffff'],
    dulce:   ['#ffccd1', '#ffebed', '#000000', '#1a0000', '#330000', '#660000', '#ffffff', '#000000', '#ff7a85', '#ff3849', '#ff3849', '#ff3849', '#ffb3ba', '#fff5f6', '#ffffff61', '#ff3849', '#ffebed', 'rgba(255, 56, 73, 0.1)', 'rgba(255, 56, 73, 0.2)', 'rgba(255, 204, 209, 0.5)', '#ffffff', '#ffffff'],
    paz:     ['#ccffce', '#ebffeb', '#000000', '#001a00', '#003300', '#006600', '#ffffff', '#000000', '#3cd741', '#25b62a', '#25b62a', '#25b62a', '#a8e6ab', '#f0fff1', '#ffffff42', '#25b62a', '#ebffeb', 'rgba(37, 182, 42, 0.1)', 'rgba(37, 182, 42, 0.2)', 'rgba(204, 255, 206, 0.5)', '#ffffff', '#ffffff'],
    oro:     ['#fff8d1', '#fffde8', '#000000', '#1a1500', '#332b00', '#665500', '#000000', '#000000', '#f0cc00', '#c9a800', '#FFDA34', '#facc00', '#ffe066', '#fffef5', '#ffffff42', '#FFDA34', '#fffde8', 'rgba(255, 218, 52, 0.1)', 'rgba(255, 218, 52, 0.2)', 'rgba(255, 243, 176, 0.5)', '#ffffff', '#ffffff'],
    mora:    ['#e4ccff', '#f4ebff', '#000000', '#1a001a', '#330033', '#660066', '#ffffff', '#000000', '#9442ff', '#5f00db', '#6a00f5', '#6a00f5', '#c9a3ff', '#faf5ff', '#ffffff61', '#6a00f5', '#f4ebff', 'rgba(106, 0, 245, 0.1)', 'rgba(106, 0, 245, 0.2)', 'rgba(228, 204, 255, 0.5)', '#ffffff', '#ffffff'],
    futuro:  ['#0a0e1a', '#151b2e', '#e0e7ff', '#c7d2fe', '#a5b4fc', '#818cf8', '#0a0e1a', '#00f3ff', '#00d4ff', '#00f3ff', '#00f3ff', '#151b2e', '#2d3a52', '#0f1421', 'rgba(0, 243, 255, 0.08)', '#00f3ff', '#1a2235', 'rgba(0, 243, 255, 0.12)', 'rgba(0, 243, 255, 0.25)', 'rgba(26, 34, 53, 0.7)', '#00f3ff', '#1a2235'],
    detectados: ['#6a00f5', '#00f3ff', '#ff3849', '#25b62a', '#ffa726']
  }
};

// ── CONVERSIONES DE COLOR ──

const hexToRgb = (hex) => {
  hex = hex.replace(/^#/, '');
  if (hex.length === 3) {
    hex = hex.split('').map(x => x + x).join('');
  }
  const num = parseInt(hex, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
};

const rgbToHex = (r, g, b) => {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

const rgbToHsl = (r, g, b) => {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
};

const hslToRgb = (h, s, l) => {
  h /= 360; s /= 100; l /= 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
};

const hslToHex = (h, s, l) => {
  const { r, g, b } = hslToRgb(h, s, l);
  return rgbToHex(r, g, b);
};

const parseColorToHex = (str) => {
  str = str.trim().toLowerCase();
  if (str.startsWith('#')) {
    if (str.length === 4) {
      return '#' + str[1] + str[1] + str[2] + str[2] + str[3] + str[3];
    }
    return str.slice(0, 7);
  }
  if (str.startsWith('rgb')) {
    const parts = str.match(/\d+/g);
    if (parts && parts.length >= 3) {
      return rgbToHex(parseInt(parts[0]), parseInt(parts[1]), parseInt(parts[2]));
    }
  }
  if (str.startsWith('hsl')) {
    const parts = str.match(/\d+/g);
    if (parts && parts.length >= 3) {
      return hslToHex(parseInt(parts[0]), parseInt(parts[1]), parseInt(parts[2]));
    }
  }
  return null;
};

const parseCssColorToHex = (colorStr) => {
  if (!colorStr) return null;
  const cleaned = colorStr.trim();
  if (cleaned === '') return null;
  
  const tempEl = document.createElement('div');
  tempEl.style.color = '';
  tempEl.style.color = cleaned;
  if (tempEl.style.color === '') {
    return null;
  }
  document.body.appendChild(tempEl);
  const computedColor = window.getComputedStyle(tempEl).color;
  document.body.removeChild(tempEl);
  
  const match = computedColor.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)$/);
  if (match) {
    const r = parseInt(match[1]);
    const g = parseInt(match[2]);
    const b = parseInt(match[3]);
    return rgbToHex(r, g, b);
  }
  return null;
};

const resolveColorFromString = (str) => {
  let parsed = parseCssColorToHex(str);
  if (parsed) return parsed;
  
  const extracted = extractColorsFromText(str);
  if (extracted && extracted.length > 0) {
    return extracted[0];
  }
  return null;
};

// ── REGEX EXTRACTOR DE TEXTO ──
const extractColorsFromText = (text) => {
  const hexRegex = /#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/g;
  const rgbRegex = /rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/g;
  const rgbaRegex = /rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*([\d.]+)\s*\)/g;
  const hslRegex = /hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)/g;
  
  const found = [];
  let match;

  while ((match = hexRegex.exec(text)) !== null) { found.push(match[0]); }
  while ((match = rgbRegex.exec(text)) !== null) { found.push(match[0]); }
  while ((match = rgbaRegex.exec(text)) !== null) { found.push(match[0]); }
  while ((match = hslRegex.exec(text)) !== null) { found.push(match[0]); }

  const parsed = found.map(c => parseColorToHex(c)).filter(Boolean);
  return [...new Set(parsed)];
};

// ── CLUSTERING DE COLORES DOMINANTES EN CANVAS ──
const extractDominantColors = (canvas, count = 8) => {
  const ctx = canvas.getContext('2d');
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  const colorCounts = {};

  for (let i = 0; i < imgData.length; i += 32) {
    const r = imgData[i];
    const g = imgData[i+1];
    const b = imgData[i+2];
    const a = imgData[i+3];
    if (a < 100) continue; // Ignorar transparente

    const rRound = Math.round(r / 16) * 16;
    const gRound = Math.round(g / 16) * 16;
    const bRound = Math.round(b / 16) * 16;
    const hex = rgbToHex(Math.min(255, rRound), Math.min(255, gRound), Math.min(255, bRound));

    colorCounts[hex] = (colorCounts[hex] || 0) + 1;
  }

  const sortedColors = Object.keys(colorCounts).sort((a, b) => colorCounts[b] - colorCounts[a]);

  const distinctColors = [];
  for (const color of sortedColors) {
    if (distinctColors.length >= count) break;

    const rgb1 = hexToRgb(color);
    const isTooSimilar = distinctColors.some(c => {
      const rgb2 = hexToRgb(c);
      const dist = Math.sqrt(
        Math.pow(rgb1.r - rgb2.r, 2) +
        Math.pow(rgb1.g - rgb2.g, 2) +
        Math.pow(rgb1.b - rgb2.b, 2)
      );
      return dist < 45; // Umbral de similitud
    });

    if (!isTooSimilar) {
      distinctColors.push(color);
    }
  }

  let padIdx = 0;
  while (distinctColors.length < count && padIdx < sortedColors.length) {
    const c = sortedColors[padIdx++];
    if (!distinctColors.includes(c)) distinctColors.push(c);
  }

  return distinctColors;
};

// Helper para nombres de variables dinámicos de los tabs
const getVariableName = (tabName, index) => {
  if (tabName === 'general') {
    const generalNames = [
      '--Cielo (Theme)',
      '--Dulce (Theme)',
      '--Paz (Theme)',
      '--Oro (Theme)',
      '--Mora (Theme)',
      '--Futuro (Theme)',
      '--success (Éxito)',
      '--error (Error)',
      '--warning (Alerta)',
      '--info (Info)'
    ];
    return generalNames[index] || `--custom-var-${index - 9}`;
  }
  
  const themeVars = [
    '--bg (Fondo)',
    '--wb (Card/Mesa)',
    '--tx (Texto Principal)',
    '--tx1 (Texto Secundario)',
    '--tx2 (Texto Terciario)',
    '--tx3 (Texto Suave)',
    '--txa (Texto Alterno)',
    '--txe (Texto Especial)',
    '--hv (Acento/Hover)',
    '--hva (Acento Alterno)',
    '--mco (Color Primario)',
    '--mbg (Fondo Menú)',
    '--brd (Borde)',
    '--inp (Input/Fondo)',
    '--bg1 (Fondo Opaco 1)',
    '--bg2 (Fondo Opaco 2)',
    '--bg3 (Fondo Opaco 3)',
    '--bg4 (Fondo Opaco 4)',
    '--bg5 (Fondo Opaco 5)',
    '--bg6 (Fondo Opaco 6)',
    '--bg7 (Fondo Opaco 7)',
    '--bg8 (Fondo Opaco 8)'
  ];
  return themeVars[index] || `--custom-var-${index - 21}`;
};

// ── Live CSS variables generator & parser ──
const generateFullRootCSS = () => {
  const c = state.wiiThemes;
  const gen = state.themeColorsData.general;
  
  // Custom variables for general tab
  let genCustomVars = '';
  if (gen.length > 10) {
    for (let i = 10; i < gen.length; i++) {
      genCustomVars += `\n  --custom-var-${i - 9}: ${gen[i]};`;
    }
  }

  // Custom variables for each theme tab
  const getThemeCustomVars = (themeName) => {
    const colors = state.themeColorsData[themeName];
    let vars = '';
    if (colors && colors.length > 22) {
      for (let i = 22; i < colors.length; i++) {
        vars += `\n  --custom-var-${i - 21}: ${colors[i]};`;
      }
    }
    return vars;
  };

  return `/* ==================== VARIABLES GLOBALES ==================== */
:root {
  --fz_s1: clamp(0.625rem, 0.8vh, 0.7rem);
  --fz_s2: clamp(0.675rem, 0.85vh, 0.75rem);
  --fz_s3: clamp(0.725rem, 0.9vh, 0.8rem);
  --fz_s4: clamp(0.775rem, 1vh, 0.85rem);
  --fz_m: clamp(0.8rem, 1.05vh, 0.9rem);
  --fz_m1: clamp(0.85rem, 1.1vh, 0.95rem);
  --fz_m2: clamp(0.9rem, 1.15vh, 1rem);
  --fz_m3: clamp(0.95rem, 1.2vh, 1.05rem);
  --fz_m4: clamp(1rem, 1.3vh, 1.1rem);
  --fz_m5: clamp(1.15rem, 1.5vh, 1.25rem);
  --fz_l1: clamp(1.5rem, 2vh, 1.7rem);
  --fz_l2: clamp(1.8rem, 2.3vh, 2rem);
  --fz_x1: clamp(2.2rem, 3vh, 2.8rem);
  --fz_x2: clamp(2.5rem, 3.6vh, 3.5rem);
  --fz_x3: clamp(2.9rem, 5vh, 3.9rem);
  --fz_x4: clamp(3.3rem, 5.9vh, 4.3rem);
  --fz_y1: clamp(3rem, 14vh, 8rem);
  --bs_m: 0 0 0.3vh 0.1vh var(--F);
  --bs_l: 0 0.4vh 0.8vh rgba(0, 0, 0, 0.15);
  --tr_s: 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  --tr_m: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --tr_f: 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  --ff_P: 'Poppins', 'Segoe UI', system-ui;
  --ff_O: 'Outfit', 'Segoe UI', system-ui;
  --ff_R: 'Rubik', 'Segoe UI', system-ui;
  --gradient-dia: linear-gradient(135deg, ${gen[0] || '#0EBEFF'} 0%, ${gen[2] || '#29C72E'} 100%);
  --gradient-noche: linear-gradient(135deg, ${gen[5] || '#21273B'} 0%, ${gen[4] || '#7000FF'} 100%);
  --F: #fff;
  --0: #000;
  --D: #ddd;
  --G: #374151;

  --success: ${gen[6] || '#3cd741'};
  --error: ${gen[7] || '#ff3849'};
  --warning: ${gen[8] || '#ffa726'};
  --info: ${gen[9] || '#00a8e6'};

  --offline: #ddd;
  --Cielo: ${gen[0] || '#0EBEFF'};
  --Dulce: ${gen[1] || '#FF5C69'};
  --Paz: ${gen[2] || '#29C72E'};
  --Oro: ${gen[3] || '#FFDA34'};
  --Mora: ${gen[4] || '#7000FF'};
  --Futuro: ${gen[5] || '#21273B'};
  
  /* SmileBeneficios */
  --sm_azul: #37a1dd;
  --sm_amarillo: #FFD101;
  --sm_rojo: #fe413b;
  --sm_azul_d: #1d7fb8;
  --sm_azul_l: #d0ecf9;
  --sm_grad: linear-gradient(135deg, #37a1dd 0%, #1d7fb8 100%);
  --sm_grad_y: linear-gradient(135deg, #FFD101 0%, #f5a623 100%);${genCustomVars}
}

:root[data-theme="Cielo"] {
  --bg: ${c.cielo.bg};
  --wb: ${c.cielo.card};
  --tx: ${c.cielo.text};
  --tx1: ${c.cielo.tx1};
  --tx2: ${c.cielo.tx2};
  --tx3: ${c.cielo.tx3};
  --txa: ${c.cielo.txa};
  --txe: ${c.cielo.txe};
  --hv: ${c.cielo.accent};
  --hva: ${c.cielo.hva};
  --mco: ${c.cielo.primary};
  --mbg: ${c.cielo.mbg};
  --brd: ${c.cielo.brd};
  --inp: ${c.cielo.inp};
  --bg1: ${c.cielo.bg1};
  --bg2: ${c.cielo.bg2};
  --bg3: ${c.cielo.bg3};
  --bg4: ${c.cielo.bg4};
  --bg5: ${c.cielo.bg5};
  --bg6: ${c.cielo.bg6};
  --bg7: ${c.cielo.bg7};
  --bg8: ${c.cielo.bg8};${getThemeCustomVars('cielo')}
}

:root[data-theme="Dulce"] {
  --bg: ${c.dulce.bg};
  --wb: ${c.dulce.card};
  --tx: ${c.dulce.text};
  --tx1: ${c.dulce.tx1};
  --tx2: ${c.dulce.tx2};
  --tx3: ${c.dulce.tx3};
  --txa: ${c.dulce.txa};
  --txe: ${c.dulce.txe};
  --hv: ${c.dulce.accent};
  --hva: ${c.dulce.hva};
  --mco: ${c.dulce.primary};
  --mbg: ${c.dulce.mbg};
  --brd: ${c.dulce.brd};
  --inp: ${c.dulce.inp};
  --bg1: ${c.dulce.bg1};
  --bg2: ${c.dulce.bg2};
  --bg3: ${c.dulce.bg3};
  --bg4: ${c.dulce.bg4};
  --bg5: ${c.dulce.bg5};
  --bg6: ${c.dulce.bg6};
  --bg7: ${c.dulce.bg7};
  --bg8: ${c.dulce.bg8};${getThemeCustomVars('dulce')}
}

:root[data-theme="Paz"] {
  --bg: ${c.paz.bg};
  --wb: ${c.paz.card};
  --tx: ${c.paz.text};
  --tx1: ${c.paz.tx1};
  --tx2: ${c.paz.tx2};
  --tx3: ${c.paz.tx3};
  --txa: ${c.paz.txa};
  --txe: ${c.paz.txe};
  --hv: ${c.paz.accent};
  --hva: ${c.paz.hva};
  --mco: ${c.paz.primary};
  --mbg: ${c.paz.mbg};
  --brd: ${c.paz.brd};
  --inp: ${c.paz.inp};
  --bg1: ${c.paz.bg1};
  --bg2: ${c.paz.bg2};
  --bg3: ${c.paz.bg3};
  --bg4: ${c.paz.bg4};
  --bg5: ${c.paz.bg5};
  --bg6: ${c.paz.bg6};
  --bg7: ${c.paz.bg7};
  --bg8: ${c.paz.bg8};${getThemeCustomVars('paz')}
}

:root[data-theme="Oro"] {
  --bg: ${c.oro.bg};
  --wb: ${c.oro.card};
  --tx: ${c.oro.text};
  --tx1: ${c.oro.tx1};
  --tx2: ${c.oro.tx2};
  --tx3: ${c.oro.tx3};
  --txa: ${c.oro.txa};
  --txe: ${c.oro.txe};
  --hv: ${c.oro.accent};
  --hva: ${c.oro.hva};
  --mco: ${c.oro.primary};
  --mbg: ${c.oro.mbg};
  --brd: ${c.oro.brd};
  --inp: ${c.oro.inp};
  --bg1: ${c.oro.bg1};
  --bg2: ${c.oro.bg2};
  --bg3: ${c.oro.bg3};
  --bg4: ${c.oro.bg4};
  --bg5: ${c.oro.bg5};
  --bg6: ${c.oro.bg6};
  --bg7: ${c.oro.bg7};
  --bg8: ${c.oro.bg8};${getThemeCustomVars('oro')}
}

:root[data-theme="Mora"] {
  --bg: ${c.mora.bg};
  --wb: ${c.mora.card};
  --tx: ${c.mora.text};
  --tx1: ${c.mora.tx1};
  --tx2: ${c.mora.tx2};
  --tx3: ${c.mora.tx3};
  --txa: ${c.mora.txa};
  --txe: ${c.mora.txe};
  --hv: ${c.mora.accent};
  --hva: ${c.mora.hva};
  --mco: ${c.mora.primary};
  --mbg: ${c.mora.mbg};
  --brd: ${c.mora.brd};
  --inp: ${c.mora.inp};
  --bg1: ${c.mora.bg1};
  --bg2: ${c.mora.bg2};
  --bg3: ${c.mora.bg3};
  --bg4: ${c.mora.bg4};
  --bg5: ${c.mora.bg5};
  --bg6: ${c.mora.bg6};
  --bg7: ${c.mora.bg7};
  --bg8: ${c.mora.bg8};${getThemeCustomVars('mora')}
}

:root[data-theme="Futuro"] {
  --bg: ${c.futuro.bg};
  --wb: ${c.futuro.card};
  --tx: ${c.futuro.text};
  --tx1: ${c.futuro.tx1};
  --tx2: ${c.futuro.tx2};
  --tx3: ${c.futuro.tx3};
  --txa: ${c.futuro.txa};
  --txe: ${c.futuro.txe};
  --hv: ${c.futuro.accent};
  --hva: ${c.futuro.hva};
  --mco: ${c.futuro.primary};
  --mbg: ${c.futuro.mbg};
  --brd: ${c.futuro.brd};
  --inp: ${c.futuro.inp};
  --bg1: ${c.futuro.bg1};
  --bg2: ${c.futuro.bg2};
  --bg3: ${c.futuro.bg3};
  --bg4: ${c.futuro.bg4};
  --bg5: ${c.futuro.bg5};
  --bg6: ${c.futuro.bg6};
  --bg7: ${c.futuro.bg7};
  --bg8: ${c.futuro.bg8};${getThemeCustomVars('futuro')}
}
`;
};

const parseFullRootCSS = (cssText) => {
  try {
    let parsedCount = 0;

    // 1. Parse root variables block
    const rootBlockRegex = /:root\s*(?!\[)[^]*?\{([^}]+)\}/gi;
    const rootMatch = rootBlockRegex.exec(cssText);
    if (rootMatch) {
      const rootContent = rootMatch[1];
      
      // Parse main general variables
      const generalKeys = ['Cielo', 'Dulce', 'Paz', 'Oro', 'Mora', 'Futuro', 'success', 'error', 'warning', 'info'];
      generalKeys.forEach((key, index) => {
        const regex = new RegExp(`--${key}:\\s*([^;]+)`, 'i');
        const m = regex.exec(rootContent);
        if (m) {
          state.themeColorsData.general[index] = m[1].trim();
        }
      });

      // Parse custom variables inside :root block
      const customVarRegex = /--custom-var-(\d+):\s*([^;]+)/gi;
      let cMatch;
      while ((cMatch = customVarRegex.exec(rootContent)) !== null) {
        const customIndex = parseInt(cMatch[1]) + 9;
        const color = cMatch[2].trim();
        state.themeColorsData.general[customIndex] = color;
      }
    }

    // 2. Parse themed blocks
    const themeBlocksRegex = /:root\[data-theme="(\w+)"\]\s*\{([^}]+)\}/gi;
    let match;

    const THEME_KEYS = [
      'bg', 'card', 'text', 'tx1', 'tx2', 'tx3', 'txa', 'txe',
      'accent', 'hva', 'primary', 'mbg', 'brd', 'inp', 'bg1', 'bg2',
      'bg3', 'bg4', 'bg5', 'bg6', 'bg7', 'bg8'
    ];

    while ((match = themeBlocksRegex.exec(cssText)) !== null) {
      const themeName = match[1].toLowerCase();
      const themeContent = match[2];

      if (state.wiiThemes[themeName]) {
        // Parse individual variables inside theme block
        THEME_KEYS.forEach(key => {
          let cssVarName = key;
          if (key === 'card') cssVarName = 'wb';
          else if (key === 'primary') cssVarName = 'mco';
          else if (key === 'accent') cssVarName = 'hv';

          const regex = new RegExp(`--${cssVarName}:\\s*([^;]+)`, 'i');
          const m = regex.exec(themeContent);
          if (m) {
            state.wiiThemes[themeName][key] = m[1].trim();
          }
        });

        // Re-align base data arrays with 22 elements
        const t = state.wiiThemes[themeName];
        state.themeColorsData[themeName] = THEME_KEYS.map(key => t[key]);

        // Parse custom variables for this theme block
        const customVarRegex = /--custom-var-(\d+):\s*([^;]+)/gi;
        let cMatch;
        while ((cMatch = customVarRegex.exec(themeContent)) !== null) {
          const customIndex = parseInt(cMatch[1]) + 21;
          const color = cMatch[2].trim();
          state.themeColorsData[themeName][customIndex] = color;
        }

        parsedCount++;
      }
    }

    return parsedCount > 0;
  } catch (e) {
    console.error('Error parsing CSS input:', e);
    return false;
  }
};

const syncTextareaCSS = () => {
  const textarea = $('#full_root_css_textarea');
  if (textarea.length && !textarea.is(':focus')) {
    textarea.val(generateFullRootCSS());
  }
};

// ── HTML GENERATOR ──
const HTML = /* html */`
<div class="mwb" style="animation: wi_fadeUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;">
  <div style="margin-top: 4vh; text-align: center; margin-bottom: 2vh;">
    <h2 style="font-size: var(--fz_x1); font-weight: 900; color: var(--tx1);">
      Taller de Colores Inteligente 🎨
    </h2>
  </div>

  <!-- Pestañas Principales Superiores (Grand Tab Selector Bar) -->
  <div class="input_tabs" style="margin: 2vh auto 4vh; width: 100%; padding: 0.8vh; border-radius: 1.5vh; background: var(--bg5); border: 1px solid var(--brd); display: flex; gap: 0.5vh;">
    <button class="tab_btn active top_level_tab" data-top-tab="view_palette" style="font-size: var(--fz_m1); font-weight: 800; padding: 1.5vh 2.5vh; border-radius: 1.2vh; border: none; cursor: pointer; flex: 1; display: flex; justify-content: center; align-items: center; gap: 1vh;" data-witip="Mesa de diseño y personalización de temas"><i class="fas fa-swatchbook"></i> Paletas & Mesa de Diseño</button>
    <button class="tab_btn top_level_tab" data-top-tab="view_capture" style="font-size: var(--fz_m1); font-weight: 800; padding: 1.5vh 2.5vh; border-radius: 1.2vh; border: none; cursor: pointer; flex: 1; display: flex; justify-content: center; align-items: center; gap: 1vh;" data-witip="Capturar colores desde CSS, código o imágenes"><i class="fas fa-eye-dropper"></i> Capturar & Extraer</button>
  </div>

  <!-- CONTENIDO TAB 1: PALETAS & MESA DE DISEÑO -->
  <div class="colores_container" id="view_palette_content">
    
    <!-- Columna Izquierda: Temas Oficiales y Consola de Código -->
    <div style="display: flex; flex-direction: column; gap: 3vh;">
      <div class="lab_card">
        <h3 class="lab_card_title"><i class="fas fa-palette"></i> Paleta del WiiTema</h3>
        
        <!-- Pestañas horizontales de Temas -->
        <div class="input_tabs" style="margin-bottom: 2vh; background: var(--bg5); border: 1px solid var(--brd); display: flex; flex-wrap: wrap; gap: 4px; padding: 4px; border-radius: 1vh;">
          <button class="tab_btn active wii_theme_tab" data-theme-tab="general" style="font-size: var(--fz_s3); padding: 0.8vh 1.2vh;" data-witip="Variables globales y colores raíz"><i class="fas fa-globe"></i> General</button>
          <button class="tab_btn wii_theme_tab" data-theme-tab="cielo" style="font-size: var(--fz_s3); padding: 0.8vh 1.2vh;" data-witip="Cargar tema Cielo">☁️ Cielo</button>
          <button class="tab_btn wii_theme_tab" data-theme-tab="dulce" style="font-size: var(--fz_s3); padding: 0.8vh 1.2vh;" data-witip="Cargar tema Dulce">🍬 Dulce</button>
          <button class="tab_btn wii_theme_tab" data-theme-tab="paz" style="font-size: var(--fz_s3); padding: 0.8vh 1.2vh;" data-witip="Cargar tema Paz">🌿 Paz</button>
          <button class="tab_btn wii_theme_tab" data-theme-tab="oro" style="font-size: var(--fz_s3); padding: 0.8vh 1.2vh;" data-witip="Cargar tema Oro">👑 Oro</button>
          <button class="tab_btn wii_theme_tab" data-theme-tab="mora" style="font-size: var(--fz_s3); padding: 0.8vh 1.2vh;" data-witip="Cargar tema Mora">🍇 Mora</button>
          <button class="tab_btn wii_theme_tab" data-theme-tab="futuro" style="font-size: var(--fz_s3); padding: 0.8vh 1.2vh;" data-witip="Cargar tema Futuro">✨ Futuro</button>
        </div>
        
        <div id="sub_detected_container">
          <p class="lab_desc" id="palette_instructions">Burbujas generales del tema root de WiiTema. Toca un color para usarlo como base o asígnalo al Workbench.</p>
          
          <!-- Controles de grilla: buscador y + variable -->
          <div class="palette_controls" style="display: flex; gap: 1.5vh; margin-bottom: 2vh; align-items: center;">
            <div style="position: relative; flex: 1;">
              <i class="fas fa-search" style="position: absolute; left: 1.5vh; top: 50%; transform: translateY(-50%); color: var(--tx3); font-size: var(--fz_s3);"></i>
              <input type="text" id="palette_search_input" placeholder="Buscar variable o color HEX..." style="padding-left: 4.5vh; font-size: var(--fz_s3); height: 4.5vh; border-radius: 1vh; width: 100%;" />
            </div>
            <button class="bt_auth" id="btn_add_palette_color" style="height: 4.5vh; padding: 0 2vh; border-radius: 1vh; font-weight: 800; background: var(--bg5); display: flex; align-items: center; gap: 8px; font-size: var(--fz_s3);" data-witip="Agregar nueva variable personalizada"><i class="fas fa-plus"></i> Variable</button>
          </div>

          <div class="grid_colors_detected" id="grid_colors_detected">
            <!-- Dinámico -->
          </div>
        </div>
      </div>

      <!-- Consola de Estilos :root Editor & Importador -->
      <div class="lab_card">
        <h3 class="lab_card_title"><i class="fas fa-code-branch"></i> Consola de Estilos :root & Editor</h3>
        <p class="lab_desc" style="margin-bottom: 1vh;">Genera y edita el código CSS de variables globales del index.html en tiempo real. Modifica el código y haz clic en <b>Aplicar Cambios</b> para importarlo instantáneamente.</p>
        <div id="comparison_table_container" style="width: 100%;">
          <!-- Dinámico -->
        </div>
      </div>
    </div>

    <!-- Columna Derecha: Enriched Workbench & Suggestion engine -->
    <div class="output_section">
      <!-- Mesa de Trabajo (Enriched Workbench Card) -->
      <div class="lab_card">
        <h3 class="lab_card_title"><i class="fas fa-flask-vial"></i> Previsualizador de Componente</h3>
        <div class="workbench_wrapper">
          <div class="workbench_preview_card" id="workbench_preview_card" style="box-shadow: 0 8px 30px rgba(0,0,0,0.12); padding: 3vh;">
            <!-- Header -->
            <div class="wb_header">
              <span class="wb_brand"><i class="fas fa-palette"></i> WiiTema Workbench</span>
              <span class="wb_badge" id="wb_badge_text">Premium</span>
            </div>
            
            <!-- Body Content -->
            <div class="wb_content" style="display: flex; flex-direction: column; gap: 2.2vh;">
              <h4 class="wb_h3" style="font-size: var(--fz_m4); font-weight: 800; color: var(--w-text);">Interfaz de Componentes Premium</h4>
              
              <p class="wb_p" style="font-size: var(--fz_s3); line-height: 1.6;">
                Este playground simula todos los elementos visuales clave de WiiTema. Modifica y asigna colores para evaluar el contraste, legibilidad y armonía del diseño.
              </p>
              
              <!-- Párrafo & Enlace -->
              <p class="wb_p" style="font-size: var(--fz_s4); margin: 0; color: var(--w-text);">
                ¿Quieres saber más? Explora nuestra <a href="#" class="wb_link" style="color: var(--w-accent); font-weight: 800; text-decoration: underline; transition: all 0.2s;">documentación de diseño</a> para dominar las guías tipográficas.
              </p>

              <!-- Listas (ul, li) -->
              <div style="display: flex; flex-direction: column; gap: 0.8vh; color: var(--w-text);">
                <span style="font-size: 10px; font-weight: 800; text-transform: uppercase; opacity: 0.6; letter-spacing: 0.5px;">Lista de Características:</span>
                <ul class="wb_list" style="list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.8vh;">
                  <li style="font-size: var(--fz_s3); display: flex; align-items: center; gap: 8px;"><i class="fas fa-circle-check" style="color: var(--w-accent);"></i> Soporte nativo para variables de root CSS</li>
                  <li style="font-size: var(--fz_s3); display: flex; align-items: center; gap: 8px;"><i class="fas fa-circle-check" style="color: var(--w-accent);"></i> Paletas dinámicas e interactivas</li>
                  <li style="font-size: var(--fz_s3); display: flex; align-items: center; gap: 8px;"><i class="fas fa-circle-check" style="color: var(--w-accent);"></i> Contraste accesible y optimizado</li>
                </ul>
              </div>

              <!-- Fila de Botones (Varios estilos) -->
              <div style="display: flex; gap: 1.2vh; flex-wrap: wrap; margin-top: 1vh;">
                <button class="wb_btn" style="background: var(--w-primary); color: #fff; font-weight: 700; padding: 1vh 2vh; border-radius: 0.8vh; border: none; cursor: pointer;">Primario</button>
                <button class="wb_btn" style="background: var(--w-accent); color: #000; font-weight: 700; padding: 1vh 2vh; border-radius: 0.8vh; border: none; cursor: pointer;">Acento</button>
                <button class="wb_btn" style="background: transparent; color: var(--w-text); font-weight: 700; padding: 0.8vh 1.8vh; border-radius: 0.8vh; border: 1px solid var(--w-text); cursor: pointer;">Outline</button>
              </div>
            </div>
            
            <!-- Footer de Variables de Color Cargadas -->
            <div class="wb_active_colors" id="wb_active_colors_list" style="display: flex; gap: 1.5vh; flex-wrap: wrap; margin-top: 1.5vh; align-items: center;">
              <!-- Dinámico -->
            </div>
          </div>
        </div>
        <!-- Panel de Validación de Contraste y Errores WCAG -->
        <div id="contrast_validation_panel" style="margin-top: 1.5vh; display: flex; flex-direction: column; gap: 1vh;">
          <!-- Dinámico -->
        </div>
      </div>

      <!-- Afinador HSL Avanzado (HSL Control) -->
      <div class="lab_card" id="hsl_control_card">
        <h3 class="lab_card_title"><i class="fas fa-sliders"></i> Afinador Cromático HSL</h3>
        <p class="lab_desc" id="hsl_active_var_label" style="font-weight: 700; margin-bottom: 1vh; color: var(--mco);">Ajustando variable: --bg</p>
        
        <!-- Textarea de Información del Color Actual -->
        <div style="display: flex; flex-direction: column; gap: 0.8vh; margin-bottom: 1.5vh;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <label style="font-size: var(--fz_s3); font-weight: 700; color: var(--tx2);">Información del Color Actual:</label>
            <div style="display: flex; gap: 0.8vh;">
              <button class="bt_auth" id="btn_copy_hsl_color" style="padding: 0.3vh 1vh; font-size: 10px; background: var(--bg5); border: 1px solid var(--brd); border-radius: 0.5vh; display: flex; align-items: center; gap: 4px;" data-witip="Copiar HEX del color actual"><i class="fas fa-copy"></i> Copiar</button>
              <button class="bt_auth" id="btn_save_hsl_color" style="padding: 0.3vh 1vh; font-size: 10px; background: var(--mco); color: #fff; border: none; border-radius: 0.5vh; display: flex; align-items: center; gap: 4px;" data-witip="Aplicar y fijar color actual"><i class="fas fa-floppy-disk"></i> Fijar</button>
            </div>
          </div>
          <textarea id="hsl_color_text_area" class="color_textarea" style="min-height: 8.5vh; font-size: 11px; font-family: 'Consolas', monospace; padding: 1vh; line-height: 1.4; resize: none; background: var(--inp); border-radius: 0.8vh; border: 1px solid var(--brd); color: var(--tx1); transition: all 0.25s ease;" placeholder="Escribe o pega un color en formato HEX, RGB, HSL o nombre (ej: red)" data-witip="Copia o pega códigos de color (HEX, RGB, HSL) aquí para actualizar de arriba a abajo"></textarea>
        </div>

        <div style="display: flex; flex-direction: column; gap: 2.5vh;">
          <!-- Slider 1: Hue / Matiz -->
          <div style="display: flex; flex-direction: column; gap: 0.8vh;">
            <div style="display: flex; justify-content: space-between; font-size: var(--fz_s3); font-weight: 700; color: var(--tx2);">
              <span>Matiz (Hue)</span>
              <span id="val_hsl_hue">0°</span>
            </div>
            <input type="range" min="0" max="360" value="0" class="hsl_range_slider" id="range_hsl_hue" style="width: 100%; border-radius: 1vh; height: 1.2vh; cursor: pointer; outline: none; appearance: none;" />
          </div>

          <!-- Slider 2: Lightness / Luminosidad (0% a 100%) -->
          <div style="display: flex; flex-direction: column; gap: 0.8vh;">
            <div style="display: flex; justify-content: space-between; font-size: var(--fz_s3); font-weight: 700; color: var(--tx2);">
              <span>Luminosidad (Lightness)</span>
              <span id="val_hsl_lightness">50%</span>
            </div>
            <input type="range" min="0" max="100" value="50" class="hsl_range_slider" id="range_hsl_lightness" style="width: 100%; border-radius: 1vh; height: 1.2vh; cursor: pointer; outline: none; appearance: none;" />
          </div>

          <!-- Slider 3: Saturation / Saturación (100% a 0%) -->
          <div style="display: flex; flex-direction: column; gap: 0.8vh;">
            <div style="display: flex; justify-content: space-between; font-size: var(--fz_s3); font-weight: 700; color: var(--tx2);">
              <span>Saturación Inversa (100% a 0%)</span>
              <span id="val_hsl_saturation">100%</span>
            </div>
            <input type="range" min="0" max="100" value="0" class="hsl_range_slider" id="range_hsl_saturation" style="width: 100%; border-radius: 1vh; height: 1.2vh; cursor: pointer; outline: none; appearance: none;" />
          </div>
        </div>
      </div>
    </div>

  </div>

  <!-- CONTENIDO TAB 2: CAPTURAR & EXTRAER COLORES (HIDDEN BY DEFAULT) -->
  <div class="colores_container dpn" id="view_capture_content">
    
    <!-- Columna Izquierda: Extractor (Texto / Canvas Lupa) + Ajuste Fino -->
    <div class="input_section">
      <!-- Captura de Colores -->
      <div class="lab_card">
        <h3 class="lab_card_title"><i class="fas fa-eye-dropper"></i> Captura de Colores</h3>
        <div class="input_tabs">
          <button class="tab_btn active" data-tab="tab_text" data-witip="Pegar código CSS, SVG o HTML con colores"><i class="fas fa-file-code"></i> Pegar Código / CSS</button>
          <button class="tab_btn" data-tab="tab_image" data-witip="Extraer colores a partir de una imagen"><i class="fas fa-image"></i> Extraer de Imagen</button>
        </div>
        
        <!-- Tab 1: TEXTO / CSS / SVG -->
        <div class="tab_content active" id="tab_text">
          <p class="lab_desc">Pega cualquier código CSS o SVG. Reconoceremos automáticamente formatos HEX, RGB, HSL y variables nativas para poblar tu paleta.</p>
          <div class="textarea_wrapper">
            <textarea class="color_textarea" id="text_color_input" placeholder="Ejemplo: :root { --primary: #6a00f5; --accent: rgba(0, 243, 255, 0.9); }"></textarea>
          </div>
        </div>
        
        <!-- Tab 2: IMAGEN EXTRACTOR -->
        <div class="tab_content" id="tab_image">
          <p class="lab_desc">Sube una imagen o **pégala directamente con Ctrl+V** en cualquier parte de la pantalla. Usa la lupa de precisión para capturar píxeles exactos.</p>
          <div class="drag_zone" id="img_drag_zone" data-witip="Haz clic, arrastra o pega con Ctrl+V tu imagen aquí">
            <i class="fas fa-cloud-arrow-up"></i>
            <p>Arrastra tu imagen aquí, pégala con Ctrl+V o haz clic para subir</p>
            <span>Formatos aceptados: JPG, PNG, WEBP, AVIF</span>
            <input type="file" id="img_file_input" class="dpn" accept="image/*" />
          </div>
          
          <div class="canvas_outer_container dpn" id="canvas_outer_container">
            <div class="canvas_container" id="canvas_frame">
              <canvas id="image_canvas"></canvas>
              <div class="pixel_loupe" id="pixel_loupe">
                <div class="pixel_loupe_cross"></div>
              </div>
            </div>
            
            <div class="canvas_bar">
              <span class="lab_desc" style="font-weight: 700; color: var(--tx1);"><i class="fas fa-crosshairs" style="color: var(--mco);"></i> Extractor de Precisión</span>
              <button class="bt_auth" id="btn_clear_image" style="background: var(--bg5); padding: 0.5vh 1.5vh; font-size: var(--fz_s3);" data-witip="Quitar imagen cargada"><i class="fas fa-trash-can"></i> Quitar</button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Ajuste manual (Fine Tuner) -->
      <div class="lab_card">
        <h3 class="lab_card_title"><i class="fas fa-sliders"></i> Ajuste Fino & Selector</h3>
        <div class="dpw">
          <p class="lab_desc" style="margin:0; font-weight: 500;">Modifica o selecciona un color preciso para iniciar armonías cromáticas avanzadas.</p>
          <div class="picker_wrapper" data-witip="Selector de color base manual">
            <label for="color_picker_input">Color Base:</label>
            <input type="color" id="color_picker_input" class="custom_color_input" value="#6a00f5" />
          </div>
        </div>
      </div>
    </div>

    <!-- Columna Derecha: Dock de Colores Capturados + Exportador -->
    <div class="output_section">
      <!-- Colores Capturados -->
      <div class="lab_card">
        <div class="dpw" style="border-bottom: 1px solid var(--brd); padding-bottom: 1.2vh; margin-bottom: 1.5vh;">
          <h3 class="lab_card_title" style="border:none; padding:0; margin:0;"><i class="fas fa-eye-dropper"></i> Colores Capturados</h3>
          <button class="bt_auth" id="btn_goto_workbench" style="padding: 0.6vh 1.5vh; font-size: var(--fz_s3); font-weight: 800; background: var(--mco); color: #fff;" data-witip="Volver al previsualizador de la Mesa de Trabajo"><i class="fas fa-desktop"></i> Ir a la Mesa de Diseño</button>
        </div>
        <p class="lab_desc">Aquí se listan todos los colores que capturas. Haz clic para copiarlos o utiliza los botones inferiores para probarlos de inmediato en la Mesa de Diseño.</p>
        
        <div class="grid_colors_detected" id="extracted_colors_dock_grid" style="max-height: 40vh; overflow-y: auto;">
          <!-- Capturas dinámicas -->
        </div>
      </div>

      <!-- Exportador de Código -->
      <div class="lab_card">
        <h3 class="lab_card_title"><i class="fas fa-code"></i> Exportar Configuración</h3>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1vh; flex-wrap: wrap; gap:1vh;">
          <p class="lab_desc" style="margin:0;">Genera automáticamente los estilos CSS, Tailwind o JSON de tu combinación actual.</p>
          <div style="display:flex; gap:0.5vh; background:var(--bg5); padding:0.4vh; border-radius:0.8vh; border: 1px solid var(--brd);">
            <button class="tab_btn exporter_tab active" data-format="css" style="padding:0.4vh 1.2vh; font-size:var(--fz_s2); font-weight:700; border-radius:0.5vh; border:none; cursor:pointer;" data-witip="Exportar como variables CSS nativas">CSS</button>
            <button class="tab_btn exporter_tab" data-format="tailwind" style="padding:0.4vh 1.2vh; font-size:var(--fz_s2); font-weight:700; border-radius:0.5vh; border:none; cursor:pointer;" data-witip="Exportar para tailwind.config.js">Tailwind</button>
            <button class="tab_btn exporter_tab" data-format="json" style="padding:0.4vh 1.2vh; font-size:var(--fz_s2); font-weight:700; border-radius:0.5vh; border:none; cursor:pointer;" data-witip="Exportar como objeto JSON de configuración">JSON</button>
          </div>
        </div>
        
        <div class="exporter_card">
          <div class="code_panel">
            <button class="btn_copy_code" id="btn_copy_code_exporter" data-witip="Copiar código generado al portapapeles"><i class="fas fa-copy"></i> Copiar</button>
            <pre class="code_pre"><code id="code_output_block">/* Selecciona y asigna colores arriba */</code></pre>
          </div>
        </div>
      </div>
    </div>

  </div>

</div>
`;

// ── RENDERIZADO DE LA GRILLA DE COLORES ──
const renderColorsGrid = (searchQuery = '') => {
  const container = $('#grid_colors_detected');
  const activeTab = state.activeThemeTab;
  const colors = state.themeColorsData[activeTab];

  if (!colors || colors.length === 0) {
    container.html(`
      <div class="ad_empty" style="grid-column: 1 / -1;"><i class="fas fa-palette"></i> Aún no hay colores en esta sección. Pega código o sube una imagen en la pestaña de capturas.</div>
    `);
    return;
  }

  // Filter colors if search query is provided
  let filteredIndices = colors.map((color, index) => ({ color, index }));
  if (searchQuery) {
    const q = searchQuery.toLowerCase().trim();
    filteredIndices = filteredIndices.filter(item => {
      const varName = getVariableName(activeTab, item.index).toLowerCase();
      const hex = item.color.toLowerCase();
      return varName.includes(q) || hex.includes(q);
    });
  }

  if (filteredIndices.length === 0) {
    container.html(`
      <div class="ad_empty" style="grid-column: 1 / -1;"><i class="fas fa-search-minus"></i> No se encontraron variables con "${searchQuery}".</div>
    `);
    return;
  }

  const html = filteredIndices.map(({ color, index }) => {
    const isSelected = (state.selectedTarget.type === 'palette' && state.selectedTarget.index === index) ? 'selected' : '';
    const varName = getVariableName(activeTab, index);

    return `
      <div class="color_chip_card ${isSelected}" data-color="${color}" data-index="${index}">
        <div class="color_preview_block" style="background: ${color}">
          <div class="color_copy_overlay" data-witip="Copiar HEX"><i class="fas fa-copy"></i> Copiar</div>
          <div class="color_edit_picker_wrapper" style="position: absolute; top: 8px; right: 8px; z-index: 10; background: var(--wb); border-radius: 50%; padding: 4px; display: flex; align-items: center; justify-content: center; width: 24px; height: 24px; box-shadow: var(--bs_l); border: 1px solid var(--brd);" data-witip="Editar color de variable">
            <i class="fas fa-pen" style="font-size: 9px; color: var(--tx2); position: absolute; pointer-events: none;"></i>
            <input type="color" class="theme_var_color_picker edit-palette-color" data-index="${index}" value="${color}" style="opacity: 0; width: 24px; height: 24px; cursor: pointer; position: absolute;" />
          </div>
        </div>
        <div class="color_info_footer" style="padding: 1vh 0.8vh; display: flex; flex-direction: column; gap: 4px; min-height: 7vh; justify-content: center; text-align: center;">
          <span style="font-size: 9px; font-weight: 800; color: var(--tx3); text-transform: uppercase; letter-spacing: 0.3px;">${varName}</span>
          <span class="color_hex_val" style="font-size: 11px; margin-top: 2px;">${color.toUpperCase()}</span>
        </div>
        <div class="color_quick_actions">
          <button class="quick_act_btn assign-wb" data-type="bg" data-witip="Asignar a Fondo" style="color: var(--tx2);"><i class="fas fa-desktop"></i></button>
          <button class="quick_act_btn assign-wb" data-type="primary" data-witip="Asignar a Primario" style="color: var(--tx2);"><i class="fas fa-star"></i></button>
          <button class="quick_act_btn assign-wb" data-type="accent" data-witip="Asignar a Acento" style="color: var(--tx2);"><i class="fas fa-bolt"></i></button>
          <button class="quick_act_btn assign-wb" data-type="text" data-witip="Asignar a Texto" style="color: var(--tx2);"><i class="fas fa-font"></i></button>
        </div>
      </div>
    `;
  }).join('');
  
  container.html(html);
  syncTextareaCSS();
};

// ── RENDERIZADO DEL DOCK DE COLORES CAPTURADOS (TAB 2) ──
const renderExtractedColorsDock = () => {
  const container = $('#extracted_colors_dock_grid');
  const colors = state.themeColorsData.detectados;
  
  if (colors.length === 0) {
    container.html(`
      <div class="ad_empty" style="grid-column: 1 / -1; padding: 4vh 2vh;"><i class="fas fa-palette"></i> Aún no has capturado ningún color. Pega código en el editor de la izquierda o sube una imagen.</div>
    `);
    return;
  }
  
  const html = colors.map((color, index) => {
    const isBase = color.toLowerCase() === state.baseColor.toLowerCase() ? 'selected' : '';
    const varName = `Capturado ${index + 1}`;
    
    return `
      <div class="color_chip_card ${isBase}" data-color="${color}" style="width: 80px; height: 105px; margin: 0; font-size: 10px; border-radius: 0.8vh;">
        <div class="color_preview_block" style="background: ${color}; height: 5vh;">
          <div class="color_copy_overlay" style="font-size: 9px;"><i class="fas fa-copy"></i></div>
        </div>
        <div class="color_info_footer" style="padding: 0.5vh; text-align: center; display: flex; flex-direction: column; gap: 2px;">
          <span style="font-size: 8px; font-weight: 700; color: var(--tx3); text-transform: uppercase;">${varName}</span>
          <span class="color_hex_val" style="font-size: 8px; font-weight: 800; display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin-top: 1px;">${color.toUpperCase()}</span>
        </div>
        <div class="color_quick_actions" style="padding: 2px;">
          <button class="quick_act_btn assign-wb" data-type="bg" title="Fondo" style="padding: 2px; font-size: 8px;"><i class="fas fa-desktop"></i></button>
          <button class="quick_act_btn assign-wb" data-type="primary" title="Primario" style="padding: 2px; font-size: 8px;"><i class="fas fa-star"></i></button>
          <button class="quick_act_btn assign-wb" data-type="accent" title="Acento" style="padding: 2px; font-size: 8px;"><i class="fas fa-bolt"></i></button>
          <button class="quick_act_btn assign-wb" data-type="text" title="Texto" style="padding: 2px; font-size: 8px;"><i class="fas fa-font"></i></button>
        </div>
      </div>
    `;
  }).join('');
  
  container.html(html);
};

// ── COMPARADOR DE CAMBIOS (TABLA DINÁMICA ORIGINAL VS NUEVO) ──
// ── COMPARADOR / CONSOLA DE ESTILOS :ROOT ──
const renderComparisonTable = () => {
  const container = $('#comparison_table_container');
  const cssText = generateFullRootCSS();
  
  const html = `
    <div class="code_panel" style="margin-top: 1vh; width: 100%;">
      <textarea id="full_root_css_textarea" class="color_textarea" style="width: 100%; min-height: 40vh; font-family: 'Consolas', monospace; font-size: 11px; line-height: 1.5; color: #c7d2fe; background: #111420; border: 1px solid #2d3a52; border-radius: 1vh; padding: 2vh;" data-witip="¡Edita este código CSS directamente y presiona Aplicar Cambios!">${cssText}</textarea>
      
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1.5vh; gap: 1vh; flex-wrap: wrap;">
        <button class="bt_auth" id="btn_reset_theme_defaults" style="padding: 0.8vh 1.5vh; font-size: var(--fz_s3); font-weight: 700; background: var(--bg5); border: 1px solid var(--brd); border-radius: 0.6vh;" data-witip="Restablecer todos los temas a sus valores por defecto"><i class="fas fa-rotate-left"></i> Restablecer Todo</button>
        
        <div style="display: flex; gap: 1vh;">
          <button class="bt_auth" id="btn_copy_full_root" style="padding: 0.8vh 1.5vh; font-size: var(--fz_s3); font-weight: 700; background: var(--bg5); border: 1px solid var(--brd); border-radius: 0.6vh;" data-witip="Copiar todo el código CSS :root"><i class="fas fa-copy"></i> Copiar Todo</button>
          <button class="bt_auth" id="btn_apply_full_root" style="padding: 0.8vh 1.5vh; font-size: var(--fz_s3); font-weight: 700; background: var(--mco); color: #fff; border: none; border-radius: 0.6vh;" data-witip="Importar y aplicar los cambios del código CSS anterior"><i class="fas fa-play"></i> Aplicar Cambios</button>
        </div>
      </div>
    </div>
  `;
  
  container.html(html);
};

// ── CONTRASTE & ACCESIBILIDAD ──
const getRelativeLuminance = (rgb) => {
  const rs = rgb.r / 255, gs = rgb.g / 255, bs = rgb.b / 255;
  const r = rs <= 0.03928 ? rs / 12.92 : Math.pow((rs + 0.055) / 1.055, 2.4);
  const g = gs <= 0.03928 ? gs / 12.92 : Math.pow((gs + 0.055) / 1.055, 2.4);
  const b = bs <= 0.03928 ? bs / 12.92 : Math.pow((bs + 0.055) / 1.055, 2.4);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const getContrastRatio = (hex1, hex2) => {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  if (!rgb1 || !rgb2) return 1;
  const l1 = getRelativeLuminance(rgb1);
  const l2 = getRelativeLuminance(rgb2);
  const brightest = Math.max(l1, l2);
  const darkest = Math.min(l1, l2);
  return (brightest + 0.05) / (darkest + 0.05);
};

// ── ACTUALIZAR AFINADOR HSL EN VIVO ──
const updateHslSlidersUI = (h, s, l) => {
  // Matiz: arcoiris
  $('#range_hsl_hue').css('background', 'linear-gradient(to right, red 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, red 100%)');
  
  // Luminosidad: negro -> color puro -> blanco
  const midColor = hslToHex(h, s, 50);
  $('#range_hsl_lightness').css('background', `linear-gradient(to right, #000 0%, ${midColor} 50%, #fff 100%)`);
  
  // Saturación inversa: color puro -> gris
  const pureSat = hslToHex(h, 100, l);
  const zeroSat = hslToHex(h, 0, l);
  $('#range_hsl_saturation').css('background', `linear-gradient(to right, ${pureSat} 0%, ${zeroSat} 100%)`);
  
  // Textos e indicadores
  $('#val_hsl_hue').text(`${h}°`);
  $('#val_hsl_lightness').text(`${l}%`);
  $('#val_hsl_saturation').text(`${100 - s}% (Saturación: ${s}%)`);

  // Actualizar el textarea con los formatos correspondientes si no está enfocado
  const textarea = $('#hsl_color_text_area');
  if (textarea.length && !textarea.is(':focus')) {
    const hex = hslToHex(h, s, l);
    const rgb = hslToRgb(h, s, l);
    textarea.val(`HEX: ${hex.toUpperCase()}\nRGB: rgb(${rgb.r}, ${rgb.g}, ${rgb.b})\nHSL: hsl(${h}, ${s}%, ${l}%)`);
    textarea.css({
      'border-color': 'var(--brd)',
      'box-shadow': 'none'
    });
  }
};

// ── ACTUALIZAR EL WORKBENCH PREVIEW ──
const updateWorkbench = () => {
  const card = $('#workbench_preview_card');
  const cssVars = {};
  
  Object.keys(state.workbench).forEach(key => {
    let cssName = key;
    if (key === 'primary') cssName = 'primary';
    else if (key === 'accent') cssName = 'accent';
    else if (key === 'card') cssName = 'wb';
    else if (key === 'text') cssName = 'text';
    
    cssVars[`--w-${cssName}`] = state.workbench[key];
  });
  
  card.css(cssVars);

  // Renderizar las bolitas de variables editables (tipo pills clickeables con estado active)
  const listContainer = $('#wb_active_colors_list');
  if (listContainer.length) {
    let html = Object.keys(state.workbench).map(key => {
      const val = state.workbench[key];
      let displayName = `--${key}`;
      if (key === 'primary') displayName = '--mco';
      else if (key === 'accent') displayName = '--hv';
      else if (key === 'card') displayName = '--wb';
      else if (key === 'text') displayName = '--tx';
      
      const isSelected = state.selectedTarget.type === 'workbench' && state.selectedTarget.key === key;
      const activeBorder = isSelected ? 'border-color: var(--mco); box-shadow: 0 0 0 2px var(--mco); background: var(--bg3);' : '';
      const checkIcon = isSelected ? `<i class="fas fa-check" style="position: absolute; font-size: 8px; color: #fff; pointer-events: none; z-index: 10;"></i>` : '';
      
      const isCustom = !['bg', 'card', 'primary', 'accent', 'text'].includes(key);
      const deleteBtn = isCustom ? `
        <button class="btn_del_wb_var" data-key="${key}" style="background:none; border:none; color:var(--tx3); cursor:pointer; font-size:10px; padding:0 4px; display:flex; align-items:center;" data-witip="Eliminar variable">
          <i class="fas fa-times"></i>
        </button>
      ` : '';

      // Tooltip informativo sobre el uso de la variable en los componentes
      let usageTip = `--w-${key}: Variable personalizada del Workbench`;
      if (key === 'bg') usageTip = '--bg: Fondo principal de la mesa o sección';
      else if (key === 'card') usageTip = '--wb: Fondo de tarjetas y mesa de diseño';
      else if (key === 'primary') usageTip = '--mco: Color primario (Botón primario, logos)';
      else if (key === 'accent') usageTip = '--hv: Color de acento (Botón acento, enlaces, checks)';
      else if (key === 'text') usageTip = '--tx: Texto principal (Títulos y párrafos)';

      return `
        <div class="wb_color_pill" data-key="${key}" style="display:flex; align-items:center; gap:8px; background:var(--bg5); border:1px solid var(--brd); padding:0.6vh 1.2vh; border-radius:1vh; position:relative; transition: all 0.2s; cursor:pointer; ${activeBorder}" data-witip="${usageTip}">
          <div style="position:relative; width:18px; height:18px; border-radius:50%; border:1px solid var(--brd); background:${val}; display:flex; align-items:center; justify-content:center; box-shadow:var(--bs_m);">
            ${checkIcon}
          </div>
          <span style="font-size:11px; font-weight:800; color:var(--tx1); pointer-events: none;">${displayName}</span>
          ${deleteBtn}
        </div>
      `;
    }).join('');
    
    // Agregar botón "+" para insertar nuevas variables editables
    html += `
      <button class="bt_auth" id="btn_add_wb_var" style="width:28px; height:28px; border-radius:50%; border:1px solid var(--brd); background:var(--bg5); display:flex; align-items:center; justify-content:center; cursor:pointer; padding:0; font-size:var(--fz_s3);" data-witip="Agregar nueva variable al Workbench"><i class="fas fa-plus"></i></button>
    `;
    listContainer.html(html);
  }

  // Obtener el color del target unificado actual para el afinador HSL
  let activeColor = '#6a00f5';
  let displayName = '';
  
  if (state.selectedTarget.type === 'workbench') {
    const key = state.selectedTarget.key;
    activeColor = state.workbench[key] || '#6a00f5';
    displayName = `--${key}`;
    if (key === 'primary') displayName = '--mco';
    else if (key === 'accent') displayName = '--hv';
    else if (key === 'card') displayName = '--wb';
    else if (key === 'text') displayName = '--tx';
    displayName += ' (Mesa)';
  } else {
    const index = state.selectedTarget.index;
    const activeTab = state.activeThemeTab;
    activeColor = state.themeColorsData[activeTab][index] || '#6a00f5';
    displayName = getVariableName(activeTab, index) + ` (${activeTab})`;
  }
  
  $('#hsl_active_var_label').text(`Ajustando variable: ${displayName}`);

  // Sincronizar sliders HSL si no tienen el foco y el textarea tampoco
  if (!$('.hsl_range_slider').is(':focus') && !$('#hsl_color_text_area').is(':focus')) {
    const rgb = hexToRgb(activeColor);
    if (rgb) {
      const { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b);
      $('#range_hsl_hue').val(h);
      $('#range_hsl_lightness').val(l);
      $('#range_hsl_saturation').val(100 - s);
      updateHslSlidersUI(h, s, l);
    }
  }

  // Calcular contrastes y legibilidad en vivo (WCAG AA)
  const bgTextContrast = getContrastRatio(state.workbench.bg, state.workbench.text);
  const primaryWhiteContrast = getContrastRatio(state.workbench.primary, '#ffffff');
  
  let contrastHtml = '';
  let hasErrors = false;
  
  if (bgTextContrast < 4.5) {
    hasErrors = true;
    contrastHtml += `
      <div style="display:flex; align-items:center; gap:8px; color:#ff3849; font-size:11px; font-weight:700; background:rgba(255,56,73,0.08); padding:0.8vh 1.2vh; border-radius:0.8vh; border:1px solid rgba(255,56,73,0.15); animation: wi_fadeUp 0.3s ease;">
        <i class="fas fa-circle-xmark"></i> Bajo contraste entre texto y fondo (${bgTextContrast.toFixed(2)}:1). WCAG AA requiere mínimo 4.5:1.
      </div>
    `;
  }
  if (primaryWhiteContrast < 3.0) {
    hasErrors = true;
    contrastHtml += `
      <div style="display:flex; align-items:center; gap:8px; color:#ffa726; font-size:11px; font-weight:700; background:rgba(255,167,38,0.08); padding:0.8vh 1.2vh; border-radius:0.8vh; border:1px solid rgba(255,167,38,0.15); animation: wi_fadeUp 0.3s ease;">
        <i class="fas fa-triangle-exclamation"></i> El botón primario (--mco) tiene bajo contraste con texto blanco (${primaryWhiteContrast.toFixed(2)}:1).
      </div>
    `;
  }
  
  if (!hasErrors) {
    contrastHtml = `
      <div style="display:flex; align-items:center; gap:8px; color:#25b62a; font-size:11px; font-weight:700; background:rgba(37,182,42,0.08); padding:0.8vh 1.2vh; border-radius:0.8vh; border:1px solid rgba(37,182,42,0.15); animation: wi_fadeUp 0.3s ease;">
        <i class="fas fa-circle-check"></i> ¡Legibilidad óptima! Todos los contrastes cumplen la norma WCAG AA.
      </div>
    `;
  }
  
  $('#contrast_validation_panel').html(contrastHtml);

  // Badge dynamic label
  $('#wb_badge_text').text(state.activeThemeTab.toUpperCase());

  updateExporter();
  renderComparisonTable();
};

// ── GENERAR ARMONÍAS CON BOTONES RÁPIDOS EN HOVER ──
const generateHarmonies = () => {
  const rgb = hexToRgb(state.baseColor);
  if (!rgb) return;
  const { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b);

  const tplChips = (list) => list.map(c => `
    <div class="harmony_chip" style="background: ${c}" data-color="${c}">
      <span class="harmony_chip_tooltip">${c.toUpperCase()}</span>
      <div class="harmony_overlay">
        <button class="harmony_act_btn assign-wb-harmony" data-color="${c}" data-type="bg" title="Fondo"><i class="fas fa-desktop"></i></button>
        <button class="harmony_act_btn assign-wb-harmony" data-color="${c}" data-type="primary" title="Primario"><i class="fas fa-star"></i></button>
        <button class="harmony_act_btn assign-wb-harmony" data-color="${c}" data-type="accent" title="Acento"><i class="fas fa-bolt"></i></button>
        <button class="harmony_act_btn assign-wb-harmony" data-color="${c}" data-type="text" title="Texto"><i class="fas fa-font"></i></button>
      </div>
    </div>
  `).join('');

  // 1. Monocromático
  const mono = [
    hslToHex(h, s, Math.max(10, l - 30)),
    hslToHex(h, s, Math.max(20, l - 15)),
    state.baseColor,
    hslToHex(h, s, Math.min(90, l + 15)),
    hslToHex(h, s, Math.min(95, l + 30))
  ];
  $('#harm_monochromatic').html(tplChips(mono));

  // 2. Análogos
  const analog = [
    hslToHex((h - 30 + 360) % 360, s, l),
    hslToHex((h - 15 + 360) % 360, s, l),
    state.baseColor,
    hslToHex((h + 15) % 360, s, l),
    hslToHex((h + 30) % 360, s, l)
  ];
  $('#harm_analogous').html(tplChips(analog));

  // 3. Complementario
  const comp = [
    hslToHex(h, Math.max(10, s - 20), Math.min(90, l + 10)),
    state.baseColor,
    hslToHex((h + 180) % 360, s, l),
    hslToHex((h + 180) % 360, Math.max(10, s - 15), Math.max(10, l - 15)),
    hslToHex((h + 180) % 360, Math.min(100, s + 10), Math.min(95, l + 15))
  ];
  $('#harm_complementary').html(tplChips(comp));

  // 4. Tríada
  const triad = [
    hslToHex(h, s, Math.max(15, l - 20)),
    state.baseColor,
    hslToHex((h + 120) % 360, s, l),
    hslToHex((h + 240) % 360, s, l),
    hslToHex((h + 240) % 360, Math.max(10, s - 10), Math.min(95, l + 15))
  ];
  $('#harm_triad').html(tplChips(triad));
};

const updateExporter = () => {
  const block = $('#code_output_block');
  const format = state.activeExporterFormat;

  if (format === 'css') {
    block.text(`:root {
  --w-bg: ${state.workbench.bg};
  --w-primary: ${state.workbench.primary};
  --w-accent: ${state.workbench.accent};
  --w-text: ${state.workbench.text};
}`);
  } else if (format === 'tailwind') {
    block.text(`module.exports = {
  theme: {
    extend: {
      colors: {
        'wi-bg': '${state.workbench.bg}',
        'wi-primary': '${state.workbench.primary}',
        'wi-accent': '${state.workbench.accent}',
        'wi-text': '${state.workbench.text}',
      }
    }
  }
}`);
  } else if (format === 'json') {
    block.text(JSON.stringify({
      theme: state.activeThemeTab,
      colors: state.workbench
    }, null, 2));
  }
};

// ── LECTURA DE IMÁGENES ──
const handleImageLoad = (file) => {
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.getElementById('image_canvas');
      const ctx = canvas.getContext('2d');

      const maxW = 450;
      const maxH = 280;
      let w = img.width;
      let h = img.height;

      if (w > maxW) {
        h = Math.floor(h * (maxW / w));
        w = maxW;
      }
      if (h > maxH) {
        w = Math.floor(w * (maxH / h));
        h = maxH;
      }

      canvas.width = w;
      canvas.height = h;
      ctx.drawImage(img, 0, 0, w, h);

      $('#img_drag_zone').addClass('dpn');
      $('#canvas_outer_container').removeClass('dpn');

      const dominant = extractDominantColors(canvas, 8);
      if (dominant && dominant.length > 0) {
        state.themeColorsData.detectados = [...new Set([...dominant, ...state.themeColorsData.detectados])].slice(0, 15);
        state.baseColor = dominant[0];
        
        state.workbench.primary = dominant[0];
        state.workbench.accent = dominant[1] || dominant[0];
        if (dominant[2]) state.workbench.bg = dominant[2];
        
        renderExtractedColorsDock();
        generateHarmonies();
        updateWorkbench();
        Notificacion('Paleta extraída con éxito', 'success');
      }

      canvas.dataset.originalSrc = canvas.toDataURL();
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
};

// ── COMPONENT API EXPORTS ──

export const render = async () => {
  return HTML;
};

export const init = () => {
  wiTip(); // Inicializa los tooltips interactivos de widev
  renderColorsGrid();
  generateHarmonies();
  updateWorkbench();
  renderExtractedColorsDock();
  renderComparisonTable();

  // 1. Pega desde portapapeles global (Ctrl + V)
  $(document).on('paste.col', (e) => {
    const items = (e.clipboardData || e.originalEvent.clipboardData).items;
    for (const item of items) {
      if (item.type.indexOf('image') !== -1) {
        const file = item.getAsFile();
        
        // Activa pestaña capturas e inserta
        $('.top_level_tab[data-top-tab="view_capture"]').trigger('click');
        $('.input_tabs .tab_btn[data-tab="tab_image"]').trigger('click');
        handleImageLoad(file);
        
        Notificacion('Imagen pegada desde el portapapeles', 'success');
        break;
      }
    }
  });

  // 2. Manejo de Pestañas Principales Superiores (Mesa de Diseño vs Capturar)
  $(document).on('click.col', '.top_level_tab', function(e) {
    e.preventDefault();
    const targetTab = $(this).data('top-tab');

    $('.top_level_tab').removeClass('active');
    $(this).addClass('active');

    if (targetTab === 'view_palette') {
      $('#view_capture_content').addClass('dpn');
      $('#view_palette_content').removeClass('dpn');
      renderColorsGrid();
      renderComparisonTable();
    } else if (targetTab === 'view_capture') {
      $('#view_palette_content').addClass('dpn');
      $('#view_capture_content').removeClass('dpn');
      renderExtractedColorsDock();
    }
  });

  // Botón "Ir a la Mesa de Diseño"
  $(document).on('click.col', '#btn_goto_workbench', function(e) {
    e.preventDefault();
    $('.top_level_tab[data-top-tab="view_palette"]').trigger('click');
  });

  // 3. Manejo de Pestañas de Carga (Código vs Imagen)
  $(document).on('click.col', '.tab_btn[data-tab]', function(e) {
    e.preventDefault();
    const target = $(this).data('tab');
    if ($(this).hasClass('exporter_tab') || $(this).hasClass('wii_theme_tab') || $(this).hasClass('top_level_tab')) return;

    $('.input_tabs .tab_btn:not(.exporter_tab):not(.wii_theme_tab):not(.top_level_tab)').removeClass('active');
    $(this).addClass('active');

    $('.tab_content').removeClass('active');
    $(`#${target}`).addClass('active');
  });

  // 4. Pestañas Horizontales de Temas (General, Cielo, Dulce...)
  $(document).on('click.col', '.wii_theme_tab', function(e) {
    e.preventDefault();
    const tabName = $(this).data('theme-tab');
    
    $('.wii_theme_tab').removeClass('active');
    $(this).addClass('active');

    state.activeThemeTab = tabName;
    renderColorsGrid();
    
    // Si es un tema del sitio, cargar por defecto el color base del tema
    const colors = state.themeColorsData[tabName];
    if (colors && colors.length > 0) {
      state.baseColor = colors[0];
      $('#color_picker_input').val(state.baseColor);
      generateHarmonies();
    }
    
    // Ajustar instrucciones según el tab
    if (tabName === 'general') {
      $('#palette_instructions').html('Burbujas generales del tema root de WiiTema. Toca un color para usarlo como base o asígnalo al Workbench.');
    } else {
      $('#palette_instructions').html(`Variables oficiales de la paleta del tema **${tabName.toUpperCase()}**. Asigna o copia los colores directamente.`);
    }

    // Actualizar previsualizador si cargamos un tema completo
    if (tabName !== 'general') {
      const activeColors = state.wiiThemes[tabName];
      state.workbench.bg = activeColors.bg;
      state.workbench.card = activeColors.card;
      state.workbench.primary = activeColors.primary;
      state.workbench.accent = activeColors.accent;
      state.workbench.text = activeColors.text;
      updateWorkbench();
    } else {
      renderComparisonTable();
    }
  });

  // 5. Restablecer valores de tema por defecto o todos los temas (Consola / Editor)
  $(document).on('click.col', '#btn_reset_theme_defaults', function(e) {
    e.preventDefault();
    const activeTab = state.activeThemeTab;
    
    const THEME_KEYS = [
      'bg', 'card', 'text', 'tx1', 'tx2', 'tx3', 'txa', 'txe',
      'accent', 'hva', 'primary', 'mbg', 'brd', 'inp', 'bg1', 'bg2',
      'bg3', 'bg4', 'bg5', 'bg6', 'bg7', 'bg8'
    ];

    if (activeTab === 'general') {
      state.wiiThemes = JSON.parse(JSON.stringify(DEFAULT_WII_THEMES));
      // Re-alinear themeColorsData
      Object.keys(DEFAULT_WII_THEMES).forEach(k => {
        const theme = DEFAULT_WII_THEMES[k];
        state.themeColorsData[k] = THEME_KEYS.map(key => theme[key]);
      });
      state.themeColorsData.general = ['#0EBEFF', '#FF5C69', '#29C72E', '#FFDA34', '#7000FF', '#21273B', '#3cd741', '#ff3849', '#ffa726', '#00a8e6'];
    } else {
      state.wiiThemes[activeTab] = JSON.parse(JSON.stringify(DEFAULT_WII_THEMES[activeTab]));
      const theme = state.wiiThemes[activeTab];
      state.workbench.bg = theme.bg;
      state.workbench.card = theme.card;
      state.workbench.primary = theme.primary;
      state.workbench.accent = theme.accent;
      state.workbench.text = theme.text;
      state.themeColorsData[activeTab] = THEME_KEYS.map(key => theme[key]);
    }

    updateWorkbench();
    renderColorsGrid();
    renderComparisonTable();
    Notificacion('Valores del tema restaurados', 'success');
  });

  // 6. Extractor de Texto en Tiempo Real
  $(document).on('input.col', '#text_color_input', function() {
    const text = $(this).val();
    const colors = extractColorsFromText(text);
    if (colors.length > 0) {
      state.themeColorsData.detectados = [...new Set([...colors, ...state.themeColorsData.detectados])].slice(0, 20);
      state.baseColor = colors[0];
      
      renderExtractedColorsDock();
      generateHarmonies();
      updateWorkbench();
    }
  });

  // 7. Entrada manual de Picker de Color
  $(document).on('input.col', '#color_picker_input', function() {
    const color = $(this).val();
    state.baseColor = color;
    if (!state.themeColorsData.detectados.includes(color)) {
      state.themeColorsData.detectados.unshift(color);
      state.themeColorsData.detectados = state.themeColorsData.detectados.slice(0, 20);
    }
    
    // Si tenemos un tema activo en el workbench y editamos el color base manual,
    // actualizamos la propiedad correspondiente del tema para mantener el comparador sincronizado!
    const activeTab = state.activeThemeTab;
    if (activeTab !== 'general' && activeTab !== 'detectados') {
      const keys = ['bg', 'primary', 'accent', 'text'];
      keys.forEach(k => {
        if (state.workbench[k].toLowerCase() === state.baseColor.toLowerCase()) {
          state.wiiThemes[activeTab][k] = color;
        }
      });
      const theme = state.wiiThemes[activeTab];
      const THEME_KEYS = [
        'bg', 'card', 'text', 'tx1', 'tx2', 'tx3', 'txa', 'txe',
        'accent', 'hva', 'primary', 'mbg', 'brd', 'inp', 'bg1', 'bg2',
        'bg3', 'bg4', 'bg5', 'bg6', 'bg7', 'bg8'
      ];
      state.themeColorsData[activeTab] = THEME_KEYS.map(key => theme[key]);
      renderColorsGrid();
    }

    renderExtractedColorsDock();
    generateHarmonies();
    updateWorkbench();
  });

  // 8. Drag & Drop de Imagen
  const dropZone = $('#img_drag_zone');
  
  $(document).on('dragover.col', '#img_drag_zone', function(e) {
    e.preventDefault();
    dropZone.addClass('dragover');
  });

  $(document).on('dragleave.col', '#img_drag_zone', function(e) {
    e.preventDefault();
    dropZone.removeClass('dragover');
  });

  $(document).on('drop.col', '#img_drag_zone', function(e) {
    e.preventDefault();
    dropZone.removeClass('dragover');
    const files = e.originalEvent.dataTransfer.files;
    if (files.length > 0) {
      handleImageLoad(files[0]);
    }
  });

  $(document).on('click.col', '#img_drag_zone', () => {
    $('#img_file_input').trigger('click');
  });

  $(document).on('change.col', '#img_file_input', function() {
    const files = this.files;
    if (files.length > 0) {
      handleImageLoad(files[0]);
    }
  });

  $(document).on('click.col', '#btn_clear_image', () => {
    $('#img_drag_zone').removeClass('dpn');
    $('#canvas_outer_container').addClass('dpn');
    $('#img_file_input').val('');
  });

  // 9. Canvas Pixel Lupa
  const canvas = document.getElementById('image_canvas');
  
  $(document).on('mousemove.col', '#image_canvas', function(e) {
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) * (canvas.width / rect.width));
    const y = Math.floor((e.clientY - rect.top) * (canvas.height / rect.height));

    if (x >= 0 && x < canvas.width && y >= 0 && y < canvas.height) {
      const ctx = canvas.getContext('2d');
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      const hex = rgbToHex(pixel[0], pixel[1], pixel[2]);

      const loupe = $('#pixel_loupe');
      loupe.css({
        'display': 'block',
        'border-color': hex,
        'left': `${e.clientX - rect.left - 40}px`,
        'top': `${e.clientY - rect.top - 90}px`,
        'background-image': `url(${canvas.dataset.originalSrc})`,
        'background-size': `${rect.width * 6}px ${rect.height * 6}px`,
        'background-position': `${-x * 6 + 40}px ${-y * 6 + 40}px`
      });
    }
  });

  $(document).on('mouseleave.col', '#image_canvas', () => {
    $('#pixel_loupe').css('display', 'none');
  });

  $(document).on('click.col', '#image_canvas', function(e) {
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) * (canvas.width / rect.width));
    const y = Math.floor((e.clientY - rect.top) * (canvas.height / rect.height));

    if (x >= 0 && x < canvas.width && y >= 0 && y < canvas.height) {
      const ctx = canvas.getContext('2d');
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      const hex = rgbToHex(pixel[0], pixel[1], pixel[2]);

      state.baseColor = hex;
      if (!state.themeColorsData.detectados.includes(hex)) {
        state.themeColorsData.detectados.unshift(hex);
        state.themeColorsData.detectados = state.themeColorsData.detectados.slice(0, 20);
      }
      
      renderExtractedColorsDock();
      generateHarmonies();
      updateWorkbench();
      Notificacion(`Color ${hex.toUpperCase()} capturado`, 'info');
    }
  });

  // 10. Selección de Color en la Paleta Grid
  $(document).on('click.col', '.color_chip_card', function(e) {
    if ($(e.target).closest('.quick_act_btn').length > 0 || $(e.target).closest('.color_edit_picker_wrapper').length > 0) return;

    const index = $(this).data('index');
    const color = $(this).data('color');
    state.baseColor = color;
    $('#color_picker_input').val(color);

    // Seleccionar esta variable de la paleta para afinamiento HSL unificado
    state.selectedTarget = { type: 'palette', index: index };

    $('.color_chip_card').removeClass('selected');
    $(this).addClass('selected');

    updateWorkbench();
    generateHarmonies();
  });

  // 11. Copiar color al hacer clic sobre el bloque
  $(document).on('click.col', '.color_preview_block', function(e) {
    if ($(e.target).closest('.color_edit_picker_wrapper').length > 0) return;
    const card = $(this).closest('.color_chip_card');
    const color = card.data('color');
    navigator.clipboard.writeText(color).then(() => {
      Notificacion(`Copiado: ${color.toUpperCase()}`, 'success');
    });
  });

  // 12. Botones Rápidos de Asignación en Paleta
  $(document).on('click.col', '.assign-wb', function(e) {
    e.preventDefault();
    const type = $(this).data('type');
    const color = $(this).closest('.color_chip_card').data('color');

    state.workbench[type] = color;
    
    // Sincronizar en wiiThemes si es un tema oficial el activo
    const activeTab = state.activeThemeTab;
    if (activeTab !== 'general' && activeTab !== 'detectados') {
      state.wiiThemes[activeTab][type] = color;
      
      // Sincronizar array de colores
      const theme = state.wiiThemes[activeTab];
      const THEME_KEYS = [
        'bg', 'card', 'text', 'tx1', 'tx2', 'tx3', 'txa', 'txe',
        'accent', 'hva', 'primary', 'mbg', 'brd', 'inp', 'bg1', 'bg2',
        'bg3', 'bg4', 'bg5', 'bg6', 'bg7', 'bg8'
      ];
      state.themeColorsData[activeTab] = THEME_KEYS.map(key => theme[key]);
      renderColorsGrid();
    }

    updateWorkbench();
    Notificacion(`Asignado a ${type.toUpperCase()}`, 'info');
  });

  // 13. Asignación rápida desde Armonías HSL (Botón de Hover)
  $(document).on('click.col', '.assign-wb-harmony', function(e) {
    e.preventDefault();
    e.stopPropagation();
    const type = $(this).data('type');
    const color = $(this).data('color');

    state.workbench[type] = color;
    
    // Sincronizar en wiiThemes si es un tema oficial el activo
    const activeTab = state.activeThemeTab;
    if (activeTab !== 'general' && activeTab !== 'detectados') {
      state.wiiThemes[activeTab][type] = color;
      const theme = state.wiiThemes[activeTab];
      const THEME_KEYS = [
        'bg', 'card', 'text', 'tx1', 'tx2', 'tx3', 'txa', 'txe',
        'accent', 'hva', 'primary', 'mbg', 'brd', 'inp', 'bg1', 'bg2',
        'bg3', 'bg4', 'bg5', 'bg6', 'bg7', 'bg8'
      ];
      state.themeColorsData[activeTab] = THEME_KEYS.map(key => theme[key]);
      renderColorsGrid();
    }

    updateWorkbench();
    Notificacion(`Asignado a ${type.toUpperCase()}`, 'info');
  });

  // 14. Clic General en Armonía para seleccionar como Base Color
  $(document).on('click.col', '.harmony_chip', function(e) {
    if ($(e.target).closest('.harmony_act_btn').length > 0) return;
    
    const color = $(this).data('color');
    state.baseColor = color;
    $('#color_picker_input').val(color);

    if (!state.themeColorsData.detectados.includes(color)) {
      state.themeColorsData.detectados.unshift(color);
      state.themeColorsData.detectados = state.themeColorsData.detectados.slice(0, 20);
    }

    renderExtractedColorsDock();
    generateHarmonies();
    updateWorkbench();
  });

  // 15. Pestañas de Formato en Exporter
  $(document).on('click.col', '.exporter_tab', function(e) {
    e.preventDefault();
    const format = $(this).data('format');
    
    $('.exporter_tab').removeClass('active');
    $(this).addClass('active');

    state.activeExporterFormat = format;
    updateExporter();
  });

  // 16. Copiar Código de Exporter
  $(document).on('click.col', '#btn_copy_code_exporter', function() {
    const code = $('#code_output_block').text();
    navigator.clipboard.writeText(code).then(() => {
      Notificacion('Código copiado al portapapeles', 'success');
      const btn = $(this);
      btn.html('<i class="fas fa-check"></i> ¡Copiado!');
      setTimeout(() => {
        btn.html('<i class="fas fa-copy"></i> Copiar');
      }, 1500);
    });
  });

  // ── NUEVOS EVENTOS DE FASE 1+ ──

  // 17. Filtro de búsqueda en la grilla
  $(document).on('input.col', '#palette_search_input', function() {
    const q = $(this).val();
    renderColorsGrid(q);
  });

  // 18. Botón "+ Variable" para insertar variables personalizadas
  $(document).on('click.col', '#btn_add_palette_color', function(e) {
    e.preventDefault();
    const activeTab = state.activeThemeTab;
    const color = state.baseColor; // Usar color base actual sugerido
    
    const count = state.themeColorsData[activeTab].length;
    state.themeColorsData[activeTab].push(color);
    
    // Si es tema estructurado, agregar al modelo wiiThemes
    if (activeTab !== 'general' && activeTab !== 'detectados') {
      const customKey = `custom_${count - 21}`;
      state.wiiThemes[activeTab][customKey] = color;
    }

    renderColorsGrid();
    Notificacion('Nueva variable agregada a la paleta', 'success');
  });

  // 19. Edición In-Line de color en la grilla (.edit-palette-color)
  $(document).on('input.col', '.edit-palette-color', function() {
    const index = $(this).data('index');
    const color = $(this).val();
    const activeTab = state.activeThemeTab;

    // Actualizar base de datos
    state.themeColorsData[activeTab][index] = color;
    
    // Asignar target al Afinador HSL unificado
    state.selectedTarget = { type: 'palette', index: index };
    state.baseColor = color;

    // Actualizar tema wiiThemes y Workbench en vivo si aplica
    if (activeTab !== 'general' && activeTab !== 'detectados') {
      const THEME_KEYS = [
        'bg', 'card', 'text', 'tx1', 'tx2', 'tx3', 'txa', 'txe',
        'accent', 'hva', 'primary', 'mbg', 'brd', 'inp', 'bg1', 'bg2',
        'bg3', 'bg4', 'bg5', 'bg6', 'bg7', 'bg8'
      ];
      const key = THEME_KEYS[index] || `custom_${index - 21}`;
      state.wiiThemes[activeTab][key] = color;
      
      // Si la variable editada corresponde a una de las del Workbench, actualizarla
      if (key === 'bg') state.workbench.bg = color;
      if (key === 'card') state.workbench.card = color;
      if (key === 'primary') state.workbench.primary = color;
      if (key === 'accent') state.workbench.accent = color;
      if (key === 'text') state.workbench.text = color;
    }

    renderColorsGrid($('#palette_search_input').val());
    updateWorkbench();
  });

  // 20. Copiar todo el código CSS desde la consola :root
  $(document).on('click.col', '#btn_copy_full_root', function(e) {
    e.preventDefault();
    const code = $('#full_root_css_textarea').val();
    navigator.clipboard.writeText(code).then(() => {
      Notificacion('Código :root copiado al portapapeles', 'success');
    });
  });

  // 21. Aplicar cambios editados directamente en la consola :root
  $(document).on('click.col', '#btn_apply_full_root', function(e) {
    e.preventDefault();
    const code = $('#full_root_css_textarea').val();
    const success = parseFullRootCSS(code);
    
    if (success) {
      // Sincronizar workbench si es un tema oficial activo
      const activeTab = state.activeThemeTab;
      if (activeTab !== 'general' && activeTab !== 'detectados') {
        const theme = state.wiiThemes[activeTab];
        state.workbench.bg = theme.bg;
        state.workbench.card = theme.card;
        state.workbench.primary = theme.primary;
        state.workbench.accent = theme.accent;
        state.workbench.text = theme.text;
      }
      
      updateWorkbench();
      renderColorsGrid($('#palette_search_input').val());
      Notificacion('Configuración :root importada con éxito', 'success');
    } else {
      Notificacion('Error al analizar el CSS. Revisa el formato de los temas.', 'error');
    }
  });

  // Función auxiliar para aplicar cambios del Afinador HSL unificado
  const applyColorChangeToTarget = (hex) => {
    if (state.selectedTarget.type === 'workbench') {
      const activeVar = state.selectedTarget.key;
      state.workbench[activeVar] = hex;
      
      // Sincronizar en wiiThemes si es un tema oficial activo
      const activeTab = state.activeThemeTab;
      if (activeTab !== 'general' && activeTab !== 'detectados') {
        let themeKey = activeVar;
        if (activeVar === 'primary') themeKey = 'primary';
        else if (activeVar === 'accent') themeKey = 'accent';
        else if (activeVar === 'card') themeKey = 'card';
        
        if (state.wiiThemes[activeTab][themeKey] !== undefined) {
          state.wiiThemes[activeTab][themeKey] = hex;
          
          const theme = state.wiiThemes[activeTab];
          const THEME_KEYS = [
            'bg', 'card', 'text', 'tx1', 'tx2', 'tx3', 'txa', 'txe',
            'accent', 'hva', 'primary', 'mbg', 'brd', 'inp', 'bg1', 'bg2',
            'bg3', 'bg4', 'bg5', 'bg6', 'bg7', 'bg8'
          ];
          state.themeColorsData[activeTab] = THEME_KEYS.map(k => theme[k]);
          renderColorsGrid();
        }
      }
    } else if (state.selectedTarget.type === 'palette') {
      const index = state.selectedTarget.index;
      const activeTab = state.activeThemeTab;
      
      // Actualizar en base de datos
      state.themeColorsData[activeTab][index] = hex;
      
      // Si es un tema oficial activo, sincronizar en wiiThemes
      if (activeTab !== 'general' && activeTab !== 'detectados') {
        const THEME_KEYS = [
          'bg', 'card', 'text', 'tx1', 'tx2', 'tx3', 'txa', 'txe',
          'accent', 'hva', 'primary', 'mbg', 'brd', 'inp', 'bg1', 'bg2',
          'bg3', 'bg4', 'bg5', 'bg6', 'bg7', 'bg8'
        ];
        const themeKey = THEME_KEYS[index] || `custom_${index - 21}`;
        state.wiiThemes[activeTab][themeKey] = hex;
        
        // Sincronizar con el workbench si corresponde a una de sus variables
        if (themeKey === 'bg') state.workbench.bg = hex;
        if (themeKey === 'card') state.workbench.card = hex;
        if (themeKey === 'primary') state.workbench.primary = hex;
        if (themeKey === 'accent') state.workbench.accent = hex;
        if (themeKey === 'text') state.workbench.text = hex;
      }
      
      renderColorsGrid($('#palette_search_input').val());
    }
  };

  // 22. Seleccionar una variable del Workbench al hacer clic sobre su bolita/píldora
  $(document).on('click.col', '.wb_color_pill', function(e) {
    if ($(e.target).closest('.btn_del_wb_var').length > 0) return;
    
    const key = $(this).data('key');
    state.selectedWbVar = key;
    state.selectedTarget = { type: 'workbench', key: key };
    
    // Quitar selección de color de la grilla de paleta
    $('.color_chip_card').removeClass('selected');
    
    // Sincronizar sliders HSL con el color de la variable recién seleccionada
    const color = state.workbench[key] || '#6a00f5';
    const rgb = hexToRgb(color);
    if (rgb) {
      const { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b);
      $('#range_hsl_hue').val(h);
      $('#range_hsl_lightness').val(l);
      $('#range_hsl_saturation').val(100 - s);
      updateHslSlidersUI(h, s, l);
    }

    updateWorkbench();
  });

  // 23. Cambiar color de la variable seleccionada usando los sliders HSL en vivo
  $(document).on('input.col', '.hsl_range_slider', function() {
    const h = parseInt($('#range_hsl_hue').val() || 0);
    const l = parseInt($('#range_hsl_lightness').val() || 50);
    const s = 100 - parseInt($('#range_hsl_saturation').val() || 0);
    
    const hex = hslToHex(h, s, l);
    applyColorChangeToTarget(hex);
    
    updateHslSlidersUI(h, s, l);
    updateWorkbench();
  });

  // 24. Agregar nueva variable personalizada al Workbench
  $(document).on('click.col', '#btn_add_wb_var', function(e) {
    e.preventDefault();
    let name = prompt("Ingresa el nombre de la variable para el Workbench (Ej: --w-btn-bg):");
    if (!name) return;
    name = name.trim().toLowerCase().replace(/^--w-/, '').replace(/^--/, '');
    if (!name) return;
    
    state.workbench[name] = '#ff3849'; // Color rojo por defecto
    state.selectedWbVar = name; // Seleccionar automáticamente la nueva variable
    state.selectedTarget = { type: 'workbench', key: name };
    
    updateWorkbench();
    wiTip(); // Re-inicializar tooltips
    Notificacion(`Variable --w-${name} agregada al Workbench`, 'success');
  });

  // 25. Eliminar variable personalizada del Workbench
  $(document).on('click.col', '.btn_del_wb_var', function(e) {
    e.preventDefault();
    const key = $(this).data('key');
    delete state.workbench[key];
    
    // Si la variable eliminada era la activa, seleccionar '--bg' por defecto
    if (state.selectedWbVar === key) {
      state.selectedWbVar = 'bg';
      state.selectedTarget = { type: 'workbench', key: 'bg' };
    }
    
    updateWorkbench();
    Notificacion(`Variable --w-${key} eliminada`, 'info');
  });

  // 26. Cambiar color ingresando o pegando texto directo en el textarea del Afinador
  $(document).on('input.col', '#hsl_color_text_area', function() {
    const text = $(this).val();
    const hex = resolveColorFromString(text);
    
    if (hex) {
      $(this).css({
        'border-color': 'var(--success)',
        'box-shadow': '0 0 8px rgba(37, 182, 42, 0.4)'
      });
      
      applyColorChangeToTarget(hex);
      
      // Sincronizar sliders HSL
      const rgb = hexToRgb(hex);
      if (rgb) {
        const { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b);
        $('#range_hsl_hue').val(h);
        $('#range_hsl_lightness').val(l);
        $('#range_hsl_saturation').val(100 - s);
        updateHslSlidersUI(h, s, l);
      }
      
      updateWorkbench();
    } else {
      // Visual warning indicator during typing
      $(this).css({
        'border-color': 'var(--warning)',
        'box-shadow': '0 0 8px rgba(255, 167, 38, 0.3)'
      });
    }
  });

  // Restaurar bordes del textarea al perder el foco
  $(document).on('blur.col', '#hsl_color_text_area', function() {
    $(this).css({
      'border-color': 'var(--brd)',
      'box-shadow': 'none'
    });
    
    let activeColor = '#6a00f5';
    if (state.selectedTarget.type === 'workbench') {
      activeColor = state.workbench[state.selectedTarget.key] || '#6a00f5';
    } else {
      activeColor = state.themeColorsData[state.activeThemeTab][state.selectedTarget.index] || '#6a00f5';
    }
    const rgb = hexToRgb(activeColor);
    if (rgb) {
      const { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b);
      updateHslSlidersUI(h, s, l);
    }
  });

  // Copiar color actual desde el Afinador
  $(document).on('click.col', '#btn_copy_hsl_color', function(e) {
    e.preventDefault();
    let activeColor = '#6a00f5';
    if (state.selectedTarget.type === 'workbench') {
      activeColor = state.workbench[state.selectedTarget.key] || '#6a00f5';
    } else {
      activeColor = state.themeColorsData[state.activeThemeTab][state.selectedTarget.index] || '#6a00f5';
    }
    navigator.clipboard.writeText(activeColor).then(() => {
      Notificacion(`Color ${activeColor.toUpperCase()} copiado al portapapeles`, 'success');
    });
  });

  // Fijar/Guardar color actual
  $(document).on('click.col', '#btn_save_hsl_color', function(e) {
    e.preventDefault();
    let activeColor = '#6a00f5';
    if (state.selectedTarget.type === 'workbench') {
      activeColor = state.workbench[state.selectedTarget.key] || '#6a00f5';
    } else {
      activeColor = state.themeColorsData[state.activeThemeTab][state.selectedTarget.index] || '#6a00f5';
    }
    Notificacion(`Color ${activeColor.toUpperCase()} fijado correctamente`, 'success');
  });
};

export const cleanup = () => {
  $(document).off('.col');
};
