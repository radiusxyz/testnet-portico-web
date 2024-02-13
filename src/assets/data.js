export const defaultMapping = {
  entities: {
    u: { highlight: 'none', filter: 'none' },
    f0: { highlight: 'none', filter: 'none' },
    f1: { highlight: 'none', filter: 'none' },
    f2: { highlight: 'none', filter: 'none' },
    f3: { highlight: 'none', filter: 'none' },
    l: { highlight: 'none', filter: 'none' },
    r0: { highlight: 'none', filter: 'none' },
    r1: { highlight: 'none', filter: 'none' },
    circle: { color: 'none' },
  },
  paths: {
    uf0: '#5C5B5E',

    uf1: '#5C5B5E',

    uf2: '#5C5B5E',

    uf3: '#5C5B5E',

    ul: '#5C5B5E',

    f0l: '#5C5B5E',

    f1l: '#5C5B5E',

    f2l: '#5C5B5E',

    f3l: '#5C5B5E',

    lr0: '#5C5B5E',
    lr1: '#5C5B5E',
  },
};

export const paths = {
  uf0: 'uf0',
  f0u: 'uf0',
  uf1: 'uf1',
  f1u: 'uf1',
  uf2: 'uf2',
  f2u: 'uf2',
  uf3: 'uf3',
  f3u: 'uf3',

  ul: 'ul',
  lu: 'ul',

  f0l: 'f0l',
  lf0: 'f0l',
  f1l: 'f1l',
  lf1: 'f1l',
  f2l: 'f2l',
  lf2: 'f2l',
  f3l: 'f3l',
  lf3: 'f3l',

  lr0: 'lr0',
  lr1: 'lr1',
};

export const pathColors = {
  tx: '#FF5656',
  oc: '#24F6B7',
  block: '#189EFF',
  lc: '#E3CE12',
  ld: '#5C5B5E',
};

export const highlightColors = {
  tx: '#FF5656',
  oc: '#24F6B7',
  block: '#189EFF',
  lc: '#E3CE12',
  ld: 'none',
};

export const filters = {
  tx: {
    u: 'url(#filter0_d_106_4195)',

    f0: 'url(#filter1_d_106_4195)',
    f1: 'url(#filter2_d_106_4195)',
    f2: 'url(#filter3_d_106_4195)',
    f3: 'url(#filter4_d_106_4195)',

    l: 'url(#filter5_d_106_4195)',
  },
  oc: {
    u: 'url(#filter0_d_106_4932)',

    f0: 'url(#filter1_d_106_4932)',
    f1: 'url(#filter2_d_106_4932)',
    f2: 'url(#filter3_d_106_4932)',
    f3: 'url(#filter4_d_106_4932)',

    f4: 'url(#filter5_d_106_4195)',
  },
  block: { l: 'url(#filter0_d_138_1546)', r0: 'url(#filter1_d_138_1546)', r1: 'url(#filter2_d_138_1546)' },
  lc: {
    f0: 'url(#filter0_d_138_733)',
    f1: 'url(#filter1_d_138_733)',
    f2: 'url(#filter2_d_138_733)',
    f3: 'url(#filter3_d_138_733)',
    l: 'url(#filter4_d_138_733)',
  },
  ld: {
    f0: 'none',
    f1: 'none',
    f2: 'none',
    f3: 'none',
    l: 'none',
  },
};
