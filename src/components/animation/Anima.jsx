import React from 'react';

import styled from 'styled-components';

const EncryptedTxWrapper = styled.div`
  background-color: transparent;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

const OverlapGroupWrapper = styled.div`
  height: 406px;
  width: 1100px;
`;

const OverlapGroup = styled.div`
  height: 362px;
  left: 98px;
  position: relative;
  top: 22px;
  width: 915px;
`;

const Vector = styled.img`
  height: 1px;
  left: 77px;
  position: absolute;
  top: 182px;
  width: 466px;
`;

const Vector2 = styled.img`
  height: 73px;
  left: 637px;
  position: absolute;
  top: 110px;
  width: 179px;
`;

const Vector3 = styled.img`
  height: 73px;
  left: 637px;
  position: absolute;
  top: 182px;
  width: 179px;
`;

const Vector4 = styled.img`
  height: 22px;
  left: 38px;
  position: absolute;
  top: 114px;
  width: 230px;
`;

const Vector5 = styled.img`
  height: 22px;
  left: 362px;
  position: absolute;
  top: 114px;
  width: 230px;
`;

const Vector6 = styled.img`
  height: 98px;
  left: 38px;
  position: absolute;
  top: 38px;
  width: 230px;
`;

const Vector7 = styled.img`
  height: 98px;
  left: 362px;
  position: absolute;
  top: 38px;
  width: 230px;
`;

const Vector8 = styled.img`
  height: 22px;
  left: 38px;
  position: absolute;
  top: 227px;
  width: 230px;
`;

const Vector9 = styled.img`
  height: 22px;
  left: 362px;
  position: absolute;
  top: 227px;
  width: 230px;
`;

const Vector10 = styled.img`
  height: 98px;
  left: 38px;
  position: absolute;
  top: 227px;
  width: 230px;
`;

const Vector11 = styled.img`
  height: 98px;
  left: 362px;
  position: absolute;
  top: 227px;
  width: 230px;
`;

export const Anima = () => {
  return (
    <EncryptedTxWrapper className='encrypted-TX'>
      <OverlapGroupWrapper className='overlap-group-wrapper'>
        <OverlapGroup className='overlap-group'>
          <Vector className='vector' alt='Vector' src='vector-262.svg' />
          <Vector2 className='vector-2' alt='Vector' src='vector-300.svg' />
          <Vector3 className='vector-3' alt='Vector' src='vector-301.svg' />
          <Vector4 className='vector-4' alt='Vector' src='vector-216.svg' />
          <Vector5 className='vector-5' alt='Vector' src='vector-263.svg' />
          <Vector6 className='vector-6' alt='Vector' src='vector-217.svg' />
          <Vector7 className='vector-7' alt='Vector' src='vector-264.svg' />
          <Vector8 className='vector-8' alt='Vector' src='vector-258.svg' />
          <Vector9 className='vector-9' alt='Vector' src='vector-265.svg' />
          <Vector10 className='vector-10' alt='Vector' src='vector-259.svg' />
          <Vector11 className='vector-11' alt='Vector' src='vector-266.svg' />
        </OverlapGroup>
      </OverlapGroupWrapper>
    </EncryptedTxWrapper>
  );
};
