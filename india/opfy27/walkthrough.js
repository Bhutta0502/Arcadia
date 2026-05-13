// Walkthroughs & Completions dashboard — Annexure 1b/1c
(function(){
  const D = window.SOBHA;
  const tip = document.getElementById('tooltip');

  // 38 wings — Annexure 1b Page 11 (project completions list)
  const wings = [
    // Q1 — 9 wings · 660u · 1,067,501 sft
    {n:1,  proj:'Sobha Insignia',                 wing:'',           city:'Bangalore',  date:'07-Apr-26', q:'Q1', u:33,  sba:80251},
    {n:2,  proj:'Sobha Galera',                   wing:'Villa 18 & 19', city:'Bangalore',  date:'12-Apr-26', q:'Q1', u:2,   sba:8651},
    {n:3,  proj:'Sobha Whispering Hills Meadows', wing:'Wing 1',     city:'Trivandrum', date:'21-Apr-26', q:'Q1', u:48,  sba:95993},
    {n:4,  proj:'Sobha Royal Crest',              wing:'Wing 3',     city:'Bangalore',  date:'24-Apr-26', q:'Q1', u:110, sba:215459},
    {n:5,  proj:'Sobha Brooklyn Towers',          wing:'Wing 3',     city:'Bangalore',  date:'18-May-26', q:'Q1', u:261, sba:197036},
    {n:6,  proj:'Sobha Victoria Park',            wing:'Wing 3',     city:'Bangalore',  date:'22-May-26', q:'Q1', u:60,  sba:107954},
    {n:7,  proj:'Sobha Arbor',                    wing:'Wing 6',     city:'Chennai',    date:'25-May-26', q:'Q1', u:20,  sba:36028},
    {n:8,  proj:'Sobha Atlantis',                 wing:'Block 4',    city:'Cochin',     date:'15-Jun-26', q:'Q1', u:96,  sba:222833},
    {n:9,  proj:'Sobha Oakshire',                 wing:'Phase 1',    city:'Bangalore',  date:'27-Jun-26', q:'Q1', u:30,  sba:103296},
    // Q2 — 10 wings · 1,135u · 2,171,765 sft
    {n:10, proj:'Chartered Birdsong',             wing:'',           city:'Bangalore',  date:'12-Jul-26', q:'Q2', u:264, sba:441582},
    {n:11, proj:'Marina One Phase II',            wing:'East Wing 5',city:'Cochin',     date:'25-Jul-26', q:'Q2', u:81,  sba:217483},
    {n:12, proj:'Sobha Neopolis',                 wing:'P2-Wing 18', city:'Bangalore',  date:'28-Jul-26', q:'Q2', u:75,  sba:185377},
    {n:13, proj:'Sobha Atlantis',                 wing:'Block 3',    city:'Cochin',     date:'07-Aug-26', q:'Q2', u:96,  sba:222069},
    {n:14, proj:'Sobha Metropolis',               wing:'Phase I W2', city:'Thrissur',   date:'14-Aug-26', q:'Q2', u:84,  sba:191556},
    {n:15, proj:'Sobha City Gurugram',            wing:'Phase 6 D2', city:'Gurgaon',    date:'23-Aug-26', q:'Q2', u:72,  sba:174533},
    {n:16, proj:'Sobha Royal Crest',              wing:'Wing 1',     city:'Bangalore',  date:'26-Aug-26', q:'Q2', u:110, sba:215513},
    {n:17, proj:'Sobha Dream Garden',             wing:'Phase 2 W10',city:'Bangalore',  date:'28-Aug-26', q:'Q2', u:142, sba:118995},
    {n:18, proj:'Sobha Brooklyn Towers',          wing:'Wing 1',     city:'Bangalore',  date:'25-Sep-26', q:'Q2', u:99,  sba:201408},
    {n:19, proj:'Sobha Neopolis',                 wing:'P2-Wing 17', city:'Bangalore',  date:'27-Sep-26', q:'Q2', u:112, sba:203249},
    // Q3 — 12 wings · 1,098u · 1,863,943 sft
    {n:20, proj:'Sobha Victoria Park',            wing:'Wing 5',     city:'Bangalore',  date:'07-Oct-26', q:'Q3', u:60,  sba:107105},
    {n:21, proj:'Sobha Neopolis',                 wing:'P2-Wing 14', city:'Bangalore',  date:'13-Oct-26', q:'Q3', u:111, sba:73338},
    {n:22, proj:'Sobha Neopolis',                 wing:'P2-Wing 15', city:'Bangalore',  date:'15-Oct-26', q:'Q3', u:114, sba:75320},
    {n:23, proj:'Sobha Manhattan Towers',         wing:'Wing 2',     city:'Bangalore',  date:'18-Oct-26', q:'Q3', u:138, sba:206861},
    {n:24, proj:'Sobha Metropolis',               wing:'Phase I W3', city:'Thrissur',   date:'21-Oct-26', q:'Q3', u:92,  sba:167721},
    {n:25, proj:'Sobha City Gurugram',            wing:'Phase 6 Z1', city:'Gurgaon',    date:'23-Oct-26', q:'Q3', u:54,  sba:141865},
    {n:26, proj:'Sobha Water Front',              wing:'Tower 3',    city:'Hyderabad',  date:'25-Oct-26', q:'Q3', u:58,  sba:121770},
    {n:27, proj:'Sobha Royal Crest',              wing:'Wing 2',     city:'Bangalore',  date:'26-Nov-26', q:'Q3', u:109, sba:223457},
    {n:28, proj:'Sobha Metropolis',               wing:'Phase I W1', city:'Thrissur',   date:'12-Dec-26', q:'Q3', u:76,  sba:206016},
    {n:29, proj:'Sobha Neopolis',                 wing:'P1-Wing 7',  city:'Bangalore',  date:'17-Dec-26', q:'Q3', u:114, sba:206426},
    {n:30, proj:'Sobha Manhattan Towers',         wing:'Wing 1',     city:'Bangalore',  date:'25-Dec-26', q:'Q3', u:142, sba:230767},
    {n:31, proj:'Sobha Oakshire',                 wing:'Phase 2',    city:'Bangalore',  date:'28-Dec-26', q:'Q3', u:30,  sba:103296},
    // Q4 — 7 wings · 625u · 1,397,630 sft
    {n:32, proj:'Sobha Neopolis',                 wing:'P2-Wing 16', city:'Bangalore',  date:'14-Jan-27', q:'Q4', u:112, sba:203249},
    {n:33, proj:'Sobha Water Front',              wing:'Tower 4',    city:'Hyderabad',  date:'19-Jan-27', q:'Q4', u:60,  sba:179558},
    {n:34, proj:'Sobha City Gurugram',            wing:'Phase 6 Z2', city:'Gurgaon',    date:'23-Jan-27', q:'Q4', u:54,  sba:141865},
    {n:35, proj:'Sobha Brooklyn Towers',          wing:'Wing 2',     city:'Bangalore',  date:'25-Jan-27', q:'Q4', u:99,  sba:201408},
    {n:36, proj:'Sobha Nesara',                   wing:'Block 3',    city:'Pune',       date:'27-Jan-27', q:'Q4', u:111, sba:279192},
    {n:37, proj:'Sobha Neopolis',                 wing:'P1-Wing 5',  city:'Bangalore',  date:'16-Feb-27', q:'Q4', u:113, sba:204540},
    {n:38, proj:'Sobha Neopolis',                 wing:'P2-Wing 19', city:'Bangalore',  date:'28-Feb-27', q:'Q4', u:76,  sba:187818}
  ];
  window.__wings = wings;

  // 45 OC wings — Annexure 1c Page 47 (OC Calendar)
  // wtN = matching index in `wings` array (1-based); null = OC-only wing (WT was pre-FY27)
  const ocList = [
    // Apr-26 (3 wings · 72u · 112,410 sft) — all OC-only Sobha Arbor wings (FY26 WT)
    {q:'Q1', m:'Apr-26', proj:'Sobha Arbor', wing:'Wing 1', city:'Chennai',    u:24,  sba:37470,  wtN:null},
    {q:'Q1', m:'Apr-26', proj:'Sobha Arbor', wing:'Wing 2', city:'Chennai',    u:24,  sba:37470,  wtN:null},
    {q:'Q1', m:'Apr-26', proj:'Sobha Arbor', wing:'Wing 3', city:'Chennai',    u:24,  sba:37470,  wtN:null},
    // May-26 (11 wings · 657u · 1,160,116 sft)
    {q:'Q1', m:'May-26', proj:'Sobha Athena',                     wing:'',           city:'Bangalore',  u:72,  sba:121606, wtN:null},
    {q:'Q1', m:'May-26', proj:'Sobha Dream Acres',                wing:'Wing 21',    city:'Bangalore',  u:117, sba:117350, wtN:null},
    {q:'Q1', m:'May-26', proj:'Sobha Dream Acres',                wing:'Wing 22',    city:'Bangalore',  u:120, sba:120377, wtN:null},
    {q:'Q1', m:'May-26', proj:'Sterling Infinia',                 wing:'Wing 3 & 4', city:'Bangalore',  u:78,  sba:229285, wtN:null},
    {q:'Q1', m:'May-26', proj:'Sobha Arbor',                      wing:'Wing 4',     city:'Chennai',    u:24,  sba:42897,  wtN:null},
    {q:'Q1', m:'May-26', proj:'Sobha Arbor',                      wing:'Wing 5',     city:'Chennai',    u:23,  sba:40982,  wtN:null},
    {q:'Q1', m:'May-26', proj:'Sobha Arbor',                      wing:'Wing 6',     city:'Chennai',    u:20,  sba:36028,  wtN:7},
    {q:'Q1', m:'May-26', proj:'Sobha City Gurugram',              wing:'Phase 6 D1', city:'Gurgaon',    u:72,  sba:174919, wtN:null},
    {q:'Q1', m:'May-26', proj:'Sobha Whispering Hills Meadows',   wing:'Wing 2',     city:'Trivandrum', u:50,  sba:100428, wtN:null},
    {q:'Q1', m:'May-26', proj:'Sobha Whispering Hills Meadows',   wing:'Wing 1',     city:'Trivandrum', u:48,  sba:95993,  wtN:3},
    {q:'Q1', m:'May-26', proj:'Sobha Insignia',                   wing:'',           city:'Bangalore',  u:33,  sba:80251,  wtN:1},
    // Jun-26 (1 wing · 110u · 215,459 sft)
    {q:'Q1', m:'Jun-26', proj:'Sobha Royal Crest',                wing:'Wing 3',     city:'Bangalore',  u:110, sba:215459, wtN:4},
    // Jul-26 (1 wing · 261u · 197,036 sft)
    {q:'Q2', m:'Jul-26', proj:'Sobha Brooklyn Towers',            wing:'Wing 3',     city:'Bangalore',  u:261, sba:197036, wtN:5},
    // Aug-26 (1 wing · 30u · 103,296 sft)
    {q:'Q2', m:'Aug-26', proj:'Sobha Oakshire',                   wing:'Phase 1',    city:'Bangalore',  u:30,  sba:103296, wtN:9},
    // Sep-26 (6 wings · 414u · 1,020,083 sft)
    {q:'Q2', m:'Sep-26', proj:'Marina One Phase II',              wing:'East Wing 5',city:'Cochin',     u:81,  sba:217483, wtN:11},
    {q:'Q2', m:'Sep-26', proj:'Sobha Atlantis',                   wing:'Block 4',    city:'Cochin',     u:96,  sba:222833, wtN:8},
    {q:'Q2', m:'Sep-26', proj:'Sobha City Gurugram',              wing:'Phase 6 D2', city:'Gurgaon',    u:72,  sba:174533, wtN:15},
    {q:'Q2', m:'Sep-26', proj:'Sobha Neopolis',                   wing:'P2-Wing 18', city:'Bangalore',  u:75,  sba:185377, wtN:12},
    {q:'Q2', m:'Sep-26', proj:'Sobha Metropolis',                 wing:'Phase I W2', city:'Thrissur',   u:84,  sba:191556, wtN:14},
    {q:'Q2', m:'Sep-26', proj:'Sobha Bela Encosta',               wing:'Villas 77/80-83/101', city:'Calicut', u:6, sba:28300, wtN:null},
    // Oct-26 (2 wings · 252u · 334,508 sft)
    {q:'Q3', m:'Oct-26', proj:'Sobha Royal Crest',                wing:'Wing 1',     city:'Bangalore',  u:110, sba:215513, wtN:16},
    {q:'Q3', m:'Oct-26', proj:'Sobha Dream Garden',               wing:'Phase 2 W10',city:'Bangalore',  u:142, sba:118995, wtN:17},
    // Nov-26 (4 wings · 361u · 768,591 sft)
    {q:'Q3', m:'Nov-26', proj:'Sobha Atlantis',                   wing:'Block 3',    city:'Cochin',     u:96,  sba:222069, wtN:13},
    {q:'Q3', m:'Nov-26', proj:'Sobha City Gurugram',              wing:'Phase 6 Z1', city:'Gurgaon',    u:54,  sba:141865, wtN:25},
    {q:'Q3', m:'Nov-26', proj:'Sobha Brooklyn Towers',            wing:'Wing 1',     city:'Bangalore',  u:99,  sba:201408, wtN:18},
    {q:'Q3', m:'Nov-26', proj:'Sobha Neopolis',                   wing:'P2-Wing 17', city:'Bangalore',  u:112, sba:203249, wtN:19},
    // Dec-26 (5 wings · 515u · 630,345 sft)
    {q:'Q3', m:'Dec-26', proj:'Sobha Metropolis',                 wing:'Phase I W3', city:'Thrissur',   u:92,  sba:167721, wtN:24},
    {q:'Q3', m:'Dec-26', proj:'Sobha Victoria Park',              wing:'Wing 5',     city:'Bangalore',  u:60,  sba:107105, wtN:20},
    {q:'Q3', m:'Dec-26', proj:'Sobha Neopolis',                   wing:'P2-Wing 14', city:'Bangalore',  u:111, sba:73338,  wtN:21},
    {q:'Q3', m:'Dec-26', proj:'Sobha Neopolis',                   wing:'P2-Wing 15', city:'Bangalore',  u:114, sba:75320,  wtN:22},
    {q:'Q3', m:'Dec-26', proj:'Sobha Manhattan Towers',           wing:'Wing 2',     city:'Bangalore',  u:138, sba:206861, wtN:23},
    // Jan-27 (2 wings · 185u · 429,473 sft)
    {q:'Q4', m:'Jan-27', proj:'Sobha Royal Crest',                wing:'Wing 2',     city:'Bangalore',  u:109, sba:223457, wtN:27},
    {q:'Q4', m:'Jan-27', proj:'Sobha Metropolis',                 wing:'Phase I W1', city:'Thrissur',   u:76,  sba:206016, wtN:28},
    // Feb-27 (7 wings · 569u · 1,262,874 sft)
    {q:'Q4', m:'Feb-27', proj:'Sobha Neopolis',                   wing:'P1-Wing 7',  city:'Bangalore',  u:114, sba:206426, wtN:29},
    {q:'Q4', m:'Feb-27', proj:'Sobha Water Front',                wing:'Tower 3',    city:'Hyderabad',  u:58,  sba:121770, wtN:26},
    {q:'Q4', m:'Feb-27', proj:'Sobha Water Front',                wing:'Tower 4',    city:'Hyderabad',  u:60,  sba:179558, wtN:33},
    {q:'Q4', m:'Feb-27', proj:'Sobha City Gurugram',              wing:'Phase 6 Z2', city:'Gurgaon',    u:54,  sba:141865, wtN:34},
    {q:'Q4', m:'Feb-27', proj:'Sobha Manhattan Towers',           wing:'Wing 1',     city:'Bangalore',  u:142, sba:230767, wtN:30},
    {q:'Q4', m:'Feb-27', proj:'Sobha Oakshire',                   wing:'Phase 2',    city:'Bangalore',  u:30,  sba:103296, wtN:31},
    {q:'Q4', m:'Feb-27', proj:'Sobha Nesara',                     wing:'Block 3',    city:'Pune',       u:111, sba:279192, wtN:36},
    // Mar-27 (2 wings · 211u · 404,657 sft)
    {q:'Q4', m:'Mar-27', proj:'Sobha Neopolis',                   wing:'P2-Wing 16', city:'Bangalore',  u:112, sba:203249, wtN:32},
    {q:'Q4', m:'Mar-27', proj:'Sobha Brooklyn Towers',            wing:'Wing 2',     city:'Bangalore',  u:99,  sba:201408, wtN:35}
  ];
  // resolve wt match for lag
  ocList.forEach((o, i) => {
    o.idx = i+1;
    o.wt = o.wtN ? wings.find(w => w.n === o.wtN) : null;
  });
  window.__ocList = ocList;

  const monthOrder = ['Apr-26','May-26','Jun-26','Jul-26','Aug-26','Sep-26','Oct-26','Nov-26','Dec-26','Jan-27','Feb-27','Mar-27'];
  const monthOf = d => d.split('-').slice(1).join('-');
  const fmt = n => n == null ? '—' : n.toLocaleString('en-IN');
  const fmtSft = n => n == null ? '—' : n.toLocaleString('en-US');

  // ---------- State ----------
  const state = { metric: 'units', search: '', famSearch: '', famQ: 'all', ocQ: 'all', ocMonth: 'all', famMonth: 'all', wtQ: 'all' };

  function filtered() {
    return wings.filter(w => {
      if (!state.search) return true;
      const hay = (w.proj+' '+w.wing+' '+w.city+' '+w.date+' '+w.q).toLowerCase();
      return hay.includes(state.search);
    });
  }

  // ---------- Tooltip ----------
  function showTip(html, e){
    tip.innerHTML = html;
    tip.classList.add('on');
    const x = Math.min(e.clientX + 14, window.innerWidth - 240);
    const y = Math.min(e.clientY + 14, window.innerHeight - 140);
    tip.style.left = x+'px'; tip.style.top = y+'px';
  }
  function hideTip(){ tip.classList.remove('on'); }

  // ---------- City bar chart ----------
  function renderCityBar(){
    const svg = document.getElementById('cityBar');
    if (!svg) return;
    const W=800, H=320, padL=130, padR=60, padT=20, padB=40;
    const rows = D.walkthroughs.slice().sort((a,b)=>{
      const k = state.metric==='units' ? 'u27' : 'sba27';
      return b[k] - a[k];
    });
    const k27 = state.metric==='units' ? 'u27' : 'sba27';
    const k26 = state.metric==='units' ? 'u26' : 'sba26';
    const max = Math.max(...rows.map(r => Math.max(r[k27], r[k26]))) * 1.05;
    const x = v => padL + (v/max) * (W - padL - padR);
    const rowH = (H - padT - padB) / rows.length;
    const barH = Math.min(rowH * 0.36, 12);

    let s = '';
    // grid
    for (let i=0; i<=4; i++){
      const v = max * i/4;
      const px = x(v);
      s += `<line class="grid-line" x1="${px}" x2="${px}" y1="${padT}" y2="${H-padB}" stroke="var(--rule-soft)" stroke-dasharray="2 3"/>`;
      s += `<text x="${px}" y="${H-padB+14}" text-anchor="middle">${state.metric==='units' ? fmt(Math.round(v)) : (v/1e6).toFixed(1)+'M'}</text>`;
    }
    rows.forEach((r,i)=>{
      const y0 = padT + i*rowH + rowH*0.5;
      // FY26 (info)
      s += `<rect x="${padL}" y="${y0 - barH - 1}" width="${x(r[k26])-padL}" height="${barH}" fill="var(--info)" opacity="0.8"/>`;
      // FY27 (accent)
      s += `<rect x="${padL}" y="${y0 + 1}" width="${x(r[k27])-padL}" height="${barH}" fill="var(--accent)"/>`;
      // city label
      s += `<text x="${padL-10}" y="${y0+4}" text-anchor="end" fill="var(--ink)" font-family="Manrope" font-weight="600" font-size="10">${r.city}</text>`;
      // value 27
      const lab = state.metric==='units' ? fmt(r.u27) : fmt(r.sba27);
      s += `<text x="${x(r[k27])+6}" y="${y0+barH/2+4}" fill="var(--ink-2)" font-size="9">${lab}</text>`;
      // growth chip
      const gx = W - padR + 6;
      const gColor = r.growth >= 0 ? 'var(--pos)' : 'var(--neg)';
      const gPrefix = r.growth >= 0 ? '+' : '';
      const gTxt = r.growth === 0 ? 'NEW' : (gPrefix + r.growth.toFixed(1) + '%');
      s += `<text x="${gx}" y="${y0+4}" fill="${gColor}" font-size="9" font-weight="600">${gTxt}</text>`;
      // hover
      s += `<rect class="hover-target" x="0" y="${y0 - rowH/2}" width="${W}" height="${rowH}"
             data-city="${r.city}" data-u26="${r.u26}" data-sba26="${r.sba26}" data-u27="${r.u27}" data-sba27="${r.sba27}" data-g="${r.growth}"/>`;
    });
    svg.innerHTML = s;
    svg.querySelectorAll('.hover-target').forEach(el => {
      el.addEventListener('mousemove', e => {
        const d = el.dataset;
        showTip(`<div class="tt-t">${d.city}</div>
          <div class="tt-r"><span class="lab">FY27E units</span><span class="val">${fmt(+d.u27)}</span></div>
          <div class="tt-r"><span class="lab">FY27E SBA</span><span class="val">${fmt(+d.sba27)} sft</span></div>
          <div class="tt-r"><span class="lab">FY26A units</span><span class="val">${fmt(+d.u26)}</span></div>
          <div class="tt-r"><span class="lab">FY26A SBA</span><span class="val">${fmt(+d.sba26)} sft</span></div>
          <div class="tt-r"><span class="lab">Growth</span><span class="val ${+d.g>=0?'pos':'neg'}">${+d.g>=0?'+':''}${d.g}%</span></div>`, e);
      });
      el.addEventListener('mouseleave', hideTip);
    });
  }

  // ---------- Quarterly mix ----------
  function renderQuarter(){
    const svg = document.getElementById('qChart');
    const W=380, H=320, padL=44, padR=20, padT=20, padB=30;
    const qs = ['Q1','Q2','Q3','Q4'].map(q => {
      const list = wings.filter(w => w.q === q);
      return { q, wings: list.length, u: list.reduce((s,w)=>s+w.u,0), sba: list.reduce((s,w)=>s+w.sba,0) };
    });
    const max = Math.max(...qs.map(d => state.metric==='units' ? d.u : d.sba)) * 1.15;
    const bw = (W - padL - padR) / qs.length;
    let s = '';
    for (let i=0;i<=4;i++){
      const v = max * i/4;
      const py = H - padB - (v/max)*(H-padT-padB);
      s += `<line x1="${padL}" x2="${W-padR}" y1="${py}" y2="${py}" stroke="var(--rule-soft)" stroke-dasharray="2 3"/>`;
      s += `<text x="${padL-8}" y="${py+3}" text-anchor="end">${state.metric==='units' ? fmt(Math.round(v)) : (v/1e6).toFixed(1)+'M'}</text>`;
    }
    qs.forEach((d,i)=>{
      const v = state.metric==='units' ? d.u : d.sba;
      const h = (v/max)*(H-padT-padB);
      const x0 = padL + i*bw + bw*0.18;
      const w0 = bw*0.64;
      const y0 = H - padB - h;
      s += `<rect x="${x0}" y="${y0}" width="${w0}" height="${h}" fill="var(--accent)"/>`;
      s += `<text x="${x0+w0/2}" y="${y0-8}" text-anchor="middle" fill="var(--ink)" font-weight="600" font-size="11">${state.metric==='units' ? fmt(d.u) : (d.sba/1e6).toFixed(2)+'M'}</text>`;
      s += `<text x="${x0+w0/2}" y="${y0-22}" text-anchor="middle" fill="var(--ink-3)" font-size="9">${d.wings} wings</text>`;
      s += `<text x="${x0+w0/2}" y="${H-padB+14}" text-anchor="middle" fill="var(--ink-2)" font-weight="600" font-size="10">${d.q}</text>`;
      s += `<rect class="hover-target" x="${padL+i*bw}" y="${padT}" width="${bw}" height="${H-padT-padB}"
             data-q="${d.q}" data-u="${d.u}" data-sba="${d.sba}" data-w="${d.wings}"/>`;
    });
    svg.innerHTML = s;
    svg.querySelectorAll('.hover-target').forEach(el=>{
      el.addEventListener('mousemove', e=>{
        const d = el.dataset;
        showTip(`<div class="tt-t">${d.q}-FY27</div>
          <div class="tt-r"><span class="lab">Wings</span><span class="val">${d.w}</span></div>
          <div class="tt-r"><span class="lab">Units</span><span class="val">${fmt(+d.u)}</span></div>
          <div class="tt-r"><span class="lab">SBA</span><span class="val">${fmt(+d.sba)} sft</span></div>`, e);
      });
      el.addEventListener('mouseleave', hideTip);
    });
  }

  // ---------- Monthly heat strip ----------
  function renderMonth(){
    const svg = document.getElementById('monthChart');
    if (!svg) return;
    const W=1100, H=200, padL=20, padR=20, padT=30, padB=40;
    const monthData = monthOrder.map(m => {
      const list = wings.filter(w => monthOf(w.date) === m);
      return { m, wings: list, count: list.length, u: list.reduce((s,w)=>s+w.u,0), sba: list.reduce((s,w)=>s+w.sba,0) };
    });
    const cellW = (W - padL - padR) / monthData.length;
    const max = Math.max(...monthData.map(d => state.metric==='units' ? d.u : d.sba));
    let s = '';
    monthData.forEach((d,i)=>{
      const v = state.metric==='units' ? d.u : d.sba;
      const intensity = max ? v/max : 0;
      const x0 = padL + i*cellW + 4;
      const w0 = cellW - 8;
      // background
      s += `<rect x="${x0}" y="${padT}" width="${w0}" height="${H-padT-padB}" fill="var(--paper-2)"/>`;
      // intensity overlay
      if (v > 0) {
        s += `<rect x="${x0}" y="${padT}" width="${w0}" height="${H-padT-padB}" fill="var(--accent)" opacity="${0.15 + intensity*0.85}"/>`;
        const valTxt = state.metric==='units' ? fmt(d.u) : (d.sba >= 1e6 ? (d.sba/1e6).toFixed(2)+'M' : fmt(Math.round(d.sba/1e3))+'k');
        const txtColor = intensity > 0.45 ? 'var(--paper)' : 'var(--ink)';
        s += `<text x="${x0+w0/2}" y="${padT+(H-padT-padB)/2 - 6}" text-anchor="middle" font-family="DM Serif Display" font-size="22" fill="${txtColor}">${valTxt}</text>`;
        s += `<text x="${x0+w0/2}" y="${padT+(H-padT-padB)/2 + 14}" text-anchor="middle" font-size="9" fill="${txtColor}" opacity="0.8">${d.count} wing${d.count===1?'':'s'}</text>`;
      } else {
        s += `<text x="${x0+w0/2}" y="${padT+(H-padT-padB)/2}" text-anchor="middle" font-size="10" fill="var(--ink-4)">—</text>`;
      }
      // month label
      s += `<text x="${x0+w0/2}" y="${H-padB+20}" text-anchor="middle" font-family="Manrope" font-weight="600" font-size="10" fill="var(--ink-2)">${d.m}</text>`;
      // quarter band
      const q = (i<3?'Q1':i<6?'Q2':i<9?'Q3':'Q4');
      if (i===0||i===3||i===6||i===9){
        s += `<text x="${x0+w0/2}" y="${20}" text-anchor="start" font-size="9" letter-spacing="0.2em" font-weight="700" fill="var(--accent)">${q} →</text>`;
      }
      // hover
      const items = d.wings.map(w => `<div class="tt-r"><span class="lab">${w.proj} ${w.wing}</span><span class="val">${fmt(w.u)}u</span></div>`).join('');
      s += `<rect class="hover-target" x="${padL+i*cellW}" y="${padT}" width="${cellW}" height="${H-padT-padB}"
             data-m="${d.m}" data-c="${d.count}" data-u="${d.u}" data-sba="${d.sba}" data-items='${encodeURIComponent(items).replace(/'/g, '%27')}'/>`;
    });
    svg.innerHTML = s;
    svg.querySelectorAll('.hover-target').forEach(el=>{
      el.addEventListener('mousemove', e=>{
        const d = el.dataset;
        const items = d.items ? decodeURIComponent(d.items) : '';
        showTip(`<div class="tt-t">${d.m} · ${d.c} wing${d.c==='1'?'':'s'}</div>
          <div class="tt-r"><span class="lab">Units</span><span class="val">${fmt(+d.u)}</span></div>
          <div class="tt-r"><span class="lab">SBA</span><span class="val">${fmt(+d.sba)} sft</span></div>
          ${items}`, e);
      });
      el.addEventListener('mouseleave', hideTip);
    });
  }

  // ---------- City roll-up table ----------
  function renderCityTable(){
    const tb = document.querySelector('#cityTable tbody');
    const rows = D.walkthroughs.slice();
    const totU26 = rows.reduce((s,r)=>s+r.u26,0);
    const totU27 = rows.reduce((s,r)=>s+r.u27,0);
    const totSba26 = rows.reduce((s,r)=>s+r.sba26,0);
    const totSba27 = rows.reduce((s,r)=>s+r.sba27,0);
    const maxAbs = Math.max(...rows.map(r => Math.abs(r.growth)));
    let html = `<tr class="total"><td class="l">FY27 Grand Total</td>
      <td>${fmt(totU27)}</td><td>${fmtSft(totSba27)}</td>
      <td>${fmt(totU26)}</td><td>${fmtSft(totSba26)}</td>
      <td class="pos">+${(totU27-totU26)}</td>
      <td class="pos">+${(((totSba27-totSba26)/totSba26)*100).toFixed(1)}%</td>
      <td class="l"></td></tr>`;
    rows.forEach(r => {
      const dU = r.u27 - r.u26;
      const cls = r.growth >= 0 ? 'pos' : 'neg';
      const trendW = Math.abs(r.growth) / maxAbs * 60;
      const trend = r.growth === 0
        ? `<span class="chip info">NEW</span>`
        : `<span class="cellbar bg" style="width:60px"><span class="cellbar" style="width:${trendW}px; background: ${r.growth>=0?'var(--pos)':'var(--neg)'}"></span></span> <span class="${cls}">${r.growth>=0?'+':''}${r.growth.toFixed(1)}%</span>`;
      html += `<tr>
        <td class="l">${r.city}</td>
        <td>${fmt(r.u27)}</td>
        <td>${fmtSft(r.sba27)}</td>
        <td>${fmt(r.u26)}</td>
        <td>${fmtSft(r.sba26)}</td>
        <td class="${dU>=0?'pos':'neg'}">${dU>=0?'+':''}${dU}</td>
        <td class="${cls}">${r.growth>=0?'+':''}${r.growth.toFixed(1)}%</td>
        <td class="l">${trend}</td>
      </tr>`;
    });
    tb.innerHTML = html;
  }

  // ---------- Walkthrough detail table ----------
  function renderWtTable(){
    const tb = document.querySelector('#wtTable tbody');
    const rows = filtered();
    const qColors = { Q1: 'var(--info)', Q2: 'var(--teal)', Q3: 'var(--violet)', Q4: 'var(--accent)' };
    const totU = rows.reduce((s,w)=>s+w.u,0);
    const totSba = rows.reduce((s,w)=>s+w.sba,0);
    const projCount = new Set(rows.map(w=>w.proj)).size;
    let html = `<tr class="total"><td class="l">FY27 Grand Total</td>
      <td class="l">${projCount} projects · ${rows.length} wings</td>
      <td class="l">PAN India</td>
      <td class="l">—</td>
      <td class="l">—</td>
      <td>${fmt(totU)}</td>
      <td>${fmtSft(totSba)}</td>
    </tr>`;
    rows.forEach(w => {
      html += `<tr>
        <td class="l dim">${w.n}</td>
        <td class="l">${w.proj}${w.wing ? ' · <span class="dim">'+w.wing+'</span>' : ''}</td>
        <td class="l">${w.city}</td>
        <td class="l">${w.date}</td>
        <td class="l"><span class="chip" style="background:${qColors[w.q]}; color: var(--paper); border:0">${w.q}</span></td>
        <td>${fmt(w.u)}</td>
        <td>${fmtSft(w.sba)}</td>
      </tr>`;
    });
    if (!rows.length) html = `<tr><td colspan="7" class="l dim" style="padding: 24px; text-align:center;">No wings match current filter</td></tr>`;
    tb.innerHTML = html;
  }

  // ---------- Shared calendar-matrix renderer ----------
  // opts: { hostId, items[{proj,city,m,u,sba,wing?}], search, accentRgb, cellClass, tipPrefix }
  function renderCalendarMatrix(opts){
    const host = document.getElementById(opts.hostId);
    if (!host) return;
    const cityOrder = ['Bangalore','Gurgaon','Cochin','Thrissur','Trivandrum','Chennai','Hyderabad','Pune','Calicut'];
    const grp = {};
    opts.items.forEach(it => {
      const k = it.proj+'||'+it.city;
      if (!grp[k]) grp[k] = { proj:it.proj, city:it.city, byMonth:{}, totU:0, totSba:0, totWings:0 };
      const g = grp[k];
      if (!g.byMonth[it.m]) g.byMonth[it.m] = { u:0, sba:0, wings:[] };
      g.byMonth[it.m].u += it.u;
      g.byMonth[it.m].sba += it.sba;
      g.byMonth[it.m].wings.push(it);
      g.totU += it.u; g.totSba += it.sba; g.totWings++;
    });
    let projects = Object.values(grp);
    if (opts.search) projects = projects.filter(p => (p.proj+' '+p.city).toLowerCase().includes(opts.search));
    projects.sort((a,b) => {
      const ci = cityOrder.indexOf(a.city) - cityOrder.indexOf(b.city);
      if (ci !== 0) return ci;
      return b.totU - a.totU;
    });
    const maxCellU = Math.max(1, ...projects.flatMap(p => Object.values(p.byMonth).map(c => c.u)));
    // 200 label + 12 months + 110 total
    const cols = `200px repeat(12,1fr) 110px`;
    const QS = ['Q1','Q2','Q3','Q4'];
    const qOf = i => QS[Math.floor(i/3)];
    function qSub(p){ // returns array of 4 {u, sba, w}
      const out = [{u:0,sba:0,w:0},{u:0,sba:0,w:0},{u:0,sba:0,w:0},{u:0,sba:0,w:0}];
      monthOrder.forEach((m,i) => {
        const c = p.byMonth[m]; if (!c) return;
        const qi = Math.floor(i/3);
        out[qi].u += c.u; out[qi].sba += c.sba; out[qi].w += c.wings.length;
      });
      return out;
    }
    // Pre-compute quarter totals for header band
    const _hdrMonthTotals = monthOrder.map(m => {
      let u=0, sba=0, w=0;
      projects.forEach(p => { if (p.byMonth[m]) { u+=p.byMonth[m].u; sba+=p.byMonth[m].sba; w+=p.byMonth[m].wings.length; } });
      return {u,sba,w};
    });
    const _hdrQ = [{u:0,sba:0,w:0},{u:0,sba:0,w:0},{u:0,sba:0,w:0},{u:0,sba:0,w:0}];
    _hdrMonthTotals.forEach((t,i) => { const qi = Math.floor(i/3); _hdrQ[qi].u+=t.u; _hdrQ[qi].sba+=t.sba; _hdrQ[qi].w+=t.w; });
    const _hdrGrandU = _hdrMonthTotals.reduce((s,c)=>s+c.u,0);
    const _hdrGrandSba = _hdrMonthTotals.reduce((s,c)=>s+c.sba,0);
    let html = '';
    // Header — single grid, Project·City + Year Total span both rows
    html += `<div style="display:grid; grid-template-columns:${cols}; grid-template-rows:auto auto; position:sticky; top:0; background:var(--paper); z-index:3; border-bottom:1px solid var(--rule);">`;
    html += `<div style="grid-row: span 2; padding:14px; display:flex; align-items:center; font:600 9px/1 'Manrope'; letter-spacing:0.18em; color:var(--ink-3); text-transform:uppercase; background:var(--paper-2); border-bottom:1px solid var(--rule);">Project · City</div>`;
    QS.forEach((q,qi) => {
      const qd = _hdrQ[qi];
      html += `<div style="grid-column: span 3; padding:8px 6px 6px; text-align:center; border-left:2px solid var(--accent); background:rgba(176,141,87,0.08);">
        <div style="font:700 9px/1 'Manrope'; letter-spacing:0.22em; color:var(--accent); text-transform:uppercase;">${q}</div>
        <div style="font:700 12px/1.1 'JetBrains Mono'; color:var(--ink); margin-top:4px;">${qd.u ? fmt(qd.u)+' u' : '—'}</div>
        <div style="font:400 9px/1.2 'Manrope'; color:var(--ink-3); margin-top:2px;">${qd.sba ? (qd.sba/1e6).toFixed(2)+'M sft · '+qd.w+'w' : ''}</div>
      </div>`;
    });
    html += `<div style="grid-row: span 2; padding:14px; text-align:right; display:flex; flex-direction:column; justify-content:center; border-left:1px solid var(--rule); background:rgba(176,141,87,0.08);">
      <div style="font:700 9px/1.2 'Manrope'; letter-spacing:0.18em; color:var(--ink-3); text-transform:uppercase;">Year Total</div>
    </div>`;
    // Row 2 — month names (Project·City and Year Total cells already span here)
    monthOrder.forEach((m,i) => {
      const isQStart = (i%3===0);
      html += `<div style="padding:10px 4px; text-align:center; font:600 10px/1.1 'Manrope'; color:var(--ink-2); ${isQStart?'border-left:2px solid var(--accent);':''}">
        ${m}
      </div>`;
    });
    html += `</div>`;
    if (!projects.length) {
      html += `<div style="padding:24px; text-align:center; color:var(--ink-3);">No projects match</div>`;
      host.innerHTML = html; return;
    }
    // Cell helpers
    const sbaLabel = (sba) => Math.round(sba/1000).toLocaleString('en-IN')+'k sft';
    const wingsHtmlFrom = (wingArr) => wingArr.filter(w => w && w.wing).map(w => {
      const wingLabel = (w.proj ? w.proj.replace(/^Sobha\s+/i,'') : '') + (w.wing ? ' · '+w.wing : '');
      const dateStr = w.date || '';
      const sbaStr = Math.round((w.sba||0)/1000).toLocaleString('en-IN')+'k sft';
      return `<div style="margin-top:5px; padding-top:5px; border-top:1px solid rgba(255,255,255,0.12); display:grid; grid-template-columns: 1fr auto auto auto; gap:10px; align-items:baseline; font:500 10px/1.3 'Manrope'; color:var(--paper);">
        <span style="color:var(--paper); font-weight:600;">${wingLabel}</span>
        <span style="font-family:'JetBrains Mono'; color:var(--paper);">${fmt(w.u)}u</span>
        <span style="font-family:'JetBrains Mono'; color:var(--ink-3);">${sbaStr}</span>
        <span style="font-family:'JetBrains Mono'; color:var(--accent);">${dateStr}</span>
      </div>`;
    }).join('');
    const cellHtml = (cell, isQStart, label) => {
      const borderL = isQStart ? 'border-left:2px solid var(--accent);' : 'border-left:1px solid var(--rule-soft);';
      if (!cell || !cell.u) return `<div style="${borderL} display:flex; align-items:center; justify-content:center; color:var(--ink-4); font-size:10px;">·</div>`;
      const intensity = cell.u / maxCellU;
      const bg = `rgba(${opts.accentRgb},${0.15 + intensity*0.75})`;
      const txtColor = intensity > 0.45 ? 'var(--paper)' : 'var(--ink)';
      const wingsHtml = wingsHtmlFrom(cell.wings || []);
      return `<div class="${opts.cellClass}" style="${borderL} background:${bg}; color:${txtColor}; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:4px 2px; cursor:default;"
        data-label="${label||''}" data-u="${cell.u}" data-sba="${cell.sba}" data-w="${(cell.wings||[]).length}" data-items='${encodeURIComponent(wingsHtml).replace(/'/g, '%27')}'>
        <div style="font:700 13px/1 'JetBrains Mono';">${cell.u}</div>
        <div style="font:500 8px/1.2 'Manrope'; opacity:0.85; margin-top:2px;">${sbaLabel(cell.sba)} · ${(cell.wings||[]).length}w</div>
      </div>`;
    };
    const qSubCell = (q) => {
      if (!q.u) return `<div style="background:var(--paper-2); border-left:1px solid var(--rule); border-right:1px solid var(--rule); display:flex; align-items:center; justify-content:center; color:var(--ink-4);">—</div>`;
      return `<div style="background:var(--paper-2); border-left:1px solid var(--rule); border-right:1px solid var(--rule); display:flex; flex-direction:column; align-items:center; justify-content:center; padding:4px 2px;">
        <div style="font:700 13px/1 'JetBrains Mono'; color:var(--ink);">${fmt(q.u)}</div>
        <div style="font:500 8px/1.2 'Manrope'; color:var(--ink-3); margin-top:2px;">${q.w}w · ${(q.sba/1000).toFixed(0)}k</div>
      </div>`;
    };
    const totalCell = (u, sba) => `<div style="padding:8px 14px; text-align:right; display:flex; flex-direction:column; justify-content:center; align-items:flex-end; border-left:1px solid var(--rule);">
      <div style="font:700 13px/1 'JetBrains Mono'; color:var(--ink);">${fmt(u)}</div>
      <div style="font:400 9px/1.3 'Manrope'; color:var(--ink-3); margin-top:2px;">${(sba/1e6).toFixed(2)}M sft</div>
    </div>`;
    // Pan-India total row
    const monthTotals = monthOrder.map(m => {
      let u=0, sba=0, wings=[];
      projects.forEach(p => { if (p.byMonth[m]) { u+=p.byMonth[m].u; sba+=p.byMonth[m].sba; wings.push(...p.byMonth[m].wings); } });
      return {u,sba,w:wings.length,wings};
    });
    const grandQ = [{u:0,sba:0,w:0},{u:0,sba:0,w:0},{u:0,sba:0,w:0},{u:0,sba:0,w:0}];
    monthTotals.forEach((t,i) => { const qi = Math.floor(i/3); grandQ[qi].u+=t.u; grandQ[qi].sba+=t.sba; grandQ[qi].w+=t.w; });
    const grandU = monthTotals.reduce((s,c)=>s+c.u,0);
    const grandSba = monthTotals.reduce((s,c)=>s+c.sba,0);
    html += `<div style="display:grid; grid-template-columns:${cols}; border-bottom:2px solid var(--ink); background:var(--paper-2); align-items:stretch; min-height:50px;">`;
    const _grandWings = projects.reduce((s,p)=>s+p.totWings,0);
    html += `<div style="padding:6px 14px; display:flex; flex-direction:column; justify-content:center;">
      <div style="font:700 10px/1 'Manrope'; letter-spacing:0.18em; text-transform:uppercase; color:var(--ink);">Pan-India Total</div>
      <div style="font:400 9px/1.3 'Manrope'; color:var(--ink-3); margin-top:3px;">${projects.length} project${projects.length===1?'':'s'} · ${_grandWings} wings</div>
    </div>`;
    monthTotals.forEach((t,i) => {
      html += cellHtml({u:t.u, sba:t.sba, wings:t.wings}, i%3===0, `Pan-India · ${monthOrder[i]}`);
    });
    html += totalCell(grandU, grandSba);
    html += `</div>`;
    // City rows + project rows
    let curCity = null;
    projects.forEach(p => {
      if (p.city !== curCity){
        // City subtotal row
        const cityProjects = projects.filter(x => x.city === p.city);
        const cityMonthTotals = monthOrder.map(m => {
          let u=0, sba=0, wings=[];
          cityProjects.forEach(x => { if (x.byMonth[m]) { u+=x.byMonth[m].u; sba+=x.byMonth[m].sba; wings.push(...x.byMonth[m].wings); } });
          return {u,sba,w:wings.length,wings};
        });
        const cityQ = [{u:0,sba:0,w:0},{u:0,sba:0,w:0},{u:0,sba:0,w:0},{u:0,sba:0,w:0}];
        cityMonthTotals.forEach((t,i) => { const qi = Math.floor(i/3); cityQ[qi].u+=t.u; cityQ[qi].sba+=t.sba; cityQ[qi].w+=t.w; });
        const cityU = cityMonthTotals.reduce((s,c)=>s+c.u,0);
        const citySba = cityMonthTotals.reduce((s,c)=>s+c.sba,0);
        const cityW = cityProjects.reduce((s,x)=>s+x.totWings,0);
        html += `<div style="display:grid; grid-template-columns:${cols}; border-top:1px solid var(--rule); border-bottom:1px solid var(--rule); background:rgba(176,141,87,0.08); align-items:stretch; min-height:42px;">`;
        html += `<div style="padding:6px 14px; display:flex; flex-direction:column; justify-content:center;">
          <div style="font:700 10px/1 'Manrope'; letter-spacing:0.22em; text-transform:uppercase; color:var(--accent);">${p.city}</div>
          <div style="font:400 9px/1.3 'Manrope'; color:var(--ink-3); margin-top:3px;">${cityProjects.length} project${cityProjects.length===1?'':'s'} · ${cityW} wings</div>
        </div>`;
        cityMonthTotals.forEach((t,i) => {
          const isQStart = i%3===0;
          const borderL = isQStart ? 'border-left:2px solid var(--accent);' : 'border-left:1px solid var(--rule-soft);';
          if (!t.u){
            html += `<div style="${borderL} display:flex; align-items:center; justify-content:center; color:var(--ink-4); font-size:10px;">·</div>`;
          } else {
            const wingsHtml = wingsHtmlFrom(t.wings || []);
            html += `<div class="${opts.cellClass}" style="${borderL} display:flex; flex-direction:column; align-items:center; justify-content:center; padding:4px 2px; cursor:default;"
              data-label="${p.city} · ${monthOrder[i]}" data-u="${t.u}" data-sba="${t.sba}" data-w="${t.w}" data-items='${encodeURIComponent(wingsHtml).replace(/'/g, '%27')}'>
              <div style="font:700 12px/1 'JetBrains Mono'; color:var(--ink);">${t.u}</div>
              <div style="font:500 8px/1.2 'Manrope'; color:var(--ink-3); margin-top:2px;">${sbaLabel(t.sba)} · ${t.w}w</div>
            </div>`;
          }
        });
        html += totalCell(cityU, citySba);
        html += `</div>`;
        curCity = p.city;
      }
      const pq = qSub(p);
      html += `<div style="display:grid; grid-template-columns:${cols}; border-bottom:1px solid var(--rule-soft); align-items:stretch; min-height:46px;">`;
      html += `<div style="padding:8px 14px 8px 28px; display:flex; flex-direction:column; justify-content:center;">
        <div style="font:600 12px/1.2 'Manrope'; color:var(--ink);">${p.proj}</div>
        <div style="font:400 9px/1.3 'Manrope'; color:var(--ink-3); margin-top:2px;">${p.totWings} wing${p.totWings===1?'':'s'}</div>
      </div>`;
      monthOrder.forEach((m,i) => {
        const cell = p.byMonth[m];
        const isQStart = i%3===0;
        const borderL = isQStart ? 'border-left:2px solid var(--accent);' : 'border-left:1px solid var(--rule-soft);';
        if (!cell) {
          html += `<div style="${borderL} display:flex; align-items:center; justify-content:center; color:var(--ink-4); font-size:10px;">·</div>`;
        } else {
          const intensity = cell.u / maxCellU;
          const bg = `rgba(${opts.accentRgb},${0.15 + intensity*0.75})`;
          const txtColor = intensity > 0.45 ? 'var(--paper)' : 'var(--ink)';
          const wingsHtml = cell.wings.map((w, idx) => {
            const wingLabel = (w.proj ? w.proj.replace(/^Sobha\s+/i,'') : p.proj.replace(/^Sobha\s+/i,'')) + (w.wing ? ' · '+w.wing : '');
            const dateStr = w.date || '';
            const sbaStr = Math.round(w.sba/1000).toLocaleString('en-IN')+'k sft';
            return `<div style="margin-top:5px; padding-top:5px; border-top:1px solid rgba(255,255,255,0.12); display:grid; grid-template-columns: 1fr auto auto auto; gap:10px; align-items:baseline; font:500 10px/1.3 'Manrope'; color:var(--paper);">
              <span style="color:var(--paper); font-weight:600;">${wingLabel}</span>
              <span style="font-family:'JetBrains Mono'; color:var(--paper);">${fmt(w.u)}u</span>
              <span style="font-family:'JetBrains Mono'; color:var(--ink-3);">${sbaStr}</span>
              <span style="font-family:'JetBrains Mono'; color:var(--accent);">${dateStr}</span>
            </div>`;
          }).join('');
          html += `<div class="${opts.cellClass}" style="${borderL} background:${bg}; color:${txtColor}; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:4px 2px; cursor:default;"
            data-proj="${p.proj}" data-m="${m}" data-u="${cell.u}" data-sba="${cell.sba}" data-w="${cell.wings.length}" data-items='${encodeURIComponent(wingsHtml).replace(/'/g, '%27')}'>
            <div style="font:700 13px/1 'JetBrains Mono';">${cell.u}</div>
            <div style="font:500 8px/1.2 'Manrope'; opacity:0.85; margin-top:2px;">${sbaLabel(cell.sba)} · ${cell.wings.length}w</div>
          </div>`;
        }

      });
      html += totalCell(p.totU, p.totSba);
      html += `</div>`;
    });
    host.innerHTML = html;
    host.querySelectorAll('.'+opts.cellClass).forEach(el => {
      el.addEventListener('mousemove', e => {
        const d = el.dataset;
        const title = d.proj ? `${d.proj} · ${d.m}` : (d.label || '');
        if (!title) return;
        const items = d.items?decodeURIComponent(d.items):'';
        showTip(`<div class="tt-t">${title}</div>
          <div class="tt-r"><span class="lab">Wings</span><span class="val">${d.w}</span></div>
          <div class="tt-r"><span class="lab">Total Units</span><span class="val">${fmt(+d.u)}</span></div>
          <div class="tt-r"><span class="lab">Total SBA</span><span class="val">${fmt(+d.sba)} sft</span></div>
          ${items}`, e);
      });
      el.addEventListener('mouseleave', hideTip);
    });
  }

  // ---------- Project family walkthrough matrix ----------
  function renderFamilyTable(){
    let items = wings.map(w => ({ proj:w.proj, city:w.city, m:monthOf(w.date), u:w.u, sba:w.sba, wing:w.wing, date:w.date }));
    if (state.famQ !== 'all') items = items.filter(it => qOfMonth(it.m) === state.famQ);
    if (state.famMonth !== 'all') items = items.filter(it => it.m === state.famMonth);
    renderCalendarMatrix({ hostId:'famMatrix', items, search:state.famSearch, accentRgb:'176,141,87', cellClass:'fam-cell' });
  }

  // ---------- Quarterly timeline (block list) ----------
  function renderQTimeline(){
    const host = document.getElementById('qTimeline');
    if (!host) return;
    const qColor = { Q1:'var(--info)', Q2:'var(--teal)', Q3:'var(--violet)', Q4:'var(--accent)' };
    const maxSba = Math.max(...wings.map(w => w.sba));
    let html = '';
    ['Q1','Q2','Q3','Q4'].forEach(q => {
      const list = wings.filter(w => w.q === q);
      const totU = list.reduce((s,w)=>s+w.u,0);
      const totSba = list.reduce((s,w)=>s+w.sba,0);
      html += `<div style="padding: 18px 22px; border-bottom: 1px solid var(--rule-soft);">
        <div style="display:flex; justify-content: space-between; align-items: baseline; margin-bottom: 10px;">
          <div style="font-family:'DM Serif Display'; font-size:18px; color: var(--ink);">${q}-FY27</div>
          <div style="font-family:'JetBrains Mono'; font-size:10px; color: var(--ink-3);">${list.length} wings · ${fmt(totU)} units · ${(totSba/1e6).toFixed(2)}M sft</div>
        </div>
        <div style="display:flex; gap:3px; flex-wrap:wrap;">`;
      list.forEach(w => {
        const widthPx = Math.max(10, (w.sba / maxSba) * 100);
        html += `<div title="${w.proj} ${w.wing} · ${w.city} · ${w.date} · ${fmt(w.u)}u · ${fmt(w.sba)} sft"
          style="height: 28px; width: ${widthPx}px; background: ${qColor[q]}; opacity: 0.85; cursor: default; display:flex; align-items:center; justify-content:center; color: var(--paper); font-family:'JetBrains Mono'; font-size:9px; padding: 0 3px; overflow:hidden; white-space:nowrap;">${w.u}</div>`;
      });
      html += `</div></div>`;
    });
    host.innerHTML = html;
  }

  // ---------- Search ----------
  document.getElementById('wtSearch').addEventListener('input', e => {
    state.search = e.target.value.toLowerCase();
    renderWtTable();
  });

  // ---------- Family search ----------
  document.getElementById('famSearch').addEventListener('input', e => {
    state.famSearch = e.target.value.toLowerCase();
    renderFamilyTable();
  });
  // quarter chips
  function qOfMonth(m){
    const i = monthOrder.indexOf(m);
    return i<0 ? null : ['Q1','Q2','Q3','Q4'][Math.floor(i/3)];
  }
  document.querySelectorAll('.qchips').forEach(grp => {
    grp.addEventListener('click', e => {
      const btn = e.target.closest('.qchip'); if (!btn) return;
      grp.querySelectorAll('.qchip').forEach(b => b.classList.remove('on'));
      btn.classList.add('on');
      const target = grp.dataset.target;
      if (target === 'fam') { state.famQ = btn.dataset.q; renderFamilyTable(); }
      else if (target === 'oc') { state.ocQ = btn.dataset.q; renderOcMatrix(); }
      else if (target === 'wt') { state.wtQ = btn.dataset.q; renderWtTable(); }
    });
  });

  // ---------- Toggles ----------
  function setMetric(m){
    state.metric = m;
    const u = document.getElementById('tUnits'); if (u) u.classList.toggle('on', m === 'units');
    const s = document.getElementById('tSft'); if (s) s.classList.toggle('on', m === 'sft');
    renderCityBar();
    renderMonth();
  }
  const _tu = document.getElementById('tUnits'); if (_tu) _tu.addEventListener('click', () => setMetric('units'));
  const _ts = document.getElementById('tSft');   if (_ts) _ts.addEventListener('click', () => setMetric('sft'));

  // ---------- OC detail table ----------
  const ocTblState = { search: '' };
  function renderOcTable(){
    const tb = document.querySelector('#ocTable tbody');
    if (!tb) return;
    const qColors = { Q1: 'var(--info)', Q2: 'var(--teal)', Q3: 'var(--violet)', Q4: 'var(--accent)' };
    const rows = ocList.filter(o => {
      if (!ocTblState.search) return true;
      const hay = (o.proj+' '+(o.wing||'')+' '+o.city+' '+o.m+' '+o.q).toLowerCase();
      return hay.includes(ocTblState.search);
    });
    const totU = rows.reduce((s,o)=>s+o.u,0);
    const totSba = rows.reduce((s,o)=>s+o.sba,0);
    const projCount = new Set(rows.map(o=>o.proj)).size;
    let html = `<tr class="total"><td class="l">FY27 Grand Total</td>
      <td class="l">${projCount} projects · ${rows.length} wings</td>
      <td class="l">PAN India</td>
      <td class="l">—</td>
      <td class="l">—</td>
      <td>${fmt(totU)}</td>
      <td>${fmtSft(totSba)}</td>
    </tr>`;
    rows.forEach(o => {
      html += `<tr>
        <td class="l dim">${o.idx}</td>
        <td class="l">${o.proj}${o.wing ? ' · <span class="dim">'+o.wing+'</span>' : ''}</td>
        <td class="l">${o.city}</td>
        <td class="l">${o.m}</td>
        <td class="l"><span class="chip" style="background:${qColors[o.q]}; color: var(--paper); border:0">${o.q}</span></td>
        <td>${fmt(o.u)}</td>
        <td>${fmtSft(o.sba)}</td>
      </tr>`;
    });
    if (!rows.length) html = `<tr><td colspan="7" class="l dim" style="padding: 24px; text-align:center;">No wings match current filter</td></tr>`;
    tb.innerHTML = html;
  }
  document.getElementById('ocTblSearch') && document.getElementById('ocTblSearch').addEventListener('input', e => {
    ocTblState.search = e.target.value.toLowerCase();
    renderOcTable();
  });

  // ============== OC CALENDAR (Annexure 1c) ==============
  const ocState = { search: '', sortKey: 'idx', sortDir: 1 };

  function lagOf(o){
    if (!o.wt) return null;
    const a = monthOrder.indexOf(monthOf(o.wt.date));
    const b = monthOrder.indexOf(o.m);
    return (a<0||b<0) ? null : (b - a);
  }

  // dual heat strip — WT (top) vs OC (bottom)
  function renderDual(){
    const svg = document.getElementById('dualChart');
    const W=1100, H=320, padL=20, padR=20, padT=30, padB=40, gap=10;
    const wRow = (H - padT - padB - gap)/2;
    const cellW = (W - padL - padR) / monthOrder.length;
    const wtRows = monthOrder.map(m => {
      const list = wings.filter(w => monthOf(w.date) === m);
      return { m, list, count:list.length, u:list.reduce((s,w)=>s+w.u,0), sba:list.reduce((s,w)=>s+w.sba,0) };
    });
    const ocRows = monthOrder.map(m => {
      const list = ocList.filter(o => o.m === m);
      return { m, list, count:list.length, u:list.reduce((s,o)=>s+o.u,0), sba:list.reduce((s,o)=>s+o.sba,0) };
    });
    const isUnits = state.metric==='units';
    const wtMax = Math.max(...wtRows.map(d => isUnits?d.u:d.sba));
    const ocMax = Math.max(...ocRows.map(d => isUnits?d.u:d.sba));
    const fmtV = v => isUnits ? fmt(v) : (v>=1e6?(v/1e6).toFixed(2)+'M':fmt(Math.round(v/1e3))+'k');

    let s = '';
    // labels
    s += `<text x="${padL+4}" y="${padT-6}" font-family="Manrope" font-weight="700" font-size="9" letter-spacing="0.18em" fill="var(--accent)">WALKTHROUGH</text>`;
    s += `<text x="${padL+4}" y="${padT+wRow+gap-6}" font-family="Manrope" font-weight="700" font-size="9" letter-spacing="0.18em" fill="var(--violet)">OC HANDOVER</text>`;

    function band(rows, max, color, yTop, isOc){
      let str='';
      rows.forEach((d,i)=>{
        const v = isUnits?d.u:d.sba;
        const intensity = max ? v/max : 0;
        const x0 = padL + i*cellW + 4;
        const w0 = cellW - 8;
        str += `<rect x="${x0}" y="${yTop}" width="${w0}" height="${wRow}" fill="var(--paper-2)"/>`;
        if (v>0){
          str += `<rect x="${x0}" y="${yTop}" width="${w0}" height="${wRow}" fill="${color}" opacity="${0.15+intensity*0.85}"/>`;
          const txtColor = intensity>0.45?'var(--paper)':'var(--ink)';
          str += `<text x="${x0+w0/2}" y="${yTop+wRow/2-2}" text-anchor="middle" font-family="DM Serif Display" font-size="18" fill="${txtColor}">${fmtV(v)}</text>`;
          str += `<text x="${x0+w0/2}" y="${yTop+wRow/2+14}" text-anchor="middle" font-size="9" fill="${txtColor}" opacity="0.8">${d.count} wing${d.count===1?'':'s'}</text>`;
        } else {
          str += `<text x="${x0+w0/2}" y="${yTop+wRow/2+4}" text-anchor="middle" font-size="10" fill="var(--ink-4)">—</text>`;
        }
        const items = d.list.map(x => `<div class="tt-r"><span class="lab">${x.proj} ${x.wing||''}</span><span class="val">${fmt(x.u)}u</span></div>`).join('');
        str += `<rect class="hover-target" x="${padL+i*cellW}" y="${yTop}" width="${cellW}" height="${wRow}"
                 data-m="${d.m}" data-c="${d.count}" data-u="${d.u}" data-sba="${d.sba}" data-kind="${isOc?'OC':'WT'}" data-items='${encodeURIComponent(items).replace(/'/g, '%27')}'/>`;
      });
      return str;
    }
    s += band(wtRows, wtMax, 'var(--accent)', padT, false);
    s += band(ocRows, ocMax, 'var(--violet)', padT+wRow+gap, true);
    // month labels
    monthOrder.forEach((m,i)=>{
      const x0 = padL + i*cellW + cellW/2;
      s += `<text x="${x0}" y="${H-padB+20}" text-anchor="middle" font-family="Manrope" font-weight="600" font-size="10" fill="var(--ink-2)">${m}</text>`;
      const q = (i<3?'Q1':i<6?'Q2':i<9?'Q3':'Q4');
      if (i===0||i===3||i===6||i===9){
        s += `<text x="${padL+i*cellW+4}" y="${20}" text-anchor="start" font-size="9" letter-spacing="0.2em" font-weight="700" fill="var(--accent)">${q} →</text>`;
      }
    });
    svg.innerHTML = s;
    svg.querySelectorAll('.hover-target').forEach(el=>{
      el.addEventListener('mousemove', e=>{
        const d = el.dataset;
        const items = d.items?decodeURIComponent(d.items):'';
        showTip(`<div class="tt-t">${d.kind} · ${d.m} · ${d.c} wing${d.c==='1'?'':'s'}</div>
          <div class="tt-r"><span class="lab">Units</span><span class="val">${fmt(+d.u)}</span></div>
          <div class="tt-r"><span class="lab">SBA</span><span class="val">${fmt(+d.sba)} sft</span></div>
          ${items}`, e);
      });
      el.addEventListener('mouseleave', hideTip);
    });
  }

  // lag distribution histogram
  function renderLag(){
    const svg = document.getElementById('lagChart');
    const W=460, H=320, padL=44, padR=20, padT=20, padB=40;
    const matched = ocList.filter(o => o.wt);
    const buckets = [0,1,2,3,4,5];
    const counts = buckets.map(b => matched.filter(o => lagOf(o) === b).length);
    const totalLag = matched.reduce((s,o)=>s+lagOf(o),0);
    const avg = (totalLag/matched.length);
    const lagAvgEl = document.getElementById('ocAvgLag');
    if (lagAvgEl) lagAvgEl.innerHTML = `${avg.toFixed(1)}<span class="unit"> mo</span>`;
    const max = Math.max(...counts) * 1.2;
    const bw = (W - padL - padR) / buckets.length;
    let s = '';
    for (let i=0;i<=4;i++){
      const v = max * i/4;
      const py = H - padB - (v/max)*(H-padT-padB);
      s += `<line x1="${padL}" x2="${W-padR}" y1="${py}" y2="${py}" stroke="var(--rule-soft)" stroke-dasharray="2 3"/>`;
      s += `<text x="${padL-8}" y="${py+3}" text-anchor="end" font-size="9" fill="var(--ink-3)">${Math.round(v)}</text>`;
    }
    counts.forEach((c,i)=>{
      const h = max ? (c/max)*(H-padT-padB) : 0;
      const x0 = padL + i*bw + bw*0.18;
      const w0 = bw*0.64;
      const y0 = H - padB - h;
      s += `<rect x="${x0}" y="${y0}" width="${w0}" height="${h}" fill="var(--violet)" opacity="0.85"/>`;
      if (c>0){
        s += `<text x="${x0+w0/2}" y="${y0-6}" text-anchor="middle" fill="var(--ink)" font-weight="700" font-size="13">${c}</text>`;
      }
      s += `<text x="${x0+w0/2}" y="${H-padB+16}" text-anchor="middle" fill="var(--ink-2)" font-weight="600" font-size="10">${buckets[i]} mo</text>`;
    });
    // avg line
    const avgX = padL + (avg + 0.5)*bw;
    s += `<line x1="${avgX}" x2="${avgX}" y1="${padT}" y2="${H-padB}" stroke="var(--accent)" stroke-width="1.5" stroke-dasharray="4 3"/>`;
    s += `<text x="${avgX+6}" y="${padT+12}" font-family="JetBrains Mono" font-size="10" fill="var(--accent)" font-weight="600">avg ${avg.toFixed(1)} mo</text>`;
    svg.innerHTML = s;
  }

  function renderOcCityTable(){
    const tb = document.querySelector('#ocCityTable tbody');
    if (!tb) return;
    const cityOrder = ['Bangalore','Gurgaon','Cochin','Thrissur','Trivandrum','Chennai','Hyderabad','Pune','Calicut'];
    const grp = {};
    ocList.forEach(o => {
      if (!grp[o.city]) grp[o.city] = {city:o.city, wings:0, u:0, sba:0, only:0, monthIdx:[]};
      grp[o.city].wings++;
      grp[o.city].u += o.u;
      grp[o.city].sba += o.sba;
      if (!o.wt) grp[o.city].only++;
      grp[o.city].monthIdx.push(monthOrder.indexOf(o.m));
    });
    const list = Object.values(grp).sort((a,b)=>{
      const ai = cityOrder.indexOf(a.city), bi = cityOrder.indexOf(b.city);
      return (ai<0?99:ai) - (bi<0?99:bi);
    });
    let html = '';
    const totU = list.reduce((s,r)=>s+r.u,0);
    const totSba = list.reduce((s,r)=>s+r.sba,0);
    const totOnly = list.reduce((s,r)=>s+r.only,0);
    const totWings = list.reduce((s,r)=>s+r.wings,0);
    html += `<tr class="total"><td class="l">Pan-India</td><td>${totWings}</td><td>${fmt(totU)}</td><td>${fmt(totSba)}</td><td>${totOnly}</td><td class="l dim">Apr-26 → Mar-27</td></tr>`;
    list.forEach(r=>{
      const minI = Math.min(...r.monthIdx), maxI = Math.max(...r.monthIdx);
      const range = minI===maxI ? monthOrder[minI] : `${monthOrder[minI]} → ${monthOrder[maxI]}`;
      const onlyChip = r.only>0 ? `<span class="chip" style="background: rgba(122,90,210,0.18); color: var(--violet); border:0">${r.only}</span>` : `<span class="dim">—</span>`;
      html += `<tr>
        <td class="l">${r.city}</td>
        <td>${r.wings}</td>
        <td>${fmt(r.u)}</td>
        <td>${fmt(r.sba)}</td>
        <td>${onlyChip}</td>
        <td class="l dim" style="font-size:10px">${range}</td>
      </tr>`;
    });
    tb.innerHTML = html;
  }

  function renderOcMatrix(){
    let items = ocList.map(o => ({ proj:o.proj, city:o.city, m:o.m, u:o.u, sba:o.sba, wing:o.wing, date:o.m }));
    if (state.ocQ !== 'all') items = items.filter(it => qOfMonth(it.m) === state.ocQ);
    if (state.ocMonth !== 'all') items = items.filter(it => it.m === state.ocMonth);
    renderCalendarMatrix({ hostId:'ocMatrix', items, search:ocState.search, accentRgb:'122,90,210', cellClass:'oc-cell' });
  }
  document.getElementById('ocMonth') && document.getElementById('ocMonth').addEventListener('change', e => {
    state.ocMonth = e.target.value;
    renderOcMatrix();
  });
  document.getElementById('famMonth') && document.getElementById('famMonth').addEventListener('change', e => {
    state.famMonth = e.target.value;
    renderFamilyTable();
  });

  document.getElementById('ocSearch').addEventListener('input', e => {
    ocState.search = e.target.value.toLowerCase();
    renderOcMatrix();
  });

  // hook OC dual-strip into existing metric toggle (no-op if removed)
  const _tu2 = document.getElementById('tUnits'); if (_tu2) _tu2.addEventListener('click', () => { if (typeof renderDual==='function' && document.getElementById('dualChart')) renderDual(); });
  const _ts2 = document.getElementById('tSft');   if (_ts2) _ts2.addEventListener('click',  () => { if (typeof renderDual==='function' && document.getElementById('dualChart')) renderDual(); });

  // ---------- Init ----------
  renderCityBar();
  renderMonth();
  renderCityTable();
  renderWtTable();
  renderOcTable();
  renderFamilyTable();
  renderQTimeline();
  if (document.getElementById('dualChart')) renderDual();
  renderOcCityTable();
  renderOcMatrix();
})();
