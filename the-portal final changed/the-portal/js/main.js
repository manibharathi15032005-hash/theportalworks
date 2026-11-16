(function(){
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const c=navigator.connection||{};
const slow=reduce||c.saveData||/(^|-)2g|3g/.test(c.effectiveType||'');
const EMAIL='theportal246@gmail.com',IG='theportal.st',WA=['919025799363','917305657959'];
const page=document.body.dataset.page;

/* shared nav + footer */
const links=[['index.html','home','Home'],['about.html','about','About & Services'],['work.html','work','Our Work'],['contact.html','contact','Contact']];
document.body.insertAdjacentHTML('afterbegin',
`<div class="grain"></div><div class="rail">The Portal — Creative Team — Chennai</div>
<header class="nav"><a class="logo" href="index.html" aria-label="The Portal home"><img src="assets/images/logo-white.png" alt="The Portal"></a>
<button class="burger" aria-label="Menu" aria-expanded="false"><span></span><span></span></button>
<ul>${links.map(l=>`<li><a class="l${l[1]===page?' on':''}" href="${l[0]}"${l[1]===page?' aria-current="page"':''}>${l[2]}</a></li>`).join('')}
<li><a class="btn red nav-cta" href="contact.html">Start a Project</a></li></ul></header>`);
$('main').insertAdjacentHTML('afterend',
`<footer><div class="ft"><div><img src="assets/images/logo-white.png" alt="The Portal"><p>Your Ideas. Our Creativity. One Portal.</p></div>
<div><h4>Contact</h4><a href="mailto:${EMAIL}">${EMAIL}</a><a href="https://wa.me/${WA[1]}">+91 73056 57959</a><a href="https://wa.me/${WA[0]}">+91 90257 99363</a><a href="https://instagram.com/${IG}">@${IG}</a></div>
<div><h4>Navigate</h4>${links.map(l=>`<a href="${l[0]}">${l[2]}</a>`).join('')}</div></div>
<p class="copy">© The Portal — Creative Team, Chennai</p></footer>`);
const burger=$('.burger'),menu=$('.nav ul');
burger.onclick=()=>{const o=menu.classList.toggle('open');burger.setAttribute('aria-expanded',o)};

/* preloader 5 → 1 (once per session) */
function ready(){document.body.classList.add('ready')}
if(document.documentElement.classList.contains('preload')){
  document.body.insertAdjacentHTML('afterbegin','<div id="pre"><b>5</b><i>THE PORTAL</i></div>');
  const pre=$('#pre'),n=$('b',pre);let k=5;ready();
  const t=setInterval(()=>{k--;if(k<1){clearInterval(t);pre.classList.add('out');sessionStorage.setItem('seen','1');setTimeout(()=>pre.remove(),500)}else n.textContent=k},reduce?120:380);
}else ready();
addEventListener('pageshow',e=>{if(e.persisted)document.body.classList.remove('leaving')});

/* page transitions */
document.addEventListener('click',e=>{const a=e.target.closest('a');if(!a||reduce||a.target||e.metaKey||e.ctrlKey)return;
  const u=new URL(a.href,location);if(u.origin!==location.origin||a.getAttribute('href').startsWith('#')||u.pathname===location.pathname&&u.hash)return;
  e.preventDefault();document.body.classList.add('leaving');setTimeout(()=>location.href=a.href,280)});

/* reveal + faq */
const ro=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');ro.unobserve(x.target)}}),{threshold:.15});
$$('.reveal').forEach(el=>ro.observe(el));
$$('.q button').forEach(b=>b.onclick=()=>{const q=b.parentElement,o=q.classList.toggle('open');b.setAttribute('aria-expanded',o)});

/* contact form → real email via FormSubmit (falls back to mailto) */
const f=$('#cform');if(f)f.onsubmit=async e=>{e.preventDefault();
  const d=new FormData(f),st=$('#fstatus'),btn=$('button',f);
  if(d.get('_honey'))return;
  btn.disabled=true;btn.textContent='Sending…';st.className='';st.textContent='';
  try{
    const r=await fetch('https://formsubmit.co/ajax/'+EMAIL,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},
      body:JSON.stringify({name:d.get('name'),email:d.get('email'),requirements:d.get('req'),_subject:'New project enquiry — '+d.get('name'),_template:'table',_captcha:'false'})});
    const j=await r.json();if(!r.ok||j.success==='false'||j.success===false)throw 0;
    f.reset();st.className='ok';st.textContent='Message sent. We’ll get back to you soon.';
  }catch(_){
    st.className='err';st.innerHTML='Couldn’t send right now. <a href="mailto:'+EMAIL+'?subject='+encodeURIComponent('Project enquiry from '+d.get('name'))+'&body='+encodeURIComponent(d.get('req')+'\n\n'+d.get('email'))+'"><u>Send by email</u></a> or <a href="https://wa.me/'+WA[0]+'"><u>message us on WhatsApp</u></a>.';
  }
  btn.disabled=false;btn.textContent='Contact';};

