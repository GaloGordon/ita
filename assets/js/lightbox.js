(async function(){
  const container = document.getElementById('gallery');
  if(!container) return;

  // Load manifest
  let photos = [];
  try {
    const res = await fetch('assets/photos/photos.json', {cache:'no-store'});
    photos = await res.json();
  } catch(e){
    console.warn('No photos.json found or invalid JSON.', e);
  }

  // Render masonry items
  const nodes = photos.map((p, idx)=>{
    const a = document.createElement('a');
    a.href = p.src;
    a.dataset.index = idx;
    const img = document.createElement('img');
    img.loading = 'lazy';
    img.alt = p.alt || 'Photo';
    img.src = p.thumb || p.src;
    a.appendChild(img);
    return a;
  });
  nodes.forEach(n => container.appendChild(n));

  // Lightbox
  const lb = document.getElementById('lightbox');
  if(!lb) return;
  const img = lb.querySelector('img');
  const btnClose = lb.querySelector('.close');
  const btnPrev = lb.querySelector('.prev');
  const btnNext = lb.querySelector('.next');
  let current = 0;

  function open(i){
    current = i;
    const p = photos[current];
    img.src = p.src;
    img.alt = p.alt || 'Photo';
    lb.classList.add('open');
    lb.setAttribute('aria-hidden','false');
  }
  function close(){
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden','true');
    img.src = '';
  }
  function prev(){ open((current - 1 + photos.length) % photos.length); }
  function next(){ open((current + 1) % photos.length); }

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
