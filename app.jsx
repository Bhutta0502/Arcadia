// Arcadia Ground Floor Dashboard

const { useState, useMemo, useEffect, useRef } = React;

// --- Data --------------------------------------------------------------
const STATUS = {
  leased: { label: 'Leased', dot: '●' },
  discussion: { label: 'Under Discussion', dot: '◐' },
  available: { label: 'Available', dot: '○' }
};

// Floor plan image dimensions (the cropped PNG)
const PLAN_W = 740;
const PLAN_H = 812;

const SHOPS = [
{
  id: 'S1', label: 'Shop 1', display: '1', badge: 'minimal-line', labelDX: -8, labelDY: -12,
  carpet: 369.64, sba: 835.27,
  status: 'discussion', brand: 'Alive Wellness',
  target: { totPerSft: 314.27, total: 262500, revPerSft: 271.53, revenue: 226800, camPerSft: 42.74, cam: 35700 },
  actual: null,
  // polygon in image coordinates (0..680, 0..720)
  poly: '80,92 173,91 173,201 159,201 159,209 137,209 123,209 123,150 80,150'
},
{
  id: 'S2', label: 'Shop 2', display: '2', badge: 'minimal-line',
  carpet: 648.89, sba: 1498.98,
  status: 'leased', brand: 'Toni & Guy',
  target: { totPerSft: 190.00, total: 284806, revPerSft: 160.00, revenue: 239837, camPerSft: 30.00, cam: 44969 },
  actual: { totPerSft: 190.00, total: 284806, revPerSft: 160.00, revenue: 239837, camPerSft: 30.00, cam: 44969 },
  poly: '370,439 378,439 378,432 418,432 418,441 430,441 431,435 517,435 517,431 550,431 510,529 505,527 501,535 436,535 436,516 423,516 423,527 370,526'
},
{
  id: 'S3', label: 'Shop 3', display: '3', badge: 'minimal-line',
  carpet: 585.21, sba: 1270.00,
  status: 'leased', brand: 'Kinya Coffee',
  target: { totPerSft: 198.70, total: 252350, revPerSft: 168.70, revenue: 214250, camPerSft: 30.00, cam: 38100 },
  actual: { totPerSft: 198.70, total: 252350, revPerSft: 168.70, revenue: 214250, camPerSft: 30.00, cam: 38100 },
  poly: '379,538 506,539 453,663 441,663 441,670 378,670 378,663 371,663 370,610 378,610 378,586 370,586 370,549 379,549'
},
{
  id: 'S4', label: 'Shop 4', display: '4', badge: 'minimal-line',
  carpet: 884.73, sba: 1897.79,
  status: 'leased', brand: 'Kotak Mahindra Bank',
  target: { totPerSft: 192.57, total: 365457, revPerSft: 162.22, revenue: 307857, camPerSft: 30.35, cam: 57600 },
  actual: { totPerSft: 192.57, total: 365457, revPerSft: 162.22, revenue: 307857, camPerSft: 30.35, cam: 57600 },
  poly: '40,569 40,539 173,539 173,551 181,551 181,587 163,587 163,604 173,604 173,611 179,612 179,663 172,663 172,671 117,671 117,663 102,663 102,671 22,671 21,664 12,663 12,569'
},
{
  id: 'S5', label: 'Shop 5', display: '5', badge: 'minimal-line',
  carpet: 638.28, sba: 1458.34,
  status: 'discussion', brand: 'Bata',
  target: { totPerSft: 272.88, total: 397950, revPerSft: 235.77, revenue: 343829, camPerSft: 37.11, cam: 54121 },
  actual: null,
  poly: '39,441 46,441 46,426 139,426 141,418 172,418 172,441 181,441 181,526 172,526 172,535 116,535 116,529 91,529 91,535 69,535 69,523 56,523 56,529 46,529 46,521 39,521'
},
{
  id: 'G1', label: 'G1', display: 'G1', badge: 'minimal-line',
  carpet: 134.24, sba: 590.07,
  status: 'leased', brand: 'The Chatpata Affair',
  target: { totPerSft: 222.43, total: 131250, revPerSft: 192.18, revenue: 113400, camPerSft: 30.25, cam: 17850 },
  actual: { totPerSft: 222.43, total: 131250, revPerSft: 176.25, revenue: 104000, camPerSft: 46.18, cam: 27250 },
  poly: '139,338 172,338 172,349 179,349 179,415 139,416'
},
{
  id: 'G2', label: 'G2', display: 'G2', badge: 'minimal-line',
  carpet: 127.24, sba: 589.65,
  status: 'available', brand: null,
  target: { totPerSft: 222.59, total: 131250, revPerSft: 192.32, revenue: 113400, camPerSft: 30.27, cam: 17850 },
  actual: null,
  poly: '139,257 173,257 173,279 179,279 179,325 172,325 172,334 139,334'
},
{
  id: 'G3', label: 'G3', display: 'G3', badge: 'minimal-line',
  carpet: 254.76, sba: 1149.21,
  status: 'leased', brand: 'Share Tea',
  target: { totPerSft: 187.30, total: 215250, revPerSft: 161.83, revenue: 185976, camPerSft: 25.47, cam: 29274 },
  actual: { totPerSft: 178.38, total: 205000, revPerSft: 139.23, revenue: 160000, camPerSft: 39.16, cam: 45000 },
  poly: '291,51 331,51 331,72 341,72 341,51 358,51 358,147 302,147 302,122 291,122'
},
{
  id: 'G4', label: 'G4', display: 'G4', badge: 'minimal-line',
  carpet: 243.38, sba: 1133.07,
  status: 'available', brand: null,
  target: { totPerSft: 189.97, total: 215250, revPerSft: 164.13, revenue: 185976, camPerSft: 25.84, cam: 29274 },
  actual: null,
  poly: '362,51 382,52 382,58 423,58 423,72 429,72 429,105 384,105 384,113 429,113 429,147 362,147'
},
{
  id: 'G5', label: 'G5', display: 'G5', badge: 'minimal-line',
  carpet: 272.18, sba: 1153.42,
  status: 'available', brand: null,
  target: { totPerSft: 195.72, total: 225750, revPerSft: 169.10, revenue: 195048, camPerSft: 26.62, cam: 30702 },
  actual: null,
  poly: '434,52 498,52 498,147 433,147 433,72 434,72'
},
{
  id: 'G6', label: 'G6', display: 'G6', badge: 'minimal-line',
  carpet: 275.98, sba: 1272.07,
  status: 'available', brand: null,
  target: { totPerSft: 210.48, total: 267750, revPerSft: 181.86, revenue: 231336, camPerSft: 28.63, cam: 36414 },
  actual: null,
  // G6 has a slanted right edge following the outer wall
  poly: '421,256 516,256 516,324 421,324'
},
{
  id: 'KIOSK', label: 'Kiosk', display: 'K', badge: 'minimal-line',
  carpet: 127.28, sba: 492.14,
  status: 'available', brand: null,
  target: { totPerSft: 394.70, total: 194250, revPerSft: 341.02, revenue: 167832, camPerSft: 53.68, cam: 26418 },
  actual: null,
  poly: '258,497 275,497 293,497 293,584 259,584'
}];


// --- helpers -----------------------------------------------------------
const fmtNum = (n, d = 2) => n == null ? '—' : n.toLocaleString('en-IN', { minimumFractionDigits: d, maximumFractionDigits: d });
const fmt0 = (n) => n == null ? '—' : Math.round(n).toLocaleString('en-IN');

