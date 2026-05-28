import $ from 'jquery';
import { app, version, by } from '../wii.js';
import { wiVista, Saludar, wicopy } from '../widev.js';

// ── DATA ──────────────────────────────────────────────────────
const roles = [
  'Diseño Premium para la Experiencia Wii 🎨',
  'Paletas HSL Reactivas y Flexibles 🌈',
  'Tipografías Claras y Legibles ✍️',
  'Iconos y SVGs Optimizados ⚡',
  'Componentes Smart Listos para Usar 🛠️'
];

const stats = [
  { valor: 6, label: 'Temas Oficiales', sufijo: '' },
  { valor: 100, label: 'Contraste WCAG', sufijo: '%' },
  { valor: 0, label: 'Cero Dependencias', sufijo: 'x' }
];

const features = [
  { 
    id: 'colores', 
    icon: 'fa-palette', 
    color: '#0EBEFF', 
    nombre: 'Taller de Colores HSL', 
    desc: 'Diseña paletas cromáticas reactivas Cielo, Dulce, Paz, Oro, Mora y Futuro de forma matemática.',
    items: [
      { icon: 'fa-sliders', name: 'Afinación HSL', desc: 'Ajusta tono, saturación y luminosidad sobre la marcha.' },
      { icon: 'fa-eye-dropper', name: 'Extractor Automático', desc: 'Captura colores desde imágenes, CSS y código plano.' }
    ] 
  },
  { 
    id: 'fonts', 
    icon: 'fa-font', 
    color: '#FF5C69', 
    nombre: 'Tipografías Modernas', 
    desc: 'Soporte y optimización de carga para fuentes Outfit, Poppins y Rubik.',
    items: [
      { icon: 'fa-cloud-arrow-down', name: 'Carga Eficiente', desc: 'Fuentes pre-cargadas para evitar parpadeos visuales.' },
      { icon: 'fa-text-height', name: 'Escalado Fluido', desc: 'Variables clamp() optimizadas para cualquier pantalla.' }
    ] 
  },
  { 
    id: 'gradient', 
    icon: 'fa-circle-half-stroke', 
    color: '#29C72E', 
    nombre: 'Gradientes Fluidos', 
    desc: 'Transiciones fluidas día/noche y combinaciones de degradados HSL.',
    items: [
      { icon: 'fa-sun', name: 'Modo Día', desc: 'Gradientes suaves y enérgicos para interfaces diurnas.' },
      { icon: 'fa-moon', name: 'Modo Noche', desc: 'Sombras y gradientes oscuros de alto impacto visual.' }
    ] 
  },
  { 
    id: 'iconos', 
    icon: 'fa-icons', 
    color: '#FFDA34', 
    nombre: 'Iconografía Ligera', 
    desc: 'Iconos y recursos optimizados en SVG y condicionales para un alto rendimiento.',
    items: [
      { icon: 'fa-bolt', name: 'Carga Dinámica', desc: 'Usa FontAwesome y emojis sin penalizar el ancho de banda.' },
      { icon: 'fa-image', name: 'SVGs Premium', desc: 'Siluetas y trazados vectoriales limpios y escalables.' }
    ] 
  },
  { 
    id: 'smart', 
    icon: 'fa-wand-magic-sparkles', 
    color: '#7000FF', 
    nombre: 'Componentes Smart', 
    desc: 'Bloques de interfaz listos, accesibles y optimizados para proyectos modernos.',
    items: [
      { icon: 'fa-code', name: 'Código Limpio', desc: 'Estructuras HTML5 semánticas libres de dependencias complejas.' },
      { icon: 'fa-universal-access', name: 'Accesibilidad WCAG', desc: 'Contraste cromático validado y soporte de lectores de pantalla.' }
    ] 
  },
  { 
    id: 'tools', 
    icon: 'fa-hammer', 
    color: '#FF8F00', 
    nombre: 'Herramientas Útiles', 
    desc: 'Utilidades de retoque, validadores de contraste y utilidades de color.',
    items: [
      { icon: 'fa-copy', name: 'Copiado Rápido', desc: 'Copia variables raíz CSS a tu portapapeles con un clic.' },
      { icon: 'fa-check-circle', name: 'Validación en Vivo', desc: 'Monitorea el contraste de texto contra fondos instantáneamente.' }
    ] 
  }
];

