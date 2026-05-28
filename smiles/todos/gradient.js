import './colores.css';
import './gradient.css';
import $ from 'jquery';
import { Notificacion, wiTip, Saludar, getls } from '../widev.js';
import { app } from '../wii.js';

/* ══════════════════════════════════════════════════════════════
   GRADIENT CENTER v1.0 — Diseñador e Inyector de Gradientes
   ✨ Linear/Radial · Dial de Ángulo · 3-Stops · Smart Random
   ══════════════════════════════════════════════════════════════ */

const GRADIENT_PRESETS = {
  aurora: { name: 'Neon Aurora', type: 'linear', angle: 135, c1: '#00f3ff', c2: '#7000ff', c3: '#ff3849', s1: 0, s2: 50, s3: 100, use3: true },
  sunset: { name: 'Sunset Glow', type: 'linear', angle: 90, c1: '#ff3849', c2: '#ffa726', c3: '#ffda34', s1: 0, s2: 50, s3: 100, use3: true },
  ocean: { name: 'Ocean Breeze', type: 'linear', angle: 45, c1: '#0a58ca', c2: '#00f3ff', c3: '#ccffce', s1: 0, s2: 50, s3: 100, use3: true },
  orchid: { name: 'Electric Orchid', type: 'linear', angle: 180, c1: '#6a00f5', c2: '#9442ff', c3: '#ff7a85', s1: 0, s2: 60, s3: 100, use3: true },
  luxury: { name: 'Luxury Obsidian', type: 'linear', angle: 135, c1: '#21273b', c2: '#0f1421', c3: '#000000', s1: 0, s2: 50, s3: 100, use3: false }
};

let state = {
  type: 'linear',
  angle: 135,
  color1: '#00f3ff',
  color2: '#7000ff',
  color3: '#ff3849',
  stop1: 0,
  stop2: 50,
  stop3: 100,
  useThreeColors: true,
  activePreset: 'aurora'
};

const _compileGradientString = () => {
  const c1 = state.color1, c2 = state.color2, c3 = state.color3;
  const s1 = state.stop1, s2 = state.stop2, s3 = state.stop3;

  if (state.type === 'linear') {
    if (state.useThreeColors) {
      return `linear-gradient(${state.angle}deg, ${c1} ${s1}%, ${c2} ${s2}%, ${c3} ${s3}%)`;
    } else {
      return `linear-gradient(${state.angle}deg, ${c1} ${s1}%, ${c2} ${s3}%)`;
    }
  } else {
    if (state.useThreeColors) {
      return `radial-gradient(circle, ${c1} ${s1}%, ${c2} ${s2}%, ${c3} ${s3}%)`;
    } else {
      return `radial-gradient(circle, ${c1} ${s1}%, ${c2} ${s3}%)`;
    }
  }
};

const _renderPresetsGrid = () => {
  const container = $('#gr_presets_grid_container');
  if (!container.length) return;

  const html = Object.entries(GRADIENT_PRESETS).map(([key, p]) => {
    const isSel = key === state.activePreset ? 'selected' : '';
    // Generate raw preview style
    let previewStyle = '';
    if (p.type === 'linear') {
      previewStyle = p.use3 ? `linear-gradient(${p.angle}deg, ${p.c1} ${p.s1}%, ${p.c2} ${p.s2}%, ${p.c3} ${p.s3}%)` : `linear-gradient(${p.angle}deg, ${p.c1} ${p.s1}%, ${p.c2} ${p.s3}%)`;
    } else {
      previewStyle = p.use3 ? `radial-gradient(circle, ${p.c1} ${p.s1}%, ${p.c2} ${p.s2}%, ${p.c3} ${p.s3}%)` : `radial-gradient(circle, ${p.c1} ${p.s1}%, ${p.c2} ${p.s3}%)`;
    }

    return `
      <div class="gr_preset_card ${isSel}" data-key="${key}">
        <div class="gr_preset_preview" style="background: ${previewStyle}"></div>
        <span>${p.name}</span>
      </div>
    `;
  }).join('');

  container.html(html);
};

