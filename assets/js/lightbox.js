(async function(){
  const container = document.getElementById('gallery');
  if(!container) return;

  // Cargar manifiesto
  let fotos = [];
  try {
    const res = await fetch('assets/fotos/fotos.json', {cache:'no-store'});
    fotos = await res.json();
  } catch(e){
    console.warn('No existe fotos.json o JSON inválido.', e);
  }

  // Render: figure (tile) + caption
  const nodes = fotos.map((p, idx)=>{
    const fig = document.createElement('figure');

    const a = document.createElement('a');
    a.href = p.src;
    a.dataset.index = idx;

    const img = document.createElement('img');
    img.loading = 'lazy';
    img.alt = p.alt || p.caption || 'Foto';
    img.src = p.thumb || p.src;

    const cap = document.createElement('figcaption');
    cap.textContent = p.caption || p.alt || '';

    a.appendChild(img);
    fig.appendChild(a);
    if (cap.textContent) fig.appendChild(cap);
    return fig;
  });
  nodes.forEach(n => container.appendChild(n));

  // Lightbox
  const lb = document.getElementById('lightbox');
  if(!lb) return;
  const img = lb.querySelector('img');
  const lbCap = document.getElementById('lb-cap');
  const btnClose = lb.querySelector('.close');
  const btnPrev = lb.querySelector('.prev');
  const btnNext = lb.querySelector('.next');
  let current = 0;

  function open(i){
    current = i;
    const p = fotos[current];
    img.src = p.src;
    img.alt = p.alt || p.caption || 'Foto';
    if (lbCap) lbCap.textContent = p.caption || p.alt || '';
    lb.classList.add('open');
    lb.setAttribute('aria-hidden','false');
  }
  function close(){
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden','true');
    img.src = '';
    if (lbCap) lbCap.textContent = '';
  }
  function prev(){ open((current - 1 + fotos.length) % fotos.length); }
  function next(){ open((current + 1) % fotos.length); }

  container.addEventListener('click', (e)=>{
    const a = e.target.closest('a');
    if(!a) return;
    e.preventDefault();
    open(parseInt(a.dataset.index, 10));
  });

  btnClose.addEventListener('click', close);
  btnPrev.addEventListener('click', prev);
  btnNext.addEventListener('click', next);
  document.addEventListener('keydown', (e)=>{
    if(!lb.classList.contains('open')) return;
    if(e.key === 'Escape') close();
    if(e.key === 'ArrowLeft') prev();
    if(e.key === 'ArrowRight') next();
  });
})();
