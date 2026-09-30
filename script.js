const LET='ABCÇDEƏFGĞHXIİJKQLMNOÖPRSŞTUÜVYZ'.split('');
const up=s=>s.toLocaleUpperCase('az');
const CH={
robot:{n:'Robi',c:['#dff3ff','#6fb4ea','#2a5f94']},
astro:{n:'Kosmo',c:['#ffffff','#e3e9f2','#9aa8c0']},
monster:{n:'Bobo',c:['#d7ffb0','#6fd13c','#2f8a1d']},
cat:{n:'Mirtil',c:['#ffe2b8','#ff9a3d','#c25a0c']}};
const $=id=>document.getElementById(id);
let S={players:[],used:new Set(),sel:null,cur:null,qs:[],qi:0,g:new Set(),w:0,done:false,n:0};

function eyes(dead,pts,col,r){return pts.map(([x,y])=>dead?`<path d="M${x-6} ${y-6}L${x+6} ${y+6}M${x+6} ${y-6}L${x-6} ${y+6}" stroke="${col||'#222'}" stroke-width="3.5" stroke-linecap="round"/>`:`<circle cx="${x}" cy="${y}" r="${r||8}" fill="#fff"/><circle cx="${x+1}" cy="${y+1}" r="${(r||8)/2}" fill="#15203a"/><circle cx="${x-1}" cy="${y-2}" r="2" fill="#fff"/>`).join('')}
function head(k,d){
 const f='url(#g'+k+')';let h='';
 if(k=='robot')h=`<rect x="164" y="80" width="72" height="60" rx="18" fill="${f}"/><rect x="173" y="92" width="54" height="32" rx="11" fill="#0b2a3a"/>${d?eyes(1,[[189,108],[211,108]],'#5ff'):'<circle cx="189" cy="108" r="6" fill="#5ff"/><circle cx="211" cy="108" r="6" fill="#5ff"/>'}<line x1="200" y1="80" x2="200" y2="64" stroke="#2a5f94" stroke-width="4"/><circle cx="200" cy="60" r="7" fill="#ff5a5a"/>`;
 else if(k=='astro')h=`<circle cx="200" cy="112" r="34" fill="${f}"/><ellipse cx="200" cy="114" rx="25" ry="21" fill="#14234d"/>${d?eyes(1,[[191,114],[209,114]],'#8ef'):'<circle cx="191" cy="114" r="4.5" fill="#8ef"/><circle cx="209" cy="114" r="4.5" fill="#8ef"/>'}<ellipse cx="190" cy="104" rx="9" ry="4" fill="#fff" opacity=".55" transform="rotate(-20 190 104)"/><circle cx="200" cy="78" r="5" fill="#ff7a45"/>`;
 else if(k=='monster')h=`<path d="M176 88L170 66L190 82Z M224 88L230 66L210 82Z" fill="#2f8a1d"/><circle cx="200" cy="112" r="34" fill="${f}"/>${eyes(d,[[200,104]],'#222',14)}<path d="M183 125Q200 142 217 125Z" fill="#23361a"/><path d="M190 127v6M200 130v6M210 127v6" stroke="#fff" stroke-width="4" stroke-linecap="round"/>`;
 else h=`<path d="M170 98L172 66L194 84Z M230 98L228 66L206 84Z" fill="#ff9a3d"/><path d="M176 90L177 77L187 85Z M224 90L223 77L213 85Z" fill="#ffb6c1"/><circle cx="200" cy="112" r="34" fill="${f}"/>${eyes(d,[[188,106],[212,106]])}<path d="M196 118h8l-4 5Z" fill="#ff6f91"/><path d="M200 123q-6 7-12 3M200 123q6 7 12 3M172 118l-14-3M172 124l-14 3M228 118l14-3M228 124l14 3" stroke="#6b3a10" stroke-width="2" fill="none" stroke-linecap="round"/>`;
 return h+`<ellipse cx="188" cy="94" rx="11" ry="6" fill="#fff" opacity=".4" transform="rotate(-25 188 94)"/>`;
}
function fig(k,n,dead,gal,win){
 const c=CH[k].c,f='url(#g'+k+')';
 const defs=`<defs><radialGradient id="g${k}" cx=".35" cy=".3" r=".85"><stop offset="0" stop-color="${c[0]}"/><stop offset=".5" stop-color="${c[1]}"/><stop offset="1" stop-color="${c[2]}"/></radialGradient><linearGradient id="wd" x1="0" x2="1"><stop offset="0" stop-color="#c58a4e"/><stop offset="1" stop-color="#7d4d22"/></linearGradient><filter id="sh" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="6" stdDeviation="4" flood-opacity=".3"/></filter></defs>`;
 const G=gal?`<g filter="url(#sh)"><rect x="20" y="300" width="190" height="16" rx="8" fill="url(#wd)"/><rect x="50" y="30" width="13" height="276" rx="6" fill="url(#wd)"/><rect x="50" y="30" width="155" height="13" rx="6" fill="url(#wd)"/><path d="M63 92L112 43" stroke="#7d4d22" stroke-width="8" stroke-linecap="round"/><line x1="200" y1="42" x2="200" y2="${n>0?80:70}" stroke="#d9b98a" stroke-width="5" stroke-linecap="round"/></g>`:'';
 const P=[()=>head(k,dead),()=>`<ellipse cx="200" cy="190" rx="28" ry="43" fill="${f}"/>`,()=>`<ellipse cx="163" cy="186" rx="11" ry="35" transform="rotate(18 163 186)" fill="${f}"/>`,()=>`<ellipse cx="237" cy="186" rx="11" ry="35" transform="rotate(-18 237 186)" fill="${f}"/>`,()=>`<ellipse cx="187" cy="256" rx="13" ry="33" transform="rotate(5 187 256)" fill="${f}"/>`,()=>`<ellipse cx="213" cy="256" rx="13" ry="33" transform="rotate(-5 213 256)" fill="${f}"/>`];
 let body='';const m=gal?n:6;
 for(let i=0;i<m;i++)body+=`<g class="${i==m-1&&gal&&n==S.n&&S.anim?'pop':''}">${P[i]()}</g>`;
 const hi=m>1?`<ellipse cx="190" cy="172" rx="8" ry="15" fill="#fff" opacity=".25"/>`:'';
 return defs+G+`<g filter="url(#sh)" class="${dead?'sway':win?'hop':''}">${body}${m>1?hi:''}</g>`;
}
function renderChars(){$('chars').innerHTML=Object.keys(CH).map(k=>`<button class="ch" data-k="${k}" aria-pressed="${S.sel==k}"><svg viewBox="140 40 120 280">${fig(k,6,0,false)}</svg>${CH[k].n}</button>`).join('');
 document.querySelectorAll('.ch').forEach(b=>b.onclick=()=>{S.sel=b.dataset.k;renderChars();chk()})}
