import './colores.css';
import './emojis.css';
import $ from 'jquery';
import { Notificacion, getls, savels, wiTip, Saludar } from '../widev.js';
import { app } from '../wii.js';

/* ══════════════════════════════════════════════════════════════
   EMOJIS v2.0 — Selector de Emojis + Marketing Notepad & Chat
   ✨ WhatsApp & Discord Speech Previews · Emoji Bursts Particle
   ══════════════════════════════════════════════════════════════ */

const CACHE_NOTEPAD = 'wii_emojis_notepad';
const CACHE_RECIENTES = 'wii_emojis_recientes';

// Categorías de emojis
const CATEGORIAS = {
  recientes: { icon: 'fa-clock', label: 'Recientes' },
  caras: { icon: 'fa-smile', label: 'Caras' },
  corazones: { icon: 'fa-heart', label: 'Corazones' },
  manos: { icon: 'fa-hand', label: 'Manos' },
  animales: { icon: 'fa-paw', label: 'Animales' },
  comida: { icon: 'fa-hamburger', label: 'Comida' },
  objetos: { icon: 'fa-lightbulb', label: 'Objetos' },
  simbolos: { icon: 'fa-star', label: 'Símbolos' },
  banderas: { icon: 'fa-flag', label: 'Banderas' }
};

// Base de datos de emojis
const EMOJIS = {
  caras: [
    '😀','😃','😄','😁','😆','😅','🤣','😂','🙂','🙃','😉','😊','😇','🥰','😍','🤩',
    '😘','😗','☺️','😚','😙','😙','😋','😛','😜','🤪','😝','🤑','🤗','🤭','🤫','🤔',
    '🤐','🤨','😐','😑','😶','😏','😒','🙄','😬','🤥','😌','😔','😪','🤤','😴','😷',
    '🤒','🤕','🤢','🤮','🤧','🥵','🥶','🥴','😵','🤯','🤠','🥳','🥸','😎','🤓','🧐',
    '😕','😟','🙁','☹️','😮','😯','😲','😳','🥺','😦','😧','😨','😰','😥','😢','😭',
    '😱','😖','😣','😞','😓','😩','😫','🥱','😤','😡','😠','🤬','😈','👿','💀','☠️',
    '💩','🤡','👹','👺','👻','👽','👾','🤖','😺','😸','😹','😻','😼','😽','🙀','😿','😾'
  ],
  corazones: [
    '❤️','🧡','💛','💚','💙','💜','🖤','🤍','🤎','💔','❣️','💕','💞','💓','💗','💖',
    '💘','💝','💟','♥️','🫀','❤️‍🔥','❤️‍🩹','🩷','🩵','🩶','💌','💋','👄','🫦','💑','👩‍❤️‍👨',
    '👨‍❤️‍👨','👩‍❤️‍👩','💏','👩‍❤️‍💋‍👨','👨‍❤️‍💋‍👨','👩‍❤️‍💋‍👩','🥰','😍','😘','😻','💐','🌹','🥀','🌷','🌸','💮'
  ],
  manos: [
    '👋','🤚','🖐️','✋','🖖','👌','🤌','🤏','✌️','🤞','🤟','🤘','🤙','👈','👉','👆',
    '🖕','👇','☝️','👍','👎','✊','👊','🤛','🤜','👏','🙌','👐','🤲','🤝','🙏','✍️',
    '💅','🤳','💪','🦾','🦿','🦵','🦶','👂','🦻','👃','🧠','🫀','🫁','🦷','🦴','👀',
    '👁️','👅','👄','🫦','💋','👶','🧒','👦','👧','🧑','👱','👨','🧔','👩','🧓','👴','👵'
  ],
  animales: [
    '🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐨','🐯','🦁','🐮','🐷','🐽','🐸',
    '🐵','🙈','🙉','🙊','🐒','🐔','🐧','🐦','🐤','🐣','🐥','🦆','🦅','🦉','🦇','🐺',
    '🐗','🐴','🦄','🐝','🐛','🦋','🐌','🐞','🐜','🕷️','🦂','🐢','🐍','🦎','🦖','🦕',
    ' Octopus','🐙','🦑','🦐','🦞','🦀','🐡','🐠','🐟','🐬','🐳','🐋','🦈','🐊','🐅','🐆','🦓'
  ],
  comida: [
    '🍏','🍎','🍐','🍊','🍋','🍌','🍉','🍇','🍓','🫐','🍈','🍒','🍑','🥭','🍍','🥥',
    '🥝','🍅','🍆','🥑','🥦','🥬','🥒','🌶️','🫑','🌽','🥕','🫒','🧄','🧅','🥔','🍠',
    '🥐','🥯','🍞','🥖','🥨','🧀','🥚','🍳','🧈','🥞','🧇','🥓','🥩','🍗','🍖','🦴',
    '🌭','🍔','🍟','🍕','🥪','🥙','🌮','🌯','🥗','🥘','🍝','🍜','🍲','🍛','🍣','🍱'
  ],
  objetos: [
    '📱','💻','⌨️','🖥️','🖨️','🖱️','🖲️','💽','💾','💿','📀','📼','📷','📸','📹','🎥',
    '📽️','🎞️','📞','☎️','📟','📠','📺','📻','🎙️','🎚️','🎛️','🧭','⏱️','⏲️','⏰','🕰️',
    '⌛','⏳','📡','🔋','🔌','💡','🔦','🕯️','🧯','🛢️','💸','💵','💴','💶','💷','🪙',
    '💰','💳','💎','⚖️','🧰','🔧','🔨','⚒️','🛠️','⛏️','🪚','🔩','⚙️','🪤','🧱','⛓️'
  ],
  simbolos: [
    '⭐','🌟','✨','💫','⚡','🔥','💥','☀️','🌙','🌈','☁️','❄️','💧','🌊','🎯','🏆',
    '🥇','🥈','🥉','🏅','🎗️','🎪','🎭','🎨','🎬','🎤','🎧','🎼','🎹','🥁','🎷','🎸',
    '🎲','♟️','🎯','🎳','🎮','🕹️','🎰','🧩','♠️','♥️','♦️','♣️','🃏','🔮','✅','❌'
  ],
  banderas: [
    '🏳️','🏴','🏁','🚩','🏳️‍🌈','🏳️‍⚧️','🇦🇷','🇧🇴','🇧🇷','🇨🇱','🇨🇴','🇨🇷','🇨🇺','🇩🇴','🇪🇨','🇸🇻',
    '🇬🇹','🇭🇳','🇲🇽','🇳🇮','🇵🇦','🇵🇾','🇵🇪','🇵🇷','🇺🇾','🇻🇪','🇪🇸','🇺🇸','🇬🇧','🇫🇷','🇩🇪','🇮🇹'
  ]
};

