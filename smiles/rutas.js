import $ from 'jquery';
import { app, titulo, descri, keywii, linkweb } from './wii.js';
import { Notificacion, wiPath, wiFade } from './widev.js';
import * as inicioMod from './todos/inicio.js';

// ── NAV COMUN — rutas compartidas entre todos los roles ────────────────────────
const COMUN = [
  // { href: '/acerca', page: 'acerca', ico: 'fa-circle-info', txt: 'Acerca' }
];

// ── NAV — Config visual por rol (nvleft = izquierda, nvright = derecha) ────────
export const NAV = {
  todos: {
    nvleft:  [
      { href: '/', page: 'inicio', ico: 'fa-house', txt: 'Bienvenido' },
      { href: '/colores', page: 'colores', ico: 'fa-palette', txt: 'Colores' },
      { href: '/fonts', page: 'fonts', ico: 'fa-font', txt: 'Fonts' },
      { href: '/gradient', page: 'gradient', ico: 'fa-circle-half-stroke', txt: 'Gradientes' },
      { href: '/iconos', page: 'iconos', ico: 'fa-icons', txt: 'Iconos' },
      { href: '/svg', page: 'svg', ico: 'fa-image', txt: 'SVG' },
      { href: '/smart', page: 'smart', ico: 'fa-wand-magic-sparkles', txt: 'Smart' },
      { href: '/emojis', page: 'emojis', ico: 'fa-face-smile', txt: 'Emojis' },
      { href: '/tools', page: 'tools', ico: 'fa-hammer', txt: 'Tools' },
       ...COMUN],
    nvright: [
      { isBtn: true, cls: 'bt_auth registrar', ico: 'fa-user-plus', txt: 'Registrar' },
      { isBtn: true, cls: 'bt_auth login',     ico: 'fa-sign-in-alt', txt: 'Login'  },
    ],
  },
  smile: {
    nvleft: [
      { href: '/smile',    page: 'smile',    ico: 'fa-house',            txt: 'Dashboard' },
      { href: '/crear',    page: 'crear',    ico: 'fa-plus-circle',      txt: 'Mis Linkwiis' },
      { href: '/agregar',  page: 'agregar',  ico: 'fa-folder-plus',      txt: 'Mis Recursos' },
      { href: '/win',      page: 'win',      ico: 'fa-file-shield',      txt: 'wiWin Cloud' },
      { href: '/word',     page: 'word',     ico: 'fa-file-lines',       txt: 'Word Editor' },
      { href: '/notas',    page: 'notas',    ico: 'fa-book',             txt: 'Notas Book' },
      { href: '/chat',     page: 'chat',     ico: 'fa-comments',         txt: 'Chat Grupal' },
      ...COMUN,
    ],
    nvright: [
      { isPerfil: true }, { isSalir: true },
    ],
  },
  gestor: {
    nvleft: [
      { href: '/gestor',   page: 'gestor',   ico: 'fa-house',            txt: 'Dashboard'    },
      { href: '/crear',    page: 'crear',    ico: 'fa-plus-circle',      txt: 'Mis Linkwiis' },
      { href: '/agregar',  page: 'agregar',  ico: 'fa-folder-plus',      txt: 'Mis Recursos' },
      { href: '/win',      page: 'win',      ico: 'fa-file-shield',      txt: 'wiWin Cloud' },
      { href: '/word',     page: 'word',     ico: 'fa-file-lines',       txt: 'Word Editor' },
      { href: '/chat',     page: 'chat',     ico: 'fa-comments',         txt: 'Chat Grupal' },
      ...COMUN,
    ],
    nvright: [
      { isPerfil: true }, { isSalir: true },
    ],
  },
  admin: {
    nvleft: [
      { href: '/admin',    page: 'admin',    ico: 'fa-globe',            txt: 'Plataforma' },
      { href: '/usuarios', page: 'usuarios', ico: 'fa-users',            txt: 'Usuarios'   },
      { href: '/sistema',  page: 'sistema',  ico: 'fa-cogs',             txt: 'Sistema'    },
      { href: '/chat',     page: 'chat',     ico: 'fa-comments',         txt: 'Chat Grupal' },
    ],
    nvright: [
      { href: '/word',     page: 'word',     ico: 'fa-file-lines',       txt: 'Word Editor' },
      { href: '/nuevo',    page: 'nuevo',    ico: 'fa-plus',             txt: 'Crear Post' },
      { href: '/notas',    page: 'notas',    ico: 'fa-book',             txt: 'Book Notas' },
      { isPerfil: true }, { isSalir: true },
    ],
  },
  verificar: {
    nvleft:  [],
    nvright: [],
  },
};

