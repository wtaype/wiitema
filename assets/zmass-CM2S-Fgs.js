import{n as e}from"./vendor-BuoCFfzO.js";import{_ as t}from"./widev-CaaaKRDv.js";import{n}from"./index-BVDnJ5oo.js";var r=[{href:`/gestor`,ico:`fa-users-gear`,txt:`Dashboard Gestor`,desc:`Administración de ventas.`},{href:`/smile`,ico:`fa-gauge-high`,txt:`Dashboard Colaborador`,desc:`Métricas y retos del mes.`},{href:`/crear`,ico:`fa-plus-circle`,txt:`Mis Linkwiis`,desc:`Administra tus enlaces cortos.`},{href:`/agregar`,ico:`fa-folder-plus`,txt:`Mis Recursos`,desc:`Gestiona archivos y carpetas.`},{href:`/win`,ico:`fa-file-shield`,txt:`wiWin Cloud`,desc:`Almacenamiento en la nube.`},{href:`/word`,ico:`fa-file-lines`,txt:`Word Editor`,desc:`Editor de documentos.`},{href:`/notas`,ico:`fa-book`,txt:`Notas Book`,desc:`Cuaderno de notas rápidas.`},{href:`/chat`,ico:`fa-comments`,txt:`Chat Grupal`,desc:`Mensajería interna del equipo.`}],i=()=>{let e=t.user;if(!e)return`<div class="z_page"><div class="z_empty"><i class="fas fa-ban"></i> Acceso denegado.</div></div>`;let i=e.rol||`gestor`;return`
    <div class="z_wrap">
      <header class="z_header wi_fadeUp">
        <div class="z_header_txt">
          <div class="z_badge" style="color: var(--Mora);"><i class="fas fa-cubes"></i> Módulos de Gestión</div>
          <h1>Consola Gestor</h1>
          <p>Herramientas y paneles administrativos para la supervisión y control del equipo.</p>
        </div>
        <div class="z_search_box">
          <i class="fas fa-search"></i>
          <input type="text" id="zSearchInput" placeholder="Buscar módulo..." autocomplete="off">
        </div>
      </header>
      
      <div class="z_grid wi_fadeUp" style="animation-delay: 0.1s">
        ${r.filter(e=>{let t=n.find(t=>t.path===e.href);return t&&t.roles&&t.roles.includes(i)}).map((e,t)=>`
      <a href="${e.href}" class="z_card nv_item" data-page="${e.href.slice(1)}" data-search="${e.txt.toLowerCase()} ${e.desc.toLowerCase()}" style="animation-delay: ${t*.04}s">
        <div class="z_card_bar"></div>
        <div class="z_card_top">
          <div class="z_card_ico"><i class="fas ${e.ico}"></i></div>
          <div class="z_card_body">
            <h3>${e.txt}</h3>
            <p>${e.desc}</p>
          </div>
          <i class="fas fa-arrow-right z_card_arrow"></i>
        </div>
      </a>
    `).join(``)||`<div class="z_empty_grid">No hay módulos disponibles para tu rol.</div>`}
      </div>
    </div>
  `},a=()=>{t.user&&(e(document).off(`.zmass`).on(`input.zmass`,`#zSearchInput`,function(){let t=e(this).val().toLowerCase().trim();if(!t){e(`.z_card`).show();return}e(`.z_card`).each(function(){let n=e(this).attr(`data-search`)||``;e(this).toggle(n.includes(t))})}),e(`.wi_fadeUp`).addClass(`visible wi_visible`),window.__WIREADY__=!0)},o=()=>{e(document).off(`.zmass`)};export{o as cleanup,a as init,i as render};