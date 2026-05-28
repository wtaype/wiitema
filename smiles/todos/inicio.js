import './colores.css';
import './inicio.css';
import $ from 'jquery';
import { app, version, by, linkme } from '../wii.js';
import { wiVista, year, wiTip, Saludar } from '../widev.js';

/* ══════════════════════════════════════════════════════════════
   INICIO v3.0 — WiiTema Lab · Ultra Premium Edition
   ✨ Aurora Hero · Kinetic Roles · Sandbox Preview · 6 Pilares
   ══════════════════════════════════════════════════════════════ */

const roles = [
  'Paletas de Colores HSL 🎨',
  'Google Fonts en Vivo ✍️',
  'Gradientes con Dial Giratorio 🌈',
  'Estudio Vectorial SVG 📐',
  'Smart Combos Creativos ✨',
  'Emojis con WhatsApp Preview 🎭'
];

const stats = [
  { valor: 8,   label: 'Herramientas Pro', sufijo: '' },
  { valor: 75,  label: 'Iconos Indexados', sufijo: '+' },
  { valor: 100, label: 'Diseño Responsivo', sufijo: '%' }
];

const HERO_PRESETS = {
  aurora: {
    title: 'Neon Aurora 🌈',
    desc: 'Laboratorio creativo completo para extraer paletas, combinar tipografías y afinar gradientes.',
    iconColor: '#00f3ff',
    iconBg: 'rgba(0,243,255,0.10)',
    icon: 'fa-paint-roller',
    font: '"Poppins", sans-serif'
  },
  cyber: {
    title: 'Cyberpunk Tech 🤖',
    desc: 'Especímenes tipográficos, vectores optimizados y paletas cromáticas accesibles en tiempo real.',
    iconColor: '#ff007f',
    iconBg: 'rgba(255,0,127,0.10)',
    icon: 'fa-microchip',
    font: '"Space Grotesk", sans-serif'
  },
  luxury: {
    title: 'Golden Luxury 👑',
    desc: 'Eleva el diseño visual de tus interfaces con combinaciones de color inteligentes y perfectas.',
    iconColor: '#FFDA34',
    iconBg: 'rgba(255,218,52,0.10)',
    icon: 'fa-crown',
    font: '"Playfair Display", serif'
  }
};

/* Mini herramientas en la sandbox del hero */
const HERO_TOOLS = [
  { icon: 'fa-palette', label: 'Extractor HSL',        color: '#00f3ff', bg: 'rgba(0,243,255,.12)' },
  { icon: 'fa-font',    label: 'Laboratorio Fonts',    color: '#ff3849', bg: 'rgba(255,56,73,.12)'  },
  { icon: 'fa-circle-half-stroke', label: 'Generador Gradient', color: '#7000ff', bg: 'rgba(112,0,255,.12)' }
];

