import './colores.css';
import './smart.css';
import $ from 'jquery';
import { Notificacion, wiTip, Saludar, getls } from '../widev.js';
import { app } from '../wii.js';

/* ══════════════════════════════════════════════════════════════
   SMART COMBO CENTER v1.0 — Emparejamiento de Colores, Fuentes, Iconos y SVG
   ✨ Combo presets · Component Playground · Generar HTML + CSS completo
   ══════════════════════════════════════════════════════════════ */

const FONT_FAMILIES = {
  outfit: { name: 'Outfit', family: '"Outfit", sans-serif' },
  poppins: { name: 'Poppins', family: '"Poppins", sans-serif' },
  space: { name: 'Space Grotesk', family: '"Space Grotesk", sans-serif' },
  segoe: { name: 'Segoe UI', family: '"Segoe UI", system-ui, sans-serif' },
  roboto: { name: 'Roboto', family: '"Roboto", sans-serif' },
  inter: { name: 'Inter', family: '"Inter", sans-serif' },
  playfair: { name: 'Playfair Display', family: '"Playfair Display", serif' },
  fira: { name: 'Fira Code', family: '"Fira Code", monospace' },
  syne: { name: 'Syne', family: '"Syne", sans-serif' }
};

const THEME_COLORS = {
  cielo: { bg: '#ccefff', primary: '#1978d7', accent: '#00a8e6', text: '#000000', card: '#e5f7ff', border: '#b8d9eb' },
  dulce: { bg: '#ffccd1', primary: '#ff3849', accent: '#ff7a85', text: '#000000', card: '#ffebed', border: '#ffb3ba' },
  paz: { bg: '#ccffce', primary: '#25b62a', accent: '#3cd741', text: '#000000', card: '#ebffeb', border: '#a8e6ab' },
  oro: { bg: '#fff8d1', primary: '#FFDA34', accent: '#f0cc00', text: '#000000', card: '#fffde8', border: '#ffe066' },
  mora: { bg: '#e4ccff', primary: '#6a00f5', accent: '#9442ff', text: '#000000', card: '#f4ebff', border: '#c9a3ff' },
  futuro: { bg: '#0a0e1a', primary: '#00f3ff', accent: '#00d4ff', text: '#e0e7ff', card: '#151b2e', border: '#2d3a52' }
};

const PRESETS = {
  tech: {
    name: 'FUTURO (Sleek Tech) 🚀',
    headingFont: 'space',
    bodyFont: 'roboto',
    theme: 'futuro',
    icon: 'fa-laptop-code',
    wave: 'onda',
    title: 'Interfaces Inteligentes y Futuro Cloud',
    subtitle: 'WiiTema Futuro',
    desc: 'Implementa arquitecturas reactivas escalables y diseños de alta fidelidad optimizados para el mañana.'
  },
  pastel: {
    name: 'DULCE (Sweet Pastel) 🍬',
    headingFont: 'poppins',
    bodyFont: 'inter',
    theme: 'dulce',
    icon: 'fa-face-smile',
    wave: 'curva',
    title: 'El Lado Humano y Amigable del Código',
    subtitle: 'WiiTema Dulce',
    desc: 'Colores suaves y tipografías amigables que reducen el cansancio visual y conectan de forma natural.'
  },
  editorial: {
    name: 'ORO (Elegant Editorial) 👑',
    headingFont: 'playfair',
    bodyFont: 'inter',
    theme: 'oro',
    icon: 'fa-star',
    wave: 'curva',
    title: 'Estética de Lujo para Sitios Exclusivos',
    subtitle: 'WiiTema Oro',
    desc: 'Elegancia, simetría tipográfica Serif y contrastes dorados refinados diseñados para cautivar miradas.'
  },
  creative: {
    name: 'MORA (Creative Neon) 🔮',
    headingFont: 'syne',
    bodyFont: 'poppins',
    theme: 'mora',
    icon: 'fa-wand-magic-sparkles',
    wave: 'picos',
    title: 'Explosión de Ideas y Diseños Únicos',
    subtitle: 'WiiTema Mora',
    desc: 'Destaca de los moldes tradicionales con tipografías geométricas atrevidas y degradados vibrantes.'
  }
};

