// Cash Flow dashboard
(function(){
  const D = window.SOBHA;
  const fmt = n => n==null||isNaN(n)? '–' : Math.round(n).toLocaleString('en-IN');
  const sign = n => n>0?'+':'';
  const tooltip = document.getElementById('tooltip');

  // -------- Waterfall chart --------
  function drawWaterfall(){
    const svg = document.getElementById('waterfall');
    const W=800, H=360, m={t:30, r:30, b:50, l:60};
    const iw=W-m.l-m.r, ih=H-m.t-m.b;
    // Build bars: Inflow (positive total) → segmented outflow → Net
    const bars = [
      {l:'Total Inflow', v:109011, t:'tot', col:'var(--info)'},
      {l:'RE Outflow', v:-66206, t:'neg'},
      {l:'Contracts', v:-1814, t:'neg'},
      {l:'Manufacturing', v:-4545, t:'neg'},
      {l:'Corporate', v:-12370, t:'neg'},
      {l:'Land Pmt', v:-19427, t:'neg'},
      {l:'Capex Gen', v:-6467, t:'neg'},
      {l:'Int+Div', v:-1667, t:'neg'},
      {l:'Net CF', v:-3485, t:'tot', col:'var(--neg)'}
    ];
    let cum=0;
    const series = bars.map(b=>{
      if(b.t==='tot') return {...b, from:0, to:b.v};
      const from=cum, to=cum+b.v;
      cum=to;
      return {...b, from, to};
    });
    // After first total bar, cumulative should start from inflow
    series[1].from = 109011; series[1].to = 109011 + series[1].v;
    cum = series[1].to;
    for(let i=2;i<series.length-1;i++){
      series[i].from = cum;
      series[i].to = cum + series[i].v;
      cum = series[i].to;
    }
    series[series.length-1] = {...bars[bars.length-1], from:0, to:-3485, t:'tot', col:'var(--neg)'};
    const min = Math.min(...series.flatMap(s=>[s.from,s.to,0]));
    const max = Math.max(...series.flatMap(s=>[s.from,s.to,0]));
    const range = max-min;
    const yScale = v => m.t + ih - ((v-min)/range)*ih;
    const bw = iw/series.length - 14;
    let html=`<g class="grid">`;
    for(let i=0;i<=4;i++){
      const v = min + range*i/4;
      const y = yScale(v);
      html += `<line x1="${m.l}" x2="${W-m.r}" y1="${y}" y2="${y}"/>`;
      html += `<text x="${m.l-6}" y="${y+3}" text-anchor="end">${(v/1000).toFixed(0)}k</text>`;
    }
    html += `<line x1="${m.l}" x2="${W-m.r}" y1="${yScale(0)}" y2="${yScale(0)}" stroke="var(--border-light)" stroke-dasharray="0"/>`;
    html += `</g>`;
    series.forEach((s,i)=>{
      const x = m.l + i*(iw/series.length) + 7;
      const y0 = yScale(s.from);
      const y1 = yScale(s.to);
      const y = Math.min(y0,y1);
      const h = Math.abs(y1-y0);
      const col = s.col || (s.v<0?'var(--neg)':'var(--pos)');
      html += `<rect x="${x}" y="${y}" width="${bw}" height="${Math.max(2,h)}" fill="${col}" opacity="0.85"/>`;
      // connector
      if(i>0 && i<series.length-1){
        const prevX = m.l + (i-1)*(iw/series.length) + 7 + bw;
        const py = yScale(series[i-1].to);
        html += `<line x1="${prevX}" x2="${x}" y1="${py}" y2="${py}" stroke="var(--border)" stroke-dasharray="2 2"/>`;
      }
      const valY = h<20 ? y-4 : y+12;
      html += `<text x="${x+bw/2}" y="${valY}" text-anchor="middle" style="fill:var(--text);font-size:10px">${s.v>0?'+':''}${(s.v/1000).toFixed(1)}k</text>`;
      html += `<text x="${x+bw/2}" y="${H-30}" text-anchor="middle" style="font-size:9px;fill:var(--text-2)">${s.l}</text>`;
    });
    svg.innerHTML = html;
  }

  // -------- Quarterly cumulative chart --------
  function drawQCash(){
    const svg = document.getElementById('qCash');
    const W=460, H=360, m={t:24,r:30,b:36,l:60};
    const iw=W-m.l-m.r, ih=H-m.t-m.b;
    const inq = D.cfs.summary[0]; const outq = D.cfs.summary[1]; const netq = D.cfs.summary[2];
    const inflows = [inq.q1, inq.q2, inq.q3, inq.q4];
    const outflows = [outq.q1, outq.q2, outq.q3, outq.q4];
    const nets = [netq.q1, netq.q2, netq.q3, netq.q4];
    let cum=0;
    const cumNets = nets.map(v=> (cum+=v));
    const max = Math.max(...inflows, ...outflows)*1.1;
    const min = Math.min(...cumNets, 0)*1.4;
    const range = max-min;
    const xPos = i => m.l + (i+0.5)*(iw/4);
    const yScale = v => m.t + ih - ((v-min)/range)*ih;
    const bw = iw/4 - 24;
    let html=`<g class="grid">`;
    for(let i=0;i<=4;i++){
      const v = min+range*i/4, y=yScale(v);
      html += `<line x1="${m.l}" x2="${W-m.r}" y1="${y}" y2="${y}"/>`;
      html += `<text x="${m.l-6}" y="${y+3}" text-anchor="end">${(v/1000).toFixed(0)}k</text>`;
    }
    html += `<line x1="${m.l}" x2="${W-m.r}" y1="${yScale(0)}" y2="${yScale(0)}" stroke="var(--border-light)"/>`;
    html += `</g>`;
    inflows.forEach((v,i)=>{
      const x = xPos(i)-bw/2-2;
      const y = yScale(v);
      const h = yScale(0)-y;
      html += `<rect x="${x}" y="${y}" width="${bw/2-1}" height="${h}" fill="var(--pos)" opacity="0.7"/>`;
      const yo = yScale(outflows[i]);
      html += `<rect x="${xPos(i)+2}" y="${yo}" width="${bw/2-1}" height="${yScale(0)-yo}" fill="var(--neg)" opacity="0.7"/>`;
      html += `<text x="${xPos(i)}" y="${H-18}" text-anchor="middle" fill="var(--text-2)" style="font-size:11px">Q${i+1}</text>`;
    });
    // Cumulative net line
    const linePts = cumNets.map((v,i)=>`${i==0?'M':'L'}${xPos(i)},${yScale(v)}`).join(' ');
    html += `<path d="${linePts}" fill="none" stroke="var(--accent)" stroke-width="2"/>`;
    cumNets.forEach((v,i)=>{
      html += `<circle cx="${xPos(i)}" cy="${yScale(v)}" r="4" fill="var(--accent)"/>`;
      html += `<text x="${xPos(i)}" y="${yScale(v)-9}" text-anchor="middle" style="fill:var(--accent);font-size:10px">${(v/1000).toFixed(1)}k</text>`;
    });
    // Legend
    html += `<text x="${m.l}" y="14" style="fill:var(--pos);font-size:10px">■ Inflow</text>`;
    html += `<text x="${m.l+70}" y="14" style="fill:var(--neg);font-size:10px">■ Outflow</text>`;
    html += `<text x="${m.l+150}" y="14" style="fill:var(--accent);font-size:10px">— Cumulative Net</text>`;
    svg.innerHTML = html;
  }

  // -------- Inflow / Outflow tables --------
  function drawCfsTable(targetId, items){
    const tb = document.querySelector('#'+targetId+' tbody');
    let html='';
    items.forEach(it=>{
      const cls = it.level===0 ? 'section' : (it.level===1 ? 'subsection' : '');
      const indent = it.level===2 ? 'padding-left: 28px;' : '';
      html += `<tr class="${cls}">
        <td class="l" style="${indent}">${it.label}</td>
        <td>${fmt(it.fy27)}</td>
        <td class="dim">${fmt(it.fy26)}</td>
        <td class="dim">${fmt(it.q1)}</td>
        <td class="dim">${fmt(it.q2)}</td>
        <td class="dim">${fmt(it.q3)}</td>
        <td class="dim">${fmt(it.q4)}</td>
      </tr>`;
    });
    tb.innerHTML = html;
  }

  // -------- Segment table --------
  function drawSegTable(){
    const tb = document.querySelector('#segTable tbody');
    let html='';
    let totals = {billing:0,in:0,out:0,net:0,opIn:0,opOut:0,npOp:0,ndOp:0};
    D.cfs.segments.forEach(s=>{
      Object.keys(totals).forEach(k=>totals[k]+=s[k]);
      html += `<tr>
        <td class="l">${s.seg}</td>
        <td>${fmt(s.billing)}</td>
        <td class="pos">${fmt(s.in)}</td>
        <td class="neg">${fmt(s.out)}</td>
        <td class="${s.net>=0?'pos':'neg'}">${s.net>=0?'+':''}${fmt(s.net)}</td>
        <td>${fmt(s.opIn)}</td>
        <td>${fmt(s.opOut)}</td>
        <td class="${s.npOp>=0?'pos':'neg'}">${s.npOp>=0?'+':''}${fmt(s.npOp)}</td>
        <td class="${s.ndOp>=0?'pos':'neg'}">${s.ndOp>=0?'+':''}${fmt(s.ndOp)}</td>
      </tr>`;
    });
    html += `<tr class="total">
      <td class="l">TOTAL</td>
      <td>${fmt(totals.billing)}</td>
      <td>${fmt(totals.in)}</td>
      <td>${fmt(totals.out)}</td>
      <td class="${totals.net>=0?'pos':'neg'}">${totals.net>=0?'+':''}${fmt(totals.net)}</td>
      <td>${fmt(totals.opIn)}</td>
      <td>${fmt(totals.opOut)}</td>
      <td class="${totals.npOp>=0?'pos':'neg'}">${totals.npOp>=0?'+':''}${fmt(totals.npOp)}</td>
      <td class="${totals.ndOp>=0?'pos':'neg'}">${totals.ndOp>=0?'+':''}${fmt(totals.ndOp)}</td>
    </tr>`;
    tb.innerHTML = html;
  }

  // -------- City CFS table --------
  function drawCityCfs(){
    const tb = document.querySelector('#cityCfsTable tbody');
    const data = [...D.cfs.citiesCfs].sort((a,b)=>b.in-a.in);
    let html='';
    data.forEach(d=>{
      const netPos = d.net>=0;
      html += `<tr>
        <td class="l">${d.city}</td>
        <td>${fmt(d.billing)}</td>
        <td class="pos">${fmt(d.in)}</td>
        <td class="neg">${fmt(d.out)}</td>
        <td class="${netPos?'pos':'neg'}">${netPos?'+':''}${fmt(d.net)}</td>
        <td class="${d.ncfo>=0?'pos':'neg'}">${d.ncfo>=0?'+':''}${fmt(d.ncfo)}</td>
        <td class="dim">${fmt(d.land)}</td>
        <td class="dim">${fmt(d.capex)}</td>
        <td><span class="meter" style="width:80px"><i style="background:${netPos?'var(--pos)':'var(--neg)'};width:${Math.min(100,Math.abs(d.net)/Math.max(...data.map(x=>Math.abs(x.net)))*100)}%"></i></span></td>
      </tr>`;
    });
    tb.innerHTML = html;
  }

  // -------- Land payment chart --------
  function drawLand(){
    const svg = document.getElementById('landChart');
    const data = [...D.landPay].filter(d=>d.fy27>0).sort((a,b)=>b.total-a.total);
    const W=380, H=380, m={t:14,r:14,b:14,l:90};
    const iw=W-m.l-m.r;
    const max = Math.max(...data.map(d=>d.total))*1.05;
    const bh = (H-m.t-m.b)/data.length - 4;
    let html='';
    data.forEach((d,i)=>{
      const y = m.t + i*((H-m.t-m.b)/data.length);
      const wTotal = (d.total/max)*iw;
      const wFy27 = (d.fy27/max)*iw;
      html += `<text x="${m.l-6}" y="${y+bh/2+3}" text-anchor="end" style="fill:var(--text-2);font-size:10px">${d.city}</text>`;
      html += `<rect x="${m.l}" y="${y}" width="${wTotal}" height="${bh}" fill="var(--bg-3)"/>`;
      html += `<rect x="${m.l}" y="${y}" width="${wFy27}" height="${bh}" fill="var(--accent)"/>`;
      html += `<text x="${m.l+wTotal+6}" y="${y+bh/2+3}" style="fill:var(--text);font-size:10px">${fmt(d.fy27)}</text>`;
    });
    svg.innerHTML=html;
  }

  // -------- Capex table --------
  function drawCapex(){
    const tb = document.querySelector('#capexTable tbody');
    let html='';
    let grand=0;
    D.capex.forEach(cat=>{
      let sums={q1:0,q2:0,q3:0,q4:0,fy27:0};
      cat.items.forEach(it=>{ sums.q1+=it.q1; sums.q2+=it.q2; sums.q3+=it.q3; sums.q4+=it.q4; sums.fy27+=it.fy27; });
      grand += sums.fy27;
      html += `<tr class="subsection">
        <td class="l">${cat.cat}</td>
        <td>${fmt(sums.q1)}</td>
        <td>${fmt(sums.q2)}</td>
        <td>${fmt(sums.q3)}</td>
        <td>${fmt(sums.q4)}</td>
        <td>${fmt(sums.fy27)}</td>
      </tr>`;
      cat.items.forEach(it=>{
        html += `<tr>
          <td class="l" style="padding-left:28px">${it.n}</td>
          <td class="dim">${fmt(it.q1)}</td>
          <td class="dim">${fmt(it.q2)}</td>
          <td class="dim">${fmt(it.q3)}</td>
          <td class="dim">${fmt(it.q4)}</td>
          <td>${fmt(it.fy27)}</td>
        </tr>`;
      });
    });
    html += `<tr class="total">
      <td class="l">TOTAL CAPEX</td><td colspan="4"></td>
      <td>${fmt(grand)}</td>
    </tr>`;
    tb.innerHTML = html;
  }

  // -------- Finance cost table --------
  function drawFin(){
    const tb = document.querySelector('#finTable tbody');
    let html='';
    let totals={q1:0,q2:0,q3:0,q4:0,fy27:0,fy26:0};
    D.fincost.forEach(it=>{
      Object.keys(totals).forEach(k=>totals[k]+=it[k]);
      html += `<tr>
        <td class="l">${it.item}</td>
        <td class="dim">${fmt(it.q1)}</td>
        <td class="dim">${fmt(it.q2)}</td>
        <td class="dim">${fmt(it.q3)}</td>
        <td class="dim">${fmt(it.q4)}</td>
        <td>${fmt(it.fy27)}</td>
        <td class="dim">${fmt(it.fy26)}</td>
      </tr>`;
    });
    html += `<tr class="total">
      <td class="l">TOTAL</td>
      <td>${fmt(totals.q1)}</td>
      <td>${fmt(totals.q2)}</td>
      <td>${fmt(totals.q3)}</td>
      <td>${fmt(totals.q4)}</td>
      <td>${fmt(totals.fy27)}</td>
      <td class="dim">${fmt(totals.fy26)}</td>
    </tr>`;
    tb.innerHTML = html;
  }

  drawWaterfall();
  drawQCash();
  drawCfsTable('inflowTable', D.cfs.inflow);
  drawCfsTable('outflowTable', D.cfs.outflow);
  drawSegTable();
  drawCityCfs();
  drawLand();
  drawCapex();
  drawFin();
})();
