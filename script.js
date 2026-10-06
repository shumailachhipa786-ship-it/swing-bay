const modal=document.querySelector('#bookingModal');
document.querySelectorAll('.js-book').forEach(b=>b.addEventListener('click',()=>modal.showModal()));
document.querySelector('.modal-close').addEventListener('click',()=>modal.close());
modal.addEventListener('click',e=>{if(e.target===modal)modal.close()});

const date=document.querySelector('#date'),time=document.querySelector('#time'),duration=document.querySelector('#duration'),estimate=document.querySelector('#estimate'),rateLabel=document.querySelector('#rateLabel');
const today=new Date();date.min=today.toISOString().split('T')[0];date.value=date.min;
function rateFor(){const d=new Date(date.value+'T12:00:00').getDay(),h=parseInt((time.value||'18:00').split(':')[0]);if(d===0||d===6)return[65,'Sat–Sun · $65/hr'];if(d===5)return h<17?[45,'Friday before 5 PM · $45/hr']:[60,'Friday after 5 PM · $60/hr'];return h<17?[35,'Mon–Thu before 5 PM · $35/hr']:[48,'Mon–Thu after 5 PM · $48/hr'];}
function updateEstimate(){const[r,l]=rateFor();estimate.textContent='$'+(r*parseFloat(duration.value)).toFixed(2);rateLabel.textContent=l;}
[date,time,duration].forEach(el=>el.addEventListener('change',updateEstimate));updateEstimate();
document.querySelector('#bookingForm').addEventListener('submit',e=>{e.preventDefault();alert('Demo request captured. Connect this button to your reservation system, email form, or payment provider when ready.');modal.close();});

document.querySelectorAll('.menu-tabs button').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.menu-tabs button').forEach(x=>x.classList.remove('active'));btn.classList.add('active');const f=btn.dataset.filter;document.querySelectorAll('.menu-item').forEach(i=>i.style.display=(f==='all'||i.dataset.cat===f)?'flex':'none');}));
document.querySelectorAll('.food-thumbs button').forEach(btn=>btn.addEventListener('click',()=>{const img=document.querySelector('#foodImage');img.style.opacity=.2;setTimeout(()=>{img.src=btn.dataset.img;img.style.opacity=1},180)}));

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const tilt=document.querySelector('.tilt');if(tilt&&matchMedia('(pointer:fine)').matches){tilt.addEventListener('mousemove',e=>{const r=tilt.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;tilt.style.transform=`rotateY(${x*8-5}deg) rotateX(${-y*7}deg) translateY(-4px)`});tilt.addEventListener('mouseleave',()=>tilt.style.transform='rotateY(-7deg) rotateX(2deg)');}

// Premium pointer-parallax for cards (desktop only)
if(matchMedia('(pointer:fine)').matches){
  document.querySelectorAll('.experience-card,.event-card').forEach(card=>{
    card.addEventListener('mousemove',e=>{
      const r=card.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
      card.style.transform=`perspective(900px) translateY(-10px) rotateX(${-y*4}deg) rotateY(${x*5}deg)`;
      const img=card.querySelector('img'); if(img) img.style.transform=`scale(1.1) translate(${x*-7}px,${y*-7}px)`;
    });
    card.addEventListener('mouseleave',()=>{card.style.transform='';const img=card.querySelector('img');if(img)img.style.transform=''});
  });
}

// Working mobile hamburger menu
const menuBtn=document.querySelector('.menu-btn');
const desktopNav=document.querySelector('.desktop-nav');
if(menuBtn&&desktopNav){
  const mobileNav=document.createElement('nav');
  mobileNav.className='mobile-nav-panel';
  mobileNav.setAttribute('aria-label','Mobile navigation');
  mobileNav.innerHTML=desktopNav.innerHTML;
  document.body.appendChild(mobileNav);
  menuBtn.setAttribute('aria-expanded','false');
  menuBtn.addEventListener('click',()=>{
    const open=mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded',String(open));
    menuBtn.setAttribute('aria-label',open?'Close menu':'Open menu');
    menuBtn.textContent=open?'✕':'☰';
  });
  mobileNav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
    mobileNav.classList.remove('open');
    menuBtn.setAttribute('aria-expanded','false');
    menuBtn.setAttribute('aria-label','Open menu');
    menuBtn.textContent='☰';
  }));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&mobileNav.classList.contains('open')){mobileNav.classList.remove('open');menuBtn.setAttribute('aria-expanded','false');menuBtn.textContent='☰';}});
}
