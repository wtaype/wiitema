import{n as e}from"./vendor-BuoCFfzO.js";import{t}from"./wii-B7KacVyR.js";import{C as n,i as r,r as i,u as a}from"./widev-BWCA_pqe.js";/* empty css                */var o={outfit:{name:`Outfit`,family:`"Outfit", sans-serif`},poppins:{name:`Poppins`,family:`"Poppins", sans-serif`},space:{name:`Space Grotesk`,family:`"Space Grotesk", sans-serif`},segoe:{name:`Segoe UI`,family:`"Segoe UI", system-ui, sans-serif`},roboto:{name:`Roboto`,family:`"Roboto", sans-serif`},inter:{name:`Inter`,family:`"Inter", sans-serif`},playfair:{name:`Playfair Display`,family:`"Playfair Display", serif`},fira:{name:`Fira Code`,family:`"Fira Code", monospace`},syne:{name:`Syne`,family:`"Syne", sans-serif`}},s={cielo:{bg:`#ccefff`,primary:`#1978d7`,accent:`#00a8e6`,text:`#000000`,card:`#e5f7ff`,border:`#b8d9eb`},dulce:{bg:`#ffccd1`,primary:`#ff3849`,accent:`#ff7a85`,text:`#000000`,card:`#ffebed`,border:`#ffb3ba`},paz:{bg:`#ccffce`,primary:`#25b62a`,accent:`#3cd741`,text:`#000000`,card:`#ebffeb`,border:`#a8e6ab`},oro:{bg:`#fff8d1`,primary:`#FFDA34`,accent:`#f0cc00`,text:`#000000`,card:`#fffde8`,border:`#ffe066`},mora:{bg:`#e4ccff`,primary:`#6a00f5`,accent:`#9442ff`,text:`#000000`,card:`#f4ebff`,border:`#c9a3ff`},futuro:{bg:`#0a0e1a`,primary:`#00f3ff`,accent:`#00d4ff`,text:`#e0e7ff`,card:`#151b2e`,border:`#2d3a52`}},c={tech:{name:`FUTURO (Sleek Tech) 🚀`,headingFont:`space`,bodyFont:`roboto`,theme:`futuro`,icon:`fa-laptop-code`,wave:`onda`,title:`Interfaces Inteligentes y Futuro Cloud`,subtitle:`WiiTema Futuro`,desc:`Implementa arquitecturas reactivas escalables y diseños de alta fidelidad optimizados para el mañana.`},pastel:{name:`DULCE (Sweet Pastel) 🍬`,headingFont:`poppins`,bodyFont:`inter`,theme:`dulce`,icon:`fa-face-smile`,wave:`curva`,title:`El Lado Humano y Amigable del Código`,subtitle:`WiiTema Dulce`,desc:`Colores suaves y tipografías amigables que reducen el cansancio visual y conectan de forma natural.`},editorial:{name:`ORO (Elegant Editorial) 👑`,headingFont:`playfair`,bodyFont:`inter`,theme:`oro`,icon:`fa-star`,wave:`curva`,title:`Estética de Lujo para Sitios Exclusivos`,subtitle:`WiiTema Oro`,desc:`Elegancia, simetría tipográfica Serif y contrastes dorados refinados diseñados para cautivar miradas.`},creative:{name:`MORA (Creative Neon) 🔮`,headingFont:`syne`,bodyFont:`poppins`,theme:`mora`,icon:`fa-wand-magic-sparkles`,wave:`picos`,title:`Explosión de Ideas y Diseños Únicos`,subtitle:`WiiTema Mora`,desc:`Destaca de los moldes tradicionales con tipografías geométricas atrevidas y degradados vibrantes.`}},l={activePreset:`tech`,headingFont:`space`,bodyFont:`roboto`,theme:`futuro`,icon:`fa-laptop-code`,wave:`onda`,padding:5,borderRadius:20},u=(e,t)=>e===`curva`?`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 90" preserveAspectRatio="none">
  <path d="M0,0 C320,54 420,81 640,54 C860,27 960,54 1280,0 L1280,90 L0,90 Z" fill="${t}" opacity="0.15" />
</svg>`:e===`onda`?`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 90" preserveAspectRatio="none">
  <path d="M0,36 C240,81 480,9 720,45 C960,81 1200,18 1280,27 L1280,90 L0,90 Z" fill="${t}" opacity="0.15" />
</svg>`:e===`picos`?`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 90" preserveAspectRatio="none">
  <path d="M0,54 L480,18 L960,72 L1280,36 L1280,90 L0,90 Z" fill="${t}" opacity="0.15" />
</svg>`:``,d=()=>{let t=e(`#sm_sandbox_card`);if(!t.length)return;let n=s[l.theme],r=o[l.headingFont].family,i=o[l.bodyFont].family;t.css({background:n.card,"border-color":n.border,"border-radius":`${l.borderRadius}px`,padding:`${l.padding*1.2}vh 4vh ${l.padding*2}vh`}),e(`#sm_preview_subtitle`).css({"font-family":r,color:n.primary}),e(`#sm_preview_title`).css({"font-family":r,color:n.text}),e(`#sm_preview_paragraph`).css({"font-family":i,color:n.text});let a=e(`#sm_preview_icon_wrapper`);a.css({background:`rgba(${f(n.primary).join(`,`)}, 0.08)`,"border-color":n.border}),a.html(`<i class="fas ${l.icon}" style="color: ${n.primary};"></i>`),e(`#sm_preview_btn_primary`).css({background:n.primary,color:l.theme===`oro`?`#000000`:`#ffffff`,"font-family":i,"box-shadow":`0 4px 15px rgba(${f(n.primary).join(`,`)}, 0.25)`}),e(`#sm_preview_btn_outline`).css({color:n.text,"border-color":n.text,"font-family":i});let d=u(l.wave,n.primary);e(`#sm_preview_wave_anchor`).html(d);let p=`<!-- WiiTema Smart Combination Component -->
<!-- Agrega esto en tu <head>:
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@600&family=Playfair+Display:wght@700&family=Poppins:wght@500;700&family=Roboto:wght@400;700&family=Space+Grotesk:wght@700&family=Syne:wght@800&display=swap">
-->

<div class="wi_premium_card">
  <div class="wi_icon_box">
    <i class="${l.icon.startsWith(`fa-`)?`fas`:`fab`} ${l.icon}"></i>
  </div>
  <span class="wi_subtitle">${c[l.activePreset]?.subtitle||`WiiTema`}</span>
  <h2 class="wi_title">${c[l.activePreset]?.title||`Diseño Pro`}</h2>
  <p class="wi_desc">${c[l.activePreset]?.desc||``}</p>
  
  <div class="wi_btn_group">
    <button class="wi_btn_main">Empezar</button>
    <button class="wi_btn_out">Saber Más</button>
  </div>
  
  <div class="wi_wave_footer">
    ${d}
  </div>
</div>

<style>
.wi_premium_card {
  position: relative;
  overflow: hidden;
  max-width: 580px;
  background: ${n.card};
  border: 1px solid ${n.border};
  border-radius: ${l.borderRadius}px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: ${l.padding*1.2}vh 40px ${l.padding*2}vh;
  box-sizing: border-box;
}

.wi_premium_card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 6px;
  background: linear-gradient(135deg, ${n.primary} 0%, ${n.accent} 100%);
}

.wi_icon_box {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: rgba(${f(n.primary).join(`,`)}, 0.08);
  border: 1px solid ${n.border};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px;
}

.wi_icon_box i {
  font-size: 32px;
  color: ${n.primary};
}

.wi_subtitle {
  font-family: ${r};
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: ${n.primary};
  margin-bottom: 12px;
}

.wi_title {
  font-family: ${r};
  font-size: 36px;
  font-weight: 800;
  line-height: 1.25;
  color: ${n.text};
  margin: 0 0 15px;
}

.wi_desc {
  font-family: ${i};
  font-size: 14px;
  line-height: 1.6;
  color: ${n.text};
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
  font-family: ${i};
  font-size: 14px;
  font-weight: 700;
  border-radius: 8px;
  border: none;
  background: ${n.primary};
  color: ${l.theme===`oro`?`#000000`:`#ffffff`};
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(${f(n.primary).join(`,`)}, 0.25);
  transition: all 0.2s ease;
}

