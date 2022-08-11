import React from "react";
import styled from "styled-components";

const WrapperStyle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContainerStyle = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  flex-direction: column;
`;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  return (
    <WrapperStyle>
      <ContainerStyle>{children}</ContainerStyle>
    </WrapperStyle>
  );
};

export default Layout;