// Plantillas de Marketing Curadas
const MARKETING_TEMPLATES = {
  oferta: {
    title: '🎉 Super Oferta',
    text: '🔥 ¡SÚPER OFERTA EXCLUSIVA! 🔥\n\nHola [Nombre] 👋, tenemos una sorpresa especial para ti hoy. 🎁\n\n🚀 *50% DE DESCUENTO* en toda nuestra tienda.\n⏰ Válido solo por las próximas *24 horas*.\n\n👇 ¡Haz clic aquí para reclamar tu descuento! 👇\n[Enlace]'
  },
  saludo: {
    title: '💬 Bienvenida',
    text: '✨ ¡Bienvenido a nuestra comunidad! ✨\n\nEstamos muy felices de tenerte aquí con nosotros. 🤗\n\nAquí tienes tus primeros pasos:\n1️⃣ Revisa nuestro catálogo 📚\n2️⃣ Elige tus favoritos ⭐\n3️⃣ ¡Usa el código *BIENVENIDA* para un regalo sorpresa! 🎁'
  },
  recordatorio: {
    title: '⏰ Recordatorio',
    text: '⚠️ ¡ÚLTIMO LLAMADO! ⚠️\n\nHola, te recordamos que tu carrito está esperando por ti. 🛒\n\n¡No dejes pasar esta oportunidad! 🚀 Tu cupón de descuento expira pronto. ⏰\n\n👉 Regresa ahora y finaliza tu compra: [Enlace]'
  },
  soporte: {
    title: '🛠️ Soporte',
    text: '👋 Hola, ¿cómo podemos ayudarte hoy?\n\nNuestro equipo de soporte técnico está activo y listo para resolver cualquier duda. ⚡\n\nEscríbenos tu consulta y te responderemos en minutos. 👨‍💻'
  }
};

