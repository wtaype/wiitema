import './colores.css';
import './fonts.css';
import $ from 'jquery';
import { Notificacion, wiTip, Saludar, getls } from '../widev.js';
import { app } from '../wii.js';

/* ══════════════════════════════════════════════════════════════
   TYPOGRAPHY LAB v1.0 — Estudio de Fuentes + Especímen
   ✨ Carga Google Fonts · Sandbox de texto · Copiar CSS
   ══════════════════════════════════════════════════════════════ */

const FONT_FAMILIES = {
  outfit: { name: 'Outfit', type: 'Google', weights: [300, 400, 500, 600, 700, 800] },
  poppins: { name: 'Poppins', type: 'Google', weights: [300, 400, 500, 600, 700, 800] },
  space: { name: 'Space Grotesk', type: 'Google', weights: [300, 400, 500, 600, 700] },
  segoe: { name: 'Segoe UI', type: 'System', weights: [300, 400, 600, 700] },
  roboto: { name: 'Roboto', type: 'Google', weights: [300, 400, 500, 700] },
  inter: { name: 'Inter', type: 'Google', weights: [300, 400, 500, 600, 700, 800] },
  playfair: { name: 'Playfair Display', type: 'Google', weights: [400, 700] },
  fira: { name: 'Fira Code', type: 'Google', weights: [400, 500, 600, 700] },
  syne: { name: 'Syne', type: 'Google', weights: [400, 700, 800] }
};

let state = {
  fontFamily: 'outfit',
  fontWeight: 600,
  fontSize: 42,
  lineHeight: 1.3,
  letterSpacing: 0,
  previewText: 'Diseño Inteligente y Estética Premium en WiiTema Lab',
  activeTab: 'preview' // 'preview', 'specimen', 'code'
};

const _getFontFamilyCss = (key) => {
  const f = FONT_FAMILIES[key];
  if (!f) return 'sans-serif';
  if (f.type === 'System') return `"${f.name}", system-ui, sans-serif`;
  return `"${f.name}", sans-serif`;
};

const _renderWeightPills = () => {
  const f = FONT_FAMILIES[state.fontFamily];
  const container = $('#fn_weight_pills_container');
  if (!container.length) return;

  const html = f.weights.map(w => {
    const activeClass = w === state.fontWeight ? 'active' : '';
    return `
      <button class="fn_weight_pill ${activeClass}" data-weight="${w}">
        ${w}
      </button>
    `;
  }).join('');
  container.html(html);
};

const _updatePlayground = () => {
  const fCss = _getFontFamilyCss(state.fontFamily);
  
  // Apply styles directly to playground elements
  $('#fn_playground_title').css({
    'font-family': fCss,
    'font-weight': state.fontWeight,
    'font-size': `${state.fontSize}px`,
    'line-height': state.lineHeight,
    'letter-spacing': `${state.letterSpacing}px`
  }).text(state.previewText);

  $('#fn_playground_subtitle').css({
    'font-family': fCss,
    'font-weight': Math.max(300, state.fontWeight - 200),
    'font-size': `${Math.max(16, Math.round(state.fontSize * 0.45))}px`,
    'letter-spacing': `${state.letterSpacing * 0.5}px`
  });

  $('#fn_playground_paragraph').css({
    'font-family': fCss,
    'font-weight': 400
  });

  // Compile CSS output
  const cssCode = `/* WiiTema Typography Rules - ${FONT_FAMILIES[state.fontFamily].name} */
.wi_premium_title {
  font-family: ${fCss};
  font-size: ${state.fontSize}px;
  font-weight: ${state.fontWeight};
  line-height: ${state.lineHeight};
  letter-spacing: ${state.letterSpacing}px;
  color: var(--tx1);
  transition: all var(--tr_m);
}`;
  
  $('#fn_code_exporter_block').text(cssCode);
  _renderSpecimens();
};

