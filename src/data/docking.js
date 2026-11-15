// Content for the docking viewer. Replace every value marked EDIT with your own.
// Structure files live in public/structures/ and are referenced here by file name only.
// Use ONE pose per ligand file (split Vina output with: vina_split --input out.pdbqt --ligand pose_).

export const docking = {
  title: 'NylC docking: PA2_opt in the active site', // EDIT
  summary:
    'Rigid AutoDock Vina docking of a polyamide dimer (PA2_opt) into NylC (PDB 3AXG), ' +
    'comparing a single chain with the biological tetramer.', // EDIT

  // Residue to highlight, and the atom used for the distance measurement.
  residue: { label: 'Thr-267', number: 267, atom: 'OG1' },

  views: [
    {
      id: 'monomer',
      label: 'Monomer, mode 1', // EDIT
      alt: 'PA2_opt docked in the NylC active site, single-chain model.', // EDIT
      receptor: { file: '3AXG_chainA.pdb', chains: ['A'] }, // EDIT: chain(s) to show; null = all chains
      ligand: {
        file: 'monomer_mode1.pdbqt', // EDIT
        // Atom serial (column 2 of the ATOM line in the ligand file) of the carbonyl
        // carbon you measured to. Leave null to skip the distance line.
        carbonylSerial: null,
      },
      score: null, // EDIT, e.g. '-7.1 kcal/mol'. null hides it.
    },
    {
      id: 'tetramer',
      label: 'Tetramer, mode 1', // EDIT
      alt: 'PA2_opt docked in the NylC active site, tetramer model.', // EDIT
      receptor: { file: '3AXG_tetramer.pdb', chains: null }, // EDIT: the tetramer file you docked into
      ligand: { file: 'tetramer_mode1.pdbqt', carbonylSerial: null }, // EDIT
      score: null,
    },
  ],

  // Shown under the viewer. Keep these honest and in your own words.
  caveats: [
    'The receptor is rigid, and there is no re-docking validation.',
    'The tetramer search box includes atoms from neighbouring chains; I have not tested whether that explains the score difference.',
    'Vina scores are estimates, not measured binding energies.',
  ], // EDIT
};
