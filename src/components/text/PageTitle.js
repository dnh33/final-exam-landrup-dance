import React from "react";
import styled from "styled-components";

export default function PageTitle({ children, icon }) {
  return (
    <Text>
      {icon && <Icon>{icon}</Icon>}
      {children}
    </Text>
  );
}

const Text = styled.h1`
  margin: 0 0 2rem 0;
  padding: 1.5rem 1rem;
  font-family: "Ubuntu", sans-serif;
  font-size: 2.25rem;
  font-weight: 500;
  line-height: 1.2;
  color: #eaeaea;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const Icon = styled.span`
  font-size: 2rem;
  display: flex;
  align-items: center;
`;