let state = {
  activePreset: 'tech',
  headingFont: 'space',
  bodyFont: 'roboto',
  theme: 'futuro',
  icon: 'fa-laptop-code',
  wave: 'onda',
  padding: 5,
  borderRadius: 20
};

const _generateWaveSvg = (key, fill) => {
  const height = 90;
  if (key === 'curva') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 ${height}" preserveAspectRatio="none">
  <path d="M0,0 C320,${Math.round(height * 0.6)} 420,${Math.round(height * 0.9)} 640,${Math.round(height * 0.6)} C860,${Math.round(height * 0.3)} 960,${Math.round(height * 0.6)} 1280,0 L1280,${height} L0,${height} Z" fill="${fill}" opacity="0.15" />
</svg>`;
  }
  if (key === 'onda') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 ${height}" preserveAspectRatio="none">
  <path d="M0,${Math.round(height * 0.4)} C240,${Math.round(height * 0.9)} 480,${Math.round(height * 0.1)} 720,${Math.round(height * 0.5)} C960,${Math.round(height * 0.9)} 1200,${Math.round(height * 0.2)} 1280,${Math.round(height * 0.3)} L1280,${height} L0,${height} Z" fill="${fill}" opacity="0.15" />
</svg>`;
  }
  if (key === 'picos') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 ${height}" preserveAspectRatio="none">
  <path d="M0,${Math.round(height * 0.6)} L480,${Math.round(height * 0.2)} L960,${Math.round(height * 0.8)} L1280,${Math.round(height * 0.4)} L1280,${height} L0,${height} Z" fill="${fill}" opacity="0.15" />
</svg>`;
  }
  return '';
};

const _updatePlayground = () => {
  const card = $('#sm_sandbox_card');
  if (!card.length) return;

  const colors = THEME_COLORS[state.theme];
  const hFamily = FONT_FAMILIES[state.headingFont].family;
  const bFamily = FONT_FAMILIES[state.bodyFont].family;

  // Apply visual styling dynamically using CSS variables
  card.css({
    'background': colors.card,
    'border-color': colors.border,
    'border-radius': `${state.borderRadius}px`,
    'padding': `${state.padding * 1.2}vh 4vh ${state.padding * 2}vh`
  });

  // Title, subtitles and text colors
  $('#sm_preview_subtitle').css({
    'font-family': hFamily,
    'color': colors.primary
  });

  $('#sm_preview_title').css({
    'font-family': hFamily,
    'color': colors.text
  });

  $('#sm_preview_paragraph').css({
    'font-family': bFamily,
    'color': colors.text
  });

  // Icon wrapper
  const iconWrapper = $('#sm_preview_icon_wrapper');
  iconWrapper.css({
    'background': `rgba(${_hexToRgb(colors.primary).join(',')}, 0.08)`,
    'border-color': colors.border
  });
  iconWrapper.html(`<i class="fas ${state.icon}" style="color: ${colors.primary};"></i>`);

  // Buttons styling
  $('#sm_preview_btn_primary').css({
    'background': colors.primary,
    'color': state.theme === 'oro' ? '#000000' : '#ffffff',
    'font-family': bFamily,
    'box-shadow': `0 4px 15px rgba(${_hexToRgb(colors.primary).join(',')}, 0.25)`
  });

  $('#sm_preview_btn_outline').css({
    'color': colors.text,
    'border-color': colors.text,
    'font-family': bFamily
  });

  // Wave rendering
  const waveSvg = _generateWaveSvg(state.wave, colors.primary);
  $('#sm_preview_wave_anchor').html(waveSvg);

  // Compile exportable HTML & CSS code
  const prefix = state.icon.startsWith('fa-') ? 'fas' : 'fab';
  
  const fullExportedCode = `<!-- WiiTema Smart Combination Component -->
<!-- Agrega esto en tu <head>:
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@600&family=Playfair+Display:wght@700&family=Poppins:wght@500;700&family=Roboto:wght@400;700&family=Space+Grotesk:wght@700&family=Syne:wght@800&display=swap">
-->