/* client feedback slider */
const rv=$('#reviews');if(rv&&typeof reviews!=='undefined'){
  const star=(r,i)=>`<i style="--w:${Math.max(0,Math.min(1,r-i))*100};--i:${i}"></i>`;
  rv.innerHTML=reviews.map(r=>`<figure class="rcard"><div class="stars" role="img" aria-label="${r.rating} out of 5 stars">${[0,1,2,3,4].map(i=>star(r.rating,i)).join('')}<b class="mono">${r.rating.toFixed(1)}</b></div><span class="mono">${r.topic}</span><blockquote>${r.text}</blockquote><figcaption>${r.name}</figcaption></figure>`).join('');
  const avg=reviews.reduce((s,r)=>s+r.rating,0)/reviews.length,sum=$('#rsum');
  sum.innerHTML=`<strong class="disp" data-n="${avg.toFixed(1)}">0.0</strong><span class="mono">average rating<br>from ${reviews.length} clients</span>`;
  const wrap=rv.closest('.rsec'),bar=$('.rbar i',wrap),num=$('strong',sum);
  const prog=()=>{const m=rv.scrollWidth-rv.clientWidth;bar.style.width=(m>0?Math.max(.12,rv.scrollLeft/m):1)*100+'%'};
  rv.addEventListener('scroll',prog,{passive:true});prog();
  const gap=()=>parseFloat(getComputedStyle(rv).columnGap)||0;
  const next=()=>{if(rv.scrollLeft+rv.clientWidth>=rv.scrollWidth-6)rv.scrollTo({left:0,behavior:'smooth'});else rv.scrollBy({left:rv.firstElementChild.offsetWidth+gap(),behavior:'smooth'})};
  const prev=()=>{if(rv.scrollLeft<6)rv.scrollTo({left:rv.scrollWidth,behavior:'smooth'});else rv.scrollBy({left:-(rv.firstElementChild.offsetWidth+gap()),behavior:'smooth'})};
  $('#rnext').onclick=()=>{next();pause=Date.now()+8000};$('#rprev').onclick=()=>{prev();pause=Date.now()+8000};
  let pause=0,seen=false,hold=false;
  ['mouseenter','focusin','touchstart'].forEach(e=>rv.addEventListener(e,()=>hold=true,{passive:true}));
  ['mouseleave','focusout','touchend'].forEach(e=>rv.addEventListener(e,()=>{hold=false;pause=Date.now()+4000},{passive:true}));
  rv.addEventListener('keydown',e=>{if(e.key==='ArrowRight')next();if(e.key==='ArrowLeft')prev()});
  /* mouse drag */
  let dx=0,sl=0,drag=false;
  rv.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse')return;drag=true;dx=e.clientX;sl=rv.scrollLeft;rv.classList.add('drag')});
  addEventListener('pointermove',e=>{if(drag)rv.scrollLeft=sl-(e.clientX-dx)});
  addEventListener('pointerup',()=>{if(drag){drag=false;rv.classList.remove('drag')}});
  /* entrance: stars fill + number counts up, then autoplay */
  new IntersectionObserver((es,o)=>es.forEach(x=>{seen=x.isIntersecting;if(x.isIntersecting&&!wrap.classList.contains('in')){wrap.classList.add('in');
    const t=+num.dataset.n;if(reduce)num.textContent=t.toFixed(1);else{const s=performance.now();(function f(n){const p=Math.min(1,(n-s)/1400);num.textContent=(t*(1-Math.pow(1-p,3))).toFixed(1);if(p<1)requestAnimationFrame(f)})(s)}}}),{threshold:.3}).observe(wrap);
  if(!reduce)setInterval(()=>{if(seen&&!hold&&!lbOpenFlag()&&Date.now()>pause)next()},4200);
  function lbOpenFlag(){return false}
}

