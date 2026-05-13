// P&L dashboard
(function(){
  const D = window.SOBHA;
  const fmt = n => n==null||isNaN(n)? '–' : Math.round(n).toLocaleString('en-IN');
  const fmtP = n => n==null? '–' : n.toFixed(1)+'%';
  const sign = n => n>0?'+':'';
  const tooltip = document.getElementById('tooltip');
  function tt(html, e){
    tooltip.innerHTML = html;
    tooltip.classList.add('on');
    tooltip.style.left = Math.min(window.innerWidth-260, e.clientX+12)+'px';
    tooltip.style.top = (e.clientY+12)+'px';
  }
  function ttHide(){ tooltip.classList.remove('on'); }

  // -------- Bridge Rev → PAT --------
  function drawBridge(){
    const svg = document.getElementById('bridge');
    const W=800, H=360, m={t:30, r:30, b:60, l:60};
    const iw=W-m.l-m.r, ih=H-m.t-m.b;
    const bars = [
      {l:'Revenue', v:68013, t:'tot'},
      {l:'COGS', v:-49249, t:'neg'},
      {l:'Brokerage', v:-1761, t:'neg'},
      {l:'Marketing', v:-2047, t:'neg'},
      {l:'Incentive', v:-1351, t:'neg'},
      {l:'Overheads', v:-4169, t:'neg'},
      {l:'Finance', v:-1254, t:'neg'},
      {l:'Depreciation', v:-1637, t:'neg'},
      {l:'Inventorisation', v:684, t:'pos'},
      {l:'PBT', v:5849, t:'tot'},
      {l:'Tax', v:-1472, t:'neg'},
      {l:'PAT', v:4376, t:'tot'}
    ];
    let cum = 0;
    const series = bars.map((b,i)=>{
      if(b.t==='tot' && i===0){ cum = b.v; return {...b, from:0, to:b.v}; }
      if(b.t==='tot'){ const r={...b, from:0, to:b.v}; cum=b.v; return r; }
      const from = cum; cum += b.v;
      return {...b, from, to:cum};
    });
    const allVals = series.flatMap(s=>[s.from, s.to, 0]);
    const min = Math.min(...allVals);
    const max = Math.max(...allVals);
    const range = max-min;
    const yScale = v => m.t + ih - ((v-min)/range)*ih;
    const bw = iw/series.length - 10;
    let html=`<g class="grid">`;
    for(let i=0;i<=4;i++){
      const v = min + range*i/4, y=yScale(v);
      html += `<line x1="${m.l}" x2="${W-m.r}" y1="${y}" y2="${y}"/>`;
      html += `<text x="${m.l-6}" y="${y+3}" text-anchor="end">${(v/1000).toFixed(0)}k</text>`;
    }
    html += `<line x1="${m.l}" x2="${W-m.r}" y1="${yScale(0)}" y2="${yScale(0)}" stroke="var(--border-light)"/>`;
    html += `</g>`;
    series.forEach((s,i)=>{
      const x = m.l + i*(iw/series.length) + 5;
      const y0 = yScale(s.from), y1=yScale(s.to);
      const y = Math.min(y0,y1), h = Math.abs(y1-y0);
      const col = s.t==='tot' ? 'var(--accent)' : (s.v<0?'var(--neg)':'var(--pos)');
      html += `<rect x="${x}" y="${y}" width="${bw}" height="${Math.max(2,h)}" fill="${col}" opacity="0.85"/>`;
      const valY = h<22 ? y-4 : y+12;
      html += `<text x="${x+bw/2}" y="${valY}" text-anchor="middle" style="fill:var(--text);font-size:10px">${s.v>0?'+':''}${(s.v/1000).toFixed(1)}k</text>`;
      html += `<text x="${x+bw/2}" y="${H-40}" text-anchor="middle" style="font-size:9px;fill:var(--text-2)" transform="rotate(-30 ${x+bw/2} ${H-40})">${s.l}</text>`;
    });
    svg.innerHTML = html;
  }

  // -------- Margin trend --------
  function drawMarginTrend(){
    const svg = document.getElementById('marginTrend');
    const W=460,H=360, m={t:24,r:30,b:36,l:50};
    const iw=W-m.l-m.r, ih=H-m.t-m.b;
    const years = ['FY25', 'FY26A', 'FY27E'];
    const series = [
      {n:'GM %', vals:[24.0, 22.9, 27.6], col:'var(--accent)'},
      {n:'EBITDA %', vals:[3.6, 6.7, 10.3], col:'var(--info)'},
      {n:'PAT %', vals:[2.5, 3.7, 6.4], col:'var(--pos)'},
    ];
    const max = 32;
    const xPos = i => m.l + i*(iw/(years.length-1));
    const yScale = v => m.t + ih - (v/max)*ih;
    let html=`<g class="grid">`;
    for(let i=0;i<=4;i++){
      const v = max*i/4, y=yScale(v);
      html += `<line x1="${m.l}" x2="${W-m.r}" y1="${y}" y2="${y}"/>`;
      html += `<text x="${m.l-6}" y="${y+3}" text-anchor="end">${v.toFixed(0)}%</text>`;
    }
    html += `</g>`;
    years.forEach((y,i)=>{
      html += `<text x="${xPos(i)}" y="${H-18}" text-anchor="middle" style="fill:var(--text-2);font-size:11px">${y}</text>`;
    });
    series.forEach((s,si)=>{
      const pts = s.vals.map((v,i)=>`${i==0?'M':'L'}${xPos(i)},${yScale(v)}`).join(' ');
      html += `<path d="${pts}" fill="none" stroke="${s.col}" stroke-width="2"/>`;
      s.vals.forEach((v,i)=>{
        html += `<circle cx="${xPos(i)}" cy="${yScale(v)}" r="4" fill="${s.col}"/>`;
        html += `<text x="${xPos(i)}" y="${yScale(v)-9}" text-anchor="middle" style="fill:${s.col};font-size:10px">${v.toFixed(1)}%</text>`;
      });
      html += `<text x="${W-m.r-6}" y="${yScale(s.vals[s.vals.length-1])-14}" text-anchor="end" style="fill:${s.col};font-size:10px">${s.n}</text>`;
    });
    svg.innerHTML = html;
  }

  // -------- Consolidated P&L --------
  function drawPL(){
    const tb = document.querySelector('#plTable tbody');
    let html='';
    D.pl.consol.forEach(it=>{
      const cls = it.type==='h'?'subsection':(it.type==='t'?'total':'');
      const indent = it.type==='l'?'padding-left:28px;':'';
      let yoy='';
      if(it.fy26 && it.fy27 && it.type!=='l'){
        const v = (it.fy27-it.fy26)/Math.abs(it.fy26)*100;
        yoy = `<span class="${v>=0?'pos':'neg'}">${v>=0?'+':''}${v.toFixed(1)}%</span>`;
      } else if(it.fy26 && it.fy27){
        const v = (it.fy27-it.fy26)/Math.abs(it.fy26)*100;
        yoy = `<span class="dim">${v>=0?'+':''}${v.toFixed(0)}%</span>`;
      }
      const margin = it.m27!=null ? fmtP(it.m27) : '';
      html += `<tr class="${cls}">
        <td class="l" style="${indent}">${it.label}</td>
        <td>${fmt(it.fy27)}</td>
        <td class="dim">${fmt(it.fy26)}</td>
        <td class="dim">${fmt(it.fy25)}</td>
        <td>${yoy}</td>
        <td class="dim">${margin}</td>
      </tr>`;
    });
    tb.innerHTML = html;
  }

  // -------- Segment table --------
  let segPeriod = 'fy27';
  const Q_MODE = p => /^q[1-4]$/.test(p);
  function pickPeriod(s){
    if(segPeriod==='fy26' && s.fy26){
      const f=s.fy26;
      return {...s, rev:f.rev, cos:f.cos, gm:f.gm, gmp:f.gmp, oh:f.oh||0, intc:f.intc||0, dep:f.dep||0, pbt:f.pbt, pat:f.pat};
    }
    if(Q_MODE(segPeriod)){
      const q = D.pl.segQ && D.pl.segQ[s.seg] && D.pl.segQ[s.seg][segPeriod];
      if(q){
        const gm = q.rev - q.cos;
        const gmp = q.rev ? (gm/q.rev)*100 : 0;
        return {...s, rev:q.rev, cos:q.cos, gm:gm, gmp:gmp, oh:0, intc:0, dep:0, pbt:null, pat:null, _quarterly:true};
      }
      return {...s, rev:0, cos:0, gm:0, gmp:0, oh:0, intc:0, dep:0, pbt:0, pat:0, _quarterly:true};
    }
    return s;
  }
  function drawSeg(){
    const tb = document.querySelector('#segTable tbody');
    document.getElementById('segTable').dataset.period = segPeriod;
    const quarterly = Q_MODE(segPeriod);
    // Grouping map
    const ALL_GROUPS = [
      {key:'re',   label:'Real Estate',    segs:['RE Residential','RE DM','RE Gross Accounting','RE Other income','Land Sales','FMD']},
      {key:'com',  label:'Commercial',     segs:['Sobha City Mall','Lake View Club','ICG Club','Sobha Arcadia','1 Sobha']},
      {key:'con',  label:'Contracts',      segs:['Civil','Electrical','PHE','Others (Contracts)']},
      {key:'mfg',  label:'Manufacturing',  segs:['Concrete Products','Glazing','Interiors']},
      {key:'ret',  label:'Retail',         segs:['metercube','Mattress']},
      {key:'fin',  label:'Finance Income', segs:['Notional Income','Interest on FD','Others (Finance)']}
    ];
    const GROUPS = quarterly ? ALL_GROUPS.filter(g=>g.key==='re') : ALL_GROUPS;
    const byName = {};
    D.pl.segments.map(pickPeriod).forEach(s=> byName[s.seg]=s);
    const enrich = s => ({...s, _oh:(s.oh||0)+(s.intc||0)+(s.dep||0), _patp: (s.pat!=null && s.rev)?(s.pat/s.rev)*100:null});
    const sum = arr => arr.reduce((a,s)=>{
      a.rev+=s.rev; a.cos+=s.cos; a.gm+=s.gm; a.oh+=s._oh; a.pbt+=(s.pbt||0); a.pat+=(s.pat||0); return a;
    },{rev:0,cos:0,gm:0,oh:0,pbt:0,pat:0});
    const groups = GROUPS.map(g=>{
      const segs = g.segs.map(n=>byName[n]).filter(Boolean).map(enrich).sort((a,b)=>b.rev-a.rev);
      let tot;
      if(quarterly && g.key==='re'){
        const Q = D.pl.reGroupQ[segPeriod];
        tot = {rev:Q.rev, cos:Q.cos, gm:Q.gm, oh:Q.oh, pbt:Q.pbt, pat:Q.pat, gmp:Q.gmp, patp:Q.rev?(Q.pat/Q.rev)*100:0};
      } else {
        tot = sum(segs);
        tot.gmp = tot.rev ? (tot.gm/tot.rev)*100 : 0;
        tot.patp = tot.rev ? (tot.pat/tot.rev)*100 : 0;
      }
      return {...g, segs, tot};
    });
    // Grand total
    let T;
    if(quarterly){
      const Q = D.pl.reGroupQ[segPeriod];
      T = {rev:Q.rev, cos:Q.cos, gm:Q.gm, oh:Q.oh, pbt:Q.pbt, pat:Q.pat, gmp:Q.gmp, patp:Q.rev?(Q.pat/Q.rev)*100:0};
    } else {
      const all = D.pl.segments.map(pickPeriod).map(enrich);
      T = sum(all);
      T.gmp = T.rev ? (T.gm/T.rev)*100 : 0;
      T.patp = T.rev ? (T.pat/T.rev)*100 : 0;
    }

    const dash = '<span class="dim">—</span>';
    const totalLabel = quarterly ? `Total · Real Estate (${segPeriod.toUpperCase()})` : 'Total · Pan India';

    const totalCellGroup = (t, ctx) => {
      const revCell = quarterly ? `<td><strong>${fmt(t.rev)}</strong></td>` : `<td class="drill" data-ctx="${ctx}" data-kind="rev"><strong>${fmt(t.rev)}</strong></td>`;
      const cosCell = quarterly ? `<td class="dim"><strong>${fmt(t.cos)}</strong></td>` : `<td class="dim drill" data-ctx="${ctx}" data-kind="cos"><strong>${fmt(t.cos)}</strong></td>`;
      const ohCell  = quarterly ? `<td class="dim"><strong>${fmt(t.oh)}</strong></td>` : `<td class="dim drill" data-ctx="${ctx}" data-kind="oh"><strong>${fmt(t.oh)}</strong></td>`;
      return `
        ${revCell}
        ${cosCell}
        <td class="${t.gm>=0?'pos':'neg'}"><strong>${fmt(t.gm)}</strong></td>
        <td><strong>${fmtP(t.gmp)}</strong></td>
        ${ohCell}
        <td class="${t.pbt>=0?'pos':'neg'}"><strong>${fmt(t.pbt)}</strong></td>
        <td class="${t.pat>=0?'pos':'neg'}"><strong>${fmt(t.pat)}</strong></td>
        <td class="${t.patp>=0?'pos':'neg'}"><strong>${fmtP(t.patp)}</strong></td>`;
    };

    let html = `<tr class="total-top">
        <td class="l"><strong>${totalLabel}</strong></td>${totalCellGroup(T, '__total')}
      </tr>`;
    groups.forEach(g=>{
      html += `<tr class="seg-group clickrow" data-g="${g.key}" data-open="${quarterly?1:0}">
        <td class="l"><span class="caret">${quarterly?'▾':'▸'}</span> <strong>${g.label}</strong> <span class="dim">· ${g.segs.length}</span></td>
        ${totalCellGroup(g.tot, '__group:'+g.key)}
      </tr>`;
      g.segs.forEach(s=>{
        const ohCell = quarterly ? `<td class="dim">${dash}</td>` : `<td class="dim drill" data-ctx="${s.seg}" data-kind="oh" title="Operating overheads + Interest + Depreciation">${fmt(s._oh)}</td>`;
        const pbtCell = quarterly ? `<td class="dim">${dash}</td>` : `<td class="${s.pbt>=0?'pos':'neg'}">${fmt(s.pbt)}</td>`;
        const patCell = quarterly ? `<td class="dim">${dash}</td>` : `<td class="${s.pat>=0?'pos':'neg'}">${fmt(s.pat)}</td>`;
        const patpCell = quarterly ? `<td class="dim">${dash}</td>` : `<td class="${s._patp>=0?'pos':'neg'}">${fmtP(s._patp)}</td>`;
        const revChild = quarterly ? `<td>${fmt(s.rev)}</td>` : `<td class="drill" data-ctx="${s.seg}" data-kind="rev">${fmt(s.rev)}</td>`;
        const cosChild = quarterly ? `<td class="dim">${fmt(s.cos)}</td>` : `<td class="dim drill" data-ctx="${s.seg}" data-kind="cos">${fmt(s.cos)}</td>`;
        html += `<tr class="seg-child" data-parent="${g.key}" style="display:${quarterly?'':'none'}">
          <td class="l" style="padding-left:36px">${s.seg}</td>
          ${revChild}
          ${cosChild}
          <td class="${s.gm>=0?'pos':'neg'}">${fmt(s.gm)}</td>
          <td>${fmtP(s.gmp)}</td>
          ${ohCell}
          ${pbtCell}
          ${patCell}
          ${patpCell}
        </tr>`;
      });
    });
    tb.innerHTML = html;

    // Toggle behavior
    tb.querySelectorAll('tr.seg-group').forEach(r=>{
      r.addEventListener('click', ()=>{
        const open = r.getAttribute('data-open') === '1';
        r.setAttribute('data-open', open ? '0' : '1');
        r.querySelector('.caret').textContent = open ? '▸' : '▾';
        const k = r.getAttribute('data-g');
        tb.querySelectorAll(`tr.seg-child[data-parent="${k}"]`).forEach(c=>{
          c.style.display = open ? 'none' : '';
        });
      });
    });
  }

  // -------- RE Quarterly --------
  function drawReQ(){
    const tb = document.querySelector('#reqTable tbody');
    let html='';
    D.pl.reQ.forEach(q=>{
      html += `<tr>
        <td class="l"><span class="chip amber">${q.q}</span></td>
        <td>${fmt(q.rev)}</td>
        <td class="dim">${fmt(q.cos)}</td>
        <td class="pos">${fmt(q.gm)}</td>
        <td>${fmtP(q.gmp)}</td>
        <td class="dim">${fmt(q.brk)}</td>
        <td class="dim">${fmt(q.ind)}</td>
        <td class="${q.pbt>=0?'pos':'neg'}">${fmt(q.pbt)}</td>
        <td class="${q.pat>=0?'pos':'neg'}">${fmt(q.pat)}</td>
      </tr>`;
    });
    tb.innerHTML = html;
  }

  // -------- Commercial table --------
  function drawComm(){
    const tb = document.querySelector('#commTable tbody');
    let html='';
    D.pl.commercial.forEach(c=>{
      html += `<tr>
        <td class="l">${c.asset}</td>
        <td>${fmt(c.rev)}</td>
        <td class="dim">${fmt(c.cost)}</td>
        <td class="pos">${fmt(c.gm)}</td>
        <td>${fmtP(c.gmp)}</td>
        <td>${fmt(c.ebitda)}</td>
        <td class="dim">${fmt(c.dep)}</td>
        <td class="${c.pbt>=0?'pos':'neg'}">${fmt(c.pbt)}</td>
        <td class="${c.pat>=0?'pos':'neg'}">${fmt(c.pat)}</td>
      </tr>`;
    });
    tb.innerHTML = html;
  }

  // -------- Scatter chart --------
  function drawScatter(){
    const svg = document.getElementById('scatter');
    const data = D.pl.projMargin.filter(d=>d.rev>10);
    const W=560, H=460, m={t:24, r:24, b:46, l:60};
    const iw=W-m.l-m.r, ih=H-m.t-m.b;
    const minP = -55, maxP = 70;
    const maxRev = Math.max(...data.map(d=>d.rev));
    const cities = [...new Set(data.map(d=>d.city))];
    const colors = ['var(--accent)','var(--info)','var(--pos)','var(--violet)','var(--teal)','var(--neg)','#f59e0b','#ec4899','#a3e635','#06b6d4'];
    const cityCol = c => colors[cities.indexOf(c)%colors.length];
    const xScale = v => m.l + (v/maxRev)*iw;
    const yScale = v => m.t + ih - ((v-minP)/(maxP-minP))*ih;
    let html=`<g class="grid">`;
    for(let i=0;i<=5;i++){
      const v = minP + (maxP-minP)*i/5, y=yScale(v);
      html += `<line x1="${m.l}" x2="${W-m.r}" y1="${y}" y2="${y}"/>`;
      html += `<text x="${m.l-6}" y="${y+3}" text-anchor="end">${v.toFixed(0)}%</text>`;
    }
    for(let i=0;i<=4;i++){
      const v = maxRev*i/4, x=xScale(v);
      html += `<line x1="${x}" x2="${x}" y1="${m.t}" y2="${m.t+ih}"/>`;
      html += `<text x="${x}" y="${H-22}" text-anchor="middle">${(v/1000).toFixed(1)}k</text>`;
    }
    html += `<line x1="${m.l}" x2="${W-m.r}" y1="${yScale(0)}" y2="${yScale(0)}" stroke="var(--border-light)"/>`;
    html += `</g>`;
    html += `<text x="${m.l+iw/2}" y="${H-6}" text-anchor="middle" style="fill:var(--text-3);font-size:10px">REVENUE (Rs. Mn)</text>`;
    html += `<text x="${10}" y="${m.t+ih/2}" text-anchor="middle" transform="rotate(-90 10 ${m.t+ih/2})" style="fill:var(--text-3);font-size:10px">PROFIT MARGIN %</text>`;
    data.forEach((d,i)=>{
      const r = Math.max(3, Math.sqrt(d.rev/maxRev)*22);
      html += `<circle cx="${xScale(d.rev)}" cy="${yScale(d.pp)}" r="${r}" fill="${cityCol(d.city)}" opacity="0.65" stroke="${cityCol(d.city)}" stroke-width="1" data-i="${i}" class="hover-target" style="cursor:pointer"/>`;
    });
    // Legend
    cities.forEach((c,i)=>{
      const x = m.l + (i%4)*100;
      const y = m.t + Math.floor(i/4)*16;
      html += `<rect x="${x}" y="${y}" width="8" height="8" fill="${cityCol(c)}" opacity="0.8"/>`;
      html += `<text x="${x+12}" y="${y+8}" style="fill:var(--text-2);font-size:9px">${c}</text>`;
    });
    svg.innerHTML = html;
    svg.querySelectorAll('.hover-target').forEach(c=>{
      c.addEventListener('mousemove', e=>{
        const d = data[+c.dataset.i];
        tt(`<div class="tt-t">${d.n}</div>
          <div class="tt-r"><span class="lab">City</span><span class="val">${d.city}</span></div>
          <div class="tt-r"><span class="lab">Sale Value</span><span class="val">₹${fmt(d.sale)} Mn</span></div>
          <div class="tt-r"><span class="lab">Revenue</span><span class="val">₹${fmt(d.rev)} Mn</span></div>
          <div class="tt-r"><span class="lab">GM</span><span class="val">${fmtP(d.gmp)}</span></div>
          <div class="tt-r"><span class="lab">PBT</span><span class="val">₹${fmt(d.pbt)} Mn</span></div>
          <div class="tt-r"><span class="lab">PBT %</span><span class="val ${d.pp>=0?'pos':'neg'}">${fmtP(d.pp)}</span></div>`, e);
      });
      c.addEventListener('mouseleave', ttHide);
    });
  }

  // -------- Project margin table (3-level hierarchy: City → Project → Wing) --------
  const pmState = { cities: new Set(), projects: new Set() };
  function parseWings(name){
    const m = name.match(/\((\d+)\s+(wings?|twrs?|twr|blocks?|vil|villas?)\)/i);
    return m ? parseInt(m[1],10) : 0;
  }
  function drawProjMargin(filter=''){
    const tb = document.querySelector('#projMargin tbody');
    let data = [...D.pl.projMargin];
    let activeFilter = false;
    if(filter){
      activeFilter = true;
      const f = filter.toLowerCase();
      data = data.filter(d=> d.n.toLowerCase().includes(f));
    }

    // Group by city
    const byCity = {};
    data.forEach(d=>{
      if(!byCity[d.city]) byCity[d.city] = [];
      byCity[d.city].push(d);
    });
    const cities = Object.keys(byCity).sort((a,b)=>{
      const sa = byCity[a].reduce((x,d)=>x+d.rev,0);
      const sb = byCity[b].reduce((x,d)=>x+d.rev,0);
      return sb-sa;
    });

    // Grand total
    const T = data.reduce((a,d)=>{
      a.units += d.units; a.sba += d.sba; a.sale += d.sale;
      a.rev += d.rev; a.dc += d.dc; a.gm += d.gm;
      return a;
    }, {units:0, sba:0, sale:0, rev:0, dc:0, gm:0});
    const tReal = T.sba ? (T.sale*1e6 / T.sba) : 0;
    const tGmp  = T.rev ? (T.gm / T.rev) * 100 : 0;

    let html='';
    html += `<tr class="total-top">
      <td class="l">TOTAL (${data.length} projects · ${cities.length} cities)</td>
      <td></td>
      <td>${fmt(T.units)}</td>
      <td>${Math.round(T.sba).toLocaleString('en-US')}</td>
      <td class="dim">₹${fmt(Math.round(tReal))}</td>
      <td>${fmt(T.sale)}</td>
      <td>${fmt(T.rev)}</td>
      <td>${fmt(T.dc)}</td>
      <td class="${T.gm>=0?'pos':'neg'}">${fmt(T.gm)}</td>
      <td class="${tGmp>=0?'pos':'neg'}">${fmtP(tGmp)}</td>
    </tr>`;

    cities.forEach(city=>{
      const projs = byCity[city].slice().sort((a,b)=>b.gm-a.gm);
      const C = projs.reduce((a,d)=>{
        a.units += d.units; a.sba += d.sba; a.sale += d.sale;
        a.rev += d.rev; a.dc += d.dc; a.gm += d.gm;
        return a;
      }, {units:0, sba:0, sale:0, rev:0, dc:0, gm:0});
      const cReal = C.sba ? (C.sale*1e6 / C.sba) : 0;
      const cGmp  = C.rev ? (C.gm / C.rev) * 100 : 0;
      const cityOpen = activeFilter || pmState.cities.has(city);
      const caret = cityOpen ? '▾' : '▸';
      html += `<tr class="seg-group pm-city" data-city="${city}">
        <td class="l"><span class="caret">${caret}</span> ${city}</td>
        <td class="l dim">${projs.length} project${projs.length>1?'s':''}</td>
        <td>${fmt(C.units)}</td>
        <td>${Math.round(C.sba).toLocaleString('en-US')}</td>
        <td class="dim">₹${fmt(Math.round(cReal))}</td>
        <td>${fmt(C.sale)}</td>
        <td>${fmt(C.rev)}</td>
        <td>${fmt(C.dc)}</td>
        <td class="${C.gm>=0?'pos':'neg'}">${fmt(C.gm)}</td>
        <td class="${cGmp>=0?'pos':'neg'}">${fmtP(cGmp)}</td>
      </tr>`;

      // Helper: pick the latest date string from a list of wing dates.
      const monthOrd = {'Apr-26':1,'May-26':2,'Jun-26':3,'Jul-26':4,'Aug-26':5,'Sep-26':6,'Oct-26':7,'Nov-26':8,'Dec-26':9,'Jan-27':10,'Feb-27':11,'Mar-27':12,'FY28':99,'Received':0,'Completed':0};
      const latest = (arr, doneLabel)=>{
        if (!arr || !arr.length) return null;
        const done = doneLabel || 'Received';
        const all = arr.map(x=>x||done);
        if (all.every(x=>x==='Received'||x==='Completed')) return done;
        let best = null, bestOrd = -1;
        all.forEach(x=>{
          const o = (monthOrd[x] !== undefined) ? monthOrd[x] : -1;
          if (o > bestOrd) { bestOrd = o; best = x; }
        });
        return best || done;
      };

      projs.forEach((d, pi)=>{
        const pKey = city+'::'+d.n;
        const wingObjs = (d.wings && typeof d.wings[0] === 'object') ? d.wings : null;
        const wingCount = wingObjs ? wingObjs.length : parseWings(d.n);
        const hasWings = wingCount > 1;
        const projOpen = activeFilter || pmState.projects.has(pKey);
        const pCaret = hasWings ? (projOpen ? '▾' : '▸') : '·';
        const visibleP = cityOpen ? '' : 'style="display:none"';
        const projWt = wingObjs ? latest(wingObjs.map(w=>w.wt), 'Completed') : (d.wt||'—');
        const projOc = wingObjs ? latest(wingObjs.map(w=>w.oc), 'Received') : (d.oc||'—');
        html += `<tr class="pm-proj ${hasWings?'clickrow':''}" data-city="${city}" data-proj="${pKey}" ${visibleP}>
          <td class="l" style="padding-left:24px">${hasWings?`<span class="caret">${pCaret}</span> `:'<span class="caret dim">·</span> '}${d.n}</td>
          <td class="l dim">${projWt} / ${projOc}</td>
          <td>${fmt(d.units)}</td>
          <td>${Math.round(d.sba).toLocaleString('en-US')}</td>
          <td class="dim">₹${fmt(d.real)}</td>
          <td>${fmt(d.sale)}</td>
          <td>${fmt(d.rev)}</td>
          <td>${fmt(d.dc)}</td>
          <td class="${d.gm>=0?'pos':'neg'}">${fmt(d.gm)}</td>
          <td class="${d.gmp>=0?'pos':'neg'}">${fmtP(d.gmp)}</td>
        </tr>`;

        if (hasWings) {
          const wingVisible = cityOpen && projOpen;
          const w = wingCount;
          // Fallback even split if wing-level numbers aren't provided
          const splitWhole = (v)=> [Math.round(v/w), v - Math.round(v/w)*(w-1)];
          const um = splitWhole(d.units);
          const sm = splitWhole(d.sba);
          const slm = splitWhole(d.sale);
          const rm = splitWhole(d.rev);
          const dcm = splitWhole(d.dc);
          const gmm = splitWhole(d.gm);
          for (let i=0; i<w; i++){
            const isLast = i === w-1;
            const wObj = wingObjs ? wingObjs[i] : null;
            // Prefer wing-level actuals where present; fallback to even split
            const u  = (wObj && wObj.units != null) ? wObj.units : (isLast ? um[1]  : um[0]);
            const sb = (wObj && wObj.sba   != null) ? wObj.sba   : (isLast ? sm[1]  : sm[0]);
            const sl = (wObj && wObj.sale  != null) ? wObj.sale  : (isLast ? slm[1] : slm[0]);
            const rv = (wObj && wObj.rev   != null) ? wObj.rev   : (isLast ? rm[1]  : rm[0]);
            const cs = (wObj && wObj.dc    != null) ? wObj.dc    : (isLast ? dcm[1] : dcm[0]);
            const gm = (wObj && wObj.gm    != null) ? wObj.gm    : (isLast ? gmm[1] : gmm[0]);
            const real = (wObj && wObj.real != null) ? wObj.real : (sb ? Math.round(sl*1e6 / sb) : d.real);
            const gmp  = (wObj && wObj.gmp  != null) ? wObj.gmp  : (rv ? (gm/rv)*100 : d.gmp);
            const wname = wObj ? wObj.n : ((d.wings && d.wings[i]) ? d.wings[i] : `Wing ${i+1}`);
            const wWt = wObj ? wObj.wt : (d.wt||'—');
            const wOc = wObj ? wObj.oc : (d.oc||'—');
            html += `<tr class="seg-child pm-wing" data-proj="${pKey}" ${wingVisible?'':'style="display:none"'}>
              <td class="l" style="padding-left:48px">${wname}</td>
              <td class="l dim">${wWt} / ${wOc}</td>
              <td>${fmt(u)}</td>
              <td>${Math.round(sb).toLocaleString('en-US')}</td>
              <td class="dim">₹${fmt(real)}</td>
              <td>${fmt(sl)}</td>
              <td>${fmt(rv)}</td>
              <td>${fmt(cs)}</td>
              <td class="${gm>=0?'pos':'neg'}">${fmt(gm)}</td>
              <td class="${gmp>=0?'pos':'neg'}">${fmtP(gmp)}</td>
            </tr>`;
          }
        }
      });
    });
    tb.innerHTML = html;

    // Bind click handlers
    tb.querySelectorAll('tr.pm-city').forEach(tr=>{
      tr.addEventListener('click', ()=>{
        const c = tr.dataset.city;
        if (pmState.cities.has(c)) pmState.cities.delete(c);
        else pmState.cities.add(c);
        drawProjMargin(document.getElementById('projSearch').value || '');
      });
    });
    tb.querySelectorAll('tr.pm-proj.clickrow').forEach(tr=>{
      tr.addEventListener('click', ()=>{
        const p = tr.dataset.proj;
        if (pmState.projects.has(p)) pmState.projects.delete(p);
        else pmState.projects.add(p);
        drawProjMargin(document.getElementById('projSearch').value || '');
      });
    });
  }

  // -------- Depreciation --------
  function drawDep(){
    const tb = document.querySelector('#depTable tbody');
    let totals = {gross:0, nbv:0, add:0, dep:0};
    let html='';
    D.pl.deprec.forEach(d=>{
      Object.keys(totals).forEach(k=>totals[k]+=d[k]);
      html += `<tr>
        <td class="l">${d.n}</td>
        <td class="dim">${d.rate.toFixed(2)}%</td>
        <td>${fmt(d.gross)}</td>
        <td class="dim">${fmt(d.nbv)}</td>
        <td>${fmt(d.add)}</td>
        <td>${fmt(d.dep)}</td>
      </tr>`;
    });
    html += `<tr class="total">
      <td class="l">TOTAL</td>
      <td></td>
      <td>${fmt(totals.gross)}</td>
      <td class="dim">${fmt(totals.nbv)}</td>
      <td>${fmt(totals.add)}</td>
      <td>${fmt(totals.dep)}</td>
    </tr>`;
    tb.innerHTML = html;
  }

  document.getElementById('projSearch').addEventListener('input', e=> drawProjMargin(e.target.value));

  // -------- Segment drill-down drawer --------
  function buildPLBlock(rec, label){
    const oh = (rec.oh||0) + (rec.intc||0) + (rec.dep||0);
    const tax = (rec.pbt||0) - (rec.pat||0);
    // share of revenue
    const totalRev = D.pl.segments.reduce((a,s)=>a+s.rev,0);
    const share = totalRev ? (rec.rev/totalRev)*100 : 0;
    return { oh, tax, share, totalRev };
  }
  function decompBar(rec){
    // Stacked horizontal bar showing how Revenue decomposes
    const rev = Math.max(rec.rev, 1);
    const cos = Math.max(rec.cos||0, 0);
    const oh  = Math.max((rec.oh||0)+(rec.intc||0)+(rec.dep||0), 0);
    const tax = Math.max((rec.pbt||0)-(rec.pat||0), 0);
    const pat = Math.max(rec.pat||0, 0);
    const segs = [
      {l:'COS',       v:cos, c:'#a45a3a'},
      {l:'Overheads', v:oh,  c:'#7a5b3a'},
      {l:'Tax',       v:tax, c:'#8a7a55'},
      {l:'PAT',       v:pat, c:'#4a6b4a'}
    ];
    const sum = segs.reduce((a,s)=>a+s.v,0) || 1;
    let html = `<div style="display:flex; height:32px; border-radius:2px; overflow:hidden; border:1px solid var(--line); margin:8px 0 6px;">`;
    segs.forEach(s=>{
      const w = (s.v/sum)*100;
      if (w < 0.5) return;
      html += `<div style="flex:${w}; background:${s.c}; min-width:1px;" title="${s.l}: ₹${fmt(s.v)} Mn (${fmtP(s.v/rev*100)})"></div>`;
    });
    html += `</div>`;
    html += `<div style="display:flex; justify-content:space-between; font-family:var(--mono); font-size:9px; text-transform:uppercase; letter-spacing:0.08em; color:var(--ink-soft); margin-bottom:14px;">`;
    segs.forEach(s=>{
      const pct = (s.v/sum)*100;
      html += `<span><span style="display:inline-block; width:8px; height:8px; background:${s.c}; margin-right:5px; vertical-align:middle;"></span>${s.l} · ${fmtP(pct)}</span>`;
    });
    html += `</div>`;
    return html;
  }
  function openSegDrawer(ctx, kind){
    // ctx is segment name OR '__total' OR '__group:<key>'
    let title, crumb, rec;
    const SEG_GROUPS = [
      {key:'re',   label:'Real Estate',    segs:['RE Residential','RE DM','RE Gross Accounting','RE Other income','Land Sales','FMD']},
      {key:'com',  label:'Commercial',     segs:['Sobha City Mall','Lake View Club','ICG Club','Sobha Arcadia','1 Sobha']},
      {key:'con',  label:'Contracts',      segs:['Civil','Electrical','PHE','Others (Contracts)']},
      {key:'mfg',  label:'Manufacturing',  segs:['Concrete Products','Glazing','Interiors']},
      {key:'ret',  label:'Retail',         segs:['metercube','Mattress']},
      {key:'fin',  label:'Finance Income', segs:['Notional Income','Interest on FD','Others (Finance)']}
    ];
    const sumRecs = arr => arr.reduce((a,s)=>{
      a.rev+=s.rev; a.cos+=s.cos; a.gm+=s.gm; a.oh+=(s.oh||0); a.intc+=(s.intc||0); a.dep+=(s.dep||0); a.pbt+=s.pbt; a.pat+=s.pat; return a;
    },{rev:0,cos:0,gm:0,oh:0,intc:0,dep:0,pbt:0,pat:0});
    let children = null;
    if (ctx === '__total'){
      rec = sumRecs(D.pl.segments);
      rec.gmp = rec.rev? (rec.gm/rec.rev)*100:0;
      title = 'Pan India · Total';
      crumb = (kind==='rev' ? 'Revenue' : kind==='oh' ? 'Overheads' : 'Cost of Sales') + ' · Group breakdown';
      children = SEG_GROUPS.map(g=>{
        const sub = sumRecs(D.pl.segments.filter(s=> g.segs.includes(s.seg)));
        sub.label = g.label;
        return sub;
      });
    } else if (ctx.startsWith('__group:')){
      const key = ctx.split(':')[1];
      const g = SEG_GROUPS.find(x=>x.key===key);
      const segs = D.pl.segments.filter(s=> g.segs.includes(s.seg));
      rec = sumRecs(segs);
      rec.gmp = rec.rev? (rec.gm/rec.rev)*100:0;
      title = g.label;
      crumb = (kind==='rev' ? 'Revenue' : kind==='oh' ? 'Overheads' : 'Cost of Sales') + ' · Sub-segment breakdown';
      children = segs.map(s=>({...s, label:s.seg}));
    } else if (ctx.startsWith('__re:')){
      const q = ctx.split(':')[1];
      const Q = D.pl.reGroupQ[q];
      rec = {rev:Q.rev, cos:Q.cos, gm:Q.gm, gmp:Q.gmp, oh:Q.oh, intc:0, dep:0, pbt:Q.pbt, pat:Q.pat};
      title = 'Real Estate · ' + q.toUpperCase() + ' 27E';
      crumb = 'Overheads · ' + q.toUpperCase() + ' breakdown';
    } else {
      rec = D.pl.segments.find(s=>s.seg===ctx);
      if (!rec) return;
      title = rec.seg;
      crumb = (kind==='rev' ? 'Revenue' : kind==='oh' ? 'Overheads' : 'Cost of Sales') + ' · Drill-down';
    }
    const ohTotal = (rec.oh||0) + (rec.intc||0) + (rec.dep||0);
    const big = kind==='rev' ? rec.rev : (kind==='cos' ? rec.cos : ohTotal);
    const bigLabel = kind==='rev' ? 'Revenue · FY27E' : (kind==='cos' ? 'Cost of Sales · FY27E' : 'Overheads · FY27E');
    const oh = (rec.oh||0)+(rec.intc||0)+(rec.dep||0);
    const gmp = rec.rev ? (rec.gm/rec.rev)*100 : 0;
    const cosp = rec.rev ? (rec.cos/rec.rev)*100 : 0;
    const patp = rec.rev ? (rec.pat/rec.rev)*100 : 0;
    const totalRev = D.pl.segments.reduce((a,s)=>a+s.rev,0);
    const totalCos = D.pl.segments.reduce((a,s)=>a+s.cos,0);
    const shareRev = totalRev ? (rec.rev/totalRev)*100 : 0;
    const shareCos = totalCos ? (rec.cos/totalCos)*100 : 0;

    let html = `<div style="margin-bottom:24px">
      <div style="font-family:var(--mono); font-size:9px; text-transform:uppercase; letter-spacing:0.08em; color:var(--ink-soft); margin-bottom:6px;">${bigLabel}</div>
      <div style="font-family:var(--serif); font-size:44px; font-weight:300; color:var(--accent); line-height:1; letter-spacing:-0.01em;">₹${fmt(big)}<span style="font-size:14px; color:var(--ink-soft); margin-left:8px;">Mn</span></div>
      <div style="font-family:var(--mono); font-size:11px; color:var(--ink-soft); margin-top:8px;">${kind==='oh' ? (rec.rev?fmtP(ohTotal/rec.rev*100)+' of segment revenue':'') : (fmtP(kind==='rev'?shareRev:shareCos)+' of Pan India '+(kind==='rev'?'revenue':'cost of sales'))}</div>
    </div>`;

    // (stat-row + Revenue Decomposition removed per request)

    // Component breakdown (Lease Rent / CAM / etc. for Commercial; Material / Subcontractor for Contracts)
    const bd = D.pl.breakdowns && D.pl.breakdowns[ctx];
    if (bd && bd[kind]){
      const items = bd[kind].slice().sort((a,b)=> b[1]-a[1]);
      const denom = items.reduce((a,x)=>a+x[1],0) || 1;
      const maxV = items.reduce((a,x)=>Math.max(a,x[1]),0) || 1;
      const kindLabel = kind==='rev' ? 'Revenue' : (kind==='cos' ? 'Cost of Sales' : 'Overheads');
      html += `<h4>${kindLabel} \u2014 Component Split</h4>`;
      html += `<ul class="proj-list" style="list-style:none; padding:0; margin:0;">`;
      items.forEach(([label,val])=>{
        const pct = (val/denom)*100;
        const barW = (val/maxV)*100;
        html += `<li style="display:block; padding:10px 0; border-bottom:1px dashed var(--line);">
          <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:5px;">
            <span class="nm">${label}</span>
            <span class="vl">\u20b9${fmt(val)} Mn <span style="color:var(--ink-soft); font-size:10px; margin-left:6px;">${fmtP(pct)}</span></span>
          </div>
          <div style="height:4px; background:var(--accent-soft); border-radius:1px; overflow:hidden;"><div style="width:${barW}%; height:100%; background:var(--accent);"></div></div>
        </li>`;
      });
      html += `</ul>`;
    }

    if (children && children.length){
      const childOh = c => (c.oh||0)+(c.intc||0)+(c.dep||0);
      const valOf = c => kind==='rev' ? c.rev : (kind==='cos' ? c.cos : childOh(c));
      const kindHead = kind==='rev' ? 'Revenue' : (kind==='cos' ? 'Cost of Sales' : 'Overheads');
      html += `<h4>${kindHead} by ${ctx==='__total'?'Group':'Sub-segment'}</h4>`;
      const denom = kind==='rev' ? rec.rev : (kind==='cos' ? (rec.cos||1) : (ohTotal||1));
      const childs = children.slice().sort((a,b)=> valOf(b)-valOf(a));
      const maxV = childs.length ? valOf(childs[0]) : 0;
      html += `<ul class="proj-list" style="list-style:none; padding:0; margin:0;">`;
      childs.forEach(c=>{
        const v = valOf(c);
        const pct = denom ? (v/denom)*100 : 0;
        const barW = maxV ? (v/maxV)*100 : 0;
        html += `<li style="display:block; padding:10px 0; border-bottom:1px dashed var(--line);">
          <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:5px;">
            <span class="nm">${c.label}</span>
            <span class="vl">₹${fmt(v)} Mn <span style="color:var(--ink-soft); font-size:10px; margin-left:6px;">${fmtP(pct)}</span></span>
          </div>
          <div style="height:4px; background:var(--accent-soft); border-radius:1px; overflow:hidden;"><div style="width:${barW}%; height:100%; background:var(--accent);"></div></div>
        </li>`;
      });
      html += `</ul>`;
    }

    document.getElementById('drawerTitle').textContent = title;
    document.getElementById('drawerCrumb').textContent = crumb;
    document.getElementById('drawerBody').innerHTML = html;
    document.getElementById('drawer').classList.add('on');
    document.getElementById('drawerOverlay').classList.add('on');
  }
  function closeDrawer(){
    document.getElementById('drawer').classList.remove('on');
    document.getElementById('drawerOverlay').classList.remove('on');
  }
  document.getElementById('drawerClose').addEventListener('click', closeDrawer);
  document.getElementById('drawerOverlay').addEventListener('click', closeDrawer);
  document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeDrawer(); });
  document.querySelector('#segTable tbody').addEventListener('click', e=>{
    const td = e.target.closest('td.drill');
    if (!td) return;
    if (segPeriod === 'fy26') return;
    e.stopPropagation();
    openSegDrawer(td.dataset.ctx, td.dataset.kind);
  });

  drawSeg();
  drawProjMargin();
  function updateCsrNote(){
    const note = document.getElementById('csrNote');
    const val = document.getElementById('csrNoteVal');
    if(!note || !val) return;
    if(Q_MODE(segPeriod)){
      note.style.display = 'none';
    } else {
      note.style.display = '';
      if(segPeriod==='fy26'){
        val.innerHTML = '₹1,908 Mn <span style="color:var(--ink-soft);font-weight:500">(3.5%)</span><span style="color:var(--ink-soft);font-weight:500;margin-left:14px">·</span><span style="color:var(--ink-soft);font-weight:500;margin-left:14px;letter-spacing:0.06em">Other Comprehensive Loss:</span> <span style="font-weight:700">₹26 Mn</span><span style="color:var(--ink-soft);font-weight:500;margin-left:14px">·</span><span style="color:var(--ink-soft);font-weight:500;margin-left:14px;letter-spacing:0.06em">CSR Expense:</span> <span style="font-weight:700">₹60 Mn</span>';
      } else {
        val.innerHTML = '₹4,226 Mn <span style="color:var(--ink-soft);font-weight:500">(6.2%)</span><span style="color:var(--ink-soft);font-weight:500;margin-left:14px">·</span><span style="color:var(--ink-soft);font-weight:500;margin-left:14px;letter-spacing:0.06em">CSR Expense:</span> <span style="font-weight:700">₹150 Mn</span>';
      }
    }
  }
  updateCsrNote();
  document.querySelectorAll('#segPeriod button').forEach(b=>{
    b.addEventListener('click', ()=>{
      if(b.disabled) return;
      document.querySelectorAll('#segPeriod button').forEach(x=>x.classList.remove('on'));
      b.classList.add('on');
      segPeriod = b.dataset.p;
      drawSeg();
      updateCsrNote();
    });
  });
})();