// Compute polygon centroid (area-weighted via shoelace, falls inside concave shapes like L)
function polyCentroid(pointsStr) {
  const pts = pointsStr.split(' ').map((p) => p.split(',').map(Number));
  let area = 0,cx = 0,cy = 0;
  for (let i = 0; i < pts.length; i++) {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[(i + 1) % pts.length];
    const cross = x0 * y1 - x1 * y0;
    area += cross;
    cx += (x0 + x1) * cross;
    cy += (y0 + y1) * cross;
  }
  area *= 0.5;
  if (Math.abs(area) < 1e-6) {
    // Degenerate — fall back to bbox center
    const xs = pts.map((p) => p[0]);
    const ys = pts.map((p) => p[1]);
    return { cx: (Math.min(...xs) + Math.max(...xs)) / 2, cy: (Math.min(...ys) + Math.max(...ys)) / 2 };
  }
  return { cx: cx / (6 * area), cy: cy / (6 * area) };
}

// --- Components --------------------------------------------------------

function StatusPill({ status }) {
  const meta = STATUS[status];
  return (
    <span className={`status-pill ${status}`}>
      <span className="dot"></span>
      {meta.label}
    </span>);

}

function FloorPlan({ shops, selectedId, onSelect, filterStatus, hoveredId, setHoveredId, editMode, editAll, polyOverrides, setPolyOverrides, drawTarget, drawPts, setDrawPts, xform, displayStyle }) {
  const svgRef = React.useRef(null);
  const [drag, setDrag] = React.useState(null); // {shopId, idx}
  const [moveDrag, setMoveDrag] = React.useState(null); // {shopId, start:{x,y}, basePts:[[x,y]...]}
  const [scaleDrag, setScaleDrag] = React.useState(null); // {shopId, corner, basePts, bbox, anchor}
  const [cursor, setCursor] = React.useState(null); // {x, y} in svg coords

  function svgPt(e) {
    const svg = svgRef.current;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;pt.y = e.clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return { x: 0, y: 0 };
    const inv = ctm.inverse();
    const p = pt.matrixTransform(inv);
    return { x: Math.round(p.x), y: Math.round(p.y) };
  }
  function polyArr(s) {
    const src = polyOverrides[s.id] || s.poly;
    return src.split(' ').map((p) => p.split(',').map(Number));
  }
  function writePoly(shopId, arr) {
    setPolyOverrides((o) => ({ ...o, [shopId]: arr.map((p) => p.join(',')).join(' ') }));
  }
  function onHandleDown(shopId, i, e) {
    e.stopPropagation();e.preventDefault();
    setDrag({ shopId, idx: i });
  }
  function onMidpointDown(s, i, e) {
    e.stopPropagation();e.preventDefault();
    const { x, y } = svgPt(e);
    const arr = polyArr(s);
    arr.splice(i + 1, 0, [x, y]);
    writePoly(s.id, arr);
    setDrag({ shopId: s.id, idx: i + 1 });
  }
  function onMove(e) {
    const p = svgPt(e);
    setCursor(p);
    if (drag) {
      const s = shops.find((sh) => sh.id === drag.shopId);
      if (!s) return;
      const arr = polyArr(s);
      arr[drag.idx] = [p.x, p.y];
      writePoly(drag.shopId, arr);
      return;
    }
    if (moveDrag) {
      const dx = p.x - moveDrag.start.x;
      const dy = p.y - moveDrag.start.y;
      const arr = moveDrag.basePts.map(([x, y]) => [Math.round(x + dx), Math.round(y + dy)]);
      writePoly(moveDrag.shopId, arr);
      return;
    }
    if (scaleDrag) {
      const { basePts, bbox, anchor, axis } = scaleDrag;
      const ax = anchor.x,ay = anchor.y;
      const baseW = Math.max(1, Math.abs(bbox.maxX - bbox.minX));
      const baseH = Math.max(1, Math.abs(bbox.maxY - bbox.minY));
      const dirX = scaleDrag.signX || 0;
      const dirY = scaleDrag.signY || 0;
      const sx = dirX ? (p.x - ax) * dirX / baseW : 1;
      const sy = dirY ? (p.y - ay) * dirY / baseH : 1;
      let kx = sx,ky = sy;
      if (axis === 'h') ky = 1;else
      if (axis === 'v') kx = 1;else
      if (axis === 'd') {const k = (sx + sy) / 2;kx = k;ky = k;}
      if (!isFinite(kx) || Math.abs(kx) < 0.05) kx = 0.05 * Math.sign(kx || 1);
      if (!isFinite(ky) || Math.abs(ky) < 0.05) ky = 0.05 * Math.sign(ky || 1);
      const arr = basePts.map(([x, y]) => [
      Math.round(ax + (x - ax) * kx),
      Math.round(ay + (y - ay) * ky)]
      );
      writePoly(scaleDrag.shopId, arr);
      return;
    }
  }
  function onUp() {setDrag(null);setMoveDrag(null);setScaleDrag(null);}
  function onLeave() {setDrag(null);setMoveDrag(null);setScaleDrag(null);setCursor(null);}

  function startMove(s, e) {
    e.stopPropagation();e.preventDefault();
    const start = svgPt(e);
    setMoveDrag({ shopId: s.id, start, basePts: polyArr(s) });
  }
  function startScale(s, corner, e) {
    e.stopPropagation();e.preventDefault();
    const pts = polyArr(s);
    const xs = pts.map((p) => p[0]),ys = pts.map((p) => p[1]);
    const bbox = { minX: Math.min(...xs), minY: Math.min(...ys), maxX: Math.max(...xs), maxY: Math.max(...ys) };
    // axis: 'd' = diagonal (corners), 'h' = horizontal-only (e/w edges), 'v' = vertical-only (n/s edges)
    const hasE = corner.includes('e'),hasW = corner.includes('w');
    const hasN = corner.includes('n'),hasS = corner.includes('s');
    let axis = 'd';
    if ((hasE || hasW) && !(hasN || hasS)) axis = 'h';else
    if ((hasN || hasS) && !(hasE || hasW)) axis = 'v';
    const anchor = {
      x: hasE ? bbox.minX : hasW ? bbox.maxX : (bbox.minX + bbox.maxX) / 2,
      y: hasS ? bbox.minY : hasN ? bbox.maxY : (bbox.minY + bbox.maxY) / 2
    };
    const signX = hasE ? 1 : hasW ? -1 : 0;
    const signY = hasS ? 1 : hasN ? -1 : 0;
    setScaleDrag({ shopId: s.id, corner, basePts: pts, bbox, anchor, signX, signY, axis });
  }
  function delVertex(s, i, e) {
    e.stopPropagation();e.preventDefault();
    const arr = polyArr(s);
    if (arr.length <= 3) return;
    arr.splice(i, 1);
    writePoly(s.id, arr);
  }

  const editingAny = !!editAll || editMode;
  const drawing = !!drawTarget;
  return (
    <div className="plan-canvas">
      <img src="assets/floor_plan_gf.png" alt="Arcadia Ground Floor" className="plan-image" draggable="false" />
      <svg
        ref={svgRef}
        className="plan-overlay"
        viewBox={`0 0 ${PLAN_W} ${PLAN_H}`}
        preserveAspectRatio="xMidYMid meet"
        onMouseMove={onMove}
        onMouseUp={onUp}
        onMouseLeave={onLeave}
        onClick={(e) => {
          if (!drawing) return;
          const p = svgPt(e);
          setDrawPts((pts) => [...pts, [p.x, p.y]]);
        }}
        style={{ cursor: drawing ? 'crosshair' : 'default' }}>
        
        {shops.map((s, idx) => {
          const isSel = selectedId === s.id;
          const isHover = hoveredId === s.id;
          const isDim = filterStatus && s.status !== filterStatus;
          const isSpot = !!filterStatus && s.status === filterStatus && !selectedId;
          const cls = `shop ${s.status}${isSel ? ' selected' : ''}${isSpot ? ' selected spotlight' : ''}${isDim ? ' dimmed' : ''}${isHover ? ' hover' : ''}`;
          const livePoly = s.poly;
          const { cx, cy } = polyCentroid(livePoly);
          const showHandles = editAll || isSel && editMode;
          const pts = showHandles ? polyArr(s) : null;
          const showVertex = showHandles && (editAll || xform === 'vertex');
          const showScale = isSel && editMode && xform === 'scale';
          // In scale mode, dragging inside polygon body translates whole polygon
          const showMove = isSel && editMode && (xform === 'move' || xform === 'scale');
          let sbb = null;
          if (showScale && pts) {
            const xs = pts.map((p) => p[0]),ys = pts.map((p) => p[1]);
            sbb = { minX: Math.min(...xs), minY: Math.min(...ys), maxX: Math.max(...xs), maxY: Math.max(...ys) };
          }
          const ANIM_MAP = { S1: 1, S2: 1, S3: 1, S4: 1, S5: 1, G1: 1, G2: 1, G3: 1, G4: 1, G5: 1, G6: 1, KIOSK: 1 };
          // Light polygon tint, always visible (combined with tinted-badge for finalized look)
          const tintedPoly = displayStyle === 'tinted-badge' && !showHandles && !isSel;
          const animVariant = ANIM_MAP[s.id] ?? 0;
          // Extrusion side-shadow disabled per user request
          const extrudeLayers = [];
          return (
            <g
              key={s.id}
              data-anim={animVariant}
              className={cls}
              onClick={(e) => {if (!editingAny && !drawing) {e.stopPropagation();onSelect(s.id);}}}
              data-shop={s.id}
              onMouseEnter={() => setHoveredId(s.id)}
              onMouseLeave={() => setHoveredId(null)}>
              
              {isSel &&
              <g className="extrude-layer">{extrudeLayers}</g>
              }
              <polygon
                points={livePoly}
                className="shop-hotspot"
                style={
                showHandles ?
                { cursor: showMove ? 'move' : 'default', pointerEvents: 'all', fill: 'rgba(193,144,63,0.10)', stroke: '#c1903f', strokeWidth: 0.8, strokeDasharray: '3 2' } :
                tintedPoly ?
                { fill: `var(--${s.status})`, fillOpacity: 0.18, stroke: `var(--${s.status}-hi)`, strokeWidth: 0.4, strokeOpacity: 0.35 } :
                undefined
                }
                onMouseDown={showMove ? (e) => startMove(s, e) : undefined} />
              {!editingAny &&
              <g className="shop-badge">
                  <ShopBadge shop={s} cx={cx + (s.labelDX || 0)} cy={cy + (s.labelDY || 0)} displayStyle={displayStyle} />
                </g>
              }
              {showScale && sbb &&
              <g className="scale-layer">
                  <rect x={sbb.minX} y={sbb.minY} width={sbb.maxX - sbb.minX} height={sbb.maxY - sbb.minY} fill="none" stroke="#c1903f" strokeWidth="0.6" strokeDasharray="3 2" />
                  {[
                ['nw', sbb.minX, sbb.minY, 'nwse-resize'],
                ['ne', sbb.maxX, sbb.minY, 'nesw-resize'],
                ['sw', sbb.minX, sbb.maxY, 'nesw-resize'],
                ['se', sbb.maxX, sbb.maxY, 'nwse-resize'],
                ['n', (sbb.minX + sbb.maxX) / 2, sbb.minY, 'ns-resize'],
                ['s', (sbb.minX + sbb.maxX) / 2, sbb.maxY, 'ns-resize'],
                ['e', sbb.maxX, (sbb.minY + sbb.maxY) / 2, 'ew-resize'],
                ['w', sbb.minX, (sbb.minY + sbb.maxY) / 2, 'ew-resize']].
                map(([corner, x, y, cur]) =>
                <rect key={corner} x={x - 3} y={y - 3} width="6" height="6" fill="#fcfaf4" stroke="#c1903f" strokeWidth="1" style={{ cursor: cur }} onMouseDown={(e) => startScale(s, corner, e)} />
                )}
                </g>
              }
              {showVertex && pts &&
              <g className="vertex-layer">
                  {pts.map((p, i) => {
                  const next = pts[(i + 1) % pts.length];
                  const mx = (p[0] + next[0]) / 2;
                  const my = (p[1] + next[1]) / 2;
                  const isDragging = drag && drag.shopId === s.id && drag.idx === i;
                  return (
                    <g key={i}>
                        <circle cx={mx} cy={my} r="1.4" className="midpoint" onMouseDown={(e) => onMidpointDown(s, i, e)} />
                        <circle
                        cx={p[0]} cy={p[1]} r="2"
                        className={`vertex${isDragging ? ' dragging' : ''}`}
                        onMouseDown={(e) => onHandleDown(s.id, i, e)}
                        onContextMenu={(e) => delVertex(s, i, e)} />
                      
                      </g>);

                })}
                </g>
              }
            </g>);

        })}
        {drawing &&
        <g className="draw-layer" pointerEvents="none">
            {drawPts.length > 0 &&
          <>
                <polyline
              points={[...drawPts, cursor ? [cursor.x, cursor.y] : null].filter(Boolean).map((p) => p.join(',')).join(' ')}
              fill="none" stroke="#c1903f" strokeWidth="1" strokeDasharray="3 2" />
            
                {drawPts.length >= 2 && cursor &&
            <line x1={cursor.x} y1={cursor.y} x2={drawPts[0][0]} y2={drawPts[0][1]} stroke="#c1903f" strokeWidth="0.5" strokeDasharray="1 2" opacity="0.5" />
            }
                {drawPts.map((p, i) =>
            <circle key={i} cx={p[0]} cy={p[1]} r="3" fill="#fcfaf4" stroke="#c1903f" strokeWidth="1.2" />
            )}
              </>
          }
          </g>
        }
        {editingAny && cursor &&
        <g className="edit-cursor" pointerEvents="none">
            <line x1={cursor.x} y1="0" x2={cursor.x} y2={PLAN_H} stroke="#221f1c" strokeWidth="0.4" strokeDasharray="2 2" opacity="0.45" />
            <line x1="0" y1={cursor.y} x2={PLAN_W} y2={cursor.y} stroke="#221f1c" strokeWidth="0.4" strokeDasharray="2 2" opacity="0.45" />
            <circle cx={cursor.x} cy={cursor.y} r="5" fill="none" stroke="#c1903f" strokeWidth="1" />
            <circle cx={cursor.x} cy={cursor.y} r="1" fill="#c1903f" />
          </g>
        }
      </svg>
    </div>);

}

