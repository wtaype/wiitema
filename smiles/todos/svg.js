import './colores.css';
import './svg.css';
import $ from 'jquery';
import { Notificacion, wiTip, Saludar, getls } from '../widev.js';
import { app } from '../wii.js';

/* ══════════════════════════════════════════════════════════════
   SVG CENTER v1.0 — Biblioteca y Afinador de Vectores SVG
   ✨ Customizar colores y ondas · Exportar Base64 · Descargar SVG
   ══════════════════════════════════════════════════════════════ */

const SVG_TEMPLATES = {
  curva: { name: 'Curva Suave', type: 'divider', desc: 'Divisor curvo continuo para secciones premium.' },
  onda: { name: 'Onda Sinuosa', type: 'divider', desc: 'Onda doble fluida ideal para transiciones de cabecera.' },
  picos: { name: 'Picos Geométricos', type: 'divider', desc: 'Pendientes rectos con estilo facetado moderno.' },
  destello: { name: 'Destello Premium', type: 'shape', desc: 'Brillo neón de 4 puntas decorativo.' },
  hexagono: { name: 'Hexágono Tech', type: 'shape', desc: 'Contorno de tecnología e infraestructura.' },
  circulos: { name: 'Anillos Concéntricos', type: 'shape', desc: 'Anillos punteados concéntricos de alta fidelidad.' },
  cristal: { name: 'Vidrio Abstracto', type: 'shape', desc: 'Tarjeta geométrica con difuminado tipo vidrio.' },
  grid: { name: 'Plano de Puntos', type: 'pattern', desc: 'Rejilla decorativa de puntos para fondos de sección.' }
};

let state = {
  selectedSvg: 'curva',
  fillColor: '#00f3ff',
  strokeColor: '#00d4ff',
  height: 140,
  strokeWidth: 2
};

const _generateSvgString = (key, fill, stroke, height, strokeW) => {
  if (key === 'curva') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 ${height}" preserveAspectRatio="none" style="width: 100%; height: ${height}px;">
  <path d="M0,0 C320,${Math.round(height * 0.6)} 420,${Math.round(height * 0.9)} 640,${Math.round(height * 0.6)} C860,${Math.round(height * 0.3)} 960,${Math.round(height * 0.6)} 1280,0 L1280,${height} L0,${height} Z" fill="${fill}" />
</svg>`;
  }
  if (key === 'onda') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 ${height}" preserveAspectRatio="none" style="width: 100%; height: ${height}px;">
  <path d="M0,${Math.round(height * 0.4)} C240,${Math.round(height * 0.9)} 480,${Math.round(height * 0.1)} 720,${Math.round(height * 0.5)} C960,${Math.round(height * 0.9)} 1200,${Math.round(height * 0.2)} 1280,${Math.round(height * 0.3)} L1280,${height} L0,${height} Z" fill="${fill}" />
</svg>`;
  }
  if (key === 'picos') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 ${height}" preserveAspectRatio="none" style="width: 100%; height: ${height}px;">
  <path d="M0,${Math.round(height * 0.6)} L480,${Math.round(height * 0.2)} L960,${Math.round(height * 0.8)} L1280,${Math.round(height * 0.4)} L1280,${height} L0,${height} Z" fill="${fill}" />
</svg>`;
  }
  if (key === 'destello') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" style="width: 150px; height: 150px;">
  <path d="M50,0 C50,25 75,50 100,50 C75,50 50,75 50,100 C50,75 25,50 0,50 C25,50 50,25 50,0 Z" fill="${fill}" />
</svg>`;
  }
  if (key === 'hexagono') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" style="width: 150px; height: 150px;">
  <path d="M50,5 L90,28 L90,72 L50,95 L10,72 L10,28 Z" fill="none" stroke="${stroke}" stroke-width="${strokeW}" />
