import './zmasss.css';
import $ from 'jquery';
import { wiAuth } from '../widev.js';
import { RUTAS } from '../rutas.js';

const CARDS = [
  { href: '/admin', ico: 'fa-globe', txt: 'Centro de Control', desc: 'Consola global de plataforma.' },
  { href: '/usuarios', ico: 'fa-users', txt: 'Gestión de Usuarios', desc: 'Control de cuentas y moderación.' },
  { href: '/sistema', ico: 'fa-cogs', txt: 'Sistema y Logs', desc: 'Estado del sistema y bases de datos.' },
  { href: '/gestor', ico: 'fa-users-gear', txt: 'Dashboard Gestor', desc: 'Administración de ventas.' },
  { href: '/smile', ico: 'fa-gauge-high', txt: 'Dashboard Colaborador', desc: 'Métricas y retos del mes.' },
  { href: '/crear', ico: 'fa-plus-circle', txt: 'Mis Linkwiis', desc: 'Administra tus enlaces cortos.' },
  { href: '/agregar', ico: 'fa-folder-plus', txt: 'Mis Recursos', desc: 'Gestiona archivos y carpetas.' },
  { href: '/win', ico: 'fa-file-shield', txt: 'wiWin Cloud', desc: 'Almacenamiento en la nube.' },
  { href: '/word', ico: 'fa-file-lines', txt: 'Word Editor', desc: 'Editor de documentos.' },
  { href: '/notas', ico: 'fa-book', txt: 'Notas Book', desc: 'Cuaderno de notas rápidas.' },
  { href: '/chat', ico: 'fa-comments', txt: 'Chat Grupal', desc: 'Mensajería interna del equipo.' },
  { href: '/mensajes', ico: 'fa-envelope', txt: 'Mensajes', desc: 'Buzón de notificaciones.' },
  { href: '/perfil', ico: 'fa-user-gear', txt: 'Mi Perfil', desc: 'Ajustes de cuenta y temas.' },
  { href: '/nuevo', ico: 'fa-pen-to-square', txt: 'Crear Post', desc: 'Escribe artículos del blog.' }
];

export const render = () => {
  const user = wiAuth.user;
  if (!user) return `<div class="z_page"><div class="z_empty"><i class="fas fa-ban"></i> Acceso denegado.</div></div>`;

  const rol = user.rol || 'admin';

  const cardsHtml = CARDS
    .filter(c => {
      const r = RUTAS.find(route => route.path === c.href);
      return r && r.roles && r.roles.includes(rol);
    })
    .map((c, i) => `
      <a href="${c.href}" class="z_card nv_item" data-page="${c.href.slice(1)}" data-search="${c.txt.toLowerCase()} ${c.desc.toLowerCase()}" style="animation-delay: ${i * 0.04}s">
        <div class="z_card_bar"></div>
        <div class="z_card_top">
          <div class="z_card_ico"><i class="fas ${c.ico}"></i></div>
          <div class="z_card_body">
            <h3>${c.txt}</h3>
            <p>${c.desc}</p>
          </div>
          <i class="fas fa-arrow-right z_card_arrow"></i>
        </div>
      </a>
    `)
    .join('');

  return `
    <div class="z_wrap">
      <header class="z_header wi_fadeUp">
        <div class="z_header_txt">
          <div class="z_badge" style="color: var(--Cielo);"><i class="fas fa-terminal"></i> Consola Maestra</div>
          <h1>Consola Admin</h1>
          <p>Control maestro y supervisión técnica global de toda la infraestructura.</p>
        </div>
        <div class="z_search_box">
          <i class="fas fa-search"></i>
          <input type="text" id="zSearchInput" placeholder="Buscar herramienta..." autocomplete="off">
        </div>
      </header>
      
      <div class="z_grid wi_fadeUp" style="animation-delay: 0.1s">
        ${cardsHtml || `<div class="z_empty_grid">No hay herramientas disponibles para tu rol.</div>`}
      </div>
    </div>
  `;
};

export const init = () => {
  const user = wiAuth.user;
  if (!user) return;

  $(document).off('.zmasss').on('input.zmasss', '#zSearchInput', function() {
    const q = $(this).val().toLowerCase().trim();
    if (!q) {
      $('.z_card').show();
      return;
    }
    $('.z_card').each(function() {
      const searchData = $(this).attr('data-search') || '';
      $(this).toggle(searchData.includes(q));
    });
  });

  $('.wi_fadeUp').addClass('visible wi_visible');
  window.__WIREADY__ = true;
};

export const cleanup = () => {
  $(document).off('.zmasss');
};