function RateRow({ label, perSft, total, mode }) {
  return (
    <tr>
      <td>{label}</td>
      <td className="num">{perSft == null ? '—' : fmtNum(perSft, 2)}</td>
      <td className="num">₹{fmt0(total)}</td>
    </tr>);

}

function SidePanel({ shop, onClose }) {
  const [mode, setMode] = useState('target');
  const panelRef = useRef(null);
  useEffect(() => {if (shop && shop.status !== 'leased') setMode('target');}, [shop?.id]);
  useEffect(() => {if (panelRef.current) panelRef.current.scrollTop = 0;}, [shop?.id]);

  if (!shop) {
    return (
      <aside className="panel" ref={panelRef}>
        <div className="panel-placeholder">
          <div className="icon">⌂</div>
          <div className="ph-title">Select a shop</div>
          <div className="ph-sub">Click any unit on the floor plan</div>
        </div>
      </aside>);

  }

  const r = mode === 'actual' && shop.actual ? shop.actual : shop.target;
  const hasActual = !!shop.actual;

  return (
    <aside className="panel open" ref={panelRef}>
      <div className="panel-head">
        <div className="panel-eyebrow">
          <span className="key">{shop.id} · Ground Floor</span>
          <button className="panel-close" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <h2 className="panel-title">{shop.display}</h2>
        <div className={`panel-brand ${!shop.brand ? 'vacant' : ''}`}>
          {shop.brand || 'No tenant assigned'}
        </div>
        <StatusPill status={shop.status} />
      </div>

      <div className="panel-section">
        <div className="panel-section-title">Area</div>
        <div className="area-grid">
          <div className="area-cell">
            <div className="label">Carpet Area</div>
            <div className="value">{fmtNum(shop.carpet, 2)}<span className="unit">sft</span></div>
          </div>
          <div className="area-cell">
            <div className="label">SBA</div>
            <div className="value">{fmtNum(shop.sba, 2)}<span className="unit">sft</span></div>
          </div>
        </div>
      </div>

      <div className="panel-section">
        <div className="panel-section-title">
          <span>Rate Card — Monthly</span>
          <span className="rate-toggle">
            <button className={mode === 'target' ? 'active' : ''} onClick={() => setMode('target')}>Target</button>
            <button
              className={mode === 'actual' ? 'active' : ''}
              onClick={() => hasActual && setMode('actual')}
              disabled={!hasActual}
              title={hasActual ? '' : 'No actual rate — not yet leased'}>
              Actual</button>
          </span>
        </div>

        <table className="rate-table">
          <thead>
            <tr>
              <th></th>
              <th>per sft</th>
              <th>total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Revenue</td>
              <td className="num">{fmtNum(r.revPerSft, 2)}</td>
              <td className="num">₹{fmt0(r.revenue)}</td>
            </tr>
            <tr>
              <td>CAM</td>
              <td className="num">{fmtNum(r.camPerSft, 2)}</td>
              <td className="num">₹{fmt0(r.cam)}</td>
            </tr>
            <tr className="total">
              <td>Total</td>
              <td className="num">{fmtNum(r.totPerSft, 2)}</td>
              <td className="num">₹{fmt0(r.total)}</td>
            </tr>
          </tbody>
        </table>

        {hasActual && mode === 'target' &&
        <div className="panel-hint">▸ Switch to <em>Actual</em> to see the realized rate.</div>
        }
        {!hasActual &&
        <div className="panel-hint muted">Not yet leased — actual rates pending finalization.</div>
        }
      </div>

      <div className="panel-section">
        <div className="panel-section-title">Annualized · Target</div>
        <table className="rate-table">
          <tbody>
            <tr>
              <td>Revenue / year</td>
              <td className="num" colSpan="2">₹{fmt0(shop.target.revenue * 12)}</td>
            </tr>
            <tr>
              <td>CAM / year</td>
              <td className="num" colSpan="2">₹{fmt0(shop.target.cam * 12)}</td>
            </tr>
            <tr className="total">
              <td>Total / year</td>
              <td className="num" colSpan="2">₹{fmt0(shop.target.total * 12)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </aside>);

}

function StatusLegend({ shops, activeFilter, onFilter }) {
  const counts = useMemo(() => {
    const c = { leased: 0, discussion: 0, available: 0 };
    shops.forEach((s) => {c[s.status]++;});
    return c;
  }, [shops]);

  const chip = (status) => {
    const isActive = activeFilter === status;
    const dim = activeFilter && !isActive;
    const color = { leased: '#3f6d3a', discussion: '#8a7327', available: '#3e6e9a' }[status];
    return (
      <button
        key={status}
        className={`legend-item ${isActive ? 'active' : ''} ${dim ? 'dim' : ''}`}
        onClick={() => onFilter(isActive ? null : status)}
        title={`Filter by ${STATUS[status].label}`}
        style={{ '--chip-color': color }}>
        <span className="legend-swatch-sq" style={{ background: color }}></span>
        <span className="legend-name">{STATUS[status].label}</span>
        <span className="legend-count">{counts[status]}</span>
      </button>);
  };

  return (
    <div className="status-legend">
      {chip('leased')}
      <span className="legend-sep"></span>
      {chip('discussion')}
      <span className="legend-sep"></span>
      {chip('available')}
    </div>);
}

function ShopDetailsTable({ shops, onShopClick }) {
  const [unit, setUnit] = React.useState('mn'); // 'mn' | 'psft'
  const [period, setPeriod] = React.useState('monthly'); // 'monthly' | 'annual'
  const [query, setQuery] = React.useState('');
  const factor = period === 'annual' ? 12 : 1;

  const sectionRef = React.useRef(null);
  const subbarRef = React.useRef(null);
  const groupRowRef = React.useRef(null);
  const headerRowRef = React.useRef(null);

  React.useLayoutEffect(() => {
    const update = () => {
      if (!sectionRef.current) return;
      const sH = subbarRef.current?.getBoundingClientRect().height ?? 76;
      const gH = groupRowRef.current?.getBoundingClientRect().height ?? 42;
      const hH = headerRowRef.current?.getBoundingClientRect().height ?? 42;
      sectionRef.current.style.setProperty('--subbar-h', sH + 'px');
      sectionRef.current.style.setProperty('--group-h', gH + 'px');
      sectionRef.current.style.setProperty('--header-h', hH + 'px');
    };
    update();
    const ro = new ResizeObserver(update);
    if (subbarRef.current) ro.observe(subbarRef.current);
    if (groupRowRef.current) ro.observe(groupRowRef.current);
    if (headerRowRef.current) ro.observe(headerRowRef.current);
    window.addEventListener('resize', update);
    return () => {ro.disconnect();window.removeEventListener('resize', update);};
  }, [shops, unit, period, query]);

  const filteredShops = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return shops;
    return shops.filter((s) => {
      const type = s.id === 'KIOSK' || s.id.startsWith('K') ? 'kiosk' : s.id.startsWith('G') ? 'food stall' : 'shop';
      return (
        s.display.toLowerCase().includes(q) ||
        (s.brand || '').toLowerCase().includes(q) ||
        type.includes(q) ||
        { leased: 'leased', discussion: 'under discussion', available: 'available' }[s.status].includes(q));

    });
  }, [shops, query]);
  const mn = (v) => v == null ? '—' : (v * factor / 1000000).toFixed(2);
  const ps = (v) => v == null ? '—' : Math.round(v * factor).toLocaleString('en-IN');

  function val(target, kind) {
    if (!target) return '—';
    if (unit === 'mn') {
      const k = { total: 'total', rev: 'revenue', cam: 'cam' }[kind];
      return mn(target[k]);
    }
    const k = { total: 'totPerSft', rev: 'revPerSft', cam: 'camPerSft' }[kind];
    return ps(target[k]);
  }

  const statusLabel = (s) => {
    if (s.brand) return s.brand;
    if (s.status === 'discussion') return 'Under Discussion';
    if (s.status === 'available') return 'Available · No Tenant';
    return '—';
  };

  return (
    <section className="details-section" id="shop-details" ref={sectionRef}>
      <div className="details-header">
        <h2 className="details-title">
          <span className="rule-dash"></span>
          <span className="details-title-main" style={{ color: "rgb(11, 30, 47)" }}>Shop Details</span>
          <span className="details-title-sub">Ground Floor</span>
        </h2>
      </div>
      <div className="details-subbar" ref={subbarRef} style={{ backgroundColor: "rgb(251, 247, 238)" }}>
        <span className="subbar-text" style={{ color: "rgb(11, 30, 47)", fontSize: "17px" }}>{(() => {
            const c = { shop: 0, stall: 0, kiosk: 0 };
            shops.forEach((s) => {
              if (s.id.startsWith('S') && /^S\d/.test(s.id)) c.shop++;else
              if (s.id.startsWith('G')) c.stall++;else
              if (s.id === 'KIOSK' || s.id.startsWith('K')) c.kiosk++;
            });
            const parts = [];
            if (c.shop) parts.push(`${c.shop} Shops`);
            if (c.stall) parts.push(`${c.stall} Food Stalls`);
            if (c.kiosk) parts.push(`${c.kiosk} ${c.kiosk > 1 ? 'Kiosks' : 'Kiosk'}`);
            return parts.join(' + ');
          })()}</span>
        <div className="subbar-toggles">
          <div className="pill-toggle">
            <button className={unit === 'mn' ? 'active' : ''} onClick={() => setUnit('mn')}>₹ Mn</button>
            <button className={unit === 'psft' ? 'active' : ''} onClick={() => setUnit('psft')}>₹ / sft</button>
          </div>
          <div className="pill-toggle">
            <button className={period === 'monthly' ? 'active' : ''} onClick={() => setPeriod('monthly')}>Monthly</button>
            <button className={period === 'annual' ? 'active' : ''} onClick={() => setPeriod('annual')}>Annual</button>
          </div>
          <div className="search-box">
            <input
              type="text"
              placeholder="Search shop, brand or status…"
              value={query}
              onChange={(e) => setQuery(e.target.value)} />
          </div>
        </div>
      </div>
      <div className="details-table-wrap">
        <table className="details-table">
          <thead>
            <tr className="group-row" ref={groupRowRef}>
              <th colSpan="6"></th>
              <th colSpan="3" className="group target">Target</th>
              <th colSpan="3" className="group actual">Actual</th>
            </tr>
            <tr className="header-row" ref={headerRowRef}>
              <th className="th-left">Shop</th>
              <th className="th-left" style={{ fontFamily: "Manrope" }}>Brand</th>
              <th className="th-left">Type</th>
              <th className="th-left">Lease Status</th>
              <th className="num">SBA <span className="unit-tag">sft</span></th>
              <th className="num">Carpet <span className="unit-tag">sft</span></th>
              <th className="num">Revenue</th>
              <th className="num">Rent</th>
              <th className="num">CAM</th>
              <th className="num">Revenue</th>
              <th className="num">Rent</th>
              <th className="num">CAM</th>
            </tr>
          </thead>
          <tbody>
            {(() => {
              // Total row aggregates (from filtered list)
              const totals = {
                sba: 0, carpet: 0,
                tTotal: 0, tRev: 0, tCam: 0,
                aTotal: 0, aRev: 0, aCam: 0,
                aSba: 0
              };
              filteredShops.forEach((s) => {
                totals.sba += s.sba;
                totals.carpet += s.carpet;
                totals.tTotal += s.target.total;
                totals.tRev += s.target.revenue;
                totals.tCam += s.target.cam;
                if (s.actual) {
                  totals.aTotal += s.actual.total;
                  totals.aRev += s.actual.revenue;
                  totals.aCam += s.actual.cam;
                  totals.aSba += s.sba;
                }
              });
              const tCell = (sum) => {
                if (unit === 'mn') return mn(sum);
                return totals.sba ? ps(sum / totals.sba) : '—';
              };
              const aCell = (sum) => {
                if (sum === 0) return '—';
                if (unit === 'mn') return mn(sum);
                return totals.aSba ? ps(sum / totals.aSba) : '—';
              };
              return (
                <tr className="total-row">
                  <td className="shop-col">Total</td>
                  <td className="brand-col">{filteredShops.length} units</td>
                  <td></td>
                  <td></td>
                  <td className="num">{Math.round(totals.sba).toLocaleString('en-IN')}</td>
                  <td className="num">{Math.round(totals.carpet).toLocaleString('en-IN')}</td>
                  <td className="num">{tCell(totals.tTotal)}</td>
                  <td className="num">{tCell(totals.tRev)}</td>
                  <td className="num">{tCell(totals.tCam)}</td>
                  <td className="num">{aCell(totals.aTotal)}</td>
                  <td className="num">{aCell(totals.aRev)}</td>
                  <td className="num">{aCell(totals.aCam)}</td>
                </tr>);

            })()}
            {filteredShops.
            map((s) => {
              const isLeased = s.status === 'leased';
              return (
                <tr key={s.id} className={`row-${s.status}`}>
                  <td className="shop-col cell-clickable" onClick={() => onShopClick?.(s.id)}>{s.display}</td>
                  <td className={`brand-col cell-clickable ${!s.brand ? 'no-tenant' : ''}`} onClick={() => onShopClick?.(s.id)}>{s.brand || '—'}</td>
                  <td className="type-col cell-clickable" onClick={() => onShopClick?.(s.id)}>{(() => {
                      if (s.id === 'KIOSK' || s.id.startsWith('K')) return 'Kiosk';
                      if (s.id.startsWith('G')) return 'Food Stall';
                      return 'Shop';
                    })()}</td>
                  <td className="status-col cell-clickable" onClick={() => onShopClick?.(s.id)}>
                    <span className={`status-tag status-${s.status}`}>{{ leased: 'Leased', discussion: 'Under Discussion', available: 'Available' }[s.status]}</span>
                  </td>
                  <td className="num">{Math.round(s.sba).toLocaleString('en-IN')}</td>
                  <td className="num">{Math.round(s.carpet).toLocaleString('en-IN')}</td>
                  <td className="num">{val(s.target, 'total')}</td>
                  <td className="num">{val(s.target, 'rev')}</td>
                  <td className="num">{val(s.target, 'cam')}</td>
                  <td className="num">{val(s.actual, 'total')}</td>
                  <td className="num">{val(s.actual, 'rev')}</td>
                  <td className="num">{val(s.actual, 'cam')}</td>
                </tr>);

            })}
          </tbody>
        </table>
      </div>
    </section>);

}