const beneficios = [
  { icon: 'fa-bolt', titulo: 'Rendimiento Ultra Rápido', desc: 'Optimizado para cargar en milisegundos. Sin frameworks pesados ni dependencias innecesarias, garantizando un despliegue veloz.' },
  { icon: 'fa-shield-halved', titulo: 'Seguridad y Limpieza', desc: 'Estructura semántica sin inyecciones inseguras de HTML. Código auditado y diseñado bajo buenas prácticas de desarrollo.' },
  { icon: 'fa-swatchbook', titulo: 'Totalmente Reactivo', desc: 'Todas las secciones responden dinámicamente al tema seleccionado. Adapta tu interfaz en segundos con variables de root CSS.' }
];

// Variables para los CSS del tema a copiar
const themeCssMap = {
  Cielo: `:root[data-theme="Cielo"] {
  --bg: #ccefff;
  --wb: #e5f7ff;
  --tx: #000000;
  --mco: #1978d7;
  --hv: #00a8e6;
  --brd: #b8d9eb;
}`,
  Dulce: `:root[data-theme="Dulce"] {
  --bg: #ffccd1;
  --wb: #ffebed;
  --tx: #000000;
  --mco: #ff3849;
  --hv: #ff7a85;
  --brd: #ffb3ba;
}`,
  Paz: `:root[data-theme="Paz"] {
  --bg: #ccffce;
  --wb: #ebffeb;
  --tx: #000000;
  --mco: #25b62a;
  --hv: #3cd741;
  --brd: #a8e6ab;
}`,
  Oro: `:root[data-theme="Oro"] {
  --bg: #fff8d1;
  --wb: #fffde8;
  --tx: #000000;
  --mco: #facc00;
  --hv: #f0cc00;
  --brd: #ffe066;
}`,
  Mora: `:root[data-theme="Mora"] {
  --bg: #e4ccff;
  --wb: #f4ebff;
  --tx: #000000;
  --mco: #6a00f5;
  --hv: #9442ff;
  --brd: #c9a3ff;
}`,
  Futuro: `:root[data-theme="Futuro"] {
  --bg: #0a0e1a;
  --wb: #151b2e;
  --tx: #e0e7ff;
  --mco: #00f3ff;
  --hv: #00d4ff;
  --brd: #2d3a52;
}`
};