const _updateGradientCanvas = () => {
  const grad = _compileGradientString();

  // Apply to playground background
  $('#gr_preview_canvas_area').css('background', grad);

  // Apply text clipping preview in card
  $('#gr_sandbox_title').css({
    'background': grad,
    'background-clip': 'text',
    '-webkit-background-clip': 'text'
  });

  // Apply styled preview components inside the card
  $('#gr_sandbox_btn_action').css({
    'background': grad,
    'border': 'none',
    'color': '#fff'
  });

  $('#gr_sandbox_icon').css('color', state.color1);

  // Dial rotation
  $('#gr_dial_pointer').css('transform', `translateX(-50%) rotate(${state.angle}deg)`);
  $('#val_gr_angle').text(`${state.angle}°`);

  // Label values for stops
  $('#val_gr_stop1').text(`${state.stop1}%`);
  $('#val_gr_stop2').text(`${state.stop2}%`);
  $('#val_gr_stop3').text(`${state.stop3}%`);

  // Stop pills background
  $('#pill_gr_color1').css('background', state.color1);
  $('#pill_gr_color2').css('background', state.color2);
  $('#pill_gr_color3').css('background', state.color3);

  // Code visualizer
  $('#gr_code_exporter_block').text(`background: ${grad};`);

  const variablesCode = `/* WiiTema Dynamic Gradient Variables */
:root {
  --gr-active: ${grad};
  --gr-c1: ${state.color1};
  --gr-c2: ${state.color2};
  --gr-c3: ${state.useThreeColors ? state.color3 : 'transparent'};
}`;
  $('#gr_variables_exporter_block').text(variablesCode);

  // Hide/Show controls depending on state
  if (state.type === 'radial') {
    $('#gr_angle_slider_wrapper').addClass('dpn');
  } else {
    $('#gr_angle_slider_wrapper').removeClass('dpn');
  }

  if (state.useThreeColors) {
    $('#gr_stop2_wrapper').removeClass('dpn');
    $('#gr_color3_wrapper').removeClass('dpn');
  } else {
    $('#gr_stop2_wrapper').addClass('dpn');
    $('#gr_color3_wrapper').addClass('dpn');
  }
};

// Conversiones auxiliares HSL -> RGB -> HEX para el aleatorizador inteligente
const _hslToHex = (h, s, l) => {
  h /= 360; s /= 100; l /= 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l;
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
  const toHex = x => {
    const val = Math.round(x * 255).toString(16);
    return val.length === 1 ? '0' + val : val;
  };
  return '#' + toHex(r) + toHex(g) + toHex(b);
};

