import React, { useCallback, useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import to from './assets/images/to.svg';
import cuid from 'cuid';
import Dot from './components/Dot';
import axios from 'axios';
import {
  Root,
  Content,
  Menu,
  MenuItem,
  MenuText,
  MainWrapper,
  Main,
  TagContainer,
  Tag,
  Head,
  ImgWrapper,
  Body,
  LinksButtons,
  BaseBtn,
  TransButton,
  Txt,
  IconWrapper,
} from './AppStyles';
import { menuItems, views } from './components/imports';

// Links to redirect

// globe icon => https://www.theradius.xyz/
// twitter => https://twitter.com/radius_xyz
// Docs button => https://github.com/radiusxyz

const token = import.meta.env.VITE_INFLUXDB_TOKEN;
const url = import.meta.env.VITE_INFLUXDB_URL;
const org = 'RadiusLab';
const bucket = 'sequencer';

const query = `from(bucket: "${bucket}") |> range(start: -7d) |> filter(fn: (r) => r["_measurement"] == "log") |> filter(fn: (r) => r["_time"] <= 2024-01-30T02:42:06.51511704Z)`;

function App() {
  const handleMenuItem = (e) => {
    e.preventDefault();
    setActive(false);
    setView(views[e.target.id]);
  };
  const [view, setView] = useState(views[0]);
  const [active, setActive] = useState(false);
  const [activeTable, setActiveTable] = useState(false);

  useEffect(() => {
    // First, deactivate the class to reset the state
    setActive(false);

    // Then, after a short delay, activate it to trigger the transition
    const timeoutId = setTimeout(() => setActive(true), 50); // Adjust delay as needed

    return () => clearTimeout(timeoutId);
  }, [view]);

  useEffect(() => {
    let isThrottled = false;
    const throttleDuration = 300; // Time in milliseconds

    const changeView = (direction) => {
      if (!isThrottled) {
        isThrottled = true;
        setView((prevView) => {
          const currentIndex = views.findIndex((view) => prevView.id === view.id);
          let newIndex = currentIndex;

          if (direction === 'up' && currentIndex > 0) {
            newIndex = currentIndex - 1;
          } else if (direction === 'down' && currentIndex < views.length - 1) {
            newIndex = currentIndex + 1;
          }

          if (newIndex !== currentIndex) {
            setActive(false);
            return views[newIndex];
          }

          return prevView;
        });

        setTimeout(() => {
          isThrottled = false;
        }, throttleDuration);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'ArrowUp') {
        changeView('up');
      } else if (event.key === 'ArrowDown') {
        changeView('down');
      }
    };

    const handleScroll = (event) => {
      if (event.deltaY < 0) {
        changeView('up');
      } else if (event.deltaY > 0) {
        changeView('down');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleScroll);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleScroll);
    };
  }, [views]);

  const [constructed, setConstructed] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  async function queryData() {
    const headers = {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json',
    };

    const data = {
      query: query,
      type: 'flux',
    };

    try {
      const response = await axios.post(`${url}/api/v2/query?org=${org}`, data, { headers });
      console.log(response.data);
      const newData = response.data
        .split('\n')
        .map((line) => line.split(','))
        .filter((arr, index) => arr.length > 1 && index !== 0)
        .map((arr) => ({ data: arr[7], fid: arr[8], from: arr[9], tid: arr[10], to: arr[11].slice(0, -1) }));

      setConstructed(newData);
      setIsDataLoaded(true);
    } catch (error) {
      console.error('QUERY ERROR', error);
    }
  }

  useEffect(() => {
    queryData();
  }, []);

  return (
    <Root>
      <Navbar />
      <Content>
        <Menu>
          {menuItems.map((item) => (
            <MenuItem key={cuid()}>
              <Dot active={view.id === item.id} />
              {/* <Beat /> */}
              <MenuText id={item.id} $active={+view.id === item.id} onClick={handleMenuItem}>
                {item.text}
              </MenuText>
            </MenuItem>
          ))}
        </Menu>
        <MainWrapper>
          <Main key={view.id} className={active ? 'active' : ''}>
            {view.tag && (
              <TagContainer>
                <Tag>
                  <img src={view.tag.icon} />
                  {view.tag.text}
                </Tag>
              </TagContainer>
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
