(function(){
  const box = document.getElementById('countdown');
  if(!box) return;
  const target = new Date(box.dataset.date);
  const d = document.getElementById('d');
  const h = document.getElementById('h');
  const m = document.getElementById('m');
  const s = document.getElementById('s');

  function tick(){
    const now = new Date();
    let diff = Math.max(0, target - now);
    const days = Math.floor(diff/86400000); diff -= days*86400000;
    const hours = Math.floor(diff/3600000); diff -= hours*3600000;
    const mins = Math.floor(diff/60000); diff -= mins*60000;
    const secs = Math.floor(diff/1000);
    d.textContent = days; h.textContent = hours; m.textContent = mins; s.textContent = secs;
  }
  tick();
  setInterval(tick, 1000);
})();