export const render = () => {
  const u = getls('wiSmile') || {};
  const display = u.nombre || u.usuario || u.email || '';

  return `
  <div class="mwb" style="animation: wi_fadeUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;">
    <div style="margin-top: 4vh; text-align: center; margin-bottom: 2vh;">
      <h2 style="font-size: var(--fz_x1); font-weight: 900; color: var(--tx1);">
        Generador de Gradientes Premium 🌈
      </h2>
    </div>

    <!-- Header Block -->
    <div class="input_tabs" style="margin: 2vh auto 4vh; padding: 0.8vh; border-radius: 1.5vh; background: var(--bg5); border: 1px solid var(--brd); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 2vh;">
      <div style="display: flex; align-items: center; gap: 1.5vh; margin-left: 1vh;">
        <img src="/smile.avif" alt="${app}" style="width: 4vh; height: 4vh; border-radius: 50%; box-shadow: var(--bs_m);" />
        <div style="text-align: left;">
          <span style="font-size: 11px; font-weight: 700; color: var(--tx3); text-transform: uppercase;">Premium Gradient Sandbox</span>
          <p style="margin: 0; font-size: var(--fz_s3); color: var(--tx1); font-weight: 800;">${Saludar()} <strong>${display}</strong></p>
        </div>
      </div>
      
      <div style="display: flex; gap: 1vh; margin-right: 1vh;">
        <button class="bt_auth" id="btn_random_gradient" style="padding: 1vh 2vh; font-size: var(--fz_s3); font-weight: 800; background: var(--mco); color: #fff; border: none; display: flex; align-items: center; gap: 8px;" data-witip="Generar combinación de colores armónica de forma inteligente"><i class="fas fa-wand-magic-sparkles"></i> Súper Azar</button>
        <button class="bt_auth" id="btn_reset_gradient" style="padding: 1vh 2vh; font-size: var(--fz_s3); font-weight: 800; background: var(--bg5); border: 1px solid var(--brd); display: flex; align-items: center; gap: 8px;" data-witip="Restablecer gradientes a valores por defecto"><i class="fas fa-rotate-left"></i> Restablecer</button>
      </div>
    </div>

    <!-- MAIN GRID CONTAINER -->
    <div class="gr_container">
      
      <!-- COLUMNA IZQUIERDA: CONTROLES DEL GENERADOR -->
      <div class="input_section">
        
        <!-- Catálogo de Gradientes Curados -->
        <div class="lab_card">
          <h3 class="lab_card_title"><i class="fas fa-swatchbook"></i> Paletas de Gradientes</h3>
          <p class="lab_desc">Preajustes listos diseñados con armonías HSL para una previsualización instantánea.</p>
          <div class="gr_presets_grid" id="gr_presets_grid_container">
            <!-- Dinámico -->
          </div>
        </div>

        <!-- Panel de Afinamiento Cromático -->
        <div class="lab_card">
          <h3 class="lab_card_title"><i class="fas fa-sliders"></i> Ajuste de Gradiente</h3>
          
          <!-- Tipo de Gradiente Toggle Pills -->
          <div style="display: flex; flex-direction: column; gap: 0.8vh;">
            <label style="font-size: var(--fz_s3); font-weight: 800; color: var(--tx2);">Tipo de Dirección:</label>
            <div class="input_tabs" style="background: var(--bg5); padding: 4px; border-radius: 1vh; display: flex; gap: 0.5vh;">
              <button class="tab_btn active gr_type_btn" data-type="linear" style="font-size: var(--fz_s3); padding: 0.8vh 1.2vh;">Lineal</button>
              <button class="tab_btn gr_type_btn" data-type="radial" style="font-size: var(--fz_s3); padding: 0.8vh 1.2vh;">Radial</button>
            </div>
          </div>

          <!-- Slider de Cantidad de colores (2 o 3 Stops) -->
          <div style="display: flex; flex-direction: column; gap: 0.8vh;">
            <label style="font-size: var(--fz_s3); font-weight: 800; color: var(--tx2);">Número de Colores:</label>
            <div class="input_tabs" style="background: var(--bg5); padding: 4px; border-radius: 1vh; display: flex; gap: 0.5vh;">
              <button class="tab_btn active gr_stops_toggle" data-stops="3" style="font-size: var(--fz_s3); padding: 0.8vh 1.2vh;">3 Colores</button>
              <button class="tab_btn gr_stops_toggle" data-stops="2" style="font-size: var(--fz_s3); padding: 0.8vh 1.2vh;">2 Colores</button>
            </div>
          </div>

          <!-- Color Pickers -->
          <div style="display: flex; gap: 1.5vh; flex-wrap: wrap; margin-top: 1vh;">
            <div class="picker_wrapper" style="flex: 1; min-width: 80px;" data-witip="Color de Parada Inicial">
              <label>Inicio:</label>
              <input type="color" id="gr_picker_color1" class="custom_color_input" value="#00f3ff" style="width: 100%;" />
            </div>
            
            <div class="picker_wrapper" id="gr_color3_wrapper" style="flex: 1; min-width: 80px;" data-witip="Color de Parada Intermedio">
              <label>Centro:</label>
              <input type="color" id="gr_picker_color2" class="custom_color_input" value="#7000ff" style="width: 100%;" />
            </div>

            <div class="picker_wrapper" style="flex: 1; min-width: 80px;" data-witip="Color de Parada Final">
              <label>Fin:</label>
              <input type="color" id="gr_picker_color3" class="custom_color_input" value="#ff3849" style="width: 100%;" />
            </div>
          </div>

          <!-- Sliders de Paradas de Porcentajes (Stops) -->
          <div style="display: flex; flex-direction: column; gap: 2vh; margin-top: 1vh;">
            <div class="gr_stop_slider_wrap">
              <div class="gr_color_preview_pill" id="pill_gr_color1"></div>
              <div class="fn_slider_group" style="flex: 1;">
                <div class="fn_slider_header"><span>Porcentaje Inicial</span><span id="val_gr_stop1">0%</span></div>
                <input type="range" min="0" max="100" value="0" class="fn_range_slider" id="range_gr_stop1" />
              </div>
            </div>

            <div class="gr_stop_slider_wrap" id="gr_stop2_wrapper">
              <div class="gr_color_preview_pill" id="pill_gr_color2"></div>
              <div class="fn_slider_group" style="flex: 1;">
                <div class="fn_slider_header"><span>Porcentaje Central</span><span id="val_gr_stop2">50%</span></div>
                <input type="range" min="0" max="100" value="50" class="fn_range_slider" id="range_gr_stop2" />
              </div>
            </div>

            <div class="gr_stop_slider_wrap">
              <div class="gr_color_preview_pill" id="pill_gr_color3"></div>
              <div class="fn_slider_group" style="flex: 1;">
                <div class="fn_slider_header"><span>Porcentaje Final</span><span id="val_gr_stop3">100%</span></div>
                <input type="range" min="0" max="100" value="100" class="fn_range_slider" id="range_gr_stop3" />
              </div>
            </div>
          </div>

          <!-- Slider de Angulo (Linear dial) -->
          <div class="fn_slider_group" id="gr_angle_slider_wrapper" style="margin-top: 1vh;">
            <div class="fn_slider_header">
              <span>Ángulo de Inclinación</span>
              <div class="gr_dial_knob_wrapper">
                <span id="val_gr_angle">135°</span>
                <div class="gr_dial_knob" id="gr_dial_knob" data-witip="Gira el dial o mueve el deslizador">
                  <div class="gr_dial_pointer" id="gr_dial_pointer"></div>
                </div>
              </div>
            </div>
            <input type="range" min="0" max="360" value="135" class="fn_range_slider" id="range_gr_angle" />
          </div>

        </div>
      </div>

      <!-- COLUMNA DERECHA: LIENZO PLAYGROUND & EXPORTADORES -->
      <div class="output_section">
        
        <!-- Lienzo de Gradiente en Vivo con Sandbox UI -->
        <div class="lab_card" style="margin-bottom: 3vh;">
          <h3 class="lab_card_title"><i class="fas fa-desktop"></i> Previsualizador</h3>
          
          <div class="gr_preview_canvas" id="gr_preview_canvas_area" style="min-height: 48vh;">
            
            <!-- Sandbox Card UI Overlay -->
            <div class="gr_sandbox_card">
              <i class="fas fa-wand-magic-sparkles" id="gr_sandbox_icon" style="font-size: 32px;"></i>
              <h2 class="gr_sandbox_title" id="gr_sandbox_title">Efecto Clipping</h2>
              <p class="gr_sandbox_desc">Este sandbox renderiza componentes con el gradiente activo en vivo. Observa cómo fluye en degradado de textos y rellenos de fondo.</p>
              
              <button class="bt_auth" id="gr_sandbox_btn_action" style="padding: 1.2vh 3vh; font-size: var(--fz_s3); font-weight: 800; border-radius: 0.8vh; cursor: pointer; transition: all 0.2s;">Botón Gradiente</button>
            </div>

          </div>
        </div>

        <!-- Exportadores de Código -->
        <div class="lab_card">
          <h3 class="lab_card_title"><i class="fas fa-code"></i> Código de Gradiente</h3>
          
          <!-- Pestañas de exportador -->
          <div class="input_tabs" style="background: var(--bg5); border: 1px solid var(--brd); display: flex; gap: 0.5vh; padding: 4px; border-radius: 1vh;">
            <button class="tab_btn active gr_tab_btn" data-gr-tab="css" style="font-size: var(--fz_s3); padding: 0.8vh 1.2vh;" data-witip="Propiedad de estilo CSS puro"><i class="fab fa-css3-alt"></i> Propiedad CSS</button>
            <button class="tab_btn gr_tab_btn" data-gr-tab="vars" style="font-size: var(--fz_s3); padding: 0.8vh 1.2vh;" data-witip="Declaración de variables raíz CSS"><i class="fas fa-cube"></i> Variables CSS</button>
          </div>

          <!-- CSS RAW -->
          <div class="gr_tab_content" id="gr_tab_css_content" style="margin-top: 1.5vh;">
            <div class="code_panel">
              <button class="btn_copy_code" id="btn_copy_gr_css" data-witip="Copiar estilo de fondo CSS al portapapeles"><i class="fas fa-copy"></i> Copiar</button>
              <pre class="code_pre" style="min-height: 15vh;"><code id="gr_code_exporter_block">/* Loading CSS... */</code></pre>
            </div>
          </div>

          <!-- VARIABLES CSS -->
          <div class="gr_tab_content dpn" id="gr_tab_vars_content" style="margin-top: 1.5vh;">
            <div class="code_panel">
              <button class="btn_copy_code" id="btn_copy_gr_vars" data-witip="Copiar bloque de variables tipográficas CSS"><i class="fas fa-copy"></i> Copiar</button>
              <pre class="code_pre" style="min-height: 15vh;"><code id="gr_variables_exporter_block">/* Loading Variables... */</code></pre>
            </div>
          </div>

        </div>

      </div>

    </div>
  </div>`;
};

