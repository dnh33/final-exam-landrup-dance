import React from "react";
import styled from "styled-components";

export default function PageTitle({ children }) {
  return <Text>{children}</Text>;
}

const Text = styled.h1`
  width: 176px;
  height: 41px;
  margin: 0 0 41px 9vw;
  padding-top: 31px;
  font-style: normal;
  font-weight: normal;
  font-size: 36px;
  line-height: 41px;
  color: #eaeaea;
`;
