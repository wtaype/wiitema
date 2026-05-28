import{n as e}from"./vendor-BuoCFfzO.js";import{t}from"./wii-B7KacVyR.js";import{i as n,r,u as i,w as a}from"./widev-o5MGI85p.js";/* empty css                */var o={outfit:{name:`Outfit`,type:`Google`,weights:[300,400,500,600,700,800]},poppins:{name:`Poppins`,type:`Google`,weights:[300,400,500,600,700,800]},space:{name:`Space Grotesk`,type:`Google`,weights:[300,400,500,600,700]},segoe:{name:`Segoe UI`,type:`System`,weights:[300,400,600,700]},roboto:{name:`Roboto`,type:`Google`,weights:[300,400,500,700]},inter:{name:`Inter`,type:`Google`,weights:[300,400,500,600,700,800]},playfair:{name:`Playfair Display`,type:`Google`,weights:[400,700]},fira:{name:`Fira Code`,type:`Google`,weights:[400,500,600,700]},syne:{name:`Syne`,type:`Google`,weights:[400,700,800]}},s={fontFamily:`outfit`,fontWeight:600,fontSize:42,lineHeight:1.3,letterSpacing:0,previewText:`Diseño Inteligente y Estética Premium en WiiTema Lab`,activeTab:`preview`},c=e=>{let t=o[e];return t?t.type===`System`?`"${t.name}", system-ui, sans-serif`:`"${t.name}", sans-serif`:`sans-serif`},l=()=>{let t=o[s.fontFamily],n=e(`#fn_weight_pills_container`);if(!n.length)return;let r=t.weights.map(e=>`
      <button class="fn_weight_pill ${e===s.fontWeight?`active`:``}" data-weight="${e}">
        ${e}
      </button>
    `).join(``);n.html(r)},u=()=>{let t=c(s.fontFamily);e(`#fn_playground_title`).css({"font-family":t,"font-weight":s.fontWeight,"font-size":`${s.fontSize}px`,"line-height":s.lineHeight,"letter-spacing":`${s.letterSpacing}px`}).text(s.previewText),e(`#fn_playground_subtitle`).css({"font-family":t,"font-weight":Math.max(300,s.fontWeight-200),"font-size":`${Math.max(16,Math.round(s.fontSize*.45))}px`,"letter-spacing":`${s.letterSpacing*.5}px`}),e(`#fn_playground_paragraph`).css({"font-family":t,"font-weight":400});let n=`/* WiiTema Typography Rules - ${o[s.fontFamily].name} */
.wi_premium_title {
  font-family: ${t};
  font-size: ${s.fontSize}px;
  font-weight: ${s.fontWeight};
  line-height: ${s.lineHeight};
  letter-spacing: ${s.letterSpacing}px;
  color: var(--tx1);
  transition: all var(--tr_m);
}`;e(`#fn_code_exporter_block`).text(n),d()},d=()=>{let t=e(`#fn_specimen_container`);if(!t.length||s.activeTab!==`specimen`)return;let n=o[s.fontFamily],r=c(s.fontFamily),i=n.weights.map(e=>`
      <div class="fn_specimen_card">
        <div class="fn_specimen_header">Peso ${e}</div>
        <p style="font-family: ${r}; font-weight: ${e}; font-size: 24px; margin: 0; line-height: 1.3; color: var(--tx1); overflow-wrap: break-word;">
          ${s.previewText}
        </p>
        <span style="font-size: 10px; color: var(--tx3); font-weight: 500; font-family: 'Fira Code', monospace;">font-weight: ${e};</span>
      </div>
    `).join(``);t.html(i)},f=()=>{let e=i(`wiSmile`)||{},r=e.nombre||e.usuario||e.email||``;return`
  <div class="mwb" style="animation: wi_fadeUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;">
    <div style="margin-top: 4vh; text-align: center; margin-bottom: 2vh;">
      <h2 style="font-size: var(--fz_x1); font-weight: 900; color: var(--tx1);">
        Laboratorio de Tipografía ✍️
      </h2>
    </div>

    <!-- Header block -->
    <div class="input_tabs" style="margin: 2vh auto 4vh; padding: 0.8vh; border-radius: 1.5vh; background: var(--bg5); border: 1px solid var(--brd); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 2vh;">
      <div style="display: flex; align-items: center; gap: 1.5vh; margin-left: 1vh;">
        <img src="/smile.avif" alt="${t}" style="width: 4vh; height: 4vh; border-radius: 50%; box-shadow: var(--bs_m);" />
        <div style="text-align: left;">
          <span style="font-size: 11px; font-weight: 700; color: var(--tx3); text-transform: uppercase;">WiiTema Fonts Studio</span>
          <p style="margin: 0; font-size: var(--fz_s3); color: var(--tx1); font-weight: 800;">${n()} <strong>${r}</strong></p>
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
              ${Object.entries(o).map(([e,t])=>`
                <option value="${e}" ${e===s.fontFamily?`selected`:``}>
                  ${t.name} (${t.type})
                </option>
              `).join(``)}
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
            <textarea class="color_textarea" id="fn_preview_textarea" style="min-height: 12vh; font-size: var(--fz_s3);" placeholder="Escribe el texto de prueba aquí...">${s.previewText}</textarea>
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
  </div>`},p=()=>{a(),e(`#google-fonts-lab`).length||e(`head`).append(`<link id="google-fonts-lab" rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;600;700&family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Poppins:wght@300;400;500;600;700;800&family=Roboto:wght@300;400;500;700&family=Space+Grotesk:wght@300;400;500;600;700&family=Syne:wght@400;700;800&display=swap">`),l(),u(),e(document).on(`change.fn`,`#fn_font_family`,function(){let t=e(this).val();s.fontFamily=t;let n=o[t];if(!n.weights.includes(s.fontWeight)){let e=n.weights.reduce((e,t)=>Math.abs(t-s.fontWeight)<Math.abs(e-s.fontWeight)?t:e);s.fontWeight=e}l(),u()}),e(document).on(`click.fn`,`.fn_weight_pill`,function(t){t.preventDefault();let n=parseInt(e(this).data(`weight`));s.fontWeight=n,e(`.fn_weight_pill`).removeClass(`active`),e(this).addClass(`active`),u()}),e(document).on(`input.fn`,`#range_fn_size`,function(){let t=parseInt(e(this).val());s.fontSize=t,e(`#val_fn_size`).text(`${t}px`),u()}),e(document).on(`input.fn`,`#range_fn_height`,function(){let t=parseFloat(e(this).val()/10);s.lineHeight=t,e(`#val_fn_height`).text(t.toFixed(1)),u()}),e(document).on(`input.fn`,`#range_fn_spacing`,function(){let t=parseInt(e(this).val());s.letterSpacing=t,e(`#val_fn_spacing`).text(`${t}px`),u()}),e(document).on(`input.fn`,`#fn_preview_textarea`,function(){s.previewText=e(this).val()||`WiiTema`,u()}),e(document).on(`click.fn`,`.fn_tab_btn`,function(t){t.preventDefault();let n=e(this).data(`fn-tab`);if(s.activeTab=n,e(`.fn_tab_btn`).removeClass(`active`),e(this).addClass(`active`),e(`.fn_tab_content`).addClass(`dpn`),n===`preview`)e(`#fn_tab_preview_content`).removeClass(`dpn`);else if(n===`specimen`)e(`#fn_tab_specimen_content`).removeClass(`dpn`),d();else if(n===`code`){e(`#fn_tab_code_content`).removeClass(`dpn`);let t=c(s.fontFamily),n=`/* WIITEMA PREMIUM CONFIGURATION — ${o[s.fontFamily].name} */
:root {
  --ff-primary: ${t};
  --fw-primary-bold: ${s.fontWeight};
  --fz-premium-display: ${s.fontSize}px;
  --lh-premium-display: ${s.lineHeight};
  --ls-premium-display: ${s.letterSpacing}px;
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
}`;e(`#fn_full_css_exporter_output`).text(n)}}),e(document).on(`click.fn`,`#btn_reset_fonts`,function(t){t.preventDefault(),s={fontFamily:`outfit`,fontWeight:600,fontSize:42,lineHeight:1.3,letterSpacing:0,previewText:`Diseño Inteligente y Estética Premium en WiiTema Lab`,activeTab:`preview`},e(`#fn_font_family`).val(`outfit`),e(`#range_fn_size`).val(42),e(`#range_fn_height`).val(13),e(`#range_fn_spacing`).val(0),e(`#val_fn_size`).text(`42px`),e(`#val_fn_height`).text(`1.3`),e(`#val_fn_spacing`).text(`0px`),e(`#fn_preview_textarea`).val(s.previewText),e(`.fn_tab_btn[data-fn-tab="preview"]`).trigger(`click`),l(),u(),r(`Tipografía restaurada`,`success`)});let t=(e,t)=>{navigator.clipboard.writeText(e).then(()=>{r(t,`success`)})};e(document).on(`click.fn`,`#btn_copy_css_direct`,function(n){n.preventDefault(),t(e(`#fn_code_exporter_block`).text(),`CSS del título copiado!`)}),e(document).on(`click.fn`,`#btn_copy_panel_fonts`,function(n){n.preventDefault(),t(e(`#fn_full_css_exporter_output`).text(),`Configuración CSS copiada!`)})},m=()=>{e(document).off(`.fn`)};export{m as cleanup,p as init,f as render};