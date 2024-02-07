export const iRoles = {
  '0x1': 'l',
  '0x2': 'f0',
  '0x3': 'f1',
  '0x4': 'f2',
  '0x5': 'f3',
  A: 'r0',
  B: 'r1',
  u: 'u',
  timestamp: Date.now(),
};

export const iLogs = [
  { from: 'u', to: '0x3', data: 'tx' },
  { from: '0x3', to: '0x1', data: 'tx' },
  { from: '0x1', to: '0x4', data: 'oc' },
  { from: '0x1', to: '0x2', data: 'oc' },
  { from: '0x1', to: '0x3', data: 'oc' },
  { from: '0x3', to: 'u', data: 'oc' },
  { from: '0x1', to: 'B', data: 'block' },

  { from: '0x1', to: '0x2', data: 'lc' },

  { from: 'u', to: '0x2', data: 'tx' },
  { from: '0x2', to: '0x1', data: 'tx' },
  { from: '0x2', to: '0x3', data: 'oc' },
  { from: '0x2', to: '0x4', data: 'oc' },
  { from: '0x2', to: 'u', data: 'oc' },
  { from: '0x2', to: 'A', data: 'block' },

  { from: '0x2', to: '0x1', data: 'lc' },
].map((log, index) => {
  return { ...log, timestamp: iRoles.timestamp + index };
});
