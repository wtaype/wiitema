import './login.css';
import $ from 'jquery';
import { auth, db } from '../firebase.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile,
         sendEmailVerification, sendPasswordResetEmail, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { setDoc, getDoc, getDocs, doc, collection, query, where, serverTimestamp, limit } from 'firebase/firestore';
import { wiTip, Mensaje, savels, getls, wiSpin, wiAuth, abrirModal, cerrarTodos } from '../widev.js';
import { rutas, rolPage } from '../rutas.js';
import { app } from '../wii.js';

export { auth, signOut };

// ── CONFIG & ROUTING ─────────────────────────────────────────────────────────
const cfg = { db: 'smiles', pagina: 'rol' };
let modal = 'si', link = 'si', restablecer = 'si', login = 'si', registrar = 'si';


const err = {
  'auth/email-already-in-use':'Email ya registrado', 'auth/weak-password':'Contraseña débil (mín. 6)',
  'auth/invalid-credential':'Contraseña incorrecta', 'auth/invalid-email':'Email no válido',
  'auth/missing-email':'Usuario no registrado',      'auth/too-many-requests':'Demasiados intentos'
};

// ── SANITIZACIÓN & REGLAS ────────────────────────────────────────────────────
const san = {
  name: v => v.replace(/[<>="'`;/\\$}{]/g, '').replace(/\s+/g, ' ').trim(),
  email: v => v.replace(/[<>="'`;/\\$}{ ]/g, '').toLowerCase().trim(),
  user: v => v.toLowerCase().replace(/[^a-z0-9_-]/g, '').trim()
};

const reglas = {
  regEmail:     [san.email, v => /^[\w.-]+@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v) || 'Email inválido'],
  regUsuario:   [san.user,  v => v.length >= 4 || 'Mínimo 4 caracteres'],
  regNombre:    [san.name,  v => v.length > 0 || 'Ingresa tu nombre'],
  regApellidos: [san.name,  v => v.length > 0 || 'Ingresa tus apellidos'],
  regPassword:  [v => v,    v => v.length >= 6 || 'Mínimo 6 caracteres'],
  regPassword1: [v => v,    v => v === $('#regPassword').val() || 'No coinciden']
};

const campo = (ico, tipo, id, place, ojo = false) =>
  `<div class="wilg_grupo"><i class="fas fa-${ico}"></i><input type="${tipo}" id="${id}" placeholder="${place}" autocomplete="off">${ojo ? '<i class="fas fa-eye wilg_ojo"></i>' : ''}</div>`;

const head = (h, p, sm = '') => `<div class="wilg_head"><div class="wilg_logo ${sm ? 'wilg_logo_sm' : ''}"><img src="${import.meta.env.BASE_URL}smile.avif" alt="${app}"></div><h2>${h}</h2><p>${p}</p></div>`;

const btnGoogle = `<button type="button" class="wilg_btn_google" id="btnGoogle"><img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google"> Continuar con Google</button><div class="wilg_or"><span>o usa tu email</span></div>`;

// ── TEMPLATES ────────────────────────────────────────────────────────────────
const tpl = {
  login: () => `${head('Bienvenido', 'Inicia sesión en tu cuenta')}
    ${btnGoogle}
    ${campo('envelope','text','email','Email o usuario')}
    ${campo('lock','password','password','Contraseña',true)}
    <button type="button" id="Login" class="wilg_btn inactivo"><i class="fas fa-sign-in-alt"></i> Iniciar Sesión</button>
    <div class="wilg_links">
      ${restablecer==='si' ? '<span class="wilg_rec"><i class="fas fa-key"></i> ¿Olvidaste tu contraseña?</span>' : ''}
      ${registrar==='si'   ? '<span class="wilg_reg">Crear cuenta <i class="fas fa-arrow-right"></i></span>' : ''}
    </div>`,

  registrar: () => `${head('Crear Cuenta', 'Únete a la comunidad')}
    ${btnGoogle}
    <div class="wilg_grid">
      ${[['envelope','email','regEmail','Email'],['user','text','regUsuario','Usuario'],
         ['user-tie','text','regNombre','Nombre'],['user-tie','text','regApellidos','Apellidos']]
        .map(([i,t,id,p]) => campo(i,t,id,p)).join('')}
      ${campo('lock','password','regPassword','Contraseña',true)}
      ${campo('lock','password','regPassword1','Confirmar contraseña',true)}
    </div>
    <div class="wilg_check"><label><input type="checkbox" id="regTerminos"><span>Acepto los <a href="/terminos" target="_blank">términos y condiciones</a></span></label></div>
    <button type="button" id="Registrar" class="wilg_btn inactivo"><i class="fas fa-user-plus"></i> Registrarme</button>
    <div class="wilg_links"><span class="wilg_log"><i class="fas fa-arrow-left"></i> Ya tengo cuenta</span></div>`,

  restablecer: () => `${head('Recuperar', 'Te enviaremos un enlace a tu email', 'si')}
    ${campo('envelope','text','recEmail','Email o usuario')}
    <button type="button" id="Recuperar" class="wilg_btn"><i class="fas fa-paper-plane"></i> Enviar enlace</button>
    <div class="wilg_links"><span class="wilg_log"><i class="fas fa-arrow-left"></i> Volver</span></div>`,

  username: () => `${head('¡Casi listo!', 'Completa tus datos de acceso')}
    ${campo('user','text','regUsuarioGoogle','Ingresa un usuario (ej: marcos)')}
    <div class="wilg_check" style="margin-top: 1.5vh;"><label><input type="checkbox" id="regTerminosGoogle"><span>Acepto los <a href="/terminos" target="_blank">términos y condiciones</a></span></label></div>
    <button type="button" id="CompletarGoogle" class="wilg_btn inactivo" style="margin-top: 1.5vh;"><i class="fas fa-rocket"></i> Completar Registro</button>`
};

// ── DISPLAY & INITIALIZATION ────────────────────────────────────────────────
const modalHTML = (vista, cls = '') =>
  `<div id="wilg_modal" class="wiModal wilg_mod ${cls}"><div class="modalBody"><button class="modalX">&times;</button><form id="liForm">${tpl[vista]()}</form></div></div>`;

const toggleModal = (vista, isNew = false) => {
  if (isNew) {
    $('#wilg_modal').remove();
    $('body').append(modalHTML(vista, vista === 'registrar' ? 'wilg_mod_reg' : ''));
    abrirModal('wilg_modal');
  } else {
    $('#wilg_modal').toggleClass('wilg_mod_reg', vista === 'registrar').find('#liForm').html(tpl[vista]()).attr('data-vista', vista);
  }
  setTimeout(() => setupFormState(vista), 50);
};

export const render = () => (link !== 'si' || wiAuth.user) ? '' : `<div class="wilg_wrap"><div class="wilg_card"><form id="liForm"></form></div></div>`;

export const init = () => {
  if (link !== 'si') return setTimeout(() => rutas.navigate('/'), 0);
  const wi = wiAuth.user;
  if (wi) return setTimeout(() => rutas.navigate(rolPage[wi.rol] || '/'), 0);
  mostrar('login');
};

const mostrar = v => { $('#liForm').html(tpl[v]()).attr('data-vista', v); setTimeout(() => setupFormState(v), 30); };
const swap = v => esModal() ? toggleModal(v) : mostrar(v);

// ── HELPERS & VALIDATION ENGINE ──────────────────────────────────────────────
const val     = id => $(`#${id}`).val().trim();
const esModal = () => $('#wilg_modal.active').length > 0;
const tema    = t  => { if (!t) return; const [n, c] = t.split('|'); document.documentElement.dataset.theme = n; $('meta[name="theme-color"]').attr('content', c); };

const entrar = wi => {
  wiAuth.login(wi, 7, ['wiSmart']);
  if (wi?.tema) { localStorage.wiTema = wi.tema; tema(wi.tema); }
  if (esModal()) cerrarTodos();
  Mensaje(`<i class="fa-solid fa-hand-wave"></i> Bienvenido ${wi?.nombre || ''}`, 'success');
  setDoc(doc(db, 'smiles', wi.usuario), { ultActividad: serverTimestamp() }, { merge: true }).catch(console.error);
  rutas.navigate(cfg.pagina === 'rol' ? (rolPage[wi?.rol] || '/') : cfg.pagina);
};

const accion  = async (btn, txt, fn) => {
  wiSpin(btn, true, txt);
  try { await fn(); } catch(e) { Mensaje(err[e.code] || e.message, 'error'); }
  finally { wiSpin(btn, false); }
};

const fetchUser = async input => {
  if (input.includes('@')) return { email: input, wi: null };
  const snap = await getDoc(doc(db, 'smiles', input));
  if (!snap.exists()) throw new Error('Usuario no encontrado');
  return { email: snap.data().email, wi: snap.data() };
};

const crearPerfil = (u, email, nom, ape, uid, con, av = '') => ({
  usuario: u, email, nombre: nom, apellidos: ape, rol: 'usuario', activo: true, estado: 'activo', uid, terminos: true, terminosFecha: serverTimestamp(),
  tema: localStorage.wiTema || 'Oro|#FFC107', avatar: av, plan: 'free', segmento: 'general', verificado: false, registradoCon: con,
  limites: { maxDia: 3, maxMeses: 20, actualizado: serverTimestamp() }, ultActividad: serverTimestamp(), creado: serverTimestamp()
});

const setupFormState = v => {
  $('#liForm input:first').focus();
  const list = v === 'username' ? ['regUsuarioGoogle'] : ['regEmail', 'regUsuario', 'regNombre', 'regApellidos', 'regPassword', 'regPassword1'];
  list.forEach(id => {
    const $el = $(`#${id}`);
    $el.val('').data('ok', false);
  });
  if (v === 'registrar') $('#Registrar').addClass('inactivo').prop('disabled', true);
  if (v === 'username') $('#CompletarGoogle').addClass('inactivo').prop('disabled', true);
};

let vTimeout = null;
const checkField = async (el, forzarTip = false) => {
  const id = el.id, value = $(el).val().trim();
  if (!value) return;

  const rule = reglas[id.replace('Google', '')];
  if (rule) {
    const [trans, vld] = rule;
    const v = trans(value); $(el).val(v);
    const r = vld(v);
    if (r !== true) {
      if (forzarTip) {
        wiTip(el, r, 'error', 2500);
        $(el).data('ok', false);
      }
      return;
    }
  }

  let ok = true;
  if (id === 'regEmail') {
    const snap = await getDocs(query(collection(db, 'smiles'), where('email', '==', value), limit(1)));
    ok = snap.empty;
    wiTip(el, ok ? 'Email disponible <i class="fa-solid fa-check-circle"></i>' : 'Email no disponible', ok ? 'success' : 'error', 2500);
  } else if (id === 'regUsuario' || id === 'regUsuarioGoogle') {
    if (value.includes('@')) {
      $(el).data('ok', false);
      if (forzarTip) wiTip(el, 'No puede contener @', 'error', 2500);
      return;
    }
    ok = !(await getDoc(doc(db, 'smiles', value))).exists();
    wiTip(el, ok ? 'Usuario disponible <i class="fa-solid fa-check-circle"></i>' : 'Usuario no disponible', ok ? 'success' : 'error', 2500);
  } else if (id === 'regNombre' || id === 'regApellidos') {
    ok = value.length > 0;
  } else if (id === 'regPassword') {
    ok = value.length >= 6;
  } else if (id === 'regPassword1') {
    const p1 = $('#regPassword').val();
    ok = value.length >= 6 && value === p1;
    if (ok) wiTip(el, 'Contraseñas coinciden <i class="fa-solid fa-check-circle"></i>', 'success', 2500);
    else if (p1 && value !== p1 && forzarTip) wiTip(el, 'No coinciden', 'error', 2500);
  }

  $(el).data('ok', ok);
};

// ── EVENTOS (DELEGACIÓN ÚNICA) ───────────────────────────────────────────────
$(document)
  .on('submit.wi', '#liForm', e => e.preventDefault())
  .on('click.wi', '.wilg_ojo', function () {
    const $i = $(this).siblings('input');
    $i.attr('type', $i.attr('type') === 'password' ? 'text' : 'password');
    $(this).toggleClass('fa-eye fa-eye-slash');
  })
  .on('click.wi', '.wilg_reg', () => swap('registrar'))
  .on('click.wi', '.wilg_rec', () => swap('restablecer'))
  .on('click.wi', '.wilg_log', () => swap('login'))
  .on('focus.wi', '#liForm input', function () {
    const isG = this.id.includes('Google');
    const list = isG ? ['regUsuarioGoogle'] 
                     : ['regEmail', 'regUsuario', 'regNombre', 'regApellidos', 'regPassword', 'regPassword1'];
    const idx = list.indexOf(this.id);
    if (idx <= 0) return;
    for (let i = 0; i < idx; i++) {
      const $prev = $(`#${list[i]}`);
      if (!$prev.data('ok')) {
        $prev.focus();
        break;
      }
    }
  })
  .on('change.wi', '#regTerminos, #regTerminosGoogle', function () {
    const isG = this.id.includes('Google');
    const $btn = $(isG ? '#CompletarGoogle' : '#Registrar');
    const ok = $(this).is(':checked');
    $btn.toggleClass('inactivo', !ok).prop('disabled', !ok);
  })
  .on('keyup.wi', '#liForm input', function(e) {
    if (e.key === 'Enter') {
      $(this).trigger('change');
      if (this.id === 'password') $('#Login').click();
      if (this.id === 'regPassword1' && !$('#Registrar').prop('disabled')) $('#Registrar').click();
      if (this.id === 'recEmail') $('#Recuperar').click();
    }
  })
  .on('input.wi', '#liForm input', function () {
    const el = this, id = el.id, raw = $(el).val();
    const clean = id.includes('Email') || id === 'email' ? raw.replace(/[<>="'`;/\\$}{ ]/g, '').toLowerCase()
                : id.includes('Usuario') ? raw.toLowerCase().replace(/[^a-z0-9_-]/g, '')
                : id.includes('Nombre') || id.includes('Apellidos') ? raw.replace(/[<>="'`;/\\$}{]/g, '') : raw;
    $(el).val(clean);

    if (!$(el).val().trim()) {
      $(el).data('ok', false);
      const isG = id.includes('Google');
      const list = isG ? ['regUsuarioGoogle'] : ['regEmail', 'regUsuario', 'regNombre', 'regApellidos', 'regPassword', 'regPassword1'];
      const idx = list.indexOf(id);
      if (idx !== -1) {
        for (let i = idx + 1; i < list.length; i++) $(`#${list[i]}`).val('').data('ok', false);
        if (!isG) $('#regTerminos').prop('checked', false);
        else $('#regTerminosGoogle').prop('checked', false);
        $('#Registrar, #CompletarGoogle').addClass('inactivo').prop('disabled', true);
      }
      return;
    }

    const rule = reglas[id.replace('Google', '')];
    const ok = !rule || rule[1](rule[0]($(el).val().trim())) === true;
    if (ok) {
      if (vTimeout) clearTimeout(vTimeout);
      vTimeout = setTimeout(() => checkField(el), 400);
    }
  })
  .on('change.wi', '#liForm input', function () {
    checkField(this, true);
  })

  // ── GOOGLE AUTH FLUX ───────────────────────────────────────────────────────
  .on('click.wi', '#btnGoogle', async function () {
    if ($(this).data('busy')) return;
    $(this).data('busy', true);
    const prevHtml = $(this).html();
    $(this).html('<i class="fas fa-circle-notch fa-spin"></i> Conectando...');
    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      const user = res.user;
      const userDocs = await getDocs(query(collection(db, 'smiles'), where('uid', '==', user.uid), limit(1)));
      if (!userDocs.empty) {
        const wi = userDocs.docs[0].data();
        if (wi.estado === 'pendiente') {
          await signOut(auth);
          if (esModal()) cerrarTodos();
          return rutas.navigate('/registrado');
        }
        entrar(wi);
      } else {
        window.wiTempGoogleUser = user;
        toggleModal('username');
      }
    } catch (e) {
      if (e.code !== 'auth/popup-closed-by-user' && e.code !== 'auth/cancelled-popup-request') Mensaje(err[e.code] || e.message, 'error');
      $(this).html(prevHtml).data('busy', false);
    }
  })

  .on('click.wi', '#CompletarGoogle', async function () {
    if ($(this).data('busy')) return;
    if (!$('#regTerminosGoogle').is(':checked')) return wiTip($('#regTerminosGoogle')[0], 'Acepta los términos', 'error', 2500);
    const u = val('regUsuarioGoogle');
    if (!u || !$('#regUsuarioGoogle').data('ok')) return wiTip($('#regUsuarioGoogle')[0], 'Verifica el usuario', 'error', 2500);
    const user = window.wiTempGoogleUser;
    if (!user) return Mensaje('Error de sesión con Google. Intenta de nuevo.', 'error');

    $(this).data('busy', true);
    await accion(this, 'Finalizando', async () => {
      const partes = user.displayName ? user.displayName.split(' ') : ['Usuario',''];
      const wi = crearPerfil(u, user.email, partes[0], partes.slice(1).join(' '), user.uid, 'google', user.photoURL || '');
      await setDoc(doc(db, 'smiles', u), wi);
      entrar(wi);
    });
    $(this).data('busy', false);
  })

  // ── LOGIN ──────────────────────────────────────────────────────────────────
  .on('click.wi', '#Login', async function () {
    await accion(this, 'Iniciando', async () => {
      const input = val('email'), pass = val('password');
      const { email, wi: wiPre } = await fetchUser(input);
      await signInWithEmailAndPassword(auth, email, pass);
      const wi = wiPre ?? (await getDoc(doc(db, 'smiles', auth.currentUser.displayName || input))).data();
      if (wi?.estado === 'pendiente') {
        await signOut(auth);
        if (esModal()) cerrarTodos();
        return rutas.navigate('/registrado');
      }
      entrar(wi);
    });
  })

  // ── REGISTRO ───────────────────────────────────────────────────────────────
  .on('click.wi', '#Registrar', async function () {
    if ($(this).data('busy')) return;
    const chk = [
      [!$('#regTerminos').is(':checked'), '#regTerminos', 'Acepta los términos'],
      [!$('#regUsuario').data('ok'),      '#regUsuario',  'Verifica el usuario'],
      [!$('#regEmail').data('ok'),        '#regEmail',    'Verifica el email']
    ];
    const fallo = chk.find(([c]) => c);
    if (fallo) return wiTip($(fallo[1])[0], fallo[2], 'error', 2500);

    $(this).data('busy', true);
    await accion(this, 'Registrando', async () => {
      const d = { email: val('regEmail'), usuario: val('regUsuario'), nombre: val('regNombre'), apellidos: val('regApellidos'), password: val('regPassword') };
      const { user } = await createUserWithEmailAndPassword(auth, d.email, d.password);
      await Promise.all([updateProfile(user, { displayName: d.usuario }), sendEmailVerification(user)]);
      const wi = crearPerfil(d.usuario, d.email, d.nombre, d.apellidos, user.uid, 'correo');
      await setDoc(doc(db, 'smiles', d.usuario), wi);
      entrar(wi);
    });
    $(this).data('busy', false);
  })

  // ── RESTABLECER ────────────────────────────────────────────────────────────
  .on('click.wi', '#Recuperar', async function () {
    const emailVal = val('recEmail');
    if (!emailVal) return wiTip(this, 'Ingresa tu email o usuario', 'error', 2500);
    await accion(this, 'Enviando', async () => {
      const { email } = await fetchUser(emailVal);
      await sendPasswordResetEmail(auth, email);
      Mensaje('<i class="fa-solid fa-check-circle"></i> Email enviado, revisa tu bandeja', 'success');
      setTimeout(() => swap('login'), 2000);
    });
  })
  .on('click.wi', '.tema', async function () {
    const wi = getls('wiSmile'); if (!wi?.usuario) return;
    setTimeout(async () => {
      const t = localStorage.wiTema; if (!t) return;
      try {
        await setDoc(doc(db, 'smiles', wi.usuario), { tema: t, actualizado: serverTimestamp() }, { merge: true });
        savels('wiSmile', { ...wi, tema: t }, 7);
        Mensaje(`Tema ${t.split('|')[0]} guardado <i class="fas fa-check-circle"></i>`, 'success');
      } catch (e) { console.error('tema:', e); }
    }, 0);
  });

// ── AUTH MODAL ───────────────────────────────────────────────────────────────
export const abrirLogin = (tipo = 'login') => {
  if (modal === 'si') toggleModal(tipo === 'registrar' && registrar === 'si' ? 'registrar' : 'login', true);
  else rutas.navigate('/login');
};

export const salir = async (keep = []) => {
  sessionStorage.removeItem('vault_unlocked');
  try { await signOut(auth); } catch(e) { console.error('signOut:', e); }
  wiAuth.logout(keep);
};

export const cleanup = () => { $(document).off('.wi'); };