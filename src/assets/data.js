// export const dbData = [
//   { from: 'u', to: '0x0', data: 'tx' },
//   { from: '0x0', to: '0x4', data: 'tx' },
//   { from: '0x4', to: '0x3', data: 'oc' },
//   { from: '0x2', to: '0x4', data: 'tx' },
//   { from: '0x0', to: 'u', data: 'oc' },
//   { from: '0x4', to: '0x1', data: 'oc' },
//   { from: '0x4', to: 'A', data: 'block' },
//   { from: '0x4', to: '0x3', data: 'lc' },
//   { from: '0x3', to: '0x4', data: 'oc' },
//   { from: '0x3', to: '0x4', data: 'oc' },
//   { from: '0x1', to: '0x3', data: 'tx' },
//   { from: '0x3', to: '0x4', data: 'lc' },
// ];

// export const initialLabels = {
//   f0: '0x1',
//   f1: '0x2',
//   f2: '0x3',
//   f3: '0x3',
//   l: '0x4',
// };

// export const initialRoles = {
//   u: 'u',
//   '0x0': 'f0',
//   '0x1': 'f1',
//   '0x2': 'f2',
//   '0x3': 'f3',
//   '0x4': 'l',
//   A: 'r0',
//   B: 'r1',
// };

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

export const colors = {
  tx: '#FF5656',
  oc: '#24F6B7',
  block: '#189EFF',
  lc: '#E3CE12',
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
};
