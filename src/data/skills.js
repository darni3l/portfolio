// Skills grouped by evidence level, exactly as in the original. No proficiency scores.
// `variant` controls the tag style: solid | tint | plain | dashed
export const skillGroups = [
  {
    id: 'practised',
    label: 'Practised in a project or internship',
    variant: 'solid',
    items: [
      'Python',
      'PyMOL',
      'AutoDock Vina',
      'MGLTools',
      'AlphaFold2 / 3',
      'Golden Gate & PCR',
      'RPA & CRISPR-Cas12a',
      'RT-qPCR',
      'LC-MS/MS',
      'Benchling',
    ],
  },
  {
    id: 'supervised',
    label: 'Supervised practical course',
    variant: 'tint',
    items: ['NAMD', 'VMD', 'CHARMM-GUI', 'ELISA & BCA', 'Gene editing', 'Reporter assays'],
  },
  {
    id: 'coursework',
    label: 'Coursework',
    variant: 'plain',
    items: [
      'Statistics',
      'Bioinformatics',
      'Genomics & epigenomics',
      'Experimental design',
      'In silico protein engineering',
    ],
  },
  {
    id: 'progress',
    label: 'In progress, autumn 2026',
    variant: 'dashed',
    items: ['scikit-learn', 'TensorFlow', 'Structure for Customized Drugs'],
  },
]