// ── PLANTILLAS ────────────────────────────────────────────────
const tplStat = s => `
  <div class="ini_stat">
    <div class="ini_stat_n" data-target="${s.valor}" data-sufijo="${s.sufijo}">0</div>
    <div class="ini_stat_l">${s.label}</div>
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
          <div class="ini_tool_a">
            <i class="fas ${it.icon}"></i>
            <div><strong>${it.name}</strong><span>${it.desc}</span></div>
            <i class="fas fa-arrow-right ini_ext"></i>
          </div>
        </li>`).join('')}
    </ul>
  </div>`;

const tplBeneficio = (b, i) => `
  <div class="ini_about_card" style="--d:${i * .15}s">
    <div class="ini_card_ico"><i class="fas ${b.icon}"></i></div>
    <h3>${b.titulo}</h3>
    <p>${b.desc}</p>
  </div>`;

// ── RENDER ────────────────────────────────────────────────────
export const render = () => `
<div class="ini_wrap">

  <!-- ===== HERO ===== -->
  <section class="ini_hero">
    <div class="ini_hero_content">

      <div class="ini_saludo" style="--d:0s">
        <span>${Saludar()} Smile!</span><span class="ini_wave">👋</span>
      </div>

      <h1 class="ini_titulo" style="--d:.15s">
        El Hub de Diseño Premium para la Experiencia <span class="ini_grad">${app}</span>
      </h1>

      <div class="ini_roles" style="--d:.3s">
        ${roles.map((r, i) => `<span class="ini_role${i === 0 ? ' active' : ''}">${r}</span>`).join('')}
      </div>

      <p class="ini_sub" style="--d:.45s">
        Optimiza la velocidad, consistencia y apariencia de tus aplicaciones. Descubre paletas dinámicas, tipografías del sistema optimizadas y componentes accesibles listos para usar.
      </p>

      <div class="ini_stats" id="in_stats" style="--d:.6s">
        ${stats.map(tplStat).join('')}
      </div>

      <div class="ini_btns" style="--d:.75s">
        <a href="/colores" class="ini_btn_p"><i class="fas fa-palette"></i> Explorar Colores</a>
        <a href="/smart" class="ini_btn_s"><i class="fas fa-wand-magic-sparkles"></i> Ver Componentes</a>
      </div>

    </div>

    <!-- Derecha: Sandbox de tema y componente interactivo -->
    <div class="ini_hero_visual">
      <div class="ini_nw_preview" id="sandbox_card" style="--d:.3s;">
        <!-- Header -->
        <div class="ini_nw_head">
          <div class="ini_nw_dots">
            <div></div><div></div><div></div>
          </div>
          <div class="ini_nw_search">
            <i class="fas fa-lock" style="margin-right: 6px; font-size: 0.65rem;"></i> wiitema-sandbox.app
          </div>
          <div class="sandbox_badge">
            <span class="sandbox_badge_pulse"></span> Live UI
          </div>
        </div>
        
        <!-- UI Mockup Content -->
        <div class="ini_nw_body">
          <!-- Sidebar -->
          <div class="ini_nw_side">
            <div class="active"><i class="fas fa-chart-simple" style="color: var(--wb); font-size: 0.8rem;"></i></div>
            <div><i class="fas fa-box" style="font-size: 0.8rem;"></i></div>
            <div><i class="fas fa-gear" style="font-size: 0.8rem;"></i></div>
          </div>
          
          <!-- Main Area -->
          <div class="ini_nw_main">
            <div class="sandbox_header">
              <span class="sandbox_title">Panel de Control</span>
              <span class="sandbox_subtitle">WiiTema v10</span>
            </div>
            
            <div class="ini_nw_card">
              <div class="sandbox_card_header">
                <i class="fas fa-bolt" style="color: var(--mco);"></i>
                <strong>Rendimiento Premium</strong>
              </div>
              <div class="sandbox_progress_bar">
                <div class="sandbox_progress_fill" style="width: 95%;"></div>
              </div>
              <div class="sandbox_checklist">
                <span class="sandbox_check"><i class="fas fa-circle-check"></i> Carga Ultra Veloz</span>
                <span class="sandbox_check"><i class="fas fa-circle-check"></i> WCAG Contraste</span>
              </div>
            </div>
            
            <!-- Sandbox Actions -->
            <div class="sandbox_actions">
              <button class="sandbox_btn btn_test_anim" id="btn_sandbox_action">Micro-interacción</button>
              <button class="sandbox_btn btn_accent" id="btn_sandbox_corners">Alternar Esquinas</button>
            </div>
          </div>
        </div>

        <!-- Customizer Drawer in Sandbox -->
        <div class="sandbox_customizer">
          <div class="customizer_title">Temas Rápidos:</div>
          <div class="customizer_themes">
            <div class="sandbox_theme_bubble" data-theme-swap="Cielo" style="background: #0EBEFF;" title="Tema Cielo"></div>
            <div class="sandbox_theme_bubble" data-theme-swap="Dulce" style="background: #FF5C69;" title="Tema Dulce"></div>
            <div class="sandbox_theme_bubble" data-theme-swap="Paz" style="background: #29C72E;" title="Tema Paz"></div>
            <div class="sandbox_theme_bubble" data-theme-swap="Oro" style="background: #FFDA34;" title="Tema Oro"></div>
            <div class="sandbox_theme_bubble" data-theme-swap="Mora" style="background: #7000FF;" title="Tema Mora"></div>
            <div class="sandbox_theme_bubble" data-theme-swap="Futuro" style="background: #21273B;" title="Tema Futuro"></div>
          </div>
          <button class="sandbox_copy_btn" id="btn_sandbox_copy_css"><i class="fas fa-copy"></i> Copiar CSS</button>
        </div>
      </div>
      
      <!-- Decorative background glowing circle -->
      <div class="sandbox_glow"></div>
    </div>
  </section>

  <!-- ===== PILARES / FUNCIONALIDADES ===== -->
  <section class="ini_cats_sec">
    <div class="ini_sec_head">
      <h2 class="ini_sec_tit">Los <span class="ini_grad">6 Pilares</span> de ${app}</h2>
      <div class="ini_sec_line"></div>
      <p class="ini_sec_desc">Soluciones diseñadas minuciosamente para optimizar y estilizar tus aplicaciones</p>
    </div>
    <div class="ini_cats_grid">${features.map(tplFeature).join('')}</div>
  </section>

  <!-- ===== BENEFICIOS ===== -->
  <section class="ini_about_sec">
    <div class="ini_sec_head">
      <h2 class="ini_sec_tit">¿Por qué elegir <span class="ini_grad">${app}</span>?</h2>
      <div class="ini_sec_line"></div>
    </div>
    <div class="ini_about_grid">${beneficios.map(tplBeneficio).join('')}</div>
  </section>

  <!-- ===== CTA FINAL ===== -->
  <section class="ini_cta_sec">
    <div class="ini_cta_wrap">
      <i class="fas fa-palette ini_cta_ico"></i>
      <h2>Empieza a construir interfaces de nivel internacional hoy</h2>
      <p>Cero fricción, temas rápidos e interactivos listos para potenciar tus desarrollos.</p>
      <div class="ini_cta_chips">
        <a href="/colores" class="ini_btn_p"><i class="fas fa-circle-nodes"></i> Taller de Colores</a>
      </div>
      <p class="ini_cta_autor">Desarrollado con pasión por <a href="https://wtaype.github.io/" target="_blank" rel="noopener">${by}</a></p>
    </div>
  </section>

