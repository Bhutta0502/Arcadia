// Overheads dashboard
(function(){
  const D = window.SOBHA;
  const fmt = n => n==null||isNaN(n)? '–' : Math.round(n).toLocaleString('en-IN');
  const fmt1 = n => n==null||isNaN(n)? '–' : n.toFixed(1);
  const fmtP = n => n==null||isNaN(n)? '–' : n.toFixed(1)+'%';
  const tooltip = document.getElementById('tooltip');
  function tt(html, e){
    tooltip.innerHTML = html;
    tooltip.classList.add('on');
    tooltip.style.left = Math.min(window.innerWidth-260, e.clientX+12)+'px';
    tooltip.style.top = (e.clientY+12)+'px';
  }
  function ttHide(){ tooltip.classList.remove('on'); }

  let mode = 'all';

  function getEntities(){
    const re = D.overheads.re.map(d=>({...d, name:d.city, type:'RE'}));
    const ot = D.overheads.other.map(d=>({...d, name:d.biz, type:'Other'}));
    if(mode==='re') return re;
    if(mode==='other') return ot;
    return [...re, ...ot];
  }

  // -------- Bar chart --------
  function drawBar(){
    const svg = document.getElementById('ohBar');
    const data = getEntities().filter(d=>d.total>0).sort((a,b)=>b.total-a.total);
    const W=800, H=400, m={t:14,r:24,b:90,l:50};
    const iw=W-m.l-m.r, ih=H-m.t-m.b;
    const max = Math.max(...data.map(d=>d.total))*1.1;
    const bw = iw/data.length - 6;
    let html=`<g class="grid">`;
    for(let i=0;i<=4;i++){
      const v = max*i/4, y=m.t+ih-(v/max)*ih;
      html += `<line x1="${m.l}" x2="${W-m.r}" y1="${y}" y2="${y}"/>`;
      html += `<text x="${m.l-6}" y="${y+3}" text-anchor="end">${v.toFixed(0)}</text>`;
    }
    html += `</g>`;
    data.forEach((d,i)=>{
      const x = m.l + i*(iw/data.length) + 3;
      const hDir = (d.direct/max)*ih;
      const hAlloc = (d.alloc/max)*ih;
      const yDir = m.t+ih - hDir;
      const yAlloc = yDir - hAlloc;
      html += `<rect x="${x}" y="${yAlloc}" width="${bw}" height="${hAlloc}" fill="var(--info)" opacity="0.7"/>`;
      html += `<rect x="${x}" y="${yDir}" width="${bw}" height="${hDir}" fill="var(--accent)"/>`;
      html += `<text x="${x+bw/2}" y="${yAlloc-4}" text-anchor="middle" style="font-size:9px;fill:var(--text-2)">${fmt1(d.total)}</text>`;
      const lbl = d.name.length>10?d.name.substr(0,9)+'…':d.name;
      html += `<text x="${x+bw/2}" y="${H-m.b+18}" text-anchor="end" transform="rotate(-45 ${x+bw/2} ${H-m.b+18})" style="font-size:9px;fill:var(--text-2)">${lbl}</text>`;
      html += `<rect class="hover-target" x="${m.l+i*(iw/data.length)}" y="${m.t}" width="${iw/data.length}" height="${ih}" fill="transparent" data-i="${i}"/>`;
    });
    svg.innerHTML = html;
    svg.querySelectorAll('.hover-target').forEach(r=>{
      r.addEventListener('mousemove', e=>{
        const d = data[+r.dataset.i];
        tt(`<div class="tt-t">${d.name}</div>
          <div class="tt-r"><span class="lab">Type</span><span class="val">${d.type}</span></div>
          <div class="tt-r"><span class="lab">Direct</span><span class="val">₹${fmt1(d.direct)} Mn</span></div>
          <div class="tt-r"><span class="lab">Allocated</span><span class="val">₹${fmt1(d.alloc)} Mn</span></div>
          <div class="tt-r"><span class="lab">Total</span><span class="val">₹${fmt1(d.total)} Mn</span></div>
          <div class="tt-r"><span class="lab">% of Sales</span><span class="val">${fmtP(d.pSales)}</span></div>
          <div class="tt-r"><span class="lab">% of Cash</span><span class="val">${fmtP(d.pCash)}</span></div>
          <div class="tt-r"><span class="lab">% of Revenue</span><span class="val">${fmtP(d.pRev)}</span></div>`, e);
      });
      r.addEventListener('mouseleave', ttHide);
    });
  }

  // -------- Scatter --------
  function drawScatter(){
    const svg = document.getElementById('ohScatter');
    const data = getEntities().filter(d=>d.sales>0 && d.pSales<50);
    const W=460, H=400, m={t:24,r:24,b:46,l:50};
    const iw=W-m.l-m.r, ih=H-m.t-m.b;
    const maxX = Math.max(...data.map(d=>d.sales))*1.05;
    const maxY = Math.min(45, Math.max(...data.map(d=>d.pSales))*1.1);
    const maxR = Math.max(...data.map(d=>d.total));
    const xS = v => m.l + (v/maxX)*iw;
    const yS = v => m.t + ih - (v/maxY)*ih;
    let html=`<g class="grid">`;
    for(let i=0;i<=4;i++){
      const v = maxY*i/4, y=yS(v);
      html += `<line x1="${m.l}" x2="${W-m.r}" y1="${y}" y2="${y}"/>`;
      html += `<text x="${m.l-6}" y="${y+3}" text-anchor="end">${v.toFixed(1)}%</text>`;
    }
    for(let i=0;i<=4;i++){
      const v = maxX*i/4, x=xS(v);
      html += `<line x1="${x}" x2="${x}" y1="${m.t}" y2="${m.t+ih}"/>`;
      html += `<text x="${x}" y="${H-22}" text-anchor="middle">${(v/1000).toFixed(0)}k</text>`;
    }
    // benchmark line at 2.3%
    html += `<line x1="${m.l}" x2="${W-m.r}" y1="${yS(2.3)}" y2="${yS(2.3)}" stroke="var(--accent)" stroke-dasharray="4 3" opacity="0.6"/>`;
    html += `<text x="${W-m.r-4}" y="${yS(2.3)-4}" text-anchor="end" style="fill:var(--accent);font-size:9px">CONSOL 2.3%</text>`;
    html += `</g>`;
    html += `<text x="${m.l+iw/2}" y="${H-6}" text-anchor="middle" style="fill:var(--text-3);font-size:10px">SALES (Rs. Mn)</text>`;
    html += `<text x="12" y="${m.t+ih/2}" text-anchor="middle" transform="rotate(-90 12 ${m.t+ih/2})" style="fill:var(--text-3);font-size:10px">% OF SALES</text>`;
    data.forEach((d,i)=>{
      const r = Math.max(3, Math.sqrt(d.total/maxR)*16);
      const col = d.type==='RE'?'var(--accent)':'var(--info)';
      html += `<circle cx="${xS(d.sales)}" cy="${yS(d.pSales)}" r="${r}" fill="${col}" opacity="0.6" stroke="${col}" stroke-width="1" class="hover-target" data-i="${i}" style="cursor:pointer"/>`;
      if(d.total>50){
        html += `<text x="${xS(d.sales)}" y="${yS(d.pSales)-r-3}" text-anchor="middle" style="fill:var(--text-2);font-size:9px">${d.name}</text>`;
      }
    });
    svg.innerHTML = html;
    svg.querySelectorAll('.hover-target').forEach(c=>{
      c.addEventListener('mousemove', e=>{
        const d = data[+c.dataset.i];
        tt(`<div class="tt-t">${d.name}</div>
          <div class="tt-r"><span class="lab">Sales</span><span class="val">₹${fmt(d.sales)} Mn</span></div>
          <div class="tt-r"><span class="lab">Total OH</span><span class="val">₹${fmt1(d.total)} Mn</span></div>
          <div class="tt-r"><span class="lab">% of Sales</span><span class="val">${fmtP(d.pSales)}</span></div>`, e);
      });
      c.addEventListener('mouseleave', ttHide);
    });
  }

  // -------- RE table --------
  function drawRE(){
    const tb = document.querySelector('#reTable tbody');
    const data = [...D.overheads.re].sort((a,b)=>b.total-a.total);
    let totals = {sales:0, cash:0, rev:0, direct:0, alloc:0, total:0};
    let html='';
    data.forEach(d=>{
      Object.keys(totals).forEach(k=>totals[k]+=d[k]);
      const eff = d.pSales<2.3 ? 'pos' : (d.pSales<5?'amber':'neg');
      const lbl = d.pSales<2.3?'Efficient':(d.pSales<5?'On Plan':'Watch');
      html += `<tr>
        <td class="l">${d.city}</td>
        <td>${fmt(d.sales)}</td>
        <td class="dim">${fmt(d.cash)}</td>
        <td class="dim">${fmt(d.rev)}</td>
        <td>${fmt1(d.direct)}</td>
        <td class="dim">${fmt1(d.alloc)}</td>
        <td class="pos">${fmt1(d.total)}</td>
        <td>${fmtP(d.pSales)}</td>
        <td class="dim">${fmtP(d.pCash)}</td>
        <td class="dim">${fmtP(d.pRev)}</td>
        <td><span class="chip ${eff}">${lbl}</span></td>
      </tr>`;
    });
    const tSales = totals.sales/100;
    html += `<tr class="total">
      <td class="l">RE TOTAL</td>
      <td>${fmt(totals.sales)}</td>
      <td>${fmt(totals.cash)}</td>
      <td>${fmt(totals.rev)}</td>
      <td>${fmt1(totals.direct)}</td>
      <td>${fmt1(totals.alloc)}</td>
      <td>${fmt1(totals.total)}</td>
      <td>${fmtP(totals.total/totals.sales*100)}</td>
      <td>${fmtP(totals.total/totals.cash*100)}</td>
      <td>${fmtP(totals.total/totals.rev*100)}</td>
      <td></td>
    </tr>`;
    tb.innerHTML = html;
  }

  // -------- Other table --------
  function drawOther(){
    const tb = document.querySelector('#otherTable tbody');
    const data = [...D.overheads.other].sort((a,b)=>b.total-a.total);
    let totals = {sales:0, cash:0, rev:0, direct:0, alloc:0, total:0};
    let html='';
    data.forEach(d=>{
      Object.keys(totals).forEach(k=>totals[k]+=d[k]);
      html += `<tr>
        <td class="l">${d.biz}</td>
        <td>${fmt(d.sales)}</td>
        <td class="dim">${fmt(d.cash)}</td>
        <td class="dim">${fmt(d.rev)}</td>
        <td>${fmt1(d.direct)}</td>
        <td class="dim">${fmt1(d.alloc)}</td>
        <td class="pos">${fmt1(d.total)}</td>
        <td>${fmtP(d.pSales)}</td>
        <td class="dim">${fmtP(d.pCash)}</td>
        <td class="dim">${fmtP(d.pRev)}</td>
      </tr>`;
    });
    html += `<tr class="total">
      <td class="l">OTHER TOTAL</td>
      <td>${fmt(totals.sales)}</td>
      <td>${fmt(totals.cash)}</td>
      <td>${fmt(totals.rev)}</td>
      <td>${fmt1(totals.direct)}</td>
      <td>${fmt1(totals.alloc)}</td>
      <td>${fmt1(totals.total)}</td>
      <td>${fmtP(totals.total/totals.sales*100)}</td>
      <td>${fmtP(totals.total/totals.cash*100)}</td>
      <td>${fmtP(totals.total/totals.rev*100)}</td>
    </tr>`;
    tb.innerHTML = html;
  }

  // -------- Benchmark chart --------
  function drawBench(){
    const svg = document.getElementById('benchChart');
    const data = getEntities().filter(d=>d.sales>0 && d.pSales<50).sort((a,b)=>a.pSales-b.pSales);
    const W=600, H=360, m={t:14,r:14,b:14,l:130};
    const iw=W-m.l-m.r;
    const max = Math.max(...data.map(d=>d.pSales))*1.05;
    const bh = (H-m.t-m.b)/data.length - 2;
    const benchX = m.l + (2.3/max)*iw;
    let html='';
    data.forEach((d,i)=>{
      const y = m.t + i*((H-m.t-m.b)/data.length);
      const w = (d.pSales/max)*iw;
      const col = d.pSales<2.3?'var(--pos)':(d.pSales<5?'var(--accent)':'var(--neg)');
      html += `<text x="${m.l-6}" y="${y+bh/2+3}" text-anchor="end" style="fill:var(--text-2);font-size:10px">${d.name}</text>`;
      html += `<rect x="${m.l}" y="${y}" width="${w}" height="${bh}" fill="${col}" opacity="0.85"/>`;
      html += `<text x="${m.l+w+4}" y="${y+bh/2+3}" style="fill:var(--text);font-size:9px">${fmtP(d.pSales)}</text>`;
    });
    html += `<line x1="${benchX}" x2="${benchX}" y1="${m.t}" y2="${H-m.b}" stroke="var(--accent)" stroke-dasharray="3 3"/>`;
    html += `<text x="${benchX+4}" y="${m.t+10}" style="fill:var(--accent);font-size:9px">2.3%</text>`;
    svg.innerHTML = html;
  }

  // -------- Stacked split chart --------
  function drawSplit(){
    const svg = document.getElementById('splitChart');
    const data = getEntities().filter(d=>d.total>0).sort((a,b)=>b.total-a.total);
    const W=600, H=360, m={t:14,r:14,b:14,l:130};
    const iw=W-m.l-m.r;
    const max = Math.max(...data.map(d=>d.total))*1.05;
    const bh = (H-m.t-m.b)/data.length - 2;
    let html='';
    data.forEach((d,i)=>{
      const y = m.t + i*((H-m.t-m.b)/data.length);
      const wDir = (d.direct/max)*iw;
      const wAlloc = (d.alloc/max)*iw;
      html += `<text x="${m.l-6}" y="${y+bh/2+3}" text-anchor="end" style="fill:var(--text-2);font-size:10px">${d.name}</text>`;
      html += `<rect x="${m.l}" y="${y}" width="${wDir}" height="${bh}" fill="var(--accent)" opacity="0.9"/>`;
      html += `<rect x="${m.l+wDir}" y="${y}" width="${wAlloc}" height="${bh}" fill="var(--info)" opacity="0.7"/>`;
      html += `<text x="${m.l+wDir+wAlloc+4}" y="${y+bh/2+3}" style="fill:var(--text);font-size:9px">${fmt1(d.total)}</text>`;
    });
    svg.innerHTML = html;
  }

  function redraw(){
    drawBar();
    drawScatter();
    drawBench();
    drawSplit();
  }

  document.querySelectorAll('.btn-toggle').forEach(b=>{
    b.addEventListener('click', ()=>{
      document.querySelectorAll('.btn-toggle').forEach(x=>x.classList.remove('on'));
      b.classList.add('on');
      mode = b.id==='tRE'?'re':(b.id==='tOther'?'other':'all');
      redraw();
    });
  });

  drawRE();
  drawOther();
  redraw();
})();
