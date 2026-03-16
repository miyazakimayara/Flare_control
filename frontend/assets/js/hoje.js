/* ===========================
   Dashboard JS (sem API)
   - Relógio (data/hora)
   - Gráfico em canvas
   - Navegação por plataforma
   =========================== */

// ---------- Relógio ----------
function pad(n) { return String(n).padStart(2, "0"); }
function weekday(i) {
  return [
    "domingo", "segunda-feira", "terça-feira",
    "quarta-feira", "quinta-feira", "sexta-feira", "sábado"
  ][i];
}
function tickClock() {
  const d = new Date();
  const dateStr =
    `${weekday(d.getDay())}, ${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
  const timeStr =
    `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;

  const dateEl = document.getElementById("dateStr");
  const timeEl = document.getElementById("timeStr");
  if (dateEl) dateEl.textContent = dateStr;
  if (timeEl) timeEl.textContent = timeStr;
}
setInterval(tickClock, 1000);
tickClock();

// // ---------- Gráfico (canvas) ----------
// (function initChart() {
//   const canvas = document.getElementById("perfChart");
//   if (!canvas) return;

//   const ctx = canvas.getContext("2d");

//   function draw() {
//     const dpr = window.devicePixelRatio || 1;
//     const W = canvas.clientWidth;
//     const H = canvas.clientHeight;

//     // alta densidade (nitidez)
//     canvas.width = W * dpr;
//     canvas.height = H * dpr;
//     ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

//     // grid
//     ctx.clearRect(0, 0, W, H);
//     ctx.lineWidth = 1;
//     ctx.strokeStyle = "#eaeef0";
//     for (let y = 30; y < H; y += 40) {
//       ctx.beginPath();
//       ctx.moveTo(0, y);
//       ctx.lineTo(W, y);
//       ctx.stroke();
//     }

//     // ondas
//     function wave(color, amp, base, shift) {
//       ctx.beginPath();
//       ctx.lineWidth = 2;
//       ctx.strokeStyle = color;

//       for (let x = 0; x <= W; x++) {
//         const t = (x / W) * Math.PI * 2;
//         const y = base + Math.sin(t + shift) * amp;
//         if (x === 0) ctx.moveTo(x, y);
//         else ctx.lineTo(x, y);
//       }
//       ctx.stroke();
//     }

//     wave("#4ba896", 26, H * 0.65, 0.0);  // verde água
//     wave("#d9a97a", 20, H * 0.60, 1.3);  // laranja claro
//     wave("#6cc0b2", 24, H * 0.72, 2.2);  // verde claro
//   }

//   draw();
//   window.addEventListener("resize", draw);
// })();

// ---------- Navegação por plataforma ----------
(function initPlatforms() {
  document.querySelectorAll(".plat").forEach((btn) => {
    btn.addEventListener("click", () => {

      // remove classe dos outros
      document.querySelectorAll(".plat").forEach(p => p.classList.remove("active"));

      // adiciona no clicado
      btn.classList.add("active");

      const nameSpan = btn.querySelector("span:last-child");
      const name = (nameSpan ? nameSpan.textContent : btn.textContent).trim();

      // tempo suficiente para a animação (0.2s)
      setTimeout(() => {
        window.location.href = `plataforma.html?p=${encodeURIComponent(name)}`;
      }, 250); // 250ms = suave e perceptível
    });
  });
})();