import styled from 'styled-components';

export const Root = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background: #090a0f;
  flex-direction: column;
`;

export const Content = styled.div`
  display: flex;
  height: 100%;
  padding: 0px 48px;
  gap: 42px;
  @media (min-width: 1920px) {
    position: relative;
  }
`;

export const Menu = styled.div`
  display: flex;
  margin-right: 42px;
  justify-content: flex-end;
  height: 100%;
  max-width: 320px;
  width: 100%;
  gap: 16px;
  padding-bottom: 86px;
  flex-direction: column;
  @media (min-width: 1920px) {
    position: absolute;
  }
`;

export const MenuItem = styled.div`
  position: relative;
`;

export const MenuText = styled.p`
  font-family: Manrope;
  font-size: 16px;
  font-weight: 400;
  width: 100%;
  cursor: pointer;
  margin-left: 16px;
  // TODO: fix the transitioning
  // transition: all 0.5s cubic-bezier(0.22, 0.61, 0.36, 1) 0s;
  transition: color 1s ease;
  color: ${({ $active }) => ($active ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.16)')};

  @media (max-width: 1919px) {
    font-size: 14px;
    line-height: 20px;
  }
`;

export const MainWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const Main = styled.div`
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 1s ease, transform 1s ease;

  &.active {
    opacity: 1;
    transform: translateY(0);
  }

  display: flex;
  justify-content: center;
  align-items: stretch;
  width: 100%;
  max-width: 1100px;
  flex-direction: column;
  @media (max-width: 1919px) {
    max-width: none;
  }
`;

export const TagContainer = styled.div`
  display: flex;
  width: 100%;
`;

export const Tag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 18px;
  gap: 6px;
  margin-bottom: 6px;
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

export const Head = styled.p`
  color: #fff;
  leading-trim: both;
  text-edge: cap;
  font-family: 'area-normal';
  font-size: 52px;
  font-weight: 400;
  line-height: 72px; /* 138.462% */
  margin-bottom: 56px;
  white-space: pre-line;
  @media (max-width: 1919px) {
    font-size: 40px;
    margin-bottom: 44px;
    white-space: normal;
  }
`;

export const ImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 24px;
  border: 1px solid rgba(92, 91, 94, 0.4);
  overflow: hidden;
`;

export const Body = styled.div``;

export const LinksButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
  width: 100%;
`;

export const BaseBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.1);
  padding: 16px 30px;
  cursor: pointer;
  color: #fff;

  &:hover {
    border: 1px solid var(--white-100, #fff);
    box-shadow: 0px 6px 12px 0px rgba(255, 255, 255, 0.24);
  }
  &:active {
    border: 1px solid var(--white-100, #fff);
    background: var(--white-100, #fff);
    color: #0a0517;
    box-shadow: 0px 6px 12px 0px rgba(255, 255, 255, 0.24);
  }
`;

export const TransButton = styled(BaseBtn)`
  border: none;
  background: transparent;
`;

export const Txt = styled.span`
  display: flex;
  justify-content: center;
  align-self: flex-end;
  color: inherit;
  vertical-align: middle;
  text-align: center;
  font-family: 'area-normal';
  font-size: 14px;
  font-weight: 600;
  line-height: 20px; /* 142.857% */
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
