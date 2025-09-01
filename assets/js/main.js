document.getElementById('year').textContent = new Date().getFullYear();

// Floating hearts effect
const hearts = document.getElementById('hearts');
function popHearts(x = window.innerWidth/2, y = window.innerHeight/2){
  for(let i=0;i<10;i++){
    const span = document.createElement('span');
    span.className = 'heart';
    span.textContent = '❤';
    span.style.left = (x + (Math.random()*120-60))+'px';
    span.style.top = (y + (Math.random()*40-20))+'px';
    span.style.fontSize = (16 + Math.random()*18) + 'px';
    hearts.appendChild(span);
    setTimeout(()=>span.remove(), 4000);
  }
}
document.addEventListener('click', (e)=>{
  // Avoid spamming inside lightbox
  if(e.target.closest('.lightbox')) return;
  popHearts(e.clientX, e.clientY);
});
