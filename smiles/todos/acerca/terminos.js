import './acerca.css';
import './terminos.css';
import $ from 'jquery';
import { app, version } from '../../wii.js';
import { year } from '../../widev.js';

// ── DATOS ─────────────────────────────────────────────────────────────────
const SECCIONES = [
  {
    ico: 'fa-palette', color: '#0EBEFF', num: '01',
    tit: 'Uso de la plataforma',
    body: `<p>WiiTema es una plataforma de diseño para acceder a recursos visuales de calidad: colores, fuentes, iconos, SVG y herramientas Smart. Debe usarse respetando la propiedad intelectual del contenido y sin reproducción masiva sin autorización.</p>`
  },
  {
    ico: 'fa-shield-halved', color: '#29C72E', num: '02',
    tit: 'Cuenta y sincronización',
    body: `<p>Puedes iniciar sesión con Google o email. Sincronizamos tu perfil, temas guardados, preferencias y descargadas con Firebase para mantener consistencia entre dispositivos.</p>`
  },
  {
    ico: 'fa-layer-group', color: '#FF5C69', num: '03',
    tit: 'Planes y funcionalidades',
    body: `<p>El acceso base incluye recursos estándar. Los planes premium ofrecen colecciones exclusivas, descargables en masa y herramientas avanzadas de generación. Los límites pueden actualizarse con aviso previo.</p>`
  },
  {
    ico: 'fa-gavel', color: '#7000FF', num: '04',
    tit: 'Derechos de contenido',
    body: `<p>WiiTema es desarrollado por Wilder Taype. El diseño, código y los recursos visuales pertenecen a WiiTema. Los usuarios obtienen licencia de uso, no propiedad. Redistribución prohibida sin consentimiento.</p>`
  },
  {
    ico: 'fa-triangle-exclamation', color: '#FFDA34', num: '05',
    tit: 'Limitación de responsabilidad',
    body: `<p>WiiTema proporciona recursos y herramientas de diseño, pero no garantiza la compatibilidad total con todos los entornos Wii. El usuario es responsable de verificar que los recursos funcionen en su contexto específico.</p>`
  },
  {
    ico: 'fa-arrows-rotate', color: '#0EBEFF', num: '06',
    tit: 'Cambios en los términos',
    body: `<p>Podemos actualizar funciones, recursos, texto legal y detalles del servicio con el tiempo. El uso continuado de WiiTema después de esos cambios implica aceptación de la versión vigente.</p>`
  },
];

// ── RENDER ─────────────────────────────────────────────────────────────────
export const render = () => `
<main id="wimain">
<div class="ac_wrap tm_wrap">

  <!-- ══ HERO ══ -->
  <section class="ac_hero tm_hero">
    <div class="ac_hero_orb ac_orb1"></div>
    <div class="ac_hero_orb ac_orb2"></div>
    <div class="ac_hero_orb ac_orb3"></div>
    <div class="ac_hero_body">
      <div class="ac_hero_badge"><i class="fas fa-file-contract"></i> Condiciones de Uso</div>
      <h1 class="ac_hero_tit">Términos y<br><span class="ac_grad">Condiciones</span></h1>
      <p class="ac_hero_sub">
        Reglas claras para usar <strong>${app}</strong>, acceder a recursos de diseño y mantener una experiencia colaborativa de calidad.
      </p>
      <div class="tm_hero_chips">
        <span class="tm_chip"><i class="fas fa-heart"></i> Respeto</span>
        <span class="tm_chip"><i class="fas fa-shield-halved"></i> Transparencia</span>
        <span class="tm_chip"><i class="fas fa-gavel"></i> Claridad</span>
      </div>
      <div class="tm_last_upd">
        <i class="fas fa-calendar-check"></i>
        Última actualización: ${year()} · Versión ${version}
      </div>
    </div>
  </section>

  <!-- ══ ÍNDICE RÁPIDO ══ -->
  <div class="tm_index_band">
    ${SECCIONES.map((s, i) => `
      <a href="#tm_sec_${i}" class="tm_index_item">
        <i class="fas ${s.ico}" style="color:${s.color}"></i>
        <span>${s.tit}</span>
      </a>`).join('')}
  </div>

  <!-- ══ SECCIONES ══ -->
  <section class="ac_sec tm_secciones">
    <div class="ac_sec_head">
      <div class="ac_sec_badge"><i class="fas fa-list-check"></i> Acuerdo de Uso</div>
      <h2 class="ac_sec_tit">Reglamento <span class="ac_grad">General</span></h2>
      <p class="ac_sec_sub">Lee con atención. El uso de CumpleWii requiere la aceptación de estas condiciones.</p>
    </div>
    <div class="tm_secs_grid">
      ${SECCIONES.map((s, i) => `
        <div class="tm_sec_card wi_fadeUp" id="tm_sec_${i}">
          <div class="tm_sec_header">
            <div class="tm_sec_ico" style="--tc:${s.color}">
              <i class="fas ${s.ico}"></i>
            </div>
            <div>
              <span class="tm_sec_num" style="color:${s.color}">${s.num}</span>
              <h2 class="tm_sec_tit">${s.tit}</h2>
            </div>
          </div>
          <div class="tm_sec_body">${s.body}</div>
        </div>`).join('')}
    </div>
  </section>

</div></main>
`;

// ── INIT ──────────────────────────────────────────────────────────────────
let _obs = null;

export const init = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) $(e.target).addClass('visible'); });
  }, { threshold: 0.1 });
  _obs = observer;
  $('.wi_fadeUp').each(function () { observer.observe(this); });

  $(document).on('click.terminos', '.tm_nav', function (e) {
    e.preventDefault();
    const { rutas } = window._wiRutas ?? {};
    rutas?.navigate?.($(this).attr('href'));
  });

  $(document).on('click.terminos', '.tm_index_item', function (e) {
    e.preventDefault();
    const t = document.querySelector($(this).attr('href'));
    if (t) window.scrollTo({ top: t.getBoundingClientRect().top + scrollY - 90, behavior: 'smooth' });
  });

  if (window.wiInitTips) window.wiInitTips();
  console.log(`📜 ${app} Términos cargados`);
  window.__WIREADY__ = true;
};

export const cleanup = () => {
  _obs?.disconnect?.();
  _obs = null;
  $(document).off('.terminos');
};
