import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import to from './assets/images/to.svg';
import cuid from 'cuid';
import Dot from './components/Dot';

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
import Imports, { menuItems, initialViews } from './components/Imports';

// Links to redirect

// globe icon => https://www.theradius.xyz/
// twitter => https://twitter.com/radius_xyz
// Docs button => https://github.com/radiusxyz

function App() {
  const [views] = useState(initialViews);
  const [view, setView] = useState(views[0]);
  const [active, setActive] = useState(false);

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

  const handleMenuItem = (e) => {
    e.preventDefault();
    setActive(false);
    setView(views[e.target.id]);
  };

  return (
    <Root>
      <Imports />
      <Navbar />
      <Content>
        <Menu>
          {menuItems.map((item) => (
            <MenuItem key={cuid()}>
              <Dot active={view.id == item.id} />
              <MenuText
                id={item.id}
                $active={view.id == item.id}
                onClick={(e) => {
                  if (view.id == item.id) return;
                  handleMenuItem(e);
                }}
              >
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
                  <BaseBtn key={cuid()} onClick={() => window.open(btn.link, '_blank')}>
                    <Txt>{btn.text}</Txt>
                    {btn.icon && (
                      <IconWrapper>
                        <img src={to} />
                      </IconWrapper>
                    )}
                  </BaseBtn>
                ) : (
                  <TransButton key={cuid()} onClick={() => window.open(btn.link, '_blank')}>
                    <Txt>{btn.text}</Txt>
                    {btn.icon && (
                      <IconWrapper>
                        <img src={to} />
                      </IconWrapper>
                    )}
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
