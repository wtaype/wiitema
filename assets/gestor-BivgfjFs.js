import{n as e}from"./vendor-BuoCFfzO.js";import{g as t}from"./widev-DlmvaZ2M.js";var n=()=>{let e=t.user;return!e||e.rol!==`gestor`&&e.rol!==`admin`?`<div class="g_page"><div class="g_empty"><i class="fas fa-ban"></i> Acceso denegado.</div></div>`:`
    <div class="g_wrap">
      <!-- HERO AREA -->
      <header class="g_header wi_fadeUp">
        <div class="g_header_left">
          <div class="g_avatar"><i class="fas fa-user-tie"></i></div>
          <div class="g_welcome">
            <h1>Panel Gestor</h1>
            <p>Bienvenido, <strong>${e.nombre||e.usuario}</strong>. Monitorea las operaciones y ventas en tiempo real.</p>
          </div>
        </div>
      </header>

      <!-- KPI GRID -->
      <div class="g_kpis wi_fadeUp" style="animation-delay: 0.1s">
        <div class="g_kpi_card">
          <div class="g_kpi_ico" style="--gc: #FF5C69;"><i class="fas fa-chart-line"></i></div>
          <div class="g_kpi_info">
            <h3>$12,450</h3>
            <span>Ventas del Mes</span>
          </div>
        </div>
        <div class="g_kpi_card">
          <div class="g_kpi_ico" style="--gc: #29C72E;"><i class="fas fa-users"></i></div>
          <div class="g_kpi_info">
            <h3>48</h3>
            <span>Usuarios Activos</span>
          </div>
        </div>
        <div class="g_kpi_card">
          <div class="g_kpi_ico" style="--gc: #0EBEFF;"><i class="fas fa-route"></i></div>
          <div class="g_kpi_info">
            <h3>14</h3>
            <span>Tours Programados</span>
          </div>
        </div>
      </div>

      <!-- MAIN CONTENT GRID -->
      <div class="g_content_grid wi_fadeUp" style="animation-delay: 0.2s">
        <!-- RECENT REGISTERS TABLE -->
        <div class="g_card_main">
          <div class="g_card_head">
            <h2><i class="fas fa-history"></i> Registros Recientes</h2>
          </div>
          <div class="g_table_wrap">
            <table class="g_table">
              <thead>
                <tr>
                  <th>Vendedor</th>
                  <th>Tour</th>
                  <th>Puntos</th>
                  <th>Fecha</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Marcos Pérez</strong></td>
                  <td>Excursión Chichén Itzá</td>
                  <td><span class="g_badge_pts">+150</span></td>
                  <td>28/05/2026</td>
                  <td><span class="g_status_badge success">Aprobado</span></td>
                </tr>
                <tr>
                  <td><strong>Sofía Gómez</strong></td>
                  <td>Snorkel Cozumel</td>
                  <td><span class="g_badge_pts">+80</span></td>
                  <td>27/05/2026</td>
                  <td><span class="g_status_badge success">Aprobado</span></td>
                </tr>
                <tr>
                  <td><strong>Carlos Ruiz</strong></td>
                  <td>Tulum Ruins Express</td>
                  <td><span class="g_badge_pts">+100</span></td>
                  <td>26/05/2026</td>
                  <td><span class="g_status_badge warning">Pendiente</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `},r=()=>{e(`.wi_fadeUp`).addClass(`visible wi_visible`),window.__WIREADY__=!0},i=()=>{};export{i as cleanup,r as init,n as render};