function StatsStrip({ shops, withPanel, onFilter, activeFilter }) {
  const stats = useMemo(() => {
    let leasedCount = 0;
    let totalSba = 0,leasedSba = 0;
    let totalCarpet = 0,leasedCarpet = 0;
    let revLeased = 0,revTarget = 0;
    let leasedRevPerMonth = 0,leasedCamPerMonth = 0;
    shops.forEach((s) => {
      totalSba += s.sba;
      totalCarpet += s.carpet;
      revTarget += s.target.total;
      if (s.status === 'leased') {
        leasedCount++;
        leasedSba += s.sba;
        leasedCarpet += s.carpet;
        const a = s.actual ?? s.target;
        revLeased += a.total;
        leasedRevPerMonth += a.revenue;
        leasedCamPerMonth += a.cam;
      }
    });
    const totalCount = shops.length;
    const occupancyPct = totalSba ? leasedSba / totalSba * 100 : 0;
    const leasedTotPerSft = leasedSba ? (leasedRevPerMonth + leasedCamPerMonth) / leasedSba : 0;
    const leasedRevPerSft = leasedSba ? leasedRevPerMonth / leasedSba : 0;
    const leasedCamPerSft = leasedSba ? leasedCamPerMonth / leasedSba : 0;
    return { totalCount, leasedCount, totalSba, leasedSba, totalCarpet, leasedCarpet, revLeased, revTarget, occupancyPct, leasedTotPerSft, leasedRevPerSft, leasedCamPerSft };
  }, [shops]);

  const mn = (n) => (n / 1000000).toFixed(2);

  return (
    <div className={`stats-strip ${withPanel ? 'with-panel' : ''}`}>
      <div className="stat-cell">
        <div className="stat-label">No. of Shops</div>
        <div className="stat-value">{stats.totalCount}</div>
        <div className="stat-sub">{stats.leasedCount} leased · {stats.occupancyPct.toFixed(1)}% occupancy</div>
      </div>
      <div className="stat-cell">
        <div className="stat-label">Total SBA</div>
        <div className="stat-value">{fmt0(stats.totalSba)}<span className="small">sft</span></div>
        <div className="stat-sub">{fmt0(stats.leasedSba)} sft leased</div>
      </div>
      <div className="stat-cell">
        <div className="stat-label">Carpet Area</div>
        <div className="stat-value">{fmt0(stats.totalCarpet)}<span className="small">sft</span></div>
        <div className="stat-sub">{fmt0(stats.leasedCarpet)} sft leased</div>
      </div>
      <div className="stat-cell">
        <div className="stat-label">Target Rev / mo</div>
        <div className="stat-value"><span className="small">₹</span>{mn(stats.revTarget)}<span className="small">Mn</span></div>
        <div className="stat-sub">Annual ₹{mn(stats.revTarget * 12)} Mn</div>
      </div>
      <div className="stat-cell">
        <div className="stat-label">Leased Rev / mo</div>
        <div className="stat-value"><span className="small">₹</span>{mn(stats.revLeased)}<span className="small">Mn</span></div>
        <div className="stat-sub">Annual ₹{mn(stats.revLeased * 12)} Mn</div>
      </div>
      <div className="stat-cell">
        <div className="stat-label">Leased Rev / sft</div>
        <div className="stat-value"><span className="small">₹</span>{stats.leasedTotPerSft.toFixed(0)}<span className="small">/sft</span></div>
        <div className="stat-sub">Rent ₹{stats.leasedRevPerSft.toFixed(0)} + CAM ₹{stats.leasedCamPerSft.toFixed(0)}</div>
      </div>
    </div>);

}

