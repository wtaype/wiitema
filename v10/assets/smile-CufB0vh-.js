import{n as e}from"./vendor-BuoCFfzO.js";import{t}from"./wii-B7KacVyR.js";import{g as n,i as r,l as i,p as a,u as o}from"./widev-4Rjv6ciq.js";import{n as s}from"./index-Dt5s5XVG.js";import{D as c,_ as l}from"./firebase-CTU0UJ6d.js";import{n as u}from"./firebase-DNXHJgUE.js";import{getMesActual as d,obtenerRankingMes as f}from"./zsmile-ny0IIVWO.js";var p=d(),m=()=>`
    <div class="smw_dash">
      <header class="smw_hero wi_fadeUp">
        <div class="smw_hero_glow"></div>
        <div class="smw_hero_content">
          <div class="smw_hero_left">
            <div class="smw_avatar_wrap">
              <div class="smw_avatar" id="smwAvatar">?</div>
              <div class="smw_avatar_ring"></div>
            </div>
            <div class="smw_welcome">
              <h1 id="smwSaludo">Cargando...</h1>
              <p id="smwRole"><i class="fas fa-car-side"></i> Colaborador — Reto del Mes</p>
            </div>
          </div>
          <div class="smw_month_selector_container">
            <select id="smwMonthSelector" class="smw_select" style="min-width: 160px; backdrop-filter: blur(10px); background: var(--bg5);">
              ${y()}
            </select>
          </div>
        </div>
      </header>

      <section class="smw_kpi_band wi_fadeUp" id="smwKpis" style="animation-delay: 0.1s">
        <div class="smw_kpi_item">
          <span class="smw_kpi_val" id="kpiTours" style="color: var(--Cielo)"><span class="smw_sk_kpi"></span></span>
          <span class="smw_kpi_lbl">Tours este mes</span>
        </div>
        <div class="smw_kpi_sep"></div>
        <div class="smw_kpi_item">
          <span class="smw_kpi_val" id="kpiPuntos" style="color: var(--Oro)"><span class="smw_sk_kpi"></span></span>
          <span class="smw_kpi_lbl">Mis puntos</span>
        </div>
        <div class="smw_kpi_sep"></div>
        <div class="smw_kpi_item">
          <span class="smw_kpi_val" id="kpiPos" style="color: var(--Mora)"><span class="smw_sk_kpi"></span></span>
          <span class="smw_kpi_lbl">Posición</span>
        </div>
      </section>

      <nav class="smw_quick_nav wi_fadeUp" style="animation-delay: 0.2s">
        ${[{page:`registrar`,ico:`fa-plus-circle`,col:`#FF5C69`,tit:`Registrar Venta`,sub:`Nueva venta de tour`},{page:`ranking`,ico:`fa-trophy`,col:`#FFDA34`,tit:`Ver Ranking`,sub:`Puntos del mes`},{page:`historial`,ico:`fa-clipboard-list`,col:`#0EBEFF`,tit:`Historial`,sub:`Mis ventas registradas`},{page:`tours`,ico:`fa-route`,col:`#29C72E`,tit:`Catálogo Tours`,sub:`Lista de tours and precios`},{page:`avisar`,ico:`fa-bell`,col:`#7000FF`,tit:`Anuncios`,sub:`Noticias del equipo`}].map((e,t)=>`
          <a href="/${e.page}" class="smw_qcard nv_item" data-page="${e.page}" style="--qc:${e.col}; animation-delay: ${t*.05}s">
            <div class="smw_qcard_ico" style="--qc: ${e.col}"><i class="fas ${e.ico}"></i></div>
            <div class="smw_qcard_txt">
              <strong>${e.tit}</strong>
              <span>${e.sub}</span>
            </div>
            <i class="fas fa-arrow-right smw_qcard_arr"></i>
          </a>
        `).join(``)}
      </nav>
    </div>
  `,h=async()=>{let a=n.user;if(!a)return setTimeout(()=>s.navigate(`/login`),100);let o=i(a.nombre||a.usuario||``),c=`${(a.nombre||`?`)[0]}${(a.apellidos||``)[0]||``}`.toUpperCase();e(`#smwAvatar`).text(c),e(`#smwSaludo`).html(`${r()} <strong>${o}</strong>`),a.descripcion?e(`#smwRole`).html(`<i class="fas fa-user-tag"></i> ${a.descripcion}`):e(`#smwRole`).html(`<i class="fas fa-car-side"></i> Colaborador — Reto del Mes`),e(`#smwMonthSelector`).val(p),_(a.usuario,p),e(document).off(`change.smile_dash`).on(`change.smile_dash`,`#smwMonthSelector`,function(){p=e(this).val(),_(a.usuario,p)}),e(`.wi_fadeUp`).addClass(`visible wi_visible`),console.log(`🏜️ ${t} Smile Dashboard cargado`),window.__WIREADY__=!0},g=()=>{e(document).off(`change.smile_dash`)};async function _(t,n){try{e(`#kpiTours`).html(`<span class="smw_sk_kpi"></span>`),e(`#kpiPuntos`).html(`<span class="smw_sk_kpi"></span>`),e(`#kpiPos`).html(`<span class="smw_sk_kpi"></span>`);let r=`kpiSmile_${t}_${n}`,i=o(r);if(i)return v(i);let[s,d]=n.split(`-`).map(Number),p=await l(c(u,`registrosdb`)),m=0,h=0;p.docs.forEach(e=>{let n=e.data();if(n.vendedor!==t)return;let r=n.fechaTour,i,a;if(typeof r==`string`)[i,a]=r.split(`-`).map(Number);else if(r?.toDate){let e=r.toDate();i=e.getFullYear(),a=e.getMonth()+1}else return;i===s&&a===d&&(m+=parseInt(n.qventa)||1,h+=parseInt(n.puntos)||0)});let g=(await f(n)).findIndex(e=>e.usuario===t),_=g===-1?`—`:`#${g+1}`,y={tours:m,puntos:h,posicion:_};a(r,y,5),v(y)}catch(e){console.warn(`KPI error:`,e),v({tours:`?`,puntos:`?`,posicion:`?`})}}function v({tours:t,puntos:n,posicion:r}){e(`#kpiTours`).text(t),e(`#kpiPuntos`).text(n),e(`#kpiPos`).text(r)}function y(){let t=new Date,n=t.getFullYear(),r=t.getMonth(),i=[`Enero`,`Febrero`,`Marzo`,`Abril`,`Mayo`,`Junio`,`Julio`,`Agosto`,`Septiembre`,`Octubre`,`Noviembre`,`Diciembre`];return e.map(Array(7),(e,t)=>{let a=t-3,o=r+a,s=n+Math.floor(o/12),c=(o%12+12)%12;return`<option value="${`${s}-${String(c+1).padStart(2,`0`)}`}"${a===0?` selected`:``}>${i[c]} ${s}</option>`}).join(``)}export{g as cleanup,h as init,m as render};