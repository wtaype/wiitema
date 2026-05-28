import{n as e}from"./vendor-BuoCFfzO.js";import{t}from"./wii-B7KacVyR.js";import{C as n,i as r,r as i,u as a}from"./widev-4Rjv6ciq.js";import"./index-Dt5s5XVG.js";var o={curva:{name:`Curva Suave`,type:`divider`,desc:`Divisor curvo continuo para secciones premium.`},onda:{name:`Onda Sinuosa`,type:`divider`,desc:`Onda doble fluida ideal para transiciones de cabecera.`},picos:{name:`Picos Geométricos`,type:`divider`,desc:`Pendientes rectos con estilo facetado moderno.`},destello:{name:`Destello Premium`,type:`shape`,desc:`Brillo neón de 4 puntas decorativo.`},hexagono:{name:`Hexágono Tech`,type:`shape`,desc:`Contorno de tecnología e infraestructura.`},circulos:{name:`Anillos Concéntricos`,type:`shape`,desc:`Anillos punteados concéntricos de alta fidelidad.`},cristal:{name:`Vidrio Abstracto`,type:`shape`,desc:`Tarjeta geométrica con difuminado tipo vidrio.`},grid:{name:`Plano de Puntos`,type:`pattern`,desc:`Rejilla decorativa de puntos para fondos de sección.`}},s={selectedSvg:`curva`,fillColor:`#00f3ff`,strokeColor:`#00d4ff`,height:140,strokeWidth:2},c=(e,t,n,r,i)=>e===`curva`?`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 ${r}" preserveAspectRatio="none" style="width: 100%; height: ${r}px;">
  <path d="M0,0 C320,${Math.round(r*.6)} 420,${Math.round(r*.9)} 640,${Math.round(r*.6)} C860,${Math.round(r*.3)} 960,${Math.round(r*.6)} 1280,0 L1280,${r} L0,${r} Z" fill="${t}" />
</svg>`:e===`onda`?`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 ${r}" preserveAspectRatio="none" style="width: 100%; height: ${r}px;">
  <path d="M0,${Math.round(r*.4)} C240,${Math.round(r*.9)} 480,${Math.round(r*.1)} 720,${Math.round(r*.5)} C960,${Math.round(r*.9)} 1200,${Math.round(r*.2)} 1280,${Math.round(r*.3)} L1280,${r} L0,${r} Z" fill="${t}" />
</svg>`:e===`picos`?`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 ${r}" preserveAspectRatio="none" style="width: 100%; height: ${r}px;">
  <path d="M0,${Math.round(r*.6)} L480,${Math.round(r*.2)} L960,${Math.round(r*.8)} L1280,${Math.round(r*.4)} L1280,${r} L0,${r} Z" fill="${t}" />
</svg>`:e===`destello`?`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" style="width: 150px; height: 150px;">
  <path d="M50,0 C50,25 75,50 100,50 C75,50 50,75 50,100 C50,75 25,50 0,50 C25,50 50,25 50,0 Z" fill="${t}" />
</svg>`:e===`hexagono`?`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" style="width: 150px; height: 150px;">
  <path d="M50,5 L90,28 L90,72 L50,95 L10,72 L10,28 Z" fill="none" stroke="${n}" stroke-width="${i}" />
</svg>`:e===`circulos`?`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" style="width: 150px; height: 150px;">
  <circle cx="50" cy="50" r="40" fill="none" stroke="${n}" stroke-width="${i}" stroke-dasharray="6,4" />
  <circle cx="50" cy="50" r="28" fill="none" stroke="${n}" stroke-width="${i}" stroke-dasharray="4,2" />
  <circle cx="50" cy="50" r="16" fill="${t}" />
</svg>`:e===`cristal`?`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" style="width: 150px; height: 150px;">
  <defs>
    <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${t}" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="${n}" stop-opacity="0.2"/>
    </linearGradient>
  </defs>
  <rect x="15" y="15" width="70" height="70" rx="20" fill="url(#glassGrad)" stroke="${n}" stroke-width="${i}" />
  <circle cx="35" cy="35" r="8" fill="#fff" opacity="0.3" />
</svg>`:e===`grid`?`<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="200">
  <defs>
    <pattern id="dotPattern" width="20" height="20" patternUnits="userSpaceOnUse">
      <circle cx="3" cy="3" r="1.5" fill="${t}" />
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#dotPattern)" />
</svg>`:``,l=()=>{let t=e(`#svg_thumbs_grid`);if(!t.length)return;let n=Object.entries(o).map(([e,t])=>`
      <div class="svg_thumb_card ${e===s.selectedSvg?`selected`:``}" data-key="${e}">
        <div class="svg_thumb_preview">
          ${c(e,`#00f3ff`,`#00d4ff`,60,2)}
        </div>
        <span>${t.name}</span>
      </div>
    `).join(``);t.html(n)},u=()=>{let t=c(s.selectedSvg,s.fillColor,s.strokeColor,s.height,s.strokeWidth);e(`#svg_preview_canvas_area`).html(t),e(`#svg_code_exporter_block`).text(t);let n=`background-image: url('data:image/svg+xml;base64,${window.btoa(unescape(encodeURIComponent(t)))}');`;e(`#svg_base64_exporter_block`).text(n),e(`#val_svg_height`).text(`${s.height}px`),e(`#val_svg_stroke`).text(`${s.strokeWidth}px`);let r=o[s.selectedSvg].type;r===`divider`?(e(`#svg_height_control_group`).removeClass(`dpn`),e(`#svg_stroke_control_group`).addClass(`dpn`),e(`#svg_stroke_color_wrapper`).addClass(`dpn`),e(`#svg_fill_color_wrapper`).removeClass(`dpn`)):r===`shape`?(e(`#svg_height_control_group`).addClass(`dpn`),e(`#svg_stroke_control_group`).removeClass(`dpn`),e(`#svg_stroke_color_wrapper`).removeClass(`dpn`),s.selectedSvg===`hexagono`?e(`#svg_fill_color_wrapper`).addClass(`dpn`):e(`#svg_fill_color_wrapper`).removeClass(`dpn`)):r===`pattern`&&(e(`#svg_height_control_group`).addClass(`dpn`),e(`#svg_stroke_control_group`).addClass(`dpn`),e(`#svg_stroke_color_wrapper`).addClass(`dpn`),e(`#svg_fill_color_wrapper`).removeClass(`dpn`))},d=()=>{let e=a(`wiSmile`)||{},n=e.nombre||e.usuario||e.email||``;return`
  <div class="mwb" style="animation: wi_fadeUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;">
    <div style="margin-top: 4vh; text-align: center; margin-bottom: 2vh;">
      <h2 style="font-size: var(--fz_x1); font-weight: 900; color: var(--tx1);">
        Estudio Vectorial SVG 🎨
      </h2>
    </div>

    <!-- Header Block -->
    <div class="input_tabs" style="margin: 2vh auto 4vh; padding: 0.8vh; border-radius: 1.5vh; background: var(--bg5); border: 1px solid var(--brd); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 2vh;">
      <div style="display: flex; align-items: center; gap: 1.5vh; margin-left: 1vh;">
        <img src="/smile.avif" alt="${t}" style="width: 4vh; height: 4vh; border-radius: 50%; box-shadow: var(--bs_m);" />
        <div style="text-align: left;">
          <span style="font-size: 11px; font-weight: 700; color: var(--tx3); text-transform: uppercase;">Vector SVG customizer</span>
          <p style="margin: 0; font-size: var(--fz_s3); color: var(--tx1); font-weight: 800;">${r()} <strong>${n}</strong></p>
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
  </div>`},f=()=>{n(),a(`wii_emojis_recientes`),s.fillColor=`#00f3ff`,s.strokeColor=`#00d4ff`,e(`#svg_fill_picker`).val(s.fillColor),e(`#svg_stroke_picker`).val(s.strokeColor),l(),u(),e(document).on(`click.svg`,`.svg_thumb_card`,function(t){t.preventDefault();let n=e(this).data(`key`);s.selectedSvg=n,e(`.svg_thumb_card`).removeClass(`selected`),e(this).addClass(`selected`),u()}),e(document).on(`input.svg`,`#svg_fill_picker`,function(){s.fillColor=e(this).val(),u()}),e(document).on(`input.svg`,`#svg_stroke_picker`,function(){s.strokeColor=e(this).val(),u()}),e(document).on(`input.svg`,`#range_svg_height`,function(){let t=parseInt(e(this).val());s.height=t,e(`#val_svg_height`).text(`${t}px`),u()}),e(document).on(`input.svg`,`#range_svg_stroke`,function(){let t=parseInt(e(this).val());s.strokeWidth=t,e(`#val_svg_stroke`).text(`${t}px`),u()}),e(document).on(`click.svg`,`.svg_tab_btn`,function(t){t.preventDefault();let n=e(this).data(`svg-tab`);e(`.svg_tab_btn`).removeClass(`active`),e(this).addClass(`active`),e(`.svg_tab_content`).addClass(`dpn`),n===`raw`?e(`#svg_tab_raw_content`).removeClass(`dpn`):n===`css`&&e(`#svg_tab_css_content`).removeClass(`dpn`)}),e(document).on(`click.svg`,`#btn_reset_svg`,function(t){t.preventDefault(),s={selectedSvg:`curva`,fillColor:`#00f3ff`,strokeColor:`#00d4ff`,height:140,strokeWidth:2},e(`#svg_fill_picker`).val(`#00f3ff`),e(`#svg_stroke_picker`).val(`#00d4ff`),e(`#range_svg_height`).val(140),e(`#range_svg_stroke`).val(2),e(`#val_svg_height`).text(`140px`),e(`#val_svg_stroke`).text(`2px`),e(`.svg_thumb_card`).removeClass(`selected`),e(`.svg_thumb_card[data-key="curva"]`).addClass(`selected`),e(`.svg_tab_btn[data-svg-tab="raw"]`).trigger(`click`),u(),i(`Ajustes de vectores restablecidos`,`success`)}),e(document).on(`click.svg`,`#btn_download_svg`,function(e){e.preventDefault();let t=c(s.selectedSvg,s.fillColor,s.strokeColor,s.height,s.strokeWidth);try{let e=new Blob([t],{type:`image/svg+xml;charset=utf-8`}),n=URL.createObjectURL(e),r=document.createElement(`a`);r.href=n,r.download=`wi_${s.selectedSvg}_vector.svg`,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(n),i(`Archivo .svg descargado`,`success`)}catch{i(`Error al generar la descarga`,`error`)}});let t=(t,n)=>{let r=e(`#${t}`).text();navigator.clipboard.writeText(r).then(()=>{i(n,`success`)})};e(document).on(`click.svg`,`#btn_copy_svg_raw`,function(e){e.preventDefault(),t(`svg_code_exporter_block`,`SVG copiado al portapapeles!`)}),e(document).on(`click.svg`,`#btn_copy_svg_base64`,function(e){e.preventDefault(),t(`svg_base64_exporter_block`,`Background CSS copiado!`)})},p=()=>{e(document).off(`.svg`)};export{p as cleanup,f as init,d as render};