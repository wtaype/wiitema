import{n as e}from"./vendor-BuoCFfzO.js";import{C as t,_ as n,p as r,r as i,t as a,u as o,w as s}from"./widev-C6_C1nMz.js";import{_ as c,b as l,f as u,g as d,l as f,n as p,o as m,r as h,s as g,u as _}from"./firebase-CcGrcE7k.js";import{n as v}from"./firebase-Dp4rAqD-.js";import{cargarTodosEmpleados as y}from"./zsmile-CDqHkLEZ.js";var b=`.chat`,x=`chatSmileMsgs`,S=.1,C=7,w=5,ee=3e4,T=500,E=[],D=[],O=``,k=null,A=!1,j=``,M=``,N=!1,P=!0,F=null,I=()=>`
  <div class="chat_wrap wi_fadeUp">
    <div class="chat_container" id="chatContainer">

      <!-- ═══ SIDEBAR (LEFT COLUMN) ═══ -->
      <aside class="chat_sidebar">
        <div class="chat_sidebar_header">
          <div class="chat_sidebar_title">
            <i class="fas fa-users-viewfinder"></i>
            <h2>Mi Equipo</h2>
            <span class="chat_sidebar_count" id="sidebarCount">0</span>
          </div>
          <button class="chat_sidebar_close_btn" id="chatSidebarClose" title="Cerrar">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="chat_sidebar_search">
          <div class="chat_search_box">
            <i class="fas fa-search"></i>
            <input
              type="text"
              id="chatSearchInput"
              placeholder="Buscar compañero…"
              autocomplete="off"
            >
          </div>
        </div>

        <div class="chat_sidebar_list" id="chatSidebarList">
          ${L()}
        </div>
      </aside>

      <!-- ═══ MAIN CHAT (RIGHT COLUMN) ═══ -->
      <main class="chat_main">
        <!-- ══ HEADER ══ -->
        <div class="chat_header smw_loading" id="chatHeader">
          <div class="chat_header_left">
            <button class="chat_sidebar_toggle_btn" id="chatSidebarToggle" title="Ver colaboradores">
              <i class="fas fa-users"></i>
              <span class="chat_sidebar_indicator"></span>
            </button>
            <div class="chat_header_icon">
              <i class="fas fa-comments"></i>
            </div>
            <div class="chat_header_text">
              <h1 class="chat_title">Chat del Equipo</h1>
              <p class="chat_subtitle">Canal interno de <em>Smiles</em></p>
            </div>
          </div>
          <div class="chat_header_actions">
            <div class="chat_online_badge" id="chatOnline">
              <span class="chat_online_dot"></span>
              <span id="chatOnlineCount">—</span> activos
            </div>
            <button class="chat_refresh_btn" id="chatRefresh" title="Actualizar mensajes">
              <i class="fas fa-sync-alt"></i>
            </button>
          </div>
        </div>

        <!-- ══ MESSAGES AREA ══ -->
        <div class="chat_messages" id="chatMessages">
          ${R()}
        </div>

        <!-- ══ INPUT AREA ══ -->
        <div class="chat_input_area" id="chatInputArea">
          <div class="chat_input_card">
            <div class="chat_textarea_wrap">
              <textarea
                id="chatTextarea"
                class="chat_textarea"
                placeholder="Escribe un mensaje…"
                rows="1"
                maxlength="${T}"
              ></textarea>
            </div>
            <button class="chat_send_btn" id="chatSendBtn" title="Enviar mensaje">
              <i class="fas fa-paper-plane"></i>
            </button>
          </div>
          <div class="chat_blocked_msg" id="chatBlockedMsg" style="display:none;">
            <i class="fas fa-lock"></i>
            Solo los colaboradores activos pueden enviar mensajes.
          </div>
        </div>
      </main>

    </div>

    <!-- CHAT DELETION MODAL -->
    <div class="chat_modal" id="chatEliminarModal">
      <div class="chat_modal_body">
        <i class="fas fa-trash-alt"></i>
        <h3>¿Eliminar mensaje?</h3>
        <p>Esta acción no se puede deshacer y se borrará para todos.</p>
        <div class="chat_modal_acts">
          <button class="chat_cancel" id="chatCancelDeleteBtn">Cancelar</button>
          <button class="chat_confirm" id="chatConfirmDeleteBtn">Eliminar</button>
        </div>
      </div>
    </div>
  </div>
`;function L(){return[,,,,,].fill(0).map(()=>`
    <div class="chat_sidebar_sk_item">
      <div class="chat_sidebar_sk_avatar smw_sk_el"></div>
      <div class="chat_sidebar_sk_info">
        <div class="chat_sidebar_sk_name smw_sk_el"></div>
        <div class="chat_sidebar_sk_sub smw_sk_el"></div>
      </div>
    </div>
  `).join(``)}function R(){return[{mine:!1,w:`62%`},{mine:!0,w:`48%`},{mine:!1,w:`75%`},{mine:!0,w:`55%`},{mine:!1,w:`68%`}].map(({mine:e,w:t})=>`
    <div class="chat_bubble_wrap ${e?`mine`:`other`}">
      ${e?``:`<div class="chat_sk_avatar smw_sk_el"></div>`}
      <div class="chat_sk_block">
        <div class="chat_sk_name smw_sk_el" style="width:90px;"></div>
        <div class="chat_sk_bubble smw_sk_el" style="width:${t};"></div>
      </div>
      ${e?`<div class="chat_sk_avatar smw_sk_el"></div>`:``}
    </div>
  `).join(``)}var z=(e=``)=>{let t=e.trim().split(/\s+/).filter(Boolean);return t.length?t.length===1?t[0][0].toUpperCase():(t[0][0]+t[t.length-1][0]).toUpperCase():`?`},B=[`#3b82f6`,`#f97316`,`#a855f7`,`#22c55e`,`#ef4444`,`#0ea5e9`,`#eab308`,`#ec4899`],V=(e=``)=>{let t=0;for(let n=0;n<e.length;n++)t=e.charCodeAt(n)+((t<<5)-t);return B[Math.abs(t)%B.length]},H=e=>{if(e.tipo===`snapshot`)return U(e);let t=e.usuario||e.autor||``,r=t&&j&&t.toLowerCase().trim()===j.toLowerCase().trim(),i=V(t),o=z(e.nombre||t||`?`),c=s(e.creado||e.ts),l=W(e.texto||``).replace(/\n/g,`<br>`),u=n.user?.rol===`gestor`||n.user?.rol===`admin`,d=r||u,f=e.imagen,p=`
    <div class="chat_avatar_wrap" title="${a(e.nombre||t||``)}">
      ${f?`<img class="chat_avatar_img" src="${e.imagen}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">`:``}
      <div class="chat_avatar_fallback" style="background:${i}; ${f?`display:none;`:``}">
        ${o}
      </div>
    </div>
  `;return`
    <div class="chat_bubble_wrap ${r?`mine`:`other`} chat_msg_in ${e.temp?`chat_msg_pending`:``}" data-id="${e.id||``}">
      ${r?``:p}
      <div class="chat_bubble_col">
        <div class="chat_bubble_meta ${r?`right`:``}">
          <span class="chat_bubble_name">${a(e.nombre||t||`Colaborador`)}</span>
          <span class="chat_bubble_time">${c}</span>
          ${d?`<button class="chat_msg_delete_btn" data-id="${e.id||``}" title="Eliminar mensaje"><i class="fas fa-trash-alt"></i></button>`:``}
        </div>
        <div class="chat_bubble ${r?`mine`:`other`}">
          <span>${l}</span>
        </div>
      </div>
      ${r?p:``}
    </div>
  `},U=e=>`
    <div class="chat_snapshot_card chat_msg_in">
      <div class="chat_snapshot_icon">📊</div>
      <div class="chat_snapshot_body">
        <div class="chat_snapshot_label">
          <i class="fas fa-chart-bar"></i> Snapshot del equipo
          <span class="chat_snapshot_time">${s(e.creado||e.ts)}</span>
        </div>
        <div class="chat_snapshot_text">${W(e.texto||``)}</div>
      </div>
    </div>
  `,W=e=>String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`),G=e=>e.replace(/[.*+?^${}()|[\]\\]/g,`\\$&`),K=()=>{let t=e(`#chatTextarea`).val()||``;e(`.chat_sidebar_item`).each(function(){let n=(e(this).attr(`data-nombre`)||``).trim();n&&(RegExp(`@`+G(n)+`(?![a-zA-Z0-9áéíóúüñÁÉÍÓÚÜÑ])`,`i`).test(t)?e(this).addClass(`active`):e(this).removeClass(`active`))})},q=(t=!1)=>{let n=e(`#chatMessages`);if(!E.length){n.html(`
      <div class="chat_empty">
        <div class="chat_empty_icon">💬</div>
        <p class="chat_empty_title">Sin mensajes aún</p>
        <p class="chat_empty_sub">¡Sé el primero en escribir!</p>
      </div>
    `);return}let r=E.map(H).join(``);P&&E.length>=C&&(r=`<div class="chat_paginate_container"><button class="chat_paginate_btn" id="chatPaginateBtn"><i class="fas fa-history"></i> Cargar anteriores (+5)</button></div>`+r),n.html(r),e(`#chatMessages .chat_msg_in`).each(function(t){e(this).css(`animation-delay`,`${t*.02}s`)}),t||Y()},J=()=>{let t=e(`#chatSidebarList`);if(!t.length)return;let n=D.filter(e=>{let t=O.toLowerCase().trim(),n=(e.nombre||``).toLowerCase(),r=(e.apellidos||``).toLowerCase(),i=(e.usuario||``).toLowerCase();return n.includes(t)||r.includes(t)||i.includes(t)});if(e(`#sidebarCount`).text(n.length),!n.length){t.html(`
      <div class="chat_sidebar_empty">
        <i class="fas fa-search-minus"></i>
        <p class="chat_sidebar_empty_title">Sin resultados</p>
        <p class="chat_sidebar_empty_sub">Intenta buscar otra palabra</p>
      </div>
    `);return}let r=n.map(e=>{let t=e.usuario===j,n=z(e.nombre||`?`),r=V(e.usuario||``),i=e.estado===`activo`,o=e.imagen||e.avatar,s=o?`<img class="chat_sidebar_avatar_img" src="${o}" alt="${e.nombre}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">`:``;return`${e.nombre||``} ${e.apellidos||``}`.replace(/\s+/g,` `).trim(),`
      <div class="chat_sidebar_item ${t?`chat_sidebar_item_me`:``}" data-usuario="${e.usuario}" data-nombre="${e.usuario}">
        <div class="chat_sidebar_avatar_wrap">
          ${s}
          <div class="chat_sidebar_avatar_fallback" style="background:${r}; ${o?`display:none;`:``}">
            ${n}
          </div>
          <span class="chat_sidebar_avatar_dot ${i?`online`:`offline`}"></span>
        </div>
        <div class="chat_sidebar_info">
          <div class="chat_sidebar_name_row">
            <span class="chat_sidebar_name">${a(e.nombre)} ${a(e.apellidos||``)}</span>
            ${t?`<span class="chat_sidebar_me_badge">Tú</span>`:``}
          </div>
          <div class="chat_sidebar_status_row">
            <span class="chat_sidebar_role chat_badge_${e.rol||`smile`}">
              ${e.rol===`gestor`?`Gestor`:e.rol===`admin`?`Admin`:`Smile`}
            </span>
            <span class="chat_sidebar_username">@${e.usuario}</span>
          </div>
        </div>
        <div class="chat_sidebar_action" title="Mencionar">
          <i class="fas fa-at"></i>
        </div>
      </div>
    `}).join(``);t.html(r),K()},Y=(e=!1)=>{let t=document.getElementById(`chatMessages`);t&&t.scrollTo({top:t.scrollHeight,behavior:e?`smooth`:`auto`})},te=t=>{e(`#chatOnlineCount`).text(t)},X=async(t=!1)=>{if(!N){if(N=!0,!t){let e=o(x);if(e&&Array.isArray(e)){E=e,P=!0,q(),N=!1;return}}t&&e(`#chatRefresh`).addClass(`chat_spinning`),e(`#chatHeader`).addClass(`smw_loading`);try{let e=await m(_(d(v,`chatSmiles`),f(`creado`,`desc`),g(C)));E=e.docs.reverse().map(e=>({id:e.id,...e.data()})),P=e.size>=C,r(x,E,S),q(),te(new Set(E.map(e=>e.usuario||e.autor).filter(Boolean)).size)}catch(t){console.error(`[Chat] loadMensajes error:`,t),E.length||e(`#chatMessages`).html(`
        <div class="chat_empty chat_empty_error">
          <div class="chat_empty_icon">⚠️</div>
          <p class="chat_empty_title">Error al cargar</p>
          <p class="chat_empty_sub">Revisa tu conexión e intenta de nuevo.</p>
          <button class="chat_retry_btn" id="chatRetry">
            <i class="fas fa-redo"></i> Reintentar
          </button>
        </div>
      `),i(`No se pudieron cargar los mensajes`,`error`)}finally{N=!1,e(`#chatHeader`).removeClass(`smw_loading`),e(`#chatRefresh`).removeClass(`chat_spinning`)}}},ne=async()=>{if(N||!P||!E.length)return;let t=e(`#chatMessages`),n=E[0].creado||E[0].ts;if(!n){i(`No se puede paginar: falta cursor de tiempo`,`warning`);return}N=!0,e(`#chatPaginateBtn`).prop(`disabled`,!0).html(`<i class="fas fa-circle-notch fa-spin"></i> Cargando anteriores...`);try{let e=await m(_(d(v,`chatSmiles`),f(`creado`,`desc`),u(n),g(w)));if(e.empty){P=!1,q(!0),i(`No hay más mensajes anteriores`,`info`);return}let r=e.docs.reverse().map(e=>({id:e.id,...e.data()}));r.length<w&&(P=!1);let a=t[0].scrollHeight,o=t[0].scrollTop;E=[...r,...E],q(!0);let s=t[0].scrollHeight;t[0].scrollTop=o+(s-a),i(`Cargados ${r.length} mensajes anteriores`,`success`)}catch(e){console.error(`[Chat] loadAnteriores error:`,e),i(`Error al cargar anteriores`,`error`)}finally{N=!1}},Z=async()=>{try{D=await y(!0),J()}catch(e){console.error(`[Chat] _loadColaboradores error:`,e)}},Q=async()=>{if(!A)return;let t=e(`#chatTextarea`),a=t.val().trim();if(!a)return;if(a.length>T){i(`El mensaje excede ${T} caracteres`,`warning`);return}t.val(``).trigger(`input`),$(t[0]);let o=`temp_`+Date.now()+Math.random().toString(36).substr(2,5),s=n.user,c=s?.imagen||s?.avatar||``,u={id:o,texto:a,usuario:j,email:s?.email||``,nombre:M,imagen:c,creado:new Date,ts:new Date,tipo:`texto`,temp:!0};E.push(u),q(!1),p(d(v,`chatSmiles`),{texto:a,usuario:j,email:s?.email||``,nombre:M,imagen:c,creado:l(),ts:l(),tipo:`texto`}).then(e=>{let t=E.findIndex(e=>e.id===o);t!==-1&&(E[t].id=e.id,delete E[t].temp,r(x,E,S),q(!0))}).catch(e=>{console.error(`[Chat] Background send error:`,e),i(`No se pudo entregar el mensaje`,`error`),E=E.filter(e=>e.id!==o),r(x,E,S),q(!0)})},$=e=>{e&&(e.style.height=`auto`,e.style.height=Math.min(e.scrollHeight,96)+`px`,e.style.overflowY=e.scrollHeight>96?`auto`:`hidden`)},re=()=>{let t=e(`#chatTextarea`),n=e(`#chatSendBtn`),r=e(`#chatBlockedMsg`);A?(t.prop(`disabled`,!1).attr(`placeholder`,`Escribe un mensaje…`),n.prop(`disabled`,!1).removeClass(`chat_send_disabled`),r.hide()):(t.prop(`disabled`,!0).attr(`placeholder`,`No puedes enviar mensajes (participación inactiva)`),n.prop(`disabled`,!0).addClass(`chat_send_disabled`),r.show())},ie=async()=>{e(`.chat_wrap`).addClass(`visible`),window.__WIREADY__=!0;let a=n.user;a&&(j=a.usuario||a.email||``,M=a.nombre||a.usuario||`Colaborador`,A=a.participa===`si`),re(),X(!1),Z(),k=setInterval(()=>{r(x,null,0),X(!0),Z()},ee),e(document).on(`input${b}`,`#chatTextarea`,function(){$(this),K()}),e(document).on(`keydown${b}`,`#chatTextarea`,function(e){e.key===`Enter`&&!e.shiftKey&&(e.preventDefault(),Q())}),e(document).on(`click${b}`,`#chatSendBtn`,()=>Q()),e(document).on(`click${b}`,`#chatRefresh`,async function(){r(x,null,0),P=!0,await X(!0),await Z(),i(`Mensajes actualizados`,`success`)}),e(document).on(`click${b}`,`#chatPaginateBtn`,()=>ne()),e(document).on(`click${b}`,`.chat_msg_delete_btn`,function(){let t=e(this).attr(`data-id`);t&&(F=t,e(`#chatEliminarModal`).addClass(`show`))}),e(document).on(`click${b}`,`#chatCancelDeleteBtn, #chatEliminarModal`,function(t){e(t.target).is(`#chatCancelDeleteBtn, #chatEliminarModal`)&&(e(`#chatEliminarModal`).removeClass(`show`),F=null)}),e(document).on(`click${b}`,`#chatConfirmDeleteBtn`,async function(){if(!F)return;let n=this;t(n,!0,`Eliminando...`);try{let t=F;await h(c(v,`chatSmiles`,t)),i(`Mensaje eliminado permanentemente`,`success`),e(`#chatEliminarModal`).removeClass(`show`),F=null;let n=e(`.chat_bubble_wrap[data-id="${t}"]`);n.length?n.fadeOut(300,function(){e(this).remove(),E=E.filter(e=>e.id!==t),r(x,E,S)}):(E=E.filter(e=>e.id!==t),r(x,E,S),q(!0))}catch(e){console.error(`[Chat] deleteDoc error:`,e),i(`Error al eliminar mensaje`,`error`)}finally{t(n,!1,`Eliminar`)}}),e(document).on(`input${b}`,`#chatSearchInput`,function(){O=e(this).val(),J()}),e(document).on(`click${b}`,`.chat_sidebar_item`,function(t){if(!A)return;let n=(e(this).attr(`data-nombre`)||``).trim(),r=e(`#chatTextarea`),i=e(this).hasClass(`active`),a=r.val(),o=`@${n}`;if(i){let e=n.replace(/[.*+?^${}()|[\]\\]/g,`\\$&`),t=RegExp(`@`+e+`(?![a-zA-Z0-9áéíóúüñÁÉÍÓÚÜÑ])\\s*`,`gi`);a=a.replace(t,``),a=a.replace(/\s+/g,` `).trim(),r.val(a?a+` `:``)}else{let e=a?a.endsWith(` `)?``:` `:``;r.val(a+e+o+` `)}r.trigger(`input`),r.focus(),$(r[0]),e(`#chatContainer`).removeClass(`chat_sidebar_active`)}),e(document).on(`click${b}`,`#chatSidebarToggle`,function(){e(`#chatContainer`).addClass(`chat_sidebar_active`)}),e(document).on(`click${b}`,`#chatSidebarClose`,function(){e(`#chatContainer`).removeClass(`chat_sidebar_active`)}),e(document).on(`click${b}`,`#chatRetry`,()=>{e(`#chatMessages`).html(R()),e(`#chatSidebarList`).html(L()),X(!0),Z()}),e(document).on(`focus${b}`,`#chatTextarea`,function(){setTimeout(()=>Y(!0),350)})},ae=()=>{e(document).off(b),clearInterval(k),k=null,E=[],D=[],O=``,A=!1,j=``,M=``,N=!1,P=!0,F=null};export{ae as cleanup,ie as init,I as render};