</svg>`;
  }
  if (key === 'circulos') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" style="width: 150px; height: 150px;">
  <circle cx="50" cy="50" r="40" fill="none" stroke="${stroke}" stroke-width="${strokeW}" stroke-dasharray="6,4" />
  <circle cx="50" cy="50" r="28" fill="none" stroke="${stroke}" stroke-width="${strokeW}" stroke-dasharray="4,2" />
  <circle cx="50" cy="50" r="16" fill="${fill}" />
</svg>`;
  }
  if (key === 'cristal') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" style="width: 150px; height: 150px;">
  <defs>
    <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${fill}" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="${stroke}" stop-opacity="0.2"/>
    </linearGradient>
  </defs>
  <rect x="15" y="15" width="70" height="70" rx="20" fill="url(#glassGrad)" stroke="${stroke}" stroke-width="${strokeW}" />
  <circle cx="35" cy="35" r="8" fill="#fff" opacity="0.3" />
</svg>`;
  }
  if (key === 'grid') {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="200">
  <defs>
    <pattern id="dotPattern" width="20" height="20" patternUnits="userSpaceOnUse">
      <circle cx="3" cy="3" r="1.5" fill="${fill}" />
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#dotPattern)" />
</svg>`;
  }
  return '';
};

const _renderThumbnails = () => {
  const container = $('#svg_thumbs_grid');
  if (!container.length) return;

  const html = Object.entries(SVG_TEMPLATES).map(([key, item]) => {
    const isSel = key === state.selectedSvg ? 'selected' : '';
    // Generate mini visual preview
    const miniSvg = _generateSvgString(key, '#00f3ff', '#00d4ff', 60, 2);
    
    return `
      <div class="svg_thumb_card ${isSel}" data-key="${key}">
        <div class="svg_thumb_preview">
          ${miniSvg}
        </div>
        <span>${item.name}</span>
      </div>
    `;
  }).join('');

  container.html(html);
};

const _updateSvgCanvas = () => {
  const svg = _generateSvgString(
    state.selectedSvg, 
    state.fillColor, 
    state.strokeColor, 
    state.height, 
    state.strokeWidth
  );
  
  // Render inside playground canvas
  $('#svg_preview_canvas_area').html(svg);
  $('#svg_code_exporter_block').text(svg);

  // Render Base64 CSS block
  // Use UTF-8 base64 encoding safely
  const b64 = window.btoa(unescape(encodeURIComponent(svg)));
  const cssBackground = `background-image: url('data:image/svg+xml;base64,${b64}');`;
  $('#svg_base64_exporter_block').text(cssBackground);
  
  // Set customizer values display
  $('#val_svg_height').text(`${state.height}px`);
  $('#val_svg_stroke').text(`${state.strokeWidth}px`);

  // Disable controls depending on template type
  const type = SVG_TEMPLATES[state.selectedSvg].type;
  if (type === 'divider') {
    $('#svg_height_control_group').removeClass('dpn');
    $('#svg_stroke_control_group').addClass('dpn');
    $('#svg_stroke_color_wrapper').addClass('dpn');
    $('#svg_fill_color_wrapper').removeClass('dpn');
  } else if (type === 'shape') {
    $('#svg_height_control_group').addClass('dpn');
    $('#svg_stroke_control_group').removeClass('dpn');
    $('#svg_stroke_color_wrapper').removeClass('dpn');
    if (state.selectedSvg === 'hexagono') {
      $('#svg_fill_color_wrapper').addClass('dpn');
    } else {
      $('#svg_fill_color_wrapper').removeClass('dpn');
    }
  } else if (type === 'pattern') {
    $('#svg_height_control_group').addClass('dpn');
    $('#svg_stroke_control_group').addClass('dpn');
    $('#svg_stroke_color_wrapper').addClass('dpn');
    $('#svg_fill_color_wrapper').removeClass('dpn');
  }
};