// ── RUTAS — Fuente única de verdad - roles: null = público · ['rol',...] = protegido · area = carpeta del módulo ───────────────────────────────────────────────
export const RUTAS = [
  // ── Core público ───────────────────────────────────────────────
  { path: '/inicio',   area: 'todos/' },
  { path: '/login',    area: 'todos/' },
  { path: '/colores',   area: 'todos/' },
  { path: '/fonts',   area: 'todos/' },
  { path: '/iconos',   area: 'todos/' },
  { path: '/emojis',   area: 'todos/' },
  { path: '/svg',   area: 'todos/' },
  { path: '/smart',   area: 'todos/' },
  { path: '/tools',   area: 'todos/' },
  { path: '/gradient',   area: 'todos/' },
  { path: '/registrado',   area: 'todos/' },

  // ── Submódulos públicos ───────────────────────────────────────────────
  { path: '/blog',     area: 'todos/blog/' },
  { path: '/post',     area: 'todos/blog/'    }, 
  { path: '/chatwil',  area: 'todos/chatwil/' },

  // ── Acerca / Legales / Info ───────────────────────────────────────────────
  { path: '/acerca',     area: 'todos/acerca/' },
  { path: '/descubre',   area: 'todos/acerca/' },
  { path: '/terminos',   area: 'todos/acerca/' },
  { path: '/cookies',    area: 'todos/acerca/' },
  { path: '/privacidad', area: 'todos/acerca/' },
  { path: '/feedback',   area: 'todos/acerca/' },
  { path: '/contacto',   area: 'todos/acerca/' },

  // ── Autenticadas (colaborador / smile) ───────────────────────────────────────────────
  { path: '/agregar',  area: 'smile/', roles: ['smile','gestor','admin'] },
  { path: '/smile',    area: 'smile/', roles: ['smile','gestor','admin'] },
  { path: '/crear',    area: 'smile/', roles: ['smile','gestor','admin'] },
  { path: '/win',      area: 'smile/', roles: ['smile','gestor','admin'] },
  { path: '/notas',    area: 'smile/', roles: ['smile','gestor','admin'] },
  { path: '/perfil',   area: 'smile/', roles: ['smile','gestor','admin'] },
  { path: '/mensajes', area: 'smile/', roles: ['smile','gestor','admin'] },
  { path: '/word',     area: 'smile/', roles: ['smile','gestor','admin'] },
  { path: '/chat',     area: 'smile/', roles: ['smile','gestor','admin'] },
  { path: '/nuevo',    area: 'todos/blog/', roles: ['smile','gestor','admin'] },

  // ── Autenticadas (roles superiores / gestor & admin) ───────────────────────────────────────────────
  { path: '/gestor',   area: 'gestor/',  roles: ['gestor','admin'] },
  { path: '/admin',    area: 'admin/',   roles: ['admin']          },
  { path: '/usuarios', area: 'admin/',   roles: ['admin']          },
  { path: '/sistema',  area: 'admin/',   roles: ['admin']          },
  { path: '/verificar',area: 'verificar/',roles: ['admin']          },
];

// ── GLOB — Vite mapea todos los módulos en build time ───────────────────────────────────────────────
const MODS = import.meta.glob([
  './{todos,smile,gestor,admin,verificar}/**/*.js',
  '!./todos/inicio.js',
  '!./todos/chatwil/head/**/*.js',
  '!./todos/chatwil/memoria.js',
  '!./todos/chatwil/brain.js',
  '!./todos/blog/devblog.js',
  '!./todos/blog/wiad.js'
]);
const rutasMod = (area, page) => MODS[`./${area}${page}.js`];

// ── MOTOR ──────────────────────────────────────────────────────────────────────
class WiRutas {
  constructor() {
    this.rutas     = {};               // funciones lazy originales — nunca se sobreescriben
    this.cache     = { '/inicio': inicioMod }; // inicio eagerly bundled, cero red
    this.modActual = null;
    this.cargand   = false;
    this.HOME      = 'inicio';
    this.main      = '#wimain';
    this.pathActual = null;
    this.isFirstLoad = true;
  }

  register(path, fn) { this.rutas[path] = fn; }
  inicio() { return Promise.resolve(inicioMod); }

  registerAll(getRol) {
    const pub = {}, priv = {};

    RUTAS.forEach(({ path, area, roles = null, mod }) => {
      if (path === '/inicio') {
        pub[path] = () => this.inicio();
        return;
      }
      const page = mod ?? path.split('/').pop();
      const imp  = rutasMod(area, page);
      if (!imp) { console.warn(`[ruta] no encontrado: ${area}${page}.js`); return; }
      roles === null ? (pub[path] = imp) : (priv[path] ??= []).push({ roles, imp });
    });

    const noAuth = () => Promise.resolve({
      render: () => '',
      init:   () => setTimeout(() => this.navigate('/login'), 0),
    });

    new Set([...Object.keys(pub), ...Object.keys(priv)]).forEach(path => {
      const pubImp   = pub[path];
      const privList = priv[path] || [];
      const resolve  = () => { const rol = getRol?.() || null; return privList.find(e => e.roles.includes(rol)); };

      if (!privList.length)  return this.register(path, pubImp);
      if (!pubImp)           return this.register(path, () => { const e = resolve(); return e ? e.imp() : noAuth(); });
      this.register(path, () => { const e = resolve(); return e ? e.imp() : pubImp(); });
    });
  }