// State
let categoriaActual = 'caras';
let recientes = [];
let previewType = 'whatsapp';

const wi = () => getls('wiSmile') || {};

// Utils
const _getRecientes = () => {
  try {
    return JSON.parse(localStorage.getItem(CACHE_RECIENTES) || '[]');
  } catch { return []; }
};

const _saveRecientes = (arr) => {
  localStorage.setItem(CACHE_RECIENTES, JSON.stringify(arr.slice(0, 32)));
};

const _addReciente = (emoji) => {
  recientes = _getRecientes();
  recientes = recientes.filter(e => e !== emoji);
  recientes.unshift(emoji);
  recientes = recientes.slice(0, 32);
  _saveRecientes(recientes);
};

const _getNotepad = () => localStorage.getItem(CACHE_NOTEPAD) || '';
const _saveNotepad = (txt) => localStorage.setItem(CACHE_NOTEPAD, txt);

// Copiar al portapapeles
const _copiar = async (texto) => {
  try {
    await navigator.clipboard.writeText(texto);
    return true;
  } catch {
    const ta = document.createElement('textarea');
    ta.value = texto;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    return true;
  }
};

// Partículas de Emojis Explosivos
const _createEmojiBurst = (emoji, x, y) => {
  const container = $('body');
  for (let i = 0; i < 8; i++) {
    const tx = (Math.random() * 160 - 80);
    const ty = (Math.random() * -180 - 60);
    const rot = (Math.random() * 720 - 360);
    const size = (Math.random() * 10 + 18);
    const particle = $('<span class="em_particle"></span>')
      .text(emoji)
      .css({
        left: x + 'px',
        top: y + 'px',
        fontSize: size + 'px',
        '--tx': `${tx}px`,
        '--ty': `${ty}px`,
        '--rot': `${rot}deg`
      });
    container.append(particle);
    setTimeout(() => particle.remove(), 1000);
  }
};

// Formateadores Live WhatsApp & Discord
const _formatWhatsAppText = (txt) => {
  if (!txt) return 'Tu mensaje se mostrará aquí... 😊';
  let formatted = txt
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br>')
    .replace(/\*(.*?)\*/g, '<strong>$1</strong>')
    .replace(/_(.*?)_/g, '<em>$1</em>')
    .replace(/~(.*?)~/g, '<del>$1</del>');
  return formatted;
};

