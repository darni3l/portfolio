import { useEffect, useRef, useState } from 'react';
import { docking } from '../data/docking.js';
import './DockingViewer.css';

// Colors for the highlighted residue and the ligand (carbon atoms); other elements keep standard colors.
const PROTEIN_COLOR = '#8d99a6';
const RESIDUE_COLOR = 0x20b8c8; // cyan, as in the static figures
const LIGAND_COLOR = 0xd9c400; // yellow, as in the static figures
const hex = (n) => `#${n.toString(16).padStart(6, '0')}`;
const scheme = (carbon) => ({
  prop: 'elem',
  map: { C: carbon, O: 0xe03c31, N: 0x3050f8, S: 0xe5c100, H: 0xffffff },
});

const fileUrl = (file) => `${import.meta.env.BASE_URL}structures/${file}`;
const formatOf = (file) => file.split('.').pop().toLowerCase();

async function loadText(file) {
  const res = await fetch(fileUrl(file));
  if (!res.ok) throw new Error(`${file} (HTTP ${res.status})`);
  const text = await res.text();
  // The dev server answers a missing file with the site's HTML page (status 200), so check for that too.
  if (text.trimStart().startsWith('<')) throw new Error(`${file} (not found, got a web page instead)`);
  return text;
}

const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);

// compact: hide the heading and the limits box (use inside a modal that already has them).
// fallback: node shown instead of the 3D view if it cannot load (for example the static figure).
export default function DockingViewer({ compact = false, fallback = null }) {
  const hostRef = useRef(null);
  const viewerRef = useRef(null);
  const libRef = useRef(null);
  const ligandIdRef = useRef(null);

  const [activeId, setActiveId] = useState(docking.views[0].id);
  const [status, setStatus] = useState('loading'); // loading | ready | error
  const [errorFile, setErrorFile] = useState('');
  const [spinning, setSpinning] = useState(false);
  const [measured, setMeasured] = useState(null);

  const active = docking.views.find((v) => v.id === activeId);

  // Draw the scene whenever the selected result changes.
  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    setMeasured(null);
    setSpinning(false);

    (async () => {
      try {
        if (!libRef.current) {
          const mod = await import('3dmol'); // loaded on demand to keep the main bundle small
          libRef.current = mod.default?.createViewer ? mod.default : mod;
        }
        if (cancelled) return;
        if (!viewerRef.current) {
          viewerRef.current = libRef.current.createViewer(hostRef.current, {
            backgroundColor: 'white',
            backgroundAlpha: 0, // transparent, so the page's light/dark theme shows through
          });
        }
        const viewer = viewerRef.current;

        const [receptorText, ligandText] = await Promise.all([
          loadText(active.receptor.file),
          loadText(active.ligand.file),
        ]);
        if (cancelled) return;
        await new Promise((resolve) => requestAnimationFrame(resolve)); // let the stage become visible first
        if (cancelled) return;

        viewer.clear();
        const receptor = viewer.addModel(receptorText, formatOf(active.receptor.file));
        const ligand = viewer.addModel(ligandText, formatOf(active.ligand.file));
        ligandIdRef.current = ligand.getID();

        const chainSel = active.receptor.chains ? { chain: active.receptor.chains } : {};
        const residueSel = { ...chainSel, resi: docking.residue.number };

        receptor.setStyle({}, {}); // hide everything, then show only what we choose
        receptor.setStyle(chainSel, { cartoon: { color: PROTEIN_COLOR } });
        receptor.setStyle(residueSel, { stick: { colorscheme: scheme(RESIDUE_COLOR), radius: 0.18 } }, true); // true = add to the cartoon
        ligand.setStyle({}, { stick: { colorscheme: scheme(LIGAND_COLOR), radius: 0.22 } });

        // Label the residue and, if configured, draw the distance to the ligand carbonyl carbon.
        const residueAtom = receptor.selectedAtoms({ ...residueSel, atom: docking.residue.atom })[0];
        if (residueAtom) {
          viewer.addLabel(docking.residue.label, {
            position: residueAtom,
            fontSize: 13,
            fontColor: 'white',
            backgroundColor: '#1c2430',
            backgroundOpacity: 0.75,
            inFront: true,
          });
        }
        const serial = active.ligand.carbonylSerial;
        const carbon = serial != null ? ligand.selectedAtoms({ serial })[0] : null;
        if (residueAtom && carbon) {
          const d = distance(residueAtom, carbon);
          viewer.addLine({
            start: residueAtom,
            end: carbon,
            dashed: true,
            color: hex(RESIDUE_COLOR),
          });
          viewer.addLabel(`${d.toFixed(2)} Å`, {
            position: {
              x: (residueAtom.x + carbon.x) / 2,
              y: (residueAtom.y + carbon.y) / 2,
              z: (residueAtom.z + carbon.z) / 2,
            },
            fontSize: 13,
            fontColor: 'white',
            backgroundColor: '#1c2430',
            backgroundOpacity: 0.75,
            inFront: true,
          });
          if (!cancelled) setMeasured(d.toFixed(2));
        }

        viewer.zoomTo({ within: { distance: 10, sel: { model: ligandIdRef.current } } });
        viewer.render();
        if (!cancelled) setStatus('ready');
      } catch (err) {
        if (cancelled) return;
        setErrorFile(err.message);
        setStatus('error');
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [active]);

  // Spin only when the visitor asks for it (no automatic motion).
  useEffect(() => {
    viewerRef.current?.spin(spinning ? 'y' : false);
  }, [spinning]);

  // Keep the canvas sized to its container.
  useEffect(() => {
    const host = hostRef.current;
    if (!host || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => {
      // Skip while the container is hidden or zero-sized: drawing then triggers WebGL "zero size" errors.
      if (host.clientWidth === 0 || host.clientHeight === 0) return;
      viewerRef.current?.resize();
    });
    ro.observe(host);
    return () => ro.disconnect();
  }, []);

  // Clean up on unmount.
  useEffect(
    () => () => {
      const viewer = viewerRef.current;
      viewer?.spin(false);
      viewer?.clear();
      viewerRef.current = null;
      hostRef.current?.replaceChildren();
    },
    [],
  );

  const focusLigand = () => {
    const viewer = viewerRef.current;
    if (!viewer) return;
    viewer.zoomTo({ within: { distance: 10, sel: { model: ligandIdRef.current } } });
    viewer.render();
  };
  const showWhole = () => {
    const viewer = viewerRef.current;
    if (!viewer) return;
    viewer.zoomTo();
    viewer.render();
  };

  return (
    <section
      className={`docking${compact ? ' docking--compact' : ''}`}
      aria-labelledby={compact ? undefined : 'docking-title'}
      aria-label={compact ? docking.title : undefined}
    >
      {!compact && (
        <header className="docking__head">
          <h3 id="docking-title">{docking.title}</h3>
          <p>{docking.summary}</p>
        </header>
      )}

      <div className="docking__bar">
        <div className="docking__group" role="group" aria-label="Choose a docking result">
          {docking.views.map((v) => (
            <button
              key={v.id}
              type="button"
              className="docking__btn"
              aria-pressed={v.id === activeId}
              onClick={() => setActiveId(v.id)}
            >
              {v.label}
            </button>
          ))}
        </div>
        <div className="docking__group" role="group" aria-label="View controls">
          <button type="button" className="docking__btn" onClick={focusLigand}>
            Focus on ligand
          </button>
          <button type="button" className="docking__btn" onClick={showWhole}>
            Whole protein
          </button>
          <button
            type="button"
            className="docking__btn"
            aria-pressed={spinning}
            onClick={() => setSpinning((s) => !s)}
          >
            Spin
          </button>
        </div>
      </div>

      <div className="docking__stage" hidden={status === 'error'}>
        <div ref={hostRef} className="docking__canvas" role="img" aria-label={active.alt} />
        {status === 'loading' && <p className="docking__status">Loading structures…</p>}
      </div>
      {status === 'error' && (
        <div className="docking__fallback">
          <p role="alert">
            The 3D view could not load ({errorFile}).{' '}
            {fallback
              ? 'A static image is shown instead.'
              : 'Check that the files are in public/structures/ and that their names match src/data/docking.js.'}
          </p>
          {fallback}
        </div>
      )}
      {status !== 'error' && (
        <p className="docking__hint">Drag to rotate, scroll or pinch to zoom.</p>
      )}

      <ul className="docking__legend">
        <li><span className="docking__swatch" style={{ background: PROTEIN_COLOR }} />Protein</li>
        <li><span className="docking__swatch" style={{ background: hex(RESIDUE_COLOR) }} />{docking.residue.label}</li>
        <li><span className="docking__swatch" style={{ background: hex(LIGAND_COLOR) }} />Ligand</li>
      </ul>

      {(active.score || measured) && (
        <dl className="docking__facts">
          {active.score && (
            <div><dt>Vina score</dt><dd>{active.score}</dd></div>
          )}
          {measured && (
            <div>
              <dt>{docking.residue.label} {docking.residue.atom} to ligand carbonyl carbon</dt>
              <dd>{measured} Å</dd>
            </div>
          )}
        </dl>
      )}

      {!compact && (
        <div className="docking__limits">
          <h4>Limits of this result</h4>
          <ul>
            {docking.caveats.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