const _renderSpecimens = () => {
  const container = $('#fn_specimen_container');
  if (!container.length || state.activeTab !== 'specimen') return;

  const f = FONT_FAMILIES[state.fontFamily];
  const fCss = _getFontFamilyCss(state.fontFamily);

  const html = f.weights.map(w => {
    return `
      <div class="fn_specimen_card">
        <div class="fn_specimen_header">Peso ${w}</div>
        <p style="font-family: ${fCss}; font-weight: ${w}; font-size: 24px; margin: 0; line-height: 1.3; color: var(--tx1); overflow-wrap: break-word;">
          ${state.previewText}
        </p>
        <span style="font-size: 10px; color: var(--tx3); font-weight: 500; font-family: 'Fira Code', monospace;">font-weight: ${w};</span>
      </div>
    `;
  }).join('');

  container.html(html);
};

export const render = () => {
  const u = getls('wiSmile') || {};
  const display = u.nombre || u.usuario || u.email || '';

  return `
  <div class="mwb" style="animation: wi_fadeUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;">
    <div style="margin-top: 4vh; text-align: center; margin-bottom: 2vh;">
      <h2 style="font-size: var(--fz_x1); font-weight: 900; color: var(--tx1);">
        Laboratorio de Tipografía ✍️
      </h2>
    </div>

    <!-- Header block -->
    <div class="input_tabs" style="margin: 2vh auto 4vh; padding: 0.8vh; border-radius: 1.5vh; background: var(--bg5); border: 1px solid var(--brd); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 2vh;">
      <div style="display: flex; align-items: center; gap: 1.5vh; margin-left: 1vh;">
        <img src="/smile.avif" alt="${app}" style="width: 4vh; height: 4vh; border-radius: 50%; box-shadow: var(--bs_m);" />
        <div style="text-align: left;">
          <span style="font-size: 11px; font-weight: 700; color: var(--tx3); text-transform: uppercase;">WiiTema Fonts Studio</span>
          <p style="margin: 0; font-size: var(--fz_s3); color: var(--tx1); font-weight: 800;">${Saludar()} <strong>${display}</strong></p>
        </div>
      </div>
      
      <div style="display: flex; gap: 1vh; margin-right: 1vh;">
        <button class="bt_auth" id="btn_copy_css_direct" style="padding: 1vh 2vh; font-size: var(--fz_s3); font-weight: 800; background: var(--bg5); border: 1px solid var(--brd); display: flex; align-items: center; gap: 8px;" data-witip="Copiar configuración tipográfica actual al portapapeles"><i class="fas fa-copy"></i> Copiar CSS</button>
        <button class="bt_auth" id="btn_reset_fonts" style="padding: 1vh 2vh; font-size: var(--fz_s3); font-weight: 800; background: var(--bg5); border: 1px solid var(--brd); display: flex; align-items: center; gap: 8px;" data-witip="Restablecer fuentes a valores por defecto"><i class="fas fa-rotate-left"></i> Restablecer</button>
      </div>
    </div>

    <!-- MAIN GRID CONTAINER -->
    <div class="fn_container">
      
      <!-- COLUMNA IZQUIERDA: CONTROLES TIPOGRÁFICOS -->
      <div class="input_section">
        
        <!-- Selector de Fuente Principal -->
        <div class="lab_card">
          <h3 class="lab_card_title"><i class="fas fa-font"></i> Parámetros de Fuente</h3>
          
          <!-- Dropdown Familia de Fuente -->
          <div style="display: flex; flex-direction: column; gap: 0.8vh;">
            <label style="font-size: var(--fz_s3); font-weight: 800; color: var(--tx2);">Familia Tipográfica:</label>
            <select id="fn_font_family" style="padding: 1.2vh; font-size: var(--fz_s3); border-radius: 0.8vh; border: 1px solid var(--brd); background: var(--inp); color: var(--tx1); font-weight: 700; cursor: pointer; outline: none;">
              ${Object.entries(FONT_FAMILIES).map(([key, f]) => `
                <option value="${key}" ${key === state.fontFamily ? 'selected' : ''}>
                  ${f.name} (${f.type})
                </option>
              `).join('')}
            </select>
          </div>

          <!-- Selector de Pesos (Dynamic Pills) -->
          <div style="display: flex; flex-direction: column; gap: 1vh;">
            <label style="font-size: var(--fz_s3); font-weight: 800; color: var(--tx2);">Grosor (Font Weight):</label>
            <div id="fn_weight_pills_container" class="fn_weight_grid">
              <!-- Dinámico -->
            </div>
          </div>

          <!-- Sliders de Afinamiento -->
          <div style="display: flex; flex-direction: column; gap: 2.2vh; margin-top: 1vh;">
            <!-- Slider 1: Font Size -->
            <div class="fn_slider_group">
              <div class="fn_slider_header">
                <span>Tamaño de Letra</span>
                <span id="val_fn_size">48px</span>
              </div>
              <input type="range" min="12" max="100" value="42" class="fn_range_slider" id="range_fn_size" />
            </div>

            <!-- Slider 2: Line Height -->
            <div class="fn_slider_group">
              <div class="fn_slider_header">
                <span>Interlineado (Line Height)</span>
                <span id="val_fn_height">1.3</span>
              </div>
              <input type="range" min="9" max="25" value="13" class="fn_range_slider" id="range_fn_height" />
            </div>

            <!-- Slider 3: Letter Spacing -->
            <div class="fn_slider_group">
              <div class="fn_slider_header">
                <span>Espaciado entre Letras</span>
                <span id="val_fn_spacing">0px</span>
              </div>
              <input type="range" min="-3" max="15" value="0" class="fn_range_slider" id="range_fn_spacing" />
            </div>
          </div>
        </div>

        <!-- Editor de Texto de Vista Previa -->
        <div class="lab_card">
          <h3 class="lab_card_title"><i class="fas fa-edit"></i> Texto de Prueba</h3>
          <p class="lab_desc">Escribe tu propio eslogan, título o contenido aquí. Los cambios se reflejarán instantáneamente en todos los pesos y especímenes de la derecha.</p>
          <div class="textarea_wrapper">
            <textarea class="color_textarea" id="fn_preview_textarea" style="min-height: 12vh; font-size: var(--fz_s3);" placeholder="Escribe el texto de prueba aquí...">${state.previewText}</textarea>
          </div>
        </div>
      </div>

      <!-- COLUMNA DERECHA: PLAYGROUND & ESPECÍMENES -->
      <div class="output_section">
        <div class="lab_card" style="min-height: 60vh;">
          <!-- Tabs superiores internas -->
          <div class="input_tabs" style="margin-bottom: 2vh; background: var(--bg5); border: 1px solid var(--brd); display: flex; gap: 0.5vh; padding: 4px; border-radius: 1vh;">
            <button class="tab_btn active fn_tab_btn" data-fn-tab="preview" style="font-size: var(--fz_s3); padding: 0.8vh 1.2vh;" data-witip="Sandbox visual interactivo"><i class="fas fa-eye"></i> Vista Previa</button>
            <button class="tab_btn fn_tab_btn" data-fn-tab="specimen" style="font-size: var(--fz_s3); padding: 0.8vh 1.2vh;" data-witip="Comparar todos los pesos del tipo de letra"><i class="fas fa-layer-group"></i> Peso Especímen</button>
            <button class="tab_btn fn_tab_btn" data-fn-tab="code" style="font-size: var(--fz_s3); padding: 0.8vh 1.2vh;" data-witip="Ver y copiar reglas CSS"><i class="fas fa-code"></i> Reglas CSS</button>
          </div>

          <!-- TAB CONTENT 1: PREVIEW PLAYGROUND -->
          <div class="fn_tab_content" id="fn_tab_preview_content">
            <div class="fn_preview_area" style="box-shadow: var(--bs_l);">
              <!-- Heading Large -->
              <h1 class="fn_hero_title" id="fn_playground_title">Diseño Inteligente</h1>
              
              <!-- Subtitle -->
              <h3 class="fn_subheading" id="fn_playground_subtitle" style="font-family: inherit; color: var(--mco);">Diseñado por Google DeepMind team</h3>
              
              <!-- Body Paragraph -->
              <p class="fn_paragraph" id="fn_playground_paragraph" style="font-size: 13px; color: var(--tx2); line-height: 1.6;">
                La tipografía premium define el alma de la web. En WiiTema, las combinaciones de fuentes fluidas como Outfit o Space Grotesk junto con colores dinámicos HSL garantizan interfaces legibles, estéticas y verdaderamente profesionales para tus usuarios.
              </p>
            </div>
            
            <div style="margin-top: 3vh;">
              <span style="font-size: 10px; font-weight: 800; color: var(--tx3); text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 1vh;">CSS resultante del Título:</span>
              <pre class="fn_codeblock_pre"><code id="fn_code_exporter_block">/* Loading... */</code></pre>
            </div>
          </div>

          <!-- TAB CONTENT 2: WEIGHT SPECIMEN (HIDDEN BY DEFAULT) -->
          <div class="fn_tab_content dpn" id="fn_tab_specimen_content">
            <div id="fn_specimen_container" class="fn_specimen_grid">
              <!-- Dinámico -->
            </div>
          </div>

          <!-- TAB CONTENT 3: CSS EXPORTER (HIDDEN BY DEFAULT) -->
          <div class="fn_tab_content dpn" id="fn_tab_code_content">
            <p class="lab_desc">Copia este bloque de código e intégralo en tu archivo <b>index.css</b> o etiqueta &lt;style&gt; de tu proyecto. El enlace de Google Fonts ya ha sido inyectado dinámicamente en el head.</p>
            
            <div class="exporter_card" style="margin-top: 2vh;">
              <div class="code_panel">
                <button class="btn_copy_code" id="btn_copy_panel_fonts" data-witip="Copiar todo el código CSS"><i class="fas fa-copy"></i> Copiar</button>
                <pre class="code_pre" style="min-height: 25vh;"><code id="fn_full_css_exporter_output">/* CSS output */</code></pre>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>`;
};