function chk(){$('go').disabled=!($('nm').value.trim()&&S.sel)}
function board(){const a=[...S.players].sort((x,y)=>y.sc-x.sc);$('board').hidden=!a.length;$('bl').innerHTML=a.map(p=>`<li><span>${p.name} (${CH[p.ch].n})</span><b>${p.sc} xal</b></li>`).join('')}
function rng(a){return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function pick(name){
 let h=Date.now()+S.players.length*7919;for(const ch of name)h=Math.imul(h^ch.charCodeAt(0),16777619);
 const r=rng(h),ix=[...Array(70).keys()];
 for(let i=69;i>0;i--){const j=Math.floor(r()*(i+1));[ix[i],ix[j]]=[ix[j],ix[i]]}
 if(S.used.size>60)S.used.clear();
 ix.sort((a,b)=>S.used.has(a)-S.used.has(b));
 const q=ix.slice(0,10);q.forEach(i=>S.used.add(i));return q;
}
function show(id){['start','play','end'].forEach(s=>$(s).hidden=s!=id)}
$('go').onclick=()=>{S.cur={name:$('nm').value.trim(),ch:S.sel,sc:0,ok:0};S.qs=pick(S.cur.name);S.qi=0;S.players.push(S.cur);show('play');load()};
$('nm').oninput=chk;
function load(){
 const [h,a]=Q[S.qs[S.qi]].split('|');S.word=up(a);S.g=new Set();S.w=0;S.done=false;S.n=0;S.anim=false;
 $('cat').textContent=CATS[Math.floor(S.qs[S.qi]/10)];$('hint').textContent=h;$('msg').textContent='';$('next').hidden=true;
 $('kb').innerHTML=LET.map(l=>`<button class="k" data-l="${l}">${l}</button>`).join('');
 document.querySelectorAll('.k').forEach(b=>b.onclick=()=>guess(b.dataset.l));
 draw();
}
function draw(lose,win){
 $('who').textContent=`${S.cur.name} · ${CH[S.cur.ch].n}`;$('qn').textContent=`Sual ${S.qi+1}/10`;$('sc').textContent=`Xal: ${S.cur.sc}`;
 $('hr').textContent='♥'.repeat(6-S.w)+'♡'.repeat(S.w);
 $('word').innerHTML=[...S.word].map(c=>{const s=S.g.has(c);return `<span class="${!s&&lose?'miss':''}">${s||lose?c:''}</span>`}).join('');
 $('fig').innerHTML=fig(S.cur.ch,S.w,lose,true,win);
}
function guess(l){
 if(S.done||S.g.has(l))return;S.g.add(l);
 const b=document.querySelector(`.k[data-l="${l}"]`);b.disabled=true;
 if(S.word.includes(l)){b.classList.add('ok');}else{b.classList.add('no');S.w++;S.n=S.w;S.anim=true;}
 const won=[...S.word].every(c=>S.g.has(c)),lost=S.w>=6;
 if(won||lost){S.done=true;document.querySelectorAll('.k').forEach(k=>k.disabled=true);
  if(won){const p=10+(6-S.w)*2;S.cur.sc+=p;S.cur.ok++;$('msg').textContent=`Əla! +${p} xal`;$('msg').style.color='var(--ok)'}
  else{$('msg').textContent=`Doğru cavab: ${S.word}`;$('msg').style.color='var(--bad)'}
  $('next').hidden=false;$('next').textContent=S.qi==9?'Nəticəyə bax':'Növbəti sual';
 }
 draw(lost,won);S.anim=false;
}
$('next').onclick=()=>{if(S.qi<9){S.qi++;load()}else finish()};
function finish(){
 show('end');const p=S.cur;
 $('endfig').innerHTML=fig(p.ch,6,0,false,p.ok>=5);
 $('endt').textContent=`${p.name}, oyun bitdi`;$('ends').textContent=p.sc;
 $('endd').textContent=`10 sualdan ${p.ok}-ni düzgün cavablandırdın.`;
}
$('again').onclick=()=>{$('nm').value='';S.sel=null;renderChars();chk();board();show('start')};
document.addEventListener('keydown',e=>{
 if(e.target.tagName=='INPUT'||e.ctrlKey||e.metaKey||$('play').hidden)return;
 if(e.key=='Enter'&&!$('next').hidden){$('next').click();return}
 if(e.key.length==1){const l=up(e.key);if(LET.includes(l))guess(l)}
});
renderChars();