<div class="wi_premium_card">
  <div class="wi_icon_box">
    <i class="${prefix} ${state.icon}"></i>
  </div>
  <span class="wi_subtitle">${PRESETS[state.activePreset]?.subtitle || 'WiiTema'}</span>
  <h2 class="wi_title">${PRESETS[state.activePreset]?.title || 'Diseño Pro'}</h2>
  <p class="wi_desc">${PRESETS[state.activePreset]?.desc || ''}</p>
  
  <div class="wi_btn_group">
    <button class="wi_btn_main">Empezar</button>
    <button class="wi_btn_out">Saber Más</button>
  </div>
  
  <div class="wi_wave_footer">
    ${waveSvg}
  </div>
</div>

<style>
.wi_premium_card {
  position: relative;
  overflow: hidden;
  max-width: 580px;
  background: ${colors.card};
  border: 1px solid ${colors.border};
  border-radius: ${state.borderRadius}px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: ${state.padding * 1.2}vh 40px ${state.padding * 2}vh;
  box-sizing: border-box;
}

.wi_premium_card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 6px;
  background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%);
}

.wi_icon_box {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: rgba(${_hexToRgb(colors.primary).join(',')}, 0.08);
  border: 1px solid ${colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px;
}

.wi_icon_box i {
  font-size: 32px;
  color: ${colors.primary};
}

.wi_subtitle {
  font-family: ${hFamily};
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: ${colors.primary};
  margin-bottom: 12px;
}

.wi_title {
  font-family: ${hFamily};
  font-size: 36px;
  font-weight: 800;
  line-height: 1.25;
  color: ${colors.text};
  margin: 0 0 15px;
}

.wi_desc {
  font-family: ${bFamily};
  font-size: 14px;
  line-height: 1.6;
  color: ${colors.text};
  opacity: 0.8;
  margin: 0 0 35px;
}

.wi_btn_group {
  display: flex;
  gap: 15px;
  z-index: 5;
}

.wi_btn_main {
  padding: 12px 25px;
  font-family: ${bFamily};
  font-size: 14px;
  font-weight: 700;
  border-radius: 8px;
  border: none;
  background: ${colors.primary};
  color: ${state.theme === 'oro' ? '#000000' : '#ffffff'};
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(${_hexToRgb(colors.primary).join(',')}, 0.25);
  transition: all 0.2s ease;
}

.wi_btn_main:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(${_hexToRgb(colors.primary).join(',')}, 0.4);
}

.wi_btn_out {
  padding: 12px 25px;
  font-family: ${bFamily};
  font-size: 14px;
  font-weight: 700;
  border-radius: 8px;
  border: 1px solid ${colors.text};
  background: transparent;
  color: ${colors.text};
  cursor: pointer;
  transition: all 0.2s ease;
}

.wi_btn_out:hover {
  background: rgba(255, 255, 255, 0.08);
}

.wi_wave_footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  line-height: 0;
  pointer-events: none;
}

