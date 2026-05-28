import{n as e}from"./vendor-BuoCFfzO.js";import{t}from"./wii-B7KacVyR.js";import{D as n}from"./widev-4Rjv6ciq.js";/* empty css               *//* empty css                 */var r=[{ico:`fa-palette`,color:`#0EBEFF`,num:`01`,tit:`Uso de la plataforma`,body:`<p>WiiTema es una plataforma de diseño para acceder a recursos visuales de calidad: colores, fuentes, iconos, SVG y herramientas Smart. Debe usarse respetando la propiedad intelectual del contenido y sin reproducción masiva sin autorización.</p>`},{ico:`fa-shield-halved`,color:`#29C72E`,num:`02`,tit:`Cuenta y sincronización`,body:`<p>Puedes iniciar sesión con Google o email. Sincronizamos tu perfil, temas guardados, preferencias y descargadas con Firebase para mantener consistencia entre dispositivos.</p>`},{ico:`fa-layer-group`,color:`#FF5C69`,num:`03`,tit:`Planes y funcionalidades`,body:`<p>El acceso base incluye recursos estándar. Los planes premium ofrecen colecciones exclusivas, descargables en masa y herramientas avanzadas de generación. Los límites pueden actualizarse con aviso previo.</p>`},{ico:`fa-gavel`,color:`#7000FF`,num:`04`,tit:`Derechos de contenido`,body:`<p>WiiTema es desarrollado por Wilder Taype. El diseño, código y los recursos visuales pertenecen a WiiTema. Los usuarios obtienen licencia de uso, no propiedad. Redistribución prohibida sin consentimiento.</p>`},{ico:`fa-triangle-exclamation`,color:`#FFDA34`,num:`05`,tit:`Limitación de responsabilidad`,body:`<p>WiiTema proporciona recursos y herramientas de diseño, pero no garantiza la compatibilidad total con todos los entornos Wii. El usuario es responsable de verificar que los recursos funcionen en su contexto específico.</p>`},{ico:`fa-arrows-rotate`,color:`#0EBEFF`,num:`06`,tit:`Cambios en los términos`,body:`<p>Podemos actualizar funciones, recursos, texto legal y detalles del servicio con el tiempo. El uso continuado de WiiTema después de esos cambios implica aceptación de la versión vigente.</p>`}],i=()=>`
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
        Reglas claras para usar <strong>${t}</strong>, acceder a recursos de diseño y mantener una experiencia colaborativa de calidad.
      </p>
      <div class="tm_hero_chips">
        <span class="tm_chip"><i class="fas fa-heart"></i> Respeto</span>
        <span class="tm_chip"><i class="fas fa-shield-halved"></i> Transparencia</span>
        <span class="tm_chip"><i class="fas fa-gavel"></i> Claridad</span>
      </div>
      <div class="tm_last_upd">
        <i class="fas fa-calendar-check"></i>
        Última actualización: ${n()} · Versión v10
      </div>
    </div>
  </section>

  <!-- ══ ÍNDICE RÁPIDO ══ -->
  <div class="tm_index_band">
    ${r.map((e,t)=>`
      <a href="#tm_sec_${t}" class="tm_index_item">
        <i class="fas ${e.ico}" style="color:${e.color}"></i>
        <span>${e.tit}</span>
      </a>`).join(``)}
  </div>

  <!-- ══ SECCIONES ══ -->
  <section class="ac_sec tm_secciones">
    <div class="ac_sec_head">
      <div class="ac_sec_badge"><i class="fas fa-list-check"></i> Acuerdo de Uso</div>
      <h2 class="ac_sec_tit">Reglamento <span class="ac_grad">General</span></h2>
      <p class="ac_sec_sub">Lee con atención. El uso de CumpleWii requiere la aceptación de estas condiciones.</p>
    </div>
    <div class="tm_secs_grid">
      ${r.map((e,t)=>`
        <div class="tm_sec_card wi_fadeUp" id="tm_sec_${t}">
          <div class="tm_sec_header">
            <div class="tm_sec_ico" style="--tc:${e.color}">
              <i class="fas ${e.ico}"></i>
            </div>
            <div>
              <span class="tm_sec_num" style="color:${e.color}">${e.num}</span>
              <h2 class="tm_sec_tit">${e.tit}</h2>
            </div>
          </div>
          <div class="tm_sec_body">${e.body}</div>
        </div>`).join(``)}
    </div>
  </section>

</div></main>
`,a=null,o=()=>{let n=new IntersectionObserver(t=>{t.forEach(t=>{t.isIntersecting&&e(t.target).addClass(`visible`)})},{threshold:.1});a=n,e(`.wi_fadeUp`).each(function(){n.observe(this)}),e(document).on(`click.terminos`,`.tm_nav`,function(t){t.preventDefault();let{rutas:n}=window._wiRutas??{};n?.navigate?.(e(this).attr(`href`))}),e(document).on(`click.terminos`,`.tm_index_item`,function(t){t.preventDefault();let n=document.querySelector(e(this).attr(`href`));n&&window.scrollTo({top:n.getBoundingClientRect().top+scrollY-90,behavior:`smooth`})}),window.wiInitTips&&window.wiInitTips(),console.log(`📜 ${t} Términos cargados`),window.__WIREADY__=!0},s=()=>{a?.disconnect?.(),a=null,e(document).off(`.terminos`)};export{s as cleanup,o as init,i as render};