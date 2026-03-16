// Atualiza relógio
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

// Captura o nome da plataforma via parâmetro da URL
const params = new URLSearchParams(window.location.search);
const platform = params.get('p') || 'Jubarte';

// Destaca o botão atual
document.querySelectorAll('.plat').forEach(btn => {
  if(btn.dataset.name.toLowerCase() === platform.toLowerCase()){
    btn.classList.add('active');
  }
  btn.addEventListener('click', () => {
    window.location.href = `platform.html?p=${btn.dataset.name}`;
  });
});

// Atualiza volume e gráfico fictício conforme a plataforma
const volume = {
  Tartaruga: 220,
  Golfinho: 140,
  Jubarte: 310,
  "Agua-viva": 180,
  Tubarão: 260
};
document.getElementById('burnVolume').textContent = volume[platform] || 0;

// Gráfico simples
(function drawChart(){
  const c = document.getElementById('perfChart');
  const ctx = c.getContext('2d');
  const W = c.clientWidth, H = c.clientHeight;
  const dpr = window.devicePixelRatio || 1;
  c.width = W*dpr; c.height = H*dpr; ctx.scale(dpr,dpr);

  ctx.clearRect(0,0,W,H);
  ctx.strokeStyle = '#e5e7eb'; ctx.lineWidth = 1;
  for(let y=40; y<H; y+=40){ ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }

  function wave(color, shift){
    ctx.beginPath(); ctx.strokeStyle = color; ctx.lineWidth = 2;
    for(let x=0;x<=W;x++){
      const t = (x/W)*Math.PI*2;
      const y = H/2 + Math.sin(t+shift)*H/4;
      if(x===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
    }
    ctx.stroke();
  }
  wave('#4ba896', 0);
  wave('#d9a97a', 1.5);
})();