/* free-trial reward (claimable) */
const WAMSG=encodeURIComponent('Hi The Portal! I claimed the FREE TRIAL reward on your website and I’d like to book it.');
const GIFT='<svg viewBox="0 0 120 120" aria-hidden="true"><g class="lid"><rect x="14" y="34" width="92" height="22" fill="#E7A431"/><rect x="52" y="34" width="16" height="22" fill="#C61D25"/><path d="M60 34c-6-20-30-22-30-10s20 10 30 10zM60 34c6-20 30-22 30-10S70 44 60 34z" fill="none" stroke="#C61D25" stroke-width="7" stroke-linejoin="round"/></g><rect x="20" y="56" width="80" height="52" fill="#C61D25"/><rect x="52" y="56" width="16" height="52" fill="#E7A431"/></svg>';
$$('.reward-mount').forEach(m=>{
  m.innerHTML=`<div class="reward"><div class="rays"></div><div class="rbody"><div class="gift">${GIFT}<i class="sp s1">✦</i><i class="sp s2">✦</i><i class="sp s3">✦</i></div>
  <div class="rtext"><span class="mono">★ Reward drop · Legendary</span>
  <h2 class="disp"><span class="before">Free trial<br>unlocked</span><span class="after">Reward<br>claimed ✓</span></h2>
  <p class="before">You’ve found a reward. Claim it to book your free trial with The Portal.</p>
  <p class="after">Nice! Your free trial is yours. Tell us about your idea and we’ll set it up.</p>
  <button class="btn red claim before">Claim reward</button>
  <div class="row after"><a class="btn red" href="https://wa.me/${WA[0]}?text=${WAMSG}">Book on WhatsApp</a><a class="btn" href="contact.html?reward=1">Book by form</a></div></div></div></div>`;
  const box=$('.reward',m),btn=$('.claim',m);
  const set=()=>{box.classList.add('claimed')};
  try{if(localStorage.getItem('portal_reward')==='1')set()}catch(e){}
  btn.onclick=()=>{box.classList.add('opening');
    if(!reduce){const r=$('.gift',box).getBoundingClientRect(),b=box.getBoundingClientRect(),cols=['#E7A431','#C61D25','#F5F1EA','#1C6E68','#2E4A8E'];
      for(let i=0;i<40;i++){const s=document.createElement('span');s.className='conf';s.style.cssText=`left:${r.left-b.left+r.width/2}px;top:${r.top-b.top+r.height/3}px;background:${cols[i%5]}`;box.appendChild(s);
        const a=Math.random()*Math.PI*2,d=90+Math.random()*190;
        s.animate([{transform:'translate(0,0) rotate(0)',opacity:1},{transform:`translate(${Math.cos(a)*d}px,${Math.sin(a)*d+80}px) rotate(${Math.random()*720}deg)`,opacity:0}],{duration:1100+Math.random()*700,easing:'cubic-bezier(.2,.8,.3,1)'}).onfinish=()=>s.remove()}}
    setTimeout(()=>{box.classList.add('claimed');try{localStorage.setItem('portal_reward','1')}catch(e){}},reduce?0:650)};
});
if(/[?&]reward=1/.test(location.search)){const t=$('#cform textarea');if(t)t.value='I claimed the FREE TRIAL reward and I’d like to book it.\n\nMy idea: '}

