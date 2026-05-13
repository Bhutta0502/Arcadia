// Sales & Launches dashboard interactions
(function(){
  const D = window.SOBHA;
  const fmt = n => n==null||isNaN(n)? '–' : (Math.abs(n)>=1000? Math.round(n).toLocaleString('en-US') : n.toLocaleString('en-US'));
  const fmtMn = n => fmt(Math.round(n));
  const fmtSft = n => n==null||isNaN(n)? '–' : Math.round(n).toLocaleString('en-US');
  const fmtPct = n => n==null? '–' : n.toFixed(1)+'%';
  const sign = n => n>0?'+':'';

  let state = { city: 'all', q: 'all', cmp: 'both', share: 'total', invUnit: 'mn', invShare: 'total', projInvUnit: 'mn', projInvShare: 'total', expandedCities: new Set() };
  const tooltip = document.getElementById('tooltip');
  function tt(html, e){
    tooltip.innerHTML = html;
    tooltip.classList.add('on');
    tooltip.style.left = Math.min(window.innerWidth-220, e.clientX+12)+'px';
    tooltip.style.top = (e.clientY+12)+'px';
  }
  function ttHide(){ tooltip.classList.remove('on'); }

  // -------- City bar chart --------
  function drawCityBar(){
    const svg = document.getElementById('cityBar');
    if(!svg) return;
    const data = [...D.citySales].filter(d=>d.fy27>0).sort((a,b)=>b.fy27-a.fy27);
    const W=800, H=320, m={t:14,r:24,b:46,l:50};
    const iw=W-m.l-m.r, ih=H-m.t-m.b;
    const showCmp = state.cmp==='both';
    const showTot = state.share==='total' || state.share==='both';
    const showShr = state.share==='sobha' || state.share==='both';
    const max = Math.max(...data.map(d=> Math.max(d.fy27, showCmp?d.fy26:0, d.share27)))*1.12;
    const bw = iw/data.length;
    let html = `<g class="grid">`;
    for(let i=0;i<=4;i++){
      const v=max*i/4, y=m.t+ih-(v/max)*ih;
      html += `<line x1="${m.l}" x2="${W-m.r}" y1="${y}" y2="${y}"/>`;
      html += `<text x="${m.l-6}" y="${y+3}" text-anchor="end">${(v/1000).toFixed(0)}k</text>`;
    }
    html += `</g>`;
    data.forEach((d,i)=>{
      const x = m.l + i*bw + 6;
      const cols = (showCmp?1:0) + (state.share==='both'?1:0) + 1;
      const w = (bw-12)/Math.max(1,cols) - 2;
      let xc = x;
      if(showTot){
        const h=(d.fy27/max)*ih, y=m.t+ih-h;
        html += `<rect x="${xc}" y="${y}" width="${w}" height="${h}" fill="var(--accent)"/>`;
        xc += w + 2;
      }
      if(showShr){
        const h=(d.share27/max)*ih, y=m.t+ih-h;
        html += `<rect x="${xc}" y="${y}" width="${w}" height="${h}" fill="var(--gold)" opacity="0.85"/>`;
        xc += w + 2;
      }
      if(showCmp){
        const h=(d.fy26/max)*ih, y=m.t+ih-h;
        html += `<rect x="${xc}" y="${y}" width="${w}" height="${h}" fill="var(--info)" opacity="0.85"/>`;
      }
      html += `<rect class="hover-target" x="${m.l+i*bw}" y="${m.t}" width="${bw}" height="${ih}" data-i="${i}" data-city="${d.city}"/>`;
      html += `<text x="${m.l+i*bw+bw/2}" y="${H-30}" text-anchor="middle" fill="var(--text-2)" style="font-size:10px">${d.city.length>9?d.city.substr(0,8)+'.':d.city}</text>`;
      html += `<text x="${m.l+i*bw+bw/2}" y="${H-18}" text-anchor="middle" style="font-size:9px;fill:var(--accent)">${(d.fy27/1000).toFixed(1)}k</text>`;
      if(showCmp) html += `<text x="${m.l+i*bw+bw/2}" y="${H-8}" text-anchor="middle" style="font-size:8px">${sign(d.growth)}${d.growth.toFixed(0)}%</text>`;
    });
    svg.innerHTML = html;
    svg.querySelectorAll('.hover-target').forEach(r=>{
      r.addEventListener('mousemove', e=>{
        const d = data[+r.dataset.i];
        tt(`<div class="tt-t">${d.city}</div>
          <div class="tt-r"><span class="lab">FY27E Sales</span><span class="val">₹${fmt(d.fy27)} Mn</span></div>
          <div class="tt-r"><span class="lab">Sobha Share</span><span class="val">₹${fmt(d.share27)}</span></div>
          <div class="tt-r"><span class="lab">FY26A Sales</span><span class="val">₹${fmt(d.fy26)}</span></div>
          <div class="tt-r"><span class="lab">YoY Growth</span><span class="val ${d.growth>0?'pos':'neg'}">${sign(d.growth)}${d.growth.toFixed(1)}%</span></div>
          <div class="tt-r"><span class="lab">5Y CAGR</span><span class="val">${d.cagr.toFixed(1)}%</span></div>
          <div class="tt-r"><span class="lab">Avg Realisation</span><span class="val">₹${fmt(d.real)}/sft</span></div>`, e);
      });
      r.addEventListener('mouseleave', ttHide);
    });
  }

  // -------- Trend chart --------
  function drawTrend(){
    const svg = document.getElementById('trendChart');
    if(!svg) return;
    const W=380,H=320, m={t:20,r:18,b:36,l:46};
    const iw=W-m.l-m.r, ih=H-m.t-m.b;
    const re=D.trend.re;
    const max = Math.max(...re.map(d=>d.v))*1.18;
    let html=`<g class="grid">`;
    for(let i=0;i<=4;i++){
      const v=max*i/4, y=m.t+ih-(v/max)*ih;
      html += `<line x1="${m.l}" x2="${W-m.r}" y1="${y}" y2="${y}"/>`;
      html += `<text x="${m.l-6}" y="${y+3}" text-anchor="end">${(v/1000).toFixed(0)}k</text>`;
    }
    html += `</g>`;
    const xPos = i => m.l + (i/(re.length-1))*iw;
    const lineGen = (arr, max) => arr.map((d,i)=>`${i==0?'M':'L'}${xPos(i)},${m.t+ih-(d.v/max)*ih}`).join(' ');
    html += `<path d="${lineGen(re,max)}" fill="none" stroke="var(--accent)" stroke-width="2"/>`;
    re.forEach((d,i)=>{
      html += `<circle cx="${xPos(i)}" cy="${m.t+ih-(d.v/max)*ih}" r="3" fill="var(--accent)"/>`;
      html += `<text x="${xPos(i)}" y="${H-18}" text-anchor="middle">${d.y}</text>`;
      html += `<text x="${xPos(i)}" y="${m.t+ih-(d.v/max)*ih-10}" text-anchor="middle" style="font-size:9px;fill:var(--accent)">${(d.v/1000).toFixed(0)}k</text>`;
    });
    svg.innerHTML = html;
  }

  // -------- Inventory table --------
  function drawInv(filter=''){
    const tb = document.querySelector('#invTable tbody');
    if(!tb) return;
    let data = [...D.inv].sort((a,b)=>b.salesVal-a.salesVal);
    if(filter){ const f=filter.toLowerCase(); data = data.filter(d=>d.city.toLowerCase().includes(f)); }
    // Sobha-share factor per city: ratio of FY27 sobha share to total sales
    const shareFactor = {};
    D.citySales.forEach(cs => { shareFactor[cs.city] = cs.fy27 ? (cs.share27/cs.fy27) : 1; });
    const isShare = state.invShare === 'sobha';
    const sf = (city) => isShare ? (shareFactor[city] ?? 1) : 1;
    // Units-per-sft ratio per city, derived from project data (units / sba) — used for the Units toggle
    const upsfByCity = {};
    let panU=0, panS=0;
    (D.projects||[]).forEach(p=>{
      if(!p.units || !p.sba) return;
      upsfByCity[p.city] = upsfByCity[p.city] || {u:0,s:0};
      upsfByCity[p.city].u += p.units; upsfByCity[p.city].s += p.sba;
      panU += p.units; panS += p.sba;
    });
    const panRatio = panS ? panU/panS : 0;
    const upsf = (city) => {
      const r = upsfByCity[city];
      return r && r.s ? r.u/r.s : panRatio;
    };
    // apply share factor to rows + recompute totals
    data = data.map(d => {
      const f = sf(d.city);
      const r = upsf(d.city);
      return {
        ...d,
        oVal: d.oVal*f, oSft: d.oSft*f, oUnits: Math.round(d.oSft*f*r),
        nVal: d.nVal*f, nSft: d.nSft*f, nUnits: Math.round(d.nSft*f*r),
        sVal: d.sVal*f, sUnits: Math.round((d.oSft+d.nSft)*f*r),
        salesVal: d.salesVal*f, salesSft: d.salesSft*f, salesUnits: Math.round(d.salesSft*f*r),
        cVal: d.cVal*f, cSft: d.cSft*f, cUnits: Math.round(d.cSft*f*r)
      };
    });
    let totals={oVal:0,oSft:0,oUnits:0,nVal:0,nSft:0,nUnits:0,sVal:0,sUnits:0,salesVal:0,salesSft:0,salesUnits:0,cVal:0,cSft:0,cUnits:0};
    data.forEach(d=>{ Object.keys(totals).forEach(k=>totals[k]+=d[k]||0); });
    const totalPct = (totals.salesVal/totals.sVal*100);
    const unit = state.invUnit; // 'mn' | 'sft' | 'units'
    const v = (mn, sft, u) => unit==='mn' ? fmt(mn) : unit==='sft' ? fmtSft(sft) : fmt(u);
    const sale = (mn, sft, u) => `<span class="pos">${v(mn,sft,u)}</span>`;
    let html = `<tr class="total total-top clickrow" data-pan="1" style="cursor:pointer">
      <td class="l">PAN INDIA · TOTAL</td>
      <td>${v(totals.oVal,totals.oSft,totals.oUnits)}</td>
      <td>${v(totals.nVal,totals.nSft,totals.nUnits)}</td>
      <td>${unit==='mn'?fmt(totals.sVal):unit==='sft'?fmtSft(totals.oSft+totals.nSft):fmt(totals.sUnits)}</td>
      <td>${sale(totals.salesVal,totals.salesSft,totals.salesUnits)}</td>
      <td><span class="meter"><i style="width:${totalPct}%"></i></span> ${totalPct.toFixed(1)}%</td>
      <td>${v(totals.cVal,totals.cSft,totals.cUnits)}</td>
    </tr>`;
    data.forEach(d=>{
      html += `<tr class="clickrow" data-city="${d.city}">
        <td class="l">${d.city}</td>
        <td>${v(d.oVal,d.oSft,d.oUnits)}</td>
        <td>${v(d.nVal,d.nSft,d.nUnits)}</td>
        <td>${v(d.sVal,d.oSft+d.nSft,d.sUnits)}</td>
        <td>${sale(d.salesVal,d.salesSft,d.salesUnits)}</td>
        <td><span class="meter"><i style="width:${Math.min(100,d.pct)}%"></i></span> ${d.pct.toFixed(1)}%</td>
        <td>${v(d.cVal,d.cSft,d.cUnits)}</td>
      </tr>`;
    });
    tb.innerHTML = html;
  }

  // -------- Launches table --------
  function drawLaunches(filter=''){
    const tb = document.querySelector('#launchTable tbody');
    if(!tb) return;
    let data = D.launches;
    if(filter){
      const f = filter.toLowerCase();
      data = data.filter(d=> d.name.toLowerCase().includes(f) || d.city.toLowerCase().includes(f) || d.month.toLowerCase().includes(f));
    }
    if(state.city!=='all') data = data.filter(d=>d.city===state.city);
    if(state.q!=='all') data = data.filter(d=>d.q===state.q);
    let html='';
    data.forEach(d=>{
      html += `<tr>
        <td class="l dim">${d.n}</td>
        <td class="l">${d.name}</td>
        <td class="l">${d.city}</td>
        <td class="l"><span class="chip amber">${d.month}</span></td>
        <td class="dim">${fmtSft(d.sba)}</td>
        <td>${fmt(d.inv)}</td>
        <td>${fmt(d.share)}</td>
        <td>${fmt(d.real)}</td>
        <td class="dim">${fmt(d.total)}</td>
        <td>${fmt(d.pre)}</td>
      </tr>`;
    });
    tb.innerHTML = html || '<tr><td colspan="10" class="dim" style="padding:30px;text-align:center">No launches match the filter.</td></tr>';
  }

  // -------- Avg realisation chart (horizontal bars, full-width) --------
  function drawAvgReal(){
    const svg = document.getElementById('avgRealChart');
    if(!svg) return;
    const data = [...D.citySales].filter(d=>d.real>0).sort((a,b)=>b.real-a.real);
    const W=1100, H=220, m={t:14,r:24,b:40,l:50};
    const iw=W-m.l-m.r, ih=H-m.t-m.b;
    const max = Math.max(...data.map(d=>d.real))*1.10;
    const bw = iw/data.length;
    let html=`<g class="grid">`;
    for(let i=0;i<=4;i++){
      const v=max*i/4, y=m.t+ih-(v/max)*ih;
      html += `<line x1="${m.l}" x2="${W-m.r}" y1="${y}" y2="${y}"/>`;
      html += `<text x="${m.l-6}" y="${y+3}" text-anchor="end">${(v/1000).toFixed(0)}k</text>`;
    }
    html += `</g>`;
    data.forEach((d,i)=>{
      const x = m.l + i*bw + bw*0.18;
      const w = bw*0.64;
      const h = (d.real/max)*ih;
      const y = m.t+ih-h;
      html += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="var(--accent)" opacity="0.88"/>`;
      html += `<text x="${x+w/2}" y="${y-5}" text-anchor="middle" style="font-size:10px;fill:var(--accent);font-family:'JetBrains Mono'">${fmt(Math.round(d.real))}</text>`;
      html += `<text x="${x+w/2}" y="${H-22}" text-anchor="middle" fill="var(--text-2)" style="font-size:10px">${d.city.length>9?d.city.substr(0,8)+'.':d.city}</text>`;
    });
    svg.innerHTML=html;
  }

  // -------- Quarterly sales chart (stacked) --------
  function drawQSales(){
    const svg = document.getElementById('qSalesChart');
    if(!svg) return;
    const data = [...D.citySales].filter(d=>d.fy27>0).sort((a,b)=>b.fy27-a.fy27);
    const W=800,H=300, m={t:14,r:24,b:36,l:50};
    const iw=W-m.l-m.r, ih=H-m.t-m.b;
    const max = Math.max(...data.map(d=>d.fy27))*1.05;
    const bw = iw/data.length - 8;
    const colors=['var(--info)','var(--teal)','var(--violet)','var(--accent)'];
    let html=`<g class="grid">`;
    for(let i=0;i<=4;i++){
      const v=max*i/4, y=m.t+ih-(v/max)*ih;
      html += `<line x1="${m.l}" x2="${W-m.r}" y1="${y}" y2="${y}"/>`;
      html += `<text x="${m.l-6}" y="${y+3}" text-anchor="end">${(v/1000).toFixed(0)}k</text>`;
    }
    html += `</g>`;
    data.forEach((d,i)=>{
      const x = m.l + i*(iw/data.length) + 4;
      let yCur = m.t+ih;
      ['q1','q2','q3','q4'].forEach((q,qi)=>{
        const h = (d[q]/max)*ih;
        yCur -= h;
        html += `<rect x="${x}" y="${yCur}" width="${bw}" height="${h}" fill="${colors[qi]}" opacity="0.9"/>`;
      });
      html += `<text x="${x+bw/2}" y="${H-22}" text-anchor="middle" fill="var(--text-2)" style="font-size:10px">${d.city.length>8?d.city.substr(0,7)+'.':d.city}</text>`;
      html += `<text x="${x+bw/2}" y="${H-10}" text-anchor="middle" style="font-size:9px;fill:var(--accent)">${(d.fy27/1000).toFixed(1)}k</text>`;
    });
    svg.innerHTML = html;
  }

  // -------- Walkthroughs chart (moved to walkthrough.html) --------
  function drawWT(){ return; const svg = document.getElementById('wtChart');
    const data = [...D.walkthroughs].filter(d=>d.u27>0||d.u26>0).sort((a,b)=>b.u27-a.u27);
    const W=380,H=360, m={t:14,r:14,b:14,l:90};
    const iw=W-m.l-m.r;
    const max = Math.max(...data.flatMap(d=>[d.u27,d.u26]))*1.05;
    const bh = (H-m.t-m.b)/data.length - 4;
    let html='';
    data.forEach((d,i)=>{
      const y = m.t + i*((H-m.t-m.b)/data.length);
      html += `<text x="${m.l-6}" y="${y+bh/2+3}" text-anchor="end" style="fill:var(--text-2);font-size:10px">${d.city}</text>`;
      html += `<rect x="${m.l}" y="${y}" width="${(d.u27/max)*iw}" height="${bh*0.5}" fill="var(--accent)"/>`;
      html += `<rect x="${m.l}" y="${y+bh*0.55}" width="${(d.u26/max)*iw}" height="${bh*0.45}" fill="var(--info)" opacity="0.7"/>`;
      html += `<text x="${m.l+(d.u27/max)*iw+4}" y="${y+bh*0.4}" style="fill:var(--accent);font-size:9px">${d.u27}</text>`;
      html += `<text x="${m.l+(d.u26/max)*iw+4}" y="${y+bh*0.95}" style="fill:var(--info);font-size:9px;opacity:0.8">${d.u26}</text>`;
    });
    svg.innerHTML = html;
  }

  // -------- Mix donut --------
  function drawMix(){
    const svg = document.getElementById('mixChart');
    if(!svg) return;
    const ongo = D.citySales.reduce((s,d)=>s+d.ongo,0);
    const newL = D.citySales.reduce((s,d)=>s+d.newL,0);
    const total = ongo+newL;
    const cx=190, cy=180, r=110, ir=70;
    const a1 = (ongo/total)*Math.PI*2;
    const arc = (start,end,outer,inner) => {
      const x1=cx+outer*Math.cos(start-Math.PI/2);
      const y1=cy+outer*Math.sin(start-Math.PI/2);
      const x2=cx+outer*Math.cos(end-Math.PI/2);
      const y2=cy+outer*Math.sin(end-Math.PI/2);
      const x3=cx+inner*Math.cos(end-Math.PI/2);
      const y3=cy+inner*Math.sin(end-Math.PI/2);
      const x4=cx+inner*Math.cos(start-Math.PI/2);
      const y4=cy+inner*Math.sin(start-Math.PI/2);
      const large = end-start>Math.PI?1:0;
      return `M${x1},${y1} A${outer},${outer} 0 ${large} 1 ${x2},${y2} L${x3},${y3} A${inner},${inner} 0 ${large} 0 ${x4},${y4} Z`;
    };
    let html = `<path d="${arc(0, a1, r, ir)}" fill="var(--info)"/>`;
    html += `<path d="${arc(a1, Math.PI*2-0.001, r, ir)}" fill="var(--accent)"/>`;
    html += `<text x="${cx}" y="${cy-4}" text-anchor="middle" style="fill:var(--text);font-size:18px;font-family:'IBM Plex Mono'">${(total/1000).toFixed(0)}k</text>`;
    html += `<text x="${cx}" y="${cy+12}" text-anchor="middle" style="fill:var(--text-3);font-size:9px;letter-spacing:0.1em">TOTAL Mn</text>`;
    html += `<text x="${cx}" y="${cy+r+30}" text-anchor="middle" style="fill:var(--info);font-size:11px">Ongoing ₹${fmt(ongo)} (${(ongo/total*100).toFixed(0)}%)</text>`;
    html += `<text x="${cx}" y="${cy+r+46}" text-anchor="middle" style="fill:var(--accent);font-size:11px">New Launch ₹${fmt(newL)} (${(newL/total*100).toFixed(0)}%)</text>`;
    svg.innerHTML = html;
  }

  // -------- Calendars (months × regions matrix) --------
  function drawCal(target, src, valFn, label, filter){
    const root = document.getElementById(target);
    if(!root) return;
    const f = (filter||'').toLowerCase().trim();
    const matches = it => !f || (it.n||'').toLowerCase().includes(f) || (it.city||'').toLowerCase().includes(f);

    // Region grouping
    const REGIONS = [
      { name:'NCR',       cities:['Gurgaon','Greater Noida','Delhi','Noida'] },
      { name:'Bangalore', cities:['Bangalore'] },
      { name:'Mumbai',    cities:['Mumbai'] },
      { name:'Kerala',    cities:['Cochin','Thrissur','Trivandrum','Calicut'] },
      { name:'Others',    cities:['Chennai','Hyderabad','Pune','GIFT City','Coimbatore'] }
    ];
    const cityToRegion = {};
    REGIONS.forEach(r => r.cities.forEach(c => cityToRegion[c] = r.name));
    const region = city => cityToRegion[city] || 'Others';
    const COLORS = {
      'NCR':'#3a6b9e', 'Bangalore':'#7a9156', 'Kerala':'#c75a3e',
      'Mumbai':'#8a6a9a', 'Others':'#9a8e6a'
    };
    const SUBS = {
      'NCR':'(Gurgaon, Greater Noida)',
      'Kerala':'(Cochin, Thrissur, Trivandrum, Calicut)',
      'Others':'(Chennai, Hyderabad, Pune)'
    };

    // Region counts (after filter)
    const counts = {}; REGIONS.forEach(r => counts[r.name]=0);
    Object.values(src).forEach(months => {
      months.forEach(mo => mo.items.forEach(it => { if(matches(it)) counts[region(it.city)]++; }));
    });

    const colTpl = `96px repeat(${REGIONS.length}, minmax(200px, 1fr))`;
    const cellBd = '1px solid var(--border)';
    let html = `<div style="display:grid;grid-template-columns:${colTpl};border:1px solid var(--border);border-radius:3px;overflow:hidden;background:var(--surface)">`;

    // Header row
    html += `<div style="padding:18px 14px;border-right:${cellBd};border-bottom:${cellBd};background:var(--surface-2)">
      <div style="font-family:var(--mono);font-size:9px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:var(--ink-soft)">MONTH</div>
    </div>`;
    REGIONS.forEach(r => {
      const sub = SUBS[r.name] ? `<div style="font-family:var(--mono);font-size:9.5px;color:var(--ink-soft);margin-top:2px">${SUBS[r.name]}</div>` : '';
      html += `<div class="cal-region-hd" data-region="${r.name}" style="padding:14px 16px 14px;border-right:${cellBd};border-bottom:${cellBd};border-top:3px solid ${COLORS[r.name]};background:var(--surface-2);cursor:pointer;transition:background 0.18s">
        <div style="font-family:var(--serif);font-size:18px;font-weight:500;color:var(--ink);line-height:1.1">${r.name}</div>
        ${sub}
        <div style="font-family:var(--mono);font-size:10px;color:var(--ink-soft);letter-spacing:0.04em;margin-top:6px">${counts[r.name]} launches</div>
      </div>`;
    });

    // Quarters + months
    Object.entries(src).forEach(([q, months]) => {
      // Filter quarter if no items match
      const anyMatch = months.some(mo => mo.items.some(matches));
      if(f && !anyMatch) return;
      // Quarter aggregates for this quarter band
      let qCount = 0, qInv = 0, qSales = 0;
      months.forEach(mo => mo.items.forEach(it => {
        if(!matches(it)) return;
        qCount++;
        qInv += it.inv || 0;
        const lr = (D.launches||[]).find(L => L.name === it.n) ||
                   (D.launches||[]).find(L => (L.name||'').toLowerCase() === (it.n||'').toLowerCase());
        if(lr){
          const proj = (D.projects||[]).find(p => p.n === lr.name) ||
                       (D.projects||[]).find(p => (p.n||'').toLowerCase() === (lr.name||'').toLowerCase());
          qSales += proj?.val || 0;
        }
      }));
      const cell = (val, lbl) => `<span style="display:inline-flex;align-items:baseline;gap:6px">
        <span style="font:400 14px/1 'Cormorant Garamond',serif;color:var(--ink);font-variant-numeric:tabular-nums;text-transform:none;letter-spacing:0">${val}</span>
        <span style="font:600 9px/1 'Manrope',sans-serif;letter-spacing:0.16em;text-transform:uppercase;color:var(--ink-soft)">${lbl}</span>
      </span>`;
      const qStats = `
        <span style="display:inline-flex;align-items:center;gap:24px;margin-left:32px">
          ${cell(qCount, qCount===1?'launch':'launches')}
          <span style="width:1px;height:14px;background:var(--line)"></span>
          ${cell('₹'+fmt(qInv), 'Mn · launch value')}
          <span style="width:1px;height:14px;background:var(--line)"></span>
          ${cell('₹'+fmt(qSales), 'Mn · FY27 sales')}
        </span>`;
      // Quarter band (full row)
      html += `<div style="grid-column:1 / -1;padding:11px 16px;background:color-mix(in oklab, var(--surface-2) 70%, transparent);font-family:var(--mono);font-size:10px;font-weight:700;letter-spacing:0.20em;text-transform:uppercase;color:var(--accent);border-bottom:${cellBd};display:flex;align-items:center"><span>${q} · FY27</span>${qStats}</div>`;

      months.forEach(mo => {
        const [mn, yr] = (mo.m||'').split('-');
        // Month header
        html += `<div style="padding:18px 14px;border-right:${cellBd};border-bottom:${cellBd};background:var(--surface-2);display:flex;flex-direction:column;justify-content:center">
          <div style="font-family:var(--mono);font-size:13px;font-weight:600;color:var(--ink);letter-spacing:0.06em;text-transform:uppercase">${mn||''}</div>
          <div style="font-family:var(--mono);font-size:9.5px;color:var(--ink-soft);margin-top:2px">'${yr||''}</div>
        </div>`;
        // Region cells
        REGIONS.forEach(r => {
          const cellItems = mo.items.filter(it => region(it.city)===r.name && matches(it));
          html += `<div style="padding:10px 10px;border-right:${cellBd};border-bottom:${cellBd};min-height:84px;display:flex;flex-direction:column;gap:6px">`;
          if(cellItems.length===0){
            html += `<div style="color:var(--line);font-family:var(--mono);font-size:16px;margin:auto;opacity:0.6">·</div>`;
          } else {
            cellItems.forEach(it => {
              const val = valFn ? valFn(it) : '';
              html += `<button class="cal-tile" data-proj="${(it.n||'').replace(/"/g,'&quot;')}" style="appearance:none;text-align:left;background:var(--surface);padding:9px 11px 10px;border:1px solid var(--border);border-left:3px solid ${COLORS[r.name]};border-radius:3px;cursor:pointer;display:flex;flex-direction:column;gap:3px;transition:box-shadow 0.18s, transform 0.18s, border-color 0.18s">
                <div style="font-family:var(--mono);font-size:8.5px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:${COLORS[r.name]}">${it.city||''}</div>
                <div style="font-family:var(--serif);font-size:13.5px;font-weight:500;color:var(--ink);line-height:1.2">${it.n||''}</div>
                ${val ? `<div style="font-family:var(--mono);font-size:10px;color:var(--ink-soft);margin-top:2px">${val}</div>` : ''}
              </button>`;
            });
          }
          html += `</div>`;
        });
      });
    });

    html += `</div>`;
    root.innerHTML = html || '<div style="padding:24px;color:var(--ink-soft);text-align:center;font-style:italic">No launches match the filter.</div>';
  }

  // -------- Project sales table --------
  function drawProj(filter=''){
    const tb = document.querySelector('#projTable tbody');
    if(!tb) return;
    let data = [...D.projects];
    if(filter){
      const f = filter.toLowerCase();
      data = data.filter(d=> d.n.toLowerCase().includes(f) || d.city.toLowerCase().includes(f) || d.status.toLowerCase().includes(f));
    }
    if(state.city!=='all') data = data.filter(d=>d.city===state.city);
    data.sort((a,b)=>b.val-a.val);
    const cityTotals = {};
    D.projects.forEach(p=>{ cityTotals[p.city]=(cityTotals[p.city]||0)+p.val; });
    const T = data.reduce((a,d)=>{a.units+=d.units;a.sba+=d.sba;a.val+=d.val;a.share+=d.share;return a;},{units:0,sba:0,val:0,share:0});
    let html = `<tr class="total total-top">
      <td class="l">TOTAL · ${data.length} projects</td>
      <td class="l dim">—</td>
      <td class="l"></td>
      <td>${fmt(T.units)}</td>
      <td class="dim">${fmtSft(T.sba)}</td>
      <td class="pos">${fmt(T.val)}</td>
      <td>${fmt(T.share)}</td>
      <td class="dim">100%</td>
    </tr>`;
    data.forEach(d=>{
      const pct = d.val/cityTotals[d.city]*100;
      html += `<tr class="clickrow" data-proj="${d.n}">
        <td class="l">${d.n}</td>
        <td class="l dim">${d.city}</td>
        <td class="l"><span class="chip ${d.status==='Forthcoming'?'amber':'info'}">${d.status}</span></td>
        <td>${d.units}</td>
        <td class="dim">${fmtSft(d.sba)}</td>
        <td class="pos">${fmt(d.val)}</td>
        <td>${fmt(d.share)}</td>
        <td><span class="meter"><i style="width:${pct}%"></i></span> ${pct.toFixed(0)}%</td>
      </tr>`;
    });
    tb.innerHTML = html;
  }

  // -------- Project-wise inventory table (mirrors city-wise) --------
  function buildProjInv(){
    const items = [];
    // Ongoing rows
    D.ongoing.forEach(o => {
      const proj = D.projects.find(p => p.n === o.n);
      const sba  = proj?.sba || 0;
      const units = proj?.units || 0;
      const pct = o.pct || (o.open ? o.sales/o.open*100 : 0);
      // Sobha share: only the FY27E Sales column has a direct share value (proj.share).
      // Opening / Saleable / Closing share is NOT in the source data — keep them at total.
      const salesShareVal = proj?.share ?? null;
      items.push({
        n: o.n, city: o.city, status: 'Ongoing',
        oVal: o.open, nVal: 0, sVal: o.open, salesVal: o.sales, pct, cVal: o.close,
        oSft: sba, nSft: 0, sSft: sba, salesSft: Math.round(sba*pct/100), cSft: Math.round(sba*(1-pct/100)),
        oUnits: units, nUnits: 0, sUnits: units, salesUnits: Math.round(units*pct/100), cUnits: units - Math.round(units*pct/100),
        // direct share values (where available in source data)
        salesValShare: salesShareVal,
        nValShare: 0, oValShare: null, sValShare: null, cValShare: null
      });
    });
    // Forthcoming launches
    D.launches.forEach(l => {
      const proj = D.projects.find(p => p.n === l.name) || D.projects.find(p => p.n.toLowerCase() === (l.name||'').toLowerCase());
      const salesVal = proj?.val || 0;
      const sft = l.sba || proj?.sba || 0;
      const units = proj?.units || 0;
      const pct = l.inv ? (salesVal/l.inv*100) : 0;
      // Direct share data: launch inventory share (l.share) and project sales share (proj.share)
      const nShare = l.share ?? null;
      const salesShareVal = proj?.share ?? null;
      items.push({
        n: l.name, city: l.city, status: 'Forthcoming',
        oVal: 0, nVal: l.inv, sVal: l.inv, salesVal, pct, cVal: Math.max(0, l.inv - salesVal),
        oSft: 0, nSft: sft, sSft: sft, salesSft: Math.round(sft*pct/100), cSft: Math.max(0, sft - Math.round(sft*pct/100)),
        oUnits: 0, nUnits: units, sUnits: units, salesUnits: Math.round(units*pct/100), cUnits: Math.max(0, units - Math.round(units*pct/100)),
        // direct share values (where available)
        oValShare: 0,
        nValShare: nShare,
        sValShare: nShare,
        salesValShare: salesShareVal,
        cValShare: (nShare!=null && salesShareVal!=null) ? Math.max(0, nShare - salesShareVal) : null
      });
    });
    return items;
  }

  function drawOngo(filter=''){
    const tb = document.querySelector('#ongoTable tbody');
    if(!tb) return;
    let data = buildProjInv();
    if(filter){
      const f = filter.toLowerCase();
      data = data.filter(d => d.n.toLowerCase().includes(f) || d.city.toLowerCase().includes(f) || d.status.toLowerCase().includes(f));
    }
    if(state.city!=='all') data = data.filter(d=>d.city===state.city);
    data.sort((a,b)=>b.salesVal-a.salesVal);

    const unit = state.projInvUnit;
    const isShare = state.projInvShare === 'sobha';
    // Sobha-share factor per city, same as City-Wise table
    const shareFactor = {};
    D.citySales.forEach(cs => { shareFactor[cs.city] = cs.fy27 ? (cs.share27/cs.fy27) : 1; });
    const sf = (city) => isShare ? (shareFactor[city] ?? 1) : 1;
    // Per-column SBA scaling per city so Project-Wise SBA/Units totals roll up to match
    // the City-Wise table exactly. City-Wise (D.inv) is the source of truth for column splits.
    const sumByCity = {}; // {city: {o,n,s,sales,c}}
    data.forEach(d => {
      const r = sumByCity[d.city] || (sumByCity[d.city] = {o:0,n:0,s:0,sales:0,c:0});
      r.o     += d.oSft     || 0;
      r.n     += d.nSft     || 0;
      r.s     += d.sSft     || 0;
      r.sales += d.salesSft || 0;
      r.c     += d.cSft     || 0;
    });
    const invByCity = {};
    (D.inv || []).forEach(r => { invByCity[r.city] = r; });
    // Per-city Units-per-sft ratio (mirrors drawInv) — used to derive Units from scaled SBA so
    // PAN totals match the City-Wise table.
    const upsfByCity = {};
    let panU=0, panS=0;
    (D.projects||[]).forEach(p=>{
      if(!p.units || !p.sba) return;
      upsfByCity[p.city] = upsfByCity[p.city] || {u:0,s:0};
      upsfByCity[p.city].u += p.units; upsfByCity[p.city].s += p.sba;
      panU += p.units; panS += p.sba;
    });
    const panRatio = panS ? panU/panS : 0;
    const upsf = (city) => {
      const r = upsfByCity[city];
      return r && r.s ? r.u/r.s : panRatio;
    };
    const sbaScale = (city, base) => {
      const inv = invByCity[city]; const cur = sumByCity[city];
      if(!inv || !cur) return 1;
      const target = base==='o'?inv.oSft : base==='n'?inv.nSft : base==='sales'?inv.salesSft
                    : base==='c'?inv.cSft : (inv.oSft+inv.nSft);
      const c = cur[base] || 0;
      return (target && c) ? target/c : 1;
    };
    const fmtVal = (v) => {
      if(v == null || v === 0) return '<span class="dim">—</span>';
      if(unit === 'mn')   return fmt(Math.round(v));
      if(unit === 'sft')  return fmtSft(v);
      if(unit === 'real') return fmt(Math.round(v))+'<span style="color:var(--ink-soft);font-size:10px">/sft</span>';
      return fmt(Math.round(v));
    };
    // Apply share factor uniformly across all units (matches City-Wise table behavior).
    // For SBA: apply per-city per-column scale so column totals match City-Wise rollup.
    // For Units: derive from scaled SBA × city upsf (same recipe as City-Wise), so PAN totals match.
    // For Avg Realisation: ₹Val * 1e6 / SBA (per row); subtotals/totals computed below.
    const pickVal = (d, base) => {
      if(isShare){
        const sv = d[base+'ValShare'];
        if(sv != null) return sv;
      }
      const raw = d[base+'Val']; if(raw == null) return null;
      return raw * sf(d.city);
    };
    const pickSft = (d, base) => {
      const raw = d[base+'Sft']; if(raw == null) return null;
      return raw * sf(d.city) * sbaScale(d.city, base);
    };
    const pick = (d, base) => {
      if(unit === 'mn')    return pickVal(d, base);
      if(unit === 'sft')   return pickSft(d, base);
      if(unit === 'units'){
        const sftV = pickSft(d, base); return sftV == null ? null : sftV * upsf(d.city);
      }
      // Avg Realisation
      const v = pickVal(d, base), s = pickSft(d, base);
      if(!v || !s) return null;
      return v * 1e6 / s; // ₹ per sft
    };

    // Pct numerator/denominator depends on toggle:
    // - SBA / Units: use SBA (share-adjusted)
    // - ₹ Mn / Avg Real: use ₹ Mn (share-adjusted when isShare)
    const pctNum = (d) => {
      if(unit === 'units'){
        const s = pickSft(d, 'sales'); return s == null ? 0 : s * upsf(d.city);
      }
      if(unit === 'sft') return pickSft(d, 'sales') || 0;
      return pickVal(d, 'sales') || 0;
    };
    const pctDen = (d) => {
      if(unit === 'units'){
        const s = pickSft(d, 's'); return s == null ? 0 : s * upsf(d.city);
      }
      if(unit === 'sft') return pickSft(d, 's') || 0;
      return pickVal(d, 's') || 0;
    };

    // Group projects by city (needed for PAN total computation below as well)
    const byCity = {};
    data.forEach(d => { (byCity[d.city] = byCity[d.city] || []).push(d); });

    // Recompute the PAN INDIA totals from the *filtered* dataset so they reflect what's visible.
    let T = {o:0,n:0,s:0,sales:0,c:0,salesVal:0,sVal:0};
    if(unit === 'real'){
      // Avg Realisation: aggregate ₹ and SBA separately, then divide per column.
      const A = {oVal:0,nVal:0,sVal:0,salesVal:0,cVal:0,oSft:0,nSft:0,sSft:0,salesSft:0,cSft:0};
      data.forEach(d=>{
        ['o','n','s','sales','c'].forEach(b=>{
          const v = pickVal(d,b), s = pickSft(d,b);
          if(v!=null) A[b+'Val'] += v;
          if(s!=null) A[b+'Sft'] += s;
        });
        T.salesVal+=d.salesVal||0; T.sVal+=d.sVal||0;
      });
      const ratio = (v,s) => (v && s) ? v*1e6/s : null;
      T.o     = ratio(A.oVal,    A.oSft);
      T.n     = ratio(A.nVal,    A.nSft);
      T.s     = ratio(A.sVal,    A.sSft);
      T.sales = ratio(A.salesVal,A.salesSft);
      T.c     = ratio(A.cVal,    A.cSft);
    } else if(unit === 'units' || unit === 'sft'){
      // Sum per-city using the filtered subset (mirrors drawInv's per-city rounding) so totals
      // reflect filter state. For each city, we cap at D.inv totals when the full city is present,
      // but if filtered (e.g. only Forthcoming), we use the per-row sSft column sums × scale.
      Object.keys(byCity).forEach(city => {
        const f = sf(city); const r = upsf(city);
        const rows = byCity[city];
        // Sum raw sft per column for this city's filtered rows
        let cO=0,cN=0,cS=0,cSales=0,cC=0;
        rows.forEach(d => {
          cO     += d.oSft     || 0;
          cN     += d.nSft     || 0;
          cS     += d.sSft     || 0;
          cSales += d.salesSft || 0;
          cC     += d.cSft     || 0;
        });
        // Apply per-column scale against D.inv for this city, but ONLY if the filter
        // hasn't removed projects (otherwise scale would over-correct).
        const fullCity = invByCity[city] && sumByCity[city] && Math.abs(sumByCity[city].s - cS) < 0.5;
        const scl = (col, raw) => {
          if(!fullCity) return raw; // filtered view: trust raw sums
          const inv = invByCity[city];
          const target = col==='o'?inv.oSft : col==='n'?inv.nSft : col==='sales'?inv.salesSft : col==='c'?inv.cSft : (inv.oSft+inv.nSft);
          const c = sumByCity[city][col] || 0;
          return (target && c) ? raw * (target/c) : raw;
        };
        const conv = (col, raw) => unit === 'sft' ? scl(col,raw)*f : Math.round(scl(col,raw)*f*r);
        T.o     += conv('o', cO);
        T.n     += conv('n', cN);
        T.s     += conv('s', cS);
        T.sales += conv('sales', cSales);
        T.c     += conv('c', cC);
      });
      data.forEach(d => { T.salesVal+=d.salesVal||0; T.sVal+=d.sVal||0; });
    } else {
      data.forEach(d=>{
        T.o+=pick(d,'o')||0; T.n+=pick(d,'n')||0; T.s+=pick(d,'s')||0;
        T.sales+=pick(d,'sales')||0; T.c+=pick(d,'c')||0;
        T.salesVal+=d.salesVal||0; T.sVal+=d.sVal||0;
      });
    }
    // PAN % Sold uses the toggle-aware num/denom (share-adjusted when isShare)
    let pNum=0, pDen=0;
    data.forEach(d => { pNum += pctNum(d); pDen += pctDen(d); });
    const tPct = pDen ? (pNum/pDen*100) : 0;

    const showOpenDrill = state.projInvShare === 'total' && state.projInvUnit === 'mn';
    let html = `<tr class="total total-top">
      <td class="l">PAN INDIA · ${data.length} projects</td>
      <td class="l dim">—</td>
      <td ${showOpenDrill?'class="drill" data-open-drill="__pan"':''}>${fmtVal(T.o)}</td>
      <td>${fmtVal(T.n)}</td>
      <td>${fmtVal(T.s)}</td>
      <td class="pos">${fmtVal(T.sales)}</td>
      <td><span class="meter"><i style="width:${Math.min(100,tPct)}%"></i></span> ${tPct.toFixed(1)}%</td>
      <td>${fmtVal(T.c)}</td>
    </tr>`;

    // City order: by total sales value, descending
    const cityOrder = Object.keys(byCity).sort((a,b) =>
      byCity[b].reduce((s,d)=>s+(d.salesVal||0),0) - byCity[a].reduce((s,d)=>s+(d.salesVal||0),0)
    );
    // Auto-expand when filter active
    const autoExpand = !!filter || state.city !== 'all';

    cityOrder.forEach(city => {
      const projs = byCity[city];
      let C;
      if(unit === 'real'){
        // Avg Realisation: aggregate ₹ and SBA separately per column, then divide.
        const A = {oVal:0,nVal:0,sVal:0,salesVal:0,cVal:0,oSft:0,nSft:0,sSft:0,salesSft:0,cSft:0};
        let tv=0, ts=0;
        projs.forEach(d=>{
          ['o','n','s','sales','c'].forEach(b=>{
            const v = pickVal(d,b), s = pickSft(d,b);
            if(v!=null) A[b+'Val'] += v;
            if(s!=null) A[b+'Sft'] += s;
          });
          tv+=d.salesVal||0; ts+=d.sVal||0;
        });
        const ratio = (v,s) => (v && s) ? v*1e6/s : null;
        C = {
          o:     ratio(A.oVal,    A.oSft),
          n:     ratio(A.nVal,    A.nSft),
          s:     ratio(A.sVal,    A.sSft),
          sales: ratio(A.salesVal,A.salesSft),
          c:     ratio(A.cVal,    A.cSft),
          salesVal: tv, sVal: ts
        };
      } else {
        C = projs.reduce((a,d)=>{
          a.o+=pick(d,'o')||0; a.n+=pick(d,'n')||0; a.s+=pick(d,'s')||0;
          a.sales+=pick(d,'sales')||0; a.c+=pick(d,'c')||0;
          a.salesVal+=d.salesVal||0; a.sVal+=d.sVal||0;
          return a;
        },{o:0,n:0,s:0,sales:0,c:0,salesVal:0,sVal:0});
      }
      let cNum=0, cDen=0;
      projs.forEach(d => { cNum += pctNum(d); cDen += pctDen(d); });
      const cPct = cDen ? (cNum/cDen*100) : 0;
      const expanded = !isShare && (autoExpand || state.expandedCities.has(city));
      const caretHTML = isShare
        ? '<span class="caret" style="visibility:hidden">▸</span>'
        : `<span class="caret">${expanded?'▾':'▸'}</span>`;
      html += `<tr class="seg-group" data-city="${city.replace(/"/g,'&quot;')}" style="${isShare?'cursor:default':''}">
        <td class="l">${caretHTML} ${city}</td>
        <td class="l dim">${projs.length} ${projs.length===1?'project':'projects'}</td>
        <td ${showOpenDrill?'class="drill" data-open-drill="'+city.replace(/"/g,'&quot;')+'"':''}>${fmtVal(C.o)}</td>
        <td>${fmtVal(C.n)}</td>
        <td>${fmtVal(C.s)}</td>
        <td class="pos">${fmtVal(C.sales)}</td>
        <td><span class="meter"><i style="width:${Math.min(100,cPct)}%"></i></span> ${cPct.toFixed(1)}%</td>
        <td>${fmtVal(C.c)}</td>
      </tr>`;
      if(expanded){
        projs.forEach(d=>{
          const pn = pctNum(d), pd = pctDen(d);
          const pct = pd ? (pn/pd*100) : 0;
          html += `<tr class="seg-child" data-proj="${d.n.replace(/"/g,'&quot;')}">
            <td class="l" style="padding-left:32px">${d.n}</td>
            <td class="l"><span class="chip ${d.status==='Forthcoming'?'amber':'info'}">${d.status}</span></td>
            <td>${fmtVal(pick(d,'o'))}</td>
            <td>${fmtVal(pick(d,'n'))}</td>
            <td>${fmtVal(pick(d,'s'))}</td>
            <td class="pos">${fmtVal(pick(d,'sales'))}</td>
            <td><span class="meter"><i style="width:${Math.min(100,pct)}%"></i></span> ${pct.toFixed(1)}%</td>
            <td>${fmtVal(pick(d,'c'))}</td>
          </tr>`;
        });
      }
    });
    tb.innerHTML = html || '<tr><td colspan="8" class="dim" style="padding:30px;text-align:center">No projects match the filter.</td></tr>';
  }

  function openOpenInvDrawer(scope){
    // scope: '__pan' or city name
    let title, crumb, totalOp, released, unreleased, perCity;
    if(scope === '__pan'){
      title = 'Pan India Total · Opening Inventory';
      crumb = 'Opening Inventory Drill-Down';
      totalOp = D.inv.reduce((s,r)=>s+(r.oVal||0),0);
      released = D.inv.reduce((s,r)=>s+(r.oReleased||0),0);
      unreleased = D.inv.reduce((s,r)=>s+(r.oUnreleased||0),0);
      perCity = [...D.inv].filter(r=>(r.oVal||0)>0).sort((a,b)=>(b.oVal||0)-(a.oVal||0));
    } else {
      const row = D.inv.find(r=>r.city===scope);
      if(!row) return;
      title = scope + ' · Opening Inventory';
      crumb = 'Opening Inventory Drill-Down';
      totalOp = row.oVal||0;
      released = row.oReleased||0;
      unreleased = row.oUnreleased||0;
      perCity = null;
    }
    const relPct = totalOp ? (released/totalOp*100) : 0;
    const unrelPct = totalOp ? (unreleased/totalOp*100) : 0;
    let html = `<div style="display:grid;grid-template-columns:1fr;gap:0;border:1px solid var(--line);margin-bottom:24px">
      <div style="padding:14px 16px">
        <div style="font:600 9px/1 'Manrope',sans-serif;letter-spacing:0.22em;text-transform:uppercase;color:var(--ink-soft);margin-bottom:8px">Total Opening Inventory</div>
        <div style="font:400 22px/1 'Cormorant Garamond',serif;color:var(--ink);font-variant-numeric:tabular-nums">₹${fmt(totalOp)} <span style="font-size:12px;color:var(--ink-soft)">Mn</span></div>
      </div>
    </div>`;
    // Bar + tiles
    html += `<h4 style="margin-top:0">Released vs Unreleased</h4>`;
    let bar = '';
    if(relPct>0.2) bar += `<div style="flex:${relPct};background:var(--teal);height:6px"></div>`;
    if(unrelPct>0.2) bar += `<div style="flex:${unrelPct};background:var(--accent);height:6px"></div>`;
    html += `<div style="display:flex;gap:2px;border-radius:2px;overflow:hidden">${bar}</div>`;
    html += `<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:0;margin-top:14px;border-top:1px solid var(--line)">
      <div style="padding:14px 12px 0 0;border-right:1px solid var(--line)">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
          <span style="width:8px;height:8px;background:var(--teal);border-radius:1px;display:inline-block"></span>
          <span style="font:600 9px/1 'Manrope',sans-serif;letter-spacing:0.22em;text-transform:uppercase;color:var(--ink-soft)">Released Inventory</span>
        </div>
        <div style="font:400 22px/1 'Cormorant Garamond',serif;color:var(--ink);font-variant-numeric:tabular-nums">₹${fmt(released)} <span style="font-size:12px;color:var(--ink-soft)">Mn</span></div>
        <div style="font-size:11px;color:var(--ink-soft);margin-top:6px">${relPct.toFixed(1)}% of opening</div>
      </div>
      <div style="padding:14px 0 0 14px">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
          <span style="width:8px;height:8px;background:var(--accent);border-radius:1px;display:inline-block"></span>
          <span style="font:600 9px/1 'Manrope',sans-serif;letter-spacing:0.22em;text-transform:uppercase;color:var(--ink-soft)">Unreleased Inventory</span>
        </div>
        <div style="font:400 22px/1 'Cormorant Garamond',serif;color:var(--ink);font-variant-numeric:tabular-nums">₹${fmt(unreleased)} <span style="font-size:12px;color:var(--ink-soft)">Mn</span></div>
        <div style="font-size:11px;color:var(--ink-soft);margin-top:6px">${unrelPct.toFixed(1)}% of opening</div>
      </div>
    </div>`;
    // Per-city breakdown for PAN
    if(perCity){
      let cityRows = '';
      perCity.forEach(c => {
        const t = c.oVal||0, rel = c.oReleased||0, unrel = c.oUnreleased||0;
        cityRows += `<tr>
          <td class="l" style="padding:8px 12px 8px 0">${c.city}</td>
          <td style="text-align:right;padding:8px 0;font-variant-numeric:tabular-nums">${fmt(t)}</td>
          <td style="text-align:right;padding:8px 8px;font-variant-numeric:tabular-nums;color:var(--teal)">${fmt(rel)}</td>
          <td style="text-align:right;padding:8px 0 8px 12px;font-variant-numeric:tabular-nums;color:var(--accent)">${unrel?fmt(unrel):'—'}</td>
        </tr>`;
      });
      html += `<h4 style="margin-top:32px">By City</h4>
        <table style="width:100%;border-collapse:collapse;font-size:13px">
          <thead><tr style="border-bottom:1px solid var(--line);font:600 10px/1 'Manrope',sans-serif;letter-spacing:0.18em;text-transform:uppercase;color:var(--ink-soft)">
            <th class="l" style="text-align:left;padding:8px 12px 8px 0">City</th>
            <th style="text-align:right;padding:8px 0">Opening ₹Mn</th>
            <th style="text-align:right;padding:8px 8px">Released</th>
            <th style="text-align:right;padding:8px 0 8px 12px">Unreleased</th>
          </tr></thead>
          <tbody>${cityRows}</tbody>
        </table>`;
    }
    document.querySelector('#drawer .crumb').textContent = crumb;
    document.getElementById('drawerTitle').textContent = title;
    document.getElementById('drawerBody').innerHTML = html;
    document.getElementById('drawer').classList.add('on');
    document.getElementById('drawerOverlay').classList.add('on');
  }

  // Click city subheader to expand/collapse (disabled in Sobha Share mode)
  document.querySelector('#ongoTable tbody')?.addEventListener('click', e=>{
    // Opening Inventory drill (Total + ₹ Mn only)
    const drillCell = e.target.closest('td[data-open-drill]');
    if(drillCell){
      e.stopPropagation();
      openOpenInvDrawer(drillCell.dataset.openDrill);
      return;
    }
    if(state.projInvShare === 'sobha') return;
    const grp = e.target.closest('tr.seg-group');
    if(!grp) return;
    const city = grp.dataset.city;
    if(state.expandedCities.has(city)) state.expandedCities.delete(city);
    else state.expandedCities.add(city);
    drawOngo(document.getElementById('ongoSearch')?.value||'');
  });

  // -------- Bind filters --------
  document.querySelectorAll('.fb-btn').forEach(b=>{
    b.addEventListener('click', ()=>{
      if(b.dataset.city!==undefined){
        document.querySelectorAll('.fb-btn[data-city]').forEach(x=>x.classList.remove('on'));
        b.classList.add('on'); state.city = b.dataset.city;
      }
      if(b.dataset.q!==undefined){
        document.querySelectorAll('.fb-btn[data-q]').forEach(x=>x.classList.remove('on'));
        b.classList.add('on'); state.q = b.dataset.q;
      }
      drawLaunches(document.getElementById('launchSearch')?.value||'');
      drawProj(document.getElementById('projSearch').value);
      drawOngo(document.getElementById('ongoSearch')?.value||'');
    });
  });
  document.getElementById('tShare')?.addEventListener('click', e=>{
    e.target.classList.toggle('on');
  });
  // segmented controls
  document.querySelectorAll('#segCmp .seg-btn').forEach(b=>{
    b.addEventListener('click', ()=>{
      document.querySelectorAll('#segCmp .seg-btn').forEach(x=>x.classList.remove('on'));
      b.classList.add('on'); state.cmp = b.dataset.cmp;
      drawCityBar(); updateLegend();
    });
  });
  document.querySelectorAll('#segShare .seg-btn').forEach(b=>{
    b.addEventListener('click', ()=>{
      document.querySelectorAll('#segShare .seg-btn').forEach(x=>x.classList.remove('on'));
      b.classList.add('on'); state.share = b.dataset.share;
      drawCityBar(); updateLegend();
    });
  });
  function updateLegend(){
    const lg = document.querySelector('#cityBar + .legend');
    if(!lg) return;
    const items = [];
    if(state.share==='total'||state.share==='both') items.push(['var(--accent)','FY27 Total Sales']);
    if(state.share==='sobha'||state.share==='both') items.push(['var(--gold)','Sobha Share FY27']);
    if(state.cmp==='both') items.push(['var(--info)','FY26A Total Sales']);
    lg.innerHTML = items.map(([c,t])=>`<span><span class="sw" style="background:${c}"></span>${t}</span>`).join('');
  }
  updateLegend();

  // -------- Drill-down drawer --------
  function openDrawer(city){
    const cs = D.citySales.find(d=>d.city===city); if(!cs) return;
    const qTot = (cs.q1||0)+(cs.q2||0)+(cs.q3||0)+(cs.q4||0);
    const ongo = cs.ongo||0, newL = cs.newL||0;
    const lTot = ongo + newL;
    // Editorial palette — same family as the rest of the dashboard
    const qColors = ['var(--teal)','var(--emerald)','var(--accent)','var(--rust)'];
    const qLabels = ['Q1','Q2','Q3','Q4'];
    const qVals = [cs.q1||0, cs.q2||0, cs.q3||0, cs.q4||0];
    // Thin segmented bar + stat tiles below (values never crushed by narrow segments)
    const render = (vals, total, colors, labels, cols) => {
      let bar = '';
      vals.forEach((v,i)=>{
        const pct = total ? (v/total*100) : 0;
        if(pct < 0.2) return;
        bar += `<div style="flex:${pct};background:${colors[i]};height:6px"></div>`;
      });
      let tiles = `<div style="display:grid;grid-template-columns:repeat(${cols},1fr);gap:0;margin-top:14px;border-top:1px solid var(--line)">`;
      vals.forEach((v,i)=>{
        const pct = total ? (v/total*100) : 0;
        tiles += `<div style="padding:14px 12px 0 0;border-right:${i<cols-1?'1px solid var(--line)':'0'};padding-left:${i===0?'0':'14px'}">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
            <span style="width:8px;height:8px;background:${colors[i]};border-radius:1px;display:inline-block"></span>
            <span style="font:600 9px/1 'Manrope',sans-serif;letter-spacing:0.22em;text-transform:uppercase;color:var(--ink-soft)">${labels[i]}</span>
          </div>
          <div style="font:400 22px/1 'Cormorant Garamond',serif;color:var(--ink);font-variant-numeric:tabular-nums">${fmt(v)}</div>
          <div style="font-size:11px;color:var(--ink-soft);margin-top:6px">${pct.toFixed(1)}%</div>
        </div>`;
      });
      tiles += `</div>`;
      return `<div style="display:flex;gap:2px;border-radius:2px;overflow:hidden">${bar}</div>${tiles}`;
    };
    let html = `<h4 style="margin-top:0">Quarterly Mix</h4>`;
    html += render(qVals, qTot, qColors, qLabels, 4);
    html += `<h4 style="margin-top:32px">Ongoing vs New Launches</h4>`;
    html += render([ongo, newL], lTot, ['var(--teal)','var(--accent)'], ['Ongoing','New Launches'], 2);
    document.querySelector('#drawer .crumb').textContent = 'City Drill-Down';
    document.getElementById('drawerTitle').textContent = city;
    document.getElementById('drawerBody').innerHTML = html;
    document.getElementById('drawer').classList.add('on');
    document.getElementById('drawerOverlay').classList.add('on');
  }
  function openPanIndiaDrawer(){
    const totals = D.citySales.reduce((a,d)=>{
      a.q1+=d.q1||0; a.q2+=d.q2||0; a.q3+=d.q3||0; a.q4+=d.q4||0;
      a.ongo+=d.ongo||0; a.newL+=d.newL||0; a.fy27+=d.fy27||0;
      return a;
    },{q1:0,q2:0,q3:0,q4:0,ongo:0,newL:0,fy27:0});
    const qTot = totals.q1+totals.q2+totals.q3+totals.q4;
    const lTot = totals.ongo + totals.newL;
    const qColors = ['var(--teal)','var(--emerald)','var(--accent)','var(--rust)'];
    const qLabels = ['Q1','Q2','Q3','Q4'];
    const qVals = [totals.q1, totals.q2, totals.q3, totals.q4];
    const render = (vals, total, colors, labels, cols) => {
      let bar = '';
      vals.forEach((v,i)=>{
        const pct = total ? (v/total*100) : 0;
        if(pct < 0.2) return;
        bar += `<div style="flex:${pct};background:${colors[i]};height:6px"></div>`;
      });
      let tiles = `<div style="display:grid;grid-template-columns:repeat(${cols},1fr);gap:0;margin-top:14px;border-top:1px solid var(--line)">`;
      vals.forEach((v,i)=>{
        const pct = total ? (v/total*100) : 0;
        tiles += `<div style="padding:14px 12px 0 0;border-right:${i<cols-1?'1px solid var(--line)':'0'};padding-left:${i===0?'0':'14px'}">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
            <span style="width:8px;height:8px;background:${colors[i]};border-radius:1px;display:inline-block"></span>
            <span style="font:600 9px/1 'Manrope',sans-serif;letter-spacing:0.22em;text-transform:uppercase;color:var(--ink-soft)">${labels[i]}</span>
          </div>
          <div style="font:400 22px/1 'Cormorant Garamond',serif;color:var(--ink);font-variant-numeric:tabular-nums">${fmt(v)}</div>
          <div style="font-size:11px;color:var(--ink-soft);margin-top:6px">${pct.toFixed(1)}%</div>
        </div>`;
      });
      tiles += `</div>`;
      return `<div style="display:flex;gap:2px;border-radius:2px;overflow:hidden">${bar}</div>${tiles}`;
    };
    // City breakdown table — sorted by FY27 sales value
    const sorted = [...D.citySales].filter(d=>d.fy27>0).sort((a,b)=>b.fy27-a.fy27);
    let cityRows = '';
    sorted.forEach(c => {
      const pct = totals.fy27 ? (c.fy27/totals.fy27*100) : 0;
      cityRows += `<tr>
        <td class="l" style="padding:8px 12px 8px 0">${c.city}</td>
        <td style="text-align:right;padding:8px 0;font-variant-numeric:tabular-nums">${fmt(c.fy27)}</td>
        <td style="text-align:right;padding:8px 0 8px 12px;color:var(--ink-soft);font-variant-numeric:tabular-nums">${pct.toFixed(1)}%</td>
      </tr>`;
    });
    let html = `<h4 style="margin-top:0">Quarterly Mix</h4>`;
    html += render(qVals, qTot, qColors, qLabels, 4);
    html += `<h4 style="margin-top:32px">Ongoing vs New Launches</h4>`;
    html += render([totals.ongo, totals.newL], lTot, ['var(--teal)','var(--accent)'], ['Ongoing','New Launches'], 2);
    html += `<h4 style="margin-top:32px">FY27 Sales by City</h4>
      <table style="width:100%;border-collapse:collapse;font-size:13px">
        <thead><tr style="border-bottom:1px solid var(--line);font:600 10px/1 'Manrope',sans-serif;letter-spacing:0.18em;text-transform:uppercase;color:var(--ink-soft)">
          <th class="l" style="text-align:left;padding:8px 12px 8px 0">City</th>
          <th style="text-align:right;padding:8px 0">FY27 ₹Mn</th>
          <th style="text-align:right;padding:8px 0 8px 12px">Share</th>
        </tr></thead>
        <tbody>${cityRows}</tbody>
      </table>`;
    document.querySelector('#drawer .crumb').textContent = 'Pan India Drill-Down';
    document.getElementById('drawerTitle').textContent = 'Pan India Total';
    document.getElementById('drawerBody').innerHTML = html;
    document.getElementById('drawer').classList.add('on');
    document.getElementById('drawerOverlay').classList.add('on');
  }
  function openRegionDrawer(regionName){
    const REGION_CITIES = {
      'NCR':       ['Gurgaon','Greater Noida','Delhi','Noida'],
      'Bangalore': ['Bangalore'],
      'Mumbai':    ['Mumbai'],
      'Kerala':    ['Cochin','Thrissur','Trivandrum','Calicut'],
      'Others':    ['Chennai','Hyderabad','Pune','GIFT City','Coimbatore']
    };
    const cities = REGION_CITIES[regionName] || [];
    const inRegion = D.citySales.filter(d => cities.includes(d.city));
    const totals = inRegion.reduce((a,d)=>{
      a.q1+=d.q1||0; a.q2+=d.q2||0; a.q3+=d.q3||0; a.q4+=d.q4||0;
      a.ongo+=d.ongo||0; a.newL+=d.newL||0; a.fy27+=d.fy27||0; a.share27+=d.share27||0;
      return a;
    },{q1:0,q2:0,q3:0,q4:0,ongo:0,newL:0,fy27:0,share27:0});
    const qTot = totals.q1+totals.q2+totals.q3+totals.q4;
    const lTot = totals.ongo + totals.newL;
    const qColors = ['var(--teal)','var(--emerald)','var(--accent)','var(--rust)'];
    const qLabels = ['Q1','Q2','Q3','Q4'];
    const qVals = [totals.q1, totals.q2, totals.q3, totals.q4];
    const render = (vals, total, colors, labels, cols) => {
      let bar = '';
      vals.forEach((v,i)=>{
        const pct = total ? (v/total*100) : 0;
        if(pct < 0.2) return;
        bar += `<div style="flex:${pct};background:${colors[i]};height:6px"></div>`;
      });
      let tiles = `<div style="display:grid;grid-template-columns:repeat(${cols},1fr);gap:0;margin-top:14px;border-top:1px solid var(--line)">`;
      vals.forEach((v,i)=>{
        const pct = total ? (v/total*100) : 0;
        tiles += `<div style="padding:14px 12px 0 0;border-right:${i<cols-1?'1px solid var(--line)':'0'};padding-left:${i===0?'0':'14px'}">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
            <span style="width:8px;height:8px;background:${colors[i]};border-radius:1px;display:inline-block"></span>
            <span style="font:600 9px/1 'Manrope',sans-serif;letter-spacing:0.22em;text-transform:uppercase;color:var(--ink-soft)">${labels[i]}</span>
          </div>
          <div style="font:400 22px/1 'Cormorant Garamond',serif;color:var(--ink);font-variant-numeric:tabular-nums">${fmt(v)}</div>
          <div style="font-size:11px;color:var(--ink-soft);margin-top:6px">${pct.toFixed(1)}%</div>
        </div>`;
      });
      tiles += `</div>`;
      return `<div style="display:flex;gap:2px;border-radius:2px;overflow:hidden">${bar}</div>${tiles}`;
    };
    // Launches in this region
    const launches = (D.launches||[]).filter(l => cities.includes(l.city));
    const launchInv = launches.reduce((s,l)=>s+(l.inv||0),0);
    const spendAgg = launches.reduce((a,l)=>{
      a.pre+=l.pre||0; a.inv26+=l.inv26||0; a.land+=l.land||0; a.appr+=l.appr||0; a.total+=l.total||0;
      return a;
    },{pre:0,inv26:0,land:0,appr:0,total:0});
    let launchRows = '';
    // Total row aggregates
    const launchTot = launches.reduce((a,l)=>{
      const proj = (D.projects||[]).find(p => p.n === l.name) ||
                   (D.projects||[]).find(p => (p.n||'').toLowerCase() === (l.name||'').toLowerCase());
      a.inv   += l.inv   || 0;
      a.sales += proj?.val || 0;
      a.inv26 += l.inv26 || 0;
      a.total += l.total || 0;
      return a;
    },{inv:0,sales:0,inv26:0,total:0});
    launches.sort((a,b)=>(b.inv||0)-(a.inv||0)).forEach(l => {
      // Find corresponding project record for FY27 Sales
      const proj = (D.projects||[]).find(p => p.n === l.name) ||
                   (D.projects||[]).find(p => (p.n||'').toLowerCase() === (l.name||'').toLowerCase());
      const sales = proj?.val || 0;
      launchRows += `<tr>
        <td class="l" style="padding:8px 10px 8px 0">
          <div>${l.name}</div>
          <div style="font-family:var(--mono);font-size:9.5px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:var(--ink-soft);margin-top:4px;white-space:nowrap">${l.city} · ${l.month}</div>
        </td>
        <td style="text-align:right;padding:8px 10px;font-variant-numeric:tabular-nums;white-space:nowrap">${fmt(l.inv)}</td>
        <td style="text-align:right;padding:8px 10px;font-variant-numeric:tabular-nums;white-space:nowrap">${sales?fmt(sales):'<span class="dim">—</span>'}</td>
        <td style="text-align:right;padding:8px 10px;font-variant-numeric:tabular-nums;white-space:nowrap">${l.inv26?fmt(l.inv26):'<span class="dim">—</span>'}</td>
        <td style="text-align:right;padding:8px 0 8px 10px;font-variant-numeric:tabular-nums;white-space:nowrap">${l.total?fmt(l.total):'<span class="dim">—</span>'}</td>
      </tr>`;
    });
    // Cities in region with launches/sales
    let cityRows = '';
    inRegion.filter(c=>c.fy27>0).sort((a,b)=>b.fy27-a.fy27).forEach(c => {
      const pct = totals.fy27 ? (c.fy27/totals.fy27*100) : 0;
      cityRows += `<tr>
        <td class="l" style="padding:8px 12px 8px 0">${c.city}</td>
        <td style="text-align:right;padding:8px 0;font-variant-numeric:tabular-nums">${fmt(c.fy27)}</td>
        <td style="text-align:right;padding:8px 0 8px 12px;color:var(--ink-soft);font-variant-numeric:tabular-nums">${pct.toFixed(1)}%</td>
      </tr>`;
    });
    // Aggregate region launch sba + estimated units
    const launchSba = launches.reduce((s,l)=>s+(l.sba||0),0);
    const launchUnits = launches.reduce((s,l)=>{
      const csL = D.citySales.find(c=>c.city===l.city);
      const upsfL = csL && csL.sba ? csL.units/csL.sba : 0;
      return s + Math.round((l.sba||0)*upsfL);
    },0);
    // Region FY27 sales sba + units (from citySales)
    const regUnits = inRegion.reduce((s,c)=>s+(c.units||0),0);
    const regSba   = inRegion.reduce((s,c)=>s+(c.sba||0),0);
    const invSub = launchSba ? `${launchUnits?fmt(launchUnits)+' units \u00b7 ':''}${fmtSft(launchSba)} sft` : '';
    const salesSub = regSba ? `${regUnits?fmt(regUnits)+' units \u00b7 ':''}${fmtSft(regSba)} sft` : '';
    let html = `<div class="stat-row">
      <div class="stat"><div class="label">Inventory Value</div><div class="val">₹${fmt(launchInv)} Mn</div>${invSub?`<div class="sub">${invSub}</div>`:''}</div>
      <div class="stat"><div class="label">FY27E Sales</div><div class="val">₹${fmt(totals.fy27)} Mn</div>${salesSub?`<div class="sub">${salesSub}</div>`:''}</div>
    </div>`;
    if(launchRows){
      html += `<h4 style="margin-top:32px">Launches in ${regionName}</h4>
        <table style="width:100%;border-collapse:collapse;font-size:13px;table-layout:auto">
          <thead><tr style="border-bottom:1px solid var(--line);font:600 10px/1.1 'Manrope',sans-serif;letter-spacing:0.14em;text-transform:uppercase;color:var(--ink-soft);white-space:nowrap">
            <th class="l" style="text-align:left;padding:8px 10px 8px 0">Project</th>
            <th style="text-align:right;padding:8px 10px">Inv ₹Mn</th>
            <th style="text-align:right;padding:8px 10px">FY27 Sales</th>
            <th style="text-align:right;padding:8px 10px">Inv till FY26</th>
            <th style="text-align:right;padding:8px 0 8px 10px">FY27 Spend</th>
          </tr></thead>
          <tbody>
            <tr style="border-bottom:1px solid var(--line);font-weight:700;background:var(--surface-2)">
              <td class="l" style="padding:8px 10px 8px 0;text-transform:uppercase;font:600 10px/1 'Manrope',sans-serif;letter-spacing:0.14em;white-space:nowrap">Total (${launches.length})</td>
              <td style="text-align:right;padding:8px 10px;font-variant-numeric:tabular-nums;white-space:nowrap">${fmt(launchTot.inv)}</td>
              <td style="text-align:right;padding:8px 10px;font-variant-numeric:tabular-nums;white-space:nowrap">${fmt(launchTot.sales)}</td>
              <td style="text-align:right;padding:8px 10px;font-variant-numeric:tabular-nums;white-space:nowrap">${fmt(launchTot.inv26)}</td>
              <td style="text-align:right;padding:8px 0 8px 10px;font-variant-numeric:tabular-nums;white-space:nowrap">${fmt(launchTot.total)}</td>
            </tr>
            ${launchRows}
          </tbody>
        </table>`;
    }
    if(launches.length){
      html += `<h4 style="margin-top:32px">Investment & Spend Breakup</h4>
        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:0;border-top:1px solid var(--line);border-bottom:1px solid var(--line)">
          <div style="padding:14px 14px 14px 0;border-right:1px solid var(--line);border-bottom:1px solid var(--line)">
            <div style="font:600 9px/1 'Manrope',sans-serif;letter-spacing:0.22em;text-transform:uppercase;color:var(--ink-soft);margin-bottom:8px">Pre-Launch Value</div>
            <div style="font:400 22px/1 'Cormorant Garamond',serif;color:var(--ink);font-variant-numeric:tabular-nums">₹${fmt(spendAgg.pre)} <span style="font-size:12px;color:var(--ink-soft)">Mn</span></div>
            <div style="font-size:11px;color:var(--ink-soft);margin-top:6px">Invested till FY26 + FY27 total spend</div>
          </div>
          <div style="padding:14px 0 14px 14px;border-bottom:1px solid var(--line)">
            <div style="font:600 9px/1 'Manrope',sans-serif;letter-spacing:0.22em;text-transform:uppercase;color:var(--ink-soft);margin-bottom:8px">Invested Till FY26</div>
            <div style="font:400 22px/1 'Cormorant Garamond',serif;color:var(--ink);font-variant-numeric:tabular-nums">${spendAgg.inv26?'₹'+fmt(spendAgg.inv26)+' <span style=\"font-size:12px;color:var(--ink-soft)\">Mn</span>':'<span style=\"color:var(--ink-soft)\">—</span>'}</div>
            <div style="font-size:11px;color:var(--ink-soft);margin-top:6px">Land + approvals + works to date</div>
          </div>
          <div style="padding:14px 14px 0 0;border-right:1px solid var(--line)">
            <div style="font:600 9px/1 'Manrope',sans-serif;letter-spacing:0.22em;text-transform:uppercase;color:var(--ink-soft);margin-bottom:8px">FY27 Land Spends</div>
            <div style="font:400 22px/1 'Cormorant Garamond',serif;color:var(--ink);font-variant-numeric:tabular-nums">₹${fmt(spendAgg.land)} <span style="font-size:12px;color:var(--ink-soft)">Mn</span></div>
            <div style="font-size:11px;color:var(--ink-soft);margin-top:6px">JD payments, registration</div>
          </div>
          <div style="padding:14px 0 0 14px">
            <div style="font:600 9px/1 'Manrope',sans-serif;letter-spacing:0.22em;text-transform:uppercase;color:var(--ink-soft);margin-bottom:8px">FY27 Approval Spends</div>
            <div style="font:400 22px/1 'Cormorant Garamond',serif;color:var(--ink);font-variant-numeric:tabular-nums">₹${fmt(spendAgg.appr)} <span style="font-size:12px;color:var(--ink-soft)">Mn</span></div>
            <div style="font-size:11px;color:var(--ink-soft);margin-top:6px">Plan sanctions, clearances</div>
          </div>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:baseline;padding:14px 0 0 0;font-size:12px;color:var(--ink-soft)">
          <span style="font:600 10px/1 'Manrope',sans-serif;letter-spacing:0.18em;text-transform:uppercase">FY27 Total Spend</span>
          <span style="font:400 18px/1 'Cormorant Garamond',serif;color:var(--ink);font-variant-numeric:tabular-nums">₹${fmt(spendAgg.total)} <span style="font-size:11px;color:var(--ink-soft)">Mn</span></span>
        </div>`;
    }
    document.querySelector('#drawer .crumb').textContent = 'Region Drill-Down';
    document.getElementById('drawerTitle').textContent = regionName;
    document.getElementById('drawerBody').innerHTML = html;
    document.getElementById('drawer').classList.add('on');
    document.getElementById('drawerOverlay').classList.add('on');
  }
  function closeDrawer(){ document.getElementById('drawer').classList.remove('on'); document.getElementById('drawerOverlay').classList.remove('on'); }
  document.getElementById('drawerClose').addEventListener('click', closeDrawer);
  document.getElementById('drawerOverlay').addEventListener('click', closeDrawer);
  document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeDrawer(); });
  document.getElementById('cityBar')?.addEventListener('click', e=>{
    const t = e.target.closest('.hover-target');
    if(t && t.dataset.city) openDrawer(t.dataset.city);
  });
  document.getElementById('launchSearch')?.addEventListener('input', e=> drawLaunches(e.target.value));
  document.getElementById('invSearch')?.addEventListener('input', e=> drawInv(e.target.value));
  document.getElementById('ongoSearch')?.addEventListener('input', e=> drawOngo(e.target.value));
  document.getElementById('projSearch')?.addEventListener('input', e=> drawProj(e.target.value));
  document.getElementById('launchCalSearch')?.addEventListener('input', e=> drawCal('launchCal', D.launchCal, it=>'₹'+fmt(it.inv), null, e.target.value));

  // Mn / SBA / Units toggle on project inventory table
  document.querySelectorAll('#segProjInvShare .seg-btn').forEach(b=>{
    b.addEventListener('click', ()=>{
      document.querySelectorAll('#segProjInvShare .seg-btn').forEach(x=>x.classList.remove('on'));
      b.classList.add('on'); state.projInvShare = b.dataset.share;
      drawOngo(document.getElementById('ongoSearch')?.value||'');
    });
  });
  document.querySelectorAll('#segProjInvUnit .seg-btn').forEach(b=>{
    b.addEventListener('click', ()=>{
      document.querySelectorAll('#segProjInvUnit .seg-btn').forEach(x=>x.classList.remove('on'));
      b.classList.add('on'); state.projInvUnit = b.dataset.unit;
      drawOngo(document.getElementById('ongoSearch')?.value||'');
    });
  });

  // Click any launch-calendar tile -> drill into project (toggle on repeat click)
  document.getElementById('launchCal').addEventListener('click', e=>{
    const hd = e.target.closest('.cal-region-hd');
    if(hd){
      const region = hd.dataset.region;
      const drawer = document.getElementById('drawer');
      const titleEl = document.getElementById('drawerTitle');
      if(drawer.classList.contains('on') && titleEl.textContent === region){
        closeDrawer();
      } else {
        openRegionDrawer(region);
      }
      return;
    }
    const tile = e.target.closest('.cal-tile');
    if(!tile) return;
    const name = tile.dataset.proj;
    const drawer = document.getElementById('drawer');
    const titleEl = document.getElementById('drawerTitle');
    if(drawer.classList.contains('on') && titleEl.textContent === name){
      closeDrawer();
    } else {
      openProjDrawer(name);
    }
  });

  // Mn / Sft toggle on inventory table
  document.querySelectorAll('#segInvShare .seg-btn').forEach(b=>{
    b.addEventListener('click', ()=>{
      document.querySelectorAll('#segInvShare .seg-btn').forEach(x=>x.classList.remove('on'));
      b.classList.add('on'); state.invShare = b.dataset.share;
      drawInv(document.getElementById('invSearch')?.value||'');
    });
  });
  document.querySelectorAll('#segInvUnit .seg-btn').forEach(b=>{
    b.addEventListener('click', ()=>{
      document.querySelectorAll('#segInvUnit .seg-btn').forEach(x=>x.classList.remove('on'));
      b.classList.add('on'); state.invUnit = b.dataset.unit;
      drawInv(document.getElementById('invSearch')?.value||'');
    });
  });

  // Project drill-down — tolerant lookup across launches/projects/ongoing
  function openProjDrawer(name){
    const norm = s => {
      let t = (s||'').toLowerCase();
      // normalize "ph-1", "ph 1", "ph.1", "phase 1", "phase-1", "phase1" → "phase1"
      t = t.replace(/\bph[\s\-\.]*(?=[ivx0-9])/g, 'phase');
      // roman numerals → digits (longest first)
      t = t.replace(/\bviii\b/g,'8').replace(/\bvii\b/g,'7').replace(/\bvi\b/g,'6')
           .replace(/\biv\b/g,'4').replace(/\biii\b/g,'3').replace(/\bii\b/g,'2')
           .replace(/\bix\b/g,'9').replace(/\bv\b/g,'5').replace(/\bi\b/g,'1');
      // strip everything but alphanumerics
      return t.replace(/[^a-z0-9]/g,'');
    };
    const key = norm(name);
    // also try the first 2 significant tokens (e.g. "sobha crescent") for very loose matching
    const firstTokens = (s) => norm(s).slice(0, Math.min(norm(s).length, Math.max(8, norm(s).indexOf('phase')>0 ? norm(s).indexOf('phase')+6 : 12)));
    const keyShort = firstTokens(name);
    const fuzzy = (arr, getName) => arr.find(x=>getName(x)===name)
      || arr.find(x=>norm(getName(x))===key)
      || arr.find(x=>norm(getName(x)).includes(key) || key.includes(norm(getName(x))))
      || arr.find(x=>{ const nx = norm(getName(x)); return nx.startsWith(keyShort) || keyShort.startsWith(nx.slice(0,keyShort.length)); });
    let p = fuzzy(D.projects, x=>x.n);
    let launch = fuzzy(D.launches||[], x=>x.name) || {};
    let ongo = fuzzy(D.ongoing, x=>x.n) || {};
    // Synthesize a project record from the launch if D.projects has no match
    if(!p && launch.name){
      p = { n: launch.name, city: launch.city, status: 'Forthcoming',
            units: 0, sba: launch.sba||0, val: launch.inv||0, share: launch.share||0 };
    }
    if(!p) return;
    const cs = D.citySales.find(c=>c.city===launch.city);
    const upsf = cs && cs.sba ? cs.units/cs.sba : 0;
    const launchEstUnits = launch.sba ? Math.round(launch.sba*upsf) : 0;
    const invValSub = launch.sba
      ? `${launchEstUnits?fmt(launchEstUnits)+' units \u00b7 ':''}${fmtSft(launch.sba)} sft`
      : '';
    const invValTile = launch.inv != null
      ? `<div class="stat"><div class="label">Inventory Value</div><div class="val">\u20b9${fmt(launch.inv)} Mn</div>${invValSub?`<div class="sub">${invValSub}</div>`:''}</div>`
      : `<div class="stat"><div class="label">City</div><div class="val" style="font-size:15px">${p.city}</div><div class="sub"><span class="chip ${p.status==='Forthcoming'?'amber':'info'}">${p.status}</span></div></div>`;
    let html = `<div class="stat-row">
      ${invValTile}
      <div class="stat"><div class="label">FY27E Sales</div><div class="val">₹${fmt(p.val)} Mn</div><div class="sub">${p.units} units · ${fmtSft(p.sba)} sft</div></div>
      <div class="stat"><div class="label">Sobha Share</div><div class="val">₹${fmt(p.share)} Mn</div><div class="sub">${(p.share/p.val*100).toFixed(0)}% of project</div></div>
      <div class="stat"><div class="label">Avg Realisation</div><div class="val">₹${p.sba?fmt(Math.round(p.val*1e6/p.sba)):'–'}<span style="font-size:11px;color:var(--ink-3)">/sft</span></div><div class="sub">basic + car park, w/o GST</div></div>
    </div>`;
    if(ongo.open){ html += `<h4>Inventory burn</h4><div class="stat-row" style="grid-template-columns:1fr 1fr 1fr">
      <div class="stat"><div class="label">Opening</div><div class="val">₹${fmt(ongo.open)}</div></div>
      <div class="stat"><div class="label">% Sold FY27</div><div class="val">${ongo.pct}%</div></div>
      <div class="stat"><div class="label">Closing</div><div class="val">₹${fmt(ongo.close)}</div></div>
    </div>`; }
    if(launch.month){
      const fy27Total = (launch.land||0) + (launch.appr||0);
      html += `<h4 style="margin-top:24px">Investment & Spend Breakup</h4>
        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:0;border-top:1px solid var(--line);border-bottom:1px solid var(--line)">
          <div style="padding:14px 14px 14px 0;border-right:1px solid var(--line);border-bottom:1px solid var(--line)">
            <div style="font:600 9px/1 'Manrope',sans-serif;letter-spacing:0.22em;text-transform:uppercase;color:var(--ink-soft);margin-bottom:8px">Pre-Launch Value</div>
            <div style="font:400 22px/1 'Cormorant Garamond',serif;color:var(--ink);font-variant-numeric:tabular-nums">₹${fmt(launch.pre||0)} <span style="font-size:12px;color:var(--ink-soft)">Mn</span></div>
            <div style="font-size:11px;color:var(--ink-soft);margin-top:6px">Invested till FY26 + FY27 total spend</div>
          </div>
          <div style="padding:14px 0 14px 14px;border-bottom:1px solid var(--line)">
            <div style="font:600 9px/1 'Manrope',sans-serif;letter-spacing:0.22em;text-transform:uppercase;color:var(--ink-soft);margin-bottom:8px">Invested Till FY26</div>
            <div style="font:400 22px/1 'Cormorant Garamond',serif;color:var(--ink);font-variant-numeric:tabular-nums">${launch.inv26?'₹'+fmt(launch.inv26)+' <span style=\"font-size:12px;color:var(--ink-soft)\">Mn</span>':'<span style=\"color:var(--ink-soft)\">—</span>'}</div>
            <div style="font-size:11px;color:var(--ink-soft);margin-top:6px">Land + approvals + works to date</div>
          </div>
          <div style="padding:14px 14px 0 0;border-right:1px solid var(--line)">
            <div style="font:600 9px/1 'Manrope',sans-serif;letter-spacing:0.22em;text-transform:uppercase;color:var(--ink-soft);margin-bottom:8px">FY27 Land Spends</div>
            <div style="font:400 22px/1 'Cormorant Garamond',serif;color:var(--ink);font-variant-numeric:tabular-nums">₹${fmt(launch.land||0)} <span style="font-size:12px;color:var(--ink-soft)">Mn</span></div>
            <div style="font-size:11px;color:var(--ink-soft);margin-top:6px">JD payments, registration</div>
          </div>
          <div style="padding:14px 0 0 14px">
            <div style="font:600 9px/1 'Manrope',sans-serif;letter-spacing:0.22em;text-transform:uppercase;color:var(--ink-soft);margin-bottom:8px">FY27 Approval Spends</div>
            <div style="font:400 22px/1 'Cormorant Garamond',serif;color:var(--ink);font-variant-numeric:tabular-nums">₹${fmt(launch.appr||0)} <span style="font-size:12px;color:var(--ink-soft)">Mn</span></div>
            <div style="font-size:11px;color:var(--ink-soft);margin-top:6px">Plan sanctions, clearances</div>
          </div>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:baseline;padding:14px 0 0 0;font-size:12px;color:var(--ink-soft)">
          <span style="font:600 10px/1 'Manrope',sans-serif;letter-spacing:0.18em;text-transform:uppercase">FY27 Total Spend</span>
          <span style="font:400 18px/1 'Cormorant Garamond',serif;color:var(--ink);font-variant-numeric:tabular-nums">₹${fmt(fy27Total)} <span style="font-size:11px;color:var(--ink-soft)">Mn</span></span>
        </div>`;
    }
    const subBits = [p.city, launch.month].filter(Boolean).join(' · ');
    const titleEl = document.getElementById('drawerTitle');
    titleEl.innerHTML = `${name}${subBits?`<div style="font-family:var(--mono);font-size:11px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:var(--ink-soft);margin-top:8px">${subBits}</div>`:''}`;
    document.getElementById('drawerBody').innerHTML = html;
    document.querySelector('#drawer .crumb').textContent = 'Project Drill-Down';
    document.getElementById('drawer').classList.add('on');
    document.getElementById('drawerOverlay').classList.add('on');
  }
  document.querySelector('#projTable tbody')?.addEventListener('click', e=>{ const r=e.target.closest('.clickrow'); if(r) openProjDrawer(r.dataset.proj); });
  document.querySelector('#ongoTable tbody.x-removed')?.addEventListener('click', e=>{ const r=e.target.closest('.clickrow'); if(r) openProjDrawer(r.dataset.proj); });
  document.querySelector('#invTable tbody')?.addEventListener('click', e=>{
    const r=e.target.closest('.clickrow');
    if(!r) return;
    if(r.dataset.pan){ openPanIndiaDrawer(); return; }
    if(r.dataset.city) openDrawer(r.dataset.city);
  });

  // -------- Sales hierarchy table (Division / Region / City) --------
  // Source: India Sales Plan, Page 7 (consolidated dashboard)
  function buildHier(){
    const cs = {};
    D.citySales.forEach(c => { cs[c.city] = c; });
    const row = (city) => {
      const c = cs[city]; if(!c) return {fy27:0, share:0, fy26:0};
      return {fy27:c.fy27||0, share:c.share27||0, fy26:c.fy26||0};
    };
    const agg = (cities) => cities.reduce((a,city)=>{
      const r = row(city); a.fy27+=r.fy27; a.share+=r.share; a.fy26+=r.fy26; return a;
    },{fy27:0,share:0,fy26:0});

    const ncr = agg(['Gurgaon','Greater Noida']);
    const blr = row('Bangalore');
    const hyd = row('Hyderabad');
    const chn = row('Chennai');
    const central = {fy27: blr.fy27+ncr.fy27+hyd.fy27+chn.fy27, share: blr.share+ncr.share+hyd.share+chn.share, fy26: blr.fy26+ncr.fy26+hyd.fy26+chn.fy26};

    const mum=row('Mumbai'), pun=row('Pune'), gift=row('GIFT City'), cbe=row('Coimbatore');
    const koch=row('Cochin'), thr=row('Thrissur'), tvm=row('Trivandrum'), cal=row('Calicut');
    const kerala = {fy27: koch.fy27+thr.fy27+tvm.fy27+cal.fy27, share: koch.share+thr.share+tvm.share+cal.share, fy26: koch.fy26+thr.fy26+tvm.fy26+cal.fy26};
    const western = {fy27: mum.fy27+pun.fy27+gift.fy27+cbe.fy27+kerala.fy27, share: mum.share+pun.share+gift.share+cbe.share+kerala.share, fy26: mum.fy26+pun.fy26+gift.fy26+cbe.fy26+kerala.fy26};

    const re = {fy27: central.fy27+western.fy27, share: central.share+western.share, fy26: central.fy26+western.fy26};
    // Other (non-RE) divisions: balance to the consolidated total
    const TOTAL = {fy27:181130, fy26:88736, share:143449};
    const other = {fy27: TOTAL.fy27-re.fy27, share: TOTAL.share-re.share, fy26: TOTAL.fy26-re.fy26};

    return [
      {id:'total', lvl:0, name:'PAN INDIA · TOTAL', vals:TOTAL, isTotal:true},
      {id:'re', lvl:1, name:'Real Estate', vals:re, parent:'total', expandable:true, drill:{pan:true}},
        {id:'central', lvl:2, name:'Central Region', vals:central, parent:'re', expandable:true, group:true},
          {id:'blr', lvl:3, name:'Bangalore', vals:blr, parent:'central', drill:{city:'Bangalore'}},
          {id:'ncr', lvl:3, name:'NCR', vals:ncr, parent:'central', expandable:true, drill:{region:'NCR'}},
            {id:'ncr-gur', lvl:4, name:'Gurgaon', vals:row('Gurgaon'), parent:'ncr', drill:{city:'Gurgaon'}},
            {id:'ncr-gn',  lvl:4, name:'Greater Noida', vals:row('Greater Noida'), parent:'ncr', drill:{city:'Greater Noida'}},
          {id:'hyd', lvl:3, name:'Hyderabad', vals:hyd, parent:'central', drill:{city:'Hyderabad'}},
          {id:'c-chn', lvl:3, name:'Chennai', vals:chn, parent:'central', drill:{city:'Chennai'}},
        {id:'western', lvl:2, name:'Western Region', vals:western, parent:'re', expandable:true, group:true},
          {id:'w-mum', lvl:3, name:'Mumbai', vals:mum, parent:'western', drill:{city:'Mumbai'}},
          {id:'w-pun', lvl:3, name:'Pune', vals:pun, parent:'western', drill:{city:'Pune'}},
          {id:'w-gift', lvl:3, name:'GIFT City', vals:gift, parent:'western', drill:{city:'GIFT City'}},
          {id:'w-cbe', lvl:3, name:'Coimbatore', vals:cbe, parent:'western', drill:{city:'Coimbatore'}},
          {id:'kerala', lvl:3, name:'Kerala', vals:kerala, parent:'western', expandable:true, drill:{region:'Kerala'}},
            {id:'k-koch', lvl:4, name:'Cochin', vals:koch, parent:'kerala', drill:{city:'Cochin'}},
            {id:'k-thr',  lvl:4, name:'Thrissur', vals:thr, parent:'kerala', drill:{city:'Thrissur'}},
            {id:'k-tvm',  lvl:4, name:'Trivandrum', vals:tvm, parent:'kerala', drill:{city:'Trivandrum'}},
            {id:'k-cal',  lvl:4, name:'Calicut', vals:cal, parent:'kerala', drill:{city:'Calicut'}},
      {id:'other', lvl:1, name:'Other Divisions', vals:other, parent:'total', expandable:true},
        {id:'commercial', lvl:2, name:'Commercial', vals:{fy27:932,share:932,fy26:781}, parent:'other', expandable:true, group:true},
          {id:'com-mall',  lvl:3, name:'Sobha City Mall (Thrissur)', vals:{fy27:369,share:369,fy26:323}, parent:'commercial'},
          {id:'com-1sob',  lvl:3, name:'1Sobha',           vals:{fy27:527,share:527,fy26:424}, parent:'commercial'},
          {id:'com-icg',   lvl:3, name:'ICG Clubhouse',    vals:{fy27:16,share:16,fy26:15}, parent:'commercial'},
          {id:'com-lake',  lvl:3, name:'Lakeview Clubhouse', vals:{fy27:19,share:19,fy26:19}, parent:'commercial'},
        {id:'contractual', lvl:2, name:'Contractual', vals:{fy27:2278,share:2278,fy26:2497}, parent:'other', expandable:true, group:true},
          {id:'con-civ', lvl:3, name:'Civil', vals:{fy27:928,share:928,fy26:1055}, parent:'contractual'},
          {id:'con-phe', lvl:3, name:'PHE',   vals:{fy27:500,share:500,fy26:630}, parent:'contractual'},
          {id:'con-ele', lvl:3, name:'ELE',   vals:{fy27:850,share:850,fy26:812}, parent:'contractual'},
        {id:'mfg', lvl:2, name:'Manufacturing', vals:{fy27:3983,share:3436,fy26:3715}, parent:'other', expandable:true, group:true},
          {id:'mfg-glz', lvl:3, name:'Glazing & Metal Works', vals:{fy27:2200,share:1960,fy26:2033}, parent:'mfg'},
          {id:'mfg-int', lvl:3, name:'Interiors',             vals:{fy27:1050,share:840,fy26:712}, parent:'mfg'},
          {id:'mfg-con', lvl:3, name:'Concrete Products',     vals:{fy27:733,share:636,fy26:970}, parent:'mfg'},
        {id:'retail', lvl:2, name:'Retail', vals:{fy27:540,share:361,fy26:384}, parent:'other', expandable:true, group:true},
          {id:'ret-mat', lvl:3, name:'Mattresses', vals:{fy27:184,share:180,fy26:130}, parent:'retail'},
          {id:'ret-met', lvl:3, name:'Metercube',  vals:{fy27:356,share:181,fy26:254}, parent:'retail'},
    ];
  }
  const hierExpanded = new Set(['total','re','central','western','other']);
  function drawHier(){
    const tb = document.querySelector('#hierTable tbody');
    if(!tb) return;
    const rows = buildHier();
    const visible = rows.filter(r => {
      let p = r.parent;
      while(p){ if(!hierExpanded.has(p)) return false; const pr = rows.find(x=>x.id===p); p = pr?.parent; }
      return true;
    });
    let html = '';
    visible.forEach(r => {
      const v = r.vals;
      const fmtN = (n) => n==null ? '<span class="dim">—</span>' : fmt(Math.round(n));
      const drillAttr = r.drill ? (r.drill.city ? `data-drill-city="${r.drill.city}"` : r.drill.region ? `data-drill-region="${r.drill.region}"` : r.drill.pan ? `data-drill-pan="1"` : '') : '';
      const drillCls = r.drill ? 'drill' : '';
      const sharePct = (v.fy27 && v.share!=null) ? (v.share/v.fy27*100) : null;
      const growth = (v.fy26 && v.fy27!=null) ? ((v.fy27-v.fy26)/v.fy26*100) : null;
      const pad = 8 + r.lvl*22;
      const isExp = hierExpanded.has(r.id);
      const caret = r.expandable ? `<span class="caret" style="display:inline-block;width:12px;color:var(--accent)">${isExp?'▾':'▸'}</span> ` : (r.lvl>=3?'<span style="display:inline-block;width:18px"></span>':'');
      const cls = r.isTotal ? 'total total-top' : (r.group ? 'seg-group' : (r.lvl===1?'seg-group':''));
      const nameStyle = r.isTotal ? '' : (r.lvl===1 ? 'font-weight:700;text-transform:none' : (r.lvl===2 ? 'font-weight:600;text-transform:uppercase;letter-spacing:0.04em;font-size:12px' : 'font-weight:400'));
      const padStyle = r.isTotal ? '' : `padding-left:${pad}px;`;
      html += `<tr class="${cls}" data-hier="${r.id}" ${r.expandable?'style="cursor:pointer"':''}>
        <td class="l" style="${padStyle}${nameStyle}">${caret}${r.name}</td>
        <td class="${drillCls}" ${drillAttr}>${fmtN(v.fy27)}</td>
        <td>${fmtN(v.share)}</td>
        <td>${sharePct==null?'<span class="dim">—</span>':sharePct.toFixed(1)+'%'}</td>
        <td class="${growth==null?'dim':growth>=0?'pos':'neg'}">${growth==null?'—':(growth>=0?'▲ +':'▼ ')+growth.toFixed(1)+'%'}</td>
        <td>${fmtN(v.fy26)}</td>
      </tr>`;
    });
    tb.innerHTML = html;
  }
  document.querySelector('#hierTable tbody')?.addEventListener('click', e => {
    // Drill-down on Total Sales number cell
    const drillCell = e.target.closest('td[data-drill-city],td[data-drill-region],td[data-drill-pan]');
    if(drillCell){
      e.stopPropagation();
      if(drillCell.dataset.drillCity) openDrawer(drillCell.dataset.drillCity);
      else if(drillCell.dataset.drillRegion) openRegionDrawer(drillCell.dataset.drillRegion);
      else if(drillCell.dataset.drillPan) openPanIndiaDrawer();
      return;
    }
    const tr = e.target.closest('tr[data-hier]');
    if(!tr) return;
    const id = tr.dataset.hier;
    const rows = buildHier();
    const r = rows.find(x=>x.id===id);
    if(!r?.expandable) return;
    if(hierExpanded.has(id)) hierExpanded.delete(id);
    else hierExpanded.add(id);
    drawHier();
  });

  // -------- Initial render --------
  drawCityBar();
  drawTrend();
  drawHier();
  drawInv();
  if(document.getElementById('launchTable')) drawLaunches();
  drawAvgReal();
  drawQSales();
  // drawWT(); // moved to walkthrough dashboard
  drawMix();
  drawCal('launchCal', D.launchCal, it=>'₹'+fmt(it.inv));
  // drawCal('wtCal', D.wtCal, ...); moved to walkthrough dashboard
  drawProj();
  drawOngo();
})();