const features = [
  {
    id: 'colores',
    icon: 'fa-palette',
    color: '#00f3ff',
    nombre: 'Extractor & Afinador HSL',
    desc: 'Extrae colores de imágenes y afina paletas con controles HSL bidireccionales.',
    items: [
      { icon: 'fa-dropper',  name: 'Gotero circular 6x', desc: 'Captura pixeles exactos de tus fotos pegadas.' },
      { icon: 'fa-sliders',  name: 'Afinación HSL dual',  desc: 'Sliders sincronizados con código in-line.' },
      { icon: 'fa-paste',    name: 'Pegar desde Portapapeles', desc: 'Soporte Ctrl+V directo en la web.' }
    ]
  },
  {
    id: 'fuentes',
    icon: 'fa-font',
    color: '#ff3849',
    nombre: 'Laboratorio Tipográfico',
    desc: 'Importa tipografías de Google Fonts y regula espaciados con precisión extrema.',
    items: [
      { icon: 'fa-paragraph',          name: 'Especímenes de Peso',  desc: 'Visualiza todos los grosores (300 a 800) lado a lado.' },
      { icon: 'fa-arrow-down-up-lock', name: 'Escalas de Fuentes',   desc: 'Sliders de tamaño, interlineado y letter-spacing.' },
      { icon: 'fa-file-code',          name: 'Exportación Modular',  desc: 'Genera bloques CSS estructurados listos para usar.' }
    ]
  },
  {
    id: 'gradientes',
    icon: 'fa-circle-half-stroke',
    color: '#7000ff',
    nombre: 'Generador de Gradientes',
    desc: 'Diseña gradientes lineales y radiales con controllers HSL interactivos.',
    items: [
      { icon: 'fa-rotate',              name: 'Dial circular arrastrable', desc: 'Gira el dial con mouse o touch para fijar el ángulo.' },
      { icon: 'fa-wand-magic-sparkles', name: 'Súper Azar HSL',          desc: 'Algoritmo inteligente para armonías de tríadas.' },
      { icon: 'fa-code',               name: 'Stops & Exporter',         desc: 'Regula 2 o 3 paradas de color con exportación CSS.' }
    ]
  },
  {
    id: 'svg',
    icon: 'fa-image',
    color: '#29C72E',
    nombre: 'Estudio Vectorial SVG',
    desc: 'Configura contornos, rellenos y descargas de divisores vectoriales premium.',
    items: [
      { icon: 'fa-compass-drafting', name: 'Rejilla Blueprint',    desc: 'Lienzo técnico cuadriculado de precisión de fondo.' },
      { icon: 'fa-download',         name: 'Descargador Directo', desc: 'Descarga archivos .svg puros listos al disco.' },
      { icon: 'fa-cube',             name: 'Background Base64',   desc: 'Convierte vectores a código Base64 directo para CSS.' }
    ]
  },
  {
    id: 'smart',
    icon: 'fa-wand-magic-sparkles',
    color: '#FFDA34',
    nombre: 'Smart Combo Play',
    desc: 'El combinador definitivo que une colores, fuentes, iconos y SVGs en un clic.',
    items: [
      { icon: 'fa-swatchbook', name: 'Presets curados',   desc: 'Alterna combinaciones (Tech, Pastel, Luxury, Mora).' },
      { icon: 'fa-desktop',    name: 'Sandbox Integrado', desc: 'Previsualiza cabeceras, botones y divisores juntos.' },
      { icon: 'fa-file-code',  name: 'Bloque Unificado',  desc: 'Copia el bloque completo de HTML y CSS en un clic.' }
    ]
  },
  {
    id: 'emojis',
    icon: 'fa-face-smile',
    color: '#ffa726',
    nombre: 'Emoji & Notepad Pro',
    desc: 'Escribe copys con WhatsApp/Discord Live Previews y animaciones de explosiones.',
    items: [
      { icon: 'fa-eye',      name: 'Speech previews',      desc: 'Previsualiza globos de mensajes con formato real.' },
      { icon: 'fa-bullhorn', name: 'Marketing Templates',  desc: 'Inyecta plantillas de ventas y avisos al instante.' },
      { icon: 'fa-fire',     name: 'Partículas explosivas', desc: 'Explosión de emojis flotantes en coordenadas de clic.' }
    ]
  }
];

const beneficios = [
  { icon: 'fa-laptop-code',        titulo: '100% Client-Side Sandbox',  desc: 'Procesamiento ultrarrápido sin peticiones de red pesadas. El navegador ejecuta las animaciones y renderiza los especímenes al instante.' },
  { icon: 'fa-cube',               titulo: 'Exportación Universal',       desc: 'Todos los generadores cuentan con paneles de copiado de código CSS puro, variables globales (:root) y marcado HTML.' },
  { icon: 'fa-wand-magic-sparkles', titulo: 'Inspiración Inteligente',   desc: 'Olvídate del bloqueo creativo con herramientas de aleatorización cromática y diales táctiles dinámicos.' }
];


// ── PLANTILLAS ─────────────────────────────────────────────────
const tplStat = s => `
  <div class="ini_stat">
    <div class="ini_stat_n" data-target="${s.valor}" data-sufijo="${s.sufijo}">0</div>
    <div class="ini_stat_l">${s.label}</div>
  </div>`;

const tplHeroTool = t => `
  <div class="ini_sb_tool_row">
    <div class="ini_sb_tool_ico" style="background:${t.bg};color:${t.color};">
      <i class="fas ${t.icon}"></i>
    </div>
    <span class="ini_sb_tool_name">${t.label}</span>
    <span class="ini_sb_tool_dot"></span>
  </div>`;