.wi_wave_footer svg {
  width: 100%;
  display: block;
}
</style>`;

  $('#sm_code_exporter_block').text(fullExportedCode);
};

const _hexToRgb = (hex) => {
  if (!hex || typeof hex !== 'string') return [0, 0, 0];
  hex = hex.replace(/^#/, '');
  if (hex.length === 3) {
    hex = hex.split('').map(x => x + x).join('');
  }
  const num = parseInt(hex, 16);
  if (isNaN(num)) return [0, 0, 0];
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
};

export const render = () => {
  const u = getls('wiSmile') || {};
  const display = u.nombre || u.usuario || u.email || '';

  return `
  <div class="mwb" style="animation: wi_fadeUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;">
    <div style="margin-top: 4vh; text-align: center; margin-bottom: 2vh;">
      <h2 style="font-size: var(--fz_x1); font-weight: 900; color: var(--tx1);">
        Smart Combos Inteligentes ✨
      </h2>
    </div>

    <!-- Header Block -->
    <div class="input_tabs" style="margin: 2vh auto 4vh; padding: 0.8vh; border-radius: 1.5vh; background: var(--bg5); border: 1px solid var(--brd); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 2vh;">
      <div style="display: flex; align-items: center; gap: 1.5vh; margin-left: 1vh;">
        <img src="/smile.avif" alt="${app}" style="width: 4vh; height: 4vh; border-radius: 50%; box-shadow: var(--bs_m);" />
        <div style="text-align: left;">
          <span style="font-size: 11px; font-weight: 700; color: var(--tx3); text-transform: uppercase;">Smart Design Combinator</span>
          <p style="margin: 0; font-size: var(--fz_s3); color: var(--tx1); font-weight: 800;">${Saludar()} <strong>${display}</strong></p>
        </div>
      </div>
      
      <div style="display: flex; gap: 1vh; margin-right: 1vh;">
        <button class="bt_auth" id="btn_copy_smart_combo" style="padding: 1vh 2vh; font-size: var(--fz_s3); font-weight: 800; background: var(--mco); color: #fff; border: none; display: flex; align-items: center; gap: 8px;" data-witip="Copiar todo el bloque de código HTML + CSS listo para producción"><i class="fas fa-copy"></i> Copiar Código</button>
        <button class="bt_auth" id="btn_reset_smart" style="padding: 1vh 2vh; font-size: var(--fz_s3); font-weight: 800; background: var(--bg5); border: 1px solid var(--brd); display: flex; align-items: center; gap: 8px;" data-witip="Restablecer emparejamiento inteligente"><i class="fas fa-rotate-left"></i> Restablecer</button>
      </div>
    </div>

    <!-- MAIN GRID CONTAINER -->
    <div class="sm_container">
      
      <!-- COLUMNA IZQUIERDA: CONTROLES DEL COMBINADOR -->
      <div class="input_section">
        
        <!-- Presets Creativos -->
        <div class="lab_card">
          <h3 class="lab_card_title"><i class="fas fa-wand-magic-sparkles"></i> Combinaciones Preset</h3>
          <p class="lab_desc">Selecciona una de nuestras combinaciones preestablecidas premium creadas para inspirarte a crear interfaces fantásticas.</p>
          
          <div style="display: flex; flex-direction: column; gap: 1.2vh;">
            ${Object.entries(PRESETS).map(([key, item]) => `
              <button class="bt_auth sm_preset_btn ${key === state.activePreset ? 'active' : ''}" data-key="${key}" style="width:100%; text-align:left; justify-content:flex-start; padding: 1.2vh 2vh; font-size: var(--fz_s3); display:flex; align-items:center; gap:10px; background: ${key === state.activePreset ? 'var(--bg3)' : 'var(--bg5)'}; border: 1px solid ${key === state.activePreset ? 'var(--mco)' : 'var(--brd)'}; border-radius:0.8vh; font-weight:700;">
                <i class="fas fa-swatchbook" style="color: var(--mco);"></i> ${item.name}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Customización de Elementos -->
        <div class="lab_card">
          <h3 class="lab_card_title"><i class="fas fa-sliders"></i> Ajuste de Parejas</h3>
          
          <div style="display: flex; flex-direction: column; gap: 2.2vh;">
            <!-- Heading Font -->
            <div style="display: flex; flex-direction: column; gap: 0.8vh;">
              <label style="font-size: var(--fz_s3); font-weight: 800; color: var(--tx2);">Fuente de Títulos:</label>
              <select id="sm_heading_font" style="padding: 1vh; font-size: var(--fz_s3); border-radius: 0.8vh; border:1px solid var(--brd); background:var(--inp); color:var(--tx1); font-weight:700; outline:none; cursor:pointer;">
                ${Object.entries(FONT_FAMILIES).map(([key, f]) => `
                  <option value="${key}" ${key === state.headingFont ? 'selected' : ''}>${f.name}</option>
                `).join('')}
              </select>
            </div>

            <!-- Body Font -->
            <div style="display: flex; flex-direction: column; gap: 0.8vh;">
              <label style="font-size: var(--fz_s3); font-weight: 800; color: var(--tx2);">Fuente de Párrafos:</label>
              <select id="sm_body_font" style="padding: 1vh; font-size: var(--fz_s3); border-radius: 0.8vh; border:1px solid var(--brd); background:var(--inp); color:var(--tx1); font-weight:700; outline:none; cursor:pointer;">
                ${Object.entries(FONT_FAMILIES).map(([key, f]) => `
                  <option value="${key}" ${key === state.bodyFont ? 'selected' : ''}>${f.name}</option>
                `).join('')}
              </select>
            </div>

            <!-- Tema WiiTema -->
            <div style="display: flex; flex-direction: column; gap: 0.8vh;">
              <label style="font-size: var(--fz_s3); font-weight: 800; color: var(--tx2);">Gradiente / Paleta:</label>
              <select id="sm_theme_select" style="padding: 1vh; font-size: var(--fz_s3); border-radius: 0.8vh; border:1px solid var(--brd); background:var(--inp); color:var(--tx1); font-weight:700; outline:none; cursor:pointer;">
                <option value="cielo" ${state.theme === 'cielo' ? 'selected' : ''}>☁️ Cielo (Theme)</option>
                <option value="dulce" ${state.theme === 'dulce' ? 'selected' : ''}>🍬 Dulce (Theme)</option>
                <option value="paz" ${state.theme === 'paz' ? 'selected' : ''}>🌿 Paz (Theme)</option>
                <option value="oro" ${state.theme === 'oro' ? 'selected' : ''}>👑 Oro (Theme)</option>
                <option value="mora" ${state.theme === 'mora' ? 'selected' : ''}>🍇 Mora (Theme)</option>
                <option value="futuro" ${state.theme === 'futuro' ? 'selected' : ''}>✨ Futuro (Theme)</option>
              </select>
            </div>

            <!-- Divisor Wave SVG -->
            <div style="display: flex; flex-direction: column; gap: 0.8vh;">
              <label style="font-size: var(--fz_s3); font-weight: 800; color: var(--tx2);">Fondo SVG wave:</label>
              <select id="sm_wave_select" style="padding: 1vh; font-size: var(--fz_s3); border-radius: 0.8vh; border:1px solid var(--brd); background:var(--inp); color:var(--tx1); font-weight:700; outline:none; cursor:pointer;">
                <option value="onda" ${state.wave === 'onda' ? 'selected' : ''}>Onda Sinuosa</option>
                <option value="curva" ${state.wave === 'curva' ? 'selected' : ''}>Curva Suave</option>
                <option value="picos" ${state.wave === 'picos' ? 'selected' : ''}>Picos Geométricos</option>
              </select>
            </div>

            <!-- Icono Central FA -->
            <div style="display: flex; flex-direction: column; gap: 0.8vh;">
              <label style="font-size: var(--fz_s3); font-weight: 800; color: var(--tx2);">Icono de Destacado:</label>
              <select id="sm_icon_select" style="padding: 1vh; font-size: var(--fz_s3); border-radius: 0.8vh; border:1px solid var(--brd); background:var(--inp); color:var(--tx1); font-weight:700; outline:none; cursor:pointer;">
                <option value="fa-laptop-code" ${state.icon === 'fa-laptop-code' ? 'selected' : ''}>💻 Desarrollador</option>
                <option value="fa-wand-magic-sparkles" ${state.icon === 'fa-wand-magic-sparkles' ? 'selected' : ''}>🪄 Varita Inteligente</option>
                <option value="fa-face-smile" ${state.icon === 'fa-face-smile' ? 'selected' : ''}>😊 Carita Feliz</option>
                <option value="fa-star" ${state.icon === 'fa-star' ? 'selected' : ''}>⭐ Estrella</option>
                <option value="fa-bolt" ${state.icon === 'fa-bolt' ? 'selected' : ''}>⚡ Rayo de Acento</option>
                <option value="fa-rocket" ${state.icon === 'fa-rocket' ? 'selected' : ''}>🚀 Cohete Veloz</option>
              </select>
            </div>

            <!-- Sliders dimensionales -->
            <div class="fn_slider_group" style="margin-top: 1vh;">
              <div class="fn_slider_header">
                <span>Relleno Vertical (Padding)</span>
              </div>
              <input type="range" min="3" max="8" value="5" class="fn_range_slider" id="range_sm_padding" />
            </div>

            <div class="fn_slider_group">
              <div class="fn_slider_header">
                <span>Esquinas Redondeadas</span>
              </div>
              <input type="range" min="0" max="40" value="20" class="fn_range_slider" id="range_sm_radius" />
            </div>

          </div>
        </div>

      </div>

      <!-- COLUMNA DERECHA: PLAYGROUND HERO & EXPORTADOR -->
      <div class="output_section">
        
        <!-- Vista Previa Sandbox Landing Page -->
        <div class="lab_card" style="margin-bottom: 3vh;">
          <h3 class="lab_card_title"><i class="fas fa-desktop"></i> Sandbox de Componente</h3>
          <p class="lab_desc">Esta sección simula el renderizado de tu landing page utilizando los emparejamientos dinámicos de colores, fuentes de Google, iconos de Font Awesome y divisores vectoriales inferiores.</p>
          
          <div class="sm_sandbox_canvas">
            
            <!-- Sandbox Hero Card Core -->
            <div class="sm_sandbox_card" id="sm_sandbox_card">
              <!-- Central Icon Box -->
              <div class="sm_sandbox_icon_wrapper" id="sm_preview_icon_wrapper">
                <!-- Icon -->
              </div>
              
              <!-- Subheading -->
              <span class="sm_sandbox_subtitle" id="sm_preview_subtitle">WiiTema Studio</span>
              
              <!-- Large Heading -->
              <h2 class="sm_sandbox_title" id="sm_preview_title" style="font-size: 28px;">Interfaces Inteligentes y Futuro Cloud</h2>
              
              <!-- Paragraph description -->
              <p class="sm_sandbox_paragraph" id="sm_preview_paragraph">
                Implementa arquitecturas reactivas escalables y diseños de alta fidelidad optimizados para el mañana con el poder inteligente de WiiTema.
              </p>
              
              <!-- Buttons group -->
              <div class="sm_sandbox_button_row">
                <button class="sm_sandbox_btn_primary" id="sm_preview_btn_primary">Empezar Ahora</button>
                <button class="sm_sandbox_btn_outline" id="sm_preview_btn_outline">Saber Más</button>
              </div>
              
              <!-- Anchor Wave SVG -->
              <div class="sm_wave_anchor" id="sm_preview_wave_anchor">
                <!-- SVG wave -->
              </div>
            </div>

          </div>
        </div>

        <!-- Exporter Code Block -->
        <div class="lab_card">
          <h3 class="lab_card_title"><i class="fas fa-file-code"></i> Código Combinado (Listo para Copiar)</h3>
          <p class="lab_desc">Copia el bloque de código combinado inferior. Contiene todas las fuentes importadas de Google Fonts, iconos Font Awesome, divisores vectoriales y reglas CSS estructuradas listas para usar.</p>
          
          <div class="exporter_card" style="margin-top: 2vh;">
            <div class="code_panel">
              <button class="btn_copy_code" id="btn_copy_smart_panel" data-witip="Copiar todo el código HTML + CSS"><i class="fas fa-copy"></i> Copiar</button>
              <pre class="code_pre" style="min-height: 35vh;"><code id="sm_code_exporter_block">/* Loading combined code block... */</code></pre>
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>`;
};

export const init = () => {
  wiTip(); // Inicializar tooltips interactivos

  // Inyectar enlace tipográfico si no existe
  const fontLink = 'https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;600;700&family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Poppins:wght@300;400;500;600;700;800&family=Roboto:wght@300;400;500;700&family=Space+Grotesk:wght@300;400;500;600;700&family=Syne:wght@400;700;800&display=swap';
  if (!$('#google-fonts-lab').length) {
    $('head').append(`<link id="google-fonts-lab" rel="stylesheet" href="${fontLink}">`);
  }

  _updatePlayground();

  // 1. Clic en preset
  $(document).on('click.sm', '.sm_preset_btn', function(e) {
    e.preventDefault();
    const key = $(this).data('key');
    state.activePreset = key;

    $('.sm_preset_btn').removeClass('active').css({
      'background': 'var(--bg5)',
      'border-color': 'var(--brd)'
    });
    $(this).addClass('active').css({
      'background': 'var(--bg3)',
      'border-color': 'var(--mco)'
    });

    // Cargar parámetros del preset
    const p = PRESETS[key];
    state.headingFont = p.headingFont;
    state.bodyFont = p.bodyFont;
    state.theme = p.theme;
    state.icon = p.icon;
    state.wave = p.wave;

    // Sincronizar selectores dropdown
    $('#sm_heading_font').val(p.headingFont);
    $('#sm_body_font').val(p.bodyFont);
    $('#sm_theme_select').val(p.theme);
    $('#sm_wave_select').val(p.wave);
    $('#sm_icon_select').val(p.icon);

    // Actualizar previsualización textos de prueba
    $('#sm_preview_title').text(p.title);
    $('#sm_preview_subtitle').text(p.subtitle);
    $('#sm_preview_paragraph').text(p.desc);

    _updatePlayground();
  });

  // 2. Selectores dropdown reactivos
  $(document).on('change.sm', '#sm_heading_font', function() {
    state.headingFont = $(this).val();
    state.activePreset = ''; // Romper preset
    $('.sm_preset_btn').removeClass('active').css({'background': 'var(--bg5)', 'border-color': 'var(--brd)'});
    _updatePlayground();
  });

  $(document).on('change.sm', '#sm_body_font', function() {
    state.bodyFont = $(this).val();
    state.activePreset = '';
    $('.sm_preset_btn').removeClass('active').css({'background': 'var(--bg5)', 'border-color': 'var(--brd)'});
    _updatePlayground();
  });

  $(document).on('change.sm', '#sm_theme_select', function() {
    state.theme = $(this).val();
    state.activePreset = '';
    $('.sm_preset_btn').removeClass('active').css({'background': 'var(--bg5)', 'border-color': 'var(--brd)'});
    _updatePlayground();
  });

  $(document).on('change.sm', '#sm_wave_select', function() {
    state.wave = $(this).val();
    state.activePreset = '';
    $('.sm_preset_btn').removeClass('active').css({'background': 'var(--bg5)', 'border-color': 'var(--brd)'});
    _updatePlayground();
  });

  $(document).on('change.sm', '#sm_icon_select', function() {
    state.icon = $(this).val();
    state.activePreset = '';
    $('.sm_preset_btn').removeClass('active').css({'background': 'var(--bg5)', 'border-color': 'var(--brd)'});
    _updatePlayground();
  });

  // 3. Sliders reactivos
  $(document).on('input.sm', '#range_sm_padding', function() {
    state.padding = parseInt($(this).val());
    _updatePlayground();
  });

  $(document).on('input.sm', '#range_sm_radius', function() {
    state.borderRadius = parseInt($(this).val());
    _updatePlayground();
  });

  // 4. Copiado rápido
  const copyCode = () => {
    const text = $('#sm_code_exporter_block').text();
    navigator.clipboard.writeText(text).then(() => {
      Notificacion('Código de Combo copiado!', 'success');
    });
  };

  $(document).on('click.sm', '#btn_copy_smart_combo, #btn_copy_smart_panel', function(e) {
    e.preventDefault();
    copyCode();
  });

  // 5. Restablecer valores
  $(document).on('click.sm', '#btn_reset_smart', function(e) {
    e.preventDefault();
    $(`.sm_preset_btn[data-key="tech"]`).trigger('click');
    $('#range_sm_padding').val(5);
    $('#range_sm_radius').val(20);
    state.padding = 5;
    state.borderRadius = 20;
    _updatePlayground();
    Notificacion('Alineación inteligente restablecida', 'success');
  });
};

export const cleanup = () => {
  $(document).off('.sm');
};
