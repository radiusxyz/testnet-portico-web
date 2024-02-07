import React from 'react';
import to from '../assets/images/to.svg';
import key from '../assets/images/key.svg';
import asterisk from '../assets/images/asterisk.svg';
import Liveness from '../components/animation/Liveness';
import First from '../components/First';
import Second from './Second';
import Roblox from './Roblox';
import mev from '../assets/videos/mev.mp4';
import PreloadVideo from './PreloadVideo';

export const menuItems = [
  { id: 0, text: 'Decentralized Shared Sequencing Layer' },
  { id: 1, text: 'MEV / Censorship Resistance' },
  { id: 2, text: 'Sequencer Liveness' },
  { id: 3, text: 'Multi-Rollup Sequencing' },
];

export const views = [
  {
    id: 0,
    header: 'Decentralized \n Shared Sequencing Layer',
    body: <First />,
    linksAndButtons: [{ type: 0, text: 'Docs', icon: to, link: 'https://mindful-subtasks-250940.framer.app/' }],
  },
  {
    id: 1,
    tag: {
      icon: key,
      text: 'MEV and Censorship Resistance',
    },
    header: 'Leader-based Shared Sequencer Network',
    body: <Second src={mev} />,
    linksAndButtons: [
      { type: 1, text: 'Learn more', icon: to, link: 'https://mindful-subtasks-250940.framer.app/' },
      { type: 0, text: 'See Demo', link: 'https://mindful-subtasks-250940.framer.app/' },
    ],
  },
  {
    id: 2,
    tag: {
      icon: asterisk,
      text: 'Sequencer Liveness',
    },
    header: 'Encrypted Mempool, \n Zero Knowledge Proof',
    body: <Liveness />,
    linksAndButtons: [
      { type: 1, text: 'Learn more', icon: to, link: 'https://mindful-subtasks-250940.framer.app/' },
      { type: 0, text: 'View Real-Time Logs', link: 'https://mindful-subtasks-250940.framer.app/' },
    ],
  },
  {
    id: 3,
    header: 'Multi-Rollup Sequencing',
    body: <Roblox />,
    linksAndButtons: [{ type: 0, text: 'Learn more', icon: to, link: 'https://mindful-subtasks-250940.framer.app/' }],
  },
];

const Imports = () => {
  return <PreloadVideo src={mev} />;
};

export default Imports;
