import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  position: sticky;
  top: 0;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  padding: 0 48px;
`;

const Title = styled.div`
  color: #fff;
  leading-trim: both;
  text-edge: cap;
  font-family: 'Cabinet Grotesk Variable';
  font-size: 28px;
  font-weight: 700;
  line-height: 90px;
`;

const IconAndLink = styled.div`
  display: flex;
  align-items: center;
`;

const Navbar = () => {
  return (
    <Wrapper>
      <Title>Radius Testnet</Title>
      <IconAndLink>
        <Icon />
        <Follow> Follow Radius on</Follow>
      </IconAndLink>
    </Wrapper>
  );
};

export default Navbar;