export const init = () => {
  wiTip(); // Inicializar tooltips interactivos

  _renderPresetsGrid();
  _updateGradientCanvas();

  // 1. Cambio de preset en grid
  $(document).on('click.gr', '.gr_preset_card', function(e) {
    e.preventDefault();
    const key = $(this).data('key');
    state.activePreset = key;

    $('.gr_preset_card').removeClass('selected');
    $(this).addClass('selected');

    // Cargar datos de preset en el estado
    const p = GRADIENT_PRESETS[key];
    state.type = p.type;
    state.angle = p.angle;
    state.color1 = p.c1;
    state.color2 = p.c2;
    state.color3 = p.c3;
    state.stop1 = p.s1;
    state.stop2 = p.s2;
    state.stop3 = p.s3;
    state.useThreeColors = p.use3;

    // Sincronizar inputs visuales
    $(`.gr_type_btn`).removeClass('active');
    $(`.gr_type_btn[data-type="${p.type}"]`).addClass('active');

    $(`.gr_stops_toggle`).removeClass('active');
    $(`.gr_stops_toggle[data-stops="${p.use3 ? '3' : '2'}"]`).addClass('active');

    $('#gr_picker_color1').val(p.c1);
    $('#gr_picker_color2').val(p.c2);
    $('#gr_picker_color3').val(p.c3);

    $('#range_gr_stop1').val(p.s1);
    $('#range_gr_stop2').val(p.s2);
    $('#range_gr_stop3').val(p.s3);

    $('#range_gr_angle').val(p.angle);

    _updateGradientCanvas();
  });

  // 2. Selectores de Color Pickers
  $(document).on('input.gr', '#gr_picker_color1', function() {
    state.color1 = $(this).val();
    state.activePreset = '';
    $('.gr_preset_card').removeClass('selected');
    _updateGradientCanvas();
  });

  $(document).on('input.gr', '#gr_picker_color2', function() {
    state.color2 = $(this).val();
    state.activePreset = '';
    $('.gr_preset_card').removeClass('selected');
    _updateGradientCanvas();
  });

  $(document).on('input.gr', '#gr_picker_color3', function() {
    state.color3 = $(this).val();
    state.activePreset = '';
    $('.gr_preset_card').removeClass('selected');
    _updateGradientCanvas();
  });

  // 3. Toggles de Tipo (Linear vs Radial)
  $(document).on('click.gr', '.gr_type_btn', function(e) {
    e.preventDefault();
    const type = $(this).data('type');
    state.type = type;
    state.activePreset = '';

    $('.gr_type_btn').removeClass('active');
    $(this).addClass('active');
    $('.gr_preset_card').removeClass('selected');

    _updateGradientCanvas();
  });

  // 4. Toggles de Stops (2 Colores vs 3 Colores)
  $(document).on('click.gr', '.gr_stops_toggle', function(e) {
    e.preventDefault();
    const stops = parseInt($(this).data('stops'));
    state.useThreeColors = stops === 3;
    state.activePreset = '';

    $('.gr_stops_toggle').removeClass('active');
    $(this).addClass('active');
    $('.gr_preset_card').removeClass('selected');

    _updateGradientCanvas();
  });

  // 5. Sliders de Porcentajes de parada (Stops)
  $(document).on('input.gr', '#range_gr_stop1', function() {
    state.stop1 = parseInt($(this).val());
    _updateGradientCanvas();
  });

  $(document).on('input.gr', '#range_gr_stop2', function() {
    state.stop2 = parseInt($(this).val());
    _updateGradientCanvas();
  });

  $(document).on('input.gr', '#range_gr_stop3', function() {
    state.stop3 = parseInt($(this).val());
    _updateGradientCanvas();
  });

  // 6. Slider de Ángulo y Dial Interactivo
  $(document).on('input.gr', '#range_gr_angle', function() {
    state.angle = parseInt($(this).val());
    _updateGradientCanvas();
  });

  let isDraggingDial = false;

  const updateAngleFromEvent = (e) => {
    const knob = $('#gr_dial_knob');
    if (!knob.length) return;
    const offset = knob.offset();
    const center = {
      x: offset.left + knob.width() / 2,
      y: offset.top + knob.height() / 2
    };
    const pageX = e.pageX || (e.originalEvent.touches && e.originalEvent.touches[0].pageX);
    const pageY = e.pageY || (e.originalEvent.touches && e.originalEvent.touches[0].pageY);
    
    if (pageX === undefined || pageY === undefined) return;

    const dx = pageX - center.x;
    const dy = pageY - center.y;
    
    let angleRad = Math.atan2(dy, dx);
    let angleDeg = Math.round(angleRad * (180 / Math.PI)) + 90;
    if (angleDeg < 0) angleDeg += 360;
    angleDeg = angleDeg % 360;

    state.angle = angleDeg;
    $('#range_gr_angle').val(angleDeg);
    _updateGradientCanvas();
  };

  $(document).on('mousedown.gr touchstart.gr', '#gr_dial_knob', function(e) {
    e.preventDefault();
    isDraggingDial = true;
    updateAngleFromEvent(e);
  });

  $(document).on('mousemove.gr touchmove.gr', function(e) {
    if (isDraggingDial) {
      updateAngleFromEvent(e);
    }
  });

  $(document).on('mouseup.gr touchend.gr', function() {
    isDraggingDial = false;
  });

  // 7. Pestañas de Exportación de Código
  $(document).on('click.gr', '.gr_tab_btn', function(e) {
    e.preventDefault();
    const tab = $(this).data('gr-tab');

    $('.gr_tab_btn').removeClass('active');
    $(this).addClass('active');

    $('.gr_tab_content').addClass('dpn');
    
    if (tab === 'css') {
      $('#gr_tab_css_content').removeClass('dpn');
    } else if (tab === 'vars') {
      $('#gr_tab_vars_content').removeClass('dpn');
    }
  });

  // 8. Botón restablecer valores
  $(document).on('click.gr', '#btn_reset_gradient', function(e) {
    e.preventDefault();
    state = {
      type: 'linear',
      angle: 135,
      color1: '#00f3ff',
      color2: '#7000ff',
      color3: '#ff3849',
      stop1: 0,
      stop2: 50,
      stop3: 100,
      useThreeColors: true,
      activePreset: 'aurora'
    };

    $('#gr_picker_color1').val('#00f3ff');
    $('#gr_picker_color2').val('#7000ff');
    $('#gr_picker_color3').val('#ff3849');

    $('#range_gr_stop1').val(0);
    $('#range_gr_stop2').val(50);
    $('#range_gr_stop3').val(100);

    $('#range_gr_angle').val(135);

    $(`.gr_type_btn`).removeClass('active');
    $(`.gr_type_btn[data-type="linear"]`).addClass('active');

    $(`.gr_stops_toggle`).removeClass('active');
    $(`.gr_stops_toggle[data-stops="3"]`).addClass('active');

    $('.gr_tab_btn[data-gr-tab="css"]').trigger('click');

    _renderPresetsGrid();
    _updateGradientCanvas();
    Notificacion('Configuración de gradiente restaurada', 'success');
  });

  // 9. Botón Súper Azar (Smart Random Harmony Generator)
  $(document).on('click.gr', '#btn_random_gradient', function(e) {
    e.preventDefault();
    
    // 1. Generar Hue base en HSL
    const h1 = Math.floor(Math.random() * 360);
    // 2. Generar Hues armónicos (Complementarios divididos o tríadas)
    const h2 = (h1 + 120) % 360;
    const h3 = (h1 + 240) % 360;

    // Convertir a HEX (manteniendo alta saturación 90-100% y brillo equilibrado 45-55%)
    state.color1 = _hslToHex(h1, 95, 50);
    state.color2 = _hslToHex(h2, 95, 50);
    state.color3 = _hslToHex(h3, 95, 50);

    state.angle = Math.floor(Math.random() * 8) * 45; // Ángulo simétrico en múltiplos de 45°
    state.activePreset = '';

    // Sincronizar inputs
    $('#gr_picker_color1').val(state.color1);
    $('#gr_picker_color2').val(state.color2);
    $('#gr_picker_color3').val(state.color3);
    $('#range_gr_angle').val(state.angle);

    $('.gr_preset_card').removeClass('selected');
    
    _updateGradientCanvas();
    Notificacion('¡Nueva armonía de gradiente generada!', 'success');
  });

  // 10. Copiar al portapapeles
  const handleCopy = (elementId, message) => {
    const text = $(`#${elementId}`).text();
    navigator.clipboard.writeText(text).then(() => {
      Notificacion(message, 'success');
    });
  };

  $(document).on('click.gr', '#btn_copy_gr_css', function(e) {
    e.preventDefault();
    handleCopy('gr_code_exporter_block', 'Estilo CSS copiado!');
  });

  $(document).on('click.gr', '#btn_copy_gr_vars', function(e) {
    e.preventDefault();
    handleCopy('gr_variables_exporter_block', 'Variables de gradiente copiadas!');
  });
};

export const cleanup = () => {
  $(document).off('.gr');
};