export const init = () => {
  wiTip(); // Inicializar tooltips interactivos

  // 1. Inyectar link de Google Fonts si no existe
  const fontLink = 'https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;600;700&family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Poppins:wght@300;400;500;600;700;800&family=Roboto:wght@300;400;500;700&family=Space+Grotesk:wght@300;400;500;600;700&family=Syne:wght@400;700;800&display=swap';
  if (!$('#google-fonts-lab').length) {
    $('head').append(`<link id="google-fonts-lab" rel="stylesheet" href="${fontLink}">`);
  }

  _renderWeightPills();
  _updatePlayground();

  // 2. Eventos reactivos dropdown familia tipográfica
  $(document).on('change.fn', '#fn_font_family', function() {
    const val = $(this).val();
    state.fontFamily = val;
    
    // Validar si el peso actual está soportado por la nueva fuente
    const f = FONT_FAMILIES[val];
    if (!f.weights.includes(state.fontWeight)) {
      // Tomar el peso más cercano
      const closest = f.weights.reduce((prev, curr) => 
        Math.abs(curr - state.fontWeight) < Math.abs(prev - state.fontWeight) ? curr : prev
      );
      state.fontWeight = closest;
    }

    _renderWeightPills();
    _updatePlayground();
  });

  // 3. Evento click en píldoras de peso tipográfico
  $(document).on('click.fn', '.fn_weight_pill', function(e) {
    e.preventDefault();
    const w = parseInt($(this).data('weight'));
    state.fontWeight = w;
    
    $('.fn_weight_pill').removeClass('active');
    $(this).addClass('active');
    
    _updatePlayground();
  });

  // 4. Sliders de ajuste fino
  $(document).on('input.fn', '#range_fn_size', function() {
    const val = parseInt($(this).val());
    state.fontSize = val;
    $('#val_fn_size').text(`${val}px`);
    _updatePlayground();
  });

  $(document).on('input.fn', '#range_fn_height', function() {
    const val = parseFloat($(this).val() / 10);
    state.lineHeight = val;
    $('#val_fn_height').text(val.toFixed(1));
    _updatePlayground();
  });

  $(document).on('input.fn', '#range_fn_spacing', function() {
    const val = parseInt($(this).val());
    state.letterSpacing = val;
    $('#val_fn_spacing').text(`${val}px`);
    _updatePlayground();
  });

  // 5. Cambio en textarea texto personalizado
  $(document).on('input.fn', '#fn_preview_textarea', function() {
    state.previewText = $(this).val() || 'WiiTema';
    _updatePlayground();
  });

  // 6. Tabs de visualización de lienzo de la derecha
  $(document).on('click.fn', '.fn_tab_btn', function(e) {
    e.preventDefault();
    const tabName = $(this).data('fn-tab');
    state.activeTab = tabName;

    $('.fn_tab_btn').removeClass('active');
    $(this).addClass('active');

    $('.fn_tab_content').addClass('dpn');
    
    if (tabName === 'preview') {
      $('#fn_tab_preview_content').removeClass('dpn');
    } else if (tabName === 'specimen') {
      $('#fn_tab_specimen_content').removeClass('dpn');
      _renderSpecimens();
    } else if (tabName === 'code') {
      $('#fn_tab_code_content').removeClass('dpn');
      const fCss = _getFontFamilyCss(state.fontFamily);
      const f = FONT_FAMILIES[state.fontFamily];
      const fullCss = `/* WIITEMA PREMIUM CONFIGURATION — ${f.name} */
:root {
  --ff-primary: ${fCss};
  --fw-primary-bold: ${state.fontWeight};
  --fz-premium-display: ${state.fontSize}px;
  --lh-premium-display: ${state.lineHeight};
  --ls-premium-display: ${state.letterSpacing}px;
}

/* Aplicación en Componente */
.wi_premium_title {
  font-family: var(--ff-primary);
  font-size: var(--fz-premium-display);
  font-weight: var(--fw-primary-bold);
  line-height: var(--lh-premium-display);
  letter-spacing: var(--ls-premium-display);
  color: var(--tx1);
  transition: all var(--tr_m);
}`;
      $('#fn_full_css_exporter_output').text(fullCss);
    }
  });

  // 7. Botón resetear valores por defecto
  $(document).on('click.fn', '#btn_reset_fonts', function(e) {
    e.preventDefault();
    state = {
      fontFamily: 'outfit',
      fontWeight: 600,
      fontSize: 42,
      lineHeight: 1.3,
      letterSpacing: 0,
      previewText: 'Diseño Inteligente y Estética Premium en WiiTema Lab',
      activeTab: 'preview'
    };

    $('#fn_font_family').val('outfit');
    $('#range_fn_size').val(42);
    $('#range_fn_height').val(13);
    $('#range_fn_spacing').val(0);
    
    $('#val_fn_size').text('42px');
    $('#val_fn_height').text('1.3');
    $('#val_fn_spacing').text('0px');

    $('#fn_preview_textarea').val(state.previewText);

    $('.fn_tab_btn[data-fn-tab="preview"]').trigger('click');

    _renderWeightPills();
    _updatePlayground();
    Notificacion('Tipografía restaurada', 'success');
  });

  // 8. Botones rápidos de copiado
  const copyToClipboard = (text, successMsg) => {
    navigator.clipboard.writeText(text).then(() => {
      Notificacion(successMsg, 'success');
    });
  };

  $(document).on('click.fn', '#btn_copy_css_direct', function(e) {
    e.preventDefault();
    const text = $('#fn_code_exporter_block').text();
    copyToClipboard(text, 'CSS del título copiado!');
  });

  $(document).on('click.fn', '#btn_copy_panel_fonts', function(e) {
    e.preventDefault();
    const text = $('#fn_full_css_exporter_output').text();
    copyToClipboard(text, 'Configuración CSS copiada!');
  });
};

export const cleanup = () => {
  $(document).off('.fn');
};
