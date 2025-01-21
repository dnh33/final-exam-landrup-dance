import React from "react";
import Form from "../components/login/Form";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  background-image: url("/images/login_bg.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(94, 46, 83, 0.9) 0%,
      rgba(72, 38, 64, 0.9) 100%
    );
    z-index: 0;
  }
`;

const FormWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

export default function Login() {
  return (
    <Container>
      <FormWrapper>
        <Form />
      </FormWrapper>
    </Container>
  );
}