function ShopBadge({ shop, cx, cy, displayStyle }) {
  const t = shop.display;
  // Darker status colors for badge fill (richer than -hi)
  const STATUS_FILL = { leased: '#3f6d3a', discussion: '#8a7327', available: '#3e6e9a' };
  const STATUS_SOFT = { leased: '#d9ebd6', discussion: '#f7e9b5', available: '#cfe0ef' };
  const tintedBadge = displayStyle === 'tinted-badge';
  const ringedBadge = displayStyle === 'ringed';
  const chipFill = tintedBadge ? STATUS_FILL[shop.status] : '#221f1c';
  const chipText = '#fcfaf4';
  const chipRing = STATUS_FILL[shop.status];
  const ink = tintedBadge ? STATUS_FILL[shop.status] : '#221f1c';
  const gold = '#8a7448';
  const paper = tintedBadge ? STATUS_SOFT[shop.status] : '#fcfaf4';
  const shadow = { filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.15))' };
  const ringProps = ringedBadge ? { stroke: chipRing, strokeWidth: 1.5 } : null;

  switch (shop.badge) {
    case 'gold-initial':
      // S1 — large gold serif numeral, no chrome
      return (
        <g transform={`translate(${cx} ${cy})`}>
          <text textAnchor="middle" y="10" fill={gold} fontFamily="'Cormorant Garamond',serif" fontSize="34" fontStyle="italic" fontWeight="500">{t}</text>
        </g>);
    case 'circle-outline':
      // S2 — thin circle around numeral
      return (
        <g transform={`translate(${cx} ${cy})`} style={shadow}>
          <circle r="17" fill={paper} stroke={ink} strokeWidth="1" />
          <text textAnchor="middle" y="6" fill={ink} fontFamily="'Cormorant Garamond',serif" fontSize="19" fontWeight="500">{t}</text>
        </g>);
    case 'square-block':
      // S3 — filled ink square, paper text
      return (
        <g transform={`translate(${cx} ${cy})`} style={shadow}>
          <rect x="-15" y="-15" width="30" height="30" fill={ink} />
          <text textAnchor="middle" y="6" fill={paper} fontFamily="'Inter',sans-serif" fontSize="16" fontWeight="600" letterSpacing="0.5">{t}</text>
        </g>);
    case 'underline-numeral':
      // S4 — hairline serif numeral with delicate top + bottom rules
      return (
        <g transform={`translate(${cx} ${cy})`}>
          <line x1="-14" y1="-16" x2="14" y2="-16" stroke={ink} strokeWidth="0.6" />
          <text textAnchor="middle" y="8" fill={ink} fontFamily="'Cormorant Garamond',serif" fontSize="30" fontWeight="400">{t}</text>
          <line x1="-14" y1="16" x2="14" y2="16" stroke={ink} strokeWidth="0.6" />
        </g>);
    case 'pill-dot':
      // S5 — gold serif numeral with trailing dot
      return (
        <g transform={`translate(${cx} ${cy})`}>
          <text textAnchor="middle" y="8" fill={gold} fontFamily="'Cormorant Garamond',serif" fontSize="30" fontWeight="500">{t}<tspan fill={ink}>.</tspan></text>
        </g>);
    case 'ticket-tag':
      // G1 — wide-tracked small caps over a single gold rule
      return (
        <g transform={`translate(${cx} ${cy})`}>
          <text textAnchor="middle" y="3" fill={ink} fontFamily="'Inter',sans-serif" fontSize="12" fontWeight="500" letterSpacing="3">{t}</text>
          <line x1="-16" y1="10" x2="16" y2="10" stroke={gold} strokeWidth="1.2" />
        </g>);
    case 'mono-bracket':
      // G2 — bold sans numeral with tiny gold dot above
      return (
        <g transform={`translate(${cx} ${cy})`}>
          <circle cx="0" cy="-13" r="2" fill={gold} />
          <text textAnchor="middle" y="6" fill={ink} fontFamily="'Inter',sans-serif" fontSize="18" fontWeight="700" letterSpacing="0.5">{t}</text>
        </g>);
    case 'stamp':
      // G3 — corner-bracket frame around the label
      return (
        <g transform={`translate(${cx} ${cy})`}>
          <path d="M -18 -10 L -18 -14 L -12 -14 M 12 -14 L 18 -14 L 18 -10 M 18 10 L 18 14 L 12 14 M -12 14 L -18 14 L -18 10" stroke={ink} strokeWidth="0.8" fill="none" />
          <text textAnchor="middle" y="5" fill={ink} fontFamily="'Cormorant Garamond',serif" fontSize="16" fontStyle="italic" fontWeight="500">{t}</text>
        </g>);
    case 'diamond':
      // G4 — rotated square
      return (
        <g transform={`translate(${cx} ${cy})`} style={shadow}>
          <rect x="-15" y="-15" width="30" height="30" transform="rotate(45)" fill={paper} stroke={ink} strokeWidth="1" />
          <text textAnchor="middle" y="5" fill={ink} fontFamily="'Inter',sans-serif" fontSize="12" fontWeight="600" letterSpacing="1">{t}</text>
        </g>);
    case 'minimal-line':
      // small chip with letters — uses status color when tintedBadge
      return (
        <g transform={`translate(${cx} ${cy})`} style={shadow}>
          <rect x="-18" y="-10" width="36" height="20" rx="2" fill={chipFill} {...ringProps || {}} />
          <text textAnchor="middle" y="5" fill={chipText} fontFamily="'Inter',sans-serif" fontSize="12" fontWeight="600" letterSpacing="1.2">{t}</text>
        </g>);
    case 'serif-italic':
      // G6 — paper hexagon with serif inside
      return (
        <g transform={`translate(${cx} ${cy})`} style={shadow}>
          <polygon points="-16,-9 -8,-18 8,-18 16,-9 16,9 8,18 -8,18 -16,9" transform="scale(0.88)" fill={paper} stroke={ink} strokeWidth="1" />
          <text textAnchor="middle" y="5" fill={ink} fontFamily="'Cormorant Garamond',serif" fontSize="14" fontWeight="500" letterSpacing="0.5">{t}</text>
        </g>);
    case 'tiny-mono':
      // KIOSK — tiny mono letter, no chrome
      return (
        <g transform={`translate(${cx} ${cy})`}>
          <text textAnchor="middle" y="4" fill={ink} fontFamily="'JetBrains Mono','Courier New',monospace" fontSize="11" fontWeight="600" letterSpacing="1">{t}</text>
        </g>);
    default:
      return (
        <g transform={`translate(${cx} ${cy})`}>
          <text textAnchor="middle" y="5" fill={ink} fontFamily="'Cormorant Garamond',serif" fontSize="16" fontWeight="500">{t}</text>
        </g>);
  }
}