const _formatDiscordText = (txt) => {
  if (!txt) return 'Tu mensaje se mostrará aquí... 😊';
  let formatted = txt
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/__(.*?)__/g, '<u>$1</u>')
    .replace(/~~(.*?)~~/g, '<del>$1</del>')
    .replace(/`([^`]+)`/g, '<code class="em_discord_code">$1</code>');
  return formatted;
};

const _updateChatPreviews = () => {
  const rawTxt = $('#emTextarea').val();
  
  // WhatsApp
  $('#em_whatsapp_bubble_text').html(_formatWhatsAppText(rawTxt));
  
  // Discord
  $('#em_discord_text').html(_formatDiscordText(rawTxt));
  
  // Time update
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  $('#em_whatsapp_time').text(timeStr);
  $('#em_discord_time').text(`Hoy a las ${timeStr}`);
};

const _updateCharCount = () => {
  const len = $('#emTextarea').val().length;
  $('#em_char_count').text(`${len} caracteres`);
};

// Render Emojis Grid
const _renderEmojis = (filtro = '') => {
  let emojis = [];
  
  if (categoriaActual === 'recientes') {
    emojis = _getRecientes();
  } else {
    emojis = EMOJIS[categoriaActual] || [];
  }
  
  if (filtro) {
    const allEmojis = Object.values(EMOJIS).flat();
    emojis = allEmojis.filter(e => e.includes(filtro));
  }
  
  const $grid = $('.em_grid');
  if (emojis.length === 0) {
    $grid.html('<div class="em_empty">No hay emojis disponibles</div>');
    return;
  }
  
  $grid.html(emojis.map(e => `
    <button class="em_emoji" data-emoji="${e}">
      ${e}
    </button>
  `).join(''));
};

// Render Principal
export const render = () => {
  const u = wi();
  const display = u.nombre || u.usuario || u.email || '';
  recientes = _getRecientes();

  return `
  <div class="mwb" style="animation: wi_fadeUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;">
    <div style="margin-top: 4vh; text-align: center; margin-bottom: 2vh;">
      <h2 style="font-size: var(--fz_x1); font-weight: 900; color: var(--tx1);">
        Emoji Workbench & Notepad Pro 🎭
      </h2>
    </div>

    <!-- Header Block -->
    <div class="input_tabs" style="margin: 2vh auto 4vh; padding: 0.8vh; border-radius: 1.5vh; background: var(--bg5); border: 1px solid var(--brd); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 2vh;">
      <div style="display: flex; align-items: center; gap: 1.5vh; margin-left: 1vh;">
        <img src="/smile.avif" alt="${app}" style="width: 4vh; height: 4vh; border-radius: 50%; box-shadow: var(--bs_m);" />
        <div style="text-align: left;">
          <span style="font-size: 11px; font-weight: 700; color: var(--tx3); text-transform: uppercase;">Premium Emoji Suite</span>
          <p style="margin: 0; font-size: var(--fz_s3); color: var(--tx1); font-weight: 800;">${Saludar()} <strong>${display}</strong></p>
        </div>
      </div>
      
      <div style="display: flex; gap: 1vh; margin-right: 1vh;">
        <button class="bt_auth" id="emCopiarTodo" style="padding: 1vh 2vh; font-size: var(--fz_s3); font-weight: 800; background: var(--mco); color: #fff; border: none; display: flex; align-items: center; gap: 8px;" data-witip="Copiar todo el notepad al portapapeles"><i class="fas fa-copy"></i> Copiar Todo</button>
        <button class="bt_auth" id="emLimpiar" style="padding: 1vh 2vh; font-size: var(--fz_s3); font-weight: 800; background: var(--bg5); border: 1px solid var(--brd); display: flex; align-items: center; gap: 8px;" data-witip="Limpiar notepad por completo"><i class="fas fa-trash"></i> Limpiar</button>
      </div>
    </div>

    <!-- MAIN GRID LAYOUT -->
    <div class="em_grid_layout">
      
      <!-- COL 1: NOTEPAD & TEMPLATES (32%) -->
      <div class="em_column_notepad">
        
        <!-- Notepad Card -->
        <div class="lab_card" style="margin-bottom: 3vh;">
          <div class="em_notepad_header">
            <h3 class="lab_card_title"><i class="fas fa-keyboard"></i> Bloc de Notas</h3>
            <span class="em_char_count" id="em_char_count">0 caracteres</span>
          </div>
          <textarea class="em_textarea" id="emTextarea" placeholder="Escribe tu mensaje... Los emojis se insertarán en tu cursor 🚀">${_getNotepad()}</textarea>
          <div class="em_notepad_foot" style="margin-top: 1.5vh; display: flex; gap: 1vh;">
            <button class="bt_auth" id="emInsertarEnter" style="flex: 1; padding: 0.8vh 1.2vh; font-size: 11px; background: var(--bg5); border: 1px solid var(--brd);"><i class="fas fa-level-down-alt"></i> Salto</button>
            <button class="bt_auth" id="emCopiarTexto" style="flex: 1; padding: 0.8vh 1.2vh; font-size: 11px; background: var(--bg5); border: 1px solid var(--brd);"><i class="fas fa-clipboard"></i> Copiar</button>
          </div>
        </div>

        <!-- Marketing Templates Card -->
        <div class="lab_card">
          <h3 class="lab_card_title"><i class="fas fa-bullhorn"></i> Plantillas de Marketing</h3>
          <p class="lab_desc">Mensajes formateados listos para potenciar tus ventas y notificaciones.</p>
          <div class="em_templates_list">
            ${Object.entries(MARKETING_TEMPLATES).map(([key, t]) => `
              <button class="em_template_btn" data-key="${key}">
                <span>${t.title}</span>
                <i class="fas fa-arrow-right"></i>
              </button>
            `).join('')}
          </div>
        </div>

      </div>

      <!-- COL 2: PREVISUALIZADORES DE CHAT (33%) -->
      <div class="em_column_previews">
        
        <div class="lab_card" style="height: 100%; display: flex; flex-direction: column;">
          <h3 class="lab_card_title"><i class="fas fa-eye"></i> Previsualización Chat</h3>
          <p class="lab_desc">Mira cómo lucirá tu mensaje en las plataformas de mensajería más populares.</p>
          
          <!-- Tabs para cambiar previsualizador -->
          <div class="input_tabs" style="background: var(--bg5); padding: 4px; border-radius: 1vh; display: flex; gap: 0.5vh; margin-bottom: 2.5vh;">
            <button class="tab_btn active em_preview_tab" data-preview-type="whatsapp" style="flex: 1; font-size: 12px; padding: 0.8vh;"><i class="fab fa-whatsapp"></i> WhatsApp</button>
            <button class="tab_btn em_preview_tab" data-preview-type="discord" style="flex: 1; font-size: 12px; padding: 0.8vh;"><i class="fab fa-discord"></i> Discord</button>
          </div>

          <div style="flex: 1; display: flex; flex-direction: column; justify-content: center;">
            
            <!-- WhatsApp Previewer Screen -->
            <div class="em_chat_screen em_screen_whatsapp" id="em_screen_whatsapp">
              <div class="em_whatsapp_bubble_wrap">
                <div class="em_whatsapp_bubble">
                  <p class="em_whatsapp_bubble_text" id="em_whatsapp_bubble_text">Tu mensaje se mostrará aquí... 😊</p>
                  <div class="em_whatsapp_meta">
                    <span id="em_whatsapp_time">10:45</span>
                    <i class="fas fa-check-double" style="color: #53bdeb; font-size: 10px;"></i>
                  </div>
                </div>
              </div>
            </div>

            <!-- Discord Previewer Screen (Hidden initially) -->
            <div class="em_chat_screen em_screen_discord dpn" id="em_screen_discord">
              <div class="em_discord_message">
                <img src="/smile.avif" alt="User" class="em_discord_avatar" />
                <div class="em_discord_content">
                  <div class="em_discord_header">
                    <span class="em_discord_username">WiiTema Studio</span>
                    <span class="em_discord_bot_tag">BOT</span>
                    <span class="em_discord_timestamp" id="em_discord_time">Hoy a las 10:45</span>
                  </div>
                  <p class="em_discord_text" id="em_discord_text">Tu mensaje se mostrará aquí... 😊</p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      <!-- COL 3: EMOJI PICKER (35%) -->
      <div class="em_column_picker">
        
        <div class="lab_card" style="height: 100%; display: flex; flex-direction: column;">
          <h3 class="lab_card_title"><i class="fas fa-face-smile"></i> Selector de Emojis</h3>
          
          <div class="em_search_wrap" style="margin-top: 1.5vh;">
            <i class="fas fa-search"></i>
            <input type="text" class="em_search" id="emSearch" placeholder="Buscar emojis por palabras..." />
          </div>

          <div class="em_category_tabs">
            ${Object.entries(CATEGORIAS).map(([key, cat]) => `
              <button class="em_category_tab ${key === categoriaActual ? 'active' : ''}" data-cat="${key}" data-witip="${cat.label}">
                <i class="fas ${cat.icon}"></i>
              </button>
            `).join('')}
          </div>

          <div class="em_cat_label" style="margin-top: 1.5vh; border-radius: 0.8vh; padding: 1vh 1.5vh;">
            <i class="fas ${CATEGORIAS[categoriaActual].icon}"></i>
            <span style="font-weight: 800; font-size: 12px; margin-left: 8px;">${CATEGORIAS[categoriaActual].label}</span>
          </div>

          <div class="em_grid_scroll_container" style="flex: 1; overflow-y: auto; margin-top: 1.5vh;">
            <div class="em_grid">
              <!-- Emojis se renderizan aquí -->
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>`;
};

// Init
export const init = async () => {
  cleanup();
  wiTip(); // Inicializar tooltips

  recientes = _getRecientes();
  _renderEmojis();
  _updateCharCount();
  _updateChatPreviews();

  const debounce = (fn, ms) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };
  const debouncedSearch = debounce((q) => _renderEmojis(q), 250);
  const debouncedSave = debounce((txt) => {
    _saveNotepad(txt);
    _updateChatPreviews();
  }, 300);

  $(document)
    // 1. Click en Emoji - Copiar, Explosión y Notepad
    .on('click.em', '.em_emoji', async function(e) {
      const emoji = $(this).data('emoji');
      
      // Partícula en coordenadas exactas de clic
      _createEmojiBurst(emoji, e.pageX, e.pageY);

      // Copiar al portapapeles
      await _copiar(emoji);
      
      // Agregar a recientes
      _addReciente(emoji);
      
      // Inserción en cursor en textarea
      const $ta = $('#emTextarea');
      const pos = $ta[0].selectionStart;
      const txt = $ta.val();
      const newTxt = txt.slice(0, pos) + emoji + txt.slice(pos);
      $ta.val(newTxt);
      $ta[0].selectionStart = $ta[0].selectionEnd = pos + emoji.length;
      $ta.focus();
      
      _saveNotepad(newTxt);
      _updateCharCount();
      _updateChatPreviews();
      
      // Pequeña escala micro-animación en botón clicked
      $(this).addClass('copied');
      setTimeout(() => $(this).removeClass('copied'), 250);
      Notificacion(`${emoji} Copiado!`, 'success', 1000);
    })
    
    // 2. Toggles de Categorías
    .on('click.em', '.em_category_tab', function() {
      const cat = $(this).data('cat');
      categoriaActual = cat;
      
      $('.em_category_tab').removeClass('active');
      $(this).addClass('active');
      
      $('.em_cat_label').html(`
        <i class="fas ${CATEGORIAS[cat].icon}"></i>
        <span style="font-weight: 800; font-size: 12px; margin-left: 8px;">${CATEGORIAS[cat].label}</span>
      `);
      
      $('#emSearch').val('');
      _renderEmojis();
    })

    // 3. Toggles de Pantalla de Previsualización Chat
    .on('click.em', '.em_preview_tab', function() {
      const type = $(this).data('preview-type');
      previewType = type;

      $('.em_preview_tab').removeClass('active');
      $(this).addClass('active');

      if (type === 'whatsapp') {
        $('#em_screen_whatsapp').removeClass('dpn');
        $('#em_screen_discord').addClass('dpn');
      } else {
        $('#em_screen_whatsapp').addClass('dpn');
        $('#em_screen_discord').removeClass('dpn');
      }
    })

    // 4. Inserción de Plantillas de Marketing
    .on('click.em', '.em_template_btn', function() {
      const key = $(this).data('key');
      const template = MARKETING_TEMPLATES[key];
      if (!template) return;

      const $ta = $('#emTextarea');
      $ta.val(template.text).focus();

      _saveNotepad(template.text);
      _updateCharCount();
      _updateChatPreviews();
      Notificacion('Plantilla insertada 📝', 'success', 1500);
    })
    
    // 5. Búsqueda reactiva
    .on('input.em', '#emSearch', function() {
      const q = $(this).val().trim();
      debouncedSearch(q);
    })
    
    // 6. Cambios en Textarea
    .on('input.em', '#emTextarea', function() {
      debouncedSave($(this).val());
      _updateCharCount();
    })
    
    // 7. Copiar todo el notepad
    .on('click.em', '#emCopiarTodo, #emCopiarTexto', async function(e) {
      e.preventDefault();
      const txt = $('#emTextarea').val();
      if (!txt) {
        Notificacion('Bloc de notas vacío', 'warning', 1200);
        return;
      }
      await _copiar(txt);
      Notificacion('¡Mensaje copiado al portapapeles! 📋', 'success', 1500);
    })
    
    // 8. Limpiar notepad
    .on('click.em', '#emLimpiar', function(e) {
      e.preventDefault();
      $('#emTextarea').val('');
      _saveNotepad('');
      _updateCharCount();
      _updateChatPreviews();
      Notificacion('Notepad limpiado 🗑️', 'success', 1200);
    })
    
    // 9. Salto de línea interactivo
    .on('click.em', '#emInsertarEnter', function() {
      const $ta = $('#emTextarea');
      const pos = $ta[0].selectionStart;
      const txt = $ta.val();
      const newTxt = txt.slice(0, pos) + '\n' + txt.slice(pos);
      $ta.val(newTxt);
      $ta[0].selectionStart = $ta[0].selectionEnd = pos + 1;
      $ta.focus();
      _saveNotepad(newTxt);
      _updateCharCount();
      _updateChatPreviews();
    })
    
    // 10. Limpieza de búsqueda en Escape
    .on('keydown.em', function(e) {
      if (e.key === 'Escape') {
        $('#emSearch').val('');
        _renderEmojis();
      }
    });
};

export const cleanup = () => {
  $(document).off('.em');
};