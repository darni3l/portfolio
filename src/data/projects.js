/*
 * Projects. Wording is verbatim from the original portfolio.
 *
 * Fields (all optional except id, caseLabel, title, description):
 *   kind, context, period   meta line shown on the card and in the detail view
 *   tools                   tool names that appear in the project's own method text
 *   steps                   [{ label, text }]            methodology blocks
 *   metrics                 [{ value, label }]           headline numbers
 *   table                   { caption, columns, rows }   results table
 *   notes                   [{ label, text, tone }]      tone: 'limits' highlights the note
 *   links                   [{ label, href }]
 *   noLinksNote             shown instead of links when there is no public repository
 *   figure                  { src, darkSrc, alt, caption, width, height, expected, size }
 *                           src: null shows a placeholder naming the expected file
 */
export const projects = [
  {
    id: 'phytochrome',
    caseLabel: 'Case 01',
    kind: 'Wet + dry lab',
    context: 'Hiltbrunner lab, Freiburg',
    period: 'Jun–Nov 2026',
    title: 'Phytochrome subfunctionalisation: chimeras built at the bench, modelled in silico',
    description:
      'A project on the phytochrome family of the moss *Physcomitrium patens*. I built the chimeras in the lab and proposed adding a structural modelling component to a project that was initially bench-only.',
    tools: ['Golden Gate cloning', 'AlphaFold2/ColabFold', 'AlphaFold3', 'PyMOL'],
    steps: [
      {
        label: 'Bench',
        text: 'Golden Gate cloning of the chimeras, which the lab head designed from earlier literature.',
      },
      {
        label: 'Model',
        text: 'AlphaFold2/ColabFold, then AlphaFold3, for wild-type PHY1, PHY3 and PHY5/PHY5A (no solved structure in the PDB), then for the chimeras once built. Confidence read with pLDDT and PAE.',
      },
      {
        label: 'Compare',
        text: 'Structural alignment and per-residue RMSD in PyMOL: conserved domain folds versus divergent inter-domain geometry between paralogues.',
      },
    ],
    notes: [
      {
        label: 'Status',
        text: 'Chimera phenotypes are being read out in November 2026.',
      },
      {
        label: 'Limits',
        tone: 'limits',
        text: 'The current chimeras were designed before the modelling and were not guided by it; the models are predictions. Using models and phenotypes to guide new designs is a perspective, not done yet.',
      },
    ],
    noLinksNote: 'No public repository for this project.',
    figure: {
      src: 'public/images/projects/case-01.png',
      darkSrc: null,
      alt: 'AlphaFold 3 predicted PHY1 protein structure visualized in PyMOL and colored according to per-residue pLDDT confidence scores.',
      caption: 'AlphaFold 3 prediction of Phytochrome 1 (PHY1)',
      width: 1600,
      height: 900,
      expected: 'public/images/projects/case-01.png',
      size: '1600 × 900 px',
    },
  },
  {
    id: 'brd4',
    caseLabel: 'Case 02',
    kind: 'Molecular dynamics',
    context: 'Practical course, written in a pair',
    title: 'BRD4: how do two binding-pocket mutations change the protein’s motion?',
    description:
      'BRD4 bromodomain BD1 (PDB 7AXR, residues 42–168) with the dual BET–HDAC inhibitor LSH24. Three systems compared: apo, holo, and the W81A/F83A double mutant.',
    tools: ['CHARMM-GUI', 'CHARMM36m', 'CGenFF', 'NAMD', 'VMD'],
    metrics: [
      { value: '≈ 2.5 Å', label: 'Apo backbone RMSD, reached early and stable' },
      { value: '≈ 1.3–1.5 Å', label: 'Holo backbone RMSD' },
      {
        value: '≈ 2.1 Å',
        label: 'Mutant: follows holo until ~145 ps, then a localised rearrangement',
      },
      { value: '0.9–1.9 Å', label: 'LSH24 RMSD in holo and mutant; ligand stays in the pocket' },
    ],
    notes: [
      {
        label: 'Method',
        text: 'CHARMM-GUI setup, CHARMM36m with CGenFF ligand parameters, 10,000 minimisation steps, 200 ps production in NAMD, backbone and ligand RMSD, visual inspection in VMD.',
      },
      {
        label: 'Limits',
        tone: 'limits',
        text: '200 ps in vacuum, no thermostat, one run per system. The apo drift may partly be a vacuum effect, the mutant’s step cannot be attributed to the mutations, and RMSD is not binding affinity. Values are read from plots.',
      },
      { label: 'Next', text: 'Explicit solvent, temperature control, replicate runs.' },
    ],
    links: [{ label: 'Repository', href: 'https://github.com/darni3l/brd4-md-simulation' }],
    figure: {
      src: 'public/images/projects/case-02.png',
      darkSrc: null,
      alt: 'VMD visualization of mutated and wildtype BRD4 protein bound to a receptor. Conformational change in mutated protein shown by orange arrow(right)',
      caption: 'Visible BRD4 conformational change visualized by VMD',
      width: 1600,
      height: 900,
      expected: 'public/images/projects/case-02.png',
      size: '1600 × 900 px',
    },
  },
  {
    id: 'nylc',
    caseLabel: 'Case 03',
    kind: 'Docking',
    context: 'With Dirk Wacker, completed September 2026',
    title: 'NylC: does docking hint at a difference between monomer and tetramer?',
    description:
      'Exploratory docking of a polyamide dimer onto the nylon hydrolase NylC (PDB 3AXG), run before a project to stabilise the enzyme with its substrate.',
    tools: ['PyMOL', 'MGLTools', 'AutoDock Vina', 'Python'],
    table: {
      caption: 'Docking scores by receptor state',
      columns: ['Receptor state', 'Mean score (kcal/mol)', 'Std. dev.'],
      rows: [
        ['Monomer', '−5.3376', '± 0.1828'],
        ['Tetramer (biological assembly)', '−5.9074', '± 0.1768'],
      ],
    },
    notes: [
      {
        label: 'Method',
        text: 'Chains prepared in PyMOL, PDBQT conversion with MGLTools, AutoDock Vina with a 25 Å box centred on Thr-267, exhaustiveness 24, five replicates per state with different random seeds. Python scripts are wrappers around Vina, MGLTools and PyMOL, not a new tool.',
      },
      {
        label: 'Reading',
        text: 'The ~0.57 kcal/mol gap is reproducible across replicates but far below Vina’s typical scoring error (about 2–3 kcal/mol). It is a hypothesis, not evidence of an oligomerisation effect.',
      },
      {
        label: 'Limits',
        tone: 'limits',
        text: 'Rigid receptor, no re-docking validation, and the tetramer box includes atoms from neighbouring chains, which was not tested as a cause.',
      },
      { label: 'Next', text: 'Re-docking control, flexible side chains, box-volume tests.' },
    ],
    links: [{ label: 'Repository', href: 'https://github.com/darni3l/nylc-docking' }],
    figure: {
      src: 'public/images/projects/case-03.png',
      darkSrc: null,
      alt: 'Best AutoDockVina docking poses for monomer and tetramer form of NYLC. Catalytic distances measured with PyMol are visible in black',
      caption: 'Comparison of monomer and tetramer: best poses and catalytic distances',
      width: 1600,
      height: 900,
      expected: 'public/images/projects/case-03.png',
      size: '1600 × 900 px',
    },
  },
]
