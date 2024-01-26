import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import globe from '../assets/images/globe.svg';
import x from '../assets/images/x.svg';
import logo from '../assets/images/logo.svg';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  position: sticky;
  top: 0;
  justify-content: space-between;
  align-items: center;
  height: 70px;
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
`;
const Follow = styled.span`
  color: rgba(255, 255, 255, 0.8);
  leading-trim: both;
  text-edge: cap;
  font-family: 'area-variable';
  font-size: 14px;
  font-weight: 600;
  line-height: 14px; /* 100% */
`;

// const Globe = styled.img``;
// const X = styled.img``;

const Navbar = () => {
  return (
    <Wrapper>
      <img src={logo} alt='radiius testnet' />
      <IconAndLink>
        <img src={globe} alt='globe_icon' />
        <FollowLink>
          <FollowButton>
            <Follow>Follow Radius on</Follow>
            <img src={x} alt='twitter_x_icon' />
          </FollowButton>
        </FollowLink>
      </IconAndLink>
    </Wrapper>
  );
};

export default Navbar;