export const render = () => {
  const u = getls('wiSmile') || {};
  const display = u.nombre || u.usuario || u.email || '';

  return `
  <div class="mwb" style="animation: wi_fadeUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;">
    <div style="margin-top: 4vh; text-align: center; margin-bottom: 2vh;">
      <h2 style="font-size: var(--fz_x1); font-weight: 900; color: var(--tx1);">
        Estudio Vectorial SVG 🎨
      </h2>
    </div>

    <!-- Header Block -->
    <div class="input_tabs" style="margin: 2vh auto 4vh; padding: 0.8vh; border-radius: 1.5vh; background: var(--bg5); border: 1px solid var(--brd); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 2vh;">
      <div style="display: flex; align-items: center; gap: 1.5vh; margin-left: 1vh;">
        <img src="/smile.avif" alt="${app}" style="width: 4vh; height: 4vh; border-radius: 50%; box-shadow: var(--bs_m);" />
        <div style="text-align: left;">
          <span style="font-size: 11px; font-weight: 700; color: var(--tx3); text-transform: uppercase;">Vector SVG customizer</span>
          <p style="margin: 0; font-size: var(--fz_s3); color: var(--tx1); font-weight: 800;">${Saludar()} <strong>${display}</strong></p>
        </div>
      </div>
      
      <div style="display: flex; gap: 1vh; margin-right: 1vh;">
        <button class="bt_auth" id="btn_download_svg" style="padding: 1vh 2vh; font-size: var(--fz_s3); font-weight: 800; background: var(--mco); color: #fff; border: none; display: flex; align-items: center; gap: 8px;" data-witip="Descargar archivo vector .svg personalizado directamente"><i class="fas fa-download"></i> Descargar .svg</button>
        <button class="bt_auth" id="btn_reset_svg" style="padding: 1vh 2vh; font-size: var(--fz_s3); font-weight: 800; background: var(--bg5); border: 1px solid var(--brd); display: flex; align-items: center; gap: 8px;" data-witip="Restablecer vectores y parámetros"><i class="fas fa-rotate-left"></i> Restablecer</button>
      </div>
    </div>

    <!-- MAIN CONTAINER -->
    <div class="svg_container">
      
      <!-- COLUMNA IZQUIERDA: PARAMETROS & CATALOGO -->
      <div class="input_section">
        
        <!-- Catálogo de Vectores -->
        <div class="lab_card">
          <h3 class="lab_card_title"><i class="fas fa-images"></i> Catálogo de Vectores</h3>
          <p class="lab_desc">Selecciona un elemento de nuestra librería para comenzar a editarlo y previsualizarlo en el lienzo de precisión de la derecha.</p>
          
          <div class="svg_thumb_grid" id="svg_thumbs_grid">
            <!-- Dinámico -->
          </div>
        </div>

        <!-- Parámetros del Vector Activo -->
        <div class="lab_card">
          <h3 class="lab_card_title"><i class="fas fa-sliders"></i> Afinamiento de Vector</h3>
          
          <div style="display: flex; flex-direction: column; gap: 2.2vh;">
            
            <!-- Selectores de color -->
            <div style="display: flex; gap: 2vh; flex-wrap: wrap;">
              <!-- Color Relleno (Fill) -->
              <div class="picker_wrapper" id="svg_fill_color_wrapper" style="flex: 1; min-width: 120px;" data-witip="Color de relleno interno (fill) del SVG">
                <label>Color de Relleno:</label>
                <input type="color" id="svg_fill_picker" class="custom_color_input" value="#00f3ff" style="width: 100%;" />
              </div>

              <!-- Color Trazo (Stroke) -->
              <div class="picker_wrapper" id="svg_stroke_color_wrapper" style="flex: 1; min-width: 120px;" data-witip="Color de trazo/contorno (stroke) del SVG">
                <label>Color de Contorno:</label>
                <input type="color" id="svg_stroke_picker" class="custom_color_input" value="#00d4ff" style="width: 100%;" />
              </div>
            </div>

            <!-- Slider Altura (para wave dividers) -->
            <div class="fn_slider_group" id="svg_height_control_group">
              <div class="fn_slider_header">
                <span>Altura del Divisor</span>
                <span id="val_svg_height">140px</span>
              </div>
              <input type="range" min="50" max="300" value="140" class="fn_range_slider" id="range_svg_height" />
            </div>

            <!-- Slider Trazo (para figuras) -->
            <div class="fn_slider_group" id="svg_stroke_control_group">
              <div class="fn_slider_header">
                <span>Grosor del Contorno</span>
                <span id="val_svg_stroke">2px</span>
              </div>
              <input type="range" min="1" max="10" value="2" class="fn_range_slider" id="range_svg_stroke" />
            </div>

          </div>
        </div>

      </div>

      <!-- COLUMNA DERECHA: LIENZO PLAYGROUND & EXPORTADORES -->
      <div class="output_section">
        
        <!-- Lienzo Blueprint de Precisión -->
        <div class="lab_card" style="margin-bottom: 3vh;">
          <h3 class="lab_card_title"><i class="fas fa-compass-drafting"></i> Lienzo Vectorial</h3>
          
          <div class="svg_preview_canvas" id="svg_preview_canvas_area">
            <!-- Dinámico -->
          </div>
        </div>

        <!-- Exportadores de Código -->
        <div class="lab_card">
          <h3 class="lab_card_title"><i class="fas fa-code"></i> Código Vectorial</h3>
          
          <!-- Pestañas de exportación -->
          <div class="input_tabs" style="background: var(--bg5); border: 1px solid var(--brd); display: flex; gap: 0.5vh; padding: 4px; border-radius: 1vh;">
            <button class="tab_btn active svg_tab_btn" data-svg-tab="raw" style="font-size: var(--fz_s3); padding: 0.8vh 1.2vh;" data-witip="Código HTML SVG nativo"><i class="fas fa-file-code"></i> Código Inline SVG</button>
            <button class="tab_btn svg_tab_btn" data-svg-tab="css" style="font-size: var(--fz_s3); padding: 0.8vh 1.2vh;" data-witip="Base64 encoded para background-image CSS"><i class="fab fa-css3-alt"></i> Background CSS</button>
          </div>

          <!-- RAW CODE BLOCK -->
          <div class="svg_tab_content" id="svg_tab_raw_content" style="margin-top: 1.5vh;">
            <div class="code_panel">
              <button class="btn_copy_code" id="btn_copy_svg_raw" data-witip="Copiar código SVG inline al portapapeles"><i class="fas fa-copy"></i> Copiar</button>
              <pre class="code_pre" style="min-height: 20vh; max-height: 35vh;"><code id="svg_code_exporter_block">/* SVG inline loading */</code></pre>
            </div>
          </div>

          <!-- CSS BASE64 BLOCK -->
          <div class="svg_tab_content dpn" id="svg_tab_css_content" style="margin-top: 1.5vh;">
            <div class="code_panel">
              <button class="btn_copy_code" id="btn_copy_svg_base64" data-witip="Copiar URL Base64 para CSS background-image"><i class="fas fa-copy"></i> Copiar</button>
              <pre class="code_pre" style="min-height: 20vh; max-height: 35vh;"><code id="svg_base64_exporter_block">/* CSS Base64 loading */</code></pre>
            </div>
          </div>

        </div>

      </div>

    </div>
  </div>`;
};

