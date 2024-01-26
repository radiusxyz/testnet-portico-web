import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import first from './assets/images/first.svg';
import second from './assets/images/second.svg';
import third from './assets/images/third.svg';
import fourth from './assets/images/fourth.svg';
import to from './assets/images/to.svg';
import key from './assets/images/key.svg';
import asterisk from './assets/images/asterisk.svg';
import cuid from 'cuid';
import Liveness from './components/animation/Liveness';
// import axios from 'axios';
// import Test from './components/Test';

const token = import.meta.env.VITE_INFLUXDB_TOKEN;
const url = import.meta.env.VITE_INFLUXDB_URL;
const org = 'RadiusLab';
const bucket = 'logylman';

const query = `
from(bucket: "${bucket}")
  |> range(start: -1d)
  |> filter(fn: (r) => r._measurement == "logEntry")
  |> pivot(rowKey:["_time"], columnKey: ["_field"], valueColumn: "_value")
`;

const Root = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background: #090a0f;
  flex-direction: column;
`;

const Content = styled.div`
  display: flex;
  height: 100%;
  padding: 0px 48px;
`;

const Menu = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 100%;
  max-width: 320px;
  width: 100%;
  gap: 16px;
  padding-bottom: 86px;
  flex-direction: column;
`;

const MenuItem = styled.p`
  color: ${({ active }) => (active && '#fff') || 'rgba(255, 255, 255, 0.16)'};
  font-family: Manrope;
  font-size: 16px;
  font-weight: 500;
  width: 100%;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const MainWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  max-width: 1100px;
  flex-direction: column;
`;

const views = [
  {
    id: 0,
    header: 'Decentralized \n Shared Sequencing Layer',
    body: <img src={first} />,
    linksAndButtons: [{ type: 0, text: 'Docs', icon: to, link: 'https://mindful-subtasks-250940.framer.app/' }],
  },
  {
    id: 1,
    tag: {
      icon: key,
      text: 'MEV and Censorship Resistance',
    },
    header: 'Leader-based Shared Sequencer Network',
    body: <img src={second} />,
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
    body: <img src={fourth} />,
    linksAndButtons: [{ type: 0, text: 'Learn more', icon: to, link: 'https://mindful-subtasks-250940.framer.app/' }],
  },
];

const Tag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 18px;
  gap: 6px;
  border-radius: 9999px;
  border: 1px solid #5c5b5e;
  background: #141414;
  margin-bottom: 36px;

  color: #fff;
  font-family: Manrope;
  font-size: 16px;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 0.1px;
`;

const Head = styled.p`
  color: #fff;
  leading-trim: both;
  text-edge: cap;
  font-family: 'area-variable';
  font-size: 52px;
  font-weight: 400;
  line-height: 72px; /* 138.462% */
  margin-bottom: 64px;
  white-space: pre-line;
`;

const ImgWrapper = styled.div`
  border-radius: 24px;
  border: 1px solid rgba(92, 91, 94, 0.4);
`;

const Body = styled.div``;

const LinksButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
  width: 100%;
`;

const BaseBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.1);
  padding: 16px 30px;
`;

const TransButton = styled(BaseBtn)`
  border: none;
  background: transparent;
`;

const Txt = styled.span`
  display: flex;
  justify-content: center;
  align-self: flex-end;
  color: #fff;
  vertical-align: middle;
  text-align: center;
  font-family: 'area-variable';
  font-size: 14px;
  font-weight: 700;
  line-height: 20px; /* 142.857% */
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

function App() {
  // const [constructed, setConstructed] = useState([]);
  // const [isDataLoaded, setIsDataLoaded] = useState(false);

  // async function queryData() {
  //   const headers = {
  //     Authorization: `Token ${token}`,
  //     'Content-Type': 'application/json',
  //   };

  //   const data = {
  //     query: query,
  //     type: 'flux',
  //   };

  //   try {
  //     const response = await axios.post(`${url}/api/v2/query?org=${org}`, data, { headers });
  //     const newData = response.data
  //       .split('\n')
  //       .map((line) => line.split(','))
  //       .filter((arr, index) => arr.length > 1 && index !== 0)
  //       .map((arr) => ({ data: arr[7], fid: arr[8], from: arr[9], tid: arr[10], to: arr[11].slice(0, -1) }));

  //     setConstructed(newData);
  //     setIsDataLoaded(true);
  //   } catch (error) {
  //     console.error('QUERY ERROR', error);
  //   }
  // }

  // useEffect(() => {
  //   queryData();
  // }, []);

  const handleMenuItem = (e) => {
    e.preventDefault;
    setView(views[e.target.id]);
  };
  const [view, setView] = useState(views[0]);

  const menuItems = [
    { id: 0, text: 'Decentralized Shared Sequencing Layer' },
    { id: 1, text: 'MEV / Censorship Resistance' },
    { id: 2, text: 'Sequencer Liveness' },
    { id: 3, text: 'Multi-Rollup Sequencing' },
  ];

  return (
    <Root>
      <Navbar />
      <Content>
        <Menu>
          {menuItems.map((item) => (
            <MenuItem key={cuid()} id={item.id} active={view.id === item.id} onClick={handleMenuItem}>
              {item.text}
            </MenuItem>
          ))}
        </Menu>
        <MainWrapper>
          <Main>
            {view.tag && (
              <Tag>
                <img src={view.tag.icon} />
                {view.tag.text}
              </Tag>
            )}
            <Head>{view.header}</Head>
            <Body>
              <ImgWrapper>{view.body}</ImgWrapper>
            </Body>
            <LinksButtons>
              {view.linksAndButtons.map((btn) =>
                btn.type === 0 ? (
                  <BaseBtn key={cuid()}>
                    <Txt>{btn.text}</Txt>
                    <IconWrapper> {btn.icon && <img src={to} />}</IconWrapper>
                  </BaseBtn>
                ) : (
                  <TransButton key={cuid()}>
                    <Txt>{btn.text}</Txt>
                    <IconWrapper>{btn.icon && <img src={to} />}</IconWrapper>
                  </TransButton>
                )
              )}
            </LinksButtons>
          </Main>
        </MainWrapper>
      </Content>
    </Root>
  );
}

export default App;
