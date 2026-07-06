(function () {
  const items = [
    ['Neon Runner X','runner','189 EUR','limited','#d8ff3e'],['Black Court Phantom','court','149 EUR','limited','#111827'],['Retro Pulse 90','lifestyle','129 EUR','classic','#ef4444'],['Cloud Foam White','runner','99 EUR','open','#f8fafc'],
    ['Desert Track Low','trail','139 EUR','open','#b59f76'],['Redline High','basket','159 EUR','limited','#dc2626'],['Silver Metro Runner','runner','179 EUR','premium','#c0c0c0'],['Midnight Suede','lifestyle','135 EUR','classic','#1e1b4b'],
    ['Acid Green Drop','skate','120 EUR','limited','#84cc16'],['Vintage Gum Sole','lifestyle','110 EUR','open','#a16207'],['Tech Knit Carbon','runner','199 EUR','premium','#334155'],['Blue Orbit','basket','155 EUR','limited','#2563eb'],
    ['Cream Street Pro','lifestyle','125 EUR','open','#f5f5dc'],['Shadow Skate','skate','115 EUR','classic','#27272a'],['Gold Tag Limited','collector','249 EUR','limited','#d4af37'],['Concrete Runner','runner','135 EUR','open','#737373']
  ].map((row, index) => ({ id:`sneaker_${index+1}`, name:row[0], title:row[0], category:row[1], price:row[2], rarity:row[3], color:row[4], tags:[row[1],row[3]], cta:{label:'Entrar al drop',href:'#'}, rewardType: row[3] === 'limited' ? 'drop_access' : row[1] === 'lifestyle' ? 'outfit' : row[2].startsWith('9') ? 'coupon' : 'product' }));
  const els = ['stage','grid','phasePill','hostLine','rewardPanel','rewardTitle','progress','question','microcopy','startBtn','secretBtn','noBtn','yesBtn','downloadBtn','resetBtn','toast'].reduce((a,id)=>(a[id]=document.getElementById(id),a),{});
  let deck = window.ZoltanSelectionEngine.createDeck(items).deck;
  let session = null;
  let phase = 'attract';
  let revealItem = null;
  let reward = null;
  let lastPointer = 0;

  function track(name,payload){ if(window.ZoltanAnalytics) window.ZoltanAnalytics.track(name,Object.assign({module:'zoltan-sneaker-drop-oracle'},payload||{})); }
  function toast(text){ els.toast.textContent=text; els.toast.classList.add('on'); clearTimeout(toast.t); toast.t=setTimeout(()=>els.toast.classList.remove('on'),2200); }
  function setPhase(next){ phase=next; els.stage.classList.toggle('is-question',phase==='question'); updateCopy(); updateButtons(); render(); }
  function currentItems(){ return phase==='question' ? window.ZoltanSelectionEngine.getQuestionGroup(session) : phase==='reveal' && revealItem ? [revealItem] : deck; }
  function updateCopy(){
    els.phasePill.textContent=phase.toUpperCase();
    if(phase==='attract'){ els.hostLine.textContent='Piensa una sneaker. No la digas. Si el oraculo acierta, el drop se abre.'; els.progress.textContent='Drop cerrado'; els.question.textContent='Piensa una sneaker. No la pulses.'; els.microcopy.textContent='Si la señal coincide, desbloqueas acceso.'; }
    if(phase==='pick'){ els.hostLine.textContent='Elige una en tu mente. El drop detectara tu huella.'; els.progress.textContent='Paso 1'; els.question.textContent='Mira el muro y piensa una sneaker.'; els.microcopy.textContent='Cuando la tengas, pulsa el boton.'; }
    if(phase==='question'){ els.hostLine.textContent='Izquierda NO. Derecha SI. Touch o botones.'; els.progress.textContent=`Lectura ${session.currentBit+1} de ${session.maxBits}`; els.question.textContent='Tu sneaker aparece aqui?'; els.microcopy.textContent='El drop esta buscando coincidencias.'; }
    if(phase==='tension'){ els.hostLine.textContent='Tu eleccion acaba de dejar huella.'; els.progress.textContent='Acceso calculandose'; els.question.textContent='El drop se esta abriendo.'; els.microcopy.textContent='No hay QR falso: el pase sera local y descargable.'; }
    if(phase==='reveal'){ els.hostLine.textContent='El oraculo ha encontrado tu sneaker.'; els.progress.textContent='Pase desbloqueado'; els.question.textContent=`Estabas pensando en: ${revealItem.name}`; els.microcopy.textContent='Guarda, copia o descarga tu pase.'; }
  }
  function updateButtons(){ els.startBtn.classList.toggle('hidden',phase!=='attract'); els.secretBtn.classList.toggle('hidden',phase!=='pick'); els.noBtn.disabled=phase!=='question'; els.yesBtn.disabled=phase!=='question'; els.downloadBtn.disabled=phase!=='reveal'; }
  function card(item){ const tilt=((item.index%5)-2)*1.2; return `<article class="card ${phase==='reveal'?'reveal':''}" style="--c:${item.color};--tilt:${tilt}deg"><div class="shoe">S${item.index+1}</div><div class="body"><strong>${item.name}</strong><span>${item.category} · ${item.price}</span><small>${item.rarity} · ${item.rewardType}</small></div></article>`; }
  function render(){ els.grid.innerHTML=currentItems().map(card).join(''); if(reward&&window.ZoltanRewardLayer){ window.ZoltanRewardLayer.renderRewardCard(els.rewardPanel,reward,{item:revealItem}); } else { els.rewardPanel.innerHTML='<span>Reward</span><strong id="rewardTitle">Aun no hay pase.</strong><p>Completa el ritual para desbloquear acceso, wishlist o codigo.</p>'; } }
  function start(){ session=window.ZoltanSelectionEngine.createSession(deck); revealItem=null; reward=null; if(window.ZoltanTelemetry) window.ZoltanTelemetry.startSession('zoltan-sneaker-drop-oracle'); track('zoltan_sneaker_started'); setPhase('pick'); }
  function begin(){ session=window.ZoltanSelectionEngine.resetSession(session); setPhase('question'); }
  function answer(yes,source){ if(phase!=='question')return; if(window.ZoltanTelemetry) window.ZoltanTelemetry.recordInteraction('answer',{answer:yes?'yes':'no',source}); session=window.ZoltanSelectionEngine.answerCurrentQuestion(session,yes); track('zoltan_sneaker_answered',{answer:yes?'yes':'no'}); if(session.phase==='reveal'){ setPhase('tension'); setTimeout(reveal,750); } else render(),updateCopy(); }
  function reveal(){ const result=window.ZoltanSelectionEngine.getReveal(session); revealItem=result.ok?result.item:deck[0]; reward=window.ZoltanRewardLayer.createReward(revealItem,{type:revealItem.rewardType,title:`Drop desbloqueado: ${revealItem.name}`,subtitle:`Rareza ${revealItem.rarity}. Tu señal ha abierto una accion.`,description:'Pase local listo para guardar, copiar o descargar. QR real queda para una fase con generador local.',accentColor:revealItem.color,metadata:{module:'zoltan-sneaker-drop-oracle',sector:'sneaker',selectedItemId:revealItem.id}}); if(window.ZoltanTelemetry) window.ZoltanTelemetry.endSession({revealed:true}); track('zoltan_sneaker_revealed',{item:revealItem.id}); setPhase('reveal'); toast('Drop desbloqueado.'); }
  function download(){ if(reward) window.ZoltanRewardLayer.exportRewardPng(reward,{filename:`zoltan-sneaker-drop-${Date.now()}.png`}); }
  function reset(){ session=null; revealItem=null; reward=null; setPhase('attract'); }
  els.startBtn.addEventListener('click',start); els.secretBtn.addEventListener('click',begin); els.yesBtn.addEventListener('click',()=>answer(true,'button')); els.noBtn.addEventListener('click',()=>answer(false,'button')); els.downloadBtn.addEventListener('click',download); els.resetBtn.addEventListener('click',reset); els.stage.addEventListener('pointerdown',(e)=>{ if(phase!=='question'||Date.now()-lastPointer<650)return; lastPointer=Date.now(); const r=els.stage.getBoundingClientRect(); if(window.ZoltanTelemetry) window.ZoltanTelemetry.recordFallback(e.pointerType||'pointer-zone'); answer(e.clientX-r.left>r.width/2,'zone'); });
  window.__ZOLTAN_SNEAKER_QA__=()=>deck.map((item)=>{ let s=window.ZoltanSelectionEngine.createSession(deck); for(let b=0;b<s.maxBits;b+=1)s=window.ZoltanSelectionEngine.answerCurrentQuestion(s,(item.binaryValue&(1<<b))!==0); const r=window.ZoltanSelectionEngine.getReveal(s); return {item:item.id,ok:r.ok&&r.item.id===item.id}; });
  track('zoltan_sneaker_loaded'); render(); updateCopy(); updateButtons();
})();
