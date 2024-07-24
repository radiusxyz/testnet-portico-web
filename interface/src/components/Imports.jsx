import React from "react";
import to from "../assets/images/to.svg";
import key from "../assets/images/key.svg";
import asterisk from "../assets/images/asterisk.svg";
import Liveness from "../components/animation/Liveness";
import DecShaSeqLay from "../components/DecShaSeqLay.jsx";
import MevCenRes from "./MevCenRes";
import Roblox from "./Roblox";
import mev from "../assets/videos/mev.mp4";
import PreloadVideo from "./PreloadVideo";

export const menuItems = [
  { id: 0, text: "Decentralized Shared Sequencing Layer" },
  { id: 1, text: "Trustless Sequencing" },
  { id: 2, text: "Sequencing Liveness" },
  { id: 3, text: "Multi-Rollup Sequencing" },
];

export const initialViews = [
  {
    id: 0,
    header: "Decentralized \n Shared Sequencing Layer",
    body: <DecShaSeqLay />,
    linksAndButtons: [{ type: 0, text: "Docs", icon: to, link: "https://docs.theradius.xyz/" }],
  },
  {
    id: 1,
    tag: {
      icon: key,
      text: "MEV and Censorship Resistance",
    },
    header: "Encrypted Mempool, \n Zero Knowledge Proof",
    body: <MevCenRes src={mev} />,
    linksAndButtons: [
      { type: 1, text: "See Demo", link: "https://twitter.com/radius_xyz/status/1724082176818573399" },
      {
        type: 0,
        text: "Learn more",
        icon: to,
        link: "https://docs.theradius.xyz/testnet/curie-testnet/encrypted-mempool",
      },
    ],
  },
  {
    id: 2,
    tag: {
      icon: asterisk,
      text: "Liveness",
    },
    header: "Leader-Based Sequencing Liveness",
    body: <Liveness />,
    linksAndButtons: [
      { type: 1, text: "View Real-Time", link: "https://portico-logs.theradius.xyz" },
      {
        type: 0,
        text: "Learn more",
        icon: to,
        link: "https://docs.theradius.xyz/testnet/portico-testnet/sequencing-liveness",
      },
    ],
  },
  {
    id: 3,
    header: "Multi-Rollup Sequencing",
    body: <Roblox />,
    linksAndButtons: [
      {
        type: 0,
        text: "Learn more",
        icon: to,
        link: "https://docs.theradius.xyz/testnet/portico-testnet/multi-rollup-sequencing",
      },
    ],
  },
];

const Imports = () => {
  return <PreloadVideo src={mev} />;
};

export default Imports;