.wi_btn_main:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(${f(n.primary).join(`,`)}, 0.4);
}

.wi_btn_out {
  padding: 12px 25px;
  font-family: ${i};
  font-size: 14px;
  font-weight: 700;
  border-radius: 8px;
  border: 1px solid ${n.text};
  background: transparent;
  color: ${n.text};
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
</style>`;e(`#sm_code_exporter_block`).text(p)},f=e=>{if(!e||typeof e!=`string`)return[0,0,0];e=e.replace(/^#/,``),e.length===3&&(e=e.split(``).map(e=>e+e).join(``));let t=parseInt(e,16);return isNaN(t)?[0,0,0]:[t>>16&255,t>>8&255,t&255]},p=()=>{let e=a(`wiSmile`)||{},n=e.nombre||e.usuario||e.email||``;return`
  <div class="mwb" style="animation: wi_fadeUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;">
    <div style="margin-top: 4vh; text-align: center; margin-bottom: 2vh;">
      <h2 style="font-size: var(--fz_x1); font-weight: 900; color: var(--tx1);">
        Smart Combos Inteligentes ✨
      </h2>
    </div>

    <!-- Header Block -->
    <div class="input_tabs" style="margin: 2vh auto 4vh; padding: 0.8vh; border-radius: 1.5vh; background: var(--bg5); border: 1px solid var(--brd); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 2vh;">
      <div style="display: flex; align-items: center; gap: 1.5vh; margin-left: 1vh;">
        <img src="/smile.avif" alt="${t}" style="width: 4vh; height: 4vh; border-radius: 50%; box-shadow: var(--bs_m);" />
        <div style="text-align: left;">
          <span style="font-size: 11px; font-weight: 700; color: var(--tx3); text-transform: uppercase;">Smart Design Combinator</span>
          <p style="margin: 0; font-size: var(--fz_s3); color: var(--tx1); font-weight: 800;">${r()} <strong>${n}</strong></p>
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
            ${Object.entries(c).map(([e,t])=>`
              <button class="bt_auth sm_preset_btn ${e===l.activePreset?`active`:``}" data-key="${e}" style="width:100%; text-align:left; justify-content:flex-start; padding: 1.2vh 2vh; font-size: var(--fz_s3); display:flex; align-items:center; gap:10px; background: ${e===l.activePreset?`var(--bg3)`:`var(--bg5)`}; border: 1px solid ${e===l.activePreset?`var(--mco)`:`var(--brd)`}; border-radius:0.8vh; font-weight:700;">
                <i class="fas fa-swatchbook" style="color: var(--mco);"></i> ${t.name}
              </button>
            `).join(``)}
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
                ${Object.entries(o).map(([e,t])=>`
                  <option value="${e}" ${e===l.headingFont?`selected`:``}>${t.name}</option>
                `).join(``)}
              </select>
            </div>

            <!-- Body Font -->
            <div style="display: flex; flex-direction: column; gap: 0.8vh;">
              <label style="font-size: var(--fz_s3); font-weight: 800; color: var(--tx2);">Fuente de Párrafos:</label>
              <select id="sm_body_font" style="padding: 1vh; font-size: var(--fz_s3); border-radius: 0.8vh; border:1px solid var(--brd); background:var(--inp); color:var(--tx1); font-weight:700; outline:none; cursor:pointer;">
                ${Object.entries(o).map(([e,t])=>`
                  <option value="${e}" ${e===l.bodyFont?`selected`:``}>${t.name}</option>
                `).join(``)}
              </select>
            </div>

            <!-- Tema WiiTema -->
            <div style="display: flex; flex-direction: column; gap: 0.8vh;">
              <label style="font-size: var(--fz_s3); font-weight: 800; color: var(--tx2);">Gradiente / Paleta:</label>
              <select id="sm_theme_select" style="padding: 1vh; font-size: var(--fz_s3); border-radius: 0.8vh; border:1px solid var(--brd); background:var(--inp); color:var(--tx1); font-weight:700; outline:none; cursor:pointer;">
                <option value="cielo" ${l.theme===`cielo`?`selected`:``}>☁️ Cielo (Theme)</option>
                <option value="dulce" ${l.theme===`dulce`?`selected`:``}>🍬 Dulce (Theme)</option>
                <option value="paz" ${l.theme===`paz`?`selected`:``}>🌿 Paz (Theme)</option>
                <option value="oro" ${l.theme===`oro`?`selected`:``}>👑 Oro (Theme)</option>
                <option value="mora" ${l.theme===`mora`?`selected`:``}>🍇 Mora (Theme)</option>
                <option value="futuro" ${l.theme===`futuro`?`selected`:``}>✨ Futuro (Theme)</option>
              </select>
            </div>

            <!-- Divisor Wave SVG -->
            <div style="display: flex; flex-direction: column; gap: 0.8vh;">
              <label style="font-size: var(--fz_s3); font-weight: 800; color: var(--tx2);">Fondo SVG wave:</label>
              <select id="sm_wave_select" style="padding: 1vh; font-size: var(--fz_s3); border-radius: 0.8vh; border:1px solid var(--brd); background:var(--inp); color:var(--tx1); font-weight:700; outline:none; cursor:pointer;">
                <option value="onda" ${l.wave===`onda`?`selected`:``}>Onda Sinuosa</option>
                <option value="curva" ${l.wave===`curva`?`selected`:``}>Curva Suave</option>
                <option value="picos" ${l.wave===`picos`?`selected`:``}>Picos Geométricos</option>
              </select>
            </div>

            <!-- Icono Central FA -->
            <div style="display: flex; flex-direction: column; gap: 0.8vh;">
              <label style="font-size: var(--fz_s3); font-weight: 800; color: var(--tx2);">Icono de Destacado:</label>
              <select id="sm_icon_select" style="padding: 1vh; font-size: var(--fz_s3); border-radius: 0.8vh; border:1px solid var(--brd); background:var(--inp); color:var(--tx1); font-weight:700; outline:none; cursor:pointer;">
                <option value="fa-laptop-code" ${l.icon===`fa-laptop-code`?`selected`:``}>💻 Desarrollador</option>
                <option value="fa-wand-magic-sparkles" ${l.icon===`fa-wand-magic-sparkles`?`selected`:``}>🪄 Varita Inteligente</option>
                <option value="fa-face-smile" ${l.icon===`fa-face-smile`?`selected`:``}>😊 Carita Feliz</option>
                <option value="fa-star" ${l.icon===`fa-star`?`selected`:``}>⭐ Estrella</option>
                <option value="fa-bolt" ${l.icon===`fa-bolt`?`selected`:``}>⚡ Rayo de Acento</option>
                <option value="fa-rocket" ${l.icon===`fa-rocket`?`selected`:``}>🚀 Cohete Veloz</option>
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
  </div>`},m=()=>{n(),e(`#google-fonts-lab`).length||e(`head`).append(`<link id="google-fonts-lab" rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;600;700&family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Poppins:wght@300;400;500;600;700;800&family=Roboto:wght@300;400;500;700&family=Space+Grotesk:wght@300;400;500;600;700&family=Syne:wght@400;700;800&display=swap">`),d(),e(document).on(`click.sm`,`.sm_preset_btn`,function(t){t.preventDefault();let n=e(this).data(`key`);l.activePreset=n,e(`.sm_preset_btn`).removeClass(`active`).css({background:`var(--bg5)`,"border-color":`var(--brd)`}),e(this).addClass(`active`).css({background:`var(--bg3)`,"border-color":`var(--mco)`});let r=c[n];l.headingFont=r.headingFont,l.bodyFont=r.bodyFont,l.theme=r.theme,l.icon=r.icon,l.wave=r.wave,e(`#sm_heading_font`).val(r.headingFont),e(`#sm_body_font`).val(r.bodyFont),e(`#sm_theme_select`).val(r.theme),e(`#sm_wave_select`).val(r.wave),e(`#sm_icon_select`).val(r.icon),e(`#sm_preview_title`).text(r.title),e(`#sm_preview_subtitle`).text(r.subtitle),e(`#sm_preview_paragraph`).text(r.desc),d()}),e(document).on(`change.sm`,`#sm_heading_font`,function(){l.headingFont=e(this).val(),l.activePreset=``,e(`.sm_preset_btn`).removeClass(`active`).css({background:`var(--bg5)`,"border-color":`var(--brd)`}),d()}),e(document).on(`change.sm`,`#sm_body_font`,function(){l.bodyFont=e(this).val(),l.activePreset=``,e(`.sm_preset_btn`).removeClass(`active`).css({background:`var(--bg5)`,"border-color":`var(--brd)`}),d()}),e(document).on(`change.sm`,`#sm_theme_select`,function(){l.theme=e(this).val(),l.activePreset=``,e(`.sm_preset_btn`).removeClass(`active`).css({background:`var(--bg5)`,"border-color":`var(--brd)`}),d()}),e(document).on(`change.sm`,`#sm_wave_select`,function(){l.wave=e(this).val(),l.activePreset=``,e(`.sm_preset_btn`).removeClass(`active`).css({background:`var(--bg5)`,"border-color":`var(--brd)`}),d()}),e(document).on(`change.sm`,`#sm_icon_select`,function(){l.icon=e(this).val(),l.activePreset=``,e(`.sm_preset_btn`).removeClass(`active`).css({background:`var(--bg5)`,"border-color":`var(--brd)`}),d()}),e(document).on(`input.sm`,`#range_sm_padding`,function(){l.padding=parseInt(e(this).val()),d()}),e(document).on(`input.sm`,`#range_sm_radius`,function(){l.borderRadius=parseInt(e(this).val()),d()});let t=()=>{let t=e(`#sm_code_exporter_block`).text();navigator.clipboard.writeText(t).then(()=>{i(`Código de Combo copiado!`,`success`)})};e(document).on(`click.sm`,`#btn_copy_smart_combo, #btn_copy_smart_panel`,function(e){e.preventDefault(),t()}),e(document).on(`click.sm`,`#btn_reset_smart`,function(t){t.preventDefault(),e(`.sm_preset_btn[data-key="tech"]`).trigger(`click`),e(`#range_sm_padding`).val(5),e(`#range_sm_radius`).val(20),l.padding=5,l.borderRadius=20,d(),i(`Alineación inteligente restablecida`,`success`)})},h=()=>{e(document).off(`.sm`)};export{h as cleanup,m as init,p as render};