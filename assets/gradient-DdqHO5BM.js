import{n as e}from"./vendor-BuoCFfzO.js";import{t}from"./wii-B7KacVyR.js";import{i as n,r,u as i,w as a}from"./widev-o5MGI85p.js";/* empty css                */var o={aurora:{name:`Neon Aurora`,type:`linear`,angle:135,c1:`#00f3ff`,c2:`#7000ff`,c3:`#ff3849`,s1:0,s2:50,s3:100,use3:!0},sunset:{name:`Sunset Glow`,type:`linear`,angle:90,c1:`#ff3849`,c2:`#ffa726`,c3:`#ffda34`,s1:0,s2:50,s3:100,use3:!0},ocean:{name:`Ocean Breeze`,type:`linear`,angle:45,c1:`#0a58ca`,c2:`#00f3ff`,c3:`#ccffce`,s1:0,s2:50,s3:100,use3:!0},orchid:{name:`Electric Orchid`,type:`linear`,angle:180,c1:`#6a00f5`,c2:`#9442ff`,c3:`#ff7a85`,s1:0,s2:60,s3:100,use3:!0},luxury:{name:`Luxury Obsidian`,type:`linear`,angle:135,c1:`#21273b`,c2:`#0f1421`,c3:`#000000`,s1:0,s2:50,s3:100,use3:!1}},s={type:`linear`,angle:135,color1:`#00f3ff`,color2:`#7000ff`,color3:`#ff3849`,stop1:0,stop2:50,stop3:100,useThreeColors:!0,activePreset:`aurora`},c=()=>{let e=s.color1,t=s.color2,n=s.color3,r=s.stop1,i=s.stop2,a=s.stop3;return s.type===`linear`?s.useThreeColors?`linear-gradient(${s.angle}deg, ${e} ${r}%, ${t} ${i}%, ${n} ${a}%)`:`linear-gradient(${s.angle}deg, ${e} ${r}%, ${t} ${a}%)`:s.useThreeColors?`radial-gradient(circle, ${e} ${r}%, ${t} ${i}%, ${n} ${a}%)`:`radial-gradient(circle, ${e} ${r}%, ${t} ${a}%)`},l=()=>{let t=e(`#gr_presets_grid_container`);if(!t.length)return;let n=Object.entries(o).map(([e,t])=>{let n=e===s.activePreset?`selected`:``,r=``;return r=t.type===`linear`?t.use3?`linear-gradient(${t.angle}deg, ${t.c1} ${t.s1}%, ${t.c2} ${t.s2}%, ${t.c3} ${t.s3}%)`:`linear-gradient(${t.angle}deg, ${t.c1} ${t.s1}%, ${t.c2} ${t.s3}%)`:t.use3?`radial-gradient(circle, ${t.c1} ${t.s1}%, ${t.c2} ${t.s2}%, ${t.c3} ${t.s3}%)`:`radial-gradient(circle, ${t.c1} ${t.s1}%, ${t.c2} ${t.s3}%)`,`
      <div class="gr_preset_card ${n}" data-key="${e}">
        <div class="gr_preset_preview" style="background: ${r}"></div>
        <span>${t.name}</span>
      </div>
    `}).join(``);t.html(n)},u=()=>{let t=c();e(`#gr_preview_canvas_area`).css(`background`,t),e(`#gr_sandbox_title`).css({background:t,"background-clip":`text`,"-webkit-background-clip":`text`}),e(`#gr_sandbox_btn_action`).css({background:t,border:`none`,color:`#fff`}),e(`#gr_sandbox_icon`).css(`color`,s.color1),e(`#gr_dial_pointer`).css(`transform`,`translateX(-50%) rotate(${s.angle}deg)`),e(`#val_gr_angle`).text(`${s.angle}°`),e(`#val_gr_stop1`).text(`${s.stop1}%`),e(`#val_gr_stop2`).text(`${s.stop2}%`),e(`#val_gr_stop3`).text(`${s.stop3}%`),e(`#pill_gr_color1`).css(`background`,s.color1),e(`#pill_gr_color2`).css(`background`,s.color2),e(`#pill_gr_color3`).css(`background`,s.color3),e(`#gr_code_exporter_block`).text(`background: ${t};`);let n=`/* WiiTema Dynamic Gradient Variables */
:root {
  --gr-active: ${t};
  --gr-c1: ${s.color1};
  --gr-c2: ${s.color2};
  --gr-c3: ${s.useThreeColors?s.color3:`transparent`};
}`;e(`#gr_variables_exporter_block`).text(n),s.type===`radial`?e(`#gr_angle_slider_wrapper`).addClass(`dpn`):e(`#gr_angle_slider_wrapper`).removeClass(`dpn`),s.useThreeColors?(e(`#gr_stop2_wrapper`).removeClass(`dpn`),e(`#gr_color3_wrapper`).removeClass(`dpn`)):(e(`#gr_stop2_wrapper`).addClass(`dpn`),e(`#gr_color3_wrapper`).addClass(`dpn`))},d=(e,t,n)=>{e/=360,t/=100,n/=100;let r,i,a;if(t===0)r=i=a=n;else{let o=(e,t,n)=>(n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*(2/3-n)*6:e),s=n<.5?n*(1+t):n+t-n*t,c=2*n-s;r=o(c,s,e+1/3),i=o(c,s,e),a=o(c,s,e-1/3)}let o=e=>{let t=Math.round(e*255).toString(16);return t.length===1?`0`+t:t};return`#`+o(r)+o(i)+o(a)},f=()=>{let e=i(`wiSmile`)||{},r=e.nombre||e.usuario||e.email||``;return`
  <div class="mwb" style="animation: wi_fadeUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;">
    <div style="margin-top: 4vh; text-align: center; margin-bottom: 2vh;">
      <h2 style="font-size: var(--fz_x1); font-weight: 900; color: var(--tx1);">
        Generador de Gradientes Premium 🌈
      </h2>
    </div>

    <!-- Header Block -->
    <div class="input_tabs" style="margin: 2vh auto 4vh; padding: 0.8vh; border-radius: 1.5vh; background: var(--bg5); border: 1px solid var(--brd); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 2vh;">
      <div style="display: flex; align-items: center; gap: 1.5vh; margin-left: 1vh;">
        <img src="/smile.avif" alt="${t}" style="width: 4vh; height: 4vh; border-radius: 50%; box-shadow: var(--bs_m);" />
        <div style="text-align: left;">
          <span style="font-size: 11px; font-weight: 700; color: var(--tx3); text-transform: uppercase;">Premium Gradient Sandbox</span>
          <p style="margin: 0; font-size: var(--fz_s3); color: var(--tx1); font-weight: 800;">${n()} <strong>${r}</strong></p>
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
  </div>`},p=()=>{a(),l(),u(),e(document).on(`click.gr`,`.gr_preset_card`,function(t){t.preventDefault();let n=e(this).data(`key`);s.activePreset=n,e(`.gr_preset_card`).removeClass(`selected`),e(this).addClass(`selected`);let r=o[n];s.type=r.type,s.angle=r.angle,s.color1=r.c1,s.color2=r.c2,s.color3=r.c3,s.stop1=r.s1,s.stop2=r.s2,s.stop3=r.s3,s.useThreeColors=r.use3,e(`.gr_type_btn`).removeClass(`active`),e(`.gr_type_btn[data-type="${r.type}"]`).addClass(`active`),e(`.gr_stops_toggle`).removeClass(`active`),e(`.gr_stops_toggle[data-stops="${r.use3?`3`:`2`}"]`).addClass(`active`),e(`#gr_picker_color1`).val(r.c1),e(`#gr_picker_color2`).val(r.c2),e(`#gr_picker_color3`).val(r.c3),e(`#range_gr_stop1`).val(r.s1),e(`#range_gr_stop2`).val(r.s2),e(`#range_gr_stop3`).val(r.s3),e(`#range_gr_angle`).val(r.angle),u()}),e(document).on(`input.gr`,`#gr_picker_color1`,function(){s.color1=e(this).val(),s.activePreset=``,e(`.gr_preset_card`).removeClass(`selected`),u()}),e(document).on(`input.gr`,`#gr_picker_color2`,function(){s.color2=e(this).val(),s.activePreset=``,e(`.gr_preset_card`).removeClass(`selected`),u()}),e(document).on(`input.gr`,`#gr_picker_color3`,function(){s.color3=e(this).val(),s.activePreset=``,e(`.gr_preset_card`).removeClass(`selected`),u()}),e(document).on(`click.gr`,`.gr_type_btn`,function(t){t.preventDefault();let n=e(this).data(`type`);s.type=n,s.activePreset=``,e(`.gr_type_btn`).removeClass(`active`),e(this).addClass(`active`),e(`.gr_preset_card`).removeClass(`selected`),u()}),e(document).on(`click.gr`,`.gr_stops_toggle`,function(t){t.preventDefault();let n=parseInt(e(this).data(`stops`));s.useThreeColors=n===3,s.activePreset=``,e(`.gr_stops_toggle`).removeClass(`active`),e(this).addClass(`active`),e(`.gr_preset_card`).removeClass(`selected`),u()}),e(document).on(`input.gr`,`#range_gr_stop1`,function(){s.stop1=parseInt(e(this).val()),u()}),e(document).on(`input.gr`,`#range_gr_stop2`,function(){s.stop2=parseInt(e(this).val()),u()}),e(document).on(`input.gr`,`#range_gr_stop3`,function(){s.stop3=parseInt(e(this).val()),u()}),e(document).on(`input.gr`,`#range_gr_angle`,function(){s.angle=parseInt(e(this).val()),u()});let t=!1,n=t=>{let n=e(`#gr_dial_knob`);if(!n.length)return;let r=n.offset(),i={x:r.left+n.width()/2,y:r.top+n.height()/2},a=t.pageX||t.originalEvent.touches&&t.originalEvent.touches[0].pageX,o=t.pageY||t.originalEvent.touches&&t.originalEvent.touches[0].pageY;if(a===void 0||o===void 0)return;let c=a-i.x,l=o-i.y,d=Math.round(180/Math.PI*Math.atan2(l,c))+90;d<0&&(d+=360),d%=360,s.angle=d,e(`#range_gr_angle`).val(d),u()};e(document).on(`mousedown.gr touchstart.gr`,`#gr_dial_knob`,function(e){e.preventDefault(),t=!0,n(e)}),e(document).on(`mousemove.gr touchmove.gr`,function(e){t&&n(e)}),e(document).on(`mouseup.gr touchend.gr`,function(){t=!1}),e(document).on(`click.gr`,`.gr_tab_btn`,function(t){t.preventDefault();let n=e(this).data(`gr-tab`);e(`.gr_tab_btn`).removeClass(`active`),e(this).addClass(`active`),e(`.gr_tab_content`).addClass(`dpn`),n===`css`?e(`#gr_tab_css_content`).removeClass(`dpn`):n===`vars`&&e(`#gr_tab_vars_content`).removeClass(`dpn`)}),e(document).on(`click.gr`,`#btn_reset_gradient`,function(t){t.preventDefault(),s={type:`linear`,angle:135,color1:`#00f3ff`,color2:`#7000ff`,color3:`#ff3849`,stop1:0,stop2:50,stop3:100,useThreeColors:!0,activePreset:`aurora`},e(`#gr_picker_color1`).val(`#00f3ff`),e(`#gr_picker_color2`).val(`#7000ff`),e(`#gr_picker_color3`).val(`#ff3849`),e(`#range_gr_stop1`).val(0),e(`#range_gr_stop2`).val(50),e(`#range_gr_stop3`).val(100),e(`#range_gr_angle`).val(135),e(`.gr_type_btn`).removeClass(`active`),e(`.gr_type_btn[data-type="linear"]`).addClass(`active`),e(`.gr_stops_toggle`).removeClass(`active`),e(`.gr_stops_toggle[data-stops="3"]`).addClass(`active`),e(`.gr_tab_btn[data-gr-tab="css"]`).trigger(`click`),l(),u(),r(`Configuración de gradiente restaurada`,`success`)}),e(document).on(`click.gr`,`#btn_random_gradient`,function(t){t.preventDefault();let n=Math.floor(Math.random()*360),i=(n+120)%360,a=(n+240)%360;s.color1=d(n,95,50),s.color2=d(i,95,50),s.color3=d(a,95,50),s.angle=Math.floor(Math.random()*8)*45,s.activePreset=``,e(`#gr_picker_color1`).val(s.color1),e(`#gr_picker_color2`).val(s.color2),e(`#gr_picker_color3`).val(s.color3),e(`#range_gr_angle`).val(s.angle),e(`.gr_preset_card`).removeClass(`selected`),u(),r(`¡Nueva armonía de gradiente generada!`,`success`)});let i=(t,n)=>{let i=e(`#${t}`).text();navigator.clipboard.writeText(i).then(()=>{r(n,`success`)})};e(document).on(`click.gr`,`#btn_copy_gr_css`,function(e){e.preventDefault(),i(`gr_code_exporter_block`,`Estilo CSS copiado!`)}),e(document).on(`click.gr`,`#btn_copy_gr_vars`,function(e){e.preventDefault(),i(`gr_variables_exporter_block`,`Variables de gradiente copiadas!`)})},m=()=>{e(document).off(`.gr`)};export{m as cleanup,p as init,f as render};