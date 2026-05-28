import{n as e}from"./vendor-BuoCFfzO.js";import{t}from"./wii-B7KacVyR.js";import{C as n,i as r,u as i}from"./widev-4Rjv6ciq.js";import"./index-Dt5s5XVG.js";var a=[{name:`Coolors.co`,category:`colores`,icon:`fa-palette`,badge:`Paletas`,url:`https://coolors.co/`,desc:`Generador de paletas de color ultra-veloz. Permite explorar miles de combinaciones curadas al instante.`,tip:`Presiona la <strong>Barra Espaciadora</strong> para generar esquemas cromáticos aleatorios de alta fidelidad.`},{name:`Adobe Color`,category:`colores`,icon:`fa-swatchbook`,badge:`Armonías`,url:`https://color.adobe.com/`,desc:`La suite profesional para crear esquemas basados en reglas cromáticas y validar contraste accesible WCAG.`,tip:`Usa su pestaña <strong>Accesibilidad</strong> para asegurar que tus textos pasen el estándar AAA en fondo oscuro.`},{name:`Color Hunt`,category:`colores`,icon:`fa-dropper`,badge:`Colecciones`,url:`https://colorhunt.co/`,desc:`Una galería abierta de paletas de colores frescas y modernas actualizada diariamente por la comunidad.`,tip:`Filtra por categorías como <strong>Retro, Neon o Pastel</strong> para encontrar paletas inspiradoras.`},{name:`Google Fonts`,category:`fuentes`,icon:`fa-font`,badge:`Tipografía`,url:`https://fonts.google.com/`,desc:`El catálogo tipográfico libre más grande de la web, con descarga e importación instantánea de archivos.`,tip:`Filtra por la categoría <strong>Display</strong> si estás buscando fuentes llamativas y futuristas para encabezados.`},{name:`Type Scale`,category:`fuentes`,icon:`fa-arrow-down-up-lock`,badge:`Escalas`,url:`https://typescale.com/`,desc:`Calculadora matemática de proporciones de fuente para estructurar una jerarquía perfecta y consistente.`,tip:`La proporción <strong>1.250 (Major Third)</strong> es idónea para landing pages profesionales y legibles.`},{name:`Wordmark.it`,category:`fuentes`,icon:`fa-paragraph`,badge:`Visualizador`,url:`https://wordmark.it/`,desc:`Visualiza una cadena de texto personalizada utilizando todas las familias de fuentes instaladas en tu sistema.`,tip:`Excelente para elegir la tipografía ideal de un logotipo comparando 50+ fuentes lado a lado.`},{name:`Font Awesome`,category:`iconos`,icon:`fa-icons`,badge:`Librería`,url:`https://fontawesome.com/`,desc:`La biblioteca de iconos vectoriales de referencia mundial, compatible con web, SVG y librerías JS.`,tip:`Utiliza su versión <strong>Free 6</strong> para acceder a más de 2,000 iconos con estilo consistente.`},{name:`Iconify`,category:`iconos`,icon:`fa-magnifying-glass`,badge:`Unificador`,url:`https://iconify.design/`,desc:`Buscador universal que recopila decenas de conjuntos de iconos (Feather, Material, Boxicons) en un solo lugar.`,tip:`Puedes copiar la declaración en **React, SVG puro o Vue** en segundos directamente desde el dock.`},{name:`Simple Icons`,category:`iconos`,icon:`fa-share-nodes`,badge:`Marcas`,url:`https://simpleicons.org/`,desc:`Colección de más de 3,000 iconos vectoriales SVG de las marcas y redes sociales más populares del mundo.`,tip:`Cada icono incluye el color corporativo oficial en **HEX** para pintar fondos o acentos.`},{name:`SVGOMG`,category:`recursos`,icon:`fa-image`,badge:`Optimizador`,url:`https://jakearchibald.github.io/svgomg/`,desc:`Limpiador y compresor premium de archivos SVG para eliminar código innecesario de Illustrator.`,tip:`<strong>¡Obligatorio!</strong> Pasa tus SVGs por aquí para reducir su peso hasta un 80% antes de inyectarlos en HTML.`},{name:`uiverse.io`,category:`recursos`,icon:`fa-wand-magic-sparkles`,badge:`Micro UI`,url:`https://uiverse.io/`,desc:`Impresionante galería de micro-componentes (botones, inputs, switches, loaders) listos en HTML y CSS.`,tip:`Casi todos los elementos tienen animaciones de hover excelentes. Ideal para ahorrar horas de diseño.`},{name:`Freepik`,category:`recursos`,icon:`fa-images`,badge:`Vectores y Fotos`,url:`https://www.freepik.com/`,desc:`Catálogo de recursos creativos que ofrece millones de vectores, mockups, plantillas e ilustraciones pro.`,tip:`Descarga archivos en formato **EPS** para poder manipular los vectores de forma libre en tu software de diseño.`},{name:`Unsplash`,category:`recursos`,icon:`fa-camera`,badge:`Fotografía`,url:`https://unsplash.com/`,desc:`El banco de fotos por excelencia para imágenes artísticas y de altísima resolución libres de derechos.`,tip:`Utiliza su motor de búsqueda en **Inglés** para obtener fotos más específicas y de mejor calidad.`},{name:`CSS-Tricks`,category:`inspiracion`,icon:`fa-code`,badge:`CSS Docs`,url:`https://css-tricks.com/`,desc:`Portal de referencia mundial con tutoriales de CSS Grid, Flexbox y animaciones avanzadas.`,tip:`Su <strong>Guía Completa de Flexbox y Grid</strong> es la biblia obligatoria para maquetar interfaces responsivas.`},{name:`Dribbble`,category:`inspiracion`,icon:`fa-basketball`,badge:`Mockups UI`,url:`https://dribbble.com/`,desc:`La red social de diseñadores estrella. Ideal para encontrar mockups de interfaz modernos e inspiración cromática.`,tip:`Usa su buscador de **Paleta de Colores** para encontrar piezas gráficas que compartan tus mismos tonos HSL.`},{name:`Behance`,category:`inspiracion`,icon:`fa-compass`,badge:`Portafolios`,url:`https://www.behance.net/`,desc:`Galería global de agencias y creadores visuales donde exponen proyectos completos de branding e interfaces complejas.`,tip:`Es perfecto para analizar casos de estudio y flujos de experiencia de usuario (UX) sumamente maduros.`}],o=`all`,s=()=>{let t=e(`#tl_grid_container`);if(!t.length)return;let r=[];r=o===`all`?a:a.filter(e=>e.category===o);let i=r.map(e=>`
      <a href="${e.url}" target="_blank" class="tl_card" ${n(`Visitar ${e.name}`)}>
        <div class="tl_card_header">
          <div class="tl_card_icon">
            <i class="fas ${e.icon}"></i>
          </div>
          <span class="tl_badge">${e.badge}</span>
        </div>
        
        <h4 class="tl_card_title">${e.name}</h4>
        <p class="tl_card_desc">${e.desc}</p>
        
        <div class="tl_tip_box">
          <strong>Tip Experto:</strong> ${e.tip}
        </div>
        
        <span class="tl_link_indicator">
          Visitar Sitio <i class="fas fa-arrow-right"></i>
        </span>
      </a>
    `).join(``);t.html(i),n()},c=()=>{let e=i(`wiSmile`)||{},n=e.nombre||e.usuario||e.email||``;return`
  <div class="mwb" style="animation: wi_fadeUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;">
    <div style="margin-top: 4vh; text-align: center; margin-bottom: 2vh;">
      <h2 style="font-size: var(--fz_x1); font-weight: 900; color: var(--tx1);">
        Herramientas de Diseño & Enlaces Pro 🛠️
      </h2>
    </div>

    <!-- Header Block -->
    <div class="input_tabs" style="margin: 2vh auto 4vh; padding: 0.8vh; border-radius: 1.5vh; background: var(--bg5); border: 1px solid var(--brd); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 2vh;">
      <div style="display: flex; align-items: center; gap: 1.5vh; margin-left: 1vh;">
        <img src="/smile.avif" alt="${t}" style="width: 4vh; height: 4vh; border-radius: 50%; box-shadow: var(--bs_m);" />
        <div style="text-align: left;">
          <span style="font-size: 11px; font-weight: 700; color: var(--tx3); text-transform: uppercase;">Curated Bookmarks & Tips</span>
          <p style="margin: 0; font-size: var(--fz_s3); color: var(--tx1); font-weight: 800;">${r()} <strong>${n}</strong></p>
        </div>
      </div>
    </div>

    <!-- MAIN GRID CONTAINER -->
    <div class="tl_container">
      
      <!-- Pestañas de categorías -->
      <div class="input_tabs" style="background: var(--bg5); border: 1px solid var(--brd); display: flex; flex-wrap: wrap; gap: 4px; padding: 4px; border-radius: 1vh; max-width: 900px; margin: 0 auto 4vh;">
        <button class="tab_btn active tl_tab_btn" data-category="all" style="font-size: var(--fz_s3); padding: 0.8vh 1.2vh;" data-witip="Mostrar todo el directorio"><i class="fas fa-border-all"></i> Todos</button>
        <button class="tab_btn tl_tab_btn" data-category="colores" style="font-size: var(--fz_s3); padding: 0.8vh 1.2vh;" data-witip="Generadores y validadores de color"><i class="fas fa-palette"></i> Colores</button>
        <button class="tab_btn tl_tab_btn" data-category="fuentes" style="font-size: var(--fz_s3); padding: 0.8vh 1.2vh;" data-witip="Fuentes tipográficas y jerarquías"><i class="fas fa-font"></i> Fuentes</button>
        <button class="tab_btn tl_tab_btn" data-category="iconos" style="font-size: var(--fz_s3); padding: 0.8vh 1.2vh;" data-witip="Repositorios de iconos vectoriales"><i class="fas fa-icons"></i> Iconos</button>
        <button class="tab_btn tl_tab_btn" data-category="recursos" style="font-size: var(--fz_s3); padding: 0.8vh 1.2vh;" data-witip="Optimizadores de SVGs, micro UI y recursos libres"><i class="fas fa-images"></i> Recursos & SVGs</button>
        <button class="tab_btn tl_tab_btn" data-category="inspiracion" style="font-size: var(--fz_s3); padding: 0.8vh 1.2vh;" data-witip="Portafolios, CSS Docs e inspiraciones visuales"><i class="fas fa-wand-magic-sparkles"></i> Inspiración</button>
      </div>

      <!-- Bookmarks Grid -->
      <div class="tl_grid" id="tl_grid_container">
        <!-- Dinámico -->
      </div>
    </div>
  </div>`},l=()=>{n(),s(),e(document).on(`click.tl`,`.tl_tab_btn`,function(t){t.preventDefault(),o=e(this).data(`category`),e(`.tl_tab_btn`).removeClass(`active`),e(this).addClass(`active`),s()})},u=()=>{e(document).off(`.tl`)};export{u as cleanup,l as init,c as render};