export const init = () => {
  wiTip(); // Inicializar tooltips interactivos

  // Sincronizar colores por defecto con el Workbench si está disponible
  const activeWb = getls('wii_emojis_recientes'); // o usar fallback
  // Usar HSL principal del workbench o colores de WiiTema
  state.fillColor = '#00f3ff';
  state.strokeColor = '#00d4ff';
  $('#svg_fill_picker').val(state.fillColor);
  $('#svg_stroke_picker').val(state.strokeColor);

  _renderThumbnails();
  _updateSvgCanvas();

  // 1. Cambio de vector seleccionado en el catálogo
  $(document).on('click.svg', '.svg_thumb_card', function(e) {
    e.preventDefault();
    const key = $(this).data('key');
    state.selectedSvg = key;

    $('.svg_thumb_card').removeClass('selected');
    $(this).addClass('selected');

    _updateSvgCanvas();
  });

  // 2. Control de colores reactivos (Relleno y Contorno)
  $(document).on('input.svg', '#svg_fill_picker', function() {
    state.fillColor = $(this).val();
    _updateSvgCanvas();
  });

  $(document).on('input.svg', '#svg_stroke_picker', function() {
    state.strokeColor = $(this).val();
    _updateSvgCanvas();
  });

  // 3. Sliders de ajuste dimensional (Altura y Grosor Contorno)
  $(document).on('input.svg', '#range_svg_height', function() {
    const val = parseInt($(this).val());
    state.height = val;
    $('#val_svg_height').text(`${val}px`);
    _updateSvgCanvas();
  });

  $(document).on('input.svg', '#range_svg_stroke', function() {
    const val = parseInt($(this).val());
    state.strokeWidth = val;
    $('#val_svg_stroke').text(`${val}px`);
    _updateSvgCanvas();
  });

  // 4. Pestañas de exportador de código
  $(document).on('click.svg', '.svg_tab_btn', function(e) {
    e.preventDefault();
    const tabName = $(this).data('svg-tab');

    $('.svg_tab_btn').removeClass('active');
    $(this).addClass('active');

    $('.svg_tab_content').addClass('dpn');
    
    if (tabName === 'raw') {
      $('#svg_tab_raw_content').removeClass('dpn');
    } else if (tabName === 'css') {
      $('#svg_tab_css_content').removeClass('dpn');
    }
  });

  // 5. Botón restablecer valores
  $(document).on('click.svg', '#btn_reset_svg', function(e) {
    e.preventDefault();
    state = {
      selectedSvg: 'curva',
      fillColor: '#00f3ff',
      strokeColor: '#00d4ff',
      height: 140,
      strokeWidth: 2
    };

    $('#svg_fill_picker').val('#00f3ff');
    $('#svg_stroke_picker').val('#00d4ff');
    $('#range_svg_height').val(140);
    $('#range_svg_stroke').val(2);

    $('#val_svg_height').text('140px');
    $('#val_svg_stroke').text('2px');

    $('.svg_thumb_card').removeClass('selected');
    $(`.svg_thumb_card[data-key="curva"]`).addClass('selected');
    $('.svg_tab_btn[data-svg-tab="raw"]').trigger('click');

    _updateSvgCanvas();
    Notificacion('Ajustes de vectores restablecidos', 'success');
  });

  // 6. Descargar archivo vector .svg directo
  $(document).on('click.svg', '#btn_download_svg', function(e) {
    e.preventDefault();
    const svgCode = _generateSvgString(
      state.selectedSvg, 
      state.fillColor, 
      state.strokeColor, 
      state.height, 
      state.strokeWidth
    );
    
    try {
      const blob = new Blob([svgCode], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `wi_${state.selectedSvg}_vector.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      Notificacion('Archivo .svg descargado', 'success');
    } catch {
      Notificacion('Error al generar la descarga', 'error');
    }
  });

  // 7. Copiado rápido de portapapeles
  const handleCopy = (elementId, message) => {
    const text = $(`#${elementId}`).text();
    navigator.clipboard.writeText(text).then(() => {
      Notificacion(message, 'success');
    });
  };

  $(document).on('click.svg', '#btn_copy_svg_raw', function(e) {
    e.preventDefault();
    handleCopy('svg_code_exporter_block', 'SVG copiado al portapapeles!');
  });

  $(document).on('click.svg', '#btn_copy_svg_base64', function(e) {
    e.preventDefault();
    handleCopy('svg_base64_exporter_block', 'Background CSS copiado!');
  });
};

export const cleanup = () => {
  $(document).off('.svg');
};
