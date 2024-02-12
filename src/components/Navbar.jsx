import React from 'react';

import styled from 'styled-components';
import globe_no_padding from '../assets/images/globe_no_padding.svg';
import x from '../assets/images/x.svg';
import logo from '../assets/images/logo.svg';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  position: sticky;
  top: 0;
  justify-content: space-between;
  align-items: center;
  height: 74px;
  padding: 0 48px;
  border-bottom: 1px solid rgba(92, 91, 94, 0.4);
`;

const Title = styled.div`
  color: #fff;
  leading-trim: both;
  text-edge: cap;
  font-family: 'area-variable';
  font-size: 28px;
  font-weight: 700;
  line-height: 90px;
`;

const IconAndLink = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FollowLink = styled.a``;

const FollowButton = styled.button`
  text-decoration: none;
  border: none;
  outline: none;
  padding: 16px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: transparent;
  height: 46px;
`;
const Follow = styled.span`
  color: rgba(255, 255, 255, 0.8);
  leading-trim: both;
  text-edge: cap;
  font-family: 'area-variable';
  font-size: 14px;
  font-weight: 400;
  line-height: 14px; /* 100% */
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-radius: 50%;
  background: var(--white-100, #fff);
  width: 46px;
  height: 46px;
  padding: 14px;
  transition: width 0.3s ease-in-out, border-radius 0.3s ease-in-out;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    width: 152px;
    border-radius: 9999px;
  }
`;

// Styled text that will be shown next to the icon on hover
const Text = styled.span`
  white-space: nowrap;
  opacity: 1;
  transition: opacity 0.3s ease-in-out;
  margin-left: 14px;
  color: #090a0f;
  font-family: 'area-normal';
  font-size: 14px;
  font-weight: 600;
  line-height: 90px;

  ${IconContainer}:hover & {
    margin-left: 10px;
    opacity: 1;
  }
`;

const Navbar = () => {
  return (
    <Wrapper>
      <img src={logo} alt='radiius testnet' />
      <IconAndLink>
        <IconContainer>
          <img
            src={globe_no_padding}
            alt='globe_icon'
            onClick={() => window.open('https://www.theradius.xyz/', '_blank')}
          />

          <Text>Theradius.xyz</Text>
        </IconContainer>

        <FollowLink>
          <FollowButton onClick={() => window.open('https://twitter.com/radius_xyz', '_blank')}>
            <Follow>Follow Radius on</Follow>
            <img src={x} alt='twitter_x_icon' />
          </FollowButton>
        </FollowLink>
      </IconAndLink>
    </Wrapper>
  );
};

export default Navbar;
