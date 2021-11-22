import React from "react";
import styled from "styled-components";

export default function Primary({ children }) {
  return (
    <center>
      <Button>
        <Text>{children}</Text>
      </Button>
    </center>
  );
}

const Button = styled.button`
  cursor: pointer;
  width: 249px;
  height: 54px;
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: #5e2e53;
  box-shadow: 3px 4px 4px rgba(0, 0, 0, 0.25);
`;

const Text = styled.p`
  cursor: pointer;
  width: 100px;
  height: 21px;
  font-family: Ubuntu;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
  color: #e9e9e9;
`;