</div>`;

// ── INIT ──────────────────────────────────────────────────────
export const init = () => {
  let activeRoleIndex = 0;
  const $roles = $('.ini_role');
  
  // Rotación de roles en hero
  const roleInterval = setInterval(() => {
    if (!$roles.length) return;
    $roles.removeClass('active');
    activeRoleIndex = (activeRoleIndex + 1) % $roles.length;
    $roles.eq(activeRoleIndex).addClass('active');
  }, 3200);

  // Animación numérica de estadísticas
  wiVista('#in_stats', () => {
    $('.ini_stat_n').each(function() {
      const $el = $(this);
      const target = +$el.data('target');
      const suffix = $el.data('sufijo') || '';
      if (target === 0) {
        $el.text(target + suffix);
        return;
      }
      let current = 0;
      const step = target / 30;
      const countInterval = setInterval(() => {
        current += step;
        if (current >= target) {
          $el.text(target + suffix);
          clearInterval(countInterval);
        } else {
          $el.text(Math.floor(current));
        }
      }, 30);
    });
  });

  // Animaciones al hacer scroll en secciones
  wiVista('.ini_cat_card', null, { anim: 'wi_fadeUp', stagger: 80 });
  wiVista('.ini_about_card', null, { anim: 'wi_fadeUp', stagger: 120 });

  // --- WIDGET PLANNER INTERACTIVO / SANDBOX ---
  const $sandbox = $('#sandbox_card');
  const $btnAction = $('#btn_sandbox_action');
  const $btnCorners = $('#btn_sandbox_corners');
  const $btnCopy = $('#btn_sandbox_copy_css');

  // Acción: Simular una micro-interacción (pulso y giro del icono)
  $btnAction.on('click', () => {
    $btnAction.addClass('animating');
    const $ico = $('.sandbox_card_header i');
    $ico.addClass('fa-spin');
    
    // Simular un efecto visual de procesamiento
    setTimeout(() => {
      $btnAction.removeClass('animating');
      $ico.removeClass('fa-spin');
    }, 1000);
  });

  // Acción: Alternar bordes redondeados y afilados en el sandbox
  $btnCorners.on('click', () => {
    $sandbox.toggleClass('square-corners');
    const isSquare = $sandbox.hasClass('square-corners');
    $btnCorners.text(isSquare ? 'Bordes Redondos' : 'Bordes Rectos');
  });

  // Acción: Cambiar tema del sandbox y del sitio web
  $('.sandbox_theme_bubble').on('click', function() {
    const targetTheme = $(this).data('theme-swap');
    if (!targetTheme) return;

    // Buscar y disparar el click sobre el selector de tema global
    const globalThemeEl = document.querySelector(`#wiTema .tema[data-ths^="${targetTheme}"]`);
    if (globalThemeEl) {
      globalThemeEl.click();
    } else {
      // Fallback si no está el switcher global en el DOM
      document.documentElement.dataset.theme = targetTheme;
    }
  });

  // Acción: Copiar variables CSS del tema actual
  $btnCopy.on('click', function(e) {
    const currentTheme = document.documentElement.dataset.theme || 'Oro';
    const cssContent = themeCssMap[currentTheme] || themeCssMap['Oro'];
    
    // wicopy(texto_a_copiar, elemento_para_tooltip, mensaje)
    wicopy(cssContent, this, '¡CSS Copiado!');
  });

  // Guardar intervalos para cleanup
  window._inicio_timers = [roleInterval];
  console.log(`🚀 ${app} ${version} · Página de inicio WiiTema inicializada correctamente.`);
};

// ── CLEANUP ──────────────────────────────────────────────────
export const cleanup = () => {
  if (window._inicio_timers) {
    window._inicio_timers.forEach(t => clearInterval(t));
  }
};