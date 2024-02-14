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

    l: 'url(#filter5_d_106_4195)',
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

const Text = ({ children }) => (
  <text
    fill='#ffffff'
    xmlSpace='preserve'
    style={{ whiteSpace: 'pre' }}
    fontFamily='area-normal'
    fontSize='10'
    fontWeight='700'
    letterSpacing='0em'
  >
    {children}
  </text>
);

const PathTop = ({ d }) => (
  <path d={d} stroke='#ffffff' strokeOpacity='0.4' strokeLinecap='round' strokeLinejoin='round' />
);

const PathBottom = ({ d }) => <path d={d} stroke='#ffffff' strokeLinecap='round' strokeLinejoin='round' />;
export const messages = {
  uf0tx: (
    <g filter='url(#filter6_d_106_4195)'>
      <rect x='198' y='44' width='118' height='32' rx='4' fill='#090A0F' shapeRendering='crispEdges' />
      <rect x='198.5' y='44.5' width='117' height='31' rx='3.5' stroke='#FF5656' shapeRendering='crispEdges' />
      <Text>
        <tspan x='210' y='64.32'>
          ENCRYPTED TX
        </tspan>
      </Text>
      <PathTop d='M300.667 56.2227L304.444 60.0004L300.667 63.7782' />
      <PathBottom d='M296.444 56.2227L300.222 60.0004L296.444 63.7782' />
    </g>
  ),
  uf0oc: (
    <g filter='url(#filter6_d_106_4932)'>
      <rect x='176' y='44' width='156' height='32' rx='4' fill='#090A0F' shapeRendering='crispEdges' />
      <rect x='176.5' y='44.5' width='155' height='31' rx='3.5' stroke='#24F6B7' shapeRendering='crispEdges' />
      <PathTop d='M191.333 56.2227L187.556 60.0004L191.333 63.7782' />
      <PathBottom d='M195.556 56.2227L191.778 60.0004L195.556 63.7782' />
      <Text>
        <tspan x='202' y='64.32'>
          ORDER COMMITMENT
        </tspan>
      </Text>
    </g>
  ),
  f0ltx: (
    <g filter='url(#filter7_d_106_4195)'>
      <rect x='511' y='44' width='118' height='32' rx='4' fill='#090A0F' shapeRendering='crispEdges' />
      <rect x='511.5' y='44.5' width='117' height='31' rx='3.5' stroke='#FF5656' shapeRendering='crispEdges' />
      <Text>
        <tspan x='523' y='64.32'>
          ENCRYPTED TX
        </tspan>
      </Text>
      <PathTop d='M613.667 56.2227L617.444 60.0004L613.667 63.7782' />
      <PathBottom d='M609.444 56.2227L613.222 60.0004L609.444 63.7782' />
    </g>
  ),
  f0loc: (
    <g filter='url(#filter7_d_106_4932)'>
      <rect x='495' y='44' width='156' height='32' rx='4' fill='#090A0F' shapeRendering='crispEdges' />
      <rect x='495.5' y='44.5' width='155' height='31' rx='3.5' stroke='#24F6B7' shapeRendering='crispEdges' />
      <PathTop d='M510.333 56.2227L506.556 60.0004L510.333 63.7782' />
      <PathBottom d='M514.556 56.2227L510.778 60.0004L514.556 63.7782' />
      <Text>
        <tspan x='521' y='64.32'>
          ORDER COMMITMENT
        </tspan>
      </Text>
    </g>
  ),
  f1ltx: (
    <g filter='url(#filter8_d_106_4195)'>
      <rect x='511' y='120' width='118' height='32' rx='4' fill='#090A0F' shapeRendering='crispEdges' />
      <rect x='511.5' y='120.5' width='117' height='31' rx='3.5' stroke='#FF5656' shapeRendering='crispEdges' />
      <Text>
        <tspan x='523' y='140.32'>
          ENCRYPTED TX
        </tspan>
      </Text>
      <PathTop d='M613.667 132.223L617.444 136L613.667 139.778' />
      <PathBottom d='M609.444 132.223L613.222 136L609.444 139.778' />
    </g>
  ),
  f1loc: (
    <g filter='url(#filter8_d_106_4932)'>
      <rect x='495' y='120' width='156' height='32' rx='4' fill='#090A0F' shapeRendering='crispEdges' />
      <rect x='495.5' y='120.5' width='155' height='31' rx='3.5' stroke='#24F6B7' shapeRendering='crispEdges' />
      <PathTop d='M510.333 132.223L506.556 136L510.333 139.778' />
      <PathBottom d='M514.556 132.223L510.778 136L514.556 139.778' />
      <Text>
        <tspan x='521' y='140.32'>
          ORDER COMMITMENT
        </tspan>
      </Text>
    </g>
  ),
  f2ltx: (
    <g filter='url(#filter9_d_106_4195)'>
      <rect x='511' y='255' width='118' height='32' rx='4' fill='#090A0F' shapeRendering='crispEdges' />
      <rect x='511.5' y='255.5' width='117' height='31' rx='3.5' stroke='#FF5656' shapeRendering='crispEdges' />
      <Text>
        <tspan x='523' y='275.32'>
          ENCRYPTED TX
        </tspan>
      </Text>
      <PathTop d='M613.667 267.223L617.444 271L613.667 274.778' />
      <PathBottom d='M609.444 267.223L613.222 271L609.444 274.778' />
    </g>
  ),
  f2loc: (
    <g filter='url(#filter9_d_106_4932)'>
      <rect x='495' y='255' width='156' height='32' rx='4' fill='#090A0F' shapeRendering='crispEdges' />
      <rect x='495.5' y='255.5' width='155' height='31' rx='3.5' stroke='#24F6B7' shapeRendering='crispEdges' />
      <PathTop d='M510.333 267.223L506.556 271L510.333 274.778' />
      <PathBottom d='M514.556 267.223L510.778 271L514.556 274.778' />
      <Text>
        <tspan x='521' y='275.32'>
          ORDER COMMITMENT
        </tspan>
      </Text>
    </g>
  ),
  f3ltx: (
    <g filter='url(#filter10_d_106_4195)'>
      <rect x='511' y='331' width='118' height='32' rx='4' fill='#090A0F' shapeRendering='crispEdges' />
      <rect x='511.5' y='331.5' width='117' height='31' rx='3.5' stroke='#FF5656' shapeRendering='crispEdges' />
      <Text>
        <tspan x='523' y='351.32'>
          ENCRYPTED TX
        </tspan>
      </Text>
      <PathTop d='M613.667 343.223L617.444 347L613.667 350.778' />
      <PathBottom d='M609.444 343.223L613.222 347L609.444 350.778' />
    </g>
  ),
  f3loc: (
    <g filter='url(#filter10_d_106_4932)'>
      <rect x='495' y='331' width='156' height='32' rx='4' fill='#090A0F' shapeRendering='crispEdges' />
      <rect x='495.5' y='331.5' width='155' height='31' rx='3.5' stroke='#24F6B7' shapeRendering='crispEdges' />
      <PathTop d='M510.333 343.223L506.556 347L510.333 350.778' />
      <PathBottom d='M514.556 343.223L510.778 347L514.556 350.778' />
      <Text>
        <tspan x='521' y='351.32'>
          ORDER COMMITMENT
        </tspan>
      </Text>
    </g>
  ),
  uf1tx: (
    <g filter='url(#filter11_d_106_4195)'>
      <rect x='198' y='120' width='118' height='32' rx='4' fill='#090A0F' shapeRendering='crispEdges' />
      <rect x='198.5' y='120.5' width='117' height='31' rx='3.5' stroke='#FF5656' shapeRendering='crispEdges' />
      <Text>
        <tspan x='210' y='140.32'>
          ENCRYPTED TX
        </tspan>
      </Text>
      <PathTop d='M300.667 132.223L304.444 136L300.667 139.778' />
      <PathBottom d='M296.444 132.223L300.222 136L296.444 139.778' />
    </g>
  ),
  uf1oc: (
    <g filter='url(#filter11_d_106_4932)'>
      <rect x='176' y='120' width='156' height='32' rx='4' fill='#090A0F' shapeRendering='crispEdges' />
      <rect x='176.5' y='120.5' width='155' height='31' rx='3.5' stroke='#24F6B7' shapeRendering='crispEdges' />
      <PathTop d='M191.333 132.223L187.556 136L191.333 139.778' />
      <PathBottom d='M195.556 132.223L191.778 136L195.556 139.778' />
      <Text>
        <tspan x='202' y='140.32'>
          ORDER COMMITMENT
        </tspan>
      </Text>
    </g>
  ),
  uf3tx: (
    <g filter='url(#filter12_d_106_4195)'>
      <rect x='198' y='331' width='118' height='32' rx='4' fill='#090A0F' shapeRendering='crispEdges' />
      <rect x='198.5' y='331.5' width='117' height='31' rx='3.5' stroke='#FF5656' shapeRendering='crispEdges' />
      <Text>
        <tspan x='210' y='351.32'>
          ENCRYPTED TX
        </tspan>
      </Text>
      <PathTop d='M300.667 343.223L304.444 347L300.667 350.778' />
      <PathBottom d='M296.444 343.223L300.222 347L296.444 350.778' />
    </g>
  ),
  uf3oc: (
    <g filter='url(#filter12_d_106_4932)'>
      <rect x='176' y='331' width='156' height='32' rx='4' fill='#090A0F' shapeRendering='crispEdges' />
      <rect x='176.5' y='331.5' width='155' height='31' rx='3.5' stroke='#24F6B7' shapeRendering='crispEdges' />
      <PathTop d='M191.333 343.223L187.556 347L191.333 350.778' />
      <PathBottom d='M195.556 343.223L191.778 347L195.556 350.778' />
      <Text>
        <tspan x='202' y='351.32'>
          ORDER COMMITMENT
        </tspan>
      </Text>
    </g>
  ),
  uf2tx: (
    <g filter='url(#filter13_d_106_4195)'>
      <rect x='198' y='255' width='118' height='32' rx='4' fill='#090A0F' shapeRendering='crispEdges' />
      <rect x='198.5' y='255.5' width='117' height='31' rx='3.5' stroke='#FF5656' shapeRendering='crispEdges' />
      <Text>
        <tspan x='210' y='275.32'>
          ENCRYPTED TX
        </tspan>
      </Text>
      <PathTop d='M300.667 267.223L304.444 271L300.667 274.778' />
      <PathBottom d='M296.444 267.223L300.222 271L296.444 274.778' />
    </g>
  ),
  uf2oc: (
    <g filter='url(#filter13_d_106_4932)'>
      <rect x='176' y='255' width='156' height='32' rx='4' fill='#090A0F' shapeRendering='crispEdges' />
      <rect x='176.5' y='255.5' width='155' height='31' rx='3.5' stroke='#24F6B7' shapeRendering='crispEdges' />
      <PathTop d='M191.333 267.223L187.556 271L191.333 274.778' />
      <PathBottom d='M195.556 267.223L191.778 271L195.556 274.778' />
      <Text>
        <tspan x='202' y='275.32'>
          ORDER COMMITMENT
        </tspan>
      </Text>
    </g>
  ),
  ultx: (
    <g filter='url(#filter14_d_106_4195)'>
      <rect x='355' y='187' width='118' height='32' rx='4' fill='#090A0F' shapeRendering='crispEdges' />
      <rect x='355.5' y='187.5' width='117' height='31' rx='3.5' stroke='#FF5656' shapeRendering='crispEdges' />
      <Text>
        <tspan x='367' y='207.32'>
          ENCRYPTED TX
        </tspan>
      </Text>
      <PathTop d='M457.667 199.223L461.444 203L457.667 206.778' />
      <PathBottom d='M453.444 199.223L457.222 203L453.444 206.778' />
    </g>
  ),
  uloc: (
    <g filter='url(#filter14_d_106_4932)'>
      <rect x='336' y='187' width='156' height='32' rx='4' fill='#090A0F' shapeRendering='crispEdges' />
      <rect x='336.5' y='187.5' width='155' height='31' rx='3.5' stroke='#24F6B7' shapeRendering='crispEdges' />
      <PathTop d='M351.333 199.223L347.556 203L351.333 206.778' />
      <PathBottom d='M355.556 199.223L351.778 203L355.556 206.778' />
      <Text>
        <tspan x='362' y='207.32'>
          ORDER COMMITMENT
        </tspan>
      </Text>
    </g>
  ),
  f0llc: (
    <g filter='url(#filter5_d_138_733)'>
      <rect x='515' y='44' width='108' height='32' rx='4' fill='#090A0F' shapeRendering='crispEdges' />
      <rect x='515.5' y='44.5' width='107' height='31' rx='3.5' stroke='#E3CE12' shapeRendering='crispEdges' />
      <Text>
        <tspan x='527' y='64.32'>
          NEW LEADER
        </tspan>
      </Text>
      <PathTop d='M607.667 56.2227L611.444 60.0004L607.667 63.7782' />
      <PathBottom d='M603.444 56.2227L607.222 60.0004L603.444 63.7782' />
    </g>
  ),
  f1llc: (
    <g filter='url(#filter6_d_138_733)'>
      <rect x='515' y='120' width='108' height='32' rx='4' fill='#090A0F' shapeRendering='crispEdges' />
      <rect x='515.5' y='120.5' width='107' height='31' rx='3.5' stroke='#E3CE12' shapeRendering='crispEdges' />
      <Text>
        <tspan x='527' y='140.32'>
          NEW LEADER
        </tspan>
      </Text>
      <PathTop d='M607.667 132.223L611.444 136L607.667 139.778' />
      <PathBottom d='M603.444 132.223L607.222 136L603.444 139.778' />
    </g>
  ),
  f2llc: (
    <g filter='url(#filter7_d_138_733)'>
      <rect x='515' y='255' width='108' height='32' rx='4' fill='#090A0F' shapeRendering='crispEdges' />
      <rect x='515.5' y='255.5' width='107' height='31' rx='3.5' stroke='#E3CE12' shapeRendering='crispEdges' />
      <Text>
        <tspan x='527' y='275.32'>
          NEW LEADER
        </tspan>
      </Text>
      <PathTop d='M607.667 267.223L611.444 271L607.667 274.778' />
      <PathBottom d='M603.444 267.223L607.222 271L603.444 274.778' />
    </g>
  ),
  f3llc: (
    <g filter='url(#filter8_d_138_733)'>
      <rect x='515' y='331' width='108' height='32' rx='4' fill='#090A0F' shapeRendering='crispEdges' />
      <rect x='515.5' y='331.5' width='107' height='31' rx='3.5' stroke='#E3CE12' shapeRendering='crispEdges' />
      <Text>
        <tspan x='527' y='351.32'>
          NEW LEADER
        </tspan>
      </Text>
      <PathTop d='M607.667 343.223L611.444 347L607.667 350.778' />
      <PathBottom d='M603.444 343.223L607.222 347L603.444 350.778' />
    </g>
  ),
  lr0block: (
    <g filter='url(#filter3_d_138_1546)'>
      <rect x='779' y='188' width='75' height='32' rx='4' fill='#090A0F' shapeRendering='crispEdges' />
      <rect x='779.5' y='188.5' width='74' height='31' rx='3.5' stroke='#189EFF' shapeRendering='crispEdges' />
      <Text>
        <tspan x='791' y='208.32'>
          BLOCK
        </tspan>
      </Text>
      <PathTop d='M838.667 200.223L842.444 204L838.667 207.778' />
      <PathBottom d='M834.444 200.223L838.222 204L834.444 207.778' />
    </g>
  ),
  lr1block: (
    <g filter='url(#filter3_d_138_1546)'>
      <rect x='779' y='188' width='75' height='32' rx='4' fill='#090A0F' shapeRendering='crispEdges' />
      <rect x='779.5' y='188.5' width='74' height='31' rx='3.5' stroke='#189EFF' shapeRendering='crispEdges' />
      <Text>
        <tspan x='791' y='208.32'>
          BLOCK
        </tspan>
      </Text>
      <PathTop d='M838.667 200.223L842.444 204L838.667 207.778' />
      <PathBottom d='M834.444 200.223L838.222 204L834.444 207.778' />
    </g>
  ),
};