const tplFeature = f => `
  <div class="ini_cat_card" style="--cc:${f.color}">
    <div class="ini_cat_bar"></div>
    <div class="ini_cat_top">
      <div class="ini_cat_ico"><i class="fas ${f.icon}"></i></div>
      <div class="ini_cat_info"><h3>${f.nombre}</h3><p>${f.desc}</p></div>
    </div>
    <ul class="ini_cat_tools">
      ${f.items.map(it => `
        <li>
          <a href="/${f.id}" class="ini_tool_a nv_item" data-page="${f.id}">
            <i class="fas ${it.icon}"></i>
            <div><strong>${it.name}</strong><span>${it.desc}</span></div>
            <i class="fas fa-arrow-right ini_ext"></i>
          </a>
        </li>`).join('')}
    </ul>
  </div>`;

const tplBeneficio = (b, i) => `
  <div class="ini_about_card" style="--d:${i * .15}s">
    <div class="ini_card_ico"><i class="fas ${b.icon}"></i></div>
    <h3>${b.titulo}</h3>
    <p>${b.desc}</p>
  </div>`;


// ── RENDER ─────────────────────────────────────────────────────
export const render = () => `
<div class="ini_wrap">

  <!-- ===== HERO ===== -->
  <section class="ini_hero">
    <div class="ini_hero_content">

      <!-- Saludo premium con badge vivo -->
      <div class="ini_saludo" style="--d:0s">
        <span class="ini_saludo_dot"></span>
        <span>${Saludar()} — Bienvenido al Futuro del Diseño</span>
        <span class="ini_wave">🚀</span>
      </div>

      <!-- Título principal -->
      <h1 class="ini_titulo" style="--d:.15s">
        Acelera tu Creatividad Web<br>con <span class="ini_grad">${app} Lab</span>
      </h1>

      <!-- Roles animados con pip -->
      <div class="ini_roles" style="--d:.3s">
        ${roles.map((r, i) => `
          <span class="ini_role${i === 0 ? ' active' : ''}">
            <span class="ini_role_pip"></span>${r}
          </span>`).join('')}
      </div>

      <!-- Subtítulo -->
      <p class="ini_sub" style="--d:.45s">
        La suite definitiva de utilidades creativas client-side para diseñadores y
        desarrolladores. Extrae colores, manipula tipografías, genera gradientes
        con diales táctiles y exporta código limpio listo para producción.
      </p>

      <!-- Stats animados -->
      <div class="ini_stats" id="in_stats" style="--d:.6s">
        ${stats.map(tplStat).join('')}
      </div>

      <!-- CTAs -->
      <div class="ini_btns" style="--d:.78s">
        <a href="/colores" class="ini_btn_p nv_item" data-page="colores">
          <i class="fas fa-play"></i> Ingresar al Lab
        </a>
        <a href="/tools" class="ini_btn_s nv_item" data-page="tools">
          <i class="fas fa-hammer"></i> Directorio Tools
        </a>
      </div>

    </div><!-- end hero content -->

    <!-- Derecha: Sandbox Widget Interactivo -->
    <div class="ini_hero_visual">

      <div class="ini_sandbox_card" id="hero_sandbox">
        <!-- Scan line efecto -->
        <div class="ini_scan_line"></div>

        <!-- Header de la tarjeta -->
        <div class="ini_sb_head">
          <div class="ini_sb_brand">
            <i class="fas fa-wand-magic-sparkles"></i>
            <span>WiiTema Sandbox</span>
          </div>
          <span class="ini_sb_badge">● En Vivo</span>
        </div>

        <!-- Icono del preset -->
        <div class="ini_sb_icon_wrap" id="sb_icon">
          <i class="fas fa-paint-roller" id="sb_icon_i"></i>
        </div>

        <!-- Título y descripción del preset -->
        <h3 class="ini_sb_title" id="sb_title">Neon Aurora 🌈</h3>
        <p class="ini_sb_desc" id="sb_desc">Laboratorio creativo completo para extraer paletas, combinar tipografías y afinar gradientes.</p>

        <!-- Mini herramientas -->
        <div class="ini_sb_tools">
          ${HERO_TOOLS.map(tplHeroTool).join('')}
        </div>

        <!-- Presets de estilo -->
        <span class="ini_sb_presets_label">Prueba los estilos del Lab:</span>
        <div class="ini_preset_tabs">
          <button class="ini_preset_tab active" data-preset="aurora">Aurora</button>
          <button class="ini_preset_tab"        data-preset="cyber">Cyberpunk</button>
          <button class="ini_preset_tab"        data-preset="luxury">Luxury</button>
        </div>
      </div>

      <!-- Floating tech badges -->
      <div class="ini_ftech ini_ft1" style="--d:.5s"  ${wiTip('Color HSL')}>  <i class="fas fa-palette"></i></div>
      <div class="ini_ftech ini_ft2" style="--d:.65s" ${wiTip('Fonts Pro')}>  <i class="fas fa-font"></i></div>
      <div class="ini_ftech ini_ft3" style="--d:.8s"  ${wiTip('Gradient')}> <i class="fas fa-circle-half-stroke"></i></div>
      <div class="ini_ftech ini_ft4" style="--d:.95s" ${wiTip('SVG Studio')}><i class="fas fa-compass-drafting"></i></div>

    </div><!-- end hero visual -->
  </section>

  <!-- ===== 6 PILARES ===== -->
  <section class="ini_cats_sec">
    <div class="ini_sec_head">
      <h2 class="ini_sec_tit">Los <span class="ini_grad">6 Pilares</span> del Lab</h2>
      <div class="ini_sec_line"></div>
      <p class="ini_sec_desc">Explora las herramientas avanzadas integradas en WiiTema Suite</p>
    </div>
    <div class="ini_cats_grid">${features.map(tplFeature).join('')}</div>
  </section>

  <!-- ===== BENEFICIOS ===== -->
  <section class="ini_about_sec">
    <div class="ini_sec_head">
      <h2 class="ini_sec_tit">¿Qué hace a <span class="ini_grad">${app} Lab</span> Excepcional?</h2>
      <div class="ini_sec_line"></div>
    </div>
    <div class="ini_about_grid">${beneficios.map(tplBeneficio).join('')}</div>
  </section>

  <!-- ===== CTA FINAL ===== -->
  <section class="ini_cta_sec">
    <div class="ini_cta_wrap">
      <i class="fas fa-wand-magic-sparkles ini_cta_ico"></i>
      <h2>Empieza a Diseñar Interfaces Increíbles Hoy Mismo</h2>
      <p>Carga paletas, ensaya tipografías y optimiza componentes con nuestra suite de sandboxes creativos.</p>
      <div class="ini_cta_chips">
        <a href="/colores" class="ini_btn_p nv_item" data-page="colores">
          <i class="fas fa-play"></i> Comenzar en el Lab
        </a>
      </div>
      <p class="ini_cta_autor">
        Desarrollado con pasión por <a href="${linkme}" target="_blank">${by}</a>
      </p>
    </div>
  </section>

</div>`;


