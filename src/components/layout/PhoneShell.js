import React from "react";
import styled from "styled-components";

const ShellContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (-webkit-min-device-pixel-ratio: 1.3),
    only screen and (-o-min-device-pixel-ratio: 13/10),
    only screen and (min-resolution: 120dpi) {
    transform: scale(0.8);
  }
`;

const PhoneFrame = styled.div`
  position: relative;
  width: 375px;
  height: 812px;
  margin: 20px auto;
  border-radius: 40px;
  border: 14px solid #1a1a1a;
  background: white;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  flex-shrink: 0;

  @media (max-height: 900px) {
    transform: scale(0.9);
  }

  @media (max-height: 800px) {
    transform: scale(0.8);
  }

  @media (max-width: 480px) {
    margin: 0;
    border: none;
    border-radius: 0;
    width: 100vw;
    height: 100vh;
    transform: none;
  }

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 150px;
    height: 30px;
    background: #1a1a1a;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    z-index: 2;

    @media (max-width: 480px) {
      display: none;
    }
  }
`;

const PhoneContent = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background: #5e2e53;
  position: relative;
  display: flex;
  flex-direction: column;

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const ContentArea = styled.div`
  flex: 1;
  overflow-y: auto;
  position: relative;
  padding-bottom: 56px; /* Height of the bottom navigation */
`;

const FixedBottom = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;

  @media (min-width: 481px) {
    width: 347px; /* 375px - 2 * 14px border */
    left: 50%;
    transform: translateX(-50%);
  }
`;

const PhoneShell = ({ children }) => {
  // Split children into main content and bottom navigation
  const mainContent = React.Children.toArray(children).filter(
    (child) => child.type !== "nav" && !child.props?.sx?.position
  );
  const bottomNav = React.Children.toArray(children).find(
    (child) => child.type === "nav" || child.props?.sx?.position === "fixed"
  );

  return (
    <ShellContainer>
      <PhoneFrame>
        <PhoneContent>
          <ContentArea>{mainContent}</ContentArea>
          <FixedBottom>{bottomNav}</FixedBottom>
        </PhoneContent>
      </PhoneFrame>
    </ShellContainer>
  );
};

export default PhoneShell;