  // ── PREFETCH: descarga el módulo al hacer hover, sin bloquear nada ───────────
  async prefetch(ruta) {
    const norm = wiPath.limpiar(ruta) === '/' ? `/${this.HOME}` : wiPath.limpiar(ruta);
    if (this.cache[norm] || !this.rutas[norm]) return;   // ya listo o no existe
    try {
      this.cache[norm] = await this.rutas[norm]();
      console.log(`⚡ Listo ${norm.replace('/', '')}`);
    } catch { console.warn('[ruta] prefetch falló:', norm); }
  }

  // ── NAVIGATE: si ya está en cache, carga instantánea ─────────────────────────
  async navigate(ruta, historial = true) {
    if (this.cargand) return;
    this.cargand = true;
    const norm = wiPath.limpiar(ruta) === '/' ? `/${this.HOME}` : wiPath.limpiar(ruta);

    // ── GUARD ADMIN ───────────────────────────────────────────────────────────
    if (['/admin','/usuarios','/sistema'].includes(norm)) {
      const { getls } = await import('./widev.js');
      const wi = getls('wiSmile'), go = r => (this.cargand = false, this.navigate(r, true));
      const dest = !wi || wi.rol !== 'admin' ? '/' : wi.estado !== 'activo' ? '/registrado' : !sessionStorage.getItem('vault_unlocked') ? '/verificar' : null;
      if (dest) return go(dest);
    }

    try {
      this.modActual?.cleanup?.();
      const slug = !this.rutas[norm] ? norm.slice(1) : null;
      const cargar  = slug ? rutasMod('todos/blog/', 'post') : (this.rutas[norm] ?? rutasMod('todos/', '404'));
      const mod = this.cache[norm] ?? await cargar();
      if (!slug) this.cache[norm] = mod;

      const [html] = await Promise.all([mod.render(slug)]);
      
      document.body.classList.remove('is-public-profile');
      this.marcarNav(norm);
      window.dispatchEvent(new CustomEvent('winavigate', { detail: { norm } }));

      // Hydration: Solo preservar contenido prerenderizado si la ruta ES la del inicio
      // (el index.html genérico solo tiene prerender del inicio; en otras rutas siempre inyectar)
      const esHydration = this.isFirstLoad
        && $(this.main).children().length > 0
        && !window.__WIREADY__
        && norm === `/${this.HOME}`;
      if (esHydration) {
        this.isFirstLoad = false;
      } else {
        await wiFade(this.main, html);
      }
      this.isFirstLoad = false;

      window.scrollTo(0, 0);


      mod.init?.(slug);

      if (historial) wiPath.poner(norm === `/${this.HOME}` ? '/' : norm, document.title);
      this.pathActual = norm;
      this.modActual = mod;
    } catch (err) {
      if (err instanceof TypeError && err.message.includes('Failed to fetch')) return location.reload();
      Notificacion('Error en la ruta');
      console.error('[ruta] navigate:', err);
    } finally {
      this.cargand = false;
    }
  }

  marcarNav(norm) {
    const pag = norm.slice(1) || this.HOME;
    $('.nv_item').removeClass('active');
    $(`.nv_item[data-page="${pag}"]`).addClass('active');
  }

  init() {
    this.marcarNav(wiPath.actual === '/' ? `/${this.HOME}` : wiPath.limpiar(wiPath.actual));

    $(document)
      .on('click', '.nv_item', (e) => {
        e.preventDefault();
        const pag = $(e.currentTarget).data('page');
        this.navigate(pag === this.HOME ? '/' : `/${pag}`);
      })
      .on('mouseenter touchstart', '.nv_item[data-page]', (e) => {
        const pag = $(e.currentTarget).data('page');
        this.prefetch(pag === this.HOME ? '/' : `/${pag}`);
      });

    window.addEventListener('popstate', (e) => {
      const ruta = e.state?.ruta || wiPath.actual;
      const norm = wiPath.limpiar(ruta) === '/' ? `/${this.HOME}` : wiPath.limpiar(ruta);
      if (norm === this.pathActual) return;
      this.navigate(ruta, false);
    });
    this.navigate(wiPath.actual, false);
  }
}

export const rutas = new WiRutas();