// ── INIT ───────────────────────────────────────────────────────
export const init = () => {

  // ── 1. ROLES — Animación cinematográfica con enter/leave ──
  const $roles = $('.ini_role');
  const total  = $roles.length;
  let rIdx     = 0;
  let rLocked  = false;

  const nextRole = () => {
    if (rLocked) return;
    const $curr = $roles.eq(rIdx);
    rIdx = (rIdx + 1) % total;
    const $next = $roles.eq(rIdx);

    // Salida
    $curr.removeClass('active').addClass('ini_role_leaving');
    setTimeout(() => $curr.removeClass('ini_role_leaving'), 430);

    // Entrada con ligero delay
    setTimeout(() => {
      $next.addClass('ini_role_entering');
      setTimeout(() => {
        $next.removeClass('ini_role_entering').addClass('active');
      }, 480);
    }, 80);
  };

  const roleInterval = setInterval(nextRole, 2600);


  // ── 2. STATS — Contador cinético con pop ─────────────────
  wiVista('#in_stats', () => {
    $('.ini_stat_n').each(function () {
      const $n   = $(this);
      const obj  = +$n.data('target');
      const suf  = $n.data('sufijo') || '';
      const dur  = 900; // ms total
      const fps  = 36;
      const step = Math.ceil(obj / (dur / (1000 / fps)));
      let v = 0;

      const t = setInterval(() => {
        v += step;
        if (v >= obj) {
          $n.text(obj + suf);
          $n.addClass('ini_pop');
          setTimeout(() => $n.removeClass('ini_pop'), 350);
          clearInterval(t);
        } else {
          $n.text(Math.floor(v));
        }
      }, 1000 / fps);
    });
  });


  // ── 3. CARDS — Scroll reveal animado ─────────────────────
  wiVista('.ini_cat_card',   null, { anim: 'wi_fadeUp', stagger: 70  });
  wiVista('.ini_about_card', null, { anim: 'wi_fadeUp', stagger: 110 });


  // ── 4. SANDBOX WIDGET — Presets interactivos ─────────────
  const $sbTitle = $('#sb_title');
  const $sbDesc  = $('#sb_desc');
  const $sbIcon  = $('#sb_icon');
  const $sbIconI = $('#sb_icon_i');
  let   sbLocked = false;

  $(document).on('click.ini', '.ini_preset_tab', function (e) {
    e.preventDefault();
    if (sbLocked) return;

    const key  = $(this).data('preset');
    const pres = HERO_PRESETS[key];
    if (!pres) return;

    sbLocked = true;

    // Tabs activo
    $('.ini_preset_tab').removeClass('active');
    $(this).addClass('active');

    // Fade out rápido
    $sbTitle.add($sbDesc).add($sbIcon).css({
      opacity: 0,
      transform: 'translateY(6px) scale(0.97)',
      transition: 'opacity .2s, transform .2s'
    });

    setTimeout(() => {
      // Actualizar contenido
      $sbTitle.text(pres.title).css('color', pres.iconColor).css('font-family', pres.font);
      $sbDesc.text(pres.desc).css('font-family', pres.font);
      $sbIconI.attr('class', `fas ${pres.icon}`);
      $sbIcon.css({
        'background':   pres.iconBg,
        'color':        pres.iconColor,
        'border-color': `${pres.iconColor}33`
      });

      // Fade in suave
      $sbTitle.add($sbDesc).add($sbIcon).css({
        opacity: 1,
        transform: 'translateY(0) scale(1)',
        transition: 'opacity .3s cubic-bezier(.22,1,.36,1), transform .3s cubic-bezier(.22,1,.36,1)'
      });

      setTimeout(() => { sbLocked = false; }, 350);
    }, 200);
  });


  // ── 5. FLOATING BADGES — Hover glow por color ─────────────
  const badgeColors = ['#00f3ff', '#ff3849', '#7000ff', '#29C72E'];
  $('.ini_ftech').each(function (i) {
    const col = badgeColors[i] || 'var(--mco)';
    $(this)
      .find('i').css('color', col).end()
      .on('mouseenter.ini', function () {
        $(this).css('border-color', col);
      })
      .on('mouseleave.ini', function () {
        $(this).css('border-color', '');
      });
  });


  // ── 6. SANDBOX CARD — Parallax suave en mouse move ────────
  const $card = $('#hero_sandbox');
  let cardRect = null;

  const refreshRect = () => { cardRect = $card[0]?.getBoundingClientRect(); };
  refreshRect();

  $(window).on('resize.ini', refreshRect);

  $(document).on('mousemove.ini', function (e) {
    if (!cardRect || window.innerWidth < 900) return;
    const cx = cardRect.left + cardRect.width / 2;
    const cy = cardRect.top  + cardRect.height / 2;
    const dx = (e.clientX - cx) / cardRect.width;
    const dy = (e.clientY - cy) / cardRect.height;
    const rx =  dy * -6; // rotateX
    const ry =  dx *  6; // rotateY

    $card.css({
      'transform': `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`,
      'transition': 'transform .1s linear'
    });
  });

  $card.on('mouseleave.ini', function () {
    $(this).css({
      'transform': '',
      'transition': 'transform .5s cubic-bezier(.22,1,.36,1)'
    });
    refreshRect();
  });


  // ── Guardar timers para cleanup ────────────────────────────
  window._inicio_timers = [roleInterval];
};


// ── CLEANUP ────────────────────────────────────────────────────
export const cleanup = () => {
  if (window._inicio_timers) {
    window._inicio_timers.forEach(t => clearInterval(t));
    window._inicio_timers = null;
  }
  $(document).off('.ini');
  $(window).off('.ini');
  $('#hero_sandbox').off('.ini');
};