/* ---------- video portfolio ---------- */
if(typeof portfolioVideos==='undefined')return;
const pad=n=>String(n).padStart(2,'0'),active=portfolioVideos.filter(v=>v.active),soon=portfolioVideos.filter(v=>!v.active);
const inline=[];
function card(v,cls=''){
  const meta=`<div class="vh"><b>REEL ${pad(v.id)}</b><span>9:16 · ${v.duration||''}</span></div>`;
  const foot=`<div class="vf"><strong>${v.title}</strong><span>${v.category}</span></div>`;
  if(!v.active)return `<div class="vcard soon ${cls}">${meta.replace(/9:16 · /,'9:16 ')}<div class="vbox"><div><span class="hand">coming soon</span><span class="mono">SLOT ${pad(v.id)} · RESERVED</span></div></div>${foot.replace(v.title,'Next project')}</div>`;
  return `<button class="vcard ${cls}" data-id="${v.id}" aria-label="Play ${v.title} with sound">${meta}<div class="vbox${slow?' still':''}">${slow?`<img src="${v.poster}" alt="${v.title} poster" loading="lazy">`:`<video muted loop playsinline preload="none" poster="${v.poster}" data-src="${v.src}"></video>`}<span class="play"><i></i></span></div>${foot}</button>`}
const hf=$('#featured'),wa=$('#work-active'),ws=$('#work-soon'),hero=$('#hero-poster');
if(hf)hf.innerHTML=active.slice(0,3).map(v=>card(v)).join('');
if(wa)wa.innerHTML=active.map((v,i)=>card(v,i===0?'feat':'')).join('');
if(ws)ws.innerHTML=soon.map(v=>card(v)).join('');
if(hero&&active[0]){hero.innerHTML=card(active[0]);}

/* one-at-a-time inline autoplay */
const vis=new Map();
const vo=new IntersectionObserver(es=>{es.forEach(x=>vis.set(x.target,x.isIntersecting?x.intersectionRatio:0));pick()},{threshold:[0,.25,.5,.75,1]});
function pick(){let best=null,r=.45;vis.forEach((ratio,v)=>{if(ratio>r){r=ratio;best=v}});
  vis.forEach((_,v)=>{if(v===best){if(!v.src)v.src=v.dataset.src;if(!lbOpen)v.play().catch(()=>{})}else v.pause()})}
$$('.vbox video').forEach(v=>{vis.set(v,0);vo.observe(v)});

/* lightbox */
let lbOpen=false;
document.body.insertAdjacentHTML('beforeend','<div id="lb" role="dialog" aria-modal="true" aria-label="Video player"><div class="in"><button class="x" aria-label="Close video">×</button><video controls playsinline></video><div class="cap"></div></div></div>');
const lb=$('#lb'),lv=$('video',lb);let last=null;
function open(id){const v=portfolioVideos.find(x=>x.id==id);if(!v)return;lbOpen=true;vis.forEach((_,e)=>e.pause());
  lv.poster=v.poster;lv.src=v.src;lv.muted=false;$('.cap',lb).textContent=`Reel ${pad(v.id)} — ${v.title}`;lb.classList.add('on');document.body.style.overflow='hidden';lv.play().catch(()=>{});$('.x',lb).focus()}
function close(){lbOpen=false;lv.pause();lv.removeAttribute('src');lv.load();lb.classList.remove('on');document.body.style.overflow='';last&&last.focus();pick()}
document.addEventListener('click',e=>{const c=e.target.closest('button.vcard');if(c){last=c;open(c.dataset.id)}});
lb.addEventListener('click',e=>{if(e.target===lb||e.target.closest('.x'))close()});
addEventListener('keydown',e=>{if(e.key==='Escape'&&lbOpen)close()});
})();