function _UnusedBadgeStyles({ shop, style, cx, cy }) {
  return null;
}

function App() {
  const [selectedId, setSelectedId] = useState(null);
  const [tableSelectedId, setTableSelectedId] = useState(null);
  const topbarRef = React.useRef(null);
  React.useLayoutEffect(() => {
    const update = () => {
      const h = topbarRef.current?.getBoundingClientRect().height ?? 0;
      document.documentElement.style.setProperty('--topbar-h', h + 'px');
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  const [filterStatus, setFilterStatus] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editAll, setEditAll] = useState(false);
  const [showEditTools, setShowEditTools] = useState(false);
  const [showToolbar, setShowToolbar] = useState(false);
  const [activeSection, setActiveSection] = useState('floor-plan');
  const [xform, setXform] = useState('vertex'); // 'vertex' | 'move' | 'scale'
  const [drawTarget, setDrawTarget] = useState(null);
  const [drawPts, setDrawPts] = useState([]);
  const [polyOverrides, setPolyOverrides] = useState(() => {
    try {return JSON.parse(localStorage.getItem('arcadia.polyOverrides') || '{}');} catch {return {};}
  });
  useEffect(() => {
    try {localStorage.setItem('arcadia.polyOverrides', JSON.stringify(polyOverrides));} catch {}
  }, [polyOverrides]);
  const [showAll, setShowAll] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [displayStyle, setDisplayStyle] = useState('tinted-badge');
  const shopsLive = SHOPS.map((s) => polyOverrides[s.id] ? { ...s, poly: polyOverrides[s.id] } : s);
  const shop = shopsLive.find((s) => s.id === selectedId);
  const withPanel = !!selectedId;

  useEffect(() => {
    if (!selectedId) setEditMode(false);
  }, [selectedId]);

  function finishDraw() {
    if (drawTarget && drawPts.length >= 3) {
      const polyStr = drawPts.map((p) => p.join(',')).join(' ');
      setPolyOverrides((o) => ({ ...o, [drawTarget]: polyStr }));
    }
    setDrawTarget(null);
    setDrawPts([]);
  }
  function cancelDraw() {
    setDrawTarget(null);
    setDrawPts([]);
  }
  useEffect(() => {
    if (!drawTarget) return;
    const onKey = (e) => {
      if (e.key === 'Enter') {e.preventDefault();finishDraw();} else
      if (e.key === 'Escape') {e.preventDefault();cancelDraw();} else
      if (e.key === 'Backspace' || e.key === 'Delete') {e.preventDefault();setDrawPts((pts) => pts.slice(0, -1));}
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [drawTarget, drawPts]);
  function rectFor(shopId) {
    const src = polyOverrides[shopId] || SHOPS.find((s) => s.id === shopId)?.poly || '';
    const arr = src.split(' ').map((p) => p.split(',').map(Number));
    const xs = arr.map((p) => p[0]);const ys = arr.map((p) => p[1]);
    const x0 = Math.min(...xs),x1 = Math.max(...xs);
    const y0 = Math.min(...ys),y1 = Math.max(...ys);
    const next = [[x0, y0], [x1, y0], [x1, y1], [x0, y1]].map((p) => p.join(',')).join(' ');
    setPolyOverrides((o) => ({ ...o, [shopId]: next }));
  }

  useEffect(() => {
    const onKey = (e) => {if (e.key === 'Escape') {setSelectedId(null);setFilterStatus(null);}};
    window.addEventListener('keydown', onKey);
    const onDocClick = (e) => {
      if (!selectedId && !filterStatus) return;
      if (editMode || editAll || drawTarget) return;
      if (e.target.closest('.panel')) return;
      if (e.target.closest('.shop-hotspot')) return;
      if (e.target.closest('polygon[data-shop]')) return;
      if (e.target.closest('.edit-bar')) return;
      if (e.target.closest('.edit-float')) return;
      if (e.target.closest('.topbar')) return;
      if (e.target.closest('.stat-cell')) return;
      if (e.target.closest('.legend-item')) return;
      setSelectedId(null);
      setFilterStatus(null);
    };
    document.addEventListener('click', onDocClick);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onDocClick);
    };
  }, [selectedId, filterStatus, editMode, editAll, drawTarget]);

  return (
    <div className="app">
      <header className="topbar" ref={topbarRef}>
        <a href="home.html" className="brand" style={{textDecoration:"none"}}>
          <img src="assets/sobha_logo.png" alt="Sobha" className="mark-logo" style={{ height: "35px" }} />
          <span className="divider"></span>
          <img src="assets/arcadia_logo.png" alt="Arcadia" className="arcadia-logo" style={{ width: "auto", display: "block", height: "20px" }} />
        </a>
        <nav className="floor-tabs">
          <a className="floor-tab active" href="index.html">Ground Floor</a>
          <a className="floor-tab" href="Arcadia_First_Floor.html">First Floor</a>
        </nav>
      </header>

      <section className="floor-overview">
        <div className="overview-header">
          <div className="overview-eyebrow"><span className="rule"></span>FLOOR OVERVIEW</div>
          <h1 className="overview-title">Ground Floor</h1>
        </div>
        <StatsStrip
          shops={shopsLive}
          withPanel={withPanel}
          activeFilter={filterStatus}
          onFilter={setFilterStatus} />
        <nav className="section-nav" style={{ height: "51.5857px" }}>
          {[
          { id: 'floor-plan', label: 'Floor Plan' },
          { id: 'shop-details', label: 'Shop Details' }].
          map((item, i) =>
          <button
            key={item.id}
            className={`section-nav-item ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => {
              setActiveSection(item.id);
              const el = document.getElementById(item.id);
              if (el) {
                const topbarH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--topbar-h')) || 0;
                const top = el.getBoundingClientRect().top + window.pageYOffset - topbarH - 16;
                window.scrollTo({ top, behavior: 'smooth' });
              }
            }} style={{ height: "51.5972px", fontWeight: "600", borderColor: "rgb(11, 30, 47)", opacity: "1", borderWidth: "0.740741px", backgroundColor: "rgb(243, 240, 231)" }}>
              <span className="section-nav-index">{String(i + 1).padStart(2, '0')}</span>
              <span className="section-nav-label">{item.label}</span>
            </button>
          )}
        </nav>
      </section>

      <div className="details-header floor-plan-header" id="floor-plan">
        <h2 className="details-title">
          <span className="rule-dash"></span>
          <span className="details-title-main" style={{ color: "rgb(11, 30, 47)" }}>Floor Plan</span>
          <span className="details-title-sub">· Ground Floor</span>
        </h2>
        <StatusLegend
          shops={shopsLive}
          activeFilter={filterStatus}
          onFilter={setFilterStatus} />
      </div>

      <main className="stage">
        {showToolbar &&
        <div className="zoom-bar">
          <button onClick={() => setZoom((z) => Math.max(0.5, +(z - 0.25).toFixed(2)))}>−</button>
          <span>{Math.round(zoom * 100)}%</span>
          <button onClick={() => setZoom((z) => Math.min(5, +(z + 0.25).toFixed(2)))}>+</button>
          <button onClick={() => setZoom(1)} className="reset">Reset</button>
          <button onClick={() => setShowAll((v) => !v)} className="reset">{showAll ? 'Hide shapes' : 'Show shapes'}</button>
          <button onClick={() => setShowEditTools((v) => !v)} className="reset" title="Toggle polygon edit tools">{showEditTools ? '× Tools' : 'Tools'}</button>
          {showEditTools && <>
          <button onClick={() => setEditAll((v) => !v)} className="reset">{editAll ? 'Stop editing all' : 'Edit all shapes'}</button>
          <span style={{ borderLeft: '1px solid var(--line-soft)', height: '18px', margin: '0 4px' }}></span>
          {!drawTarget ?
            <>
              <select value="" onChange={(e) => {if (e.target.value) {setDrawTarget(e.target.value);setDrawPts([]);setSelectedId(null);}}} className="reset" style={{ padding: '4px 8px' }}>
                <option value="">Draw shape for…</option>
                {SHOPS.map((s) => <option key={s.id} value={s.id}>{s.display}{polyOverrides[s.id] ? ' ✓' : ''}</option>)}
              </select>
              <button onClick={() => {if (confirm('Clear all polygons? This will remove every shape from memory.')) {setPolyOverrides({});}}} className="reset">Clear all</button>
            </> :

            <>
              <span style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-soft)' }}>Drawing {SHOPS.find((s) => s.id === drawTarget)?.display} · {drawPts.length} pts</span>
              <button onClick={finishDraw} className="reset" disabled={drawPts.length < 3}>Finish (↵)</button>
              <button onClick={() => setDrawPts((pts) => pts.slice(0, -1))} className="reset" disabled={!drawPts.length}>Undo (⌫)</button>
              <button onClick={cancelDraw} className="reset">Cancel (Esc)</button>
            </>
            }
          <button onClick={() => {
              const merged = {};
              SHOPS.forEach((s) => {merged[s.id] = polyOverrides[s.id] || s.poly;});
              const json = JSON.stringify(merged, null, 2);
              navigator.clipboard?.writeText(json);
              alert('Polygons copied to clipboard. Paste them back to save permanently.\n\n' + json);
            }} className="reset">Export polys</button>
          </>}
        </div>
        }
        <div className={`plan-wrap ${withPanel ? 'with-panel' : ''}`} onClick={() => {if (!editMode && !editAll && !drawTarget) {if (selectedId) setSelectedId(null);if (filterStatus) setFilterStatus(null);}}}>
          <div style={{ width: zoom > 1 ? `${100 * zoom}%` : '100%', height: zoom > 1 ? `${100 * zoom}%` : '100%', position: 'relative', flexShrink: 0, transition: 'width 220ms ease, height 220ms ease' }}>
          <div style={{ transform: `scale(${zoom})`, transformOrigin: '0 0', width: zoom > 1 ? `${100 / zoom}%` : '100%', height: zoom > 1 ? `${100 / zoom}%` : '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <FloorPlan
                shops={shopsLive}
                selectedId={selectedId}
                onSelect={(id) => {setSelectedId(id);setFilterStatus(null);}}
                filterStatus={filterStatus}
                hoveredId={hoveredId}
                setHoveredId={setHoveredId}
                editMode={editMode}
                editAll={editAll}
                polyOverrides={polyOverrides}
                setPolyOverrides={setPolyOverrides}
                drawTarget={drawTarget}
                drawPts={drawPts}
                setDrawPts={setDrawPts}
                xform={xform}
                displayStyle={displayStyle} />
          </div>
            
          {selectedId && showToolbar && !editMode &&
            <button
              className="edit-float"
              style={(() => {
                const pts = shop.poly.split(' ').map((p) => p.split(',').map(Number));
                const xs = pts.map((p) => p[0]);const ys = pts.map((p) => p[1]);
                const maxX = Math.max(...xs),minX = Math.min(...xs);
                const midY = (Math.min(...ys) + Math.max(...ys)) / 2;
                const onRight = maxX + 90 < PLAN_W;
                return {
                  left: `${(onRight ? maxX + 8 : minX - 8) / PLAN_W * 100}%`,
                  top: `${midY / PLAN_H * 100}%`,
                  transform: `translate(${onRight ? '0' : '-100%'}, -50%)`
                };
              })()}
              onClick={() => {setEditMode(true);setXform('scale');}}>Edit shape</button>
            }
          {selectedId && editMode &&
            <div className="edit-bar">
              <button onClick={() => setXform('scale')} className={xform === 'scale' ? 'reset active' : 'reset'}>Resize</button>
              <button onClick={() => setXform('vertex')} className={xform === 'vertex' ? 'reset active' : 'reset'}>White Dots</button>
              <span style={{ borderLeft: '1px solid var(--line-soft)', height: '18px', margin: '0 4px' }}></span>
              <button onClick={commitPoly}>Done</button>
              <button onClick={() => rectFor(shop.id)}>To rectangle</button>
              <button onClick={() => {setEditMode(false);setPolyOverrides((o) => {const n = { ...o };delete n[shop.id];return n;});}}>Cancel</button>
              <code className="poly-out">{polyOverrides[shop.id] || shop.poly}</code>
            </div>
            }
          </div>
        </div>

        <SidePanel shop={shop} onClose={() => setSelectedId(null)} />
        <button
          className="jump-to-details"
          onClick={() => {
            const el = document.getElementById('shop-details');
            if (el) {
              const topbarH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--topbar-h')) || 0;
              const top = el.getBoundingClientRect().top + window.pageYOffset - topbarH - 16;
              window.scrollTo({ top, behavior: 'smooth' });
            }
          }} style={{ padding: "8px 4px" }}>
          <span>Shop Details</span>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 1.5 V8 M2 5.5 L5 8 L8 5.5" />
          </svg>
        </button>
      </main>

      <ShopDetailsTable shops={shopsLive} onShopClick={(id) => {
        setTableSelectedId(id);
        setSelectedId(id);
        setFilterStatus(null);
      }} />
      {tableSelectedId &&
      <div className="row-drawer-backdrop" onClick={() => {setTableSelectedId(null);setSelectedId(null);}}>
          <aside className="row-drawer" onClick={(e) => e.stopPropagation()}>
            <button className="row-drawer-close" onClick={() => {setTableSelectedId(null);setSelectedId(null);}} aria-label="Close">✕</button>
            <div className="row-drawer-plan row-drawer-locked">
              <FloorPlan
              shops={shopsLive}
              selectedId={tableSelectedId}
              onSelect={() => {}}
              filterStatus={null}
              hoveredId={null}
              setHoveredId={() => {}}
              editMode={false}
              editAll={false}
              polyOverrides={polyOverrides}
              setPolyOverrides={setPolyOverrides}
              drawTarget={null}
              drawPts={[]}
              setDrawPts={() => {}}
              xform="vertex"
              displayStyle={displayStyle} />
            </div>
          </aside>
        </div>
      }
      <ScrollToTop />

    </div>);

}

function ScrollToTop() {
  const [visible, setVisible] = React.useState(false);
  const timerRef = React.useRef(null);

  React.useEffect(() => {
    const onScroll = () => {
      if (window.pageYOffset > 200) {
        setVisible(true);
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setVisible(false), 2000);
      } else {
        setVisible(false);
        if (timerRef.current) clearTimeout(timerRef.current);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <button
      className={`scroll-to-top ${visible ? 'visible' : ''}`}
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#f4efe6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 11.5 V2.5 M3 6.5 L7 2.5 L11 6.5" />
      </svg>
    </button>);

}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
