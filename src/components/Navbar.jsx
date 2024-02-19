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
  font-family: 'area-normal';
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
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.5s cubic-bezier(0.52, 0, 0.23, 1.02);

  &:hover {
    border: 1px solid rgba(255, 255, 255, 0.6);
    background: rgba(255, 255, 255, 0.12);
    color: var(--white-100, #fff);
    cursor: pointer;
  }
  &:active {
    color: #090a0f;
    border: 1px solid rgba(255, 255, 255, 0.6);
    background: var(--white-100, #fff);
  }
`;
const Follow = styled.span`
  color: inherit;
  font-family: 'area-normal';
  font-size: 14px;
  font-weight: 600;
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
  transition: all 0.5s cubic-bezier(0.52, 0, 0.23, 1.02);
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
        <IconContainer onClick={() => window.open('https://www.theradius.xyz/', '_blank')}>
          <img src={globe_no_padding} alt='globe_icon' />

          <Text>Theradius.xyz</Text>
        </IconContainer>

        <FollowButton onClick={() => window.open('https://twitter.com/radius_xyz', '_blank')}>
          <Follow>Follow Radius on</Follow>
          <svg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M8.1428 6.08177L12.6108 1H11.5524L7.6712 5.41152L4.5736 1H1L5.6852 7.67164L1 13H2.0584L6.1544 8.34028L9.4264 13H13M2.4404 1.78095H4.0664L11.5516 12.2574H9.9252'
              fill='currentColor'
            />
          </svg>
        </FollowButton>
      </IconAndLink>
    </Wrapper>
  );
};

export default Navbar;
