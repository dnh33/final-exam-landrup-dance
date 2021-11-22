import React from "react";
import styled from "styled-components";

export default function ErrorMsg({ children }) {
  return <Text>{children}</Text>;
}

const Text = styled.p`
  color: #ffffff;
  border: 4px solid black;
  background: #5e2e53;
  border-radius: 50%;
  text-align: center;
  margin-top: 1rem;
  padding: 3%;
`;
